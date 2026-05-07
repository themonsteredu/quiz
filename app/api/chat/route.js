import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { messages, system } = await request.json();

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        system,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      const summary = `status=${response.status} hasKey=${Boolean(
        process.env.ANTHROPIC_API_KEY
      )} type=${data.error?.type} msg=${data.error?.message}`;
      console.error("ANTHROPIC_FAIL " + summary);
      return NextResponse.json(
        { error: data.error?.message || `Upstream ${response.status}` },
        { status: 500 }
      );
    }

    const text = data.content
      ?.filter((c) => c.type === "text")
      .map((c) => c.text)
      .join("");

    return NextResponse.json({ text: text || "..." });
  } catch (err) {
    console.error("Chat route exception", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
