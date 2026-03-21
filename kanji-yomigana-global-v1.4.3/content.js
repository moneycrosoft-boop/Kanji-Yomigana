const RE_KANJI = /[\u4e00-\u9faf\u3400-\u4dbf\u{20000}-\u{2a6df}\u{f900}-\u{faff}々]/u;
const RE_KANA = /[\u3041-\u309f\u30a0-\u30ffー]/u;
const TEXT_SCAN_MAX_NODES = 140;
const TEXT_SCAN_MAX_CHARS = 1800;
const SURFACE_SUFFIX_OVERRIDES = Object.freeze({
  '最も': 'も',
  '誠に': 'に',
  '別に': 'に',
  '特に': 'に',
  '主に': 'に',
  '共に': 'に',
  '既に': 'に',
  '更に': 'に',
  '徐々に': 'に',
  '滅多に': 'に'
});
const SURFACE_BLOCK_PREFIXES = ['です', 'でした', 'でしょう', 'でしょ', 'だろう', 'だろ', 'では', 'じゃ', 'ます', 'ました', 'ません', 'ましょう'];
const SURFACE_SINGLE_PARTICLES = new Set(['を', 'が', 'は', 'に', 'へ', 'で', 'と', 'の', 'か', 'ね', 'よ', 'や', 'も']);
const SURFACE_TERMINAL_PARTICLES = new Set(['を', 'が', 'は', 'へ', 'の', 'か', 'や', 'ね', 'よ']);
const SURFACE_INLINE_CUT_MARKERS = ['ませんでした', 'ません', 'ました', 'ます', 'でした', 'です', 'でしょう', 'でしょ', 'じゃない', 'ではない', 'じゃ', 'では'];
const SCOPE_LEFT_BLOCK_SEGMENTS = new Set(['の', 'を', 'が', 'は', 'に', 'へ', 'で', 'と', 'も', 'や', 'か', 'ね', 'よ', 'から', 'まで', 'より', 'ので', 'のに', 'とか', 'など', 'って', 'でも', 'では', 'とは']);
const SCOPE_HONORIFIC_PREFIXES = new Set(['お', 'ご']);
const SCOPE_PREFIX_MAX_CHARS = 12;

const UI_LANGUAGE_META = Object.freeze({
  ar: { code: 'ar', dir: 'rtl' },
  de: { code: 'de', dir: 'ltr' },
  en: { code: 'en', dir: 'ltr' },
  es: { code: 'es', dir: 'ltr' },
  fr: { code: 'fr', dir: 'ltr' },
  it: { code: 'it', dir: 'ltr' },
  ko: { code: 'ko', dir: 'ltr' },
  'zh-hans': { code: 'zh-hans', dir: 'ltr' },
  'zh-hant': { code: 'zh-hant', dir: 'ltr' }
});

const PUBLIC_SETTINGS_DEFAULTS = Object.freeze({
  kanjEnabled: true,
  siteAccessMode: 'all_except_blocked',
  siteAllowlistText: '',
  siteBlocklistText: '',
  uiLanguage: 'en'
});
const DEFAULT_BLOCKED_HOST_PATTERNS = Object.freeze([
  'mail.google.com',
  'mail.yahoo.com',
  'outlook.live.com',
  'outlook.office.com',
  'docs.google.com',
  'drive.google.com',
  'notion.so',
  'www.notion.so',
  'my.1password.com',
  '1password.com',
  'vault.bitwarden.com',
  'lastpass.com',
  'dashlane.com',
  'paypal.com',
  'checkout.stripe.com'
]);

const CONTENT_I18N = Object.freeze({
  ko: {
    loading: '변환 중…',
    close: '닫기',
    unknownError: '알 수 없는 오류',
    noResponse: '응답 없음 — background script를 확인하세요',
    keyRequired: provider => `${provider} API 키를 설정해주세요 (확장 팝업 → 설정 탭)`,
    noSelection: '선택된 텍스트가 없습니다.',
    cancelled: '요청이 취소되었습니다.',
    timedOut: '응답 시간이 초과되었습니다.',
    parseFailed: 'AI의 답변을 해석하지 못했습니다.',
    isolateFailed: '클릭한 한자의 읽기를 분리하지 못했습니다.',
    invalidFormat: 'AI 응답 형식이 올바르지 않습니다.',
    noReading: 'AI가 읽기를 반환하지 않았습니다.',
    notHiragana: 'AI가 히라가나 형식으로 읽기를 반환하지 않았습니다.',
    emptyClaude: 'Claude가 빈 응답을 반환했습니다.',
    emptyGemini: 'Gemini가 빈 응답을 반환했습니다.',
    emptyOpenAI: 'OpenAI가 빈 응답을 반환했습니다.',
    networkPrefix: '네트워크 오류: ',
    geminiBusy: 'Gemini 서버가 혼잡합니다. 잠시 후 다시 시도해주세요.'
  },
  en: {
    loading: 'Analyzing…',
    close: 'Close',
    unknownError: 'Unknown error',
    noResponse: 'No response — check the background script',
    keyRequired: provider => `Please add a ${provider} API key (Extension popup → Settings).`,
    noSelection: 'No text was selected.',
    cancelled: 'The request was cancelled.',
    timedOut: 'The response timed out.',
    parseFailed: 'The AI response could not be parsed.',
    isolateFailed: 'The clicked kanji reading could not be isolated.',
    invalidFormat: 'The AI response format was invalid.',
    noReading: 'The AI did not return a reading.',
    notHiragana: 'The AI did not return the reading in hiragana.',
    emptyClaude: 'Claude returned an empty response.',
    emptyGemini: 'Gemini returned an empty response.',
    emptyOpenAI: 'OpenAI returned an empty response.',
    networkPrefix: 'Network error: ',
    geminiBusy: 'Gemini is busy. Please try again shortly.'
  },
  de: {
    loading: 'Wird analysiert…',
    close: 'Schließen',
    unknownError: 'Unbekannter Fehler',
    noResponse: 'Keine Antwort — prüfe das Background-Script',
    keyRequired: provider => `Bitte füge einen ${provider}-API-Schlüssel hinzu (Erweiterungs-Popup → Einstellungen).`,
    noSelection: 'Es wurde kein Text ausgewählt.',
    cancelled: 'Die Anfrage wurde abgebrochen.',
    timedOut: 'Die Antwort hat zu lange gedauert.',
    parseFailed: 'Die KI-Antwort konnte nicht gelesen werden.',
    isolateFailed: 'Die Lesung des angeklickten Kanji konnte nicht isoliert werden.',
    invalidFormat: 'Das Format der KI-Antwort war ungültig.',
    noReading: 'Die KI hat keine Lesung zurückgegeben.',
    notHiragana: 'Die KI hat die Lesung nicht in Hiragana zurückgegeben.',
    emptyClaude: 'Claude hat leer geantwortet.',
    emptyGemini: 'Gemini hat leer geantwortet.',
    emptyOpenAI: 'OpenAI hat leer geantwortet.',
    networkPrefix: 'Netzwerkfehler: ',
    geminiBusy: 'Gemini ist ausgelastet. Bitte versuche es gleich noch einmal.'
  },
  fr: {
    loading: 'Analyse…',
    close: 'Fermer',
    unknownError: 'Erreur inconnue',
    noResponse: 'Aucune réponse — vérifie le script d’arrière-plan',
    keyRequired: provider => `Ajoute une clé API ${provider} (Popup de l’extension → Réglages).`,
    noSelection: 'Aucun texte sélectionné.',
    cancelled: 'La requête a été annulée.',
    timedOut: 'Le délai de réponse a été dépassé.',
    parseFailed: 'La réponse de l’IA n’a pas pu être interprétée.',
    isolateFailed: 'La lecture du kanji cliqué n’a pas pu être isolée.',
    invalidFormat: 'Le format de la réponse de l’IA était invalide.',
    noReading: 'L’IA n’a renvoyé aucune lecture.',
    notHiragana: 'L’IA n’a pas renvoyé la lecture en hiragana.',
    emptyClaude: 'Claude a renvoyé une réponse vide.',
    emptyGemini: 'Gemini a renvoyé une réponse vide.',
    emptyOpenAI: 'OpenAI a renvoyé une réponse vide.',
    networkPrefix: 'Erreur réseau : ',
    geminiBusy: 'Gemini est occupé. Réessaie dans un instant.'
  },
  it: {
    loading: 'Analisi…',
    close: 'Chiudi',
    unknownError: 'Errore sconosciuto',
    noResponse: 'Nessuna risposta — controlla il background script',
    keyRequired: provider => `Aggiungi una chiave API ${provider} (Popup dell’estensione → Impostazioni).`,
    noSelection: 'Nessun testo selezionato.',
    cancelled: 'La richiesta è stata annullata.',
    timedOut: 'Tempo di risposta scaduto.',
    parseFailed: 'La risposta dell’IA non è stata interpretata.',
    isolateFailed: 'Non è stato possibile isolare la lettura del kanji cliccato.',
    invalidFormat: 'Il formato della risposta dell’IA non era valido.',
    noReading: 'L’IA non ha restituito una lettura.',
    notHiragana: 'L’IA non ha restituito la lettura in hiragana.',
    emptyClaude: 'Claude ha restituito una risposta vuota.',
    emptyGemini: 'Gemini ha restituito una risposta vuota.',
    emptyOpenAI: 'OpenAI ha restituito una risposta vuota.',
    networkPrefix: 'Errore di rete: ',
    geminiBusy: 'Gemini è occupato. Riprova tra poco.'
  },
  es: {
    loading: 'Analizando…',
    close: 'Cerrar',
    unknownError: 'Error desconocido',
    noResponse: 'Sin respuesta — revisa el script en segundo plano',
    keyRequired: provider => `Añade una clave API de ${provider} (Ventana de la extensión → Ajustes).`,
    noSelection: 'No se seleccionó ningún texto.',
    cancelled: 'La solicitud fue cancelada.',
    timedOut: 'Se agotó el tiempo de espera.',
    parseFailed: 'No se pudo interpretar la respuesta de la IA.',
    isolateFailed: 'No se pudo aislar la lectura del kanji pulsado.',
    invalidFormat: 'El formato de la respuesta de la IA no era válido.',
    noReading: 'La IA no devolvió una lectura.',
    notHiragana: 'La IA no devolvió la lectura en hiragana.',
    emptyClaude: 'Claude devolvió una respuesta vacía.',
    emptyGemini: 'Gemini devolvió una respuesta vacía.',
    emptyOpenAI: 'OpenAI devolvió una respuesta vacía.',
    networkPrefix: 'Error de red: ',
    geminiBusy: 'Gemini está ocupado. Vuelve a intentarlo en un momento.'
  },
  ar: {
    loading: 'جارٍ التحليل…',
    close: 'إغلاق',
    unknownError: 'خطأ غير معروف',
    noResponse: 'لا توجد استجابة — تحقّق من نص الخلفية',
    keyRequired: provider => `أضف مفتاح API لـ ${provider} (نافذة الإضافة → الإعدادات).`,
    noSelection: 'لم يتم تحديد أي نص.',
    cancelled: 'تم إلغاء الطلب.',
    timedOut: 'انتهت مهلة الاستجابة.',
    parseFailed: 'تعذّر تفسير استجابة الذكاء الاصطناعي.',
    isolateFailed: 'تعذّر عزل قراءة الكانجي الذي تم النقر عليه.',
    invalidFormat: 'تنسيق استجابة الذكاء الاصطناعي غير صالح.',
    noReading: 'لم يُرجع الذكاء الاصطناعي قراءة.',
    notHiragana: 'لم يُرجع الذكاء الاصطناعي القراءة بالهيراغانا.',
    emptyClaude: 'أعاد Claude استجابة فارغة.',
    emptyGemini: 'أعاد Gemini استجابة فارغة.',
    emptyOpenAI: 'أعاد OpenAI استجابة فارغة.',
    networkPrefix: 'خطأ في الشبكة: ',
    geminiBusy: 'Gemini مشغول الآن. حاول مرة أخرى بعد قليل.'
  },
  'zh-hans': {
    loading: '分析中…',
    close: '关闭',
    unknownError: '未知错误',
    noResponse: '无响应 — 请检查 background script',
    keyRequired: provider => `请添加 ${provider} API 密钥（扩展弹窗 → 设置）。`,
    noSelection: '没有选中文本。',
    cancelled: '请求已取消。',
    timedOut: '响应超时。',
    parseFailed: '无法解析 AI 响应。',
    isolateFailed: '无法分离被点击汉字的读音。',
    invalidFormat: 'AI 响应格式无效。',
    noReading: 'AI 没有返回读音。',
    notHiragana: 'AI 返回的读音不是平假名。',
    emptyClaude: 'Claude 返回了空响应。',
    emptyGemini: 'Gemini 返回了空响应。',
    emptyOpenAI: 'OpenAI 返回了空响应。',
    networkPrefix: '网络错误：',
    geminiBusy: 'Gemini 当前繁忙，请稍后再试。'
  },
  'zh-hant': {
    loading: '分析中…',
    close: '關閉',
    unknownError: '未知錯誤',
    noResponse: '無回應 — 請檢查 background script',
    keyRequired: provider => `請加入 ${provider} API 金鑰（擴充功能彈窗 → 設定）。`,
    noSelection: '沒有選取文字。',
    cancelled: '請求已取消。',
    timedOut: '回應逾時。',
    parseFailed: '無法解析 AI 回應。',
    isolateFailed: '無法分離被點擊漢字的讀音。',
    invalidFormat: 'AI 回應格式無效。',
    noReading: 'AI 沒有返回讀音。',
    notHiragana: 'AI 返回的讀音不是平假名。',
    emptyClaude: 'Claude 返回了空回應。',
    emptyGemini: 'Gemini 返回了空回應。',
    emptyOpenAI: 'OpenAI 返回了空回應。',
    networkPrefix: '網路錯誤：',
    geminiBusy: 'Gemini 目前繁忙，請稍後再試。'
  }
});

let tooltip = null;
let currentSelectionKey = null;
let isEnabled = true;
let lastAnchor = { x: 0, y: 0 };
let requestSerial = 0;
let publicSettings = { ...PUBLIC_SETTINGS_DEFAULTS };
let currentUiLanguage = 'en';

function normalizeUiLanguage(value) {
  const raw = String(value || '').trim().toLowerCase().replace(/_/g, '-');
  if (!raw) return 'en';
  if (UI_LANGUAGE_META[raw]) return raw;
  if (raw === 'zh' || raw.startsWith('zh-cn') || raw.startsWith('zh-sg') || raw.startsWith('zh-hans')) return 'zh-hans';
  if (raw.startsWith('zh-tw') || raw.startsWith('zh-hk') || raw.startsWith('zh-mo') || raw.startsWith('zh-hant')) return 'zh-hant';
  const short = raw.split('-')[0];
  return UI_LANGUAGE_META[short] ? short : 'en';
}

function getLocaleBundle() {
  return CONTENT_I18N[currentUiLanguage] || CONTENT_I18N.en;
}

function ct(key, ...args) {
  const entry = getLocaleBundle()[key];
  return typeof entry === 'function' ? entry(...args) : entry;
}

function localizeErrorMessage(message) {
  const raw = String(message || '').trim();
  if (!raw) return ct('unknownError');

  const exact = new Map([
    ['No text was selected.', ct('noSelection')],
    ['The request was cancelled.', ct('cancelled')],
    ['The response timed out.', ct('timedOut')],
    ['The AI response could not be parsed.', ct('parseFailed')],
    ['The clicked kanji reading could not be isolated.', ct('isolateFailed')],
    ['The AI response format was invalid.', ct('invalidFormat')],
    ['The AI did not return a reading.', ct('noReading')],
    ['The AI did not return the reading in hiragana.', ct('notHiragana')],
    ['Claude returned an empty response.', ct('emptyClaude')],
    ['Gemini returned an empty response.', ct('emptyGemini')],
    ['OpenAI returned an empty response.', ct('emptyOpenAI')],
    ['Gemini is busy. Please try again shortly.', ct('geminiBusy')],
    ['No response — check the background script', ct('noResponse')],
    ['No response — check the background script.', ct('noResponse')]
  ]);

  if (exact.has(raw)) return exact.get(raw);

  if (raw.startsWith('Network error: ')) {
    return ct('networkPrefix') + raw.slice('Network error: '.length);
  }

  const missingKeyMatch = raw.match(/^(OpenAI|Gemini|Claude) API key is missing\. Please add it in Settings\.?$/i);
  if (missingKeyMatch) {
    const provider = getModeLabel(String(missingKeyMatch[1] || '').toLowerCase());
    return ct('keyRequired', provider);
  }

  return raw;
}

function applyTooltipLanguage() {
  if (!tooltip) return;
  tooltip.setAttribute('lang', currentUiLanguage);
  tooltip.setAttribute('dir', UI_LANGUAGE_META[currentUiLanguage]?.dir || 'ltr');
  const loadingLabel = tooltip.querySelector('.kyt-loading span');
  if (loadingLabel) loadingLabel.textContent = ct('loading');
  const closeBtn = tooltip.querySelector('.kyt-close');
  if (closeBtn) closeBtn.title = ct('close');
  const meaningEl = tooltip.querySelector('.kyt-meaning');
  if (meaningEl) meaningEl.dir = UI_LANGUAGE_META[currentUiLanguage]?.dir || 'ltr';
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function katakanaToHiragana(value) {
  return String(value || '').replace(/[ァ-ヶ]/g, ch =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );
}

function normalizeYomigana(value) {
  return katakanaToHiragana(String(value || ''))
    .replace(/[\s　]+/g, '')
    .trim();
}

function makeItemKey(original, yomigana) {
  return `${String(original || '').trim()}::${normalizeYomigana(yomigana)}`;
}

function getDateKey(date = new Date()) {
  return date.toDateString();
}

function ensureTooltip() {
  if (tooltip) return tooltip;

  tooltip = document.createElement('div');
  tooltip.id = 'kanji-yomigana-tooltip';
  tooltip.innerHTML = `
    <div class="kyt-inner">
      <div class="kyt-loading">
        <div class="kyt-spinner"></div>
        <span>${escapeHtml(ct('loading'))}</span>
      </div>
      <div class="kyt-content" style="display:none">
        <div class="kyt-yomigana"></div>
        <div class="kyt-meta">
          <div class="kyt-original"></div>
          <span class="kyt-api-badge"></span>
        </div>
        <div class="kyt-meaning"></div>
      </div>
      <button class="kyt-close" title="${escapeHtml(ct('close'))}">✕</button>
    </div>`;

  document.documentElement.appendChild(tooltip);
  tooltip.querySelector('.kyt-close').addEventListener('click', hideTooltip);
  applyTooltipLanguage();
  return tooltip;
}

function buildFuriganaHTML(yomigana, displayOriginal, target) {
  const safeDisplay = String(displayOriginal || target || '');
  const safeTarget = String(target || displayOriginal || '');

  if (!safeDisplay) {
    return `<span class="kyt-furi-group"><span class="kyt-furi-kana">(${escapeHtml(yomigana)})</span></span>`;
  }

  const targetIndex = safeTarget ? safeDisplay.indexOf(safeTarget) : -1;
  if (targetIndex === -1) {
    return `<span class="kyt-furi-group"><span class="kyt-furi-kana">(${escapeHtml(yomigana)})</span></span>`;
  }

  const prefix = safeDisplay.slice(0, targetIndex);
  const suffix = safeDisplay.slice(targetIndex + safeTarget.length);
  return `${escapeHtml(prefix)}<span class="kyt-furi-group"><span class="kyt-furi-kana">(${escapeHtml(yomigana)})</span></span>${escapeHtml(suffix)}`;
}

function placeTooltip(cx, cy) {
  const tip = ensureTooltip();
  const margin = 14;
  const rect = tip.getBoundingClientRect();
  const width = Math.max(rect.width || 0, 300);
  const height = Math.max(rect.height || 0, 110);

  let left = cx + margin;
  let top = cy - height / 2;

  if (left + width > window.innerWidth - margin) left = cx - width - margin;
  if (left < margin) left = margin;
  if (top < margin) top = margin;
  if (top + height > window.innerHeight - margin) top = window.innerHeight - height - margin;

  tip.style.left = `${left + window.scrollX}px`;
  tip.style.top = `${top + window.scrollY}px`;
}

function repositionTooltip() {
  if (!tooltip || !tooltip.classList.contains('kyt-visible')) return;
  requestAnimationFrame(() => placeTooltip(lastAnchor.x, lastAnchor.y));
}

function showLoading(cx, cy) {
  lastAnchor = { x: cx, y: cy };
  const tip = ensureTooltip();
  const loading = tip.querySelector('.kyt-loading');
  const content = tip.querySelector('.kyt-content');
  const badge = tip.querySelector('.kyt-api-badge');

  loading.innerHTML = `<div class="kyt-spinner"></div><span>${escapeHtml(ct('loading'))}</span>`;
  loading.style.display = 'flex';
  content.style.display = 'none';
  if (badge) badge.textContent = '';

  tip.classList.add('kyt-visible');
  placeTooltip(cx, cy);
}

function showResult(displayOriginal, target, yomigana, meaning, apiLabel) {
  const tip = ensureTooltip();
  const loading = tip.querySelector('.kyt-loading');
  const content = tip.querySelector('.kyt-content');
  const yomiganaEl = tip.querySelector('.kyt-yomigana');
  const originalEl = tip.querySelector('.kyt-original');
  const meaningEl = tip.querySelector('.kyt-meaning');
  const badge = tip.querySelector('.kyt-api-badge');

  loading.style.display = 'none';
  content.style.display = 'block';
  yomiganaEl.innerHTML = buildFuriganaHTML(yomigana, displayOriginal, target);
  originalEl.textContent = displayOriginal || target || '';

  if (meaning) {
    meaningEl.textContent = meaning;
    meaningEl.style.display = 'block';
  } else {
    meaningEl.textContent = '';
    meaningEl.style.display = 'none';
  }
  meaningEl.dir = UI_LANGUAGE_META[currentUiLanguage]?.dir || 'ltr';

  if (badge) badge.textContent = apiLabel || '';
  repositionTooltip();
}

function showError(message) {
  const tip = ensureTooltip();
  const loading = tip.querySelector('.kyt-loading');
  const content = tip.querySelector('.kyt-content');
  const badge = tip.querySelector('.kyt-api-badge');

  loading.innerHTML = '';
  const span = document.createElement('span');
  span.style.color = '#ff6b6b';
  span.style.fontSize = '12px';
  span.textContent = `⚠ ${localizeErrorMessage(message)}`;
  loading.appendChild(span);
  loading.style.display = 'flex';
  content.style.display = 'none';
  if (badge) badge.textContent = '';
  repositionTooltip();
}

function hideTooltip() {
  if (tooltip) tooltip.classList.remove('kyt-visible');
  currentSelectionKey = null;
}

function isClickOnCharacter(node, text, cx, cy, offset) {
  if (offset < 0 || offset >= text.length) return false;

  const charRange = document.createRange();
  charRange.setStart(node, offset);
  charRange.setEnd(node, offset + 1);

  const rects = charRange.getClientRects();
  if (!rects.length) return false;
  const rect = rects[0];
  const tolerance = 6;

  return cx >= rect.left - tolerance && cx <= rect.right + tolerance &&
         cy >= rect.top - tolerance && cy <= rect.bottom + tolerance;
}

function pointWithinRect(cx, cy, rect, tolerance = 6) {
  return cx >= rect.left - tolerance && cx <= rect.right + tolerance &&
         cy >= rect.top - tolerance && cy <= rect.bottom + tolerance;
}

function distanceToRectSquared(cx, cy, rect) {
  const dx = cx < rect.left ? rect.left - cx : cx > rect.right ? cx - rect.right : 0;
  const dy = cy < rect.top ? rect.top - cy : cy > rect.bottom ? cy - rect.bottom : 0;
  return dx * dx + dy * dy;
}

function getTextDescendant(node, forward = true) {
  if (!node) return null;

  const root = node instanceof ShadowRoot ? node : node;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(textNode) {
      if (!textNode?.textContent || !textNode.textContent.trim()) return NodeFilter.FILTER_REJECT;
      const parent = textNode.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (tooltip && tooltip.contains(parent)) return NodeFilter.FILTER_REJECT;
      if (/^(SCRIPT|STYLE|NOSCRIPT|IFRAME|TEXTAREA|OPTION)$/i.test(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  if (forward) return walker.nextNode();
  let last = null;
  let current = walker.nextNode();
  while (current) {
    last = current;
    current = walker.nextNode();
  }
  return last;
}

function resolveTextNodeFromRange(range) {
  if (!range) return null;
  let node = range.startContainer;
  let offset = range.startOffset || 0;

  if (node?.nodeType === Node.TEXT_NODE) {
    return { node, offset };
  }

  if (node?.nodeType === Node.ELEMENT_NODE) {
    const children = Array.from(node.childNodes || []);

    if (children[offset]) {
      const candidate = children[offset].nodeType === Node.TEXT_NODE
        ? children[offset]
        : getTextDescendant(children[offset], true);
      if (candidate) return { node: candidate, offset: 0 };
    }

    for (let index = Math.min(offset - 1, children.length - 1); index >= 0; index--) {
      const child = children[index];
      const candidate = child.nodeType === Node.TEXT_NODE ? child : getTextDescendant(child, false);
      if (candidate) {
        return { node: candidate, offset: Math.max(0, (candidate.textContent || '').length - 1) };
      }
    }

    const descendant = getTextDescendant(node, true);
    if (descendant) return { node: descendant, offset: 0 };
  }

  return null;
}

function findCharacterOffsetByRectScan(textNode, cx, cy) {
  const text = textNode?.textContent || '';
  if (!text.trim()) return -1;

  const fullRange = document.createRange();
  fullRange.selectNodeContents(textNode);
  const bounds = fullRange.getBoundingClientRect();
  if (!bounds || (!bounds.width && !bounds.height) || distanceToRectSquared(cx, cy, bounds) > 196) {
    return -1;
  }

  const probe = document.createRange();
  let bestOffset = -1;
  let bestDistance = Infinity;

  const maxChars = Math.min(text.length, TEXT_SCAN_MAX_CHARS);
  for (let index = 0; index < maxChars; index++) {
    const ch = text[index];
    if (!ch || /\s/.test(ch)) continue;

    probe.setStart(textNode, index);
    probe.setEnd(textNode, index + 1);
    const rects = probe.getClientRects();
    if (!rects?.length) continue;

    for (const rect of rects) {
      if (!rect.width && !rect.height) continue;
      if (pointWithinRect(cx, cy, rect, 5)) return index;
      const distance = distanceToRectSquared(cx, cy, rect);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestOffset = index;
      }
    }
  }

  return bestDistance <= 100 ? bestOffset : -1;
}

function collectPointCandidateContainers(cx, cy, baseElement) {
  const containers = [];
  const seen = new Set();

  const push = element => {
    if (!(element instanceof Element)) return;
    if (tooltip && tooltip.contains(element)) return;
    if (seen.has(element)) return;
    seen.add(element);
    containers.push(element);
  };

  if (baseElement instanceof Element) {
    push(baseElement);
    push(baseElement.closest('[data-testid="message-content"], [data-message-author-role], .markdown, .prose, article, p, li, div'));
  }

  const elements = typeof document.elementsFromPoint === 'function'
    ? document.elementsFromPoint(cx, cy)
    : [];
  for (const element of elements) {
    push(element);
    push(element.closest('[data-testid="message-content"], [data-message-author-role], .markdown, .prose, article, p, li, div'));
  }

  return containers;
}

function findTextPointFromScan(cx, cy, baseElement) {
  const containers = collectPointCandidateContainers(cx, cy, baseElement);

  for (const container of containers) {
    const textNodes = collectReadableTextNodes(container).slice(0, TEXT_SCAN_MAX_NODES);
    for (const textNode of textNodes) {
      const offset = findCharacterOffsetByRectScan(textNode, cx, cy);
      if (offset >= 0) {
        return { node: textNode, offset };
      }
    }
  }

  return null;
}

function isSentenceBoundary(ch) {
  return /[。！？!?．\n\r]/.test(ch);
}

function normalizeWhitespace(value) {
  return String(value || '').replace(/[\s　]+/g, ' ').trim();
}

function clipContextAroundTarget(context, target, maxLen = 90) {
  if (context.length <= maxLen) return context;

  const targetIndex = context.indexOf(target);
  if (targetIndex === -1) return `${context.slice(0, maxLen - 1)}…`;

  const targetEnd = targetIndex + target.length;
  const idealLeft = Math.max(0, targetIndex - Math.floor((maxLen - target.length) / 2));
  const left = Math.min(idealLeft, Math.max(0, context.length - maxLen));
  const right = Math.min(context.length, left + maxLen);

  return `${left > 0 ? '…' : ''}${context.slice(left, right)}${right < context.length ? '…' : ''}`;
}

function getContextContainer(node) {
  const base = node?.parentElement;
  if (!base) return document.body;
  return base.closest('p, li, td, th, article, section, main, aside, header, footer, h1, h2, h3, h4, h5, h6, blockquote, figcaption, dd, dt, div') || base;
}

function collectReadableTextNodes(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
    acceptNode(textNode) {
      if (!textNode?.textContent || !textNode.textContent.trim()) {
        return NodeFilter.FILTER_REJECT;
      }

      const parent = textNode.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (/^(SCRIPT|STYLE|NOSCRIPT|IFRAME|TEXTAREA|OPTION)$/i.test(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }

      const style = window.getComputedStyle(parent);
      if (style.display === 'none' || style.visibility === 'hidden') {
        return NodeFilter.FILTER_REJECT;
      }

      return NodeFilter.FILTER_ACCEPT;
    }
  });

  let current = walker.nextNode();
  while (current) {
    nodes.push(current);
    current = walker.nextNode();
  }

  return nodes;
}

function buildJoinedTextData(node) {
  if (!node) return null;

  const container = getContextContainer(node);
  const textNodes = collectReadableTextNodes(container);
  if (!textNodes.length) return null;

  let joined = '';
  let nodeStart = -1;

  for (const textNode of textNodes) {
    const value = textNode.textContent || '';
    if (textNode === node) nodeStart = joined.length;
    joined += value;
  }

  if (nodeStart === -1) return null;
  return { joined, nodeStart };
}

function scanLeftWhile(source, index, predicate) {
  let cursor = index;
  while (cursor > 0 && predicate(source[cursor - 1] || '')) cursor -= 1;
  return cursor;
}

function normalizeKanaSurface(value) {
  return katakanaToHiragana(String(value || '')).replace(/[\s　]+/g, '');
}

function extractScopePrefixFromJoined(joined, targetStart) {
  let scopeStart = targetStart;
  let steps = 0;

  while (scopeStart > 0 && steps < 8) {
    steps += 1;
    let moved = false;

    const kanaStart = scanLeftWhile(joined, scopeStart, ch => RE_KANA.test(ch));
    if (kanaStart < scopeStart) {
      const segment = normalizeKanaSurface(joined.slice(kanaStart, scopeStart));
      const beforeSegment = joined[kanaStart - 1] || '';
      const allowKanaSegment =
        (RE_KANJI.test(beforeSegment) && segment && !SCOPE_LEFT_BLOCK_SEGMENTS.has(segment)) ||
        SCOPE_HONORIFIC_PREFIXES.has(segment);

      if (!allowKanaSegment) break;

      scopeStart = kanaStart;
      moved = true;
    }

    const kanjiStart = scanLeftWhile(joined, scopeStart, ch => RE_KANJI.test(ch));
    if (kanjiStart < scopeStart) {
      scopeStart = kanjiStart;
      continue;
    }

    if (!moved) break;
  }

  const prefix = joined.slice(scopeStart, targetStart);
  return prefix.length > SCOPE_PREFIX_MAX_CHARS ? prefix.slice(-SCOPE_PREFIX_MAX_CHARS) : prefix;
}

function buildReadingScope(target, displayOriginal, node, start, end) {
  const safeTarget = String(target || '').trim();
  const safeDisplay = String(displayOriginal || safeTarget).trim() || safeTarget;
  const joinedData = buildJoinedTextData(node);

  if (!joinedData) {
    return {
      scopeText: safeDisplay,
      targetStartInScope: 0,
      targetEndInScope: safeTarget.length
    };
  }

  const absoluteStart = joinedData.nodeStart + start;
  const prefix = extractScopePrefixFromJoined(joinedData.joined, absoluteStart);
  const scopeText = `${prefix}${safeDisplay}`.trim() || safeDisplay;

  return {
    scopeText,
    targetStartInScope: prefix.length,
    targetEndInScope: prefix.length + safeTarget.length
  };
}

function extractTrailingKanaCandidateFromText(source, startIndex, maxLen = 8) {
  let index = startIndex;
  let candidate = '';

  while (index < source.length && candidate.length < maxLen) {
    const ch = source[index];
    if (!RE_KANA.test(ch)) break;
    candidate += ch;
    index += 1;
  }

  return candidate;
}

function extractTrailingKanaCandidate(text, end, node) {
  const joinedData = buildJoinedTextData(node);
  if (joinedData) {
    return extractTrailingKanaCandidateFromText(joinedData.joined, joinedData.nodeStart + end);
  }
  return extractTrailingKanaCandidateFromText(text, end);
}

function trimInlineFunctionTail(run) {
  let cutIndex = run.length;
  for (const marker of SURFACE_INLINE_CUT_MARKERS) {
    const index = run.indexOf(marker);
    if (index > 0 && index < cutIndex) {
      cutIndex = index;
    }
  }
  return run.slice(0, cutIndex);
}

function trimTerminalParticleTail(run) {
  if (!run || run.length < 2) return run;

  let candidate = run;
  while (candidate.length > 1 && SURFACE_TERMINAL_PARTICLES.has(candidate[candidate.length - 1])) {
    candidate = candidate.slice(0, -1);
  }

  return candidate || run;
}

function buildLookupText(target, displayOriginal) {
  const safeTarget = String(target || '').trim();
  const safeDisplay = String(displayOriginal || safeTarget).trim();

  if (!safeTarget || !safeDisplay || !safeDisplay.startsWith(safeTarget)) {
    return safeTarget;
  }

  const suffix = safeDisplay.slice(safeTarget.length);
  if (!suffix) return safeTarget;
  if (!/[ぁ-ゖゝゞァ-ヺー]/.test(suffix)) return safeTarget;
  return safeDisplay;
}

function resolveDisplayOriginal(target, suffixCandidate) {
  const normalizedTarget = String(target || '').trim();
  const rawSuffix = katakanaToHiragana(String(suffixCandidate || '').replace(/[\s　]+/g, ''));
  if (!normalizedTarget || !rawSuffix) return normalizedTarget;

  const overrideKey = `${normalizedTarget}${rawSuffix}`;
  if (SURFACE_SUFFIX_OVERRIDES[overrideKey]) {
    return `${normalizedTarget}${SURFACE_SUFFIX_OVERRIDES[overrideKey]}`;
  }

  if (SURFACE_BLOCK_PREFIXES.some(prefix => rawSuffix.startsWith(prefix))) {
    return normalizedTarget;
  }

  let candidate = trimInlineFunctionTail(rawSuffix);
  if (!candidate) return normalizedTarget;

  candidate = trimTerminalParticleTail(candidate);
  if (!candidate) return normalizedTarget;

  if (candidate.length === 1 && SURFACE_SINGLE_PARTICLES.has(candidate)) {
    return normalizedTarget;
  }

  if (normalizedTarget.length > 1) {
    return normalizedTarget;
  }

  return `${normalizedTarget}${candidate}`;
}

function trimDisplaySuffixFromReading(yomigana, target, displayOriginal) {
  const normalizedReading = normalizeYomigana(yomigana);
  const safeTarget = String(target || '').trim();
  const safeDisplay = String(displayOriginal || safeTarget).trim();

  if (!normalizedReading || !safeTarget || !safeDisplay.startsWith(safeTarget)) {
    return normalizedReading;
  }

  const suffix = katakanaToHiragana(safeDisplay.slice(safeTarget.length)).replace(/[^ぁ-ゖゝゞー]/g, '');
  if (suffix && normalizedReading.length > suffix.length && normalizedReading.endsWith(suffix)) {
    return normalizedReading.slice(0, -suffix.length);
  }

  return normalizedReading;
}

function extractSentenceContext(text, start, end, node) {
  const joinedData = buildJoinedTextData(node);
  if (joinedData) {
    const absoluteStart = joinedData.nodeStart + start;
    const absoluteEnd = joinedData.nodeStart + end;
    const joined = joinedData.joined;

    let left = absoluteStart;
    let right = absoluteEnd;

    while (left > 0 && !isSentenceBoundary(joined[left - 1])) left--;
    while (right < joined.length && !isSentenceBoundary(joined[right])) right++;

    const containerContext = normalizeWhitespace(joined.slice(left, right));
    const containerTarget = normalizeWhitespace(joined.slice(absoluteStart, absoluteEnd));
    if (containerContext && containerTarget) {
      return clipContextAroundTarget(containerContext, containerTarget);
    }
  }

  let left = start;
  let right = end;

  while (left > 0 && !isSentenceBoundary(text[left - 1])) left--;
  while (right < text.length && !isSentenceBoundary(text[right])) right++;

  let context = normalizeWhitespace(text.slice(left, right));
  if (!context) {
    const fallback = text.slice(Math.max(0, start - 24), Math.min(text.length, end + 24));
    context = normalizeWhitespace(fallback);
  }

  return clipContextAroundTarget(context, normalizeWhitespace(text.slice(start, end)));
}

function extractWordFromPoint(node, offset, cx, cy) {
  if (!node || node.nodeType !== Node.TEXT_NODE) return null;

  const text = node.textContent || '';
  if (!text) return null;

  let resolvedOffset = Math.min(Math.max(offset, 0), Math.max(0, text.length - 1));
  if (!isClickOnCharacter(node, text, cx, cy, resolvedOffset) && !isClickOnCharacter(node, text, cx, cy, resolvedOffset - 1)) {
    const scannedOffset = findCharacterOffsetByRectScan(node, cx, cy);
    if (scannedOffset < 0) return null;
    resolvedOffset = scannedOffset;
  }

  const chAt = text[resolvedOffset] || '';
  const chPrev = text[resolvedOffset - 1] || '';
  const isKanjiAt = RE_KANJI.test(chAt);
  const isKanjiPrev = RE_KANJI.test(chPrev);
  if (!isKanjiAt && !isKanjiPrev) return null;

  let pos = isKanjiAt ? resolvedOffset : resolvedOffset - 1;
  if (pos < 0) pos = 0;

  let start = pos;
  while (start > 0 && RE_KANJI.test(text[start - 1])) start--;

  let end = pos + 1;
  while (end < text.length && RE_KANJI.test(text[end])) end++;

  const target = normalizeWhitespace(text.slice(start, end));
  if (!target || !RE_KANJI.test(target)) return null;

  const context = extractSentenceContext(text, start, end, node);
  const suffixCandidate = extractTrailingKanaCandidate(text, end, node);
  const displayOriginal = resolveDisplayOriginal(target, suffixCandidate);
  const scope = buildReadingScope(target, displayOriginal, node, start, end);
  return { target, context, suffixCandidate, displayOriginal, ...scope };
}

function extractWord(cx, cy, baseElement = null) {
  const range = document.caretRangeFromPoint
    ? document.caretRangeFromPoint(cx, cy)
    : (() => {
        if (!document.caretPositionFromPoint) return null;
        const position = document.caretPositionFromPoint(cx, cy);
        if (!position) return null;
        const fallback = document.createRange();
        fallback.setStart(position.offsetNode, position.offset);
        fallback.collapse(true);
        return fallback;
      })();

  const resolved = resolveTextNodeFromRange(range);
  const primary = resolved ? extractWordFromPoint(resolved.node, resolved.offset, cx, cy) : null;
  if (primary) return primary;

  const scanned = findTextPointFromScan(cx, cy, baseElement);
  if (!scanned) return null;
  return extractWordFromPoint(scanned.node, scanned.offset, cx, cy);
}

function requestYomigana(text, context, lookupText = '', scopeText = '', targetStartInScope = 0, targetEndInScope = 0) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { action: 'getYomigana', text, context, lookupText, scopeText, targetStartInScope, targetEndInScope },
      response => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else if (!response) {
          reject(new Error(ct('noResponse')));
        } else if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response);
        }
      }
    );
  });
}


function saveToHistory(entry) {
  const payload = {
    ...entry,
    url: location.href,
    title: document.title
  };

  chrome.runtime.sendMessage({ action: 'recordLookup', entry: payload }, () => {
    void chrome.runtime.lastError;
  });
}

function hasEditableAncestor(element) {
  if (!(element instanceof Element)) return false;

  const editable = element.closest('input, textarea, select, option, [contenteditable], [role="textbox"]');
  if (!editable) return false;

  if (editable.matches('[contenteditable]')) {
    const raw = String(editable.getAttribute('contenteditable') || '').trim().toLowerCase();
    return raw === '' || raw === 'true' || raw === 'plaintext-only';
  }

  return true;
}

function isBlockedCodeLikeElement(element) {
  if (!(element instanceof Element)) return false;

  if (element.closest('pre, kbd, samp, math, svg')) return true;

  const code = element.closest('code');
  if (code && code.closest('pre')) return true;

  return false;
}

function isEditableOrSensitive(element) {
  return hasEditableAncestor(element) || isBlockedCodeLikeElement(element);
}

function getEventPrimaryElement(event) {
  const path = typeof event.composedPath === 'function' ? event.composedPath() : [];
  for (const entry of path) {
    if (entry instanceof Element) return entry;
  }
  return event.target instanceof Element ? event.target : null;
}

function getInteractiveAncestor(element) {
  if (!(element instanceof Element)) return null;
  return element.closest('button, a[href], input, select, textarea, label, summary, option, [role="button"], [role="link"]');
}

function isInteractive(element) {
  return !!getInteractiveAncestor(element);
}

function getModeLabel(mode) {
  if (mode === 'openai') return 'OpenAI';
  if (mode === 'gemini') return 'Gemini';
  return 'Claude';
}


function sendRuntimeMessage(message) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, response => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve(response || {});
      }
    });
  });
}

async function hasSelectedProviderKey() {
  const response = await sendRuntimeMessage({ action: 'checkProviderReady' });
  return {
    ok: Boolean(response.ok),
    mode: response.mode || 'claude',
    label: response.label || getModeLabel(response.mode || 'claude')
  };
}

function normalizeSitePattern(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^\./, '')
    .replace(/\/.*$/, '');
}

function splitSitePatterns(raw) {
  return Array.from(new Set(
    String(raw || '')
      .split(/[\n,]/)
      .map(normalizeSitePattern)
      .filter(Boolean)
  ));
}

function hostnameMatchesPattern(hostname, pattern) {
  const host = normalizeSitePattern(hostname);
  const normalizedPattern = normalizeSitePattern(pattern);
  if (!host || !normalizedPattern) return false;

  if (normalizedPattern.startsWith('*.')) {
    const suffix = normalizedPattern.slice(2);
    return host === suffix || host.endsWith(`.${suffix}`);
  }

  return host === normalizedPattern || host.endsWith(`.${normalizedPattern}`);
}

function sitePatternListMatches(hostname, patterns) {
  return patterns.some(pattern => hostnameMatchesPattern(hostname, pattern));
}

function isSiteAllowed(hostname = location.hostname) {
  const host = normalizeSitePattern(hostname);
  if (!host) return true;

  const allowlist = splitSitePatterns(publicSettings.siteAllowlistText);
  if (sitePatternListMatches(host, allowlist)) return true;

  if (publicSettings.siteAccessMode === 'allow_only') {
    return false;
  }

  const blocklist = DEFAULT_BLOCKED_HOST_PATTERNS.concat(splitSitePatterns(publicSettings.siteBlocklistText));
  return !sitePatternListMatches(host, blocklist);
}

function applyPublicSettings(nextSettings) {
  publicSettings = {
    ...PUBLIC_SETTINGS_DEFAULTS,
    ...publicSettings,
    ...(nextSettings || {})
  };
  currentUiLanguage = normalizeUiLanguage(publicSettings.uiLanguage);
  isEnabled = publicSettings.kanjEnabled !== false;
  applyTooltipLanguage();
  if (!isEnabled) hideTooltip();
}

function loadPublicSettings() {
  chrome.storage.sync.get(PUBLIC_SETTINGS_DEFAULTS, stored => {
    applyPublicSettings(stored);
  });
}

document.addEventListener('click', async event => {
  const target = getEventPrimaryElement(event);
  if (!(target instanceof Element)) return;

  if (tooltip && tooltip.contains(target)) return;
  if (!isEnabled) {
    hideTooltip();
    return;
  }
  if (!isSiteAllowed()) {
    hideTooltip();
    return;
  }
  if (event.button !== 0) return;

  const computed = window.getComputedStyle(target);
  if (computed.pointerEvents === 'none' || computed.visibility === 'hidden') {
    hideTooltip();
    return;
  }

  if (isEditableOrSensitive(target)) return;

  const interactiveAncestor = getInteractiveAncestor(target);
  const forceInteractiveLookup = !!interactiveAncestor && (event.altKey || event.ctrlKey || event.metaKey);
  if (interactiveAncestor && !forceInteractiveLookup) return;

  const extracted = extractWord(event.clientX, event.clientY, target);
  if (!extracted) {
    hideTooltip();
    return;
  }

  if (forceInteractiveLookup) {
    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
  }

  const providerState = await hasSelectedProviderKey().catch(() => ({ ok: false, mode: 'claude' }));
  if (!providerState.ok) {
    showLoading(event.clientX, event.clientY);
    showError(ct('keyRequired', getModeLabel(providerState.mode)));
    return;
  }

  const selectionKey = `${extracted.target}@@${extracted.context}@@${extracted.scopeText || ''}`;
  if (selectionKey === currentSelectionKey && tooltip && tooltip.classList.contains('kyt-visible')) {
    hideTooltip();
    return;
  }

  currentSelectionKey = selectionKey;
  const currentRequestId = ++requestSerial;
  showLoading(event.clientX, event.clientY);

  try {
    const displayOriginal = String(extracted.displayOriginal || extracted.target || '').trim() || extracted.target;
    const lookupText = buildLookupText(extracted.target, displayOriginal);
    const result = await requestYomigana(
      extracted.target,
      extracted.context,
      lookupText,
      extracted.scopeText || lookupText,
      extracted.targetStartInScope || 0,
      extracted.targetEndInScope || extracted.target.length
    );
    if (currentRequestId !== requestSerial) return;

    const yomigana = trimDisplaySuffixFromReading(result.yomigana || '', extracted.target, displayOriginal);
    showResult(displayOriginal, extracted.target, yomigana, result.meaning || '', result.apiLabel || '');
    saveToHistory({
      itemKey: makeItemKey(displayOriginal, yomigana),
      original: displayOriginal,
      yomigana,
      meaning: result.meaning || '',
      context: extracted.context,
      provider: result.apiMode || '',
      model: result.model || '',
      timestamp: Date.now()
    });
  } catch (error) {
    if (currentRequestId !== requestSerial) return;
    showError(error?.message || ct('unknownError'));
  }
}, true);

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') hideTooltip();
});


loadPublicSettings();

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== 'sync') return;

  const nextSettings = {};
  let hasRelevantChange = false;
  for (const key of ['kanjEnabled', 'siteAccessMode', 'siteAllowlistText', 'siteBlocklistText', 'uiLanguage']) {
    if (!changes[key]) continue;
    nextSettings[key] = changes[key].newValue;
    hasRelevantChange = true;
  }

  if (hasRelevantChange) {
    applyPublicSettings(nextSettings);
  }
});
