import React, { useState, useEffect } from 'react';
import { ShieldAlert, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import axios from 'axios';

export default function EnforcementHub() {
  const [tickets, setTickets] = useState([]);

useEffect(() => {
    axios.get("http://localhost:5000/api/enforcement")
        .then(res => {
            setTickets(res.data.data);
        });
}, []);
  return (
    
    <div className="flex-1 bg-slate-950 text-slate-100 p-8 overflow-y-auto h-screen">
      
      <header className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-50 flex items-center gap-3">
          <ShieldAlert className="text-red-400" size={28} />
          Active Enforcement Actions
        </h2>
        <p className="text-sm text-slate-400">AI-generated inspection memos and permit suspension logs.</p>
      </header>

      <div className="grid grid-cols-1 gap-6 max-w-5xl">
        
        {/* Ticket 1: Permit Suspension (Feature 1.2) */}
        <div className="bg-slate-900 border border-red-900/50 rounded-xl p-5 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs px-2 py-0.5 rounded font-bold">
                AUTO-SUSPENSION TRIGGERED
              </span>
              <span className="text-xs text-slate-500">Just now</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-200">Commercial Permit #4429-B Suspended</h3>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              <strong className="text-slate-300">AI Logic:</strong> Dynamic permit suspension triggered for Ward 4 due to 24-hour predictive PM2.5 exceeding critical threshold (350+). 
            </p>
          </div>
          <button className="bg-slate-950 border border-slate-700 hover:bg-slate-800 text-slate-300 text-sm font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap">
            <FileText size={16} /> View Legal Memo
          </button>
        </div>

        {/* Ticket 2: Smart Routing (Feature 3) */}
        <div className="bg-slate-900 border border-amber-900/50 rounded-xl p-5 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs px-2 py-0.5 rounded font-bold">
                INSPECTOR DEPLOYMENT
              </span>
              <span className="text-xs text-slate-500">2 hours ago</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-200">Dust Suppression Audit - Ward 12</h3>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              <strong className="text-slate-300">AI Logic:</strong> Correlated pollution hotspot with 3 registered concrete mixing sites. Generated optimized routing for Patrol Unit 4.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-slate-950 border border-slate-700 hover:bg-slate-800 text-slate-300 text-sm font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
              <AlertTriangle size={16} /> Re-route
            </button>
            <button className="bg-teal-600/20 border border-teal-500/30 text-teal-400 hover:bg-teal-600/30 text-sm font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
              <CheckCircle size={16} /> Mark Resolved
            </button>
          </div>
        </div>

        {/* Ticket 3: Vulnerable Infrastructure (Feature 1.3) */}
        <div className="bg-slate-900 border border-purple-900/50 rounded-xl p-5 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs px-2 py-0.5 rounded font-bold uppercase">
                Vulnerable Infrastructure Flag
              </span>
              <span className="text-xs text-slate-500">10 mins ago</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-200">Plume Intersects High-Risk Facilities - Ward 4</h3>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              <strong className="text-slate-300">AI Logic:</strong> OpenStreetMap data confirms forecasted PM10 plume will cover <span className="text-purple-300 font-medium">St. Jude Hospital</span> and <span className="text-purple-300 font-medium">City Public School</span>. Generating localized lockdown advisories.
            </p>
          </div>
          <button className="bg-purple-600/20 border border-purple-500/30 text-purple-400 hover:bg-purple-600/30 text-sm font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap">
            <AlertTriangle size={16} /> Broadcast Facility Alert
          </button>
        </div>

      </div>
    </div>
  );
}