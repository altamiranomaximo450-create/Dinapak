(function () {
  "use strict";

  var data = window.__DINAPAK__ || {};
  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  function safe(fn, name) {
    try { fn(); } catch (e) { if (window.console) console.warn("[" + name + "]", e); }
  }

  /* ---------- Splash ---------- */
  function initSplash() {
    var splash = $("[data-splash]");
    if (!splash) return;
    var wordEl = $("[data-splash-word]", splash);
    if (wordEl && wordEl.children.length === 0) {
      var text = wordEl.textContent.trim();
      wordEl.innerHTML = text.split("").map(function (ch, i) {
        return '<span class="splash-letter" style="animation-delay:' + (i * 0.06) + 's">' + (ch === " " ? "&nbsp;" : ch) + "</span>";
      }).join("");
    }
    var hide = function () { splash.classList.add("is-out"); };
    if (document.readyState === "complete") setTimeout(hide, 900);
    else window.addEventListener("load", function () { setTimeout(hide, 700); });
    setTimeout(hide, 4000);
  }

  /* ---------- Nav / mobile menu ---------- */
  function initNav() {
    var burger = $("[data-burger]");
    var menu = $("[data-mobile-menu]");
    if (!burger || !menu) return;
    function toggle(open) {
      burger.classList.toggle("is-open", open);
      menu.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.style.overflow = open ? "hidden" : "";
    }
    burger.addEventListener("click", function () {
      toggle(!menu.classList.contains("is-open"));
    });
    $$("[data-close-menu]", menu).forEach(function (a) {
      a.addEventListener("click", function () { toggle(false); });
    });
  }

  /* ---------- Smooth anchor scroll (native) ---------- */
  function initSmoothScroll() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var navOffset = 80;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - navOffset,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
    });
  }

  /* ---------- Custom cursor ---------- */
  function initCursor() {
    if (!fineHover) return;
    var cursor = $("[data-cursor]");
    var ring = $("[data-cursor-ring]");
    var label = $("[data-cursor-label]");
    if (!cursor || !ring || !label) return;
    var firstMove = false;
    var mx = 0, my = 0, rx = 0, ry = 0;

    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      if (!firstMove) {
        firstMove = true;
        rx = mx; ry = my;
        ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0) translate(-50%,-50%)";
        cursor.classList.add("is-ready");
      }
    });

    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0) translate(-50%,-50%)";
      label.style.transform = "translate3d(" + mx + "px," + (my - 34) + "px,0) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    var targets = $$("[data-cursor-label]");
    targets.forEach(function (el) {
      var text = el.getAttribute("data-cursor-label");
      el.addEventListener("mouseover", function (e) {
        if (el.contains(e.relatedTarget)) return;
        label.textContent = text;
        cursor.classList.add("is-labeled");
      });
      el.addEventListener("mouseout", function (e) {
        if (el.contains(e.relatedTarget)) return;
        cursor.classList.remove("is-labeled");
      });
    });
  }

  /* ---------- Reveal animations (IntersectionObserver, defensive) ---------- */
  function initReveals() {
    var els = $$(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });
    els.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      $$(".reveal:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
      });
    }, 6000);
  }

  /* ---------- Marquees: duplicate content if only one set (defensive) ---------- */
  function initMarquees() {
    /* content already duplicated in HTML — nothing to do, kept for future dynamic marquees */
  }

  /* ---------- Services horizontal showcase ---------- */
  function initServicesShowcase() {
    var pin = $("[data-services-pin]");
    var track = $("[data-services-track]");
    var progress = $("[data-services-progress]");
    if (!pin || !track) return;
    var cards = $$(".service-card", track);
    if (!cards.length) return;

    function setActive(idx) {
      cards.forEach(function (c, i) { c.classList.toggle("is-active", i === idx); });
      if (progress) progress.innerHTML = "<strong>" + String(idx + 1).padStart(2, "0") + "</strong> / " + String(cards.length).padStart(2, "0");
    }

    var isDesktop = window.innerWidth >= 960;

    if (isDesktop && window.gsap && window.ScrollTrigger) {
      var cardWidth = cards[0].getBoundingClientRect().width;
      var distance = function () { return track.scrollWidth - pin.clientWidth; };

      gsap.to(track, {
        x: function () { return -distance(); },
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: function () { return "+=" + (distance() * 1.15); },
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          onUpdate: function (self) {
            var idx = Math.round(self.progress * (cards.length - 1));
            setActive(idx);
          }
        }
      });
      setActive(0);
    } else {
      /* Mobile / no GSAP: native horizontal swipe */
      track.style.overflowX = "auto";
      track.style.scrollSnapType = "x mandatory";
      cards.forEach(function (c) { c.style.scrollSnapAlign = "start"; });

      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var idx = cards.indexOf(entry.target);
            setActive(idx);
          }
        });
      }, { root: track, threshold: 0.6 });
      cards.forEach(function (c) { io.observe(c); });
      setActive(0);
    }
  }

  /* ---------- Tilt on project card ---------- */
  function initTilt() {
    if (!fineHover) return;
    $$("[data-tilt]").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = "perspective(1200px) rotateX(" + (py * -4) + "deg) rotateY(" + (px * 4) + "deg)";
      });
      card.addEventListener("mouseover", function (e) {
        if (card.contains(e.relatedTarget)) return;
        card.style.transition = "transform .1s linear";
      });
      card.addEventListener("mouseout", function (e) {
        if (card.contains(e.relatedTarget)) return;
        card.style.transition = "transform .5s var(--ease-out)";
        card.style.transform = "none";
      });
    });
  }

  /* ---------- Budget form -> WhatsApp ---------- */
  function initBudgetForm() {
    var form = $("[data-budget-form]");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var name = $("#f-name", form).value.trim();
      var contact = $("#f-contact", form).value.trim();
      var type = $("#f-type", form).value.trim();
      var m2 = $("#f-m2", form).value.trim();
      var msg = $("#f-msg", form).value.trim();

      var lines = [
        "Hola Dinapak, quiero pedir un presupuesto.",
        "Nombre: " + name,
        "Contacto: " + contact
      ];
      if (type) lines.push("Tipo de obra: " + type);
      if (m2) lines.push("m² aprox.: " + m2);
      if (msg) lines.push("Mensaje: " + msg);

      var text = encodeURIComponent(lines.join("\n"));
      window.open("https://wa.me/5491146877629?text=" + text, "_blank", "noopener");
    });
  }

  /* ---------- Boot ---------- */
  function boot() {
    safe(initSplash, "initSplash");
    safe(initNav, "initNav");
    safe(initSmoothScroll, "initSmoothScroll");
    safe(initCursor, "initCursor");
    safe(initReveals, "initReveals");
    safe(initMarquees, "initMarquees");
    safe(initTilt, "initTilt");
    safe(initBudgetForm, "initBudgetForm");

    if (window.gsap && window.ScrollTrigger) {
      try { gsap.registerPlugin(ScrollTrigger); } catch (_) {}
      safe(initServicesShowcase, "initServicesShowcase");
    } else {
      safe(initServicesShowcase, "initServicesShowcase");
    }

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
