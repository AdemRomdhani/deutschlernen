import { useState } from "react";

const CULTURAL_TOPICS = [
  {
    id: "greetings",
    title: "التحيات الألمانية",
    titleDe: "Begrüßungen",
    icon: "👋",
    level: "A1",
    content: `التحيات في ألمانيا تختلف حسب الموقف:
- "Guten Morgen" (صباح الخير) - من الصباح حتى الظهر
- "Guten Tag" (مرحباً) - خلال اليوم
- "Guten Abend" (مساء الخير) - بعد الساعة 6 مساءً
- "Tschüss" (إلى اللقاء) - غير رسمي
- "Auf Wiedersehen" (إلى اللقاء) - رسمي
- "Mahlzeit" (بالهناء والشفاء) - في وقت الوجبات`,
    tips: "في ألمانيا، المصافحة رسمية وmmmهمة. تأكد من النظر في عيني الشخص عند المصافحة."
  },
  {
    id: "food",
    title: "الألماني",
    titleDe: "Esskultur",
    icon: "🍽️",
    level: "A1",
    content: `الطعام الألماني متنوع ولذيذ:
- Brötchen (خبز صغير) - الفطور
- Wurst (لحوم مصنعة) - أكثر من 1500 نوع
- Brot (خبز) - ألمانيا بها أكثر من 300 نوع خبز
- Kartoffeln (بطاطس) - الأساس في الكثير من الأطباق
- Bier (بيرة) - ألمانيا مشهورة بالبيرة
- Kuchen (كعكة) - تُقدم مع القهوة`,
    tips: "الوقت المثالي للغداء هو 12-14 والعشاء 18-20. الألمان يحبون الدقة في مواعيد الوجبات."
  },
  {
    id: "punctuality",
    title: "الدقة في ألمانيا",
    titleDe: "Pünktlichkeit",
    icon: "⏰",
    level: "A1",
    content: `الدقةGerman virtue and is taken very seriously:
- الوصول في الموعد هو احترام للآخرين
- التأخير يعتبر قلة احترام
- حتى الدقائق القليلة مهمة
- إذا كنت ستتأخر، أبلغ مسبقاً
- الاجتماعات تبدأ في وقتها تماماً`,
    tips: "احضر دائماً قبل 5 دقائق من الموعد المحدد. هذا يُظهر الاحترام والجدية."
  },
  {
    id: "environment",
    title: "البيئة في ألمانيا",
    titleDe: "Umwelt",
    icon: "♻️",
    level: "A2",
    content: `ألمانيا رائدة في حماية البيئة:
- Trennsystem (نظام الفصل) - فصل النفايات
- Grüner Punkt (النقطة الخضراء) - تغليف قابل للتدوير
- Pfand (وديعة) - استرداد زجاجات البيرة
- Energiewende (التحول الطاقة) - الطاقة المتجددة
- Fahrrad (دراجة) - وسيلة نقل شائعة`,
    tips: "تعلم الفصل بين النفايات: Blau (أزرق) للورق، Gelb (أصفر) للمetal، Braun (بني) للعضوي."
  },
  {
    id: "holidays",
    title: "الأعياد في ألمانيا",
    titleDe: "Feiertage",
    icon: "🎄",
    level: "A2",
    content: `أهم الأعياد في ألمانيا:
- Weihnachten (الكريسماس) - 25-26 ديسمبر
- Silvester (رأس السنة) - 31 ديسمبر
- Ostern (عيد الفصح) - مارس/أبريل
- Karneval (الكرنفال) - فبراير
- Tag der Deutschen Einheit (عيد الوحدة) - 3 أكتوبر`,
    tips: "الكريسماس في ألمانيا يحتفل به في 24 ديسمبر (Heiligabend) وليس 25."
  },
  {
    id: "work",
    title: "ثقافة العمل",
    titleDe: "Arbeitskultur",
    icon: "💼",
    level: "B1",
    content: `ثقافة العمل في ألمانيا:
- Feierabend (نهاية العمل) - عادة 17-18
- Betriebsrat (المجلس العمالي) - حقوق الموظفين
- Fortbildung (التعليم المستمر) - حق الموظف
- Gleitzeit (الوقت المرن) - مرونة في ساعات العمل
- Homeoffice (العمل من المنزل) - أصبح أكثر شيوعاً`,
    tips: "ال germans separate work and private life clearly. Avoid calling colleagues after work hours."
  },
  {
    id: "communication",
    title: "التواصل في ألمانيا",
    titleDe: "Kommunikation",
    icon: "💬",
    level: "B1",
    content: `أسلوب التواصل الألماني:
- مباشر وصريح (nachrichtlich)
- تجنب المبالغة
- المنطق أهم من العاطفة
- "Sie" (حضرتك) للمواقف الرسمية
- "du" (أنت) للclose acquaintances
- لا تستخدم "du" مع شخص لا تعرفه`,
    tips: "الألمان يفضلون التواصل المباشر. لا تتردد في التعبير عن رأيك بوضوح."
  },
  {
    id: "education",
    title: "النظام التعليمي",
    titleDe: "Bildungssystem",
    icon: "🎓",
    level: "B2",
    content: `النظام التعليمي الألماني:
- Grundschule (المدرسة الابتدائية) - 4-6 سنوات
- Gymnasium (الثانوية) - для university prep
- Realschule (المتوسطة) - for vocational
- Hauptschule (الأساسية) - for basic education
- Universität (الجامعة) - تعليم عالي مجاني تقريباً`,
    tips: "التعليم الجامعي في ألمانيا مجاني تقريباً حتى للطلاب الدوليين في بعض الولايات."
  },
  {
    id: "social",
    title: "الحياة الاجتماعية",
    titleDe: "Sozialleben",
    icon: "👥",
    level: "B2",
    content: `الحياة الاجتماعية في ألمانيا:
- Verein (نادي) - 90000+ نادي رياضي وثقافي
- Kneipe (حانة) - مكان للتواصل الاجتماعي
- Spazierengehen (التنزه) - نشاط شائع
- Grillen (الشواء) - في الصيف
- Wandern (المشي في الطبيعة) - نشاط مفضل`,
    tips: "انضم إلى نادي (Verein) لتمارس هوايتك والتعرف على أصدقاء جدد."
  }
];

export default function CulturalContext({ onBack }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [completedTopics, setCompletedTopics] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cultural_completed") || "[]"); } catch { return []; }
  });

  const handleComplete = (topicId) => {
    if (!completedTopics.includes(topicId)) {
      const newCompleted = [...completedTopics, topicId];
      setCompletedTopics(newCompleted);
      localStorage.setItem("cultural_completed", JSON.stringify(newCompleted));
    }
  };

  if (selectedTopic) {
    const topic = CULTURAL_TOPICS.find(t => t.id === selectedTopic);
    return (
      <div className="cultural-detail">
        <button className="btn-back" onClick={() => setSelectedTopic(null)}>← رجوع</button>

        <div className="cultural-detail-header">
          <div className="topic-icon">{topic.icon}</div>
          <h2>{topic.title}</h2>
          <div className="topic-de">{topic.titleDe}</div>
          <div className="topic-level">المستوى: {topic.level}</div>
        </div>

        <div className="cultural-content">
          <div className="content-text">{topic.content}</div>

          <div className="cultural-tip">
            <span className="tip-icon">💡</span>
            <div className="tip-text">{topic.tips}</div>
          </div>
        </div>

        <div className="cultural-actions">
          <button
            className="btn-complete"
            onClick={() => handleComplete(topic.id)}
          >
            {completedTopics.includes(topic.id) ? "✅ تم الاطلاع" : "📚 تعلمتها"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cultural-context">
      <button className="btn-back" onClick={onBack}>← رجوع</button>

      <div className="cultural-header">
        <h2>🇩🇪 Cultural Context — السياق الثقافي</h2>
        <p>تعرّف على الثقافة الألمانية والعادات والتقاليد</p>
      </div>

      <div className="cultural-stats">
        <span>✅ {completedTopics.length}/{CULTURAL_TOPICS.length} موضوع تم الاطلاع عليه</span>
      </div>

      <div className="cultural-grid">
        {CULTURAL_TOPICS.map(topic => (
          <div
            key={topic.id}
            className={`cultural-card ${completedTopics.includes(topic.id) ? "completed" : ""}`}
            onClick={() => setSelectedTopic(topic.id)}
          >
            <div className="card-icon">{topic.icon}</div>
            <div className="card-title">{topic.title}</div>
            <div className="card-de">{topic.titleDe}</div>
            <div className="card-level">{topic.level}</div>
            {completedTopics.includes(topic.id) && <div className="card-check">✅</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
