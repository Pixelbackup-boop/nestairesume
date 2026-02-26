/**
 * Japanese (ja) locale data for cover letter example generation.
 * Imported by generate-locale-cover-letters.mjs via:
 *   await import('./locale-data/cover-letter-ja.mjs')
 *
 * Keyword-optimized: 志望動機書, カバーレター, 送付状, 添え状
 */

import { JOB_TITLES as RESUME_TITLES } from './resume-ja.mjs';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: '田中 美咲',
  authorBio: 'キャリア開発と志望動機書・カバーレターの作成支援に10年以上の経験を持つ専門家。日本の転職市場に精通し、数千人の求職者の書類選考突破をサポート。',
  titlePattern: (job) => `${job}の志望動機・カバーレター例文｜書き方ガイド 2026`,
  descriptionPattern: (job) => `${job}の志望動機書・カバーレターの例文とテンプレート。採用担当者に響く書き方のコツと2026年の転職・就職活動に使えるサンプルをご紹介。`,
};

// ─── JOB TITLES (English → Japanese) ─────────────────────────────────────────

export const JOB_TITLES = {
  ...RESUME_TITLES,
  'Bookkeeper': '簿記担当',
  'Corporate Trainer': '企業研修トレーナー',
  'Customer Service Representative': 'カスタマーサービス担当',
  'EMT/Paramedic': '救急救命士',
  'Frontend Developer': 'フロントエンドデベロッパー',
  'Healthcare Administrator': '医療事務管理者',
  'Human Resources Manager': '人事マネージャー',
  'Machinist': '機械工',
  'Registered Nurse': '正看護師',
  'Solutions Architect': 'ソリューションアーキテクト',
  'Systems Administrator': 'システム管理者',
  'Tax Accountant': '税理士',
};

// ─── CATEGORIES (English → Japanese) ──────────────────────────────────────────

export const CATEGORIES = {
  Technology: 'テクノロジー',
  Healthcare: '医療・ヘルスケア',
  'Food Service': '飲食サービス',
  Hospitality: 'ホスピタリティ',
  Trades: '技能職',
  Creative: 'クリエイティブ',
  Education: '教育',
  Marketing: 'マーケティング',
  Government: '公務員',
  Business: 'ビジネス',
  Sales: '営業',
  Engineering: 'エンジニアリング',
  'Business & Finance': 'ビジネス・金融',
  Legal: '法務',
  HR: '人事',
  'Skilled Trades': '技能専門職',
  'Real Estate': '不動産',
  'Customer Service': 'カスタマーサービス',
  'Animal Care': '動物ケア',
  Administrative: '事務・管理',
  Transportation: '運輸',
  Logistics: '物流',
  Fitness: 'フィットネス',
  Cleaning: '清掃',
  Retail: '小売',
  Management: 'マネジメント',
  'Social Services': '福祉・社会サービス',
  Manufacturing: '製造',
  Accounting: '会計',
  Construction: '建設',
  Security: 'セキュリティ',
  Science: '科学',
  'Health & Fitness': '健康・フィットネス',
  Research: '研究',
  Finance: '金融',
  'Writing & Content': 'ライティング・コンテンツ',
  'Supply Chain': 'サプライチェーン',
  Quality: '品質管理',
  Media: 'メディア',
  Maritime: '海事',
  'Law Enforcement': '法執行',
  Facilities: '施設管理',
  Executive: '経営幹部',
  Events: 'イベント',
  'Entry-Level': '新卒・第二新卒',
  Entrepreneurship: '起業',
  Consulting: 'コンサルティング',
  Childcare: '保育',
  'Banking & Finance': '銀行・金融',
  Banking: '銀行',
  Aviation: '航空',
  Automotive: '自動車',
  Architecture: '建築',
};

// ─── HELPERS ────────────────────────────────────────────────────────────────

function normalizeCategory(category) {
  const c = category.toLowerCase();
  if (c.includes('hospitality') || c.includes('hotel')) return 'Hospitality';
  if (c.includes('tech') || c.includes('software') || c.includes('it')) return 'Technology';
  if (c.includes('engineering')) return 'Engineering';
  if (c.includes('health') || c.includes('medical') || c.includes('nursing')) return 'Healthcare';
  if (c.includes('finance') || c.includes('accounting') || c.includes('banking')) return 'Finance';
  if (c.includes('food') || c.includes('culinary') || c.includes('restaurant')) return 'Food Service';
  if (c.includes('trade') || c.includes('construction') || c.includes('manufacturing') || c.includes('skilled')) return 'Trades';
  if (c.includes('creative') || c.includes('design') || c.includes('art') || c.includes('media') || c.includes('writing')) return 'Creative';
  if (c.includes('education') || c.includes('teaching') || c.includes('childcare')) return 'Education';
  if (c.includes('admin') || c.includes('office') || c.includes('executive') || c.includes('facilities')) return 'Administrative';
  if (c.includes('sales') || c.includes('retail')) return 'Sales';
  if (c.includes('marketing')) return 'Marketing';
  if (c.includes('hr') || c.includes('human resource')) return 'HR';
  if (c.includes('customer') || c.includes('support')) return 'Customer Service';
  if (c.includes('logistics') || c.includes('warehouse') || c.includes('supply') || c.includes('transport')) return 'Logistics';
  if (c.includes('government') || c.includes('law enforcement') || c.includes('security') || c.includes('police')) return 'Government';
  if (c.includes('legal') || c.includes('consulting')) return 'Legal';
  if (c.includes('science') || c.includes('research')) return 'Science';
  if (c.includes('fitness') || c.includes('animal')) return 'Fitness';
  if (c.includes('cleaning')) return 'Cleaning';
  if (c.includes('aviation') || c.includes('automotive') || c.includes('maritime')) return 'Logistics';
  if (c.includes('event') || c.includes('entrepreneurship')) return 'Business';
  if (c.includes('entry')) return 'Entry-Level';
  return 'default';
}

// ─── CATEGORY OPENERS ───────────────────────────────────────────────────────

const CATEGORY_OPENERS = {
  Technology: (job) => `テクノロジー分野では、${job}の志望動機書・カバーレターは単なる技術スキルの列挙にとどまらず、技術力がどのように具体的な問題解決やビジネス価値の創出に繋がったかを示すことが重要です。採用担当者は、あなたの専門知識とポジションの要件との直接的なつながりを求めています。`,
  Healthcare: (job) => `医療分野では、患者ケアへの真摯な姿勢が重視されます。${job}の志望動機書では、臨床スキルと人間性の両面を示す必要があります。採用担当者は、技術的な資格に加え、職務の倫理的・人間的側面を理解している候補者を求めています。`,
  Finance: (job) => `金融・会計分野の採用担当者は、分析力と誠実さを兼ね備えた候補者を求めています。${job}の志望動機書では、財務業務を正確に遂行し、業界の規制基準を遵守する能力を示しましょう。`,
  'Food Service': (job) => `飲食業界では、${job}の志望動機書は食への情熱とハイペースな環境での実力を伝える必要があります。採用担当者は、チームワーク、衛生管理の知識、顧客体験への真摯な取り組みを示す候補者を重視します。`,
  Hospitality: (job) => `ホスピタリティ業界では、サービスの卓越性を体現する候補者が評価されます。${job}の志望動機書では、おもてなしの精神、細部への配慮、お客様に忘れられない体験を提供する能力を示しましょう。`,
  Trades: (job) => `技能職分野では、${job}の効果的な志望動機書は実務経験、資格、そして安全に対する意識を中心にアピールします。採用担当者は、信頼でき、自立的に高品質な仕事を納期内に遂行できる職人を求めています。`,
  Engineering: (job) => `エンジニアリング職では、${job}の志望動機書は複雑な問題を体系的に解決する能力を示す必要があります。採用担当者は、成功裏に遂行したプロジェクト、技術ツールの習熟度、業界の制約条件への理解の証拠を求めています。`,
  Creative: (job) => `クリエイティブ分野では、${job}の志望動機書自体があなたの才能のサンプルとなります。芸術的なセンスを示しつつ、ビジネス目標の理解と納期遵守能力もアピールしましょう。`,
  Education: (job) => `教育分野では、知識伝達への真の使命感を示す候補者が評価されます。${job}の志望動機書では、教育哲学、多様な学習者への対応力、教育の成功への貢献を反映させましょう。`,
  Administrative: (job) => `事務・管理職では、${job}の志望動機書は組織力、機密保持能力、そして多才さを示す必要があります。採用担当者は、ニーズを先読みし、複数の優先事項を同時に管理できる候補者を求めています。`,
  Sales: (job) => `${job}の志望動機書は、あなたの最初の営業プレゼンテーションです。採用担当者は、説得力のあるコミュニケーション能力、顧客ニーズの把握力、そして明確な価値提案を評価します。`,
  Marketing: (job) => `マーケティング分野では、${job}の志望動機書はコミュニケーション戦略の理解と測定可能な成果を生む能力を示す必要があります。戦略的思考と実行力の両方を具体的な事例で証明しましょう。`,
  HR: (job) => `人事職では、${job}の志望動機書は組織のダイナミクスと企業の人的側面への理解を示す必要があります。従業員の利益と組織の利益のバランスを取る能力をアピールしましょう。`,
  'Customer Service': (job) => `カスタマーサービス職では、${job}の志望動機書は傾聴力、忍耐力、問題解決力を示す必要があります。採用担当者は、困難な状況をお客様にとってポジティブな体験に変える能力を持つ候補者を求めています。`,
  Logistics: (job) => `物流分野では、正確性と業務効率が重視されます。${job}の志望動機書は、複雑なオペレーションの管理、納期遵守、プロセス最適化の能力を示しましょう。`,
  Government: (job) => `公務員の応募では、民間企業とは異なる慣例に従います。${job}の志望動機書は、公共サービスへの貢献意識、規制の枠組みの理解、確立された手続きの中で業務を遂行する能力を示しましょう。`,
  Legal: (job) => `法務分野では、${job}の志望動機書は内容も形式も完璧であることが求められます。採用担当者は、知的厳密さ、分析能力、法律用語の習熟度を評価します。`,
  Science: (job) => `科学分野では、${job}の志望動機書は分析的アプローチと研究への貢献を示す必要があります。方法論的厳密さ、重要な論文やプロジェクト、複雑な概念をわかりやすく説明する能力を証明しましょう。`,
  Fitness: (job) => `フィットネス・ウェルネス分野では、${job}の志望動機書は指導への情熱と専門的な知識を伝える必要があります。採用担当者は、クライアントの健康と成長に真に貢献する資格を持った専門家を求めています。`,
  Cleaning: (job) => `清掃分野では、${job}の志望動機書は信頼性、細部への注意力、プロフェッショナルな清掃技術の知識を示しましょう。採用担当者は、時間厳守で自立的に高い清潔基準を維持できる候補者を重視します。`,
  'Entry-Level': (job) => `新卒や第二新卒の場合、${job}の志望動機書は経験不足を熱意、モチベーション、学業やインターンで培った転用可能なスキルで補う必要があります。採用担当者は、迅速な学習能力と貢献への真の意欲を持つ若い人材を評価します。`,
  Business: (job) => `ビジネス分野では、${job}の志望動機書は戦略的思考と結果志向を示す必要があります。採用担当者は、企業の成長に貢献でき、ビジネス課題を明確に理解し、具体的なソリューションを提案できる候補者を求めています。`,
  default: (job) => `効果的な${job}の志望動機書は、あなたのスキルと企業の具体的なニーズとの直接的なつながりを示します。ポジションへの理解、最も関連性の高い実績、そしてこの機会への真の意欲を伝えましょう。`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  return [
    `${jobTitle} 志望動機`,
    `${jobTitle} カバーレター`,
    `${jobTitle} 志望動機 例文`,
    `志望動機書 書き方`,
    `カバーレター テンプレート`,
    `転職 志望動機`,
    `志望動機 サンプル 2026`,
    `送付状 書き方`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  return [
    {
      question: `${jobTitle}の志望動機書・カバーレターはどのように書けばよいですか？`,
      answer: `企業名と応募ポジションを明記したパーソナライズされた冒頭から始めましょう。次に、${jobTitle}のポジション要件に関連する2〜3の具体的な実績を、数値と測定可能な成果を交えて展開します。最後に、志望動機を表明し、面接の機会を求める結びで締めくくりましょう。`,
    },
    {
      question: `${jobTitle}の志望動機書の理想的な長さはどのくらいですか？`,
      answer: `${jobTitle}の志望動機書は1ページ以内、約400〜600文字が目安です。採用担当者は各応募書類に多くの時間を割けないため、簡潔さとインパクトを重視しましょう。各段落が応募ポジションに関連する新しい情報を提供するようにします。`,
    },
    {
      question: `志望動機書で履歴書の内容をそのまま繰り返してもよいですか？`,
      answer: `いいえ、志望動機書は履歴書を補完するものであり、重複させるべきではありません。実績の背景や文脈を説明し、転職の動機を伝え、最も関連性の高い成果を掘り下げるために活用しましょう。数字の裏にあるストーリーを語り、あなたの人間性を伝える場として使いましょう。`,
    },
    {
      question: `${jobTitle}の応募に志望動機書は必ず必要ですか？`,
      answer: `求人票に明記されていなくても、丁寧に書かれた${jobTitle}の志望動機書は、同等のスキルを持つ候補者の中で差をつける要素になります。あなたの真剣さ、ポジションへの真の関心、そしてプロフェッショナルなコミュニケーション能力を示すことができます。`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, slug) {
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 4).join('、') || '応募ポジションに関連する主要スキル';
  const skill1 = skills[0] || 'プロジェクト管理';
  const skill2 = skills[1] || 'チームワーク';
  const skill3 = skills[2] || 'コミュニケーション';
  const skill4 = skills[3] || '問題解決';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  return `
## ${jobTitle}の志望動機書・カバーレターで差をつけるポイント

${opener}

説得力のある${jobTitle}の志望動機書は、単にキャリアを要約するだけではありません。ポジションと企業の課題を理解し、それに応えるための具体的なスキルを持っていることを示す機会です。あなたのプロフェッショナルな人間性を伝え、他の候補者との差別化を図りましょう。

## ${jobTitle}の志望動機書・カバーレター例文

> **件名：${jobTitle}ポジションへの応募（求人番号：[参照番号]）**
>
> 拝啓
>
> [求人媒体名]にて拝見した${jobTitle}の求人に、強い関心を持ちご連絡いたしました。${skill1}および${skill2}における経験を活かし、貴社に大きく貢献できると確信しております。
>
> [現職/前職]では、${topSkills}の分野で確かな専門性を培いました。特に注目すべき実績として、${skill1}に関する[具体的な数値を含む実績]を達成し、チームの成果を大幅に向上させることができました。また、${skill3}のスキルを活かし、[${skill3}に関連する貢献の具体例]を実現しました。
>
> 貴社のこのポジションに特に魅力を感じる点は、[企業やポジションに関する具体的な理由]です。${skill4}のスキルと業界での経験を活かし、貴社の目標達成に効果的に貢献できると考えております。
>
> 面接の機会をいただき、私の経歴が貴社のご期待にどのようにお応えできるか、詳しくご説明できれば幸いです。ご都合のよい日時にご連絡いただければ幸甚です。
>
> ご検討のほど、よろしくお願い申し上げます。
>
> 敬具
>
> [氏名]

*この例文の角括弧内の情報を、ご自身の情報と応募先企業の情報に置き換えてご使用ください。*

## 効果的な志望動機書の重要要素

### パーソナライズされた冒頭

「貴社の求人に応募いたします」のような定型的な表現は避けましょう。企業名、ポジションの参照番号、そして応募の具体的な理由を明記します。採用担当者は、コピー&ペーストの汎用的な冒頭文をすぐに見抜きます。企業の最近のプロジェクトや、あなたのキャリアと共鳴する企業の価値観に言及しましょう。

### 数値化された実績

すべての主張は具体的な数字で裏付ける必要があります。「プロセスを改善しました」ではなく、「${skill1}の新しい手法を導入し、処理時間を30%短縮しました」と書きましょう。測定可能な結果は候補者の信頼性を高め、${jobTitle}としての仕事の実際のインパクトを採用担当者が評価しやすくします。

### 企業とのつながり

企業について十分なリサーチを行ったことを示しましょう。${topSkills}のスキルで貢献できる課題や戦略目標を特定します。この部分は、あなたの応募が的を射た熟考されたものであり、単なる機会主義的なものではないことを証明します。

### 価値提案を含む結論

結論は単なる定型的な挨拶であってはなりません。あなたが持つユニークな強みを一文で要約し、具体的に面接を提案しましょう。${jobTitle}のポジションへの熱意を再確認し、ご都合を伺う姿勢を示しましょう。

## 経験レベル別アドバイス

### 新卒・第二新卒

社会人経験が少ない場合は、インターンシップ、学術プロジェクト、転用可能なスキルを活用しましょう。学業がどのように${jobTitle}のポジションに備えてくれたかを説明します。意欲、迅速な学習能力、関連する課外活動をアピールしましょう。

### 中堅プロフェッショナル

数年の経験がある場合は、${jobTitle}の応募ポジションに最も関連する2〜3の実績を厳選しましょう。すべてを網羅しようとせず、あなたの付加価値を最も効果的に示す成果に集中します。

### シニア・管理職

このレベルでは、${jobTitle}の志望動機書は戦略的ビジョンとチーム・大規模プロジェクトを率いる能力を反映する必要があります。企業レベルの実績を前面に出しましょう：成功した変革、実現したコスト削減、構築したチーム。

## 志望動機書でよくある失敗

- **汎用的でパーソナライズされていない志望動機書を送る** — 採用担当者は大量送信された定型文をすぐに見抜きます。${jobTitle}の各応募に対して、企業名、ポジション、応募理由を明記したカスタマイズされた志望動機書を作成しましょう。

- **履歴書の内容をそのまま繰り返す** — 志望動機書は履歴書を補完するものであり、重複させるものではありません。実績の背景を説明し、キャリアの転機を説明し、あなたの人間性を伝えるために活用しましょう。

- **すべての文を「私は」で始める** — 自分中心の志望動機書は視野の狭さを感じさせます。あなたが提供できることと企業が求めていることを交互に示しましょう。

- **誤字脱字やフォーマットの乱れを放置する** — 誤字のある志望動機書は、プロフェッショナリズムの欠如を示すネガティブなシグナルです。提出前に必ず見直しを行い、第三者にも確認を依頼しましょう。

- **具体的なアクションの呼びかけなしに終わる** — 面接や電話の提案なしに終わると、採用担当者に次のステップの指針を与えません。常に明確な提案とあなたの対応可能日を伝えて締めくくりましょう。

## プロフェッショナルな履歴書で志望動機書を補完しましょう

説得力のある志望動機書には、それに見合う履歴書が必要です。${jobTitle}の応募書類全体の一貫性を確保しましょう：

- [無料の履歴書作成ツール](/ja/builder)で、ATS最適化されたプロフェッショナルな履歴書を作成
- [${jobTitle}の履歴書サンプル](/ja/resume-examples/${slug})を参照して、業界に適したテンプレートを確認
- [AIカバーレター作成ツール](/ja/tools/cover-letter)で、プロフィールに合わせた志望動機書を自動生成

完成度の高い応募書類セット — 整った履歴書とパーソナライズされた志望動機書 — は、${jobTitle}のポジションで面接を獲得するチャンスを大幅に高めます。
`;
}
