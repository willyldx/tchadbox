import { useAuth } from "@clerk/vue";
import { j as useRuntimeConfig } from "../server.mjs";
function useBackendApi() {
  const auth = useAuth();
  const fetchWithAuth = async (path, options = {}) => {
    let token = "";
    try {
      token = await auth.getToken.value() || "";
    } catch (e) {
      console.error("Clerk token fetch failed in useBackendApi", e);
    }
    const config = useRuntimeConfig();
    const baseUrl = config.public.backendUrl || "http://localhost:8000";
    const url = path.startsWith("http") ? path : `${baseUrl}/${path}`;
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
    /** GET /api/admin/orders */
    adminOrders: (params) => fetchWithAuth(
      "api/admin/orders",
      { query: params }
    ),
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
//# sourceMappingURL=useBackendApi-BuVuRWAl.js.map
