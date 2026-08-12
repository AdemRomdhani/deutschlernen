const fs = require('fs');
const out = 'C:/Users/Adem/OneDrive/Bureau/workspace/src/proData.json';

const data = {"GRAMMAR_INTERACTIVE":{"A1":[],"A2":[],"B1":[],"B2":[],"C1":[]}};

function addGrammar(level, items) {
  items.forEach(([sent, parts, q, c]) => {
    data.GRAMMAR_INTERACTIVE[level].push({
      level, sentence: sent,
      parts: parts.map(([w,r,cc]) => ({word:w,role:r,correctCase:cc})),
      question: q, options: ["Nominativ","Akkusativ","Dativ","Genitiv"], correct: c
    });
  });
}

addGrammar("A1", [
  ["Ich bin ein Student.",[["Ich","subject","nominative"],["bin","verb","none"],["ein","article","nominative"],["Student","predicate noun","nominative"]],"Welchen Fall hat 'Ich'?","Nominativ"],
  ["Ich sehe den Hund.",[["Ich","subject","nominative"],["sehe","verb","none"],["den","article","accusative"],["Hund","direct object","accusative"]],"Welchen Fall hat 'den Hund'?","Akkusativ"],
  ["Ich gebe dem Mann das Buch.",[["Ich","subject","nominative"],["gebe","verb","none"],["dem","article","dative"],["Mann","indirect object","dative"],["das","article","accusative"],["Buch","direct object","accusative"]],"Welchen Fall hat 'dem Mann'?","Dativ"],
  ["Das Auto des Mannes ist groß.",[["Das","article","nominative"],["Auto","subject","nominative"],["des","article","genitive"],["Mannes","possessor","genitive"]],"Welchen Fall hat 'des Mannes'?","Genitiv"],
  ["Die Frau liest die Zeitung.",[["Die","article","nominative"],["Frau","subject","nominative"],["liest","verb","none"],["die","article","accusative"],["Zeitung","direct object","accusative"]],"Welchen Fall hat 'die Zeitung'?","Akkusativ"],
  ["Wir spielen mit dem Ball.",[["Wir","subject","nominative"],["spielen","verb","none"],["mit","preposition","dative"],["dem","article","dative"],["Ball","object","dative"]],"Welchen Fall verlangt 'mit'?","Dativ"],
  ["Er kauft einen Apfel.",[["Er","subject","nominative"],["kauft","verb","none"],["einen","article","accusative"],["Apfel","direct object","accusative"]],"Welchen Fall hat 'einen Apfel'?","Akkusativ"],
  ["Ich wohne in Berlin.",[["Ich","subject","nominative"],["wohne","verb","none"],["in","preposition","dative"],["Berlin","object","dative"]],"Welchen Fall verlangt 'in' (wo)?","Dativ"],
  ["Der Hund bellt laut.",[["Der","article","nominative"],["Hund","subject","nominative"],["bellt","verb","none"],["laut","adverb","none"]],"Welchen Fall hat 'Der Hund'?","Nominativ"],
  ["Gib mir bitte das Wasser!",[["Gib","verb","none"],["mir","pronoun","dative"],["bitte","adverb","none"],["das","article","accusative"],["Wasser","direct object","accusative"]],"Welchen Fall hat 'mir'?","Dativ"]
]);

addGrammar("A2", [
  ["Ich habe meinem Freund geholfen.",[["Ich","subject","nominative"],["habe","verb","none"],["meinem","possessive article","dative"],["Freund","indirect object","dative"]],"Welchen Fall hat 'meinem Freund'?","Dativ"],
  ["Die Kinder spielen im Garten.",[["Die","article","nominative"],["Kinder","subject","nominative"],["spielen","verb","none"],["im","preposition","dative"],["Garten","object","dative"]],"Welchen Fall hat 'im Garten'?","Dativ"],
  ["Wir fahren nach München.",[["Wir","subject","nominative"],["fahren","verb","none"],["nach","preposition","dative"],["München","object","dative"]],"Welchen Fall verlangt 'nach'?","Dativ"],
  ["Er nimmt den Bus zur Arbeit.",[["Er","subject","nominative"],["nimmt","verb","none"],["den","article","accusative"],["Bus","direct object","accusative"]],"Welchen Fall hat 'den Bus'?","Akkusativ"],
  ["Das Geschenk meiner Schwester ist schön.",[["Das","article","nominative"],["Geschenk","subject","nominative"],["meiner","possessive article","genitive"],["Schwester","possessor","genitive"]],"Welchen Fall hat 'meiner Schwester'?","Genitiv"],
  ["Ich warte auf den Bus.",[["Ich","subject","nominative"],["warte","verb","none"],["auf","preposition","accusative"],["den","article","accusative"],["Bus","object","accusative"]],"Welchen Fall verlangt 'warten auf'?","Akkusativ"],
  ["Sie gibt dem Kind ein Buch.",[["Sie","subject","nominative"],["gibt","verb","none"],["dem","article","dative"],["Kind","indirect object","dative"],["ein","article","accusative"],["Buch","direct object","accusative"]],"Welchen Fall hat 'dem Kind'?","Dativ"],
  ["Trotz des Regens gehen wir spazieren.",[["Trotz","preposition","genitive"],["des","article","genitive"],["Regens","object","genitive"]],"Welchen Fall verlangt 'trotz'?","Genitiv"],
  ["Er fährt mit dem Zug nach Berlin.",[["Er","subject","nominative"],["fährt","verb","none"],["mit","preposition","dative"],["dem","article","dative"],["Zug","object","dative"]],"Welchen Fall verlangt 'mit'?","Dativ"],
  ["Die Frau mit dem roten Kleid kommt.",[["Die","article","nominative"],["Frau","subject","nominative"],["mit","preposition","dative"],["dem","article","dative"],["roten","adjective","dative"],["Kleid","object","dative"]],"Welchen Fall hat 'dem roten Kleid'?","Dativ"]
]);

addGrammar("B1", [
  ["Trotz des schlechten Wetters haben wir das Spiel beendet.",[["Trotz","preposition","genitive"],["des","article","genitive"],["Wetters","object","genitive"]],"Welchen Fall verlangt 'trotz'?","Genitiv"],
  ["Wir bedürfen Ihrer Unterstützung.",[["Wir","subject","nominative"],["bedürfen","verb","none"],["Ihrer","possessive article","genitive"]],"Welchen Fall verlangt 'bedürfen'?","Genitiv"],
  ["Die Ergebnisse der Studie sind überraschend.",[["Die","article","nominative"],["Ergebnisse","subject","nominative"],["der","article","genitive"],["Studie","possessor","genitive"]],"Welchen Fall hat 'der Studie'?","Genitiv"],
  ["Er gedenkt seiner verstorbenen Großmutter.",[["Er","subject","nominative"],["gedenkt","verb","none"],["seiner","possessive article","genitive"]],"Welchen Fall verlangt 'gedenken'?","Genitiv"],
  ["Ich erinnere mich an den Urlaub in Italien.",[["Ich","subject","nominative"],["erinnere","verb","none"],["mich","reflexive pronoun","accusative"],["an","preposition","accusative"]],"Welchen Fall verlangt 'sich erinnern an'?","Akkusativ"],
  ["Das Buch des Autors ist sehr beliebt.",[["Das","article","nominative"],["Buch","subject","nominative"],["des","article","genitive"],["Autors","possessor","genitive"]],"Welchen Fall hat 'des Autors'?","Genitiv"],
  ["Wir bedanken uns bei Ihnen für die Einladung.",[["Wir","subject","nominative"],["bedanken","verb","none"],["uns","reflexive pronoun","accusative"],["bei","preposition","dative"]],"Welchen Fall verlangt 'bei'?","Dativ"],
  ["Statt des Kaffees trinke ich lieber Tee.",[["Statt","preposition","genitive"],["des","article","genitive"],["Kaffees","object","genitive"]],"Welchen Fall verlangt 'statt'?","Genitiv"],
  ["Die Arbeit des neuen Mitarbeiters ist beeindruckend.",[["Die","article","nominative"],["Arbeit","subject","nominative"],["des","article","genitive"],["neuen","adjective","genitive"],["Mitarbeiters","possessor","genitive"]],"Welchen Fall hat 'des neuen Mitarbeiters'?","Genitiv"]
]);

addGrammar("B2", [
  ["Anstatt des üblichen Frühstücks aß er nur ein Brötchen.",[["Anstatt","preposition","genitive"],["Frühstücks","object","genitive"]],"Welchen Fall verlangt 'anstatt'?","Genitiv"],
  ["Die Konsequenzen seines Handelns sind gravierend.",[["Die","article","nominative"],["Konsequenzen","subject","nominative"],["seines","possessive article","genitive"],["Handelns","possessor","genitive"]],"Welchen Fall hat 'seines Handelns'?","Genitiv"],
  ["Das Ergebnis der Untersuchung war eindeutig.",[["Das","article","nominative"],["Ergebnis","subject","nominative"],["der","article","genitive"],["Untersuchung","possessor","genitive"]],"Welchen Fall hat 'der Untersuchung'?","Genitiv"],
  ["Er wurde wegen seines Fehlers bestraft.",[["wegen","preposition","genitive"],["seines","possessive article","genitive"],["Fehlers","object","genitive"]],"Welchen Fall verlangt 'wegen'?","Genitiv"],
  ["Trotz der Warnungen nahmen sie das Risiko in Kauf.",[["Trotz","preposition","genitive"],["der","article","genitive"],["Warnungen","object","genitive"]],"Welchen Fall verlangt 'trotz'?","Genitiv"],
  ["Die Mehrheit der Bürger ist gegen den Plan.",[["Die","article","nominative"],["Mehrheit","subject","nominative"],["der","article","genitive"],["Bürger","possessor","genitive"]],"Welchen Fall hat 'der Bürger'?","Genitiv"],
  ["Wir gedenken der Opfer des Krieges.",[["Wir","subject","nominative"],["gedenken","verb","none"],["der","article","genitive"],["Opfer","direct object","genitive"]],"Welchen Fall verlangt 'gedenken'?","Genitiv"],
  ["Aufgrund der neuen Daten müssen wir unsere Strategie ändern.",[["Aufgrund","preposition","genitive"],["der","article","genitive"],["Daten","object","genitive"]],"Welchen Fall verlangt 'aufgrund'?","Genitiv"],
  ["Das Vermögen des Unternehmers wurde beschlagnahmt.",[["Das","article","nominative"],["Vermögen","subject","nominative"],["des","article","genitive"],["Unternehmers","possessor","genitive"]],"Welchen Fall hat 'des Unternehmers'?","Genitiv"],
  ["Während des Urlaubs haben wir viele Fotos gemacht.",[["Während","preposition","genitive"],["des","article","genitive"],["Urlaubs","object","genitive"]],"Welchen Fall verlangt 'während'?","Genitiv"]
]);

addGrammar("C1", [
  ["Namens des Komitees begrüße ich Sie herzlich.",[["Namens","preposition","genitive"],["Komitees","object","genitive"]],"Welchen Fall verlangt 'namens'?","Genitiv"],
  ["Bedingt durch die Umstände mussten wir den Termin verschieben.",[["Bedingt","past participle","none"],["durch","preposition","accusative"],["die","article","accusative"],["Umstände","object","accusative"]],"Welchen Fall verlangt 'durch'?","Akkusativ"],
  ["Ungeachtet der Schwierigkeiten setzten wir unser Vorhaben fort.",[["Ungeachtet","preposition","genitive"],["der","article","genitive"],["Schwierigkeiten","object","genitive"]],"Welchen Fall verlangt 'ungeachtet'?","Genitiv"],
  ["Die Bevölkerung des Landes litt unter der Dürre.",[["Die","article","nominative"],["Bevölkerung","subject","nominative"],["des","article","genitive"],["Landes","possessor","genitive"]],"Welchen Fall hat 'des Landes'?","Genitiv"],
  ["Hinsichtlich der neuen Verordnung gibt es Bedenken.",[["Hinsichtlich","preposition","genitive"],["der","article","genitive"],["Verordnung","object","genitive"]],"Welchen Fall verlangt 'hinsichtlich'?","Genitiv"],
  ["Zufolge des Berichts war der Schaden begrenzt.",[["Zufolge","preposition","genitive"],["Berichts","object","genitive"]],"Welchen Fall verlangt 'zufolge'?","Genitiv"],
  ["Auf Kosten des Unternehmens wurde die Party gefeiert.",[["Auf","preposition","accusative"],["des","article","genitive"],["Unternehmens","possessor","genitive"]],"Welchen Fall hat 'des Unternehmens'?","Genitiv"],
  ["Infolge der Stürme kam es zu Stromausfällen.",[["Infolge","preposition","genitive"],["der","article","genitive"],["Stürme","object","genitive"]],"Welchen Fall verlangt 'infolge'?","Genitiv"],
  ["Dieser Beschluss bedarf Ihrer Zustimmung.",[["Dieser","article","nominative"],["Beschluss","subject","nominative"],["bedarf","verb","none"],["Ihrer","possessive article","genitive"]],"Welchen Fall verlangt 'bedürfen'?","Genitiv"],
  ["Zu Gunsten der Kinder wurde die Entscheidung getroffen.",[["Zu","preposition","dative"],["der","article","genitive"],["Kinder","possessor","genitive"]],"Welchen Fall hat 'der Kinder'?","Genitiv"]
]);

fs.writeFileSync(out, JSON.stringify(data, null, 2), 'utf-8');
console.log('Written ' + fs.statSync(out).size + ' bytes');
