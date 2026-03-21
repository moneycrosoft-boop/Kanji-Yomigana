const PROVIDERS = {
  claude: {
    id: 'claude',
    persistentKey: 'anthropicKey',
    sessionKey: 'sessionAnthropicKey',
    label: 'Claude Haiku 4.5',
    model: 'claude-haiku-4-5-20251001'
  },
  gemini: {
    id: 'gemini',
    persistentKey: 'geminiKey',
    sessionKey: 'sessionGeminiKey',
    label: 'Gemini 3 Flash Preview',
    model: 'gemini-3-flash-preview'
  },
  openai: {
    id: 'openai',
    persistentKey: 'openaiKey',
    sessionKey: 'sessionOpenaiKey',
    label: 'GPT-5.4 mini',
    model: 'gpt-5.4-mini'
  }
};

const UI_LANGUAGE_META = Object.freeze({
  ar: { code: 'ar', label: 'العربية', locale: 'ar', promptName: 'Arabic' },
  de: { code: 'de', label: 'Deutsch', locale: 'de-DE', promptName: 'German' },
  en: { code: 'en', label: 'English', locale: 'en-US', promptName: 'English' },
  es: { code: 'es', label: 'Español', locale: 'es-ES', promptName: 'Spanish' },
  fr: { code: 'fr', label: 'Français', locale: 'fr-FR', promptName: 'French' },
  it: { code: 'it', label: 'Italiano', locale: 'it-IT', promptName: 'Italian' },
  ko: { code: 'ko', label: '한국어', locale: 'ko-KR', promptName: 'Korean' },
  'zh-hans': { code: 'zh-hans', label: '中文（简体）', locale: 'zh-CN', promptName: 'Simplified Chinese' },
  'zh-hant': { code: 'zh-hant', label: '中文（繁體）', locale: 'zh-TW', promptName: 'Traditional Chinese' }
});

const PUBLIC_SETTINGS_DEFAULTS = Object.freeze({
  apiMode: 'claude',
  kanjEnabled: true,
  keyStorageMode: 'session',
  saveExtendedMetadata: false,
  historyRetentionDays: 30,
  cacheRetentionDays: 7,
  siteAccessMode: 'all_except_blocked',
  siteAllowlistText: '',
  siteBlocklistText: '',
  uiLanguage: 'en'
});

const PRIVATE_STORAGE_KEYS = Object.freeze([
  'kanjiHistory',
  'kanjiClicks',
  'focusDismissed',
  'yomiganaCacheV9',
  'anthropicKey',
  'geminiKey',
  'openaiKey'
]);

const CACHE_STORAGE_KEY = 'yomiganaCacheV9';
const CACHE_MAX_ENTRIES = 500;
const PROMPT_VERSION = 'v9';
const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_MEANING_LEN = 32;
const HISTORY_MAX_ITEMS_PER_DAY = 200;
const CLICKS_MAX_ENTRIES = 2400;
const FETCH_TIMEOUT_MS = 15000;
const RE_HIRAGANA = /^[ぁ-ゖゝゞー・\s]+$/;
const RE_SURFACE_KANA = /[ぁ-ゖゝゞァ-ヺー]/;
const RESPONSE_SCHEMA = Object.freeze({
  type: 'object',
  properties: {
    original: { type: 'string' },
    yomigana: { type: 'string' },
    meaning: { type: 'string' }
  },
  required: ['original', 'yomigana', 'meaning'],
  additionalProperties: false
});

const MEANING_TRANSLATIONS = Object.freeze({
  sincerely: { ko: '정말로', en: 'sincerely', de: 'aufrichtig', fr: 'sincèrement', it: 'sinceramente', es: 'sinceramente', ar: 'بإخلاص', 'zh-hans': '诚挚地', 'zh-hant': '誠摯地' },
  most: { ko: '가장', en: 'most', de: 'am meisten', fr: 'le plus', it: 'il più', es: 'el más', ar: 'الأكثر', 'zh-hans': '最', 'zh-hant': '最' },
  howeverOfCourse: { ko: '하지만/물론', en: 'however/of course', de: 'jedoch/natürlich', fr: 'cependant/bien sûr', it: 'tuttavia/certo', es: 'sin embargo/claro', ar: 'لكن/بالطبع', 'zh-hans': '不过 / 当然', 'zh-hant': '不過 / 當然' },
  insertionAcceptance: { ko: '넣음/수용', en: 'insertion/acceptance', de: 'Einfügen/Aufnahme', fr: 'insertion/acceptation', it: 'inserimento/accoglienza', es: 'inserción/aceptación', ar: 'إدخال/قبول', 'zh-hans': '放入 / 接受', 'zh-hant': '放入 / 接受' },
  receiving: { ko: '받음', en: 'receiving', de: 'Empfang', fr: 'réception', it: 'ricezione', es: 'recepción', ar: 'تلقي', 'zh-hans': '接收', 'zh-hant': '接收' },
  acceptance: { ko: '수용', en: 'acceptance', de: 'Annahme', fr: 'acceptation', it: 'accettazione', es: 'aceptación', ar: 'قبول', 'zh-hans': '受理', 'zh-hant': '受理' },
  celebration: { ko: '축하', en: 'celebration', de: 'Feier', fr: 'célébration', it: 'celebrazione', es: 'celebración', ar: 'احتفال', 'zh-hans': '祝贺', 'zh-hant': '祝賀' },
  application: { ko: '신청', en: 'application', de: 'Antrag', fr: 'demande', it: 'domanda', es: 'solicitud', ar: 'طلب', 'zh-hans': '申请', 'zh-hant': '申請' },
  handling: { ko: '취급', en: 'handling', de: 'Handhabung', fr: 'traitement', it: 'gestione', es: 'manejo', ar: 'تعامل', 'zh-hans': '处理', 'zh-hant': '處理' },
  howToUse: { ko: '사용법', en: 'how to use', de: 'Verwendung', fr: 'mode d\'emploi', it: 'come usare', es: 'modo de uso', ar: 'طريقة الاستخدام', 'zh-hans': '用法', 'zh-hant': '用法' },
  howToRead: { ko: '읽는 법', en: 'how to read', de: 'Lesart', fr: 'lecture', it: 'lettura', es: 'forma de leer', ar: 'طريقة القراءة', 'zh-hans': '读法', 'zh-hant': '讀法' },
  howToWrite: { ko: '쓰는 법', en: 'how to write', de: 'Schreibweise', fr: 'écriture', it: 'come scrivere', es: 'forma de escribir', ar: 'طريقة الكتابة', 'zh-hans': '写法', 'zh-hant': '寫法' },
  methodOfProceeding: { ko: '진행 방법', en: 'approach', de: 'Vorgehensweise', fr: 'manière d\'avancer', it: 'modo di procedere', es: 'forma de avanzar', ar: 'طريقة التقدم', 'zh-hans': '推进方法', 'zh-hant': '推進方法' },
  wayOfThinking: { ko: '생각 방식', en: 'way of thinking', de: 'Denkweise', fr: 'façon de penser', it: 'modo di pensare', es: 'forma de pensar', ar: 'طريقة التفكير', 'zh-hans': '思考方式', 'zh-hant': '思考方式' },
  adult: { ko: '어른', en: 'adult', de: 'Erwachsener', fr: 'adulte', it: 'adulto', es: 'adulto', ar: 'بالغ', 'zh-hans': '成人', 'zh-hant': '成人' },
  onePerson: { ko: '한 사람', en: 'one person', de: 'eine Person', fr: 'une personne', it: 'una persona', es: 'una persona', ar: 'شخص واحد', 'zh-hans': '一人', 'zh-hant': '一人' },
  twoPeople: { ko: '두 사람', en: 'two people', de: 'zwei Personen', fr: 'deux personnes', it: 'due persone', es: 'dos personas', ar: 'شخصان', 'zh-hans': '二人', 'zh-hant': '二人' },
  today: { ko: '오늘', en: 'today', de: 'heute', fr: 'aujourd\'hui', it: 'oggi', es: 'hoy', ar: 'اليوم', 'zh-hans': '今天', 'zh-hant': '今天' },
  yesterday: { ko: '어제', en: 'yesterday', de: 'gestern', fr: 'hier', it: 'ieri', es: 'ayer', ar: 'أمس', 'zh-hans': '昨天', 'zh-hant': '昨天' },
  dayBeforeYesterday: { ko: '그저께', en: 'the day before yesterday', de: 'vorgestern', fr: 'avant-hier', it: 'l\'altro ieri', es: 'anteayer', ar: 'أول أمس', 'zh-hans': '前天', 'zh-hant': '前天' },
  dayAfterTomorrow: { ko: '모레', en: 'the day after tomorrow', de: 'übermorgen', fr: 'après-demain', it: 'dopodomani', es: 'pasado mañana', ar: 'بعد غد', 'zh-hans': '后天', 'zh-hant': '後天' },
  twentyYearsOld: { ko: '스무 살', en: 'twenty years old', de: 'zwanzig Jahre alt', fr: 'vingt ans', it: 'vent\'anni', es: 'veinte años', ar: 'عشرون عامًا', 'zh-hans': '20岁', 'zh-hant': '20歲' },
  personHonorific: { ko: '분', en: 'person', de: 'Person', fr: 'personne', it: 'persona', es: 'persona', ar: 'شخص', 'zh-hans': '位', 'zh-hant': '位' },
  method: { ko: '방법', en: 'method', de: 'Methode', fr: 'méthode', it: 'metodo', es: 'método', ar: 'طريقة', 'zh-hans': '方法', 'zh-hant': '方法' }
});

const LOCAL_OVERRIDES = Object.freeze({
  '誠に': { yomigana: 'まことに', meaningKey: 'sincerely' },
  '最も': { yomigana: 'もっとも', meaningKey: 'most' },
  '尤も': { yomigana: 'もっとも', meaningKey: 'howeverOfCourse' },
  '入れ': { yomigana: 'いれ', meaningKey: 'insertionAcceptance' },
  '受け': { yomigana: 'うけ', meaningKey: 'receiving' },
  '受け入れ': { yomigana: 'うけいれ', meaningKey: 'acceptance' },
  '祝い': { yomigana: 'いわい', meaningKey: 'celebration' },
  'お祝い': { yomigana: 'おいわい', meaningKey: 'celebration' },
  '申し込み': { yomigana: 'もうしこみ', meaningKey: 'application' },
  '取り扱い': { yomigana: 'とりあつかい', meaningKey: 'handling' },
  '使い方': { yomigana: 'つかいかた', meaningKey: 'howToUse' },
  '読み方': { yomigana: 'よみかた', meaningKey: 'howToRead' },
  '書き方': { yomigana: 'かきかた', meaningKey: 'howToWrite' },
  '進め方': { yomigana: 'すすめかた', meaningKey: 'methodOfProceeding' },
  '考え方': { yomigana: 'かんがえかた', meaningKey: 'wayOfThinking' },
  '大人': { yomigana: 'おとな', meaningKey: 'adult' },
  '一人': { yomigana: 'ひとり', meaningKey: 'onePerson' },
  '二人': { yomigana: 'ふたり', meaningKey: 'twoPeople' },
  '今日': { yomigana: 'きょう', meaningKey: 'today' },
  '昨日': { yomigana: 'きのう', meaningKey: 'yesterday' },
  '一昨日': { yomigana: 'おととい', meaningKey: 'dayBeforeYesterday' },
  '明後日': { yomigana: 'あさって', meaningKey: 'dayAfterTomorrow' },
  '二十歳': { yomigana: 'はたち', meaningKey: 'twentyYearsOld' }
});

function buildTaskRules(uiLanguage = 'ko') {
  const languageName = getMeaningLanguageName(uiLanguage);
  return [
    'Decide how clicked_target is read in the Japanese sentence.',
    'query_surface is the exact surface whose full reading you must return.',
    'scope_text is a short expanded expression around clicked_target.',
    'lookup_text is the short UI display surface. meaning must match lookup_text, not the whole sentence.',
    'Return only JSON.',
    'original must be exactly query_surface.',
    'yomigana must be the full reading of query_surface in hiragana only.',
    'Never include readings for characters outside query_surface.',
    'Even when clicked_target is a single kanji, use both context and scope_text.',
    'Prefer lexical and contextual reading over character-by-character on-yomi decomposition.',
    'Keep okurigana and kana already present in query_surface reflected in the reading.',
    `meaning must be a short gloss in ${languageName}.`,
    'Do not add explanations, markdown, or code fences.',
    'Examples:',
    'context=進め方, clicked_target=方, lookup_text=方, scope_text=進め方, query_surface=進め方 -> yomigana=すすめかた',
    'context=どちらの方ですか, clicked_target=方, lookup_text=方, scope_text=方, query_surface=方 -> yomigana=かた',
    'context=お客様の方, clicked_target=方, lookup_text=方, scope_text=方, query_surface=方 -> yomigana=ほう',
    'context=最も重要です, clicked_target=最, lookup_text=最も, scope_text=最も, query_surface=最も -> yomigana=もっとも',
    'context=誠にありがとうございます, clicked_target=誠, lookup_text=誠に, scope_text=誠に, query_surface=誠に -> yomigana=まことに',
    'context=受け入れを進めます, clicked_target=入, lookup_text=入れ, scope_text=受け入れ, query_surface=受け入れ -> yomigana=うけいれ',
    'In the last example, うけ, いり, or the reading of the whole sentence are wrong.'
  ].join('\n');
}

const FIELD_ALIASES = {
  original: ['original', 'target', 'text', 'word'],
  yomigana: ['yomigana', 'reading', 'furigana', 'よみがな', '読み'],
  meaning: ['meaning', '뜻', '의미']
};

const INFLIGHT_BY_CACHE_KEY = new Map();
const REQUESTER_TO_INFLIGHT_KEY = new Map();

const initPromise = initializeExtensionStorage();

chrome.runtime.onInstalled.addListener(() => {
  initializeExtensionStorage(true).catch(() => void 0);
});

chrome.runtime.onStartup.addListener(() => {
  initializeExtensionStorage().catch(() => void 0);
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== 'sync') return;
  if (
    changes.historyRetentionDays ||
    changes.cacheRetentionDays ||
    changes.keyStorageMode
  ) {
    prunePrivateData().catch(() => void 0);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  handleMessage(request, sender)
    .then(result => sendResponse(result))
    .catch(error => sendResponse({ error: error?.message || String(error) }));

  return true;
});

async function handleMessage(request, sender) {
  await initPromise;

  switch (request?.action) {
    case 'getYomigana':
      return dispatchWithCoalescing({
        text: request.text,
        context: request.context,
        lookupText: request.lookupText,
        scopeText: request.scopeText,
        targetStartInScope: request.targetStartInScope,
        targetEndInScope: request.targetEndInScope
      }, sender);

    case 'checkProviderReady':
      return getProviderReadyState();

    case 'recordLookup':
      await recordLookup(request.entry || {});
      return { ok: true };

    case 'getPopupState':
      return getPopupState();

    case 'saveApiKey':
      return saveApiKey(request.provider, request.value);

    case 'clearApiKey':
      return clearApiKey(request.provider);

    case 'setKeyStorageMode':
      return setKeyStorageMode(request.mode);

    case 'wipeAllData':
      await wipeAllData();
      return { ok: true };

    default:
      return { ok: false };
  }
}

async function initializeExtensionStorage(force = false) {
  try {
    await chrome.storage.local.setAccessLevel({ accessLevel: 'TRUSTED_CONTEXTS' });
  } catch (_) {
    // ignore
  }

  try {
    await chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_CONTEXTS' });
  } catch (_) {
    // ignore
  }

  await ensurePublicSettings(force);
  await prunePrivateData();
}

async function ensurePublicSettings(force = false) {
  const sync = await chrome.storage.sync.get(PUBLIC_SETTINGS_DEFAULTS);
  const local = await chrome.storage.local.get(Object.values(PROVIDERS).map(provider => provider.persistentKey));

  const updates = {};

  if (force || typeof sync.kanjEnabled !== 'boolean') updates.kanjEnabled = PUBLIC_SETTINGS_DEFAULTS.kanjEnabled;
  if (force || !['session', 'persistent'].includes(sync.keyStorageMode)) {
    updates.keyStorageMode = Object.values(local).some(Boolean) ? 'persistent' : PUBLIC_SETTINGS_DEFAULTS.keyStorageMode;
  }
  if (force || !PROVIDERS[sync.apiMode]) {
    updates.apiMode = determineInitialMode(sync, local);
  }
  if (force || !Number.isFinite(Number(sync.historyRetentionDays))) {
    updates.historyRetentionDays = PUBLIC_SETTINGS_DEFAULTS.historyRetentionDays;
  }
  if (force || !Number.isFinite(Number(sync.cacheRetentionDays))) {
    updates.cacheRetentionDays = PUBLIC_SETTINGS_DEFAULTS.cacheRetentionDays;
  }
  if (force || typeof sync.saveExtendedMetadata !== 'boolean') {
    updates.saveExtendedMetadata = PUBLIC_SETTINGS_DEFAULTS.saveExtendedMetadata;
  }
  if (force || !['all_except_blocked', 'allow_only'].includes(sync.siteAccessMode)) {
    updates.siteAccessMode = PUBLIC_SETTINGS_DEFAULTS.siteAccessMode;
  }
  if (force || typeof sync.siteAllowlistText !== 'string') {
    updates.siteAllowlistText = PUBLIC_SETTINGS_DEFAULTS.siteAllowlistText;
  }
  if (force || typeof sync.siteBlocklistText !== 'string') {
    updates.siteBlocklistText = PUBLIC_SETTINGS_DEFAULTS.siteBlocklistText;
  }
  if (force || !UI_LANGUAGE_META[sync.uiLanguage]) {
    updates.uiLanguage = detectInitialUiLanguage(sync.uiLanguage);
  }

  if (Object.keys(updates).length) {
    await chrome.storage.sync.set(updates);
  }

  return {
    ...PUBLIC_SETTINGS_DEFAULTS,
    ...sync,
    ...updates,
    historyRetentionDays: normalizeHistoryRetentionDays((updates.historyRetentionDays ?? sync.historyRetentionDays)),
    cacheRetentionDays: normalizeCacheRetentionDays((updates.cacheRetentionDays ?? sync.cacheRetentionDays)),
    uiLanguage: normalizeUiLanguage(updates.uiLanguage ?? sync.uiLanguage)
  };
}

function determineInitialMode(sync, local) {
  if (sync?.apiMode && PROVIDERS[sync.apiMode]) return sync.apiMode;
  if (local?.openaiKey) return 'openai';
  if (local?.geminiKey) return 'gemini';
  return 'claude';
}

function detectInitialUiLanguage(value) {
  return normalizeUiLanguage(value);
}

function normalizeUiLanguage(value) {
  const raw = String(value || '').trim().toLowerCase().replace(/_/g, '-');
  if (!raw) return PUBLIC_SETTINGS_DEFAULTS.uiLanguage;
  if (UI_LANGUAGE_META[raw]) return raw;
  if (raw === 'zh' || raw.startsWith('zh-cn') || raw.startsWith('zh-sg') || raw.startsWith('zh-hans')) return 'zh-hans';
  if (raw.startsWith('zh-tw') || raw.startsWith('zh-hk') || raw.startsWith('zh-mo') || raw.startsWith('zh-hant')) return 'zh-hant';
  const short = raw.split('-')[0];
  return UI_LANGUAGE_META[short] ? short : PUBLIC_SETTINGS_DEFAULTS.uiLanguage;
}

function getMeaningLanguageName(uiLanguage) {
  return UI_LANGUAGE_META[normalizeUiLanguage(uiLanguage)]?.promptName || UI_LANGUAGE_META.en.promptName;
}

function translateMeaningKey(meaningKey, uiLanguage) {
  const code = normalizeUiLanguage(uiLanguage);
  const entry = MEANING_TRANSLATIONS[meaningKey] || null;
  if (!entry) return '';
  return String(entry[code] || entry.en || entry.ko || '').trim();
}

async function getPublicSettings() {
  const settings = await chrome.storage.sync.get(PUBLIC_SETTINGS_DEFAULTS);
  return {
    ...PUBLIC_SETTINGS_DEFAULTS,
    ...settings,
    historyRetentionDays: normalizeHistoryRetentionDays(settings.historyRetentionDays),
    cacheRetentionDays: normalizeCacheRetentionDays(settings.cacheRetentionDays),
    keyStorageMode: ['session', 'persistent'].includes(settings.keyStorageMode) ? settings.keyStorageMode : PUBLIC_SETTINGS_DEFAULTS.keyStorageMode,
    siteAccessMode: ['allow_only', 'all_except_blocked'].includes(settings.siteAccessMode) ? settings.siteAccessMode : PUBLIC_SETTINGS_DEFAULTS.siteAccessMode,
    saveExtendedMetadata: settings.saveExtendedMetadata === true,
    kanjEnabled: settings.kanjEnabled !== false,
    uiLanguage: normalizeUiLanguage(settings.uiLanguage)
  };
}

function normalizeHistoryRetentionDays(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return PUBLIC_SETTINGS_DEFAULTS.historyRetentionDays;
  return Math.max(7, Math.min(90, Math.round(parsed)));
}

function normalizeCacheRetentionDays(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return PUBLIC_SETTINGS_DEFAULTS.cacheRetentionDays;
  return Math.max(1, Math.min(30, Math.round(parsed)));
}

function maskKey(value) {
  const safe = String(value || '').trim();
  if (!safe) return '';
  const tail = safe.slice(-4);
  return `••••${tail}`;
}

async function getResolvedProviderKey(providerId, settings = null) {
  const provider = PROVIDERS[providerId];
  if (!provider) return { key: '', scope: 'none' };

  const publicSettings = settings || await getPublicSettings();

  if (publicSettings.keyStorageMode === 'persistent') {
    const persistent = await chrome.storage.local.get(provider.persistentKey);
    if (persistent[provider.persistentKey]) {
      return { key: persistent[provider.persistentKey], scope: 'persistent' };
    }
    const session = await chrome.storage.session.get(provider.sessionKey);
    if (session[provider.sessionKey]) {
      return { key: session[provider.sessionKey], scope: 'session' };
    }
    return { key: '', scope: 'none' };
  }

  const session = await chrome.storage.session.get(provider.sessionKey);
  if (session[provider.sessionKey]) {
    return { key: session[provider.sessionKey], scope: 'session' };
  }
  const persistent = await chrome.storage.local.get(provider.persistentKey);
  if (persistent[provider.persistentKey]) {
    return { key: persistent[provider.persistentKey], scope: 'persistent' };
  }
  return { key: '', scope: 'none' };
}

async function getAllKeyStatuses(settings = null) {
  const publicSettings = settings || await getPublicSettings();
  const statuses = {};

  for (const providerId of Object.keys(PROVIDERS)) {
    const resolved = await getResolvedProviderKey(providerId, publicSettings);
    statuses[providerId] = {
      saved: Boolean(resolved.key),
      scope: resolved.scope,
      masked: maskKey(resolved.key)
    };
  }

  return statuses;
}

async function getPopupState() {
  const publicSettings = await getPublicSettings();
  const keyStatuses = await getAllKeyStatuses(publicSettings);
  return { publicSettings, keyStatuses };
}

async function saveApiKey(providerId, rawValue) {
  const provider = PROVIDERS[providerId];
  if (!provider) {
    throw new Error('Unsupported provider.');
  }

  const value = String(rawValue || '').trim();
  if (!value) {
    throw new Error('Please enter an API key.');
  }

  const publicSettings = await getPublicSettings();

  if (publicSettings.keyStorageMode === 'persistent') {
    await chrome.storage.local.set({ [provider.persistentKey]: value });
    await chrome.storage.session.remove(provider.sessionKey);
  } else {
    await chrome.storage.session.set({ [provider.sessionKey]: value });
    await chrome.storage.local.remove(provider.persistentKey);
  }

  await chrome.storage.sync.set({ apiMode: providerId });
  return getPopupState();
}

async function clearApiKey(providerId) {
  const provider = PROVIDERS[providerId];
  if (!provider) {
    throw new Error('Unsupported provider.');
  }

  await Promise.all([
    chrome.storage.local.remove(provider.persistentKey),
    chrome.storage.session.remove(provider.sessionKey)
  ]);

  return getPopupState();
}

async function setKeyStorageMode(mode) {
  const nextMode = mode === 'persistent' ? 'persistent' : 'session';
  const publicSettings = await getPublicSettings();

  if (publicSettings.keyStorageMode === nextMode) {
    await chrome.storage.sync.set({ keyStorageMode: nextMode });
    return getPopupState();
  }

  const localSnapshot = await chrome.storage.local.get(Object.values(PROVIDERS).map(provider => provider.persistentKey));
  const sessionSnapshot = await chrome.storage.session.get(Object.values(PROVIDERS).map(provider => provider.sessionKey));

  if (nextMode === 'persistent') {
    const localUpdates = {};
    const sessionRemovals = [];
    for (const provider of Object.values(PROVIDERS)) {
      const sessionValue = sessionSnapshot[provider.sessionKey];
      if (sessionValue) {
        localUpdates[provider.persistentKey] = sessionValue;
        sessionRemovals.push(provider.sessionKey);
      }
    }
    if (Object.keys(localUpdates).length) {
      await chrome.storage.local.set(localUpdates);
    }
    if (sessionRemovals.length) {
      await chrome.storage.session.remove(sessionRemovals);
    }
  } else {
    const sessionUpdates = {};
    const localRemovals = [];
    for (const provider of Object.values(PROVIDERS)) {
      const localValue = localSnapshot[provider.persistentKey];
      if (localValue) {
        sessionUpdates[provider.sessionKey] = localValue;
        localRemovals.push(provider.persistentKey);
      }
    }
    if (Object.keys(sessionUpdates).length) {
      await chrome.storage.session.set(sessionUpdates);
    }
    if (localRemovals.length) {
      await chrome.storage.local.remove(localRemovals);
    }
  }

  await chrome.storage.sync.set({ keyStorageMode: nextMode });
  return getPopupState();
}

async function wipeAllData() {
  await Promise.all([
    chrome.storage.local.clear(),
    chrome.storage.session.clear(),
    chrome.storage.sync.clear()
  ]);
  await initializeExtensionStorage(true);
}

async function prunePrivateData() {
  const publicSettings = await getPublicSettings();
  const local = await chrome.storage.local.get([
    'kanjiHistory',
    'kanjiClicks',
    'focusDismissed',
    CACHE_STORAGE_KEY
  ]);

  const now = Date.now();
  const historyCutoff = now - publicSettings.historyRetentionDays * DAY_MS;
  const cacheTtlMs = publicSettings.cacheRetentionDays * DAY_MS;
  const nextHistory = pruneHistory(local.kanjiHistory || {}, historyCutoff);
  const nextClicks = pruneClicks(local.kanjiClicks || [], historyCutoff);
  const nextDismissed = pruneFocusDismissed(local.focusDismissed || {}, historyCutoff);
  const nextCache = pruneCache(local[CACHE_STORAGE_KEY] || {}, cacheTtlMs);

  const hasChanges =
    JSON.stringify(nextHistory) !== JSON.stringify(local.kanjiHistory || {}) ||
    JSON.stringify(nextClicks) !== JSON.stringify(local.kanjiClicks || []) ||
    JSON.stringify(nextDismissed) !== JSON.stringify(local.focusDismissed || {}) ||
    JSON.stringify(nextCache) !== JSON.stringify(local[CACHE_STORAGE_KEY] || {});

  if (hasChanges) {
    await chrome.storage.local.set({
      kanjiHistory: nextHistory,
      kanjiClicks: nextClicks,
      focusDismissed: nextDismissed,
      [CACHE_STORAGE_KEY]: nextCache
    });
  }
}

function pruneHistory(history, cutoff) {
  const next = {};
  for (const [dateKey, items] of Object.entries(history || {})) {
    const filtered = (Array.isArray(items) ? items : [])
      .filter(item => (item?.timestamp || 0) >= cutoff)
      .sort((a, b) => (b?.timestamp || 0) - (a?.timestamp || 0))
      .slice(0, HISTORY_MAX_ITEMS_PER_DAY);
    if (filtered.length) {
      next[dateKey] = filtered;
    }
  }
  return next;
}

function pruneClicks(clicks, cutoff) {
  return (Array.isArray(clicks) ? clicks : [])
    .filter(item => (item?.t || 0) >= cutoff)
    .sort((a, b) => (b?.t || 0) - (a?.t || 0))
    .slice(0, CLICKS_MAX_ENTRIES);
}

function pruneFocusDismissed(dismissed, cutoff) {
  return Object.fromEntries(
    Object.entries(dismissed || {}).filter(([, timestamp]) => Number(timestamp || 0) >= cutoff)
  );
}

function pruneCache(cache, ttlMs) {
  const now = Date.now();
  return Object.fromEntries(
    Object.entries(cache || {})
      .filter(([, entry]) => entry && entry.savedAt && now - entry.savedAt < ttlMs)
      .sort((a, b) => (b[1]?.savedAt || 0) - (a[1]?.savedAt || 0))
      .slice(0, CACHE_MAX_ENTRIES)
  );
}

async function recordLookup(entry) {
  const publicSettings = await getPublicSettings();
  await prunePrivateData();

  const now = entry.timestamp || Date.now();
  const today = getDateKey(new Date(now));
  const itemKey = entry.itemKey || makeItemKey(entry.original, entry.yomigana);
  const stored = await chrome.storage.local.get(['kanjiHistory', 'kanjiClicks', 'focusDismissed']);

  const history = { ...(stored.kanjiHistory || {}) };
  const clicks = Array.isArray(stored.kanjiClicks) ? stored.kanjiClicks.slice() : [];
  const focusDismissed = { ...(stored.focusDismissed || {}) };

  if (!Array.isArray(history[today])) history[today] = [];

  const nextEntry = {
    itemKey,
    original: entry.original,
    yomigana: entry.yomigana,
    meaning: entry.meaning || '',
    provider: entry.provider || '',
    model: entry.model || '',
    timestamp: now
  };

  if (publicSettings.saveExtendedMetadata) {
    if (entry.context) nextEntry.context = entry.context;
    if (entry.url) nextEntry.url = entry.url;
    if (entry.title) nextEntry.title = entry.title;
  }

  const existingIndex = history[today].findIndex(item => (item.itemKey || makeItemKey(item.original, item.yomigana)) === itemKey);
  if (existingIndex >= 0) history[today].splice(existingIndex, 1);
  history[today].unshift(nextEntry);
  if (history[today].length > HISTORY_MAX_ITEMS_PER_DAY) history[today].length = HISTORY_MAX_ITEMS_PER_DAY;

  const clickEntry = {
    itemKey,
    original: nextEntry.original,
    yomigana: nextEntry.yomigana,
    meaning: nextEntry.meaning,
    provider: nextEntry.provider,
    model: nextEntry.model,
    t: now
  };

  if (publicSettings.saveExtendedMetadata) {
    if (entry.context) clickEntry.context = entry.context;
    if (entry.url) clickEntry.url = entry.url;
    if (entry.title) clickEntry.title = entry.title;
  }

  const historyCutoff = now - publicSettings.historyRetentionDays * DAY_MS;
  const nextClicks = pruneClicks(clicks.concat(clickEntry), historyCutoff);

  delete focusDismissed[itemKey];

  await chrome.storage.local.set({
    kanjiHistory: history,
    kanjiClicks: nextClicks,
    focusDismissed: pruneFocusDismissed(focusDismissed, historyCutoff)
  });
}

function getDateKey(date = new Date()) {
  return date.toDateString();
}

function makeItemKey(original, yomigana) {
  return `${String(original || '').trim()}::${normalizeYomigana(yomigana)}`;
}

function getRequesterKey(sender) {
  const tabId = sender?.tab?.id ?? 'tabless';
  const frameId = sender?.frameId ?? 0;
  const documentId = sender?.documentId || sender?.url || 'document';
  return `${tabId}:${frameId}:${documentId}`;
}

async function dispatchWithCoalescing(request, sender) {
  const requesterKey = getRequesterKey(sender);
  const preflight = await prepareDispatch(request);
  if (preflight.localResult) return preflight.localResult;

  const cached = await getCachedResult(preflight.cacheKey);
  if (cached) return cached;

  const existingRequester = REQUESTER_TO_INFLIGHT_KEY.get(requesterKey);
  if (existingRequester && existingRequester !== preflight.cacheKey) {
    const previous = INFLIGHT_BY_CACHE_KEY.get(existingRequester);
    if (previous) {
      previous.controller.abort('superseded');
    }
    REQUESTER_TO_INFLIGHT_KEY.delete(requesterKey);
  }

  const shared = INFLIGHT_BY_CACHE_KEY.get(preflight.cacheKey);
  if (shared) {
    REQUESTER_TO_INFLIGHT_KEY.set(requesterKey, preflight.cacheKey);
    return shared.promise;
  }

  const controller = new AbortController();
  const promise = performDispatch(preflight, controller.signal)
    .then(async result => {
      await setCacheEntry(preflight.cacheKey, result);
      return result;
    })
    .finally(() => {
      INFLIGHT_BY_CACHE_KEY.delete(preflight.cacheKey);
      for (const [key, inflightKey] of REQUESTER_TO_INFLIGHT_KEY.entries()) {
        if (inflightKey === preflight.cacheKey) {
          REQUESTER_TO_INFLIGHT_KEY.delete(key);
        }
      }
    });

  INFLIGHT_BY_CACHE_KEY.set(preflight.cacheKey, { controller, promise });
  REQUESTER_TO_INFLIGHT_KEY.set(requesterKey, preflight.cacheKey);

  return promise;
}

async function prepareDispatch({ text, context, lookupText, scopeText, targetStartInScope, targetEndInScope }) {
  const target = normalizeText(text);
  const normalizedContext = normalizeContext(context, target);
  const normalizedLookupText = normalizeLookupText(lookupText, target);
  const normalizedScopeText = normalizeScopeText(scopeText, normalizedLookupText, target);
  const normalizedScopeSpan = normalizeScopeSpan(
    normalizedScopeText,
    normalizedLookupText,
    target,
    targetStartInScope,
    targetEndInScope
  );

  if (!target) {
    throw new Error('No text was selected.');
  }

  const publicSettings = await getPublicSettings();
  const uiLanguage = normalizeUiLanguage(publicSettings.uiLanguage);

  const contextual = resolveContextualOverride(target, normalizedContext, uiLanguage);
  if (contextual) {
    return {
      target,
      context: normalizedContext,
      lookupText: normalizedLookupText,
      scopeText: normalizedScopeText,
      scopeSpan: normalizedScopeSpan,
      uiLanguage,
      localResult: {
        ...sanitizeParsed(contextual, target),
        apiLabel: 'Context Rule',
        apiMode: 'local',
        model: 'context-override'
      },
      cacheKey: ''
    };
  }

  const localSurfaces = uniqueNonEmpty([normalizedLookupText, normalizedScopeText, target]);
  for (const surface of localSurfaces) {
    const local = resolveLocalOverride(surface, uiLanguage);
    if (!local) continue;
    try {
      return {
        target,
        context: normalizedContext,
        lookupText: normalizedLookupText,
        scopeText: normalizedScopeText,
        scopeSpan: normalizedScopeSpan,
        uiLanguage,
        localResult: {
          ...finalizeReadingResult(local, {
            target,
            lookupText: normalizedLookupText,
            scopeText: normalizedScopeText,
            scopeSpan: normalizedScopeSpan,
            sourceSurface: surface
          }),
          apiLabel: 'Local Lexicon',
          apiMode: 'local',
          model: 'local-override'
        },
        cacheKey: ''
      };
    } catch (_) {
      // ignore and continue
    }
  }

  const mode = await resolveMode(publicSettings);
  const provider = PROVIDERS[mode];
  if (!provider) {
    throw new Error('Unsupported API mode.');
  }

  const resolvedKey = await getResolvedProviderKey(mode, publicSettings);
  if (!resolvedKey.key) {
    const modeLabel = mode === 'openai' ? 'OpenAI' : mode === 'gemini' ? 'Gemini' : 'Claude';
    throw new Error(`${modeLabel} API key is missing. Please add it in Settings.`);
  }

  const cacheKey = await makeCacheKey(
    mode,
    provider.model,
    uiLanguage,
    target,
    normalizedContext,
    normalizedLookupText,
    normalizedScopeText,
    normalizedScopeSpan.start,
    normalizedScopeSpan.end
  );

  return {
    target,
    context: normalizedContext,
    lookupText: normalizedLookupText,
    scopeText: normalizedScopeText,
    scopeSpan: normalizedScopeSpan,
    publicSettings,
    uiLanguage,
    mode,
    provider,
    apiKey: resolvedKey.key,
    cacheKey
  };
}

async function performDispatch(prepared, signal) {
  const requestState = {
    target: prepared.target,
    context: prepared.context,
    lookupText: prepared.lookupText,
    scopeText: prepared.scopeText,
    scopeSpan: prepared.scopeSpan,
    uiLanguage: prepared.uiLanguage,
    querySurface: ''
  };

  const surfacesToQuery = uniqueNonEmpty([prepared.scopeText, prepared.lookupText, prepared.target]);
  let softError = null;

  for (const surface of surfacesToQuery) {
    if (signal.aborted) throw new Error('The request was cancelled.');

    const requestStateWithSurface = { ...requestState, querySurface: surface };

    try {
      const parsed = prepared.mode === 'gemini'
        ? await queryGemini(requestStateWithSurface, prepared.apiKey, prepared.provider, signal)
        : prepared.mode === 'openai'
          ? await queryOpenAI(requestStateWithSurface, prepared.apiKey, prepared.provider, signal)
          : await queryClaude(requestStateWithSurface, prepared.apiKey, prepared.provider, signal);

      return makeResult(
        finalizeReadingResult(parsed, {
          target: prepared.target,
          lookupText: prepared.lookupText,
          scopeText: prepared.scopeText,
          scopeSpan: prepared.scopeSpan,
          sourceSurface: surface
        }),
        prepared.provider
      );
    } catch (error) {
      if (signal.aborted) throw new Error('The request was cancelled.');
      if (isFatalProviderError(error)) throw error;
      softError = error;
    }
  }

  throw softError || new Error('The AI response could not be parsed.');
}

async function getCachedResult(cacheKey) {
  if (!cacheKey) return null;
  const settings = await getPublicSettings();
  const stored = await chrome.storage.local.get([CACHE_STORAGE_KEY]);
  const pruned = pruneCache(stored[CACHE_STORAGE_KEY] || {}, settings.cacheRetentionDays * DAY_MS);
  return pruned[cacheKey]?.value || null;
}

async function setCacheEntry(cacheKey, value) {
  if (!cacheKey) return;
  const settings = await getPublicSettings();
  const stored = await chrome.storage.local.get([CACHE_STORAGE_KEY]);
  const next = pruneCache({
    ...(stored[CACHE_STORAGE_KEY] || {}),
    [cacheKey]: {
      savedAt: Date.now(),
      value
    }
  }, settings.cacheRetentionDays * DAY_MS);
  await chrome.storage.local.set({ [CACHE_STORAGE_KEY]: next });
}

async function resolveMode(publicSettings) {
  const preferred = publicSettings.apiMode;
  if (preferred && PROVIDERS[preferred]) {
    const resolved = await getResolvedProviderKey(preferred, publicSettings);
    if (resolved.key) return preferred;
  }

  for (const mode of ['openai', 'gemini', 'claude']) {
    const resolved = await getResolvedProviderKey(mode, publicSettings);
    if (resolved.key) return mode;
  }

  return preferred && PROVIDERS[preferred] ? preferred : 'claude';
}

async function getProviderReadyState() {
  const publicSettings = await getPublicSettings();
  const mode = await resolveMode(publicSettings);
  const resolved = await getResolvedProviderKey(mode, publicSettings);
  return {
    ok: Boolean(resolved.key),
    mode,
    scope: resolved.scope,
    label: mode === 'openai' ? 'OpenAI' : mode === 'gemini' ? 'Gemini' : 'Claude'
  };
}

async function makeCacheKey(mode, model, uiLanguage, target, context, lookupText, scopeText, scopeStart, scopeEnd) {
  const raw = JSON.stringify([PROMPT_VERSION, mode, model, uiLanguage, target, context, lookupText, scopeText, scopeStart, scopeEnd]);
  return sha256Hex(raw);
}

async function sha256Hex(value) {
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(value || '')));
  return Array.from(new Uint8Array(buffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

function normalizeText(value) {
  return String(value || '').trim();
}

function normalizeContext(context, target) {
  const normalized = String(context || target || '')
    .replace(/\s+/g, ' ')
    .trim();
  return normalized || target;
}

function normalizeLookupText(value, target) {
  const normalized = String(value || target || '').trim();
  return normalized || target;
}

function normalizeScopeText(value, lookupText, target) {
  const normalized = String(value || '').trim();
  if (normalized && normalized.includes(target)) return normalized;
  return normalizeLookupText(lookupText, target);
}

function normalizeScopeSpan(scopeText, lookupText, target, start, end) {
  const safeTarget = normalizeText(target);
  const safeLookup = normalizeLookupText(lookupText, safeTarget);
  const safeScope = normalizeScopeText(scopeText, safeLookup, safeTarget);

  let resolvedStart = Number.isInteger(start) ? start : null;
  let resolvedEnd = Number.isInteger(end) ? end : null;

  if (resolvedStart === null || resolvedEnd === null || resolvedEnd <= resolvedStart) {
    if (safeScope.endsWith(safeLookup)) {
      resolvedStart = safeScope.length - safeLookup.length;
      resolvedEnd = resolvedStart + safeTarget.length;
    } else {
      const directIndex = safeScope.indexOf(safeTarget);
      resolvedStart = directIndex >= 0 ? directIndex : 0;
      resolvedEnd = resolvedStart + safeTarget.length;
    }
  }

  resolvedStart = Math.max(0, Math.min(resolvedStart, Math.max(0, safeScope.length - 1)));
  resolvedEnd = Math.max(resolvedStart + 1, Math.min(resolvedEnd, safeScope.length));

  return { start: resolvedStart, end: resolvedEnd };
}

function uniqueNonEmpty(values) {
  const seen = new Set();
  const output = [];

  for (const value of values) {
    const normalized = normalizeText(value);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    output.push(normalized);
  }

  return output;
}

function katakanaToHiragana(input) {
  return String(input || '').replace(/[ァ-ヶ]/g, ch =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );
}

function normalizeYomigana(input) {
  return katakanaToHiragana(String(input || ''))
    .replace(/[\s　]+/g, '')
    .trim();
}

function normalizeMeaning(input) {
  return String(input || '').trim().slice(0, MAX_MEANING_LEN);
}

function resolveLocalOverride(target, uiLanguage = 'ko') {
  const entry = LOCAL_OVERRIDES[normalizeText(target)] || null;
  if (!entry) return null;
  return {
    yomigana: entry.yomigana,
    meaning: translateMeaningKey(entry.meaningKey, uiLanguage)
  };
}

function resolveContextualOverride(target, context, uiLanguage = 'ko') {
  const normalizedTarget = normalizeText(target);
  const normalizedContext = normalizeContext(context, normalizedTarget);

  if (normalizedTarget === '方') {
    if (/(どちら|どの|この|その|あの|こんな|そんな|あんな|どんな)(?:の)?\s*方/.test(normalizedContext)) {
      return { yomigana: 'かた', meaning: translateMeaningKey('personHonorific', uiLanguage) };
    }

    if (/(進め|使い|読み|書き|見|やり|作り|考え|選び|話し|学び|覚え|持ち|伝え|呼び)方/.test(normalizedContext)) {
      return { yomigana: 'かた', meaning: translateMeaningKey('method', uiLanguage) };
    }
  }

  return null;
}

function isKanaChar(ch) {
  return RE_SURFACE_KANA.test(ch || '');
}

function collectKanaSegments(surface) {
  const segments = [];
  const safeSurface = String(surface || '');
  let index = 0;

  while (index < safeSurface.length) {
    if (!isKanaChar(safeSurface[index])) {
      index += 1;
      continue;
    }

    let end = index + 1;
    while (end < safeSurface.length && isKanaChar(safeSurface[end])) end += 1;

    const text = normalizeYomigana(safeSurface.slice(index, end));
    if (text) {
      segments.push({ start: index, end, text });
    }

    index = end;
  }

  return segments;
}

function mapKanaSegmentsForward(segments, reading) {
  let cursor = 0;
  for (const segment of segments) {
    const found = reading.indexOf(segment.text, cursor);
    if (found < 0) return false;
    segment.forwardStart = found;
    segment.forwardEnd = found + segment.text.length;
    cursor = segment.forwardEnd;
  }
  return true;
}

function mapKanaSegmentsBackward(segments, reading) {
  let cursor = reading.length;
  for (let index = segments.length - 1; index >= 0; index -= 1) {
    const segment = segments[index];
    const found = reading.lastIndexOf(segment.text, cursor);
    if (found < 0 || found + segment.text.length > cursor) return false;
    segment.backwardStart = found;
    segment.backwardEnd = found + segment.text.length;
    cursor = segment.backwardStart;
  }
  return true;
}

function deriveReadingForSpan(surface, reading, start, end) {
  const safeSurface = String(surface || '').trim();
  const safeReading = normalizeYomigana(reading);
  if (!safeSurface || !safeReading) return '';

  if (start <= 0 && end >= safeSurface.length) {
    return safeReading;
  }

  const segments = collectKanaSegments(safeSurface).map(segment => ({ ...segment }));
  if (!segments.length) {
    return start === 0 && end === safeSurface.length ? safeReading : '';
  }

  if (!mapKanaSegmentsForward(segments, safeReading) || !mapKanaSegmentsBackward(segments, safeReading)) {
    return '';
  }

  let leftBoundary = 0;
  for (const segment of segments) {
    if (segment.end <= start && Number.isInteger(segment.forwardEnd)) {
      leftBoundary = segment.forwardEnd;
    }
  }

  let rightBoundary = safeReading.length;
  for (const segment of segments) {
    if (segment.start >= end && Number.isInteger(segment.backwardStart)) {
      rightBoundary = segment.backwardStart;
      break;
    }
  }

  if (rightBoundary < leftBoundary) return '';
  return safeReading.slice(leftBoundary, rightBoundary);
}

function resolveSurfaceSpan(sourceSurface, target, lookupText, scopeText, scopeSpan) {
  const safeSurface = normalizeText(sourceSurface);
  const safeTarget = normalizeText(target);
  const safeLookup = normalizeLookupText(lookupText, safeTarget);
  const safeScope = normalizeScopeText(scopeText, safeLookup, safeTarget);

  if (!safeSurface || !safeTarget) return null;
  if (safeSurface === safeTarget) return { start: 0, end: safeTarget.length };

  if (safeSurface === safeScope) {
    const start = Math.max(0, Math.min(scopeSpan.start, Math.max(0, safeSurface.length - 1)));
    const end = Math.max(start + 1, Math.min(scopeSpan.end, safeSurface.length));
    return { start, end };
  }

  if (safeSurface === safeLookup && safeSurface.startsWith(safeTarget)) {
    return { start: 0, end: safeTarget.length };
  }

  const directIndex = safeSurface.indexOf(safeTarget);
  if (directIndex >= 0) {
    return { start: directIndex, end: directIndex + safeTarget.length };
  }

  return null;
}

function finalizeReadingResult(parsed, { target, lookupText, scopeText, scopeSpan, sourceSurface }) {
  const safeSurface = normalizeText(sourceSurface) || normalizeLookupText(lookupText, target);
  const safeTarget = normalizeText(target);
  const source = sanitizeParsed(parsed, safeSurface);
  const span = resolveSurfaceSpan(safeSurface, safeTarget, lookupText, scopeText, scopeSpan);

  let yomigana = source.yomigana;
  if (span && (safeSurface !== safeTarget || span.start !== 0 || span.end !== safeSurface.length)) {
    yomigana = deriveReadingForSpan(safeSurface, source.yomigana, span.start, span.end);
  }

  yomigana = normalizeYomigana(yomigana);
  if (!yomigana) {
    throw new Error('The clicked kanji reading could not be isolated.');
  }

  return {
    original: normalizeLookupText(lookupText, safeTarget),
    yomigana,
    meaning: source.meaning
  };
}

function sanitizeParsed(parsed, target) {
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('The AI response format was invalid.');
  }

  let yomigana = normalizeYomigana(parsed.yomigana);
  if (!yomigana) {
    throw new Error('The AI did not return a reading.');
  }

  if (!RE_HIRAGANA.test(yomigana)) {
    const kanaOnly = (yomigana.match(/[ぁ-ゖゝゞー・]+/g) || []).join('');
    if (!kanaOnly || !RE_HIRAGANA.test(kanaOnly)) {
      throw new Error('The AI did not return the reading in hiragana.');
    }
    yomigana = kanaOnly;
  }

  return {
    original: target,
    yomigana,
    meaning: normalizeMeaning(parsed.meaning)
  };
}

function stripCodeFences(raw) {
  return String(raw || '')
    .replace(/```(?:json)?/gi, '')
    .replace(/```/g, '')
    .trim();
}

function extractJSON(raw) {
  const stripped = stripCodeFences(raw);
  const start = stripped.indexOf('{');
  const end = stripped.lastIndexOf('}');
  return start !== -1 && end > start ? stripped.slice(start, end + 1) : stripped;
}

function escapeRegExp(value) {
  return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function tryParseStrictJSON(raw, target) {
  const cleaned = extractJSON(raw);
  if (!cleaned) return null;
  try {
    return sanitizeParsed(JSON.parse(cleaned), target);
  } catch (_) {
    return null;
  }
}

function extractAliasValue(raw, aliases, { allowSpaces = false } = {}) {
  const cleaned = stripCodeFences(raw);
  for (const alias of aliases) {
    const patterns = [
      new RegExp(`(?:"|')?${escapeRegExp(alias)}(?:"|')?\\s*[:=：]\\s*(?:"|')([^"']+)(?:"|')`, 'i'),
      new RegExp(`(?:"|')?${escapeRegExp(alias)}(?:"|')?\\s*[:=：]\\s*([^\\n,}]+)`, 'i')
    ];
    for (const pattern of patterns) {
      const match = cleaned.match(pattern);
      if (!match) continue;
      const value = allowSpaces ? match[1].trim() : match[1].trim().split(/\s+/)[0];
      if (value) return value;
    }
  }
  return '';
}

function tryParseJsonish(raw, target) {
  const yomigana = extractAliasValue(raw, FIELD_ALIASES.yomigana);
  if (!yomigana) return null;
  const meaning = extractAliasValue(raw, FIELD_ALIASES.meaning, { allowSpaces: true });
  const original = extractAliasValue(raw, FIELD_ALIASES.original, { allowSpaces: true }) || target;
  try {
    return sanitizeParsed({ original, yomigana, meaning }, target);
  } catch (_) {
    return null;
  }
}

function extractKanaCandidate(raw) {
  const candidates = (stripCodeFences(raw).match(/[ぁ-ゖゝゞー]{2,}/g) || [])
    .map(normalizeYomigana)
    .filter(Boolean);
  if (!candidates.length) return '';
  candidates.sort((a, b) => b.length - a.length);
  return candidates[0] || '';
}

function parseLooseJSON(raw, target) {
  return (
    tryParseStrictJSON(raw, target) ||
    tryParseJsonish(raw, target) ||
    (() => {
      const fallback = extractKanaCandidate(raw);
      if (fallback && RE_HIRAGANA.test(fallback)) {
        return sanitizeParsed({ original: target, yomigana: fallback, meaning: '' }, target);
      }
      throw new Error('The AI response could not be parsed.');
    })()
  );
}

function buildInputPayload(target, context, lookupText, scopeText, querySurface, uiLanguage = 'ko') {
  const languageName = getMeaningLanguageName(uiLanguage);
  return {
    task: 'kanji_yomigana',
    clicked_target: target,
    lookup_text: lookupText || target,
    scope_text: scopeText || lookupText || target,
    query_surface: querySurface || scopeText || lookupText || target,
    context,
    ui_language: normalizeUiLanguage(uiLanguage),
    output_schema: {
      original: 'Exactly the same string as query_surface.',
      yomigana: 'The full reading of query_surface, hiragana only.',
      meaning: `A short ${languageName} gloss for lookup_text.`
    }
  };
}

function buildPrompt(target, context, lookupText, scopeText, querySurface, uiLanguage = 'ko') {
  return `${buildTaskRules(uiLanguage)}

Input JSON:
${JSON.stringify(buildInputPayload(target, context, lookupText, scopeText, querySurface, uiLanguage), null, 2)}`;
}

function makeResult(base, provider) {
  return {
    ...base,
    apiLabel: provider.label,
    apiMode: Object.keys(PROVIDERS).find(key => PROVIDERS[key] === provider) || '',
    model: provider.model
  };
}

async function fetchJsonWithTimeout(url, options, signal, timeoutMs = FETCH_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort('timeout'), timeoutMs);
  const relayAbort = () => controller.abort('aborted');

  if (signal) {
    if (signal.aborted) controller.abort('aborted');
    else signal.addEventListener('abort', relayAbort, { once: true });
  }

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } catch (error) {
    if (controller.signal.aborted && signal?.aborted) {
      throw new Error('The request was cancelled.');
    }
    if (controller.signal.aborted && !signal?.aborted) {
      throw new Error('The response timed out.');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
    if (signal) {
      signal.removeEventListener('abort', relayAbort);
    }
  }
}

async function queryClaude(request, apiKey, provider, signal) {
  try {
    return await queryClaudeStructured(request, apiKey, provider, signal);
  } catch (error) {
    if (isFatalProviderError(error)) throw error;
    return queryClaudePlain(request, apiKey, provider, signal);
  }
}

async function queryClaudeStructured(request, apiKey, provider, signal) {
  const response = await fetchJsonWithTimeout('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: provider.model,
      max_tokens: 160,
      temperature: 0,
      system: buildTaskRules(request.uiLanguage),
      tools: [{
        name: 'return_yomigana',
        description: 'Return the yomigana extraction result.',
        input_schema: RESPONSE_SCHEMA,
        strict: true
      }],
      tool_choice: {
        type: 'tool',
        name: 'return_yomigana',
        disable_parallel_tool_use: true
      },
      messages: [{
        role: 'user',
        content: JSON.stringify(
          buildInputPayload(request.target, request.context, request.lookupText, request.scopeText, request.querySurface, request.uiLanguage),
          null,
          2
        )
      }]
    })
  }, signal);

  if (!response.ok) {
    if ([400, 404, 422].includes(response.status)) {
      throw new Error(`Claude structured fallback (${response.status})`);
    }
    throw await buildApiError(response, 'Claude API error');
  }

  const data = await response.json();
  const toolBlock = (data.content || []).find(block => block?.type === 'tool_use' && block?.name === 'return_yomigana' && block?.input);
  if (toolBlock?.input) {
    return sanitizeParsed(toolBlock.input, request.querySurface);
  }

  const raw = (data.content || [])
    .filter(block => block && block.type === 'text' && block.text)
    .map(block => block.text)
    .join('\n')
    .trim();

  if (!raw) {
    throw new Error('Claude returned an empty response.');
  }

  return parseLooseJSON(raw, request.querySurface);
}

async function queryClaudePlain(request, apiKey, provider, signal) {
  const response = await fetchJsonWithTimeout('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: provider.model,
      max_tokens: 180,
      temperature: 0,
      system: buildTaskRules(request.uiLanguage),
      messages: [{
        role: 'user',
        content: JSON.stringify(
          buildInputPayload(request.target, request.context, request.lookupText, request.scopeText, request.querySurface, request.uiLanguage),
          null,
          2
        )
      }]
    })
  }, signal);

  if (!response.ok) {
    throw await buildApiError(response, 'Claude API error');
  }

  const data = await response.json();
  const raw = (data.content || [])
    .filter(block => block && block.type === 'text' && block.text)
    .map(block => block.text)
    .join('\n')
    .trim();

  return parseLooseJSON(raw, request.querySurface);
}

async function queryGemini(request, apiKey, provider, signal) {
  const structuredResponse = await queryGeminiStructured(request, apiKey, provider, signal);
  if (structuredResponse) return structuredResponse;
  return queryGeminiPlain(request, apiKey, provider, signal);
}

async function queryGeminiStructured(request, apiKey, provider, signal) {
  const retryDelays = [700, 1400];

  for (let attempt = 0; attempt <= retryDelays.length; attempt += 1) {
    if (attempt > 0) await wait(retryDelays[attempt - 1]);

    let response;
    try {
      response = await fetchJsonWithTimeout(
        `https://generativelanguage.googleapis.com/v1beta/models/${provider.model}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: buildTaskRules(request.uiLanguage) }]
            },
            contents: [{
              role: 'user',
              parts: [{
                text: JSON.stringify(
                  buildInputPayload(request.target, request.context, request.lookupText, request.scopeText, request.querySurface, request.uiLanguage),
                  null,
                  2
                )
              }]
            }],
            generationConfig: {
              temperature: 0,
              maxOutputTokens: 128,
              responseMimeType: 'application/json',
              responseSchema: RESPONSE_SCHEMA,
              thinkingConfig: { thinkingBudget: 0 }
            }
          })
        },
        signal
      );
    } catch (error) {
      if (/timed out|cancelled|canceled/i.test(error.message)) throw error;
      throw new Error('Network error: ' + error.message);
    }

    if (response.ok) {
      const data = await response.json();
      const raw = extractGeminiOutputText(data);
      if (!raw) {
        throw new Error('Gemini returned an empty response.');
      }
      return parseLooseJSON(raw, request.querySurface);
    }

    if ([400, 404, 422].includes(response.status)) {
      return null;
    }

    if ((response.status === 429 || response.status === 503) && attempt < retryDelays.length) {
      continue;
    }

    throw await buildApiError(response, 'Gemini API error');
  }

  throw new Error('Gemini is busy. Please try again shortly.');
}

async function queryGeminiPlain(request, apiKey, provider, signal) {
  const prompt = buildPrompt(request.target, request.context, request.lookupText, request.scopeText, request.querySurface, request.uiLanguage);
  const retryDelays = [800, 1600, 3200];

  for (let attempt = 0; attempt <= retryDelays.length; attempt += 1) {
    if (attempt > 0) {
      await wait(retryDelays[attempt - 1]);
    }

    let response;
    try {
      response = await fetchJsonWithTimeout(
        `https://generativelanguage.googleapis.com/v1beta/models/${provider.model}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0,
              maxOutputTokens: 256,
              thinkingConfig: { thinkingBudget: 0 }
            }
          })
        },
        signal
      );
    } catch (error) {
      if (/timed out|cancelled|canceled/i.test(error.message)) throw error;
      throw new Error('Network error: ' + error.message);
    }

    if (response.ok) {
      const data = await response.json();
      const raw = extractGeminiOutputText(data);
      return parseLooseJSON(raw, request.querySurface);
    }

    if ((response.status === 429 || response.status === 503) && attempt < retryDelays.length) {
      continue;
    }

    throw await buildApiError(response, 'Gemini API error');
  }

  throw new Error('Gemini is busy. Please try again shortly.');
}

function extractGeminiOutputText(data) {
  return (data.candidates?.[0]?.content?.parts || [])
    .map(part => part?.text || '')
    .join('\n')
    .trim();
}

async function queryOpenAI(request, apiKey, provider, signal) {
  let response;
  try {
    response = await fetchJsonWithTimeout('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: provider.model,
        store: false,
        instructions: buildTaskRules(request.uiLanguage),
        input: JSON.stringify(
          buildInputPayload(request.target, request.context, request.lookupText, request.scopeText, request.querySurface, request.uiLanguage),
          null,
          2
        ),
        temperature: 0,
        max_output_tokens: 120,
        text: {
          format: {
            type: 'json_schema',
            name: 'kanji_yomigana',
            schema: RESPONSE_SCHEMA,
            strict: true
          }
        }
      })
    }, signal);
  } catch (error) {
    if (/timed out|cancelled|canceled/i.test(error.message)) throw error;
    throw new Error('Network error: ' + error.message);
  }

  if (!response.ok) {
    throw await buildApiError(response, 'OpenAI API error');
  }

  const data = await response.json();
  const raw = extractResponsesOutputText(data);
  if (!raw) {
    throw new Error('OpenAI returned an empty response.');
  }

  return parseLooseJSON(raw, request.querySurface);
}

function extractResponsesOutputText(data) {
  if (typeof data?.output_text === 'string' && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const textChunks = [];
  for (const item of data?.output || []) {
    if (!item || item.type !== 'message') continue;
    for (const content of item.content || []) {
      if (!content) continue;
      if (typeof content.text === 'string' && content.text.trim()) {
        textChunks.push(content.text);
      } else if (typeof content.output_text === 'string' && content.output_text.trim()) {
        textChunks.push(content.output_text);
      }
    }
  }

  return textChunks.join('\n').trim();
}

function isFatalProviderError(error) {
  const message = String(error?.message || error || '');
  return /API error|API key|Network error|Unsupported|busy|permission|quota|429|401|403|empty response/i.test(message);
}

async function buildApiError(response, fallback) {
  let message = `${fallback} (${response.status})`;
  try {
    const body = await response.json();
    message = body?.error?.message || body?.message || message;
  } catch (_) {
    // ignore JSON parsing errors
  }
  return new Error(message);
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
