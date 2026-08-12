import React, { useState } from 'react';

const businessData = [
  {
    id: 1,
    level: 'B1',
    category: 'Bewerbung',
    categoryAr: 'التقديم على وظيفة',
    title: 'Lebenslauf',
    titleAr: 'السيرة الذاتية',
    content: `Ein Lebenslauf sollte übersichtlich und fehlerfrei sein. 
    Persönliche Daten: Name, Adresse, Telefonnummer, E-Mail.
    Berufserfahrung: Chronologisch aufgelistet.
    Bildung: Universitäten und Schulen.
    Kenntnisse: Sprachen und Computer.`,
    vocab: [
      { de: 'der Lebenslauf', ar: 'السيرة الذاتية' },
      { de: 'die Berufserfahrung', ar: 'الخبرة المهنية' },
      { de: 'die Bildung', ar: 'التعليم' },
      { de: 'die Kenntnisse', ar: 'المهارات' }
    ]
  },
  {
    id: 2,
    level: 'B1',
    category: 'Bewerbung',
    categoryAr: 'التقديم على وظيفة',
    title: 'Anschreiben',
    titleAr: 'رسالة التقديم',
    content: `Das Anschreiben ist die erste Seite Ihrer Bewerbung.
    Beginnen Sie mit Ihrem Namen und Kontaktdaten.
    Datum und Firmenadresse folgen.
    Der Betreff sollte klar sein.
    Stellen Sie sich kurz vor und erläutern Sie Ihr Interesse.`,
    vocab: [
      { de: 'das Anschreiben', ar: 'رسالة التقديم' },
      { de: 'der Betreff', ar: 'الموضوع' },
      { de: 'das Interesse', ar: 'الاهتمام' },
      { de: 'die Kontaktdaten', ar: 'بيانات الاتصال' }
    ]
  },
  {
    id: 3,
    level: 'B2',
    category: 'Meetings',
    categoryAr: 'الاجتماعات',
    title: 'Meeting leiten',
    titleAr: 'قيادة الاجتماع',
    content: `Ein gutes Meeting hat eine klare Agenda.
    Begrüßen Sie die Teilnehmer pünktlich.
    Stellen Sie die Ziele des Meetings vor.
    Führen Sie ein Protokoll.
    Fassen Sie am Ende die Ergebnisse zusammen.`,
    vocab: [
      { de: 'die Agenda', ar: 'جدول الأعمال' },
      { de: 'die Teilnehmer', ar: 'المشاركون' },
      { de: 'das Protokoll', ar: 'محضر الاجتماع' },
      { de: 'die Ergebnisse', ar: 'النتائج' }
    ]
  },
  {
    id: 4,
    level: 'B2',
    category: 'Meetings',
    categoryAr: 'الاجتماعات',
    title: 'Präsentation halten',
    titleAr: 'إعطاء عرض تقديمي',
    content: `Bereiten Sie Ihre Folien sorgfältig vor.
    Sprechen Sie langsam und deutlich.
    Machen Sie Pausen für Fragen.
    Verwenden Sie visuelle Hilfsmittel.
    Fassen Sie die wichtigsten Punkte zusammen.`,
    vocab: [
      { de: 'die Folie', ar: 'الشريحة' },
      { de: 'die Frage', ar: 'السؤال' },
      { de: 'das Hilfsmittel', ar: 'الأداة المساعدة' },
      { de: 'der Punkt', ar: 'النقطة' }
    ]
  },
  {
    id: 5,
    level: 'C1',
    category: 'Verhandlung',
    categoryAr: 'التفاوض',
    title: 'Verhandlungstechniken',
    titleAr: 'تقنيات التفاوض',
    content: `Aktives Zuhören ist entscheidend für Verhandlungen.
    Stellen Sie offene Fragen um Interesse zu zeigen.
    Finden Sie Kompromisse.
    Bleiben Sie professionell und respektvoll.
    Dokumentieren Sie alle Vereinbarungen.`,
    vocab: [
      { de: 'die Verhandlung', ar: 'التفاوض' },
      { de: 'der Kompromiss', ar: 'التوافق' },
      { de: 'die Vereinbarung', ar: 'الاتفاقية' },
      { de: 'professionell', ar: 'محترف' }
    ]
  },
  {
    id: 6,
    level: 'C1',
    category: 'Korrespondenz',
    categoryAr: 'المراسلات',
    title: 'Formelle E-Mails',
    titleAr: 'الرسائل الإلكترونية الرسمية',
    content: `Beginnen Sie mit einer höflichen Anrede.
    Formulieren Sie Ihr Anliegen klar und präzise.
    Verwenden Sie Konjunktiv II für Höflichkeit.
    Beenden Sie mit einem freundlichen Gruß.
    Prüfen Sie die E-Mail auf Fehler.`,
    vocab: [
      { de: 'die Anrede', ar: 'التحية' },
      { de: 'das Anliegen', ar: 'الموضوع' },
      { de: 'der Konjunktiv', ar: 'الشرطية' },
      { de: 'der Gruß', ar: 'التحية' }
    ]
  }
];

export default function BusinessGerman({ level, goBack }) {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showVocab, setShowVocab] = useState(false);

  const currentLevel = level?.toUpperCase() || 'B1';
  const filtered = businessData.filter(item => item.level === currentLevel);

  if (selectedLesson) {
    return (
      <div className="training-container">
        <button className="back-btn" onClick={() => setSelectedLesson(null)}>
          ← العودة
        </button>
        
        <div className="lesson-card">
          <div className="lesson-header">
            <h2>{selectedLesson.title}</h2>
            <span className="lesson-badge">{selectedLesson.category}</span>
          </div>
          
          <div className="lesson-content">
            <p>{selectedLesson.content}</p>
          </div>

          <button 
            className="vocab-toggle-btn"
            onClick={() => setShowVocab(!showVocab)}
          >
            {showVocab ? 'إخفاء المفردات' : 'عرض المفردات'}
          </button>

          {showVocab && (
            <div className="vocab-list">
              <h3>المفردات المهمة</h3>
              {selectedLesson.vocab.map((v, i) => (
                <div key={i} className="vocab-item">
                  <span className="de">{v.de}</span>
                  <span className="ar">{v.ar}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="training-container">
      <button className="back-btn" onClick={goBack}>← العودة</button>
      
      <div className="training-header">
        <h2>🇩🇪 الألمانية المهنية</h2>
        <p>تعلم اللغة الألمانية للعمل والمهنة</p>
      </div>

      <div className="business-level-tabs">
        {['B1', 'B2', 'C1'].map(l => (
          <button 
            key={l}
            className={`level-tab ${currentLevel === l ? 'active' : ''}`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="lessons-grid">
        {filtered.length === 0 ? (
          <div className="no-lessons">
            <p>لا توجد دروس متاحة لهذا المستوى حالياً</p>
            <p className="hint">جرب المستوى B1 أو B2</p>
          </div>
        ) : (
          filtered.map(lesson => (
            <div 
              key={lesson.id}
              className="lesson-card clickable"
              onClick={() => setSelectedLesson(lesson)}
            >
              <div className="lesson-icon">💼</div>
              <h3>{lesson.title}</h3>
              <p className="lesson-title-ar">{lesson.titleAr}</p>
              <div className="lesson-category">
                <span className="category-badge">{lesson.category}</span>
              </div>
              <div className="vocab-count">
                {lesson.vocab.length} مفردات
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
