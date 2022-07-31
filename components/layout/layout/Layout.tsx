import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: any) {
  return (
    <div className="flex h-full w-full flex-col">
      <Header />
      <main className="flex-1 bg-neutral-100 transition-all duration-500 dark:bg-neutral-700 dark:text-white">
        {children}
      </main>
      <Footer />
    </div>
  );
}
