# Amor Alice Premium Site

Amor Aliceのラグドール専門キャッテリー公式ホームページです。
Premiumプラン向けに、ブランド理解、安心材料、見学相談導線を中心に再設計しています。

## 公開構成

- トップページ: 理念、安心できる理由、お迎え後のサポート、各ページへの導線、Contact
- `daily/`: 猫舎の日常
- `kittens/`: 子猫ページ
- `parents/`: 親猫ページ
- `graduates/`: 巣立った子達
- `journey/`: お迎えまでの流れ、Amor Aliceサポートブック
- `faq/`: よくある質問

## 公開方法

GitHub Pagesで `main` ブランチのルートから公開する構成です。
Next.jsの静的出力をこのリポジトリ直下に同期しています。

### 公開後の個別調整

- `graduates/` の複数写真は、`assets/graduates-autoscroll.css` と `assets/graduates-autoscroll.js` で横スクロール・自動送りにしています。
- Next.jsの静的出力を再同期するときは、上記2ファイルと `graduates/index.html` の読み込みタグを残してください。
- `kittens/` の募集カードは、`assets/kittens-listing.css` と `assets/kittens-listing.js` で公開後に差し込んでいます。
- 子猫カードを更新するときは、上記2ファイル、掲載用の `assets/kitten-*.jpg`、各HTMLの読み込みタグを残してください。

## Form

- 見学申し込みフォームはFormSubmit経由で `cattery227.amor.alice@gmail.com` に届く構成です。
- 初回送信時はFormSubmitから確認メールが届くため、受信側で承認が必要です。
