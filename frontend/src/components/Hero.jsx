import { motion } from "framer-motion";

function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-4"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(2,6,23,0.6), rgba(2,6,23,0.85)), url('https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2000&auto=format&fit=crop')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto max-w-4xl text-center text-white"
      >
        <motion.h1
          className="text-4xl font-extrabold leading-tight md:text-6xl"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          Plan Smarter. <span className="text-indigo-300">Travel Better.</span>
        </motion.h1>
        <p className="mt-6 text-base text-slate-100 md:text-xl">
          Create personalized AI travel itineraries in seconds with budgets,
          dates, preferences, and route intelligence.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#planner"
            className="rounded-full bg-brand-gradient px-7 py-3 font-semibold text-white shadow-lg shadow-indigo-500/40 transition hover:scale-[1.03]"
          >
            Start Planning
          </a>
          <a
            href="#explore"
            className="rounded-full border border-white/45 bg-white/20 px-7 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/30"
          >
            Explore Destinations
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
