import React from 'react';
import { MapPin, Navigation, Wind, Crosshair } from 'lucide-react';

export default function EnforcementMap() {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 p-6">
      
      <header className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-50">AI Smart Routing & Dispersion Map</h2>
        <p className="text-sm text-slate-400">Live atmospheric tracking and inspector deployment</p>
      </header>

      <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-6 h-full">
        
        {/* BIG MAP AREA (For Backend to drop Leaflet/Mapbox into) */}
        <div className="xl:col-span-8 bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden flex flex-col">
          {/* Controls Overlay */}
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <button className="bg-slate-950/80 backdrop-blur border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold hover:border-teal-500 transition-colors flex items-center gap-2">
              <Wind size={14} className="text-teal-400"/> Dispersion Layer
            </button>
            <button className="bg-slate-950/80 backdrop-blur border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold hover:border-red-500 transition-colors flex items-center gap-2">
              <Crosshair size={14} className="text-red-400"/> Source Attribution
            </button>
          </div>

          {/* Map Visual Placeholder */}
          <div className="flex-1 bg-slate-950 flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-slate-950"></div>
            <MapPin size={48} className="text-slate-700 absolute animate-bounce" />
            <div className="text-center z-10 mt-16">
              <p className="text-slate-500 font-mono text-sm">[ GeoJSON Map Render Target ]</p>
              <p className="text-slate-600 text-xs mt-2">Backend Team: Bind Mapbox/Leaflet instance here</p>
            </div>
          </div>
        </div>

        {/* AI ROUTING SIDEBAR */}
        <div className="xl:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-100 mb-4">
            <Navigation size={18} className="text-teal-400" /> AI-Generated Patrol Routes
          </h3>
          
          <div className="flex flex-col gap-4 overflow-y-auto pr-2">
            
            {/* Route Card 1 */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold bg-teal-500/10 text-teal-400 px-2 py-1 rounded border border-teal-500/20">Route Alpha • High Priority</span>
                <span className="text-xs text-slate-500">Est. Time: 45m</span>
              </div>
              <h4 className="font-semibold text-sm text-slate-200 mb-2">Ward 4 Industrial Audit</h4>
              <ul className="text-xs text-slate-400 flex flex-col gap-2 mb-4 border-l-2 border-slate-800 pl-3">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div> Stop 1: Metro Construction Site B</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div> Stop 2: Okhla Concrete Mixer</li>
              </ul>
              <button className="w-full bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold py-2 rounded text-xs transition-colors">
                Dispatch Memo to Inspector App
              </button>
            </div>

             {/* Route Card 2 */}
             <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold bg-amber-500/10 text-amber-400 px-2 py-1 rounded border border-amber-500/20">Route Beta • Medium Priority</span>
                <span className="text-xs text-slate-500">Est. Time: 1h 20m</span>
              </div>
              <h4 className="font-semibold text-sm text-slate-200 mb-2">Ward 12 Dust Suppression</h4>
              <ul className="text-xs text-slate-400 flex flex-col gap-2 mb-4 border-l-2 border-slate-800 pl-3">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div> Stop 1: Highway Expansion Zone</li>
              </ul>
              <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold py-2 rounded text-xs transition-colors">
                Dispatch Memo to Inspector App
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}