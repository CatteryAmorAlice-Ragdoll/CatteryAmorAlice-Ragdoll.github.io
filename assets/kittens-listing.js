(() => {
  "use strict";

  const groups = [
    {
      mother: "アクア",
      description: "アクアが大切に育てている5匹の子猫たちです。",
      kittens: [
        {
          number: "03358",
          color: "シールポイントバイカラー",
          sex: "男の子",
          image: "/assets/kitten-aqua-03358.jpg",
          alt: "こちらを見つめるアクアのシールポイントバイカラーの男の子",
        },
        {
          number: "03359",
          color: "シールポイントバイカラー",
          sex: "女の子 ①",
          image: "/assets/kitten-aqua-03359.jpg",
          alt: "少し上を見つめるアクアのシールポイントバイカラーの女の子",
        },
        {
          number: "03360",
          color: "ブルーポイントバイカラー",
          sex: "男の子 ②",
          image: "/assets/kitten-aqua-03360.jpg",
          alt: "正面を見つめて座るアクアのブルーポイントバイカラーの男の子",
        },
        {
          number: "03361",
          color: "シールポイントバイカラー",
          sex: "女の子 ②",
          image: "/assets/kitten-aqua-03361.jpg",
          alt: "ふんわりと座るアクアのシールポイントバイカラーの女の子",
        },
        {
          number: "03362",
          color: "ブルーポイントバイカラー",
          sex: "男の子 ①",
          image: "/assets/kitten-aqua-03362.jpg",
          alt: "青い瞳でこちらを見つめるアクアのブルーポイントバイカラーの男の子",
        },
      ],
    },
    {
      mother: "カレン",
      description: "カレンのそばで、ゆっくり成長している5匹の子猫たちです。",
      kittens: [
        {
          number: "02241",
          color: "シールポイントミテッド",
          sex: "男の子 ③",
          image: "/assets/kitten-karen-02241.jpg",
          alt: "白いマットの上でこちらを見るカレンのシールポイントミテッドの男の子",
        },
        {
          number: "02243",
          color: "シールポイントミテッド",
          sex: "男の子 ②",
          image: "/assets/kitten-karen-02243.jpg",
          alt: "正面を向いて座るカレンのシールポイントミテッドの男の子",
        },
        {
          number: "02244",
          color: "シールポイントミテッド",
          sex: "男の子 ①",
          image: "/assets/kitten-karen-02244.jpg",
          alt: "白いマットの上でくつろぐカレンのシールポイントミテッドの男の子",
        },
        {
          number: "02247",
          color: "シールポイントミテッド",
          sex: "女の子",
          image: "/assets/kitten-karen-02247.jpg",
          alt: "マットから顔をのぞかせるカレンのシールポイントミテッドの女の子",
        },
        {
          number: "02248",
          color: "ブルーポイントバイカラー",
          sex: "男の子",
          image: "/assets/kitten-karen-02248.jpg",
          alt: "指にそっと触れるカレンのブルーポイントバイカラーの男の子",
        },
      ],
    },
  ];

  function createKittenCard(kitten, mother) {
    const article = document.createElement("article");
    article.className = "kitten-listing-card";
    article.innerHTML = `
      <figure class="kitten-listing-photo">
        <img src="${kitten.image}" alt="${kitten.alt}" loading="lazy" decoding="async">
      </figure>
      <div class="kitten-listing-body">
        <div class="kitten-listing-topline">
          <span class="kitten-listing-status">ご家族募集中</span>
          <small class="kitten-listing-number">お問い合わせ番号 ${kitten.number}</small>
        </div>
        <h4>${kitten.color}</h4>
        <dl class="kitten-listing-meta">
          <div><dt>性別</dt><dd>${kitten.sex}</dd></div>
          <div><dt>母猫</dt><dd>${mother}</dd></div>
        </dl>
        <a class="kitten-listing-cta" href="/#contact">この子について相談する</a>
      </div>
    `;
    return article;
  }

  function createListing() {
    const shell = document.createElement("div");
    shell.className = "kitten-listing-shell";
    shell.dataset.kittenListing = "true";

    const note = document.createElement("div");
    note.className = "kitten-listing-note";
    note.innerHTML = `
      <p class="eyebrow">AVAILABLE KITTENS</p>
      <h3>ご家族を募集している子猫たち</h3>
      <p>2026年7月18日に撮影した写真です。体調や成長、お迎え時期は一匹ずつ異なるため、最新の状況はお問い合わせ時に丁寧にご案内します。</p>
    `;
    shell.append(note);

    groups.forEach((group) => {
      const section = document.createElement("section");
      section.className = "kitten-family-group";
      section.setAttribute("aria-labelledby", `kitten-family-${group.mother}`);

      const heading = document.createElement("div");
      heading.className = "kitten-family-heading";
      heading.innerHTML = `
        <div>
          <h3 id="kitten-family-${group.mother}">母猫 ${group.mother}の子たち</h3>
          <p>${group.description}</p>
        </div>
        <span>${group.kittens.length}匹掲載</span>
      `;

      const grid = document.createElement("div");
      grid.className = "kitten-listing-grid";
      group.kittens.forEach((kitten) => {
        grid.append(createKittenCard(kitten, group.mother));
      });

      section.append(heading, grid);
      shell.append(section);
    });

    return shell;
  }

  function updateStatus() {
    const items = document.querySelectorAll(".kitten-status-grid > div");
    if (items.length < 3) return;

    const availableCount = items[0].querySelector("strong");
    const preparationCount = items[2].querySelector("strong");
    const preparationLabel = items[2].querySelector("span");

    if (availableCount) availableCount.textContent = "10";
    if (preparationCount) preparationCount.textContent = "10匹掲載中";
    if (preparationLabel) preparationLabel.textContent = "7月18日撮影";
  }

  function enhancePage() {
    updateStatus();

    if (document.querySelector("[data-kitten-listing='true']")) return;
    const emptyCard = document.querySelector(".kitten-empty-card");
    if (!emptyCard) return;
    emptyCard.replaceWith(createListing());
  }

  let scheduled = 0;
  function scheduleEnhancement() {
    window.clearTimeout(scheduled);
    scheduled = window.setTimeout(enhancePage, 700);
  }

  const observer = new MutationObserver(scheduleEnhancement);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleEnhancement, { once: true });
  } else {
    scheduleEnhancement();
  }

  window.setTimeout(enhancePage, 1400);
})();
