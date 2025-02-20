import { type Ref, unref } from "vue";

export type UnwrapRefs<T> = {
	[K in keyof T]: T[K] extends Ref<infer V> ? V : T[K];
};

export const unwrapRefs = <T extends Record<string, Ref<unknown>>>(
	refObject: T,
): UnwrapRefs<T> => {
	return Object.fromEntries(
		Object.entries(refObject).map(([key, value]) => [key, unref(value)]),
	) as UnwrapRefs<T>;
};
