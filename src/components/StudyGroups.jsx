import { useState, useEffect } from "react";

function loadGroups() {
  try { return JSON.parse(localStorage.getItem("studyGroups") || "[]"); } catch { return []; }
}
function saveGroups(groups) { localStorage.setItem("studyGroups", JSON.stringify(groups)); }

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function StudyGroups({ onBack }) {
  const [groups, setGroups] = useState(loadGroups);
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [newName, setNewName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newWordDe, setNewWordDe] = useState("");
  const [newWordAr, setNewWordAr] = useState("");
  const [activeTab, setActiveTab] = useState("words");

  useEffect(() => { saveGroups(groups); }, [groups]);

  const createGroup = () => {
    if (!newName.trim()) return;
    const group = { id: Date.now(), name: newName.trim(), code: generateCode(), words: [], members: ["أنت (المدير)"], created: new Date().toISOString() };
    setGroups(prev => [...prev, group]);
    setNewName(""); setShowCreate(false);
    setSelectedGroup(group);
  };

  const joinGroup = () => {
    const code = joinCode.trim().toUpperCase();
    const existing = groups.find(g => g.code === code);
    if (existing) { setSelectedGroup(existing); setShowJoin(false); return; }
    const mockGroup = { id: Date.now(), name: "مجموعة " + code, code, words: [
      { de: "Hallo", ar: "مرحباً" }, { de: "Danke", ar: "شكراً" }, { de: "Bitte", ar: "من فضلك" },
      { de: "Tschüss", ar: "إلى اللقاء" }, { de: "Ja", ar: "نعم" }, { de: "Nein", ar: "لا" },
    ], members: ["عضو 1", "عضو 2", "أنت"], created: new Date().toISOString() };
    setGroups(prev => [...prev, mockGroup]);
    setSelectedGroup(mockGroup);
    setJoinCode(""); setShowJoin(false);
  };

  const addWord = () => {
    if (!newWordDe.trim() || !newWordAr.trim() || !selectedGroup) return;
    const updated = { ...selectedGroup, words: [...selectedGroup.words, { de: newWordDe.trim(), ar: newWordAr.trim() }] };
    setGroups(prev => prev.map(g => g.id === selectedGroup.id ? updated : g));
    setSelectedGroup(updated);
    setNewWordDe(""); setNewWordAr("");
  };

  const deleteGroup = (id) => {
    setGroups(prev => prev.filter(g => g.id !== id));
    setSelectedGroup(null);
  };

  if (selectedGroup) {
    const memberCount = selectedGroup.members.length;
    const progress = Math.min(100, Math.round((selectedGroup.words.length / 20) * 100));
    return (
      <div style={{ padding: "20px 0" }}>
        <button className="back-btn" onClick={() => setSelectedGroup(null)}>← رجوع</button>
        <div className="game-head">
          <h2>👥 {selectedGroup.name}</h2>
          <p>كود المجموعة: <strong style={{ fontFamily: "var(--font-la)", letterSpacing: 2 }}>{selectedGroup.code}</strong></p>
          <div className="game-score">
            <span>👥 {memberCount} أعضاء</span>
            <span>|</span>
            <span>📚 {selectedGroup.words.length} كلمة</span>
          </div>
        </div>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <button className={`tab ${activeTab === "words" ? "active" : ""}`} onClick={() => setActiveTab("words")}>📚 القائمة المشتركة</button>
            <button className={`tab ${activeTab === "progress" ? "active" : ""}`} onClick={() => setActiveTab("progress")}>📊 التقدم</button>
            <button className={`tab ${activeTab === "members" ? "active" : ""}`} onClick={() => setActiveTab("members")}>👥 الأعضاء</button>
          </div>

          {activeTab === "words" && (
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <input type="text" value={newWordDe} onChange={e => setNewWordDe(e.target.value)} placeholder="الألمانية" style={{ flex: 1, padding: 12, borderRadius: 10, border: "1px solid var(--border)", background: "var(--card)", direction: "ltr", fontFamily: "var(--font-la)" }} />
                <input type="text" value={newWordAr} onChange={e => setNewWordAr(e.target.value)} placeholder="العربية" onKeyDown={e => e.key === "Enter" && addWord()} style={{ flex: 1, padding: 12, borderRadius: 10, border: "1px solid var(--border)", background: "var(--card)" }} />
                <button className="btn btn-primary" onClick={addWord} disabled={!newWordDe.trim() || !newWordAr.trim()}>+</button>
              </div>
              {selectedGroup.words.map((w, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, marginBottom: 8 }}>
                  <span style={{ fontFamily: "var(--font-la)", direction: "ltr", fontWeight: 700 }}>{w.de}</span>
                  <span>{w.ar}</span>
                </div>
              ))}
              {selectedGroup.words.length === 0 && <p style={{ textAlign: "center", color: "var(--text-soft)" }}>لا توجد كلمات بعد. أضف أول كلمة!</p>}
            </div>
          )}

          {activeTab === "progress" && (
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 22 }}>
              <h3 style={{ marginBottom: 16 }}>تقدم المجموعة</h3>
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span>الكلمات المشتركة</span>
                  <span style={{ fontFamily: "var(--font-la)", fontWeight: 700 }}>{selectedGroup.words.length}/20</span>
                </div>
                <div style={{ height: 10, background: "var(--border)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, var(--primary), var(--primary-2))", borderRadius: 999 }} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ padding: 14, background: "var(--bg-soft)", borderRadius: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: "var(--primary)" }}>{memberCount}</div>
                  <div style={{ fontSize: 13, color: "var(--text-soft)" }}>أعضاء</div>
                </div>
                <div style={{ padding: 14, background: "var(--bg-soft)", borderRadius: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: "var(--primary)" }}>{selectedGroup.words.length}</div>
                  <div style={{ fontSize: 13, color: "var(--text-soft)" }}>كلمة</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "members" && (
            <div>
              {selectedGroup.members.map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, marginBottom: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, var(--primary), var(--primary-2))", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>{m[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700 }}>{m}</div>
                    {i === 0 && <div style={{ fontSize: 12, color: "var(--primary)" }}>المدير</div>}
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 12, padding: 14, background: "var(--bg-soft)", borderRadius: 12, textAlign: "center" }}>
                <div style={{ fontSize: 13, color: "var(--text-soft)", marginBottom: 6 }}>شارك كود المجموعة مع أصدقائك:</div>
                <div style={{ fontFamily: "var(--font-la)", fontWeight: 900, fontSize: 24, letterSpacing: 4, color: "var(--primary)" }}>{selectedGroup.code}</div>
              </div>
            </div>
          )}

          <button className="btn btn-ghost" onClick={() => deleteGroup(selectedGroup.id)} style={{ width: "100%", marginTop: 16, color: "#ef4444" }}>🗑️ حذف المجموعة</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 0" }}>
      <button className="back-btn" onClick={onBack}>← رجوع</button>
      <div className="game-head">
        <h2>👥 مجموعات الدراسة — Study Groups</h2>
        <p>أنشئ أو انضم لمجموعة دراسة مشتركة</p>
      </div>
      <div style={{ maxWidth: 500, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <button className="btn btn-primary" onClick={() => { setShowCreate(true); setShowJoin(false); }} style={{ flex: 1 }}>+ إنشاء مجموعة</button>
          <button className="btn btn-ghost" onClick={() => { setShowJoin(true); setShowCreate(false); }} style={{ flex: 1 }}>🔗 الانضمام بكود</button>
        </div>

        {showCreate && (
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20, marginBottom: 16 }}>
            <h3 style={{ marginBottom: 12 }}>إنشاء مجموعة جديدة</h3>
            <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="اسم المجموعة" onKeyDown={e => e.key === "Enter" && createGroup()} style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg)", marginBottom: 12 }} />
            <button className="btn btn-primary" onClick={createGroup} disabled={!newName.trim()} style={{ width: "100%" }}>إنشاء</button>
          </div>
        )}

        {showJoin && (
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20, marginBottom: 16 }}>
            <h3 style={{ marginBottom: 12 }}>الانضمام بمجموعة</h3>
            <input type="text" value={joinCode} onChange={e => setJoinCode(e.target.value)} placeholder="أدخل كود المجموعة" onKeyDown={e => e.key === "Enter" && joinGroup()} style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg)", fontFamily: "var(--font-la)", letterSpacing: 2, textAlign: "center", fontSize: 18 }} />
            <button className="btn btn-primary" onClick={joinGroup} disabled={!joinCode.trim()} style={{ width: "100%", marginTop: 10 }}>انضمام</button>
          </div>
        )}

        {groups.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>👥</div>
            <h3>لا توجد مجموعات</h3>
            <p style={{ color: "var(--text-soft)" }}>أنشئ مجموعة أو انضم لمجموعة موجودة</p>
          </div>
        ) : (
          groups.map(g => (
            <div key={g.id} className="lesson-card clickable" onClick={() => setSelectedGroup(g)} style={{ cursor: "pointer", marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3>{g.name}</h3>
                  <p style={{ color: "var(--text-soft)", fontSize: 13 }}>كود: <span style={{ fontFamily: "var(--font-la)" }}>{g.code}</span></p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 13, color: "var(--text-soft)" }}>👥 {g.members.length}</div>
                  <div style={{ fontSize: 13, color: "var(--text-soft)" }}>📚 {g.words.length}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
