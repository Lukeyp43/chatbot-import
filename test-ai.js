require('dotenv').config();
const { Ai } = require('@cloudflare/ai');

async function testAi() {
  if (!process.env.CLOUDFLARE_API_TOKEN) {
    console.error("CLOUDFLARE_API_TOKEN is not set in the environment variables");
    return;
  }

  const ai = new Ai(process.env.CLOUDFLARE_API_TOKEN);
  try {
    const response = await ai.run("@cf/meta/llama-2-7b-chat-int8", {
      messages: [{ role: "user", content: "Hello, how are you?" }],
    });
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error.message);
    if (error.stack) {
      console.error("Stack trace:", error.stack);
    }
  }
}

testAi();