import { Footer } from "./footer/footer";
import { Nav } from "./nav/nav";
import { Header } from "./header/header";

export function Layout() {
    return(
        <>
         <Nav />
         <Header title="vite-project" />

        <main>
            {children}
        </main>

        <Footer />
        <>
    );
}