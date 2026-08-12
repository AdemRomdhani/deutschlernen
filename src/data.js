/* ==========================================================================
   DeutschLernen — Vocabulary + Grammar Data (A1 → C2)
   ========================================================================== */

export const LEVELS = [
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
    ],
    grammar: [
      {
        title: "أدوات التعريف",
        icon: "📛",
        topics: [
          { name: "المذكّر: der", explanation: "اسم المذكر يأخذ أداة التعريف der", example: { de: "der Mann", ar: "الرجل" } },
          { name: "المؤنّث: die", explanation: "اسم المؤنث يأخذ أداة التعريف die", example: { de: "die Frau", ar: "المرأة" } },
          { name: "المحايد: das", explanation: "الاسم المحايد يأخذ أداة التعريف das", example: { de: "das Kind", ar: "الطفل" } },
          { name: "الجمع: die", explanation: "الجمع دائمًا مع die في أغلب الحالات", example: { de: "die Kinder", ar: "الأطفال" } }
        ]
      },
      {
        title: "الضمائر الشخصية",
        icon: "🙋",
        topics: [
          { name: "الضمائر المفردة", explanation: "ich (أنا) · du (أنتَ) · er/sie/es (هو/هي/هو للمحايد)", example: { de: "Ich bin hier.", ar: "أنا هنا" } },
          { name: "الضمائر الجمع", explanation: "wir (نحن) · ihr (أنتم) · sie (هم) · Sie (حضرتك للاحترام)", example: { de: "Wir lernen Deutsch.", ar: "نحن نتعلم الألمانية" } }
        ]
      },
      {
        title: "ترتيب الجملة",
        icon: "🧱",
        topics: [
          { name: "الفعل في الموضع الثاني", explanation: "في الجملة الخبرية الفعل يأتي دائمًا في الموضع الثاني", example: { de: "Ich lerne Deutsch.", ar: "أنا أتعلم الألمانية" } },
          { name: "السؤال بنعم/لا", explanation: "في السؤال يبدأ الفعل الجملة ثم الفاعل", example: { de: "Lernst du Deutsch?", ar: "هل تتعلم الألمانية؟" } }
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
    ],
    grammar: [
      {
        title: "تصريف الأفعال في المضارع",
        icon: "🔄",
        topics: [
          { name: "النهايات مع الضمائر", explanation: "ich lerne · du lernst · er/sie/es lernt · wir lernen · ihr lernt · sie lernen", example: { de: "Ich lerne jeden Tag.", ar: "أتعلم كل يوم" } },
          { name: "أفعال تنتهي بـ -t و -d", explanation: "نضيف -e للوضوح قبل النهاية: er arbeitet", example: { de: "Er arbeitet heute.", ar: "هو يعمل اليوم" } }
        ]
      },
      {
        title: "الأفعال الناقصة (Modalverben)",
        icon: "🎛️",
        topics: [
          { name: "können — يستطيع", explanation: "يعبر عن القدرة أو الإمكانية", example: { de: "Ich kann Deutsch sprechen.", ar: "أستطيع التحدث بالألمانية" } },
          { name: "müssen — يجب", explanation: "يعبر عن الوجوب أو الاضطرار", example: { de: "Ich muss arbeiten.", ar: "يجب أن أعمل" } },
          { name: "wollen — يريد", explanation: "يعبر عن الرغبة", example: { de: "Wir wollen reisen.", ar: "نريد أن نسافر" } }
        ]
      },
      {
        title: "الأفعال المنفصلة",
        icon: "🔗",
        topics: [
          { name: "الجزء ينفصل في التصريف", explanation: "في المضارع ينفصل الجزء ويذهب لنهاية الجملة", example: { de: "Ich stehe um 7 Uhr auf.", ar: "أستيقظ الساعة السابعة" } },
          { name: "الجزء لا ينفصل مع المنفصلات", explanation: "في الجمل الثانوية لا ينفصل الجزء، ويذهب الفعل كاملاً للآخر", example: { de: "Ich weiß, dass du aufstehst.", ar: "أعرف أنك تستيقظ" } }
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
    ],
    grammar: [
      {
        title: "الماضي المركّب (Perfekt)",
        icon: "⏮️",
        topics: [
          { name: "التركيب", explanation: "haben أو sein + التصريف الثالث للفعل (Partizip II)", example: { de: "Ich habe gegessen.", ar: "أنا أكلت" } },
          { name: "أفعال الحركة مع sein", explanation: "أفعال الحركة وتغير المكان تستخدم sein", example: { de: "Ich bin nach Hause gegangen.", ar: "ذهبتُ إلى المنزل" } }
        ]
      },
      {
        title: "الماضي البسيط (Präteritum)",
        icon: "📖",
        topics: [
          { name: "الاستخدام", explanation: "يستخدم كثيراً في الكتابة ومع الأفعال المساعدة", example: { de: "Es war schön.", ar: "كان جميلاً" } },
          { name: "أفعال مهمة", explanation: "war (كان) · hatte (كان يملك) · ging (ذهب)", example: { de: "Ich hatte keine Zeit.", ar: "لم يكن لديّ وقت" } }
        ]
      },
      {
        title: "الجمل الثانوية (Nebensätze)",
        icon: "🧩",
        topics: [
          { name: "الروابط weil · dass · wenn", explanation: "في الجملة الثانوية يذهب الفعل إلى نهاية الجملة", example: { de: "Ich lerne Deutsch, weil ich in Deutschland arbeite.", ar: "أتعلم الألمانية لأنني أعمل في ألمانيا" } },
          { name: "ترتيب الجملة", explanation: "الجملة الرئيسية تبدأ ثم الجملة الثانوية بالفعل في آخرها", example: { de: "Er sagt, dass er kommt.", ar: "يقول إنه سيأتي" } }
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
    ],
    grammar: [
      {
        title: "الصيغة المجهولة (Passiv)",
        icon: "🎭",
        topics: [
          { name: "التركيب", explanation: "werden + التصريف الثالث للفعل", example: { de: "Das Haus wird gebaut.", ar: "يُبنى البيت" } },
          { name: "الفاعل الحقيقي مع von", explanation: "يمكن ذكر الفاعل مع حرف الجر von", example: { de: "Das Buch wird von vielen gelesen.", ar: "يقرأ الكتاب من قبل الكثيرين" } }
        ]
      },
      {
        title: "صيغة الشرط الثانية (Konjunktiv II)",
        icon: "💭",
        topics: [
          { name: "التركيب بـ würde", explanation: "würde + المصدر، للتعبير عن المواقف الافتراضية", example: { de: "Ich würde gern nach Deutschland fliegen.", ar: "أودّ أن أسافر إلى ألمانيا" } },
          { name: "أفعال ناقصة خاصة", explanation: "könnte (يمكن)، müsste (يجب)، wäre (كان افتراضياً)", example: { de: "Wenn ich Zeit hätte, käme ich.", ar: "لو كان لديّ وقت لَجئت" } }
        ]
      },
      {
        title: "الجمل الموصولة (Relativsätze)",
        icon: "🔗",
        topics: [
          { name: "der/die/das بمعنى الذي", explanation: "تتطابق الضمائر الموصولة مع الاسم في النوع والعدد", example: { de: "Das ist der Mann, der Deutsch spricht.", ar: "هذا هو الرجل الذي يتحدث الألمانية" } },
          { name: "في حالة Akkusativ", explanation: "الضمير الموصول يتغير حسب الحالة", example: { de: "Der Mann, den ich kenne, ist nett.", ar: "الرجل الذي أعرفه لطيف" } }
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
    ],
    grammar: [
      {
        title: "الكلام غير المباشر (Konjunktiv I)",
        icon: "🗣️",
        topics: [
          { name: "التركيب", explanation: "يستخدم لنقل كلام الآخرين بدون تأكيد، مع الفعل في صيغة الشرط الأولى", example: { de: "Er sagt, er komme morgen.", ar: "يقول إنه سيأتي غداً" } },
          { name: "متى نستخدمه", explanation: "في الأخبار والتقارير عندما ننقل أقوالاً لا نتحمل مسؤوليتها", example: { de: "Sie behauptet, sie habe recht.", ar: "تدّعي أنها على حق" } }
        ]
      },
      {
        title: "التحويل إلى أسماء (Nominalisierung)",
        icon: "📝",
        topics: [
          { name: "تحويل الفعل إلى اسم", explanation: "المصدر يحوّل الفعل إلى اسم محايد مع das", example: { de: "Das Lesen macht mir Spaß.", ar: "القراءة تمنحني المتعة" } },
          { name: "تحويل الجملة إلى اسم", explanation: "الجملة يمكن تحويلها إلى مركب اسمي لاختصار الأسلوب", example: { de: "die Prüfung bestehen → das Bestehen der Prüfung", ar: "اجتياز الامتحان" } }
        ]
      },
      {
        title: "حروف الجر والحالات",
        icon: "📍",
        topics: [
          { name: "مع Dativ", explanation: "mit · nach · aus · von · bei · zu", example: { de: "Ich fahre mit dem Zug.", ar: "أسافر بالقطار" } },
          { name: "مع Akkusativ", explanation: "für · ohne · gegen · um · durch", example: { de: "Das ist für dich.", ar: "هذا من أجلك" } }
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
    ],
    grammar: [
      {
        title: "دقائق صيغ الشرط",
        icon: "🌀",
        topics: [
          { name: "Konjunktiv I للنقل", explanation: "لنقل الأقوال بموضوعية بدون حكم على صحتها", example: { de: "Er sagt, er sei müde.", ar: "يقول إنه متعب" } },
          { name: "Konjunktiv II للافتراض", explanation: "للتعبير عن الاحتمالات والمواقف الافتراضية غير الواقعية", example: { de: "Wäre ich reich, würde ich reisen.", ar: "لو كنت غنياً لسافرت" } }
        ]
      },
      {
        title: "الجملة المركّبة",
        icon: "🏗️",
        topics: [
          { name: "تعدد الجمل الثانوية", explanation: "في الأسلوب الراقي تتداخل جمل ثانوية عدة مع ترتيب دقيق للأفعال", example: { de: "Er hofft, dass er, wenn er fleißig lernt, die Prüfung besteht.", ar: "يأمل أن ينجح في الامتحان إذا اجتهد" } },
          { name: "الفعل في نهاية المطاف", explanation: "كل الأفعال في الجمل الثانوية تتجمع في نهاية الجملة بترتيب زمني صحيح", example: { de: "Sie fragte, wann er gekommen war.", ar: "سألت متى وصل" } }
        ]
      },
      {
        title: "الأسلوب الراقي (Stilistik)",
        icon: "✒️",
        topics: [
          { name: "الترادف الدقيق", explanation: "اختيار الكلمة الأنسب دلالياً لنقل المعنى بدقة (präzise vs. genau)", example: { de: "Das Problem ist komplex und vielschichtig.", ar: "المشكلة معقدة ومتعددة الأوجه" } },
          { name: "التصوير المجازي", explanation: "استخدام الاستعارات لإثراء اللغة في الكتابة الراقية", example: { de: "Das Eis des Schweigens brechen.", ar: "كسر جليد الصمت" } }
        ]
      }
    ]
  }
];

export const BADGES = [
  { id: "first", icon: "🌱", name: "الخطوة الأولى", desc: "أكمل أول درس لك", check: (s) => s.lessonsDone >= 1 },
  { id: "collector50", icon: "📚", name: "جامع الكلمات", desc: "تعلّم 50 كلمة", check: (s) => s.wordsLearned >= 50 },
  { id: "collector100", icon: "🧠", name: "ذاكرة فولاذية", desc: "تعلّم 100 كلمة", check: (s) => s.wordsLearned >= 100 },
  { id: "games3", icon: "🎮", name: "لاعب محترف", desc: "فز بكل أنواع الألعاب", check: (s) => s.gamesWon.length >= 5 },
  { id: "exams3", icon: "📝", name: "خبير اختبارات", desc: "اجتز 3 امتحانات", check: (s) => s.examsPassed >= 3 },
  { id: "a1done", icon: "🌱", name: "فاتح البداية", desc: "أكمل المستوى A1", check: (s) => s.examsPassed >= 1 },
  { id: "b2done", icon: "🔥", name: "نصف الطريق", desc: "أكمل المستوى B2", check: (s) => s.examsPassed >= 4 },
  { id: "master", icon: "👑", name: "سيد اللغة", desc: "أكمل جميع المستويات الستة", check: (s) => s.examsPassed >= 6 }
];

export const GAME_DEFS = [
  { id: "match", icon: "🎯", name: "اختبر نفسك", desc: "طابق الكلمة الألمانية مع معناها العربي الصحيح" },
  { id: "memory", icon: "🧠", name: "لعبة الذاكرة", desc: "اقلب البطاقات واعثر على الأزواج المتطابقة" },
  { id: "builder", icon: "🧩", name: "ابنِ الكلمة", desc: "رتّب الحروف لتكوين الكلمة الألمانية الصحيحة" },
  { id: "listening", icon: "🎧", name: "استمع واختر", desc: "استمع إلى النطق الألماني واختر المعنى الصحيح" },
  { id: "truefalse", icon: "⚡", name: "صح أم خطأ", desc: "احكم على أزواج الكلمات بسرعة — هل هي صحيحة؟" },
  { id: "sentence", icon: "🧱", name: "رتب الجملة", desc: "رتّب الكلمات لتكوين جملة ألمانية صحيحة" },
  { id: "dialogue", icon: "💬", name: "حوار تفاعلي", desc: "عِش موقفاً حقيقياً واختر الرد الصحيح بالحوار" },
  { id: "pronounce", icon: "🎤", name: "قلها صح", desc: "انطق الكلمة الألمانية واحصل على تقييم نطقك" },
  { id: "conjugation", icon: "🔄", name: "تصريف الأفعال", desc: "صِف الأفعال الألمانية للمضارع حسب الضمائر" },
  { id: "casechallenge", icon: "📛", name: "تحدي الحالات", desc: "اختر أداة التعريف الصحيحة (der/die/das/den/dem)" },
  { id: "wordorder", icon: "🧱", name: "رتب الجمل", desc: "رتّب الكلمات المبعثرة لتكوين جملة صحيحة" },
  { id: "opposites", icon: "↔️", name: "الأضداد", desc: "اعثر على الكلمة المقابلة لكل كلمة ألمانية" },
  { id: "plurals", icon: "📦", name: "صيغ الجمع", desc: "اختر الشكل الصحيح لجمع الأسماء الألمانية" }
];

/* ---------------- Ranks & XP ---------------- */

export const RANKS = [
  { min: 0, title: "مبتدئ", de: "Anfänger", icon: "🌱" },
  { min: 150, title: "ناشئ", de: "Lernender", icon: "🌿" },
  { min: 400, title: "متعلم", de: "Lerner", icon: "📘" },
  { min: 800, title: "محترف", de: "Fortgeschritten", icon: "🔥" },
  { min: 1400, title: "خبير", de: "Experte", icon: "💎" },
  { min: 2200, title: "سيد اللغة", de: "Meister", icon: "👑" }
];

export function rankForXp(xp) {
  let rank = RANKS[0];
  for (const r of RANKS) if (xp >= r.min) rank = r;
  return rank;
}

/* ---------------- Spaced repetition ---------------- */

export const REVIEW_INTERVALS = [0, 1, 3, 7, 14, 30];

export function nextReviewInterval(stage) {
  return REVIEW_INTERVALS[Math.min(stage, REVIEW_INTERVALS.length - 1)];
}

/* ---------------- Word of the day ---------------- */

export function wordOfTheDay() {
  const all = LEVELS.flatMap(l => l.lessons.flatMap(ls => ls.words));
  const day = Math.floor(Date.now() / 86400000);
  return all[day % all.length];
}

/* ---------------- Interactive dialogues (one per level) ---------------- */

export const DIALOGUES = {
  A1: {
    title: "في المقهى",
    icon: "☕",
    scene: "أنت في مقهى ببرلين وتريد أن تطلب قهوة.",
    exchanges: [
      {
        speaker: "النادل",
        de: "Guten Tag! Was möchten Sie?",
        ar: "مرحباً! ماذا تريد أن تطلب؟",
        options: [
          { de: "Einen Kaffee, bitte.", ar: "قهوة، من فضلك", correct: true },
          { de: "Ich heiße Anna.", ar: "اسمي آنا", correct: false },
          { de: "Das Wetter ist schön.", ar: "الطقس جميل", correct: false }
        ],
        reply: "Sehr gut! Hier ist Ihr Kaffee. (ممتاز! هذه قهوتك)"
      },
      {
        speaker: "النادل",
        de: "Möchten Sie Zucker?",
        ar: "هل تريد سكراً؟",
        options: [
          { de: "Ja, bitte. Danke!", ar: "نعم من فضلك، شكراً!", correct: true },
          { de: "Auf Wiedersehen!", ar: "إلى اللقاء!", correct: false },
          { de: "Ich bin krank.", ar: "أنا مريض", correct: false }
        ],
        reply: "Bitte schön! Guten Appetit. (عفواً! بالهناء والشفاء)"
      },
      {
        speaker: "أنت",
        de: "Wie viel kostet der Kaffee?",
        ar: "كم سعر القهوة؟",
        options: [
          { de: "Er kostet drei Euro.", ar: "ثمنها ثلاثة يورو", correct: true },
          { de: "Er ist mein Bruder.", ar: "هو أخي", correct: false },
          { de: "Sie ist Lehrerin.", ar: "هي معلمة", correct: false }
        ],
        reply: "Drei Euro, bitte. Vielen Dank! (ثلاثة يورو، شكراً جزيلاً)"
      }
    ]
  },
  A2: {
    title: "في السوق",
    icon: "🧺",
    scene: "أنت في سوق أسبوعي وتريد شراء فواكه.",
    exchanges: [
      {
        speaker: "البائع",
        de: "Hallo! Kann ich Ihnen helfen?",
        ar: "مرحباً! هل يمكنني مساعدتك؟",
        options: [
          { de: "Ja, ich möchte Äpfel und Bananen.", ar: "نعم، أريد تفاحاً وموزاً", correct: true },
          { de: "Ich wohne in Berlin.", ar: "أسكن في برلين", correct: false },
          { de: "Es regnet heute.", ar: "تمطر اليوم", correct: false }
        ],
        reply: "Alles klar, sehr gerne. (حسناً، بكل سرور)"
      },
      {
        speaker: "البائع",
        de: "Sonst noch etwas?",
        ar: "هل تريد شيئاً آخر؟",
        options: [
          { de: "Ja, ein Kilo Tomaten, bitte.", ar: "نعم، كيلو طماطم من فضلك", correct: true },
          { de: "Nein, ich bin müde.", ar: "لا، أنا متعب", correct: false },
          { de: "Das ist mein Auto.", ar: "هذه سيارتي", correct: false }
        ],
        reply: "Hier bitte, ein Kilo Tomaten. (تفضل، كيلو طماطم)"
      },
      {
        speaker: "أنت",
        de: "Was kostet das zusammen?",
        ar: "كم الثمن الإجمالي؟",
        options: [
          { de: "Das macht fünf Euro.", ar: "المجموع خمسة يورو", correct: true },
          { de: "Das ist sehr billig.", ar: "هذا رخيص جداً", correct: false },
          { de: "Ich habe keine Zeit.", ar: "ليس لدي وقت", correct: false }
        ],
        reply: "Fünf Euro, vielen Dank! (خمسة يورو، شكراً جزيلاً)"
      }
    ]
  },
  B1: {
    title: "حجز فندق",
    icon: "🏨",
    scene: "وصلت إلى فندقك في ميونخ ووقت تسجيل الوصول.",
    exchanges: [
      {
        speaker: "الموظف",
        de: "Guten Abend! Sie haben reserviert?",
        ar: "مساء الخير! هل حجزت؟",
        options: [
          { de: "Ja, mein Name ist Müller.", ar: "نعم، اسمي مولر", correct: true },
          { de: "Ich suche den Bahnhof.", ar: "أبحث عن محطة القطار", correct: false },
          { de: "Es gibt ein Problem.", ar: "هناك مشكلة", correct: false }
        ],
        reply: "Moment, ich suche Ihre Reservierung. (لحظة، أبحث عن حجزك)"
      },
      {
        speaker: "الموظف",
        de: "Hier ist Ihr Schlüssel, Zimmer 12.",
        ar: "هذا مفتاحك، الغرفة 12",
        options: [
          { de: "Danke! Wann ist das Frühstück?", ar: "شكراً! متى موعد الفطور؟", correct: true },
          { de: "Wo ist der Bahnhof?", ar: "أين محطة القطار؟", correct: false },
          { de: "Ich bin nicht bereit.", ar: "أنا غير مستعد", correct: false }
        ],
        reply: "Das Frühstück ist von sieben bis zehn. (الفطور من السابعة حتى العاشرة)"
      },
      {
        speaker: "أنت",
        de: "Gibt es hier kostenloses WLAN?",
        ar: "هل يوجد واي فاي مجاني هنا؟",
        options: [
          { de: "Ja, das WLAN ist kostenlos.", ar: "نعم، الواي فاي مجاني", correct: true },
          { de: "Das Zimmer ist klein.", ar: "الغرفة صغيرة", correct: false },
          { de: "Ich reise morgen ab.", ar: "أسافر غداً", correct: false }
        ],
        reply: "Ja, das Passwort steht an der Rezeption. (نعم، كلمة المرور في الاستقبال)"
      }
    ]
  },
  B2: {
    title: "عند الطبيب",
    icon: "🩺",
    scene: "أنت في عيادة الطبيب وتشرح مشكلتك الصحية.",
    exchanges: [
      {
        speaker: "الطبيب",
        de: "Guten Morgen, was fehlt Ihnen?",
        ar: "صباح الخير، ما الذي يزعجك؟",
        options: [
          { de: "Ich habe starke Kopfschmerzen.", ar: "أعاني من صداع شديد", correct: true },
          { de: "Ich habe viel Geld.", ar: "لدي الكثير من المال", correct: false },
          { de: "Ich komme aus Ägypten.", ar: "أنا من مصر", correct: false }
        ],
        reply: "Verstehe, setzen Sie sich bitte. (فهمت، اجلس من فضلك)"
      },
      {
        speaker: "الطبيب",
        de: "Seit wann haben Sie die Schmerzen?",
        ar: "منذ متى تشعر بالألم؟",
        options: [
          { de: "Seit gestern Abend.", ar: "منذ مساء أمس", correct: true },
          { de: "Ich arbeite im Büro.", ar: "أعمل في المكتب", correct: false },
          { de: "Mein Bruder ist krank.", ar: "أخي مريض", correct: false }
        ],
        reply: "Dann machen wir eine Untersuchung. (إذن سنجري فحصاً)"
      },
      {
        speaker: "الطبيب",
        de: "Ich verschreibe Ihnen Medikamente.",
        ar: "سأصف لك أدوية",
        options: [
          { de: "Vielen Dank, Herr Doktor.", ar: "شكراً جزيلاً أيها الطبيب", correct: true },
          { de: "Das Essen war gut.", ar: "كان الطعام لذيذاً", correct: false },
          { de: "Ich gehe jetzt schlafen.", ar: "أذهب الآن للنوم", correct: false }
        ],
        reply: "Nehmen Sie die Tabletten zweimal täglich. (تناول الأقراص مرتين يومياً)"
      }
    ]
  },
  C1: {
    title: "مقابلة عمل",
    icon: "💼",
    scene: "أنت في مقابلة عمل لشركة عالمية.",
    exchanges: [
      {
        speaker: "المدير",
        de: "Erzählen Sie uns etwas über sich.",
        ar: "حدّثنا عن نفسك",
        options: [
          { de: "Ich habe fünf Jahre Berufserfahrung.", ar: "لدي خمس سنوات من الخبرة المهنية", correct: true },
          { de: "Ich mag das Wetter hier.", ar: "أحب الطقس هنا", correct: false },
          { de: "Mein Auto ist neu.", ar: "سيارتي جديدة", correct: false }
        ],
        reply: "Sehr interessant, bitte weiter. (مثير للاهتمام، تفضل)"
      },
      {
        speaker: "المدير",
        de: "Warum möchten Sie bei uns arbeiten?",
        ar: "لماذا تريد العمل معنا؟",
        options: [
          { de: "Weil Ihre Firma innovativ ist.", ar: "لأن شركتكم مبتكرة", correct: true },
          { de: "Weil ich müde bin.", ar: "لأنني متعب", correct: false },
          { de: "Weil ich früh aufstehe.", ar: "لأنني أستيقظ مبكراً", correct: false }
        ],
        reply: "Das ist ein gutes Argument. (هذه حجة جيدة)"
      },
      {
        speaker: "المدير",
        de: "Wann könnten Sie anfangen?",
        ar: "متى يمكنك البدء؟",
        options: [
          { de: "Ich könnte nächste Woche anfangen.", ar: "يمكنني البدء الأسبوع القادم", correct: true },
          { de: "Ich weiß nicht, wo ich bin.", ar: "لا أعرف أين أنا", correct: false },
          { de: "Ich muss jetzt gehen.", ar: "يجب أن أغادر الآن", correct: false }
        ],
        reply: "Perfekt, wir melden uns bei Ihnen. (ممتاز، سنتواصل معك)"
      }
    ]
  },
  C2: {
    title: "اجتماع أعمال",
    icon: "🏛️",
    scene: "اجتماع استراتيجي حاسم مع فريقك في فرانكفورت.",
    exchanges: [
      {
        speaker: "الزميل",
        de: "Wie bewerten Sie die aktuelle Situation?",
        ar: "كيف تقيّم الوضع الحالي؟",
        options: [
          { de: "Ich halte die Lage für vielschichtig.", ar: "أرى أن الوضع متعدد الأوجه", correct: true },
          { de: "Ich bin jetzt sehr hungrig.", ar: "أنا جائع جداً الآن", correct: false },
          { de: "Das Büro ist sehr hell.", ar: "المكتب مشرق جداً", correct: false }
        ],
        reply: "Interessant, das deckt sich mit meiner Analyse. (مثير، هذا يتطابق مع تحليلي)"
      },
      {
        speaker: "الزميل",
        de: "Sollten wir unseren Plan überdenken?",
        ar: "هل يجب أن نعيد التفكير في خطتنا؟",
        options: [
          { de: "Ja, ich würde einige Aspekte differenziert betrachten.", ar: "نعم، سأفحص بعض الجوانب بدقة", correct: true },
          { de: "Nein, ich trinke lieber Tee.", ar: "لا، أفضل شرب الشاي", correct: false },
          { de: "Vielleicht schneit es morgen.", ar: "ربما تثلج غداً", correct: false }
        ],
        reply: "Einverstanden, wir sollten die Risiken präzise abwägen. (متفق، يجب أن نوازن المخاطر بدقة)"
      },
      {
        speaker: "الزميل",
        de: "Wir brauchen einen Kompromiss.",
        ar: "نحن بحاجة إلى حل وسط",
        options: [
          { de: "Einverstanden, die Schlussfolgerung überzeugt mich.", ar: "موافق، الاستنتاج يقنعني", correct: true },
          { de: "Ich habe mein Handy vergessen.", ar: "نسيت هاتفي", correct: false },
          { de: "Das Fenster ist offen.", ar: "النافذة مفتوحة", correct: false }
        ],
        reply: "Dann sind wir uns einig. (إذن نحن متفقون)"
      }
    ]
  }
};

/* ---------------- Sentence builder (one set per level) ---------------- */

export const SENTENCES = {
  A1: [
    { de: "Ich trinke Kaffee.", ar: "أنا أشرب القهوة" },
    { de: "Das ist mein Buch.", ar: "هذا كتابي" },
    { de: "Wir lernen Deutsch.", ar: "نحن نتعلم الألمانية" },
    { de: "Der Mann ist groß.", ar: "الرجل طويل" },
    { de: "Ich habe einen Hund.", ar: "لدي كلب" }
  ],
  A2: [
    { de: "Ich gehe morgen in die Stadt.", ar: "سأذهب غداً إلى المدينة" },
    { de: "Sie hat gestern einen Film gesehen.", ar: "شاهدت فيلماً بالأمس" },
    { de: "Wir essen oft in diesem Restaurant.", ar: "نأكل كثيراً في هذا المطعم" },
    { de: "Kannst du mir bitte helfen?", ar: "هل يمكنك مساعدتي من فضلك؟" },
    { de: "Ich muss früh aufstehen.", ar: "يجب أن أستيقظ مبكراً" }
  ],
  B1: [
    { de: "Ich wohne seit drei Jahren in Berlin.", ar: "أسكن في برلين منذ ثلاث سنوات" },
    { de: "Er spricht Deutsch, weil er in Deutschland arbeitet.", ar: "يتحدث الألمانية لأنه يعمل في ألمانيا" },
    { de: "Wenn das Wetter gut ist, fahren wir ans Meer.", ar: "إذا كان الطقس جيداً فسنذهب إلى البحر" },
    { de: "Obwohl er müde war, ging er zur Arbeit.", ar: "رغم أنه كان متعباً، ذهب إلى العمل" },
    { de: "Ich habe keine Zeit, um fernzusehen.", ar: "ليس لدي وقت لمشاهدة التلفاز" }
  ],
  B2: [
    { de: "Die Firma sucht eine erfahrene Softwareentwicklerin.", ar: "الشركة تبحث عن مطورة برمجيات ذات خبرة" },
    { de: "Ich habe mich um einen neuen Job beworben.", ar: "تقدمت بطلب للحصول على وظيفة جديدة" },
    { de: "Man sollte regelmäßig Sport treiben, um gesund zu bleiben.", ar: "يجب ممارسة الرياضة بانتظام للبقاء بصحة جيدة" },
    { de: "Trotz des Regens konnten wir die Wanderung machen.", ar: "رغم المطر تمكنا من القيام بالتنزه" },
    { de: "Der Bericht muss bis morgen fertig sein.", ar: "يجب أن يكون التقرير جاهزاً بحلول الغد" }
  ],
  C1: [
    { de: "Die Regierung hat beschlossen, die Steuern zu senken.", ar: "قررت الحكومة خفض الضرائب" },
    { de: "Es ist notwendig, dass wir unsere Strategie überdenken.", ar: "من الضروري أن نعيد التفكير في استراتيجيتنا" },
    { de: "Die Ergebnisse der Studie waren durchaus überraschend.", ar: "كانت نتائج الدراسة مفاجئة تماماً" },
    { de: "Unter diesen Umständen können wir das Projekt nicht fortsetzen.", ar: "في ظل هذه الظروف لا يمكننا مواصلة المشروع" },
    { de: "Er hat die Prüfung bestanden, obwohl er wenig gelernt hatte.", ar: "اجتاز الامتحان رغم أنه لم يدرس كثيراً" }
  ],
  C2: [
    { de: "Angesichts der wirtschaftlichen Lage sind wir zur Vorsicht verpflichtet.", ar: "نظراً للوضع الاقتصادي نحن ملزمون بالحذر" },
    { de: "Die Fülle an Informationen macht eine fundierte Entscheidung schwierig.", ar: "كثرة المعلومات تجعل القرار المدروس صعباً" },
    { de: "Im Nachhinein betrachtet war diese Entscheidung weise.", ar: "بالنظر إلى ما بعد فوات الأوان كان هذا القرار حكيماً" },
    { de: "Es versteht sich von selbst, dass wir alle Beteiligten informieren müssen.", ar: "من البديهي أن علينا إبلاغ جميع الأطراف المعنية" },
    { de: "Die kontinuierliche Weiterbildung ist heutzutage unerlässlich.", ar: "التعليم المستمر أصبح لا غنى عنه في أيامنا هذه" }
  ]
};

export function getLevelSentences(idx) {
  return SENTENCES[LEVELS[idx].code] || SENTENCES.A1;
}

/* ---------------- Helpers ---------------- */

export function getLevelWords(idx) {
  return LEVELS[idx].lessons.flatMap(l => l.words);
}

export function totalLessons() {
  return LEVELS.reduce((s, l) => s + l.lessons.length, 0);
}

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
