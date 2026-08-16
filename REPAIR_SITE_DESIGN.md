---
version: alpha
name: Repair Intake Guide
description: 家具・生活道具の修理相談を題材にした静的Webサンプル。案内ページはDecide/Learn、相談入力はConfigure面。
colors:
  primary: "#17211D"
  secondary: "#59655F"
  tertiary: "#155C48"
  neutral: "#F6F7F5"
  surface: "#FFFFFF"
  subtle: "#E8ECE9"
  border: "#C9D0CC"
typography:
  h1:
    fontFamily: Hiragino Sans
    fontSize: 4rem
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.045em"
  h2:
    fontFamily: Hiragino Sans
    fontSize: 2.5rem
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.045em"
  body-md:
    fontFamily: Hiragino Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: Hiragino Sans
    fontSize: 0.8125rem
    fontWeight: 700
    lineHeight: 1.5
rounded:
  sm: 2px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  section: 88px
components:
  page-shell:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  body-copy:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    typography: "{typography.body-md}"
  action-link:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.tertiary}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    height: 44px
  quiet-surface:
    backgroundColor: "{colors.subtle}"
    textColor: "{colors.primary}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
---

## Overview

小規模事業者の案内サイトを想定した自主制作例。対応範囲、受付から返却までの流れ、架空の修理例、手入れメモを読むページはDecide/Learn面として設計する。相談入力ページだけはConfigure面として、ラベル、補助文、フォーカス、44px以上の入力高を優先する。

作品の目的はWeb演出ではなく、6ページを通した情報設計、共通ナビ、モバイル操作、静的入力UIの実装力を示すこと。

## Colors

- 白〜薄い灰緑の中立面に深緑1色を使う。
- ベージュ＋焦げ茶＋テラコッタのcozy craft既定配色は使わない。
- 深緑はリンク、現在地、フォーカス、短い強調に限定する。
- 1つのページ内で暖色と寒色の中立色を混在させない。

## Typography

- 日本語の可読性、外部通信なし、OS間のフォールバックを優先し、Hiragino Sans、Yu Gothic、Meiryoの順で使う。
- 下層ページは大きなマーケティングheroにせず、パンくず・ページ見出し・短い説明へ縮める。
- 全セクションへのeyebrow、英語の雰囲気ラベル、見出し内の別書体italicは使わない。

## Layout

- ホームは「目的 → 相談前に用意するもの → 確認項目 → 受付工程」。抽象heroアートは置かない。
- 順序のある受付工程だけ番号を使う。対象一覧、注意事項、撮影箇所は通常の罫線一覧にする。
- 修理例は比較対象として2列、モバイルは1列。色違いbentoにはしない。
- 入力画面は説明と入力群の2列、760px以下は1列。
- 320pxから1920pxまで横スクロールを発生させない。リンク・メニュー・入力は44px以上。

## Elevation & Depth

- 罫線と余白を主要な区切りにする。
- シャドウはモバイルメニューの重なりを示す場合だけ使用する。
- 色付きカード、グロー、ガラス面、抽象的な円形装飾を使わない。

## Shapes

- 角丸は2pxを基本にし、フォームやfavicon以外へ広げない。
- ピル型のタグやボタン、カード内カードを使わない。

## Components

- action-linkはページ移動と相談入力への導線に使う。ヘッダーの1項目だけをCTAボタン化しない。
- inputはラベルを上、補助文を下に置く。送信ボタンは設けない。
- quiet-surfaceは必要な場合だけ使い、項目ごとに色を変えない。
- 現在地はナビ下線と文字色で示す。装飾的な外部リンク矢印は使わない。

## Do's and Don'ts

- Do: 何を確認するか、どの順番か、何が対象外かを具体的に書く。
- Do: 静的モックであること、送信・保存・外部通信がないことを明示する。
- Do: 工程番号は本当に順序がある箇所だけに使う。
- Don't: 実在事業者、作業実績、価格、納期、保証を捏造しない。
- Don't: 3等分feature card、小見出しの反復、巨大hero、暖色クラフト調、Inter、グラデーション、過剰な影を使わない。
- Don't: フォーム要素を`form`で囲んだり、送信・保存処理を追加したりしない。
