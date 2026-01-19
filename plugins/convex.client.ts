import { ConvexClient } from "convex/browser";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  
  const convex = new ConvexClient(config.public.convexUrl);

  return {
    provide: {
      convex,
    },
  };
});
