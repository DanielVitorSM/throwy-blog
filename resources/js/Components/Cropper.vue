<script setup lang="ts">
import "vue-advanced-cropper/dist/style.css";
import { showErrorNotify } from "@/Utils/notify";
import { validateFile } from "@/Utils/functions";
import { type PropType, defineModel, computed, ref, watch } from "vue";
import { Cropper, type CropperResult } from "vue-advanced-cropper";
import { useDialogPluginComponent, uid } from "quasar";
import Compressor from "compressorjs";

const { quality, accept, maxSize, convertTo } = defineProps({
	accept: {
		type: String,
		default: () => "jpg,jpeg,png"
	},
	maxSize: {
		type: Number,
		default: () => 4096
	},
	aspectRatio: {
		type: Number,
		default: () => 16 / 9
	},
	convertTo: {
		type: String,
		default: () => "jpg"
	},
	quality: {
		type: Number,
		default: () => 0.8
	}
});

const cropperRef = ref<any>(null);
const cacheFile = ref<File | null>(null);
const modelValue = defineModel<File | string>({ type: File as PropType<File | string> });
const input = ref<HTMLInputElement | null>(null);
const loading = ref(false);

const previewSrc = computed(() => {
	if (modelValue.value) {
		if (modelValue.value instanceof File) return URL.createObjectURL(modelValue.value);

		return modelValue.value;
	}

	return null;
});
const src = computed(() => (cacheFile.value ? URL.createObjectURL(cacheFile.value) : null));

const compress = (blob: Blob) => {
	return new Promise<File>((resolve, reject) => {
		new Compressor(blob, {
			quality,

			async success(result) {
				if (cacheFile.value) {
					resolve(
						new File([result], cacheFile.value.name, {
							lastModified: cacheFile.value.lastModified,
							type: result.type
						})
					);
				}
			},
			error(err) {
				reject(err);
			}
		});
	});
};

const save = () => {
	const { canvas }: CropperResult = cropperRef.value.getResult();

	if (canvas) {
		loading.value = true;
		canvas.toBlob(async (blob) => {
			if (!blob) return (loading.value = false);

			compress(blob)
				.then((file: File) => {
					modelValue.value = file;
					cacheFile.value = null;
				})
				.catch((err: any) => {
					console.log(err);
					showErrorNotify("Não foi possível recortar a imagem");
				})
				.finally(() => (loading.value = false));
		}, convertTo);
	}
};

const getFile = () => {
	if (input.value) input.value.click();
};

const onCancelCrop = () => {
	cacheFile.value = null;
};

const onInput = (e: Event) => {
	const inputFile = e.target as HTMLInputElement;
	const file = inputFile.files ? inputFile.files.item(0) : null;

	try {
		if (!file) return;

		if (file.size > maxSize) validateFile(file, accept.split(","));

		cacheFile.value = file;
		inputFile.value = "";
	} catch (error: any) {
		showErrorNotify(error.message);
	}
};
</script>

<template>
	<input
		ref="input"
		hidden
		type="file"
		@input="onInput"
		:accept="
			accept
				.split(',')
				.map((e) => `.${e}`)
				.join(',')
		"
	/>

	<slot name="button" v-bind="{ previewSrc, getFile }">
		<q-btn label="Enviar" @click="getFile" />
	</slot>

	<q-dialog :model-value="Boolean(src)" @hide="onCancelCrop">
		<q-card class="q-dialog-plugin" style="width: 700px; max-width: 80vw">
			<q-card-section class="row no-wrap items-center">
				<q-avatar icon="crop" color="grey-4" text-color="black" size="md" class="q-mr-sm" />
				<span class="text-h6">Recortar imagem</span>

				<q-space />

				<q-btn
					round
					flat
					dense
					size="sm"
					color="grey-8"
					icon="close"
					@click="onCancelCrop"
				/>
			</q-card-section>

			<q-card-section class="q-pt-none">
				<q-responsive :ratio="$q.screen.xs ? 1 : 16 / 9">
					<Cropper
						:src="src"
						ref="cropperRef"
						class="full-height full-width"
						:stencil-props="{
							aspectRatio: aspectRatio
						}"
						default-boundaries="fill"
						priority="visibleArea"
					/>
				</q-responsive>
			</q-card-section>

			<q-card-section class="row q-col-gutter-md">
				<div class="col-6">
					<q-btn
						flat
						color="primary"
						label="Cancelar"
						class="full-width"
						@click="onCancelCrop"
						:disable="loading"
					/>
				</div>
				<div class="col-6">
					<q-btn
						color="primary"
						label="Salvar"
						class="full-width"
						@click="save"
						:loading="loading"
					/>
				</div>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>
