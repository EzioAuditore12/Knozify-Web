import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Card, CardContent, Muted } from "@/components/ui";
import { Stack } from "@/components/ui/layout/stack";
import {
	AuthLogin,
	LoginBanner,
	LoginForm,
} from "@/modules/auth/login/components";

export const Route = createLazyFileRoute("/(auth)/login/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="min-h-svh flex flex-col justify-center items-center p-2 w-full">
			<Card className="overflow-hidden p-0 w-full max-w-4xl">
				<CardContent className="grid p-0 md:grid-cols-2">
					<Stack className="p-6 md:p-8 " spacing={"md"}>
						<LoginForm />

						<Muted className="text-center">Or Continue With</Muted>

						<AuthLogin />

						<div className="text-center text-sm">
							Don't have an account?{" "}
							<Link to="/register" className="underline underline-offset-4">
								Sign up
							</Link>
						</div>
					</Stack>

					<LoginBanner />
				</CardContent>
			</Card>
		</div>
	);
}
