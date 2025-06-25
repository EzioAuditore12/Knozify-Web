import { createFileRoute } from "@tanstack/react-router";

import { H1 } from "@/components/ui";
import { Stack } from "@/components/ui/layout/stack";

import PhoneInput from "react-phone-input-2";

export const Route = createFileRoute("/(app)/explore")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Stack spacing={"md"} className="p-2">
			<H1>Hello explore</H1>
			<PhoneInput inputClass="border-2 border-black rounded-md " />
		</Stack>
	);
}
