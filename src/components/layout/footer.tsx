export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container flex items-center justify-center h-16">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Attarist E-Boutique. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
