import { Clock3, IndianRupee, SunMedium } from "lucide-react";
import { motion } from "framer-motion";

function DayCard({ day }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md dark:border-slate-700 dark:bg-slate-900"
    >
      <h3 className="mb-4 text-xl font-bold">{day.dayTitle}</h3>
      <div className="space-y-4">
        {day.places.map((place) => (
          <div
            key={`${day.dayTitle}-${place.name}`}
            className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/65"
          >
            <h4 className="text-lg font-semibold">{place.name}</h4>
            <div className="mt-2 grid gap-2 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-3">
              <p className="flex items-center gap-2">
                <SunMedium className="h-4 w-4 text-amber-500" />
                Best Time: {place.bestTime}
              </p>
              <p className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-sky-500" />
                Duration: {place.duration}
              </p>
              <p className="flex items-center gap-2">
                <IndianRupee className="h-4 w-4 text-emerald-500" />
                Cost: {place.cost}
              </p>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Reason: {place.reason}
            </p>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

export default DayCard;
