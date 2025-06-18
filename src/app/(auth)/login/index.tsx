import { LoginForm } from "@/modules/auth/login/components/loginForm";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/(auth)/login/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex justify-center items-center p-2 w-full">
			<LoginForm className="w-full max-w-[700px]" />
		</div>
	);
}
