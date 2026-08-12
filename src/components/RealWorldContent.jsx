import React, { useState } from 'react';

const newsData = [
  {
    id: 1,
    level: 'A1',
    category: 'Alltag',
    categoryAr: 'الحياة اليومية',
    title: 'Das Wetter in Berlin',
    titleAr: 'الطقس في برلين',
    content: `Heute ist es sonnig in Berlin. Die Temperatur ist 22 Grad.
    Morgen wird es regnen. Am Samstag ist es wieder schön.
    Im Winter ist es kalt und schneit oft.`,
    vocabulary: [
      { de: 'sonnig', ar: 'مشمس' },
      { de: 'die Temperatur', ar: 'درجة الحرارة' },
      { de: 'regnen', ar: 'تمطر' },
      { de: 'schneien', ar: 'تساقط الثلوج' }
    ],
    questions: [
      { q: 'Wie ist das Wetter heute?', options: ['sonnig', 'regnerisch', 'schneeig'], correct: 0 },
      { q: 'Wie viel Grad ist es?', options: ['12', '22', '32'], correct: 1 }
    ]
  },
  {
    id: 2,
    level: 'A1',
    category: 'Alltag',
    categoryAr: 'الحياة اليومية',
    title: 'Mein Alltag',
    titleAr: 'يومي المعتاد',
    content: `Ich stehe um 7 Uhr auf. Ich frühstücke Brot und trinke Kaffee.
    Ich fahre mit dem Bus zur Arbeit.
    Mittags esse ich in der Kantine.
    Abends sehe ich fern oder lese ein Buch.`,
    vocabulary: [
      { de: 'aufstehen', ar: 'يستيقظ' },
      { de: 'frühstücken', ar: 'يتناول الفطور' },
      { de: 'die Kantine', ar: 'المطعم' },
      { de: 'fernsehen', ar: ' showing television' }
    ],
    questions: [
      { q: 'Wann stehe ich auf?', options: ['6 Uhr', '7 Uhr', '8 Uhr'], correct: 1 },
      { q: 'Wie fahre ich zur Arbeit?', options: ['Auto', 'Bus', 'Fahrrad'], correct: 1 }
    ]
  },
  {
    id: 3,
    level: 'A2',
    category: 'Reisen',
    categoryAr: 'السفر',
    title: 'Urlaub in München',
    titleAr: 'إجازة في ميونخ',
    content: `München ist eine schöne Stadt in Bayern.
    Das Marienplatz ist sehr berühmt.
    Man kann dort gutes Bier trinken.
    Das Oktoberfest ist das größte Fest der Welt.
    Viele Touristen kommen jedes Jahr.`,
    vocabulary: [
      { de: 'die Stadt', ar: 'المدينة' },
      { de: 'berühmt', ar: 'مشهور' },
      { de: 'das Fest', ar: 'المهرجان' },
      { de: 'der Tourist', ar: 'السياح' }
    ],
    questions: [
      { q: 'Wo ist München?', options: ['Bayern', 'Berlin', 'Hamburg'], correct: 0 },
      { q: 'Was ist das Oktoberfest?', options: ['ein Museum', 'das größte Fest', 'eine Stadt'], correct: 1 }
    ]
  },
  {
    id: 4,
    level: 'A2',
    category: 'Essen',
    categoryAr: 'الطعام',
    title: 'Deutsche Küche',
    titleAr: 'المطبخ الألماني',
    content: `Die deutsche Küche ist sehr lecker.
    Schnitzel ist ein beliebtes Gericht.
    Auch Bratwurst ist sehr beliebt.
    Zu Weihnachten gibt es Lebkuchen.
    Kuchen und Torten sind auch sehr gut.`,
    vocabulary: [
      { de: 'lecker', ar: 'لذيذ' },
      { de: 'das Gericht', ar: 'الطبق' },
      { de: 'beliebt', ar: 'محبوب' },
      { de: 'die Torten', ar: 'الكيك' }
    ],
    questions: [
      { q: 'Was ist ein Schnitzel?', options: ['ein Getränk', 'ein Gericht', 'ein Kuchen'], correct: 1 },
      { q: 'Wann gibt es Lebkuchen?', options: ['Zu Weihnachten', 'Zu Ostern', 'Im Sommer'], correct: 0 }
    ]
  },
  {
    id: 5,
    level: 'B1',
    category: 'Kultur',
    categoryAr: 'الثقافة',
    title: 'Museen in Berlin',
    titleAr: 'المتاحف في برلين',
    content: `Berlin hat viele tolle Museen.
    Das Pergamonmuseum ist sehr berühmt.
    Dort kann man antike Kunst sehen.
    Das Museum für Naturkunde hat einen Dinosaurier.
    Viele Museen haben einen Tag mit freiem Eintritt.`,
    vocabulary: [
      { de: 'das Museum', ar: 'المتحف' },
      { de: 'antik', ar: 'قديم' },
      { de: 'der Dinosaurier', ar: 'الديناصور' },
      { de: 'der Eintritt', ar: 'الدخول' }
    ],
    questions: [
      { q: 'Was kann man im Pergamonmuseum sehen?', options: ['Dinosaurier', 'antike Kunst', 'Moderne Kunst'], correct: 1 },
      { q: 'Wann ist freier Eintritt?', options: ['Immer', 'An einem Tag', 'Nur sonntags'], correct: 1 }
    ]
  },
  {
    id: 6,
    level: 'B1',
    category: 'Arbeit',
    categoryAr: 'العمل',
    title: 'Bewerbungsgespräch',
    titleAr: 'مقابلة عمل',
    content: `Das Bewerbungsgespräch ist sehr wichtig.
    Man sollte pünktlich sein.
    Ein guter Lebenslauf hilft.
    Fragen über Erfahrung sind üblich.
    Am Ende kann man auch Fragen stellen.`,
    vocabulary: [
      { de: 'das Gespräch', ar: 'المحادثة' },
      { de: 'pünktlich', ar: 'في الوقت' },
      { de: 'die Erfahrung', ar: 'الخبرة' },
      { de: 'üblich', ar: 'معتاد' }
    ],
    questions: [
      { q: 'Was ist beim Bewerbungsgespräch wichtig?', options: ['Pünktlichkeit', 'Geld', 'Kleidung'], correct: 0 },
      { q: 'Was kann man am Ende tun?', options: ['Schlafen', 'Fragen stellen', 'Gehen'], correct: 1 }
    ]
  },
  {
    id: 7,
    level: 'B2',
    category: 'Umwelt',
    categoryAr: 'البيئة',
    title: 'Klimawandel',
    titleAr: 'التغير المناخي',
    content: `Der Klimawandel ist ein großes Problem.
    Die Erde wird immer wärmer.
    Wir müssen weniger CO2 produzieren.
    Erneuerbare Energie ist die Lösung.
    Jeder kann etwas für die Umwelt tun.`,
    vocabulary: [
      { de: 'der Klimawandel', ar: 'التغير المناخي' },
      { de: 'die Erde', ar: 'الأرض' },
      { de: 'die Energie', ar: 'الطاقة' },
      { de: 'die Umwelt', ar: 'البيئة' }
    ],
    questions: [
      { q: 'Was ist das Problem?', options: ['Klimawandel', 'Armut', 'Krieg'], correct: 0 },
      { q: 'Was ist die Lösung?', options: ['Erneuerbare Energie', 'Mehr Fabriken', 'Weniger Bäume'], correct: 0 }
    ]
  },
  {
    id: 8,
    level: 'B2',
    category: 'Technik',
    categoryAr: 'التكنولوجيا',
    title: 'Digitalisierung',
    titleAr: 'الرقمية',
    content: `Die Digitalisierung verändert unser Leben.
    Smartphones sind überall.
    Online-Shopping wird immer beliebter.
    Viele Jobs werden von Computern gemacht.
    Datenschutz ist sehr wichtig.`,
    vocabulary: [
      { de: 'die Digitalisierung', ar: 'الرقمية' },
      { de: 'das Smartphone', ar: 'الهاتف الذكي' },
      { de: 'der Datenschutz', ar: 'حماية البيانات' },
      { de: 'überall', ar: 'في كل مكان' }
    ],
    questions: [
      { q: 'Was verändert unser Leben?', options: ['Digitalisierung', 'Natur', 'Sport'], correct: 0 },
      { q: 'Was ist wichtig?', options: ['Geld', 'Datenschutz', 'Geschwindigkeit'], correct: 1 }
    ]
  }
];

export default function RealWorldContent({ level, goBack }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);

  const currentLevel = level?.toUpperCase() || 'A1';
  const articles = newsData.filter(a => a.level === currentLevel);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    if (index === selectedArticle.questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < selectedArticle.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetArticle = () => {
    setSelectedArticle(null);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowTranslation(false);
  };

  if (selectedArticle) {
    if (showResult) {
      return (
        <div className="training-container">
          <div className="result-screen">
            <h2>🏆 أحسنت!</h2>
            <div className="score-display">
              <span className="score">{score}</span>
              <span className="total">/ {selectedArticle.questions.length}</span>
            </div>
            <p>النتيجة: {Math.round(score / selectedArticle.questions.length * 100)}%</p>
            <button className="primary-btn" onClick={resetArticle}>
              العودة للمقالات
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="training-container">
        <button className="back-btn" onClick={resetArticle}>← العودة</button>

        <div className="article-header">
          <span className="level-badge">{selectedArticle.level}</span>
          <h2>{selectedArticle.title}</h2>
          <p className="title-ar">{selectedArticle.titleAr}</p>
        </div>

        <div className="article-content">
          <p>{selectedArticle.content}</p>
          
          <button 
            className="translation-toggle"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            {showTranslation ? 'إخفاء الترجمة' : 'عرض الترجمة بالعربي'}
          </button>

          {showTranslation && (
            <div className="article-translation">
              <p>{selectedArticle.content.split('.').filter(s => s.trim()).map(s => {
                const voc = selectedArticle.vocabulary.find(v => 
                  s.toLowerCase().includes(v.de.toLowerCase())
                );
                return voc ? `${s.trim()} (${voc.ar})` : s.trim();
              }).join('. ')}</p>
            </div>
          )}
        </div>

        <div className="vocabulary-section">
          <h3>📚 المفردات الجديدة</h3>
          <div className="vocab-grid">
            {selectedArticle.vocabulary.map((v, i) => (
              <div key={i} className="vocab-card">
                <span className="de">{v.de}</span>
                <span className="ar">{v.ar}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="quiz-section">
          <h3>اختبار سريع</h3>
          <div className="question">
            <p>{selectedArticle.questions[currentQuestion].q}</p>
            <div className="options">
              {selectedArticle.questions[currentQuestion].options.map((opt, i) => (
                <button 
                  key={i}
                  className={`option-btn ${selectedAnswer === i ? (i === selectedArticle.questions[currentQuestion].correct ? 'correct' : 'wrong') : ''}`}
                  onClick={() => handleAnswer(i)}
                  disabled={selectedAnswer !== null}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div className="progress-dots">
            {selectedArticle.questions.map((_, i) => (
              <span key={i} className={`dot ${i <= currentQuestion ? 'active' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="training-container">
      <button className="back-btn" onClick={goBack}>← العودة</button>

      <div className="training-header">
        <h2>📰 محتوى حقيقي</h2>
        <p>اقرأ نصوصاً ألمانية بسيطة وتوسع المفردات</p>
      </div>

      <div className="level-tabs">
        {['A1', 'A2', 'B1', 'B2'].map(l => (
          <button 
            key={l}
            className={`level-tab ${currentLevel === l ? 'active' : ''}`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="articles-grid">
        {articles.length === 0 ? (
          <div className="no-articles">
            <p>لا توجد مقالات متاحة لهذا المستوى</p>
          </div>
        ) : (
          articles.map(article => (
            <div 
              key={article.id}
              className="article-card clickable"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="article-icon">📰</div>
              <div className="article-info">
                <h3>{article.title}</h3>
                <p className="article-title-ar">{article.titleAr}</p>
                <div className="article-meta">
                  <span className="category-badge">{article.category}</span>
                  <span className="level-badge">{article.level}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
