import { readFileSync, appendFileSync } from 'fs';
const f = 'C:/Users/Adem/OneDrive/Bureau/workspace/src/proData.js';
const lines = [];

// 3. HEAR_TYPE_SENTENCES
const hearType = {
  A1: [
    {de:"Hallo, wie geht es Ihnen?",ar:"مرحباً، كيف حالك؟",level:"A1",difficulty:"easy"},
    {de:"Ich heiße Anna.",ar:"اسمي آنا.",level:"A1",difficulty:"easy"},
    {de:"Wo wohnen Sie?",ar:"أين تسكن؟",level:"A1",difficulty:"easy"},
    {de:"Ich bin aus Deutschland.",ar:"أنا من ألمانيا.",level:"A1",difficulty:"easy"},
    {de:"Danke schön!",ar:"شكراً جزيلاً!",level:"A1",difficulty:"easy"},
    {de:"Bitte sehr.",ar:"عفواً.",level:"A1",difficulty:"easy"},
    {de:"Wie viel kostet das?",ar:"كم يكلف هذا؟",level:"A1",difficulty:"medium"},
    {de:"Ich möchte einen Kaffee.",ar:"أريد قهوة.",level:"A1",difficulty:"medium"},
    {de:"Wo ist die Toilette?",ar:"أين الحمام؟",level:"A1",difficulty:"medium"},
    {de:"Ich verstehe das nicht.",ar:"لا أفهم هذا.",level:"A1",difficulty:"medium"},
    {de:"Können Sie mir helfen?",ar:"هل يمكنك مساعدتي؟",level:"A1",difficulty:"medium"},
    {de:"Ich spreche ein bisschen Deutsch.",ar:"أتحدث الألمانية قليلاً.",level:"A1",difficulty:"medium"},
    {de:"Das ist sehr gut.",ar:"هذا جيد جداً.",level:"A1",difficulty:"easy"},
    {de:"Ich habe Hunger.",ar:"أنا جائع.",level:"A1",difficulty:"easy"},
    {de:"Es tut mir leid.",ar:"أعتذر.",level:"A1",difficulty:"medium"},
    {de:"Wie spät ist es?",ar:"كم الساعة؟",level:"A1",difficulty:"medium"},
    {de:"Ich bin müde.",ar:"أنا متعب.",level:"A1",difficulty:"easy"},
    {de:"Das Wetter ist schön.",ar:"الطقس جميل.",level:"A1",difficulty:"medium"},
    {de:"Ich brauche Hilfe.",ar:"أحتاج مساعدة.",level:"A1",difficulty:"easy"},
    {de:"Bis morgen!",ar:"إلى الغد!",level:"A1",difficulty:"easy"}
  ],
  A2: [
    {de:"Ich habe eine Frage.",ar:"لدي سؤال.",level:"A2",difficulty:"easy"},
    {de:"Können Sie das bitte wiederholen?",ar:"هل يمكنك تكرار ذلك؟",level:"A2",difficulty:"medium"},
    {de:"Ich bin einverstanden.",ar:"أنا موافق.",level:"A2",difficulty:"medium"},
    {de:"Das macht Sinn.",ar:"هذا منطقي.",level:"A2",difficulty:"medium"},
    {de:"Ich habe vergessen.",ar:"نسيت.",level:"A2",difficulty:"easy"},
    {de:"Können wir uns morgen treffen?",ar:"هل يمكننا اللقاء غداً؟",level:"A2",difficulty:"medium"},
    {de:"Ich habe eine Idee.",ar:"لدي فكرة.",level:"A2",difficulty:"easy"},
    {de:"Das ist eine gute Lösung.",ar:"هذا حلاً جيداً.",level:"A2",difficulty:"medium"},
    {de:"Ich freue mich darauf.",ar:"أنا متحمس له.",level:"A2",difficulty:"medium"},
    {de:"Wie war dein Wochenende?",ar:"كيف كان عطلتك؟",level:"A2",difficulty:"medium"},
    {de:"Ich brauche mehr Zeit.",ar:"أحتاج وقتاً أكثر.",level:"A2",difficulty:"medium"},
    {de:"Das ist mir egal.",ar:"هذا لا يهمني.",level:"A2",difficulty:"medium"},
    {de:"Ich bin damit einverstanden.",ar:"أنا موافق على ذلك.",level:"A2",difficulty:"medium"},
    {de:"Kann ich das haben?",ar:"هل يمكنني الحصول على ذلك؟",level:"A2",difficulty:"medium"},
    {de:"Ich bin nicht sicher.",ar:"لست متأكداً.",level:"A2",difficulty:"easy"},
    {de:"Das ist schwierig.",ar:"هذا صعب.",level:"A2",difficulty:"easy"},
    {de:"Ich habe Angst.",ar:"أنا خائف.",level:"A2",difficulty:"easy"},
    {de:"Können wir das ändern?",ar:"هل يمكننا تغيير ذلك؟",level:"A2",difficulty:"medium"},
    {de:"Ich habe Lust darauf.",ar:"أنا متحمس لذلك.",level:"A2",difficulty:"medium"},
    {de:"Das ist toll!",ar:"هذا رائع!",level:"A2",difficulty:"easy"}
  ],
  B1: [
    {de:"Ich bin der Meinung, dass wir handeln müssen.",ar:"أنا من الرأي أننا يجب أن نتصرف.",level:"B1",difficulty:"hard"},
    {de:"Das hängt von vielen Faktoren ab.",ar:"هذا يعتمد على عوامل كثيرة.",level:"B1",difficulty:"hard"},
    {de:"Es geht mir ziemlich gut.",ar:"أنا بحالة جيدة نوعاً ما.",level:"B1",difficulty:"medium"},
    {de:"Ich habe Bedenken dazu.",ar:"لدي مخاوف بشأن ذلك.",level:"B1",difficulty:"hard"},
    {de:"Können Sie mir das genauer erklären?",ar:"هل يمكنك توضيح ذلك بدقة؟",level:"B1",difficulty:"hard"},
    {de:"Ich habe vor, nächste Woche zu reisen.",ar:"أخطط للسفر الأسبوع المقبل.",level:"B1",difficulty:"hard"},
    {de:"Das ist eine gute Frage.",ar:"هذا سؤال جيد.",level:"B1",difficulty:"medium"},
    {de:"Ich bin dafür, dass wir mehr Zeit nehmen.",ar:"أنا مع أخذ وقت أكثر.",level:"B1",difficulty:"hard"},
    {de:"Wie schätzen Sie die Situation?",ar:"كيف تقيّم الوضع؟",level:"B1",difficulty:"hard"},
    {de:"Ich habe Erfahrung damit.",ar:"لدي خبرة في ذلك.",level:"B1",difficulty:"medium"},
    {de:"Das übersteigt meine Erwartungen.",ar:"هذا يتجاوز توقعاتي.",level:"B1",difficulty:"hard"},
    {de:"Ich bin zuversichtlich.",ar:"أنا واثق.",level:"B1",difficulty:"medium"},
    {de:"Wir müssen das besprechen.",ar:"يجب أن نناقش ذلك.",level:"B1",difficulty:"hard"},
    {de:"Ich habe keine Einwände.",ar:"ليس لدي اعتراضات.",level:"B1",difficulty:"hard"},
    {de:"Das ist ein kompliziertes Thema.",ar:"هذا موضوع معقد.",level:"B1",difficulty:"hard"},
    {de:"Ich stimme Ihnen zu.",ar:"أوافقك الرأي.",level:"B1",difficulty:"medium"},
    {de:"Darauf kann ich mich einlassen.",ar:"يمكنني الموافقة على ذلك.",level:"B1",difficulty:"hard"},
    {de:"Ich hätte gerne mehr Details.",ar:"أريد المزيد من التفاصيل.",level:"B1",difficulty:"hard"},
    {de:"Das ist ein wichtiger Punkt.",ar:"هذا نقطة مهمة.",level:"B1",difficulty:"medium"},
    {de:"Ich mache mir Sorgen.",ar:"أنا قلق.",level:"B1",difficulty:"medium"}
  ],
  B2: [
    {de:"Die Situation erfordert ein rasches Handeln.",ar:"الوضع يتطلب تصرفاً سريعاً.",level:"B2",difficulty:"hard"},
    {de:"Ich bin der Ansicht, dass wir optimistisch sein sollten.",ar:"أنا من الرأي أننا يجب أن نكون متفائلين.",level:"B2",difficulty:"hard"},
    {de:"Das ist eine bemerkenswerte Leistung.",ar:"هذا إنجاز ملحوظ.",level:"B2",difficulty:"hard"},
    {de:"Wir müssen die Prioritäten setzen.",ar:"يجب أن نضع الأولويات.",level:"B2",difficulty:"hard"},
    {de:"Ich habe Zweifel an dieser Aussage.",ar:"لدي شكوك بشأن هذا التصريح.",level:"B2",difficulty:"hard"},
    {de:"Das übersteigt meine Kompetenz.",ar:"هذا يتجاوز صلاحياتي.",level:"B2",difficulty:"hard"},
    {de:"Ich schlage einen Kompromiss vor.",ar:"أقترح تسوية.",level:"B2",difficulty:"hard"},
    {de:"Die Konsequenzen sind gravierend.",ar:"العواقب خطيرة.",level:"B2",difficulty:"hard"},
    {de:"Ich bin mit diesem Vorschlag einverstanden.",ar:"أنا موافق على هذا الاقتراح.",level:"B2",difficulty:"hard"},
    {de:"Wir sollten das gründlich überlegen.",ar:"يجب أن نفكر في ذلك بعناية.",level:"B2",difficulty:"hard"},
    {de:"Das erfordert mehr Recherche.",ar:"هذا يتطلب بحثاً أكثر.",level:"B2",difficulty:"hard"},
    {de:"Ich bin nicht ganz überzeugt.",ar:"لست مقتنعاً تماماً.",level:"B2",difficulty:"hard"},
    {de:"Wir müssen das mit anderen besprechen.",ar:"يجب أن نناقش ذلك مع الآخرين.",level:"B2",difficulty:"hard"},
    {de:"Das ist ein guter Ansatz.",ar:"هذا نهج جيد.",level:"B2",difficulty:"hard"},
    {de:"Ich habe Bedenken bezüglich der Kosten.",ar:"لدي مخاوف بشأن التكاليف.",level:"B2",difficulty:"hard"},
    {de:"Wir müssen flexibel bleiben.",ar:"يجب أن نبقى مرنين.",level:"B2",difficulty:"hard"},
    {de:"Die Daten sprechen für sich.",ar:"البيانات تتحدث عن نفسها.",level:"B2",difficulty:"hard"},
    {de:"Ich schlage vor, dass wir warten.",ar:"أقترح أن ننتظر.",level:"B2",difficulty:"hard"},
    {de:"Das ist eine realistische Einschätzung.",ar:"هذا تقييم واقعي.",level:"B2",difficulty:"hard"},
    {de:"Ich bin bereit, das Risiko einzugehen.",ar:"أنا مستعد للمخاطرة.",level:"B2",difficulty:"hard"}
  ],
  C1: [
    {de:"Die Analyse der Daten legt nahe, dass wir korrigieren müssen.",ar:"تحليل البيانات يشير إلى أننا يجب أن نصحح.",level:"C1",difficulty:"hard"},
    {de:"Ich bin der Überzeugung, dass dies der richtige Weg ist.",ar:"أنا مقتنع أن هذا هو الطريق الصحيح.",level:"C1",difficulty:"hard"},
    {de:"Die Implikationen sind weitreichend.",ar:"التداعيات واسعة النطاق.",level:"C1",difficulty:"hard"},
    {de:"Wir müssen die Sachlage differenziert betrachten.",ar:"يجب أن ننظر إلى الوضع بشكل تمييزي.",level:"C1",difficulty:"hard"},
    {de:"Ich stelle fest, dass es Alternativen gibt.",ar:"ألاحظ أن هناك بدائل.",level:"C1",difficulty:"hard"},
    {de:"Das erfordert einen Paradigmenwechsel.",ar:"هذا يتطلب تغييراً في النموذج.",level:"C1",difficulty:"hard"},
    {de:"Ich habe die Absicht, das umzusetzen.",ar:"لدي نية لتطبيق ذلك.",level:"C1",difficulty:"hard"},
    {de:"Die Evidenz spricht für diese Position.",ar:"الأدلة تدعم هذا الموقف.",level:"C1",difficulty:"hard"},
    {de:"Ich neige dazu, Ihnen zuzustimmen.",ar:"أميل إلى الموافقة معك.",level:"C1",difficulty:"hard"},
    {de:"Das ist eine plausible Erklärung.",ar:"هذا تفسير مقنع.",level:"C1",difficulty:"hard"},
    {de:"Wir müssen die Tragweite bedenken.",ar:"يجب أن نضع في الاعتبار الأثر.",level:"C1",difficulty:"hard"},
    {de:"Ich bin geneigt, das zu akzeptieren.",ar:"أنا مائل لقبول ذلك.",level:"C1",difficulty:"hard"},
    {de:"Die Diskrepanz ist offensichtlich.",ar:"الفجوة واضحة.",level:"C1",difficulty:"hard"},
    {de:"Ich befürworte diesen Ansatz.",ar:"أدعم هذا النهج.",level:"C1",difficulty:"hard"},
    {de:"Das ist eine substantielle Verbesserung.",ar:"هذا تحسن جوهري.",level:"C1",difficulty:"hard"},
    {de:"Wir sollten die Konsequenzen abwägen.",ar:"يجب أن نزن العواقب.",level:"C1",difficulty:"hard"},
    {de:"Ich bin skeptisch gegenüber dieser Behauptung.",ar:"أنا متشكك تجاه هذه المطالبة.",level:"C1",difficulty:"hard"},
    {de:"Das erfordert eine multiperspektivische Betrachtung.",ar:"هذا يتطلب نظرة متعددة الزوايا.",level:"C1",difficulty:"hard"},
    {de:"Ich komme zu dem Schluss, dass wir handeln müssen.",ar:"أتوصل إلى استنتاج أنه يجب أن نتصرف.",level:"C1",difficulty:"hard"},
    {de:"Die Nuancen sind entscheidend.",ar:"التفاصيل الدقيقة حاسمة.",level:"C1",difficulty:"hard"}
  ]
};
lines.push('export const HEAR_TYPE_SENTENCES = ' + JSON.stringify(hearType, null, 2) + ';');
lines.push('');

// 4. SONGS_DATA
const songs = [
  {title:"99 Luftballons",artist:"Nena",level:"A2",lines:[{de:"Hast du etwas Zeit für mich",missing:"Zeit",ar:"هل لديك بعض الوقت لي"},{de:"Dann singe ich ein Lied für dich",missing:"Lied",ar:"سأغني لك أغنية"},{de:"Von __ Luftballons",missing:"99",ar:"من 99 بالوناً"},{de:"Aufgeh'n an der Wand",missing:"flieg'n",ar:"تطير عند الجدار"},{de:"Hast du etwas Zeit für mich",missing:"Zeit",ar:"هل لديك بعض الوقت لي"},{de:"Dann singe ich ein Lied für dich",missing:"Lied",ar:"سأغني لك أغنية"},{de:"Von __ Luftballons",missing:"99",ar:"من 99 بالوناً"},{de:"Und daß so was von sowas kommt",missing:"weil",ar:"وأن شيئاً كهذا يأتي من شيء كذا"}]},
  {title:"Du hast",artist:"Rammstein",level:"B1",lines:[{de:"Du hast mich gefragt",missing:"gefragt",ar:"لقد سألتني"},{de:"Und ich hab nichts gesagt",missing:"nichts",ar:"ولم أقل شيئاً"},{de:"Willst du bis der Tod euch scheidet",missing:"scheidet",ar:"هل تريد حتى يفصل بينكما الموت"},{de:"Treue bis zum Tod",missing:"Treue",ar:"وفاءً حتى الموت"},{de:"Du hast mich gefragt",missing:"gefragt",ar:"لقد سألتني"},{de:"Ich habe nichts gesagt",missing:"nichts",ar:"ولم أقل شيئاً"},{de:"Willst du bis der Tod euch scheidet",missing:"scheidet",ar:"هل تريد حتى يفصل بينكما الموت"},{de:"Treue bis zum Tod",missing:"Treue",ar:"وفاءً حتى الموت"}]},
  {title:"Major Tom",artist:"Peter Schilling",level:"A2",lines:[{de:"Hör ich Signale",missing:"Signale",ar:"أسمع إشارات"},{de:"Die ich nicht verstehe",missing:"nicht",ar:"لا أفهمها"},{de:"Es gibt nur __ Licht",missing:"weißes",ar:"هناك ضوء أبيض فقط"},{de:"Für das ich blind bin",missing:"blind",ar:"أنا أعمى منه"},{de:"Hör ich Signale",missing:"Signale",ar:"أسمع إشارات"},{de:"Die ich nicht verstehe",missing:"nicht",ar:"لا أفهمها"},{de:"Es gibt nur weißes Licht",missing:"weißes",ar:"هناك ضوء أبيض فقط"},{de:"Für das ich blind bin",missing:"blind",ar:"أنا أعمى منه"}]},
  {title:"Über den Wolken",artist:"Reinhard Mey",level:"B1",lines:[{de:"Über den Wolken",missing:"Wolken",ar:"فوق الغيوم"},{de:"Muss die Freiheit wohl grenzenlos sein",missing:"Freiheit",ar:"يجب أن تكون الحرية بلا حدود"},{de:"Alle Ängste, alle Sorgen",missing:"Ängste",ar:"جميع المخاوف، جميع الهموم"},{de:"Sagt man",missing:"Sorgen",ar:"يُقال"},{de:"Blieben darunter verborgen",missing:"verborgen",ar:"بقيت مخفية تحتها"},{de:"Über den Wolken",missing:"Wolken",ar:"فوق الغيوم"},{de:"Muss die Freiheit wohl grenzenlos sein",missing:"Freiheit",ar:"يجب أن تكون الحرية بلا حدود"},{de:"Alle Ängste, alle Sorgen",missing:"Ängste",ar:"جميع المخاوف، جميع الهموم"}]},
  {title:"Westerland",artist:"Die Ärzte",level:"B1",lines:[{de:"Wir fahren nach Westerland",missing:"Westerland",ar:"نسافر إلى فيسترفيلاند"},{de:"Das Meer ist so weit",missing:"Meer",ar:"البحر واسع جداً"},{de:"Wir fahren nach Westerland",missing:"Westerland",ar:"نسافر إلى فيسترفيلاند"},{de:"Die Sonne scheint so heiß",missing:"Sonne",ar:"الشمس تشرق بحرارة شديدة"},{de:"Wir fahren nach Westerland",missing:"Westerland",ar:"نسافر إلى فيسترفيلاند"},{de:"Das Meer ist so weit",missing:"Meer",ar:"البحر واسع جداً"},{de:"Wir fahren nach Westerland",missing:"Westerland",ar:"نسافر إلى فيسترفيلاند"},{de:"Die Sonne scheint so heiß",missing:"Sonne",ar:"الشمس تشرق بحرارة شديدة"}]}
];
lines.push('export const SONGS_DATA = ' + JSON.stringify(songs, null, 2) + ';');
lines.push('');

// 5. RECIPES_DATA
const recipes = [
  {title:"Schnitzel",titleAr:"شنيتسل",level:"A2",ingredients:[{de:"4 Scheiten Schweinefleisch",ar:"4 شرائح لحم خنزير"},{de:"100g Mehl",ar:"100 جرام طحين"},{de:"2 Eier",ar:"2 بيضة"},{de:"200g Semmelbrösel",ar:"200 جرام بقسماط"},{de:"Salz und Pfeffer",ar:"ملح وفلفل"},{de:"Öl zum Braten",ar:"زيت للقلي"}],steps:[{de:"Das Fleisch klopfen und würzen.",ar:"اضرب اللحم وتبّله."},{de:"Mehl, Eier und Semmelbrösel vorbereiten.",ar:"حضّر الطحين والبيض والبقسماط."},{de:"Fleisch in Mehl, dann Ei, dann Brösel panieren.",ar:"غطِّ اللحم بالطحين ثم البيض ثم البقسماط."},{de:"Im heißen Öl goldbraun braten.",ar:"اقليه في الزيت الساخن حتى يصبح ذهبياً."},{de:"Mit Kartoffelsalat servieren.",ar:"قدّمه مع سلطة البطاطس."}]},
  {title:"Bratwurst mit Sauerkraut",titleAr:"براتفواست مع ملفوف مخمّر",level:"A2",ingredients:[{de:"4 Bratwürste",ar:"4 براتفواست"},{de:"500g Sauerkraut",ar:"500 جرام ملفوف مخمّر"},{de:"1 Zwiebel",ar:"1 بصلة"},{de:"1 Apfel",ar:"1 تفاحة"},{de:"1 EL Kümmel",ar:"1 ملعقة كبيرة كمون"},{de:"Senf",ar:"خردل"}],steps:[{de:"Die Würste in einer Pfanne braten.",ar:"اقلِ النقانق في مقلاة."},{de:"Zwiebel schneiden und anbraten.",ar:"اقطع البصلة واقليها."},{de:"Sauerkraut und Apfel dazugeben.",ar:"أضف الملفوف المخمّر والتفاحة."},{de:"Mit Kümmel würzen und köcheln lassen.",ar:"تبّل بالكمون واتركه على نار هادئة."},{de:"Mit Senf servieren.",ar:"قدّمه مع الخردل."}]},
  {title:"Käsespätzle",titleAr:"كاسيشبايتسله",level:"B1",ingredients:[{de:"300g Mehl",ar:"300 جرام طحين"},{de:"3 Eier",ar:"3 بيضات"},{de:"200ml Milch",ar:"200 مل حليب"},{de:"200g Käse",ar:"200 جرام جبنة"},{de:"2 Zwiebeln",ar:"2 بصلتان"},{de:"Butter",ar:"زبدة"}],steps:[{de:"Teig aus Mehl, Eiern und Milch zubereiten.",ar:"حضّر العجينة من الطحين والبيض والحليب."},{de:"Spätzle in kochendem Wasser kochen.",ar:"اطبخ السبتيسل في ماء مغلي."},{de:"Zwiebeln in Butter goldbraun braten.",ar:"اقلي البصل في الزبدة حتى يصبح ذهبياً."},{de:"Spätzle, Käse und Zwiebeln schichten.",ar:"رتب طبقات السبتيسل والجبنة والبصل."},{de:"Im Ofen überbacken.",ar:"احضره في الفرن حتى تذوب الجبنة."}]},
  {title:"Apfelstrudel",titleAr:"أبفلشتريودل",level:"B1",ingredients:[{de:"1 Packung Strudelteig",ar:"1 عبوة عجينة سترودل"},{de:"4 Äpfel",ar:"4 تفاحات"},{de:"100g Zucker",ar:"100 جرام سكر"},{de:"50g Rosinen",ar:"50 جرام زبيب"},{de:"1 EL Zimt",ar:"1 ملعقة كبيرة قرفة"},{de:"100g Butter",ar:"100 جرام زبدة"}],steps:[{de:"Äpfel schälen und schneiden.",ar:"قشّر التفاح وقطّعه."},{de:"Mit Zucker, Rosinen und Zimt vermischen.",ar:"امزجه مع السكر والزبيب والقرفة."},{de:"Strudelteig ausrollen.",ar:"افرد عجينة السترودل."},{de:"Füllung darauf verteilen und einrollen.",ar:"وزّع الحشوة عليها ولفّها."},{de:"Mit Butter bestreichen und backen.",ar:"ادهنها بالزبدة واخبزها."}]}
];
lines.push('export const RECIPES_DATA = ' + JSON.stringify(recipes, null, 2) + ';');
lines.push('');

appendFileSync(f, lines.join('\n'), 'utf-8');
console.log('Phase 2 appended');
