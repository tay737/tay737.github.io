export function Footer() {
  return (
    <footer className="pt-8 pb-24 md:pb-8 flex flex-col items-center justify-center gap-2 text-center text-muted text-sm border-t border-border mt-20">
      <p>© {new Date().getFullYear()} built with React, Tailwind and Framer Motion.</p>
    </footer>
  );
}
