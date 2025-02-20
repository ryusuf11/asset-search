// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	image: {
		format: ["webp"],
		domains: [],
	},
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	modules: [
		"@bootstrap-vue-next/nuxt",
		"@nuxt/image",
		"@pinia/nuxt",
		"@nuxt/icon",
	],
	css: ["bootstrap/dist/css/bootstrap.min.css", "~/assets/styles/global.scss"],
	vue: {
		compilerOptions: {
			isCustomElement: (tag: string) => ["lottie-player"].includes(tag),
		},
	},
	icon: {
		customCollections: [
			{
				prefix: "icon",
				dir: "./assets/icons",
			},
		],
	},
});
