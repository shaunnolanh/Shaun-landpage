// English copy (primary language). Every key here must also exist in es.ts.
// Anything marked "TO CONFIRM" comes from the brief and must be checked with the artist before launch.

export const en = {
  meta: {
    title: 'Shaun Nolanh — Progressive house producer & DJ',
    description:
      'Progressive house producer and DJ from Córdoba, Argentina. Music, Radio Silence sets, booking and collaborations.',
    ogImageAlt: 'Black-and-white portrait of Shaun Nolanh, with his name and the genres he plays.',
  },
  skipLink: 'Skip to content',
  // Visible markers for data that isn't confirmed yet (`null` in src/data). Shown with the .pending style.
  pending: {
    release: '[RELEASE PENDING]',
    artists: '[ARTISTS PENDING]',
    label: '[LABEL]',
    year: '[YEAR]',
    embed: '[EMBED PENDING]',
    email: '[EMAIL PENDING]',
    pressKit: '[PDF PENDING]',
    spotify: '[SPOTIFY PENDING]',
    form: '[FORM PENDING: PUBLIC_WEB3FORMS_KEY missing]',
  },
  nav: {
    label: 'Main',
    about: 'About',
    music: 'Music',
    radioSilence: 'Radio Silence',
    contact: 'Contact',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    language: 'Language',
  },
  hero: {
    tagline: 'Progressive House · Deep House · Organic House',
    book: 'Book now',
    photoAlt: 'Shaun Nolanh looking up, in black and white.',
  },
  dialog: {
    close: 'Close',
  },
  music: {
    title: 'Music',
    lead: "Swipe through the releases. Remixes and what's next below.",
    releases: 'Remixes & Coming soon',
    remix: 'Remix',
    upcoming: 'Upcoming',
    onBeatport: 'on Beatport',
    carousel: 'Releases',
    select: 'Select',
    prev: 'Previous release',
    next: 'Next release',
    types: { single: 'Single', EP: 'EP', album: 'Album' },
    ownTracks: "Shaun's tracks on this release",
    coverOf: 'Cover of',
    listenOnSpotify: 'Listen on Spotify',
    buyOnBeatport: 'Buy on Beatport',
    previewNote: "Without a Spotify login in this browser, you'll hear a 30-second preview.",
    onSpotify: 'on Spotify',
    allOnBeatport: 'All tracks on Beatport',
  },
  embed: {
    play: 'Play',
    loadNotice: 'Loads the player from',
  },
  sets: {
    title: 'Radio Silence',
    lead: 'When the signal drops, something else starts talking. A slow descent into deep, no rush, no noise.',
  },
  about: {
    title: 'About',
    // Texts from the team (2026-10-28): short version and full bio.
    short:
      'Progressive house producer and DJ based in Argentina. A graduate Sound Engineer (La Metro, 2021), with releases on 3rd Avenue, BBop Music, Mustache Crew Records, and DUBLUCID. Supported by global scene leaders, currently working on new music and official remixes.',
    photoAlt: 'Portrait of Shaun Nolanh in front of a flowering vine, in black and white.',
    long: [
      'Shaun Nolanh is a progressive house producer and DJ based in La Falda, Córdoba, Argentina. Originally from the iconic tourist city of Villa Carlos Paz, he immersed himself in the electronic music scene from a young age, attending shows by artists like Nick Warren and Guy J, and trying to recreate at home what moved him so deeply.',
      'This passion led him to study sound at the La Metro School of Design and Audiovisual Communication, where he graduated as a Higher Technician in Sound in 2021. Since his 2025 debut on 3rd Avenue with Three of a Kind #033, he has collaborated with labels such as BBop Music, Mustache Crew Records, and DUBLUCID —releasing his latest EP, Hibiki, through the latter— as well as crafting an official remix of “Paul’s Tape” by Valentín Ciancio.',
      'Alongside Stan Seba, he produced the EPs Chrome Butterflies and Case 701, earning support from Gai Barone, who featured their singles on his Patterns podcast. He is currently collaborating with Praneeth.D and working on upcoming official remixes for 3rd Avenue and Future Avenue.',
    ],
  },
  booking: {
    title: 'Booking',
    lead: 'For club dates, festivals and showcases. Download the press kit or send the details of your event.',
    pressKit: 'Download press kit',
    /** What the zip has and its size: update it when the zip in public/press-kit/ changes */
    pressKitContents: 'PDF + photos · 9.4 MB',
    pressKitPending: 'Press kit',
    emailSubject: 'Booking — Shaun Nolanh',
  },
  contact: {
    title: 'Contact',
    bookingLabel: 'Bookings & Info',
    requestDate: 'Request a date',
  },
  collabs: {
    title: 'Collabs',
    lead: 'Producer with an idea for a collab or a remix? Send a link to your music and tell me what you have in mind.',
  },
  form: {
    name: 'Name',
    email: 'Email',
    date: 'Event date',
    venue: 'Venue & city',
    message: 'Message',
    musicLink: 'Link to your music',
    proposal: 'Your proposal',
    sendBooking: 'Send request',
    sendCollab: 'Send proposal',
    sending: 'Sending…',
    success: 'Thanks! Your message was sent. I’ll get back to you soon.',
    error: 'Something went wrong. Please try again or write by email.',
    subjectBooking: 'New booking request — shaunnolanh site',
    subjectCollab: 'New collab proposal — shaunnolanh site',
  },
  notFound: {
    title: 'The light went out here.',
    text: "This page doesn't exist, or it burned out.",
    cta: 'Back to the start',
  },
  footer: {
    social: 'Social',
    rights: 'All rights reserved.',
  },
};

export type Dictionary = typeof en;
