/* ==========================================================================
   DeutschLernen — Vocabulary Data (A1 → C2)
   ========================================================================== */

const LEVELS = [
  {
    code: "A1",
    name: "المبتدئ",
    de: "Anfänger",
    icon: "🌱",
    color: "#10b981",
    color2: "#06b6d4",
    desc: "أساسيات اللغة: التحيات، الأرقام، الألوان والعائلة. انطلق من الصفر بثقة.",
    unlockRequirement: 0,
    lessons: [
      {
        title: "التحيات والمجاملة",
        icon: "👋",
        words: [
          { de: "Hallo", ar: "مرحباً", pron: "هالو" },
          { de: "Guten Morgen", ar: "صباح الخير", pron: "غوتن مورغن" },
          { de: "Guten Abend", ar: "مساء الخير", pron: "غوتن آبنت" },
          { de: "Tschüss", ar: "إلى اللقاء", pron: "تشوس" },
          { de: "Bitte", ar: "من فضلك / عفواً", pron: "بيته" },
          { de: "Danke", ar: "شكراً", pron: "دانكه" },
          { de: "Ja", ar: "نعم", pron: "يا" },
          { de: "Nein", ar: "لا", pron: "ناين" },
          { de: "Entschuldigung", ar: "عذراً", pron: "إنتشولديغونغ" },
          { de: "Willkommen", ar: "أهلاً وسهلاً", pron: "فيلكومن" }
        ]
      },
      {
        title: "الأرقام",
        icon: "🔢",
        words: [
          { de: "eins", ar: "واحد", pron: "آينس" },
          { de: "zwei", ar: "اثنان", pron: "تسفاي" },
          { de: "drei", ar: "ثلاثة", pron: "دراي" },
          { de: "vier", ar: "أربعة", pron: "فير" },
          { de: "fünf", ar: "خمسة", pron: "فونف" },
          { de: "sechs", ar: "ستة", pron: "زيكس" },
          { de: "sieben", ar: "سبعة", pron: "زيبن" },
          { de: "acht", ar: "ثمانية", pron: "آخت" },
          { de: "neun", ar: "تسعة", pron: "نوين" },
          { de: "zehn", ar: "عشرة", pron: "تسين" }
        ]
      },
      {
        title: "الألوان والعائلة",
        icon: "🎨",
        words: [
          { de: "rot", ar: "أحمر", pron: "روت" },
          { de: "blau", ar: "أزرق", pron: "بلاو" },
          { de: "grün", ar: "أخضر", pron: "غروين" },
          { de: "gelb", ar: "أصفر", pron: "غيلب" },
          { de: "schwarz", ar: "أسود", pron: "شفارتس" },
          { de: "weiß", ar: "أبيض", pron: "فايس" },
          { de: "die Mutter", ar: "الأم", pron: "موتر" },
          { de: "der Vater", ar: "الأب", pron: "فاتر" },
          { de: "der Bruder", ar: "الأخ", pron: "برودر" },
          { de: "die Schwester", ar: "الأخت", pron: "شفستر" }
        ]
      }
    ]
  },
  {
    code: "A2",
    name: "الأساسي",
    de: "Grundstufe",
    icon: "🌿",
    color: "#06b6d4",
    color2: "#3b82f6",
    desc: "الطعام والشراب، التسوق، والروتين اليومي. عش حياتك اليومية بالألمانية.",
    unlockRequirement: 0.5,
    lessons: [
      {
        title: "الطعام والشراب",
        icon: "🍞",
        words: [
          { de: "das Brot", ar: "الخبز", pron: "بروت" },
          { de: "das Wasser", ar: "الماء", pron: "فاسر" },
          { de: "der Kaffee", ar: "القهوة", pron: "كافيه" },
          { de: "die Milch", ar: "الحليب", pron: "ميلش" },
          { de: "das Fleisch", ar: "اللحم", pron: "فلايش" },
          { de: "das Obst", ar: "الفواكه", pron: "أوبست" },
          { de: "der Käse", ar: "الجبنة", pron: "كيزه" },
          { de: "die Eier", ar: "البيض", pron: "آير" },
          { de: "der Zucker", ar: "السكر", pron: "تسوكر" },
          { de: "das Salz", ar: "الملح", pron: "زالتس" }
        ]
      },
      {
        title: "التسوق",
        icon: "🛍️",
        words: [
          { de: "kaufen", ar: "يشتري", pron: "كاوفن" },
          { de: "der Preis", ar: "السعر", pron: "برايس" },
          { de: "das Geld", ar: "المال", pron: "غيلت" },
          { de: "teuer", ar: "غالي الثمن", pron: "تويير" },
          { de: "billig", ar: "رخيص", pron: "بيليش" },
          { de: "der Markt", ar: "السوق", pron: "ماركت" },
          { de: "das Geschäft", ar: "المتجر", pron: "غيشيفت" },
          { de: "die Schuhe", ar: "الأحذية", pron: "شويه" },
          { de: "die Kleidung", ar: "الملابس", pron: "كلايدونغ" },
          { de: "bezahlen", ar: "يدفع الثمن", pron: "بيتسالن" }
        ]
      },
      {
        title: "الروتين اليومي",
        icon: "⏰",
        words: [
          { de: "aufstehen", ar: "يستيقظ", pron: "آوفشتيهن" },
          { de: "arbeiten", ar: "يعمل", pron: "آربايتن" },
          { de: "essen", ar: "يأكل", pron: "إيسن" },
          { de: "schlafen", ar: "ينام", pron: "شلافن" },
          { de: "die Uhr", ar: "الساعة", pron: "أور" },
          { de: "heute", ar: "اليوم", pron: "هويته" },
          { de: "morgen", ar: "غداً", pron: "مورغن" },
          { de: "gestern", ar: "أمس", pron: "غسترن" },
          { de: "der Tag", ar: "اليوم/النهار", pron: "تاغ" },
          { de: "die Nacht", ar: "الليل", pron: "ناخت" }
        ]
      }
    ]
  },
  {
    code: "B1",
    name: "المتوسط",
    de: "Mittelstufe",
    icon: "🌳",
    color: "#3b82f6",
    color2: "#6366f1",
    desc: "السفر، العمل والدراسة، والتعبير عن الرأي والمشاعر. كن مستقلاً في التواصل.",
    unlockRequirement: 1,
    lessons: [
      {
        title: "السفر",
        icon: "✈️",
        words: [
          { de: "die Reise", ar: "الرحلة", pron: "رايزه" },
          { de: "das Flugzeug", ar: "الطائرة", pron: "فلوكتسويغ" },
          { de: "der Bahnhof", ar: "محطة القطار", pron: "بان-هوف" },
          { de: "das Hotel", ar: "الفندق", pron: "هوتيل" },
          { de: "der Pass", ar: "جواز السفر", pron: "باس" },
          { de: "der Koffer", ar: "حقيبة السفر", pron: "كوفّر" },
          { de: "die Karte", ar: "الخريطة", pron: "كارته" },
          { de: "die Fahrkarte", ar: "التذكرة", pron: "فار-كارته" },
          { de: "reservieren", ar: "يحجز", pron: "رزيرفيرن" },
          { de: "ankommen", ar: "يصل", pron: "آنكومن" }
        ]
      },
      {
        title: "العمل والدراسة",
        icon: "💼",
        words: [
          { de: "der Beruf", ar: "المهنة", pron: "بيروف" },
          { de: "die Firma", ar: "الشركة", pron: "فيرما" },
          { de: "der Kollege", ar: "زميل العمل", pron: "كوليج" },
          { de: "die Bewerbung", ar: "طلب التوظيف", pron: "بيفيربونغ" },
          { de: "das Studium", ar: "الدراسة الجامعية", pron: "شتوديوم" },
          { de: "die Universität", ar: "الجامعة", pron: "أونيفيرسيتيت" },
          { de: "die Prüfung", ar: "الامتحان", pron: "بروفونغ" },
          { de: "lernen", ar: "يتعلم", pron: "ليرنن" },
          { de: "verstehen", ar: "يفهم", pron: "فيرشتيهن" },
          { de: "erklären", ar: "يشرح", pron: "إركيلرن" }
        ]
      },
      {
        title: "الرأي والمشاعر",
        icon: "💬",
        words: [
          { de: "die Meinung", ar: "الرأي", pron: "ماينونغ" },
          { de: "denken", ar: "يعتقد", pron: "دينكن" },
          { de: "glauben", ar: "يظن", pron: "غلاوبن" },
          { de: "hoffen", ar: "يأمل", pron: "هوفن" },
          { de: "die Freude", ar: "الفرح", pron: "فرويده" },
          { de: "die Angst", ar: "الخوف", pron: "أنغست" },
          { de: "die Liebe", ar: "الحب", pron: "ليبه" },
          { de: "glücklich", ar: "سعيد", pron: "غليكليش" },
          { de: "traurig", ar: "حزين", pron: "تراوريش" },
          { de: "wichtig", ar: "مهم", pron: "فيشتغ" }
        ]
      }
    ]
  },
  {
    code: "B2",
    name: "المتقدم",
    de: "Oberstufe",
    icon: "🔥",
    color: "#6366f1",
    color2: "#8b5cf6",
    desc: "الصحة، المجتمع والبيئة، والتكنولوجيا. ناقش المواضيع المعقدة بطلاقة.",
    unlockRequirement: 1,
    lessons: [
      {
        title: "الصحة",
        icon: "🩺",
        words: [
          { de: "die Gesundheit", ar: "الصحة", pron: "غيزوندهايت" },
          { de: "der Arzt", ar: "الطبيب", pron: "آرتست" },
          { de: "das Krankenhaus", ar: "المستشفى", pron: "كرانكن-هاوس" },
          { de: "die Medikamente", ar: "الأدوية", pron: "ميديكامنته" },
          { de: "die Kopfschmerzen", ar: "الصداع", pron: "كوفف-شميرتسن" },
          { de: "das Fieber", ar: "الحمى", pron: "فيبر" },
          { de: "die Krankheit", ar: "المرض", pron: "كرانكهايت" },
          { de: "gesund", ar: "بصحة جيدة", pron: "غيزوند" },
          { de: "die Behandlung", ar: "العلاج", pron: "بيهاندلونغ" },
          { de: "der Termin", ar: "الموعد", pron: "تيرمين" }
        ]
      },
      {
        title: "المجتمع والبيئة",
        icon: "🌍",
        words: [
          { de: "die Umwelt", ar: "البيئة", pron: "أومفيلت" },
          { de: "das Klima", ar: "المناخ", pron: "كليما" },
          { de: "die Energie", ar: "الطاقة", pron: "إنيرغي" },
          { de: "der Müll", ar: "النفايات", pron: "مول" },
          { de: "recyceln", ar: "يعيد التدوير", pron: "ريتسايكلن" },
          { de: "die Gesellschaft", ar: "المجتمع", pron: "غيزيلشافت" },
          { de: "die Freiheit", ar: "الحرية", pron: "فرايهيت" },
          { de: "das Gesetz", ar: "القانون", pron: "غيزيتس" },
          { de: "die Politik", ar: "السياسة", pron: "بولي تيك" },
          { de: "die Zukunft", ar: "المستقبل", pron: "تسوكونفت" }
        ]
      },
      {
        title: "التكنولوجيا",
        icon: "💻",
        words: [
          { de: "der Computer", ar: "الحاسوب", pron: "كومبيوتر" },
          { de: "das Internet", ar: "الإنترنت", pron: "إنترنت" },
          { de: "das Handy", ar: "الهاتف الذكي", pron: "هندي" },
          { de: "die App", ar: "التطبيق", pron: "أب" },
          { de: "die Software", ar: "البرمجيات", pron: "سوفتفير" },
          { de: "die Daten", ar: "البيانات", pron: "داتن" },
          { de: "die Nachricht", ar: "الرسالة", pron: "ناخريشت" },
          { de: "senden", ar: "يرسل", pron: "زندن" },
          { de: "empfangen", ar: "يستقبل", pron: "إمبفانغن" },
          { de: "verbinden", ar: "يتصل/يربط", pron: "فيربندن" }
        ]
      }
    ]
  },
  {
    code: "C1",
    name: "المحترف",
    de: "Fortgeschritten",
    icon: "💎",
    color: "#8b5cf6",
    color2: "#d946ef",
    desc: "التعبيرات الاصطلاحية، النقاش المتقدم، والمشاعر المعقدة. طلاقة تصل مستوى الناطقين.",
    unlockRequirement: 1,
    lessons: [
      {
        title: "التعبيرات الاصطلاحية",
        icon: "🎭",
        words: [
          { de: "Das ist mir Wurst", ar: "لا يهمني إطلاقاً", pron: "داس إيست مير فورست" },
          { de: "Ins Schwarze treffen", ar: "يصيب جوهر الموضوع", pron: "إنس شفارتسه تريفن" },
          { de: "Die Daumen drücken", ar: "يتمنى التوفيق", pron: "دي داومن دروكن" },
          { de: "Auf Wolke sieben schweben", ar: "في السماء السابعة", pron: "آوف فولكه زيبن شفيبن" },
          { de: "Ein Buch mit sieben Siegeln", ar: "لغز محيّر", pron: "آين بوخ ميت زيبن زيغلن" },
          { de: "Schwein haben", ar: "محظوظ جداً", pron: "شفاين هابن" },
          { de: "Kalte Füße bekommen", ar: "يتراجع في اللحظة الأخيرة", pron: "كالته فيسه بيكومن" },
          { de: "Den Nagel auf den Kopf treffen", ar: "يصيب الهدف بدقة", pron: "دين ناغل آوف دين كوبف تريفن" },
          { de: "Durch dick und dünn gehen", ar: "يرافق في السراء والضراء", pron: "دورش ديك أوند دون غيهن" },
          { de: "Tomaten auf den Augen haben", ar: "يتجاهل الأمر الواضح", pron: "توماتن آوف دن آوغن هابن" }
        ]
      },
      {
        title: "النقاش المتقدم",
        icon: "⚔️",
        words: [
          { de: "überzeugen", ar: "يقنع", pron: "أوبيرتسويغن" },
          { de: "widersprechen", ar: "يعارض", pron: "فيدر-شبريشن" },
          { de: "behaupten", ar: "يدّعي", pron: "بيهاوتن" },
          { de: "vermuten", ar: "يفترض", pron: "فيرموتن" },
          { de: "analysieren", ar: "يحلل", pron: "أناليزيرن" },
          { de: "bewerten", ar: "يقيّم", pron: "بيفرتن" },
          { de: "die Schlussfolgerung", ar: "الاستنتاج", pron: "شلوس-فولغيرونغ" },
          { de: "der Standpunkt", ar: "وجهة النظر", pron: "شتاند-بونكت" },
          { de: "das Argument", ar: "الحجة", pron: "أرغومن" },
          { de: "der Kompromiss", ar: "الحل الوسط", pron: "كومبروميس" }
        ]
      },
      {
        title: "المشاعر المعقدة",
        icon: "🌗",
        words: [
          { de: "die Sehnsucht", ar: "الشوق", pron: "زين-زوخت" },
          { de: "die Verzweiflung", ar: "اليأس", pron: "فير-تسفايفلونغ" },
          { de: "die Zufriedenheit", ar: "الرضا", pron: "تسو-فريدنهايت" },
          { de: "die Enttäuschung", ar: "خيبة الأمل", pron: "إنت-تويشونغ" },
          { de: "die Überraschung", ar: "المفاجأة", pron: "أوبير-راشونغ" },
          { de: "das Misstrauen", ar: "الريبة", pron: "ميس-تراوين" },
          { de: "das Vertrauen", ar: "الثقة", pron: "فير-تراوين" },
          { de: "die Neugier", ar: "الفضول", pron: "نوي-غير" },
          { de: "die Gelassenheit", ar: "الطمأنينة", pron: "غيلاسنهايت" },
          { de: "der Stolz", ar: "الفخر", pron: "شتولتس" }
        ]
      }
    ]
  },
  {
    code: "C2",
    name: "المتقن",
    de: "Meister",
    icon: "👑",
    color: "#d946ef",
    color2: "#ec4899",
    desc: "الأدب والفنون، القانون والعلم، والتفاصيل الدقيقة. إتقان كامل للغة بكل عمقها.",
    unlockRequirement: 1,
    lessons: [
      {
        title: "الأدب والفنون",
        icon: "📖",
        words: [
          { de: "die Literatur", ar: "الأدب", pron: "ليتيراتور" },
          { de: "das Gedicht", ar: "القصيدة", pron: "غيديشت" },
          { de: "der Roman", ar: "الرواية", pron: "رومان" },
          { de: "das Theater", ar: "المسرح", pron: "تياتر" },
          { de: "die Malerei", ar: "فن الرسم", pron: "ماليراي" },
          { de: "der Komponist", ar: "الملحن", pron: "كومبونيست" },
          { de: "das Kunstwerk", ar: "العمل الفني", pron: "كونست-فيرك" },
          { de: "der Stil", ar: "الأسلوب", pron: "شتيل" },
          { de: "die Symbolik", ar: "الرمزية", pron: "زيمبوليك" },
          { de: "die Interpretation", ar: "التفسير", pron: "إنتربريتاتسيون" }
        ]
      },
      {
        title: "القانون والعلم",
        icon: "⚖️",
        words: [
          { de: "die Rechtsprechung", ar: "الفقه القانوني", pron: "ريشت-شبريشونغ" },
          { de: "die Verfassung", ar: "الدستور", pron: "فير-فاسونغ" },
          { de: "die Forschung", ar: "البحث العلمي", pron: "فورشونغ" },
          { de: "die Hypothese", ar: "الفرضية", pron: "هيپوتيزه" },
          { de: "die Theorie", ar: "النظرية", pron: "تاوري" },
          { de: "der Beweis", ar: "الدليل", pron: "بيفايس" },
          { de: "das Phänomen", ar: "الظاهرة", pron: "فينومين" },
          { de: "die Gesetzmäßigkeit", ar: "الانتظام القانوني", pron: "غيزيتس-ميسيغكايت" },
          { de: "die Erkenntnis", ar: "المعرفة العلمية", pron: "إركينتنيس" },
          { de: "die Innovation", ar: "الابتكار", pron: "إنوفاتسيون" }
        ]
      },
      {
        title: "التفاصيل الدقيقة",
        icon: "🔬",
        words: [
          { de: "fein", ar: "دقيق", pron: "فاين" },
          { de: "subtil", ar: "خفي", pron: "سوبتيل" },
          { de: "andeuten", ar: "يلمّح إلى", pron: "آن-دوتن" },
          { de: "unterschwellig", ar: "ضمني", pron: "أونتر-شفيلغ" },
          { de: "ausgeprägt", ar: "بارز وواضح", pron: "آوس-غيهبراغت" },
          { de: "vielschichtig", ar: "متعدد الأوجه", pron: "فيل-شيشتيغ" },
          { de: "widersprüchlich", ar: "متناقض", pron: "فيدر-شبريشليش" },
          { de: "beiläufig", ar: "عابر", pron: "باي-لويفيش" },
          { de: "präzise", ar: "بدقة متناهية", pron: "بريتسيزه" },
          { de: "differenziert", ar: "مفصّل ودقيق", pron: "ديفيرينتسيرت" }
        ]
      }
    ]
  }
];

const BADGES = [
  { id: "first", icon: "🌱", name: "الخطوة الأولى", desc: "أكمل أول درس لك", check: (s) => s.lessonsDone >= 1 },
  { id: "collector50", icon: "📚", name: "جامع الكلمات", desc: "تعلّم 50 كلمة", check: (s) => s.wordsLearned >= 50 },
  { id: "collector100", icon: "🧠", name: "ذاكرة فولاذية", desc: "تعلّم 100 كلمة", check: (s) => s.wordsLearned >= 100 },
  { id: "games3", icon: "🎮", name: "لاعب محترف", desc: "فز بكل أنواع الألعاب", check: (s) => s.gamesWon.length >= 3 },
  { id: "exams3", icon: "📝", name: "خبير اختبارات", desc: "اجتز 3 امتحانات", check: (s) => s.examsPassed >= 3 },
  { id: "a1done", icon: "🌱", name: "فاتح البداية", desc: "أكمل المستوى A1", check: (s) => s.examsPassed >= 1 },
  { id: "b2done", icon: "🔥", name: "نصف الطريق", desc: "أكمل المستوى B2", check: (s) => s.examsPassed >= 4 },
  { id: "master", icon: "👑", name: "سيد اللغة", desc: "أكمل جميع المستويات الستة", check: (s) => s.examsPassed >= 6 }
];
