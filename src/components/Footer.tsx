export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white text-center py-4 border-t border-slate-700 z-40">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {currentYear} CV Hero. All rights reserved. | Developed by{' '}
          <a
            href="https://www.nexorasolutions.website/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors font-medium"
          >
            Nexora Digital Solutions
          </a>
        </p>
      </div>
    </footer>
  );
}
