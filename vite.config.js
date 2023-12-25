import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import path from "path";

export default defineConfig({
	resolve: {
		alias: {
			"ziggy-vue": path.resolve(__dirname, "vendor/tightenco/ziggy/dist/vue.es.js"),
			"ziggy-js": path.resolve(__dirname, "vendor/tightenco/ziggy/dist/index.es.js")
		},
		optimizeDeps: ["ziggy-js, ziggy-vue"]
	},
	plugins: [
		laravel({
			input: "resources/js/app.ts",
			refresh: true
		}),
		vue({
			template: {
				transformAssetUrls
			},
			script: {
				defineModel: true,
				propsDestructure: true
			}
		}),
		quasar({
			sassVariables: "resources/sass/quasar-variables.sass"
		})
	]
});
