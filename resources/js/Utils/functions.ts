import dayjs from "dayjs";
import constants from "./constants";

/**
 * Gera os links de compartilhamento para determinada rede social.
 */
export const shareOn = (type: string, title: string, url: string): string | null => {
	const socialLinks: { [key: string]: string } = {
		twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
		linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
		whatsapp: `https://api.whatsapp.com/send?text=Olha%20que%20artigo%20legal:%20${url}`,
		mail: `mailto:?subject=${title}&body=Veja%20sobre%20esse%20artigo%20em:%20${url}`
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
