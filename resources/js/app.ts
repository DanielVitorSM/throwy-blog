import { createApp, h } from "vue";
import type { DefineComponent } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Quasar, Notify, Dialog } from "quasar";
import VueGtagPlugin from "vue-gtag";
import quasarLang from "quasar/lang/pt-BR";
// @ts-expect-error
import { ZiggyVue } from "ziggy-vue";
import "./bootstrap";

import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";
import "quasar/src/css/index.sass";
import "dayjs/locale/pt";
import relativeTime from "dayjs/plugin/relativeTime";

import dayjs from "dayjs";

dayjs.locale("pt");
dayjs.extend(relativeTime);
window.route = route;

const appName = window.document.getElementsByTagName("title")[0]?.innerText || "Throwy";

createInertiaApp({
	title: (title) => `${title} — ${appName}`,
	resolve: (name) =>
		resolvePageComponent(
			`./Pages/${name}.vue`,
			import.meta.glob<DefineComponent>("./Pages/**/*.vue")
		),
	setup({ el, App, props, plugin }) {
		const app = createApp({ render: () => h(App, props) });

		app.use(plugin);
		app.use(ZiggyVue, (window as any).Ziggy);

		app.use({
			install(app) {
				app.config.globalProperties.$route = route;
			}
		});

		app.use(Quasar, {
			plugins: {
				Notify,
				Dialog
			},
			lang: quasarLang
		});

		app.use(VueGtagPlugin, {
			appName: "Throwy",
			pageTrackerScreenviewEnabled: true,
			pageTrackerEnabled: true,
			enabled: import.meta.env.PROD,
			config: {
				id: import.meta.env.VITE_GOOGLE_ANALYTICS_ID
			}
		});

		app.mount(el);

		return app;
	},
	progress: {
		color: "#FF006E",
		delay: 250,
		includeCSS: true,
		showSpinner: false
	}
});
