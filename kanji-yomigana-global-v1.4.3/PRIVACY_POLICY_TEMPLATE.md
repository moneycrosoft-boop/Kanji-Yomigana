# Privacy Policy for Kanji Yomigana

_Last updated: [DATE]_

Kanji Yomigana is a browser extension that helps users read Japanese text by showing context-aware yomigana when the user clicks a Japanese expression.

## What data is processed

When the user clicks a Japanese expression, the extension may send the following data to the AI provider selected by the user:

- the clicked Japanese expression,
- a short surrounding context,
- a short display-oriented helper surface when needed for correct reading.

The extension uses a BYOK (Bring Your Own Key) model. The user directly provides their own API key for Anthropic, Google Gemini, or OpenAI.

## Local storage

The extension stores some data locally in the browser, such as:

- lookup history used for the “Today” and “Focus” views,
- response cache used to reduce repeated API requests,
- user settings such as provider choice, retention periods, and site access rules.

By default, extended metadata such as page URL, page title, and full context are not stored unless the user explicitly enables that option.

## API key storage options

The extension offers two storage modes:

- **Session only**: the key is kept only for the current browser session and is removed when the browser closes.
- **Remember on this device**: the key is stored locally in the browser so it remains available after restart.

The full API key is not shown again in the popup after saving; only a masked suffix is shown.

## User controls

Users can:

- choose session-only or persistent key storage,
- enable or disable extended metadata storage,
- configure history/cache retention periods,
- control which sites the extension runs on with allow/block lists,
- delete all stored keys, settings, history, and cache from the extension.

## Third-party services

Depending on the user’s selection, the extension may send data to one of the following services:

- Anthropic Claude API
- Google Gemini API
- OpenAI API

Please also review the privacy policies of the selected provider.

## Contact

For questions about this privacy policy, contact: [YOUR CONTACT EMAIL]
