import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateExplanation(topic: string) {

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: `Explain the topic "${topic}" in simple terms for a student.`,
      },
    ],
  });

  return completion.choices[0].message.content;
}