import { CurrencyDisplay, ValueScaling } from "vue-currency-input";

const constants = {
	SHARE_BUTTONS_ICONS: {
		twitter: "fab fa-twitter",
		facebook: "fab fa-facebook",
		linkedin: "fab fa-linkedin",
		whatsapp: "fab fa-whatsapp",
		mail: "mail"
	},
	MAX_UPLOAD_SIZE_BYTES: 4 * 1024 * 1024,
	ACCEPTED_IMAGE_FORMATS: ["jpg", "jpeg", "png"],
	CURRENCY_CONFIG: {
		locale: "pt-BR",
		currency: "BRL",
		currencyDisplay: CurrencyDisplay.symbol,
		valueRange: {
			min: 0
		},
		precision: 2,
		hideCurrencySymbolOnFocus: false,
		hideGroupingSeparatorOnFocus: true,
		hideNegligibleDecimalDigitsOnFocus: true,
		autoDecimalDigits: false,
		useGrouping: true,
		accountingSign: false
	}
};

export default constants;
