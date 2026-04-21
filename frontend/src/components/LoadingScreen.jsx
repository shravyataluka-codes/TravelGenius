import { motion } from "framer-motion";
import { Globe2 } from "lucide-react";

function LoadingScreen({ step, steps }) {
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <section className="px-4 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="mb-5 flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
          >
            <Globe2 className="h-8 w-8 text-brand-purple" />
          </motion.div>
          <div>
            <h3 className="text-lg font-bold">Building your perfect itinerary</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              AI is planning your day-wise route with travel intelligence.
            </p>
          </div>
        </div>

        <div className="mb-4 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <motion.div
            className="h-full rounded-full bg-brand-gradient"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <div className="space-y-2">
          {steps.map((item, index) => (
            <motion.p
              key={item}
              initial={{ opacity: 0.45 }}
              animate={{ opacity: index <= step ? 1 : 0.45 }}
              className={`rounded-lg px-3 py-2 text-sm ${
                index === step
                  ? "bg-indigo-50 font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {index + 1}. {item}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default LoadingScreen;
