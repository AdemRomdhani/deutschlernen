import { useState } from "react";
import { speakGerman } from "../speech.js";

const TOPICS = [
  { key: "weather", de: "Das Wetter", ar: "الطقس", icon: "☀️", start: "Wie ist das Wetter heute?", arStart: "كيف الطقس اليوم؟" },
  { key: "weekend", de: "Das Wochenende", ar: "نهاية الأسبوع", icon: "🎉", start: "Was machst du am Wochenende?", arStart: "ماذا تفعل في نهاية الأسبوع؟" },
  { key: "travel", de: "Die Reise", ar: "السفر", icon: "✈️", start: "Wo möchtest du reisen?", arStart: "إلى أين تحب تسافر؟" },
  { key: "food", de: "Das Essen", ar: "الطعام", icon: "🍽️", start: "Was ist dein Lieblingsessen?", arStart: "ما طبقك المفضل؟" },
  { key: "hobbies", de: "Die Hobbys", ar: "الهوايات", icon: "📚", start: "Was machst du in deiner Freizeit?", arStart: "ماذا تفعل في وقت فراغك؟" },
  { key: "news", de: "Die Nachrichten", ar: "الأخبار", icon: "📰", start: "Hast du von den Nachrichten gehört?", arStart: "سمعت ما في الأخبار؟" },
];

const CONVERSATIONS = {
  weather: [
    { speaker: "partner", de: "Wie ist das Wetter heute?", ar: "كيف الطقس اليوم؟" },
    { speaker: "me", de: "Es ist sonnig und warm. Perfekt für eine Wanderung!", ar: "طريق ومشمس وجميل للتخطيط!" },
    { speaker: "partner", de: "Ja, endlich sonniges Wetter!", ar: "نعم، أخيراً طقس مشمي!" },
  ],
  weekend: [
    { speaker: "partner", de: "Was planst du am Wochenende?", ar: "ماذا تخطط لعمله في نهاية الأسبوع؟" },
    { speaker: "me", de: "Ich möchte mit Freunden ins Kino gehen.", ar: "أريد أن أذهب إلى السينما مع أصدقائي." },
    { speaker: "partner", de: "Klingt Spaß! Magst du action?", ar: "يبدو ممتعاً! هل تحب الأفعال؟" },
  ],
  travel: [
    { speaker: "partner", de: "Wo warst du zum Urlaub dieses Jahr?", ar: "أين كنت في إجازتك هذا العام؟" },
    { speaker: "me", de: "Ich war in München. Die Stadt ist wunderschön!", ar: "ذهبت إلى ميونخ. المدينة جميلة حقاً!" },
    { speaker: "partner", de: "Ach wunderbar! Ich will dorthin auch.", ar: "آه جميل! أنا أيضا أريد أن أذهب هناك." },
  ],
  food: [
    { speaker: "partner", de: "Was ist dein Lieblingsdeutsches Essen?", ar: "ما طبق الألماني المفضل لديك؟" },
    { speaker: "me", de: "Ich liebe Brezeln mit Butter. Super lecker!", ar: "أحب البريتزل بالزبدة. لذيذ جداً!" },
    { speaker: "partner", de: "Ja, Brezeln sind klasse! Probierst du Sauerkraut?", ar: "نعم، البريتزل رائع! جربت المخلف المنقي؟" },
  ],
  hobbies: [
    { speaker: "partner", de: "Was machst du gern in deiner Freizeit?", ar: "ماذا تفعل في وقت فراغك؟" },
    { speaker: "me", de: "Ich lese Bücher und spiele Gitarre.", ar: "أقرأ كتب وأعزف على الجيتار." },
    { speaker: "partner", de: "Cool! Ich male auch gern.", ar: "رائع! أنا أيضا أحب الرسم." },
  ],
  news: [
    { speaker: "partner", de: "Hast du die Nachrichten heute gesehen?", ar: "هل رأيت الأخبار اليوم؟" },
    { speaker: "me", de: "Ja, es gab Nachrichten über Klimaschutz. Wichtig!", ar: "نعم، كانت هناك أخبار عن حماية المناخ. مهم!" },
    { speaker: "partner", de: "Stimmt. Umwelt schützen ist unsere Pflicht.", ar: "صحيح. حماية البيئة واجبنا." },
  ],
};

const CHOICES = [
  { de: "Das klingt super!", ar: "يبدو رائعاً!", value: "positive" },
  { de: "Das ist schade.", ar: "هذا للأسف.", value: "negative" },
  { de: "Erzähl mir mehr.", ar: "أخبرني المزيد.", value: "more" },
  { de: "Ich verstehe nicht.", ar: "أنا لا أفهم.", value: "confused" },
];

export default function SmallTalkPractice({ onBack }) {
  const [topicIdx, setTopicIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const [conversationEnded, setConversationEnded] = useState(false);

  const topic = TOPICS[topicIdx];
  const convo = CONVERSATIONS[topic.key];
  const current = convo[step];

  const handleChoice = (choice) => {
    speakGerman(choice.de, { rate: 0.9 });
  };

  const next = () => {
    if (step < convo.length - 1) {
      setStep(s => s + 1);
      setShowChoices(false);
    } else {
      setConversationEnded(true);
    }
  };

  const prev = () => {
    setStep(s => Math.max(0, s - 1));
    setConversationEnded(false);
  };

  const goTopic = (idx) => {
    setTopicIdx(idx);
    setStep(0);
    setShowChoices(false);
    setConversationEnded(false);
  };

  const replay = () => {
    speakGerman(current.de, { rate: 0.85 });
  };

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
    topicPicker: { display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" },
    topicBtn: {
      flex: "1 1 45%",
      border: "1px solid var(--border)",
      borderRadius: "12px",
      padding: "10px",
      cursor: "pointer",
      background: "var(--bg-soft)",
      color: "var(--text)",
      fontSize: "13px",
      fontWeight: 600,
      textAlign: "center",
    },
    topicActive: { background: "var(--primary)", color: "#fff" },
    topicBox: {
      background: "var(--bg-soft)",
      border: "1px solid var(--border)",
      borderRadius: "14px",
      padding: "16px",
      marginBottom: "14px",
    },
    topicHeader: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" },
    topicIcon: { fontSize: "20px" },
    topicName: { fontSize: "15px", fontWeight: 600 },
    topicAr: { fontSize: "13px", color: "var(--text-soft)" },
    dialogueBox: {
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "14px",
      padding: "18px",
      minHeight: "100px",
      marginBottom: "14px",
    },
    speakerTag: { fontSize: "12px", fontWeight: 700, marginBottom: "6px" },
    partnerTag: { color: "#8b5cf6" },
    meTag: { color: "#10b981" },
    bubbleDe: { fontSize: "17px", fontWeight: 600, marginBottom: "4px" },
    bubbleAr: { fontSize: "15px", color: "var(--text-soft)" },
    choicesBox: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", marginTop: "14px" },
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
    endBanner: {
      background: "rgba(16, 193, 129, 0.12)",
      border: "1px solid #10b981",
      borderRadius: "14px",
      padding: "18px",
      textAlign: "center",
      marginBottom: "14px",
    },
    endText: { color: "#10b981", fontWeight: 700, fontSize: "17px" },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backBtn} onClick={onBack}>← رجوع</button>
          <div style={styles.title}>ممارسة الحديث الاجتماعي</div>
        </div>

        <div style={styles.card}>
          <div style={styles.topicPicker}>
            {TOPICS.map((t, i) => (
              <button
                key={t.key}
                style={{
                  ...styles.topicBtn,
                  ...(topicIdx === i ? styles.topicActive : {}),
                }}
                onClick={() => goTopic(i)}
              >
                <span style={{ marginLeft: "6px" }}>{t.icon}</span>
                {t.de}
              </button>
            ))}
          </div>

          <div style={styles.topicBox}>
            <div style={styles.topicHeader}>
              <span style={styles.topicIcon}>{topic.icon}</span>
              <div>
                <div style={styles.topicName}>{topic.de} — {topic.ar}</div>
                <div style={styles.topicAr}>{topic.start} | {topic.arStart}</div>
              </div>
            </div>
          </div>

          {conversationEnded ? (
            <div style={styles.endBanner}>
              <div style={styles.endText}>انتهت المحادثة! 🎉</div>
              <div style={{ color: "var(--text-soft)", marginTop: "8px", fontSize: "14px" }}>اختر موضوعاً آخر أو استكمل الحوار.</div>
            </div>
          ) : (
            <div style={styles.dialogueBox}>
              <div style={styles.speakerTag}>
                <span style={current.speaker === "me" ? styles.meTag : styles.partnerTag}>
                  {current.speaker === "me" ? "أنا" : "الشريك"}
                </span>
              </div>
              <div style={styles.bubbleDe}>{current.de}</div>
              <div style={styles.bubbleAr}>{current.ar}</div>
              <button style={{ ...styles.btn, ...styles.btnPlay, marginTop: "10px", padding: "6px 12px", fontSize: "12px" }} onClick={replay}>🔊 استمع</button>
            </div>
          )}

          {!conversationEnded && step >= 1 && showChoices && (
            <div style={styles.choicesBox}>
              {CHOICES.map(c => (
                <button key={c.value} style={styles.choiceBtn} onClick={() => handleChoice(c)}>
                  <div>{c.de}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-soft)" }}>{c.ar}</div>
                </button>
              ))}
            </div>
          )}

          <div style={styles.nav}>
            {!conversationEnded && step >= 1 && (
              <button style={{ ...styles.btn, ...styles.btnPrev }} onClick={prev}>السابق</button>
            )}
            {!conversationEnded && (
              <button style={{ ...styles.btn, ...styles.btnPrimary }} onClick={() => {
                if (current.speaker === "partner" && step === convo.findIndex(c => c.speaker === "partner")) {
                  setShowChoices(true);
                } else {
                  next();
                }
              }}>التالي</button>
            )}
          </div>

          <div style={{ fontSize: "12px", color: "var(--text-soft)", textAlign: "center", marginTop: "10px" }}>
            الموقع {step + 1} من {convo.length}
          </div>
        </div>
      </div>
    </div>
  );
}
