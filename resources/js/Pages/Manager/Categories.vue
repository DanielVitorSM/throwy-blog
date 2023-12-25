<script setup lang="ts">
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, router, Link } from "@inertiajs/vue3";
import { ref, type PropType } from "vue";
import { QTable, useQuasar } from "quasar";
import EditCategory from "@/Modals/EditCategory.vue";
import dayjs from "dayjs";

const loading = ref(false);
const $q = useQuasar();

const { active, pagination } = defineProps({
	categories: {
		type: Array as PropType<Post[]>,
		required: true
	},
	pagination: {
		type: Object as PropType<QTable["pagination"]>,
		required: true
	},
	active: {
		type: Boolean,
		default: () => true
	}
});

const columns: QTable["columns"] = [
	{
		name: "name",
		field: "name",
		label: "Nome",
		align: "left",
		sortable: true
	},
	{
		name: "posts_count",
		field: "posts_count",
		label: "Posts",
		align: "center",
		sortable: true
	},
	{
		name: "created_at",
		field: "created_at",
		label: "Criado em",
		format: (val: any) => dayjs(val).format("DD/MM/YYYY HH:mm:ss"),
		align: "center",
		sortable: true
	},
	{
		name: "actions",
		field: (val: Category) => val,
		label: "Ações",
		align: "center"
	}
];

const onRequest = (props: any) => {
	const { page, rowsPerPage, sortBy, descending } = props.pagination;

	loading.value = true;
	router.reload({
		only: ["categories", "pagination"],
		preserveState: true,
		data: {
			page,
			rowsPerPage,
			sortBy,
			descending,
			active
		},
		onFinish: () => (loading.value = false)
	});
};

const addCategory = () => $q.dialog({ component: EditCategory });
const editCategory = (id: string) =>
	$q.dialog({ component: EditCategory, componentProps: { categoryId: id } });
</script>

<template>
	<Head title="Categorias" />

	<AuthenticatedLayout>
		<section class="q-mb-lg q-col-gutter-lg row items-center">
			<h2 class="text-bold text-h4 q-ma-none">Categorias</h2>
			<q-space v-if="$q.screen.gt.xs" />

			<q-btn-group unelevated flat>
				<q-btn
					color="secondary"
					:outline="!active"
					:disable="loading || active"
					label="Ativos"
					unelevated
					no-caps
					@click="() => router.reload({ data: { active: true } })"
				/>
				<q-btn
					color="secondary"
					:outline="active"
					:disable="loading || !active"
					label="Arquivados"
					unelevated
					no-caps
					@click="() => router.reload({ data: { active: false } })"
				/>
			</q-btn-group>

			<div>
				<q-btn
					@click="addCategory"
					color="primary"
					:disable="loading"
					label="Novo"
					unelevated
					no-caps
				/>
			</div>
		</section>

		<section>
			<q-table
				flat
				class="full-width sticky-last-column"
				bordered
				:key="(+new Date()).toString(36)"
				@request="onRequest"
				:rows-per-page-options="[5, 10, 25, 50]"
				:loading="loading"
				binary-state-sort
				:rows="categories"
				:pagination="pagination"
				:columns="columns"
				row-key="id"
			>
				<template v-slot:body-cell-published="props">
					<q-td :props="props">
						<q-icon name="check" size="xs" color="green" v-if="props.value" />
						<q-icon name="close" size="xs" color="red" v-else />
					</q-td>
				</template>

				<template v-slot:body-cell-actions="props">
					<q-td :props="props">
						<q-btn icon="more_horiz" flat round>
							<q-menu>
								<q-list dense style="min-width: 100px">
									<!-- <Link :href="$route('blog.show', { slug: props.value.slug })">
										<q-item dense clickable v-close-popup>
											<q-item-section>Visualizar</q-item-section>
										</q-item>
									</Link> -->
									<q-item
										@click="() => editCategory(props.value.id)"
										dense
										clickable
										v-close-popup
									>
										<q-item-section>Editar</q-item-section>
									</q-item>

									<q-item
										v-if="props.value.deleted_at"
										@click="
											router.post(
												$route('categories.restore', {
													id: props.value.id
												}),
												undefined,
												{ headers: { 'X-Reload': 'true' } }
											)
										"
										dense
										clickable
										v-close-popup
									>
										<q-item-section>Restaurar</q-item-section>
									</q-item>

									<q-separator />

									<q-item
										@click="
											router.delete(
												$route('categories.destroy', {
													id: props.value.id
												}),
												{ headers: { 'X-Reload': 'true' } }
											)
										"
										dense
										clickable
										class="text-red-8"
										v-close-popup
									>
										<q-item-section>
											{{
												props.value.deleted_at
													? "Remover permanentemente"
													: "Remover"
											}}
										</q-item-section>
									</q-item>
								</q-list>
							</q-menu>
						</q-btn>
					</q-td>
				</template>
			</q-table>
		</section>
	</AuthenticatedLayout>
</template>
