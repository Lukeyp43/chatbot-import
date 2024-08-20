import { NextResponse } from "next/server";
import { Ai } from "@cloudflare/ai";

export async function POST(request: Request) {
  console.log("API route called");
  try {
    const { messages } = await request.json();
    console.log("Received messages:", JSON.stringify(messages));

    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    console.log("API Token set:", !!apiToken);
    if (!apiToken) {
      throw new Error("CLOUDFLARE_API_TOKEN is not set");
    }

    console.log("Initializing AI");
    const ai = new Ai(apiToken);

    console.log("Running AI model");
    const response = await ai.run("@cf/meta/llama-2-7b-chat-int8", {
      messages: messages.map((msg: { role: string; content: string }) => ({ role: msg.role, content: msg.content })),
    });

    console.log("AI response received:", JSON.stringify(response));

    if (typeof response === 'object' && response !== null) {
      return NextResponse.json({ response: JSON.stringify(response) });
    } else {
      console.log("Unexpected response type:", typeof response);
      return NextResponse.json({ response: String(response) });
    }

  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      { 
        error: "An error occurred", 
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}