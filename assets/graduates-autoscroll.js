(() => {
  "use strict";

  const galleries = new Map([
    [
      "shelly-letter-01.jpg",
      [
        {
          src: "../assets/shelly-letter-01.jpg",
          alt: "トンネルの中から顔をのぞかせるシェリーちゃん",
        },
        {
          src: "../assets/shelly-letter-02.jpg",
          alt: "毛布の上でくつろぐシェリーちゃん",
        },
      ],
    ],
    [
      "eevee-letter-01.jpg",
      [
        {
          src: "../assets/eevee-letter-01.jpg",
          alt: "ハンモックでこちらを見つめるEeveeちゃん",
        },
        {
          src: "../assets/eevee-letter-02.jpg",
          alt: "カーテンのそばでくつろぐEeveeちゃん",
        },
      ],
    ],
  ]);

  const autoplayDelay = 4200;
  const restartDelay = 2400;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function enhanceGallery(figure) {
    if (figure.dataset.scrollEnhanced === "true") return;

    const currentImage = figure.querySelector(":scope > img");
    const currentSource = currentImage?.getAttribute("src") ?? "";
    const filename = currentSource.split("/").pop();
    const images = galleries.get(filename);

    if (!images || images.length < 2) return;

    const title =
      figure
        .closest(".graduate-letter-card")
        ?.querySelector(".graduate-letter-copy h3")
        ?.textContent?.trim() || "巣立った子";

    const track = document.createElement("div");
    track.className = "graduate-scroll-track";
    track.tabIndex = 0;
    track.setAttribute("role", "region");
    track.setAttribute("aria-roledescription", "カルーセル");
    track.setAttribute("aria-label", `${title}の写真。横にスクロールできます`);

    images.forEach((image, index) => {
      const item = document.createElement("img");
      item.src = image.src;
      item.alt = image.alt;
      item.loading = index === 0 ? "eager" : "lazy";
      item.decoding = "async";
      track.append(item);
    });

    const status = document.createElement("figcaption");
    status.className = "graduate-scroll-status";
    status.innerHTML = `<span>1 / ${images.length}</span><small>横にスワイプ・スクロール</small>`;

    figure.replaceChildren(track, status);
    figure.dataset.scrollEnhanced = "true";

    const counter = status.querySelector("span");
    let currentIndex = 0;
    let direction = 1;
    let timer = 0;
    let restartTimer = 0;
    let scrollFrame = 0;
    let inView = false;
    let interacting = false;

    function updateCounter(index) {
      currentIndex = Math.max(0, Math.min(images.length - 1, index));
      counter.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    function goTo(index, behavior = "smooth") {
      track.scrollTo({
        left: track.clientWidth * index,
        behavior,
      });
      updateCounter(index);
    }

    function stopAutoplay() {
      window.clearInterval(timer);
      timer = 0;
    }

    function startAutoplay() {
      stopAutoplay();
      if (
        reduceMotion.matches ||
        document.hidden ||
        !inView ||
        interacting
      ) {
        return;
      }

      timer = window.setInterval(() => {
        if (currentIndex >= images.length - 1) direction = -1;
        if (currentIndex <= 0) direction = 1;
        goTo(currentIndex + direction);
      }, autoplayDelay);
    }

    function restartAutoplay() {
      window.clearTimeout(restartTimer);
      restartTimer = window.setTimeout(startAutoplay, restartDelay);
    }

    track.addEventListener(
      "scroll",
      () => {
        window.cancelAnimationFrame(scrollFrame);
        scrollFrame = window.requestAnimationFrame(() => {
          const width = track.clientWidth || 1;
          updateCounter(Math.round(track.scrollLeft / width));
        });
      },
      { passive: true },
    );

    track.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const step = event.key === "ArrowRight" ? 1 : -1;
      goTo((currentIndex + step + images.length) % images.length);
    });

    track.addEventListener("pointerdown", () => {
      interacting = true;
      stopAutoplay();
    });

    for (const eventName of ["pointerup", "pointercancel", "pointerleave"]) {
      track.addEventListener(eventName, () => {
        interacting = false;
        restartAutoplay();
      });
    }

    track.addEventListener("mouseenter", () => {
      interacting = true;
      stopAutoplay();
    });

    track.addEventListener("mouseleave", () => {
      interacting = false;
      restartAutoplay();
    });

    track.addEventListener("focusin", () => {
      interacting = true;
      stopAutoplay();
    });

    track.addEventListener("focusout", () => {
      interacting = false;
      restartAutoplay();
    });

    window.addEventListener("resize", () => goTo(currentIndex, "auto"));
    document.addEventListener("visibilitychange", startAutoplay);
    reduceMotion.addEventListener("change", startAutoplay);

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting && entry.intersectionRatio >= 0.45;
          startAutoplay();
        },
        { threshold: [0, 0.45, 1] },
      );
      observer.observe(figure);
    } else {
      inView = true;
      startAutoplay();
    }
  }

  function init() {
    document
      .querySelectorAll(".graduate-letter-media")
      .forEach(enhanceGallery);
  }

  function scheduleInit() {
    window.setTimeout(init, 80);
    window.setTimeout(init, 800);
  }

  if (document.readyState === "complete") {
    scheduleInit();
  } else {
    window.addEventListener("load", scheduleInit, { once: true });
  }
})();
