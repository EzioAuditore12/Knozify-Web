import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/register/step4")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(auth)/register/step4"!</div>;
}
