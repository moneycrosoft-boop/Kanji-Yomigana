const PROVIDER_META = Object.freeze({
  claude: {
    mode: 'claude',
    cardId: 'card-claude',
    inputId: 'claude-key-input',
    saveBtnId: 'save-claude-btn',
    clearBtnId: 'clear-claude-btn',
    statusId: 'claude-status',
    chipId: 'claude-saved-chip',
    placeholder: 'sk-ant-api03-…',
    validator: value => value.startsWith('sk-ant-')
  },
  gemini: {
    mode: 'gemini',
    cardId: 'card-gemini',
    inputId: 'gemini-key-input',
    saveBtnId: 'save-gemini-btn',
    clearBtnId: 'clear-gemini-btn',
    statusId: 'gemini-status',
    chipId: 'gemini-saved-chip',
    placeholder: 'AIzaSy…',
    validator: value => value.startsWith('AIza')
  },
  openai: {
    mode: 'openai',
    cardId: 'card-openai',
    inputId: 'openai-key-input',
    saveBtnId: 'save-openai-btn',
    clearBtnId: 'clear-openai-btn',
    statusId: 'openai-status',
    chipId: 'openai-saved-chip',
    placeholder: 'sk-...',
    validator: value => value.startsWith('sk-')
  }
});

const PROVIDER_LINKS = Object.freeze({
  gemini: 'https://aistudio.google.com/apikey',
  claude: 'https://console.anthropic.com',
  openai: 'https://platform.openai.com/api-keys'
});

const LANGUAGE_META = Object.freeze({
  ar: { code: 'ar', label: 'العربية', locale: 'ar', dir: 'rtl' },
  de: { code: 'de', label: 'Deutsch', locale: 'de-DE', dir: 'ltr' },
  en: { code: 'en', label: 'English', locale: 'en-US', dir: 'ltr' },
  es: { code: 'es', label: 'Español', locale: 'es-ES', dir: 'ltr' },
  fr: { code: 'fr', label: 'Français', locale: 'fr-FR', dir: 'ltr' },
  it: { code: 'it', label: 'Italiano', locale: 'it-IT', dir: 'ltr' },
  ko: { code: 'ko', label: '한국어', locale: 'ko-KR', dir: 'ltr' },
  'zh-hans': { code: 'zh-hans', label: '中文（简体）', locale: 'zh-CN', dir: 'ltr' },
  'zh-hant': { code: 'zh-hant', label: '中文（繁體）', locale: 'zh-TW', dir: 'ltr' }
});

const LANGUAGE_DISPLAY_ORDER = Object.freeze(['ar', 'de', 'en', 'es', 'fr', 'it', 'ko', 'zh-hans', 'zh-hant']);

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

const UI_STRINGS = Object.freeze({
  ko: {
    headerSub: 'Kanji Yomigana · Claude · Gemini · GPT',
    toggleTitle: '켜기/끄기',
    tabSettings: '설정',
    tabHistory: '오늘의 한자',
    tabFocus: '집중암기',
    navGuide: '사용법',
    navApi: 'API',
    navPrivacy: '개인정보',
    navSites: '사이트',
    navLanguage: '언어',
    navReset: '초기화',
    navGuideTitle: '사용 방법',
    navApiTitle: 'API',
    navPrivacyTitle: '개인정보',
    navSitesTitle: '사이트 접근 제어',
    navLanguageTitle: '언어 설정',
    navResetTitle: '초기화',
    guideTitle: '사용 방법',
    guideDesc: '처음 사용할 때는 아래 순서대로 한 번만 설정하면 됩니다.',
    guideItem1: '사용할 AI를 선택하고 API 키를 저장하세요.',
    guideItem2: '일본어 페이지에서 <strong style="color:var(--text-main)">한자</strong>를 클릭하면 문맥 기반 요미가나가 나타납니다.',
    guideItem3: '최근 <strong style="color:var(--text-main)">7일간 2회 이상</strong> 조회한 항목은 🔥 집중암기에 자동으로 모입니다.',
    guideItem4: '링크나 버튼 안 텍스트가 필요할 때는 <strong style="color:var(--text-main)">Alt(맥은 Option)+클릭</strong>으로 강제 조회할 수 있습니다.',
    apiTitle: 'API 제공자',
    apiDesc: '사용할 모델을 고르고 API 키를 저장하세요. 키는 팝업에 다시 표시되지 않고 마스킹 상태만 보여줍니다.',
    keyStorageSession: '세션만',
    keyStoragePersistent: '이 기기에 기억',
    keyStorageNoteSession: '브라우저 세션에만 보관합니다. 브라우저를 종료하면 키가 지워집니다.',
    keyStorageNotePersistent: '이 기기에 키를 기억합니다. 브라우저를 다시 열어도 남아 있습니다.',
    savedChip: '저장됨',
    storedKeyPlaceholder: masked => `저장된 키 ${masked}`,
    chipPersistent: masked => `기억됨 ${masked}`,
    chipSession: masked => `세션 ${masked}`,
    statusPersistent: masked => `현재 이 기기에 저장됨 · ${masked}`,
    statusSession: masked => `현재 세션에만 저장됨 · ${masked}`,
    enterKey: '키를 입력해주세요.',
    invalidKey: '올바른 형식이 아닙니다.',
    savedPersistent: masked => `저장되었습니다 · ${masked}`,
    savedSession: masked => `세션에 저장되었습니다 · ${masked}`,
    deletedKey: '키가 삭제되었습니다.',
    saveError: '저장 중 오류가 발생했습니다.',
    deleteError: '삭제 중 오류가 발생했습니다.',
    clearKeyTitle: '키 삭제',
    saveBtn: '저장',
    privacyTitle: '개인정보 및 데이터 처리',
    privacyDesc: '클릭한 일본어 표현과 짧은 주변 문맥이 선택한 제공자에게 전송될 수 있습니다. 기본값은 최소 저장 모드이며 URL·페이지 제목·문맥 저장은 꺼져 있습니다.',
    saveMetadata: '학습 기록에 URL / 페이지 제목 / 문맥까지 함께 저장',
    historyRetention: '학습 기록 보관 기간',
    cacheRetention: '응답 캐시 보관 기간',
    privacyLink: '자세한 개인정보·데이터 처리 안내 열기',
    sitesTitle: '사이트 접근 제어',
    sitesDesc: '민감 사이트는 기본 차단 목록에 포함됩니다. 허용 목록은 항상 우선합니다.',
    accessScope: '작동 범위',
    accessModeAll: '모든 사이트에서 작동하되 차단 목록 제외',
    accessModeAllow: '허용 목록에 적은 사이트에서만 작동',
    allowlist: '허용 목록',
    blocklist: '추가 차단 목록',
    sitePlaceholder: 'example.com\n*.example.org',
    siteNote: '줄바꿈 또는 쉼표로 여러 도메인을 입력할 수 있습니다. 예: example.com, *.example.org',
    languageTitle: '언어 설정',
    languageDesc: '팝업 UI 언어와 클릭 팝업의 뜻 번역 언어를 함께 바꿉니다.',
    languageLabel: '표시 언어',
    languageNote: '새 언어를 고르면 설정 탭 UI와 뜻 영역이 함께 바뀝니다.',
    resetTitle: '데이터 초기화',
    resetDesc: '저장된 API 키, 학습 기록, 집중암기, 캐시, 사이트 설정을 모두 삭제하고 기본 설정으로 되돌립니다.',
    resetButton: '모든 데이터 초기화',
    resetPrivacyLink: '영문 개인정보 안내 열기',
    resetConfirm: '저장된 API 키, 학습 기록, 집중암기, 캐시, 사이트 설정을 모두 삭제할까요?',
    resetting: '초기화 중…',
    resetDone: '모든 데이터를 초기화했습니다.',
    resetError: '초기화 중 오류가 발생했습니다.',
    changeStorageError: '저장 방식 변경 실패',
    sessionModeChanged: '키 저장 방식을 세션으로 바꿨습니다.',
    persistentModeChanged: '키 저장 방식을 이 기기 기억으로 바꿨습니다.',
    todayHeader: '오늘의 한자',
    clearToday: '오늘 기록 비우기',
    historyCount: count => (count ? `총 ${count}개 학습` : ''),
    historyEmpty: '아직 오늘 확인한 한자가 없습니다.<br>일본어 페이지에서 한자를 클릭해보세요!',
    historyRemoveTitle: '오늘 기록에서 제거',
    tooltipSource: '원문',
    tooltipPage: '페이지',
    focusIntro: '최근 <strong>7일간 2회 이상</strong> 조회한 항목을 <strong>횟수순</strong>으로 정리했어요.',
    focusHeader: '집중 암기 목록',
    clearFocus: '전체 삭제',
    focusCount: count => (count ? `총 ${count}개 · 최근 7일 기준` : ''),
    focusEmpty: '아직 집중암기 항목이 없습니다.<br>같은 항목을 2회 이상 클릭하면<br>자동으로 여기에 추가됩니다!',
    focusRemoveTitle: '집중암기에서 제거',
    countTimes: count => `${count}회`,
    emptyTodayBadge: date => `${date.getMonth() + 1}월 ${date.getDate()}일`,
    unknownError: '알 수 없는 오류',
    unsupportedProvider: '지원하지 않는 제공자입니다.',
    enterApiKey: 'API 키를 입력해주세요.'
  },
  en: {
    headerSub: 'Kanji Yomigana · Claude · Gemini · GPT',
    toggleTitle: 'Enable / disable',
    tabSettings: 'Settings',
    tabHistory: 'Today',
    tabFocus: 'Focus',
    navGuide: 'Guide',
    navApi: 'API',
    navPrivacy: 'Privacy',
    navSites: 'Sites',
    navLanguage: 'Language',
    navReset: 'Reset',
    navGuideTitle: 'How to use',
    navApiTitle: 'API',
    navPrivacyTitle: 'Privacy',
    navSitesTitle: 'Site access control',
    navLanguageTitle: 'Language',
    navResetTitle: 'Reset',
    guideTitle: 'How to use',
    guideDesc: 'You only need to set this up once when using the extension for the first time.',
    guideItem1: 'Choose an AI provider and save its API key.',
    guideItem2: 'Click a <strong style="color:var(--text-main)">kanji</strong> on a Japanese page to open a context-aware yomigana popup.',
    guideItem3: 'Items looked up <strong style="color:var(--text-main)">2 or more times in the last 7 days</strong> are collected automatically in 🔥 Focus.',
    guideItem4: 'For text inside links or buttons, use <strong style="color:var(--text-main)">Alt-click</strong> (Option-click on Mac) to force a lookup.',
    apiTitle: 'API providers',
    apiDesc: 'Pick the model you want to use and save its API key. The popup never shows the full key again, only a masked suffix.',
    keyStorageSession: 'Session only',
    keyStoragePersistent: 'Remember on this device',
    keyStorageNoteSession: 'The key is stored only for the current browser session and is cleared when the browser closes.',
    keyStorageNotePersistent: 'The key is remembered on this device and remains after restarting the browser.',
    savedChip: 'Saved',
    storedKeyPlaceholder: masked => `Saved key ${masked}`,
    chipPersistent: masked => `Saved ${masked}`,
    chipSession: masked => `Session ${masked}`,
    statusPersistent: masked => `Stored on this device · ${masked}`,
    statusSession: masked => `Stored for this session · ${masked}`,
    enterKey: 'Please enter a key.',
    invalidKey: 'The format looks invalid.',
    savedPersistent: masked => `Saved · ${masked}`,
    savedSession: masked => `Saved for this session · ${masked}`,
    deletedKey: 'The key was removed.',
    saveError: 'Could not save the key.',
    deleteError: 'Could not delete the key.',
    clearKeyTitle: 'Delete key',
    saveBtn: 'Save',
    privacyTitle: 'Privacy & data handling',
    privacyDesc: 'The clicked Japanese expression and a short surrounding context may be sent to the provider you selected. By default the extension uses minimal local storage and does not keep URL, title, or context metadata.',
    saveMetadata: 'Also store URL / page title / context in study history',
    historyRetention: 'History retention',
    cacheRetention: 'Response cache retention',
    privacyLink: 'Open detailed privacy/data notice',
    sitesTitle: 'Site access control',
    sitesDesc: 'Sensitive sites are included in the default blocklist. The allowlist always wins.',
    accessScope: 'Where it runs',
    accessModeAll: 'Run on all sites except blocked ones',
    accessModeAllow: 'Run only on sites in the allowlist',
    allowlist: 'Allowlist',
    blocklist: 'Additional blocklist',
    sitePlaceholder: 'example.com\n*.example.org',
    siteNote: 'You can enter multiple domains separated by commas or line breaks. Example: example.com, *.example.org',
    languageTitle: 'Language',
    languageDesc: 'This changes both the popup UI language and the language used for the meaning line in click popups.',
    languageLabel: 'Display language',
    languageNote: 'Choosing a language updates the settings UI and the meaning gloss together.',
    resetTitle: 'Reset data',
    resetDesc: 'Delete saved API keys, lookup history, focus items, cache, and site settings, then restore the defaults.',
    resetButton: 'Delete all data',
    resetPrivacyLink: 'Open English privacy notice',
    resetConfirm: 'Delete all saved API keys, history, focus items, cache, and site settings?',
    resetting: 'Resetting…',
    resetDone: 'All extension data was deleted.',
    resetError: 'Could not reset the data.',
    changeStorageError: 'Could not change the storage mode.',
    sessionModeChanged: 'Key storage was switched to session only.',
    persistentModeChanged: 'Key storage was switched to remember on this device.',
    todayHeader: 'Today',
    clearToday: 'Clear today',
    historyCount: count => (count ? `${count} items today` : ''),
    historyEmpty: 'No kanji looked up today yet.<br>Click a kanji on a Japanese page to get started!',
    historyRemoveTitle: 'Remove from today',
    tooltipSource: 'Source',
    tooltipPage: 'Page',
    focusIntro: 'Items looked up <strong>2 or more times in the last 7 days</strong> are sorted here by <strong>frequency</strong>.',
    focusHeader: 'Focus list',
    clearFocus: 'Delete all',
    focusCount: count => (count ? `${count} items · last 7 days` : ''),
    focusEmpty: 'No focus items yet.<br>Click the same item at least twice<br>and it will appear here automatically!',
    focusRemoveTitle: 'Remove from focus list',
    countTimes: count => `${count}x`,
    emptyTodayBadge: date => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date),
    unknownError: 'Unknown error',
    unsupportedProvider: 'Unsupported provider.',
    enterApiKey: 'Please enter an API key.'
  },
  de: {
    headerSub: 'Kanji Yomigana · Claude · Gemini · GPT',
    toggleTitle: 'Ein / aus',
    tabSettings: 'Einstellungen',
    tabHistory: 'Heute',
    tabFocus: 'Fokus',
    navGuide: 'Anleitung',
    navApi: 'API',
    navPrivacy: 'Datenschutz',
    navSites: 'Websites',
    navLanguage: 'Sprache',
    navReset: 'Zurücksetzen',
    navGuideTitle: 'Anleitung',
    navApiTitle: 'API',
    navPrivacyTitle: 'Datenschutz',
    navSitesTitle: 'Website-Zugriff',
    navLanguageTitle: 'Sprache',
    navResetTitle: 'Zurücksetzen',
    guideTitle: 'So funktioniert es',
    guideDesc: 'Beim ersten Start musst du die Erweiterung nur einmal einrichten.',
    guideItem1: 'Wähle einen KI-Anbieter und speichere seinen API-Schlüssel.',
    guideItem2: 'Klicke auf einer japanischen Seite auf ein <strong style="color:var(--text-main)">Kanji</strong>, um ein kontextbezogenes Yomigana-Popup zu öffnen.',
    guideItem3: 'Einträge, die in den letzten <strong style="color:var(--text-main)">7 Tagen mindestens 2 Mal</strong> abgefragt wurden, erscheinen automatisch in 🔥 Fokus.',
    guideItem4: 'Für Text in Links oder Buttons kannst du mit <strong style="color:var(--text-main)">Alt-Klick</strong> eine Abfrage erzwingen.',
    apiTitle: 'API-Anbieter',
    apiDesc: 'Wähle das gewünschte Modell und speichere den API-Schlüssel. Das Popup zeigt den vollständigen Schlüssel nicht erneut an.',
    keyStorageSession: 'Nur Sitzung',
    keyStoragePersistent: 'Auf diesem Gerät merken',
    keyStorageNoteSession: 'Der Schlüssel wird nur für die aktuelle Browsersitzung gespeichert und beim Schließen des Browsers gelöscht.',
    keyStorageNotePersistent: 'Der Schlüssel bleibt auf diesem Gerät gespeichert und ist nach einem Neustart weiterhin verfügbar.',
    savedChip: 'Gespeichert',
    storedKeyPlaceholder: masked => `Gespeicherter Schlüssel ${masked}`,
    chipPersistent: masked => `Gerät ${masked}`,
    chipSession: masked => `Sitzung ${masked}`,
    statusPersistent: masked => `Auf diesem Gerät gespeichert · ${masked}`,
    statusSession: masked => `Für diese Sitzung gespeichert · ${masked}`,
    enterKey: 'Bitte gib einen Schlüssel ein.',
    invalidKey: 'Das Format scheint ungültig zu sein.',
    savedPersistent: masked => `Gespeichert · ${masked}`,
    savedSession: masked => `Für diese Sitzung gespeichert · ${masked}`,
    deletedKey: 'Der Schlüssel wurde gelöscht.',
    saveError: 'Der Schlüssel konnte nicht gespeichert werden.',
    deleteError: 'Der Schlüssel konnte nicht gelöscht werden.',
    clearKeyTitle: 'Schlüssel löschen',
    saveBtn: 'Speichern',
    privacyTitle: 'Datenschutz & Daten',
    privacyDesc: 'Der angeklickte japanische Ausdruck und ein kurzer Kontext können an den ausgewählten Anbieter gesendet werden. Standardmäßig speichert die Erweiterung nur minimale lokale Daten.',
    saveMetadata: 'URL / Seitentitel / Kontext zusätzlich im Lernverlauf speichern',
    historyRetention: 'Aufbewahrung des Verlaufs',
    cacheRetention: 'Aufbewahrung des Antwort-Caches',
    privacyLink: 'Detaillierte Datenschutz-/Datenhinweise öffnen',
    sitesTitle: 'Website-Zugriff',
    sitesDesc: 'Empfindliche Websites sind in der Standard-Blockliste enthalten. Die Erlaubnisliste hat immer Vorrang.',
    accessScope: 'Geltungsbereich',
    accessModeAll: 'Auf allen Websites außer blockierten ausführen',
    accessModeAllow: 'Nur auf Websites aus der Erlaubnisliste ausführen',
    allowlist: 'Erlaubnisliste',
    blocklist: 'Zusätzliche Blockliste',
    sitePlaceholder: 'example.com\n*.example.org',
    siteNote: 'Mehrere Domains können durch Zeilenumbrüche oder Kommas getrennt werden. Beispiel: example.com, *.example.org',
    languageTitle: 'Sprache',
    languageDesc: 'Diese Auswahl ändert sowohl die Sprache der Popup-Oberfläche als auch die Sprache der Bedeutungszeile im Klick-Popup.',
    languageLabel: 'Anzeigesprache',
    languageNote: 'Beim Sprachwechsel werden Einstellungen und Bedeutungszeile gemeinsam aktualisiert.',
    resetTitle: 'Daten zurücksetzen',
    resetDesc: 'Gespeicherte API-Schlüssel, Verlauf, Fokusliste, Cache und Website-Einstellungen löschen und Standardwerte wiederherstellen.',
    resetButton: 'Alle Daten löschen',
    resetPrivacyLink: 'Englischen Datenschutzhinweis öffnen',
    resetConfirm: 'Alle gespeicherten API-Schlüssel, Verläufe, Fokusdaten, Cache und Website-Einstellungen löschen?',
    resetting: 'Wird zurückgesetzt…',
    resetDone: 'Alle Erweiterungsdaten wurden gelöscht.',
    resetError: 'Die Daten konnten nicht zurückgesetzt werden.',
    changeStorageError: 'Der Speichermodus konnte nicht geändert werden.',
    sessionModeChanged: 'Der Schlüsselspeicher wurde auf Nur-Sitzung umgestellt.',
    persistentModeChanged: 'Der Schlüsselspeicher wurde auf Dieses Gerät merken umgestellt.',
    todayHeader: 'Heute',
    clearToday: 'Heute leeren',
    historyCount: count => (count ? `${count} Einträge heute` : ''),
    historyEmpty: 'Heute wurden noch keine Kanji nachgeschlagen.<br>Klicke auf einer japanischen Seite auf ein Kanji, um zu starten!',
    historyRemoveTitle: 'Aus Heute entfernen',
    tooltipSource: 'Quelle',
    tooltipPage: 'Seite',
    focusIntro: 'Einträge, die in den <strong>letzten 7 Tagen mindestens 2 Mal</strong> abgefragt wurden, werden hier nach <strong>Häufigkeit</strong> sortiert.',
    focusHeader: 'Fokusliste',
    clearFocus: 'Alle löschen',
    focusCount: count => (count ? `${count} Einträge · letzte 7 Tage` : ''),
    focusEmpty: 'Noch keine Fokus-Einträge.<br>Klicke denselben Eintrag mindestens zweimal,<br>dann erscheint er hier automatisch!',
    focusRemoveTitle: 'Aus der Fokusliste entfernen',
    countTimes: count => `${count}x`,
    emptyTodayBadge: date => new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'short' }).format(date),
    unknownError: 'Unbekannter Fehler',
    unsupportedProvider: 'Nicht unterstützter Anbieter.',
    enterApiKey: 'Bitte gib einen API-Schlüssel ein.'
  },
  fr: {
    headerSub: 'Kanji Yomigana · Claude · Gemini · GPT',
    toggleTitle: 'Activer / désactiver',
    tabSettings: 'Réglages',
    tabHistory: 'Aujourd’hui',
    tabFocus: 'Focus',
    navGuide: 'Guide',
    navApi: 'API',
    navPrivacy: 'Vie privée',
    navSites: 'Sites',
    navLanguage: 'Langue',
    navReset: 'Réinitialiser',
    navGuideTitle: 'Guide',
    navApiTitle: 'API',
    navPrivacyTitle: 'Vie privée',
    navSitesTitle: 'Accès aux sites',
    navLanguageTitle: 'Langue',
    navResetTitle: 'Réinitialiser',
    guideTitle: 'Mode d’emploi',
    guideDesc: 'Il suffit de configurer l’extension une seule fois lors de la première utilisation.',
    guideItem1: 'Choisis un fournisseur IA et enregistre sa clé API.',
    guideItem2: 'Clique sur un <strong style="color:var(--text-main)">kanji</strong> dans une page japonaise pour ouvrir un popup de lecture contextuelle.',
    guideItem3: 'Les éléments consultés <strong style="color:var(--text-main)">au moins 2 fois au cours des 7 derniers jours</strong> sont ajoutés automatiquement à 🔥 Focus.',
    guideItem4: 'Pour le texte dans un lien ou un bouton, utilise <strong style="color:var(--text-main)">Alt + clic</strong> pour forcer la recherche.',
    apiTitle: 'Fournisseurs API',
    apiDesc: 'Choisis le modèle à utiliser et enregistre la clé API. La clé complète n’est plus réaffichée dans le popup.',
    keyStorageSession: 'Session uniquement',
    keyStoragePersistent: 'Mémoriser sur cet appareil',
    keyStorageNoteSession: 'La clé n’est conservée que pour la session actuelle du navigateur et disparaît à la fermeture.',
    keyStorageNotePersistent: 'La clé est mémorisée sur cet appareil et reste disponible après redémarrage du navigateur.',
    savedChip: 'Enregistré',
    storedKeyPlaceholder: masked => `Clé enregistrée ${masked}`,
    chipPersistent: masked => `Appareil ${masked}`,
    chipSession: masked => `Session ${masked}`,
    statusPersistent: masked => `Enregistrée sur cet appareil · ${masked}`,
    statusSession: masked => `Enregistrée pour cette session · ${masked}`,
    enterKey: 'Veuillez saisir une clé.',
    invalidKey: 'Le format semble invalide.',
    savedPersistent: masked => `Enregistrée · ${masked}`,
    savedSession: masked => `Enregistrée pour cette session · ${masked}`,
    deletedKey: 'La clé a été supprimée.',
    saveError: 'Impossible d’enregistrer la clé.',
    deleteError: 'Impossible de supprimer la clé.',
    clearKeyTitle: 'Supprimer la clé',
    saveBtn: 'Enregistrer',
    privacyTitle: 'Vie privée & données',
    privacyDesc: 'L’expression japonaise cliquée et un court contexte peuvent être envoyés au fournisseur sélectionné. Par défaut, l’extension conserve un minimum de données locales.',
    saveMetadata: 'Enregistrer aussi l’URL / le titre / le contexte dans l’historique',
    historyRetention: 'Durée de conservation de l’historique',
    cacheRetention: 'Durée de conservation du cache',
    privacyLink: 'Ouvrir l’avis détaillé sur les données',
    sitesTitle: 'Accès aux sites',
    sitesDesc: 'Les sites sensibles sont inclus dans la liste de blocage par défaut. La liste d’autorisation est toujours prioritaire.',
    accessScope: 'Portée',
    accessModeAll: 'Fonctionner sur tous les sites sauf ceux bloqués',
    accessModeAllow: 'Fonctionner uniquement sur les sites de la liste d’autorisation',
    allowlist: 'Liste d’autorisation',
    blocklist: 'Liste de blocage supplémentaire',
    sitePlaceholder: 'example.com\n*.example.org',
    siteNote: 'Plusieurs domaines peuvent être saisis avec des virgules ou des retours à la ligne. Exemple : example.com, *.example.org',
    languageTitle: 'Langue',
    languageDesc: 'Cette option change à la fois la langue de l’interface du popup et la langue utilisée pour la ligne de sens dans le popup de clic.',
    languageLabel: 'Langue d’affichage',
    languageNote: 'Le changement de langue met à jour l’interface des réglages et la ligne de sens en même temps.',
    resetTitle: 'Réinitialiser les données',
    resetDesc: 'Supprime les clés API, l’historique, les éléments Focus, le cache et les réglages de site, puis rétablit les valeurs par défaut.',
    resetButton: 'Supprimer toutes les données',
    resetPrivacyLink: 'Ouvrir l’avis de confidentialité en anglais',
    resetConfirm: 'Supprimer toutes les clés API, l’historique, Focus, le cache et les réglages de site ?',
    resetting: 'Réinitialisation…',
    resetDone: 'Toutes les données de l’extension ont été supprimées.',
    resetError: 'Impossible de réinitialiser les données.',
    changeStorageError: 'Impossible de changer le mode de stockage.',
    sessionModeChanged: 'Le stockage des clés a été basculé en mode session uniquement.',
    persistentModeChanged: 'Le stockage des clés a été basculé en mode mémorisé sur cet appareil.',
    todayHeader: 'Aujourd’hui',
    clearToday: 'Effacer aujourd’hui',
    historyCount: count => (count ? `${count} éléments aujourd’hui` : ''),
    historyEmpty: 'Aucun kanji consulté aujourd’hui pour le moment.<br>Clique sur un kanji dans une page japonaise pour commencer !',
    historyRemoveTitle: 'Retirer d’aujourd’hui',
    tooltipSource: 'Source',
    tooltipPage: 'Page',
    focusIntro: 'Les éléments consultés <strong>au moins 2 fois pendant les 7 derniers jours</strong> sont triés ici par <strong>fréquence</strong>.',
    focusHeader: 'Liste Focus',
    clearFocus: 'Tout supprimer',
    focusCount: count => (count ? `${count} éléments · 7 derniers jours` : ''),
    focusEmpty: 'Aucun élément Focus pour le moment.<br>Clique au moins deux fois sur le même élément<br>et il apparaîtra ici automatiquement !',
    focusRemoveTitle: 'Retirer de Focus',
    countTimes: count => `${count}x`,
    emptyTodayBadge: date => new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' }).format(date),
    unknownError: 'Erreur inconnue',
    unsupportedProvider: 'Fournisseur non pris en charge.',
    enterApiKey: 'Veuillez saisir une clé API.'
  },
  it: {
    headerSub: 'Kanji Yomigana · Claude · Gemini · GPT',
    toggleTitle: 'Attiva / disattiva',
    tabSettings: 'Impostazioni',
    tabHistory: 'Oggi',
    tabFocus: 'Focus',
    navGuide: 'Guida',
    navApi: 'API',
    navPrivacy: 'Privacy',
    navSites: 'Siti',
    navLanguage: 'Lingua',
    navReset: 'Reimposta',
    navGuideTitle: 'Guida',
    navApiTitle: 'API',
    navPrivacyTitle: 'Privacy',
    navSitesTitle: 'Accesso ai siti',
    navLanguageTitle: 'Lingua',
    navResetTitle: 'Reimposta',
    guideTitle: 'Come si usa',
    guideDesc: 'La configurazione iniziale va fatta una sola volta.',
    guideItem1: 'Scegli un provider AI e salva la sua chiave API.',
    guideItem2: 'Fai clic su un <strong style="color:var(--text-main)">kanji</strong> in una pagina giapponese per aprire un popup con lettura contestuale.',
    guideItem3: 'Gli elementi consultati <strong style="color:var(--text-main)">almeno 2 volte negli ultimi 7 giorni</strong> vengono raccolti automaticamente in 🔥 Focus.',
    guideItem4: 'Per il testo dentro link o pulsanti, usa <strong style="color:var(--text-main)">Alt + clic</strong> per forzare la ricerca.',
    apiTitle: 'Provider API',
    apiDesc: 'Scegli il modello da usare e salva la chiave API. Il popup non mostra più la chiave completa, ma solo una parte mascherata.',
    keyStorageSession: 'Solo sessione',
    keyStoragePersistent: 'Ricorda su questo dispositivo',
    keyStorageNoteSession: 'La chiave viene conservata solo per la sessione corrente del browser e viene rimossa alla chiusura.',
    keyStorageNotePersistent: 'La chiave viene ricordata su questo dispositivo e resta disponibile dopo il riavvio del browser.',
    savedChip: 'Salvata',
    storedKeyPlaceholder: masked => `Chiave salvata ${masked}`,
    chipPersistent: masked => `Dispositivo ${masked}`,
    chipSession: masked => `Sessione ${masked}`,
    statusPersistent: masked => `Salvata su questo dispositivo · ${masked}`,
    statusSession: masked => `Salvata per questa sessione · ${masked}`,
    enterKey: 'Inserisci una chiave.',
    invalidKey: 'Il formato sembra non valido.',
    savedPersistent: masked => `Salvata · ${masked}`,
    savedSession: masked => `Salvata per questa sessione · ${masked}`,
    deletedKey: 'La chiave è stata eliminata.',
    saveError: 'Impossibile salvare la chiave.',
    deleteError: 'Impossibile eliminare la chiave.',
    clearKeyTitle: 'Elimina chiave',
    saveBtn: 'Salva',
    privacyTitle: 'Privacy e dati',
    privacyDesc: 'L’espressione giapponese cliccata e un breve contesto possono essere inviati al provider selezionato. Per impostazione predefinita l’estensione conserva solo i dati locali minimi.',
    saveMetadata: 'Salva anche URL / titolo pagina / contesto nella cronologia',
    historyRetention: 'Conservazione cronologia',
    cacheRetention: 'Conservazione cache risposte',
    privacyLink: 'Apri l’avviso dettagliato su privacy e dati',
    sitesTitle: 'Accesso ai siti',
    sitesDesc: 'I siti sensibili sono inclusi nella blocklist predefinita. L’allowlist ha sempre la priorità.',
    accessScope: 'Ambito',
    accessModeAll: 'Funziona su tutti i siti tranne quelli bloccati',
    accessModeAllow: 'Funziona solo sui siti presenti nell’allowlist',
    allowlist: 'Allowlist',
    blocklist: 'Blocklist aggiuntiva',
    sitePlaceholder: 'example.com\n*.example.org',
    siteNote: 'Puoi inserire più domini separati da virgole o ritorni a capo. Esempio: example.com, *.example.org',
    languageTitle: 'Lingua',
    languageDesc: 'Questa opzione cambia sia la lingua dell’interfaccia del popup sia la lingua usata per la riga del significato nel popup di clic.',
    languageLabel: 'Lingua di visualizzazione',
    languageNote: 'Quando scegli una lingua, si aggiornano insieme l’interfaccia delle impostazioni e la riga del significato.',
    resetTitle: 'Reimposta dati',
    resetDesc: 'Elimina chiavi API, cronologia, elementi Focus, cache e impostazioni dei siti, poi ripristina i valori predefiniti.',
    resetButton: 'Elimina tutti i dati',
    resetPrivacyLink: 'Apri l’avviso privacy in inglese',
    resetConfirm: 'Eliminare tutte le chiavi API, la cronologia, Focus, la cache e le impostazioni dei siti?',
    resetting: 'Reimpostazione…',
    resetDone: 'Tutti i dati dell’estensione sono stati eliminati.',
    resetError: 'Impossibile reimpostare i dati.',
    changeStorageError: 'Impossibile cambiare la modalità di salvataggio.',
    sessionModeChanged: 'Il salvataggio delle chiavi è passato alla sola sessione.',
    persistentModeChanged: 'Il salvataggio delle chiavi è passato a Ricorda su questo dispositivo.',
    todayHeader: 'Oggi',
    clearToday: 'Svuota oggi',
    historyCount: count => (count ? `${count} elementi oggi` : ''),
    historyEmpty: 'Nessun kanji consultato oggi.<br>Fai clic su un kanji in una pagina giapponese per iniziare!',
    historyRemoveTitle: 'Rimuovi da oggi',
    tooltipSource: 'Fonte',
    tooltipPage: 'Pagina',
    focusIntro: 'Gli elementi consultati <strong>almeno 2 volte negli ultimi 7 giorni</strong> vengono ordinati qui per <strong>frequenza</strong>.',
    focusHeader: 'Lista Focus',
    clearFocus: 'Elimina tutto',
    focusCount: count => (count ? `${count} elementi · ultimi 7 giorni` : ''),
    focusEmpty: 'Nessun elemento Focus per ora.<br>Fai clic almeno due volte sullo stesso elemento<br>e apparirà qui automaticamente!',
    focusRemoveTitle: 'Rimuovi da Focus',
    countTimes: count => `${count}x`,
    emptyTodayBadge: date => new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'short' }).format(date),
    unknownError: 'Errore sconosciuto',
    unsupportedProvider: 'Provider non supportato.',
    enterApiKey: 'Inserisci una chiave API.'
  },
  es: {
    headerSub: 'Kanji Yomigana · Claude · Gemini · GPT',
    toggleTitle: 'Activar / desactivar',
    tabSettings: 'Ajustes',
    tabHistory: 'Hoy',
    tabFocus: 'Focus',
    navGuide: 'Guía',
    navApi: 'API',
    navPrivacy: 'Privacidad',
    navSites: 'Sitios',
    navLanguage: 'Idioma',
    navReset: 'Restablecer',
    navGuideTitle: 'Guía',
    navApiTitle: 'API',
    navPrivacyTitle: 'Privacidad',
    navSitesTitle: 'Acceso a sitios',
    navLanguageTitle: 'Idioma',
    navResetTitle: 'Restablecer',
    guideTitle: 'Cómo se usa',
    guideDesc: 'Solo necesitas configurar la extensión una vez al comenzar.',
    guideItem1: 'Elige un proveedor de IA y guarda su clave API.',
    guideItem2: 'Haz clic en un <strong style="color:var(--text-main)">kanji</strong> en una página japonesa para abrir un popup con yomigana contextual.',
    guideItem3: 'Los elementos consultados <strong style="color:var(--text-main)">2 o más veces en los últimos 7 días</strong> se reúnen automáticamente en 🔥 Focus.',
    guideItem4: 'Para texto dentro de enlaces o botones, usa <strong style="color:var(--text-main)">Alt + clic</strong> para forzar la consulta.',
    apiTitle: 'Proveedores API',
    apiDesc: 'Elige el modelo que quieres usar y guarda su clave API. El popup no vuelve a mostrar la clave completa, solo una parte enmascarada.',
    keyStorageSession: 'Solo sesión',
    keyStoragePersistent: 'Recordar en este dispositivo',
    keyStorageNoteSession: 'La clave se guarda solo durante la sesión actual del navegador y se elimina al cerrarlo.',
    keyStorageNotePersistent: 'La clave se recuerda en este dispositivo y sigue disponible después de reiniciar el navegador.',
    savedChip: 'Guardada',
    storedKeyPlaceholder: masked => `Clave guardada ${masked}`,
    chipPersistent: masked => `Dispositivo ${masked}`,
    chipSession: masked => `Sesión ${masked}`,
    statusPersistent: masked => `Guardada en este dispositivo · ${masked}`,
    statusSession: masked => `Guardada para esta sesión · ${masked}`,
    enterKey: 'Introduce una clave.',
    invalidKey: 'El formato parece no válido.',
    savedPersistent: masked => `Guardada · ${masked}`,
    savedSession: masked => `Guardada para esta sesión · ${masked}`,
    deletedKey: 'La clave fue eliminada.',
    saveError: 'No se pudo guardar la clave.',
    deleteError: 'No se pudo eliminar la clave.',
    clearKeyTitle: 'Eliminar clave',
    saveBtn: 'Guardar',
    privacyTitle: 'Privacidad y datos',
    privacyDesc: 'La expresión japonesa pulsada y un breve contexto pueden enviarse al proveedor elegido. De forma predeterminada, la extensión usa un almacenamiento local mínimo.',
    saveMetadata: 'Guardar también URL / título de página / contexto en el historial',
    historyRetention: 'Retención del historial',
    cacheRetention: 'Retención de la caché',
    privacyLink: 'Abrir aviso detallado de privacidad y datos',
    sitesTitle: 'Acceso a sitios',
    sitesDesc: 'Los sitios sensibles se incluyen en la lista de bloqueo predeterminada. La lista de permitidos siempre tiene prioridad.',
    accessScope: 'Alcance',
    accessModeAll: 'Funcionar en todos los sitios excepto los bloqueados',
    accessModeAllow: 'Funcionar solo en los sitios de la lista permitida',
    allowlist: 'Lista permitida',
    blocklist: 'Lista de bloqueo adicional',
    sitePlaceholder: 'example.com\n*.example.org',
    siteNote: 'Puedes introducir varios dominios separados por comas o saltos de línea. Ejemplo: example.com, *.example.org',
    languageTitle: 'Idioma',
    languageDesc: 'Esta opción cambia tanto el idioma de la interfaz del popup como el idioma usado en la línea de significado del popup al hacer clic.',
    languageLabel: 'Idioma de visualización',
    languageNote: 'Al elegir un idioma, se actualizan juntos la interfaz de ajustes y la línea de significado.',
    resetTitle: 'Restablecer datos',
    resetDesc: 'Elimina claves API guardadas, historial, Focus, caché y ajustes de sitios, y luego restaura los valores predeterminados.',
    resetButton: 'Eliminar todos los datos',
    resetPrivacyLink: 'Abrir aviso de privacidad en inglés',
    resetConfirm: '¿Eliminar todas las claves API, historial, Focus, caché y ajustes de sitios?',
    resetting: 'Restableciendo…',
    resetDone: 'Se eliminaron todos los datos de la extensión.',
    resetError: 'No se pudieron restablecer los datos.',
    changeStorageError: 'No se pudo cambiar el modo de almacenamiento.',
    sessionModeChanged: 'El almacenamiento de claves cambió a solo sesión.',
    persistentModeChanged: 'El almacenamiento de claves cambió a recordar en este dispositivo.',
    todayHeader: 'Hoy',
    clearToday: 'Vaciar hoy',
    historyCount: count => (count ? `${count} elementos hoy` : ''),
    historyEmpty: 'Todavía no hay kanji consultados hoy.<br>Haz clic en un kanji de una página japonesa para empezar.',
    historyRemoveTitle: 'Quitar de hoy',
    tooltipSource: 'Origen',
    tooltipPage: 'Página',
    focusIntro: 'Los elementos consultados <strong>2 o más veces en los últimos 7 días</strong> se ordenan aquí por <strong>frecuencia</strong>.',
    focusHeader: 'Lista Focus',
    clearFocus: 'Eliminar todo',
    focusCount: count => (count ? `${count} elementos · últimos 7 días` : ''),
    focusEmpty: 'Todavía no hay elementos Focus.<br>Haz clic dos veces o más en el mismo elemento<br>y aparecerá aquí automáticamente.',
    focusRemoveTitle: 'Quitar de Focus',
    countTimes: count => `${count}x`,
    emptyTodayBadge: date => new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short' }).format(date),
    unknownError: 'Error desconocido',
    unsupportedProvider: 'Proveedor no compatible.',
    enterApiKey: 'Introduce una clave API.'
  },
  ar: {
    headerSub: 'Kanji Yomigana · Claude · Gemini · GPT',
    toggleTitle: 'تشغيل / إيقاف',
    tabSettings: 'الإعدادات',
    tabHistory: 'اليوم',
    tabFocus: 'التركيز',
    navGuide: 'الدليل',
    navApi: 'API',
    navPrivacy: 'الخصوصية',
    navSites: 'المواقع',
    navLanguage: 'اللغة',
    navReset: 'إعادة الضبط',
    navGuideTitle: 'الدليل',
    navApiTitle: 'API',
    navPrivacyTitle: 'الخصوصية',
    navSitesTitle: 'التحكم بالمواقع',
    navLanguageTitle: 'اللغة',
    navResetTitle: 'إعادة الضبط',
    guideTitle: 'طريقة الاستخدام',
    guideDesc: 'يكفي إعداد الإضافة مرة واحدة عند أول استخدام.',
    guideItem1: 'اختر مزوّد الذكاء الاصطناعي واحفظ مفتاح API الخاص به.',
    guideItem2: 'انقر على <strong style="color:var(--text-main)">كانجي</strong> في صفحة يابانية لفتح نافذة قراءة تعتمد على السياق.',
    guideItem3: 'العناصر التي تم الرجوع إليها <strong style="color:var(--text-main)">مرتين أو أكثر خلال آخر 7 أيام</strong> تُجمع تلقائيًا في 🔥 التركيز.',
    guideItem4: 'للنص داخل الروابط أو الأزرار، استخدم <strong style="color:var(--text-main)">Alt + click</strong> لفرض الاستعلام.',
    apiTitle: 'مزودو API',
    apiDesc: 'اختر النموذج الذي تريد استخدامه واحفظ مفتاح API. لن تُعرض قيمة المفتاح كاملة مرة أخرى، بل يظهر جزء مخفي فقط.',
    keyStorageSession: 'الجلسة فقط',
    keyStoragePersistent: 'تذكّر على هذا الجهاز',
    keyStorageNoteSession: 'يُحفَظ المفتاح خلال جلسة المتصفح الحالية فقط ويُزال عند إغلاق المتصفح.',
    keyStorageNotePersistent: 'يُحفَظ المفتاح على هذا الجهاز ويبقى متاحًا بعد إعادة تشغيل المتصفح.',
    savedChip: 'محفوظ',
    storedKeyPlaceholder: masked => `مفتاح محفوظ ${masked}`,
    chipPersistent: masked => `الجهاز ${masked}`,
    chipSession: masked => `الجلسة ${masked}`,
    statusPersistent: masked => `محفوظ على هذا الجهاز · ${masked}`,
    statusSession: masked => `محفوظ لهذه الجلسة · ${masked}`,
    enterKey: 'أدخل مفتاحًا.',
    invalidKey: 'يبدو أن التنسيق غير صالح.',
    savedPersistent: masked => `تم الحفظ · ${masked}`,
    savedSession: masked => `تم الحفظ لهذه الجلسة · ${masked}`,
    deletedKey: 'تم حذف المفتاح.',
    saveError: 'تعذّر حفظ المفتاح.',
    deleteError: 'تعذّر حذف المفتاح.',
    clearKeyTitle: 'حذف المفتاح',
    saveBtn: 'حفظ',
    privacyTitle: 'الخصوصية والبيانات',
    privacyDesc: 'قد يتم إرسال العبارة اليابانية التي نُقر عليها وسياق قصير إلى المزوّد الذي اخترته. بشكل افتراضي تستخدم الإضافة حدًا أدنى من التخزين المحلي.',
    saveMetadata: 'احفظ أيضًا الرابط / عنوان الصفحة / السياق في السجل',
    historyRetention: 'مدة الاحتفاظ بالسجل',
    cacheRetention: 'مدة الاحتفاظ بالذاكرة المؤقتة',
    privacyLink: 'افتح إشعار الخصوصية والبيانات المفصّل',
    sitesTitle: 'التحكم بالمواقع',
    sitesDesc: 'تتضمن قائمة الحظر الافتراضية المواقع الحساسة. وتبقى قائمة السماح ذات أولوية دائمًا.',
    accessScope: 'نطاق التشغيل',
    accessModeAll: 'يعمل على جميع المواقع باستثناء المحظورة',
    accessModeAllow: 'يعمل فقط على المواقع الموجودة في قائمة السماح',
    allowlist: 'قائمة السماح',
    blocklist: 'قائمة حظر إضافية',
    sitePlaceholder: 'example.com\n*.example.org',
    siteNote: 'يمكن إدخال عدة نطاقات مفصولة بفواصل أو أسطر جديدة. مثال: example.com, *.example.org',
    languageTitle: 'اللغة',
    languageDesc: 'يغيّر هذا الخيار لغة واجهة النافذة المنبثقة ولغة سطر المعنى في نافذة النقر معًا.',
    languageLabel: 'لغة العرض',
    languageNote: 'عند اختيار لغة، يتم تحديث واجهة الإعدادات وسطر المعنى معًا.',
    resetTitle: 'إعادة ضبط البيانات',
    resetDesc: 'احذف مفاتيح API المحفوظة، والسجل، وعناصر التركيز، والذاكرة المؤقتة، وإعدادات المواقع، ثم أعد القيم الافتراضية.',
    resetButton: 'حذف كل البيانات',
    resetPrivacyLink: 'افتح إشعار الخصوصية الإنجليزي',
    resetConfirm: 'هل تريد حذف جميع مفاتيح API والسجل وعناصر التركيز والذاكرة المؤقتة وإعدادات المواقع؟',
    resetting: 'جارٍ إعادة الضبط…',
    resetDone: 'تم حذف جميع بيانات الإضافة.',
    resetError: 'تعذّرت إعادة ضبط البيانات.',
    changeStorageError: 'تعذّر تغيير وضع التخزين.',
    sessionModeChanged: 'تم تغيير تخزين المفاتيح إلى وضع الجلسة فقط.',
    persistentModeChanged: 'تم تغيير تخزين المفاتيح إلى التذكّر على هذا الجهاز.',
    todayHeader: 'اليوم',
    clearToday: 'مسح اليوم',
    historyCount: count => (count ? `${count} عنصرًا اليوم` : ''),
    historyEmpty: 'لا توجد أي عناصر اليوم بعد.<br>انقر على كانجي في صفحة يابانية للبدء.',
    historyRemoveTitle: 'إزالة من اليوم',
    tooltipSource: 'النص',
    tooltipPage: 'الصفحة',
    focusIntro: 'العناصر التي تم الرجوع إليها <strong>مرتين أو أكثر خلال آخر 7 أيام</strong> تُرتب هنا حسب <strong>التكرار</strong>.',
    focusHeader: 'قائمة التركيز',
    clearFocus: 'حذف الكل',
    focusCount: count => (count ? `${count} عناصر · آخر 7 أيام` : ''),
    focusEmpty: 'لا توجد عناصر تركيز بعد.<br>انقر على العنصر نفسه مرتين أو أكثر<br>وسيظهر هنا تلقائيًا.',
    focusRemoveTitle: 'إزالة من التركيز',
    countTimes: count => `${count}×`,
    emptyTodayBadge: date => new Intl.DateTimeFormat('ar', { day: 'numeric', month: 'short' }).format(date),
    unknownError: 'خطأ غير معروف',
    unsupportedProvider: 'مزود غير مدعوم.',
    enterApiKey: 'أدخل مفتاح API.'
  },
  'zh-hans': {
    headerSub: 'Kanji Yomigana · Claude · Gemini · GPT',
    toggleTitle: '开启 / 关闭',
    tabSettings: '设置',
    tabHistory: '今日汉字',
    tabFocus: '重点复习',
    navGuide: '用法',
    navApi: 'API',
    navPrivacy: '隐私',
    navSites: '网站',
    navLanguage: '语言',
    navReset: '重置',
    navGuideTitle: '使用方法',
    navApiTitle: 'API',
    navPrivacyTitle: '隐私',
    navSitesTitle: '网站访问控制',
    navLanguageTitle: '语言设置',
    navResetTitle: '重置',
    guideTitle: '使用方法',
    guideDesc: '首次使用时，只需按下面步骤设置一次。',
    guideItem1: '选择要使用的 AI，并保存 API 密钥。',
    guideItem2: '在日语页面点击 <strong style="color:var(--text-main)">汉字</strong>，即可显示基于上下文的注音弹窗。',
    guideItem3: '最近 <strong style="color:var(--text-main)">7 天内查询 2 次以上</strong> 的项目会自动收集到 🔥 重点复习。',
    guideItem4: '对于链接或按钮里的文字，可使用 <strong style="color:var(--text-main)">Alt+点击</strong>（Mac 为 Option+点击）强制查询。',
    apiTitle: 'API 提供商',
    apiDesc: '选择要使用的模型并保存 API 密钥。弹窗不会再次显示完整密钥，只会显示遮罩后的后缀。',
    keyStorageSession: '仅会话',
    keyStoragePersistent: '记住到此设备',
    keyStorageNoteSession: '密钥只在当前浏览器会话中保存，关闭浏览器后会被清除。',
    keyStorageNotePersistent: '密钥会保存在此设备上，重启浏览器后仍会保留。',
    savedChip: '已保存',
    storedKeyPlaceholder: masked => `已保存的密钥 ${masked}`,
    chipPersistent: masked => `已记住 ${masked}`,
    chipSession: masked => `会话 ${masked}`,
    statusPersistent: masked => `已保存在此设备 · ${masked}`,
    statusSession: masked => `已保存在本次会话 · ${masked}`,
    enterKey: '请输入密钥。',
    invalidKey: '密钥格式似乎不正确。',
    savedPersistent: masked => `已保存 · ${masked}`,
    savedSession: masked => `已保存到会话 · ${masked}`,
    deletedKey: '密钥已删除。',
    saveError: '无法保存密钥。',
    deleteError: '无法删除密钥。',
    clearKeyTitle: '删除密钥',
    saveBtn: '保存',
    privacyTitle: '隐私与数据处理',
    privacyDesc: '被点击的日语表达及其附近的简短上下文可能会发送给你选择的提供商。默认只进行最小化本地存储，不保存 URL、标题或上下文元数据。',
    saveMetadata: '在学习记录中同时保存 URL / 页面标题 / 上下文',
    historyRetention: '学习记录保留期',
    cacheRetention: '响应缓存保留期',
    privacyLink: '打开详细隐私 / 数据处理说明',
    sitesTitle: '网站访问控制',
    sitesDesc: '敏感网站已包含在默认屏蔽列表中。允许列表始终优先。',
    accessScope: '运行范围',
    accessModeAll: '在所有网站运行，但排除屏蔽列表',
    accessModeAllow: '仅在允许列表中的网站运行',
    allowlist: '允许列表',
    blocklist: '附加屏蔽列表',
    sitePlaceholder: 'example.com\n*.example.org',
    siteNote: '可用逗号或换行输入多个域名。例如：example.com, *.example.org',
    languageTitle: '语言设置',
    languageDesc: '同时更改弹窗界面语言，以及点击弹窗中释义一行的语言。',
    languageLabel: '显示语言',
    languageNote: '选择语言后，设置界面和释义会一并更新。',
    resetTitle: '重置数据',
    resetDesc: '删除已保存的 API 密钥、查询历史、重点复习、缓存和网站设置，并恢复默认值。',
    resetButton: '删除所有数据',
    resetPrivacyLink: '打开英文隐私说明',
    resetConfirm: '要删除所有已保存的 API 密钥、历史、重点复习、缓存和网站设置吗？',
    resetting: '正在重置…',
    resetDone: '已删除所有扩展数据。',
    resetError: '无法重置数据。',
    changeStorageError: '无法更改保存方式。',
    sessionModeChanged: '密钥保存方式已切换为仅会话。',
    persistentModeChanged: '密钥保存方式已切换为记住到此设备。',
    todayHeader: '今日汉字',
    clearToday: '清空今日',
    historyCount: count => (count ? `今日 ${count} 项` : ''),
    historyEmpty: '今天还没有查询任何汉字。<br>点击日语页面中的汉字即可开始！',
    historyRemoveTitle: '从今日记录中移除',
    tooltipSource: '原文',
    tooltipPage: '页面',
    focusIntro: '最近 <strong>7 天内查询 2 次以上</strong> 的项目会按<strong>频率</strong>排序显示在这里。',
    focusHeader: '重点复习列表',
    clearFocus: '全部删除',
    focusCount: count => (count ? `${count} 项 · 最近 7 天` : ''),
    focusEmpty: '还没有重点复习项目。<br>同一项目点击至少两次后，<br>它会自动出现在这里！',
    focusRemoveTitle: '从重点复习中移除',
    countTimes: count => `${count} 次`,
    emptyTodayBadge: date => new Intl.DateTimeFormat('zh-CN', { month: 'short', day: 'numeric' }).format(date),
    unknownError: '未知错误',
    unsupportedProvider: '不支持的提供商。',
    enterApiKey: '请输入 API 密钥。'
  },
  'zh-hant': {
    headerSub: 'Kanji Yomigana · Claude · Gemini · GPT',
    toggleTitle: '開啟 / 關閉',
    tabSettings: '設定',
    tabHistory: '今日漢字',
    tabFocus: '重點複習',
    navGuide: '用法',
    navApi: 'API',
    navPrivacy: '隱私',
    navSites: '網站',
    navLanguage: '語言',
    navReset: '重設',
    navGuideTitle: '使用方法',
    navApiTitle: 'API',
    navPrivacyTitle: '隱私',
    navSitesTitle: '網站存取控制',
    navLanguageTitle: '語言設定',
    navResetTitle: '重設',
    guideTitle: '使用方法',
    guideDesc: '首次使用時，只需按照下列步驟設定一次。',
    guideItem1: '選擇要使用的 AI，並儲存 API 金鑰。',
    guideItem2: '在日文頁面點擊 <strong style="color:var(--text-main)">漢字</strong>，即可顯示基於語境的讀音彈窗。',
    guideItem3: '最近 <strong style="color:var(--text-main)">7 天內查詢 2 次以上</strong> 的項目會自動收集到 🔥 重點複習。',
    guideItem4: '對於連結或按鈕內的文字，可使用 <strong style="color:var(--text-main)">Alt+點擊</strong>（Mac 為 Option+點擊）強制查詢。',
    apiTitle: 'API 供應商',
    apiDesc: '選擇要使用的模型並儲存 API 金鑰。彈窗不會再次顯示完整金鑰，只會顯示遮罩後的後綴。',
    keyStorageSession: '僅此工作階段',
    keyStoragePersistent: '記住於此裝置',
    keyStorageNoteSession: '金鑰只會在目前瀏覽器工作階段中保存，關閉瀏覽器後會被清除。',
    keyStorageNotePersistent: '金鑰會保存在此裝置上，重新開啟瀏覽器後仍會保留。',
    savedChip: '已儲存',
    storedKeyPlaceholder: masked => `已儲存的金鑰 ${masked}`,
    chipPersistent: masked => `已記住 ${masked}`,
    chipSession: masked => `工作階段 ${masked}`,
    statusPersistent: masked => `已儲存在此裝置 · ${masked}`,
    statusSession: masked => `已儲存在本次工作階段 · ${masked}`,
    enterKey: '請輸入金鑰。',
    invalidKey: '金鑰格式似乎不正確。',
    savedPersistent: masked => `已儲存 · ${masked}`,
    savedSession: masked => `已儲存到工作階段 · ${masked}`,
    deletedKey: '金鑰已刪除。',
    saveError: '無法儲存金鑰。',
    deleteError: '無法刪除金鑰。',
    clearKeyTitle: '刪除金鑰',
    saveBtn: '儲存',
    privacyTitle: '隱私與資料處理',
    privacyDesc: '被點擊的日文表達及其附近的簡短語境可能會傳送給你選擇的供應商。預設只進行最小化本機儲存，不保存 URL、標題或語境中繼資料。',
    saveMetadata: '在學習記錄中同時保存 URL / 頁面標題 / 語境',
    historyRetention: '學習記錄保留期',
    cacheRetention: '回應快取保留期',
    privacyLink: '開啟詳細隱私 / 資料處理說明',
    sitesTitle: '網站存取控制',
    sitesDesc: '敏感網站已包含在預設封鎖清單中。允許清單永遠優先。',
    accessScope: '執行範圍',
    accessModeAll: '在所有網站執行，但排除封鎖清單',
    accessModeAllow: '只在允許清單中的網站執行',
    allowlist: '允許清單',
    blocklist: '附加封鎖清單',
    sitePlaceholder: 'example.com\n*.example.org',
    siteNote: '可使用逗號或換行輸入多個網域。例如：example.com, *.example.org',
    languageTitle: '語言設定',
    languageDesc: '同時變更彈窗介面語言，以及點擊彈窗中釋義一行的語言。',
    languageLabel: '顯示語言',
    languageNote: '選擇語言後，設定介面和釋義會一起更新。',
    resetTitle: '重設資料',
    resetDesc: '刪除已儲存的 API 金鑰、查詢歷史、重點複習、快取和網站設定，並恢復預設值。',
    resetButton: '刪除所有資料',
    resetPrivacyLink: '開啟英文隱私說明',
    resetConfirm: '要刪除所有已儲存的 API 金鑰、歷史、重點複習、快取和網站設定嗎？',
    resetting: '正在重設…',
    resetDone: '已刪除所有擴充功能資料。',
    resetError: '無法重設資料。',
    changeStorageError: '無法變更儲存方式。',
    sessionModeChanged: '金鑰儲存方式已切換為僅此工作階段。',
    persistentModeChanged: '金鑰儲存方式已切換為記住於此裝置。',
    todayHeader: '今日漢字',
    clearToday: '清空今日',
    historyCount: count => (count ? `今日 ${count} 項` : ''),
    historyEmpty: '今天還沒有查詢任何漢字。<br>點擊日文頁面中的漢字即可開始！',
    historyRemoveTitle: '從今日記錄中移除',
    tooltipSource: '原文',
    tooltipPage: '頁面',
    focusIntro: '最近 <strong>7 天內查詢 2 次以上</strong> 的項目會按<strong>頻率</strong>排序顯示在這裡。',
    focusHeader: '重點複習列表',
    clearFocus: '全部刪除',
    focusCount: count => (count ? `${count} 項 · 最近 7 天` : ''),
    focusEmpty: '還沒有重點複習項目。<br>同一項目點擊至少兩次後，<br>它會自動出現在這裡！',
    focusRemoveTitle: '從重點複習中移除',
    countTimes: count => `${count} 次`,
    emptyTodayBadge: date => new Intl.DateTimeFormat('zh-TW', { month: 'short', day: 'numeric' }).format(date),
    unknownError: '未知錯誤',
    unsupportedProvider: '不支援的供應商。',
    enterApiKey: '請輸入 API 金鑰。'
  }
});

const PUBLIC_SETTING_KEYS = Object.keys(PUBLIC_SETTINGS_DEFAULTS);

const cards = Object.fromEntries(
  Object.entries(PROVIDER_META).map(([id, meta]) => [id, document.getElementById(meta.cardId)])
);
const inputs = Object.fromEntries(
  Object.entries(PROVIDER_META).map(([id, meta]) => [id, document.getElementById(meta.inputId)])
);
const statusEls = Object.fromEntries(
  Object.entries(PROVIDER_META).map(([id, meta]) => [id, document.getElementById(meta.statusId)])
);
const chipEls = Object.fromEntries(
  Object.entries(PROVIDER_META).map(([id, meta]) => [id, document.getElementById(meta.chipId)])
);

const toggleBtn = document.getElementById('toggle-btn');
const toggleLabel = document.getElementById('toggle-label');
const focusBadge = document.getElementById('focus-badge');
const keyStorageSessionBtn = document.getElementById('key-storage-session-btn');
const keyStoragePersistentBtn = document.getElementById('key-storage-persistent-btn');
const keyStorageNote = document.getElementById('key-storage-note');
const saveMetadataToggle = document.getElementById('save-metadata-toggle');
const historyRetentionSelect = document.getElementById('history-retention-select');
const cacheRetentionSelect = document.getElementById('cache-retention-select');
const siteAccessModeSelect = document.getElementById('site-access-mode-select');
const siteAllowlistInput = document.getElementById('site-allowlist-input');
const siteBlocklistInput = document.getElementById('site-blocklist-input');
const uiLanguageSelect = document.getElementById('ui-language-select');
const resetAllDataBtn = document.getElementById('reset-all-data-btn');
const resetStatusEl = document.getElementById('reset-status');
const historyListEl = document.getElementById('history-list');
const focusListEl = document.getElementById('focus-list');
const historyCountEl = document.getElementById('history-count');
const focusCountEl = document.getElementById('focus-count');
const todayBadgeEl = document.getElementById('today-badge');
const resetPrivacyLink = document.getElementById('reset-privacy-link');

let currentPublicSettings = { ...PUBLIC_SETTINGS_DEFAULTS };
let latestKeyStatuses = {};
const providerStatusTimers = Object.create(null);
let siteAllowlistTimer = null;
let siteBlocklistTimer = null;
let popupRefreshTimer = null;
let currentSettingsSection = 'api';

function normalizeUiLanguage(value) {
  const raw = String(value || '').trim().toLowerCase().replace(/_/g, '-');
  if (!raw) return PUBLIC_SETTINGS_DEFAULTS.uiLanguage;
  if (LANGUAGE_META[raw]) return raw;
  if (raw === 'zh' || raw.startsWith('zh-cn') || raw.startsWith('zh-sg') || raw.startsWith('zh-hans')) return 'zh-hans';
  if (raw.startsWith('zh-tw') || raw.startsWith('zh-hk') || raw.startsWith('zh-mo') || raw.startsWith('zh-hant')) return 'zh-hant';
  const short = raw.split('-')[0];
  return LANGUAGE_META[short] ? short : PUBLIC_SETTINGS_DEFAULTS.uiLanguage;
}

function getStrings() {
  return UI_STRINGS[normalizeUiLanguage(currentPublicSettings.uiLanguage)] || UI_STRINGS.en;
}

function uiLocale() {
  return LANGUAGE_META[normalizeUiLanguage(currentPublicSettings.uiLanguage)]?.locale || 'en-US';
}

function localizeRuntimeError(message) {
  const s = getStrings();
  const raw = String(message || '').trim();
  if (!raw) return s.unknownError;

  const exact = new Map([
    ['Unsupported provider.', s.unsupportedProvider],
    ['Please enter an API key.', s.enterApiKey],
    ['No text was selected.', s.unknownError],
    ['The AI response could not be parsed.', s.unknownError]
  ]);
  return exact.get(raw) || raw;
}

function storageGet(area, keys) {
  return new Promise(resolve => {
    chrome.storage[area].get(keys, result => resolve(result || {}));
  });
}

function storageSet(area, value) {
  return new Promise((resolve, reject) => {
    chrome.storage[area].set(value, () => {
      if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
      else resolve();
    });
  });
}

function sendRuntimeMessage(message) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, response => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      if (response?.error) {
        reject(new Error(response.error));
        return;
      }
      resolve(response || {});
    });
  });
}

function getDateKey(date = new Date()) {
  return date.toDateString();
}

function escHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function emptyState(icon, html) {
  return `<div class="empty-state"><span class="empty-kanji">${icon}</span><p>${html}</p></div>`;
}

function setListEmpty(listEl, isEmpty) {
  if (!listEl) return;
  listEl.classList.toggle('list-empty', Boolean(isEmpty));
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

function makeItemKey(item) {
  if (!item) return '';
  if (item.itemKey) return item.itemKey;
  return `${String(item.original || '').trim()}::${normalizeYomigana(item.yomigana || '')}`;
}

function setSelectOptions(selectEl, options, value) {
  if (!selectEl) return;
  const previous = String(value ?? selectEl.value ?? '');
  selectEl.innerHTML = options.map(option => `<option value="${escHtml(option.value)}">${escHtml(option.label)}</option>`).join('');
  selectEl.value = previous && options.some(option => String(option.value) === previous)
    ? previous
    : String(options[0]?.value ?? '');
}

function formatDayLabel(days) {
  const s = getStrings();
  const code = normalizeUiLanguage(currentPublicSettings.uiLanguage);
  if (code === 'ko') return `${days}일`;
  if (code === 'de') return `${days} Tage`;
  if (code === 'fr') return `${days} jours`;
  if (code === 'it') return `${days} giorni`;
  if (code === 'es') return `${days} días`;
  if (code === 'ar') return `${days} يومًا`;
  if (code === 'zh-hans' || code === 'zh-hant') return `${days} 天`;
  return `${days} days`;
}

function buildGuideItemsHtml() {
  const s = getStrings();
  return `
    <div class="inst-item">
      <span class="inst-num">1</span>
      <span>${s.guideItem1}<br>
        Gemini: <a class="inline-link" href="${PROVIDER_LINKS.gemini}" target="_blank" rel="noopener noreferrer">aistudio.google.com/apikey</a><br>
        Claude: <a class="inline-link" href="${PROVIDER_LINKS.claude}" target="_blank" rel="noopener noreferrer">console.anthropic.com</a><br>
        OpenAI: <a class="inline-link" href="${PROVIDER_LINKS.openai}" target="_blank" rel="noopener noreferrer">platform.openai.com/api-keys</a>
      </span>
    </div>
    <div class="inst-item">
      <span class="inst-num">2</span>
      <span>${s.guideItem2}</span>
    </div>
    <div class="inst-item">
      <span class="inst-num">3</span>
      <span>${s.guideItem3}</span>
    </div>
    <div class="inst-item">
      <span class="inst-num">4</span>
      <span>${s.guideItem4}</span>
    </div>`;
}

function applyApiMode(mode) {
  for (const [id, card] of Object.entries(cards)) {
    card.classList.remove('selected-claude', 'selected-gemini', 'selected-openai');
    if (id === mode) card.classList.add(`selected-${id}`);
  }
}

function applyToggle(enabled) {
  toggleBtn.classList.toggle('on', enabled);
  toggleLabel.textContent = enabled ? 'ON' : 'OFF';
}

function applyKeyStorageMode(mode) {
  const s = getStrings();
  const isPersistent = mode === 'persistent';
  keyStorageSessionBtn.classList.toggle('active', !isPersistent);
  keyStoragePersistentBtn.classList.toggle('active', isPersistent);
  keyStorageNote.textContent = isPersistent ? s.keyStorageNotePersistent : s.keyStorageNoteSession;
}

function setProviderStatusMessage(providerId, message = '', type = '') {
  const el = statusEls[providerId];
  if (!el) return;

  if (providerStatusTimers[providerId]) {
    clearTimeout(providerStatusTimers[providerId]);
    delete providerStatusTimers[providerId];
  }

  if (!message) {
    el.textContent = '';
    el.className = 'status-msg';
    return;
  }

  el.textContent = localizeRuntimeError(message);
  el.className = `status-msg ${type}`.trim();

  if (type === 'info') {
    providerStatusTimers[providerId] = setTimeout(() => {
      el.textContent = '';
      el.className = 'status-msg';
      delete providerStatusTimers[providerId];
    }, 2600);
  }
}

function renderKeyStatus(providerId, status) {
  const meta = PROVIDER_META[providerId];
  const card = cards[providerId];
  const input = inputs[providerId];
  const chip = chipEls[providerId];
  const s = getStrings();
  const safeStatus = status || { saved: false, scope: 'none', masked: '' };

  latestKeyStatuses[providerId] = safeStatus;
  card.classList.toggle('saved', Boolean(safeStatus.saved));
  input.value = '';
  input.placeholder = safeStatus.saved && safeStatus.masked
    ? s.storedKeyPlaceholder(safeStatus.masked)
    : meta.placeholder;

  if (safeStatus.saved) {
    chip.textContent = safeStatus.scope === 'persistent'
      ? s.chipPersistent(safeStatus.masked)
      : s.chipSession(safeStatus.masked);
    setProviderStatusMessage(providerId, '', '');
  } else {
    chip.textContent = s.savedChip;
    setProviderStatusMessage(providerId, '', '');
  }
}

function applyStaticI18n() {
  const s = getStrings();
  const currentLang = normalizeUiLanguage(currentPublicSettings.uiLanguage);
  document.documentElement.lang = currentLang;
  document.documentElement.dir = LANGUAGE_META[currentLang]?.dir || 'ltr';

  document.querySelector('.header-sub').textContent = s.headerSub;
  toggleBtn.title = s.toggleTitle;

  const settingsTab = document.querySelector('.tab[data-tab="settings"]');
  const historyTab = document.querySelector('.tab[data-tab="history"]');
  const focusTab = document.querySelector('.tab[data-tab="focus"]');
  settingsTab.textContent = `⚙ ${s.tabSettings}`;
  historyTab.textContent = `📚 ${s.tabHistory}`;
  focusTab.innerHTML = `🔥 ${escHtml(s.tabFocus)}`;
  focusTab.appendChild(focusBadge);

  const navMap = {
    guide: [s.navGuide, s.navGuideTitle],
    api: [s.navApi, s.navApiTitle],
    privacy: [s.navPrivacy, s.navPrivacyTitle],
    sites: [s.navSites, s.navSitesTitle],
    language: [s.navLanguage, s.navLanguageTitle],
    reset: [s.navReset, s.navResetTitle]
  };
  document.querySelectorAll('.settings-nav-btn').forEach(button => {
    const key = button.dataset.settingsSection;
    const [label, title] = navMap[key] || ['', ''];
    const labelEl = button.querySelector('.settings-nav-label');
    if (labelEl) labelEl.textContent = label;
    button.title = title;
  });

  const guideSection = document.querySelector('.settings-section[data-settings-section="guide"]');
  guideSection.querySelector('.section-title').textContent = s.guideTitle;
  guideSection.querySelector('.section-desc').textContent = s.guideDesc;
  guideSection.querySelector('.instructions-body').innerHTML = buildGuideItemsHtml();

  const apiSection = document.querySelector('.settings-section[data-settings-section="api"]');
  apiSection.querySelector('.section-title').textContent = s.apiTitle;
  apiSection.querySelector('.section-desc').textContent = s.apiDesc;
  keyStorageSessionBtn.textContent = s.keyStorageSession;
  keyStoragePersistentBtn.textContent = s.keyStoragePersistent;
  document.querySelectorAll('.btn-save').forEach(btn => { btn.textContent = s.saveBtn; });
  document.querySelectorAll('.btn-clear').forEach(btn => { btn.title = s.clearKeyTitle; });

  const privacySection = document.querySelector('.settings-section[data-settings-section="privacy"]');
  privacySection.querySelector('.section-title').textContent = s.privacyTitle;
  privacySection.querySelector('.section-desc').textContent = s.privacyDesc;
  const saveMetadataText = privacySection.querySelector('.switch-row span');
  if (saveMetadataText) saveMetadataText.textContent = s.saveMetadata;
  privacySection.querySelector('label[for="history-retention-select"]').textContent = s.historyRetention;
  privacySection.querySelector('label[for="cache-retention-select"]').textContent = s.cacheRetention;
  const privacyLink = privacySection.querySelector('a.inline-link');
  if (privacyLink) privacyLink.textContent = s.privacyLink;

  const sitesSection = document.querySelector('.settings-section[data-settings-section="sites"]');
  sitesSection.querySelector('.section-title').textContent = s.sitesTitle;
  sitesSection.querySelector('.section-desc').textContent = s.sitesDesc;
  sitesSection.querySelector('label[for="site-access-mode-select"]').textContent = s.accessScope;
  sitesSection.querySelector('label[for="site-allowlist-input"]').textContent = s.allowlist;
  sitesSection.querySelector('label[for="site-blocklist-input"]').textContent = s.blocklist;
  siteAllowlistInput.placeholder = s.sitePlaceholder;
  siteBlocklistInput.placeholder = s.sitePlaceholder;
  sitesSection.querySelector('.section-note').textContent = s.siteNote;

  const languageSection = document.querySelector('.settings-section[data-settings-section="language"]');
  languageSection.querySelector('.section-title').textContent = s.languageTitle;
  languageSection.querySelector('.section-desc').textContent = s.languageDesc;
  languageSection.querySelector('label[for="ui-language-select"]').textContent = s.languageLabel;
  const languageNote = document.getElementById('language-note');
  if (languageNote) languageNote.textContent = s.languageNote;

  const resetSection = document.querySelector('.settings-section[data-settings-section="reset"]');
  resetSection.querySelector('.section-title').textContent = s.resetTitle;
  resetSection.querySelector('.section-desc').textContent = s.resetDesc;
  resetAllDataBtn.textContent = s.resetButton;
  if (resetPrivacyLink) resetPrivacyLink.textContent = s.resetPrivacyLink;

  document.querySelector('#panel-history .section-label').textContent = s.todayHeader;
  document.getElementById('clear-today-btn').textContent = s.clearToday;
  document.querySelector('#panel-focus .focus-intro').innerHTML = s.focusIntro;
  document.querySelector('#panel-focus .section-label').textContent = s.focusHeader;
  document.getElementById('clear-focus-btn').textContent = s.clearFocus;

  setSelectOptions(historyRetentionSelect, [7, 14, 30, 60, 90].map(value => ({ value, label: formatDayLabel(value) })), currentPublicSettings.historyRetentionDays || 30);
  setSelectOptions(cacheRetentionSelect, [1, 3, 7, 14, 30].map(value => ({ value, label: formatDayLabel(value) })), currentPublicSettings.cacheRetentionDays || 7);
  setSelectOptions(siteAccessModeSelect, [
    { value: 'all_except_blocked', label: s.accessModeAll },
    { value: 'allow_only', label: s.accessModeAllow }
  ], currentPublicSettings.siteAccessMode || 'all_except_blocked');
  setSelectOptions(uiLanguageSelect, LANGUAGE_DISPLAY_ORDER.map(code => LANGUAGE_META[code]).filter(Boolean).map(meta => ({ value: meta.code, label: meta.label })), currentLang);
}

function applyPublicSettings(settings) {
  currentPublicSettings = {
    ...PUBLIC_SETTINGS_DEFAULTS,
    ...(settings || {})
  };

  applyApiMode(currentPublicSettings.apiMode || 'claude');
  applyToggle(currentPublicSettings.kanjEnabled !== false);
  applyStaticI18n();
  applyKeyStorageMode(currentPublicSettings.keyStorageMode || 'session');
  saveMetadataToggle.checked = currentPublicSettings.saveExtendedMetadata === true;
  historyRetentionSelect.value = String(currentPublicSettings.historyRetentionDays || 30);
  cacheRetentionSelect.value = String(currentPublicSettings.cacheRetentionDays || 7);
  siteAccessModeSelect.value = currentPublicSettings.siteAccessMode || 'all_except_blocked';
  siteAllowlistInput.value = currentPublicSettings.siteAllowlistText || '';
  siteBlocklistInput.value = currentPublicSettings.siteBlocklistText || '';
  uiLanguageSelect.value = normalizeUiLanguage(currentPublicSettings.uiLanguage);
}

async function refreshPopupState() {
  const state = await sendRuntimeMessage({ action: 'getPopupState' });
  applyPublicSettings(state.publicSettings || PUBLIC_SETTINGS_DEFAULTS);
  for (const providerId of Object.keys(PROVIDER_META)) {
    renderKeyStatus(providerId, state.keyStatuses?.[providerId]);
  }
}

function schedulePopupStateRefresh() {
  clearTimeout(popupRefreshTimer);
  popupRefreshTimer = setTimeout(() => {
    refreshPopupState().catch(() => void 0);
  }, 60);
}

function showResetStatus(message = '', type = '') {
  resetStatusEl.textContent = localizeRuntimeError(message);
  resetStatusEl.className = `inline-feedback ${type}`.trim();
}

function setTab(tabName) {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === tabName);
  });
  document.querySelectorAll('.panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `panel-${tabName}`);
  });

  if (tabName === 'history') loadHistory();
  if (tabName === 'focus') loadFocus();
}

function buildItemTooltip(item, { includeUrl = false } = {}) {
  const s = getStrings();
  const parts = [];
  const fullText = item?.context || item?.original || '';
  if (fullText) parts.push(`${s.tooltipSource}: ${fullText}`);
  if (item?.title) parts.push(`${s.tooltipPage}: ${item.title}`);
  if (includeUrl && item?.url) parts.push(item.url);
  return parts.join('\n') || item?.original || '';
}

function getHistoryTooltip(item) {
  return buildItemTooltip(item, { includeUrl: true });
}

function getFocusTooltip(item) {
  return buildItemTooltip(item, { includeUrl: false });
}

function computeFocus(kanjiHistory, kanjiClicks) {
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const freq = {};
  const clicks = Array.isArray(kanjiClicks) ? kanjiClicks.filter(item => (item.t || 0) > cutoff) : [];

  if (clicks.length) {
    clicks.forEach(item => {
      const itemKey = makeItemKey(item);
      if (!itemKey) return;
      if (!freq[itemKey]) {
        freq[itemKey] = {
          itemKey,
          original: item.original || '',
          yomigana: item.yomigana || '',
          meaning: item.meaning || '',
          context: item.context || item.original || '',
          title: item.title || '',
          url: item.url || '',
          count: 0,
          lastSeen: 0
        };
      }
      freq[itemKey].count += 1;
      if ((item.t || 0) >= freq[itemKey].lastSeen) {
        freq[itemKey].lastSeen = item.t || 0;
        freq[itemKey].original = item.original || freq[itemKey].original;
        freq[itemKey].yomigana = item.yomigana || freq[itemKey].yomigana;
        freq[itemKey].meaning = item.meaning || freq[itemKey].meaning;
        freq[itemKey].context = item.context || freq[itemKey].context;
        freq[itemKey].title = item.title || freq[itemKey].title;
        freq[itemKey].url = item.url || freq[itemKey].url;
      }
    });
  } else {
    Object.values(kanjiHistory || {}).forEach(items => {
      (items || []).forEach(item => {
        const timestamp = item.timestamp || 0;
        if (timestamp < cutoff) return;
        const itemKey = makeItemKey(item);
        if (!itemKey) return;
        if (!freq[itemKey]) {
          freq[itemKey] = {
            itemKey,
            original: item.original || '',
            yomigana: item.yomigana || '',
            meaning: item.meaning || '',
            context: item.context || item.original || '',
            title: item.title || '',
            url: item.url || '',
            count: 0,
            lastSeen: 0
          };
        }
        freq[itemKey].count += 1;
        if (timestamp >= freq[itemKey].lastSeen) {
          freq[itemKey].lastSeen = timestamp;
          freq[itemKey].original = item.original || freq[itemKey].original;
          freq[itemKey].yomigana = item.yomigana || freq[itemKey].yomigana;
          freq[itemKey].meaning = item.meaning || freq[itemKey].meaning;
          freq[itemKey].context = item.context || freq[itemKey].context;
          freq[itemKey].title = item.title || freq[itemKey].title;
          freq[itemKey].url = item.url || freq[itemKey].url;
        }
      });
    });
  }

  return Object.values(freq)
    .filter(item => item.count >= 2)
    .sort((a, b) => b.count - a.count || b.lastSeen - a.lastSeen);
}

async function updateFocusBadge() {
  const { kanjiHistory, kanjiClicks, focusDismissed } = await storageGet('local', ['kanjiHistory', 'kanjiClicks', 'focusDismissed']);
  const dismissed = focusDismissed || {};
  const count = computeFocus(kanjiHistory, kanjiClicks).filter(item => !dismissed[item.itemKey]).length;
  focusBadge.textContent = count;
  focusBadge.style.display = count > 0 ? 'inline-block' : 'none';
}

function formatTodayBadge(date = new Date()) {
  const s = getStrings();
  if (typeof s.emptyTodayBadge === 'function') return s.emptyTodayBadge(date);
  return new Intl.DateTimeFormat(uiLocale(), { month: 'short', day: 'numeric' }).format(date);
}

async function loadHistory() {
  const s = getStrings();
  const today = getDateKey();
  const now = new Date();
  todayBadgeEl.textContent = formatTodayBadge(now);

  const { kanjiHistory } = await storageGet('local', ['kanjiHistory']);
  const items = Array.isArray((kanjiHistory || {})[today]) ? (kanjiHistory || {})[today] : [];
  historyCountEl.textContent = s.historyCount(items.length);

  if (!items.length) {
    setListEmpty(historyListEl, true);
    historyListEl.innerHTML = emptyState('漢', s.historyEmpty);
    return;
  }

  setListEmpty(historyListEl, false);
  historyListEl.innerHTML = items.map(item => {
    const itemKey = makeItemKey(item);
    return `
      <div class="kanji-card" title="${escHtml(getHistoryTooltip(item))}">
        <div class="kc-yomigana">${escHtml(item.yomigana || '')}</div>
        <div class="kc-original">${escHtml(item.original || '')}</div>
        ${item.meaning ? `<div class="kc-meaning">${escHtml(item.meaning)}</div>` : ''}
        <button class="kc-del" data-key="${escHtml(itemKey)}" title="${escHtml(s.historyRemoveTitle)}" type="button">✕</button>
      </div>`;
  }).join('');

  historyListEl.querySelectorAll('.kc-del').forEach(button => {
    button.addEventListener('click', event => {
      event.stopPropagation();
      deleteHistoryItem(today, button.dataset.key).catch(() => void 0);
    });
  });
}

async function deleteHistoryItem(dateKey, itemKey) {
  const { kanjiHistory, kanjiClicks } = await storageGet('local', ['kanjiHistory', 'kanjiClicks']);
  const history = { ...(kanjiHistory || {}) };
  if (!Array.isArray(history[dateKey])) return;

  history[dateKey] = history[dateKey].filter(item => makeItemKey(item) !== itemKey);
  if (!history[dateKey].length) delete history[dateKey];

  const nextClicks = Array.isArray(kanjiClicks)
    ? kanjiClicks.filter(item => !(makeItemKey(item) === itemKey && getDateKey(new Date(item.t || 0)) === dateKey))
    : [];

  await storageSet('local', { kanjiHistory: history, kanjiClicks: nextClicks });
  await loadHistory();
  await updateFocusBadge();
}

async function clearTodayHistory() {
  const today = getDateKey();
  const { kanjiHistory, kanjiClicks } = await storageGet('local', ['kanjiHistory', 'kanjiClicks']);
  const history = { ...(kanjiHistory || {}) };
  delete history[today];
  const nextClicks = Array.isArray(kanjiClicks)
    ? kanjiClicks.filter(item => getDateKey(new Date(item.t || 0)) !== today)
    : [];
  await storageSet('local', { kanjiHistory: history, kanjiClicks: nextClicks });
  await loadHistory();
  await updateFocusBadge();
}

async function loadFocus() {
  const s = getStrings();
  const { kanjiHistory, kanjiClicks, focusDismissed } = await storageGet('local', ['kanjiHistory', 'kanjiClicks', 'focusDismissed']);
  const dismissed = focusDismissed || {};
  const items = computeFocus(kanjiHistory, kanjiClicks).filter(item => !dismissed[item.itemKey]);

  focusBadge.textContent = items.length;
  focusBadge.style.display = items.length > 0 ? 'inline-block' : 'none';
  focusCountEl.textContent = s.focusCount(items.length);

  if (!items.length) {
    setListEmpty(focusListEl, true);
    focusListEl.innerHTML = emptyState('覚', s.focusEmpty);
    return;
  }

  setListEmpty(focusListEl, false);
  focusListEl.innerHTML = items.map((item, index) => {
    const medal = index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${index + 1}`;
    return `
      <div class="kanji-item focus-item" title="${escHtml(getFocusTooltip(item))}">
        <div class="ki-kanji">${escHtml(item.original)}</div>
        <div class="ki-info">
          <div class="ki-yomigana">${escHtml(item.yomigana)}</div>
          ${item.meaning ? `<div class="ki-meaning">${escHtml(item.meaning)}</div>` : ''}
        </div>
        <div class="ki-meta">
          <span class="ki-rank">${escHtml(medal)}</span>
          <span class="ki-count">${escHtml(s.countTimes(item.count))}</span>
        </div>
        <button class="ki-del" data-key="${escHtml(item.itemKey)}" title="${escHtml(s.focusRemoveTitle)}" type="button">✕</button>
      </div>`;
  }).join('');

  focusListEl.querySelectorAll('.ki-del').forEach(button => {
    button.addEventListener('click', async event => {
      event.stopPropagation();
      const { focusDismissed } = await storageGet('local', ['focusDismissed']);
      const next = { ...(focusDismissed || {}), [button.dataset.key]: Date.now() };
      await storageSet('local', { focusDismissed: next });
      await loadFocus();
    });
  });
}

async function clearFocusItems() {
  const { kanjiHistory, kanjiClicks, focusDismissed } = await storageGet('local', ['kanjiHistory', 'kanjiClicks', 'focusDismissed']);
  const next = { ...(focusDismissed || {}) };
  computeFocus(kanjiHistory, kanjiClicks).forEach(item => {
    next[item.itemKey] = Date.now();
  });
  await storageSet('local', { focusDismissed: next });
  await loadFocus();
}

function setSettingsSection(sectionName) {
  currentSettingsSection = sectionName;

  document.querySelectorAll('.settings-nav-btn').forEach(button => {
    button.classList.toggle('active', button.dataset.settingsSection === sectionName);
  });

  document.querySelectorAll('.settings-section').forEach(section => {
    const isActive = section.dataset.settingsSection === sectionName;
    section.classList.toggle('active', isActive);
    if (isActive) section.scrollTop = 0;
  });
}

function bindSettingsSidebar() {
  document.querySelectorAll('.settings-nav-btn').forEach(button => {
    button.addEventListener('click', () => {
      setSettingsSection(button.dataset.settingsSection || 'api');
    });
  });
}

function bindProviderCardSelection() {
  Object.entries(cards).forEach(([mode, card]) => {
    card.addEventListener('click', event => {
      if (event.target.closest('.btn-save, .btn-clear, .key-input, a')) return;
      storageSet('sync', { apiMode: mode }).catch(() => void 0);
      applyApiMode(mode);
    });
  });
}

function bindProviderInputs() {
  Object.entries(PROVIDER_META).forEach(([providerId, meta]) => {
    const input = inputs[providerId];
    const saveBtn = document.getElementById(meta.saveBtnId);
    const clearBtn = document.getElementById(meta.clearBtnId);

    input.addEventListener('input', () => {
      if ((statusEls[providerId].className || '').includes('error')) {
        setProviderStatusMessage(providerId, '', '');
      }
    });

    saveBtn.addEventListener('click', async event => {
      event.stopPropagation();
      const value = input.value.trim();
      if (!value) {
        setProviderStatusMessage(providerId, getStrings().enterKey, 'error');
        return;
      }
      if (meta.validator && !meta.validator(value)) {
        setProviderStatusMessage(providerId, getStrings().invalidKey, 'error');
        return;
      }

      saveBtn.disabled = true;
      try {
        const state = await sendRuntimeMessage({ action: 'saveApiKey', provider: providerId, value });
        input.value = '';
        applyPublicSettings(state.publicSettings || currentPublicSettings);
        for (const pid of Object.keys(PROVIDER_META)) {
          renderKeyStatus(pid, state.keyStatuses?.[pid]);
        }
        setProviderStatusMessage(providerId, latestKeyStatuses[providerId]?.scope === 'persistent'
          ? getStrings().savedPersistent(latestKeyStatuses[providerId].masked)
          : getStrings().savedSession(latestKeyStatuses[providerId].masked), 'info');
      } catch (error) {
        setProviderStatusMessage(providerId, error?.message || getStrings().saveError, 'error');
      } finally {
        saveBtn.disabled = false;
      }
    });

    clearBtn.addEventListener('click', async event => {
      event.stopPropagation();
      clearBtn.disabled = true;
      try {
        const state = await sendRuntimeMessage({ action: 'clearApiKey', provider: providerId });
        input.value = '';
        applyPublicSettings(state.publicSettings || currentPublicSettings);
        for (const pid of Object.keys(PROVIDER_META)) {
          renderKeyStatus(pid, state.keyStatuses?.[pid]);
        }
        setProviderStatusMessage(providerId, getStrings().deletedKey, 'info');
      } catch (error) {
        setProviderStatusMessage(providerId, error?.message || getStrings().deleteError, 'error');
      } finally {
        clearBtn.disabled = false;
      }
    });
  });
}

function bindPublicSettings() {
  toggleBtn.addEventListener('click', async () => {
    const next = !(currentPublicSettings.kanjEnabled !== false);
    currentPublicSettings.kanjEnabled = next;
    applyToggle(next);
    await storageSet('sync', { kanjEnabled: next }).catch(() => {
      currentPublicSettings.kanjEnabled = !next;
      applyToggle(!next);
    });
  });

  keyStorageSessionBtn.addEventListener('click', async () => {
    const state = await sendRuntimeMessage({ action: 'setKeyStorageMode', mode: 'session' }).catch(error => {
      showResetStatus(error?.message || getStrings().changeStorageError, 'error');
      return null;
    });
    if (!state) return;
    showResetStatus(getStrings().sessionModeChanged, 'success');
    applyPublicSettings(state.publicSettings || currentPublicSettings);
    for (const providerId of Object.keys(PROVIDER_META)) {
      renderKeyStatus(providerId, state.keyStatuses?.[providerId]);
    }
  });

  keyStoragePersistentBtn.addEventListener('click', async () => {
    const state = await sendRuntimeMessage({ action: 'setKeyStorageMode', mode: 'persistent' }).catch(error => {
      showResetStatus(error?.message || getStrings().changeStorageError, 'error');
      return null;
    });
    if (!state) return;
    showResetStatus(getStrings().persistentModeChanged, 'success');
    applyPublicSettings(state.publicSettings || currentPublicSettings);
    for (const providerId of Object.keys(PROVIDER_META)) {
      renderKeyStatus(providerId, state.keyStatuses?.[providerId]);
    }
  });

  saveMetadataToggle.addEventListener('change', () => {
    storageSet('sync', { saveExtendedMetadata: saveMetadataToggle.checked }).catch(() => void 0);
  });
  historyRetentionSelect.addEventListener('change', () => {
    storageSet('sync', { historyRetentionDays: Number(historyRetentionSelect.value) }).catch(() => void 0);
  });
  cacheRetentionSelect.addEventListener('change', () => {
    storageSet('sync', { cacheRetentionDays: Number(cacheRetentionSelect.value) }).catch(() => void 0);
  });
  siteAccessModeSelect.addEventListener('change', () => {
    storageSet('sync', { siteAccessMode: siteAccessModeSelect.value }).catch(() => void 0);
  });
  uiLanguageSelect.addEventListener('change', async () => {
    const nextLang = normalizeUiLanguage(uiLanguageSelect.value);
    currentPublicSettings.uiLanguage = nextLang;
    applyStaticI18n();
    applyKeyStorageMode(currentPublicSettings.keyStorageMode || 'session');
    for (const providerId of Object.keys(PROVIDER_META)) {
      renderKeyStatus(providerId, latestKeyStatuses[providerId]);
    }
    await storageSet('sync', { uiLanguage: nextLang }).catch(() => void 0);
    await loadHistory().catch(() => void 0);
    await loadFocus().catch(() => void 0);
  });

  siteAllowlistInput.addEventListener('input', () => {
    clearTimeout(siteAllowlistTimer);
    siteAllowlistTimer = setTimeout(() => {
      storageSet('sync', { siteAllowlistText: siteAllowlistInput.value }).catch(() => void 0);
    }, 400);
  });
  siteBlocklistInput.addEventListener('input', () => {
    clearTimeout(siteBlocklistTimer);
    siteBlocklistTimer = setTimeout(() => {
      storageSet('sync', { siteBlocklistText: siteBlocklistInput.value }).catch(() => void 0);
    }, 400);
  });

  resetAllDataBtn.addEventListener('click', async () => {
    const agreed = window.confirm(getStrings().resetConfirm);
    if (!agreed) return;

    resetAllDataBtn.disabled = true;
    showResetStatus(getStrings().resetting);
    try {
      await sendRuntimeMessage({ action: 'wipeAllData' });
      setSettingsSection(currentSettingsSection);
      await refreshPopupState();
      await loadHistory();
      await loadFocus();
      await updateFocusBadge();
      setTab('settings');
      showResetStatus(getStrings().resetDone, 'success');
    } catch (error) {
      showResetStatus(error?.message || getStrings().resetError, 'error');
    } finally {
      resetAllDataBtn.disabled = false;
    }
  });
}

function bindTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => setTab(tab.dataset.tab));
  });
}

function bindHistoryFocusActions() {
  document.getElementById('clear-today-btn').addEventListener('click', () => {
    clearTodayHistory().catch(() => void 0);
  });

  document.getElementById('clear-focus-btn').addEventListener('click', () => {
    clearFocusItems().catch(() => void 0);
  });
}

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local') {
    if (changes.kanjiHistory || changes.kanjiClicks || changes.focusDismissed) {
      updateFocusBadge().catch(() => void 0);
      if (document.getElementById('panel-history').classList.contains('active')) loadHistory().catch(() => void 0);
      if (document.getElementById('panel-focus').classList.contains('active')) loadFocus().catch(() => void 0);
    }
    return;
  }

  if (areaName === 'sync') {
    const hasPublicSettingChange = PUBLIC_SETTING_KEYS.some(key => Boolean(changes[key]));
    if (hasPublicSettingChange) {
      const partial = {};
      for (const key of PUBLIC_SETTING_KEYS) {
        if (changes[key]) partial[key] = changes[key].newValue;
      }
      applyPublicSettings({ ...currentPublicSettings, ...partial });
      if (document.getElementById('panel-history').classList.contains('active')) loadHistory().catch(() => void 0);
      if (document.getElementById('panel-focus').classList.contains('active')) loadFocus().catch(() => void 0);
    }
    schedulePopupStateRefresh();
    return;
  }

  if (areaName === 'session') {
    schedulePopupStateRefresh();
  }
});

async function init() {
  bindTabs();
  bindSettingsSidebar();
  bindProviderCardSelection();
  bindProviderInputs();
  bindPublicSettings();
  bindHistoryFocusActions();

  setSettingsSection(currentSettingsSection);
  await refreshPopupState();
  await updateFocusBadge();
  showResetStatus('');
}

init().catch(error => {
  showResetStatus(error?.message || getStrings().unknownError, 'error');
});
