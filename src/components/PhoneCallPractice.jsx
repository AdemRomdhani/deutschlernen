import { useState } from "react";
import { speakGerman } from "../speech.js";

const SCENARIOS = [
  {
    key: "booking",
    de: "Buchung im Hotel",
    ar: "حجز في فندق",
    icon: "🏨",
    steps: [
      { speaker: "caller", de: "Guten Tag, ich hätte gegen {date} ein Zimmer für eine Nacht gebucht.", ar: "صباح الخير، لدي حجز لغرفة ليلة واحدة بتاريخ {date}." },
      { speaker: "receiver", de: "Guten Tag! Ja, das Buchungssystem zeigt hier ein Zimmer an.", ar: "مرحباً! نعم، نظام الحجوزات يظهر لغرفة هنا." },
      { speaker: "caller", de: "Könnten Sie mir helfen, das WLAN-Passwort zu erfahren?", ar: "هل يمكنك مساعدتي في الحصول على كلمة مرور الواي فاي؟" },
      { speaker: "receiver", de: "Natürlich, das WLAN heißt 'HotelFree' und das Passwort ist 'Willkommen123'.", ar: "بالطبع، الواي فاي يسمى 'HotelFree' وكلمة المرور 'Willkommen123'." },
    ],
  },
  {
    key: "complaint",
    de: "Beschwerde im Restaurant",
    ar: "شكاوى في مطعم",
    icon: "🍽️",
    steps: [
      { speaker: "caller", de: "Entschuldigung, meine Bestellung ist falsch.", ar: "أعتذر، طلبي غير صحيح." },
      { speaker: "receiver", de: "Wie bitte? Lassen Sie mich das für Sie korrigieren.", ar: "ماذا؟ دعني أصلح ذلك من أجلك." },
      { speaker: "caller", de: "Ich hätte die Suppe bestellt, nicht den Salat.", ar: "طلبتُ الحساء وليس السلطة." },
      { speaker: "receiver", de: "Das tut mir leid. Sofort bringe ich die Suppe.", ar: "أنا آسف. أجلب الحساء على الفور." },
    ],
  },
  {
    key: "info",
    de: "Informationen erfragen",
    ar: "الاستفسار عن معلومات",
    icon: "❓",
    steps: [
      { speaker: "caller", de: "Entschuldigung, wie komme ich zum Bahnhof?", ar: "عذراً، كيف أصل إلى المحطة؟" },
      { speaker: "receiver", de: "Gehen Sie geradeaus und dann rechts an der zweiten Ampel.", ar: "امشِ مستقيم ثم ثنايا عند الضوء الثاني." },
      { speaker: "caller", de: "Wie lange dauert das? عدد دقائق؟", ar: "كم من الوقت؟" },
      { speaker: "receiver", de: "Etwa 10 Minuten zu Fuß.", ar: "حوالي 10 دقائق على الأقدام." },
    ],
  },
  {
    key: "delivery",
    de: "Paketabholung",
    ar: "استلام طرد",
    icon: "📦",
    steps: [
      { speaker: "caller", de: "Guten Tag, ich habe ein Paket zur Abholung.", ar: "صباح الخير، لدي طرد للاستلام." },
      { speaker: "receiver", de: "Bitte hier unterschreiben.", ar: "من فضلك وقع هنا." },
      { speaker: "caller", de: "Ist alles in Ordnung?", ar: "هل كل شيء على ما يرام؟" },
      { speaker: "receiver", de: "Ja, vielen Dank. Einen schönen Tag noch!", ar: "نعم، شكراً لك. أمل أن يكون يومك جميل!" },
    ],
  },
  {
    key: "service",
    de: "Kundenservice",
    ar: "خدمة العملاء",
    icon: "📞",
    steps: [
      { speaker: "caller", de: "Mein Internet funktioniert nicht.", ar: "إنترنتي لا يعمل." },
      { speaker: "receiver", de: "Wir prüfen das sofort für Sie.", ar: "سنتحقق من ذلك فوراً من أجلك." },
      { speaker: "caller", de: "Wie lange brauchen Sie dafür?", ar: "كم من الوقت تحتاجون؟" },
      { speaker: "receiver", de: "Innerhalb von 30 Minuten ist ein Techniker da.", ar: "خلال 30 دقيقة سيصل فني." },
    ],
  },
];

const CHOICE_TEMPLATES = [
  { label: "نعم، من فضلك", value: "yes" },
  { label: "لا، شكراً", value: "no" },
  { label: "أين؟", value: "where" },
  { label: "كم الثمن؟", value: "price" },
  { label: "متى؟", value: "when" },
];

export default function PhoneCallPractice({ onBack }) {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [mode, setMode] = useState("listen"); // listen | practice
  const [step, setStep] = useState(0);
  const [highlightCorrect, setHighlightCorrect] = useState(null);

  const scenario = SCENARIOS[scenarioIdx];

  const playStep = () => {
    const s = scenario.steps[step];
    if (s) speakGerman(s.de, { rate: 0.85 });
  };

  const nextStep = () => {
    const sc = scenario.steps.length;
    if (step < sc - 1) setStep(s => s + 1);
    else setMode("listen");
  };

  const prevStep = () => setStep(s => Math.max(0, s - 1));

  const goToScenario = (idx) => {
    setScenarioIdx(idx);
    setStep(0);
    setMode("listen");
  };

  const currentStep = scenario.steps[step];

  const styles = {
    page: {
      direction: "rtl",
      textAlign: "right",
      minHeight: "100vh",
      background: "var(--bg)",
      color: "var(--text)",
      fontFamily: "var(--font-ar), sans-serif",
      padding: "20px",
    },
    container: { maxWidth: "760px", margin: "0 auto" },
    header: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" },
    backBtn: {
      background: "var(--card)",
      border: "1px solid var(--border)",
      color: "var(--text)",
      borderRadius: "12px",
      padding: "8px 16px",
      cursor: "pointer",
      fontSize: "14px",
    },
    title: { fontSize: "22px", fontWeight: 700, flexGrow: 1 },
    card: {
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "18px",
      padding: "22px",
      marginBottom: "18px",
      boxShadow: "var(--shadow-sm)",
    },
    picker: { display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" },
    scenarioBtn: {
      flex: "1 1 48%",
      border: "1px solid var(--border)",
      borderRadius: "12px",
      padding: "12px",
      cursor: "pointer",
      background: "var(--bg-soft)",
      color: "var(--text)",
      fontSize: "14px",
      fontWeight: 600,
      textAlign: "center",
    },
    scenarioActive: { background: "var(--primary)", color: "#fff" },
    modeToggle: { display: "flex", gap: "8px", justifyContent: "flex-end", marginBottom: "14px" },
    modeBtn: {
      border: "none",
      borderRadius: "12px",
      padding: "8px 14px",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "13px",
      background: "var(--bg)",
      color: "var(--text)",
    },
    modeActive: { background: "var(--primary)", color: "#fff" },
    dialogueBox: {
      background: "var(--bg-soft)",
      border: "1px solid var(--border)",
      borderRadius: "14px",
      padding: "18px",
      marginBottom: "14px",
      minHeight: "90px",
    },
    speakerTag: { fontSize: "12px", fontWeight: 700, marginBottom: "6px" },
    callerTag: { color: "#8b5cf6" },
    receiverTag: { color: "#10b981" },
    bubble: {
      fontSize: "16px",
      lineHeight: 1.5,
      padding: "8px 12px",
      borderRadius: "10px",
      marginBottom: "8px",
      background: "rgba(139, 92, 246, 0.08)",
    },
    nav: { display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "14px" },
    btn: {
      border: "none",
      borderRadius: "12px",
      padding: "10px 18px",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "14px",
    },
    btnPrimary: { background: "var(--primary)", color: "#fff" },
    btnPlay: { background: "#10b981", color: "#fff" },
    btnPrev: { background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" },
    choiceBox: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "10px",
      marginTop: "14px",
    },
    choiceBtn: {
      border: "1px solid var(--border)",
      borderRadius: "12px",
      padding: "12px",
      cursor: "pointer",
      background: "var(--bg-soft)",
      color: "var(--text)",
      fontSize: "14px",
      fontWeight: 600,
      textAlign: "center",
    },
    choiceCorrect: { background: "rgba(16, 193, 129, 0.2)", borderColor: "#10b981" },
    choiceWrong: { background: "rgba(239, 68, 68, 0.2)", borderColor: "#ef4444" },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backBtn} onClick={onBack}>← رجوع</button>
          <div style={styles.title}>ممارسة المكالمات الهاتفية</div>
        </div>

        <div style={styles.card}>
          <div style={styles.picker}>
            {SCENARIOS.map((s, i) => (
              <button
                key={s.key}
                style={{
                  ...styles.scenarioBtn,
                  ...(scenarioIdx === i ? styles.scenarioActive : {}),
                }}
                onClick={() => goToScenario(i)}
              >
                <span style={{ marginLeft: "6px" }}>{s.icon}</span>
                {s.de}
                <div style={{ fontSize: "12px", opacity: 0.8 }}>{s.ar}</div>
              </button>
            ))}
          </div>

          <div style={styles.modeToggle}>
            <button
              style={{ ...styles.modeBtn, ...(mode === "listen" ? styles.modeActive : {}) }}
              onClick={() => { setMode("listen"); setStep(0); }}
            >استماع</button>
            <button
              style={{ ...styles.modeBtn, ...(mode === "practice" ? styles.modeActive : {}) }}
              onClick={() => { setMode("practice"); setStep(0); }}
            >ممارسة</button>
          </div>

          <div style={styles.dialogueBox}>
            <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>
              {scenario.icon} {scenario.de} — {scenario.ar}
            </div>
            {currentStep && (
              <div>
                <span style={{ ...styles.speakerTag, ...(currentStep.speaker === "caller" ? styles.callerTag : styles.receiverTag) }}>
                  {currentStep.speaker === "caller" ? "المتصل" : "المستقبل"}
                </span>
                <div style={styles.bubble}>{currentStep.de}</div>
                <div style={{ fontSize: "14px", color: "var(--text-soft)" }}>{currentStep.ar}</div>
              </div>
            )}
          </div>

          <div style={styles.nav}>
            <button style={{ ...styles.btn, ...styles.btnPlay }} onClick={playStep}>🔊 استمع</button>
            <button style={{ ...styles.btn, ...styles.btnPrev }} onClick={prevStep}>السابق</button>
            {mode === "practice" && (
              <div style={styles.choiceBox}>
                {CHOICE_TEMPLATES.map(c => (
                  <button
                    key={c.value}
                    style={{
                      ...styles.choiceBtn,
                      ...(highlightCorrect === c.value ? styles.choiceCorrect : {}),
                    }}
                    onClick={() => speakGerman(c.label)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}
            <button style={{ ...styles.btn, ...styles.btnPrimary }} onClick={nextStep}>التالي</button>
          </div>

          <div style={{ fontSize: "12px", color: "var(--text-soft)", textAlign: "center", marginTop: "10px" }}>
            {scenario.steps.length} خطوات — الخطوة {step + 1}
          </div>
        </div>
      </div>
    </div>
  );
}
