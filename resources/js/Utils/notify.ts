import { Notify, type QNotifyCreateOptions } from "quasar";

/**
 * Exibe um toast genérico utilizando a API Notify do Quasar.
 */
export const showNotify = (
	opt: string | QNotifyCreateOptions,
	defaultConfig: QNotifyCreateOptions
) => {
	if (typeof opt === "string") return Notify.create({ ...defaultConfig, message: opt });

	Notify.create({ ...defaultConfig, ...opt });
};

/**
 * Exibe um toast de erro no canto inferior direito.
 */
export const showErrorNotify = (opt: string | QNotifyCreateOptions) => {
	const defaultConfig: QNotifyCreateOptions = {
		position: "bottom-right",
		type: "negative",
		group: "error"
	};

	showNotify(opt, defaultConfig);
};

/**
 * Exibe um toast de sucesso no canto inferior direito.
 */
export const showSuccessNotify = (opt: string | QNotifyCreateOptions) => {
	const defaultConfig: QNotifyCreateOptions = {
		position: "bottom-right",
		type: "positive",
		group: "success"
	};

	showNotify(opt, defaultConfig);
};
