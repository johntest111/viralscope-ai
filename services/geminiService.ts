
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { AnalysisResult, Language } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeContent = async (topic: string, description: string, language: Language): Promise<AnalysisResult> => {
  const modelId = "gemini-2.5-flash"; // Using Flash for speed and reasoning

  const userPrompt = `
  Target Language: ${language === 'zh' ? 'Chinese (Simplified)' : 'English'}
  
  Analyze this content idea:
  **Topic:** ${topic}
  **Draft/Description:** ${description}
  
  Evaluate it strictly against the Optimized Standard (Hook, Emotion, Value, Social Currency, Fit).
  
  **IMPORTANT**: 
  1. All output text inside the JSON must be in ${language === 'zh' ? 'Chinese' : 'English'}.
  2. For "Similar Content Analysis", if the language is Chinese, include at least one example from "WeChat Official Account" (微信公众号) if applicable to the topic.
  
  Provide specific, actionable advice on how to improve the score.
  Then, generate 3 specific "Viral Variations" — different angles or titles for this same topic that would perform significantly better.
  Finally, provide "Market Validation" by listing 3 similar topics that have historically performed well.
  `;

  const response = await ai.models.generateContent({
    model: modelId,
    contents: userPrompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          totalScore: { type: Type.INTEGER, description: "Overall viral potential score from 0-100" },
          verdict: { type: Type.STRING, description: "Short summary verdict like 'Viral Hit' or 'Boring'" },
          summaryAnalysis: { type: Type.STRING, description: "A paragraph explaining the overall rating." },
          dimensions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Name of the dimension (e.g., Hook Strength)" },
                score: { type: Type.INTEGER, description: "Score 0-100" },
                description: { type: Type.STRING, description: "Brief justification" },
                advice: { type: Type.STRING, description: "Specific advice to improve this dimension" }
              },
              required: ["name", "score", "description", "advice"]
            }
          },
          viralVariations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "A catchy, viral title" },
                angle: { type: Type.STRING, description: "The strategic angle (e.g., 'Contrarian', 'Emotional Story')" },
                reasoning: { type: Type.STRING, description: "Why this variation works better" }
              },
              required: ["title", "angle", "reasoning"]
            }
          },
          similarContentAnalysis: {
            type: Type.ARRAY,
            description: "Historical data of similar content that performed well",
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Title of the similar historical content" },
                platform: { type: Type.STRING, description: "Platform where it went viral (e.g. WeChat, TikTok)" },
                metrics: {
                  type: Type.OBJECT,
                  properties: {
                    views: { type: Type.STRING, description: "e.g., '100k+', '1.2M'" },
                    likes: { type: Type.STRING, description: "e.g., '45K', '3000'" },
                    shares: { type: Type.STRING, description: "e.g., '12K', '500' (For WeChat use 'Wow/Look')" }
                  },
                  required: ["views", "likes", "shares"]
                },
                keyInsight: { type: Type.STRING, description: "Why this historical piece was successful" }
              },
              required: ["title", "platform", "metrics", "keyInsight"]
            }
          }
        },
        required: ["totalScore", "verdict", "summaryAnalysis", "dimensions", "viralVariations", "similarContentAnalysis"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response from AI");
  }

  try {
    return JSON.parse(text) as AnalysisResult;
  } catch (e) {
    console.error("Failed to parse JSON", e);
    throw new Error("Failed to parse analysis results.");
  }
};
