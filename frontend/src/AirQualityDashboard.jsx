import React, { useState, useEffect } from 'react';
import { 
  Activity, Map, AlertTriangle, Settings, Bell, 
  Wind, Thermometer, ShieldAlert, CheckCircle, Clock 
} from 'lucide-react';
import { 
  AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

export default function AirQualityDashboard() {
  const [time, setTime] = useState(new Date());
  const [language, setLanguage] = useState('en');
  const [timeSlider, setTimeSlider] = useState(12);
  const [compareCity, setCompareCity] = useState('Mumbai');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const forecastData = [
    { time: '00:00', pm25: 120, windSpeed: 12 },
    { time: '04:00', pm25: 145, windSpeed: 8 },
    { time: '08:00', pm25: 280, windSpeed: 5 }, // Stagnant wind, high pollution
    { time: '12:00', pm25: 310, windSpeed: 4 },
    { time: '16:00', pm25: 250, windSpeed: 15 },
    { time: '20:00', pm25: 180, windSpeed: 18 },
    { time: '24:00', pm25: 140, windSpeed: 14 },
  ];

  const advisories = {
    en: "CRITICAL: Forecasted PM10 surge in Ward 4. Municipal primary schools are advised to suspend outdoor physical education between 08:00 and 14:00.",
    hi: "महत्वपूर्ण: वार्ड 4 में PM10 बढ़ने का अनुमान है। नगर निगम के प्राथमिक विद्यालयों को सुबह 08:00 से दोपहर 14:00 बजे तक बाहरी शारीरिक शिक्षा को निलंबित करने की सलाह दी जाती है।",
    reg: "ಗಂಭೀರ: ವಾರ್ಡ್ 4 ರಲ್ಲಿ PM10 ಹೆಚ್ಚಳದ ಮುನ್ಸೂಚನೆ. ಪ್ರಾಥಮಿಕ ಶಾಲೆಗಳು ಬೆಳಿಗ್ಗೆ 08:00 ರಿಂದ ಮಧ್ಯಾಹ್ನ 14:00 ರವರೆಗೆ ಹೊರಾಂಗಣ ಆಟಗಳನ್ನು ನಿಲ್ಲಿಸಲು ಸೂಚಿಸಲಾಗಿದೆ."
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        
        {/* 1. TOP NAVIGATION / HEADER */}
        <header className="px-4 lg:px-8 py-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10 flex items-center justify-between gap-4">
          
          {/* Left Side: Dynamic Title Layout */}
          <div className="min-w-0 flex-1"> 
            <h1 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold tracking-tight text-slate-50 truncate">
              Hyperlocal Air Quality Intelligence & Enforcement Matrix
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Active Monitoring Mode
            </div>
          </div>
          
          {/* Right Side: Control Matrix (Locked to prevent wrapping) */}
          <div className="flex items-center gap-2 lg:gap-4 shrink-0 flex-nowrap">
            
            {/* INTERACTIVE: Compact Multi-City Compare Dropdown */}
            <select 
              value={compareCity}
              onChange={(e) => setCompareCity(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-xs rounded-lg px-2 py-1.5 lg:px-3 lg:py-2 text-slate-300 focus:outline-none focus:ring-1 focus:ring-teal-500 shadow-sm cursor-pointer hover:bg-slate-900 transition-colors"
            >
              <option value="Mumbai">Delhi vs Mumbai</option>
              <option value="Bengaluru">Delhi vs Bengaluru</option>
              <option value="None">Delhi Core</option>
            </select>

            {/* DYNAMIC: COMPACT DUAL CITY STAT BLOCK */}
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg overflow-hidden text-xs">
              
              <div className={`flex flex-col px-2.5 py-1 lg:px-4 lg:py-1.5 ${compareCity !== 'None' ? 'border-r border-slate-800' : ''} bg-amber-500/5`}>
                <span className="text-[9px] lg:text-[10px] uppercase tracking-wider text-amber-500 font-bold">Delhi</span>
                <span className="text-xs lg:text-sm font-bold text-amber-400">218</span>
              </div>

              {compareCity === 'Mumbai' && (
                <div className="flex flex-col px-2.5 py-1 lg:px-4 lg:py-1.5 bg-emerald-500/5 animate-in fade-in slide-in-from-right-4 duration-300">
                  <span className="text-[9px] lg:text-[10px] uppercase tracking-wider text-emerald-500 font-bold">Mumbai</span>
                  <span className="text-xs lg:text-sm font-bold text-emerald-400">92</span>
                </div>
              )}

              {compareCity === 'Bengaluru' && (
                <div className="flex flex-col px-2.5 py-1 lg:px-4 lg:py-1.5 bg-teal-500/5 animate-in fade-in slide-in-from-right-4 duration-300">
                  <span className="text-[9px] lg:text-[10px] uppercase tracking-wider text-teal-500 font-bold">Blr</span>
                  <span className="text-xs lg:text-sm font-bold text-teal-400">115</span>
                </div>
              )}
            </div>

            {/* COMPACT CLOCK */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 lg:px-3 lg:py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs">
              <Clock size={14} className="text-slate-400" />
              <span className="font-medium text-slate-300 min-w-[45px] text-center">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

          </div>
        </header>

        {/* 2. MAIN GRID LAYOUT */}
        <div className="p-8 grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: 60% Width (7/12 cols) */}
          <section className="xl:col-span-7 flex flex-col gap-8">
            
            {/* Component A: Geospatial Predictive Heatmap */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col h-125">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-100">
                  <Map size={18} className="text-teal-400" /> Hyperlocal 24-Hour Predictive Heatmap
                </h2>
                <select className="bg-slate-950 border border-slate-800 text-sm rounded-md px-3 py-1.5 text-slate-300 focus:outline-none focus:ring-1 focus:ring-teal-500">
                  <option>All Wards</option>
                  <option>Ward 4 (Industrial)</option>
                  <option>Ward 12 (Residential)</option>
                </select>
              </div>

              {/* Map Placeholder Wrapper */}
              <div className="relative flex-1 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center">
                {/* Simulated Map Background Grid */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                
                {/* Glowing Hotspots */}
                <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-red-600/20 blur-[60px] rounded-full mix-blend-screen"></div>
                <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-amber-500/20 blur-[50px] rounded-full mix-blend-screen"></div>
                
                <div className="z-10 text-center">
                  <Map size={48} className="mx-auto text-slate-700 mb-2" />
                  <p className="text-slate-500 text-sm font-medium">Geospatial Overlay Active</p>
                </div>

                {/* Overlays */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-lg p-4">
                  <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                    <span>Time Slider (Next 24 Hours)</span>
                    <span className="text-teal-400">+{timeSlider}h Forecast</span>
                  </div>
                  <input 
                    type="range" min="1" max="24" value={timeSlider} 
                    onChange={(e) => setTimeSlider(e.target.value)}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Component B: AQI & Meteorological Trend Forecast */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 h-[350px] flex flex-col">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-100 mb-6">
                <Wind size={18} className="text-teal-400" /> AQI & Atmospheric Dispersion Forecast
              </h2>
              <div className="flex-1 w-full text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPm25" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="time" stroke="#64748b" tickLine={false} axisLine={false} />
                    <YAxis yAxisId="left" stroke="#64748b" tickLine={false} axisLine={false} />
                    <YAxis yAxisId="right" orientation="right" stroke="#64748b" tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                    <Legend verticalAlign="top" height={36}/>
                    <Area yAxisId="left" type="monotone" dataKey="pm25" name="PM 2.5 (μg/m³)" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorPm25)" />
                    <Line yAxisId="right" type="monotone" dataKey="windSpeed" name="Wind Speed (km/h)" stroke="#14b8a6" strokeWidth={2} dot={{ r: 4, fill: '#0f172a' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </section>

          {/* RIGHT COLUMN: 40% Width (5/12 cols) */}
          <section className="xl:col-span-5 flex flex-col gap-8">
            
            {/* Component C: AI-Prioritized Enforcement Actions */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-100">
                  <ShieldAlert size={18} className="text-red-400" /> AI-Prioritized Enforcement Actions
                </h2>
                <span className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded font-medium">3 Pending</span>
              </div>

              <div className="flex flex-col gap-4">
                {/* Action Card 1 - Critical */}
                <div className="bg-slate-950 border border-red-900/50 rounded-lg p-4 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-slate-100">Metro Line Construction Site - Ward 4</h3>
                    <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs px-2 py-0.5 rounded font-bold">
                      94% Match / Critical
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mb-4 bg-slate-900/50 p-2 border border-slate-800 rounded">
                    <strong>AI Analysis:</strong> Forecasted stagnant wind and localized PM10 spike detected. High probability of fugitive dust accumulation. Recommended immediate enforcement routing.
                  </p>
                  <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold py-2 rounded-md transition-colors text-sm">
                    Deploy Inspectors (Dust Suppression)
                  </button>
                </div>

                {/* Action Card 2 - High */}
                <div className="bg-slate-950 border border-amber-900/50 rounded-lg p-4 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-slate-100">Okhla Industrial Sector 2</h3>
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs px-2 py-0.5 rounded font-bold">
                      82% Match / High
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mb-4 bg-slate-900/50 p-2 border border-slate-800 rounded">
                    <strong>AI Analysis:</strong> Thermal satellite anomaly aligns with ground-level SO2 spike. Suspected industrial scrubber bypass during night shift.
                  </p>
                  <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold py-2 rounded-md transition-colors text-sm">
                    Deploy Inspectors (Stack Audit)
                  </button>
                </div>
              </div>
            </div>

            {/* Component D: Automated Multilingual Citizen Advisory */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-100">
                  <Bell size={18} className="text-teal-400 animate-pulse" /> Citizen Risk Advisory Agent
                </h2>
                
                {/* Language Toggle */}
                <div className="flex bg-slate-950 border border-slate-800 rounded-md p-1">
                  {['en', 'hi', 'reg'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-3 py-1 text-xs font-semibold rounded ${
                        language === lang 
                          ? 'bg-slate-800 text-teal-400' 
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-400 text-sm font-bold mb-3">
                  <AlertTriangle size={16} /> TARGET: VULNERABLE POPULATION ZONES
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {advisories[language]}
                </p>
                <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-medium">Channel: Mobile Push, IVR, Digital Boards</span>
                  <button className="bg-teal-500 hover:bg-teal-600 text-slate-950 text-xs font-bold py-1.5 px-4 rounded transition-colors flex items-center gap-1">
                    <CheckCircle size={14} /> Broadcast Approved
                  </button>
                </div>
              </div>
            </div>

          </section>
        </div>
      </main>
    </div>
  );
}