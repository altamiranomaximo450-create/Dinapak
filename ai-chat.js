(function () {
  "use strict";

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };

  function safe(fn, name) {
    try { fn(); } catch (e) { if (window.console) console.warn("[" + name + "]", e); }
  }

  function initAiChat() {
    var root = $("[data-ai-chat]");
    var toggle = $("[data-ai-chat-toggle]");
    var panel = $("[data-ai-chat-panel]");
    var body = $("[data-ai-chat-body]");
    var form = $("[data-ai-chat-form]");
    var input = $("[data-ai-chat-input]");
    if (!root || !toggle || !panel || !body || !form || !input) return;

    var endpoint = (window.__DINAPAK__ || {}).aiChatEndpoint || "";
    var history = [];
    var sending = false;

    function open(state) {
      root.classList.toggle("is-open", state);
      toggle.setAttribute("aria-expanded", state ? "true" : "false");
      panel.setAttribute("aria-hidden", state ? "false" : "true");
      if (state) setTimeout(function () { input.focus(); }, 300);
    }

    toggle.addEventListener("click", function () {
      open(!root.classList.contains("is-open"));
    });

    function addMsg(text, who) {
      var el = document.createElement("div");
      el.className = "ai-chat-msg is-" + who;
      el.textContent = text;
      body.appendChild(el);
      body.scrollTop = body.scrollHeight;
      return el;
    }

    function addTyping() {
      var el = document.createElement("div");
      el.className = "ai-chat-msg is-bot is-typing";
      el.innerHTML = '<span class="ai-chat-dot"></span><span class="ai-chat-dot"></span><span class="ai-chat-dot"></span>';
      body.appendChild(el);
      body.scrollTop = body.scrollHeight;
      return el;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (sending) return;
      var text = input.value.trim();
      if (!text) return;

      if (!endpoint || endpoint.indexOf("TU-SUBDOMINIO") !== -1) {
        addMsg(text, "user");
        input.value = "";
        addMsg("El asistente todavía no está conectado. Escribinos por WhatsApp o completá el formulario de presupuesto y te respondemos a la brevedad.", "bot");
        return;
      }

      addMsg(text, "user");
      history.push({ role: "user", text: text });
      input.value = "";
      sending = true;
      input.disabled = true;

      var typingEl = addTyping();

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: history.slice(0, -1) })
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          typingEl.remove();
          var reply = data.text || "No pude responder en este momento. Probá de nuevo o escribinos por WhatsApp.";
          addMsg(reply, "bot");
          history.push({ role: "assistant", text: reply });
        })
        .catch(function () {
          typingEl.remove();
          addMsg("Hubo un problema de conexión. Probá de nuevo en un momento o escribinos por WhatsApp.", "bot");
        })
        .finally(function () {
          sending = false;
          input.disabled = false;
          input.focus();
        });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { safe(initAiChat, "initAiChat"); });
  } else {
    safe(initAiChat, "initAiChat");
  }
})();
