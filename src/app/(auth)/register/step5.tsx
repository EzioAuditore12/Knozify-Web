import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/register/step5")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(auth)/register/step5"!</div>;
}
