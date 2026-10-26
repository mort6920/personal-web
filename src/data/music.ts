export interface Track {
  id: string;
  number: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  durationSeconds: number;
  audioSrc?: string;
  hasLyrics: boolean;
  coverGradient: string;
  spotifyUrl?: string;
}

export interface LyricLine {
  time: number; // in seconds
  text: string;
}

/**
 * Entombed is categorized as Instrumental Only, displaying "..." as requested.
 */
export const ENTOMBED_LYRICS: LyricLine[] = [
  { time: 0, text: "..." },
];

export const TRACKLIST: Track[] = [
  {
    id: "entombed",
    number: 1,
    title: "Entombed",
    artist: "Deftones",
    album: "Koi No Yokan",
    duration: "4:59",
    durationSeconds: 299,
    audioSrc: "/song/entombed.mp3",
    hasLyrics: false, // Instrumental only as requested
    coverGradient: "from-[#432328] via-[#1a0f12] to-[#0a0608]",
    spotifyUrl: "https://open.spotify.com/track/30p4iWb48n47Rj6Xy5UjB9",
  },
  {
    id: "be-quiet-and-drive",
    number: 2,
    title: "Be Quiet and Drive (Far Away)",
    artist: "Deftones",
    album: "Around the Fur",
    duration: "5:08",
    durationSeconds: 308,
    audioSrc: "/song/entombed.mp3",
    hasLyrics: false,
    coverGradient: "from-[#1d3557] via-[#111d2e] to-[#070d14]",
    spotifyUrl: "https://open.spotify.com/track/4Uiw0Sl9yskBaC6P4DcdVD",
  },
  {
    id: "cherry-waves",
    number: 3,
    title: "Cherry Waves",
    artist: "Deftones",
    album: "Saturday Night Wrist",
    duration: "5:17",
    durationSeconds: 317,
    audioSrc: "/song/entombed.mp3",
    hasLyrics: false,
    coverGradient: "from-[#3d192a] via-[#1f0b15] to-[#0a0307]",
    spotifyUrl: "https://open.spotify.com/track/4myU6pI2nL0gCg9n9hK60m",
  },
  {
    id: "rosemary",
    number: 4,
    title: "Rosemary",
    artist: "Deftones",
    album: "Koi No Yokan",
    duration: "6:53",
    durationSeconds: 413,
    audioSrc: "/song/entombed.mp3",
    hasLyrics: false,
    coverGradient: "from-[#2e1d3a] via-[#170e1d] to-[#09050b]",
    spotifyUrl: "https://open.spotify.com/track/0XyX2kP2u2cMhC2wH09Vn7",
  },
  {
    id: "digital-bath",
    number: 5,
    title: "Digital Bath",
    artist: "Deftones",
    album: "White Pony",
    duration: "4:15",
    durationSeconds: 255,
    audioSrc: "/song/entombed.mp3",
    hasLyrics: false,
    coverGradient: "from-[#333333] via-[#1c1c1c] to-[#0d0d0d]",
    spotifyUrl: "https://open.spotify.com/track/2Gx5Pz5Yq2jG8GgZ8H9w6O",
  },
];
