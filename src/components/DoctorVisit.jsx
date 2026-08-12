import { useState } from "react";
import { speakGerman } from "../speech.js";

const DIALOGUES = [
  {
    id: 1, scenario: ".patient mit Bauchschmerzen", scenarioAr: "مريض بآلام في المعدة",
    lines: [
      { speaker: "doctor", de: "Guten Tag, was fehlt Ihnen?", ar: "مرحباً، ما الذي يعاني منه؟", options: null },
      { speaker: "patient", de: "Guten Tag, Herr Doktor. Ich habe starke Bauchschmerzen.", ar: "مرحباً دكتور. أشكو من آلام شديدة في المعدة.", options: [
        "Guten Tag, Herr Doktor. Ich habe starke Bauchschmerzen.",
        "Guten Tag. Ich habe Kopfschmerzen.",
        "Hallo. Ich bin gesund.",
      ], correct: 0 },
      { speaker: "doctor", de: "Seit wann haben Sie die Schmerzen?", ar: "منذ متى تشعر بالألم؟", options: null },
      { speaker: "patient", de: "Seit gestern Abend. Nach dem Abendessen.", ar: "من الليلة الماضية. بعد العشاء.", options: [
        "Seit gestern Abend. Nach dem Abendessen.",
        "Seit einem Monat.",
        "Ich habe keine Schmerzen.",
      ], correct: 0 },
      { speaker: "doctor", de: "Ich muss Sie untersuchen. Bitte legen Sie sich hin.", ar: "يجب أن أفحصك. من فضلك استلقِ.", options: null },
      { speaker: "patient", de: "In Ordnung, Herr Doktor.", ar: "حسناً دكتور.", options: [
        "In Ordnung, Herr Doktor.",
        "Nein, danke.",
        "Ich gehe jetzt.",
      ], correct: 0 },
    ]
  },
  {
    id: 2, scenario: "Erkältung", scenarioAr: "نزلة برد",
    lines: [
      { speaker: "doctor", de: "Was kann ich für Sie tun?", ar: "كيف يمكنني مساعدتك؟", options: null },
      { speaker: "patient", de: "Ich habe Schnupfen und Halsschmerzen.", ar: "لدي زكام وآلام في الحلق.", options: [
        "Ich habe Schnupfen und Halsschmerzen.",
        "Ich habe Bauchschmerzen.",
        "Ich fühle mich gut.",
      ], correct: 0 },
      { speaker: "doctor", de: "Husten Sie auch?", ar: "هل تسعأ أيضاً؟", options: null },
      { speaker: "patient", de: "Ja, seit drei Tagen.", ar: "نعم، منذ ثلاثة أيام.", options: [
        "Ja, seit drei Tagen.",
        "Nein, ich huste nicht.",
        "Nur manchmal.",
      ], correct: 0 },
      { speaker: "doctor", de: "Ich verschreibe Ihnen ein Medikament.", ar: "سأصف لك دواءً.", options: null },
      { speaker: "patient", de: "Danke, Herr Doktor. Wie oft soll ich es nehmen?", ar: "شكراً دكتور. كم مرة يجب أن آخذه؟", options: [
        "Danke, Herr Doktor. Wie oft soll ich es nehmen?",
        "Nein, ich brauche kein Medikament.",
        "Wann kann ich wiederkommen?",
      ], correct: 0 },
    ]
  },
  {
    id: 3, scenario: "Kopfschmerzen", scenarioAr: "صداع",
    lines: [
      { speaker: "doctor", de: "Setzen Sie sich bitte. Was beschwert Sie?", ar: "اجلس من فضلك. ما الذي يعاني منه؟", options: null },
      { speaker: "patient", de: "Ich habe seit gestern starke Kopfschmerzen.", ar: "أشكو من صداع شديد منذ البارحة.", options: [
        "Ich habe seit gestern starke Kopfschmerzen.",
        "Mein Arm tut weh.",
        "Ich habe Fieber.",
      ], correct: 0 },
      { speaker: "doctor", de: "Haben Sie Medikamente genommen?", ar: "هل تناولت أدوية؟", options: null },
      { speaker: "patient", de: "Ja, aber es half nicht.", ar: "نعم، لكنه لم يساعد.", options: [
        "Ja, aber es half nicht.",
        "Nein, ich nehme keine Medikamente.",
        "Nur Aspirin.",
      ], correct: 0 },
      { speaker: "doctor", de: "Ich empfehle Ihnen eine Pause und viel Wasser.", ar: "أنصحك بالراحة وشرب الكثير من الماء.", options: null },
      { speaker: "patient", de: "Danke. Soll ich wiederkommen?", ar: "شكراً. هل يجب أن أعود؟", options: [
        "Danke. Soll ich wiederkommen?",
        "Nein, danke.",
        "Ich komme morgen wieder.",
      ], correct: 0 },
    ]
  },
  {
    id: 4, scenario: "Arztbesuch wegen Allergie", scenarioAr: "زيارة الطبيب بسبب حساسية",
    lines: [
      { speaker: "doctor", de: "Willkommen. Was ist Ihr Anliegen?", ar: "مرحباً. ما استفسارك؟", options: null },
      { speaker: "patient", de: "Ich habe rote Augen und viel Heuschnupfen.", ar: "لدي عيون حمراء وحساسية شديدة.", options: [
        "Ich habe rote Augen und viel Heuschnupfen.",
        "Ich habe Knieprobleme.",
        "Ich bin gesund.",
      ], correct: 0 },
      { speaker: "doctor", de: "Haben Sie bestimmte Auslöser bemerkt?", ar: "هل لاحظت محفزات معينة؟", options: null },
      { speaker: "patient", de: "Ja, besonders im Frühling, wenn die Blüten blühen.", ar: "نعم، خاصة في الربيع عندما تتفتح الأزهار.", options: [
        "Ja, besonders im Frühling, wenn die Blüten blühen.",
        "Nein, keine Ahnung.",
        "Im Winter ist es schlimmer.",
      ], correct: 0 },
      { speaker: "doctor", de: "Ich verschreibe Ihnen Antihistaminika.", ar: "سأصف لك مضادات الهيستامين.", options: null },
      { speaker: "patient", de: "Vielen Dank, Herr Doktor.", ar: "شكراً جزيلاً دكتور.", options: [
        "Vielen Dank, Herr Doktor.",
        "Das hilft nicht.",
        "Ich brauche das nicht.",
      ], correct: 0 },
    ]
  },
];

const MED_VOCAB = [
  { de: "der Arzt", ar: "الطبيب" }, { de: "die Ärztin", ar: "الطبيبة" },
  { de: "das Krankenhaus", ar: "المستشفى" }, { de: "die Apotheke", ar: "الصيدلية" },
  { de: "der Patient", ar: "المريض" }, { de: "die Patientin", ar: "المريضة" },
  { de: "die Krankheit", ar: "المرض" }, { de: "die Untersuchung", ar: "الفحص" },
  { de: "das Rezept", ar: "الوصفة الطبية" }, { de: "die Medikamente", ar: "الأدوية" },
  { de: "der Schmerz", ar: "الألم" }, { de: "das Fieber", ar: "الحمى" },
  { de: "der Kopf", ar: "الرأس" }, { de: "der Bauch", ar: "المعدة" },
  { de: "die Brust", ar: "الصدر" }, { de: "das Bein", ar: "الساق" },
  { de: "die Hand", ar: "اليد" }, { de: "das Auge", ar: "العين" },
];

export default function DoctorVisit({ onBack }) {
  const [selectedDialogue, setSelectedDialogue] = useState(null);
  const [currentLine, setCurrentLine] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showVocab, setShowVocab] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [history, setHistory] = useState([]);

  if (selectedDialogue) {
    const dialogue = selectedDialogue;
    const line = dialogue.lines[currentLine];
    const isQuestion = line.options !== null;

    const handleAnswer = (idx) => {
      setSelectedOption(idx);
      const correct = idx === line.correct;
      if (correct) setScore(s => s + 1);
      setHistory(h => [...h, { correct, speaker: line.speaker, text: line.options[idx] }]);
    };

    const next = () => {
      if (currentLine < dialogue.lines.length - 1) {
        setCurrentLine(c => c + 1);
        setSelectedOption(null);
      } else {
        setIsCompleted(true);
      }
    };

    if (isCompleted) {
      return (
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <button onClick={() => { setSelectedDialogue(null); setCurrentLine(0); setSelectedOption(null); setScore(0); setIsCompleted(false); setHistory([]); }} style={{ background: "none", border: "none", color: "var(--text)", fontSize: 16, cursor: "pointer", marginBottom: 16 }}>← العودة</button>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 12 }}>🏥</div>
            <h2>اكتملت المحاكاة!</h2>
            <div style={{ fontSize: 48, fontWeight: 800, margin: "16px 0", color: score > dialogue.lines.filter(l => l.options).length / 2 ? "#10b981" : "#ef4444" }}>{score}/{dialogue.lines.filter(l => l.options).length}</div>
            <div style={{ padding: 16, background: "var(--bg-soft)", borderRadius: 12, marginTop: 16, textAlign: "start" }}>
              <h3 style={{ margin: "0 0 8px", fontSize: 14 }}>الحوار:</h3>
              {history.map((h, i) => (
                <div key={i} style={{ padding: "8px 10px", marginBottom: 6, borderRadius: 8, background: h.correct ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", fontSize: 13 }}>
                  <span style={{ fontWeight: 700 }}>{h.speaker === "doctor" ? "👨‍⚕️" : "🧑"}</span> {h.text}
                </div>
              ))}
            </div>
            <button onClick={() => { setSelectedDialogue(null); setCurrentLine(0); setSelectedOption(null); setScore(0); setIsCompleted(false); setHistory([]); }} style={{ marginTop: 16, padding: "12px 24px", borderRadius: 10, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 700, cursor: "pointer" }}>العودة</button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <button onClick={() => { setSelectedDialogue(null); setCurrentLine(0); setSelectedOption(null); setScore(0); setHistory([]); }} style={{ background: "none", border: "none", color: "var(--text)", fontSize: 16, cursor: "pointer", marginBottom: 16 }}>← العودة</button>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <h2>🏥 {dialogue.scenarioAr}</h2>
            <div style={{ color: "var(--text-soft)", fontSize: 13 }}>{currentLine + 1}/{dialogue.lines.length} خطوة</div>
          </div>

          <div style={{ padding: 16, background: "var(--bg-soft)", borderRadius: 12, marginBottom: 16, border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 17, direction: "ltr", textAlign: "left", marginBottom: 6 }}>{line.de}</div>
            <div style={{ fontSize: 13, color: "var(--text-soft)" }}>{line.ar}</div>
            <button onClick={() => speakGerman(line.de)} style={{ marginTop: 8, padding: "6px 12px", borderRadius: 8, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>🔊</button>
          </div>

          {isQuestion ? (
            <div>
              <div style={{ fontSize: 13, color: "var(--text-soft)", marginBottom: 10 }}>اختر الرد المناسب:</div>
              {line.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selectedOption !== null}
                  style={{
                    display: "block", width: "100%", padding: "12px 14px", marginBottom: 8, borderRadius: 10, border: "2px solid",
                    borderColor: selectedOption !== null ? (i === line.correct ? "#10b981" : i === selectedOption ? "#ef4444" : "var(--border)") : "var(--border)",
                    background: selectedOption !== null ? (i === line.correct ? "rgba(16,185,129,0.1)" : i === selectedOption ? "rgba(239,68,68,0.1)" : "var(--bg)") : "var(--bg)",
                    color: "var(--text)", fontWeight: 500, cursor: selectedOption !== null ? "default" : "pointer", textAlign: "start", fontSize: 14
                  }}
                >
                  {["أ", "ب", "ج"][i]}. {opt}
                </button>
              ))}
              {selectedOption !== null && (
                <button onClick={next} style={{ width: "100%", marginTop: 12, padding: 12, borderRadius: 10, border: "none", background: "#3b82f6", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                  {currentLine < dialogue.lines.length - 1 ? "التالي →" : "إنهاء"}
                </button>
              )}
            </div>
          ) : (
            <button onClick={next} style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: "#3b82f6", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>التالي →</button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--text)", fontSize: 16, cursor: "pointer", marginBottom: 16 }}>← العودة</button>

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h2>🏥 زيارة الطبيب</h2>
        <p style={{ color: "var(--text-soft)" }}>تدرب على حوار الطبيب بالألمانية</p>
      </div>

      {DIALOGUES.map(d => (
        <div key={d.id} onClick={() => setSelectedDialogue(d)} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 20, marginBottom: 12, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#10b981"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ margin: "0 0 4px", fontSize: 16 }}>🏥 {d.scenarioAr}</h3>
              <div style={{ fontSize: 13, color: "var(--text-soft)" }}>{d.lines.length} خطوات</div>
            </div>
            <span style={{ padding: "3px 10px", borderRadius: 8, background: "rgba(16,185,129,0.1)", color: "#10b981", fontWeight: 600, fontSize: 12 }}>محادثة</span>
          </div>
        </div>
      ))}

      <div style={{ marginTop: 20, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>📚 مفردات طبية مهمة</h3>
        <button onClick={() => setShowVocab(!showVocab)} style={{ padding: "8px 16px", borderRadius: 10, border: "2px solid #8b5cf6", background: showVocab ? "#8b5cf6" : "transparent", color: showVocab ? "#fff" : "#8b5cf6", fontWeight: 700, cursor: "pointer", fontSize: 13, marginBottom: 12 }}>
          {showVocab ? "إخفاء المفردات" : "عرض المفردات"}
        </button>
        {showVocab && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {MED_VOCAB.map((v, i) => (
              <div key={i} onClick={() => speakGerman(v.de)} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "var(--bg-soft)", borderRadius: 10, border: "1px solid var(--border)", cursor: "pointer" }}>
                <span style={{ fontWeight: 700, direction: "ltr" }}>{v.de}</span>
                <span style={{ color: "var(--text-soft)" }}>{v.ar}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
