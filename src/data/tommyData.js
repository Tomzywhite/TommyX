export const tommyData = {
  profile: {
    name: "Adejuwon Akintomide Samuel",
    alias: "Tommy",
    handle: "@Tommy_MetaX",
    avatar: "/images/profile.jpg",
    age: 19,
    role: "QA Engineer & Front-End Developer",
    location: "Lagos, Nigeria",
    coordinates: "6.5244° N, 3.3792° E",
    timezone: "WAT (GMT+1)",
    status: "CRUSHING BUGS & SHIPPING RESILIENT INTERFACES",
    bio: "19-year-old QA Engineer and front-end developer based in Lagos. I don't just build web interfaces — I stress-test their boundaries until they bend or break. Obsessed with high-performance frontends, rigorous test automation, and building software that survives the unpredictable chaos of the real world.",
    stats: [
      { label: "Bugs Triaged & Smashed", value: "840+" },
      { label: "Automated Test Coverage", value: "98.4%" },
      { label: "Lighthouse Performance Avg", value: "99/100" },
      { label: "Late Night Commit Streaks", value: "340+ Days" }
    ],
    socials: {
      github: "https://github.com",
      twitter: "https://x.com/Tommy_MetaX",
      instagram: "https://instagram.com/Tommy_MetaX",
      linkedin: "https://www.linkedin.com/in/thetomide/",
      email: "adejuwonakintomide@gmail.com"
    },
    contactConfig: {
      provider: "web3forms",
      web3FormsAccessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "",
      formspreeId: import.meta.env.VITE_FORMSPREE_ID || "",
    }
  },

  skills: {
    qaAndTesting: [
      { name: "Cypress / Playwright", level: 96, category: "Automation" },
      { name: "Jest / Vitest", level: 92, category: "Unit & Integration" },
      { name: "API Stress & Load Testing (k6 / Postman)", level: 88, category: "Performance" },
      { name: "Cross-Browser & Device Matrix", level: 95, category: "Manual / Exploratory" },
      { name: "CI/CD Pipeline Quality Gates (GitHub Actions)", level: 90, category: "DevOps" },
      { name: "Accessibility (a11y) & WCAG 2.1", level: 89, category: "Compliance" }
    ],
    frontendEngineering: [
      { name: "React 19 / Next.js", level: 94, category: "Frameworks" },
      { name: "TypeScript / Modern JavaScript", level: 92, category: "Languages" },
      { name: "Tailwind CSS & Design Systems", level: 97, category: "Styling" },
      { name: "Framer Motion & Micro-Interactions", level: 90, category: "Animations" },
      { name: "State Architecture (Zustand / Redux)", level: 91, category: "State" },
      { name: "Web Audio & Canvas Graphics", level: 85, category: "Creative Tech" }
    ]
  },

  projects: [
    {
      id: "project-pulse",
      title: "PulseQA: Chaos & Flaky Test Sentinel",
      tagline: "Intelligent flakiness detector & regression harness for modern CI/CD",
      category: "QA Engineering",
      role: "Lead Architect & QA",
      metrics: "99.8% Test Reliability, 4x Faster Triage",
      description: "A continuous testing suite that intentionally injects network latency, race conditions, and corrupted payloads into client state to detect flaky UI bugs before they hit staging.",
      stack: ["Playwright", "TypeScript", "Docker", "GitHub Actions", "Node.js"],
      previewTag: "TEST HARNESS",
      color: "green",
      features: [
        "Automated visual regression diffing with 0.05% pixel variance sensitivity",
        "Deterministic chaos injection for asynchronous API payloads",
        "Automated bug ticket generation with full trace artifacts and video replays"
      ]
    },
    {
      id: "project-danfo",
      title: "EkoTransit: Lagos Route Visualizer",
      tagline: "High-contrast, resilient navigation UI engineered for high-latency mobile networks",
      category: "Front-End",
      role: "Sole Creator",
      metrics: "Sub-100ms TTI on 3G Networks, 100% Offline-first",
      description: "An intuitive transit dashboard mapping popular Danfo bus corridors and ferry routes in Lagos, featuring offline-first local storage caching and responsive vector routes.",
      stack: ["React", "Tailwind CSS", "IndexedDB", "Service Workers", "Framer Motion"],
      previewTag: "GEO INTERFACE",
      color: "orange",
      features: [
        "Custom SVG canvas route rendering optimized for low-spec Android devices",
        "Adaptive network throttle awareness: falls back to raw text if connection drops",
        "Haptic vibration cues for station alerts via Web Vibration API"
      ]
    },
    {
      id: "project-fintech",
      title: "ApexPay Checkout SDK & Test Bench",
      tagline: "Hardened payment modal with synthetic stress test simulator",
      category: "Full Stack & QA",
      role: "QA / Frontend Dev",
      metrics: "Zero Payment Drop-off on Edge Cases, 100% WCAG AAA",
      description: "An embeddable payment collection widget built with bank-grade security assertions, fuzz-tested against 5,000+ malformed card inputs and intermittent bank webhooks.",
      stack: ["React", "TypeScript", "Jest", "Tailwind CSS", "Cypress"],
      previewTag: "FINTECH SDK",
      color: "purple",
      features: [
        "Fuzzing engine simulating bank timeout cascades and dual-charge prevention",
        "Ultra-smooth card flip micro-interactions with hardware-accelerated CSS",
        "Instant currency conversions (NGN / USD / GBP / KES)"
      ]
    },
    {
      id: "project-aegis",
      title: "Aegis: Web Accessibility Auditor",
      tagline: "Automated browser extension catching contrast, focus traps, and screen reader bugs",
      category: "DevTool",
      role: "Creator",
      metrics: "Caught 120+ a11y violations across top African web apps",
      description: "A lightweight developer tool that overlays real-time accessibility heatmaps onto any live DOM, highlighting focus order traps and missing ARIA descriptors.",
      stack: ["JavaScript", "Chrome Extension API", "CSS Custom Props", "Vite"],
      previewTag: "A11Y TOOL",
      color: "green",
      features: [
        "Visual keyboard tab-navigation flow tracker with directional arrows",
        "Simulated color blindness filters (Protanopia, Deuteranopia, Tritanopia)",
        "One-click audit export formatted as markdown for GitHub issues"
      ]
    }
  ],

  zineArticles: [
    {
      id: "zine-1",
      slug: "breaking-things-for-a-living",
      title: "BREAKING THINGS FOR A LIVING",
      subtitle: "The Psychology of a 19-Year-Old QA Engineer",
      date: "SEPTEMBER 2026",
      readTime: "4 MIN READ",
      category: "QA PHILOSOPHY",
      tag: "MUST READ",
      accent: "green",
      snippet: "Most people view testing as the boring safety checkpoint before shipping. I view it as creative destruction. If you don't aggressively attempt to annihilate your own software, the real world will do it in front of paying users.",
      paragraphs: [
        "In software development, there is a natural human bias toward optimism: we write a component, test the happy path with 'John Doe' and an email like 'test@gmail.com', watch the button turn green, and conclude our job is done.",
        "That optimism is a vulnerability. The real world is not 'John Doe'. The real world is a user in a moving Danfo bus with one bar of 3G, rapidly spamming the checkout button four times because the network stalled, with an account balance in kobo with 14 decimal places.",
        "As a QA engineer, my mindset is adversarial empathy. I love the product enough to put on brass knuckles and push every boundary condition until the seams rip. Finding a critical race condition at 1:30 AM before it touches production isn't work — it's an adrenaline rush."
      ],
      quote: "Software isn't verified when it works once. It's verified when it cannot be made to fail under total chaos."
    },
    {
      id: "zine-2",
      slug: "the-300ms-ping-reality",
      title: "THE 300MS PING REALITY",
      subtitle: "Engineering Resilient Frontends from Lagos",
      date: "AUGUST 2026",
      readTime: "5 MIN READ",
      category: "FRONTEND & INFRA",
      tag: "LAGOS TECH",
      accent: "orange",
      snippet: "Silicon Valley builds websites on 1Gbps fiber optics on $3,500 M3 Max MacBooks. Lagos teaches you what happens when the connection drops mid-fetch and the user's phone has 2GB of RAM.",
      paragraphs: [
        "There is no better finishing school for a front-end developer than Lagos, Nigeria. When your daily reality involves power fluctuations, erratic broadband, and devices running older Chromium webviews, your architecture changes dramatically.",
        "You stop bloating bundles with 500KB npm dependencies. You stop relying on unhandled promises. You design optimistic UI updates with deterministic rollbacks. You make offline-first caching second nature instead of an afterthought.",
        "Building from Lagos has made my frontends bulletproof. If an application runs buttery smooth here under real-world constraints, it will fly anywhere else on Earth."
      ],
      quote: "If your app breaks when the network drops for 400 milliseconds, you didn't build software — you built a house of cards."
    },
    {
      id: "zine-3",
      slug: "midnight-throttle-motorcycles",
      title: "MIDNIGHT THROTTLE: TWO WHEELS & EDGE CASES",
      subtitle: "What Motorcycling Taught Me About Speed and Precision",
      date: "JULY 2026",
      readTime: "3 MIN READ",
      category: "LIFESTYLE / SPEED",
      tag: "ADRENALINE",
      accent: "purple",
      snippet: "On a motorcycle, there is no room for an uncaught exception. A patch of gravel or an unlit truck on Third Mainland Bridge demands the exact same hyper-awareness as hunting a zero-day exploit.",
      paragraphs: [
        "People ask why a software engineer who spends 12 hours a day staring at code would spend his nights riding a motorcycle through Lagos. The answer is simple: hyper-focus.",
        "When you're leaning into a turn at speed, every distraction dissolves. Your brain switches to real-time telemetry processing: tire grip, road camber, peripheral movement, brake threshold. One millimeter of throttle input makes the difference between fluid rhythm and disaster.",
        "Riding has made me a better engineer. It destroyed my tolerance for sloppy assumptions. Both in the saddle and in the codebase: respect the physics, verify your brakes before you hit top speed, and never assume the road ahead is clear."
      ],
      quote: "Speed without control is just a spectacular crash waiting for a time and place."
    },
    {
      id: "zine-4",
      slug: "the-art-of-progressive-overload",
      title: "IRON & AUTOMATION",
      subtitle: "Why Weightlifting Mirrors Quality Assurance",
      date: "JUNE 2026",
      readTime: "3 MIN READ",
      category: "FITNESS / DISCIPLINE",
      tag: "DISCIPLINE",
      accent: "green",
      snippet: "Progressive overload in the gym is identical to automated regression testing: you don't get stronger by hoping; you get stronger through measurable, repeatable, relentless iterations.",
      paragraphs: [
        "The gym at 6:00 AM doesn't care about your mood. The barbell is an objective truth machine. If you attempt 120kg without the tendon conditioning and form consistency, it will crush you.",
        "Software testing is the exact same discipline. You cannot 'feel' that a codebase is stable. You need the automated barbell — test suites running on every pull request, measuring latency, tracking memory leaks, asserting invariants.",
        "Discipline isn't born from motivation; it is built through structural systems. I treat my body and my code with the exact same rigor: test the limits, repair the damage, rebuild stronger."
      ],
      quote: "Consistency is the only metric that doesn't lie."
    }
  ],

  voidThoughts: [
    {
      id: "thought-1",
      title: "Third Mainland Bridge at 02:30 AM",
      category: "Speed & Solitude",
      time: "02:34 AM",
      coords: "6.4950° N, 3.3900° E",
      text: "Lagos is the loudest city in Africa, but at 2:30 AM on Third Mainland Bridge, with the lagoon breeze hitting your helmet and the city skyline glowing in muted amber, everything goes completely silent. Just you, the tachometer, and the open road. It's where I solve my hardest architectural problems.",
      accent: "#f97316"
    },
    {
      id: "thought-2",
      title: "The 19-Year-Old Paradox",
      category: "Ambition",
      time: "03:12 AM",
      coords: "6.5244° N, 3.3792° E",
      text: "Being 19 in global tech means people either underestimate you or expect you to be a novelty. I don't want to be judged by my age. I want to be judged by whether the system held up when 100,000 requests hit simultaneously. Competence has no birth year.",
      accent: "#00ff88"
    },
    {
      id: "thought-3",
      title: "The Unforgiving Barbell",
      category: "Iron",
      time: "01:45 AM",
      coords: "Gym Vault, Yaba",
      text: "Whenever code feels frustrating and a bug won't reproduce, I load the bar. Iron never gaslights you. It doesn't have race conditions or silent dependencies. You either lift it or you don't. That clarity keeps me grounded.",
      accent: "#7c3aed"
    },
    {
      id: "thought-4",
      title: "Building from the Edge",
      category: "Philosophy",
      time: "04:10 AM",
      coords: "Lagos Tech Corridor",
      text: "The internet gave an entire generation of African builders a direct pipeline to the global frontier. We aren't waiting for permission. We write the tests, build the UI, optimize the bundle, and ship to the world while the city sleeps.",
      accent: "#06b6d4"
    },
    {
      id: "thought-5",
      title: "Why Zero Bugs is a Myth",
      category: "Engineering",
      time: "02:00 AM",
      coords: "Terminal Workspace",
      text: "A complex system with zero bugs is either trivial or untested. Excellence in QA isn't pretending bugs don't exist; it's understanding failure modes so deeply that when something goes wrong, the system degrades with grace and dignity.",
      accent: "#00ff88"
    }
  ],

  musicTracks: [
    {
      id: "faouzia-1",
      title: "RIP, Love",
      artist: "Faouzia",
      album: "CITIZEN",
      duration: "02:54",
      genre: "Pop / Moroccan Fusion",
      bpm: "116 BPM",
      vibe: "Arabic vocal trills, hypnotic bass rhythm & operatic belts",
      lyricsSnippet: "R.I.P. to the love you felt, bury it beneath the ground...",
      audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/96/46/3e/96463ec6-9020-653b-0d76-87b490055108/mzaf_9008497658523900561.plus.aac.p.m4a",
      artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/c6/37/4a/c6374af0-d2c5-c34b-8ebf-6f4cb2b68ce5/075679749628.jpg/300x300bb.jpg",
      localFile: "/music/rip_love.mp3",
      spotifyUrl: "https://open.spotify.com/artist/0e86yPdV4BceGERgNaCwRJ"
    },
    {
      id: "faouzia-2",
      title: "Tears of Gold",
      artist: "Faouzia",
      album: "Stripped",
      duration: "03:00",
      genre: "Power Pop / Soul",
      bpm: "128 BPM",
      vibe: "Thunderous percussion, dramatic strings & breathtaking high notes",
      lyricsSnippet: "I poured my heart out, gave you tears of gold...",
      audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/7f/77/40/7f774019-5795-d351-d0fc-3b2b9d893eb3/mzaf_8300993861894696866.plus.aac.p.m4a",
      artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/37/df/90/37df90b3-4046-75bb-9efe-1e3d7302ad8b/075679833853.jpg/300x300bb.jpg",
      localFile: "/music/tears_of_gold.mp3",
      spotifyUrl: "https://open.spotify.com/artist/0e86yPdV4BceGERgNaCwRJ"
    },
    {
      id: "faouzia-3",
      title: "Minefields",
      artist: "Faouzia & John Legend",
      album: "Minefields Single",
      duration: "03:11",
      genre: "Cinematic Ballad",
      bpm: "76 BPM",
      vibe: "Emotional grand piano, delicate vocal harmonies, and explosive climax",
      lyricsSnippet: "Now I'm walking through a minefield just to get to you...",
      audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d5/02/0f/d5020f84-d2ae-adf4-ffa5-22fc6ffe5f8a/mzaf_9764248650561144096.plus.aac.p.m4a",
      artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/c6/37/4a/c6374af0-d2c5-c34b-8ebf-6f4cb2b68ce5/075679749628.jpg/300x300bb.jpg",
      localFile: "/music/minefields.mp3",
      spotifyUrl: "https://open.spotify.com/artist/0e86yPdV4BceGERgNaCwRJ"
    },
    {
      id: "faouzia-4",
      title: "HABIBI (MY LOVE)",
      artist: "Faouzia",
      album: "CITIZEN",
      duration: "02:44",
      genre: "Middle Eastern Pop",
      bpm: "122 BPM",
      vibe: "Infectious Moroccan percussion, synth basslines and Arabic runs",
      lyricsSnippet: "Habibi, you make my heart beat like a tambourine...",
      audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/2b/1a/9d/2b1a9d3c-2788-949d-550d-09f9e289dbed/mzaf_9561207214398649999.plus.aac.p.m4a",
      artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/49/31/51/4931513d-e927-a012-cfa0-573c8f5ee779/075679725622.jpg/300x300bb.jpg",
      localFile: "/music/habibi.mp3",
      spotifyUrl: "https://open.spotify.com/artist/0e86yPdV4BceGERgNaCwRJ"
    },
    {
      id: "faouzia-5",
      title: "You Don't Even Know Me",
      artist: "Faouzia",
      album: "Stripped",
      duration: "03:10",
      genre: "Dark Pop",
      bpm: "105 BPM",
      vibe: "Moody minor chords, fierce bass drop and unapologetic attitude",
      lyricsSnippet: "You don't even know me, but you talk like you own me...",
      audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/81/d0/c1/81d0c1b8-2e00-4001-129a-bfc533fdc954/mzaf_12053608928885711577.plus.aac.p.m4a",
      artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/58/41/df/5841df1c-6853-84a3-5785-cf3e2466a5c7/075679837103.jpg/300x300bb.jpg",
      localFile: "/music/you_dont_even_know_me.mp3",
      spotifyUrl: "https://open.spotify.com/artist/0e86yPdV4BceGERgNaCwRJ"
    },
    {
      id: "faouzia-6",
      title: "Born Without a Heart",
      artist: "Faouzia",
      album: "Single",
      duration: "03:48",
      genre: "Orchestral Ballad",
      bpm: "82 BPM",
      vibe: "Vulnerable grand piano exploring deep emotional resilience",
      lyricsSnippet: "Maybe I was born without a heart, didn't feel it fall apart...",
      audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/6e/51/08/6e51081e-8d84-f1e9-6cd6-1f3c7ecedc3a/mzaf_17567580137356591070.plus.aac.p.m4a",
      artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/2f/2a/88/2f2a88de-c20f-730c-0d6d-d2aee317ceab/075679850577.jpg/300x300bb.jpg",
      localFile: "/music/born_without_a_heart.mp3",
      spotifyUrl: "https://open.spotify.com/artist/0e86yPdV4BceGERgNaCwRJ"
    },
    {
      id: "faouzia-7",
      title: "Hero",
      artist: "Faouzia",
      album: "CITIZEN",
      duration: "02:51",
      genre: "Electro Pop Anthem",
      bpm: "130 BPM",
      vibe: "High-energy synth arpeggios, driving kick, empowering vocals",
      lyricsSnippet: "I don't need a hero to save me from the dark...",
      audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/2c/43/88/2c438807-e9bd-f1ab-28cc-0e4c215bd928/mzaf_6296491204991785817.plus.aac.p.m4a",
      artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/e7/2a/1f/e72a1fa2-295c-e689-cdeb-e8af702bef69/075679777393.jpg/300x300bb.jpg",
      localFile: "/music/hero.mp3",
      spotifyUrl: "https://open.spotify.com/artist/0e86yPdV4BceGERgNaCwRJ"
    },
    {
      id: "faouzia-8",
      title: "Puppet",
      artist: "Faouzia",
      album: "CITIZEN",
      duration: "02:55",
      genre: "Alt Pop",
      bpm: "118 BPM",
      vibe: "Edgy basslines, staccato strings and fierce vocal defiance",
      lyricsSnippet: "I'm not your puppet on a string, dance for nobody...",
      audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/83/79/37/837937f7-eb05-a15d-4671-8cf00d391625/mzaf_18031116828154265369.plus.aac.p.m4a",
      artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/c6/37/4a/c6374af0-d2c5-c34b-8ebf-6f4cb2b68ce5/075679749628.jpg/300x300bb.jpg",
      localFile: "/music/puppet.mp3",
      spotifyUrl: "https://open.spotify.com/artist/0e86yPdV4BceGERgNaCwRJ"
    },
    {
      id: "faouzia-9",
      title: "Unethical",
      artist: "Faouzia",
      album: "Single",
      duration: "02:48",
      genre: "Dark Pop / Cinematic",
      bpm: "112 BPM",
      vibe: "Menacing bassline, haunting melodies, and razor-sharp vocal delivery",
      lyricsSnippet: "Is it unethical to take your heart and never give it back...",
      audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ea/1e/6a/ea1e6a4a-10fb-6cb9-ff1f-277417b14f62/mzaf_9942791211849297892.plus.aac.p.m4a",
      artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/0e/1e/a3/0e1ea38e-d4fb-7cc0-3a0a-ce53c2cd6184/193436435017_IMG.jpg/300x300bb.jpg",
      localFile: "/music/unethical.mp3",
      spotifyUrl: "https://open.spotify.com/artist/0e86yPdV4BceGERgNaCwRJ"
    },
    {
      id: "faouzia-10",
      title: "Porcelain",
      artist: "Faouzia",
      album: "Single",
      duration: "03:15",
      genre: "Power Ballad / Alt Pop",
      bpm: "84 BPM",
      vibe: "Delicate acoustic layers building into an explosive defiant vocal climax",
      lyricsSnippet: "I'm not made of porcelain, you cannot shatter what was built from pain...",
      audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ab/bf/f2/abbff236-1539-a234-adb2-c5babfbd78a5/mzaf_8566779979964309078.plus.aac.p.m4a",
      artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/32/37/33/32373396-2431-d2f5-60db-de946bda49fc/5034644582207.jpg/300x300bb.jpg",
      localFile: "/music/porcelain.mp3",
      spotifyUrl: "https://open.spotify.com/artist/0e86yPdV4BceGERgNaCwRJ"
    }
  ],

  photoGallery: [
    {
      id: "photo-profile",
      title: "Adejuwon Akintomide Samuel (Tommy)",
      category: "Profile / Headshot",
      src: "/images/profile.jpg",
      tag: "CORE OPERATOR",
      caption: "19 y/o QA Engineer & Front-End Developer based in Lagos, Nigeria.",
      date: "LAGOS NODE"
    },
    {
      id: "photo-lagos",
      title: "Lagos Tech Corridor // Yaba",
      category: "Eko Street Tech",
      src: "/images/lagos.jpg",
      tag: "THE GROUND",
      caption: "Building indestructible frontends tested against the reality of African broadband.",
      date: "YABA, LAGOS"
    },
    {
      id: "photo-motorcycle",
      title: "Third Mainland Bridge at 02:30 AM",
      category: "Two Wheels & Speed",
      src: "/images/motorcycle.jpg",
      tag: "NIGHT THROTTLE",
      caption: "Hyper-focus at midnight. Zero room for uncaught exceptions on the road or in code.",
      date: "02:30 AM WAT"
    },
    {
      id: "photo-gym",
      title: "The Iron Vault // 06:00 AM",
      category: "Fitness & Discipline",
      src: "/images/gym.jpg",
      tag: "IRON TRUTH",
      caption: "Progressive overload is automated regression testing for the body.",
      date: "DAILY GRIND"
    },
    {
      id: "photo-setup",
      title: "Command Center // Dev Rig",
      category: "Hardware & Terminal",
      src: "/images/setup.jpg",
      tag: "BATTLESTATION",
      caption: "Where race conditions get triaged and bulletproof UI components get shipped.",
      date: "WORKSPACE"
    }
  ],

  qaTestSuite: [
    { id: "TEST-01", name: "User Auth Session Handshake & Token Refresh", suite: "Security E2E", status: "PASSED", latency: "38ms", coverage: "100%" },
    { id: "TEST-02", name: "Checkout Fuzzing: Negative Balance Injection", suite: "FinTech Logic", status: "PASSED", latency: "14ms", coverage: "98.7%" },
    { id: "TEST-03", name: "3G Network Throttle & Offline Storage Sync", suite: "Resilience", status: "PASSED", latency: "210ms", coverage: "99.1%" },
    { id: "TEST-04", name: "Keyboard Trap & Screen Reader ARIA Compliance", suite: "Accessibility", status: "PASSED", latency: "8ms", coverage: "100%" },
    { id: "TEST-05", name: "Concurrent WebSocket Event Cascade", suite: "Realtime Stress", status: "PASSED", latency: "52ms", coverage: "97.4%" },
    { id: "TEST-06", name: "DOM Mutation Leak & Garbage Collection Profile", suite: "Performance", status: "PASSED", latency: "4ms", coverage: "99.8%" }
  ]
};
