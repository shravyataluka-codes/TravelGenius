import RouteMap from './RouteMap';

function Itinerary({ result }) {
  const days = Array.isArray(result?.days) ? result.days : [];

  if (days.length === 0) {
    return (
      <section id="about" className="px-4 pb-16">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white/90 p-4 shadow-md backdrop-blur dark:bg-slate-900/80">
          <h2 className="mb-4 text-2xl font-bold">Itinerary Result</h2>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-200">
            <p className="font-semibold">No itinerary could be generated.</p>
            <p className="mt-2 text-sm">
              We couldn't find any places matching your exact criteria. This usually happens if your <b>Max Budget (INR)</b> is too low to cover entry and travel costs from your starting point, or if there are no attractions matching your selected interests nearby. Try increasing your budget or selecting more interests!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="px-4 pb-16">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white/90 p-4 shadow-md backdrop-blur dark:bg-slate-900/80">
        <h2 className="mb-4 text-2xl font-bold">Itinerary Result</h2>

        {(result?.source != null && result.source !== "") ||
        (result?.start_time != null && result.start_time !== "") ||
        (result?.vehicle_suggestion != null && result.vehicle_suggestion !== "") ||
        (result?.route_summary != null && result.route_summary !== "") ||
        (result?.distance_km != null && result.distance_km > 0) ||
        (result?.weather != null && result.weather !== "") ? (
          <div className="mb-4 space-y-1 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-600 dark:bg-slate-800/60">
            {result.distance_km != null && result.distance_km > 0 && (
              <p>
                <span className="font-semibold">Distance:</span> {result.distance_km} km
              </p>
            )}
            {result.source != null && result.source !== "" && (
              <p>
                <span className="font-semibold">Source:</span> {result.source}
              </p>
            )}
            {result.start_time != null && result.start_time !== "" && (
              <p>
                <span className="font-semibold">Start Time:</span> {result.start_time}
              </p>
            )}
            {result.vehicle_suggestion != null && result.vehicle_suggestion !== "" && (
              <p>
                <span className="font-semibold">Vehicle:</span> {result.vehicle_suggestion}
              </p>
            )}
            {result.route_summary != null && result.route_summary !== "" && (
              <p>
                <span className="font-semibold">Route:</span> {result.route_summary}
              </p>
            )}
            {result.weather != null && result.weather !== "" && (
              <p>
                <span className="font-semibold text-blue-500">Live Weather:</span> {result.weather}
              </p>
            )}
          </div>
        ) : null}

        <RouteMap result={result} />

        <div className="space-y-4 mt-6">
          {days.map((dayItem) => (
            <div key={`day-${dayItem.day}`} className="rounded-xl border p-3 dark:border-slate-700">
              <h3 className="font-semibold">Day {dayItem.day}</h3>
              <div className="mt-4">
                {(dayItem.places || []).map((place, pIndex) => (
                  <div key={`${dayItem.day}-${pIndex}`} className="mb-6 last:mb-0">
                    {place.transit_instruction && (
                      <div className="mb-3 ml-4 flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                          ↓
                        </div>
                        <span>{place.transit_instruction} <span className="font-bold text-slate-800 dark:text-slate-200">· ₹{place.travel_cost}</span></span>
                      </div>
                    )}
                    
                    <div className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900/80">
                      <div className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient font-bold text-white shadow-md">
                        {pIndex + 1}
                      </div>
                      <div className="ml-3">
                        <h5 className="text-lg font-bold text-slate-800 dark:text-white">
                          {place.name}
                        </h5>
                        <div className="mt-2 flex flex-wrap gap-2 text-xs">
                          <span className="rounded-md bg-slate-100 px-2 py-1 font-medium dark:bg-slate-800 dark:text-slate-300">
                            {place.visit_time}
                          </span>
                          {place.entry_cost > 0 && (
                            <span className="rounded-md bg-rose-50 px-2 py-1 font-semibold text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                              Entry: ₹{place.entry_cost}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-sm font-semibold">Day travel cost: {dayItem.travel_cost}</p>
            </div>
          ))}
        </div>

        {result && "total_cost" in result && result.total_cost != null && result.total_cost > 0 && (
          <div className="mt-4 rounded-lg bg-slate-100 p-4 shadow-sm dark:bg-slate-800">
            <h3 className="text-lg font-bold">Estimated Total Cost</h3>
            <p className="text-2xl font-extrabold text-brand-purple dark:text-brand-yellow">
              ₹{result.total_cost}
            </p>
            {result.cost_explanation && (
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {result.cost_explanation}
              </p>
            )}
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
              *Estimates do not include flights or hotels. Actual local fares may vary.
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-center print:hidden">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-indigo-500/40"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            Download Itinerary as PDF
          </button>
        </div>
      </div>
    </section>
  );
}

export default Itinerary;
