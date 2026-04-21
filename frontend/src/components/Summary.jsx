import { motion } from "framer-motion";
import { Backpack, CalendarDays, CloudSun, Lightbulb, Wallet } from "lucide-react";

const summaryMeta = [
  { key: "totalEstimatedCost", label: "Total Estimated Cost", icon: Wallet },
  { key: "weatherHint", label: "Weather Hint", icon: CloudSun },
  { key: "travelTips", label: "Travel Tips", icon: Lightbulb },
  { key: "bestSeason", label: "Best Season", icon: CalendarDays },
  { key: "packingTips", label: "Packing Tips", icon: Backpack },
];

function Summary({ data }) {
  return (
    <section className="mt-10">
      <h3 className="mb-4 text-2xl font-bold">Trip Summary</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {summaryMeta.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md dark:border-slate-700 dark:bg-slate-900"
            >
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-purple">
                <Icon className="h-4 w-4" />
                {item.label}
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">{data[item.key]}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default Summary;
