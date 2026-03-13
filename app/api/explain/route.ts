import { NextResponse } from "next/server";
import { generateExplanation } from "@/lib/aiClient";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Please enter a topic to continue." },
        { status: 400 }
      );
    }

    const explanation = await generateExplanation(topic);

    return NextResponse.json({ explanation });

  } catch (error) {
  console.error("API ERROR:", error);

  return NextResponse.json(
    { error: String(error) },
    { status: 500 }
  );
}
}