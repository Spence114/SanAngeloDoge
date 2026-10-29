// Browser behavior for the site: hash routing (preview build), menu, interest counter,
// forms, and copy buttons.
// This file is stripped of types at build time and inlined; it must not import anything.

type FormKind = "subscribe" | "tip" | "sponsor" | "feedback";

interface SiteConfig {
  mode: "artifact" | "site";
  forms: Record<FormKind, string>;
  contact: string;
}

declare global {
  interface Window {
    SITE_CONFIG: SiteConfig;
  }
}

(() => {
  const cfg = window.SITE_CONFIG;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
    Array.from(root.querySelectorAll<T>(sel) as unknown as ArrayLike<T>);

  /* ---------- header ---------- */
  const top = document.getElementById("top");
  const onScroll = () => top?.classList.toggle("scrolled", window.scrollY > 4);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const menu = document.getElementById("menu");
  const menuBtn = document.querySelector<HTMLButtonElement>(".menu-btn");
  const setMenu = (open: boolean) => {
    if (!menu || !menuBtn) return;
    menu.hidden = !open;
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  menuBtn?.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1020) setMenu(false);
  });

  /* ---------- skip link: focus the visible page without touching the hash ---------- */
  document.querySelector(".skip")?.addEventListener("click", (e) => {
    e.preventDefault();
    const main = $$<HTMLElement>("main").find((m) => !m.hidden);
    main?.focus();
    main?.scrollIntoView({ block: "start" });
  });

  /* ---------- routing (single-file preview only) ---------- */
  const views = $$<HTMLElement>("main.view");
  let pendingScroll: string | null = null;

  const scrollToTarget = () => {
    const id = pendingScroll;
    pendingScroll = null;
    const el = id ? document.getElementById(id) : null;
    if (el) {
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      if (el.matches(".srcs li")) {
        el.classList.add("flash");
        window.setTimeout(() => el.classList.remove("flash"), 1800);
      }
    } else window.scrollTo(0, 0);
  };

  const show = () => {
    if (!views.length) return;
    const want = decodeURIComponent(location.hash.slice(1)) || "home";
    const view = views.find((v) => v.dataset.route === want) ?? views.find((v) => v.dataset.route === "home");
    if (!view) return;
    const route = view.dataset.route ?? "home";
    for (const v of views) v.hidden = v !== view;
    for (const a of $$<HTMLAnchorElement>("[data-nav]")) {
      const navRoute = a.dataset.nav ?? "";
      const on = navRoute === route || (navRoute === "data-centers" && ["skybox", "cipher", "beacon"].includes(route));
      if (a.classList.contains("btn")) continue;
      if (on) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    }
    document.title = view.dataset.title ?? document.title;
    setMenu(false);
    scrollToTarget();
  };

  if (views.length) {
    document.addEventListener("click", (e) => {
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[data-scroll]");
      if (!a) return;
      pendingScroll = a.dataset.scroll ?? null;
      if (a.getAttribute("href") === location.hash || (a.getAttribute("href") === "#home" && !location.hash)) {
        e.preventDefault();
        scrollToTarget();
      }
    });
    window.addEventListener("hashchange", show);
    show();
  }

  /* ---------- hero: dashboard screens ---------- */
  for (const box of $$<HTMLElement>("[data-shots]")) {
    const imgs = $$<HTMLImageElement>(".shot-view img", box);
    const tabs = $$<HTMLButtonElement>("[data-shot]", box);
    const ms = 8000;
    let i = 0;
    let timer = 0;
    let paused = false;
    const go = (n: number) => {
      i = (n + imgs.length) % imgs.length;
      imgs.forEach((img, k) => {
        img.classList.remove("on");
        if (k === i) {
          void img.offsetWidth; // restart the pan
          img.classList.add("on");
        }
      });
      const label = box.querySelector<HTMLElement>("[data-shot-label]");
      if (label) label.textContent = tabs[i]?.dataset.label ?? label.textContent;
      tabs.forEach((t, k) => {
        t.setAttribute("aria-selected", String(k === i));
        const bar = t.querySelector("i");
        if (bar && k === i) {
          bar.style.animation = "none";
          void bar.offsetWidth;
          bar.style.animation = "";
        }
      });
    };
    const start = () => {
      if (reduce || paused) return;
      window.clearInterval(timer);
      box.classList.add("auto");
      box.style.setProperty("--shot-ms", `${ms}ms`);
      timer = window.setInterval(() => go(i + 1), ms);
    };
    const stop = () => {
      window.clearInterval(timer);
      box.classList.remove("auto");
    };
    tabs.forEach((t, k) =>
      t.addEventListener("click", () => {
        paused = true;
        stop();
        go(k);
      }),
    );
    box.addEventListener("mouseenter", stop);
    box.addEventListener("mouseleave", () => {
      if (!paused) {
        go(i);
        start();
      }
    });
    start();
  }

  /* ---------- interest counters ---------- */
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const tickers = $$<HTMLElement>("[data-ticker]");
  if (tickers.length) {
    const start = Date.now();
    const draw = () => {
      for (const t of tickers) {
        const perYear = Number(t.dataset.perYear) || 0;
        const perMs = perYear / (365 * 24 * 3600 * 1000);
        t.textContent = money.format((Date.now() - start) * perMs);
      }
    };
    draw();
    window.setInterval(draw, reduce ? 5000 : 250);
  }

  /* ---------- copy buttons ---------- */
  for (const b of $$<HTMLButtonElement>("[data-copy]")) {
    b.addEventListener("click", () => {
      const text = b.dataset.copy ?? "";
      const done = () => {
        const old = b.textContent;
        b.textContent = "Copied";
        window.setTimeout(() => (b.textContent = old), 1600);
      };
      const select = () => {
        const el = b.parentElement?.querySelector(".sel");
        if (!el) return;
        const r = document.createRange();
        r.selectNodeContents(el);
        const s = window.getSelection();
        s?.removeAllRanges();
        s?.addRange(r);
      };
      try {
        navigator.clipboard.writeText(text).then(done, select);
      } catch {
        select();
      }
    });
  }

  /* ---------- forms ---------- */
  const SUCCESS: Record<FormKind, [string, string]> = {
    subscribe: ["You're on the list.", "Check your inbox for a confirmation. Zoning alerts for your address start once the alert service is live."],
    tip: ["Received.", "Thank you. We check everything against the public record before anything is published, and we will not publish your name without your permission."],
    sponsor: ["Thank you.", "We'll be in touch about sponsoring the build."],
    feedback: ["Thanks for the feedback.", "It goes into the list of what to fix next."],
  };

  const setMsg = (form: HTMLFormElement, kind: "" | "ok" | "err", title: string, body: string) => {
    let box = form.querySelector<HTMLElement>(".form-msg");
    if (!box) {
      box = document.createElement("div");
      box.setAttribute("role", "status");
      form.appendChild(box);
    }
    box.className = `form-msg ${kind}`.trim();
    box.textContent = "";
    const b = document.createElement("b");
    b.textContent = title;
    const s = document.createElement("span");
    s.textContent = body;
    box.append(b, s);
  };

  const validate = (form: HTMLFormElement) => {
    let first: HTMLElement | null = null;
    for (const el of $$<HTMLInputElement | HTMLTextAreaElement>("[required]", form)) {
      const v = el.value.trim();
      let bad = !v;
      if (!bad && el.type === "email") bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      el.setAttribute("aria-invalid", String(bad));
      if (bad && !first) first = el;
    }
    (first as HTMLElement | null)?.focus();
    return !first;
  };

  /* No form service connected yet: hand the message to the visitor's email app,
     addressed to the site inbox, so nothing passes through a third party. */
  const SUBJECT: Record<FormKind, string> = {
    subscribe: "Sign me up for San Angelo DOGE alerts",
    tip: "Tip line",
    sponsor: "Sponsoring the San Angelo DOGE build",
    feedback: "Site feedback",
  };

  const fieldLabel = (el: HTMLInputElement) => {
    const set = el.closest("fieldset")?.querySelector("legend")?.textContent;
    if (set) return set.trim();
    const lab = el.labels?.[0];
    if (!lab) return el.name;
    const clone = lab.cloneNode(true) as HTMLElement;
    clone.querySelectorAll(".opt").forEach((o) => o.remove());
    return (clone.textContent ?? el.name).trim();
  };

  const composeBody = (form: HTMLFormElement) => {
    const rows = new Map<string, string[]>();
    for (const node of Array.from(form.elements)) {
      const el = node as HTMLInputElement;
      if (!el.name || el.name === "_gotcha" || el.type === "submit" || el.type === "button") continue;
      if ((el.type === "checkbox" || el.type === "radio") && !el.checked) continue;
      const v = (el.value ?? "").trim();
      if (!v) continue;
      const k = fieldLabel(el);
      rows.set(k, [...(rows.get(k) ?? []), v]);
    }
    return Array.from(rows, ([k, v]) => `${k}: ${v.join(", ")}`).join("\n\n");
  };

  const showEmailHandoff = (form: HTMLFormElement, kind: FormKind) => {
    const href = `mailto:${cfg.contact}?subject=${encodeURIComponent(SUBJECT[kind])}&body=${encodeURIComponent(composeBody(form))}`;
    let box = form.querySelector<HTMLElement>(".form-msg");
    if (!box) {
      box = document.createElement("div");
      box.setAttribute("role", "status");
      form.appendChild(box);
    }
    box.className = "form-msg handoff";
    box.textContent = "";
    const b = document.createElement("b");
    b.textContent = "One more step: send it from your email.";
    const p = document.createElement("span");
    p.textContent = `The button opens your email app with everything filled in, addressed to ${cfg.contact}. Press send there to finish.`;
    const a = document.createElement("a");
    a.className = "btn btn-sm";
    a.href = href;
    a.textContent = "Open in my email app";
    const alt = document.createElement("span");
    alt.className = "handoff-alt";
    alt.textContent = `If nothing opens, email ${cfg.contact} directly.`;
    box.append(b, p, a, alt);
    if (kind === "tip") {
      const anon = document.createElement("span");
      anon.className = "handoff-alt";
      anon.textContent = "Your email address will show as the sender. To stay anonymous, send it from an address that does not use your name.";
      box.append(anon);
    }
  };

  for (const form of $$<HTMLFormElement>("form[data-form]")) {
    form.addEventListener("input", (e) => {
      const el = e.target as HTMLElement;
      if (el.getAttribute("aria-invalid") === "true") el.setAttribute("aria-invalid", "false");
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const kind = form.dataset.form as FormKind;
      const hp = form.querySelector<HTMLInputElement>(".hp input");
      if (hp?.value) return;
      if (!validate(form)) {
        setMsg(form, "err", "A required field is missing.", "Fill in the highlighted field and send again.");
        return;
      }
      const url = cfg.forms[kind];
      if (!url) {
        showEmailHandoff(form, kind);
        return;
      }
      const data = new FormData(form);
      data.append("page", document.title);
      data.append("sent_at", new Date().toISOString());
      const btn = form.querySelector<HTMLButtonElement>("[type=submit]");
      const label = btn?.textContent ?? "Send";
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Sending";
      }
      fetch(url, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then((r) => {
          if (!r.ok) throw new Error(String(r.status));
          setMsg(form, "ok", SUCCESS[kind][0], SUCCESS[kind][1]);
          form.reset();
        })
        .catch(() => setMsg(form, "err", "That didn't go through.", `Check your connection and send again, or email ${cfg.contact}.`))
        .finally(() => {
          if (btn) {
            btn.disabled = false;
            btn.textContent = label;
          }
        });
    });
  }
})();

export {};
