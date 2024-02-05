import dayjs from "dayjs";
import constants from "./constants";
import { exportFile, useQuasar, type QTable } from "quasar";

/**
 * Gera os links de compartilhamento para determinada rede social.
 */
export const shareOn = (type: string, title: string, url: string, text: string): string | null => {
	const encoded = encodeURI(text);
	const socialLinks: { [key: string]: string } = {
		twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
		linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
		whatsapp: `https://api.whatsapp.com/send?text=${encoded}:%20${url}`,
		mail: `mailto:?subject=${title}&body=${encoded}:%20${url}`
	};

	if (type in socialLinks) return socialLinks[type];

	return null;
};

/**
 * Converte a entrada em Bytes para alguma unidade maior e legível.
 */
export const formatBytes = (bytes: number, minimal: boolean = true): [number, string] => {
	if (!bytes) bytes = 0;

	const sizes = {
		B: "bytes",
		KB: "kilobytes",
		MB: "megabytes",
		GB: "gigabytes",
		TB: "terabytes"
	};

	let result = bytes;
	let names = Object.entries(sizes)[0];
	let total = Object.keys(sizes).length;

	for (let i = 1; i <= total; i++) {
		if (bytes >= Math.pow(1024, i + 1) && i < total) continue;

		result = bytes / Math.pow(1024, i);
		names = Object.entries(sizes)[i];
		break;
	}

	return [result, names[Number(minimal)]];
};

/**
 * Junta um array de string de uma forma bonita.
 */
export const joinEnum = (array: string[], end: "e" | "ou" = "e"): string => {
	if (array.length === 1) return array[0];

	const final = array.slice(-2);
	const all = [...array.slice(0, -2), final.join(` ${end} `)];
	return all.join(", ");
};

/**
 * Faz a validação de um arquivo, tanto em tamanho quanto formato.
 */
export const validateFile = (
	file: File,
	formats: string[] = constants.ACCEPTED_IMAGE_FORMATS
): void => {
	const [maxSize, maxSizeName] = formatBytes(constants.MAX_UPLOAD_SIZE_BYTES);

	if (file.size > constants.MAX_UPLOAD_SIZE_BYTES)
		throw new Error(
			`Não é permitido o envio de arquivos maiores que ${maxSize} ${maxSizeName}`
		);

	const mime = file.type;
	const ext = mime.split("/").pop() ?? "void";

	if (!formats.includes(ext))
		throw new Error(
			`Não é permitido o envio de arquivos que não sejam: ${joinEnum(formats, "ou")}`
		);
};

/**
 * Transforma a data do servidor em uma data legível.
 */
export const formatDatetime = (val: string): string => {
	if (!val) return "-";

	return dayjs(val).format("DD/MM/YYYY HH:mm:ss");
};

/**
 * Transforma um valor em moeda.
 */
export const toCurrency = (val: string | number) => {
	if (!val) return val;
	if (typeof val !== "number") return val;

	var formatter = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL"
	});
	return formatter.format(val);
};

/**
 * Transforma um valor em decimal local.
 */
export const toFixed = (val: string | number) => {
	if (typeof val !== "number") return val;

	var formatter = new Intl.NumberFormat("pt-BR", {
		maximumFractionDigits: 2,
		minimumFractionDigits: 2
	});
	return formatter.format(val);
};

export const wrapCsvValue = (val: any, formatFn?: any, row?: any) => {
	let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

	formatted = formatted === void 0 || formatted === null ? "" : String(formatted);

	formatted = formatted.split('"').join('""');

	return `"${formatted}"`;
};

export const exportTable = (columns: QTable["columns"], rows: any) => {
	const $q = useQuasar();

	if (!columns) return;

	// naive encoding to csv format
	const content = [columns.map((col) => wrapCsvValue(col.label))]
		.concat(
			rows.map((row: any) =>
				columns
					.map((col) =>
						wrapCsvValue(
							typeof col.field === "function"
								? col.field(row)
								: row[col.field === void 0 ? col.name : col.field],
							col.format,
							row
						)
					)
					.join(",")
			)
		)
		.join("\r\n");

	const status = exportFile("tabela-de-juros-compostos.csv", content, "text/csv");

	if (status !== true) {
		$q.notify({
			message: "O navegador recusou o download do arquivo...",
			color: "negative",
			icon: "warning"
		});
	}
};
