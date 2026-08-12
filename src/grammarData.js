/* ==========================================================================
   Grammar Drills Data — All levels
   ========================================================================== */

export const GRAMMAR_DRILLS = {
  A1: [
    { type: "article", de: "___ Mann ist groß.", ar: "الرجل طويل.", options: ["der", "die", "das", "ein"], correct: 0, explanation: "Mann مذكر → der" },
    { type: "article", de: "___ Frau arbeitet.", ar: "المرأة تعمل.", options: ["der", "die", "das", "eine"], correct: 1, explanation: "Frau مؤنث → die" },
    { type: "article", de: "___ Kind spielt.", ar: "الطفل يلعب.", options: ["der", "die", "das", "ein"], correct: 2, explanation: "Kind محايد → das" },
    { type: "verb", de: "Ich ___ Deutsch.", ar: "أنا أتعلم الألمانية.", options: ["lernt", "lerne", "lernen", "lernst"], correct: 1, explanation: "ich → lerne (بدون n)" },
    { type: "verb", de: "Du ___ hast.", ar: "أنت تأكل.", options: ["esse", "isst", "isst", "essen"], correct: 1, explanation: "du → isst (مع s)" },
    { type: "sentence", de: "Ich ___ heute nicht zur Arbeit.", ar: "أنا لا أذهب للعمل اليوم.", options: ["gehe", "gehst", "geht", "gehen"], correct: 0, explanation: "ich → gehe" },
    { type: "negation", de: "Das ist ___ Buch.", ar: "هذا ليس كتاباً.", options: ["ein", "kein", "nicht", "keine"], correct: 1, explanation: "negation مع ein → kein" },
    { type: "plural", de: "Die ___ sind groß.", ar: "الأطفال كبيرون.", options: ["Kind", "Kinder", "Kinds", "Kinde"], correct: 1, explanation: "plural Kinder" },
    { type: "preposition", de: "___ gehe ich zur Schule.", ar: "أذهب للمدرسة بالحافلة.", options: ["Mit", "An", "Auf", "In"], correct: 0, explanation: "mit dem Bus" },
    { type: "modal", de: "Ich ___ schwimmen.", ar: "أريد أن أسبح.", options: ["will", "willst", "will", "wollen"], correct: 0, explanation: "ich → will" }
  ],
  A2: [
    { type: "perfekt", de: "Ich ___ gestern gefrühstückt.", ar: "أنا أكلت فطوراً بالأمس.", options: ["habe", "hat", "hast", "haben"], correct: 0, explanation: "ich → habe" },
    { type: "perfekt", de: "Er ___ nach Hause gegangen.", ar: "ذهب إلى المنزل.", options: ["hat", "ist", "hatte", "war"], correct: 1, explanation: "gehen → sein" },
    { type: "separable", de: "Ich ___ um 7 Uhr ___.", ar: "أستيقظ الساعة السابعة.", options: ["stehen...auf", "aufstehen", "stehe...auf", "auf...stehe"], correct: 2, explanation: "stehe...auf (Feld 2 + Ende)" },
    { type: "modal", de: "Ich ___ morgen arbeiten.", ar: "يجب أن أعمل غداً.", options: ["muss", "muss", "müssen", "musst"], correct: 0, explanation: "ich → muss" },
    { type: "dative", de: "Ich gebe ___ Mann das Buch.", ar: "أعطي الرجل الكتاب.", options: ["der", "dem", "den", "des"], correct: 1, explanation: "Dativ → dem" },
    { type: "accusative", de: "Ich sehe ___ Frau.", ar: "أرى المرأة.", options: ["der", "die", "dem", "den"], correct: 1, explanation: "Akkusativ → die (مؤنث)" },
    { type: "comparative", de: "Das ist ___ als das.", ar: "هذا أفضل من ذاك.", options: ["gut", "besser", "beste", "gut"], correct: 1, explanation: "gut → besser (comparative)" },
    { type: "preposition", de: "Ich wohne ___ Berlin.", ar: "أسكن في برلين.", options: ["in", "an", "auf", "bei"], correct: 0, explanation: "in + Dativ (locative)" },
    { type: "adjective", de: "Das ist ein ___ Tag.", ar: "هذا يوم جميل.", options: ["schöner", "schöne", "schönes", "schön"], correct: 2, explanation: "das → schönes (neutral)" },
    { type: "past", de: "Gestern ___ ich müde.", ar: "أمس كنت متعباً.", options: ["bin", "war", "habe", "hatte"], correct: 1, explanation: "Präteritum: sein → war" }
  ],
  B1: [
    { type: "konjunktion", de: "Ich lerne Deutsch, ___ ich in Deutschland arbeiten will.", ar: "أتعلم الألمانية لأنني أريد العمل في ألمانيا.", options: ["weil", "dass", "aber", "und"], correct: 0, explanation: "weil (سبب)" },
    { type: "konjunktion", de: "Er sagt, ___ er morgen kommt.", ar: "يقول إنه سيأتي غداً.", options: ["weil", "dass", "obwohl", "wenn"], correct: 1, explanation: "dass (نقل)" },
    { type: "passiv", de: "Das Haus ___ gebaut.", ar: "يُبنى البيت.", options: ["wird", "ist", "hat", "war"], correct: 0, explanation: "Passiv: werden + Partizip" },
    { type: "relativ", de: "Der Mann, ___ spricht, ist nett.", ar: "الرجل الذي يتحدث لطيف.", options: ["der", "den", "dem", "das"], correct: 0, explanation: "Nominativ → der" },
    { type: "konj2", de: "Wenn ich Zeit ___, würde ich kommen.", ar: "لو كان لدي وقت لجئت.", options: ["habe", "hätte", "hatte", "habe"], correct: 1, explanation: "Konjunktiv II: hätte" },
    { type: "nebensatz", de: "Ich weiß, ___ er kommt.", ar: "أعرف أنه سيأتي.", options: ["dass", "weil", "wenn", "ob"], correct: 0, explanation: "dass (Nebensatz)" },
    { type: "partizip", de: "Das ___ Buch ist interessant.", ar: "الكتاب المقروء مثير للاهتمام.", options: ["gelesen", "lesende", "gelesene", "lesen"], correct: 0, explanation: "Partizip II: gelesen" },
    { type: "preposition", de: "Ich freue mich ___ dich.", ar: "يسعدني لقاءك.", options: ["auf", "über", "für", "mit"], correct: 1, explanation: "sich freuen über (+ Akk)" },
    { type: "conditional", de: "___ ich reich wäre, würde ich reisen.", ar: "لو كنت غنياً لسافرت.", options: ["Wenn", "Ob", "Weil", "Dass"], correct: 0, explanation: "Wenn (Bedingung)" },
    { type: "infinitive", de: "Ich möchte ___ lernen.", ar: "أريد تعلم السباحة.", options: ["schwimmen", "schwimmt", "schwimmst", "schwimmt"], correct: 0, explanation: "möchten + Infinitiv" }
  ],
  B2: [
    { type: "passiv", de: "Das Projekt ___ von vielen Menschen unterstützt.", ar: "يدعمه كثير من الناس.", options: ["wird", "ist", "wurde", "hat"], correct: 0, explanation: "Passiv Präsens: wird" },
    { type: "konj2", de: "Er ___ gern nach Japan fliegen.", ar: "يود السفر إلى اليابان.", options: ["würde", "wurde", "will", "wollte"], correct: 0, explanation: "würde + Infinitiv" },
    { type: "relativ", de: "Das Buch, ___ ich gelesen habe, ist gut.", ar: "الكتاب الذي قرأته جيد.", options: ["das", "der", "die", "den"], correct: 0, explanation: "Akkusativ neutral → das" },
    { type: "nomen", de: "Das ___ ist wichtig.", ar: "القراءة مهمة.", options: ["Lesen", "lesen", "gelesen", "lesend"], correct: 0, explanation: "Nominalisierung: das Lesen" },
    { type: "konjunktiv", de: "Er sagt, er ___ müde.", ar: "يقول إنه متعب.", options: ["sei", "ist", "war", "sein"], correct: 0, explanation: "Konjunktiv I: sei" },
    { type: "partizip", de: "Die ___ Frau arbeitet hier.", ar: "المرأة المدرسة تعمل هنا.", options: ["unterrichtende", "unterrichtete", "unterrichtete", "unterrichtet"], correct: 0, explanation: "Partizip I: unterrichtende" },
    { type: "preposition", de: "Trotz ___ gehen wir spazieren.", ar: "رغم المطر نذهب للتنزه.", options: ["dem Regen", "des Regens", "den Regen", "der Regen"], correct: 1, explanation: "trotz + Genitiv" },
    { type: "comparative", de: "Je ___ man lernt, desto besser wird man.", ar: "كلما تعلمت أكثر أصبحت أفضل.", options: ["mehr", "mehr", "viel", "meiste"], correct: 0, explanation: "je...desto + comparative" },
    { type: "nebensatz", de: "Obwohl er müde ___, ging er zur Arbeit.", ar: "رغم أنه كان متعباً، ذهب للعمل.", options: ["war", "ist", "sei", "wäre"], correct: 0, explanation: "obwohl + Indikativ" },
    { type: "infinitive", de: "Er ist zum Arzt ___ .", ar: "ذهب إلى الطبيب.", options: ["gegangen", "gehen", "gehend", "ging"], correct: 0, explanation: "Perfekt: ist gegangen" }
  ],
  C1: [
    { type: "konjunktiv", de: "Er sagt, er ___ krank.", ar: "يقول إنه مريض.", options: ["sei", "ist", "war", "wäre"], correct: 0, explanation: "Konjunktiv I: sei (نقل)" },
    { type: "passiv", de: "Die Stadt ___ von Touristen besucht.", ar: "تزرعها السياح.", options: ["wird", "ist", "wurde", "hat"], correct: 0, explanation: "Passiv Präsens" },
    { type: "nominal", de: "Das ___ des Projekts ist schwierig.", ar: "تنفيذ المشروع صعب.", options: ["Durchführen", "Durchführung", "durchgeführt", "durchführende"], correct: 1, explanation: "Nominalisierung: die Durchführung" },
    { type: "konj2", de: "___ ich das gewusst hätte, hätte ich anders gehandelt.", ar: "لو كنت أعرف ذلك لhandlingت بشكل مختلف.", options: ["Hätte", "Habe", "Wäre", "Würde"], correct: 0, explanation: "Hätte (past Konjunktiv II)" },
    { type: "relativ", de: "Der Grund, ___ er kam, ist unbekannt.", ar: "السبب الذي من أجله جاء غير معروف.", options: ["wegen dessen", "wegen der", "wegen das", "wegen dem"], correct: 0, explanation: "Genitiv: dessen" },
    { type: "preposition", de: "Er handelt ___ seinen Überzeugungen.", ar: "هو ي行动 وفقاً لقناعاته.", options: ["gemäß", "trotz", "wegen", "statt"], correct: 0, explanation: "gemäß + Dativ" },
    { type: "nebensatz", de: "___ er kommt, werde ich kommen.", ar: "إذا جاء سأأتي.", options: ["Sollte", "Wenn", "Falls", "Beide"], correct: 3, explanation: "Sollte/Wenn/Falls كلها صحيحة" },
    { type: "partizip", de: "Die ___ Ergebnisse überraschten alle.", ar: "النتائج المثيرة فاجأت الجميع.", options: ["überraschenden", "überraschte", "überrascht", "überraschende"], correct: 0, explanation: "Partizip I: überraschenden" },
    { type: "stil", de: "Die Maßnahme ist durchaus ___.", ar: "الإجراء مبرر تماماً.", options: ["berechtigt", "berechtigend", "berechtigte", "berechtigen"], correct: 0, explanation: "Partizip II als Adjektiv" },
    { type: "konjunktion", de: "Er kommt nicht, ___ er krank ist.", ar: "لا يأتي لأنه مريض.", options: ["weil", "dass", "obwohl", "trotzdem"], correct: 0, explanation: "weil (Grund)" }
  ],
  C2: [
    { type: "konjunktiv", de: "Man sagt, er ___ sehr reich.", ar: "يقال إنه غني جداً.", options: ["sei", "ist", "wäre", "waren"], correct: 0, explanation: "Konjunktiv I für Hörensagen" },
    { type: "passiv", de: "Die Theorie ___ von Experten akzeptiert.", ar: "تقبلها الخبراء.", options: ["wird", "ist", "wurde", "worden"], correct: 0, explanation: "Passiv Präsens" },
    { type: "nominal", de: "Die ___ der Daten ist komplex.", ar: "تحليل البيانات معقد.", options: ["Analysieren", "Analyse", "analysieren", "analysiert"], correct: 1, explanation: "die Analyse" },
    { type: "konj2", de: "Hätte ich das ___, wäre ich nicht gegangen.", ar: "لو كنت أعرف ذلك ما ذهبت.", options: ["gewusst", "wissen", "wüsste", "gewusst"], correct: 0, explanation: "Partizip II: gewusst" },
    { type: "relativ", de: "Der Umstand, ___ er nicht kam, ist seltsam.", ar: "ال fact الذي لم يأتِ غريب.", options: ["dass er", "unter dem", "über den", "wegen dessen"], correct: 0, explanation: "dass-Satz als Relativsatz" },
    { type: "preposition", de: "___ seines Alters ist er noch aktiv.", ar: "بسبب عمره لا يزال نشطاً.", options: ["Trotz", "Wegen", "Bei", "Nach"], correct: 1, explanation: "wegen + Genitiv" },
    { type: "stil", de: "Die Frage ist durchaus ___.", ar: "السؤال معقد تماماً.", options: ["vielschichtig", "vielschichtige", "vielschichtiges", "vielschichtigen"], correct: 0, explanation: "Adjektiv nach sein" },
    { type: "nebensatz", de: "Er hätte kommen ___, aber er war krank.", ar: "كان يمكنه أن يأتي لكنه كان مريضاً.", options: ["sollen", "sollte", "soll", "wollen"], correct: 0, explanation: "Infinitiv mit zu" },
    { type: "partizip", de: "Die ___ Ergebnisse wurden veröffentlicht.", ar: "النتائج المنشورة.", options: ["veröffentlichten", "veröffentlichenden", "veröffentlichte", "veröffentlicht"], correct: 0, explanation: "Partizip II als Adjektiv" },
    { type: "komplex", de: "___ er nicht gekommen wäre, hätte ich nichts gewusst.", ar: "لو لم يأَتِ لما كنت أعرف شيئاً.", options: ["Wenn", "Hätte", "Wäre", "Sollte"], correct: 0, explanation: "Wenn + Konjunktiv II" }
  ]
};

export const GRAMMAR_TIPS = {
  article: "أداة التعريف: der (مذكر) / die (مؤنث) / das (محايد)",
  verb: "تصريف الفعل يعتمد على الضمير",
  sentence: "ترتيب الجملة: الفعل في الموضع الثاني",
  negation: "negation: nicht (نفي الفعل) / kein (نفي الاسم)",
  plural: "الجمع يختلف حسب الاسم",
  preposition: "حروف الجر تحدد الحالة (Akkusativ/Dativ)",
  modal: "الأفعال المساعدة تأتي مع الفعل الأساسي في النهاية",
  perfekt: "الماضي: haben/sein + Partizip II",
  separable: "الفعل المنفصل ينفصل في المضارع",
  comparative: "المقارنة: -er / am + superlativ",
  dative: "Dativ: dem (مذكر) / der (مؤنث) / dem (محايد)",
  accusative: "Akkusativ: den (مذكر) / die (مؤنث) / das (محايد)",
  adjective: "الصفات تتغير حسب النوع والعدد والحالة",
  konjunktion: "روابط الجمل: weil / dass / obwohl / wenn",
  passiv: "المبني للمجهول: werden + Partizip II",
  relativ: "الجمل الموصولة: der/die/das + جملة",
  konj2: "صيغة الشرط: würde + Infinitiv",
  nebensatz: "الجملة الثانوية: الفعل في النهاية",
  partizip: "التصريف الثالث: ge- + endings",
  infinitive: "المصدر: بدون زوايا",
  nomen: "تحويل الفعل إلى اسم: das + Infinitiv",
  nominal: "تحويل الجملة إلى مركب اسمي",
  stil: "الأسلوب الراقي: صيغ مركبة"
};
