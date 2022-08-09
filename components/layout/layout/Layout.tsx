import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: any) {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1 bg-neutral-100 transition-colors duration-500 dark:bg-neutral-700 dark:text-white">
        {children}
      </main>
      <Footer />
    </div>
  );
}
