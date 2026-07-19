import React, { useState } from 'react';
import { Activity, Map, ShieldAlert, Settings, PanelLeftClose, PanelLeft } from 'lucide-react';
import AirQualityDashboard from './AirQualityDashboard';
import SettingsView from './Settings';
import EnforcementMap from './EnforcementMap';
import EnforcementHub from './EnforcementHub';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  // Helper for rendering nav buttons cleanly
  const NavButton = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => setActiveScreen(id)}
      className={`flex items-center gap-4 px-3 py-3 rounded-lg transition-all ${
        activeScreen === id 
          ? 'bg-teal-500/10 text-teal-400' 
          : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
      } ${!isSidebarOpen && 'justify-center'}`}
    >
      <Icon size={24} className="shrink-0" />
      {isSidebarOpen && <span className="font-semibold text-sm whitespace-nowrap">{label}</span>}
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans">
      
      {/* COLLAPSIBLE SIDEBAR */}
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out bg-slate-900 border-r border-slate-800 flex flex-col py-6 relative z-50`}
      >
        {/* Fancy Modern Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-4 top-8 bg-slate-900 border border-slate-700 rounded-md p-1.5 text-slate-400 hover:text-teal-400 hover:border-teal-400 hover:bg-slate-800 shadow-lg transition-all z-50 flex items-center justify-center group"
        >
          {isSidebarOpen ? (
            <PanelLeftClose size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          ) : (
            <PanelLeft size={18} className="group-hover:translate-x-0.5 transition-transform" />
          )}
        </button>

        {/* Logo */}
        <div className={`flex items-center gap-3 px-5 mb-8 ${!isSidebarOpen && 'justify-center px-0'}`}>
          <div className="w-10 h-10 shrink-0 bg-teal-500/20 text-teal-400 rounded-lg flex items-center justify-center">
            <Activity size={24} />
          </div>
          {isSidebarOpen && <span className="font-bold text-lg tracking-tight text-slate-100 whitespace-nowrap">AuraScan OS</span>}
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-2 px-3">
          <NavButton id="dashboard" icon={Activity} label="Intelligence Dashboard" />
          <NavButton id="map" icon={Map} label="Dispersion Map" />
          <NavButton id="enforcement" icon={ShieldAlert} label="Enforcement Hub" />
          <NavButton id="settings" icon={Settings} label="System Config" />
        </nav>
      </aside>

      {/* DYNAMIC SCREEN RENDERING */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        {activeScreen === 'dashboard' && <AirQualityDashboard />}
        {activeScreen === 'map' && <EnforcementMap />}
        {activeScreen === 'enforcement' && <EnforcementHub />}
        {activeScreen === 'settings' && <SettingsView />}
      </main>
      
    </div>
  );
}