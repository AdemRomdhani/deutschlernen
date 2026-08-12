/* ==========================================================================
   DeutschLernen — Extended Game Data (Conjugations, Cases, Idioms, etc.)
   ========================================================================== */

/* ---------------- Verb Conjugations ---------------- */

export const CONJUGATIONS = [
  {
    verb: "sein",
    translations: {
      ich: "bin",
      du: "bist",
      er_sie_es: "ist",
      wir: "sind",
      ihr: "seid",
      sie_Sie: "sind"
    },
    type: "irregular"
  },
  {
    verb: "haben",
    translations: {
      ich: "habe",
      du: "hast",
      er_sie_es: "hat",
      wir: "haben",
      ihr: "habt",
      sie_Sie: "haben"
    },
    type: "irregular"
  },
  {
    verb: "machen",
    translations: {
      ich: "mache",
      du: "machst",
      er_sie_es: "macht",
      wir: "machen",
      ihr: "macht",
      sie_Sie: "machen"
    },
    type: "regular"
  },
  {
    verb: "gehen",
    translations: {
      ich: "gehe",
      du: "gehst",
      er_sie_es: "geht",
      wir: "gehen",
      ihr: "geht",
      sie_Sie: "gehen"
    },
    type: "irregular"
  },
  {
    verb: "kommen",
    translations: {
      ich: "komme",
      du: "kommst",
      er_sie_es: "kommt",
      wir: "kommen",
      ihr: "kommt",
      sie_Sie: "kommen"
    },
    type: "regular"
  },
  {
    verb: "spielen",
    translations: {
      ich: "spiele",
      du: "spielst",
      er_sie_es: "spielt",
      wir: "spielen",
      ihr: "spielt",
      sie_Sie: "spielen"
    },
    type: "regular"
  },
  {
    verb: "lernen",
    translations: {
      ich: "lerne",
      du: "lernst",
      er_sie_es: "lernt",
      wir: "lernen",
      ihr: "lernt",
      sie_Sie: "lernen"
    },
    type: "regular"
  },
  {
    verb: "essen",
    translations: {
      ich: "esse",
      du: "isst",
      er_sie_es: "isst",
      wir: "essen",
      ihr: "esst",
      sie_Sie: "essen"
    },
    type: "irregular"
  },
  {
    verb: "trinken",
    translations: {
      ich: "trinke",
      du: "trinkst",
      er_sie_es: "trinkt",
      wir: "trinken",
      ihr: "trinkt",
      sie_Sie: "trinken"
    },
    type: "regular"
  },
  {
    verb: "lesen",
    translations: {
      ich: "lese",
      du: "liest",
      er_sie_es: "liest",
      wir: "lesen",
      ihr: "lest",
      sie_Sie: "lesen"
    },
    type: "irregular"
  },
  {
    verb: "schreiben",
    translations: {
      ich: "schreibe",
      du: "schreibst",
      er_sie_es: "schreibt",
      wir: "schreiben",
      ihr: "schreibt",
      sie_Sie: "schreiben"
    },
    type: "irregular"
  },
  {
    verb: "fahren",
    translations: {
      ich: "fahre",
      du: "fährst",
      er_sie_es: "fährt",
      wir: "fahren",
      ihr: "fahrt",
      sie_Sie: "fahren"
    },
    type: "irregular"
  },
  {
    verb: "schlafen",
    translations: {
      ich: "schlafe",
      du: "schläfst",
      er_sie_es: "schläft",
      wir: "schlafen",
      ihr: "schlaft",
      sie_Sie: "schlafen"
    },
    type: "irregular"
  },
  {
    verb: "arbeiten",
    translations: {
      ich: "arbeite",
      du: "arbeitest",
      er_sie_es: "arbeitet",
      wir: "arbeiten",
      ihr: "arbeitet",
      sie_Sie: "arbeiten"
    },
    type: "regular"
  },
  {
    verb: "kaufen",
    translations: {
      ich: "kaufe",
      du: "kaufst",
      er_sie_es: "kauft",
      wir: "kaufen",
      ihr: "kauft",
      sie_Sie: "kaufen"
    },
    type: "regular"
  }
];

/* ---------------- Cases Data (Nominativ, Akkusativ, Dativ) ---------------- */

export const CASES_DATA = [
  {
    noun: "der Mann",
    article: "der",
    gender: "m",
    nominativ: "der Mann",
    akkusativ: "den Mann",
    dativ: "dem Mann",
    meaning: "الرجل"
  },
  {
    noun: "die Frau",
    article: "die",
    gender: "f",
    nominativ: "die Frau",
    akkusativ: "die Frau",
    dativ: "der Frau",
    meaning: "المرأة"
  },
  {
    noun: "das Kind",
    article: "das",
    gender: "n",
    nominativ: "das Kind",
    akkusativ: "das Kind",
    dativ: "dem Kind",
    meaning: "الطفل"
  },
  {
    noun: "die Kinder",
    article: "die",
    gender: "pl",
    nominativ: "die Kinder",
    akkusativ: "die Kinder",
    dativ: "den Kindern",
    meaning: "الأطفال"
  },
  {
    noun: "der Hund",
    article: "der",
    gender: "m",
    nominativ: "der Hund",
    akkusativ: "den Hund",
    dativ: "dem Hund",
    meaning: "الكلب"
  },
  {
    noun: "die Katze",
    article: "die",
    gender: "f",
    nominativ: "die Katze",
    akkusativ: "die Katze",
    dativ: "der Katze",
    meaning: "القطة"
  },
  {
    noun: "das Buch",
    article: "das",
    gender: "n",
    nominativ: "das Buch",
    akkusativ: "das Buch",
    dativ: "dem Buch",
    meaning: "الكتاب"
  },
  {
    noun: "der Tisch",
    article: "der",
    gender: "m",
    nominativ: "der Tisch",
    akkusativ: "den Tisch",
    dativ: "dem Tisch",
    meaning: "الطاولة"
  },
  {
    noun: "die Lampe",
    article: "die",
    gender: "f",
    nominativ: "die Lampe",
    akkusativ: "die Lampe",
    dativ: "der Lampe",
    meaning: "المصباح"
  },
  {
    noun: "das Fenster",
    article: "das",
    gender: "n",
    nominativ: "das Fenster",
    akkusativ: "das Fenster",
    dativ: "dem Fenster",
    meaning: "النافذة"
  },
  {
    noun: "der Apfel",
    article: "der",
    gender: "m",
    nominativ: "der Apfel",
    akkusativ: "den Apfel",
    dativ: "dem Apfel",
    meaning: "التفاح"
  },
  {
    noun: "die Blume",
    article: "die",
    gender: "f",
    nominativ: "die Blume",
    akkusativ: "die Blume",
    dativ: "der Blume",
    meaning: "الزهرة"
  },
  {
    noun: "das Auto",
    article: "das",
    gender: "n",
    nominativ: "das Auto",
    akkusativ: "das Auto",
    dativ: "dem Auto",
    meaning: "السيارة"
  },
  {
    noun: "der Bruder",
    article: "der",
    gender: "m",
    nominativ: "der Bruder",
    akkusativ: "den Bruder",
    dativ: "dem Bruder",
    meaning: "الأخ"
  },
  {
    noun: "die Schwester",
    article: "die",
    gender: "f",
    nominativ: "die Schwester",
    akkusativ: "die Schwester",
    dativ: "der Schwester",
    meaning: "الأخت"
  },
  {
    noun: "das Wasser",
    article: "das",
    gender: "n",
    nominativ: "das Wasser",
    akkusativ: "das Wasser",
    dativ: "dem Wasser",
    meaning: "الماء"
  },
  {
    noun: "der Kaffee",
    article: "der",
    gender: "m",
    nominativ: "der Kaffee",
    akkusativ: "den Kaffee",
    dativ: "dem Kaffee",
    meaning: "القهوة"
  },
  {
    noun: "die Milch",
    article: "die",
    gender: "f",
    nominativ: "die Milch",
    akkusativ: "die Milch",
    dativ: "der Milch",
    meaning: "الحليب"
  },
  {
    noun: "das Brot",
    article: "das",
    gender: "n",
    nominativ: "das Brot",
    akkusativ: "das Brot",
    dativ: "dem Brot",
    meaning: "الخبز"
  },
  {
    noun: "der Lehrer",
    article: "der",
    gender: "m",
    nominativ: "der Lehrer",
    akkusativ: "den Lehrer",
    dativ: "dem Lehrer",
    meaning: "المعلم"
  },
  {
    noun: "die Schule",
    article: "die",
    gender: "f",
    nominativ: "die Schule",
    akkusativ: "die Schule",
    dativ: "der Schule",
    meaning: "المدرسة"
  },
  {
    noun: "das Haus",
    article: "das",
    gender: "n",
    nominativ: "das Haus",
    akkusativ: "das Haus",
    dativ: "dem Haus",
    meaning: "البيت"
  },
  {
    noun: "der Arzt",
    article: "der",
    gender: "m",
    nominativ: "der Arzt",
    akkusativ: "den Arzt",
    dativ: "dem Arzt",
    meaning: "الطبيب"
  },
  {
    noun: "die Zeitung",
    article: "die",
    gender: "f",
    nominativ: "die Zeitung",
    akkusativ: "die Zeitung",
    dativ: "der Zeitung",
    meaning: "الجريدة"
  }
];

/* ---------------- Opposites ---------------- */

export const OPPOSITES = [
  { word: "groß", opposite: "klein", meaning: "كبير / صغير" },
  { word: "alt", opposite: "jung", meaning: "قديم / شاب" },
  { word: "gut", opposite: "schlecht", meaning: "جيد / سيء" },
  { word: "heiß", opposite: "kalt", meaning: "ساخن / بارد" },
  { word: "schnell", opposite: "langsam", meaning: "سريع / بطيء" },
  { word: "hell", opposite: "dunkel", meaning: "مضيء / مظلم" },
  { word: "laut", opposite: "leise", meaning: "عالي / هادئ" },
  { word: "nah", opposite: "weit", meaning: "قريب / بعيد" },
  { word: "richtig", opposite: "falsch", meaning: "صحيح / خطأ" },
  { word: "offen", opposite: "geschlossen", meaning: "مفتوح / مغلق" },
  { word: "reich", opposite: "arm", meaning: "غني / فقير" },
  { word: "hoch", opposite: "niedrig", meaning: "مرتفع / منخفض" },
  { word: "breit", opposite: "schmal", meaning: "عريض / ضيق" },
  { word: "früh", opposite: "spät", meaning: "مبكر / متأخر" },
  { word: "schön", opposite: "hässlich", meaning: "جميل / قبيح" },
  { word: "leicht", opposite: "schwer", meaning: "سهل / صعب" },
  { word: "warm", opposite: "kühl", meaning: "دافئ / بارد قليلاً" },
  { word: "dick", opposite: "dünn", meaning: "سميك / رقيق" },
  { word: "voll", opposite: "leer", meaning: "ممتلئ / فارغ" },
  { word: "starten", opposite: "stoppen", meaning: "يبدأ / يتوقف" },
  { word: "lieben", opposite: "hassen", meaning: "يحب / يكره" },
  { word: "gewinnen", opposite: "verlieren", meaning: "يفوز / يخسر" }
];

/* ---------------- Plurals ---------------- */

export const PLURALS = [
  { singular: "der Apfel", plural: "die Äpfel", article: "der", meaning: "التفاح", pattern: "umlaut+e" },
  { singular: "der Stuhl", plural: "die Stühle", article: "der", meaning: "الكرسي", pattern: "umlaut+e" },
  { singular: "das Buch", plural: "die Bücher", article: "das", meaning: "الكتاب", pattern: "er" },
  { singular: "das Haus", plural: "die Häuser", article: "das", meaning: "البيت", pattern: "er" },
  { singular: "das Kind", plural: "die Kinder", article: "das", meaning: "الطفل", pattern: "er" },
  { singular: "die Blume", plural: "die Blumen", article: "die", meaning: "الزهرة", pattern: "en" },
  { singular: "die Zeitung", plural: "die Zeitungen", article: "die", meaning: "الجريدة", pattern: "en" },
  { singular: "die Frau", plural: "die Frauen", article: "die", meaning: "المرأة", pattern: "en" },
  { singular: "der Mann", plural: "die Männer", article: "der", meaning: "الرجل", pattern: "umlaut+er" },
  { singular: "das Bild", plural: "die Bilder", article: "das", meaning: "الصورة", pattern: "er" },
  { singular: "der Hund", plural: "die Hunde", article: "der", meaning: "الكلب", pattern: "e" },
  { singular: "die Katze", plural: "die Katzen", article: "die", meaning: "القطة", pattern: "n" },
  { singular: "das Auto", plural: "die Autos", article: "das", meaning: "السيارة", pattern: "s" },
  { singular: "das Telefon", plural: "die Telefone", article: "das", meaning: "الهاتف", pattern: "e" },
  { singular: "der Tisch", plural: "die Tische", article: "der", meaning: "الطاولة", pattern: "e" },
  { singular: "die Lampe", plural: "die Lampen", article: "die", meaning: "المصباح", pattern: "en" },
  { singular: "der Lehrer", plural: "die Lehrer", article: "der", meaning: "المعلم", pattern: "er" },
  { singular: "die Schule", plural: "die Schulen", article: "die", meaning: "المدرسة", pattern: "n" },
  { singular: "das Wasser", plural: "die Wasser", article: "das", meaning: "الماء", pattern: "null" },
  { singular: "der Kaffee", plural: "die Kaffees", article: "der", meaning: "القهوة", pattern: "s" },
  { singular: "das Zimmer", plural: "die Zimmer", article: "das", meaning: "الغرفة", pattern: "null" },
  { singular: "die Hand", plural: "die Hände", article: "die", meaning: "اليد", pattern: "umlaut+e" },
  { singular: "der Fuß", plural: "die Füße", article: "der", meaning: "القدم", pattern: "umlaut+e" },
  { singular: "das Jahr", plural: "die Jahre", article: "das", meaning: "السنة", pattern: "e" },
  { singular: "die Stadt", plural: "die Städte", article: "die", meaning: "المدينة", pattern: "umlaut+e" }
];

/* ---------------- Minimal Pairs ---------------- */

export const MINIMAL_PAIRS = [
  { word1: "Küche", word2: "Kirche", meaning1: "المطبخ", meaning2: "الكنيسة", sound: "ü/i" },
  { word1: "Biene", word2: "Bohne", meaning1: "النحلة", meaning2: "الفول", sound: "ie/o" },
  { word1: "Miete", word2: "Müde", meaning1: "الإيجار", meaning2: "المتعب", sound: "ie/ü" },
  { word1: "Bett", word2: "Bott", meaning1: "السرير", meaning2: "البرميل", sound: "e/o" },
  { word1: "Haus", word2: "Maus", meaning1: "البيت", meaning2: "الفأرة", sound: "h/m" },
  { word1: "Topf", word2: "Tropf", meaning1: "القِدر", meaning2: "التسريب", sound: "o/ro" },
  { word1: "schleichen", word2: "streichen", meaning1: "يزحف", meaning2: "يرسم/يمسح", sound: "ch/str" },
  { word1: "Tier", word2: "Tür", meaning1: "الحيوان", meaning2: "الباب", sound: "ie/ü" },
  { word1: "Reis", word2: "Reiß", meaning1: "الأرز", meaning2: "ال叩/الصوت", sound: "s/ß" },
  { word1: "gut", word2: "gütig", meaning1: "جيد", meaning2: "لطيف", sound: "u/ü" },
  { word1: "Blüte", word2: "Blute", meaning1: "الزهرة", meaning2: "الدم", sound: "ü/u" },
  { word1: "Schaf", word2: "Schiff", meaning1: "الخروف", meaning2: "السفينة", sound: "a/i" },
  { word1: "Stuhl", word2: "Schule", meaning1: "الكرسي", meaning2: "المدرسة", sound: "st/sch" },
  { word1: "Hand", word2: "Hund", meaning1: "اليد", meaning2: "الكلب", sound: "a/u" },
  { word1: "rot", word2: "Rut", meaning1: "أحمر", meaning2: "عصا", sound: "o/u" },
  { word1: "Buch", word2: "Boje", meaning1: "الكتاب", meaning2: "العوامة", sound: "u/o" },
  { word1: "Lied", word2: "Lüt", meaning1: "الأغنية", meaning2: "القليل", sound: "ie/ü" }
];

/* ---------------- Idioms ---------------- */

export const IDIOMS = [
  {
    de: "Da steppt der Bär",
    meaning_en: "The place will be jumping / it will be a great party",
    meaning_ar: "سيكون حفل رائع",
    example: "Heute Abend wird da steppt der Bär!",
    exampleTranslation: "الليلة سيكون حفل رائع!"
  },
  {
    de: "Ich verstehe nur Bahnhof",
    meaning_en: "I don't understand anything",
    meaning_ar: "لا أفهم شيئاً",
    example: "Bei der Mathevorlesung verstehe ich nur Bahnhof.",
    exampleTranslation: "في محاضرة الرياضيات لا أفهم شيئاً"
  },
  {
    de: "Alles hat ein Ende, nur die Wurst hat zwei",
    meaning_en: "Everything comes to an end",
    meaning_ar: "كل شيء ينتهي",
    example: "Aber irgendwann ist auch mal Schluss – alles hat ein Ende, nur die Wurst hat zwei.",
    exampleTranslation: "لكن في النهاية كل شيء ينتهي"
  },
  {
    de: "Da liegt der Hund begraben",
    meaning_en: "That's the crux of the matter",
    meaning_ar: "هناك تكمن المشكلة",
    example: "Das ist der Punkt, wo der Hund begraben liegt.",
    exampleTranslation: "هذا هو الموضع الذي تكمن فيه المشكلة"
  },
  {
    de: "Ich drücke dir die Daumen",
    meaning_en: "I keep my fingers crossed for you",
    meaning_ar: "أتمنى لك التوفيق",
    example: "Viel Erfolg bei der Prüfung! Ich drücke dir die Daumen!",
    exampleTranslation: "حظاً موفقاً في الامتحان! أتمنى لك التوفيق!"
  },
  {
    de: "Tomaten auf den Augen haben",
    meaning_en: "To be oblivious to something obvious",
    meaning_ar: "يتجاهل شيئاً واضحاً",
    example: "Hast du Tomaten auf den Augen? Das Schild ist doch direkt vor dir!",
    exampleTranslation: "هل تتجاهل شيئاً واضحاً؟ اللافتة أمامك مباشرة!"
  },
  {
    de: "Die Daumen drücken",
    meaning_en: "To wish someone good luck",
    meaning_ar: "يتمنى لشخص حظاً سعيداً",
    example: "Ich drücke dir die Daumen für dein Vorstellungsgespräch.",
    exampleTranslation: "أتمنى لك حظاً سعيداً في مقابلة العمل"
  },
  {
    de: "Schwein haben",
    meaning_en: "To be lucky",
    meaning_ar: "يكون محظوظاً",
    example: "Er hatte Schwein und hat die erste Klasse bekommen!",
    exampleTranslation: "كان محظوظاً وحصل على الفصل الأول!"
  },
  {
    de: "Den inneren Schweinehund überwinden",
    meaning_en: "To overcome one's weaker self",
    meaning_ar: "يتجاوز ضعفه",
    example: "Ich muss meinen inneren Schweinehund überwinden und Sport treiben.",
    exampleTranslation: "يجب أن أتجاوز ضعفي وأمارس الرياضة"
  },
  {
    de: "Alles in Butter sein",
    meaning_en: "Everything is fine",
    meaning_ar: "كل شيء على ما يرام",
    example: "Keine Sorge, bei uns ist alles in Butter.",
    exampleTranslation: "لا تقلق، كل شيء على ما يرام عندنا"
  },
  {
    de: "Die Katze aus dem Sack lassen",
    meaning_en: "To spill the beans / let the cat out of the bag",
    meaning_ar: "يكشف السر",
    example: "Ich kann dir mein Geheimnis nicht verraten, sonst lasse ich die Katze aus dem Sack.",
    exampleTranslation: "لا أستطيع إخبارك بسري، وإلا سأكشف السر"
  },
  {
    de: "Auf dem Holzweg sein",
    meaning_en: "To be on the wrong track",
    meaning_ar: "يكون على خطأ",
    example: "Du bist auf dem Holzweg, wenn du glaubst, das sei einfach.",
    exampleTranslation: "أنت على خطأ إذا كنت تعتقد أن هذا سهل"
  },
  {
    de: "Wo die Würste wachsen",
    meaning_en: "Middle of nowhere",
    meaning_ar: "في مكان نائي",
    example: "Er wohnt da, wo die Würste wachsen.",
    exampleTranslation: "يسكن في مكان نائي"
  },
  {
    de: "Butter bei die Fische",
    meaning_en: "Get to the point",
    meaning_ar: "تعال إلى الموضوع مباشرة",
    example: "Komm, Butter bei die Fische – was willst du wirklich?",
    exampleTranslation: "هيا، تعال إلى الموضوع – ماذا تريد حقاً؟"
  },
  {
    de: "Um den heißen Brei herumreden",
    meaning_en: "To beat around the bush",
    meaning_ar: "يدور حول الموضوع",
    example: "Hör auf, um den heißen Brei herumzureden und sag es direkt!",
    exampleTranslation: "كف عن الدوران حول الموضوع وقله مباشرة!"
  }
];

/* ---------------- Newspaper Articles ---------------- */

export const NEWSPAPER_ARTICLES = [
  {
    level: "A1",
    title: "Das Wetter in Berlin",
    text: "Heute ist es in Berlin sonnig. Die Temperatur ist 22 Grad. Viele Menschen gehen in den Park. Die Kinder spielen im Garten. Das Wetter ist sehr schön.",
    vocabulary: [
      { de: "sonnig", ar: "مشمس" },
      { de: "Temperatur", ar: "درجة الحرارة" },
      { de: "Grad", ar: "درجة" },
      { de: "Menschen", ar: "ناس" },
      { de: "Park", ar: "حديقة" },
      { de: "Garten", ar: "حديقة" }
    ],
    questions: [
      {
        question: "Wie ist das Wetter in Berlin?",
        options: ["Es ist regnerisch", "Es ist sonnig", "Es ist bewölkt", "Es schneit"],
        correct: "Es ist sonnig"
      },
      {
        question: "Was machen die Kinder?",
        options: ["Sie lernen", "Sie spielen im Garten", "Sie essen", "Sie schlafen"],
        correct: "Sie spielen im Garten"
      }
    ]
  },
  {
    level: "A2",
    title: "Neues Café eröffnet in München",
    text: "Ein neues Café hat letzte Woche in München eröffnet. Das Café heißt 'Zum Gemütlichen Eck'. Es gibt Kaffee, Kuchen und Sandwiches. Der Besitzer sagt, das Café ist sehr gemütlich. Der Einstiegspreis für einen Kaffee beträgt 2,50 Euro.",
    vocabulary: [
      { de: "eröffnet", ar: "افتُتح" },
      { de: "letzte Woche", ar: "الأسبوع الماضي" },
      { de: "Kuchen", ar: "كعكة" },
      { de: "Besitzer", ar: "المالك" },
      { de: "gemütlich", ar: "ودود ومريح" },
      { de: "Einstiegspreis", ar: "سعر البداية" }
    ],
    questions: [
      {
        question: "Wie heißt das neue Café?",
        options: ["Zum Süßen Eck", "Zum Gemütlichen Eck", "Café Berlin", "Zum Kaffeehaus"],
        correct: "Zum Gemütlichen Eck"
      },
      {
        question: "Was gibt es im Café?",
        options: ["Nur Kaffee", "Kaffee, Kuchen und Sandwiches", "Nur Kuchen", "Pizza und Pasta"],
        correct: "Kaffee, Kuchen und Sandwiches"
      }
    ]
  },
  {
    level: "B1",
    title: "Deutsche Unternehmen investieren in erneuerbare Energien",
    text: "Immer mehr deutsche Unternehmen investieren in erneuerbare Energien. Laut einer neuen Studie haben 60 Prozent der Unternehmen ihre Investitionen in Solarenergie verdoppelt. Experten sagen, dass die Nachfrage nach grünem Strom bis 2030 um 40 Prozent steigen wird. Die Bundesregierung unterstützt diese Entwicklung mit neuen Gesetzen.",
    vocabulary: [
      { de: "erneuerbare Energien", ar: "الطاقات المتجددة" },
      { de: "Unternehmen", ar: "شركات" },
      { de: "investieren", ar: "تستثمر" },
      { de: "Studie", ar: "دراسة" },
      { de: "Nachfrage", ar: "الطلب" },
      { de: "Bundesregierung", ar: "الحكومة الفيدرالية" }
    ],
    questions: [
      {
        question: "Was machen immer mehr deutsche Unternehmen?",
        options: ["Sie schließen ihre Türen", "Sie investieren in erneuerbare Energien", "Sie entlassen Mitarbeiter", "Sie verkaufen ihre Aktien"],
        correct: "Sie investieren in erneuerbare Energien"
      },
      {
        question: "Was sagt die Studie über die Nachfrage nach grünem Strom?",
        options: ["Sie wird fallen", "Sie wird unverändert bleiben", "Sie wird um 40 Prozent steigen", "Sie wird um 50 Prozent steigen"],
        correct: "Sie wird um 40 Prozent steigen"
      }
    ]
  },
  {
    level: "B2",
    title: "Digitalisierung im Bildungswesen: Chancen und Herausforderungen",
    text: "Die Digitalisierung revolutioniert das deutsche Bildungswesen. Schulen und Universitäten setzen zunehmend auf digitale Lernmethoden und Online-Kurse. Eine aktuelle Umfrage zeigt, dass 78 Prozent der Lehrer die Vorteile der Digitalisierung erkennen. Dennoch gibt es Kritiker, die auf die digitale Kluft zwischen verschiedenen sozioökonomischen Gruppen hinweisen. Bildungsexperten fordern eine gerechte Verteilung digitaler Ressourcen.",
    vocabulary: [
      { de: "Digitalisierung", ar: "التحول الرقمي" },
      { de: "revolutioniert", ar: "يثور على" },
      { de: "Bildungswesen", ar: "نظام التعليم" },
      { de: "digitale Kluft", ar: "الفرقة الرقمية" },
      { de: "sozioökonomisch", ar: "الاجتماعي-الاقتصادي" },
      { de: "gerecht", ar: "عادل" }
    ],
    questions: [
      {
        question: "Was sagen die meisten Lehrer über die Digitalisierung?",
        options: ["Sie lehnen sie ab", "Sie sehen die Vorteile", "Sie ignorieren sie", "Sie haben Angst davor"],
        correct: "Sie sehen die Vorteile"
      },
      {
        question: "Was ist eine Hauptkritik an der Digitalisierung?",
        options: ["Die Kosten sind zu hoch", "Die digitale Kluft", "Die Technik ist zu kompliziert", "Die Internetverbindung ist zu langsam"],
        correct: "Die digitale Kluft"
      }
    ]
  },
  {
    level: "C1",
    title: "Nachhaltige Stadtentwicklung: Wie die Metropolen der Zukunft aussehen könnten",
    text: "Die Frage der nachhaltigen Stadtentwicklung gewinnt angesichts des Klimawandels zunehmend an Bedeutung. Metropolen weltweit experimentieren mit innovativen Konzepten wie autonomen Verkehrssystemen, vertikalen Farmen und energieeffizienten Gebäuden. Forscher der TU Berlin haben eine Studie veröffentlicht, die zeigt, dass durch intelligente Stadtplanung bis 2050 bis zu 60 Prozent der CO₂-Emissionen eingespart werden könnten. Kritiker bemängeln jedoch, dass der Übergang soziale Ungleichheiten verschärfen könnte.",
    vocabulary: [
      { de: "nachhaltig", ar: "مستدام" },
      { de: "Stadtentwicklung", ar: "تنمية المدينة" },
      { de: "Klimawandel", ar: "التغير المناخي" },
      { de: "autonom", ar: "ذاتي / مستقل" },
      { de: "energieeffizient", ar: "فعال في الطاقة" },
      { de: "verschärfen", ar: "يشدد / يفاقم" }
    ],
    questions: [
      {
        question: "Was zeigt die Studie der TU Berlin?",
        options: ["Die Städte werden kleiner", "Bis zu 60 Prozent CO₂-Einsparung ist möglich", "Die Klimakrise wird sich verschlechtern", "Städte werden nicht überleben"],
        correct: "Bis zu 60 Prozent CO₂-Einsparung ist möglich"
      },
      {
        question: "Welche Bedenken haben Kritiker?",
        options: ["Die Kosten sind zu niedrig", "Soziale Ungleichheiten könnten sich verschärfen", "Die Technologie funktioniert nicht", "Die Bürger sind nicht interessiert"],
        correct: "Soziale Ungleichheiten könnten sich verschärfen"
      }
    ]
  },
  {
    level: "C2",
    title: "Die Philosophie der deutschen Romantik und ihr Einfluss auf die moderne Ästhetik",
    text: "Die deutsche Romantik des 18. und 19. Jahrhunderts hat die westliche Ästhetik nachhaltig geprägt. Denker wie Friedrich Schlegel, Novalis und Johann Gottfried Herder entwickelten ein Gedankengut, das die Grenzen zwischen Rationalität und Emotionalität bewusst verschwimmen ließ. Ihr Konzept des 'Unendlichen' – die Vorstellung, dass Kunst über die materielle Realität hinaus auf ein Transzendentes verweist – wirkt bis in die Gegenwart. Zeitgenössische Künstler und Architekten greifen immer wieder auf romantische Motive zurück, um in einer zunehmend technokratischen Welt ein Gegenempfinden zu schaffen.",
    vocabulary: [
      { de: "ästhetisch", ar: "جمالي" },
      { de: "Gedankengut", ar: "الأفكار / الفكر" },
      { de: "verschwimmen", ar: "يتلاشى / يمتزج" },
      { de: "transzendent", ar: "متعالي" },
      { de: "Gegenwart", ar: "الحاضر" },
      { de: "technokratisch", ar: "تقني / إداري" }
    ],
    questions: [
      {
        question: "Was war das Hauptmerkmal der Philosophie der deutschen Romantik?",
        options: ["Vollständige Rationalität", "Verschwimmen von Rationalität und Emotionalität", "Ablehnung aller Emotionen", "Fokus auf materielle Dinge"],
        correct: "Verschwimmen von Rationalität und Emotionalität"
      },
      {
        question: "Wie wirkt die Romantik bis heute?",
        options: ["Sie hat keinen Einfluss mehr", "Künstler und Architekten greifen auf ihre Motive zurück", "Nur Historiker studieren sie", "Sie ist komplett vergessen"],
        correct: "Künstler und Architekten greifen auf ihre Motive zurück"
      }
    ]
  }
];

/* ---------------- Movie Clips (Listening Comprehension) ---------------- */

export const MOVIE_CLIPS = [
  {
    level: "A1",
    scene: "Im Kino (في السينما)",
    dialogue: [
      { speaker: "Verkäufer", de: "Guten Tag! Was möchten Sie sehen?", ar: "مرحباً! ماذا تريد أن تشاهد؟" },
      { speaker: "Anna", de: "Ich möchte den Film 'München' sehen.", ar: "أريد أن أشاهد فيلم 'ميونخ'" },
      { speaker: "Verkäufer", de: "Der Film beginnt um 20 Uhr.", ar: "يبدأ الفيلم الساعة الثامنة" },
      { speaker: "Anna", de: "Perfekt! Eine Karte, bitte.", ar: "ممتاز! تذكرة واحدة من فضلك" },
      { speaker: "Verkäufer", de: "Das kostet 12 Euro.", ar: "التذكرة بـ 12 يورو" }
    ],
    questions: [
      {
        question: "Was möchte Anna sehen?",
        options: ["Ein Konzert", "Den Film 'München'", "Eine Ausstellung", "Ein Theaterstück"],
        correct: "Den Film 'München'"
      },
      {
        question: "Was kostet die Karte?",
        options: ["10 Euro", "12 Euro", "15 Euro", "20 Euro"],
        correct: "12 Euro"
      }
    ]
  },
  {
    level: "A2",
    scene: "In der Bäckerei (في المخبزة)",
    dialogue: [
      { speaker: "Bäcker", de: "Guten Morgen! Was darf es sein?", ar: "صباح الخير! ماذا تريد؟" },
      { speaker: "Kunde", de: "Guten Morgen! Ich hätte gern ein Brötchen und ein Croissant.", ar: "صباح الخير! أريد لفافة خبز وكرواسون" },
      { speaker: "Bäcker", de: "Sonst noch etwas?", ar: "شيء آخر؟" },
      { speaker: "Kunde", de: "Ja, bitte noch ein Müsli-Joghurt.", ar: "نعم، يوجورت موسلي أيضاً من فضلك" },
      { speaker: "Bäcker", de: "Das macht zusammen 4,50 Euro.", ar: "المجموع 4.50 يورو" }
    ],
    questions: [
      {
        question: "Was bestellt der Kunde?",
        options: ["Nur Brot", "Brötchen, Croissant und Yoghurt", "Nur Croissant", "Brötchen und Kaffee"],
        correct: "Brötchen, Croissant und Yoghurt"
      },
      {
        question: "Was ist der Gesamtpreis?",
        options: ["3,50 Euro", "4,00 Euro", "4,50 Euro", "5,00 Euro"],
        correct: "4,50 Euro"
      }
    ]
  },
  {
    level: "B1",
    scene: "Im Hotel (في الفندق)",
    dialogue: [
      { speaker: "Rezeptionist", de: "Guten Abend! Sie haben reserviert?", ar: "مساء الخير! هل حجزت؟" },
      { speaker: "Thomas", de: "Ja, unter dem Namen Schmidt.", ar: "نعم، باسم شميت" },
      { speaker: "Rezeptionist", de: "Darf ich Ihren Pass haben?", ar: "هل يمكنني رؤية جواز سفرك؟" },
      { speaker: "Thomas", de: "Ja, bitte sehr.", ar: "نعم، تفضل" },
      { speaker: "Rezeptionist", de: "Hier ist Ihr Schlüssel. Zimmer 305, dritter Stock.", ar: "هذا مفتاحك. الغرفة 305، الطابق الثالث" },
      { speaker: "Thomas", de: "Danke. Wann gibt es Frühstück?", ar: "شكراً. متى موعد الفطور؟" },
      { speaker: "Rezeptionist", de: "Von sieben bis zehn Uhr im ersten Stock.", ar: "من السابعة حتى العاشرة في الطابق الأول" }
    ],
    questions: [
      {
        question: "Wie heißt der Gast?",
        options: ["Müller", "Schmidt", "Weber", "Fischer"],
        correct: "Schmidt"
      },
      {
        question: "In welchem Stock ist das Zimmer?",
        options: ["Erster Stock", "Zweiter Stock", "Dritter Stock", "Vierter Stock"],
        correct: "Dritter Stock"
      }
    ]
  },
  {
    level: "B2",
    scene: "Beim Arzt (عند الطبيب)",
    dialogue: [
      { speaker: "Arzt", de: "Guten Tag, was fehlt Ihnen?", ar: "مرحباً، ما الذي يزعجك؟" },
      { speaker: "Patient", de: "Ich habe seit drei Tagen starke Kopfschmerzen.", ar: "أعاني من صداع شديد منذ ثلاثة أيام" },
      { speaker: "Arzt", de: "Haben Sie auch Fieber?", ar: "هل عندك حمى أيضاً؟" },
      { speaker: "Patient", de: "Ja, manchmal. Und ich fühle mich sehr müde.", ar: "نعم، أحياناً. وأشعر بالتعب الشديد" },
      { speaker: "Arzt", de: "Ich muss Sie untersuchen. Legen Sie sich bitte hin.", ar: "يجب أن أفحصك. استلقِ من فضلك" },
      { speaker: "Arzt", de: "Es ist eine Erkältung. Ich verschreibe Ihnen Medikamente.", ar: "إنها زكام. سأصف لك أدوية" }
    ],
    questions: [
      {
        question: "Seit wann hat der Patient Kopfschmerzen?",
        options: ["Seit einem Tag", "Seit drei Tagen", "Seit einer Woche", "Seit zwei Wochen"],
        correct: "Seit drei Tagen"
      },
      {
        question: "Was verschreibt der Arzt?",
        options: ["Antibiotika", "Vitamine", "Medikamente gegen Erkältung", "Keine Medikamente"],
        correct: "Medikamente gegen Erkältung"
      }
    ]
  },
  {
    level: "C1",
    scene: "In der Universitätsbibliothek (في مكتبة الجامعة)",
    dialogue: [
      { speaker: "Bibliothekar", de: "Guten Tag. Kann ich Ihnen helfen?", ar: "مرحباً. هل يمكنني مساعدتك؟" },
      { speaker: "Studentin", de: "Ja, ich suche ein Buch über die deutsche Romantik.", ar: "نعم، أبحث عن كتاب عن الرومانسية الألمانية" },
      { speaker: "Bibliothekar", de: "Das finden Sie in Abteilung 3B. Soll ich es Ihnen reservieren?", ar: "تجدينه في القسم 3B. هل أحفظه لك؟" },
      { speaker: "Studentin", de: "Das wäre sehr nett. Brauche ich eine Library-Karte?", ar: "هذا سيكون لطيفاً. هل أحتاج بطاقة مكتبة؟" },
      { speaker: "Bibliothekar", de: "Ja, bringen Sie bitte Ihren Studierendenausweis mit.", ar: "نعم، أحضري بطاقة الطالب من فضلك" },
      { speaker: "Studentin", de: "Verstehe. Danke für Ihre Hilfe.", ar: "فهمت. شكراً لمساعدتك" }
    ],
    questions: [
      {
        question: "Was sucht die Studentin?",
        options: ["Ein Buch über Mathematik", "Ein Buch über die deutsche Romantik", "Ein Buch über Physik", "Ein Lexikon"],
        correct: "Ein Buch über die deutsche Romantik"
      },
      {
        question: "Was muss die Studentin mitbringen?",
        options: ["Reisepass", "Studierendenausweis", "Führerschein", "Personalausweis"],
        correct: "Studierendenausweis"
      }
    ]
  },
  {
    level: "C2",
    scene: "Diskussion in einem Wirtschaftsseminar (نقاش في ورشة عمل اقتصادية)",
    dialogue: [
      { speaker: "Professor", de: "Die aktuelle wirtschaftliche Lage erfordert eine differenzierte Betrachtung.", ar: "الوضع الاقتصادي الحالي يتطلب نظرة متعددة الأوجه" },
      { speaker: "Student", de: "Ich bin der Meinung, dass die Digitalisierung der Haupttreiber ist.", ar: "أنا أنّ أن التحول الرقمي هو المحرك الأساسي" },
      { speaker: "Professor", de: "Interessant. Können Sie das differenzieren?", ar: "مثير للاهتمام. هل يمكنك التوضيح؟" },
      { speaker: "Student", de: "Ja, die Automatisierung verändert den Arbeitsmarkt grundlegend.", ar: "نعم، الأتمتة تغير سوق العمل بشكل جذري" },
      { speaker: "Professor", de: "Das ist ein valider Punkt. Aber man darf die sozialen Folgen nicht außer Acht lassen.", ar: "هذه نقطة صحيحة. لكن لا يجب إهمال التأثيرات الاجتماعية" }
    ],
    questions: [
      {
        question: "Was ist der Haupttreiber der Wirtschaft nach dem Studenten?",
        options: ["Die Politik", "Die Digitalisierung", "Die Bildung", "Die Gesundheit"],
        correct: "Die Digitalisierung"
      },
      {
        question: "Was warnt der Professor vor?",
        options: ["Vor der Technik", "Vor sozialen Folgen", "Vor dem Studium", "Vor Politikern"],
        correct: "Vor sozialen Folgen"
      }
    ]
  }
];

/* ---------------- Karaoke Texts ---------------- */

export const KARAOKE_TEXTS = [
  {
    level: "A1",
    title: "Mein Tag",
    words: [
      { de: "Ich", ar: "أنا", duration: 400 },
      { de: "stehe", ar: "أستيقظ", duration: 500 },
      { de: "um", ar: "الساعة", duration: 300 },
      { de: "sieben", ar: "السابعة", duration: 400 },
      { de: "Uhr", ar: "", duration: 400 },
      { de: "auf.", ar: "أستيقظ الساعة السابعة", duration: 500 },
      { de: "Ich", ar: "أنا", duration: 400 },
      { de: "trinke", ar: "أشرب", duration: 500 },
      { de: "Kaffee", ar: "القهوة", duration: 500 },
      { de: "und", ar: "و", duration: 300 },
      { de: "esse", ar: "آكل", duration: 400 },
      { de: "Brot.", ar: "الخبز", duration: 400 },
      { de: "Dann", ar: "ثم", duration: 400 },
      { de: "gehe", ar: "أذهب", duration: 400 },
      { de: "ich", ar: "أنا", duration: 300 },
      { de: "zur", ar: "إلى", duration: 300 },
      { de: "Arbeit.", ar: "العمل", duration: 500 }
    ]
  },
  {
    level: "A2",
    title: "Meine Familie",
    words: [
      { de: "Meine", ar: "عائلتي", duration: 400 },
      { de: "Familie", ar: "العائلة", duration: 600 },
      { de: "ist", ar: "هناك", duration: 300 },
      { de: "nicht", ar: "ليس", duration: 400 },
      { de: "groß.", ar: "كبيرة", duration: 500 },
      { de: "Mein", ar: "أبي", duration: 400 },
      { de: "Vater", ar: "الأب", duration: 500 },
      { de: "heißt", ar: "يسمّى", duration: 500 },
      { de: "Thomas", ar: "توماس", duration: 600 },
      { de: "und", ar: "و", duration: 300 },
      { de: "meine", ar: "أمي", duration: 400 },
      { de: "Mutter", ar: "الأم", duration: 500 },
      { de: "heißt", ar: "تسمّى", duration: 400 },
      { de: "Anna.", ar: "آنا", duration: 500 },
      { de: "Ich", ar: "أنا", duration: 300 },
      { de: "habe", ar: "لدي", duration: 400 },
      { de: "einen", ar: "أخاً", duration: 400 },
      { de: "Bruder.", ar: "الأخ", duration: 500 }
    ]
  },
  {
    level: "B1",
    title: "Urlaub in Bayern",
    words: [
      { de: "Letzten", ar: "الشهر", duration: 500 },
      { de: "Monat", ar: "الماضي", duration: 500 },
      { de: "war", ar: "كنت", duration: 400 },
      { de: "ich", ar: "أنا", duration: 300 },
      { de: "im", ar: "في", duration: 300 },
      { de: "Urlaub", ar: "إجازة", duration: 500 },
      { de: "in", ar: "في", duration: 300 },
      { de: "Bayern.", ar: "بافاريا", duration: 600 },
      { de: "Wir", ar: "نحن", duration: 400 },
      { de: "haben", ar: "لقد", duration: 400 },
      { de: "viele", ar: "الكثير من", duration: 500 },
      { de: "schöne", ar: "الأماكن", duration: 500 },
      { de: "Orte", ar: "الجميلة", duration: 500 },
      { de: "besucht.", ar: "زارنا", duration: 600 },
      { de: "München", ar: "ميونخ", duration: 600 },
      { de: "ist", ar: "كانت", duration: 300 },
      { de: "besonders", ar: "خاصة", duration: 600 },
      { de: "schön.", ar: "جميلة", duration: 500 }
    ]
  },
  {
    level: "B2",
    title: "Deutsche Traditionen",
    words: [
      { de: "Deutschland", ar: "ألمانيا", duration: 600 },
      { de: "hat", ar: "لديها", duration: 400 },
      { de: "viele", ar: "الكثير من", duration: 500 },
      { de: "interessante", ar: "التقاليد", duration: 700 },
      { de: "Traditionen.", ar: "المثيرة للاهتمام", duration: 700 },
      { de: "Das", ar: "يعتبر", duration: 400 },
      { de: "Oktoberfest", ar: "مهرجان أكتوبر", duration: 700 },
      { de: "ist", ar: "من", duration: 300 },
      { de: "eines", ar: "أشهر", duration: 500 },
      { de: "der", ar: "المهرجانات", duration: 400 },
      { de: "berühmtesten", ar: "الأكثر شهرة", duration: 700 },
      { de: "Feste", ar: "العامة", duration: 500 },
      { de: "der", ar: "في", duration: 300 },
      { de: "Welt.", ar: "العالم", duration: 500 }
    ]
  },
  {
    level: "C1",
    title: "Literatur und Sprache",
    words: [
      { de: "Die", ar: "الأدب", duration: 400 },
      { de: "deutsche", ar: "الألماني", duration: 500 },
      { de: "Literatur", ar: "الأدب", duration: 600 },
      { de: "ist", ar: "هو", duration: 300 },
      { de: "reich", ar: "غني", duration: 400 },
      { de: "und", ar: "و", duration: 300 },
      { de: "vielfältig.", ar: "متنوع", duration: 600 },
      { de: "Goethe", ar: "غيته", duration: 500 },
      { de: "und", ar: "و", duration: 300 },
      { de: "Schiller", ar: "شيلر", duration: 500 },
      { de: "gehören", ar: "ينتمون", duration: 500 },
      { de: "zu", ar: "إلى", duration: 300 },
      { de: "den", ar: "أشهر", duration: 400 },
      { de: "bedeutendsten", ar: "الكتّاب", duration: 700 },
      { de: "Autoren.", ar: "الألمان", duration: 600 }
    ]
  },
  {
    level: "C2",
    title: "Philosophie des Alltags",
    words: [
      { de: "Philosophie", ar: "الفلسفة", duration: 700 },
      { de: "ist", ar: "ليست", duration: 300 },
      { de: "nicht", ar: "مجرد", duration: 400 },
      { de: "nur", ar: "مجرد", duration: 400 },
      { de: "ein", ar: "موضوع", duration: 300 },
      { de: "akademisches", ar: "أكاديمي", duration: 700 },
      { de: "Fach.", ar: "مجرد", duration: 400 },
      { de: "Sie", ar: "هي", duration: 300 },
      { de: "findet", ar: "تظهر", duration: 500 },
      { de: "sich", ar: "في", duration: 300 },
      { de: "im", ar: "في", duration: 300 },
      { de: "Alltag", ar: "الحياة", duration: 500 },
      { de: "wieder,", ar: "اليومية", duration: 500 },
      { de: "wenn", ar: "عندما", duration: 400 },
      { de: "wir", ar: "نتساءل", duration: 400 },
      { de: "über", ar: "عن", duration: 400 },
      { de: "Gerechtigkeit", ar: "العدالة", duration: 700 },
      { de: "nachdenken.", ar: "نتفكر", duration: 600 }
    ]
  }
];

/* ---------------- Phrasebook ---------------- */

export const PHRASEBOOK = {
  Airport: [
    { de: "Wo ist der Check-in-Schalter?", ar: "أين كاونتر تسجيل الوصول؟", pronunciation: "فو إست دير تشيك-ين-شالتير", situation: "عند الوصول للمطار" },
    { de: "Ich möchte einen Sitzplatz am Fenster.", ar: "أريد مقعداً بجانب النافذة", pronunciation: "إش موشته آين زيتسبلاتس آم فينستير", situation: "عند حجز التذكرة" },
    { de: "Wo ist mein Gate?", ar: "أين بوابتي؟", pronunciation: "فو إست ماين غيت", situation: "في المطار" },
    { de: "Wann boardet mein Flug?", ar: "متى يبدأ صعود رحلتي؟", pronunciation: "فان بوردت ماين فلوغ", situation: "في المطار" },
    { de: "Mein Koffer ist beschädigt.", ar: "حقيبتي تالفة", pronunciation: "ماين كوفّر إست بيشيتت", situation: "عند استلام الأمتعة" },
    { de: "Ich habe meinen Flug verpasst.", ar: "فاتني الطائرة", pronunciation: "إش هابه ماينن فلوغ فيرباست", situation: "في حال التأخر" },
    { de: "Gibt es eine Verspätung?", ar: "هل يوجد تأخر؟", pronunciation: "غيبتس إينه فيرشبيتونغ", situation: "عند الاستعلام" },
    { de: "Wo kann ich mein Gepäck aufgeben?", ar: "أين أستطيع تسليم أمتعتي؟", pronunciation: "فو كان إش ماين غيبيك آوفغيبن", situation: "عند التسجيل" }
  ],
  Hotel: [
    { de: "Ich habe eine Reservierung.", ar: "لدي حجز", pronunciation: "إش هابه إينه رزيرفيرونغ", situation: "عند تسجيل الوصول" },
    { de: "Kann ich ein Upgrade bekommen?", ar: "هل يمكنني ترقية الغرفة؟", pronunciation: "كان إش آين أبغريد بيكومن", situation: "عند تسجيل الوصول" },
    { de: "Wie lautet das WLAN-Passwort?", ar: "ما هي كلمة مرور الواي فاي؟", pronunciation: "في لاوتت داس فايلان-باسفاسرت", situation: "في الغرفة" },
    { de: "Wann ist das Frühstück?", ar: "متى موعد الفطور؟", pronunciation: "فان إست داس فروشتيك", situation: "في الفندق" },
    { de: "Können Sie mir einen Taxi rufen?", ar: "هل تستطيع مني تاكسي؟", pronunciation: "كونن زير مير آينن تاكسي روفن", situation: "في الفندق" },
    { de: "Ich brauche mehr Handtücher.", ar: "أحتاج المزيد من المناشف", pronunciation: "إش برخوه مير هانتيوشر", situation: "في الغرفة" },
    { de: "Gibt es einen Safe im Zimmer?", ar: "هل يوجد خزنة في الغرفة؟", pronunciation: "غيبتس إينن زيف إم تسيمر", situation: "في الغرفة" },
    { de: "Wo ist der Ausgang?", ar: "أين المخرج؟", pronunciation: "فو إست دير أويسغاغ", situation: "في الفندق" }
  ],
  Restaurant: [
    { de: "Einen Tisch für zwei, bitte.", ar: "طاولة لشخصين من فضلك", pronunciation: "آينن تيش فير تسفاي بيت", situation: "عند الدخول" },
    { de: "Kann ich bitte die Speisekarte sehen?", ar: "هل يمكنني رؤية قائمة الطعام؟", pronunciation: "كان إش بيت ده شبايزكارته زيهن", situation: "عند الجلوس" },
    { de: "Ich möchte bestellen.", ar: "أريد أن أطلب", pronunciation: "إش موشته بيشتيلن", situation: "عند الطلب" },
    { de: "Was können Sie empfehlen?", ar: "ماذا يمكنك أن تنصح؟", pronunciation: "فاس كونن زير إمبلين", situation: "عند الطلب" },
    { de: "Die Rechnung, bitte.", ar: "الحساب من فضلك", pronunciation: "دي ريخنونغ بيت", situation: "عند الدفع" },
    { de: "Das Essen war sehr lecker.", ar: "كان الطعام لذيذاً جداً", pronunciation: "داس إيسن فار زير ليكر", situation: "عند المغادرة" },
    { de: "Kann ich mit Karte zahlen?", ar: "هل يمكنني الدفع بالبطاقة؟", pronunciation: "كان إش ميت كارته تsalen", situation: "عند الدفع" },
    { de: "Haben Sie etwas ohne Gluten?", ar: "هل لديكم شيء بدون غلوتين؟", pronunciation: "هابن زير إتفاس أونه غلوتين", situation: "عند الطلب" }
  ],
  Shopping: [
    { de: "Was kostet das?", ar: "كم سعر هذا؟", pronunciation: "فاس كوسشت داس", situation: "في المتجر" },
    { de: "Kann ich das anprobieren?", ar: "هل يمكنني تجربة هذا؟", pronunciation: "كان إش داس أنبروبيرن", situation: "في متجر الملابس" },
    { de: "Haben Sie das in einer anderen Größe?", ar: "هل لديكم هذا بمقاس آخر؟", pronunciation: "هابن زير داس إينر أندرينا غروسه", situation: "في متجر الملابس" },
    { de: "Das ist zu teuer.", ar: "هذا غالي جداً", pronunciation: "داس إست تسوي تويير", situation: "في المتجر" },
    { de: "Gibt es einen Rabatt?", ar: "هل يوجد خصم؟", pronunciation: "غيبتس إينن رابات", situation: "في المتجر" },
    { de: "Kann ich das umtauschen?", ar: "هل يمكنني استبدال هذا؟", pronunciation: "كان إش داس أومتاوشن", situation: "بعد الشراء" },
    { de: "Wo ist die Kasse?", ar: "أين الصندوق؟", pronunciation: "فو إست ده كاسه", situation: "في المتجر" },
    { de: "Ich schaue mich nur um.", ar: "أنا أتصفح فقط", pronunciation: "إش شاو ميش نور أوم", situation: "في المتجر" }
  ],
  Emergency: [
    { de: "Helfen Sie mir!", ar: "ساعدني!", pronunciation: "هلفن زير مير", situation: "في حالة طارئة" },
    { de: "Rufen Sie die Polizei!", ar: "اتصل بالشرطة!", pronunciation: "روفن زير ديه بوليتساي", situation: "في حالة طارئة" },
    { de: "Ich brauche einen Arzt.", ar: "أحتاج طبيباً", pronunciation: "إش برخوه آينن آرتست", situation: "في حالة مرضية" },
    { de: "Wo ist das nächste Krankenhaus?", ar: "أين أقرب مستشفى؟", pronunciation: "فو إست داس نايشته كرانكن-هاوس", situation: "في حالة طارئة" },
    { de: "Ich bin verletzt.", ar: "أنا مصاب", pronunciation: "إش بين فيرلتس", situation: "في حالة طارئة" },
    { de: "Ich habe meine Brieftasche verloren.", ar: "فقدت محفظتي", pronunciation: "إش هابه ماينه بريفتاشه فيرلورن", situation: "في حالة ضياع" },
    { de: "Ich brauche Hilfe.", ar: "أحتاج مساعدة", pronunciation: "إش برخوه هيلفه", situation: "في حالة طارئة" },
    { de: "Notruf 112!", ar: "الطوارئ 112!", pronunciation: "نوترف 112", situation: "في حالة طارئة" }
  ],
  Directions: [
    { de: "Wo ist der Bahnhof?", ar: "أين محطة القطار؟", pronunciation: "فو إست دير بان-هوف", situation: "في الشارع" },
    { de: "Wie komme ich zum Markt?", ar: "كيف أصل إلى السوق؟", pronunciation: "في كومه إش تسوم ماركت", situation: "في الشارع" },
    { de: "Ist es weit von hier?", ar: "هل هو بعيد من هنا؟", pronunciation: "إست إست فايت فون هير", situation: "في الشارع" },
    { de: "Gehen Sie geradeaus.", ar: "امشِ مستقيماً", pronunciation: "غيهن زير غراديه-أوس", situation: "عند إعطاء الاتجاه" },
    { de: "Biegen Sie links ab.", ar: "انعطف يساراً", pronunciation: "بيغن زير لينكس آب", situation: "عند إعطاء الاتجاه" },
    { de: "Biegen Sie rechts ab.", ar: "انعطف يميناً", pronunciation: "بيغن زير ريختس آب", situation: "عند إعطاء الاتجاه" },
    { de: "Wo ist die nächste U-Bahn-Station?", ar: "أين أقرب محطة مترو؟", pronunciation: "فو إست داس نايشته أو-بان-شتاتسيون", situation: "في المدينة" },
    { de: "Können Sie mir das auf der Karte zeigen?", ar: "هل تستطيع أن تريني على الخريطة؟", pronunciation: "كونن زير مير داس آوف دير كارته تسايغن", situation: "في الشارع" }
  ],
  Doctor: [
    { de: "Ich habe Kopfschmerzen.", ar: "أعاني من صداع", pronunciation: "إش هابه كوفف-شميرتسن", situation: "في العيادة" },
    { de: "Mir ist schlecht.", ar: "أشعر بسوء", pronunciation: "مير إست شليشت", situation: "في العيادة" },
    { de: "Ich habe Fieber.", ar: "لدي حمى", pronunciation: "إش هابه فيبر", situation: "في العيادة" },
    { de: "Ich bin seit drei Tagen krank.", ar: "أنا مريض منذ ثلاثة أيام", pronunciation: "إش بين زيت دراي تاغن كرانك", situation: "في العيادة" },
    { de: "Wo tut es weh?", ar: "أين تشعر بالألم؟", pronunciation: "فو توت إس فيه", situation: "سؤال الطبيب" },
    { de: "Ich brauche ein Rezept.", ar: "أحتاج وصفة طبية", pronunciation: "إش برخوه آين رسيبت", situation: "في العيادة" },
    { de: "Wann soll ich wiederkommen?", ar: "متى يجب أن أعود؟", pronunciation: "فان زول إش فيدر-كومن", situation: "في العيادة" },
    { de: "Haben Sie Allergien?", ar: "هل لديك حساسية؟", pronunciation: "هابن زير ألرغين", situation: "سؤال الطبيب" }
  ]
};

/* ---------------- Cultural Notes ---------------- */

export const CULTURAL_NOTES = [
  {
    title: "Brotkultur",
    titleAr: "ثقافة الخبز",
    content: "Germany has over 3,200 different types of bread. Germans take their bread very seriously and it is a central part of their diet. The variety includes dark rye bread, sourdough, and many regional specialties.",
    contentAr: "ألمانيا لديها أكثر من 3200 نوع مختلف من الخبز. الألمان يأخذون خبزهم على محمل الجد وهو جزء أساسي من نظامهم الغذائي. تشمل الأنواع الخبز الجاودار الداكن والخميرة المخمرة والعديد من التخصصات الإقليمية.",
    category: "food"
  },
  {
    title: "Pünktlichkeit",
    titleAr: "الدقة في المواعيد",
    content: "Being on time is extremely important in German culture. Arriving late to appointments is considered rude. It is expected to be at least 5 minutes early for professional meetings.",
    contentAr: "الوصول في الموعد بالغ الأهمية في الثقافة الألمانية. يعتبر التأخر عن المواعيد سلوكاً وقحاً. من المتوقع الوصول قبل 5 دقائق على الأقل للاجتماعات المهنية.",
    category: "etiquette"
  },
  {
    title: "Mülltrennung",
    titleAr: "فصل النفايات",
    content: "Germans are very strict about recycling and waste separation. There are separate bins for paper, plastic, glass, and organic waste. This is taken very seriously in all households and public places.",
    contentAr: "الألمان صارمون جداً بشأن إعادة التدوير وفصل النفايات. هناك صناديق منفصلة للك.paper والبلاستيك والزجاج والنفايات العضوية. يتم التعامل مع هذا بجدية كبيرة في جميع الأماكن العامة والمنازل.",
    category: "customs"
  },
  {
    title: "Weihnachtsmärkte",
    titleAr: "أسواق عيد الميلاد",
    content: "The famous Christmas markets (Weihnachtsmärkte) are a beloved tradition in Germany. They open in late November and sell traditional crafts, food like Lebkuchen and Glühwein, and create a magical atmosphere.",
    contentAr: "أسواق عيد الميلاد الشهيرة (Weihnachtsmärkte) تقليد محبوب في ألمانيا. تُفتح في أواخر نوفمبر وتبيع الحرف التقليدية والطعام مثل ليبكوكن وغلوهفاين وتخلق أجواء ساحرة.",
    category: "customs"
  },
  {
    title: "Sonntagsruhe",
    titleAr: "الهدوء يوم الأحد",
    content: "Sunday is a day of rest in Germany. Most shops are closed, and loud activities like mowing the lawn or doing noisy construction work are prohibited by law.",
    contentAr: "الأحد هو يوم الراحة في ألمانيا. معظم المتاجر مغلقة، والأنشطة الصاخبة مثل قص العشب أو أعمال البناء الصاخبة محظورة قانوناً.",
    category: "etiquette"
  },
  {
    title: "Bierkultur",
    titleAr: "ثقافة البيرة",
    content: "Germany has over 1,300 breweries and is famous for its beer purity law (Reinheitsgebot) from 1516, which states beer may only contain water, barley, and hops. Each region has its own beer specialty.",
    contentAr: "ألمانيا لديها أكثر من 1300 مصنع بيرة وتشتهر بقانون نقاء البيرة (Reinheitsgebot) من عام 1516 الذي ينص على أن البيرة قد تحتوي فقط على الماء والشعير والهلب. لكل منطقة تخصص بيرة خاص.",
    category: "food"
  },
  {
    title: "Schrebergärten",
    titleAr: "حدائق شريبر",
    content: "Allotment gardens (Schrebergärten) are small garden plots in cities where families can grow vegetables and flowers. They are a unique German tradition dating back to the 19th century.",
    contentAr: "حدائق المتنزهات (Schrebergärten) هي مساحات صغيرة من الحدائق في المدن حيث يمكن للعائلات زراعة الخضروات والزهور. وهي تقليد ألماني فريد يعود إلى القرن التاسع عشر.",
    category: "customs"
  },
  {
    title: "Kehrwoche",
    titleAr: "أسبوع التنظيف",
    content: "In many apartment buildings, residents take turns cleaning the shared hallways and staircases (Kehrwoche). This is a community tradition that is taken very seriously in Germany.",
    contentAr: "في العديد من المباني السكنية، يتناوب السكان على تنظيف الممرات والسلالم المشتركة (Kehrwoche). هذه تقليد مجتمعي يُأخذ بجدية كبيرة في ألمانيا.",
    category: "etiquette"
  },
  {
    title: "Schultüte",
    titleAr: "حقيبة المدرسة",
    content: "On the first day of school, German children receive a large cone (Schultüte) filled with candy, school supplies, and small gifts. This tradition makes the first day of school special and exciting.",
    contentAr: "في اليوم الأول من المدرسة، يتلقى الأطفال الألمان مخروطاً كبيراً (Schultüte) مليئاً بالحلوى وإمدادات المدرسة والهدايا الصغيرة. هذا التقليد يجعل اليوم الأول من المدرسة مميزاً ومثيراً.",
    category: "customs"
  },
  {
    title: "Stoßlüften",
    titleAr: "تهوية الغرفة",
    content: "Germans practice 'Stoßlüften' - opening all windows wide for a few minutes several times a day to air out rooms. This is preferred over keeping windows partially open for long periods.",
    contentAr: "يمارس الألمان 'Stoßlüften' - فتح جميع النوافذ على مصراعيها لبضع دقائق عدة مرات يومياً لتهوية الغرف. يُفضل هذا على إبقاء النوافذ مفتوحة جزئياً لفترات طويلة.",
    category: "customs"
  },
  {
    title: "Akademischer Titel",
    titleAr: "الألقاب الأكاديمية",
    content: "In Germany, academic titles are very important and used in formal address. People with doctorates are called 'Doktor' and professors are addressed with their full title.",
    contentAr: "في ألمانيا، الألقاب الأكاديمية مهمة جداً وتُستخدم في العنوان الرسمي. الأشخاص الحاصلون على درجة الدكتوراة يُنادون بـ 'دكتور' والأساتذة يُخاطبون بلقبهم الكامل.",
    category: "etiquette"
  }
];

/* ---------------- Seasonal Events ---------------- */

export const SEASONAL_EVENTS = [
  {
    name: "Weihnachten",
    nameAr: "عيد الميلاد",
    icon: "🎄",
    vocabulary: [
      { de: "der Weihnachtsbaum", ar: "شجرة عيد الميلاد" },
      { de: "das Geschenk", ar: "هدية" },
      { de: "der Weihnachtsmann", ar: "سانتا كلوز" },
      { de: "die Kerze", ar: "شمعة" },
      { de: "der Glühwein", ar: "نبيذ ساخن" },
      { de: "die Sterne", ar: "نجوم" },
      { de: "die Schneeflocke", ar: "ثلجة" },
      { de: "die Überraschung", ar: "مفاجأة" },
      { de: "das Fest", ar: "احتفال" },
      { de: "die Mitternacht", ar: "منتصف الليل" }
    ]
  },
  {
    name: "Oktoberfest",
    nameAr: "مهرجان أكتوبر",
    icon: "🍺",
    vocabulary: [
      { de: "das Bier", ar: "البيرة" },
      { de: "die Brezel", ar: "كعكة مشبك" },
      { de: "die Lederhose", ar: "بنطال جلدي تقليدي" },
      { de: "das Dirndl", ar: "فستان تقليدي نسائي" },
      { de: "die Wurst", ar: "السجيق" },
      { de: "die Musik", ar: "الموسيقى" },
      { de: "das Zelt", ar: "خيمة" },
      { de: "der Schuhplattler", ar: "رقصة تقليدية" },
      { de: "die Geige", ar: "الكمان" },
      { de: "der Jubel", ar: "الهتافات" }
    ]
  },
  {
    name: "Ostern",
    nameAr: "عيد الفصح",
    icon: "🥚",
    vocabulary: [
      { de: "das Osterei", ar: "بيضة عيد الفصح" },
      { de: "der Osterhase", ar: "أرنب عيد الفصح" },
      { de: "die Blume", ar: "الزهرة" },
      { de: "der Frühling", ar: "الربيع" },
      { de: "die Schokolade", ar: "الشوكولاتة" },
      { de: "der Korb", ar: "سلة" },
      { de: "die Kerze", ar: "شمعة" },
      { de: "der Sonnenschein", ar: "أشعة الشمس" },
      { de: "das Fest", ar: "احتفال" },
      { de: "die Freude", ar: "الفرح" }
    ]
  },
  {
    name: "Silvester",
    nameAr: "السنة الجديدة",
    icon: "🎆",
    vocabulary: [
      { de: "das Feuerwerk", ar: "ألعاب نارية" },
      { de: "die Rakete", ar: "صاروخ" },
      { de: "der Champagner", ar: "الشمبانيا" },
      { de: "die Mitternacht", ar: "منتصف الليل" },
      { de: "die Vorsätze", ar: "العزم" },
      { de: "das Feuer", ar: "النار" },
      { de: "der Rauch", ar: "الدخان" },
      { de: "das Jahr", ar: "السنة" },
      { de: "das Lärm", ar: "الضجيج" },
      { de: "der Dank", ar: "الشكر" }
    ]
  },
  {
    name: "Karneval",
    nameAr: "الكرنفال",
    icon: "🎭",
    vocabulary: [
      { de: "die Maske", ar: "قناع" },
      { de: "das Kostüm", ar: "زي" },
      { de: "der Umzug", ar: "مسيرة" },
      { de: "die Musik", ar: "الموسيقى" },
      { de: "der Tanz", ar: "رقص" },
      { de: "die Süßigkeit", ar: "حلويات" },
      { de: "die Trommel", ar: "طبول" },
      { de: "die Perücke", ar: "شعر مستعار" },
      { de: "der Spaß", ar: "مرح" },
      { de: "das Fest", ar: "احتفال" }
    ]
  }
];
