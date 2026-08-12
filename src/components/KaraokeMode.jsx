import { useState, useEffect, useRef } from "react";
import { speakGerman, stopSpeaking } from "../speech.js";

const TEXTS = [
  {
    title: "Begrüßungen",
    titleAr: "التحيات",
    lines: [
      { de: "Hallo", ar: "مرحباً", pron: "هالو" },
      { de: "Guten Morgen", ar: "صباح الخير", pron: "غوتِن مورغن" },
      { de: "Guten Tag", ar: "مرحباً (بعد الظهر)", pron: "غوتِن تاغ" },
      { de: "Guten Abend", ar: "مساء الخير", pron: "غوتِن أبِنت" },
      { de: "Wie geht es Ihnen?", ar: "كيف حالك؟ (رسمية)", pron: "في غيت إس إينِن؟" },
      { de: "Mir geht es gut", ar: "أنا بخير", pron: "مير غيت إس غوت" },
      { de: "Danke, gut", ar: "شكراً، بخير", pron: "دانكه، غوت" },
      { de: "Auf Wiedersehen", ar: "إلى اللقاء (رسمية)", pron: "أوف فيدِرزيهِن" },
      { de: "Tschüss", ar: "إلى اللقاء (غير رسمية)", pron: "تشوس" },
      { de: "Bis morgen", ar: "إلى الغد", pron: "بيس مورغن" },
    ],
  },
  {
    title: "Im Restaurant",
    titleAr: "في المطعم",
    lines: [
      { de: "Einen Tisch für zwei, bitte", ar: "طاولة لاثنين من فضلك", pron: "آينِن تيش فير زواي، بيته" },
      { de: "Die Speisekarte, bitte", ar: "قائمة الطعام من فضلك", pron: "دي شبايزِكارته، بيته" },
      { de: "Ich möchte bestellen", ar: "أريد أن أطلب", pron: "إيش موشتِه بيستِلِن" },
      { de: "Ein Wasser, bitte", ar: "ماء من فضلك", pron: "آين فاسر، بيته" },
      { de: "Das schmeckt gut", ar: "هذا لذيذ", pron: "داس شميكت غوت" },
      { de: "Die Rechnung, bitte", ar: "الفاتورة من فضلك", pron: "دي رِכנونغ، بيته" },
      { de: "Kann ich mit Karte zahlen?", ar: "هل يمكنني الدفع بالبطاقة؟", pron: "كان إيش ميت كارته تسالِن؟" },
      { de: "Danke, es war lecker", ar: "شكراً، كان لذيذاً", pron: "دانكه، إس فار ليكر" },
    ],
  },
  {
    title: "Einkaufen",
    titleAr: "التسوق",
    lines: [
      { de: "Was kostet das?", ar: "كم ثمن هذا؟", pron: "فاس كوستِت داس؟" },
      { de: "Das ist zu teuer", ar: "هذا غالٍ جداً", pron: "داس إس تسو تويِر" },
      { de: "Haben Sie das in einer anderen Farbe?", ar: "هل لديكم هذا بلون آخر؟", pron: "هابِن إيه داس إين آندِرِر فاربه؟" },
      { de: "Ich nehme das", ar: "آخذ هذا", pron: "إيش نيهِمه داس" },
      { de: "Kann ich das umtauschen?", ar: "هل يمكنني استبدال هذا؟", pron: "كان إيش داس أُمتاوشِن؟" },
      { de: "Wo ist die Kasse?", ar: "أين الصندوق؟", pron: "فو إس ديه كاسِه؟" },
      { de: "Ist das im Angebot?", ar: "هل هذا في العرض؟",pron: "إس داس إم أنغِبوت؟" },
      { de: "Ein Packung, bitte", ar: "علبة من فضلك", pron: "آينِن پاكونغ، بيته" },
    ],
  },
  {
    title: "Im Hotel",
    titleAr: "في الفندق",
    lines: [
      { de: "Ich habe eine Reservierung", ar: "لدي حجز", pron: "إيش هابِه آينِه ريزِرفِيرونغ" },
      { de: "Einzelzimmer oder Doppelzimmer?", ar: "غرفة مفردة أو مزدوجة؟", pron: "آينزِلتسيمِر أودِر دوبِلتسيمِر؟" },
      { de: "Wo ist der Aufzug?", ar: "أين المصعد؟", pron: "فو إس دير أوفتسوق؟" },
      { de: "Um wie viel Uhr ist das Frühstück?", ar: "في أي وقت الفطور؟", pron: "أُم فيل أوهر إس داس فروشتوك؟" },
      { de: "Kann ich das WiFi Passwort haben?", ar: "هل يمكنني الحصول على كلمة سر الواي فاي؟", pron: "كان إيش داس واي فاي باسفورت هابِن؟" },
      { de: "Ich muss morgen früh auschecken", ar: "يجب أن أ离场 مبكراً غداً", pron: "إيش موس مورغن فروش أوسشيكيِن" },
      { de: "Können Sie mir ein Taxi rufen?", ar: "هل يمكنك استدعاء تاكسي لي؟", pron: "كيِنِن إيه مير آين تاكسي روفِن؟" },
      { de: "Danke für den Aufenthalt", ar: "شكراً على الإقامة", pron: "دانكه فير دير أوفِنتهالت" },
    ],
  },
  {
    title: "Notfälle",
    titleAr: "الطوارئ",
    lines: [
      { de: "Hilfe!", ar: "مساعدة!", pron: "هيلفِه!" },
      { de: "Rufen Sie einen Arzt!", ar: "استدعِ طبيباً!", pron: "روفِن إيه آينِن أركست!" },
      { de: "Wo ist das nächste Krankenhaus?", ar: "أين أقرب مستشفى؟", pron: "فو إس داس نيهِستِه كرانكِنهوس؟" },
      { de: "Ich habe Schmerzen", ar: "لدي ألم", pron: "إيش هابِه شميرتسِن" },
      { de: "Ich brauche Hilfe", ar: "أحتاج مساعدة", pron: "إيش براوخِه هيلفِه" },
      { de: "Rufen Sie die Polizei", ar: "استدعِ الشرطة", pron: "روفِن إيه ديه پوليتساي" },
      { de: "Ich habe meinen Pass verloren", ar: "فقدت جواز سفري", pron: "إيش هابِه مآينِن پاس فيرلورِن" },
      { de: "Notruf 112", ar: "رقم الطوارئ 112", pron: "نوترُف 112" },
    ],
  },
];

export default function KaraokeMode({ levelIdx, onBack, onComplete }) {
  const [selectedText, setSelectedText] = useState(null);
  const [currentWordIdx, setCurrentWordIdx] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [unknownWords, setUnknownWords] = useState([]);
  const [hoveredWord, setHoveredWord] = useState(null);
  const [completedTexts, setCompletedTexts] = useState([]);
  const wordRefs = useRef([]);

  useEffect(() => {
    return () => stopSpeaking();
  }, []);

  const speak = (text) => {
    stopSpeaking();
    speakGerman(text, {
      onStart: () => setIsPlaying(true),
      onEnd: () => {
        setIsPlaying(false);
        setCurrentWordIdx(-1);
      },
    });
  };

  const playWithHighlight = (lines) => {
    stopSpeaking();
    setCurrentWordIdx(0);
    setIsPlaying(true);
    let idx = 0;
    const speakNext = () => {
      if (idx < lines.length) {
        setCurrentWordIdx(idx);
        speakGerman(lines[idx].de, {
          onEnd: () => {
            idx++;
            setTimeout(speakNext, 300);
          },
        });
      } else {
        setIsPlaying(false);
        setCurrentWordIdx(-1);
      }
    };
    speakNext();
  };

  const toggleUnknownWord = (word) => {
    setUnknownWords(prev =>
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    );
  };

  const completeText = () => {
    if (!completedTexts.includes(selectedText.title)) {
      setCompletedTexts(prev => [...prev, selectedText.title]);
    }
    setSelectedText(null);
  };

  if (!selectedText) {
    return (
      <div style={{ padding: "20px 0" }}>
        <button className="back-btn" onClick={onBack}>← رجوع</button>

        <div className="game-head">
          <h2>🎤 وضع الكاريوكي — Karaoke Mode</h2>
          <p>تابع النص الألماني مع التشغيل، وعلّم الكلمات الصعبة</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16, maxWidth: 800, margin: "0 auto" }}>
          {TEXTS.map((text, idx) => (
            <div
              key={idx}
              className="lesson-card clickable"
              onClick={() => { setSelectedText(text); setUnknownWords([]); setCurrentWordIdx(-1); }}
              style={{ cursor: "pointer" }}
            >
              <div style={{ fontSize: 30, marginBottom: 8 }}>
                {completedTexts.includes(text.title) ? "✅" : "🎤"}
              </div>
              <h3>{text.title}</h3>
              <p style={{ color: "var(--text-soft)", fontSize: 14 }}>{text.titleAr}</p>
              <p style={{ color: "var(--text-soft)", fontSize: 13 }}>{text.lines.length} كلمة</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 0" }}>
      <button className="back-btn" onClick={() => setSelectedText(null)}>← رجوع للقائمة</button>

      <div className="game-head">
        <h2>🎤 {selectedText.title}</h2>
        <p>{selectedText.titleAr}</p>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 24 }}>
          <button
            className="btn btn-primary"
            onClick={() => playWithHighlight(selectedText.lines)}
            disabled={isPlaying}
          >
            {isPlaying ? "⏳ جاري التشغيل..." : "▶️ تشغيل مع التتبع"}
          </button>
          <button className="btn btn-ghost" onClick={() => { stopSpeaking(); setCurrentWordIdx(-1); setIsPlaying(false); }}>
            ⏹️ إيقاف
          </button>
          <button className="btn btn-ghost" onClick={completeText}>
            ✅ تم
          </button>
        </div>

        <div style={{
          background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius)",
          padding: 30, boxShadow: "var(--shadow-sm)", lineHeight: 2.5, fontSize: 20
        }}>
          {selectedText.lines.map((line, idx) => (
            <span
              key={idx}
              ref={el => wordRefs.current[idx] = el}
              onClick={() => toggleUnknownWord(line.de)}
              onMouseEnter={() => setHoveredWord(idx)}
              onMouseLeave={() => setHoveredWord(null)}
              style={{
                display: "inline-block",
                margin: "4px 6px",
                padding: "4px 10px",
                borderRadius: 8,
                cursor: "pointer",
                fontFamily: "var(--font-la)",
                fontWeight: 700,
                direction: "ltr",
                transition: "all 0.2s",
                background: currentWordIdx === idx
                  ? "rgba(37,99,235,0.2)"
                  : unknownWords.includes(line.de)
                    ? "rgba(239,68,68,0.1)"
                    : "transparent",
                borderBottom: unknownWords.includes(line.de) ? "2px solid #ef4444" : "none",
                transform: currentWordIdx === idx ? "scale(1.1)" : "scale(1)",
                position: "relative",
              }}
            >
              {line.de}
              {hoveredWord === idx && (
                <div style={{
                  position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)",
                  background: "var(--text)", color: "var(--bg)", padding: "6px 12px", borderRadius: 8,
                  fontSize: 14, whiteSpace: "nowrap", zIndex: 10, fontWeight: 800,
                  fontFamily: "var(--font-ar)", direction: "rtl",
                }}>
                  {line.ar}
                  <div style={{ fontSize: 12, color: "var(--text-soft)", fontFamily: "var(--font-la)", direction: "ltr" }}>
                    [{line.pron}]
                  </div>
                </div>
              )}
            </span>
          ))}
        </div>

        <div style={{ marginTop: 20, padding: 16, background: "var(--card)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
          <h4 style={{ marginBottom: 10 }}>الكلمات التي حددتها كصعبة:</h4>
          {unknownWords.length === 0 ? (
            <p style={{ color: "var(--text-soft)", fontSize: 14 }}>اضغط على أي كلمة لتحديدها كصعبة</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {unknownWords.map((w, i) => {
                const line = selectedText.lines.find(l => l.de === w);
                return (
                  <div key={i} style={{ padding: "8px 14px", borderRadius: 10, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
                    <div style={{ fontFamily: "var(--font-la)", fontWeight: 700, direction: "ltr" }}>{w}</div>
                    <div style={{ fontSize: 12, color: "var(--text-soft)" }}>{line?.ar}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
