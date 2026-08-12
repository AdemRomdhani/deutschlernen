import React, { useState, useRef, useEffect } from 'react';
import { speakGerman, stopSpeaking } from '../speech.js';

const shadowingData = [
  {
    id: 1,
    level: 'A1',
    title: 'Begrüßung',
    titleAr: 'تحية',
    sentences: [
      { de: 'Hallo! Wie geht es Ihnen?', ar: '!مرحباً كيف حالك؟', speed: 0.9 },
      { de: 'Mir geht es gut, danke.', ar: 'أنا بخير، شكراً.', speed: 1.0 },
      { de: 'Wie heißen Sie?', ar: 'ما اسمك؟', speed: 1.0 },
      { de: 'Ich heiße Anna.', ar: 'اسمي آنا.', speed: 1.0 },
      { de: 'Freut mich!', ar: 'تشرفت!', speed: 1.1 }
    ]
  },
  {
    id: 2,
    level: 'A1',
    title: 'Im Restaurant',
    titleAr: 'في المطعم',
    sentences: [
      { de: 'Einen Tisch für zwei, bitte.', ar: 'طاولة لشخصين، من فضلك.', speed: 0.9 },
      { de: 'Was möchten Sie bestellen?', ar: 'ماذا تريد أن تطلب؟', speed: 1.0 },
      { de: 'Ich möchte einen Kaffee.', ar: 'أريد قهوة.', speed: 1.0 },
      { de: 'Die Rechnung, bitte.', ar: 'الحساب، من فضلك.', speed: 1.0 },
      { de: 'Danke, das war sehr gut.', ar: 'شكراً، كان ممتازاً.', speed: 1.0 }
    ]
  },
  {
    id: 3,
    level: 'A2',
    title: 'Einkaufen',
    titleAr: 'التسوق',
    sentences: [
      { de: 'Können Sie mir bitte helfen?', ar: 'هل يمكنك مساعدتي من فضلك؟', speed: 0.95 },
      { de: 'Wo finde ich die Milch?', ar: 'أين أجد الحليب؟', speed: 1.0 },
      { de: 'Das ist zu teuer.', ar: 'هذا غالٍ جداً.', speed: 1.0 },
      { de: 'Gibt es einen Rabatt?', ar: 'هل هناك خصم؟', speed: 1.0 },
      { de: 'Ich kaufe das.', ar: 'سأشتري هذا.', speed: 1.0 }
    ]
  },
  {
    id: 4,
    level: 'B1',
    title: 'Telefonat',
    titleAr: 'مكالمة هاتفية',
    sentences: [
      { de: 'Hier spricht Max Müller.', ar: 'هنا ماكس مولر يتحدث.', speed: 0.95 },
      { de: 'Können Sie das bitte wiederholen?', ar: 'هل يمكنك تكرار ذلك من فضلك؟', speed: 1.0 },
      { de: 'Ich rufe Sie morgen zurück.', ar: 'سأتصل بك غداً.', speed: 1.0 },
      { de: 'Können Sie das aufschreiben?', ar: 'هل يمكنك كتابة ذلك؟', speed: 1.0 },
      { de: 'Danke für Ihren Anruf.', ar: 'شكراً لاتصالك.', speed: 1.0 }
    ]
  },
  {
    id: 5,
    level: 'B2',
    title: 'Business Meeting',
    titleAr: 'اجتماع عمل',
    sentences: [
      { de: 'Lassen Sie uns mit der Tagesordnung beginnen.', ar: 'دعونا نبدأ بجدول الأعمال.', speed: 0.95 },
      { de: 'Ich bin damit einverstanden.', ar: 'أنا أتفق مع ذلك.', speed: 1.0 },
      { de: 'Können Sie das genauer erklären?', ar: 'هل يمكنك شرح ذلك بشكل أدق؟', speed: 1.0 },
      { de: 'Wir müssen das noch besprechen.', ar: 'علينا مناقشة ذلك بعد.', speed: 1.0 },
      { de: 'Das ist eine gute Idee.', ar: 'هذه فكرة جيدة.', speed: 1.0 }
    ]
  }
];

export default function ShadowingTechnique({ level, goBack }) {
  const [selectedSession, setSelectedSession] = useState(null);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [scores, setScores] = useState([]);
  const [showTranslation, setShowTranslation] = useState(false);
  
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);

  const currentLevel = level?.toUpperCase() || 'A1';
  const sessions = shadowingData.filter(s => s.level === currentLevel);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const speakSentence = (sentence) => {
    return new Promise((resolve) => {
      stopSpeaking();
      speakGerman(sentence.de, {
        rate: sentence.speed || 1.0,
        onEnd: () => resolve(),
      });
    });
  };

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('متصفحك لا يدعم التعرف على الصوت');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'de-DE';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const confidence = event.results[0][0].confidence;
      
      setScores(prev => [...prev, {
        sentence: selectedSession.sentences[currentSentence].de,
        spoken: transcript,
        confidence: confidence
      }]);
      
      setIsRecording(false);
      setRecordingComplete(true);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
    setRecordingComplete(false);
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
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

  if (selectedSession) {
    const sentence = selectedSession.sentences[currentSentence];
    const totalScore = scores.length > 0 
      ? Math.round(scores.reduce((acc, s) => acc + s.confidence, 0) / scores.length * 100)
      : 0;

    return (
      <div className="training-container">
        <button className="back-btn" onClick={() => {
          setSelectedSession(null);
          setScores([]);
        }}>
          ← العودة
        </button>

        <div className="shadowing-header">
          <h2>{selectedSession.title}</h2>
          <div className="progress-info">
            <span>{currentSentence + 1} / {selectedSession.sentences.length}</span>
          </div>
        </div>

        <div className="sentence-display">
          <div className="german-text">{sentence.de}</div>
          <button 
            className="translation-toggle"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            {showTranslation ? 'إخفاء الترجمة' : 'عرض الترجمة'}
          </button>
          {showTranslation && (
            <div className="translation-text">{sentence.ar}</div>
          )}
        </div>

        <div className="shadowing-controls">
          <button 
            className="listen-btn"
            onClick={() => speakSentence(sentence)}
          >
            🎧 استمع
          </button>
          
          <button 
            className={`record-btn ${isRecording ? 'recording' : ''}`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? '⏹️ إيقاف' : '🎤 سجّل صوتك'}
          </button>
          
          <button 
            className="next-btn"
            onClick={nextSentence}
          >
            {currentSentence < selectedSession.sentences.length - 1 ? 'التالي →' : 'الانتهاء ✓'}
          </button>
        </div>

        {recordingComplete && scores.length > 0 && (
          <div className="recording-result">
            <div className="result-card">
              <h4>النتيجة</h4>
              <div className="confidence-bar">
                <div 
                  className="confidence-fill"
                  style={{ width: `${totalScore}%` }}
                />
              </div>
              <p>الثقة: {totalScore}%</p>
              <p className="spoken-text">ما قلته: {scores[scores.length - 1].spoken}</p>
            </div>
          </div>
        )}

        {scores.length > 0 && (
          <div className="session-stats">
            <h4>إحصائيات الجلسة</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">عدد الجمل</span>
                <span className="stat-value">{scores.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">متوسط الثقة</span>
                <span className="stat-value">{totalScore}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="training-container">
      <button className="back-btn" onClick={goBack}>← العودة</button>

      <div className="training-header">
        <h2>🗣️ تقنية الشادوينج</h2>
        <p>استمع وكرر الجمل لتحسين النطق</p>
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

      <div className="sessions-grid">
        {sessions.length === 0 ? (
          <div className="no-sessions">
            <p>لا توجد جلسات متاحة لهذا المستوى</p>
          </div>
        ) : (
          sessions.map(session => (
            <div 
              key={session.id}
              className="session-card clickable"
              onClick={() => setSelectedSession(session)}
            >
              <div className="session-icon">🗣️</div>
              <h3>{session.title}</h3>
              <p className="session-title-ar">{session.titleAr}</p>
              <div className="session-info">
                <span>{session.sentences.length} جمل</span>
                <span className="level-badge">{session.level}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="shadowing-tips">
        <h3>💡 نصائح للشادوينج</h3>
        <ul>
          <li>استمع أولاً بعناية قبل التكرار</li>
          <li>حاول محاكاة النبرة والسرعة</li>
          <li>سجّل صوتك وقارن مع الأصلي</li>
          <li>تدرب بانتظام لمدة 10 دقائق يومياً</li>
        </ul>
      </div>
    </div>
  );
}
