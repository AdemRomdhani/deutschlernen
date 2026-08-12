import React, { useState } from 'react';
import { speakGerman } from '../speech.js';

const businessData = [
  {
    id: 1, level: 'A1', category: 'Grundlagen', categoryAr: 'الأساسيات',
    title: 'Sich vorstellen', titleAr: 'التعريف بالنفس',
    content: `Hallo, ich heiße... Ich komme aus... Ich arbeite als... 
    Wie heißen Sie? Freut mich, Sie kennenzulernen!`,
    vocab: [
      { de: 'sich vorstellen', ar: 'يُعرّف بنفسه' },
      { de: 'ich heiße', ar: 'اسمي' },
      { de: 'ich komme aus', ar: 'أنا من' },
      { de: 'ich arbeite als', ar: 'أعمل كـ' },
      { de: 'freut mich', ar: 'تشرفت' }
    ]
  },
  {
    id: 2, level: 'A1', category: 'Grundlagen', categoryAr: 'الأساسيات',
    title: 'Im Büro', titleAr: 'في المكتب',
    content: `Wo ist der Drucker? Kann ich den Computer benutzen?
    Ich brauche Hilfe. Das Meeting beginnt um 10 Uhr.
    Wo ist mein Stuhl? Ich trinke einen Kaffee.`,
    vocab: [
      { de: 'der Drucker', ar: 'الطابعة' },
      { de: 'der Computer', ar: 'الحاسوب' },
      { de: 'das Meeting', ar: 'الاجتماع' },
      { de: 'beginnen', ar: 'يبدأ' },
      { de: 'der Stuhl', ar: 'الكرسي' }
    ]
  },
  {
    id: 3, level: 'B1', category: 'Bewerbung', categoryAr: 'التقديم على وظيفة',
    title: 'Lebenslauf', titleAr: 'السيرة الذاتية',
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
    id: 4, level: 'B1', category: 'Bewerbung', categoryAr: 'التقديم على وظيفة',
    title: 'Anschreiben', titleAr: 'رسالة التقديم',
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
    id: 5, level: 'B1', category: 'Telefon', categoryAr: 'الهاتف',
    title: 'Am Telefon', titleAr: 'على الهاتف',
    content: `Guten Tag, hier spricht Herr/Frau...
    Kann ich bitte Herrn/Frau... sprechen?
    Einen Moment bitte. Ich verbinde Sie.
    Können Sie das bitte wiederholen?
    Ich rufe Sie später zurück.`,
    vocab: [
      { de: 'hier spricht', ar: 'هنا يتحدث' },
      { de: 'verbinden', ar: 'يُحوّل المكالمة' },
      { de: 'wiederholen', ar: 'يُكرّر' },
      { de: 'zurückrufen', ar: 'يُعيد الاتصال' },
      { de: 'einen Moment', ar: 'لحظة من فضلك' }
    ]
  },
  {
    id: 6, level: 'B2', category: 'Meetings', categoryAr: 'الاجتماعات',
    title: 'Meeting leiten', titleAr: 'قيادة الاجتماع',
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
    id: 7, level: 'B2', category: 'Meetings', categoryAr: 'الاجتماعات',
    title: 'Präsentation halten', titleAr: 'إعطاء عرض تقديمي',
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
    id: 8, level: 'B2', category: 'Korrespondenz', categoryAr: 'المراسلات',
    title: 'Formelle E-Mails', titleAr: 'الرسائل الإلكترونية الرسمية',
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
  },
  {
    id: 9, level: 'C1', category: 'Verhandlung', categoryAr: 'التفاوض',
    title: 'Verhandlungstechniken', titleAr: 'تقنيات التفاوض',
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
    id: 10, level: 'C1', category: 'Präsentation', categoryAr: 'العروض التقديمية',
    title: 'Vorstellung des Projekts', titleAr: 'عرض المشروع',
    content: `Das Ziel des Projekts ist es, den Umsatz zu steigern.
    Der Zeitraum erstreckt sich über sechs Monate.
    Das Budget beträgt 50.000 Euro.
    Das Team besteht aus fünf Mitarbeitern.
    Die Risiken sind minimal.`,
    vocab: [
      { de: 'der Umsatz', ar: 'الإيرادات' },
      { de: 'der Zeitraum', ar: 'الإطار الزمني' },
      { de: 'das Budget', ar: 'الميزانية' },
      { de: 'die Mitarbeiter', ar: 'الموظفون' },
      { de: 'das Risiko', ar: 'المخاطرة' }
    ]
  }
];

export default function BusinessGerman({ level, goBack, onBack }) {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showVocab, setShowVocab] = useState(false);
  const [activeLevel, setActiveLevel] = useState(level?.toUpperCase() || 'A1');

  const filtered = businessData.filter(item => item.level === activeLevel);
  const back = goBack || onBack;

  if (selectedLesson) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <button className="back-btn" onClick={() => { setSelectedLesson(null); setShowVocab(false); }}>← العودة</button>

        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 22 }}>{selectedLesson.title}</h2>
            <span style={{ padding: '4px 12px', borderRadius: 999, background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', fontWeight: 700, fontSize: 13 }}>{selectedLesson.categoryAr}</span>
          </div>

          <div style={{ fontSize: 15, lineHeight: 2, color: 'var(--text)', marginBottom: 20, direction: 'ltr', textAlign: 'left', whiteSpace: 'pre-line' }}>{selectedLesson.content}</div>

          <button style={{ padding: '8px 20px', borderRadius: 10, border: '2px solid #8b5cf6', background: showVocab ? '#8b5cf6' : 'transparent', color: showVocab ? '#fff' : '#8b5cf6', fontWeight: 700, cursor: 'pointer', fontSize: 14, marginBottom: 16 }} onClick={() => setShowVocab(!showVocab)}>
            {showVocab ? 'إخفاء المفردات' : 'عرض المفردات'}
          </button>

          {showVocab && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <h3 style={{ margin: 0 }}>المفردات المهمة</h3>
              {selectedLesson.vocab.map((v, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-soft)', borderRadius: 10, border: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'var(--font-la)', fontWeight: 700, direction: 'ltr' }}>{v.de}</span>
                  <span style={{ color: 'var(--text-soft)' }}>{v.ar}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <button className="back-btn" onClick={back}>← العودة</button>

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2>🇩🇪 الألمانية المهنية</h2>
        <p style={{ color: 'var(--text-soft)' }}>تعلم اللغة الألمانية للعمل والمهنة</p>
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
        {['A1', 'B1', 'B2', 'C1'].map(l => (
          <button
            key={l}
            onClick={() => { setActiveLevel(l); setSelectedLesson(null); }}
            style={{
              padding: '10px 24px', borderRadius: 999, border: '2px solid',
              borderColor: activeLevel === l ? '#8b5cf6' : 'var(--border)',
              background: activeLevel === l ? '#8b5cf6' : 'var(--bg)',
              color: activeLevel === l ? '#fff' : 'var(--text)',
              fontWeight: 700, cursor: 'pointer', fontSize: 14
            }}
          >
            {l}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-soft)' }}>
          <p>لا توجد دروس متاحة لهذا المستوى حالياً</p>
          <p style={{ fontSize: 13, marginTop: 8 }}>جرب المستوى A1 أو B1</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 14 }}>
          {filtered.map(lesson => (
            <div
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              style={{
                background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: 14,
                padding: 20, cursor: 'pointer', transition: 'all 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ fontSize: 36, marginBottom: 8 }}>💼</div>
              <h3 style={{ margin: '0 0 4px' }}>{lesson.title}</h3>
              <p style={{ color: 'var(--text-soft)', fontSize: 13, margin: '0 0 8px' }}>{lesson.titleAr}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                <span style={{ padding: '2px 10px', borderRadius: 8, background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', fontWeight: 600 }}>{lesson.categoryAr}</span>
                <span style={{ color: 'var(--text-soft)' }}>{lesson.vocab.length} مفردات</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
