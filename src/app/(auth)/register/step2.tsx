import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/register/step2")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(auth)/register/step2"!</div>;
}
