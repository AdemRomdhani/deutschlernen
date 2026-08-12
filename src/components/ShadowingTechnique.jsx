import React, { useState, useRef, useEffect } from 'react';
import { speakGerman, stopSpeaking } from '../speech.js';

const shadowingData = [
  {
    id: 1, level: 'A1', title: 'Begrüßung', titleAr: 'تحية',
    sentences: [
      { de: 'Hallo! Wie geht es Ihnen?', ar: 'مرحباً كيف حالك؟', speed: 0.9 },
      { de: 'Mir geht es gut, danke.', ar: 'أنا بخير، شكراً.', speed: 1.0 },
      { de: 'Wie heißen Sie?', ar: 'ما اسمك؟', speed: 1.0 },
      { de: 'Ich heiße Anna.', ar: 'اسمي آنا.', speed: 1.0 },
      { de: 'Freut mich!', ar: 'تشرفت!', speed: 1.1 }
    ]
  },
  {
    id: 2, level: 'A1', title: 'Im Restaurant', titleAr: 'في المطعم',
    sentences: [
      { de: 'Einen Tisch für zwei, bitte.', ar: 'طاولة لشخصين، من فضلك.', speed: 0.9 },
      { de: 'Was möchten Sie bestellen?', ar: 'ماذا تريد أن تطلب؟', speed: 1.0 },
      { de: 'Ich möchte einen Kaffee.', ar: 'أريد قهوة.', speed: 1.0 },
      { de: 'Die Rechnung, bitte.', ar: 'الحساب، من فضلك.', speed: 1.0 },
      { de: 'Danke, das war sehr gut.', ar: 'شكراً، كان ممتازاً.', speed: 1.0 }
    ]
  },
  {
    id: 3, level: 'A2', title: 'Einkaufen', titleAr: 'التسوق',
    sentences: [
      { de: 'Können Sie mir bitte helfen?', ar: 'هل يمكنك مساعدتي من فضلك؟', speed: 0.95 },
      { de: 'Wo finde ich die Milch?', ar: 'أين أجد الحليب؟', speed: 1.0 },
      { de: 'Das ist zu teuer.', ar: 'هذا غالٍ جداً.', speed: 1.0 },
      { de: 'Gibt es einen Rabatt?', ar: 'هل هناك خصم؟', speed: 1.0 },
      { de: 'Ich kaufe das.', ar: 'سأشتري هذا.', speed: 1.0 }
    ]
  },
  {
    id: 4, level: 'B1', title: 'Telefonat', titleAr: 'مكالمة هاتفية',
    sentences: [
      { de: 'Hier spricht Max Müller.', ar: 'هنا ماكس مولر يتحدث.', speed: 0.95 },
      { de: 'Können Sie das bitte wiederholen?', ar: 'هل يمكنك تكرار ذلك من فضلك؟', speed: 1.0 },
      { de: 'Ich rufe Sie morgen zurück.', ar: 'سأتصل بك غداً.', speed: 1.0 },
      { de: 'Können Sie das aufschreiben?', ar: 'هل يمكنك كتابة ذلك؟', speed: 1.0 },
      { de: 'Danke für Ihren Anruf.', ar: 'شكراً لاتصالك.', speed: 1.0 }
    ]
  },
  {
    id: 5, level: 'B2', title: 'Business Meeting', titleAr: 'اجتماع عمل',
    sentences: [
      { de: 'Lassen Sie uns mit der Tagesordnung beginnen.', ar: 'دعونا نبدأ بجدول الأعمال.', speed: 0.95 },
      { de: 'Ich bin damit einverstanden.', ar: 'أنا أتفق مع ذلك.', speed: 1.0 },
      { de: 'Können Sie das genauer erklären?', ar: 'هل يمكنك شرح ذلك بشكل أدق؟', speed: 1.0 },
      { de: 'Wir müssen das noch besprechen.', ar: 'علينا مناقشة ذلك بعد.', speed: 1.0 },
      { de: 'Das ist eine gute Idee.', ar: 'هذه فكرة جيدة.', speed: 1.0 }
    ]
  }
];

export default function ShadowingTechnique({ level, goBack, onBack }) {
  const [selectedSession, setSelectedSession] = useState(null);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [scores, setScores] = useState([]);
  const [showTranslation, setShowTranslation] = useState(false);
  const [activeLevel, setActiveLevel] = useState(level?.toUpperCase() || 'A1');

  const recognitionRef = useRef(null);

  const sessions = shadowingData.filter(s => s.level === activeLevel);

  useEffect(() => {
    return () => { if (recognitionRef.current) recognitionRef.current.abort(); };
  }, []);

  const speakSentence = (sentence) => {
    return new Promise((resolve) => {
      stopSpeaking();
      speakGerman(sentence.de, { rate: sentence.speed || 1.0, onEnd: () => resolve() });
    });
  };

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('متصفحك لا يدعم التعرف على الصوت');
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = 'de-DE';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const confidence = event.results[0][0].confidence;
      setScores(prev => [...prev, {
        sentence: selectedSession.sentences[currentSentence].de,
        spoken: transcript,
        confidence
      }]);
      setIsRecording(false);
      setRecordingComplete(true);
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
    setRecordingComplete(false);
  };

  const stopRecording = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
  };

  const nextSentence = () => {
    if (currentSentence < selectedSession.sentences.length - 1) {
      setCurrentSentence(prev => prev + 1);
      setRecordingComplete(false);
      setShowTranslation(false);
    } else {
      setCurrentSentence(0);
      setSelectedSession(null);
      setScores([]);
    }
  };

  const back = goBack || onBack;

  if (selectedSession) {
    const sentence = selectedSession.sentences[currentSentence];
    const totalScore = scores.length > 0
      ? Math.round(scores.reduce((acc, s) => acc + s.confidence, 0) / scores.length * 100)
      : 0;

    return (
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <button className="back-btn" onClick={() => { setSelectedSession(null); setScores([]); setCurrentSentence(0); }}>← العودة</button>

        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <h2>{selectedSession.title}</h2>
          <p style={{ color: 'var(--text-soft)' }}>{selectedSession.titleAr}</p>
          <div style={{ fontWeight: 700, marginTop: 8 }}>{currentSentence + 1} / {selectedSession.sentences.length}</div>
        </div>

        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontFamily: 'var(--font-la)', fontWeight: 800, fontSize: 24, direction: 'ltr', marginBottom: 12 }}>{sentence.de}</div>
          <button style={{ padding: '6px 16px', borderRadius: 999, border: '1px solid var(--border)', background: 'var(--bg-soft)', cursor: 'pointer', fontWeight: 700, fontSize: 13 }} onClick={() => setShowTranslation(!showTranslation)}>
            {showTranslation ? 'إخفاء الترجمة' : 'عرض الترجمة'}
          </button>
          {showTranslation && <div style={{ marginTop: 10, color: 'var(--text-soft)', fontSize: 16 }}>{sentence.ar}</div>}
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
          <button className="btn btn-primary" onClick={() => speakSentence(sentence)}>🎧 استمع</button>
          <button className={`btn ${isRecording ? 'btn-danger' : 'btn-primary'}`} onClick={isRecording ? stopRecording : startRecording}>
            {isRecording ? '⏹️ إيقاف' : '🎤 سجّل صوتك'}
          </button>
          <button className="btn btn-ghost" onClick={nextSentence}>
            {currentSentence < selectedSession.sentences.length - 1 ? 'التالي →' : 'الانتهاء ✓'}
          </button>
        </div>

        {recordingComplete && scores.length > 0 && (
          <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
            <h4>النتيجة</h4>
            <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden', margin: '10px 0' }}>
              <div style={{ height: '100%', width: `${totalScore}%`, background: totalScore >= 70 ? '#10b981' : '#f59e0b', borderRadius: 4, transition: 'width 0.5s' }} />
            </div>
            <div style={{ fontWeight: 800, fontSize: 20, color: totalScore >= 70 ? '#10b981' : '#f59e0b' }}>{totalScore}%</div>
            <p style={{ color: 'var(--text-soft)', marginTop: 8 }}>ما قلته: <strong>{scores[scores.length - 1].spoken}</strong></p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <button className="back-btn" onClick={back}>← العودة</button>

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2>🗣️ تقنية الشادوينج</h2>
        <p style={{ color: 'var(--text-soft)' }}>استمع وكرر الجمل لتحسين النطق</p>
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
        {['A1', 'A2', 'B1', 'B2'].map(l => (
          <button
            key={l}
            onClick={() => setActiveLevel(l)}
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

      {sessions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-soft)' }}>لا توجد جلسات متاحة لهذا المستوى</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 14 }}>
          {sessions.map(session => (
            <div
              key={session.id}
              onClick={() => setSelectedSession(session)}
              style={{
                background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: 14,
                padding: 20, cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ fontSize: 36, marginBottom: 8 }}>🗣️</div>
              <h3 style={{ margin: '0 0 4px' }}>{session.title}</h3>
              <p style={{ color: 'var(--text-soft)', fontSize: 13, margin: '0 0 8px' }}>{session.titleAr}</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, fontSize: 13 }}>
                <span>{session.sentences.length} جمل</span>
                <span style={{ padding: '2px 8px', borderRadius: 8, background: '#8b5cf6', color: '#fff', fontWeight: 700, fontSize: 12 }}>{session.level}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 30, padding: 20, background: 'var(--bg-soft)', borderRadius: 14, border: '1px solid var(--border)' }}>
        <h3>💡 نصائح للشادوينج</h3>
        <ul style={{ marginTop: 10, paddingRight: 20, color: 'var(--text-soft)', lineHeight: 2 }}>
          <li>استمع أولاً بعناية قبل التكرار</li>
          <li>حاول محاكاة النبرة والسرعة</li>
          <li>سجّل صوتك وقارن مع الأصلي</li>
          <li>تدرب بانتظام لمدة 10 دقائق يومياً</li>
        </ul>
      </div>
    </div>
  );
}
