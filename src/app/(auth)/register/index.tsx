import { H1, H2 } from "@/components/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/register/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col flex-1 bg-red-500">
			<div className="flex-1 bg-blue-500">
				<H1>hELLO</H1>
			</div>
			<div className="flex-[0.2] bg-pink-500">
				<H2>hELLO</H2>
			</div>
		</div>
	);
}
