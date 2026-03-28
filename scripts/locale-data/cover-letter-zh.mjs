/**
 * Chinese Simplified (zh) locale data for cover letter example generation.
 * Imported by generate-locale-cover-letters.mjs via:
 *   await import('./locale-data/cover-letter-zh.mjs')
 *
 * Keyword source: seo/chinese-top-100-keywords.csv
 * Top terms: 求职信 (10K), 自荐信 (5K), 求职信范文 (1K),
 *            求职信模板 (500), 求职信怎么写 (500), 自荐信范文 (500)
 */

import { JOB_TITLES as RESUME_TITLES } from './resume-zh.mjs';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: '李明辉',
  authorBio: '资深职业发展顾问与求职信撰写专家，拥有十余年人力资源咨询经验。深谙中国求职市场的招聘流程与企业用人偏好，已帮助数千名求职者成功通过简历筛选并获得面试机会。',
  titlePattern: (job) => `${job} 求职信范文 | 撰写指南 2026`,
  descriptionPattern: (job) => `${job} 求职信范文与自荐信模板。掌握打动HR的求职信写作技巧，附2026年最新求职信样本，助您顺利获得面试机会。`,
};

// ─── JOB TITLES (English → Chinese) ─────────────────────────────────────────

export const JOB_TITLES = {
  ...RESUME_TITLES,
  'Bookkeeper': '记账员',
  'Corporate Trainer': '企业培训师',
  'Customer Service Representative': '客服代表',
  'EMT/Paramedic': '急救医护人员',
  'Frontend Developer': '前端开发工程师',
  'Healthcare Administrator': '医疗行政管理人员',
  'Human Resources Manager': '人力资源经理',
  'Machinist': '机械加工技师',
  'Registered Nurse': '注册护士',
  'Solutions Architect': '解决方案架构师',
  'Systems Administrator': '系统管理员',
  'Tax Accountant': '税务会计师',
};

// ─── CATEGORIES (English → Chinese) ─────────────────────────────────────────

export const CATEGORIES = {
  Technology: '技术',
  Healthcare: '医疗',
  'Food Service': '餐饮服务',
  Hospitality: '酒店管理',
  Trades: '技工',
  Creative: '创意设计',
  Education: '教育',
  Marketing: '市场营销',
  Government: '政府机关',
  Business: '商业',
  Sales: '销售',
  Engineering: '工程',
  'Business & Finance': '商业与金融',
  Legal: '法律',
  HR: '人力资源',
  'Skilled Trades': '专业技工',
  'Real Estate': '房地产',
  'Customer Service': '客户服务',
  'Animal Care': '动物护理',
  Administrative: '行政管理',
  Transportation: '交通运输',
  Logistics: '物流',
  Fitness: '健身',
  Cleaning: '保洁',
  Retail: '零售',
  Management: '管理',
  'Social Services': '社会服务',
  Manufacturing: '制造业',
  Accounting: '会计',
  Construction: '建筑',
  Security: '安保',
  Science: '科学',
  'Health & Fitness': '健康与健身',
  Research: '科研',
  Finance: '金融',
  'Writing & Content': '写作与内容',
  'Supply Chain': '供应链',
  Quality: '质量管理',
  Media: '媒体',
  Maritime: '航海',
  'Law Enforcement': '执法',
  Facilities: '设施管理',
  Executive: '高管',
  Events: '活动策划',
  'Entry-Level': '应届生与转行',
  Entrepreneurship: '创业',
  Consulting: '咨询',
  Childcare: '幼儿教育',
  'Banking & Finance': '银行与金融',
  Banking: '银行',
  Aviation: '航空',
  Automotive: '汽车',
  Architecture: '建筑设计',
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

export { normalizeCategory };

// ─── CATEGORY OPENERS ───────────────────────────────────────────────────────

const CATEGORY_OPENERS = {
  Technology: (job) => `在技术领域，${job}的求职信不应仅仅罗列技术技能，而要展示您的技术能力如何转化为实际的问题解决与业务价值创造。招聘经理关注的是您的专业知识与岗位需求之间的直接关联。`,
  Healthcare: (job) => `在医疗行业，对患者护理的真挚奉献至关重要。${job}的自荐信需要同时展现临床能力与人文关怀。招聘方不仅看重专业资质，更重视求职者对岗位伦理层面和人文层面的深刻理解。`,
  Finance: (job) => `金融与会计领域的招聘经理青睐兼具分析能力与严谨态度的求职者。${job}的求职信应体现您准确执行财务工作并遵守行业法规的能力。`,
  'Food Service': (job) => `在餐饮行业，${job}的自荐信需要传达对美食的热情以及在高强度环境中出色工作的能力。招聘方重视能够展现团队协作精神、食品安全知识和优质客户服务意识的求职者。`,
  Hospitality: (job) => `在酒店管理行业，追求卓越服务的求职者最受青睐。${job}的求职信应展示您的服务意识、细致入微的关怀，以及为客人创造难忘体验的能力。`,
  Trades: (job) => `在技工领域，${job}的有效求职信应围绕实操经验、职业资质和安全意识进行撰写。招聘方寻找值得信赖、能独立完成高质量工作并按时交付的技术人才。`,
  Engineering: (job) => `在工程领域，${job}的求职信需要展示系统化解决复杂问题的能力。招聘经理关注成功完成的项目案例、技术工具的熟练程度，以及对行业规范的深入理解。`,
  Creative: (job) => `在创意设计领域，${job}的求职信本身就是展示专业能力的作品。在体现艺术审美的同时，也要让招聘方看到您对商业目标的理解和按时交付的执行力。`,
  Education: (job) => `在教育领域，对知识传授的使命感是最被看重的品质。${job}的自荐信应体现您的教育理念、因材施教的能力，以及对教学成果的贡献。`,
  Administrative: (job) => `在行政管理岗位，${job}的求职信需要展现组织协调能力、保密意识和多任务处理能力。招聘经理寻找能够预判需求、同时管理多项优先事务的全能型人才。`,
  Sales: (job) => `${job}的求职信就是您的第一次销售演示。招聘经理在评估您的说服力、洞察客户需求的能力，以及清晰传达价值主张的水平。`,
  Marketing: (job) => `在市场营销领域，${job}的求职信应展示您对传播策略的理解和创造可衡量成果的能力。用具体案例证明您兼具战略思维和执行力。`,
  HR: (job) => `在人力资源领域，${job}的求职信需要体现对组织动态和企业人才管理的深刻理解。展示您平衡员工利益与企业利益的能力。`,
  'Customer Service': (job) => `在客户服务岗位，${job}的求职信应展现倾听能力、耐心和解决问题的技巧。招聘经理寻找能够将棘手情况转化为积极客户体验的人才。`,
  Logistics: (job) => `在物流领域，精确性和运营效率至关重要。${job}的求职信应展示管理复杂运营、确保按时交付和优化流程的能力。`,
  Government: (job) => `政府机关的求职与企业招聘遵循不同的规范。${job}的自荐信应体现公共服务意识、对法规体系的理解，以及在既定制度框架内高效开展工作的能力。`,
  Legal: (job) => `在法律领域，${job}的求职信在内容和格式上都必须精益求精。招聘方评估的是严密的逻辑思维、分析能力和法律专业术语的运用水平。`,
  Science: (job) => `在科研领域，${job}的求职信需要展示分析思维和研究贡献。重点体现方法论的严谨性、代表性成果，以及将复杂概念清晰表达的能力。`,
  Fitness: (job) => `在健身与健康领域，${job}的求职信应传达对指导的热情和专业知识。招聘方寻找真正具备专业资质、能为客户健康和成长做出贡献的从业者。`,
  Cleaning: (job) => `在保洁行业，${job}的自荐信应展示可靠性、注重细节的态度和专业清洁技能。招聘方看重守时、能独立工作并保持高标准清洁水平的求职者。`,
  'Entry-Level': (job) => `对于应届毕业生或转行求职者，${job}的自荐信需要用热情、动力和可迁移技能来弥补经验的不足。招聘方看重的是快速学习的能力和愿意为团队做出贡献的真诚态度。`,
  Business: (job) => `在商业领域，${job}的求职信应展现战略思维和结果导向的工作理念。招聘经理寻找能为企业增长做出贡献、清楚理解业务挑战并能提出具体解决方案的人才。`,
  default: (job) => `一封出色的${job}求职信应清晰展示您的技能与企业实际需求之间的直接关联。传达您对岗位的理解、最相关的业绩成果，以及对这个机会的真诚热情。`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  return [
    `${jobTitle} 求职信`,
    `${jobTitle} 自荐信`,
    `${jobTitle} 求职信范文`,
    `求职信怎么写`,
    `自荐信范文`,
    `求职信模板`,
    `自荐信模板 2026`,
    `求职信撰写指南`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  return [
    {
      question: `${jobTitle}的求职信/自荐信应该怎么写？`,
      answer: `首先以个性化的开头点明公司名称和应聘岗位。然后围绕${jobTitle}岗位要求，用2到3个具体的工作成果和可量化的数据来展开论述。最后表达求职诚意，并请求面试机会。`,
    },
    {
      question: `${jobTitle}求职信的理想篇幅是多少？`,
      answer: `${jobTitle}的求职信应控制在一页以内，约400至600字为宜。招聘经理无法在每份材料上花费太多时间，因此要注重简洁性和影响力。确保每个段落都能为应聘岗位提供新的有价值的信息。`,
    },
    {
      question: `求职信可以直接重复简历的内容吗？`,
      answer: `不可以。求职信是对简历的补充，而非复制。利用求职信说明业绩背后的故事、阐述跳槽动机，并深入展开最相关的成就。在简历数据的基础上讲述您的职业故事，展现个人特质。`,
    },
    {
      question: `应聘${jobTitle}时一定需要求职信吗？`,
      answer: `即使招聘公告中没有明确要求，一封精心撰写的${jobTitle}求职信也能让您在具有相同技能的竞争者中脱颖而出。它能展示您的诚意、对岗位的真正兴趣，以及专业的沟通能力。`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, slug) {
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 4).join('、') || '与目标岗位相关的核心技能';
  const skill1 = skills[0] || '项目管理';
  const skill2 = skills[1] || '团队协作';
  const skill3 = skills[2] || '沟通表达';
  const skill4 = skills[3] || '问题解决';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  return `
## 如何用${jobTitle}求职信脱颖而出

${opener}

一封有说服力的${jobTitle}求职信不仅仅是对工作经历的简单概述。它是展示您理解岗位需求和企业挑战、并证明自己拥有对应技能的绝佳机会。传达您的专业形象，与其他求职者形成差异化竞争。

## ${jobTitle}求职信/自荐信范文

> **主题：应聘${jobTitle}岗位（职位编号：[参考编号]）**
>
> 尊敬的招聘负责人：
>
> 我在[招聘渠道]上看到贵公司发布的${jobTitle}职位，怀着浓厚的兴趣提交申请。凭借在${skill1}和${skill2}领域的工作经验，我相信能为贵公司创造显著价值。
>
> 在[现任/前任公司]工作期间，我在${topSkills}等方面积累了扎实的专业能力。尤其值得一提的是，我在${skill1}方面取得了[含具体数据的业绩成果]，显著提升了团队整体绩效。此外，我运用${skill3}能力实现了[${skill3}相关贡献的具体案例]。
>
> 我对贵公司该岗位格外关注的原因是[关于企业或岗位的具体理由]。结合${skill4}能力和行业经验，我有信心为贵公司的目标达成做出有效贡献。
>
> 恳请给予面试机会，以便更详细地阐述我的经历如何契合贵公司的期望。
>
> 此致敬礼
>
> [姓名]

*请将以上范文中方括号内的信息替换为您的个人情况和目标企业信息。*

## 出色求职信的核心要素

### 个性化的开头

避免使用"兹有本人申请贵公司职位"之类的套话。明确写出公司名称、岗位编号和申请的具体原因。招聘经理一眼就能识别出千篇一律的模板化开头。建议提及企业近期的项目成果或与您职业理念契合的企业价值观。

### 可量化的业绩成果

所有陈述都必须用具体数据来支撑。不要写"优化了流程"，而要写"通过引入${skill1}新方法论，将处理时间缩短了30%"。可量化的成果能增强求职者的可信度，让招聘经理更直观地评估您作为${jobTitle}所创造的实际影响。

### 与企业的契合点

展示您对目标企业做了充分的调研。找出您的${topSkills}技能能够助力解决的业务挑战或战略目标。这部分内容证明您的申请是经过深思熟虑的，而非简单的海投行为。

### 有价值主张的结尾

结尾不只是一句客套话。用一句话概括您独特的优势，并具体提出面试请求。重申对${jobTitle}岗位的热忱，表明可以灵活配合面试时间安排。

## 不同职业阶段的建议

### 应届毕业生/初级岗位

实际工作经验较少时，可以借助实习经历、学术项目和可迁移技能来展示潜力。阐述学业如何为${jobTitle}岗位做了充分准备，着重体现学习热情、快速适应能力和相关实践经历。

### 中级职业人士

拥有数年工作经验后，应精选2至3个与${jobTitle}目标岗位最相关的业绩成果。不必面面俱到，聚焦于最能体现您附加价值的核心成就。

### 资深/管理层

在这个层级，${jobTitle}的求职信应体现战略视野和带领团队或大型项目的能力。突出企业级的业绩成果：成功推动的变革、实现的成本节约、组建的高效团队等。

## 求职信常见误区

- **发送千篇一律的求职信** — 招聘经理能立即识别出群发的模板化内容。每次申请${jobTitle}岗位都应量身定制，写明公司名称、具体岗位和申请理由。

- **照搬简历内容** — 求职信是对简历的补充而非重复。利用求职信阐述业绩背后的故事、解释职业转换的原因、展现个人特质。

- **每句话都以"我"开头** — 过于自我中心的求职信会给人格局狭隘的印象。应交替展示您能提供的价值与企业的实际需求。

- **放任错别字和格式不一致** — 有错别字的求职信是缺乏职业素养的负面信号。提交前务必仔细审阅，并请他人帮忙检查。

- **没有明确的行动号召就结束** — 不提出面试或电话沟通的请求，就无法引导招聘经理采取下一步行动。始终以明确的提议和可协调的时间安排来收尾。

## 用专业简历为求职信加分

有说服力的求职信需要配合一份同样出色的简历。确保${jobTitle}求职材料的整体一致性：

- 使用[免费简历制作工具](/zh/builder)创建ATS优化的专业简历
- 参考[${jobTitle}简历范例](/zh/resume-examples/${slug})了解行业适配的模板
- 使用[AI求职信生成工具](/zh/tools/cover-letter)自动生成个性化求职信

一套完整的求职材料——规范的简历加上定制化的求职信——将大幅提升您获得${jobTitle}岗位面试邀请的机率。
`;
}
