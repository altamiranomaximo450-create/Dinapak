(function () {
  "use strict";

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };

  function safe(fn, name) {
    try { fn(); } catch (e) { if (window.console) console.warn("[" + name + "]", e); }
  }

  // Normaliza texto: minúsculas y sin acentos, para comparar bien.
  function norm(s) {
    return String(s || "")
      .toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function initAiChat() {
    var root = $("[data-ai-chat]");
    var toggle = $("[data-ai-chat-toggle]");
    var panel = $("[data-ai-chat-panel]");
    var body = $("[data-ai-chat-body]");
    var form = $("[data-ai-chat-form]");
    var input = $("[data-ai-chat-input]");
    if (!root || !toggle || !panel || !body || !form || !input) return;

    var data = window.__DINAPAK__ || {};
    var endpoint = data.aiChatEndpoint || "";
    var faq = Array.isArray(data.chatFaq) ? data.chatFaq : [];
    var useServer = endpoint && endpoint.indexOf("TU-SUBDOMINIO") === -1;
    var history = [];
    var sending = false;

    var FALLBACK =
      "Para eso lo mejor es que hablemos directo: completá el formulario de presupuesto de esta página o escribinos por WhatsApp al (011) 0000-0000 y te respondemos a la brevedad. También puedo ayudarte con servicios, presupuestos, ubicación y horarios.";

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

    // Busca la mejor respuesta local según palabras clave.
    function localAnswer(text) {
      var q = norm(text);
      var best = null, bestScore = 0;
      faq.forEach(function (item) {
        var score = 0;
        (item.keywords || []).forEach(function (kw) {
          if (q.indexOf(norm(kw)) !== -1) score += norm(kw).length; // frases largas pesan más
        });
        if (score > bestScore) { bestScore = score; best = item; }
      });
      return best ? best.a : FALLBACK;
    }

    // Muestra los botones de preguntas rápidas (chips).
    function renderChips() {
      var chips = faq.filter(function (f) { return f.chip; });
      if (!chips.length) return;
      var wrap = document.createElement("div");
      wrap.className = "ai-chat-chips";
      chips.forEach(function (item) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "ai-chat-chip";
        b.textContent = item.q;
        b.addEventListener("click", function () {
          wrap.remove();
          handleUser(item.q, item.a);
        });
        wrap.appendChild(b);
      });
      body.appendChild(wrap);
      body.scrollTop = body.scrollHeight;
    }

    // Procesa un mensaje del usuario. Si pasan "quickAnswer", la usa directo.
    function handleUser(text, quickAnswer) {
      addMsg(text, "user");

      if (quickAnswer) {
        var t1 = addTyping();
        setTimeout(function () { t1.remove(); addMsg(quickAnswer, "bot"); }, 450);
        return;
      }

      if (!useServer) {
        var t2 = addTyping();
        setTimeout(function () { t2.remove(); addMsg(localAnswer(text), "bot"); }, 500);
        return;
      }

      // Camino con servidor (Gemini) + respaldo local si falla.
      history.push({ role: "user", text: text });
      sending = true;
      input.disabled = true;
      var typingEl = addTyping();

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: history.slice(0, -1) })
      })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          typingEl.remove();
          var reply = d && d.text ? d.text : localAnswer(text);
          addMsg(reply, "bot");
          history.push({ role: "assistant", text: reply });
        })
        .catch(function () {
          typingEl.remove();
          addMsg(localAnswer(text), "bot");
        })
        .finally(function () {
          sending = false;
          input.disabled = false;
          input.focus();
        });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (sending) return;
      var text = input.value.trim();
      if (!text) return;
      input.value = "";
      handleUser(text);
    });

    // Al cargar: mostrar los botones de preguntas rápidas.
    renderChips();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { safe(initAiChat, "initAiChat"); });
  } else {
    safe(initAiChat, "initAiChat");
  }
})();
