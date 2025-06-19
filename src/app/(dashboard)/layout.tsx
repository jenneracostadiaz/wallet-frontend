import {ReactNode} from "react";

interface DashboardLayoutProps {
	children: ReactNode;
}

export default function DashboardLayout({children}: DashboardLayoutProps) {
	return (
		<main>
			Hello World
			{children}
		</main>
	);
}