import type { ObjectPlugin } from "#app";
import * as LottiePlayer from "@lottiefiles/lottie-player";

export default defineNuxtPlugin(
	(() => LottiePlayer) as unknown as ObjectPlugin,
);
