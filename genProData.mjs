import { readFileSync, writeFileSync } from 'fs';

const grammar = JSON.parse(readFileSync('C:/Users/Adem/OneDrive/Bureau/workspace/src/proData.json', 'utf-8'));

const lines = [];
lines.push('// German Learning Data - Complete Dataset');
lines.push('// All exports are named exports');
lines.push('');

// 1. GRAMMAR_INTERACTIVE
lines.push('export const GRAMMAR_INTERACTIVE = ' + JSON.stringify(grammar.GRAMMAR_INTERACTIVE, null, 2) + ';');
lines.push('');

// 2. CONTEXTUAL_WORDS
const contextualWords = [
  {de:"die Schule",ar:"المدرسة",pron:"ʃuːlə",level:"A1",sentences:[{de:"Die Kinder gehen in die Schule.",ar:"الأطفال يذهبون إلى المدرسة."},{de:"In der Schule lernen wir Deutsch.",ar:"في المدرسة نتعلم الألمانية."},{de:"Die Schule ist nah an meinem Haus.",ar:"المدرسة قريبة من منزلي."}]},
  {de:"das Buch",ar:"الكتاب",pron:"buːx",level:"A1",sentences:[{de:"Ich lese ein interessantes Buch.",ar:"أقرأ كتاباً مثيراً للاهتمام."},{de:"Das Buch liegt auf dem Tisch.",ar:"الكتاب موجود على الطاولة."},{de:"Kann ich dein Buch borgen?",ar:"هل يمكنني اقتراض كتابك؟"}]},
  {de:"die Arbeit",ar:"العمل",pron:"aʁbɐɪt",level:"A1",sentences:[{de:"Die Arbeit macht mir Spaß.",ar:"العمل يسعدني."},{de:"Ich suche eine neue Arbeit.",ar:"أبحث عن عمل جديد."},{de:"Die Arbeit beginnt um acht Uhr.",ar:"العمل يبدأ الساعة الثامنة."}]},
  {de:"das Wasser",ar:"الماء",pron:"vasɐ",level:"A1",sentences:[{de:"Kann ich ein Glas Wasser haben?",ar:"هل يمكنني الحصول على كوب ماء؟"},{de:"Das Wasser ist sehr kalt.",ar:"الماء بارد جداً."},{de:"Trinken Sie genug Wasser.",ar:"اشرب كمية كافية من الماء."}]},
  {de:"das Essen",ar:"الطعام",pron:"ɛsn̩",level:"A1",sentences:[{de:"Das Essen schmeckt sehr gut.",ar:"الطعام لذيذ جداً."},{de:"Wir essen zusammen zu Abend.",ar:"نتعشى معاً."},{de:"Das Essen ist fertig.",ar:"الطعام جاهز."}]},
  {de:"die Freunde",ar:"الأصدقاء",pron:"fʁʏndə",level:"A1",sentences:[{de:"Ich treffe mich mit meinen Freunden.",ar:"أقابل أصدقائي."},{de:"Er hat viele Freunde.",ar:"لديه أصدقاء كثيرون."},{de:"Freunde sind sehr wichtig.",ar:"الأصدقاء مهمون جداً."}]},
  {de:"das Haus",ar:"المنزل",pron:"haʊs",level:"A1",sentences:[{de:"Das Haus ist sehr groß.",ar:"المنزل كبير جداً."},{de:"Wir kaufen ein neues Haus.",ar:"نشتري منزلاً جديداً."},{de:"Das Haus hat zwei Stockwerke.",ar:"المنزل به طابقان."}]},
  {de:"die Familie",ar:"العائلة",pron:"familiːə",level:"A1",sentences:[{de:"Meine Familie ist sehr groß.",ar:"عائلتي كبيرة جداً."},{de:"Die Familie geht spazieren.",ar:"العائلة تذهب في نزهة."},{de:"Familie ist das Wichtigste.",ar:"العائلة هي الأهم."}]},
  {de:"das Geld",ar:"المال",pron:"ɡɛlt",level:"A2",sentences:[{de:"Ich habe nicht genug Geld.",ar:"ليس لديّ ما يكفي من المال."},{de:"Das Geld ist teuer.",ar:"العملة ثمينة."},{de:"Er spart Geld für einen Urlaub.",ar:"يوفر المال للعطلة."}]},
  {de:"die Zeit",ar:"الوقت",pron:"tsaɪt",level:"A2",sentences:[{de:"Ich habe keine Zeit.",ar:"ليس لديّ وقت."},{de:"Die Zeit vergeht schnell.",ar:"الوقت يمر بسرعة."},{de:"Wann hast du Zeit?",ar:"متى يكون لديك وقت؟"}]},
  {de:"das Wetter",ar:"الطقس",pron:"vɛtɐ",level:"A2",sentences:[{de:"Das Wetter ist heute schön.",ar:"الطقس جميل اليوم."},{de:"Wie ist das Wetter?",ar:"كيف الطقس؟"},{de:"Bei schlechtem Wetter bleibe ich zu Hause.",ar:"في الطقس السيء أبقى في المنزل."}]},
  {de:"der Arzt",ar:"الطبيب",pron:"aʁtst",level:"A2",sentences:[{de:"Ich gehe zum Arzt.",ar:"أذهب إلى الطبيب."},{de:"Der Arzt untersucht den Patienten.",ar:"الطبيب يفحص المريض."},{de:"Termin beim Arzt um zehn Uhr.",ar:"موعد مع الطبيب الساعة العاشرة."}]},
  {de:"die Reise",ar:"الرحلة",pron:"ʁaɪzə",level:"A2",sentences:[{de:"Die Reise war wunderschön.",ar:"الرحلة كانت رائعة."},{de:"Wir planen eine Reise nach Italien.",ar:"نخطط لرحلة إلى إيطاليا."},{de:"Gute Reise!",ar:"رحلة سعيدة!"}]},
  {de:"das Restaurant",ar:"المطعم",pron:"ʁɛstɔʁaŋ",level:"A2",sentences:[{de:"Wir essen im Restaurant.",ar:"نتناول الطعام في المطعم."},{de:"Das Restaurant ist sehr beliebt.",ar:"المطعم شائع جداً."},{de:"Haben Sie einen Tisch für zwei?",ar:"هل لديكم طاولة لشخصين؟"}]},
  {de:"die Nachricht",ar:"الرسالة",pron:"naːχʁɪçt",level:"A2",sentences:[{de:"Ich habe eine Nachricht erhalten.",ar:"تلقّيت رسالة."},{de:"Die Nachricht ist wichtig.",ar:"الرسالة مهمة."},{de:"Schick mir eine Nachricht.",ar:"أرسل لي رسالة."}]},
  {de:"das Konto",ar:"الحساب",pron:"konto",level:"B1",sentences:[{de:"Ich eröffne ein neues Konto.",ar:"أفتح حساباً جديداً."},{de:"Das Konto ist leer.",ar:"الحساب فارغ."},{de:"Überweise das Geld auf mein Konto.",ar:"حوّل المال إلى حسابي."}]},
  {de:"die Erfahrung",ar:"الخبرة",pron:"ɛɐ̯faːʁʊŋ",level:"B1",sentences:[{de:"Er hat viel Erfahrung.",ar:"لديه خبرة واسعة."},{de:"Das war eine tolle Erfahrung.",ar:"كانت تجربة رائعة."},{de:"Fehlende Erfahrung ist ein Problem.",ar:"قلة الخبرة مشكلة."}]},
  {de:"die Zukunft",ar:"المستقبل",pron:"tsʊkʊŋft",level:"B1",sentences:[{de:"Die Zukunft sieht gut aus.",ar:"المستقبل يبدو جيداً."},{de:"Wir planen für die Zukunft.",ar:"نخطط للمستقبل."},{de:"In Zukunft werde ich vorsichtiger sein.",ar:"في المستقبل سأكون أكثر حذراً."}]},
  {de:"die Meinung",ar:"الرأي",pron:"maɪnʊŋ",level:"B1",sentences:[{de:"Was ist deine Meinung?",ar:"ما رأيك؟"},{de:"Ich teile deine Meinung nicht.",ar:"لا أشارك رأيك."},{de:"Jeder hat das Recht auf seine Meinung.",ar:"لكل شخص الحق في رأيه."}]},
  {de:"die Lösung",ar:"الحل",pron:"løːzʊŋ",level:"B1",sentences:[{de:"Wir haben eine Lösung gefunden.",ar:"وجدنا حلاً."},{de:"Gibt es eine einfachere Lösung?",ar:"هل يوجد حل أبسط؟"},{de:"Die Lösung ist nicht einfach.",ar:"الحل ليس سهلاً."}]},
  {de:"die Herausforderung",ar:"التحدي",pron:"hɛɐ̯aʊsˈfɔʁdəʁʊŋ",level:"B2",sentences:[{de:"Das ist eine große Herausforderung.",ar:"هذا تحدٍ كبير."},{de:"Ich liebe Herausforderungen.",ar:"أحب التحديات."},{de:"Diese Herausforderung meistern wir.",ar:"نتغلب على هذا التحدٍ."}]},
  {de:"die Verantwortung",ar:"المسؤولية",pron:"fɛɐ̯ˈantvɔʁtʊŋ",level:"B2",sentences:[{de:"Er übernimmt die Verantwortung.",ar:"يتولى المسؤولية."},{de:"Verantwortung ist wichtig.",ar:"المسؤولية مهمة."},{de:"Ich trage die Verantwortung dafür.",ar:"أتحمل المسؤولية عن ذلك."}]},
  {de:"die Entwicklung",ar:"التطور",pron:"ɛntˈvɪklʊŋ",level:"B2",sentences:[{de:"Die Entwicklung ist bemerkenswert.",ar:"التطور ملحوظ."},{de:"Wir beobachten die Entwicklung.",ar:"نراقب التطور."},{de:"Diese Entwicklung kommt schnell.",ar:"هذا التطور سريع."}]},
  {de:"die Gesellschaft",ar:"المجتمع",pron:"ɡəˈzɛlʃaft",level:"B2",sentences:[{de:"Die Gesellschaft verändert sich.",ar:"المجتمع يتغير."},{de:"Er ist ein Mitglied der Gesellschaft.",ar:"هو عضو في المجتمع."},{de:"Wir leben in einer freien Gesellschaft.",ar:"نعيش في مجتمع حر."}]},
  {de:"die Politik",ar:"السياسة",pron:"pɔˈliːtɪk",level:"B2",sentences:[{de:"Die Politik beeinflusst unser Leben.",ar:"السياسة تؤثر في حياتنا."},{de:"Er interessiert sich für Politik.",ar:"يهمه السياسة."},{de:"Die Politik muss sich ändern.",ar:"يجب أن تتغير السياسة."}]},
  {de:"die Bildung",ar:"التعليم",pron:"bɪldʊŋ",level:"B2",sentences:[{de:"Bildung ist ein Menschenrecht.",ar:"التعليم حق إنساني."},{de:"Die Bildung in Deutschland ist gut.",ar:"التعليم في ألمانيا جيد."},{de:"Wir investieren in Bildung.",ar:"نستثمر في التعليم."}]},
  {de:"die Wissenschaft",ar:"العلم",pron:"vɪsn̩ʃaft",level:"C1",sentences:[{de:"Die Wissenschaft macht Fortschritte.",ar:"العلم يحرز تقدماً."},{de:"Er arbeitet in der Wissenschaft.",ar:"يعمل في مجال العلم."},{de:"Die Wissenschaft hat vieles erklärt.",ar:"العلم شرح الكثير."}]},
  {de:"die Gesundheit",ar:"الصحة",pron:"ɡəˈzʊnthaɪt",level:"C1",sentences:[{de:"Gesundheit ist das Wichtigste.",ar:"الصحة هي الأهم."},{de:"Er kümmert sich um seine Gesundheit.",ar:"يهتم بصحته."},{de:"Die Gesundheit der Bevölkerung verbessert sich.",ar:"صحة السكان تتحسن."}]},
  {de:"die Umwelt",ar:"البيئة",pron:"ʊmvɛlt",level:"C1",sentences:[{de:"Wir müssen die Umwelt schützen.",ar:"يجب حماية البيئة."},{de:"Die Umweltverschmutzung ist ein Problem.",ar:"تلوث البيئة مشكلة."},{de:"Jeder kann die Umwelt schützen.",ar:"كل شخص يمكنه حماية البيئة."}]},
  {de:"die Freiheit",ar:"الحرية",pron:"fʁaɪhaɪt",level:"C1",sentences:[{de:"Freiheit ist ein Grundrecht.",ar:"الحرية حق أساسي."},{de:"Er kämpft für seine Freiheit.",ar:"يقاتل من أجل حريته."},{de:"Ohne Freiheit kann man nicht leben.",ar:"بدون الحرية لا يمكن العيش."}]}
];
lines.push('export const CONTEXTUAL_WORDS = ' + JSON.stringify(contextualWords, null, 2) + ';');
lines.push('');

writeFileSync('C:/Users/Adem/OneDrive/Bureau/workspace/src/proData.js', lines.join('\n'), 'utf-8');
console.log('Phase 1 written');
