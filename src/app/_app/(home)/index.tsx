import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { Button } from "@/components/ui";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui";
import { Progress } from "@/components/ui";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Info } from "lucide-react";
import * as React from "react";

const GITHUB_AVATAR_URI =
	"https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg";

export const Route = createFileRoute("/_app/(home)/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [progress, setProgress] = React.useState(78);

	function updateProgressValue() {
		setProgress(Math.floor(Math.random() * 100));
	}

	return (
		<div className="flex-1 flex justify-center items-center gap-5 p-6 bg-secondary/30 min-h-screen">
			<Card className="w-full max-w-sm p-6 rounded-2xl">
				<CardHeader className="items-center text-center">
					<div className="flex justify-center">
						<Avatar className="w-24 h-24">
							<AvatarImage
								src={GITHUB_AVATAR_URI}
								alt="Rick Sanchez's Avatar"
							/>
							<AvatarFallback>RS</AvatarFallback>
						</Avatar>
					</div>
					<div className="p-3" />
					<CardTitle className="pb-2 text-center">Rick Sanchez</CardTitle>
					<div className="flex flex-row items-center justify-center">
						<CardDescription className="text-base font-semibold">
							Scientist
						</CardDescription>
						<Tooltip delayDuration={150}>
							<TooltipTrigger className="px-2 pb-0.5 active:opacity-50">
								<Info
									size={14}
									strokeWidth={2.5}
									className="w-4 h-4 text-foreground/70"
								/>
							</TooltipTrigger>
							<TooltipContent className="py-2 px-4 shadow">
								<span>Freelance</span>
							</TooltipContent>
						</Tooltip>
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex flex-row justify-around gap-3">
						<div className="items-center text-center">
							<p className="text-sm text-muted-foreground">Dimension</p>
							<p className="text-xl font-semibold">C-137</p>
						</div>
						<div className="items-center text-center">
							<p className="text-sm text-muted-foreground">Age</p>
							<p className="text-xl font-semibold">70</p>
						</div>
						<div className="items-center text-center">
							<p className="text-sm text-muted-foreground">Species</p>
							<p className="text-xl font-semibold">Human</p>
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex-col gap-3 pb-0">
					<div className="flex flex-row items-center overflow-hidden">
						<span className="text-sm text-muted-foreground">Productivity:</span>
						<AnimatePresence mode="wait">
							<motion.div
								key={progress}
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 20 }}
								transition={{ duration: 0.2 }}
								className="w-11 flex items-center justify-center"
							>
								<span className="text-sm font-bold text-sky-600">
									{progress}%
								</span>
							</motion.div>
						</AnimatePresence>
					</div>
					<Progress value={progress} className="h-2" />
					<div />
					<Button
						variant="outline"
						className="shadow shadow-foreground/5"
						onClick={updateProgressValue}
					>
						Update
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
