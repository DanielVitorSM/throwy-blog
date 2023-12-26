<script setup lang="ts">
import { computed, type PropType } from "vue";
import { Head, router } from "@inertiajs/vue3";
import AppLayout from "@/Layouts/AppLayout.vue";
import PostCard from "@/Components/PostCard.vue";
import ChipGroup from "@/Components/ChipGroup.vue";
import type { QTable } from "quasar";

const { pagination } = defineProps({
	posts: Array as PropType<Post[]>,
	categories: Array as PropType<Category[]>,
	tags: Array as PropType<Tag[]>,
	pagination: Object as PropType<QTable["pagination"]>
});

const params = new URLSearchParams(window.location.search);
const search = params.get("search") ?? null;
const filterOptions: { [key: string]: string } = {
	recent: "Recentes",
	popular: "Populares"
};

const totalPages = computed(() => {
	if (pagination) {
		const total = pagination.rowsNumber ?? 1;
		const limit = pagination.rowsPerPage ?? 1;
		return Math.floor(total / limit);
	}
	return 1;
});

const load = (page: number, sortBy?: string): void => {
	router.reload({
		only: ["posts", "pagination"],
		preserveScroll: false,
		preserveState: false,
		onSuccess: () => window.scroll({ top: 0 }),
		data: {
			sortBy: sortBy ?? pagination?.sortBy ?? "recent",
			page
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
					:label="filterOptions[pagination?.sortBy ?? 'recent']"
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
							@click="() => load(1, k)"
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
						<section v-if="posts.length > 0">
							<PostCard
								v-for="post in posts"
								:key="post.id"
								:post="post"
								class="q-mb-xl"
							/>
						</section>
						<section v-else>
							<p class="text-body1" v-if="search">
								Nenhum post encontrado para "
								<b>{{ search }}</b>
								". Tente mudar as palavras para encontrar oque deseja.
							</p>
							<p class="text-body1" v-else>
								Não foi dessa vez, volte mais tarde para encontrar postagens
								surpreendentes.
							</p>
						</section>

						<div
							v-if="pagination && (pagination.rowsNumber || 0) > 0 && totalPages > 1"
							class="full-width row justify-center q-mb-xl"
						>
							<q-pagination
								active-design="unelevated"
								active-color="black"
								flat
								:model-value="pagination.page ?? 1"
								color="black"
								:max="totalPages"
								:max-pages="6"
								direction-links
								@update:model-value="(page) => load(page)"
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
							v-if="tags"
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
