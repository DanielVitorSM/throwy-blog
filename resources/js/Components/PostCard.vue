<script setup lang="ts">
import { Link } from "@inertiajs/vue3";
import type { PropType } from "vue";
import dayjs from "dayjs";

defineProps({
	post: {
		type: Object as PropType<Post>,
		required: true
	}
});
</script>

<template>
	<q-card flat class="bg-transparent">
		<q-card-section horizontal>
			<q-card-section class="q-pa-none full-width">
				<div class="text-caption text-grey">
					<b>{{ post.author.name }}</b>
					<span class="q-mx-sm">●</span>
					{{ dayjs(post.published_at ?? post.created_at).fromNow() }}
				</div>
				<Link :href="$route('blog.show', { slug: post.slug })">
					<div class="text-h6 text-bold q-mt-sm q-mb-xs">
						{{ post.title }}
					</div>
					<p class="text-caption q-mt-none q-mb-xs">
						{{ post.caption }}
					</p>
				</Link>
				<q-badge color="secondary" text-color="white" class="q-ma-none">
					{{ post.category.name }}
				</q-badge>
			</q-card-section>

			<q-card-section v-if="post.banner" class="q-py-none col-3 row items-start">
				<q-img class="rounded-borders" :src="post.banner" :ratio="1" />
			</q-card-section>
		</q-card-section>
	</q-card>
</template>
