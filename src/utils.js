/* ==========================================================================
   DeutschLernen — Text utilities (umlauts, similarity, levenshtein)
   ========================================================================== */

const UMLAUT_MAP = {
  "ü": "ue", "ö": "oe", "ä": "ae", "ß": "ss",
  "é": "e", "è": "e", "ê": "e", "á": "a", "à": "a", "â": "a",
  "í": "i", "î": "i", "ó": "o", "ô": "o", "ú": "u", "û": "u", "ç": "c"
};

/**
 * Normalize German text so that umlauts and simple substitutions match:
 * both "grüne" and "gruene" become "gruene"; "ß" and "ss" match; case/punct ignored.
 */
export function normalizeGerman(s) {
  if (s == null) return "";
  let t = String(s).toLowerCase().trim();
  t = t.replace(/[üöäßéèêáàâíîóôúûç]/g, ch => UMLAUT_MAP[ch] || ch);
  t = t.replace(/[^a-z]/g, " ");
  t = t.replace(/\s+/g, " ").trim();
  return t;
}

export function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    prev = cur;
  }
  return prev[n];
}

/**
 * Similarity score 0–100 between two strings (umlaut-aware, punctuation-ignored).
 */
export function similarity(a, b) {
  const na = normalizeGerman(a);
  const nb = normalizeGerman(b);
  if (!na || !nb) return 0;
  const dist = levenshtein(na, nb);
  return Math.max(0, Math.round((1 - dist / Math.max(na.length, nb.length)) * 100));
}

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
