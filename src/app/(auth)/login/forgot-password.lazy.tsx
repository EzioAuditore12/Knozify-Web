import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(auth)/login/forgot-password")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(auth)/login/forgot-password"!</div>;
}
