import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/explore")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(app)/explore"!</div>;
}
