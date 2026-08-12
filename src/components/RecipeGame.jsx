import { useState } from "react";
import { speakGerman } from "../speech.js";

const RECIPES = [
  {
    id: 1, title: "Apfelstrudel", titleAr: "سترودل التفاح", difficulty: "سهل", time: "45 دقيقة",
    ingredients: [
      { de: "4 Äpfel", ar: "4 تفاحات", amount: "4" },
      { de: "200g Mehl", ar: "200 جرام دقيق", amount: "200g" },
      { de: "100g Butter", ar: "100 جرام زبدة", amount: "100g" },
      { de: "2 Eier", ar: "2 بيضات", amount: "2" },
      { de: "80g Zucker", ar: "80 جرام سكر", amount: "80g" },
      { de: "1 Zimt", ar: "قرفة", amount: "1" },
    ],
    steps: [
      { de: "Schälen Sie die Äpfel und schneiden Sie sie in kleine Stücke.", ar: "قشّر التفاح وقطعه إلى قطع صغيرة.", vocab: ["schälen", "schneiden"] },
      { de: "Mischen Sie die Äpfel mit Zucker und Zimt.", ar: "امزج التفاح مع السكر والقرفة.", vocab: ["mischen", "Zucker"] },
      { de: "Machen Sie den Teig aus Mehl, Butter und Eiern.", ar: "اعجينة العجينة من الدقيق والزبدة والبيض.", vocab: ["der Teig", "das Mehl"] },
      { de: "Füllen Sie den Teig mit der Apfelmischung.", ar: "احشِ العجينة بخليط التفاح.", vocab: ["füllen"] },
      { de: "Backen Sie den Strudel bei 180 Grad für 30 Minuten.", ar: "اخبز السترودل عند 180 درجة لمدة 30 دقيقة.", vocab: ["backen", "die Minuten"] },
    ]
  },
  {
    id: 2, title: "Bratwurst mit Kartoffelsalat", titleAr: "نقانق مشوية مع سلطة البطاطس", difficulty: "سهل", time: "30 دقيقة",
    ingredients: [
      { de: "6 Bratwürste", ar: "6 نقانق", amount: "6" },
      { de: "1kg Kartoffeln", ar: "1 كيلو بطاطس", amount: "1kg" },
      { de: "1 Zwiebel", ar: "1 بصلة", amount: "1" },
      { de: "3 EL Essig", ar: "3 ملاعق خل", amount: "3 EL" },
      { de: "2 EL Öl", ar: "2 ملعقة زيت", amount: "2 EL" },
      { de: "Salz und Pfeffer", ar: "ملح وفلفل", amount: "حسب الرغبة" },
    ],
    steps: [
      { de: "Kochen Sie die Kartoffeln bis sie weich sind.", ar: "اسلق البطاطس حتى تنضج.", vocab: ["kochen", "weich"] },
      { de: "Schneiden Sie die Zwiebeln in kleine Stücke.", ar: "قطع البصل إلى قطع صغيرة.", vocab: ["die Zwiebel"] },
      { de: "Mischen Sie Essig, Öl, Salz und Pfeffer.", ar: "امزج الخل والزيت والملح والفلفل.", vocab: ["der Essig", "das Öl"] },
      { de: "Braten Sie die Bratwürste in der Pfanne.", ar: "اقلي النقانق في المقلاة.", vocab: ["braten", "die Pfanne"] },
      { de: "Servieren Sie die Würste mit dem Kartoffelsalat.", ar: "قدّم النقانق مع سلطة البطاطس.", vocab: ["servieren"] },
    ]
  },
  {
    id: 3, title: "Schwarzwälder Kirschtorte", titleAr: "تورتة كريز الغابة السوداء", difficulty: "صعب", time: "2 ساعات",
    ingredients: [
      { de: "200g Schokolade", ar: "200 جرام شوكولاتة", amount: "200g" },
      { de: "300ml Sahne", ar: "300 مل كريمة", amount: "300ml" },
      { de: "400g Kirschen", ar: "400 جرام كرز", amount: "400g" },
      { de: "200g Mehl", ar: "200 جرام دقيق", amount: "200g" },
      { de: "4 Eier", ar: "4 بيضات", amount: "4" },
      { de: "150g Zucker", ar: "150 جرام سكر", amount: "150g" },
    ],
    steps: [
      { de: "Schmelzen Sie die Schokolade im Wasserbad.", ar: "اذيب الشوكولاتة على حمام مائي.", vocab: ["schmelzen", "das Wasserbad"] },
      { de: "Trennen Sie die Eigelb von den Eiweiß.", ar: "افصل الصفار عن البياض.", vocab: ["trennen"] },
      { de: "Schlagen Sie die Sahne steif.", ar: "اضرب الكريمة حتى تتصلب.", vocab: ["schlagen", "steif"] },
      { de: "Backen Sie den Boden bei 175 Grad.", ar: "اخبز القاعدة عند 175 درجة.", vocab: ["der Boden"] },
      { de: "Bauen Sie die Torte mit Schokolade, Sahne und Kirschen auf.", ar: "ابنِ التورتة بالشوكولاتة والكريمة والكرز.", vocab: ["aufbauen"] },
    ]
  },
  {
    id: 4, title: "Schnitzel", titleAr: "شنيتسل", difficulty: "متوسط", time: "25 دقيقة",
    ingredients: [
      { de: "4 Schnitzel", ar: "4 شنيتسل", amount: "4" },
      { de: "100g Mehl", ar: "100 جرام دقيق", amount: "100g" },
      { de: "2 Eier", ar: "2 بيضات", amount: "2" },
      { de: "150g Semmelbrösel", ar: "150 جرام بقسماط", amount: "150g" },
      { de: "Salz und Pfeffer", ar: "ملح وفلفل", amount: "حسب الرغبة" },
      { de: "Öl zum Braten", ar: "زيت للقلي", amount: "حسب الرغبة" },
    ],
    steps: [
      { de: "Klopfen Sie die Schnitzel dünner.", ar: "اضرب الشنيتسل ليصبح رقيقاً.", vocab: ["klopfen", "dünn"] },
      { de: "Würzen Sie mit Salz und Pfeffer.", ar: "تبّل بالملح والفلفل.", vocab: ["würzen"] },
      { de: "Wischen Sie die Schnitzel durch Mehl, Ei und Brösel.", ar: "مرّر الشنيتسل بالدقيق والبيض والبقسماط.", vocab: ["durchwischen"] },
      { de: "Braten Sie in heißem Öl goldbraun.", ar: "اقلي في زيت ساخن حتى يصبح ذهبياً.", vocab: ["goldbraun"] },
      { de: "Servieren Sie mit Kartoffeln oder Salat.", ar: "قدّم مع بطاطس أو سلطة.", vocab: ["der Salat"] },
    ]
  },
];

export default function RecipeGame({ onBack }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [showVocab, setShowVocab] = useState(false);
  const [clickedWord, setClickedWord] = useState(null);

  const handleWordClick = (word) => {
    const clean = word.replace(/[.,!?;:]/g, "");
    const allVocab = RECIPES.flatMap(r => r.steps.flatMap(s => s.vocab));
    if (allVocab.includes(clean)) {
      speakGerman(clean);
      setClickedWord(clean);
    }
  };

  const markStepDone = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    if (currentStep < selectedRecipe.steps.length - 1) {
      setCurrentStep(s => s + 1);
    }
  };

  if (selectedRecipe) {
    const allDone = completedSteps.size === selectedRecipe.steps.length;
    return (
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <button onClick={() => { setSelectedRecipe(null); setCurrentStep(0); setCompletedSteps(new Set()); setShowVocab(false); setClickedWord(null); }} style={{ background: "none", border: "none", color: "var(--text)", fontSize: 16, cursor: "pointer", marginBottom: 16 }}>← العودة</button>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🍳</div>
            <h2 style={{ margin: "0 0 4px" }}>{selectedRecipe.title}</h2>
            <div style={{ color: "var(--text-soft)", fontSize: 13 }}>{selectedRecipe.titleAr} • {selectedRecipe.time}</div>
            <span style={{ display: "inline-block", marginTop: 6, padding: "3px 10px", borderRadius: 8, background: selectedRecipe.difficulty === "سهل" ? "rgba(16,185,129,0.1)" : selectedRecipe.difficulty === "متوسط" ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)", color: selectedRecipe.difficulty === "سهل" ? "#10b981" : selectedRecipe.difficulty === "متوسط" ? "#f59e0b" : "#ef4444", fontWeight: 600, fontSize: 12 }}>
              {selectedRecipe.difficulty}
            </span>
          </div>

          <button onClick={() => { selectedRecipe.ingredients.forEach(i => speakGerman(i.de.split(" ").slice(1).join(" "))); }} style={{ padding: "8px 16px", borderRadius: 10, border: "2px solid #8b5cf6", background: "transparent", color: "#8b5cf6", fontWeight: 700, cursor: "pointer", fontSize: 13, marginBottom: 16, display: "block", width: "100%" }}>
            🔊 استمع للمقادير
          </button>

          <h3 style={{ margin: "0 0 10px", fontSize: 16 }}>🥘 المقادير</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8, marginBottom: 20 }}>
            {selectedRecipe.ingredients.map((ing, i) => (
              <div key={i} onClick={() => speakGerman(ing.de)} style={{ background: "var(--bg-soft)", border: "1px solid var(--border)", borderRadius: 10, padding: 12, cursor: "pointer", textAlign: "center" }}>
                <div style={{ fontWeight: 700, fontSize: 14, direction: "ltr" }}>{ing.amount}</div>
                <div style={{ fontSize: 12, direction: "ltr", color: "var(--text-soft)" }}>{ing.de.replace(ing.amount, "").trim()}</div>
                <div style={{ fontSize: 11, color: "var(--text-soft)" }}>{ing.ar}</div>
              </div>
            ))}
          </div>

          <h3 style={{ margin: "0 0 10px", fontSize: 16 }}>📝 الخطوات ({completedSteps.size}/{selectedRecipe.steps.length})</h3>

          {allDone ? (
            <div style={{ textAlign: "center", padding: 20, background: "rgba(16,185,129,0.1)", borderRadius: 12, color: "#10b981" }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
              <h3>أحسنت! أكملت الوصفة!</h3>
              <p style={{ margin: "8px 0" }}>{selectedRecipe.title} جاهز للأكل!</p>
            </div>
          ) : (
            <div>
              {selectedRecipe.steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: 14, marginBottom: 10, borderRadius: 12, background: completedSteps.has(i) ? "rgba(16,185,129,0.05)" : i === currentStep ? "rgba(59,130,246,0.1)" : "var(--bg-soft)", border: `1px solid ${completedSteps.has(i) ? "#10b981" : i === currentStep ? "#3b82f6" : "var(--border)"}`, opacity: i > currentStep && !completedSteps.has(i) ? 0.5 : 1 }}>
                  <div style={{ minWidth: 32, height: 32, borderRadius: 16, background: completedSteps.has(i) ? "#10b981" : i === currentStep ? "#3b82f6" : "var(--border)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>
                    {completedSteps.has(i) ? "✓" : i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, direction: "ltr", textAlign: "left", marginBottom: 4 }}>{step.de}</div>
                    <div style={{ fontSize: 13, color: "var(--text-soft)" }}>{step.ar}</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                      {step.vocab.map((v, vi) => (
                        <span key={vi} onClick={() => handleWordClick(v)} style={{ padding: "2px 8px", borderRadius: 6, background: "rgba(139,92,246,0.1)", color: "#8b5cf6", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>{v}</span>
                      ))}
                    </div>
                  </div>
                  {i === currentStep && !completedSteps.has(i) && (
                    <button onClick={markStepDone} style={{ alignSelf: "center", padding: "8px 14px", borderRadius: 10, border: "none", background: "#10b981", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>✓ تم</button>
                  )}
                </div>
              ))}
            </div>
          )}

          {clickedWord && (
            <div style={{ marginTop: 12, padding: 12, background: "rgba(139,92,246,0.1)", borderRadius: 10, border: "1px solid #8b5cf6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, direction: "ltr" }}>{clickedWord}</span>
              <button onClick={() => speakGerman(clickedWord)} style={{ padding: "6px 12px", borderRadius: 8, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>🔊</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--text)", fontSize: 16, cursor: "pointer", marginBottom: 16 }}>← العودة</button>

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h2>🍽️ ألعاب الوصفات الألمانية</h2>
        <p style={{ color: "var(--text-soft)" }}>تعلم مفردات الطبخ الألماني من وصفات حقيقية</p>
      </div>

      {RECIPES.map(recipe => (
        <div key={recipe.id} onClick={() => setSelectedRecipe(recipe)} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 20, marginBottom: 12, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#8b5cf6"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ margin: "0 0 4px", fontSize: 16 }}>🍳 {recipe.title}</h3>
              <div style={{ fontSize: 13, color: "var(--text-soft)" }}>{recipe.titleAr} • {recipe.time}</div>
            </div>
            <div style={{ textAlign: "end" }}>
              <div style={{ padding: "3px 10px", borderRadius: 8, background: recipe.difficulty === "سهل" ? "rgba(16,185,129,0.1)" : recipe.difficulty === "متوسط" ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)", color: recipe.difficulty === "سهل" ? "#10b981" : recipe.difficulty === "متوسط" ? "#f59e0b" : "#ef4444", fontWeight: 600, fontSize: 12, marginBottom: 4 }}>{recipe.difficulty}</div>
              <div style={{ fontSize: 11, color: "var(--text-soft)" }}>{recipe.steps.length} خطوات</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
