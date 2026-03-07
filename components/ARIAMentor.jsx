"use client";
import { useState, useRef, useEffect } from "react";

const ARIA_API = process.env.NEXT_PUBLIC_MENTOR_API || "http://localhost:8000";

export default function ARIAMentor() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Merhaba Samet. Ben ARIA — M'Éternelle'in AI mentoru. Ne üzerine çalışıyoruz?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch(`${ARIA_API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: fullText };
          return updated;
        });
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Bağlantı hatası. Backend çalışıyor mu?" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      background: "#0a0a0a",
      fontFamily: "'Syne', sans-serif",
      color: "#e8e0d5",
    }}>
      {/* Header */}
      <div style={{
        padding: "20px 32px",
        borderBottom: "1px solid #1e1e1e",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "#0a0a0a",
      }}>
        <div style={{
          width: 10, height: 10, borderRadius: "50%",
          background: loading ? "#f5a623" : "#4caf50",
          boxShadow: loading ? "0 0 8px #f5a623" : "0 0 8px #4caf50",
          transition: "all 0.3s",
        }} />
        <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.1em" }}>ARIA</span>
        <span style={{ fontSize: 12, color: "#555", marginLeft: 4 }}>M'Éternelle AI Mentor</span>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
          }}>
            <div style={{
              maxWidth: "70%",
              padding: "14px 20px",
              borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              background: msg.role === "user" ? "#1a1a2e" : "#111",
              border: msg.role === "user" ? "1px solid #2a2a4e" : "1px solid #1e1e1e",
              fontSize: 14,
              lineHeight: 1.7,
              whiteSpace: "pre-wrap",
              color: msg.role === "user" ? "#a0a8ff" : "#e8e0d5",
            }}>
              {msg.content}
              {loading && i === messages.length - 1 && msg.role === "assistant" && (
                <span style={{ opacity: 0.5 }}>▌</span>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: "20px 32px",
        borderTop: "1px solid #1e1e1e",
        display: "flex",
        gap: "12px",
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          placeholder="ARIA'ya sor..."
          disabled={loading}
          style={{
            flex: 1,
            background: "#111",
            border: "1px solid #2a2a2a",
            borderRadius: 12,
            padding: "12px 18px",
            color: "#e8e0d5",
            fontSize: 14,
            outline: "none",
            fontFamily: "'Syne', sans-serif",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{
            padding: "12px 24px",
            background: loading ? "#1a1a2e" : "#2a2a6e",
            border: "1px solid #3a3a9e",
            borderRadius: 12,
            color: "#a0a8ff",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "'Syne', sans-serif",
            transition: "all 0.2s",
          }}
        >
          {loading ? "..." : "Gönder"}
        </button>
      </div>
    </div>
  );
}
