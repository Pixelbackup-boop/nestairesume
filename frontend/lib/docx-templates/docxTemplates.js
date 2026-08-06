var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// scripts/docx-bundle-entry.ts
var docx_bundle_entry_exports = {};
__export(docx_bundle_entry_exports, {
  renderDocxHtml: () => renderDocxHtml
});
module.exports = __toCommonJS(docx_bundle_entry_exports);

// scripts/docx-logger-stub.ts
var logger = {
  info: (...args) => console.log(...args),
  warn: (...args) => console.warn(...args),
  error: (...args) => console.error(...args),
  debug: () => {
  }
};
var docx_logger_stub_default = logger;

// backend/src/templates/pdf/shared/helpers.ts
var hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};
var getLuminance = (hex) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const [rs, gs, bs] = [rgb.r, rgb.g, rgb.b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};
var getContrastText = (bgHex) => {
  const luminance = getLuminance(bgHex);
  return luminance > 0.179 ? "#1e293b" : "#f8fafc";
};
var escapeHtml = (text) => {
  if (!text) return "";
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};
var formatDescription = (text) => {
  if (!text) return "";
  return escapeHtml(text).replace(/\n/g, "<br>");
};

// backend/src/templates/pdf/shared/dateUtils.ts
var monthAbbreviations = {
  en: {
    Jan: "Jan",
    Feb: "Feb",
    Mar: "Mar",
    Apr: "Apr",
    May: "May",
    Jun: "Jun",
    Jul: "Jul",
    Aug: "Aug",
    Sep: "Sep",
    Oct: "Oct",
    Nov: "Nov",
    Dec: "Dec"
  },
  es: {
    Jan: "Ene",
    Feb: "Feb",
    Mar: "Mar",
    Apr: "Abr",
    May: "May",
    Jun: "Jun",
    Jul: "Jul",
    Aug: "Ago",
    Sep: "Sep",
    Oct: "Oct",
    Nov: "Nov",
    Dec: "Dic"
  },
  fr: {
    Jan: "janv.",
    Feb: "f\xE9vr.",
    Mar: "mars",
    Apr: "avr.",
    May: "mai",
    Jun: "juin",
    Jul: "juil.",
    Aug: "ao\xFBt",
    Sep: "sept.",
    Oct: "oct.",
    Nov: "nov.",
    Dec: "d\xE9c."
  },
  de: {
    Jan: "Jan.",
    Feb: "Feb.",
    Mar: "M\xE4rz",
    Apr: "Apr.",
    May: "Mai",
    Jun: "Juni",
    Jul: "Juli",
    Aug: "Aug.",
    Sep: "Sep.",
    Oct: "Okt.",
    Nov: "Nov.",
    Dec: "Dez."
  },
  ar: {
    Jan: "\u064A\u0646\u0627\u064A\u0631",
    Feb: "\u0641\u0628\u0631\u0627\u064A\u0631",
    Mar: "\u0645\u0627\u0631\u0633",
    Apr: "\u0623\u0628\u0631\u064A\u0644",
    May: "\u0645\u0627\u064A\u0648",
    Jun: "\u064A\u0648\u0646\u064A\u0648",
    Jul: "\u064A\u0648\u0644\u064A\u0648",
    Aug: "\u0623\u063A\u0633\u0637\u0633",
    Sep: "\u0633\u0628\u062A\u0645\u0628\u0631",
    Oct: "\u0623\u0643\u062A\u0648\u0628\u0631",
    Nov: "\u0646\u0648\u0641\u0645\u0628\u0631",
    Dec: "\u062F\u064A\u0633\u0645\u0628\u0631"
  }
};
var fullMonthNames = {
  en: {
    January: "January",
    February: "February",
    March: "March",
    April: "April",
    May: "May",
    June: "June",
    July: "July",
    August: "August",
    September: "September",
    October: "October",
    November: "November",
    December: "December"
  },
  es: {
    January: "Enero",
    February: "Febrero",
    March: "Marzo",
    April: "Abril",
    May: "Mayo",
    June: "Junio",
    July: "Julio",
    August: "Agosto",
    September: "Septiembre",
    October: "Octubre",
    November: "Noviembre",
    December: "Diciembre"
  },
  fr: {
    January: "Janvier",
    February: "F\xE9vrier",
    March: "Mars",
    April: "Avril",
    May: "Mai",
    June: "Juin",
    July: "Juillet",
    August: "Ao\xFBt",
    September: "Septembre",
    October: "Octobre",
    November: "Novembre",
    December: "D\xE9cembre"
  },
  de: {
    January: "Januar",
    February: "Februar",
    March: "M\xE4rz",
    April: "April",
    May: "Mai",
    June: "Juni",
    July: "Juli",
    August: "August",
    September: "September",
    October: "Oktober",
    November: "November",
    December: "Dezember"
  },
  ar: {
    January: "\u064A\u0646\u0627\u064A\u0631",
    February: "\u0641\u0628\u0631\u0627\u064A\u0631",
    March: "\u0645\u0627\u0631\u0633",
    April: "\u0623\u0628\u0631\u064A\u0644",
    May: "\u0645\u0627\u064A\u0648",
    June: "\u064A\u0648\u0646\u064A\u0648",
    July: "\u064A\u0648\u0644\u064A\u0648",
    August: "\u0623\u063A\u0633\u0637\u0633",
    September: "\u0633\u0628\u062A\u0645\u0628\u0631",
    October: "\u0623\u0643\u062A\u0648\u0628\u0631",
    November: "\u0646\u0648\u0641\u0645\u0628\u0631",
    December: "\u062F\u064A\u0633\u0645\u0628\u0631"
  }
};
function formatLocalizedDate(dateStr, locale = "en") {
  if (!dateStr) return "";
  const normalizedLocale = locale.toLowerCase().split("-")[0];
  if (normalizedLocale === "en" || !monthAbbreviations[normalizedLocale]) {
    return dateStr;
  }
  const abbrevMap = monthAbbreviations[normalizedLocale];
  const fullMap = fullMonthNames[normalizedLocale];
  let result = dateStr;
  for (const [eng, localized] of Object.entries(fullMap)) {
    const regex = new RegExp(`\\b${eng}\\b`, "gi");
    result = result.replace(regex, localized);
  }
  for (const [eng, localized] of Object.entries(abbrevMap)) {
    const regex = new RegExp(`\\b${eng}\\.?\\b`, "gi");
    result = result.replace(regex, localized);
  }
  return result;
}

// backend/src/templates/pdf/shared/translations.ts
var defaultTranslations = {
  sections: {
    experience: "Experience",
    workExperience: "Work Experience",
    education: "Education",
    skills: "Skills",
    languages: "Languages",
    interests: "Interests",
    strengths: "Strengths",
    certifications: "Certifications",
    awards: "Awards",
    summary: "Summary",
    profile: "Profile",
    contact: "Contact",
    additionalInfo: "Additional Information",
    socialLinks: "Social Links",
    personalDetails: "Personal Details",
    credentials: "Credentials"
  },
  labels: {
    present: "Present",
    nationality: "Nationality",
    id: "ID Number",
    passport: "Passport",
    drivingLicense: "Driving License",
    native: "Native",
    fluent: "Fluent",
    advanced: "Advanced",
    intermediate: "Intermediate",
    basic: "Basic",
    gpa: "GPA",
    activities: "Activities"
  }
};
function getTranslations(translations) {
  if (!translations) {
    return defaultTranslations;
  }
  return {
    sections: {
      ...defaultTranslations.sections,
      ...translations.sections
    },
    labels: {
      ...defaultTranslations.labels,
      ...translations.labels
    }
  };
}

// backend/src/templates/docx/shared/docxHelpers.ts
var DOCX_FONTS = {
  heading: "'Calibri', 'Arial', sans-serif",
  body: "'Calibri', 'Arial', sans-serif",
  serif: "'Georgia', 'Times New Roman', serif"
};
function formatDateRange(startDate, endDate, current, presentLabel = "Present", locale = "en") {
  const start = formatLocalizedDate(startDate, locale);
  const end = current ? presentLabel : formatLocalizedDate(endDate, locale);
  if (!start && !end) return "";
  if (!start) return end || "";
  if (!end) return start;
  return `${start} \u2013 ${end}`;
}
function buildContactLine(personalInfo) {
  const parts = [];
  if (personalInfo.email) parts.push(escapeHtml(personalInfo.email));
  if (personalInfo.phone) parts.push(escapeHtml(personalInfo.phone));
  if (personalInfo.location) parts.push(escapeHtml(personalInfo.location));
  if (personalInfo.website) parts.push(escapeHtml(personalInfo.website));
  if (personalInfo.linkedin) parts.push(escapeHtml(personalInfo.linkedin));
  return parts.join("  |  ");
}
function buildContactList(personalInfo, color = "#ffffff") {
  const items = [];
  if (personalInfo.email) items.push(`<p style="margin:0 0 4px 0;font-size:10px;color:${color};">&#9993; ${escapeHtml(personalInfo.email)}</p>`);
  if (personalInfo.phone) items.push(`<p style="margin:0 0 4px 0;font-size:10px;color:${color};">&#9742; ${escapeHtml(personalInfo.phone)}</p>`);
  if (personalInfo.location) items.push(`<p style="margin:0 0 4px 0;font-size:10px;color:${color};">&#9679; ${escapeHtml(personalInfo.location)}</p>`);
  if (personalInfo.website) items.push(`<p style="margin:0 0 4px 0;font-size:10px;color:${color};">&#9741; ${escapeHtml(personalInfo.website)}</p>`);
  if (personalInfo.linkedin) items.push(`<p style="margin:0 0 4px 0;font-size:10px;color:${color};">in ${escapeHtml(personalInfo.linkedin)}</p>`);
  return items.join("");
}
function renderProfileImage(profileImage, size = 80, shape = "circle") {
  if (!profileImage) return "";
  const borderRadius = shape === "circle" ? "50%" : shape === "rounded" ? "8px" : "0";
  return `<img src="${profileImage}" width="${size}" height="${size}" style="width:${size}px;height:${size}px;border-radius:${borderRadius};object-fit:cover;display:block;" />`;
}
function renderSkillsList(skills, mode = "inline") {
  if (!skills?.length) return "";
  if (mode === "inline") {
    return skills.map((s) => escapeHtml(s.name)).join(", ");
  }
  return skills.map((s) => `<li style="margin:0 0 2px 0;">${escapeHtml(s.name)}</li>`).join("");
}
function getLanguageProficiencyText(proficiency, labels) {
  if (labels) {
    const translatedMap = {
      native: labels.native,
      fluent: labels.fluent,
      advanced: labels.advanced,
      intermediate: labels.intermediate,
      basic: labels.basic
    };
    const translated = translatedMap[proficiency?.toLowerCase()];
    if (translated) return translated;
  }
  const map = {
    native: "Native",
    fluent: "Fluent",
    advanced: "Advanced",
    intermediate: "Intermediate",
    basic: "Basic"
  };
  return map[proficiency?.toLowerCase()] || proficiency || "";
}
function wrapDocxHtml(bodyHtml) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
    body {
        font-family: Calibri, Arial, sans-serif;
        font-size: 11pt;
        color: #333333;
        margin: 0;
        padding: 0;
        line-height: 1.4;
    }
    table {
        border-collapse: collapse;
    }
    p {
        margin: 0 0 4px 0;
    }
    ul {
        margin: 4px 0;
        padding-left: 20px;
    }
    li {
        margin: 0 0 2px 0;
    }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
}

// backend/src/templates/docx/docx-classic.ts
function renderDocxClassic(data, theme, translations, locale) {
  const t = getTranslations(translations);
  const pi = data.personalInfo;
  const primary = theme.primary || "#1e3a8a";
  let html = "";
  html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">`;
  html += `<tr>`;
  if (pi.profileImage) {
    html += `<td width="90" style="vertical-align:top;padding-right:16px;">`;
    html += renderProfileImage(pi.profileImage, 80, pi.imageShape || "circle");
    html += `</td>`;
  }
  html += `<td style="vertical-align:top;">`;
  html += `<p style="margin:0 0 2px 0;font-size:22pt;font-weight:bold;color:${primary};font-family:${DOCX_FONTS.heading};">${escapeHtml(pi.fullName)}</p>`;
  if (pi.jobTitle) {
    html += `<p style="margin:0 0 6px 0;font-size:12pt;color:#555555;">${escapeHtml(pi.jobTitle)}</p>`;
  }
  html += `<p style="margin:0;font-size:9pt;color:#777777;">${buildContactLine(pi)}</p>`;
  html += `</td>`;
  html += `</tr></table>`;
  html += `<hr style="border:none;border-top:2px solid ${primary};margin:0 0 12px 0;" />`;
  if (pi.summary) {
    html += sectionHeader(t.sections.summary, primary);
    html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;">${formatDescription(pi.summary)}</p>`;
  }
  if (data.experience?.length) {
    html += sectionHeader(t.sections.workExperience, primary);
    for (const exp of data.experience) {
      html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">`;
      html += `<tr>`;
      html += `<td style="vertical-align:top;">`;
      html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#222222;">${escapeHtml(exp.title)}</p>`;
      html += `<p style="margin:0 0 4px 0;font-size:10pt;color:${primary};">${escapeHtml(exp.company)}${exp.city ? ", " + escapeHtml(exp.city) : ""}</p>`;
      html += `</td>`;
      html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
      html += `<p style="margin:0;font-size:9pt;color:#888888;">${formatDateRange(exp.startDate, exp.endDate, exp.current, t.labels.present, locale)}</p>`;
      html += `</td>`;
      html += `</tr></table>`;
      if (exp.description) {
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 8px 0;">${formatDescription(exp.description)}</p>`;
      }
    }
  }
  if (data.education?.length) {
    html += sectionHeader(t.sections.education, primary);
    for (const edu of data.education) {
      html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">`;
      html += `<tr>`;
      html += `<td style="vertical-align:top;">`;
      html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#222222;">${escapeHtml(edu.school)}</p>`;
      html += `<p style="margin:0;font-size:10pt;color:#555555;">${escapeHtml(edu.degree)}</p>`;
      html += `</td>`;
      html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
      html += `<p style="margin:0;font-size:9pt;color:#888888;">${formatDateRange(edu.startDate, edu.endDate, edu.current, t.labels.present, locale)}</p>`;
      html += `</td>`;
      html += `</tr></table>`;
      if (edu.description) {
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 6px 0;">${formatDescription(edu.description)}</p>`;
      }
    }
  }
  if (data.skills?.length) {
    html += sectionHeader(t.sections.skills, primary);
    html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;">${renderSkillsList(data.skills, "inline")}</p>`;
  }
  if (data.languages?.length) {
    html += sectionHeader(t.sections.languages, primary);
    html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;">`;
    html += data.languages.map((l) => `${escapeHtml(l.name)} (${getLanguageProficiencyText(l.proficiency, t.labels)})`).join(", ");
    html += `</p>`;
  }
  if (data.certifications?.length) {
    html += sectionHeader(t.sections.certifications, primary);
    for (const cert of data.certifications) {
      html += `<p style="margin:0 0 4px 0;font-size:10pt;"><strong>${escapeHtml(cert.name)}</strong> \u2014 ${escapeHtml(cert.issuer)}${cert.date ? ", " + escapeHtml(cert.date) : ""}</p>`;
    }
    html += `<br />`;
  }
  if (data.interests?.length) {
    html += sectionHeader(t.sections.interests, primary);
    html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;">${data.interests.map((i) => escapeHtml(i.name)).join(", ")}</p>`;
  }
  return html;
}
function sectionHeader(title, color) {
  return `<p style="margin:12px 0 6px 0;font-size:13pt;font-weight:bold;color:${color};border-bottom:1px solid ${color};padding-bottom:3px;text-transform:uppercase;letter-spacing:1px;">${escapeHtml(title)}</p>`;
}

// backend/src/templates/docx/docx-sidebar.ts
function renderDocxSidebar(data, theme, translations, locale) {
  const t = getTranslations(translations);
  const pi = data.personalInfo;
  const primary = theme.primary || "#1e3a8a";
  const sidebarText = getContrastText(primary);
  let sidebar = "";
  let main = "";
  if (pi.profileImage) {
    sidebar += `<div style="text-align:center;margin-bottom:12px;">`;
    sidebar += renderProfileImage(pi.profileImage, 90, pi.imageShape || "circle");
    sidebar += `</div>`;
  }
  sidebar += `<p style="margin:0 0 2px 0;font-size:14pt;font-weight:bold;color:${sidebarText};text-align:center;">${escapeHtml(pi.fullName)}</p>`;
  if (pi.jobTitle) {
    sidebar += `<p style="margin:0 0 12px 0;font-size:9pt;color:${sidebarText};opacity:0.85;text-align:center;">${escapeHtml(pi.jobTitle)}</p>`;
  }
  sidebar += sidebarSectionHeader(t.sections.contact, sidebarText);
  sidebar += buildContactList(pi, sidebarText);
  sidebar += `<br />`;
  if (data.skills?.length) {
    sidebar += sidebarSectionHeader(t.sections.skills, sidebarText);
    sidebar += `<ul style="margin:0 0 8px 0;padding-left:16px;">`;
    for (const skill of data.skills) {
      sidebar += `<li style="margin:0 0 2px 0;font-size:9pt;color:${sidebarText};">${escapeHtml(skill.name)}</li>`;
    }
    sidebar += `</ul>`;
  }
  if (data.languages?.length) {
    sidebar += sidebarSectionHeader(t.sections.languages, sidebarText);
    for (const lang of data.languages) {
      sidebar += `<p style="margin:0 0 3px 0;font-size:9pt;color:${sidebarText};">${escapeHtml(lang.name)} \u2014 ${getLanguageProficiencyText(lang.proficiency, t.labels)}</p>`;
    }
    sidebar += `<br />`;
  }
  if (data.interests?.length) {
    sidebar += sidebarSectionHeader(t.sections.interests, sidebarText);
    for (const interest of data.interests) {
      sidebar += `<p style="margin:0 0 2px 0;font-size:9pt;color:${sidebarText};">&#8226; ${escapeHtml(interest.name)}</p>`;
    }
  }
  if (pi.summary) {
    main += mainSectionHeader(t.sections.summary, primary);
    main += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;">${formatDescription(pi.summary)}</p>`;
  }
  if (data.experience?.length) {
    main += mainSectionHeader(t.sections.workExperience, primary);
    for (const exp of data.experience) {
      main += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">`;
      main += `<tr>`;
      main += `<td style="vertical-align:top;">`;
      main += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#222222;">${escapeHtml(exp.title)}</p>`;
      main += `<p style="margin:0 0 3px 0;font-size:9pt;color:${primary};">${escapeHtml(exp.company)}${exp.city ? ", " + escapeHtml(exp.city) : ""}</p>`;
      main += `</td>`;
      main += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:120px;">`;
      main += `<p style="margin:0;font-size:8pt;color:#888888;">${formatDateRange(exp.startDate, exp.endDate, exp.current, t.labels.present, locale)}</p>`;
      main += `</td>`;
      main += `</tr></table>`;
      if (exp.description) {
        main += `<p style="font-size:9pt;color:#444444;margin:0 0 8px 0;">${formatDescription(exp.description)}</p>`;
      }
    }
  }
  if (data.education?.length) {
    main += mainSectionHeader(t.sections.education, primary);
    for (const edu of data.education) {
      main += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:6px;">`;
      main += `<tr>`;
      main += `<td style="vertical-align:top;">`;
      main += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#222222;">${escapeHtml(edu.school)}</p>`;
      main += `<p style="margin:0;font-size:9pt;color:#555555;">${escapeHtml(edu.degree)}</p>`;
      main += `</td>`;
      main += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:120px;">`;
      main += `<p style="margin:0;font-size:8pt;color:#888888;">${formatDateRange(edu.startDate, edu.endDate, edu.current, t.labels.present, locale)}</p>`;
      main += `</td>`;
      main += `</tr></table>`;
      if (edu.description) {
        main += `<p style="font-size:9pt;color:#444444;margin:0 0 6px 0;">${formatDescription(edu.description)}</p>`;
      }
    }
  }
  if (data.certifications?.length) {
    main += mainSectionHeader(t.sections.certifications, primary);
    for (const cert of data.certifications) {
      main += `<p style="margin:0 0 4px 0;font-size:9pt;"><strong>${escapeHtml(cert.name)}</strong> \u2014 ${escapeHtml(cert.issuer)}${cert.date ? ", " + escapeHtml(cert.date) : ""}</p>`;
    }
    main += `<br />`;
  }
  if (data.awards?.length) {
    main += mainSectionHeader(t.sections.awards, primary);
    for (const award of data.awards) {
      main += `<p style="margin:0 0 4px 0;font-size:9pt;"><strong>${escapeHtml(award.title)}</strong> \u2014 ${escapeHtml(award.issuer)}${award.date ? ", " + escapeHtml(award.date) : ""}</p>`;
    }
  }
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="min-height:800px;">
<tr>
    <td width="32%" style="vertical-align:top;background-color:${primary};padding:20px 14px;color:${sidebarText};">
        ${sidebar}
    </td>
    <td width="68%" style="vertical-align:top;padding:20px 18px;">
        ${main}
    </td>
</tr>
</table>`;
}
function sidebarSectionHeader(title, color) {
  return `<p style="margin:8px 0 4px 0;font-size:10pt;font-weight:bold;color:${color};text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid ${color};padding-bottom:2px;">${title}</p>`;
}
function mainSectionHeader(title, color) {
  return `<p style="margin:10px 0 6px 0;font-size:12pt;font-weight:bold;color:${color};border-bottom:1px solid ${color};padding-bottom:3px;text-transform:uppercase;letter-spacing:1px;">${title}</p>`;
}

// backend/src/templates/docx/docx-header.ts
function renderDocxHeader(data, theme, translations, locale) {
  const t = getTranslations(translations);
  const pi = data.personalInfo;
  const primary = theme.primary || "#1e3a8a";
  const headerText = getContrastText(primary);
  let html = "";
  html += `<table width="100%" cellpadding="0" cellspacing="0" style="background-color:${primary};margin-bottom:16px;">`;
  html += `<tr>`;
  if (pi.profileImage) {
    html += `<td width="100" style="vertical-align:middle;padding:20px 12px 20px 20px;">`;
    html += renderProfileImage(pi.profileImage, 80, pi.imageShape || "circle");
    html += `</td>`;
  }
  html += `<td style="vertical-align:middle;padding:20px;">`;
  html += `<p style="margin:0 0 2px 0;font-size:22pt;font-weight:bold;color:${headerText};font-family:${DOCX_FONTS.heading};">${escapeHtml(pi.fullName)}</p>`;
  if (pi.jobTitle) {
    html += `<p style="margin:0 0 8px 0;font-size:12pt;color:${headerText};opacity:0.9;">${escapeHtml(pi.jobTitle)}</p>`;
  }
  html += `<p style="margin:0;font-size:9pt;color:${headerText};opacity:0.8;">${buildContactLine(pi)}</p>`;
  html += `</td>`;
  html += `</tr></table>`;
  const bodyPadding = "padding:0 4px;";
  if (pi.summary) {
    html += `<div style="${bodyPadding}">`;
    html += sectionHeader2(t.sections.summary, primary);
    html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;">${formatDescription(pi.summary)}</p>`;
    html += `</div>`;
  }
  if (data.experience?.length) {
    html += `<div style="${bodyPadding}">`;
    html += sectionHeader2(t.sections.workExperience, primary);
    for (const exp of data.experience) {
      html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">`;
      html += `<tr>`;
      html += `<td style="vertical-align:top;">`;
      html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#222222;">${escapeHtml(exp.title)}</p>`;
      html += `<p style="margin:0 0 3px 0;font-size:10pt;color:${primary};">${escapeHtml(exp.company)}${exp.city ? ", " + escapeHtml(exp.city) : ""}</p>`;
      html += `</td>`;
      html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
      html += `<p style="margin:0;font-size:9pt;color:#888888;">${formatDateRange(exp.startDate, exp.endDate, exp.current, t.labels.present, locale)}</p>`;
      html += `</td>`;
      html += `</tr></table>`;
      if (exp.description) {
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 8px 0;">${formatDescription(exp.description)}</p>`;
      }
    }
    html += `</div>`;
  }
  if (data.education?.length) {
    html += `<div style="${bodyPadding}">`;
    html += sectionHeader2(t.sections.education, primary);
    for (const edu of data.education) {
      html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">`;
      html += `<tr>`;
      html += `<td style="vertical-align:top;">`;
      html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#222222;">${escapeHtml(edu.school)}</p>`;
      html += `<p style="margin:0;font-size:10pt;color:#555555;">${escapeHtml(edu.degree)}</p>`;
      html += `</td>`;
      html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
      html += `<p style="margin:0;font-size:9pt;color:#888888;">${formatDateRange(edu.startDate, edu.endDate, edu.current, t.labels.present, locale)}</p>`;
      html += `</td>`;
      html += `</tr></table>`;
      if (edu.description) {
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 6px 0;">${formatDescription(edu.description)}</p>`;
      }
    }
    html += `</div>`;
  }
  const hasSkills = data.skills?.length;
  const hasLanguages = data.languages?.length;
  if (hasSkills || hasLanguages) {
    html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:4px;">`;
    html += `<tr>`;
    if (hasSkills) {
      html += `<td${hasLanguages ? ' width="60%"' : ""} style="vertical-align:top;padding:0 8px 0 4px;">`;
      html += sectionHeader2(t.sections.skills, primary);
      html += `<p style="font-size:10pt;color:#444444;">${renderSkillsList(data.skills, "inline")}</p>`;
      html += `</td>`;
    }
    if (hasLanguages) {
      html += `<td${hasSkills ? ' width="40%"' : ""} style="vertical-align:top;padding:0 4px 0 8px;">`;
      html += sectionHeader2(t.sections.languages, primary);
      html += `<p style="font-size:10pt;color:#444444;">`;
      html += data.languages.map((l) => `${escapeHtml(l.name)} (${getLanguageProficiencyText(l.proficiency, t.labels)})`).join("<br />");
      html += `</p>`;
      html += `</td>`;
    }
    html += `</tr></table>`;
  }
  if (data.certifications?.length) {
    html += `<div style="${bodyPadding}">`;
    html += sectionHeader2(t.sections.certifications, primary);
    for (const cert of data.certifications) {
      html += `<p style="margin:0 0 4px 0;font-size:10pt;"><strong>${escapeHtml(cert.name)}</strong> \u2014 ${escapeHtml(cert.issuer)}${cert.date ? ", " + escapeHtml(cert.date) : ""}</p>`;
    }
    html += `</div>`;
  }
  return html;
}
function sectionHeader2(title, color) {
  return `<p style="margin:12px 0 6px 0;font-size:13pt;font-weight:bold;color:${color};border-bottom:1px solid ${color};padding-bottom:3px;text-transform:uppercase;letter-spacing:1px;">${escapeHtml(title)}</p>`;
}

// backend/src/templates/docx/docx-minimal.ts
function renderDocxMinimal(data, theme, translations, locale) {
  const t = getTranslations(translations);
  const pi = data.personalInfo;
  const primary = theme.primary || "#333333";
  let html = "";
  html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">`;
  html += `<tr>`;
  html += `<td style="vertical-align:middle;">`;
  html += `<table cellpadding="0" cellspacing="0"><tr>`;
  if (pi.profileImage) {
    html += `<td style="vertical-align:middle;padding-right:14px;">`;
    html += renderProfileImage(pi.profileImage, 70, pi.imageShape || "circle");
    html += `</td>`;
  }
  html += `<td style="vertical-align:middle;">`;
  html += `<p style="margin:0 0 2px 0;font-size:20pt;font-weight:bold;color:${primary};font-family:${DOCX_FONTS.heading};">${escapeHtml(pi.fullName)}</p>`;
  if (pi.jobTitle) {
    html += `<p style="margin:0;font-size:11pt;color:#666666;">${escapeHtml(pi.jobTitle)}</p>`;
  }
  html += `</td>`;
  html += `</tr></table>`;
  html += `</td>`;
  html += `<td style="vertical-align:middle;text-align:right;">`;
  if (pi.email) html += `<p style="margin:0 0 2px 0;font-size:9pt;color:#555555;">${escapeHtml(pi.email)}</p>`;
  if (pi.phone) html += `<p style="margin:0 0 2px 0;font-size:9pt;color:#555555;">${escapeHtml(pi.phone)}</p>`;
  if (pi.location) html += `<p style="margin:0 0 2px 0;font-size:9pt;color:#555555;">${escapeHtml(pi.location)}</p>`;
  if (pi.website) html += `<p style="margin:0 0 2px 0;font-size:9pt;color:#555555;">${escapeHtml(pi.website)}</p>`;
  if (pi.linkedin) html += `<p style="margin:0;font-size:9pt;color:#555555;">${escapeHtml(pi.linkedin)}</p>`;
  html += `</td>`;
  html += `</tr></table>`;
  html += `<hr style="border:none;border-top:1px solid #cccccc;margin:0 0 10px 0;" />`;
  if (pi.summary) {
    html += sectionHeader3(t.sections.summary, primary);
    html += `<p style="font-size:10pt;color:#444444;margin:0 0 10px 0;line-height:1.5;">${formatDescription(pi.summary)}</p>`;
  }
  if (data.experience?.length) {
    html += sectionHeader3(t.sections.workExperience, primary);
    for (const exp of data.experience) {
      html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">`;
      html += `<tr>`;
      html += `<td style="vertical-align:top;">`;
      html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#222222;">${escapeHtml(exp.title)}</p>`;
      html += `<p style="margin:0 0 3px 0;font-size:10pt;color:#666666;">${escapeHtml(exp.company)}${exp.city ? " \xB7 " + escapeHtml(exp.city) : ""}</p>`;
      html += `</td>`;
      html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
      html += `<p style="margin:0;font-size:9pt;color:#999999;">${formatDateRange(exp.startDate, exp.endDate, exp.current, t.labels.present, locale)}</p>`;
      html += `</td>`;
      html += `</tr></table>`;
      if (exp.description) {
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 8px 0;">${formatDescription(exp.description)}</p>`;
      }
    }
  }
  if (data.education?.length) {
    html += sectionHeader3(t.sections.education, primary);
    for (const edu of data.education) {
      html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:6px;">`;
      html += `<tr>`;
      html += `<td style="vertical-align:top;">`;
      html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#222222;">${escapeHtml(edu.school)}</p>`;
      html += `<p style="margin:0;font-size:10pt;color:#666666;">${escapeHtml(edu.degree)}</p>`;
      html += `</td>`;
      html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
      html += `<p style="margin:0;font-size:9pt;color:#999999;">${formatDateRange(edu.startDate, edu.endDate, edu.current, t.labels.present, locale)}</p>`;
      html += `</td>`;
      html += `</tr></table>`;
      if (edu.description) {
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 6px 0;">${formatDescription(edu.description)}</p>`;
      }
    }
  }
  const hasSkills = data.skills?.length;
  const hasLanguages = data.languages?.length;
  if (hasSkills || hasLanguages) {
    html += `<table width="100%" cellpadding="0" cellspacing="0">`;
    html += `<tr>`;
    if (hasSkills) {
      html += `<td${hasLanguages ? ' width="60%"' : ""} style="vertical-align:top;padding-right:12px;">`;
      html += sectionHeader3(t.sections.skills, primary);
      html += `<p style="font-size:10pt;color:#444444;">${renderSkillsList(data.skills, "inline")}</p>`;
      html += `</td>`;
    }
    if (hasLanguages) {
      html += `<td${hasSkills ? ' width="40%"' : ""} style="vertical-align:top;">`;
      html += sectionHeader3(t.sections.languages, primary);
      html += `<p style="font-size:10pt;color:#444444;">`;
      html += data.languages.map((l) => `${escapeHtml(l.name)} (${getLanguageProficiencyText(l.proficiency, t.labels)})`).join("<br />");
      html += `</p>`;
      html += `</td>`;
    }
    html += `</tr></table>`;
  }
  if (data.certifications?.length) {
    html += sectionHeader3(t.sections.certifications, primary);
    for (const cert of data.certifications) {
      html += `<p style="margin:0 0 4px 0;font-size:10pt;"><strong>${escapeHtml(cert.name)}</strong> \u2014 ${escapeHtml(cert.issuer)}${cert.date ? ", " + escapeHtml(cert.date) : ""}</p>`;
    }
  }
  if (data.interests?.length) {
    html += sectionHeader3(t.sections.interests, primary);
    html += `<p style="font-size:10pt;color:#444444;">${data.interests.map((i) => escapeHtml(i.name)).join(" \xB7 ")}</p>`;
  }
  return html;
}
function sectionHeader3(title, color) {
  return `<p style="margin:10px 0 5px 0;font-size:11pt;font-weight:bold;color:${color};border-bottom:1px solid #dddddd;padding-bottom:3px;letter-spacing:0.5px;">${escapeHtml(title)}</p>`;
}

// backend/src/templates/gdocs/gdocs-clean.ts
var FONT = "'Arial', sans-serif";
function renderGdocsClean(data, theme, translations, locale) {
  const t = getTranslations(translations);
  const pi = data.personalInfo;
  const primary = theme.primary || "#4285f4";
  let html = "";
  html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">`;
  html += `<tr>`;
  if (pi.profileImage) {
    html += `<td width="85" style="vertical-align:top;padding-right:14px;">`;
    html += renderProfileImage(pi.profileImage, 75, pi.imageShape || "circle");
    html += `</td>`;
  }
  html += `<td style="vertical-align:top;">`;
  html += `<p style="margin:0 0 2px 0;font-size:22pt;font-weight:bold;color:${primary};font-family:${FONT};">${escapeHtml(pi.fullName)}</p>`;
  if (pi.jobTitle) {
    html += `<p style="margin:0 0 6px 0;font-size:11pt;color:#5f6368;font-family:${FONT};">${escapeHtml(pi.jobTitle)}</p>`;
  }
  html += `<p style="margin:0;font-size:9pt;color:#80868b;font-family:${FONT};">${buildContactLine(pi)}</p>`;
  html += `</td>`;
  html += `</tr></table>`;
  html += `<hr style="border:none;border-top:2px solid ${primary};margin:0 0 12px 0;" />`;
  if (pi.summary) {
    html += sectionHeader4(t.sections.summary, primary);
    html += `<p style="font-size:10pt;color:#3c4043;margin:0 0 12px 0;font-family:${FONT};line-height:1.5;">${formatDescription(pi.summary)}</p>`;
  }
  if (data.experience?.length) {
    html += sectionHeader4(t.sections.workExperience, primary);
    for (const exp of data.experience) {
      html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">`;
      html += `<tr>`;
      html += `<td style="vertical-align:top;">`;
      html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#202124;font-family:${FONT};">${escapeHtml(exp.title)}</p>`;
      html += `<p style="margin:0 0 4px 0;font-size:10pt;color:${primary};font-family:${FONT};">${escapeHtml(exp.company)}${exp.city ? ", " + escapeHtml(exp.city) : ""}</p>`;
      html += `</td>`;
      html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
      html += `<p style="margin:0;font-size:9pt;color:#80868b;font-family:${FONT};">${formatDateRange(exp.startDate, exp.endDate, exp.current, t.labels.present, locale)}</p>`;
      html += `</td>`;
      html += `</tr></table>`;
      if (exp.description) {
        html += `<p style="font-size:10pt;color:#3c4043;margin:0 0 8px 0;font-family:${FONT};">${formatDescription(exp.description)}</p>`;
      }
    }
  }
  if (data.education?.length) {
    html += sectionHeader4(t.sections.education, primary);
    for (const edu of data.education) {
      html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">`;
      html += `<tr>`;
      html += `<td style="vertical-align:top;">`;
      html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#202124;font-family:${FONT};">${escapeHtml(edu.school)}</p>`;
      html += `<p style="margin:0;font-size:10pt;color:#5f6368;font-family:${FONT};">${escapeHtml(edu.degree)}</p>`;
      html += `</td>`;
      html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
      html += `<p style="margin:0;font-size:9pt;color:#80868b;font-family:${FONT};">${formatDateRange(edu.startDate, edu.endDate, edu.current, t.labels.present, locale)}</p>`;
      html += `</td>`;
      html += `</tr></table>`;
      if (edu.description) {
        html += `<p style="font-size:10pt;color:#3c4043;margin:0 0 6px 0;font-family:${FONT};">${formatDescription(edu.description)}</p>`;
      }
    }
  }
  if (data.skills?.length) {
    html += sectionHeader4(t.sections.skills, primary);
    html += `<p style="font-size:10pt;color:#3c4043;margin:0 0 12px 0;font-family:${FONT};">${renderSkillsList(data.skills, "inline")}</p>`;
  }
  if (data.languages?.length) {
    html += sectionHeader4(t.sections.languages, primary);
    html += `<p style="font-size:10pt;color:#3c4043;margin:0 0 12px 0;font-family:${FONT};">`;
    html += data.languages.map((l) => `${escapeHtml(l.name)} (${getLanguageProficiencyText(l.proficiency)})`).join(", ");
    html += `</p>`;
  }
  if (data.certifications?.length) {
    html += sectionHeader4(t.sections.certifications, primary);
    for (const cert of data.certifications) {
      html += `<p style="margin:0 0 4px 0;font-size:10pt;font-family:${FONT};"><strong>${escapeHtml(cert.name)}</strong> \u2014 ${escapeHtml(cert.issuer)}${cert.date ? ", " + escapeHtml(cert.date) : ""}</p>`;
    }
    html += `<br />`;
  }
  if (data.interests?.length) {
    html += sectionHeader4(t.sections.interests, primary);
    html += `<p style="font-size:10pt;color:#3c4043;margin:0 0 12px 0;font-family:${FONT};">${data.interests.map((i) => escapeHtml(i.name)).join(", ")}</p>`;
  }
  return html;
}
function sectionHeader4(title, color) {
  return `<p style="margin:12px 0 6px 0;font-size:12pt;font-weight:bold;color:${color};border-bottom:1px solid ${color};padding-bottom:3px;text-transform:uppercase;letter-spacing:1px;font-family:'Arial',sans-serif;">${escapeHtml(title)}</p>`;
}

// backend/src/templates/gdocs/gdocs-coral.ts
var FONT2 = "'Arial', sans-serif";
function renderGdocsCoral(data, theme, translations, locale) {
  const t = getTranslations(translations);
  const pi = data.personalInfo;
  const primary = theme.primary || "#e8634a";
  let html = "";
  html += `<table width="100%" cellpadding="0" cellspacing="0" style="background-color:${primary};margin-bottom:14px;">`;
  html += `<tr>`;
  if (pi.profileImage) {
    html += `<td width="95" style="vertical-align:middle;padding:16px 10px 16px 16px;">`;
    html += renderProfileImage(pi.profileImage, 75, pi.imageShape || "circle");
    html += `</td>`;
  }
  html += `<td style="vertical-align:middle;padding:16px;">`;
  html += `<p style="margin:0 0 2px 0;font-size:22pt;font-weight:bold;color:#ffffff;font-family:${FONT2};">${escapeHtml(pi.fullName)}</p>`;
  if (pi.jobTitle) {
    html += `<p style="margin:0 0 6px 0;font-size:11pt;color:#fce4ec;font-family:${FONT2};">${escapeHtml(pi.jobTitle)}</p>`;
  }
  html += `<p style="margin:0;font-size:9pt;color:#fce4ec;font-family:${FONT2};">${buildContactLine(pi)}</p>`;
  html += `</td>`;
  html += `</tr></table>`;
  if (pi.summary) {
    html += sectionHeader5(t.sections.summary, primary);
    html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;font-family:${FONT2};line-height:1.5;">${formatDescription(pi.summary)}</p>`;
  }
  if (data.experience?.length) {
    html += sectionHeader5(t.sections.workExperience, primary);
    for (const exp of data.experience) {
      html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">`;
      html += `<tr>`;
      html += `<td style="vertical-align:top;">`;
      html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#333333;font-family:${FONT2};">${escapeHtml(exp.title)}</p>`;
      html += `<p style="margin:0 0 3px 0;font-size:10pt;color:${primary};font-family:${FONT2};">${escapeHtml(exp.company)}${exp.city ? ", " + escapeHtml(exp.city) : ""}</p>`;
      html += `</td>`;
      html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
      html += `<p style="margin:0;font-size:9pt;color:#999999;font-family:${FONT2};">${formatDateRange(exp.startDate, exp.endDate, exp.current, t.labels.present, locale)}</p>`;
      html += `</td>`;
      html += `</tr></table>`;
      if (exp.description) {
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 8px 0;font-family:${FONT2};">${formatDescription(exp.description)}</p>`;
      }
    }
  }
  if (data.education?.length) {
    html += sectionHeader5(t.sections.education, primary);
    for (const edu of data.education) {
      html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">`;
      html += `<tr>`;
      html += `<td style="vertical-align:top;">`;
      html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#333333;font-family:${FONT2};">${escapeHtml(edu.school)}</p>`;
      html += `<p style="margin:0;font-size:10pt;color:#666666;font-family:${FONT2};">${escapeHtml(edu.degree)}</p>`;
      html += `</td>`;
      html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
      html += `<p style="margin:0;font-size:9pt;color:#999999;font-family:${FONT2};">${formatDateRange(edu.startDate, edu.endDate, edu.current, t.labels.present, locale)}</p>`;
      html += `</td>`;
      html += `</tr></table>`;
      if (edu.description) {
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 6px 0;font-family:${FONT2};">${formatDescription(edu.description)}</p>`;
      }
    }
  }
  const hasSkills = data.skills?.length;
  const hasLanguages = data.languages?.length;
  if (hasSkills || hasLanguages) {
    html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:4px;">`;
    html += `<tr>`;
    if (hasSkills) {
      html += `<td${hasLanguages ? ' width="60%"' : ""} style="vertical-align:top;padding-right:12px;">`;
      html += sectionHeader5(t.sections.skills, primary);
      html += `<p style="font-size:10pt;color:#444444;font-family:${FONT2};">${renderSkillsList(data.skills, "inline")}</p>`;
      html += `</td>`;
    }
    if (hasLanguages) {
      html += `<td${hasSkills ? ' width="40%"' : ""} style="vertical-align:top;">`;
      html += sectionHeader5(t.sections.languages, primary);
      html += `<p style="font-size:10pt;color:#444444;font-family:${FONT2};">`;
      html += data.languages.map((l) => `${escapeHtml(l.name)} (${getLanguageProficiencyText(l.proficiency)})`).join("<br />");
      html += `</p>`;
      html += `</td>`;
    }
    html += `</tr></table>`;
  }
  if (data.certifications?.length) {
    html += sectionHeader5(t.sections.certifications, primary);
    for (const cert of data.certifications) {
      html += `<p style="margin:0 0 4px 0;font-size:10pt;font-family:${FONT2};"><strong>${escapeHtml(cert.name)}</strong> \u2014 ${escapeHtml(cert.issuer)}${cert.date ? ", " + escapeHtml(cert.date) : ""}</p>`;
    }
    html += `<br />`;
  }
  if (data.interests?.length) {
    html += sectionHeader5(t.sections.interests, primary);
    html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;font-family:${FONT2};">${data.interests.map((i) => escapeHtml(i.name)).join(", ")}</p>`;
  }
  return html;
}
function sectionHeader5(title, color) {
  return `<p style="margin:12px 0 6px 0;font-size:12pt;font-weight:bold;color:${color};border-bottom:2px solid ${color};padding-bottom:3px;text-transform:uppercase;letter-spacing:1px;font-family:'Arial',sans-serif;">${escapeHtml(title)}</p>`;
}

// backend/src/templates/gdocs/gdocs-elegant.ts
var FONT_HEADING = "'Georgia', 'Times New Roman', serif";
var FONT_BODY = "'Arial', sans-serif";
function renderGdocsElegant(data, theme, translations, locale) {
  const t = getTranslations(translations);
  const pi = data.personalInfo;
  const primary = theme.primary || "#2d5016";
  let html = "";
  html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">`;
  html += `<tr>`;
  html += `<td style="text-align:center;padding:4px 0;">`;
  if (pi.profileImage) {
    html += `<div style="text-align:center;margin-bottom:8px;">`;
    html += renderProfileImage(pi.profileImage, 80, pi.imageShape || "circle");
    html += `</div>`;
  }
  html += `<p style="margin:0 0 2px 0;font-size:24pt;font-weight:bold;color:${primary};font-family:${FONT_HEADING};">${escapeHtml(pi.fullName)}</p>`;
  if (pi.jobTitle) {
    html += `<p style="margin:0 0 6px 0;font-size:12pt;color:#555555;font-family:${FONT_HEADING};font-style:italic;">${escapeHtml(pi.jobTitle)}</p>`;
  }
  const contactParts = [];
  if (pi.email) contactParts.push(escapeHtml(pi.email));
  if (pi.phone) contactParts.push(escapeHtml(pi.phone));
  if (pi.location) contactParts.push(escapeHtml(pi.location));
  if (pi.website) contactParts.push(escapeHtml(pi.website));
  if (pi.linkedin) contactParts.push(escapeHtml(pi.linkedin));
  if (contactParts.length) {
    html += `<p style="margin:0;font-size:9pt;color:#777777;font-family:${FONT_BODY};">${contactParts.join("  &#8226;  ")}</p>`;
  }
  html += `</td>`;
  html += `</tr></table>`;
  html += `<hr style="border:none;border-top:1px solid ${primary};margin:4px 0 2px 0;" />`;
  html += `<hr style="border:none;border-top:1px solid ${primary};margin:2px 0 12px 0;" />`;
  if (pi.summary) {
    html += sectionHeader6(t.sections.summary, primary);
    html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;font-family:${FONT_BODY};line-height:1.6;">${formatDescription(pi.summary)}</p>`;
  }
  if (data.experience?.length) {
    html += sectionHeader6(t.sections.workExperience, primary);
    for (const exp of data.experience) {
      html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">`;
      html += `<tr>`;
      html += `<td style="vertical-align:top;">`;
      html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#222222;font-family:${FONT_HEADING};">${escapeHtml(exp.title)}</p>`;
      html += `<p style="margin:0 0 3px 0;font-size:10pt;color:${primary};font-family:${FONT_BODY};">${escapeHtml(exp.company)}${exp.city ? ", " + escapeHtml(exp.city) : ""}</p>`;
      html += `</td>`;
      html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
      html += `<p style="margin:0;font-size:9pt;color:#888888;font-family:${FONT_BODY};font-style:italic;">${formatDateRange(exp.startDate, exp.endDate, exp.current, t.labels.present, locale)}</p>`;
      html += `</td>`;
      html += `</tr></table>`;
      if (exp.description) {
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 8px 0;font-family:${FONT_BODY};">${formatDescription(exp.description)}</p>`;
      }
    }
  }
  if (data.education?.length) {
    html += sectionHeader6(t.sections.education, primary);
    for (const edu of data.education) {
      html += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">`;
      html += `<tr>`;
      html += `<td style="vertical-align:top;">`;
      html += `<p style="margin:0;font-size:11pt;font-weight:bold;color:#222222;font-family:${FONT_HEADING};">${escapeHtml(edu.school)}</p>`;
      html += `<p style="margin:0;font-size:10pt;color:#555555;font-family:${FONT_BODY};">${escapeHtml(edu.degree)}</p>`;
      html += `</td>`;
      html += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:140px;">`;
      html += `<p style="margin:0;font-size:9pt;color:#888888;font-family:${FONT_BODY};font-style:italic;">${formatDateRange(edu.startDate, edu.endDate, edu.current, t.labels.present, locale)}</p>`;
      html += `</td>`;
      html += `</tr></table>`;
      if (edu.description) {
        html += `<p style="font-size:10pt;color:#444444;margin:0 0 6px 0;font-family:${FONT_BODY};">${formatDescription(edu.description)}</p>`;
      }
    }
  }
  if (data.skills?.length) {
    html += sectionHeader6(t.sections.skills, primary);
    html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;font-family:${FONT_BODY};">${renderSkillsList(data.skills, "inline")}</p>`;
  }
  if (data.languages?.length) {
    html += sectionHeader6(t.sections.languages, primary);
    html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;font-family:${FONT_BODY};">`;
    html += data.languages.map((l) => `${escapeHtml(l.name)} (${getLanguageProficiencyText(l.proficiency)})`).join(", ");
    html += `</p>`;
  }
  if (data.certifications?.length) {
    html += sectionHeader6(t.sections.certifications, primary);
    for (const cert of data.certifications) {
      html += `<p style="margin:0 0 4px 0;font-size:10pt;font-family:${FONT_BODY};"><strong>${escapeHtml(cert.name)}</strong> \u2014 ${escapeHtml(cert.issuer)}${cert.date ? ", " + escapeHtml(cert.date) : ""}</p>`;
    }
    html += `<br />`;
  }
  if (data.interests?.length) {
    html += sectionHeader6(t.sections.interests, primary);
    html += `<p style="font-size:10pt;color:#444444;margin:0 0 12px 0;font-family:${FONT_BODY};">${data.interests.map((i) => escapeHtml(i.name)).join(", ")}</p>`;
  }
  return html;
}
function sectionHeader6(title, color) {
  return `<p style="margin:12px 0 6px 0;font-size:13pt;font-weight:bold;color:${color};border-bottom:1px solid ${color};padding-bottom:3px;font-family:'Georgia','Times New Roman',serif;letter-spacing:0.5px;">${escapeHtml(title)}</p>`;
}

// backend/src/templates/gdocs/gdocs-compact.ts
var FONT3 = "'Arial', sans-serif";
function renderGdocsCompact(data, theme, translations, locale) {
  const t = getTranslations(translations);
  const pi = data.personalInfo;
  const primary = theme.primary || "#0d7377";
  const sidebarBg = "#f0fafa";
  const sidebarText = "#1a3a3a";
  let sidebar = "";
  let main = "";
  if (pi.profileImage) {
    sidebar += `<div style="text-align:center;margin-bottom:10px;">`;
    sidebar += renderProfileImage(pi.profileImage, 70, pi.imageShape || "circle");
    sidebar += `</div>`;
  }
  sidebar += `<p style="margin:0 0 2px 0;font-size:13pt;font-weight:bold;color:${primary};text-align:center;font-family:${FONT3};">${escapeHtml(pi.fullName)}</p>`;
  if (pi.jobTitle) {
    sidebar += `<p style="margin:0 0 10px 0;font-size:8pt;color:#666666;text-align:center;font-family:${FONT3};">${escapeHtml(pi.jobTitle)}</p>`;
  }
  sidebar += sidebarSectionHeader2(t.sections.contact, primary);
  if (pi.email) sidebar += `<p style="margin:0 0 3px 0;font-size:8pt;color:${sidebarText};font-family:${FONT3};">&#9993; ${escapeHtml(pi.email)}</p>`;
  if (pi.phone) sidebar += `<p style="margin:0 0 3px 0;font-size:8pt;color:${sidebarText};font-family:${FONT3};">&#9742; ${escapeHtml(pi.phone)}</p>`;
  if (pi.location) sidebar += `<p style="margin:0 0 3px 0;font-size:8pt;color:${sidebarText};font-family:${FONT3};">&#9679; ${escapeHtml(pi.location)}</p>`;
  if (pi.website) sidebar += `<p style="margin:0 0 3px 0;font-size:8pt;color:${sidebarText};font-family:${FONT3};">&#9741; ${escapeHtml(pi.website)}</p>`;
  if (pi.linkedin) sidebar += `<p style="margin:0 0 3px 0;font-size:8pt;color:${sidebarText};font-family:${FONT3};">in ${escapeHtml(pi.linkedin)}</p>`;
  sidebar += `<br />`;
  if (data.skills?.length) {
    sidebar += sidebarSectionHeader2(t.sections.skills, primary);
    sidebar += `<ul style="margin:0 0 6px 0;padding-left:14px;">`;
    for (const skill of data.skills) {
      sidebar += `<li style="margin:0 0 1px 0;font-size:8pt;color:${sidebarText};font-family:${FONT3};">${escapeHtml(skill.name)}</li>`;
    }
    sidebar += `</ul>`;
  }
  if (data.languages?.length) {
    sidebar += sidebarSectionHeader2(t.sections.languages, primary);
    for (const lang of data.languages) {
      sidebar += `<p style="margin:0 0 2px 0;font-size:8pt;color:${sidebarText};font-family:${FONT3};">${escapeHtml(lang.name)} \u2014 ${getLanguageProficiencyText(lang.proficiency)}</p>`;
    }
    sidebar += `<br />`;
  }
  if (data.interests?.length) {
    sidebar += sidebarSectionHeader2(t.sections.interests, primary);
    for (const interest of data.interests) {
      sidebar += `<p style="margin:0 0 1px 0;font-size:8pt;color:${sidebarText};font-family:${FONT3};">&#8226; ${escapeHtml(interest.name)}</p>`;
    }
  }
  if (pi.summary) {
    main += mainSectionHeader2(t.sections.summary, primary);
    main += `<p style="font-size:9pt;color:#444444;margin:0 0 10px 0;font-family:${FONT3};line-height:1.5;">${formatDescription(pi.summary)}</p>`;
  }
  if (data.experience?.length) {
    main += mainSectionHeader2(t.sections.workExperience, primary);
    for (const exp of data.experience) {
      main += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">`;
      main += `<tr>`;
      main += `<td style="vertical-align:top;">`;
      main += `<p style="margin:0;font-size:10pt;font-weight:bold;color:#222222;font-family:${FONT3};">${escapeHtml(exp.title)}</p>`;
      main += `<p style="margin:0 0 2px 0;font-size:9pt;color:${primary};font-family:${FONT3};">${escapeHtml(exp.company)}${exp.city ? ", " + escapeHtml(exp.city) : ""}</p>`;
      main += `</td>`;
      main += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:120px;">`;
      main += `<p style="margin:0;font-size:8pt;color:#999999;font-family:${FONT3};">${formatDateRange(exp.startDate, exp.endDate, exp.current, t.labels.present, locale)}</p>`;
      main += `</td>`;
      main += `</tr></table>`;
      if (exp.description) {
        main += `<p style="font-size:9pt;color:#444444;margin:0 0 6px 0;font-family:${FONT3};">${formatDescription(exp.description)}</p>`;
      }
    }
  }
  if (data.education?.length) {
    main += mainSectionHeader2(t.sections.education, primary);
    for (const edu of data.education) {
      main += `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:6px;">`;
      main += `<tr>`;
      main += `<td style="vertical-align:top;">`;
      main += `<p style="margin:0;font-size:10pt;font-weight:bold;color:#222222;font-family:${FONT3};">${escapeHtml(edu.school)}</p>`;
      main += `<p style="margin:0;font-size:9pt;color:#555555;font-family:${FONT3};">${escapeHtml(edu.degree)}</p>`;
      main += `</td>`;
      main += `<td style="vertical-align:top;text-align:right;white-space:nowrap;width:120px;">`;
      main += `<p style="margin:0;font-size:8pt;color:#999999;font-family:${FONT3};">${formatDateRange(edu.startDate, edu.endDate, edu.current, t.labels.present, locale)}</p>`;
      main += `</td>`;
      main += `</tr></table>`;
      if (edu.description) {
        main += `<p style="font-size:9pt;color:#444444;margin:0 0 5px 0;font-family:${FONT3};">${formatDescription(edu.description)}</p>`;
      }
    }
  }
  if (data.certifications?.length) {
    main += mainSectionHeader2(t.sections.certifications, primary);
    for (const cert of data.certifications) {
      main += `<p style="margin:0 0 3px 0;font-size:9pt;font-family:${FONT3};"><strong>${escapeHtml(cert.name)}</strong> \u2014 ${escapeHtml(cert.issuer)}${cert.date ? ", " + escapeHtml(cert.date) : ""}</p>`;
    }
    main += `<br />`;
  }
  if (data.awards?.length) {
    main += mainSectionHeader2(t.sections.awards, primary);
    for (const award of data.awards) {
      main += `<p style="margin:0 0 3px 0;font-size:9pt;font-family:${FONT3};"><strong>${escapeHtml(award.title)}</strong> \u2014 ${escapeHtml(award.issuer)}${award.date ? ", " + escapeHtml(award.date) : ""}</p>`;
    }
  }
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="min-height:800px;">
<tr>
    <td width="30%" style="vertical-align:top;background-color:${sidebarBg};padding:16px 12px;color:${sidebarText};">
        ${sidebar}
    </td>
    <td width="70%" style="vertical-align:top;padding:16px 16px;">
        ${main}
    </td>
</tr>
</table>`;
}
function sidebarSectionHeader2(title, color) {
  return `<p style="margin:6px 0 4px 0;font-size:9pt;font-weight:bold;color:${color};text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid ${color};padding-bottom:2px;font-family:'Arial',sans-serif;">${title}</p>`;
}
function mainSectionHeader2(title, color) {
  return `<p style="margin:8px 0 5px 0;font-size:11pt;font-weight:bold;color:${color};border-bottom:1px solid ${color};padding-bottom:2px;text-transform:uppercase;letter-spacing:1px;font-family:'Arial',sans-serif;">${title}</p>`;
}

// backend/src/templates/docx/index.ts
var docxTemplates = {
  // Microsoft Word templates
  "docx-classic": renderDocxClassic,
  "docx-sidebar": renderDocxSidebar,
  "docx-header": renderDocxHeader,
  "docx-minimal": renderDocxMinimal,
  // Google Docs templates (same .docx output, Google Docs-optimized styling)
  "gdocs-clean": renderGdocsClean,
  "gdocs-coral": renderGdocsCoral,
  "gdocs-elegant": renderGdocsElegant,
  "gdocs-compact": renderGdocsCompact
};
function getDocxTemplateRenderer(templateId) {
  const renderer = docxTemplates[templateId];
  if (!renderer) {
    docx_logger_stub_default.warn({ templateId }, "DOCX template not found, falling back to docx-classic");
    return renderDocxClassic;
  }
  return renderer;
}

// scripts/docx-bundle-entry.ts
function renderDocxHtml(data, templateId, theme, translations, locale = "en") {
  const renderTemplate = getDocxTemplateRenderer(templateId);
  const t = getTranslations(translations);
  const templateHtml = renderTemplate(data, theme, t, locale);
  return wrapDocxHtml(templateHtml);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  renderDocxHtml
});
