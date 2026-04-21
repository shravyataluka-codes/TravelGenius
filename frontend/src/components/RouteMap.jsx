import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, LayerGroup } from "react-leaflet";

function buildMapPoints(result) {
  const points = [];
  
  if (result?.source_lat && result?.source_lon) {
    points.push({ name: result.source || "Starting Point", coords: [result.source_lat, result.source_lon], isSource: true });
  }

  (result?.days || []).forEach((day) => {
    (day.places || []).forEach((place) => {
      if (place.lat && place.lon) {
        points.push({ name: place.name, coords: [place.lat, place.lon], isSource: false });
      }
    });
  });

  return points;
}

export default function RouteMap({ result }) {
  const points = buildMapPoints(result);
  const routeGeometry = Array.isArray(result?.route_geometry) ? result.route_geometry : [];
  
  if (points.length === 0 && routeGeometry.length === 0) {
    return null;
  }
  
  // Center on the first point, or fallback to middle of India
  const center = points.length > 0 ? points[0].coords : [20.5937, 78.9629];
  const zoomLevel = points.length > 0 ? 12 : 5;
  const mapKey = `map-${center[0]}-${center[1]}-${points.length}-${routeGeometry.length}`;

  const markers = points.map((point, index) => (
    <CircleMarker
      key={`${point.name}-${index}`}
      center={point.coords}
      radius={8}
      pathOptions={{
        color: point.isSource ? "#7c3aed" : "#2563eb",
        fillColor: point.isSource ? "#7c3aed" : "#2563eb",
        fillOpacity: 0.85,
        weight: 2,
      }}
    >
      <Popup>{point.isSource ? `Source: ${point.name}` : point.name}</Popup>
    </CircleMarker>
  ));

  let polylineLayer = null;
  if (routeGeometry.length > 1) {
    polylineLayer = (
      <Polyline
        positions={routeGeometry}
        pathOptions={{ color: "#f97316", weight: 5, opacity: 0.8 }}
      />
    );
  }

  return (
    <section className="mb-6">
      <h3 className="mb-4 text-xl font-semibold">Route Map</h3>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-900/80">
        <MapContainer key={mapKey} center={center} zoom={zoomLevel} scrollWheelZoom={false} className="h-96 w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LayerGroup>
            {markers}
          </LayerGroup>
          <LayerGroup>
            {polylineLayer}
          </LayerGroup>
        </MapContainer>
      </div>
    </section>
  );
}
