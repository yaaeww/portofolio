const MUTED_KEY = "portfolio-sound-muted";

const FRAME_SOUNDS = [
  "/audio/areyouredy.mp3",
  "/audio/whosh.mp3",
  "/audio/hammer.mp3",
  "/audio/rock_break.mp3",
  "/audio/succes.mp3",
] as const;

const FRAMES_COUNT = FRAME_SOUNDS.length;

let audioElements: HTMLAudioElement[] | null = null;
let currentIndex = -1;

function getAudioElements(): HTMLAudioElement[] {
  if (!audioElements) {
    audioElements = FRAME_SOUNDS.map((src) => {
      const audio = new Audio(src);
      audio.preload = "auto";
      audio.loop = false;
      audio.volume = 1;
      return audio;
    });
  }
  return audioElements;
}

export function isMuted(): boolean {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem(MUTED_KEY);
  return stored === null ? true : stored === "1";
}

export function setMuted(value: boolean) {
  if (typeof window !== "undefined") {
    localStorage.setItem(MUTED_KEY, value ? "1" : "0");
  }
}

export function toggleMute(): boolean {
  setMuted(!isMuted());
  return isMuted();
}

export function playFrameSound(frameIndex: number) {
  if (typeof window === "undefined") return;
  if (frameIndex < 0 || frameIndex >= FRAMES_COUNT) return;
  if (isMuted()) return;
  if (frameIndex === currentIndex) return;

  const audios = getAudioElements();

  for (let i = 0; i < FRAMES_COUNT; i++) {
    if (i !== frameIndex) {
      audios[i].pause();
      audios[i].currentTime = 0;
    }
  }

  const audio = audios[frameIndex];
  audio.currentTime = 0;
  audio.play().catch(() => {});

  currentIndex = frameIndex;
}

export function stopAllSounds() {
  if (!audioElements) return;
  for (const audio of audioElements) {
    audio.pause();
    audio.currentTime = 0;
  }
  currentIndex = -1;
}
