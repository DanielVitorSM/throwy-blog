<script setup lang="ts">
import { Head, Link } from "@inertiajs/vue3";
import AppLayout from "@/Layouts/AppLayout.vue";
import { computed, ref, type PropType } from "vue";
import dayjs from "dayjs";
import constants from "@/Utils/constants";
import { shareOn } from "@/Utils/functions";
import { copyToClipboard } from "quasar";
import PostCard from "@/Components/PostCard.vue";

const props = defineProps({
	post: {
		type: Object as PropType<Post>,
		required: true
	},
	similarPosts: Array as PropType<Post[]>
});

const shareLink = computed(() => route("blog.show", { slug: props.post.slug }));
const showingShareLinkTooltip = ref(false);

const copyShareLink = () =>
	copyToClipboard(shareLink.value).then(() => {
		showingShareLinkTooltip.value = true;
		setTimeout(() => (showingShareLinkTooltip.value = false), 1500);
	});
</script>

<template>
	<Head title="Post"></Head>

	<AppLayout>
		<q-page v-if="post">
			<section class="row">
				<section class="col"></section>
				<section class="fixed-container q-py-lg">
					<q-badge
						color="secondary"
						text-color="white"
						v-if="post.category"
						class="q-ma-none q-mb-md"
					>
						{{ post.category.name }}
					</q-badge>

					<h1 class="text-h3 text-bold q-mt-none q-mb-md">{{ post.title }}</h1>

					<p class="text-body1">{{ post.caption }}</p>

					<q-img
						:src="post.banner"
						v-if="post.banner"
						class="full-width rounded-borders"
					/>
					<hr v-else>

					<div class="q-my-xl text-body1" v-html="post.content"></div>

					<div v-if="post.tags && post.tags.length > 0">
						<span class="text-overline">Tags:</span>

						<div class="row">
							<q-badge
								color="grey-8"
								text-color="white"
								v-for="tag in post.tags"
								:key="tag.id"
							>
								{{ tag.name }}
							</q-badge>
						</div>
					</div>

					<section>
						<div class="row items-center q-gutter-lg">
							<q-avatar size="60px" :icon="post.author.avatar ? '' : 'face'" color="grey-5">
								<img v-if="post.author.avatar" :src="post.author.avatar" />
							</q-avatar>

							<div class="column">
								<span style="line-height: unset" class="text-overline">
									O Autor
								</span>
								<span class="q-ma-none text-h6 text-bold">
									{{ post.author.name }}
								</span>
							</div>
						</div>

						<p v-if="post.author.description" class="text-body1 q-mt-md q-mb-lg">
							{{ post.author.description }}
						</p>
					</section>
				</section>
				<section class="col relative-position">
					<div
						class="q-mx-sm q-mt-lg"
						style="position: sticky; top: 74px; align-self: flex-start"
					>
						<div class="column items-start q-gutter-sm">
							<q-btn icon="link" unelevated flat round @click="copyShareLink">
								<q-tooltip
									no-parent-event
									anchor="top middle"
									self="bottom middle"
									v-model="showingShareLinkTooltip"
									class="bg-green-8"
								>
									Copiado para a área de transferência!
								</q-tooltip>
							</q-btn>
							<a
								v-for="[type, icon] in Object.entries(
									constants.SHARE_BUTTONS_ICONS
								)"
								:key="type"
								:href="shareOn(type, post.title, shareLink) ?? '/'"
								target="_blank"
							>
								<q-btn :icon="icon" round unelevated flat />
							</a>
						</div>
					</div>
				</section>
			</section>
			<section class="row justify-center">
				<div class="fixed-container">
					<section v-if="similarPosts" class="column">
						<h2 class="text-h4">Postagens relacionadas</h2>

						<PostCard
							v-for="similarPost in similarPosts"
							:key="similarPost.id"
							:post="similarPost"
							class="q-mb-xl"
						/>
					</section>
				</div>
			</section>
		</q-page>
	</AppLayout>
</template>
