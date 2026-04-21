import { motion } from "framer-motion";
import { Sparkles, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

const interests = [
  "Entertainment",
  "Nature",
  "Devotional",
  "Historical",
  "Food"
];

function PlannerForm({ onGenerateTrip, isLoading, prefillDestination }) {
  const [formData, setFormData] = useState({
    destination: "",
    source: "",
    source_lat: null,
    source_lon: null,
    start_date: "",
    end_date: "",
    budget: "",
    travel_type: "solo",
    start_time: "",
    interests: ["Nature", "Historical"],
  });

  useEffect(() => {
    if (prefillDestination) {
      setFormData((prev) => ({ ...prev, destination: prefillDestination }));
    }
  }, [prefillDestination]);

  const handleChipToggle = (value) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter((item) => item !== value)
        : [...prev.interests, value],
    }));
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setFormData(prev => ({ ...prev, source_lat: lat, source_lon: lon, source: "Fetching location..." }));
      
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const data = await res.json();
        if (data && data.address) {
          const city = data.address.city || data.address.town || data.address.village || data.display_name.split(',')[0];
          setFormData(prev => ({ ...prev, source: city }));
        } else {
          setFormData(prev => ({ ...prev, source: "Current Location" }));
        }
      } catch (e) {
        setFormData(prev => ({ ...prev, source: "Current Location" }));
      }
    }, () => {
      alert("Unable to retrieve your location. Please check browser permissions.");
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.destination || !formData.start_date || !formData.end_date) {
      alert("Please fill destination and dates");
      return;
    }

    const payload = {
      destination: formData.destination,
      source: formData.source || "",
      source_lat: formData.source_lat,
      source_lon: formData.source_lon,
      start_time: formData.start_time || "",
      start_date: formData.start_date,
      end_date: formData.end_date,
      budget: parseInt(formData.budget) || 0,
      travel_type: formData.travel_type,
      interests: formData.interests,
    };

    onGenerateTrip(payload);
  };

  const MotionForm = motion.form;

  return (
    <section id="planner" className="-mt-24 px-4 pb-14 md:-mt-32 md:pb-20">
      <MotionForm
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto w-full max-w-2xl rounded-3xl border border-white/35 bg-white/70 p-4 shadow-glass backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/75 md:p-5"
      >
        <h2 className="mb-4 text-center text-2xl font-bold text-slate-800 dark:text-white">
          Travel Planner
        </h2>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold">Destination</label>
            <input
              value={formData.destination}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, destination: event.target.value }))
              }
              className="w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-purple"
              placeholder="e.g., Hyderabad"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="mb-1 block text-sm font-semibold">Starting From</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.source}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, source: event.target.value, source_lat: null, source_lon: null }))
                }
                placeholder="City or Street"
                className="w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-purple"
              />
              <button
                type="button"
                onClick={handleUseLocation}
                title="Use Current Location"
                className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-3 text-slate-600 hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition"
              >
                <MapPin className="h-4 w-4" />
              </button>
            </div>
          </div>

          <InputField
            label="Start Time"
            type="time"
            value={formData.start_time}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, start_time: event.target.value }))
            }
          />

          <InputField
            label="Start Date"
            type="date"
            value={formData.start_date}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, start_date: event.target.value }))
            }
          />

          <InputField
            label="End Date"
            type="date"
            value={formData.end_date}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, end_date: event.target.value }))
            }
          />

          <InputField
            label="Max Budget (INR)"
            type="number"
            min="0"
            value={formData.budget}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, budget: event.target.value }))
            }
            placeholder="e.g. 5000"
          />

        </div>

        <div className="mt-4">
          <p className="mb-2 text-sm font-semibold">Interests</p>
          <div className="flex flex-wrap gap-2">
            {interests.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleChipToggle(item)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  formData.interests.includes(item)
                    ? "bg-brand-gradient text-white"
                    : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          type="submit"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient px-5 py-3 font-semibold text-white shadow-lg transition"
        >
          <Sparkles className="h-4 w-4" />
          {isLoading ? "Generating..." : "Generate Plan"}
        </motion.button>
      </MotionForm>
    </section>
  );
}

function InputField({ label, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold">{label}</label>
      <input
        {...props}
        className="w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-purple"
        required={props.type === "date" || props.type === "time"}
      />
    </div>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-purple"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PlannerForm;