document.addEventListener('DOMContentLoaded', function () {
    var settingsButton = document.getElementById('accessibility-settings-toggle');
    var settingsPanel = document.getElementById('accessibility-settings');
    var contrastButton = document.getElementById('high-contrast-toggle');
    var underlineLinksButton = document.getElementById('underline-links-toggle');
    var resetButton = document.getElementById('accessibility-settings-reset');
    var decreaseTextButton = document.getElementById('text-size-decrease');
    var increaseTextButton = document.getElementById('text-size-increase');
    var textSizeValue = document.getElementById('text-size-value');
    var settingsKey = 'visitor-accessibility-settings';
    var defaults = { textSize: 0, highContrast: false, underlineLinks: false };
    var minimumTextSize = -2;
    var maximumTextSize = 4;
    var settings = defaults;

    function readSettings() {
        try {
            var stored = localStorage.getItem(settingsKey);
            var saved = stored ? JSON.parse(stored) : {};
            var textSize = Number(saved.textSize);

            return {
                textSize: Number.isFinite(textSize) ? Math.max(minimumTextSize, Math.min(maximumTextSize, Math.round(textSize))) : 0,
                highContrast: saved.highContrast === true,
                underlineLinks: saved.underlineLinks === true
            };
        } catch (error) {
            console.warn('Unable to load accessibility settings:', error);
            return Object.assign({}, defaults);
        }
    }

    function saveSettings() {
        try {
            localStorage.setItem(settingsKey, JSON.stringify(settings));
        } catch (error) {
            console.warn('Unable to save accessibility settings:', error);
        }
    }

    function applySettings() {
        var scale = (1 + settings.textSize * 0.1).toFixed(1);

        document.documentElement.style.setProperty('--accessibility-text-scale', scale);
        document.documentElement.setAttribute('data-high-contrast', String(Boolean(settings.highContrast)));
        document.documentElement.setAttribute('data-underline-links', String(Boolean(settings.underlineLinks)));

        textSizeValue.textContent = Math.round(Number(scale) * 100) + '%';
        decreaseTextButton.disabled = settings.textSize <= minimumTextSize;
        increaseTextButton.disabled = settings.textSize >= maximumTextSize;
        contrastButton.setAttribute('aria-pressed', String(Boolean(settings.highContrast)));
        underlineLinksButton.setAttribute('aria-pressed', String(Boolean(settings.underlineLinks)));
    }

    function updateSettings(update) {
        update();
        applySettings();
        saveSettings();
    }

    settingsButton.addEventListener('click', function () {
        var expanded = settingsButton.getAttribute('aria-expanded') === 'true';
        settingsButton.setAttribute('aria-expanded', String(!expanded));
        settingsPanel.hidden = expanded;

        if (!expanded) {
            settingsPanel.querySelector('button').focus();
        }
    });

    settingsPanel.addEventListener('click', function (event) {
        if (event.target === decreaseTextButton && settings.textSize > minimumTextSize) {
            updateSettings(function () { settings.textSize -= 1; });
        } else if (event.target === increaseTextButton && settings.textSize < maximumTextSize) {
            updateSettings(function () { settings.textSize += 1; });
        } else if (event.target === contrastButton) {
            updateSettings(function () { settings.highContrast = !settings.highContrast; });
        } else if (event.target === underlineLinksButton) {
            updateSettings(function () { settings.underlineLinks = !settings.underlineLinks; });
        } else if (event.target === resetButton) {
            settings = Object.assign({}, defaults);
            applySettings();
            saveSettings();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && !settingsPanel.hidden) {
            settingsPanel.hidden = true;
            settingsButton.setAttribute('aria-expanded', 'false');
            settingsButton.focus();
        }
    });

    settings = readSettings();
    applySettings();
});
