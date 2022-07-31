export default function Footer() {
  return (
    <footer className="bg-neutral-100 text-black transition-all duration-500 dark:bg-neutral-700 dark:text-white">
      <div className="container py-2 text-center">
        &copy; {new Date().getFullYear()} Sugam Baskota
      </div>
    </footer>
  );
}
