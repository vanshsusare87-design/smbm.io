
const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const files = [
  '_MG_3934.JPG', '_MG_3939.JPG', '_MG_3967.JPG', '_MG_3995.JPG',
  '_MG_4009.JPG', '_MG_4082.JPG', '_MG_4114.JPG', '_MG_4148.JPG',
  '_MG_4307.JPG', '_MG_4330.JPG', '_MG_4431.JPG', '_MG_4457.JPG', '_MG_4459.JPG'
];

async function main() {
  for (const f of files) {
    const p = 'public/' + f;
    const b64 = fs.readFileSync(p).toString('base64');
    try {
      const res = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { inlineData: { mimeType: 'image/jpeg', data: b64 } },
          { text: 'Look at this school photo. Describe in 1-2 sentences in Hindi and English: 1) What is written on any banner/poster? 2) What exact scene or activity is shown?' }
        ]
      });
      console.log('RESULT:::' + f + ':::' + res.text.replace(/
/g, ' '));
    } catch (e) {
      console.log('RESULT:::' + f + ':::ERR:' + e.message);
    }
    await new Promise(r => setTimeout(r, 15000));
  }
}
main();
