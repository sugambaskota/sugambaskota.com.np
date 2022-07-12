import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: any) {
  return (
    <div className="flex h-full w-full flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
