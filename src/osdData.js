/* ==========================================================================
   OSD (Onlinesprachdiplom) Exam Data — All Modules & Teils
   ========================================================================== */

export const OSD_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

export const OSD_MODULES = [
  { id: "sprechen", name: "Sprechen", nameAr: "التحدث", icon: "🎤", color: "#10b981" },
  { id: "hören", name: "Hören", nameAr: "الاستماع", icon: "🎧", color: "#3b82f6" },
  { id: "lesen", name: "Lesen", nameAr: "القراءة", icon: "📖", color: "#8b5cf6" },
  { id: "schreiben", name: "Schreiben", nameAr: "الكتابة", icon: "✍️", color: "#f59e0b" }
];

/* --------------------------------------------------------------------------
   Sprechen (Speaking) — 4 Teils
   Teil 1: Sich vorstellen (Self-introduction)
   Teil 2: Ein Foto beschreiben (Describe a photo)
   Teil 3: Alltagssituation (Daily situation role-play)
   Teil 4: Interview beantworten (Answer interview questions)
   -------------------------------------------------------------------------- */

export const SPRECHEN = {
  A1: {
    teil1: {
      title: "Teil 1: Sich vorstellen",
      titleAr: "الجزء 1: التعريف بالنفس",
      instruction: "Stellen Sie sich vor. Sagen Sie, wo Sie herkommen, was Sie machen und warum Sie Deutsch lernen.",
      instructionAr: "عرّف بنفسك. قل من أين أتيت، ماذا تفعل، ولماذا تتعلم الألمانية.",
      timeLimit: 60,
      topics: [
        {
          prompt: "Stellen Sie sich bitte vor.",
          promptAr: "عرّف بنفسك من فضلك.",
          sampleAnswer: "Hallo! Ich heiße Ahmad. Ich komme aus Tunesien. Ich bin 25 Jahre alt. Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.",
          keywords: ["heiße", "komme aus", "alter", "lerne Deutsch", "möchte"],
          tips: "اذكر اسمك، بلدك، عمرك، ولماذا تتعلم الألمانية"
        },
        {
          prompt: "Woher kommen Sie? Was machen Sie beruflich?",
          promptAr: "من أين أنت؟ ما هي مهنتك؟",
          sampleAnswer: "Ich komme aus Ägypten. Ich bin Ingenieur. Ich arbeite in einem großen Unternehmen.",
          keywords: ["komme aus", "bin", "arbeite"],
          tips: "اذكر بلدك ومهنتك"
        }
      ]
    },
    teil2: {
      title: "Teil 2: Ein Foto beschreiben",
      titleAr: "الجزء 2: وصف صورة",
      instruction: "Beschreiben Sie das Foto. Was sehen Sie? Was machen die Personen?",
      instructionAr: "وصف الصورة. ماذا ترى؟ ماذا تفعل الأشخاص؟",
      timeLimit: 60,
      topics: [
        {
          prompt: "Ein Mann und eine Frau sitzen in einem Café.",
          promptAr: "رجل وامرأة يجلسان في مقهى.",
          sampleAnswer: "Auf dem Foto sehe ich einen Mann und eine Frau. Sie sitzen in einem Café. Der Mann trinkt Kaffee und die Frau trinkt Tee. Sie sprechen miteinander. Es ist ein schönes Café.",
          keywords: ["sehe ich", "sitzen", "trinkt", "sprechen"],
          tips: "صف الأشخاص والأفعال والمكان"
        }
      ]
    },
    teil3: {
      title: "Teil 3: Alltagssituation",
      titleAr: "الجزء 3: موقف يومي",
      instruction: "Sie sind im Supermarkt. Sie möchten Brot und Milch kaufen. Sprechen Sie mit dem Verkäufer.",
      instructionAr: "أنت في السوبر ماركت. تريد شراء خبز وحليب. تحدث مع البائع.",
      timeLimit: 90,
      dialogues: [
        {
          scenario: "Im Supermarkt",
          scenarioAr: "في السوبر ماركت",
          steps: [
            { speaker: "Verkäufer", de: "Guten Tag! Kann ich Ihnen helfen?", ar: "مرحباً! هل يمكنني مساعدتك?" },
            { speaker: "Sie", prompt: "Was möchten Sie kaufen?", promptAr: "ماذا تريد أن تشتري؟", correctAnswer: "Ja, ich möchte Brot und Milch, bitte." },
            { speaker: "Verkäufer", de: "Haben Sie eine Kundenkarte?", ar: "هل لديك بطاقة عميل؟" },
            { speaker: "Sie", prompt: "Haben Sie eine Kundenkarte?", promptAr: "هل لديك بطاقة عميل؟", correctAnswer: "Nein, ich habe keine." }
          ]
        }
      ]
    },
    teil4: {
      title: "Teil 4: Interview beantworten",
      titleAr: " الجزء 4: الإجابة عن أسئلة المقابلة",
      instruction: "Beantworten Sie die Fragen über Ihren Alltag.",
      instructionAr: "أجب عن الأسئلة عن يومك المعتاد.",
      timeLimit: 90,
      questions: [
        { de: "Wann stehen Sie auf?", ar: "متى تستيقظ؟", sampleAnswer: "Ich stehe um sieben Uhr auf.", keywords: ["stehe", "auf", "Uhr"] },
        { de: "Was essen Sie zum Frühstück?", ar: "ماذا تأكل في الفطور؟", sampleAnswer: "Zum Frühstück esse ich Brot mit Käse und trinke Kaffee.", keywords: ["Frühstück", "esse", "trinke"] },
        { de: "Was machen Sie am Wochenende?", ar: "ماذا تفعل في عطلة نهاية الأسبوع؟", sampleAnswer: "Am Wochenende treffe ich Freunde oder gehe ich ins Kino.", keywords: ["Wochenende", "treffe", "gehe"] }
      ]
    }
  },
  A2: {
    teil1: {
      title: "Teil 1: Sich vorstellen",
      titleAr: "الجزء 1: التعريف بالنفس",
      instruction: "Stellen Sie sich und Ihre Familie vor.",
      instructionAr: "عرّف بنفسك وبعائلتك.",
      timeLimit: 90,
      topics: [
        {
          prompt: "Erzählen Sie über sich und Ihre Familie.",
          promptAr: "حدث عن نفسك وعائلتك.",
          sampleAnswer: "Hallo! Ich heiße Fatima und komme aus Marokko. Ich bin 30 Jahre alt und verheiratet. Ich habe zwei Kinder. Mein Mann ist Lehrer und ich arbeite als Krankenschwester. Wir wohnen in Casablanca.",
          keywords: ["heiße", "komme aus", "verheiratet", "Kinder", "arbeite", "wohne"],
          tips: "اذكر معلومات عنك وعائلتك وعملك ومكان إقامتك"
        }
      ]
    },
    teil2: {
      title: "Teil 2: Ein Foto beschreiben",
      titleAr: "الجزء 2: وصف صورة",
      instruction: "Beschreiben Sie ein Foto von einem Familientreffen.",
      instructionAr: "وصف صورة لمناسبة عائلية.",
      timeLimit: 90,
      topics: [
        {
          prompt: "Eine Familie feiert einen Geburtstag.",
          promptAr: "عائلة تحتفل بمناسبة عيد ميلاد.",
          sampleAnswer: "Auf dem Foto sehe ich eine große Familie. Sie feiern einen Geburtstag. Es gibt einen Kuchen mit Kerzen. Die Kinder sind sehr glücklich. Die Großeltern sind auch da. Alle essen und lachen.",
          keywords: ["Familie", "feiern", "Geburtstag", "Kuchen", "glücklich"],
          tips: "صف العائلة والمناسبة والأطعمة والمشاعر"
        }
      ]
    },
    teil3: {
      title: "Teil 3: Alltagssituation",
      titleAr: "الجزء 3: موقف يومي",
      instruction: "Sie möchten eine Wohnung mieten. Rufen Sie den Vermieter an.",
      instructionAr: "تريد استئجار شقة. اتصل بالمالك.",
      timeLimit: 120,
      dialogues: [
        {
          scenario: "Wohnungssuche",
          scenarioAr: "البحث عن شقة",
          steps: [
            { speaker: "Vermieter", de: "Ja, guten Tag?", ar: "مرحباً!" },
            { speaker: "Sie", prompt: "Rufen Sie wegen der Wohnung an.", promptAr: "اتصل بخصوص الشقة.", correctAnswer: "Guten Tag! Ich rufe wegen der Wohnung an, die Sie vermieten." },
            { speaker: "Vermieter", de: "Die Wohnung kostet 600 Euro im Monat. Haben Sie Fragen?", ar: "الشقة بسعر 600 يورو شهرياً. هل لديك أسئلة؟" },
            { speaker: "Sie", prompt: "Fragen Sie nach dem Preis und der Lage.", promptAr: "اسأل عن السعر والموقع.", correctAnswer: "Ist das mit Nebenkosten? Und wo genau ist die Wohnung?" }
          ]
        }
      ]
    },
    teil4: {
      title: "Teil 4: Interview beantworten",
      titleAr: "الجزء 4: الإجابة عن أسئلة المقابلة",
      instruction: "Beantworten Sie Fragen über Ihre Hobbys und Freizeit.",
      instructionAr: "أجب عن الأسئلة عن هواياتك ووقت فراغك.",
      timeLimit: 90,
      questions: [
        { de: "Was sind Ihre Hobbys?", ar: "ما هي هواياتك؟", sampleAnswer: "In meiner Freizeit lese ich gerne und höre Musik. Am Wochenende gehe ich gerne spazieren.", keywords: ["Freizeit", "lese", "höre", "gehe"] },
        { de: "Was machen Sie gern mit Freunden?", ar: "ماذا تحب أن تفعل مع أصدقائك؟", sampleAnswer: "Mit Freunden gehe ich gerne ins Café oder wir gehen zusammen ins Kino.", keywords: ["Freunden", "gehe", "Café", "Kino"] },
        { de: "Reisen Sie gern? Wo waren Sie letztes Jahr?", ar: "هل تحب السفر؟ أين كنت العام الماضي؟", sampleAnswer: "Ja, ich reise gern. Letztes Jahr war ich in der Türkei. Das war sehr schön.", keywords: ["reise", "war", "schön"] }
      ]
    }
  },
  B1: {
    teil1: {
      title: "Teil 1: Sich vorstellen",
      titleAr: "الجزء 1: التعريف بالنفس",
      instruction: "Stellen Sie sich vor: Wer sind Sie? Was ist Ihr Beruf? Was sind Ihre Stärken und Schwächen?",
      instructionAr: "عرّف بنفسك: من أنت؟ ما هي مهنتك؟ ما هي نقاط قوتك وضعفك؟",
      timeLimit: 120,
      topics: [
        {
          prompt: "Erzählen Sie etwas über sich, Ihren Beruf und Ihre Persönlichkeit.",
          promptAr: "حدث عن نفسك ومهنتك وشخصيتك.",
          sampleAnswer: "Ich bin Sarah aus Algerien und arbeite als Softwareentwicklerin. Ich bin kreativ und teamfähig, aber manchmal zu perfektionistisch. Ich spreche drei Sprachen: Arabisch, Französisch und Deutsch.",
          keywords: ["arbeite als", "bin", "teamfähig", "spreche", "Sprachen"],
          tips: "اذكر معلومات شخصية ومهنية وصفات شخصيتك"
        }
      ]
    },
    teil2: {
      title: "Teil 2: Ein Foto beschreiben",
      titleAr: "الجزء 2: وصف صورة",
      instruction: "Beschreiben Sie ein Foto von einer Demonstration oder einem Protest.",
      instructionAr: "وصف صورة لمظاهرة أو احتجاج.",
      timeLimit: 120,
      topics: [
        {
          prompt: "Viele Menschen demonstrieren auf einer Straße.",
          promptAr: "الكثير من الناس يحتجون في شارع.",
          sampleAnswer: "Auf dem Foto sehe ich eine große Menschenmenge auf einer Straße. Die Menschen halten Schilder und Transparente. Einige rufen Parolen. Die Stimmung ist ernst. Es gibt auch Polizisten. Die Demonstranten fordern mehr Rechte.",
          keywords: ["Menschenmenge", "Schilder", "rufen", "Stimmung", "fordern"],
          tips: "صف المشهد والأفعال والمشاعر والمطالب"
        }
      ]
    },
    teil3: {
      title: "Teil 3: Alltagssituation",
      titleAr: "الجزء 3: موقف يومي",
      instruction: "Sie haben ein Problem mit Ihrer Bestellung im Restaurant. Beschweren Sie sich beim Kellner.",
      instructionAr: "لديك مشكلة مع طلبك في المطعم. اشتكِ للنادل.",
      timeLimit: 120,
      dialogues: [
        {
          scenario: "Im Restaurant",
          scenarioAr: "في المطعم",
          steps: [
            { speaker: "Kellner", de: "Ist alles in Ordnung?", ar: "هل كل شيء على ما يرام؟" },
            { speaker: "Sie", prompt: "Beschweren Sie sich über das Essen.", promptAr: "اشتكِ من الطعام.", correctAnswer: "Nein, leider nicht. Das Essen ist kalt und der Salat ist nicht frisch." },
            { speaker: "Kellner", de: "Es tut mir leid! Soll ich Ihnen ein neues bringen?", ar: "أعتذر! هل تريد أن أحضر لك طلباً جديداً؟" },
            { speaker: "Sie", prompt: "Fordern Sie ein neues Gericht oder einen Rabatt.", promptAr: "اطلب طعاماً جديداً أو خصم.", correctAnswer: "Ja, bringen Sie mir bitte ein neues Gericht. Oder können Sie mir einen Rabatt geben?" }
          ]
        }
      ]
    },
    teil4: {
      title: "Teil 4: Interview beantworten",
      titleAr: "الجزء 4: الإجابة عن أسئلة المقابلة",
      instruction: "Beantworten Sie Fragen über Ihre Meinung zu gesellschaftlichen Themen.",
      instructionAr: "أجب عن الأسئلة عن رأيك في القضايا المجتمعية.",
      timeLimit: 120,
      questions: [
        { de: "Was halten Sie von der Digitalisierung in der Schule?", ar: "ما رأيك في الرقمنة في المدرسة؟", sampleAnswer: "Ich finde die Digitalisierung sehr wichtig, aber Kinder sollten nicht zu viel Zeit vor dem Bildschirm verbringen.", keywords: ["finde", "wichtig", "aber", "Bildschirm"] },
        { de: "Sollten mehr Menschen öffentliche Verkehrsmittel nutzen?", ar: "هل يجب أن يستخدم المزيد من وسائل النقل العام؟", sampleAnswer: "Ja, auf jeden Fall. Das ist besser für die Umwelt und reduziert den Verkehr in den Städten.", keywords: ["auf jeden Fall", "Umwelt", "Verkehr"] },
        { de: "Was ist Ihnen bei der Arbeit wichtig?", ar: "ما الذي تبحث عنه في العمل؟", sampleAnswer: "Mir ist ein gutes Arbeitsklima und faire Bezahlung wichtig. Man sollte auch继续 können.", keywords: ["wichtig", "Arbeitsklima", "Bezahlung"] }
      ]
    }
  },
  B2: {
    teil1: {
      title: "Teil 1: Sich vorstellen",
      titleAr: "الجزء 1: التعريف بالنفس",
      instruction: "Stellen Sie sich ausführlich vor: Ihr Werdegang, Ihre Ziele und Ihre Meinung zu einem Thema.",
      instructionAr: "عرّف بنفسك بالتفصيل: مسيرتك المهنية، أهدافك، ورأيك في موضوع.",
      timeLimit: 150,
      topics: [
        {
          prompt: "Erzählen Sie über Ihren Lebenslauf und Ihre beruflichen Ziele.",
          promptAr: "حدث عن مسيرتك المهنية وأهدافك المهنية.",
          sampleAnswer: "Ich bin Omar aus dem Libanon und habe Wirtschaftswissenschaften studiert. Nach dem Studium habe ich als Projektleiter in einem internationalen Unternehmen gearbeitet. Mein Ziel ist es, in den nächsten Jahren eine Führungsposition zu übernehmen, weil ich gerne Verantwortung übernehme.",
          keywords: ["habe studiert", "gearbeitet", "Ziel", "Führungsposition", "Verantwortung"],
          tips: "اذكر تعليمك وخبراتك وأهدافك المستقبلية"
        }
      ]
    },
    teil2: {
      title: "Teil 2: Ein Foto beschreiben",
      titleAr: "الجزء 2: وصف صورة",
      instruction: "Beschreiben Sie ein Foto von einer Umweltverschmutzung.",
      instructionAr: "وصف صورة لتلوث بيئي.",
      timeLimit: 150,
      topics: [
        {
          prompt: "Ein Fluss ist voller Müll und Abfälle.",
          promptAr: "نهر مليء بالنفايات والقمامة.",
          sampleAnswer: "Das Foto zeigt einen Fluss, der voller Müll und Plastikabfälle ist. Das Wasser ist dunkel und riecht schlecht. An den Ufern liegen tote Fische. Das ist ein ernstes Umweltproblem. Die Verschmutzung kommt wahrscheinlich aus Fabriken und Häusern. Man muss dringend handeln.",
          keywords: ["zeigt", "Müll", "Wasser", "Umweltproblem", "handeln"],
          tips: "صف المشكلة البيئية وأسبابها وتأثيراتها"
        }
      ]
    },
    teil3: {
      title: "Teil 3: Alltagssituation",
      titleAr: "الجزء 3: موقف يومي",
      instruction: "Sie möchten sich über eine Verspätung bei der Bahn beschweren.",
      instructionAr: "تريد الشكوى من تأخر القطار.",
      timeLimit: 150,
      dialogues: [
        {
          scenario: "Am Bahnhof",
          scenarioAr: "في محطة القطار",
          steps: [
            { speaker: "Mitarbeiter", de: "Guten Tag, wie kann ich Ihnen helfen?", ar: "مرحباً، كيف يمكنني مساعدتك؟" },
            { speaker: "Sie", prompt: "Beschweren Sie sich über die Verspätung.", promptAr: "اشتكِ من التأخر.", correctAnswer: "Guten Tag. Mein Zug hat 45 Minuten Verspätung und ich habe einen wichtigen Termin. Das ist nicht das erste Mal." },
            { speaker: "Mitarbeiter", de: "Es tut uns leid. Es gab ein technisches Problem.", ar: "نعتذر. كانت هناك مشكلة تقنية." },
            { speaker: "Sie", prompt: "Fordern Sie Entschädigung oder Hilfe.", promptAr: "اطلب تعويضاً أو مساعدة.", correctAnswer: "Ich brauche eine Lösung. Können Sie mir eine Entschädigung geben oder mich mit einem anderen Zug befördern?" }
          ]
        }
      ]
    },
    teil4: {
      title: "Teil 4: Interview beantworten",
      titleAr: "الجزء 4: الإجابة عن أسئلة المقابلة",
      instruction: "Beantworten Sie Fragen zu komplexeren gesellschaftlichen Themen.",
      instructionAr: "أجب عن أسئلة حول قضايا مجتمعية معقدة.",
      timeLimit: 150,
      questions: [
        { de: "Was ist die größte Herausforderung unserer Gesellschaft?", ar: "ما هو أكبر تحدٍ يواجه مجتمعنا؟", sampleAnswer: "Die größte Herausforderung ist der Klimawandel. Wir müssen nachhaltiger leben und erneuerbare Energien nutzen.", keywords: ["Herausforderung", "Klimawandel", "nachhaltig", "erneuerbar"] },
        { de: "Wie wichtig ist Integration von Zugewanderten?", ar: "ما أهمية اندماج المهاجرين؟", sampleAnswer: "Integration ist sehr wichtig. Zugewanderte sollten die Sprache lernen und an der Gesellschaft teilnehmen.", keywords: ["Integration", "wichtig", "Sprache lernen", "teilnehmen"] },
        { de: "Was würden Sie an Ihrem Arbeitsplatz ändern?", ar: "ماذا ستغير في مكان عملك؟", sampleAnswer: "Ich würde mehr Flexibilität bei der Arbeitszeit einführen und ein besseres Betriebsklima schaffen.", keywords: ["ändern", "Flexibilität", "Betriebsklima"] }
      ]
    }
  },
  C1: {
    teil1: {
      title: "Teil 1: Sich vorstellen",
      titleAr: "الجزء 1: التعريف بالنفس",
      instruction: "Stellen Sie sich akademisch oder beruflich detailliert vor.",
      instructionAr: "عرّف بنفسك بشكل أكاديمي أو مهني مفصل.",
      timeLimit: 180,
      topics: [
        {
          prompt: "Beschreiben Sie Ihren bisherigen Werdegang und Ihre berufliche Philosophie.",
          promptAr: "صف مسيرتك المهنية حتى الآن وفلسفتك المهنية.",
          sampleAnswer: "Nach meinem Studium der Rechtswissenschaften habe ich als Anwalt gearbeitet, mich dann aber für eine Karriere in der Politikberatung entschieden. Mein Leitsatz ist, dass gute Politik auf evidenzbasierten Entscheidungen beruhen muss. Ich habe in verschiedenen Ministerien gearbeitet und internationale Erfahrung gesammelt.",
          keywords: ["Studium", "entschieden", "Leitsatz", "evidenzbasiert", "Erfahrung"],
          tips: "اذكر تعليمك وخبراتك وقناعاتك المهنية"
        }
      ]
    },
    teil2: {
      title: "Teil 2: Ein Foto beschreiben",
      titleAr: "الجزء 2: وصف صورة",
      instruction: "Beschreiben Sie ein Foto eines sozialen oder politischen Themas.",
      instructionAr: "وصف صورة لموضوع اجتماعي أو سياسي.",
      timeLimit: 180,
      topics: [
        {
          prompt: "Ein Foto von Obdachlosen in einer großen Stadt.",
          promptAr: "صورة لمتشردين في مدينة كبيرة.",
          sampleAnswer: "Das Foto zeigt mehrere Obdachlose auf einer belebten Straße einer Großstadt. Hinter ihnen moderne Glasfassaden von Luxusgeschäften. Der Kontrast ist frappierend. Die Personen wirken erschöpmt und isoliert. Dieses Bild wirft Fragen sozialer Ungleichheit und der Verantwortung der Gesellschaft auf.",
          keywords: ["zeigt", "Kontrast", "frappierend", "soziale Ungleichheit", "Verantwortung"],
          tips: "صف المشهد وحلّل الدلالات الاجتماعية"
        }
      ]
    },
    teil3: {
      title: "Teil 3: Alltagssituation",
      titleAr: "الجزء 3: موقف يومي",
      instruction: "Verhandeln Sie einen Arbeitsvertrag mit Ihrem Chef.",
      instructionAr: "تفاوض على عقد عمل مع مديرك.",
      timeLimit: 180,
      dialogues: [
        {
          scenario: "Gespräch mit dem Chef",
          scenarioAr: "محادثة مع المدير",
          steps: [
            { speaker: "Chef", de: "Wir möchten Ihnen die Stelle anbieten.", ar: "نريد أن نعرض عليك المنصب." },
            { speaker: "Sie", prompt: "Verhandeln Sie das Gehalt.", promptAr: "تفاوض على الراتب.", correctAnswer: "Vielen Dank für das Angebot. Das klingt sehr interessant. Bei meinem bisherigen Gehalt und meiner Erfahrung hätte ich mir ein Angebot im Bereich von 55.000 Euro gewünscht." },
            { speaker: "Chef", de: "Das ist über unserem Budget. Können wir das besprechen?", ar: "هذا أعلى من ميزانيتنا. هل يمكننا مناقشة ذلك؟" },
            { speaker: "Sie", prompt: "Finden Sie einen Kompromiss.", promptAr: "ابحث عن حل وسط.", correctAnswer: "Ich bin offen für Kompromisse. Vielleicht könnten wir das Gehalt nach einer Probezeit anpassen oder zusätzliche Benefits vereinbaren." }
          ]
        }
      ]
    },
    teil4: {
      title: "Teil 4: Interview beantworten",
      titleAr: "الجزء 4: الإجابة عن أسئلة المقابلة",
      instruction: "Diskutieren Sie komplexe Themen wie Bildung, Wirtschaft oder Politik.",
      instructionAr: "ناقش مواضيع معقدة مثل التعليم أو الاقتصاد أو السياسة.",
      timeLimit: 180,
      questions: [
        { de: "Welche Rolle spielt Bildung bei der gesellschaftlichen Entwicklung?", ar: "مادور التعليم في التطور المجتمعي؟", sampleAnswer: "Bildung ist der Schlüssel zur gesellschaftlichen Entwicklung. Sie fördert kritisches Denken und innovation. Ohne Bildung gibt es keine nachhaltige Entwicklung.", keywords: ["Schlüssel", "fördert", "kritisches Denken", "nachhaltig"] },
        { de: "Was halten Sie von der current Wirtschaftspolitik?", ar: "ما رأيك في السياسة الاقتصادية الحالية؟", sampleAnswer: "Die aktuelle Wirtschaftspolitik berücksichtigt zu wenig die soziale Ungleichheit. Wir brauchen eine gerechtere Verteilung der Ressourcen.", keywords: ["Wirtschaftspolitik", "soziale Ungleichheit", "gerecht"] },
        { de: "Wie könnte man die Integration verbessern?", ar: "كيف يمكن تحسين الاندماج؟", sampleAnswer: "Man sollte sprachliche Förderung stärken, Anerkennungsverfahren vereinfachen und mehr Begegnungsräume schaffen.", keywords: ["verbessern", "Förderung", "vereinfachen", "Begegnungsräume"] }
      ]
    }
  },
  C2: {
    teil1: {
      title: "Teil 1: Sich vorstellen",
      titleAr: "الجزء 1: التعريف بالنفس",
      instruction: "Führen Sie ein akademisches oder professionelles Gespräch über Ihren Werdegang.",
      instructionAr: "أجرِ حواراً أكاديمياً أو مهنياً عن مسيرتك.",
      timeLimit: 180,
      topics: [
        {
          prompt: "Beschreiben Sie Ihren Werdegang und reflektieren Sie über Ihre beruflichen Entscheidungen.",
          promptAr: "صف مسيرتك وتأمل قراراتك المهنية.",
          sampleAnswer: "Mein Werdegang war keineswegs linear. Nach dem Jurastudium habe ich zunächst in der Entwicklungszusammenarbeit gearbeitet, was meine Perspektive grundlegend verändert hat. Die Entscheidung, später in die Wirtschaftsberatung zu wechseln, war eine bewusste Provokation meines eigenen Komfortzonen-Denkens. Heute sehe ich diese scheinbar widersprüchlichen Stationen als Bereicherung.",
          keywords: ["Werdegang", "grundlegend verändert", "bewusste Provokation", "scheinbar widersprüchlich", "Bereicherung"],
          tips: "استخدم تعابير معقدة وحلّل قراراتك بدقة"
        }
      ]
    },
    teil2: {
      title: "Teil 2: Ein Foto beschreiben",
      titleAr: "الجزء 2: وصف صورة",
      instruction: "Analysieren Sie ein Foto zu einem abstrakten oder philosophischen Thema.",
      instructionAr: "حلّل صورة لموضوع تجريدي أو فلسفي.",
      timeLimit: 180,
      topics: [
        {
          prompt: "Ein Foto einer verlassenen Fabrikhalle mit Kunst an den Wänden.",
          promptAr: "صورة لقاعة مصنع مهجورة عليها لوحات فنية.",
          sampleAnswer: "Das Foto zeigt eine ehemalige Industriehalle, die nun als Galerie dient. Die rostigen Stahlträger stehen im Kontrast zu den bunten Kunstwerken. Es symbolisiert den Wandel von der Industrie- zur Wissensgesellschaft. Die Kunst hat den Raum zurückgewonnen und gibt ihm eine neue Identität. Dieses Spannungsfeld zwischen Vergangenheit und Gegenwart ist hochgradig ambivalent und poetisch zugleich.",
          keywords: ["ehemalige", "Kontrast", "symbolisiert", "Wandel", "hochgradig ambivalent"],
          tips: "استخدم لغة تحليلية وتعبيرات أدبية"
        }
      ]
    },
    teil3: {
      title: "Teil 3: Alltagssituation",
      titleAr: "الجزء 3: موقف يومي",
      instruction: "Führen Sie ein professionelles Verhandlungsgespräch.",
      instructionAr: "أجرِ محادثة تفاوض مهنية.",
      timeLimit: 180,
      dialogues: [
        {
          scenario: "Geschäftsverhandlung",
          scenarioAr: "تفاوض تجاري",
          steps: [
            { speaker: "Geschäftspartner", de: "Ihr Angebot ist viel zu teuer.", ar: "عرضك غالٍ جداً." },
            { speaker: "Sie", prompt: "Rechtfertigen Sie den Preis.", promptAr: "برر السعر.", correctAnswer: "Ich verstehe Ihre Bedenken, aber unser Angebot berücksichtigt die Premium-Qualität und den umfassenden Service. Der Preis ist im Vergleich zum Markt absolut wettbewerbsfähig." },
            { speaker: "Geschäftspartner", de: "Was können Sie uns anbieten?", ar: "ماذا يمكنك أن تقدم لنا؟" },
            { speaker: "Sie", prompt: "Präsentieren Sie einen Kompromiss.", promptAr: "قدّم حل وسط.", correctAnswer: "Ich würde einen Rabatt von 10 Prozent bei einem Langzeitvertrag vorschlagen. Zudem könnten wir den Zahlungsrahmen flexibler gestalten." }
          ]
        }
      ]
    },
    teil4: {
      title: "Teil 4: Interview beantworten",
      titleAr: "الجزء 4: الإجابة عن أسئلة المقابلة",
      instruction: "Diskutieren Sie philosophische, kulturelle oder wissenschaftliche Themen differenziert.",
      instructionAr: "ناقش مواضيع فلسفية أو ثقافية أو علمية بتحليل معمّق.",
      timeLimit: 180,
      questions: [
        { de: "Ist Perfektion erreichbar oder ein Irrweg?", ar: "هل الكمال قابل للتحقيق أم مسار مُضلّل؟", sampleAnswer: "Perfektion als absolutes Ziel ist ein Irrweg, weil sie die menschliche Begrenztheit ignoriert. Allerdings ist das Streben nach Exzellenz ein wichtiger Motor für persönliche und gesellschaftliche Entwicklung.", keywords: ["Irrweg", "menschliche Begrenztheit", "Streben", "Exzellenz", "Motor"] },
        { de: "Welche ethischen Implikationen hat künstliche Intelligenz?", ar: "ما هي الدلالات الأخلاقية للذكاء الاصطناعي؟", sampleAnswer: "KI wirft fundamentale Fragen nach Autonomie, Verantwortung und Gerechtigkeit auf. Ohne klare ethische Rahmenbedingungen besteht die Gefahr einer Erosion demokratischer Grundwerte.", keywords: ["ethische Implikationen", "Autonomie", "Verantwortung", "Erosion"] },
        { de: "Was ist der Sinn von Kunst in der modernen Gesellschaft?", ar: "ما فن في المجتمع الحديث؟", sampleAnswer: "Kunst ist ein Spiegel der Gesellschaft und gleichzeitig ein Raum für Utopien. Sie hinterfragt Konventionen und schafft Diskursräume, die in der funktionalisierten Alltagswelt oft fehlen.", keywords: ["Spiegel", "hinterfragt", "Diskursräume", "funktionalisiert"] }
      ]
    }
  }
};

/* --------------------------------------------------------------------------
   Hören (Listening) — 4 Teils
   Teil 1: Zuordnung (Matching speakers to topics)
   Teil 2: Lückentext (Fill in the blanks)
   Teil 3: Multiple Choice (Choose correct answer)
   Teil 4: Richtigs/Falsch (True/False)
   -------------------------------------------------------------------------- */

export const HÖREN = {
  A1: {
    teil1: {
      title: "Teil 1: Zuordnung",
      titleAr: "الجزء 1: المطابقة",
      instruction: "Hören Sie die Sätze und ordnen Sie sie dem richtigen Bild zu.",
      instructionAr: "استمع إلى الجمل وطابقها مع الصورة الصحيحة.",
      timeLimit: 120,
      items: [
        { audio: "Ich trinke gern Kaffee.", ar: "أحب شرب القهوة", options: ["قهوة", "شاي", "ماء", "عصير"], correct: 0 },
        { audio: "Die Katze schläft auf dem Sofa.", ar: "القطة تنام على الأريكة", options: ["كلب", "قطة", "طائر", "سمكة"], correct: 1 },
        { audio: "Ich fahre mit dem Bus zur Arbeit.", ar: "أسافر بالحافلة للعمل", options: ["سيارة", "قطار", "حافلة", "دراجة"], correct: 2 },
        { audio: "Das Kind spielt im Garten.", ar: "الطفل يلعب في الحديقة", options: ["حديقة", "مطبخ", "غرفة", "حمام"], correct: 0 },
        { audio: "Meine Mutter kocht gern.", ar: "أمي تحب الطبخ", options: [" reading", "طبخ", "غسيل", "تنظيف"], correct: 1 }
      ]
    },
    teil2: {
      title: "Teil 2: Lückentext",
      titleAr: "الجزء 2: ملء الفراغات",
      instruction: "Hören Sie den Text und schreiben Sie die fehlenden Wörter.",
      instructionAr: "استمع إلى النص واكتب الكلمات الناقصة.",
      timeLimit: 120,
      passages: [
        {
          text: "Guten Tag! Ich _____ Anna und komme aus _____. Ich bin _____ Jahre alt und arbeite als _____.",
          textAr: "مرحباً! أنا _____ وأأتي من _____.عمري _____ سنة وأعمل كـ _____.",
          answers: ["heiße", "Spanien", "28", "Lehrerin"],
          wordBank: ["heiße", "Spanien", "28", "Lehrerin", "Frankreich", "32", "Ärztin"]
        }
      ]
    },
    teil3: {
      title: "Teil 3: Multiple Choice",
      titleAr: "الجزء 3: اختيار من متعدد",
      instruction: "Hören Sie den Text und wählen Sie die richtige Antwort.",
      instructionAr: "استمع إلى النص واختر الإجابة الصحيحة.",
      timeLimit: 120,
      items: [
        {
          audio: "Hallo, mein Name ist Thomas. Ich komme aus München. Ich bin 35 Jahre alt und arbeite als Ingenieur. Am Wochenende fahre ich gern mit dem Fahrrad.",
          ar: "مرحباً، اسمي توماس. أنتي من ميونخ. عمري 35 سنة وأعمل كمهندس. في عطلة نهاية الأسبوع أحب ركوب الدراجة.",
          question: "Was ist Thomas von Beruf?",
          questionAr: "ما هي مهنة توماس؟",
          options: ["Lehrer", "Ingenieur", "Arzt", "Koch"],
          correct: 1
        }
      ]
    },
    teil4: {
      title: "Teil 4: Richtig oder Falsch",
      titleAr: "الجزء 4: صحيح أم خطأ",
      instruction: "Hören Sie die Sätze und entscheiden Sie, ob sie richtig oder falsch sind.",
      instructionAr: "استمع إلى الجمل وقرر إذا كانت صحيحة أم خاطئة.",
      timeLimit: 90,
      items: [
        { audio: "Ich habe zwei Kinder.", ar: "لدي طفلان", statement: "Die Person hat drei Kinder.", statementAr: "الشخص لديه ثلاثة أطفال", correct: false },
        { audio: "Ich arbeite in einem Krankenhaus.", ar: "أعمل في مستشفى", statement: "Die Person arbeitet in einer Schule.", statementAr: "الشخص يعمل في مدرسة", correct: false },
        { audio: "Meine Lieblingsfarbe ist Blau.", ar: "لوني المفضل هو الأزرق", statement: "Die Lieblingsfarbe ist Rot.", statementAr: "اللون المفضل هو الأحمر", correct: false },
        { audio: "Ich komme aus der Türkei.", ar: "أنا من تركيا", statement: "Die Person kommt aus der Türkei.", statementAr: "الشخص من تركيا", correct: true }
      ]
    }
  },
  A2: {
    teil1: {
      title: "Teil 1: Zuordnung",
      titleAr: "الجزء 1: المطابقة",
      instruction: "Hören Sie die Gespräche und ordnen Sie die Personen zu.",
      instructionAr: "استمع إلى الحوارات وطابق الأشخاص.",
      timeLimit: 150,
      items: [
        { audio: "Ich möchte einen Termin beim Arzt machen.", ar: "أريد أن أحجز موعداً عند الطبيب", options: ["في المستشفى", "في المدرسة", "في المطعم", "في البنك"], correct: 0 },
        { audio: "Kann ich die Rechnung bezahlen, bitte?", ar: "هل يمكنني دفع الفاتورة من فضلك؟", options: ["في البنك", "في المطعم", "في المستشفى", "في المدرسة"], correct: 1 },
        { audio: "Ich suchе ein neues Buch.", ar: "أبحث عن كتاب جديد", options: ["في المطعم", "في المكتبة", "في المستشفى", "في المحطة"], correct: 1 },
        { audio: "Mein Zug fährt um acht Uhr.", ar: "قطاري يغادر الساعة الثامنة", options: ["في المحطة", "في المطعم", "في المستشفى", "في المكتبة"], correct: 0 }
      ]
    },
    teil2: {
      title: "Teil 2: Lückentext",
      titleAr: "الجزء 2: ملء الفراغات",
      instruction: "Hören Sie den Text und ergänzen Sie die fehlenden Informationen.",
      instructionAr: "استمع إلى النص وأكمل المعلومات الناقصة.",
      timeLimit: 150,
      passages: [
        {
          text: "Liebe/r ______, ich schreibe dir, weil ich am ______ nach Berlin fahre. Ich brauche ein ______ für die Nacht. Hast du eine ______?",
          textAr: "صديق/ة عزيز/ة، أكتب لك لأنني سأسافر إلى برين في _____.أحتاج _____ لليلة واحدة. هل لديك _____؟",
          answers: ["Freundin", "Freitag", "Hotel", "Empfehlung"],
          wordBank: ["Freundin", "Freitag", "Hotel", "Empfehlung", "Montag", "Hostel", "Tipp"]
        }
      ]
    },
    teil3: {
      title: "Teil 3: Multiple Choice",
      titleAr: "الجزء 3: اختيار من متعدد",
      instruction: "Hören Sie das Gespräch und wählen Sie die richtige Antwort.",
      instructionAr: "استمع إلى المحادثة واختر الإجابة الصحيحة.",
      timeLimit: 150,
      items: [
        {
          audio: "W: Hallo, was möchtest du bestellen? M: Ich hätte gern einen Salat und ein Wasser. Möchten Sie auch etwas trinken? W: Ja, ich nehme einen Saft.",
          ar: "م: مرحباً، ماذا تريد أن تطلب؟ ذ: أريد سلطة وماء. هل تريدين شيئاً؟ ذ: نعم، أريد عصير.",
          question: "Was bestellt die Frau?",
          questionAr: "ماذا تطلب المرأة؟",
          options: ["Wasser", "Salat", "Saft", "Kaffee"],
          correct: 2
        }
      ]
    },
    teil4: {
      title: "Teil 4: Richtig oder Falsch",
      titleAr: "الجزء 4: صحيح أم خطأ",
      instruction: "Hören Sie die Aussagen und entscheiden Sie.",
      instructionAr: "استمع إلى العبارات وقرر.",
      timeLimit: 120,
      items: [
        { audio: "Ich habe gestern zwei Stunden Deutsch gelernt.", ar: "تعلمت الألمانية لمدة ساعتين بالأمس", statement: "Die Person hat Deutsch gelernt.", statementAr: "الشخص تعلم الألمانية", correct: true },
        { audio: "Meine Schwester arbeitet als Ärztin.", ar: "أختي تعمل كطبيبة", statement: "Die Schwester ist Lehrerin.", statementAr: "الأخت معلمة", correct: false },
        { audio: "Wir fahren nächste Woche nach Hamburg.", ar: "نسافر الأسبوع القادم إلى هامبورغ", statement: "Sie fahren nach München.", statementAr: "هم يسافرون إلى ميونخ", correct: false }
      ]
    }
  },
  B1: {
    teil1: {
      title: "Teil 1: Zuordnung",
      titleAr: "الجزء 1: المطابقة",
      instruction: "Hören Sie die Nachrichten und ordnen Sie die Themen zu.",
      instructionAr: "استمع إلى الأخبار وطابق المواضيع.",
      timeLimit: 180,
      items: [
        { audio: "Der neue Flughafen wird nächstes Jahr eröffnet.", ar: "سيتم افتتاح المطار الجديد العام المقبل", options: ["سياسة", "اقتصاد", "تكنولوجيا", "رياضة"], correct: 1 },
        { audio: "Die Mannschaft hat das Finale gewonnen.", ar: "الفوز بالبطولة", options: ["رياضة", "سياسة", "ثقافة", "اقتصاد"], correct: 0 },
        { audio: "Das Museum zeigt eine neue Ausstellung über Impressionismus.", ar: "يعرض المتحف معرض جيد عن الانطباعية", options: ["اقتصاد", "رياضة", "ثقافة", "سياسة"], correct: 2 },
        { audio: "Die Regierung plant neue Maßnahmen gegen den Klimawandel.", ar: "تخطط الحكومة لتدابير جديدة ضد تغير المناخ", options: ["ثقافة", "اقتصاد", "رياضة", "سياسة"], correct: 3 }
      ]
    },
    teil2: {
      title: "Teil 2: Lückentext",
      titleAr: "الجزء 2: ملء الفراغات",
      instruction: "Hören Sie den Bericht und füllen Sie die Lücken.",
      instructionAr: "استمع إلى التقرير واملأ الفراغات.",
      timeLimit: 180,
      passages: [
        {
          text: "Sehr geehrte Damen und Herren, am ______ wird ein ______ Festival stattfinden. Es gibt _____ von _____ Musik und ______ aus der ganzen Welt.",
          textAr: "سيداتي وسادتي المحترمين، في _____ سيقام مهرجان _____.هناك _____ من موسيقى _____ و_____ من جميع أنحاء العالم.",
          answers: ["Samstag", "internationales", "Auftritte", "lebendiger", "Künstler"],
          wordBank: ["Samstag", "internationales", "Auftritte", "lebendiger", "Künstler", "Sonntag", "lokales", "Vorträge"]
        }
      ]
    },
    teil3: {
      title: "Teil 3: Multiple Choice",
      titleAr: "الجزء 3: اختيار من متعدد",
      instruction: "Hören Sie den Text und wählen Sie die richtigen Antworten (zwei Antwortmöglichkeiten).",
      instructionAr: "استمع إلى النص واختر الإجابات الصحيحة (إجابتان ممكنتان).",
      timeLimit: 180,
      items: [
        {
          audio: "Im vergangenen Monat wurde in Berlin ein neues Konzerthaus eröffnet. Es bietet Platz für 2000 Zuschauer und verfügt über modernste Technik. Die Eröffnungsfeier wurde im Fernsehen übertragen. Besonders bemerkenswert ist die Architektur des Gebäudes, die von einem internationalen Architekten entworfen wurde.",
          ar: "في الشهر الماضي تم افتتاح قاعة حفلات جديدة في برلين. تتسع لـ 2000 متفرج وتحتوي على أحدث التقنيات. بُث حفل الافتتاح على التلفزيون. ما يميزه بشكل خاص هو تصميم المبنى الذي صممه معماري دولي.",
          question: "Was wird über das neue Konzerthaus gesagt?",
          questionAr: "ماذا يُقال عن قاعة الحفلات الجديدة؟",
          options: ["Es wurde im Fernsehen übertragen.", "Es bietet Platz für 3000 Zuschauer.", "Die Architektur ist bemerkenswert.", "Es wurde von einem deutschen Architekten entworfen."],
          correct: [0, 2]
        }
      ]
    },
    teil4: {
      title: "Teil 4: Richtig oder Falsch",
      titleAr: "الجزء 4: صحيح أم خطأ",
      instruction: "Hören Sie die Aussagen und urteilen Sie.",
      instructionAr: "استمع إلى العبارات واحكم.",
      timeLimit: 150,
      items: [
        { audio: "Die Zahl der Touristen ist im letzten Jahr um 15 Prozent gestiegen.", ar: "ارتفع عدد السياح بنسبة 15 في المئة العام الماضي", statement: "Die Touristenzahl ist gestiegen.", statementAr: "ارتفع عدد السياح", correct: true },
        { audio: "Die Firma hat 50 neue Arbeitsplätze geschaffen.", ar: "أنشأت الشركة 50 فرصة عمل جديدة", statement: "Die Firma hat Arbeitsplätze abgebaut.", statementAr: "الشركة خفضت فرص العمل", correct: false },
        { audio: "Das Projekt wird voraussichtlich drei Jahre dauern.", ar: "من المتوقع أن يستمر المشروع ثلاث سنوات", statement: "Das Projekt dauert zwei Jahre.", statementAr: "المشروع يستمر سنتين", correct: false }
      ]
    }
  },
  B2: {
    teil1: {
      title: "Teil 1: Zuordnung",
      titleAr: "الجزء 1: المطابقة",
      instruction: "Hören Sie die Interviews und ordnen Sie die Gesprächspartner zu.",
      instructionAr: "استمع إلى المقابلات وطابق المحادثين.",
      timeLimit: 180,
      items: [
        { audio: "Ich arbeite seit zehn Jahren als Journalist und berichte über politische Ereignisse.", ar: "أعمل منذ عشر سنوات كصحفي وأغطي الأحداث السياسية", options: ["Wissenschaftler", "Politiker", "Journalist", "Künstler"], correct: 2 },
        { audio: "Mein Schwerpunkt liegt auf der Erforschung von erneuerbaren Energien.", ar: "ركيزي على البحث في الطاقات المتجددة", options: ["Arzt", "Wissenschaftler", "Lehrer", "Ingenieur"], correct: 1 },
        { audio: "Ich unterrichte Mathematik und Physik an einer weiterführenden Schule.", ar: "أدرس الرياضيات والفيزياء في مدرسة ثانوية", options: ["Wissenschaftler", "Journalist", "Lehrer", "Student"], correct: 2 }
      ]
    },
    teil2: {
      title: "Teil 2: Lückentext",
      titleAr: "الجزء 2: ملء الفراغات",
      instruction: "Hören Sie den Vortrag und ergänzen Sie die fehlenden Begriffe.",
      instructionAr: "استمع إلى المحاضرة وأكمل المصطلحات الناقصة.",
      timeLimit: 180,
      passages: [
        {
          text: "Die ______ ist ein wesentlicher Faktor für ______. Ohne ausreichende ______ kann eine Gesellschaft nicht ______.",
          textAr: "ال_____ عامل أساسي لـ _____ . بدون _____ كافٍ لا يمكن للمجتمع أن _____.",
          answers: ["Bildung", "Entwicklung", "Investitionen", "funktionieren"],
          wordBank: ["Bildung", "Entwicklung", "Investitionen", "funktionieren", "Wirtschaft", "Gesundheit", "zusammenarbeiten"]
        }
      ]
    },
    teil3: {
      title: "Teil 3: Multiple Choice",
      titleAr: "الجزء 3: اختيار من متعدد",
      instruction: "Hören Sie den Beitrag und wählen Sie die richtige Antwort.",
      instructionAr: "استمع إلى المساهمة واختر الإجابة الصحيحة.",
      timeLimit: 180,
      items: [
        {
          audio: "Laut einer neuen Studie verbringen Jugendliche durchschnittlich sechs Stunden am Tag vor Bildschirmen. Experten warnen vor den gesundheitlichen Folgen. Besonders betroffen sind die Augen und der Schlaf. Die WHO empfiehlt, Bildschirmzeit zu begrenzen und regelmäßige Pausen einzulegen.",
          ar: "وفقاً لدراسة جديدة يقضي الشباب ست ساعات يومياً أمام الشاشات. يحذر الخبيرون من العواقب الصحية. الأكثر تأثراً هي العيون والنوم. توصي منظمة الصحة العالمية بتقليل وقت الشاشات والاستراحات المنتظمة.",
          question: "Was empfiehlt die WHO?",
          questionAr: "ماذا توصي منظمة الصحة العالمية؟",
          options: ["Mehr Bildschirmzeit", "Keine Pausen einlegen", "Bildschirmzeit begrenzen", "Mehr Sport treiben"],
          correct: 2
        }
      ]
    },
    teil4: {
      title: "Teil 4: Richtig oder Falsch",
      titleAr: "الجزء 4: صحيح أم خطأ",
      instruction: "Hören Sie die Aussagen und beurteilen Sie.",
      instructionAr: "استمع إلى العبارات وقيّم.",
      timeLimit: 150,
      items: [
        { audio: "Die Zahl der Studierenden an Universitäten ist um zehn Prozent gestiegen.", ar: "ارتفع عدد الطلاب في الجامعات بنسبة 10 في المئة", statement: "Es gibt mehr Studierende als letztes Jahr.", statementAr: "هناك مزيد من الطلاب مقارنة بالعام الماضي", correct: true },
        { audio: "Die Regierung hat die Steuern gesenkt.", ar: "خفضت الحكومة الضرائب", statement: "Die Steuern wurden erhöht.", statementAr: "تم رفع الضرائب", correct: false }
      ]
    }
  },
  C1: {
    teil1: {
      title: "Teil 1: Zuordnung",
      titleAr: "الجزء 1: المطابقة",
      instruction: "Hören Sie die Beiträge und ordnen Sie die Themenbereiche zu.",
      instructionAr: "استمع إلى المساهمات وطابق مجالات المواضيع.",
      timeLimit: 180,
      items: [
        { audio: "Die Forscher haben einen neuen Impfstoff entwickelt, der 90 Prozent wirksam ist.", ar: "طوّر الباحثون لقاحاً جديداً فعالته 90 في المئة", options: ["Gesundheit", "Technik", "Umwelt", "Wirtschaft"], correct: 0 },
        { audio: "Ein neues Gesetz zum Schutz der Meere tritt明年 in Kraft.", ar: "سيدخل قانون جديد لحماية البحار حيز التنفيذ العام المقبل", options: ["Politik", "Umwelt", "Wirtschaft", "Kultur"], correct: 1 },
        { audio: "Das Unternehmen plant, 500 neue Stellen zu schaffen.", ar: "تخطط الشركة لإنشاء 500 منصب جديد", options: ["Kultur", "Politik", "Wirtschaft", "Umwelt"], correct: 2 }
      ]
    },
    teil2: {
      title: "Teil 2: Lückentext",
      titleAr: "الجزء 2: ملء الفراغات",
      instruction: "Hören Sie den Bericht und setzen Sie die passenden Wörter ein.",
      instructionAr: "استمع إلى التقرير واستبدل الكلمات المناسبة.",
      timeLimit: 180,
      passages: [
        {
          text: "Die ______ von Künstlicher Intelligenz wirft ______ ethische Fragen auf. Einerseits bietet sie enormous ______, andererseits besteht die Gefahr der ______.",
          textAr: "إن _____ الذكاء الاصطناعي يثير أسئلة أخلاقية _____. من جهة يقدم إمكانيات _____، ومن جهة أخرى هناك خطر _____.",
          answers: ["Entwicklung", "grundlegende", "Möglichkeiten", "Überwachung"],
          wordBank: ["Entwicklung", "grundlegende", "Möglichkeiten", "Überwachung", "Nutzung", "einfache", "Probleme"]
        }
      ]
    },
    teil3: {
      title: "Teil 3: Multiple Choice",
      titleAr: "الجزء 3: اختيار من متعدد",
      instruction: "Hören Sie den Vortrag und wählen Sie die richtige Antwort.",
      instructionAr: "استمع إلى المحاضرة واختر الإجابة الصحيحة.",
      timeLimit: 180,
      items: [
        {
          audio: "Die Demographie zeigt klare Trends: Die Gesellschaft altert, die Geburtenrate sinkt und die Migration nimmt zu. Experten warnen vor den Folgen für das Rentensystem und den Arbeitsmarkt. Eine nachhaltige Politik müsste sowohl Familien als auch Integration fördern.",
          ar: "التركيبة السكانية تظهر اتجاهات واضحة: المجتمع يشيخ، معدل الخصوبة ينخفض، ويزداد الهجرة. يحذر الخبراء من عواقب نظام المعاشات وسوق العمل. يجب أن تدعم السياسة المستمرة العائلات والاندماج معاً.",
          question: "Was ist eine mögliche Lösung laut dem Text?",
          questionAr: "ما هو الحل الممكن وفقاً للنص؟",
          options: ["Ein Rentenalter von 70 Jahren", "Familien und Integration fördern", "Migration stoppen", "Die Geburtenrate erhöhen"],
          correct: 1
        }
      ]
    },
    teil4: {
      title: "Teil 4: Richtig oder Falsch",
      titleAr: "الجزء 4: صحيح أم خطأ",
      instruction: "Hören Sie die Aussagen und bewerten Sie.",
      instructionAr: "استمع إلى العبارات وقيّم.",
      timeLimit: 150,
      items: [
        { audio: "Der Klimawandel ist die größte Bedrohung für die Menschheit.", ar: "تغير المناخ هو أكبر تهديد للبشرية", statement: "Der Autor hält den Klimawandel für die größte Bedrohung.", statementAr: "يعتقد الكاتب أن تغير المناخ هو أكبر تهديد", correct: true },
        { audio: "Die Wirtschaft wächst langsamer als erwartet.", ar: "النمو الاقتصادي أبطأ مما كان متوقعاً", statement: "Die Wirtschaft wächst schneller.", statementAr: "النمو أسرع", correct: false }
      ]
    }
  },
  C2: {
    teil1: {
      title: "Teil 1: Zuordnung",
      titleAr: "الجزء 1: المطابقة",
      instruction: "Hören Sie die akademischen Beiträge und ordnen Sie die Fachgebiete zu.",
      instructionAr: "استمع إلى المساهمات الأكاديمية وطابق التخصصات.",
      timeLimit: 180,
      items: [
        { audio: "Die Studie zeigt einen Zusammenhang zwischen Ernährung und kognitiver Leistung.", ar: "تظهر الدراسة علاقة بين التغذية والأداء المعرفي", options: ["Neurowissenschaft", "Soziologie", "Physik", "Recht"], correct: 0 },
        { audio: "Die Globalisierung hat die sozialen Strukturen grundlegend verändert.", ar: "أعاد العولمة الهيكل الاجتماعي بشكل جذري", options: ["Physik", "Soziologie", "Neurowissenschaft", "Medizin"], correct: 1 },
        { audio: "Das neue Verfahren zur Energiegewinnung ist doppelt so effizient.", ar: "الأسلوب الجديد لإنتاج الطاقة أكثر كفاءة بنسبة 100%", options: ["Recht", "Medizin", "Physik", "Soziologie"], correct: 2 }
      ]
    },
    teil2: {
      title: "Teil 2: Lückentext",
      titleAr: "الجزء 2: ملء الفراغات",
      instruction: "Hören Sie den Diskussionsbeitrag und ergänzen Sie die Begriffe.",
      instructionAr: "استمع إلى المساهمة في النقاش وأكمل المصطلحات.",
      timeLimit: 180,
      passages: [
        {
          text: "Die ______ zwischen wirtschaftlichem ______ und ökologischer ______ erfordert eine ______ Neuorientierung unserer Politik.",
          textAr: "ال_____ بين _____ الاقتصادي وال_____ البيئي يتطلب _____ لإعادة توجيه سياساتنا.",
          answers: ["Spannung", "Wachstum", "Nachhaltigkeit", "grundsätzliche"],
          wordBank: ["Spannung", "Wachstum", "Nachhaltigkeit", "grundsätzliche", "Zusammenarbeit", "Wohlstand", "partielle"]
        }
      ]
    },
    teil3: {
      title: "Teil 3: Multiple Choice",
      titleAr: "الجزء 3: اختيار من متعدد",
      instruction: "Hören Sie den Essay und wählen Sie die richtige Interpretation.",
      instructionAr: "استمع إلى المقال واختر التفسير الصحيح.",
      timeLimit: 180,
      items: [
        {
          audio: "Die postmoderne Gesellschaft leidet unter einer Überflutung von Informationen. Paradoxerweise führt dieser Reichtum nicht zu mehr Wissen, sondern zu einer Fragmentierung des Verstehens. Die Fähigkeit, zwischen relevantem und irrelevantem zu unterscheiden, wird zur zentralen Kompetenz.",
          ar: "تتعرض المجتمع ما بعد الحديث لفيض من المعلومات. بشكل م悖理، هذا الثراء لا يؤدي إلى مزيد من المعرفة، بل إلى تشتت الفهم. القدرة على التمييز بين المهم وغيرهم تصبح الكفاءة المركزية.",
          question: "Was ist das Paradoxon im Text?",
          questionAr: "ما هو الم悖理 في النص؟",
          options: ["Zu wenig Informationen", "Mehr Information führt zu weniger Verstehen", "Die Gesellschaft wird gebildeter", "Informationen sind unwichtig"],
          correct: 1
        }
      ]
    },
    teil4: {
      title: "Teil 4: Richtig oder Falsch",
      titleAr: "الجزء 4: صحيح أم خطأ",
      instruction: "Hören Sie die Aussagen und analysieren Sie.",
      instructionAr: "استمع إلى العبارات وحلّل.",
      timeLimit: 150,
      items: [
        { audio: "Die kulturelle Vielfalt ist eine Bereicherung für die Gesellschaft.", ar: "التنوع الثقافي إثراء للمجتمع", statement: "Der Autor sieht die kulturelle Vielfalt als Bereicherung.", statementAr: "يعتبر الكاتب التنوع الثقافي إثراءً", correct: true },
        { audio: "Die wissenschaftliche Evidenz spricht gegen eine pauschale Risikobewertung.", ar: "الدليل العلمي يتحدث ضد تقييم المخاطرة بشكل عام", statement: "Die Evidenz unterstützt eine pauschale Bewertung.", statementAr: "الدليل يدعم التقييم العام", correct: false }
      ]
    }
  }
};

/* --------------------------------------------------------------------------
   Lesen (Reading) — 4 Teils
   Teil 1: Zuordnung (Match headings to texts)
   Teil 2: Lückentext (Fill in the blanks)
   Teil 3: Multiple Choice (Answer questions about text)
   Teil 4: Informationsuche (Find specific information)
   -------------------------------------------------------------------------- */

export const LESEN = {
  A1: {
    teil1: {
      title: "Teil 1: Zuordnung",
      titleAr: "الجزء 1: المطابقة",
      instruction: "Lesen Sie die Texte und ordnen Sie die Überschriften zu.",
      instructionAr: "اقرأ النصوص وطابق العناوين.",
      timeLimit: 120,
      items: [
        { text: "Hallo! Ich heiße Maria. Ich bin 20 Jahre alt. Ich komme aus Brasilien.", textAr: "مرحباً! اسمي ماريا. عمري 20 سنة. أنا من البرازيل.", options: ["Rezept", "Vorstellung", "Bewerbung", "Einladung"], correct: 1 },
        { text: "Liebe Anna, kommst du am Samstag zu meiner Party? Adresse: Hauptstraße 5.", textAr: "صديقتي آنا، هل تأتين إلى حفلتي يوم السبت؟ العنوان: شارع هاوبت 5.", options: ["Bewerbung", "Rezept", "Einladung", "Vorstellung"], correct: 2 },
        { text: "Zutaten: 200g Mehl, 3 Eier, 100g Zucker, 1 EL Butter.", textAr: "المكونات: 200 جرام دقيق، 3 بيضات، 100 جرام سكر، ملعقة زبدة.", options: ["Einladung", "Rezept", "Vorstellung", "Bewerbung"], correct: 1 }
      ]
    },
    teil2: {
      title: "Teil 2: Lückentext",
      titleAr: "الجزء 2: ملء الفراغات",
      instruction: "Lesen Sie den Text und setzen Sie die richtigen Wörter ein.",
      instructionAr: "اقرأ النص واستبدل الكلمات الصحيحة.",
      timeLimit: 120,
      passages: [
        {
          text: "Mein Name ist _____ und ich bin _____ Jahre alt. Ich arbeite in einem _____ als _____.",
          textAr: "اسمي _____ وعمري _____ سنة. أعمل في _____ كـ _____.",
          answers: ["Ahmed", "28", "Büro", "Ingenieur"],
          wordBank: ["Ahmed", "28", "Büro", "Ingenieur", "Sara", "35", "Schule", "Lehrer"]
        }
      ]
    },
    teil3: {
      title: "Teil 3: Multiple Choice",
      titleAr: "الجزء 3: اختيار من متعدد",
      instruction: "Lesen Sie den Text und wählen Sie die richtige Antwort.",
      instructionAr: "اقرأ النص واختر الإجابة الصحيحة.",
      timeLimit: 120,
      items: [
        {
          text: "Lieber Herr Müller, hiermit bewerbe ich mich um die Stelle als Verkäuferin in Ihrem Geschäft. Ich habe drei Jahre Erfahrung im Einzelhandel. Mit freundlichen Grüßen, Anna Schmidt.",
          ar: "سيد مولر العزيز، أتقدم بطلب لوظيفة بائعة في متجرك. لدي ثلاث سنوات خبرة في التجزئة. مع أطيب التحيات، آنا شميدت.",
          question: "Um welche Stelle bewirbt sich Anna?",
          questionAr: "لأي وظيفة تتقدم آنا؟",
          options: ["Lehrerin", "Verkäuferin", "Ärztin", "Ingenieurin"],
          correct: 1
        }
      ]
    },
    teil4: {
      title: "Teil 4: Informationsuche",
      titleAr: "الجزء 4: البحث عن معلومات",
      instruction: "Lesen Sie den Text und finden Sie die richtige Information.",
      instructionAr: "اقرأ النص وابحث عن المعلومات الصحيحة.",
      timeLimit: 120,
      items: [
        {
          text: "Öffnungszeiten des Museums: Montag bis Freitag 9-17 Uhr, Samstag 10-14 Uhr, Sonntag geschlossen. Eintritt: Erwachsene 5€, Kinder bis 12 Jahre kostenlos.",
          ar: "ساعات العمل: من الاثنين إلى الجمعة 9-17، السبت 10-14، الأحد مغلق. الدخول: البالغون 5€، الأطفال حتى 12 سنة مجاناً.",
          question: "Wann ist das Museum am Wochenende geöffnet?",
          questionAr: "متى يكون المتحف مفتوحاً في عطلة نهاية الأسبوع؟",
          options: ["Samstag und Sonntag", "Nur Sonntag", "Nur Samstag", "Ganze Woche"],
          correct: 2
        }
      ]
    }
  },
  A2: {
    teil1: {
      title: "Teil 1: Zuordnung",
      titleAr: "الجزء 1: المطابقة",
      instruction: "Lesen Sie die Anzeigen und ordnen Sie die Kategorien zu.",
      instructionAr: "اقرأ الإعلانات وطابق الفئات.",
      timeLimit: 150,
      items: [
        { text: "Suche: 2-Zimmer-Wohnung in Berlin-Mitte, max. 800€, ab März.", textAr: "بحث: شقة بغرفتين في وسط برلين، بحد أقصى 800 يورو، من مارس.", options: ["Stellenangebot", "Wohnungsangebot", "Wohnungsgesuche", "Veranstaltung"], correct: 2 },
        { text: "Wir suchen eine Krankenschwester für unsere Praxis. 30 Stunden/Woche.", textAr: "نبحث عن ممرضة لعيادتنا. 30 ساعة/أسبوع.", options: ["Wohnungsgesuche", "Veranstaltung", "Stellenangebot", "Wohnungsangebot"], correct: 2 },
        { text: "Konzert: Klassische Musik im Konzerthaus, Samstag, 20 Uhr.", textAr: "حفل موسيقى كلاسيكية في قاعة الحفلات، السبت، الساعة 20.", options: ["Stellenangebot", "Veranstaltung", "Wohnungsangebot", "Wohnungsgesuche"], correct: 1 }
      ]
    },
    teil2: {
      title: "Teil 2: Lückentext",
      titleAr: "الجزء 2: ملء الفراغات",
      instruction: "Lesen Sie den Brief und setzen Sie ein.",
      instructionAr: "اقرأ الرسالة واستبدل.",
      timeLimit: 150,
      passages: [
        {
          text: "Liebe/r _____, ich möchte dich zu meinem _____ einladen. Es findet am _____ in _____ statt.",
          textAr: "صديق/ة عزيز/ة، أريد دعوتك إلى _____. سيقام في _____.",
          answers: ["Sabine", "Geburtstag", "Samstag", "meinem Zuhause"],
          wordBank: ["Sabine", "Geburtstag", "Samstag", "meinem Zuhause", "Hochzeit", "Freitag", "einem Restaurant"]
        }
      ]
    },
    teil3: {
      title: "Teil 3: Multiple Choice",
      titleAr: "الجزء 3: اختيار من متعدد",
      instruction: "Lesen Sie die E-Mail und wählen Sie.",
      instructionAr: "اقرأ البريد الإلكتروني واختر.",
      timeLimit: 150,
      items: [
        {
          text: "Hallo Markus, hast du am Freitag Zeit? Wir wollten ins Kino gehen. Der Film beginnt um 20 Uhr. Bitte gib Bescheid. LG, Peter.",
          ar: "مرحباً ماركوس، هل لديك وقت يوم الجمعة؟ أردنا الذهاب إلى السينما. يبدأ الفيلم الساعة 20. أخبرني. مع التحية، بيتر.",
          question: "Was schlägt Peter vor?",
          questionAr: "ماذا يقترح بيتر؟",
          options: ["Ins Restaurant gehen", "Ins Kino gehen", "Zu Hause bleiben", "Spazieren gehen"],
          correct: 1
        }
      ]
    },
    teil4: {
      title: "Teil 4: Informationsuche",
      titleAr: "الجزء 4: البحث عن معلومات",
      instruction: "Lesen Sie den Speiseplan und finden Sie.",
      instructionAr: "اقرأ قائمة الطعام وابحث.",
      timeLimit: 120,
      items: [
        {
          text: "Speiseplan: Montags: Schnitzel mit Kartoffeln (8,50€). Dienstags: Fisch mit Reis (9,90€). Mittwochs: Vegetarisch (7,50€). Donnerstags: Pasta (8,00€).",
          ar: "قائمة الطعام: الاثنين: شنيتسل مع بطاطس (8,50€). الثلاثاء: سمك مع أرز (9,90€). الأربعاء: نباتي (7,50€). الخميس: باستا (8,00€).",
          question: "Was gibt es am Mittwoch?",
          questionAr: "ماذا يوجد يوم الأربعاء؟",
          options: ["Schnitzel", "Fisch", "Vegetarisch", "Pasta"],
          correct: 2
        }
      ]
    }
  },
  B1: {
    teil1: {
      title: "Teil 1: Zuordnung",
      titleAr: "الجزء 1: المطابقة",
      instruction: "Lesen Sie die Texte und ordnen Sie die Themen zu.",
      instructionAr: "اقرأ النصوص وطابق المواضيع.",
      timeLimit: 180,
      items: [
        { text: "Die Regierung hat neue Richtlinien zum Schutz des Klimas beschlossen.", ar: "قررت الحكومة إرشادات جديدة لحماية المناخ", options: ["Wirtschaft", "Politik", "Sport", "Kultur"], correct: 1 },
        { text: "Die Firma meldet einen Gewinnanstieg von 20 Prozent im ersten Quartal.", ar: "أعلنت الشركة عن زيادة الأرباح بنسبة 20 في المئة في الربع الأول", options: ["Politik", "Kultur", "Wirtschaft", "Sport"], correct: 2 },
        { text: "Die Mannschaft gewinnt das Pokalfinale nach Verlängerung.", ar: "فز الفريق في نهائي الكأس بعد الوقت الإضافي", options: ["Wirtschaft", "Sport", "Politik", "Kultur"], correct: 1 }
      ]
    },
    teil2: {
      title: "Teil 2: Lückentext",
      titleAr: "الجزء 2: ملء الفراغات",
      instruction: "Lesen Sie den Artikel und setzen Sie ein.",
      instructionAr: "اقرأ المقال واستبدل.",
      timeLimit: 180,
      passages: [
        {
          text: "Die Stadt plant, den öffentlichen Verkehr zu ______. Dafür sollen neue ______ gebaut und die ______ erhöht werden.",
          textAr: "تخطط المدينة لـ _____ النقل العام. لذلك سيتم بناء _____ جديدة وزيادة _____.",
          answers: ["verbessern", "Haltestellen", "Frequenzen"],
          wordBank: ["verbessern", "Haltestellen", "Frequenzen", "verschlechtern", "Autobahnen", "Gebühren"]
        }
      ]
    },
    teil3: {
      title: "Teil 3: Multiple Choice",
      titleAr: "الجزء 3: اختيار من متعدد",
      instruction: "Lesen Sie den Artikel und wählen Sie die richtige Antwort.",
      instructionAr: "اقرأ المقال واختر الإجابة الصحيحة.",
      timeLimit: 180,
      items: [
        {
          text: "Eine neue Studie zeigt, dass Kinder, die täglich lesen, bessere Schulleistungen haben. Die Forscher empfehlen, dass Eltern ihren Kindern vorlesen und gemeinsam Bücher besprechen sollen. Besonders wichtig sei der persönliche Austausch über die gelesenen Inhalte.",
          ar: "تظهر دراسة جديدة أن الأطفال الذين يقرأون يومياً يحققون نتائج مدرسية أفضل. يوصي الباحثون بقراءة الآباء لأطفالهم ومناقشة الكتب معاً. الأهم هو التبادل الشخصي حول المحتوى المقروء.",
          question: "Was empfehlen die Forscher?",
          questionAr: "ماذا يوصي الباحثون؟",
          options: ["Mehr Hausaufgaben geben", "Eltern sollen vorlesen und diskutieren", "Kinder sollen allein lernen", "Bücher sind unwichtig"],
          correct: 1
        }
      ]
    },
    teil4: {
      title: "Teil 4: Informationsuche",
      titleAr: "الجزء 4: البحث عن معلومات",
      instruction: "Lesen Sie die Stellenanzeige und finden Sie.",
      instructionAr: "اقرأ إعلان الوظيفة وابحث.",
      timeLimit: 150,
      items: [
        {
          text: "Wir suchen eine/n Marketingmanager/in (m/w/d). Anforderungen: Studium in BWL oder Marketing, mindestens 3 Jahre Berufserfahrung, sehr gute Englischkenntnisse. Arbeitsort: Hamburg. Bewerbungsfrist: 15. März.",
          ar: "نبحث عن مدير/ة تسويق. المتطلبات: دراسة إدارة أعمال أو تسويق، خبرة مهنية لا تقل عن 3 سنوات، معرفة ممتازة بالإنجليزية. مكان العمل: هامبورغ. الموعد النهائي: 15 مارس.",
          question: "Was wird nicht gefordert?",
          questionAr: "ما الذي لا يُطلب؟",
          options: ["Studium", "Englischkenntnisse", "Führerschein", "Berufserfahrung"],
          correct: 2
        }
      ]
    }
  },
  B2: {
    teil1: {
      title: "Teil 1: Zuordnung",
      titleAr: "الجزء 1: المطابقة",
      instruction: "Lesen Sie die Zeitungsartikel und ordnen Sie die Rubriken zu.",
      instructionAr: "اقرأ مقالات الجريدة وطابق الأقسام.",
      timeLimit: 180,
      items: [
        { text: "Forscher entdecken neuen Zusammenhang zwischen Ernährung und Demenz.", ar: "اكتشف الباحثون علاقة جديدة بين التغذه والخرف", options: ["Wissenschaft", "Politik", "Sport", "Wirtschaft"], correct: 0 },
        { text: "Die Inflation steigt auf 3,2 Prozent — Experten warnen vor Kaufkraftverlust.", ar: "ارتفع التضخم إلى 3.2 في المئة — يحذر الخبراء من فقدان القدرة الشرائية", options: ["Sport", "Wissenschaft", "Wirtschaft", "Politik"], correct: 2 },
        { text: "Die Opposition fordert Neuwahlen nach dem Rücktritt des Ministers.", ar: "تطالب المعارضة بانتخابات جديدة بعد استقالة الوزير", options: ["Wirtschaft", "Sport", "Wissenschaft", "Politik"], correct: 3 }
      ]
    },
    teil2: {
      title: "Teil 2: Lückentext",
      titleAr: "الجزء 2: ملء الفراغات",
      instruction: "Lesen Sie den Editorial und ergänzen Sie.",
      instructionAr: "اقرأ المقال الافتتاحي وأكمل.",
      timeLimit: 180,
      passages: [
        {
          text: "Die ______ der Digitalisierung ist nicht aufzuhalten. ______ müssen sich an neue ______ anpassen, um ______ zu bleiben.",
          textAr: "إن _____ الرقمنة لا يمكن إيقافها. يجب على _____ التكيف مع _____ الجديدة للبقاء _____.",
          answers: ["Ausbreitung", "Unternehmen", "Bedingungen", "wettbewerbsfähig"],
          wordBank: ["Ausbreitung", "Unternehmen", "Bedingungen", "wettbewerbsfähig", "Verlangsamung", "Regierungen", "Regeln"]
        }
      ]
    },
    teil3: {
      title: "Teil 3: Multiple Choice",
      titleAr: "الجزء 3: اختيار من متعدد",
      instruction: "Lesen Sie den Leitartikel und wählen Sie.",
      instructionAr: "اقرأ المقال الرئيسي واختر.",
      timeLimit: 180,
      items: [
        {
          text: "Die Debatte um die Rente mit 68 zeigt, wie schwierig es ist, soziale Reformen durchzusetzen. Einerseits ist die Finanzierung des Systems bei steigender Lebenserwartung problematisch. Andererseits treffen ältere Arbeitnehmer oft härtere Bedingungen. Eine pauschale Lösung wird der Komplexität nicht gerecht.",
          ar: "نقاش التقاعد في سن 68 يظهر صعوبة إجراء إصلاحات اجتماعية. من جهة، تمويل النظام مع زيادة متوسط العمر يشكل مشكلة. من جهة أخرى، يواجه كبار السن ظروف أصعب. الحل العام لا يناسب التعقيد.",
          question: "Was ist die Haltung des Autors?",
          questionAr: "ما هو موقف الكاتب؟",
          options: ["Er unterstützt Rentenalter 68.", "Er lehnt jede Reform ab.", "Er sieht das Problem als komplex.", "Er findet die Lösung einfach."],
          correct: 2
        }
      ]
    },
    teil4: {
      title: "Teil 4: Informationsuche",
      titleAr: "الجزء 4: البحث عن معلومات",
      instruction: "Lesen Sie die Studie und finden Sie die Daten.",
      instructionAr: "اقرأ الدراسة وابحث عن البيانات.",
      timeLimit: 150,
      items: [
        {
          text: "Laut einer Umfrage unter 1000 Jugendlichen verbringen 67% mehr als 4 Stunden täglich online. 42% geben an, dass sie sich dadurch gestresst fühlen. Besonders betroffen sind 14-16-Jährige.",
          ar: "وفقاً لاستبيان على 1000 شاب، يقضي 67% أكثر من 4 ساعات يومياً عبر الإنترنت. 42% يعلنون أنهم يشعرون بالتوتر بسبب ذلك. الأكثر تأثراً هم من تتراوح أعمارهم بين 14-16 سنة.",
          question: "Wie viele Jugendliche fühlen sich gestresst?",
          questionAr: "كم عدد الشباب الذين يشعرون بالتوتر؟",
          options: ["67%", "42%", "50%", "33%"],
          correct: 1
        }
      ]
    }
  },
  C1: {
    teil1: {
      title: "Teil 1: Zuordnung",
      titleAr: "الجزء 1: المطابقة",
      instruction: "Lesen Sie die Wissenschaftsartikel und ordnen Sie die Fachgebiete zu.",
      instructionAr: "اقرأ مقالات العلمية وطابق التخصصات.",
      timeLimit: 180,
      items: [
        { text: "Neue Forschungsergebnisse zeigen einen Zusammenhang zwischen Schlafmangel und kognitiven Beeinträchtigungen.", ar: "تظهر نتائج بحثية جديدة علاقة بين نقص النوم والضعف المعرفي", options: ["Neurowissenschaft", "Klimatologie", "Ökonomie", "Jura"], correct: 0 },
        { text: "Die globale Erwärmung führt zu einem Anstieg des Meeresspiegels um 3 Millimeter pro Jahr.", ar: "الاحتباس الحراري يسبب ارتفاع منسوب البحر بمعدل 3 ملم سنوياً", options: ["Jura", "Ökonomie", "Klimatologie", "Neurowissenschaft"], correct: 2 },
        { text: "Die Studie analysiert die Auswirkungen von Zinsänderungen auf den Immobilienmarkt.", ar: "تحليل الدراسة تأثيرات تغييرات الفائدة على سوق العقارات", options: ["Klimatologie", "Ökonomie", "Neurowissenschaft", "Jura"], correct: 1 }
      ]
    },
    teil2: {
      title: "Teil 2: Lückentext",
      titleAr: "الجزء 2: ملء الفراغات",
      instruction: "Lesen Sie den Essay und setzen Sie ein.",
      instructionAr: "اقرأ المقال واستبدل.",
      timeLimit: 180,
      passages: [
        {
          text: "Die ______ der Globalisierung ist vielschichtig. Einerseits fördert sie den ______, andererseits verstärkt sie ______ zwischen wohlhabenden und armen Regionen.",
          textAr: "إن _____ العولمة متعددة الأوجه. من جهة ت促进 _____، ومن جهة أخرى تعزز _____ بين المناطق الغنية والفقيرة.",
          answers: ["Wirkung", "Wohlstand", "Ungleichheiten"],
          wordBank: ["Wirkung", "Wohlstand", "Ungleichheiten", "Rückgang", "Armut", "Gleichheit"]
        }
      ]
    },
    teil3: {
      title: "Teil 3: Multiple Choice",
      titleAr: "الجزء 3: اختيار من متعدد",
      instruction: "Lesen Sie den Diskussionsbeitrag und wählen Sie.",
      instructionAr: "اقرأ المساهمة في النقاش واختر.",
      timeLimit: 180,
      items: [
        {
          text: "Die sogenannte Post-Wahrheit-Ära stellt die Demokratie vor eine fundamentale Herausforderung. Wenn Fakten beliebig werden und Emotionen Fakten ersetzen, verliert der demokratische Diskurs seine Grundlage. Bildung und Medienkompetenz sind daher keine optionale, sondern eine existenzielle Notwendigkeit.",
          ar: "عصر ما بعد الحقيقة يواجه الديمقراطية بتحدي أساسي. عندما تصبح الحقائق عشوائية والمشاعر تحل محلها، يفقد النقاش الديمقراطي أساسه. التعليم وثقافة الإعلام ليست اختيارية بل ضرورة وجودية.",
          question: "Was ist die Kernaussage?",
          questionAr: "ما هي الرسالة الأساسية؟",
          options: ["Medien sind unwichtig.", "Bildung ist optional.", "Demokratie braucht Fakten.", "Emotionen sind wichtiger."],
          correct: 2
        }
      ]
    },
    teil4: {
      title: "Teil 4: Informationsuche",
      titleAr: "الجزء 4: البحث عن معلومات",
      instruction: "Lesen Sie den Bericht und finden Sie.",
      instructionAr: "اقرأ التقرير وابحث.",
      timeLimit: 150,
      items: [
        {
          text: "Die OECD-Studie vergleicht Bildungssysteme in 35 Ländern. Deutschland liegt bei den Naturwissenschaften auf Platz 12, bei Mathematik auf Platz 16 und bei Lesen auf Platz 10. Spitzenreiter sind Singapur, Japan und Finnland.",
          ar: "مقارنة منظمة التعاون والتنمية الاقتصادية بين أنظمة التعليم في 35 دولة. ألمانيا في العلوم الطبيعية في المركز 12، في الرياضيات المركز 16، وفي القراءة المركز 10. القادة سنغافورة واليابان وفنلندا.",
          question: "In welchem Bereich schneidet Deutschland am besten ab?",
          questionAr: "في أي مجال تحقق ألمانيا أفضل نتيجة؟",
          options: ["Mathematik", "Naturwissenschaften", "Lesen", "Gleiche Platzierung"],
          correct: 2
        }
      ]
    }
  },
  C2: {
    teil1: {
      title: "Teil 1: Zuordnung",
      titleAr: "الجزء 1: المطابقة",
      instruction: "Lesen Sie die akademischen Abstracts und ordnen Sie die Disziplinen zu.",
      instructionAr: "اقرأ الملخصات الأكاديمية وطابق التخصصات.",
      timeLimit: 180,
      items: [
        { text: "Die Studie untersucht die sprachliche Relativität und deren Einfluss auf kognitive Prozesse.", ar: "تدرس الدراسة النسبية اللغوية وتأثيرها على العمليات المعرفية", options: ["Linguistik", "Biochemie", "Archäologie", "Theologie"], correct: 0 },
        { text: "Neue Forschungen zur Photosynthese eröffnen Möglichkeiten für nachhaltige Energiegewinnung.", ar: "أبحاث جديدة حول عملية البناء الضوتي تفتح إمكانيات لإنتاج الطاقة المستدامة", options: ["Theologie", "Biochemie", "Linguistik", "Archäologie"], correct: 1 },
        { text: "Die Ausgrabungen liefern neue Erkenntnisse über die Besiedlung Europas.", ar: "توفر الحفريات معلومات جديدة عن استيطان أوروبا", options: ["Biochemie", "Linguistik", "Archäologie", "Theologie"], correct: 2 }
      ]
    },
    teil2: {
      title: "Teil 2: Lückentext",
      titleAr: "الجزء 2: ملء الفراغات",
      instruction: "Lesen Sie den wissenschaftlichen Text und ergänzen Sie.",
      instructionAr: "اقرأ النص العلمي وأكمل.",
      timeLimit: 180,
      passages: [
        {
          text: "Die ______ von Künstlicher Intelligenz in der Medizin birgt sowohl ______ als auch Risiken. Während die ______ diagnostischer Prozesse steigt, bleiben ______ bzgl. Datenschutz bestehen.",
          textAr: "إن _____ الذكاء الاصطناعي في الطب يحمل opportunities ومخاطر. مع _____ العمليات التشخيصية، تبقى _____ بشأن حماية البيانات.",
          answers: ["Anwendung", "Chancen", "Effizienz", "Bedenken"],
          wordBank: ["Anwendung", "Chancen", "Effizienz", "Bedenken", "Ablehnung", "Kosten", "Gewissheit"]
        }
      ]
    },
    teil3: {
      title: "Teil 3: Multiple Choice",
      titleAr: "الجزء 3: اختيار من متعدد",
      instruction: "Lesen Sie den philosophischen Text und wählen Sie.",
      instructionAr: "اقرأ النص الفلسفي واختر.",
      timeLimit: 180,
      items: [
        {
          text: "Die Spannung zwischen individueller Freiheit und kollektiver Verantwortung kennzeichnet die Moderne. Echte Freiheit kann nicht im Vakuum existieren — sie ist immer eingebettet in soziale Strukturen, die sowohl ermöglichen als auch begrenzen. Die Kunst der Politik liegt in der Balance zwischen diesen Polen.",
          ar: "التوتر بين الحرية الفردية والمسؤولية الجماعية يحدد الحداثة. الحقيقة الحرة لا يمكن أن ت existieren في فراغ — она دائماً مدمجة في الهياكل الاجتماعية التي تسمح وتحدد. فن السياسة يكمن في التوازن بين هذين القطبين.",
          question: "Was ist die Position des Autors?",
          questionAr: "ما هي موقف الكاتب؟",
          options: ["Freiheit ist unbegrenzt.", "Verantwortung ist wichtiger als Freiheit.", "Balance ist das Entscheidende.", "Politik ist überflüssig."],
          correct: 2
        }
      ]
    },
    teil4: {
      title: "Teil 4: Informationsuche",
      titleAr: "الجزء 4: البحث عن معلومات",
      instruction: "Lesen Sie den Fachartikel und finden Sie.",
      instructionAr: "اقرأ المقال المتخصص وابحث.",
      timeLimit: 150,
      items: [
        {
          text: "Die Metaanalyse von 200 Studien zeigt, dass sprachlicher Unterricht ab dem dritten Lebensjahr zu einem Anstieg der kognitiven Flexibilität um durchschnittlich 23% führt. Betroffene Kinder zeigen zudem eine höhere soziale Kompetenz und bessere Problemlösefähigkeiten.",
          ar: "التحليل التلقي لـ 200 دراسة يظهر أن تعليم اللغة من سن الثالثة يؤدي إلى زيادة المرونة المعرفية بنسبة 23% في المتوسط. تظهر الأطفال المعنيين أيضاً كفاءة اجتماعية أعلى وقدرات حل مشكلة أفضل.",
          question: "Um wie viel Prozent steigt die kognitive Flexibilität?",
          questionAr: "بكم تنخفض المرونة المعرفية؟",
          options: ["20%", "23%", "30%", "15%"],
          correct: 1
        }
      ]
    }
  }
};

/* --------------------------------------------------------------------------
   Schreiben (Writing) — 3 Teils
   Teil 1: Formelle E-Mail / Brief (Formal email/letter)
   Teil 2: Forum / Chat (Informal post/chat)
   Teil 3: Blogbeitrag / Aufsatz (Blog post/essay)
   -------------------------------------------------------------------------- */

export const SCHREIBEN = {
  A1: {
    teil1: {
      title: "Teil 1: Formelle Nachricht",
      titleAr: "الجزء 1: رسالة رسمية",
      instruction: "Schreiben Sie eine kurze formelle Nachricht (30-40 Wörter).",
      instructionAr: "اكتب رسالة رسمية قصيرة (30-40 كلمة).",
      timeLimit: 300,
      tasks: [
        {
          prompt: "Schreiben Sie eine E-Mail an Ihren Vermieter. Fragen Sie, ob die Miete im Preis inbegriffen ist.",
          promptAr: "اكتب بريداً إلكترونياً لمشرف العقار. اسأل إذا كان الإيجار مشمولاً في السعر.",
          modelAnswer: "Sehr geehrter Herr Müller, ich hätte eine Frage zur Miete. Ist das Internet im Preis inbegriffen? Mit freundlichen Grüßen, Ahmad.",
          template: "Sehr geehrte/r [Name],\n\nich hätte eine Frage zu [Thema]. [Frage]?\n\nMit freundlichen Grüßen,\n[Name]",
          wordCount: "30-40",
          rubric: ["_formal_greeting", "clear_question", "formal_closing"]
        }
      ]
    },
    teil2: {
      title: "Teil 2: Informelle Nachricht",
      titleAr: "الجزء 2: رسالة غير رسمية",
      instruction: "Schreiben Sie eine kurze informelle Nachricht an einen Freund (30-40 Wörter).",
      instructionAr: "اكتب رسالة غير رسمية قصيرة لصديق (30-40 كلمة).",
      timeLimit: 300,
      tasks: [
        {
          prompt: "Schreiben Sie an einen Freund und laden Sie ihn zum Essen ein.",
          promptAr: "اكتب لصديق وادعه لتناول الطعام.",
          modelAnswer: "Hallo Sami! Hast du morgen Abend Zeit? Wir möchten ins neue Restaurant gehen. Lass mich wissen! LG, Fatima",
          template: "Hallo [Name]!\n\n[Anlass]. [Details]. Schreib mir!\n\nLG,\n[Name]",
          wordCount: "30-40",
          rubric: ["informal_greeting", "invitation", "informal_closing"]
        }
      ]
    },
    teil3: {
      title: "Teil 3: Kurzer Aufsatz",
      titleAr: "الجزء 3: مقال قصير",
      instruction: "Schreiben Sie einen kurzen Aufsatz über Ihren Alltag (40-50 Wörter).",
      instructionAr: "اكتب مقالاً قصيراً عن يومك المعتاد (40-50 كلمة).",
      timeLimit: 300,
      tasks: [
        {
          prompt: "Beschreiben Sie Ihren typischen Tag.",
          promptAr: "صف يومك المعتاد.",
          modelAnswer: "Ich stehe um sieben Uhr auf. Zum Frühstück esse ich Brot mit Käse. Dann fahre ich mit dem Bus zur Arbeit. Am Abend lerne ich Deutsch.",
          template: "Ich stehe um [Uhrzeit] auf. [Tätigkeit]. Dann [nächste Tätigkeit]. Am Abend [Tätigkeit].",
          wordCount: "40-50",
          rubric: ["time_expressions", "daily_routine", "basic_structure"]
        }
      ]
    }
  },
  A2: {
    teil1: {
      title: "Teil 1: Formelle Nachricht",
      titleAr: "الجزء 1: رسالة رسمية",
      instruction: "Schreiben Sie eine formelle Nachricht (50-60 Wörter).",
      instructionAr: "اكتب رسالة رسمية (50-60 كلمة).",
      timeLimit: 420,
      tasks: [
        {
          prompt: "Schreiben Sie eine E-Mail an Ihren Chef. Bitten Sie um einen freien Tag am Freitag.",
          promptAr: "اكتب بريداً إلكترونياً لمديرك. اطلب يوم إجازة يوم الجمعة.",
          modelAnswer: "Sehr geehrter Herr Schmidt, ich möchte Sie höflich bitten, mir am Freitag einen freien Tag zu geben. Ich habe einen wichtigen persönlichen Termin. Ich werde alle Aufgaben vorher erledigen. Vielen Dank im Voraus. Mit freundlichen Grüßen, Omar.",
          template: "Sehr geehrte/r [Name],\n\nich möchte Sie höflich bitten, [Anliegen]. [Begründung]. [Zusicherung].\n\nVielen Dank im Voraus.\n\nMit freundlichen Grüßen,\n[Name]",
          wordCount: "50-60",
          rubric: ["formal_greeting", "polite_request", "justification", "formal_closing"]
        }
      ]
    },
    teil2: {
      title: "Teil 2: Informelle Nachricht",
      titleAr: "الجزء 2: رسالة غير رسمية",
      instruction: "Schreiben Sie eine informelle Nachricht (50-60 Wörter).",
      instructionAr: "اكتب رسالة غير رسمية (50-60 كلمة).",
      timeLimit: 420,
      tasks: [
        {
          prompt: "Erzählen Sie einem Freund von Ihrem Urlaub.",
          promptAr: "حدث صديقاً عن إجازتك.",
          modelAnswer: "Hallo Leila! Ich war letzte Woche in Istanbul. Die Stadt ist wunderschön! Ich habe viele leckere Sachen gegessen und die Moscheen besucht. Nächstes Mal kommst du mit! LG, Youssef",
          template: "Hallo [Name]!\n\nIch war [Zeitraum] in [Ort]. [Beschreibung]. [Einladung/Ausblick]!\n\nLG,\n[Name]",
          wordCount: "50-60",
          rubric: ["informal_greeting", "past_tense", "description", "personal_touch"]
        }
      ]
    },
    teil3: {
      title: "Teil 3: Aufsatz",
      titleAr: "الجزء 3: مقال",
      instruction: "Schreiben Sie einen Aufsatz über Ihre Hobbys (60-80 Wörter).",
      instructionAr: "اكتب مقالاً عن هواياتك (60-80 كلمة).",
      timeLimit: 480,
      tasks: [
        {
          prompt: "Was sind Ihre Hobbys? Warum machen Sie das gern?",
          promptAr: "ما هي هواياتك؟ لماذا تحب أن تفعل ذلك؟",
          modelAnswer: "Meine Hobbys sind Lesen und Kochen. Ich lese gern Krimis, weil sie spannend sind. Am Wochenende koche ich gerne arabische Gerichte für meine Familie. Manchmal gehe ich auch joggen, um fit zu bleiben. Hobbys sind wichtig für die Erholung.",
          template: "Meine Hobbys sind [Hobby 1] und [Hobby 2]. Ich [Hobby 1] gern, weil [Grund]. Am [Zeitraum] [Aktivität]. [Zusatz]. [Fazit].",
          wordCount: "60-80",
          rubric: ["hobby_description", "reasons", "time_expressions", "conclusion"]
        }
      ]
    }
  },
  B1: {
    teil1: {
      title: "Teil 1: Formelle Nachricht",
      titleAr: "الجزء 1: رسالة رسمية",
      instruction: "Schreiben Sie eine formelle Bewerbung oder Beschwerde (80-100 Wörter).",
      instructionAr: "اكتب رسالة تقديم عمل أو شكوى رسمية (80-100 كلمة).",
      timeLimit: 600,
      tasks: [
        {
          prompt: "Schreiben Sie eine Bewerbung um eine Praktikumsstelle in einem IT-Unternehmen.",
          promptAr: "اكتب طلب توظيف لفرصة تدريب في شركة تكنولوجيا.",
          modelAnswer: "Sehr geehrte Damen und Herren, hiermit bewerbe ich mich um die Position als Praktikant in der Abteilung für Softwareentwicklung. Ich studiere Informatik an der Universität Tunesien und habe Erfahrung in Python und JavaScript. Besonders interessiert mich Ihre Arbeit an innovativen KI-Projekten. Das Praktikum würde meine praktischen Fähigkeiten erweitern und mir wertvolle Einblicke in die deutsche IT-Branche geben. Ich bin ab Juli verfügbar und sehr motiviert. Ich freue mich auf Ihre Rückmeldung.\n\nMit freundlichen Grüßen,\nNadia Ben Ali",
          template: "Sehr geehrte Damen und Herren,\n\n[Bewerbung um Stelle]. [Qualifikationen]. [Motivation]. [Verfügbarkeit]. [Schlussformel].\n\nMit freundlichen Grüßen,\n[Name]",
          wordCount: "80-100",
          rubric: ["formal_structure", "qualifications", "motivation", "availability", "professional_tone"]
        }
      ]
    },
    teil2: {
      title: "Teil 2: Informelle Nachricht",
      titleAr: "الجزء 2: رسالة غير رسمية",
      instruction: "Schreiben Sie eine Nachricht im Forum oder Chat (80-100 Wörter).",
      instructionAr: "اكتب رسالة في المنتدى أو الدردشة (80-100 كلمة).",
      timeLimit: 600,
      tasks: [
        {
          prompt: "Schreiben Sie einen Beitrag in einem Forum: Was ist eure Meinung zum Thema Online-Bildung?",
          promptAr: "اكتب مشاركة في منتدى: ما رأيكم في التعليم عبر الإنترنت؟",
          modelAnswer: "Hallo zusammen! Ich finde Online-Bildung super, weil man von zu Hause lernen kann und flexibel ist. Allerdings fehlt der soziale Kontakt mit anderen Schülern. Ich denke, eine Mischung aus Online und Präsenz wäre ideal. Was meint ihr? LG, Sara",
          template: "Hallo zusammen!\n\n[Meinung]. [Begründung]. [Einwand]. [Vorschlag]. [Frage an andere].\n\nLG,\n[Name]",
          wordCount: "80-100",
          rubric: ["opinion", "argumentation", "counterargument", "engagement", "informal_tone"]
        }
      ]
    },
    teil3: {
      title: "Teil 3: Aufsatz",
      titleAr: "الجزء 3: مقال",
      instruction: "Schreiben Sie einen Aufsatz über ein gesellschaftliches Thema (100-120 Wörter).",
      instructionAr: "اكتب مقالاً عن موضوع مجتمعي (100-120 كلمة).",
      timeLimit: 720,
      tasks: [
        {
          prompt: "Ist Sprachenlernen im Zeitalter der Digitalisierung noch wichtig?",
          promptAr: "هل تعلم اللغات لا يزال مهماً في عصر الرقمنة؟",
          modelAnswer: "Sprachenlernen ist auch im digitalen Zeitalter sehr wichtig. Einerseits erleichtern Apps und Übersetzungsprogramme die Kommunikation. Andererseits braucht man echte Sprachkenntnisse, um Kultur zu verstehen und Beziehungen aufzubauen. Außerdem fördert das Lernen neuer Sprachen die kognitive Entwicklung. Meiner Meinung nach sollten Schulen mehr Wert auf praktische Sprachkompetenzen legen. Digitale Werkzeuge können das Lernen unterstützen, aber nicht ersetzen.",
          template: "[These]. Einerseits [Argument 1]. Andererseits [Argument 2]. Außerdem [Zusatzargument]. Meiner Meinung nach [Schlussfolgerung].",
          wordCount: "100-120",
          rubric: ["thesis", "arguments", "counterarguments", "conclusion", "complex_sentences"]
        }
      ]
    }
  },
  B2: {
    teil1: {
      title: "Teil 1: Formelle Nachricht",
      titleAr: "الجزء 1: رسالة رسمية",
      instruction: "Schreiben Sie einen formellen Brief oder eine Bewerbung (120-150 Wörter).",
      instructionAr: "اكتب رسالة رسمية أو طلب توظيف (120-150 كلمة).",
      timeLimit: 900,
      tasks: [
        {
          prompt: "Schreiben Sie eine Beschwerde an eine Fluggesellschaft wegen einer stornierten Flug.",
          promptAr: "اكتب شكوى لشركة طيران بسبب إلغاء رحلة.",
          modelAnswer: "Sehr geehrte Damen und Herren, am 15. März sollte mein Flug LH 456 von München nach Berlin um 14:00 Uhr stattfinden. Leider wurde der Flug kurz vor Abflug annulliert, ohne dass eine angemessene Erklärung gegeben wurde. Ich musste einen Ersatzflug für 280 Euro selbst buchen und verlor einen wichtigen Geschäftstermin. Gemäß der EU-Verordnung Nr. 261/2004 stehen mir eine Ausgleichszahlung von 250 Euro sowie die Erstattung der Zusatzkosten zu. Ich erwarte Ihre Stellungnahme innerhalb von 14 Tagen.\n\nMit freundlichen Grüßen,\nTariq Al-Fayed\nBuchungsnummer: XY789",
          template: "Sehr geehrte Damen und Herren,\n\n[Sachverhalt]. [Details]. [Rechtsgrundlage]. [Forderung]. [Frist].\n\nMit freundlichen Grüßen,\n[Name]\n[Buchungsnummer]",
          wordCount: "120-150",
          rubric: ["formal_structure", "factual_description", "legal_reference", "clear_demand", "deadline"]
        }
      ]
    },
    teil2: {
      title: "Teil 2: Forum / Blog-Kommentar",
      titleAr: "الجزء 2: منتدى / تعليق مدونة",
      instruction: "Schreiben Sie einen Kommentar in einem Forum oder Blog (120-150 Wörter).",
      instructionAr: "اكتب تعليقاً في منتدى أو مدونة (120-150 كلمة).",
      timeLimit: 900,
      tasks: [
        {
          prompt: "Kommentieren Sie: Menschen verbringen zu viel Zeit mit sozialen Medien. Stimmen Sie zu?",
          promptAr: "علّق على: الأشخاص يقضون وقتاً أكثر من اللازم في وسائل التواصل الاجتماعي. هل توافق؟",
          modelAnswer: "Das Thema ist komplex und differenziert zu betrachten. Einerseits können soziale Medien süchtig machen und das Selbstbild beeinträchtigen. Studien zeigen einen Zusammenhang zwischen übermäßigem Mediennutzung und psychischen Problemen, besonders bei Jugendlichen. Andererseits bieten sie wichtige Möglichkeiten zur Vernetzung und Information. Die Lösung liegt nicht im Verbot, sondern in einem bewussten Umgang. Eltern, Schulen und die Politik sollten gemeinsam Medienkompetenz fördern. Wir sollten die Werkzeuge nutzen, ohne von ihnen beherrscht zu werden.",
          template: "[Einleitung]. Einerseits [negative Aspekte]. Andererseits [positive Aspekte]. [Lösungsansatz]. [Fazit].",
          wordCount: "120-150",
          rubric: ["nuanced_opinion", "argumentation", "evidence", "solution_oriented", "engaging_tone"]
        }
      ]
    },
    teil3: {
      title: "Teil 3: Aufsatz",
      titleAr: "الجزء 3: مقال",
      instruction: "Schreiben Sie einen Aufsatz zu einem komplexen Thema (150-200 Wörter).",
      instructionAr: "اكتب مقالاً عن موضوع معقد (150-200 كلمة).",
      timeLimit: 1080,
      tasks: [
        {
          prompt: "Diskutieren Sie die Chancen und Risiken der künstlichen Intelligenz im Alltag.",
          promptAr: "ناقش فرص ومخاطر الذكاء الاصطناعي في الحياة اليومية.",
          modelAnswer: "Die künstliche Intelligenz revolutioniert unseren Alltag — von Sprachassistenten über autonomes Fahren bis hin zu medizinischen Diagnosen. Ihre Chancen sind enorm: Sie kann repetitive Aufgaben übernehmen, komplexe Muster erkennen und menschliche Fehler reduzieren. Allerdings birgt sie auch erhebliche Risiken. Datenschutz und Privatsphäre sind gefährdet, wenn Algorithmen unsere Daten analysieren. Zudem könnte KI Arbeitsplätze ersetzen und soziale Ungleichheit verstärken. Besonders bedenklich ist die sogenannte Black-Box-Problematik: Wenn Entscheidungen nicht nachvollziehbar sind, verlieren wir Kontrolle. Meines Erachtens brauchen wir klare rechtliche Rahmenbedingungen, die Innovation fördern, aber gleichzeitig Grundrechte schützen. Die Technologie ist weder gut noch böse — entscheidend ist, wie wir sie gestalten.",
          template: "[Einleitung]. Chancen: [Argumente]. Risiken: [Argumente]. Besonders [Hervorhebung]. Meines Erachtens [Position]. [Schlussfolgerung].",
          wordCount: "150-200",
          rubric: ["complex_structure", "balanced_argumentation", "specific_examples", "personal_position", "sophisticated_vocabulary"]
        }
      ]
    }
  },
  C1: {
    teil1: {
      title: "Teil 1: Formelle Korrespondenz",
      titleAr: "الجزء 1: مراسلات رسمية",
      instruction: "Schreiben Sie eine formelle Korrespondenz zu einem komplexen Thema (150-180 Wörter).",
      instructionAr: "اكتب مراسلات رسمية حول موضوع معقد (150-180 كلمة).",
      timeLimit: 1080,
      tasks: [
        {
          prompt: "Schreiben Sie einen offiziellen Brief an eine Behörde wegen eines Verwaltungsproblems.",
          promptAr: "اكتب رسالة رسمية لهيئة إدارية بخصوص مشكلة إدارية.",
          modelAnswer: "Sehr geehrte Damen und Herren, hiermit möchte ich auf ein bestehendes Problem in meiner Nachbarschaft aufmerksam machen. Seit drei Monaten gibt es in der Sonnenstraße erhebliche Verkehrsunruhen. Lautstärke, parkende Fahrzeuge auf dem Bürgersteig und fehlende Überquerungshilfen für Fußgänger stellen eine erhebliche Gefahr dar. Ich habe mich bereits zweimal schriftlich an die zuständige Straßenverkehrsbehörde gewendet, ohne eine befriedigende Lösung. Gemäß § 45 StVO obliegt der Behörde die Verpflichtung, die Verkehrssicherheit zu gewährleisten. Ich bitte Sie dringend um Einleitung konkreter Maßnahmen, wie die Installation von Geschwindigkeitsbegrenzungen und die Schaffung sicherer Fußgängerzonen. Eine schriftliche Bestätigung Eingangs und eine Stellungnahme innerhalb von drei Wochen wäre hilfreich.\n\nMit freundlichen Grüßen,\nDr. Karim Mansour\nBürgerinitiative Sonnenstraße",
          wordCount: "150-180",
          rubric: ["formal_structure", "factual_clarity", "legal_reference", "urgency", "specific_demand"]
        }
      ]
    },
    teil2: {
      title: "Teil 2: Diskussionsbeitrag",
      titleAr: "الجزء 2: مساهمة نقاشية",
      instruction: "Schreiben Sie einen differenzierten Diskussionsbeitrag (150-180 Wörter).",
      instructionAr: "اكتب مساهمة نقاشية متخصصة (150-180 كلمة).",
      timeLimit: 1080,
      tasks: [
        {
          prompt: "Ist die Abschaffung des Aktienstreits gerechtfertigt? Diskutieren Sie.",
          promptAr: "هل تبرر إلغاء عقوبة الإعدام؟ ناقش.",
          modelAnswer: "Die Debatte um die Abschaffung der Todesstrafe berührt fundamentale Fragen der Gerechtigkeit und Menschenwürde. Befürworter argumentieren, dass kein Staat das Recht habe, einem Menschen das Leben zu nehmen. Die Fehlbarkeit Justizsysteme mache jede Vollstreckung unumkehrbar und potenziell ungerecht. Statistiken zeigen zudem, dass die Todesstrafe keine abschreckende Wirkung auf schwere Kriminalität hat. Gegner hingegen betonen die Opferperspektive und das Bedürfnis nach gerechter Strafe. Meines Erachtens überwiegen die humanitären Argumente. Die Abschaffung ist kein Zeichen von Schwäche, sondern von Zivilisationsfortschritt. Allerdings muss alternativ ein wirksames Strafsystem existieren, das der Schwere der Verbrechen gerecht wird.",
          wordCount: "150-180",
          rubric: ["balanced_presentation", "legal_moral_arguments", "evidence_based", "personal_position", "nuanced_language"]
        }
      ]
    },
    teil3: {
      title: "Teil 3: Aufsatz",
      titleAr: "الجزء 3: مقال",
      instruction: "Schreiben Sie einen analytischen Aufsatz (200-250 Wörter).",
      instructionAr: "اكتب مقالاً تحليلياً (200-250 كلمة).",
      timeLimit: 1200,
      tasks: [
        {
          prompt: "Analysieren Sie die Ursachen und Folgen der Digitalisierung auf den Arbeitsmarkt.",
          promptAr: "حلّل أسباب وتأثيرات الرقمنة على سوق العمل.",
          modelAnswer: "Die Digitalisierung transformiert den Arbeitsmarkt fundamental. Als Haupttreiber gelten technologischer Fortschritt, Globalisierung und demographischer Wandel. Routinearbeiten werden zunehmend automatisiert, während neue Berufsfelder wie Datenanalyse und KI-Entwicklung entstehen. Die Folgen sind ambivalent: Einerseits steigt die Produktivität und entstehen flexible Arbeitsformen. Andererseits wächst die soziale Polarisierung — zwischen Hochqualifizierten mit steigenden Einkommen und Geringqualifizierten mit Prekarisierungsrisiken. Besonders betroffen sind Verwaltungs- und Produktionsberufe. Die Herausforderung liegt nicht in der Technologie an sich, sondern in ihrer gesellschaftlichen Gestaltung. Bildungssysteme müssen auf lebenslanges Lernen ausgerichtet werden, und soziale Sicherungssysteme müssen neue Arbeitsformen abbilden. Letztlich决定 Digitalisierung nicht nur, was wir arbeiten, sondern wie wir arbeiten und leben.",
          wordCount: "200-250",
          rubric: ["systematic_analysis", "causal_chains", "balanced_view", "policy_implications", "academic_tone"]
        }
      ]
    }
  },
  C2: {
    teil1: {
      title: "Teil 1: Professionelle Korrespondenz",
      titleAr: "الجزء 1: مراسلات مهنية",
      instruction: "Schreiben Sie eine komplexe formelle Korrespondenz (180-220 Wörter).",
      instructionAr: "اكتب مراسلات رسمية معقدة (180-220 كلمة).",
      timeLimit: 1320,
      tasks: [
        {
          prompt: "Schreiben Sie ein Gutachten zu einem urbanistischen Konflikt.",
          promptAr: "اكتب تقريراً عن صراع عمراني.",
          modelAnswer: "Sehr geehrte Damen und Herren, namens des Planungsbüros erlaube ich mir folgendes Gutachten zur beabsichtigten Neubebauung des Areals am Hauptbahnhof. Die Analyse der städtebaulichen Situation ergibt ein Spannungsfeld zwischen wirtschaftlichen Entwicklungspotentialen und dem Erhalt historischer Substanz. Die vorgeschlagene Hochhausbebauung würde zwar den städtischen Steueraufkommen dienen, jedoch den visuellen Abschluss der historischen Skyline kompromittieren. Meines Erachtens ist eine differenzierte Lösung denkbar, die denkmalgeschützte Fassaden integriert und gleichzeitig eine moderate Aufstockung zulässt. Die Kosten-Nutzen-Rechlung spricht für eine Kompromisslösung, die sowohl dem denkmalpflegerischen Anspruch als auch dem wirtschaftlichen Interesse gerecht wird. Wir empfehlen die Durchführung einer Bürgerbefragung und die Einbindung eines unabhängigen Architekturwettbewerbs als entscheidende nächste Schritte.\n\nMit freundlichen Grüßen,\nProf. Dr. Lena Hoffmann\nPlanungsbüro Hoffmann & Partner",
          wordCount: "180-220",
          rubric: ["professional_expertise", "balanced_assessment", "specific_recommendations", "formal_register", "analytical_depth"]
        }
      ]
    },
    teil2: {
      title: "Teil 2: Öffentlicher Diskussionsbeitrag",
      titleAr: "الجزء 2: مساهمة نقاشية عامة",
      instruction: "Schreiben Sie einen differenzierten Beitrag zur öffentlichen Debatte (180-220 Wörter).",
      instructionAr: "اكتب مساهمة متخصصة في النقاش العام (180-220 كلمة).",
      timeLimit: 1320,
      tasks: [
        {
          prompt: "Ist Wachstum die Lösung oder das Problem? Diskutieren Sie die Postwachstumsdebatte.",
          promptAr: "هل النمو هو الحل أم المشكلة؟ ناقش نقاش ما بعد النمو.",
          modelAnswer: "Die Postwachstumsdebatte hinterfragt das Paradigma endlosen Wirtschaftswachstums. Befürworter argumentieren, dass planetare Grenzen eine unbegrenzte Ausdehnung unmöglich machen. Ressourcenerschöpfung, Biodiversitätsverlust und Klimawandel zwingen zu einer Neubewertung. Wachstum verteile Wohlstand ungleich und erzeuge Scheinproduktivität. Kritiker entgegnen, dass ohne Wachstum soziale Sicherungssysteme kollabieren und Innovationsspielräume schrumpfen. Meines Erachtens liegt die Wahrheit in der Differentiation: nicht Verzicht, sondern intelligente Reduktion ist gefordert. Kreislaufwirtschaft, qualitative Wohlstandsmessungen und soziale Innovationen können Wohlstand ohne materielles Wachstum generieren. Der Paradigmenwechsel erfordert politischen Mut, neue Kennzahlen jenseits des BIP und eine aktive Gestaltung sozial-ökologischer Transformationsprozesse. Letztlich geht es nicht um Wachstum contra Schrumpfung, sondern um die Frage, wie wir gut leben wollen.",
          wordCount: "180-220",
          rubric: ["paradigm_critique", "balanced_arguments", "alternative_vision", "policy_proposals", "philosophical_depth"]
        }
      ]
    },
    teil3: {
      title: "Teil 3: Wissenschaftlicher Aufsatz",
      titleAr: "الجزء 3: مقال علمي",
      instruction: "Schreiben Sie einen wissenschaftlichen Aufsatz (250-300 Wörter).",
      instructionAr: "اكتب مقالاً علمياً (250-300 كلمة).",
      timeLimit: 1500,
      tasks: [
        {
          prompt: "Analysieren Sie: Bildung als Schlüssel zur gesellschaftlichen Teilhabe.",
          promptAr: "حلّل: التعليم كمفتاح للمشاركة المجتمعية.",
          modelAnswer: "Bildung fungiert als Schlüsselvariable gesellschaftlicher Teilhabe und sozialer Mobilität. Der Zusammenhang zwischen Bildungsabschluss, Erwerbseinkommen und gesellschaftlicher Partizipation ist empirisch gut belegt. Allerdings reproduziert das Bildungssystem bestehende Ungleichheiten, anstatt sie aufzulösen. Sozioökonomischer Hintergrund, kulturelles Kapital und institutionelle Rahmenbedingungen bestimmen den Bildungserfolg maßgeblich. Kritische Pädagogik argumentiert, dass Schule nicht neutral ist, sondern hegemoniale Strukturen vermittelt. Empirische Studien zeigen, dass frühkindliche Bildungsangebote soziale Benachteiligungen kompensieren können — allerdings nur bei qualitativ hochwertiger und flächendeckender Implementation. Meines Erachtens erfordert eine gerechte Bildungspolitik dreierlei: erstens eine bedarfsgerechte Finanzierung, zweitens die Anerkennung diverser Bildungsbiografien und drittens die Stärkung kritischer Medienkompetenz als demokratische Schlüsselkompetenz. Bildung ist nicht nur individuelle Investition, sondern gesellschaftliche Notwendigkeit.",
          wordCount: "250-300",
          rubric: ["empirical_grounding", "theoretical_framing", "critical_analysis", "policy_implications", "academic_register"]
        }
      ]
    }
  }
};

/* --------------------------------------------------------------------------
   OSD Grading — Niveaustufe levels
   -------------------------------------------------------------------------- */

export const OSD_GRADING = [
  { level: "A1", minPercent: 60, label: "Grundstufe 1", labelAr: "المستوى الأساسي 1" },
  { level: "A2", minPercent: 70, label: "Grundstufe 2", labelAr: "المستوى الأساسي 2" },
  { level: "B1", minPercent: 70, label: "Mittelstufe 1", labelAr: "المستوى المتوسط 1" },
  { level: "B2", minPercent: 70, label: "Mittelstufe 2", labelAr: "المستوى المتوسط 2" },
  { level: "C1", minPercent: 70, label: "Oberstufe", labelAr: "المستوى العالي" },
  { level: "C2", minPercent: 75, label: "Meisterniveau", labelAr: "مستوى الإتقان" }
];

export function getOSDGrade(percent) {
  for (let i = OSD_GRADING.length - 1; i >= 0; i--) {
    if (percent >= OSD_GRADING[i].minPercent) return OSD_GRADING[i];
  }
  return { level: "N/A", minPercent: 0, label: "Nicht bestanden", labelAr: "لم يجتز" };
}

export function getModuleScore(correct, total) {
  return total > 0 ? Math.round((correct / total) * 100) : 0;
}

/* --------------------------------------------------------------------------
   Helper: Get OSD data for a level and module
   -------------------------------------------------------------------------- */

export function getOSDData(level, moduleId) {
  const data = { sprechen: SPRECHEN, hören: HÖREN, lesen: LESEN, schreiben: SCHREIBEN };
  return data[moduleId]?.[level] || null;
}
