import type { H3Event } from "h3";
import { readBody } from "h3";

export default defineEventHandler(async (event: H3Event) => {
	// Extract the dynamic part of the URL from the route parameters
	const { slug } = event.context.params as { slug?: string[] };
	const path = Array.isArray(slug) ? slug.join("/") : slug || "";

	// Preserve query parameters if present
	const originalUrl = event.req.url || "";
	const queryIndex = originalUrl.indexOf("?");
	const query = queryIndex >= 0 ? originalUrl.substring(queryIndex) : "";

	// Construct the target URL (adjust the target domain as needed)
	const targetUrl = `https://iconscout.com/api/v2/${path}${query}`;

	// Determine the request method
	const rawMethod = event.node.req.method || "GET";
	const method = rawMethod.toUpperCase() as
		| "GET"
		| "HEAD"
		| "PATCH"
		| "POST"
		| "PUT"
		| "DELETE"
		| "CONNECT"
		| "OPTIONS"
		| "TRACE";

	// For methods other than GET/HEAD, read the request body
	const body =
		method !== "GET" && method !== "HEAD" ? await readBody(event) : undefined;

	const headers = { ...event.node.req.headers } as HeadersInit;

	// Proxy the request to the external API using $fetch
	const data = await $fetch(targetUrl, {
		method,
		body,
		headers,
	});

	return data;
});
