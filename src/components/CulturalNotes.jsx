import { useState } from "react";
import { speakGerman } from "../speech.js";

const NOTES = [
  { id: 1, cat: "customs", title: "التحيات الألمانية", titleDe: "Begrüßungen", icon: "👋",
    text: "الألمان يصافحون بقوة ويอมرون بالنظر في عينين الشخص. في المواقف الرسمية يُستخدم \"Sie\" (حضرتك)، بينما \"du\" (أنت) للقريبين.",
    textDe: "Deutsche geben beim Händeschütteln fest zu und schauen dabei in die Augen.", level: "A1" },
  { id: 2, cat: "food", title: "ثقافة البيرة", titleDe: "Bierkultur", icon: "🍺",
    text: "ألمانيا بها أكثر من 1500 مصنع بيرة. البيرة Bavarian Weissbier تُشرب في كؤوس خاصة. \"Prost\" تعني صحتك!",
    textDe: "Prost! In Deutschland gibt es über 1500 Brauereien.", level: "A1" },
  { id: 3, cat: "etiquette", title: "الدقة في ألمانيا", titleDe: "Pünktlichkeit", icon: "⏰",
    text: "الدقة فضيلة ألمانية. الوصول في الموعد هو احترام للآخرين. التأخير حتى دقائق قليلة يعتبر قلة احترام.",
    textDe: "Pünktlichkeit ist eine deutsche Tugend. Zu spät zu kommen gilt als respektlos.", level: "A1" },
  { id: 4, cat: "history", title: "الجدار البرليني", titleDe: "Berliner Mauer", icon: "🧱",
    text: "الجدار البرليني قسم ألمانيا من 1961 إلى 1989. سقوطه كان نقطة تحول في تاريخ ألمانيا والعالم.",
    textDe: "Die Berliner Mauer teilte Deutschland von 1961 bis 1989.", level: "A2" },
  { id: 5, cat: "food", title: "الخبز الألماني", titleDe: "Deutsches Brot", icon: "🍞",
    text: "ألمانيا بها أكثر من 3000 نوع خبز! الخبز الألماني مشهور عالمياً بتنوعه وجودته العالية.",
    textDe: "In Deutschland gibt es über 3000 Brotarten!", level: "A1" },
  { id: 6, cat: "customs", title: "キリスト教MAS", titleDe: "Weihnachten", icon: "🎄",
    text: "الكريسماس يُحتفل به في 24 ديسمبر (Heiligabend). الأطفال يفتحون الهدايا في المساء. الأكل التقليدي: Glühwein و Stollen.",
    textDe: "Heiligabend ist der wichtigste Tag. Die Kinder öffnen die Geschenke am Abend.", level: "A2" },
  { id: 7, cat: "etiquette", title: "قواعد الطاولة", titleDe: "Tischmanieren", icon: "🍽️",
    text: "عند الأكل في ألمانيا، ضع يديك على الطاولة (لا تحتها). انتظر حتى يقول صاحب البيت \"Guten Appetit\" قبل الأكل.",
    textDe: "Legen Sie die Hände auf den Tisch. Warten Sie auf \"Guten Appetit\".", level: "A2" },
  { id: 8, cat: "history", title: "النظام التعليمي", titleDe: "Bildungssystem", icon: "🎓",
    text: "التعليم الجامعي في ألمانيا مجاني تقريباً حتى للطلاب الدوليين. النظام ينقسم إلى Grundschule و Gymnasium و Realschule.",
    textDe: "Studium in Deutschland ist kostenlos, auch für internationale Studenten.", level: "B1" },
  { id: 9, cat: "customs", title: "ycling culture", titleDe: "Fahrradkultur", icon: "🚲",
    text: "الدراجة وسيلة نقل شائعة جداً في ألمانيا. المدن لها مسارات دراجات مخصصة. ميونخ و برلين و هامبورغ من أفضل المدن للدراجات.",
    textDe: "Das Fahrrad ist ein beliebtes Verkehrsmittel in Deutschland.", level: "A2" },
  { id: 10, cat: "food", title: "Kaffee und Kuchen", titleDe: "Kaffee und Kuchen", icon: "☕",
    text: "تقليد Kaffee und Kuchen (قهوة وكعكة) شائع بعد الظهر. الألمان يحبون تناول الكعك مع القهوة في الظهر.",
    textDe: "Kaffee und Kuchen ist eine deutsche Tradition am Nachmittag.", level: "B1" },
];

export default function CulturalNotes({ onBack }) {
  const [selectedNote, setSelectedNote] = useState(null);
  const [filter, setFilter] = useState("all");

  const cats = { all: "الكل", customs: "العادات", food: "الطعام", history: "التاريخ", etiquette: "الآداب" };
  const filtered = filter === "all" ? NOTES : NOTES.filter(n => n.cat === filter);

  return (
    <div style={{ padding: "20px 0" }}>
      <button className="back-btn" onClick={onBack}>← رجوع</button>
      <div className="game-head">
        <h2>🇩🇪 ملاحظات ثقافية — Cultural Notes</h2>
        <p>تعرّف على الثقافة الألمانية والعادات</p>
      </div>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {selectedNote ? (
          <div>
            <button className="back-btn" onClick={() => setSelectedNote(null)}>← رجوع</button>
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 28, boxShadow: "var(--shadow)" }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>{selectedNote.icon}</div>
              <h2 style={{ marginBottom: 4 }}>{selectedNote.title}</h2>
              <div style={{ fontFamily: "var(--font-la)", color: "var(--primary)", fontWeight: 700, marginBottom: 6 }}>{selectedNote.titleDe}</div>
              <span style={{ padding: "3px 10px", borderRadius: 10, background: "rgba(37,99,235,0.1)", color: "var(--primary)", fontSize: 13, fontWeight: 700 }}>{selectedNote.level}</span>
              <div style={{ marginTop: 16, lineHeight: 2, fontSize: 16 }}>{selectedNote.text}</div>
              <div style={{ marginTop: 12, padding: 14, background: "var(--bg-soft)", borderRadius: 12, fontFamily: "var(--font-la)", direction: "ltr", textAlign: "left", fontWeight: 600 }}>{selectedNote.textDe}</div>
              <button className="speak-btn" style={{ marginTop: 14 }} onClick={() => speakGerman(selectedNote.textDe)}>🔊 استمع</button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20, justifyContent: "center" }}>
              {Object.entries(cats).map(([key, label]) => (
                <button key={key} className={`tab ${filter === key ? "active" : ""}`} onClick={() => setFilter(key)}>{label}</button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
              {filtered.map(n => (
                <div key={n.id} className="lesson-card clickable" onClick={() => setSelectedNote(n)} style={{ cursor: "pointer", textAlign: "center" }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{n.icon}</div>
                  <h3 style={{ fontSize: 16 }}>{n.title}</h3>
                  <p style={{ color: "var(--text-soft)", fontSize: 13 }}>{n.titleDe}</p>
                  <span style={{ fontSize: 12, color: "var(--primary)", fontWeight: 700 }}>{n.level}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
