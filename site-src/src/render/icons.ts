// Line icons for the menu, tiles, and government pages. 24px grid, drawn with currentColor.

const svg = (d: string) =>
  `<svg class="gi" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

export const GI = {
  money: svg('<circle cx="12" cy="12" r="8.5"/><path d="M14.8 9.2c-.5-1-1.6-1.6-2.8-1.6-1.6 0-2.8.9-2.8 2.1 0 2.9 5.8 1.6 5.8 4.5 0 1.2-1.2 2.2-3 2.2-1.3 0-2.5-.6-3-1.7M12 6v1.6M12 16.4V18"/>'),
  debt: svg('<ellipse cx="9" cy="6.5" rx="5.5" ry="2.3"/><path d="M3.5 6.5v4c0 1.3 2.5 2.3 5.5 2.3s5.5-1 5.5-2.3v-4M3.5 10.5v4c0 1.3 2.5 2.3 5.5 2.3"/><path d="M15 14h6M15 17.5h6M15 21h6M18 11.5v2.5"/>'),
  taxes: svg('<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M9.5 16.5l5-5"/><circle cx="10" cy="12" r=".9"/><circle cx="14" cy="16" r=".9"/>'),
  budget: svg('<path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5H12Z"/><path d="M15 3.9a8.5 8.5 0 0 1 5.1 5.1H15Z"/>'),
  school: svg('<path d="M2.5 9 12 4.5 21.5 9 12 13.5Z"/><path d="M6.5 11v4.5c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3V11M21.5 9v5"/>'),
  sales: svg('<path d="M6 3.5h12v17l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4-2 1.4Z"/><path d="M9 8h6M9 11.5h6M9 15h3.5"/>'),
  server: svg('<rect x="4" y="3.5" width="16" height="6" rx="1.5"/><rect x="4" y="14.5" width="16" height="6" rx="1.5"/><path d="M7.5 6.5h.01M7.5 17.5h.01M11 6.5h5M11 17.5h5M12 9.5v5"/>'),
  camera: svg('<path d="M3.5 7.5 15 4l2.5 6-11.5 3.5Z"/><path d="m17.5 10 3-1M8.5 12.6 10 17H5.5M5.5 14.5v5"/>'),
  bond: svg('<path d="M4 20.5V9l8-5 8 5v11.5"/><path d="M8 20.5v-6h8v6M2.5 20.5h19M10 10.5h4"/>'),
  question: svg('<path d="M4 5.5A2 2 0 0 1 6 3.5h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6l-4.5 3.8V16.5H6a2 2 0 0 1-2-2Z"/><path d="M9.8 8.2a2.3 2.3 0 0 1 4.4.8c0 1.6-2.2 1.9-2.2 3.2M12 14.3h.01"/>'),
  city: svg('<path d="M3.5 20.5h17M5 20.5V10l5-3v13.5M10 20.5V4.5l6 3v13"/><path d="M16 11h3.5v9.5M7 12.5h1M7 15.5h1M12.5 9.5h1M12.5 12.5h1M12.5 15.5h1"/>'),
  county: svg('<path d="M3 20.5h18M4.5 9.5h15L12 4.5Z"/><path d="M6.5 9.5v8M10 9.5v8M14 9.5v8M17.5 9.5v8M4.5 17.5h15"/>'),
  isd: svg('<path d="M3 20.5h18M5 20.5v-9l7-4.5 7 4.5v9"/><path d="M12 6V3.5h3M10 20.5v-4h4v4M8 13h1.5M14.5 13H16"/>'),
  appraisal: svg('<path d="M3.5 11 10 5.5l6.5 5.5"/><path d="M5.5 9.5V19h6"/><circle cx="16.5" cy="15.5" r="3"/><path d="m18.7 17.7 2.3 2.3"/>'),
  devcorp: svg('<path d="M3.5 19.5h17"/><path d="M5 16l4.5-4.5 3 3L19 8"/><path d="M15 8h4v4"/>'),
  reports: svg('<path d="M6 3.5h8l4 4v13H6Z"/><path d="M14 3.5v4h4M9 12h6M9 15.5h6"/>'),
  about: svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8h.01"/>'),
  issues: svg('<path d="M5.5 20.5V4M5.5 4.5h11l-2 3.5 2 3.5h-11"/>'),
  alert: svg('<path d="M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 2H5Z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>'),
  home: svg('<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5M10 20v-5h4v5"/>'),
  key: svg('<circle cx="8" cy="15" r="4"/><path d="m11 12 8.5-8.5M16 7l2.5 2.5M14 9l2 2"/>'),
  store: svg('<path d="M4 9.5 5.5 4h13L20 9.5M4 9.5h16v1a2.7 2.7 0 0 1-5.3 0 2.7 2.7 0 0 1-5.4 0 2.7 2.7 0 0 1-5.3 0Z"/><path d="M5.5 12.5V20h13v-7.5M10 20v-4.5h4V20"/>'),
  buildings: svg('<path d="M3 20.5h18M5 20.5V8h6v12.5M11 20.5V4h8v16.5"/><path d="M7.5 11h1M7.5 14h1M7.5 17h1M14 7.5h2M14 10.5h2M14 13.5h2M14 16.5h2"/>'),
  map: svg('<path d="M9 4.5 3.5 6.5v13L9 17.5l6 2 5.5-2v-13L15 6.5Z"/><path d="M9 4.5v13M15 6.5v13"/>'),
  ring: svg('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>'),
  doc: svg('<path d="M6 3.5h8l4 4v13H6Z"/><path d="M14 3.5v4h4M9 12h6M9 15.5h4"/>'),
  phone: svg('<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M10.5 18.5h3"/><path d="M9.5 8h5M9.5 11h3"/>'),
  calendar: svg('<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4M8 13.5h3v3H8Z"/>'),
  chart: svg('<path d="M4 4v16h16"/><path d="M7.5 15l3.5-4 3 2.5L19 8"/>'),
  shield: svg('<path d="M12 3.5 5 6.2v5.3c0 4.3 3 7.6 7 9 4-1.4 7-4.7 7-9V6.2Z"/><path d="m9 12 2.2 2.2L15.5 10"/>'),
  stack: svg('<path d="m12 3.5 8.5 4.5L12 12.5 3.5 8Z"/><path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5"/>'),
  heart: svg('<path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z"/>'),
};

export type IconName = keyof typeof GI;
