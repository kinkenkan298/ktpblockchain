import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";
import type { ReactNode } from "react";
import { DefaultCatchBoundry } from "@/components/DefaultCatchBoundry";
import { NotFound } from "@/components/NotFound";
import { seo } from "@/utils/seo";

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
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon-32x32.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/favicon-16x16.png",
			},
			{ rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
			{ rel: "icon", href: "/favicon.ico" },
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
				<Toaster position="top-center" richColors />
				{children}
				<TanStackDevtools
					config={{ hideUntilHover: true }}
					plugins={[FormDevtoolsPlugin()]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
