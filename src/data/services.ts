import type { Service } from "../types"

export const SERVICES: Service[] = [
  // ─── ENTERTAINMENT ─────────────────────────────────────────────
  {
    id: "netflix",
    name: "Netflix",
    domain: "netflix.com",
    category: "Entertainment",
    brandColor: "#E50914",
    tiers: [
      { name: "Standard with Ads", price: 6.99, cycle: "monthly" },
      { name: "Standard", price: 15.49, cycle: "monthly" },
      { name: "Premium", price: 22.99, cycle: "monthly" },
    ],
  },
  {
    id: "disney-plus",
    name: "Disney+",
    domain: "disneyplus.com",
    category: "Entertainment",
    brandColor: "#113CCF",
    tiers: [
      { name: "Basic with Ads", price: 7.99, cycle: "monthly" },
      { name: "Premium", price: 13.99, cycle: "monthly" },
    ],
  },
  {
    id: "hulu",
    name: "Hulu",
    domain: "hulu.com",
    category: "Entertainment",
    brandColor: "#1CE783",
    tiers: [
      { name: "With Ads", price: 7.99, cycle: "monthly" },
      { name: "No Ads", price: 17.99, cycle: "monthly" },
      { name: "Live TV + Ads", price: 76.99, cycle: "monthly" },
      { name: "Live TV No Ads", price: 89.99, cycle: "monthly" },
    ],
  },
  {
    id: "hbo-max",
    name: "HBO Max",
    domain: "max.com",
    category: "Entertainment",
    brandColor: "#B535F6",
    tiers: [
      { name: "With Ads", price: 9.99, cycle: "monthly" },
      { name: "Ad-Free", price: 15.99, cycle: "monthly" },
      { name: "Ultimate", price: 19.99, cycle: "monthly" },
    ],
  },
  {
    id: "apple-tv",
    name: "Apple TV+",
    domain: "tv.apple.com",
    category: "Entertainment",
    brandColor: "#FFFFFF",
    tiers: [{ name: "Standard", price: 9.99, cycle: "monthly" }],
  },
  {
    id: "amazon-prime-video",
    name: "Amazon Prime Video",
    domain: "primevideo.com",
    category: "Entertainment",
    brandColor: "#00A8E1",
    tiers: [
      { name: "With Ads", price: 8.99, cycle: "monthly" },
      { name: "Prime", price: 14.99, cycle: "monthly" },
    ],
  },
  {
    id: "paramount-plus",
    name: "Paramount+",
    domain: "paramountplus.com",
    category: "Entertainment",
    brandColor: "#0064FF",
    tiers: [
      { name: "Essential with Ads", price: 5.99, cycle: "monthly" },
      { name: "Paramount+ with Showtime", price: 11.99, cycle: "monthly" },
    ],
  },
  {
    id: "peacock",
    name: "Peacock",
    domain: "peacocktv.com",
    category: "Entertainment",
    brandColor: "#F5BC00",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Premium", price: 5.99, cycle: "monthly" },
      { name: "Premium Plus", price: 11.99, cycle: "monthly" },
    ],
  },
  {
    id: "crunchyroll",
    name: "Crunchyroll",
    domain: "crunchyroll.com",
    category: "Entertainment",
    brandColor: "#F47521",
    tiers: [
      { name: "Fan", price: 7.99, cycle: "monthly" },
      { name: "Mega Fan", price: 9.99, cycle: "monthly" },
      { name: "Ultimate Fan", price: 14.99, cycle: "monthly" },
    ],
  },
  {
    id: "youtube-premium",
    name: "YouTube Premium",
    domain: "youtube.com",
    category: "Entertainment",
    brandColor: "#FF0000",
    tiers: [
      { name: "Student", price: 7.99, cycle: "monthly" },
      { name: "Individual", price: 13.99, cycle: "monthly" },
      { name: "Family", price: 22.99, cycle: "monthly" },
    ],
  },

  // ─── MUSIC ─────────────────────────────────────────────────────
  {
    id: "spotify",
    name: "Spotify",
    domain: "spotify.com",
    category: "Music",
    brandColor: "#1DB954",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Student", price: 4.99, cycle: "monthly" },
      { name: "Individual", price: 9.99, cycle: "monthly" },
      { name: "Duo", price: 13.99, cycle: "monthly" },
      { name: "Family", price: 16.99, cycle: "monthly" },
    ],
  },
  {
    id: "apple-music",
    name: "Apple Music",
    domain: "music.apple.com",
    category: "Music",
    brandColor: "#FA243C",
    tiers: [
      { name: "Student", price: 5.99, cycle: "monthly" },
      { name: "Individual", price: 10.99, cycle: "monthly" },
      { name: "Family", price: 16.99, cycle: "monthly" },
    ],
  },
  {
    id: "tidal",
    name: "Tidal",
    domain: "tidal.com",
    category: "Music",
    brandColor: "#FFFFFF",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Student", price: 5.49, cycle: "monthly" },
      { name: "Individual", price: 10.99, cycle: "monthly" },
      { name: "Family", price: 16.99, cycle: "monthly" },
    ],
  },
  {
    id: "amazon-music",
    name: "Amazon Music",
    domain: "music.amazon.com",
    category: "Music",
    brandColor: "#25D1DA",
    tiers: [
      { name: "Prime", price: 8.99, cycle: "monthly" },
      { name: "Unlimited Individual", price: 9.99, cycle: "monthly" },
      { name: "Unlimited Family", price: 14.99, cycle: "monthly" },
      { name: "Student", price: 4.99, cycle: "monthly" },
    ],
  },
  {
    id: "soundcloud-go",
    name: "SoundCloud Go",
    domain: "soundcloud.com",
    category: "Music",
    brandColor: "#FF7700",
    tiers: [
      { name: "Go", price: 5.99, cycle: "monthly" },
      { name: "Go+", price: 9.99, cycle: "monthly" },
    ],
  },
  {
    id: "pandora",
    name: "Pandora",
    domain: "pandora.com",
    category: "Music",
    brandColor: "#00A0EE",
    tiers: [
      { name: "Plus", price: 4.99, cycle: "monthly" },
      { name: "Premium", price: 9.99, cycle: "monthly" },
      { name: "Family", price: 14.99, cycle: "monthly" },
    ],
  },

  // ─── GAMING ────────────────────────────────────────────────────
  {
    id: "xbox-game-pass",
    name: "Xbox Game Pass",
    domain: "xbox.com",
    category: "Gaming",
    brandColor: "#107C10",
    tiers: [
      { name: "PC Game Pass", price: 9.99, cycle: "monthly" },
      { name: "Game Pass Standard", price: 14.99, cycle: "monthly" },
      { name: "Game Pass Ultimate", price: 19.99, cycle: "monthly" },
    ],
  },
  {
    id: "playstation-plus",
    name: "PlayStation Plus",
    domain: "playstation.com",
    category: "Gaming",
    brandColor: "#003791",
    tiers: [
      { name: "Essential", price: 9.99, cycle: "monthly" },
      { name: "Extra", price: 14.99, cycle: "monthly" },
      { name: "Premium", price: 17.99, cycle: "monthly" },
    ],
  },
  {
    id: "nintendo-switch-online",
    name: "Nintendo Switch Online",
    domain: "nintendo.com",
    category: "Gaming",
    brandColor: "#E60012",
    tiers: [
      { name: "Individual", price: 3.99, cycle: "monthly" },
      { name: "Individual + Expansion Pack", price: 49.99, cycle: "yearly" },
      { name: "Family", price: 34.99, cycle: "yearly" },
      { name: "Family + Expansion Pack", price: 79.99, cycle: "yearly" },
    ],
  },
  {
    id: "ea-play",
    name: "EA Play",
    domain: "ea.com",
    category: "Gaming",
    brandColor: "#FF4747",
    tiers: [
      { name: "EA Play", price: 4.99, cycle: "monthly" },
      { name: "EA Play Pro", price: 14.99, cycle: "monthly" },
    ],
  },
  {
    id: "ubisoft-plus",
    name: "Ubisoft+",
    domain: "ubisoft.com",
    category: "Gaming",
    brandColor: "#0084FF",
    tiers: [
      { name: "Classics", price: 7.99, cycle: "monthly" },
      { name: "Premium", price: 17.99, cycle: "monthly" },
    ],
  },
  {
    id: "apple-arcade",
    name: "Apple Arcade",
    domain: "apple.com",
    category: "Gaming",
    brandColor: "#FF2D55",
    tiers: [
      { name: "Individual", price: 6.99, cycle: "monthly" },
      { name: "Family", price: 6.99, cycle: "monthly" },
    ],
  },
  {
    id: "google-play-pass",
    name: "Google Play Pass",
    domain: "play.google.com",
    category: "Gaming",
    brandColor: "#0F9D58",
    tiers: [
      { name: "Individual", price: 4.99, cycle: "monthly" },
      { name: "Family", price: 9.99, cycle: "monthly" },
    ],
  },

  // ─── STORAGE & PRODUCTIVITY ────────────────────────────────────
  {
    id: "icloud",
    name: "iCloud+",
    domain: "icloud.com",
    category: "Storage & Productivity",
    brandColor: "#3693F3",
    tiers: [
      { name: "50GB", price: 0.99, cycle: "monthly" },
      { name: "200GB", price: 2.99, cycle: "monthly" },
      { name: "2TB", price: 9.99, cycle: "monthly" },
      { name: "6TB", price: 29.99, cycle: "monthly" },
      { name: "12TB", price: 59.99, cycle: "monthly" },
    ],
  },
  {
    id: "google-one",
    name: "Google One",
    domain: "one.google.com",
    category: "Storage & Productivity",
    brandColor: "#4285F4",
    tiers: [
      { name: "Basic 100GB", price: 1.99, cycle: "monthly" },
      { name: "Standard 200GB", price: 2.99, cycle: "monthly" },
      { name: "Premium 2TB", price: 9.99, cycle: "monthly" },
      { name: "Premium 5TB", price: 24.99, cycle: "monthly" },
    ],
  },
  {
    id: "dropbox",
    name: "Dropbox",
    domain: "dropbox.com",
    category: "Storage & Productivity",
    brandColor: "#0061FF",
    tiers: [
      { name: "Plus", price: 11.99, cycle: "monthly" },
      { name: "Essentials", price: 22.0, cycle: "monthly" },
      { name: "Business", price: 24.0, cycle: "monthly" },
    ],
  },
  {
    id: "microsoft-365",
    name: "Microsoft 365",
    domain: "microsoft.com",
    category: "Storage & Productivity",
    brandColor: "#F25022",
    tiers: [
      { name: "Personal", price: 6.99, cycle: "monthly" },
      { name: "Family", price: 9.99, cycle: "monthly" },
      { name: "Business Basic", price: 6.0, cycle: "monthly" },
      { name: "Business Standard", price: 12.5, cycle: "monthly" },
    ],
  },
  {
    id: "notion",
    name: "Notion",
    domain: "notion.so",
    category: "Storage & Productivity",
    brandColor: "#FFFFFF",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Plus", price: 8.0, cycle: "monthly" },
      { name: "Business", price: 15.0, cycle: "monthly" },
    ],
  },
  {
    id: "evernote",
    name: "Evernote",
    domain: "evernote.com",
    category: "Storage & Productivity",
    brandColor: "#00A82D",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Personal", price: 10.99, cycle: "monthly" },
      { name: "Professional", price: 14.99, cycle: "monthly" },
    ],
  },
  {
    id: "slack",
    name: "Slack",
    domain: "slack.com",
    category: "Storage & Productivity",
    brandColor: "#ECB22E",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Pro", price: 7.25, cycle: "monthly" },
      { name: "Business+", price: 12.5, cycle: "monthly" },
    ],
  },
  {
    id: "zoom",
    name: "Zoom",
    domain: "zoom.us",
    category: "Storage & Productivity",
    brandColor: "#2D8CFF",
    tiers: [
      { name: "Basic", price: 0, cycle: "monthly" },
      { name: "Pro", price: 13.32, cycle: "monthly" },
      { name: "Business", price: 18.32, cycle: "monthly" },
    ],
  },

  // ─── FITNESS & HEALTH ──────────────────────────────────────────
  {
    id: "peloton",
    name: "Peloton",
    domain: "onepeloton.com",
    category: "Fitness & Health",
    brandColor: "#DF2935",
    tiers: [
      { name: "App Free", price: 0, cycle: "monthly" },
      { name: "App One", price: 12.99, cycle: "monthly" },
      { name: "App+", price: 24.99, cycle: "monthly" },
      { name: "All-Access", price: 44.0, cycle: "monthly" },
    ],
  },
  {
    id: "myfitnesspal",
    name: "MyFitnessPal",
    domain: "myfitnesspal.com",
    category: "Fitness & Health",
    brandColor: "#1E88E5",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Premium Monthly", price: 19.99, cycle: "monthly" },
      { name: "Premium Annual", price: 79.99, cycle: "yearly" },
    ],
  },
  {
    id: "calm",
    name: "Calm",
    domain: "calm.com",
    category: "Fitness & Health",
    brandColor: "#2056AE",
    tiers: [
      { name: "Premium", price: 14.99, cycle: "monthly" },
      { name: "Premium Annual", price: 69.99, cycle: "yearly" },
      { name: "Family Annual", price: 69.99, cycle: "yearly" },
    ],
  },
  {
    id: "headspace",
    name: "Headspace",
    domain: "headspace.com",
    category: "Fitness & Health",
    brandColor: "#FF6F1D",
    tiers: [
      { name: "Student", price: 9.99, cycle: "monthly" },
      { name: "Individual", price: 12.99, cycle: "monthly" },
      { name: "Individual Annual", price: 69.99, cycle: "yearly" },
      { name: "Family Annual", price: 99.99, cycle: "yearly" },
    ],
  },
  {
    id: "strava",
    name: "Strava",
    domain: "strava.com",
    category: "Fitness & Health",
    brandColor: "#FC4C02",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Subscriber Monthly", price: 7.99, cycle: "monthly" },
      { name: "Subscriber Annual", price: 79.99, cycle: "yearly" },
    ],
  },

  // ─── NEWS & READING ────────────────────────────────────────────
  {
    id: "new-york-times",
    name: "New York Times",
    domain: "nytimes.com",
    category: "News & Reading",
    brandColor: "#FFFFFF",
    tiers: [
      { name: "Basic News", price: 4.0, cycle: "monthly" },
      { name: "Games Only", price: 5.0, cycle: "monthly" },
      { name: "Cooking Only", price: 5.0, cycle: "monthly" },
      { name: "All Access", price: 25.0, cycle: "monthly" },
    ],
  },
  {
    id: "washington-post",
    name: "Washington Post",
    domain: "washingtonpost.com",
    category: "News & Reading",
    brandColor: "#FFFFFF",
    tiers: [
      { name: "Digital", price: 4.0, cycle: "monthly" },
      { name: "Premium", price: 10.0, cycle: "monthly" },
    ],
  },
  {
    id: "audible",
    name: "Audible",
    domain: "audible.com",
    category: "News & Reading",
    brandColor: "#F8991C",
    tiers: [
      { name: "Plus", price: 7.95, cycle: "monthly" },
      { name: "Premium Plus", price: 14.95, cycle: "monthly" },
      { name: "Premium Plus Two Credits", price: 22.95, cycle: "monthly" },
    ],
  },
  {
    id: "kindle-unlimited",
    name: "Kindle Unlimited",
    domain: "amazon.com",
    category: "News & Reading",
    brandColor: "#FF9900",
    tiers: [{ name: "Standard", price: 11.99, cycle: "monthly" }],
  },
  {
    id: "medium",
    name: "Medium",
    domain: "medium.com",
    category: "News & Reading",
    brandColor: "#00AB6C",
    tiers: [
      { name: "Member Monthly", price: 5.0, cycle: "monthly" },
      { name: "Member Annual", price: 50.0, cycle: "yearly" },
    ],
  },

  // ─── SECURITY & VPN ────────────────────────────────────────────
  {
    id: "nordvpn",
    name: "NordVPN",
    domain: "nordvpn.com",
    category: "Security & VPN",
    brandColor: "#4687FF",
    tiers: [
      { name: "Basic", price: 4.99, cycle: "monthly" },
      { name: "Plus", price: 5.99, cycle: "monthly" },
      { name: "Ultimate", price: 7.99, cycle: "monthly" },
    ],
  },
  {
    id: "expressvpn",
    name: "ExpressVPN",
    domain: "expressvpn.com",
    category: "Security & VPN",
    brandColor: "#DA3940",
    tiers: [
      { name: "Monthly", price: 12.95, cycle: "monthly" },
      { name: "Annual", price: 99.84, cycle: "yearly" },
    ],
  },
  {
    id: "1password",
    name: "1Password",
    domain: "1password.com",
    category: "Security & VPN",
    brandColor: "#0572EC",
    tiers: [
      { name: "Individual", price: 2.99, cycle: "monthly" },
      { name: "Families", price: 4.99, cycle: "monthly" },
      { name: "Teams Starter", price: 19.95, cycle: "monthly" },
    ],
  },
  {
    id: "lastpass",
    name: "LastPass",
    domain: "lastpass.com",
    category: "Security & VPN",
    brandColor: "#D32D27",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Premium", price: 3.0, cycle: "monthly" },
      { name: "Families", price: 4.0, cycle: "monthly" },
    ],
  },
  {
    id: "dashlane",
    name: "Dashlane",
    domain: "dashlane.com",
    category: "Security & VPN",
    brandColor: "#00B388",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Premium", price: 4.99, cycle: "monthly" },
      { name: "Friends & Family", price: 7.49, cycle: "monthly" },
    ],
  },

  // ─── AI TOOLS ──────────────────────────────────────────────────
  {
    id: "chatgpt",
    name: "ChatGPT",
    domain: "openai.com",
    category: "AI Tools",
    brandColor: "#10A37F",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Plus", price: 20.0, cycle: "monthly" },
      { name: "Team", price: 25.0, cycle: "monthly" },
    ],
  },
  {
    id: "claude",
    name: "Claude",
    domain: "claude.ai",
    category: "AI Tools",
    brandColor: "#D97757",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Pro", price: 20.0, cycle: "monthly" },
      { name: "Team", price: 25.0, cycle: "monthly" },
    ],
  },
  {
    id: "midjourney",
    name: "Midjourney",
    domain: "midjourney.com",
    category: "AI Tools",
    brandColor: "#4B62F4",
    tiers: [
      { name: "Basic", price: 10.0, cycle: "monthly" },
      { name: "Standard", price: 30.0, cycle: "monthly" },
      { name: "Pro", price: 60.0, cycle: "monthly" },
      { name: "Mega", price: 120.0, cycle: "monthly" },
    ],
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    domain: "github.com",
    category: "AI Tools",
    brandColor: "#6E40C9",
    tiers: [
      { name: "Individual", price: 10.0, cycle: "monthly" },
      { name: "Business", price: 19.0, cycle: "monthly" },
    ],
  },
  {
    id: "cursor",
    name: "Cursor",
    domain: "cursor.com",
    category: "AI Tools",
    brandColor: "#FFFFFF",
    tiers: [
      { name: "Hobby", price: 0, cycle: "monthly" },
      { name: "Pro", price: 20.0, cycle: "monthly" },
      { name: "Business", price: 40.0, cycle: "monthly" },
    ],
  },

  // ─── DEVELOPER TOOLS ───────────────────────────────────────────
  {
    id: "github",
    name: "GitHub",
    domain: "github.com",
    category: "Developer Tools",
    brandColor: "#FFFFFF",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Pro", price: 4.0, cycle: "monthly" },
      { name: "Team", price: 4.0, cycle: "monthly" },
      { name: "Enterprise", price: 21.0, cycle: "monthly" },
    ],
  },
  {
    id: "gitlab",
    name: "GitLab",
    domain: "gitlab.com",
    category: "Developer Tools",
    brandColor: "#FC6D26",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Premium", price: 29.0, cycle: "monthly" },
      { name: "Ultimate", price: 99.0, cycle: "monthly" },
    ],
  },
  {
    id: "vercel",
    name: "Vercel",
    domain: "vercel.com",
    category: "Developer Tools",
    brandColor: "#FFFFFF",
    tiers: [
      { name: "Hobby", price: 0, cycle: "monthly" },
      { name: "Pro", price: 20.0, cycle: "monthly" },
    ],
  },
  {
    id: "figma",
    name: "Figma",
    domain: "figma.com",
    category: "Developer Tools",
    brandColor: "#F24E1E",
    tiers: [
      { name: "Starter", price: 0, cycle: "monthly" },
      { name: "Professional", price: 12.0, cycle: "monthly" },
      { name: "Organization", price: 45.0, cycle: "monthly" },
    ],
  },
  {
    id: "framer",
    name: "Framer",
    domain: "framer.com",
    category: "Developer Tools",
    brandColor: "#0099FF",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Mini", price: 5.0, cycle: "monthly" },
      { name: "Basic", price: 15.0, cycle: "monthly" },
      { name: "Plus", price: 30.0, cycle: "monthly" },
    ],
  },
  {
    id: "canva",
    name: "Canva",
    domain: "canva.com",
    category: "Developer Tools",
    brandColor: "#00C4CC",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Pro", price: 12.99, cycle: "monthly" },
      { name: "Teams", price: 14.99, cycle: "monthly" },
    ],
  },
  {
    id: "linear",
    name: "Linear",
    domain: "linear.app",
    category: "Developer Tools",
    brandColor: "#5E6AD2",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Basic", price: 8.0, cycle: "monthly" },
      { name: "Business", price: 16.0, cycle: "monthly" },
    ],
  },
  {
    id: "digitalocean",
    name: "DigitalOcean",
    domain: "digitalocean.com",
    category: "Developer Tools",
    brandColor: "#008CFF",
    tiers: [
      { name: "Basic Droplet", price: 6.0, cycle: "monthly" },
      { name: "General Purpose", price: 63.0, cycle: "monthly" },
    ],
  },

  // ─── SOCIAL & COMMUNICATION ────────────────────────────────────
  {
    id: "discord",
    name: "Discord",
    domain: "discord.com",
    category: "Social & Communication",
    brandColor: "#5865F2",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Nitro Basic", price: 3.99, cycle: "monthly" },
      { name: "Nitro", price: 9.99, cycle: "monthly" },
    ],
  },

  // ─── DESIGN & CREATIVE ─────────────────────────────────────────
  {
    id: "adobe-creative-cloud",
    name: "Adobe Creative Cloud",
    domain: "adobe.com",
    category: "Design & Creative",
    brandColor: "#FA0F00",
    tiers: [
      { name: "Photography", price: 9.99, cycle: "monthly" },
      { name: "Single App", price: 20.99, cycle: "monthly" },
      { name: "All Apps", price: 54.99, cycle: "monthly" },
      { name: "Students & Teachers", price: 19.99, cycle: "monthly" },
    ],
  },
  {
    id: "sketch",
    name: "Sketch",
    domain: "sketch.com",
    category: "Design & Creative",
    brandColor: "#FDB300",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Pro", price: 9.0, cycle: "monthly" },
    ],
  },

  // ─── EDUCATION ─────────────────────────────────────────────────
  {
    id: "duolingo",
    name: "Duolingo",
    domain: "duolingo.com",
    category: "Education",
    brandColor: "#58CC02",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Super", price: 6.99, cycle: "monthly" },
      { name: "Family", price: 9.99, cycle: "monthly" },
    ],
  },
  {
    id: "coursera",
    name: "Coursera",
    domain: "coursera.org",
    category: "Education",
    brandColor: "#0056D2",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Coursera Plus", price: 59.0, cycle: "monthly" },
      { name: "Coursera Plus Annual", price: 399.0, cycle: "yearly" },
    ],
  },
  {
    id: "masterclass",
    name: "MasterClass",
    domain: "masterclass.com",
    category: "Education",
    brandColor: "#F22E48",
    tiers: [
      { name: "Individual", price: 120.0, cycle: "yearly" },
      { name: "Duo", price: 180.0, cycle: "yearly" },
      { name: "Family", price: 240.0, cycle: "yearly" },
    ],
  },
  {
    id: "skillshare",
    name: "Skillshare",
    domain: "skillshare.com",
    category: "Education",
    brandColor: "#00FF84",
    tiers: [
      { name: "Free", price: 0, cycle: "monthly" },
      { name: "Member", price: 14.0, cycle: "monthly" },
      { name: "Member Annual", price: 99.0, cycle: "yearly" },
    ],
  },
  {
    id: "linkedin-learning",
    name: "LinkedIn Learning",
    domain: "linkedin.com",
    category: "Education",
    brandColor: "#0A66C2",
    tiers: [
      { name: "Monthly", price: 39.99, cycle: "monthly" },
      { name: "Annual", price: 239.88, cycle: "yearly" },
    ],
  },

  // ─── FOOD & LIFESTYLE ──────────────────────────────────────────
  {
    id: "doordash",
    name: "DoorDash DashPass",
    domain: "doordash.com",
    category: "Food & Lifestyle",
    brandColor: "#FF3008",
    tiers: [
      { name: "Individual", price: 9.99, cycle: "monthly" },
      { name: "Student", price: 4.99, cycle: "monthly" },
    ],
  },
  {
    id: "uber-one",
    name: "Uber One",
    domain: "uber.com",
    category: "Food & Lifestyle",
    brandColor: "#FFFFFF",
    tiers: [
      { name: "Monthly", price: 9.99, cycle: "monthly" },
      { name: "Annual", price: 99.99, cycle: "yearly" },
    ],
  },
  {
    id: "instacart",
    name: "Instacart+",
    domain: "instacart.com",
    category: "Food & Lifestyle",
    brandColor: "#FAAF18",
    tiers: [
      { name: "Monthly", price: 9.99, cycle: "monthly" },
      { name: "Annual", price: 99.0, cycle: "yearly" },
    ],
  },
  {
    id: "hellofresh",
    name: "HelloFresh",
    domain: "hellofresh.com",
    category: "Food & Lifestyle",
    brandColor: "#99CC33",
    tiers: [
      { name: "2 Person 2 Meals", price: 59.94, cycle: "weekly" },
      { name: "2 Person 3 Meals", price: 71.94, cycle: "weekly" },
      { name: "4 Person 2 Meals", price: 71.92, cycle: "weekly" },
      { name: "4 Person 3 Meals", price: 95.92, cycle: "weekly" },
    ],
  },
]

export function findService(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id)
}

export function clearbitLogoUrl(domain: string): string {
  return `https://logo.clearbit.com/${domain}`
}
