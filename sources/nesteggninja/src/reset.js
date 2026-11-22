
(function () {
  const RESET_WINDOW_MS = 5000;
  let resetArmedAt = 0;
  let statusEl = null;
  let clearTimer = null;

  function labelIconControls(root) {
    const scope = root || document;
    const controlSelector = "button, [role='button']";
    const controls = [
      ...(scope.matches?.(controlSelector) ? [scope] : []),
      ...scope.querySelectorAll(controlSelector)
    ];
    controls.forEach((control) => {
      if (control.getAttribute("aria-hidden") === "true") return;
      if (control.getAttribute("aria-label") || control.textContent.trim()) return;
      const title = control.getAttribute("title");
      if (title) {
        control.setAttribute("aria-label", title);
        return;
      }
      if (control.querySelector(".lucide-refresh-cw")) {
        control.setAttribute("aria-label", "Restore example plan");
        return;
      }
      if (control.querySelector(".lucide-wallet")) {
        control.setAttribute("aria-label", "Toggle current savings details");
      }
    });

    const fieldSelector = "input:not([type='hidden']), select, textarea";
    const fields = [
      ...(scope.matches?.(fieldSelector) ? [scope] : []),
      ...scope.querySelectorAll(fieldSelector)
    ];
    fields.forEach((field) => {
      if (field.getAttribute("aria-label") || field.getAttribute("aria-hidden") === "true") return;
      const id = field.getAttribute("id");
      const label = id ? document.querySelector(`label[for="${CSS.escape(id)}"]`) : null;
      const wrapperLabel = field.closest(".mantine-InputWrapper-root")?.querySelector("label");
      let name = (label || wrapperLabel)?.textContent?.replace(/\s+/g, " ").trim();
      if (!name && field.classList.contains("mantine-Select-input")) {
        const value = field.value || "";
        if (/^[A-Z]{2}$/.test(value)) name = "Province";
        if (/Fixed Amount|Career Formula/i.test(value)) name = "Pension payout mode";
      }
      if (name) field.setAttribute("aria-label", name);
    });
  }

  function ensureStatus() {
    if (statusEl) return statusEl;
    statusEl = document.createElement("div");
    statusEl.setAttribute("role", "status");
    statusEl.setAttribute("aria-live", "polite");
    statusEl.style.cssText = [
      "position:fixed",
      "left:max(12px, env(safe-area-inset-left))",
      "right:max(12px, env(safe-area-inset-right))",
      "bottom:max(40px, env(safe-area-inset-bottom))",
      "z-index:10000",
      "max-width:520px",
      "margin:0 auto",
      "padding:12px 16px",
      "border:1px solid var(--line-strong)",
      "border-radius:6px",
      "background:var(--surface)",
      "color:var(--ink)",
      "box-shadow:none",
      "font:600 1rem/1.4 var(--sans)",
      "text-align:center",
      "pointer-events:none",
      "opacity:0",
      "transform:translateY(8px)",
      "transition:opacity .16s ease-out, transform .16s ease-out"
    ].join(";");
    document.body.appendChild(statusEl);
    return statusEl;
  }

  window.__nfireStatus = function (message) {
    const el = ensureStatus();
    el.textContent = message;
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
    window.clearTimeout(clearTimer);
    clearTimer = window.setTimeout(() => {
      el.style.opacity = "0";
      el.style.transform = "translateY(8px)";
    }, 4200);
  };

  window.__nfireConfirmReset = function () {
    if (!window.confirm("This replaces your plan with the example. Continue?")) {
      window.__nfireStatus("Nothing changed. Your plan is kept.");
      return false;
    }
    window.__nfireStatus("Example plan restored. Your earlier inputs are replaced.");
    return true;
  };

  function fillContentMeta() {
    try {
      const el = document.getElementById("content-meta");
      if (!el) return;
      const m = JSON.parse(el.textContent);
      const s = "Content version " + m.dataVersion + ", date " + m.date + ", tax year " + ((function () { try { return JSON.parse(document.getElementById("nf-data").textContent).taxYear; } catch (e) { return ""; } })());
      document.querySelectorAll("[data-cm]").forEach((n) => { if (n.textContent !== s) n.textContent = s; });
    } catch (e) { /* static text stays */ }
  }
  fillContentMeta();
  new MutationObserver(fillContentMeta).observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => labelIconControls(document));
  } else {
    labelIconControls(document);
  }
  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) labelIconControls(node);
      });
    });
  }).observe(document.documentElement, { childList: true, subtree: true });
})();

    