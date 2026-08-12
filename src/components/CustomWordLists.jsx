import { useState, useEffect } from "react";
import { speakGerman } from "../speech.js";

function loadLists() {
  try { return JSON.parse(localStorage.getItem("customWordLists") || "[]"); } catch { return []; }
}
function saveLists(lists) { localStorage.setItem("customWordLists", JSON.stringify(lists)); }

export default function CustomWordLists({ onBack }) {
  const [lists, setLists] = useState(loadLists);
  const [selectedList, setSelectedList] = useState(null);
  const [newName, setNewName] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [newDe, setNewDe] = useState("");
  const [newAr, setNewAr] = useState("");
  const [practiceMode, setPracticeMode] = useState(false);
  const [flashIdx, setFlashIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => { saveLists(lists); }, [lists]);

  const createList = () => {
    if (!newName.trim()) return;
    setLists(prev => [...prev, { id: Date.now(), name: newName.trim(), words: [] }]);
    setNewName("");
    setShowCreate(false);
  };

  const deleteList = (id) => {
    setLists(prev => prev.filter(l => l.id !== id));
    setSelectedList(null);
  };

  const addWord = () => {
    if (!newDe.trim() || !newAr.trim() || !selectedList) return;
    setLists(prev => prev.map(l => l.id === selectedList.id ? { ...l, words: [...l.words, { de: newDe.trim(), ar: newAr.trim() }] } : l));
    setNewDe(""); setNewAr("");
    setSelectedList(prev => ({ ...prev, words: [...prev.words, { de: newDe.trim(), ar: newAr.trim() }] }));
  };

  const deleteWord = (listId, wordIdx) => {
    setLists(prev => prev.map(l => l.id === listId ? { ...l, words: l.words.filter((_, i) => i !== wordIdx) } : l));
    if (selectedList?.id === listId) {
      setSelectedList(prev => ({ ...prev, words: prev.words.filter((_, i) => i !== wordIdx) }));
    }
  };

  const startPractice = () => {
    if (!selectedList || selectedList.words.length === 0) return;
    setPracticeMode(true);
    setFlashIdx(0);
    setFlipped(false);
  };

  if (practiceMode && selectedList) {
    const words = selectedList.words;
    const word = words[flashIdx];
    return (
      <div style={{ padding: "20px 0" }}>
        <button className="back-btn" onClick={() => setPracticeMode(false)}>← رجوع</button>
        <div className="game-head">
          <h2>🃏 مراجعة: {selectedList.name}</h2>
          <div className="game-score"><span>{flashIdx + 1}/{words.length}</span></div>
        </div>
        <div style={{ maxWidth: 460, margin: "0 auto", perspective: 1200 }}>
          <div onClick={() => setFlipped(f => !f)} style={{
            height: 280, cursor: "pointer", position: "relative", transformStyle: "preserve-3d",
            transition: "transform 0.6s", transform: flipped ? "rotateY(180deg)" : "none"
          }}>
            <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", borderRadius: 20, background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow)" }}>
              <div style={{ fontFamily: "var(--font-la)", fontWeight: 800, fontSize: 40, direction: "ltr", marginBottom: 10 }}>{word.de}</div>
              <button className="speak-btn" onClick={e => { e.stopPropagation(); speakGerman(word.de); }}>🔊</button>
              <div style={{ marginTop: 14, color: "var(--text-soft)", fontSize: 14 }}>اضغط للقلب</div>
            </div>
            <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderRadius: 20, background: "linear-gradient(135deg, var(--primary), var(--primary-2))", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow)", padding: 20 }}>
              <div style={{ fontSize: 36, fontWeight: 900, marginBottom: 8 }}>{word.ar}</div>
              <div style={{ fontFamily: "var(--font-la)", fontSize: 18, opacity: 0.9 }}>{word.de}</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
          <button className="btn btn-ghost" onClick={() => { setFlashIdx(i => Math.max(0, i - 1)); setFlipped(false); }} disabled={flashIdx === 0}>← السابق</button>
          <button className="btn btn-primary" onClick={() => { if (flashIdx < words.length - 1) { setFlashIdx(i => i + 1); setFlipped(false); } else { setPracticeMode(false); } }}>
            {flashIdx < words.length - 1 ? "التالي →" : "تم"}
          </button>
        </div>
      </div>
    );
  }

  if (selectedList) {
    return (
      <div style={{ padding: "20px 0" }}>
        <button className="back-btn" onClick={() => setSelectedList(null)}>← رجوع</button>
        <div className="game-head">
          <h2>📝 {selectedList.name}</h2>
          <p>{selectedList.words.length} كلمة</p>
        </div>
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <input type="text" value={newDe} onChange={e => setNewDe(e.target.value)} placeholder="الألمانية" style={{ flex: 1, padding: 12, borderRadius: 10, border: "1px solid var(--border)", background: "var(--card)", direction: "ltr", fontFamily: "var(--font-la)" }} />
            <input type="text" value={newAr} onChange={e => setNewAr(e.target.value)} placeholder="العربية" onKeyDown={e => e.key === "Enter" && addWord()} style={{ flex: 1, padding: 12, borderRadius: 10, border: "1px solid var(--border)", background: "var(--card)" }} />
            <button className="btn btn-primary" onClick={addWord} disabled={!newDe.trim() || !newAr.trim()}>+</button>
          </div>
          <button className="btn btn-primary" onClick={startPractice} disabled={selectedList.words.length === 0} style={{ width: "100%", marginBottom: 16 }}>🃏 مراجعة بالبطاقات</button>
          {selectedList.words.map((w, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, marginBottom: 8 }}>
              <div>
                <span style={{ fontFamily: "var(--font-la)", fontWeight: 700, direction: "ltr" }}>{w.de}</span>
                <span style={{ color: "var(--text-soft)", margin: "0 10px" }}>—</span>
                <span>{w.ar}</span>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="speak-btn" style={{ padding: "4px 10px", fontSize: 12 }} onClick={() => speakGerman(w.de)}>🔊</button>
                <button className="speak-btn" style={{ padding: "4px 10px", fontSize: 12, color: "#ef4444" }} onClick={() => deleteWord(selectedList.id, i)}>✕</button>
              </div>
            </div>
          ))}
          <button className="btn btn-ghost" onClick={() => deleteList(selectedList.id)} style={{ width: "100%", marginTop: 10, color: "#ef4444" }}>🗑️ حذف القائمة</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 0" }}>
      <button className="back-btn" onClick={onBack}>← رجوع</button>
      <div className="game-head">
        <h2>📚 قوائم مخصصة — Custom Word Lists</h2>
        <p>أنشئ قوائمك الخاصة بالمفردات</p>
      </div>
      <div style={{ maxWidth: 500, margin: "0 auto" }}>
        <button className="btn btn-primary" onClick={() => setShowCreate(!showCreate)} style={{ width: "100%", marginBottom: 16 }}>
          {showCreate ? "إلغاء" : "+ إنشاء قائمة جديدة"}
        </button>
        {showCreate && (
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="اسم القائمة" onKeyDown={e => e.key === "Enter" && createList()} style={{ flex: 1, padding: 12, borderRadius: 10, border: "2px solid var(--primary)", background: "var(--card)", fontSize: 16 }} />
            <button className="btn btn-primary" onClick={createList} disabled={!newName.trim()}>إنشاء</button>
          </div>
        )}
        {lists.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, color: "var(--text-soft)" }}>لا توجد قوائم بعد</div>
        ) : (
          lists.map(l => (
            <div key={l.id} className="lesson-card clickable" onClick={() => setSelectedList(l)} style={{ cursor: "pointer", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3>{l.name}</h3>
                <p style={{ color: "var(--text-soft)", fontSize: 14 }}>{l.words.length} كلمة</p>
              </div>
              <span style={{ fontSize: 22 }}>📝</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
