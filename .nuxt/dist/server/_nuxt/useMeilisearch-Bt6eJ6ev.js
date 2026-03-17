import { MeiliSearch } from "meilisearch";
import { j as useRuntimeConfig } from "../server.mjs";
const useMeilisearch = () => {
  const config = useRuntimeConfig();
  const host = config.public.meilisearchHost;
  const apiKey = config.public.meilisearchKey;
  if (!host || !apiKey) {
    console.warn("Meilisearch configuration missing.");
  }
  const client = new MeiliSearch({
    host: host || "http://localhost:7700",
    apiKey: apiKey || ""
  });
  const index = client.index("products");
  const performSearch = async (query, options = {}) => {
    try {
      const results = await index.search(query, {
        limit: 20,
        ...options
      });
      return results;
    } catch (e) {
      console.error("Meilisearch Error", e);
      return { hits: [], query, estimatedTotalHits: 0 };
    }
  };
  return {
    client,
    index,
    performSearch
  };
};
export {
  useMeilisearch as u
};
//# sourceMappingURL=useMeilisearch-Bt6eJ6ev.js.map
