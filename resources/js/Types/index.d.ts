import routeFn from "ziggy-js";
import Vue from "vue";
import axios, { type AxiosStatic } from "axios";

declare module "ziggy" {
	interface RouteList {
		"sanctum.csrf-cookie": [];
		"ignition.healthCheck": [];
		"ignition.executeSolution": [];
		"ignition.updateConfig": [];
		register: [];
		login: [];
		posts: ["index"];
	}
}

declare global {
	var route: typeof routeFn;
	var axios: AxiosStatic;
	var clipboardData: any;
}

declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$route: typeof routeFn;
	}
}

export {};
