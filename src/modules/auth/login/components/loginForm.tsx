import { Button, H2, Muted } from "@/components/ui";
import { Stack } from "@/components/ui/layout/stack";
import { useAppForm } from "@/lib/useAppForm";

import { loginUserObject, loginUserSchema } from "../schemas";

/**
 * LoginForm
 *
 * Features:
 * 1. Renders a login form with “username” and “password” fields.
 * 2. Uses `useAppForm` for schema-based validation.
 * 3. Applies default values from `loginUserObject`.
 * 4. On submit, logs `{ username, password }` to the console.
 *
 * Usage:
 *   <LoginForm />
 */
export function LoginForm() {
	const LoginForm = useAppForm({
		defaultValues: loginUserObject,
		validators: { onChange: loginUserSchema },
		onSubmit: ({ value }) => console.log(value),
	});

	return (
		<form
			className="flex flex-col gap-4 justify-center items-center"
			onSubmit={(e) => {
				e.preventDefault();
				LoginForm.handleSubmit();
			}}
		>
			<Stack justify="center" align="center">
				<H2 className="font-bold">Welcome back</H2>
				<Muted>Login to your Acme Inc account</Muted>
			</Stack>

			<LoginForm.AppField name="username">
				{(field) => <field.TextField className="mt-2" placeholder="name@123" />}
			</LoginForm.AppField>

			<LoginForm.AppField name="password">
				{(field) => <field.TextField type="password" />}
			</LoginForm.AppField>

			<Button type="submit" className="w-full">
				Login
			</Button>
		</form>
	);
}
