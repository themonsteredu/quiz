"use client";

import { useState, useRef, useEffect } from "react";

const CHARACTERS = [
  {
    id: "sejong",
    era: "조선시대",
    hints: [
      "조선의 왕이니라.",
      "백성을 깊이 사랑하였느니라.",
      "글을 모르는 백성이 안타까워 큰일을 하였느니라.",
      "과학과 기술에도 깊은 관심을 가졌느니라.",
      "측우기, 해시계 등을 만들게 하였느니라.",
    ],
    answer: "세종대왕",
    altAnswers: ["세종", "세종 대왕"],
    personality: `너는 조선의 4대 왕이다. 지금은 1443년이다. 백성을 사랑하는 따뜻한 성격이고, 존댓말을 쓰되 왕의 위엄이 느껴지게 말해. 한글 창제, 과학기술, 국가 경영에 대해 전문가야. 질문하는 사람은 미래에서 온 중학생이야. 네가 살던 시대 기준으로 대답해줘.

중요 규칙:
- 절대 네 이름이나 "세종" "세종대왕"이라는 단어를 말하지 마.
- "과인"이라고 자칭해.
- 네가 누구냐고 물으면 "그것은 그대가 알아맞혀야 하느니라" 라고 답해.
- 힌트는 질문에 자연스럽게 녹여서 줘. 한번에 너무 많이 주지 마.
- 훈민정음이라는 단어도 직접 말하지 마. "새로운 글자" "백성을 위한 글" 등으로 돌려 말해.
- 답변은 2~3문장 이내로 짧게 해.`,
  },
  {
    id: "yi-sun-sin",
    era: "조선시대",
    hints: [
      "조선의 장군이니라.",
      "바다에서 큰 전쟁을 치렀느니라.",
      "특별한 배를 만들어 왜적을 물리쳤느니라.",
      "12척의 배로 수백 척을 이긴 적이 있느니라.",
      "전쟁 중에도 매일 일기를 썼느니라.",
    ],
    answer: "이순신",
    altAnswers: ["충무공", "충무공 이순신"],
    personality: `너는 조선시대의 위대한 장군이다. 지금은 임진왜란 시기(1592~1598년)이다. 나라를 지키는 것이 최우선이고, 강직하고 충직한 성격이야. 존댓말을 쓰되 무인의 기개가 느껴지게 말해. 해전, 군사 전략, 배 건조에 대해 전문가야.

중요 규칙:
- 절대 네 이름이나 "이순신"이라는 단어를 말하지 마.
- "이 몸"이라고 자칭해.
- 네가 누구냐고 물으면 "그것은 그대가 알아내야 할 것이오" 라고 답해.
- 거북선이라는 단어도 직접 말하지 마. "특별한 배" "철갑으로 덮은 배" 등으로 돌려 말해.
- 답변은 2~3문장 이내로 짧게 해.`,
  },
  {
    id: "jang-yeong-sil",
    era: "조선시대",
    hints: [
      "조선시대 사람이오.",
      "본래 낮은 신분이었으나 실력을 인정받았소.",
      "하늘과 시간에 관심이 많았소.",
      "비의 양을 재는 도구를 만들었소.",
      "왕의 총애를 받아 벼슬에 오른 과학자요.",
    ],
    answer: "장영실",
    altAnswers: [],
    personality: `너는 조선시대의 과학자이자 발명가이다. 지금은 세종 시기(1400년대 초중반)이다. 본래 관노 출신이지만 뛰어난 재주로 왕에게 발탁되었다. 겸손하고 탐구심이 강한 성격이야. 존댓말을 쓰되 학자의 진지함이 느껴지게 말해.

중요 규칙:
- 절대 네 이름이나 "장영실"이라는 단어를 말하지 마.
- "소인" 이라고 자칭해.
- 네가 누구냐고 물으면 "그것은 그대가 알아내셔야 하오" 라고 답해.
- 측우기, 자격루, 앙부일구 등의 이름을 직접 말하지 마. "비를 재는 그릇" "스스로 시간을 알리는 물시계" "해의 그림자로 시간을 아는 기구" 등으로 돌려 말해.
- 답변은 2~3문장 이내로 짧게 해.`,
  },
  {
    id: "shin-saimdang",
    era: "조선시대",
    hints: [
      "조선시대의 여인이오.",
      "그림과 글씨에 뛰어났소.",
      "자녀 교육에 남다른 철학이 있었소.",
      "풀과 벌레를 즐겨 그렸소.",
      "아들 중 한 명이 대학자가 되었소.",
    ],
    answer: "신사임당",
    altAnswers: ["사임당"],
    personality: `너는 조선시대의 예술가이자 어머니이다. 지금은 1500년대 중반이다. 그림과 서예에 뛰어나고, 자녀 교육에 깊은 신념을 가진 여인이야. 단아하고 지혜로운 성격이야. 존댓말을 쓰되 품위가 느껴지게 말해.

중요 규칙:
- 절대 네 이름이나 "신사임당" "사임당"이라는 단어를 말하지 마.
- "이 몸"이라고 자칭해.
- 네가 누구냐고 물으면 "그것은 그대가 알아내셔야 하지요" 라고 답해.
- "율곡 이이"라는 이름도 직접 말하지 마. "큰 학자가 된 아들" 등으로 돌려 말해.
- 답변은 2~3문장 이내로 짧게 해.`,
  },
  {
    id: "pythagoras",
    era: "고대 그리스",
    hints: [
      "나는 먼 서쪽 땅에서 왔노라.",
      "수(數)야말로 만물의 근원이라 믿노라.",
      "삼각형에 대해 깊이 연구하였노라.",
      "직각삼각형의 세 변에는 아름다운 비밀이 있노라.",
      "음악에서도 수의 조화를 발견하였노라.",
    ],
    answer: "피타고라스",
    altAnswers: [],
    personality: `너는 고대 그리스의 수학자이다. 지금은 기원전 500년경이다. 수학과 철학을 사랑하고, 만물의 근원이 수(數)라고 믿는다. 위엄 있고 신비로운 성격이야. 존댓말을 쓰되 철학자의 깊이가 느껴지게 말해.

중요 규칙:
- 절대 네 이름이나 "피타고라스"라는 단어를 말하지 마.
- "나" 또는 "이 사람"이라고 자칭해.
- 네가 누구냐고 물으면 "그것은 그대가 스스로 깨달아야 하느니라" 라고 답해.
- "피타고라스의 정리"라는 이름을 말하지 마. "직각삼각형의 비밀" "세 변의 조화" 등으로 돌려 말해.
- 답변은 2~3문장 이내로 짧게 해.`,
  },
];

const palette = {
  bg: "#1a1714",
  card: "#2a2520",
  cardHover: "#352f28",
  accent: "#d4a853",
  accentDim: "#b8923f",
  text: "#e8e0d4",
  textDim: "#9a9088",
  userBubble: "#3a3228",
  aiBubble: "#2a2520",
  hintBubble: "#2d2a1e",
  border: "#3a3530",
  success: "#4ade80",
};

const fonts = {
  display: "'Noto Serif KR', Georgia, serif",
  body: "'Noto Sans KR', -apple-system, sans-serif",
};

export default function Game() {
  const [screen, setScreen] = useState("home");
  const [character, setCharacter] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [hintIndex, setHintIndex] = useState(0);
  const [solved, setSolved] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const startGame = (char) => {
    setCharacter(char);
    setMessages([
      {
        role: "system",
        text: "어떤 역사 속 인물이 나타났습니다!\n질문을 해서 이 사람이 누구인지 알아맞혀 보세요. 🔍",
      },
      {
        role: "assistant",
        text: `허, 이곳이 어디인고...\n${char.hints[0]}\n그대, 무엇이 궁금하오?`,
      },
    ]);
    setQuestionCount(0);
    setHintIndex(1);
    setSolved(false);
    setScreen("chat");
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  const resetGame = () => {
    setScreen("home");
    setCharacter(null);
    setMessages([]);
    setInput("");
    setQuestionCount(0);
    setHintIndex(0);
    setSolved(false);
  };

  const getHint = () => {
    if (!character || hintIndex >= character.hints.length) return;
    setMessages((prev) => [
      ...prev,
      { role: "hint", text: `💡 힌트 ${hintIndex + 1}: ${character.hints[hintIndex]}` },
    ]);
    setHintIndex((prev) => prev + 1);
  };

  const checkAnswer = (text) => {
    const cleaned = text.replace(/\s/g, "");
    const answerCleaned = character.answer.replace(/\s/g, "");
    if (cleaned.includes(answerCleaned)) return true;
    for (const alt of character.altAnswers) {
      if (cleaned.includes(alt.replace(/\s/g, ""))) return true;
    }
    return false;
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading || solved) return;

    const userMsg = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setQuestionCount((prev) => prev + 1);

    if (checkAnswer(text)) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `오호, 그대가 마침내 알아냈구나! 그렇소, 바로 ${character.answer}이오. 🎉\n\n${questionCount + 1}번의 질문 만에 맞혔소!`,
        },
      ]);
      setSolved(true);
      setLoading(false);
      return;
    }

    try {
      const conversationHistory = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role, content: m.text }));
      conversationHistory.push({ role: "user", content: text });

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: character.personality,
          messages: conversationHistory,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "system", text: "⚠️ 오류가 발생했습니다. 다시 시도해주세요." },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: data.text || "..." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "system", text: "⚠️ 연결이 끊어졌습니다. 다시 시도해주세요." },
      ]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ─── Home Screen ───
  if (screen === "home") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: `linear-gradient(170deg, ${palette.bg} 0%, #0f0d0b 100%)`,
          color: palette.text,
          fontFamily: fonts.body,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 500, width: "100%", margin: "0 auto" }}>
          <div style={{ textAlign: "center", padding: "40px 0 32px" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏛️</div>
            <h1
              style={{
                fontFamily: fonts.display,
                fontSize: 28,
                fontWeight: 700,
                color: palette.accent,
                margin: "0 0 8px",
                letterSpacing: "0.02em",
              }}
            >
              역사 인물 추리
            </h1>
            <p style={{ color: palette.textDim, fontSize: 14, margin: 0, lineHeight: 1.6 }}>
              AI와 대화하며 숨겨진 인물의 정체를 밝혀보세요
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {CHARACTERS.map((char, idx) => (
              <button
                key={char.id}
                onClick={() => startGame(char)}
                style={{
                  background: palette.card,
                  border: `1px solid ${palette.border}`,
                  borderRadius: 12,
                  padding: "18px 20px",
                  color: palette.text,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontFamily: fonts.body,
                  fontSize: 15,
                  transition: "all 0.2s",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = palette.cardHover;
                  e.currentTarget.style.borderColor = palette.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = palette.card;
                  e.currentTarget.style.borderColor = palette.border;
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 600,
                      fontSize: 17,
                      marginBottom: 4,
                    }}
                  >
                    ???의 정체
                  </div>
                  <div style={{ color: palette.textDim, fontSize: 13 }}>
                    {char.era} · 난이도 {"⭐".repeat((idx % 3) + 1)}
                  </div>
                </div>
                <div style={{ color: palette.accent, fontSize: 20, fontWeight: 300 }}>→</div>
              </button>
            ))}
          </div>

          <div
            style={{
              marginTop: 28,
              padding: "18px 20px",
              background: palette.card,
              borderRadius: 12,
              border: `1px solid ${palette.border}`,
            }}
          >
            <div
              style={{
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: 14,
                color: palette.accent,
                marginBottom: 10,
              }}
            >
              📜 게임 방법
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.8, color: palette.textDim }}>
              1. 인물을 하나 선택하세요
              <br />
              2. 자유롭게 질문해서 정체를 추리하세요
              <br />
              3. 막히면 힌트 버튼을 눌러보세요
              <br />
              4. 알겠으면 이름을 채팅으로 보내세요!
              <br />
              5. 적은 질문으로 맞출수록 대단한 거예요!
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Chat Screen ───
  return (
    <div
      style={{
        height: "100vh",
        background: `linear-gradient(170deg, ${palette.bg} 0%, #0f0d0b 100%)`,
        color: palette.text,
        fontFamily: fonts.body,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          padding: "14px 16px",
          background: palette.card,
          borderBottom: `1px solid ${palette.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <button
          onClick={resetGame}
          style={{
            background: "none",
            border: "none",
            color: palette.textDim,
            fontSize: 14,
            cursor: "pointer",
            fontFamily: fonts.body,
            padding: "4px 8px",
          }}
        >
          ← 돌아가기
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 13 }}>
          <span style={{ color: palette.textDim }}>
            질문{" "}
            <span style={{ color: palette.accent, fontWeight: 600 }}>{questionCount}</span>회
          </span>
          <span style={{ color: palette.textDim }}>
            힌트{" "}
            <span style={{ color: palette.accent, fontWeight: 600 }}>{hintIndex}</span>/
            {character?.hints.length}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {messages.map((msg, i) => {
          if (msg.role === "system") {
            return (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  color: palette.accent,
                  fontSize: 13,
                  padding: "10px",
                  fontFamily: fonts.display,
                }}
              >
                {msg.text}
              </div>
            );
          }
          if (msg.role === "hint") {
            return (
              <div
                key={i}
                style={{
                  background: palette.hintBubble,
                  border: `1px solid ${palette.accentDim}33`,
                  borderRadius: 12,
                  padding: "10px 14px",
                  fontSize: 13,
                  color: palette.accent,
                  alignSelf: "center",
                  maxWidth: "85%",
                }}
              >
                {msg.text}
              </div>
            );
          }
          const isUser = msg.role === "user";
          return (
            <div key={i} style={{ alignSelf: isUser ? "flex-end" : "flex-start", maxWidth: "80%" }}>
              {!isUser && (
                <div
                  style={{ fontSize: 11, color: palette.textDim, marginBottom: 4, marginLeft: 4 }}
                >
                  🏛️ ???
                </div>
              )}
              <div
                style={{
                  background: isUser ? palette.userBubble : palette.aiBubble,
                  border: `1px solid ${palette.border}`,
                  borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  padding: "12px 16px",
                  fontSize: 14,
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap",
                  fontFamily: isUser ? fonts.body : fonts.display,
                }}
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        {loading && (
          <div style={{ alignSelf: "flex-start", maxWidth: "80%" }}>
            <div style={{ fontSize: 11, color: palette.textDim, marginBottom: 4, marginLeft: 4 }}>
              🏛️ ???
            </div>
            <div
              style={{
                background: palette.aiBubble,
                border: `1px solid ${palette.border}`,
                borderRadius: "16px 16px 16px 4px",
                padding: "12px 16px",
                fontSize: 14,
                color: palette.textDim,
              }}
            >
              생각 중
              <style>{`@keyframes blink{0%,80%{opacity:0}40%{opacity:1}}`}</style>
              <span
                style={{
                  display: "inline-block",
                  animation: "blink 1.4s infinite",
                }}
              >
                ...
              </span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Action Buttons */}
      {!solved && (
        <div style={{ padding: "8px 16px", display: "flex", gap: 8, flexShrink: 0 }}>
          <button
            onClick={getHint}
            disabled={hintIndex >= character?.hints.length}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: 10,
              border: `1px solid ${palette.border}`,
              background: palette.card,
              color:
                hintIndex >= character?.hints.length ? palette.textDim + "55" : palette.accent,
              fontSize: 13,
              fontFamily: fonts.body,
              cursor: hintIndex >= character?.hints.length ? "default" : "pointer",
              fontWeight: 500,
            }}
          >
            💡 힌트 보기
          </button>
        </div>
      )}

      {solved && (
        <div style={{ padding: "8px 16px", flexShrink: 0 }}>
          <button
            onClick={resetGame}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 10,
              border: "none",
              background: palette.accent,
              color: palette.bg,
              fontSize: 14,
              fontFamily: fonts.body,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            🔄 다른 인물 도전하기
          </button>
        </div>
      )}

      {/* Input Area */}
      {!solved && (
        <div
          style={{
            padding: "12px 16px 20px",
            background: palette.card,
            borderTop: `1px solid ${palette.border}`,
            display: "flex",
            gap: 10,
            alignItems: "flex-end",
            flexShrink: 0,
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="질문을 입력하세요... (정답을 알면 이름을 입력!)"
            rows={1}
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: 12,
              border: `1px solid ${palette.border}`,
              background: palette.bg,
              color: palette.text,
              fontSize: 14,
              fontFamily: fonts.body,
              resize: "none",
              outline: "none",
              lineHeight: 1.5,
            }}
            onFocus={(e) => (e.target.style.borderColor = palette.accent)}
            onBlur={(e) => (e.target.style.borderColor = palette.border)}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              border: "none",
              background: input.trim() && !loading ? palette.accent : palette.border,
              color: input.trim() && !loading ? palette.bg : palette.textDim,
              fontSize: 18,
              cursor: input.trim() && !loading ? "pointer" : "default",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
          >
            ↑
          </button>
        </div>
      )}
    </div>
  );
}
