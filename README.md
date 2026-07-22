# ET-Hackathon-2.O
## Hyperlocal Air Quality Intelligence & Enforcement Matrix

An AI-powered, agentic dashboard built for city administrators and environmental agencies. This system doesn't just monitor pollution it actively predicts it, simulates its spread, and generates automated enforcement actions to stop it at the source.

### Key Features

**24/72-Hour Ward-Level AQI Forecaster:** Uses predictive modeling to forecast PM2.5 and PM10 levels for individual city zones before they reach critical levels.

**Atmospheric Dispersion Simulator:** Integrates a Gaussian Plume model to predict how pollution will travel from a source based on real time wind speed and direction data.

**AI Smart Routing for Inspectors:** Automatically correlates pollution hotspots with registered industrial sites and generates optimized patrol routes for on ground enforcement units.

**Dynamic Permit Suspension:** Automated rule engine that triggers temporary suspensions of commercial construction permits if the 24 hour predictive AQI exceeds critical safety thresholds.

**Automated Multilingual Advisories:** Uses LLM agents to automatically generate and translate localized pollution warnings (eg. for vulnerable infrastructure like schools) before broadcasting them to citizens.

**Multi-City Comparative Dashboard:** Seamless UI toggles to compare real time intervention effectiveness across different metropolitan areas (eg. Delhi vs Mumbai).

### Tech Stack

**Frontend Architecture (UI/UX)**

    Framework: React + Vite
    Styling: Tailwind CSS
    Icons and Assets: Lucide React

**Backend Server & Database**

    Runtime and Framework: Node.js with Express.js
    Database: MongoDB (Mongoose ODMs for AQI Data, Advisories, and Permits)
    Routing: Modular MVC architecture (Controllers and Routes)

**AI & Machine Learning**

    Machine Learning: Python, XGBoost (for PM10/PM2.5 forecasting models)
    Agentic Workflows: Groq API (for ultra low latency memo generation and advisory translation)
    Geospatial Data: GeoJSON datasets mapping city infrastructure and pollution sources

### Set up Instructions

1. Clone the repository

git clone https://github.com/Shachi12Shukla/ET-Hackathon-2.O.git
cd ET-Hackathon-2.O

2. Start the Backend Server 

cd backend
npm install
npm start  # or node server.js

3. Start the Frontend Environment

Open a new terminal window then,

cd frontend
npm install
npm run dev

The frontend will be available at http://localhost:5173