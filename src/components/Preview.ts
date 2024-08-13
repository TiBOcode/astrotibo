import { computePosition, autoPlacement, offset } from "@floating-ui/dom";

const tooltip = document.querySelector("#linkpreview") as HTMLElement;
const elements = document.querySelectorAll("a") as NodeListOf<HTMLAnchorElement>;

let currentHref: string;
let showPreviewTimer: number | undefined;
let hidePreviewTimer: number | undefined;

function hideLinkPreview() {
  clearTimeout(showPreviewTimer);
  if (hidePreviewTimer !== undefined) return;
  hidePreviewTimer = setTimeout(() => {
    currentHref = "";
    tooltip.style.display = "";
    hidePreviewTimer = undefined;
  }, 200);
}

function clearTimers() {
  clearTimeout(showPreviewTimer);
  clearTimeout(hidePreviewTimer);
  hidePreviewTimer = undefined;
}

tooltip.addEventListener("mouseenter", clearTimers);
tooltip.addEventListener("mouseleave", hideLinkPreview);

async function showLinkPreview(e: MouseEvent | FocusEvent) {
  const start = `${window.location.protocol}//${window.location.host}`;
  const target = e.target as HTMLElement;
  const href = target?.closest("a")?.href || "";
  const hash = new URL(href).hash;

  const hrefWithoutAnchor = href.replace(hash, "");
  const locationWithoutAnchor = window.location.href.replace(window.location.hash, "");

  currentHref = href;
  if (hrefWithoutAnchor === locationWithoutAnchor || !href.startsWith(start)) {
    hideLinkPreview();
    return;
  }
  clearTimers();

  const text = await fetch(href).then((x) => x.text());
  if (currentHref !== href) return;

  showPreviewTimer = setTimeout(() => {
    if (currentHref !== href) return;
    const doc = new DOMParser().parseFromString(text, "text/html");
    const content = doc.querySelector("main")?.innerHTML;
    tooltip.innerHTML = content || "";
    tooltip.style.display = "block";

    computePosition(target, tooltip, {
      middleware: [offset(10), autoPlacement()],
    }).then(({ x, y }) => {
      Object.assign(tooltip.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }, 400);
}

const events = [
  ["mouseenter", showLinkPreview],
  ["mouseleave", hideLinkPreview],
  ["focus", showLinkPreview],
  ["blur", hideLinkPreview],
] as const;

Array.from(elements).forEach((element) => {
  events.forEach(([event, listener]) => {
    element.addEventListener(event, listener);
  });
});