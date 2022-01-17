const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "/jobs/:id", component: () => import("pages/View.vue") },
      { path: "/jobs/create", component: () => import("pages/Create.vue") },
      { path: "/jobs/:id/update", component: () => import("pages/Update.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
