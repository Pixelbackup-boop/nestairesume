'use client';

import { useEffect } from 'react';
import { fontPresets, getGoogleFontsUrl } from '@/lib/themes';

const LINK_ID = 'resume-google-fonts';

/**
 * Loads all Google Fonts used by resume templates.
 * The CSS payload is ~3KB (just @font-face declarations).
 * The browser only downloads actual .woff2 files for fonts rendered on the page.
 */
export default function FontLoader() {
    useEffect(() => {
        if (document.getElementById(LINK_ID)) return;

        const allFontNames = fontPresets
            .filter(f => f.googleFont)
            .map(f => f.name);

        const url = getGoogleFontsUrl(...allFontNames);
        if (!url) return;

        const link = document.createElement('link');
        link.id = LINK_ID;
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
    }, []);

    return null;
}
