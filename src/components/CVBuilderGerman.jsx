import { useState } from "react";
import { speakGerman } from "../speech.js";

const SECTION_LABELS = {
  personal: { de: "Persönliche Daten", ar: "البيانات الشخصية", examples: "Vorname, Nachname, E-Mail" },
  experience: { de: "Berufserfahrung", ar: "الخبرة المهنية", examples: "Firma, Position, Dauer" },
  education: { de: "Ausbildung", ar: "التعليم", examples: "Schule, Abschluss, Jahr" },
  skills: { de: "Fähigkeiten", ar: "المهارات", examples: "Sprachen, Soft Skills, IT" },
};

export default function CVBuilderGerman({ onBack }) {
  const [activeSection, setActiveSection] = useState("personal");
  const [data, setData] = useState({
    personal: { name: "أحمد محمد", email: "ahmed@example.com", phone: "+49 151 23456789", address: "برلين، ألمانيا" },
    experience: { company: "شركة ما", position: "محلل بيانات", duration: "2020 – حالياً", desc: "مسؤولية تحليل التقارير وإعداد التوصيات" },
    education: { school: "جامعة برلين للتكنولوجيا", degree: "إنسانيات ألمانية", year: "2016 – 2020" },
    skills: { languages: "ألمانية (C1)، إنجليزية (B2)، عربية (أميحة)", soft: "التخطيط، العمل الجماعي، حل المشكلات", it: "إكسل، باوربوينت، بيانات" },
  });
  const [textExport, setTextExport] = useState("");

  const updateField = (section, field, value) => {
    speakGerman(value, { rate: 0.9 });
    setData(d => ({ ...d, [section]: { ...d[section], [field]: value } }));
  };

  const generateExport = () => {
    let out = "=== سيرة ذاتية كاملة ===\n\n";
    out += `${SECTION_LABELS.personal.ar}: ${data.personal.name}\n`;
    out += `البريد الإلكتروني: ${data.personal.email}\n`;
    out += `الهاتف: ${data.personal.phone}\n`;
    out += `العنوان: ${data.personal.address}\n\n`;
    out += `${SECTION_LABELS.experience.ar}:\n`;
    out += `• ${data.experience.position} — ${data.experience.company} (${data.experience.duration})\n`;
    out += `  ${data.experience.desc}\n\n`;
    out += `${SECTION_LABELS.education.ar}:\n`;
    out += `• ${data.education.degree} — ${data.education.school} (${data.education.year})\n\n`;
    out += `${SECTION_LABELS.skills.ar}:\n`;
    out += `لغات: ${data.skills.languages}\n`;
    out += `مهارات ناعمة: ${data.skills.soft}\n`;
    out += `مهارات تقنية: ${data.skills.it}\n`;
    setTextExport(out);
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
    container: { maxWidth: "1000px", margin: "0 auto" },
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
    backBtnFix: {
      background: "var(--card)",
      border: "1px solid var(--border)",
      color: "var(--text)",
      borderRadius: "12px",
      padding: "8px 16px",
      cursor: "pointer",
      fontSize: "14px",
    },
    title: { fontSize: "22px", fontWeight: 700, flexGrow: 1 },
    tabsBox: { display: "flex", gap: "6px", marginBottom: "18px", flexWrap: "wrap" },
    tabBtn: {
      flex: 1,
      border: "1px solid var(--border)",
      borderRadius: "12px",
      padding: "10px 12px",
      cursor: "pointer",
      background: "var(--card)",
      color: "var(--text-soft)",
      fontSize: "13px",
      fontWeight: 600,
      textAlign: "center",
    },
    tabActive: { background: "var(--primary)", color: "#fff" },
    sectionCard: {
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "18px",
      padding: "22px",
      marginBottom: "18px",
      boxShadow: "var(--shadow-sm)",
    },
    sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" },
    sectionTitle: { fontSize: "16px", fontWeight: 600 },
    sectionDe: { color: "var(--primary)", fontSize: "14px" },
    exampleNote: { fontSize: "12px", color: "var(--text-soft)", marginTop: "4px" },
    fieldRow: { marginBottom: "14px" },
    fieldLabel: { fontSize: "13px", color: "var(--text-soft)", marginBottom: "6px", display: "block" },
    fieldInput: {
      width: "100%",
      padding: "10px 14px",
      borderRadius: "10px",
      border: "1px solid var(--border)",
      background: "var(--bg)",
      color: "var(--text)",
      fontSize: "15px",
      textAlign: "right",
    },
    fieldTextarea: {
      width: "100%",
      padding: "10px 14px",
      borderRadius: "10px",
      border: "1px solid var(--border)",
      background: "var(--bg)",
      color: "var(--text)",
      fontSize: "15px",
      textAlign: "right",
      minHeight: "70px",
      resize: "vertical",
    },
    actionsRow: { display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" },
    btn: {
      border: "none",
      borderRadius: "12px",
      padding: "10px 18px",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "14px",
    },
    btnExport: { background: "#10b981", color: "#fff" },
    btnReset: { background: "#ef4444", color: "#fff" },
    previewCard: {
      background: "var(--bg-soft)",
      border: "1px solid var(--border)",
      borderRadius: "18px",
      padding: "22px",
      marginTop: "18px",
      whiteSpace: "pre-wrap",
      fontFamily: '"Cairo", sans-serif, monospace',
      fontSize: "15px",
      direction: "rtl",
      textAlign: "right",
    },
    exportBox: {
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "18px",
      padding: "18px",
      marginTop: "18px",
    },
    exportArea: {
      width: "100%",
      minHeight: "180px",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid var(--border)",
      background: "var(--bg)",
      color: "var(--text)",
      fontFamily: "inherit",
      fontSize: "14px",
      textAlign: "right",
      direction: "rtl",
      resize: "vertical",
    },
  };

  const currentFields = data[activeSection];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backBtnFix} onClick={onBack}>← رجوع</button>
          <div style={styles.title}>منشئ السيرة الذاتية باللغة الألمانية (CV Builder)</div>
        </div>

        <div style={styles.tabsBox}>
          {Object.entries(SECTION_LABELS).map(([key, sec]) => (
            <button
              key={key}
              style={{
                ...styles.tabBtn,
                ...(activeSection === key ? styles.tabActive : {}),
              }}
              onClick={() => setActiveSection(key)}
            >
              {sec.de}
              <div style={{ fontSize: "11px", opacity: 0.8 }}>{sec.ar}</div>
            </button>
          ))}
        </div>

        <div style={styles.sectionCard}>
          <div style={styles.sectionHeader}>
            <div>
              <div style={styles.sectionTitle}>{SECTION_LABELS[activeSection].ar}</div>
              <div style={styles.sectionDe}>{SECTION_LABELS[activeSection].de}</div>
              <div style={styles.exampleNote}>مثال: {SECTION_LABELS[activeSection].examples}</div>
            </div>
          </div>

          {Object.entries(currentFields).map(([field, value]) => (
            <div key={field} style={styles.fieldRow}>
              <label style={styles.fieldLabel}>{field}:</label>
              {field === "desc" ? (
                <textarea
                  style={styles.fieldTextarea}
                  value={value || ""}
                  onChange={(e) => updateField(activeSection, field, e.target.value)}
                />
              ) : (
                <input
                  style={styles.fieldInput}
                  value={value || ""}
                  onChange={(e) => updateField(activeSection, field, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        <div style={styles.actionsRow}>
          <button style={{ ...styles.btn, ...styles.btnExport }} onClick={generateExport}>تصدير النص</button>
        </div>

        <div style={styles.previewCard}>
          <div style={{ fontWeight: 700, marginBottom: "8px", color: "var(--primary)" }}>معاينة حية</div>
          <div style={{ whiteSpace: "pre-wrap" }}>
            <strong>{SECTION_LABELS.personal.ar}:</strong> {data.personal.name}
            {"\n"}{data.personal.email} | {data.personal.phone}
            {"\n\n"}<strong>{SECTION_LABELS.experience.ar}:</strong>
            {"\n"}• {data.experience.position} — {data.experience.company} ({data.experience.duration})
            {"\n"}  {data.experience.desc}
            {"\n\n"}<strong>{SECTION_LABELS.education.ar}:</strong>
            {"\n"}• {data.education.degree} — {data.education.school} ({data.education.year})
            {"\n\n"}<strong>{SECTION_LABELS.skills.ar}:</strong>
            {"\n"}لغات: {data.skills.languages}
            {"\n"}مهارات ناعمة: {data.skills.soft}
            {"\n"}تقنية: {data.skills.it}
          </div>
        </div>

        {textExport && (
          <div style={styles.exportBox}>
            <div style={{ fontWeight: 700, marginBottom: "8px", color: "var(--primary)" }}>تصدير النص (انسخ واستخدم)</div>
            <textarea readOnly style={styles.exportArea} value={textExport} />
          </div>
        )}
      </div>
    </div>
  );
}
