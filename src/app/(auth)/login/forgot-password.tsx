import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/login/forgot-password")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(auth)/login/forgot-password"!</div>;
}
