import { motion } from "framer-motion";
import { Compass, Moon, Sun } from "lucide-react";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-white/20 bg-white/40 backdrop-blur-xl dark:border-slate-700/40 dark:bg-slate-900/50"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <a href="#home" className="flex items-center gap-2 text-xl font-bold text-brand-purple">
          <Compass className="h-5 w-5" />
          TravelGenius
        </a>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full border border-slate-300 bg-white/80 p-2 text-slate-700 transition hover:scale-105 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </nav>
    </motion.header>
  );
}

export default Navbar;
