import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DefaultCatchBoundry } from "@/components/DefaultCatchBoundry";
import { NotFound } from "@/components/NotFound";
import { seo } from "@/utils/seo";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import appCss from "@/assets/app.css?url";
import { Toaster } from "sonner";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			...seo({
				title: "E - KTP Blockchain",
				description: "E - KTP with security of blockchain",
			}),
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	component: RootComponent,
	errorComponent: DefaultCatchBoundry,
	notFoundComponent: () => <NotFound />,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
			<TanStackRouterDevtools />
		</RootDocument>
	);
}
function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html>
			<head>
				<HeadContent />
			</head>
			<body>
				<Toaster />
				{children}
				<Scripts />
			</body>
		</html>
	);
}
