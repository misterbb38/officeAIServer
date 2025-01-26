// /*****************************************************
//  * server.js (ESM)
//  * 
//  * Backend Node/Express qui utilise:
//  *  - @google/generative-ai  (Gemini, version preview/hypothétique)
//  *  - @anthropic-ai/sdk     (Claude)
//  *  - openai                (OpenAI)
//  *
//  * Nécessite:
//  *  1) "type": "module" dans package.json
//  *  2) npm install express cors dotenv
//  *     npm install @google/generative-ai @anthropic-ai/sdk openai
//  *
//  * Dans votre .env (même dossier):
//  *   GEMINI_API_KEY=sk-xxx
//  *   CLAUDE_API_KEY=sk-xxx
//  *   OPENAI_API_KEY=sk-xxx
//  *****************************************************/

// // 1) Import des modules ESM
// import 'dotenv/config'; // charge .env
// import express from 'express';
// import cors from 'cors';

// // Librairies IA
// import { GoogleGenerativeAI } from '@google/generative-ai';  // Gemini
// import Anthropic from '@anthropic-ai/sdk';                   // Claude
// import OpenAI from 'openai';                                 // OpenAI

// // 2) Configuration Express
// const app = express();
// const port = 3001;

// app.use(cors());        // Permet d'accepter des requêtes depuis d'autres origines (ex: http://localhost:3000)
// app.use(express.json()); // Parse automatiquement le JSON dans req.body

// /*****************************************************
//  * Création des clients IA
//  *****************************************************/

// // Gemini (Google Generative AI)
// const geminiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Anthropic (Claude)
// const claudeClient = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

// // OpenAI
// const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// /*****************************************************
//  * 1) Endpoint GET (test)
//  *****************************************************/
// app.get('/', (req, res) => {
//   res.send("Backend de traduction opérationnel !");
// });

// /*****************************************************
//  * 2) Endpoint POST /api/translate/gemini
//  *    (hypothétique/preview)
//  *****************************************************/
// app.post('/api/translate/gemini', async (req, res) => {
//   try {
//     const { text, targetLanguage } = req.body;
//     if (!text || !targetLanguage) {
//       return res.status(400).json({ error: "Champs text/targetLanguage manquants" });
//     }

//     // Prompt pour la traduction
//     const prompt = `Traduire ce texte en ${targetLanguage} :\n${text}`;

//     // Exemple de modèle "gemini-1.5-flash" (fictif ou preview)
//     const model = geminiClient.getGenerativeModel({ model: "gemini-1.5-flash" });

//     // On génère le contenu
//     const result = await model.generateContent(prompt);
//     // result.response est un objet async; on l'attend
//     const generationResponse = await result.response;
//     // On récupère le texte final
//     const translation = await generationResponse.text();

//     return res.json({ translation });
//   } catch (error) {
//     console.error("Erreur Gemini:", error.message);
//     return res.status(500).json({ error: "Erreur lors de la traduction via Gemini" });
//   }
// });

// /*****************************************************
//  * 3) Endpoint POST /api/translate/claude
//  *****************************************************/
// app.post('/api/translate/claude', async (req, res) => {
//   try {
//     const { text, targetLanguage } = req.body;
//     if (!text || !targetLanguage) {
//       return res.status(400).json({ error: "Champs text/targetLanguage manquants" });
//     }

//     // Prompt
//     const prompt = `Traduire ce texte en ${targetLanguage}:\n${text}`;

//     const response = await claudeClient.messages.create({
//       model: "claude-3-sonnet-20240229", // exemple fictif
//       max_tokens: 1000,
//       messages: [{ role: "user", content: prompt }],
//     });

//     // Selon la structure renvoyée, on récupère le texte
//     const translation = response.content?.[0]?.text || "(Aucune réponse Claude)";
//     return res.json({ translation });
//   } catch (error) {
//     console.error("Erreur Claude:", error.message);
//     return res.status(500).json({ error: "Erreur lors de la traduction via Claude" });
//   }
// });

// /*****************************************************
//  * 4) Endpoint POST /api/translate/openai
//  *****************************************************/
// app.post('/api/translate/openai', async (req, res) => {
//   try {
//     const { text, targetLanguage } = req.body;
//     if (!text || !targetLanguage) {
//       return res.status(400).json({ error: "Champs text/targetLanguage manquants" });
//     }

//     const prompt = `Traduire ce texte en ${targetLanguage}:\n${text}`;

//     // On utilise GPT-4 (ex: "gpt-4-turbo-preview"), adaptation
//     const response = await openaiClient.chat.completions.create({
//       model: "gpt-4-turbo-preview",
//       messages: [{ role: "user", content: prompt }],
//     });

//     const translation = response.choices?.[0]?.message?.content || "(Aucune réponse GPT)";
//     return res.json({ translation });
//   } catch (error) {
//     console.error("Erreur OpenAI:", error.message);
//     return res.status(500).json({ error: "Erreur lors de la traduction via OpenAI" });
//   }
// });

// /*****************************************************
//  * Lancement du serveur
//  *****************************************************/
// app.listen(port, () => {
//   console.log(`Serveur backend démarré sur http://localhost:${port}`);
// });




/*****************************************************
 * server.js (ESM)
 *
 * Backend Node/Express qui utilise:
 *  - @google/generative-ai (Gemini, version preview/fictive)
 *  - @anthropic-ai/sdk     (Claude)
 *  - openai                (OpenAI)
 *
 * Instructions sont OPTIONNELLES dans req.body:
 *   { text, targetLanguage, instructions? }
 *
 * Dans votre .env (même dossier):
 *   GEMINI_API_KEY=sk-xxx
 *   CLAUDE_API_KEY=sk-xxx
 *   OPENAI_API_KEY=sk-xxx
 *****************************************************/

// 1) Import des modules ESM
import 'dotenv/config'; // Charge les variables d'environnement depuis .env
import express from 'express';
import cors from 'cors';

// Librairies IA
import { GoogleGenerativeAI } from '@google/generative-ai'; // Gemini
import Anthropic from '@anthropic-ai/sdk';                 // Claude
import OpenAI from 'openai';                               // OpenAI

// 2) Configuration Express
const app = express();
const port = 3001;

app.use(cors());          // Permet d'accepter les requêtes depuis d'autres origines
app.use(express.json());  // Parse automatiquement le JSON dans req.body

/*****************************************************
 * Création des clients IA
 *****************************************************/

// Gemini (Google Generative AI)
const geminiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Anthropic (Claude)
const claudeClient = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

// OpenAI
const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/*****************************************************
 * 1) Endpoint GET (test)
 *****************************************************/
app.get('/', (req, res) => {
  res.send("Backend de traduction opérationnel !");
});

/*****************************************************
 * 2) Endpoint POST /api/translate/gemini
 *    (hypothétique/preview, instructions OPTIONNELLES)
 *****************************************************/
app.post('/api/translate/gemini', async (req, res) => {
  try {
    const { text, targetLanguage, instructions } = req.body;
    if (!text || !targetLanguage) {
      return res.status(400).json({ error: "Champs text et targetLanguage requis." });
    }

    // Si instructions est défini, on l'ajoute au prompt
    const prompt = instructions
      ? `Instructions: ${instructions}\n\nTraduire ce texte en ${targetLanguage}:\n${text}`
      : `Traduire ce texte en ${targetLanguage}:\n${text}`;

    // Exemple de modèle "gemini-1.5-flash" (fictif ou preview)
    const model = geminiClient.getGenerativeModel({ model: "gemini-1.5-flash" });

    // On génère le contenu
    const result = await model.generateContent(prompt);
    const generationResponse = await result.response; // objet async
    const translation = await generationResponse.text();

    return res.json({ translation });
  } catch (error) {
    console.error("Erreur Gemini:", error.message);
    return res.status(500).json({ error: "Erreur lors de la traduction via Gemini" });
  }
});

/*****************************************************
 * 3) Endpoint POST /api/translate/claude
 *    (instructions OPTIONNELLES)
 *****************************************************/
app.post('/api/translate/claude', async (req, res) => {
  try {
    const { text, targetLanguage, instructions } = req.body;
    if (!text || !targetLanguage) {
      return res.status(400).json({ error: "Champs text et targetLanguage requis." });
    }

    // Concaténation optionnelle des instructions
    const prompt = instructions
      ? `Instructions: ${instructions}\n\nTraduire ce texte en ${targetLanguage}:\n${text}`
      : `Traduire ce texte en ${targetLanguage}:\n${text}`;

    const response = await claudeClient.messages.create({
      model: "claude-3-sonnet-20240229", // modèle fictif
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    // structure renvoyée par le SDK Anthropic
    const translation = response.content?.[0]?.text || "(Aucune réponse Claude)";
    return res.json({ translation });
  } catch (error) {
    console.error("Erreur Claude:", error.message);
    return res.status(500).json({ error: "Erreur lors de la traduction via Claude" });
  }
});

/*****************************************************
 * 4) Endpoint POST /api/translate/openai
 *    (instructions OPTIONNELLES)
 *****************************************************/
app.post('/api/translate/openai', async (req, res) => {
  try {
    const { text, targetLanguage, instructions } = req.body;
    if (!text || !targetLanguage) {
      return res.status(400).json({ error: "Champs text et targetLanguage requis." });
    }

    const prompt = instructions
      ? `Instructions: ${instructions}\n\nTraduire ce texte en ${targetLanguage}:\n${text}`
      : `Traduire ce texte en ${targetLanguage}:\n${text}`;

    // On utilise GPT-4 (ex: "gpt-4-turbo-preview")
    const response = await openaiClient.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [{ role: "user", content: prompt }],
    });

    const translation = response.choices?.[0]?.message?.content || "(Aucune réponse GPT)";
    return res.json({ translation });
  } catch (error) {
    console.error("Erreur OpenAI:", error.message);
    return res.status(500).json({ error: "Erreur lors de la traduction via OpenAI" });
  }
});

/*****************************************************
 * Lancement du serveur
 *****************************************************/
app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});
