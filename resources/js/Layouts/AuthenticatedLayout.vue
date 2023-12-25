<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import AppLogo from "@/Components/AppLogo.vue";
import { Link, usePage } from "@inertiajs/vue3";
import { useQuasar } from "quasar";
import { showErrorNotify, showSuccessNotify } from "@/Utils/notify";

const leftDrawerOpen = ref(false);
const page = usePage();

const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);

interface Route {
	title: string;
	name: string;
	include?: string[];
	icon?: string;
	children?: Route[];
}

const routes: Route[] = [
	{
		title: "Dashboard",
		name: "dashboard",
		icon: "home"
	},
	{
		title: "Posts",
		name: "posts.index",
		include: ["posts.show", "posts.create", "posts.edit"],
		icon: "article",
		children: [
			{
				title: "Todos os posts",
				name: "posts.index"
			},
			{
				title: "Adicionar um novo post",
				name: "posts.create"
			},
			{
				title: "Categorias",
				name: "categories.index"
			}
		]
	}
];

const showFlashMessages = (props: any) => {
	const flash = props.flash;
	if (!flash) return;
	if (flash.success) showSuccessNotify(flash.success);
	if (flash.error) showErrorNotify(flash.error);
};

watch(() => page.props, showFlashMessages);

onMounted(() => showFlashMessages(page.props));

const leftDrawerOpenFinal = computed(() => {
	const $q = useQuasar();
	return $q.screen.gt.sm ? true : leftDrawerOpen.value;
});

const verifyRouteIsActive = (rt: Route) => {
	let routes = [rt.name];
	if (rt.children) rt.children.forEach((e) => routes.push(e.name));
	if (rt.include) rt.include.forEach((e) => routes.push(e));

	const current = route().current();
	return current && routes.includes(current);
};
</script>

<template>
	<q-layout class="bg-grey-2" view="hHh lpR lfr">
		<q-header class="bg-white text-dark">
			<q-toolbar class="q-px-md q-py-md">
				<div class="row items-center">
					<q-btn
						v-if="$q.screen.lt.md"
						flat
						@click="toggleLeftDrawer"
						round
						color="dark"
						icon="menu"
						class="q-mr-sm"
					/>

					<AppLogo />
				</div>

				<q-space />

				<q-btn round color="black" size="12px">
					<q-avatar size="32px">
						<img src="https://github.com/danielvitorsm.png" />
					</q-avatar>
				</q-btn>
			</q-toolbar>
		</q-header>

		<q-drawer
			overlay
			:model-value="leftDrawerOpenFinal"
			:key="`drawer-main-${$q.screen.gt.sm}`"
			:behavior="$q.screen.gt.sm ? 'desktop' : 'mobile'"
			show-if-above
			side="left"
			:width="300"
			bordered
			@hide="leftDrawerOpen = false"
		>
			<q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
				<q-list padding>
					<div v-for="(route, i) in routes" :key="i">
						<Link
							v-if="route.children && route.children.length > 0"
							:href="$route(route.name)"
						>
							<q-expansion-item
								icon="article"
								label="Posts"
								:header-class="
									verifyRouteIsActive(route) ? 'bg-black text-white' : 'bg-white'
								"
								class="bg-grey-4"
								:model-value="verifyRouteIsActive(route)"
							>
								<Link
									v-for="(child, j) in route.children"
									:key="j"
									:href="$route(child.name)"
								>
									<q-item
										active-class="text-bold text-black"
										:active="$route().current() == child.name"
										dense
										clickable
										v-ripple
									>
										<q-item-section>{{ child.title }}</q-item-section>
									</q-item>
								</Link>
							</q-expansion-item>
						</Link>

						<Link v-else :href="$route(route.name)">
							<q-item
								:active="verifyRouteIsActive(route)"
								active-class="text-primary"
								clickable
								v-ripple
							>
								<q-item-section avatar>
									<q-icon :name="route.icon" />
								</q-item-section>

								<q-item-section>{{ route.title }}</q-item-section>
							</q-item>
						</Link>
					</div>

					<!-- <q-item clickable v-ripple>
						<q-item-section avatar>
							<q-icon name="comment" />
						</q-item-section>

						<q-item-section>Comentários</q-item-section>
					</q-item>

					<q-separator />

					<q-expansion-item expand-separator icon="group" label="Usuários">
						<q-item dense clickable v-ripple>
							<q-item-section>Todos os usuários</q-item-section>
						</q-item>
						<q-item dense clickable v-ripple>
							<q-item-section>Novo usuário</q-item-section>
						</q-item>
					</q-expansion-item> -->
				</q-list>
			</q-scroll-area>
		</q-drawer>

		<q-page-container :style="`padding-left: ${$q.screen.gt.sm ? '300px' : '0'};`">
			<q-page padding>
				<slot></slot>
			</q-page>
		</q-page-container>

		<q-footer class="bg-white text-dark">
			<q-toolbar class="text-center justify-center">
				<small>Throwy 2023 &copy; Todos os direitos reservados</small>
			</q-toolbar>
		</q-footer>
	</q-layout>
</template>
