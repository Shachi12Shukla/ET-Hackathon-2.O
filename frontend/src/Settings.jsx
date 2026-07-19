import React, { useState } from 'react';
import { Shield, AlertCircle, Save, Sliders, Database } from 'lucide-react';

export default function Settings() {
  const [autoSuspend, setAutoSuspend] = useState(true);
  const [alertThreshold, setAlertThreshold] = useState(300);

  return (
    <div className="flex-1 bg-slate-950 text-slate-100 p-8 overflow-y-auto">
      
      <header className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-50">System Configuration</h2>
        <p className="text-sm text-slate-400">Manage agent thresholds and automated protocols</p>
      </header>

      <div className="max-w-4xl flex flex-col gap-8">
        
        {/* Section 1: Dynamic Actions */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-200 mb-6 border-b border-slate-800 pb-4">
            <Shield size={18} className="text-teal-400" /> Automated Interventions (Feature 1.2)
          </h3>
          
          <div className="flex items-center justify-between bg-slate-950 p-4 border border-slate-800 rounded-lg">
            <div>
              <h4 className="font-semibold text-sm text-slate-200">Dynamic Permit Suspension Flags</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-lg">
                Automatically suspend active commercial construction permits in a ward if the 24-hour predictive AQI exceeds the critical threshold.
              </p>
            </div>
            
            {/* Custom Toggle Switch */}
            <button 
              onClick={() => setAutoSuspend(!autoSuspend)}
              className={`w-12 h-6 rounded-full relative transition-colors ${autoSuspend ? 'bg-teal-500' : 'bg-slate-700'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${autoSuspend ? 'translate-x-7' : 'translate-x-1'}`}></div>
            </button>
          </div>
        </section>

        {/* Section 2: Agent Thresholds */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-200 mb-6 border-b border-slate-800 pb-4">
            <Sliders size={18} className="text-amber-400" /> AI Agent Thresholds
          </h3>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-300">Critical AQI Alert Threshold (PM2.5)</label>
            <p className="text-xs text-slate-500 mb-2">Triggers the Multilingual Advisory Broadcast to vulnerable infrastructure (schools/hospitals).</p>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="100" max="500" step="10"
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(e.target.value)}
                className="w-64 accent-amber-500 cursor-pointer"
              />
              <span className="bg-slate-950 border border-slate-800 px-3 py-1 rounded text-sm font-mono text-amber-400">
                {alertThreshold} μg/m³
              </span>
            </div>
          </div>
        </section>

        {/* Section 3: Backend Hooks (For the AI Team) */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-200 mb-6 border-b border-slate-800 pb-4">
            <Database size={18} className="text-slate-400" /> Backend API Endpoints
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-400">Prediction Model Endpoint (XGBoost)</label>
              <input type="text" defaultValue="http://localhost:8000/api/v1/forecast" className="bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-300 font-mono focus:outline-none focus:border-teal-500" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-400">LangChain Agent Endpoint (LLM)</label>
              <input type="text" defaultValue="http://localhost:8000/api/v1/agent/advisory" className="bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-300 font-mono focus:outline-none focus:border-teal-500" />
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
            <Save size={16} /> Save Configuration
          </button>
        </div>

      </div>
    </div>
  );
}