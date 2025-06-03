//TailwindCSS Imports
import "./index.css";

import { RouterProvider, createRouter } from "@tanstack/react-router";

// Progress Bar
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Configure NProgress
NProgress.configure({
	showSpinner: false,
	minimum: 0.1,
	easing: "ease",
	speed: 200,
});

// Create a new router instance
const router = createRouter({
	defaultPreload: "intent",
	routeTree,
	defaultPendingMs: 200,
	defaultPendingMinMs: 100,
});

// Router events
router.subscribe("onBeforeLoad", ({ pathChanged }) => {
	if (pathChanged) NProgress.start();
});

router.subscribe("onLoad", () => {
	NProgress.done();
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

//Theme wrapper
export default function App() {
	return <RouterProvider router={router} />;
}
