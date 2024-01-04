<script setup lang="ts">
import { Head } from "@inertiajs/vue3";
import AppLayout from "@/Layouts/AppLayout.vue";
import { type PropType } from "vue";
import PostCard from "@/Components/PostCard.vue";
import ShareButtons from "@/Pages/Partials/ShareButtons.vue";

defineProps({
	post: {
		type: Object as PropType<Post>,
		required: true
	},
	similarPosts: Array as PropType<Post[]>
});
</script>

<template>
	<Head :title="post.title" />

	<AppLayout>
		<q-page v-if="post" padding>
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
					<ShareButtons
						:slug="post.slug"
						:title="post.title"
						as-row
						class="q-mb-xs"
						v-if="!$q.screen.gt.sm"
					/>

					<q-img
						:src="post.banner"
						v-if="post.banner"
						class="full-width rounded-borders"
					/>
					<hr v-else />

					<div class="q-my-xl text-body1" v-html="post.content"></div>

					<div class="q-mb-xl" v-if="post.tags && post.tags.length > 0">
						<span class="text-overline">Tags:</span>

						<div class="row q-gutter-xs">
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
							<q-avatar
								size="60px"
								:icon="post.author.avatar ? undefined : 'face'"
								color="grey-5"
							>
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
					<ShareButtons v-if="$q.screen.gt.sm" :slug="post.slug" :title="post.title" />
				</section>
			</section>
			<section class="row justify-center" v-if="similarPosts && similarPosts.length > 0">
				<div class="fixed-container">
					<section class="column">
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
