import React, { useState } from 'react';
import { FieldRecord } from '../../types';
import { Layers, ZoomIn, ZoomOut, RotateCcw, Compass, MapPin, Eye, Waves, Mountain, ShieldAlert } from 'lucide-react';

interface GisMapProps {
  field: FieldRecord;
  mode?: 'field' | 'watershed';
  interactive?: boolean;
  heightClass?: string;
}

export const GisMap: React.FC<GisMapProps> = ({
  field,
  mode = 'field',
  interactive = true,
  heightClass = 'h-80 md:h-96'
}) => {
  const [zoom, setZoom] = useState(mode === 'watershed' ? 0.85 : 1);
  const [mapStyle, setMapStyle] = useState<'terrain' | 'satellite' | 'hydrology'>('terrain');
  const [showBoundary, setShowBoundary] = useState(true);
  const [showSlope, setShowSlope] = useState(true);
  const [showDrainagePath, setShowDrainagePath] = useState(true);
  const [showWatershed, setShowWatershed] = useState(mode === 'watershed');
  const [showWaterBody, setShowWaterBody] = useState(true);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  // SVG coordinate bounding box 0 to 100
  const boundaryPointsStr = field.boundary.map(p => `${p.x * 4},${p.y * 3.5}`).join(' ');

  // Flowline path
  const flowPathD = `M ${field.drainagePathPoints[0].x * 4} ${field.drainagePathPoints[0].y * 3.5} ` +
    field.drainagePathPoints.slice(1).map(p => `L ${p.x * 4} ${p.y * 3.5}`).join(' ');

  return (
    <div className={`relative w-full ${heightClass} bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 shadow-inner select-none font-sans group`}>
      {/* Map Style & Layer Overlays Bar */}
      <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-1.5 bg-stone-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-800/80 text-xs shadow-lg">
        <div className="flex items-center gap-1 mr-2 text-emerald-400 font-semibold tracking-wide">
          <Compass className="w-3.5 h-3.5 animate-spin-slow" />
          <span>GIS RUNOFF MODEL</span>
        </div>
        <div className="flex bg-stone-900 p-0.5 rounded-lg border border-stone-800">
          <button
            onClick={() => setMapStyle('terrain')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
              mapStyle === 'terrain' ? 'bg-emerald-600 text-white shadow' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Terrain
          </button>
          <button
            onClick={() => setMapStyle('satellite')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
              mapStyle === 'satellite' ? 'bg-emerald-600 text-white shadow' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Satellite
          </button>
          <button
            onClick={() => setMapStyle('hydrology')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
              mapStyle === 'hydrology' ? 'bg-emerald-600 text-white shadow' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Hydro Flow
          </button>
        </div>
      </div>

      {/* Layer Toggles Pill */}
      <div className="absolute top-3 right-3 z-20 hidden sm:flex items-center gap-1 bg-stone-950/85 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-stone-800/80 text-xs text-stone-300 shadow-lg">
        <Layers className="w-3.5 h-3.5 text-stone-400 mr-1" />
        <button
          onClick={() => setShowBoundary(!showBoundary)}
          className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition ${
            showBoundary ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60' : 'text-stone-500'
          }`}
        >
          Boundary
        </button>
        <button
          onClick={() => setShowSlope(!showSlope)}
          className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition ${
            showSlope ? 'bg-amber-950 text-amber-300 border border-amber-800/60' : 'text-stone-500'
          }`}
        >
          Slope Vector
        </button>
        <button
          onClick={() => setShowDrainagePath(!showDrainagePath)}
          className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition ${
            showDrainagePath ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60' : 'text-stone-500'
          }`}
        >
          Drainage
        </button>
        <button
          onClick={() => setShowWatershed(!showWatershed)}
          className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition ${
            showWatershed ? 'bg-blue-950 text-blue-300 border border-blue-800/60' : 'text-stone-500'
          }`}
        >
          Watershed
        </button>
      </div>

      {/* Map Zoom Controls */}
      {interactive && (
        <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1.5 bg-stone-950/90 backdrop-blur-md p-1.5 rounded-xl border border-stone-800 shadow-xl">
          <button
            onClick={() => setZoom(prev => Math.min(prev + 0.15, 1.6))}
            className="p-1.5 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(prev => Math.max(prev - 0.15, 0.7))}
            className="p-1.5 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(mode === 'watershed' ? 0.85 : 1)}
            className="p-1.5 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Watermark / Analytical Model Tag */}
      <div className="absolute bottom-3 left-3 z-20 max-w-xs sm:max-w-md bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-800/80 text-[10px] text-stone-400">
        <div className="flex items-center gap-1.5 text-stone-300 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>MODELLED RUNOFF CONNECTIVITY</span>
        </div>
        <p className="line-clamp-1 text-stone-400">
          Analytical drainage trajectory to {field.location.nearbyWaterBodyName}. No actual chemical transport assumed.
        </p>
      </div>

      {/* SVG Canvas Map Rendering */}
      <div
        className="w-full h-full flex items-center justify-center transition-transform duration-300 cursor-crosshair"
        style={{ transform: `scale(${zoom})` }}
      >
        <svg viewBox="0 0 400 300" className="w-full h-full max-w-full max-h-full">
          <defs>
            {/* Terrain Background Gradients */}
            <radialGradient id="terrainGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor={mapStyle === 'satellite' ? '#1c281e' : mapStyle === 'hydrology' ? '#0d1821' : '#1e2d1d'} />
              <stop offset="60%" stopColor={mapStyle === 'satellite' ? '#141c15' : mapStyle === 'hydrology' ? '#090e15' : '#172216'} />
              <stop offset="100%" stopColor="#0b100b" />
            </radialGradient>

            {/* Field Polygon Gradient */}
            <linearGradient id="fieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0.30" />
            </linearGradient>

            {/* Contour Lines Pattern */}
            <pattern id="contourPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 0 10 Q 20 5 40 10 M 0 25 Q 20 30 40 25" fill="none" stroke="#2a3f29" strokeWidth="0.5" strokeOpacity="0.4" />
            </pattern>

            {/* Drainage Flow Arrow Marker */}
            <marker id="flowArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M 0 0 L 6 3 L 0 6 z" fill="#38bdf8" />
            </marker>
          </defs>

          {/* Base Layer */}
          <rect width="400" height="300" fill="url(#terrainGrad)" />
          <rect width="400" height="300" fill="url(#contourPattern)" />

          {/* Elevation Contours (Topography) */}
          <g opacity="0.35" stroke="#3d5a37" strokeWidth="1" fill="none">
            <path d="M 10,40 Q 120,60 220,30 T 390,50" />
            <path d="M 10,90 Q 140,110 260,80 T 390,110" />
            <path d="M 10,150 Q 160,180 280,140 T 390,170" />
            <path d="M 10,210 Q 180,240 300,200 T 390,230" />
            <path d="M 10,260 Q 200,280 320,250 T 390,280" />
          </g>

          {/* Elevation Labels */}
          <text x="20" y="45" fill="#4ade80" fontSize="7" opacity="0.45">684m</text>
          <text x="20" y="105" fill="#4ade80" fontSize="7" opacity="0.45">678m (Field Elevation)</text>
          <text x="20" y="215" fill="#4ade80" fontSize="7" opacity="0.45">664m (Canal Invert)</text>

          {/* Micro-Watershed Catchment Boundary Polygon */}
          {showWatershed && (
            <g>
              <path
                d="M 30,20 C 140,5 290,15 370,45 C 390,120 380,210 350,270 C 270,290 140,280 40,260 C 15,190 20,90 30,20 Z"
                fill="#0284c7"
                fillOpacity="0.06"
                stroke="#0284c7"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <text x="240" y="32" fill="#38bdf8" fontSize="8" fontWeight="600" letterSpacing="0.5">
                MICRO-WATERSHED WS-MDY-04
              </text>
            </g>
          )}

          {/* Nearby Receiving Water Body (Visvesvaraya Canal branch / Shimsha feeder) */}
          {showWaterBody && (
            <g>
              <path
                d="M 280,295 C 310,270 330,230 360,200 C 375,185 390,170 400,165"
                fill="none"
                stroke="#0284c7"
                strokeWidth="7"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d="M 280,295 C 310,270 330,230 360,200 C 375,185 390,170 400,165"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeDasharray="8 4"
                className="animate-pulse"
              />
              <text x="295" y="280" fill="#7dd3fc" fontSize="7" fontWeight="bold">
                Visvesvaraya Feeder Canal
              </text>
            </g>
          )}

          {/* Field Boundary Polygon */}
          {showBoundary && (
            <g
              onMouseEnter={() => setHoveredFeature('field')}
              onMouseLeave={() => setHoveredFeature(null)}
              className="cursor-pointer"
            >
              <polygon
                points={boundaryPointsStr}
                fill="url(#fieldGrad)"
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="1 0"
                className="transition-all hover:stroke-emerald-300"
              />

              {/* Boundary Corner Survey Marker Pins */}
              {field.boundary.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x * 4}
                  cy={p.y * 3.5}
                  r="3"
                  fill="#10b981"
                  stroke="#ffffff"
                  strokeWidth="1"
                />
              ))}

              {/* Center Marker & Label */}
              <circle
                cx={field.drainagePathPoints[0].x * 4}
                cy={field.drainagePathPoints[0].y * 3.5}
                r="4.5"
                fill="#059669"
                stroke="#a7f3d0"
                strokeWidth="1.5"
              />
              <text
                x={field.drainagePathPoints[0].x * 4 + 8}
                y={field.drainagePathPoints[0].y * 3.5 + 4}
                fill="#ffffff"
                fontSize="9"
                fontWeight="bold"
              >
                {field.fieldCode}
              </text>
              <text
                x={field.drainagePathPoints[0].x * 4 + 8}
                y={field.drainagePathPoints[0].y * 3.5 + 14}
                fill="#6ee7b7"
                fontSize="7.5"
              >
                {field.areaAcres} Acres • {field.currentCrop}
              </text>
            </g>
          )}

          {/* Topographic Slope Vectors */}
          {showSlope && (
            <g>
              {/* Slope Arrow 1 */}
              <line
                x1={field.drainagePathPoints[0].x * 4 - 30}
                y1={field.drainagePathPoints[0].y * 3.5 - 20}
                x2={field.drainagePathPoints[0].x * 4 - 10}
                y2={field.drainagePathPoints[0].y * 3.5}
                stroke="#f59e0b"
                strokeWidth="1.8"
                markerEnd="url(#flowArrow)"
              />
              {/* Slope Arrow 2 */}
              <line
                x1={field.drainagePathPoints[0].x * 4 + 20}
                y1={field.drainagePathPoints[0].y * 3.5 - 15}
                x2={field.drainagePathPoints[0].x * 4 + 40}
                y2={field.drainagePathPoints[0].y * 3.5 + 10}
                stroke="#f59e0b"
                strokeWidth="1.8"
                markerEnd="url(#flowArrow)"
              />
              <text
                x={field.drainagePathPoints[0].x * 4 - 45}
                y={field.drainagePathPoints[0].y * 3.5 - 26}
                fill="#fbbf24"
                fontSize="7"
                fontWeight="600"
              >
                Slope {field.location.averageSlopePercent}% ({field.location.slopeAspect})
              </text>
            </g>
          )}

          {/* Modelled Drainage Path / Potential Runoff Connectivity */}
          {showDrainagePath && (
            <g>
              <path
                d={flowPathD}
                fill="none"
                stroke="#0284c7"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d={flowPathD}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="6 3"
                className="animate-pulse"
                markerEnd="url(#flowArrow)"
              />
              {/* Intermediate culvert node */}
              <circle
                cx={field.drainagePathPoints[2].x * 4}
                cy={field.drainagePathPoints[2].y * 3.5}
                r="3"
                fill="#38bdf8"
                stroke="#ffffff"
                strokeWidth="1"
              />
              <text
                x={field.drainagePathPoints[2].x * 4 + 6}
                y={field.drainagePathPoints[2].y * 3.5 - 4}
                fill="#bae6fd"
                fontSize="6.5"
                fontWeight="500"
              >
                Field Furrow Outlet (180m to canal)
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Floating Hover Card if user hovers field */}
      {hoveredFeature === 'field' && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-stone-950/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-emerald-800 text-xs text-stone-200 shadow-2xl pointer-events-none">
          <div className="flex items-center gap-2 font-bold text-emerald-400">
            <MapPin className="w-4 h-4" />
            <span>{field.fieldCode} - {field.farmerName}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1 text-[11px] text-stone-300">
            <div>Survey: {field.surveyNumber}</div>
            <div>Area: {field.areaAcres} Acres</div>
            <div>Slope: {field.location.averageSlopePercent}% ({field.location.slopeAspect})</div>
            <div>Soil: {field.soil.soilType}</div>
          </div>
        </div>
      )}
    </div>
  );
};
