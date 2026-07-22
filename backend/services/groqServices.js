const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

exports.generateAdvisory = async(city, ward, aqi) => {

    const prompt = `
You are an environmental health expert.

City: ${city}
Ward: ${ward}
AQI: ${aqi}

Return ONLY valid JSON in this format:

{
  "riskLevel":"",
  "healthAdvice":"",
  "outdoorActivity":"",
  "sensitiveGroups":"",
  "governmentAction":""
}
`;

    const completion =
        await groq.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],

            temperature: 0.2
        });

    return JSON.parse(
        completion.choices[0].message.content
    );
};