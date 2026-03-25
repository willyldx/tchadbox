import { j as useRuntimeConfig } from "../server.mjs";
function useBackendApi() {
  const getBaseUrl = () => {
    const config = useRuntimeConfig();
    let url = config.public.apiUrl || "https://api.spencerai.tech";
    url = url.replace(/\/api\/?$/, "");
    url = url.replace(/\/$/, "");
    return url;
  };
  const fetchWithAuth = async (path, options = {}) => {
    let token = "";
    try {
      if (false) ;
    } catch (e) {
      console.error("Clerk token fetch failed in useBackendApi", e);
    }
    const baseUrl = getBaseUrl();
    let cleanPath = path.replace(/^\/+/, "");
    if (!cleanPath.startsWith("api/")) {
      cleanPath = `api/${cleanPath}`;
    }
    const url = `${baseUrl}/${cleanPath}`;
    return $fetch(url, {
      method: options.method || "GET",
      body: options.body,
      query: options.query,
      headers: token ? { Authorization: `Bearer ${token}` } : void 0
    });
  };
  return {
    fetchWithAuth,
    /** POST /api/checkout — peut être appelé sans token (invité). */
    checkout: (body) => $fetch("/api/checkout", {
      method: "POST",
      body
    }),
    /** GET /api/admin/stats */
    adminStats: () => fetchWithAuth("api/admin/stats"),
    // ── Orders ──────────────────────────────────────────────
    /** GET /api/admin/orders */
    adminOrders: (params) => fetchWithAuth(
      "api/admin/orders",
      { query: params }
    ),
    /** GET /api/admin/orders/:id */
    adminOrderDetail: (id) => fetchWithAuth(`api/admin/orders/${id}`),
    /** PATCH /api/admin/orders/:id */
    adminOrderUpdate: (id, body) => fetchWithAuth(`api/admin/orders/${id}`, { method: "PATCH", body }),
    // ── Clients ─────────────────────────────────────────────
    /** GET /api/admin/clients */
    adminClients: (params) => fetchWithAuth("api/admin/clients", { query: params }),
    // ── Stocks ──────────────────────────────────────────────
    /** POST /api/admin/upload */
    adminUploadFile: (file) => {
      const formData = new FormData();
      formData.append("image", file);
      return fetchWithAuth("api/admin/upload", {
        method: "POST",
        body: formData
      });
    },
    /** GET /api/admin/stocks */
    adminStocks: () => fetchWithAuth("api/admin/stocks"),
    /** PATCH /api/admin/stocks/:id */
    adminStockUpdate: (id, body) => fetchWithAuth(`api/admin/stocks/${id}`, { method: "PATCH", body }),
    /** POST /api/admin/products */
    adminProductCreate: (body) => fetchWithAuth("api/admin/products", { method: "POST", body }),
    /** DELETE /api/admin/products/:id */
    adminProductDelete: (id) => fetchWithAuth(`api/admin/products/${id}`, { method: "DELETE" }),
    // ── Livreurs ────────────────────────────────────────────
    /** GET /api/admin/livreurs */
    adminLivreurs: () => fetchWithAuth("api/admin/livreurs"),
    /** POST /api/admin/livreurs */
    adminLivreurCreate: (body) => fetchWithAuth("api/admin/livreurs", { method: "POST", body }),
    /** PATCH /api/admin/livreurs/:id */
    adminLivreurUpdate: (id, body) => fetchWithAuth(`api/admin/livreurs/${id}`, { method: "PATCH", body }),
    /** DELETE /api/admin/livreurs/:id */
    adminLivreurDelete: (id) => fetchWithAuth(`api/admin/livreurs/${id}`, { method: "DELETE" }),
    // ── Finances & Team ─────────────────────────────────────
    /** GET /api/admin/finances */
    adminFinances: () => fetchWithAuth("api/admin/finances"),
    /** GET /api/admin/team */
    adminTeam: () => fetchWithAuth("api/admin/team"),
    /** POST /api/admin/team/promote */
    adminPromoteTeam: (targetId, role) => fetchWithAuth("api/admin/team/promote", { method: "POST", body: { target_user_id: targetId, new_role: role } }),
    /** GET /api/livreur/orders */
    livreurOrders: (params) => fetchWithAuth("api/livreur/orders", { query: params }),
    /** PATCH /api/livreur/orders/:id */
    livreurOrderUpdate: (id, body) => fetchWithAuth(`api/livreur/orders/${id}`, { method: "PATCH", body })
  };
}
export {
  useBackendApi as u
};
//# sourceMappingURL=useBackendApi-Dq4zIPvK.js.map
