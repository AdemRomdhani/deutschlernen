import { useState, useRef, useEffect } from "react";
import { speakGerman } from "../speech.js";

const RESPONSES = {
  hallo: { de: "Hallo! Wie geht es dir?", ar: "مرحباً! كيف حالك؟" },
  "guten morgen": { de: "Guten Morgen! Schön dich zu sehen!", ar: "صباح الخير! سعيد برؤيتك!" },
  "guten tag": { de: "Guten Tag! Was kann ich für dich tun?", ar: "مرحباً! ماذا يمكنني أن أفعل لك؟" },
  "wie geht": { de: "Mir geht es gut, danke! Und dir?", ar: "أنا بخير، شكراً! وأنت؟" },
  danke: { de: "Bitte schön! Kann ich dir noch helfen?", ar: "عفواً! هل يمكنني مساعدتك بشيء آخر؟" },
  "danke schön": { de: "Gern geschehen! Frag mich gerne alles!", ar: "على الرحب والسعة! اسألني أي شيء!" },
  tschüss: { de: "Tschüss! Bis zum nächsten Mal!", ar: "إلى اللقاء! إلى المرة القادمة!" },
  "auf wiedersehen": { de: "Auf Wiedersehen! Es war schön mit dir zu sprechen!", ar: "إلى اللقاء! كان لطيفاً التحدث معك!" },
  bitte: { de: "Gern! Brauchst du noch Hilfe?", ar: "عفواً! هل تحتاج مساعدة أخرى؟" },
  "ich lerne deutsch": { de: "Das ist großartig! Deutsch ist eine schöne Sprache!", ar: "هذا رائع! الألمانية لغة جميلة!" },
  "wie heißt du": { de: "Ich bin dein Deutsch-Tutor! Wie heißt du?", ar: "أنا معلمك للألمانية! ما اسمك؟" },
  "was ist das": { de: "Das ist eine gute Frage! Kannst du mir mehr erzählen?", ar: "هذا سؤال جيد! هل يمكنك إخباري بمزيد من التفاصيل؟" },
  nein: { de: "Kein Problem! Versuchen wir es anders.", ar: "لا مشكلة! لنحاول بطريقة أخرى." },
  ja: { de: "Super! Das freut mich!", ar: "رائع! هذا يسعدني!" },
  help: { de: "Ich helfe dir gern! Was möchtest du lernen?", ar: "يسعدني مساعدتك! ماذا تريد أن تتعلم؟" },
  water: { de: "Wasser (فاسر) - das Wasser", ar: "ماء - فاسر" },
  food: { de: "Essen (إسن) - das Essen", ar: "طعام - إسن" },
  house: { de: "Haus (هاوس) - das Haus", ar: "منزل - هاوس" },
  cat: { de: "Katze (كاتسه) - die Katze", ar: "قطة - كاتسه" },
  dog: { de: "Hund (هوند) - der Hund", ar: "كلب - هوند" },
  yes: { de: "Ja (يا) - Ja, natürlich!", ar: "نعم - يا، طبعاً!" },
  no: { de: "Nein (ناين) - Nein, danke.", ar: "لا - ناين، شكراً." },
  hello: { de: "Hallo! Wie geht es dir?", ar: "مرحباً! كيف حالك؟" },
  goodbye: { de: "Tschüss! Bis bald!", ar: "إلى اللقاء! قريباً!" },
  please: { de: "Bitte (بيته) - Bitte schön!", ar: "من فضلك - بيته!" },
  sorry: { de: "Entschuldigung (إنتشولديغونغ) - Es tut mir leid!", ar: "آسف - إنتشولديغونغ!" },
  name: { de: "Mein Name ist... (ماين نامه إس...) - Wie heißt du?", ar: "اسمي... - ماين نامه إس..." },
  "good morning": { de: "Guten Morgen! (غوتِن مورغن!)", ar: "صباح الخير! غوتِن مورغن!" },
  "good evening": { de: "Guten Abend! (غوتِن أبِنت!)", ar: "مساء الخير! غوتِن أبِنت!" },
  numbers: { de: "eins (1), zwei (2), drei (3), vier (4), fünf (5), sechs (6), sieben (7), acht (8), neun (9), zehn (10)", ar: "واحد، اثنان، ثلاثة، أربعة، خمسة، ستة، سبعة، ثمانية، تسعة، عشرة" },
  family: { de: "die Mutter (الأم), der Vater (الأب), die Schwester (الأخت), der Bruder (الأخ)", ar: "الأم، الأب، الأخت، الأخ" },
};

function getResponse(input) {
  const lower = input.toLowerCase().trim();
  for (const [key, val] of Object.entries(RESPONSES)) {
    if (lower.includes(key)) return val;
  }
  if (lower.match(/\d/)) {
    return { de: "Zahlen sind wichtig! Kannst du sie aussprechen?", ar: "الأرقام مهمة! هل تستطيع نطقها؟" };
  }
  if (lower.length < 3) {
    return { de: "Kannst du mehr schreiben? Ich möchte dich besser verstehen.", ar: "هل يمكنك كتابة المزيد؟ أريد فهمك بشكل أفضل." };
  }
  if (/[a-z]{3,}/i.test(lower) && !/[äöüß]/i.test(lower)) {
    return { de: `Versuch es auf Deutsch! "${lower}" heißt...`, ar: `حاول بالألمانية! "${lower}" يعني...` };
  }
  return { de: "Interessant! Kannst du das auf Deutsch schreiben?", ar: "مثير للاهتمام! هل يمكنك كتابة ذلك بالألمانية؟" };
}

export default function AITutorChat({ onBack }) {
  const [messages, setMessages] = useState([
    { role: "bot", de: "Hallo! Ich bin dein Deutsch-Tutor. Frag mich anything auf Deutsch oder Englisch!", ar: "مرحباً! أنا معلمك للألمانية. اسألني أي شيء بالألمانية أو الإنجليزية!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const resp = getResponse(userMsg.text);
      setMessages(prev => [...prev, { role: "bot", ...resp }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <button className="back-btn" onClick={onBack}>← رجوع</button>
      <div className="game-head">
        <h2>🤖 مدرس الذكاء الاصطناعي — AI Tutor</h2>
        <p>تدرب على المحادثة بالألمانية</p>
      </div>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div ref={chatRef} style={{ height: 420, overflowY: "auto", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 16, marginBottom: 14, display: "flex", flexDirection: "column", gap: 10 }}>
          {messages.map((m, i) => (
            <div key={i} className={`chat-bubble ${m.role === "user" ? "mine" : ""}`} style={{ maxWidth: "85%", alignSelf: m.role === "user" ? "flex-end" : "flex-start" }}>
              {m.role === "bot" ? (
                <>
                  <div style={{ fontWeight: 700, direction: "ltr", fontFamily: "var(--font-la)" }}>{m.de}</div>
                  {m.ar && <div style={{ color: "var(--text-soft)", fontSize: 13, marginTop: 4 }}>{m.ar}</div>}
                  <button className="speak-btn" style={{ marginTop: 6, padding: "4px 10px", fontSize: 12 }} onClick={() => speakGerman(m.de)}>🔊</button>
                </>
              ) : (
                <div style={{ fontWeight: 700 }}>{m.text}</div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="chat-bubble" style={{ alignSelf: "flex-start", maxWidth: 80 }}>
              <span style={{ animation: "pulse-wave 1s infinite" }}>...</span>
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="اكتب بالألمانية أو الإنجليزية..."
            style={{ flex: 1, padding: "14px 18px", borderRadius: 14, border: "2px solid var(--border)", background: "var(--card)", fontSize: 16, fontFamily: "var(--font-ar)", outline: "none" }}
          />
          <button className="btn btn-primary" onClick={sendMessage} disabled={!input.trim()}>إرسال</button>
        </div>
      </div>
    </div>
  );
}
