<script setup lang="ts">
import { ref, watch } from "vue";
import AppLogo from "@/Components/AppLogo.vue";
import { router, Link } from "@inertiajs/vue3";
import dayjs from "dayjs";

const leftDrawerOpen = ref(false);
const params = new URLSearchParams(window.location.search);
const search = ref<string>(params.get("search") ?? "");

const toggleLeftDrawer = () => {
	leftDrawerOpen.value = !leftDrawerOpen.value;
};

watch(search, (val: string) => {
	router.get(route("home"), { search: val });
});
</script>

<template>
	<q-layout class="bg-grey-2" view="hHh lpR lfr">
		<q-header class="bg-grey-2 text-dark">
			<q-toolbar class="container q-px-sm q-py-md">
				<div class="row items-center">
					<Link class="text-reset" :href="$route('home')">
						<AppLogo />
					</Link>
				</div>

				<q-space />

				<!-- <div v-if="!$q.screen.lt.md" class="row q-gutter-xs"> -->
				<!-- <q-btn flat class="no-hover" label="Home" no-caps /> -->
				<!-- <q-btn flat class="no-hover" label="Blog" no-caps />
					<q-btn flat class="no-hover" label="Sobre nós" no-caps />
					<q-btn-dropdown
						:ripple="false"
						class="no-hover"
						flat
						no-caps
						label="Ferramentas"
					>
						<q-list>
							<q-item clickable v-close-popup>
								<q-item-section>
									<q-item-label>Calculadora</q-item-label>
								</q-item-section>
							</q-item>
						</q-list>
					</q-btn-dropdown>
				</div> -->

				<div v-if="!$q.screen.lt.sm" class="q-ml-md">
					<q-input
						hide-bottom-space
						outlined
						rounded
						debounce="2000"
						placeholder="Pesquisar..."
						v-model="search"
						dense
					>
						<template v-slot:append>
							<q-icon name="search" />
						</template>
					</q-input>
				</div>

				<!-- <q-btn
					flat
					@click="toggleLeftDrawer"
					round
					color="dark"
					icon="menu"
					v-if="$q.screen.lt.md"
				/> -->

				<!-- <q-btn round color="black" size="12px">
                    <q-avatar size="32px">
                        <img src="https://github.com/danielvitorsm.png" />
                    </q-avatar>
                </q-btn> -->
			</q-toolbar>
		</q-header>

		<!-- <q-drawer
			behavior="mobile"
			v-model="leftDrawerOpen"
			side="left"
			bordered
			v-if="$q.screen.lt.md"
		>
			<q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
				<q-list padding>
					<q-item clickable v-ripple>
						<q-item-section avatar>
							<q-icon name="inbox" />
						</q-item-section>

						<q-item-section>Inbox</q-item-section>
					</q-item>

					<q-item active clickable v-ripple>
						<q-item-section avatar>
							<q-icon name="star" />
						</q-item-section>

						<q-item-section>Star</q-item-section>
					</q-item>

					<q-item clickable v-ripple>
						<q-item-section avatar>
							<q-icon name="send" />
						</q-item-section>

						<q-item-section>Send</q-item-section>
					</q-item>

					<q-separator />

					<q-item clickable v-ripple>
						<q-item-section avatar>
							<q-icon name="drafts" />
						</q-item-section>

						<q-item-section>Drafts</q-item-section>
					</q-item>
				</q-list>
			</q-scroll-area>
		</q-drawer> -->

		<q-page-container class="relative-position" v-bind="$attrs">
			<slot></slot>

			<!-- <section class="bg-white q-py-xl text-center column items-center">
				<span class="text-caption">Não perca nenhum detalhe</span>
				<h5 class="q-mb-md q-mt-none text-bold">
					Inscreva-se para receber notificações exclusivas
				</h5>

				<q-input
					style="max-width: 400px; width: 100vw"
					v-model="search"
					class="full-width"
					rounded
					outlined
					placeholder="Seu melhor email"
				/>
                <q-btn label="Inscrever-se" unelevated no-caps class="q-mt-md" color="primary"/>
			</section> -->
		</q-page-container>

		<q-footer class="bg-white text-dark">
			<q-toolbar class="row">
				<small
					class="col-12 col-sm-6 col-md-4 offset-md-4"
					:class="{ 'text-center': !$q.screen.sm }"
				>
					Throwy {{ dayjs().format("YYYY") }} &copy; Todos os direitos reservados
				</small>
				<div v-if="$q.screen.gt.xs" class="col-sm-6 col-md-4 text-right">
					Ícones por
					<a href="https://www.flaticon.com" class="text-primary">Flaticon</a>
					e
					<a href="https://freepik.com" class="text-primary">Freepik</a>
				</div>
			</q-toolbar>
			<q-toolbar v-if="!$q.screen.gt.xs" class="row justify-center">
				<div class="text-center">
					Ícones por
					<a href="https://www.flaticon.com" class="text-primary">Flaticon</a>
					e
					<a href="https://freepik.com" class="text-primary">Freepik</a>
				</div>
			</q-toolbar>
		</q-footer>
	</q-layout>
</template>
