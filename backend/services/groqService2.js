const groq = require("../config/groq");

function getFallbackAdvisory(city, ward, aqi, regionalLang) {
  return {
    riskLevel: { en: "High Alert", hi: "उच्च चेतावनी", reg: regionalLang === "Kannada" ? "ಹೆಚ್ಚಿನ ಎಚ್ಚರಿಕೆ" : "उच्च सतर्कता" },
    healthAdvice: { 
      en: `High pollution levels in ${ward}. Stay indoors.`, 
      hi: `${ward} में प्रदूषण का स्तर अधिक है। घर के अंदर रहें।`, 
      reg: regionalLang === "Kannada" ? `${ward} ನಲ್ಲಿ ಮಾಲಿನ್ಯ ಮಟ್ಟ ಹೆಚ್ಚಾಗಿದೆ. ಮನೆಯಲ್ಲೇ ಇರಿ.` : `${ward} मध्ये प्रदुषण पातळी वाढली आहे. घरातच राहा.`
    },
    outdoorActivity: { en: "Suspend outdoor activities.", hi: "बाहरी गतिविधियों को स्थगित करें।", reg: "..." },
    sensitiveGroups: { en: "Wear N95 masks.", hi: "N95 मास्क पहनें।", reg: "..." },
    facilityAlerts: []
  };
}

exports.generateAdvisory = async (city, ward, aqi, pollutants = [], facilities = []) => {
  // Determine the local regional language dynamically
  const lowercaseCity = city.toLowerCase();
  const regionalLang = lowercaseCity.includes("blr") || lowercaseCity.includes("bengaluru")
    ? "Kannada"
    : lowercaseCity.includes("mumbai")
      ? "Marathi"
      : "Hindi";

  const prompt = `
You are an environmental public safety officer.
Generate a public health risk advisory warning. Target sensitive groups (children, seniors, asthmatic patients).

City: ${city}
Ward: ${ward}
AQI: ${aqi}
Primary Pollutants: ${pollutants.join(", ") || "PM2.5, PM10"}
Impacted Facilities: ${facilities.join(", ") || "None detected"}

For each field, you must provide translations for:
1. "en" (English)
2. "hi" (Hindi)
3. "reg" (Regional language: ${regionalLang})

Return ONLY valid JSON matching this schema:
{
  "riskLevel": { "en": "e.g. Critical", "hi": "...", "reg": "..." },
  "healthAdvice": { "en": "...", "hi": "...", "reg": "..." },
  "outdoorActivity": { "en": "...", "hi": "...", "reg": "..." },
  "sensitiveGroups": { "en": "...", "hi": "...", "reg": "..." },
  "facilityAlerts": [
    {
      "name": "e.g. St. Jude Hospital",
      "type": "e.g. hospital",
      "action": { "en": "...", "hi": "...", "reg": "..." }
    }
  ]
}
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.2
  });

  const rawContent = completion.choices[0].message.content;

  try {
    // Fail-safe parser: Strips down "```json ... ```" wrappers if returned by the LLM
    const cleanContent = rawContent.replace(/```json/gi, "").replace(/```/g, "").trim();
    return JSON.parse(cleanContent);
  } catch (err) {
    console.error("JSON parsing failed, returning local default alert:", err);
    return getFallbackAdvisory(city, ward, aqi, regionalLang);
  }
};
