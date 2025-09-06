'use client';

import React, { createContext, useState, useEffect, useCallback } from 'react';

const ACCESSIBILITY_STORAGE_KEY = 'linguafolio-accessibility';

interface AccessibilityState {
  fontSize: number; // percentage
  highContrast: boolean;
  letterSpacing: number; // percentage
  wordSpacing: number; // percentage
  lineHeight: number; // percentage
  highlightLinks: boolean;
}

const defaultSettings: AccessibilityState = {
  fontSize: 100,
  highContrast: false,
  letterSpacing: 100,
  wordSpacing: 100,
  lineHeight: 100,
  highlightLinks: false,
};

interface AccessibilityContextProps extends AccessibilityState {
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  toggleHighContrast: () => void;
  increaseLetterSpacing: () => void;
  decreaseLetterSpacing: () => void;
  resetLetterSpacing: () => void;
  increaseWordSpacing: () => void;
  decreaseWordSpacing: () => void;
  resetWordSpacing: () => void;
  increaseLineHeight: () => void;
  decreaseLineHeight: () => void;
  resetLineHeight: () => void;
  toggleHighlightLinks: () => void;
  resetAll: () => void;
}

const AccessibilityContext = createContext<
  AccessibilityContextProps | undefined
>(undefined);

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<AccessibilityState>(defaultSettings);

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(ACCESSIBILITY_STORAGE_KEY);
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings((prev) => ({ ...defaultSettings, ...parsedSettings }));
      }
    } catch (error) {
      console.warn(
        'Could not read accessibility settings from localStorage:',
        error
      );
    }
  }, []);

  const persistSettings = useCallback((newSettings: AccessibilityState) => {
    setSettings(newSettings);
    try {
      localStorage.setItem(
        ACCESSIBILITY_STORAGE_KEY,
        JSON.stringify(newSettings)
      );
    } catch (error) {
      console.warn(
        'Could not save accessibility settings to localStorage:',
        error
      );
    }
  }, []);

  const increaseFontSize = () =>
    persistSettings({
      ...settings,
      fontSize: Math.min(settings.fontSize + 10, 140),
    });
  const decreaseFontSize = () =>
    persistSettings({
      ...settings,
      fontSize: Math.max(settings.fontSize - 10, 80),
    });
  const resetFontSize = () => persistSettings({ ...settings, fontSize: 100 });

  const toggleHighContrast = () =>
    persistSettings({ ...settings, highContrast: !settings.highContrast });

  const increaseLetterSpacing = () =>
    persistSettings({
      ...settings,
      letterSpacing: Math.min(settings.letterSpacing + 10, 150),
    });
  const decreaseLetterSpacing = () =>
    persistSettings({
      ...settings,
      letterSpacing: Math.max(settings.letterSpacing - 10, 100),
    });
  const resetLetterSpacing = () =>
    persistSettings({ ...settings, letterSpacing: 100 });

  const increaseWordSpacing = () =>
    persistSettings({
      ...settings,
      wordSpacing: Math.min(settings.wordSpacing + 10, 150),
    });
  const decreaseWordSpacing = () =>
    persistSettings({
      ...settings,
      wordSpacing: Math.max(settings.wordSpacing - 10, 100),
    });
  const resetWordSpacing = () =>
    persistSettings({ ...settings, wordSpacing: 100 });

  const increaseLineHeight = () =>
    persistSettings({
      ...settings,
      lineHeight: Math.min(settings.lineHeight + 10, 150),
    });
  const decreaseLineHeight = () =>
    persistSettings({
      ...settings,
      lineHeight: Math.max(settings.lineHeight - 10, 100),
    });
  const resetLineHeight = () =>
    persistSettings({ ...settings, lineHeight: 100 });

  const toggleHighlightLinks = () =>
    persistSettings({ ...settings, highlightLinks: !settings.highlightLinks });

  const resetAll = () => persistSettings(defaultSettings);

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${settings.fontSize}%`;
    root.style.letterSpacing = `${settings.letterSpacing / 100 - 1}em`;
    root.style.wordSpacing = `${settings.wordSpacing / 100 - 1}em`;
    root.style.lineHeight = `${settings.lineHeight}%`;
    root.setAttribute('data-high-contrast', String(settings.highContrast));
    root.setAttribute('data-highlight-links', String(settings.highlightLinks));
  }, [settings]);

  return (
    <AccessibilityContext.Provider
      value={{
        ...settings,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        toggleHighContrast,
        increaseLetterSpacing,
        decreaseLetterSpacing,
        resetLetterSpacing,
        increaseWordSpacing,
        decreaseWordSpacing,
        resetWordSpacing,
        increaseLineHeight,
        decreaseLineHeight,
        resetLineHeight,
        toggleHighlightLinks,
        resetAll,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => {
  const context = React.useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error(
      'useAccessibility must be used within an AccessibilityProvider'
    );
  }
  return context;
};
