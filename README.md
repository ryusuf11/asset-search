# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

---

# Comparison of @lottiefiles/lottie-player and @lottiefiles/dotlottie-vue

Both packages enable to embed Lottie animations into web applications, but they serve slightly different use cases and target different environments.

---

## @lottiefiles/lottie-player

**[NPM Package](https://www.npmjs.com/package/@lottiefiles/lottie-player)**  
**Sample URL:** [https://iconscout-search-seven.vercel.app/lottie-player/people](https://localhost:3000/lottie-player/people)

### Keypoints

- load json files as the source
- render as svg
- framework agnostic
- suited for debugging and simple animation

---

## @lottiefiles/dotlottie-vue

**[NPM Package](https://www.npmjs.com/package/@lottiefiles/dotlottie-vue)**  
**Sample URL:** [https://iconscout-search-seven.vercel.app/lottie/people](https://localhost:3000/lottie/people)

### Keypoints

- load lottie files as the source
- render as canvas
- framework specific
- better for complex animation

## Conclusion

I think it is best to use **@lottiefiles/dotlottie-vue** because:

- it load lottie files which all assets and smaller in size compared to JSON file, also better support for complex animations
- it is rendered as canvas which is more performant than svg

---
