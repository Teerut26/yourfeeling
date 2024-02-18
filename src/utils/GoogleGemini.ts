import { env } from "@/env.mjs";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  Part,
  GenerationConfig,
} from "@google/generative-ai";

type ImageData = {
  mimeType: string;
  data: string;
};

interface GeminiParametersInterface {
  prompt: string;
  imageData?: ImageData;
  generationConfig?: GenerationConfig;
  musicType: number;
}

const runGemini = async (config: GeminiParametersInterface) => {
    const genAI = new GoogleGenerativeAI(env.GEMINI_KEY);
    const MODEL_NAME = config.imageData ? "gemini-pro-vision" : "gemini-pro";
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig: GenerationConfig = {
      temperature: config.generationConfig?.temperature ?? 0.9,
      topK: config.generationConfig?.topK ?? 1,
      topP: config.generationConfig?.topP ?? 1,
      maxOutputTokens: config.generationConfig?.maxOutputTokens ?? 2000,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const type = [
        `[\n    {"artist": "Adele", "song": "Someone Like You"},\n    {"artist": "Sam Smith", "song": "Stay With Me"},\n    {"artist": "Billie Eilish", "song": "When The Party\'s Over"},\n    {"artist": "Sia", "song": "Chandelier"},\n    {"artist": "Bon Iver", "song": "Skinny Love"},\n    {"artist": "Radiohead", "song": "Creep"}\n  ]`,
        `[\n    {\"artist\": \"Bodyslam\", \"song\": \"ยาพิษ\"},\n    {\"artist\": \"Pause\", \"song\": \"เธอคือของขวัญ\"},\n    {\"artist\": \"Ink Waruntorn\", \"song\": \"เจ็บจนพอ\"},\n    {\"artist\": \"Polycat\", \"song\": \"แผลเป็น\"},\n    {\"artist\": \"The Toys\", \"song\": \"ไว้ใจได้ไหม\"},\n    {\"artist\": \"Getsunova \", \"song\": \"เก็บเอาไว้ด้วย\"}\n  ]`
    ]

    // const parts: Part[] = [{ text: config.prompt }];
    const parts: Part[] = [
      { text: "input: รู้สึกเศร้า" },
      {
        text: `output: ${type[config.musicType]}`,
      },
      { text: `input: ${config.prompt}` },
      { text: "output: " },
    ];
  
    if (config.imageData) {
      parts.push({
        inlineData: config.imageData,
      });
    }
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });
    return result;
};

export { runGemini };