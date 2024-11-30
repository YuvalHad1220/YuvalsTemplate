import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import App from "./App";
import Dashboard from "./Views/Dashboard/Dashboard";
import Videos from "./Views/Videos/Videos";
import Accidents from "./Views/Accidents/Accidents";
import TechincalLiterature from "./Views/TechnicalLiterature/TechincalLiterature";
import DataGrid, { reportsLoader } from "./Views/Reports/Reports";
import { dashboardLoader } from "./Views/Dashboard/loaders";
import { accidentsLoader } from "./Views/Accidents/loaders";
import { videoLoader } from "./Views/Videos/loaders";
import { techincalLiteratureLoader } from "./Views/TechnicalLiterature/loaders";

// Create the root route
const rootRoute = createRootRoute({
  component: App,
});

// Create the dashboard route
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  loader: dashboardLoader,
  component: Dashboard,
});
// Create the table route
const videosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/videos",
  loader: videoLoader,
  component: Videos,
});
const accidentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/accidents",
  loader: accidentsLoader,
  component: Accidents,
});
const literatureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/literature",
  loader: techincalLiteratureLoader,
  component: TechincalLiterature,
});

const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reports",
  loader: reportsLoader,
  component: DataGrid,
});


// Create catch-all route for 404s
const catchAllRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: () => "error",
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  dashboardRoute,
  videosRoute,
  accidentsRoute,
  literatureRoute,
  reportsRoute,
  catchAllRoute,
]);

// Create the router with the route tree
const router = createRouter({
  routeTree,
});

// Register your router for maximum type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
