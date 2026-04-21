import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Itinerary from "./components/Itinerary";
import Navbar from "./components/Navbar";
import PlannerForm from "./components/PlannerForm";
import Explore from "./components/Explore";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [prefillDestination, setPrefillDestination] = useState("");

  const handleExploreClick = (destinationName) => {
    setPrefillDestination(destinationName);
    document.getElementById("planner")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleGenerateTrip = async (payload) => {
    setLoading(true);
    setResult(null);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Invalid JSON response from server.");
      }

      if (!response.ok) {
        const detail = data?.detail ?? data?.message ?? data?.error;
        throw new Error(
          typeof detail === "string" ? detail : `Request failed with status ${response.status}`,
        );
      }

      if (data.error) {
        setError(String(data.error));
      }
      if (data.message) {
        setMessage(String(data.message));
      }
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-white">
      <div className="print:hidden">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Hero />
        <PlannerForm onGenerateTrip={handleGenerateTrip} isLoading={loading} prefillDestination={prefillDestination} />
        <Explore onExploreClick={handleExploreClick} />
      </div>
      {loading && (
        <p className="pb-10 text-center text-lg font-medium print:hidden">Generating your plan...</p>
      )}
      {!loading && error && <p className="pb-6 text-center text-red-500 print:hidden">{error}</p>}
      {!loading && message && <p className="pb-6 text-center text-amber-600 dark:text-amber-400 print:hidden">{message}</p>}
      {!loading && result && <Itinerary result={result} />}
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}

export default App;
