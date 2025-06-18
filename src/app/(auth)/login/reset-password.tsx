import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/login/reset-password")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(auth)/login/reset-password"!</div>;
}
