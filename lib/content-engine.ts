import { openai } from "@/lib/openai";

export async function generateContentPack(keyword: string) {
  const [reddit, seo, captions] = await Promise.all([
    openai.responses.create({
      model: "gpt-4.1",
      input: `Create 3 Reddit posts for keyword: ${keyword}. Styles: story, problem-solution, list-style.`
    }),
    openai.responses.create({
      model: "gpt-4.1",
      input:
        `Write a 1500-2500 word SEO article for ${keyword} with H2/H3, FAQ and affiliate placements. Return markdown.`
    }),
    openai.responses.create({
      model: "gpt-4.1-mini",
      input: `Generate 5 Pinterest captions + hashtags for ${keyword}.`
    })
  ]);

  return {
    reddit: reddit.output_text,
    blogMarkdown: seo.output_text,
    pinterestCaptions: captions.output_text
  };
}
