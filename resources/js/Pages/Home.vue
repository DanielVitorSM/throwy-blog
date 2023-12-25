<script setup lang="ts">
import type { PropType } from "vue";
import { Head, router } from "@inertiajs/vue3";
import AppLayout from "@/Layouts/AppLayout.vue";
import PostCard from "@/Components/PostCard.vue";
import ChipGroup from "@/Components/ChipGroup.vue";

defineProps({
	posts: Array as PropType<Post[]>,
	categories: Array as PropType<Category[]>,
	tags: Array as PropType<Tag[]>,
	orderBy: String
});

const filterOptions: { [key: string]: string } = {
	recent: "Recentes",
	popular: "Populares"
};

const changeOrderBy = (orderBy: string): void => {
	router.reload({
		only: ["posts", "orderBy"],
		data: {
			orderBy
		}
	});
};
</script>

<template>
	<Head title="Home"></Head>

	<AppLayout
		style="
			background: url('/assets/icons/piggy-bank.png') no-repeat top 3% right -260px padding-box;
		"
	>
		<q-page class="container q-px-sm relative-position">
			<section class="row items-start q-col-gutter-lg q-my-lg q-py-lg">
				<div class="col-sm-11 col-md-9 col-lg-12">
					<h1
						class="text-bold text-h2 q-mb-md q-mt-none"
						:class="{ 'text-h4': $q.screen.lt.sm }"
					>
						Invista com inteligência e conquiste a independência financeira.
					</h1>
					<p class="text-subtitle1 text-grey-7 q-ma-none">
						Descubra como investir de forma inteligente e conquistar a
						<br />
						liberdade financeira que você sempre sonhou.
					</p>
				</div>
			</section>

			<div class="q-mt-xl">
				<q-btn-dropdown
					color="primary"
					unelevated
					flat
					padding="0"
					:label="filterOptions[orderBy ?? 'recent']"
					no-caps
					class="no-hover"
					:ripple="false"
				>
					<q-list>
						<q-item
							v-for="([k, v], i) in Object.entries(filterOptions)"
							:key="k"
							clickable
							v-close-popup
							@click="() => changeOrderBy(k)"
						>
							<q-item-section>
								<q-item-label>{{ v }}</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</q-btn-dropdown>
			</div>

			<section class="row q-mb-lg q-py-lg">
				<div v-if="posts" class="col-12 col-md-8">
					<div class="fixed-container">
						<PostCard
							v-for="post in posts"
							:key="post.id"
							:post="post"
							class="q-mb-xl"
						/>

						<div class="full-width row justify-center q-mb-xl">
							<q-pagination
								active-design="unelevated"
								active-color="black"
								flat
								:model-value="2"
								color="black"
								:max="100"
								:max-pages="6"
								direction-links
								boundary-links
								icon-first="skip_previous"
								icon-last="skip_next"
								icon-prev="fast_rewind"
								icon-next="fast_forward"
							/>
						</div>
					</div>
				</div>
				<div class="col-4 row justify-end" v-if="$q.screen.gt.sm">
					<section style="position: sticky; top: 80px; align-self: flex-start">
						<ChipGroup
							v-if="categories"
							route-name="categories"
							:items="categories"
							title="Descubra categorias"
						/>
						<ChipGroup
							v-if="tags "
							route-name="tags"
							:items="tags"
							title="Descubra tags"
						/>
					</section>
				</div>
			</section>
		</q-page>
	</AppLayout>
</template>
