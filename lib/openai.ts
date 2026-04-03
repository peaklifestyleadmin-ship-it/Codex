import OpenAI from "openai";

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generatePinterestInfographics(keyword: string) {
  const prompts = ["blue palette", "green palette", "minimal palette", "high contrast", "warm colors"].map(
    (style) =>
      `Create a high-converting Pinterest infographic for ${keyword}, vertical layout, bold headline, modern design, high CTR style, ${style}`
  );

  return Promise.all(
    prompts.map(async (prompt) => {
      const image = await openai.images.generate({ model: "gpt-image-1", prompt, size: "1024x1536" });
      return image.data?.[0]?.b64_json ?? null;
    })
  );
}
