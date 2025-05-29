import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-lavender-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <div className="text-slate-600 dark:text-slate-400 text-center md:text-left">
          © {new Date().getFullYear()} Lock The Day. All rights reserved.
        </div>
        <div className="flex gap-4 justify-center md:justify-end">
          <Link
            to="/about"
            className="text-slate-600 dark:text-slate-400 hover:text-lavender-600 dark:hover:text-lavender-400 transition-colors"
          >
            About
          </Link>
          <Link
            to="/gallery"
            className="text-slate-600 dark:text-slate-400 hover:text-lavender-600 dark:hover:text-lavender-400 transition-colors"
          >
            Gallery
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;