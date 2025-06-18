import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/register/step3")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(auth)/register/step3"!</div>;
}
