import Footer from "../landing/footer/footer";
import Nav from "../landing/nav/nav";
import Header from "../landing/header/header";
import type { ReactNode } from "react";

interface Props {
    title: string;
    children: ReactNode;
};

export function Layout({children}: Props) {
    return (
        <>
            <Nav />
            <Header title="vite-project" />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}