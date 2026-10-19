/** A small, optional weather layer. No dependency and no work while switched off. */
type Drop = { x: number; y: number; depth: number };

const STORAGE_KEY = "duy:rain";
const FRAME_INTERVAL = 1000 / 30;

export function initRain() {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let enabled = false;
  try { enabled = sessionStorage.getItem(STORAGE_KEY) === "on"; } catch { /* Storage can be unavailable. */ }

  let canvas: HTMLCanvasElement | null = null;
  let context: CanvasRenderingContext2D | null = null;
  let frame: number | null = null;
  let previousTime = 0;
  let width = 0;
  let height = 0;
  let readingLeft = 0;
  let readingRight = 0;
  let drops: Drop[] = [];

  function resize() {
    if (!canvas || !context) return;
    width = window.innerWidth;
    height = window.innerHeight;
    // Cap the backing resolution and particle count on high-DPI/mobile screens.
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    const reading = document.querySelector("main > [data-reading-column]")?.getBoundingClientRect();
    readingLeft = reading ? reading.left - 12 : width / 2 - 340;
    readingRight = reading ? reading.right + 12 : width / 2 + 340;
    const limit = width < 680 ? 44 : 110;
    const count = Math.max(24, Math.min(limit, Math.round(width * height / 9000)));
    drops = Array.from({ length: count }, () => ({
      x: Math.random() * (width + 40),
      y: Math.random() * (height + 40) - 20,
      depth: [0.35, 0.65, 1][Math.floor(Math.random() * 3)],
    }));
  }

  function draw(time: number) {
    if (!context || !canvas) return;
    frame = requestAnimationFrame(draw);
    const elapsed = time - previousTime;
    if (previousTime && elapsed < FRAME_INTERVAL - 1) return;
    const delta = previousTime ? Math.min(elapsed / 1000, 0.06) : FRAME_INTERVAL / 1000;
    previousTime = time;
    context.clearRect(0, 0, width, height);
    context.strokeStyle = document.documentElement.classList.contains("dark") ? "#adc6d5" : "#617f94";
    context.lineCap = "round";

    for (const drop of drops) {
      drop.x -= (35 + 40 * drop.depth) * delta;
      drop.y += (180 + 320 * drop.depth) * delta;
      if (drop.y > height + 24) { drop.y = -24; drop.x = Math.random() * (width + 40); }
      if (drop.x < -24) drop.x = width + 24;
      // Keep the reading column quieter than the empty margins.
      const overContent = drop.x > readingLeft && drop.x < readingRight;
      const softness = overContent ? (width < 680 ? 0.5 : 0.4) : 1;
      context.globalAlpha = (0.14 + 0.23 * drop.depth) * softness;
      context.lineWidth = 0.55 + drop.depth * 0.65;
      const length = 7 + 13 * drop.depth;
      context.beginPath();
      context.moveTo(drop.x, drop.y);
      context.lineTo(drop.x + length * 0.18, drop.y - length);
      context.stroke();
    }
    context.globalAlpha = 1;
  }

  function stop() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    previousTime = 0;
    if (canvas) canvas.hidden = true;
    context?.clearRect(0, 0, width, height);
  }

  function sync() {
    const available = Boolean(context);
    const raining = available && enabled && !motion.matches;
    document.documentElement.dataset.rain = raining ? "on" : "off";
    const hasInlineControl = Boolean(document.querySelector('[data-rain-toggle="inline"]'));
    document.querySelectorAll<HTMLButtonElement>("[data-rain-toggle]").forEach(button => {
      const floating = button.dataset.rainToggle === "floating";
      button.hidden = !available || (floating && hasInlineControl && !enabled && !motion.matches);
      button.disabled = motion.matches;
      button.setAttribute("aria-pressed", String(raining));
      button.setAttribute("aria-label", motion.matches ? "Mưa tạm dừng vì thiết bị đang giảm chuyển động" : raining ? "Tắt mưa toàn trang" : "Bật mưa toàn trang");
      button.textContent = motion.matches ? "mưa đang nghỉ ☂" : raining ? "tạnh mưa nhé ☂" : "cho mưa chút đi ☂";
      button.title = motion.matches ? "Thiết bị đang bật giảm chuyển động." : "Mưa nhẹ trên toàn trang";
    });
    document.querySelectorAll<HTMLElement>("[data-sky-status]").forEach(status => {
      status.textContent = motion.matches ? "Đang bật giảm chuyển động." : raining ? "Ngắm trời, thêm chút mưa." : "Hai khoảng trời mình thích.";
    });

    if (raining && !document.hidden && frame === null && canvas) {
      resize();
      canvas.hidden = false;
      frame = requestAnimationFrame(draw);
    } else if (!raining || document.hidden) {
      stop();
    }
  }

  function mount() {
    const nextCanvas = document.querySelector<HTMLCanvasElement>("#page-rain");
    if (canvas !== nextCanvas) {
      stop();
      canvas = nextCanvas;
      try { context = canvas?.getContext("2d") || null; } catch { context = null; }
    }
    // The canvas persists through Astro navigation; the controls and text are refreshed.
    if (frame !== null) resize();
    sync();
  }

  function onClick(event: MouseEvent) {
    const button = event.target instanceof Element ? event.target.closest<HTMLButtonElement>("[data-rain-toggle]") : null;
    if (!button || button.disabled || !context) return;
    enabled = !enabled;
    try { sessionStorage.setItem(STORAGE_KEY, enabled ? "on" : "off"); } catch { /* Keep the in-memory choice. */ }
    sync();
  }

  function onResize() {
    if (frame !== null) resize();
  }

  document.addEventListener("click", onClick);
  document.addEventListener("astro:before-swap", stop);
  document.addEventListener("astro:page-load", mount);
  document.addEventListener("visibilitychange", sync);
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("pagehide", stop);
  window.addEventListener("pageshow", mount);
  motion.addEventListener("change", sync);
  mount();

  return () => {
    stop();
    document.removeEventListener("click", onClick);
    document.removeEventListener("astro:before-swap", stop);
    document.removeEventListener("astro:page-load", mount);
    document.removeEventListener("visibilitychange", sync);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("pagehide", stop);
    window.removeEventListener("pageshow", mount);
    motion.removeEventListener("change", sync);
    delete document.documentElement.dataset.rain;
  };
}
