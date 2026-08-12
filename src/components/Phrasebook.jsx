import { useState } from "react";
import { speakGerman } from "../speech.js";

const CATEGORIES = [
  { id: "airport", name: "المطار", nameDe: "Flughafen", icon: "✈️", phrases: [
    { de: "Wo ist der Check-in?", ar: "أين تسجيل الدخول؟" },
    { de: "Ich möchte einchecken", ar: "أريد تسجيل الدخول" },
    { de: "Wann geht mein Flug?", ar: "متى ينطلق رحلتي؟" },
    { de: "Mein Gepäck ist verloren", ar: "حقيبتي ضائعة" },
    { de: "Können Sie mir helfen?", ar: "هل يمكنك مساعدتي؟" },
    { de: "Wo ist die Gepäckausgabe?", ar: "أين استلام الأمتعة؟" },
  ]},
  { id: "hotel", name: "الفندق", nameDe: "Hotel", icon: "🏨", phrases: [
    { de: "Ich habe eine Reservierung", ar: "لدي حجز" },
    { de: "Wo ist der Aufzug?", ar: "أين المصعد؟" },
    { de: "Das WLAN funktioniert nicht", ar: "الواي فاي لا يعمل" },
    { de: "Um wie viel Uhr ist das Frühstück?", ar: "في أي وقت الفطور؟" },
    { de: "Ich muss morgen früh auschecken", ar: "يجب أن أغادر مبكراً غداً" },
    { de: "Können Sie mir ein Taxi rufen?", ar: "هل يمكنك استدعاء تاكسي؟" },
  ]},
  { id: "restaurant", name: "المطعم", nameDe: "Restaurant", icon: "🍽️", phrases: [
    { de: "Einen Tisch für zwei, bitte", ar: "طاولة لاثنين من فضلك" },
    { de: "Die Speisekarte, bitte", ar: "قائمة الطعام من فضلك" },
    { de: "Ich möchte bestellen", ar: "أريد أن أطلب" },
    { de: "Ein Wasser, bitte", ar: "ماء من فضلك" },
    { de: "Die Rechnung, bitte", ar: "الفاتورة من فضلك" },
    { de: "Danke, es war lecker", ar: "شكراً، كان لذيذاً" },
  ]},
  { id: "shopping", name: "التسوق", nameDe: "Einkaufen", icon: "🛒", phrases: [
    { de: "Was kostet das?", ar: "كم ثمن هذا؟" },
    { de: "Das ist zu teuer", ar: "هذا غالٍ جداً" },
    { de: "Ich nehme das", ar: "آخذ هذا" },
    { de: "Kann ich das umtauschen?", ar: "هل يمكنني استبدال هذا؟" },
    { de: "Wo ist die Kasse?", ar: "أين الصندوق؟" },
    { de: "Ist das im Angebot?", ar: "هل هذا في العرض؟" },
  ]},
  { id: "emergency", name: "الطوارئ", nameDe: "Notfall", icon: "🚨", phrases: [
    { de: "Hilfe!", ar: "مساعدة!" },
    { de: "Rufen Sie einen Arzt!", ar: "استدعِ طبيباً!" },
    { de: "Wo ist das nächste Krankenhaus?", ar: "أين أقرب مستشفى؟" },
    { de: "Ich habe Schmerzen", ar: "لدي ألم" },
    { de: "Rufen Sie die Polizei", ar: "استدعِ الشرطة" },
    { de: "Notruf 112", ar: "رقم الطوارئ 112" },
  ]},
  { id: "directions", name: "الاتجاهات", nameDe: "Wegweiser", icon: "🧭", phrases: [
    { de: "Wo ist der Bahnhof?", ar: "أين محطة القطار؟" },
    { de: "Wie komme ich zum Markt?", ar: "كيف أصل إلى السوق؟" },
    { de: "Gehen Sie geradeaus", ar: "امشِ مستقيماً" },
    { de: "Biegen Sie links ab", ar: "انعطف يساراً" },
    { de: "Biegen Sie rechts ab", ar: "انعطف يميناً" },
    { de: "Es ist in der Nähe", ar: "إنه قريب" },
  ]},
];

export default function Phrasebook({ onBack }) {
  const [selectedCat, setSelectedCat] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = selectedCat
    ? CATEGORIES.find(c => c.id === selectedCat)?.phrases.filter(
        p => !search || p.de.toLowerCase().includes(search.toLowerCase()) || p.ar.includes(search)
      ) || []
    : [];

  return (
    <div style={{ padding: "20px 0" }}>
      <button className="back-btn" onClick={onBack}>← رجوع</button>
      <div className="game-head">
        <h2>📖 دليل العبارات — Phrasebook</h2>
        <p>عبارات مفيدة للسفر والحياة اليومية</p>
      </div>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {!selectedCat ? (
          <>
            <input
              type="text"
              placeholder="ابحث في العبارات..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 16, marginBottom: 20, fontFamily: "var(--font-ar)" }}
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
              {CATEGORIES.map(cat => (
                <div key={cat.id} className="lesson-card clickable" onClick={() => setSelectedCat(cat.id)} style={{ cursor: "pointer", textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>{cat.icon}</div>
                  <h3>{cat.name}</h3>
                  <p style={{ color: "var(--text-soft)", fontSize: 14 }}>{cat.nameDe}</p>
                  <p style={{ color: "var(--text-soft)", fontSize: 12 }}>{cat.phrases.length} عبارة</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
              <button className="btn btn-ghost" onClick={() => setSelectedCat(null)}>← الفئات</button>
              <input
                type="text"
                placeholder="ابحث..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--card)", fontSize: 15, fontFamily: "var(--font-ar)" }}
              />
            </div>
            {filtered.map((p, i) => (
              <div key={i} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 18, marginBottom: 12, boxShadow: "var(--shadow-sm)" }}>
                <div style={{ fontFamily: "var(--font-la)", fontWeight: 800, fontSize: 20, direction: "ltr", marginBottom: 6 }}>{p.de}</div>
                <div style={{ color: "var(--text-soft)", fontSize: 16, marginBottom: 10 }}>{p.ar}</div>
                <button className="speak-btn" onClick={() => speakGerman(p.de)}>🔊 استمع</button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
