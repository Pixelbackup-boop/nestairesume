/**
 * Korean (ko) locale data for cover letter example generation.
 * Imported by generate-locale-cover-letters.mjs via:
 *   await import('./locale-data/cover-letter-ko.mjs')
 *
 * Keyword source: seo/korean-top-100-keywords.csv
 * Top terms: 커버 레터 (5K), 커버 레터 뜻 (500), 커버 레터 쓰는 법 (50),
 *            커버 레터 작성법 (50), 자기소개서 (500), 자소서 샘플 (500)
 */

import { JOB_TITLES as RESUME_TITLES } from './resume-ko.mjs';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: '김서연',
  authorBio: '경력 개발 및 커버 레터·자기소개서 작성 전문 컨설턴트로 10년 이상의 경험을 보유. 한국 취업 시장에 정통하며 수천 명의 구직자가 서류 전형을 통과할 수 있도록 지원.',
  titlePattern: (job) => `${job} 커버 레터·자기소개서 예시 | 작성 가이드 2026`,
  descriptionPattern: (job) => `${job} 커버 레터와 자기소개서 예문 및 템플릿. 채용 담당자에게 어필하는 커버 레터 쓰는 법과 2026년 취업에 활용할 수 있는 샘플을 소개합니다.`,
};

// ─── JOB TITLES (English → Korean) ──────────────────────────────────────────

export const JOB_TITLES = {
  ...RESUME_TITLES,
  'Bookkeeper': '경리 담당자',
  'Corporate Trainer': '기업 교육 트레이너',
  'Customer Service Representative': '고객 서비스 담당자',
  'EMT/Paramedic': '응급구조사',
  'Frontend Developer': '프론트엔드 개발자',
  'Healthcare Administrator': '의료 행정관',
  'Human Resources Manager': '인사 매니저',
  'Machinist': '기계공',
  'Registered Nurse': '정간호사',
  'Solutions Architect': '솔루션 아키텍트',
  'Systems Administrator': '시스템 관리자',
  'Tax Accountant': '세무사',
};

// ─── CATEGORIES (English → Korean) ──────────────────────────────────────────

export const CATEGORIES = {
  Technology: '기술',
  Healthcare: '의료·헬스케어',
  'Food Service': '식음료 서비스',
  Hospitality: '호스피탈리티',
  Trades: '기능직',
  Creative: '크리에이티브',
  Education: '교육',
  Marketing: '마케팅',
  Government: '공무원',
  Business: '비즈니스',
  Sales: '영업',
  Engineering: '엔지니어링',
  'Business & Finance': '비즈니스·금융',
  Legal: '법률',
  HR: '인사',
  'Skilled Trades': '전문 기능직',
  'Real Estate': '부동산',
  'Customer Service': '고객 서비스',
  'Animal Care': '동물 돌봄',
  Administrative: '사무·행정',
  Transportation: '운송',
  Logistics: '물류',
  Fitness: '피트니스',
  Cleaning: '청소',
  Retail: '소매',
  Management: '경영관리',
  'Social Services': '사회복지',
  Manufacturing: '제조',
  Accounting: '회계',
  Construction: '건설',
  Security: '보안',
  Science: '과학',
  'Health & Fitness': '건강·피트니스',
  Research: '연구',
  Finance: '금융',
  'Writing & Content': '글쓰기·콘텐츠',
  'Supply Chain': '공급망',
  Quality: '품질관리',
  Media: '미디어',
  Maritime: '해양',
  'Law Enforcement': '법집행',
  Facilities: '시설관리',
  Executive: '경영진',
  Events: '이벤트',
  'Entry-Level': '신입·경력전환',
  Entrepreneurship: '창업',
  Consulting: '컨설팅',
  Childcare: '보육',
  'Banking & Finance': '은행·금융',
  Banking: '은행',
  Aviation: '항공',
  Automotive: '자동차',
  Architecture: '건축',
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
  Technology: (job) => `기술 분야에서 ${job}의 커버 레터는 단순한 기술 스킬 나열이 아닌, 기술력이 어떻게 실제 문제 해결과 비즈니스 가치 창출로 이어졌는지를 보여주는 것이 중요합니다. 채용 담당자는 전문 지식과 포지션 요구사항 간의 직접적인 연결고리를 찾고 있습니다.`,
  Healthcare: (job) => `의료 분야에서는 환자 케어에 대한 진정한 헌신이 중시됩니다. ${job}의 자기소개서에서는 임상 능력과 인간적 면모 양면을 보여줘야 합니다. 채용 담당자는 기술적 자격 외에도 직무의 윤리적·인간적 측면을 이해하는 지원자를 찾습니다.`,
  Finance: (job) => `금융·회계 분야의 채용 담당자는 분석력과 성실함을 겸비한 지원자를 원합니다. ${job}의 커버 레터에서는 재무 업무를 정확하게 수행하고 업계 규정 기준을 준수하는 능력을 보여주세요.`,
  'Food Service': (job) => `식음료 업계에서 ${job}의 자기소개서는 음식에 대한 열정과 빠르게 돌아가는 환경에서의 실력을 전달해야 합니다. 채용 담당자는 팀워크, 위생 관리 지식, 고객 경험에 대한 진지한 태도를 보여주는 지원자를 중시합니다.`,
  Hospitality: (job) => `호스피탈리티 업계에서는 서비스의 탁월함을 구현하는 지원자가 높은 평가를 받습니다. ${job}의 커버 레터에서는 환대 정신, 세심한 배려, 고객에게 잊을 수 없는 경험을 제공하는 능력을 보여주세요.`,
  Trades: (job) => `기능직 분야에서 ${job}의 효과적인 커버 레터는 실무 경험, 자격증, 그리고 안전 의식을 중심으로 어필합니다. 채용 담당자는 신뢰할 수 있고, 독립적으로 높은 품질의 작업을 납기 내에 수행할 수 있는 기술자를 찾습니다.`,
  Engineering: (job) => `엔지니어링 직종에서 ${job}의 커버 레터는 복잡한 문제를 체계적으로 해결하는 능력을 보여줘야 합니다. 채용 담당자는 성공적으로 수행한 프로젝트, 기술 도구 숙련도, 업계 제약 조건에 대한 이해의 증거를 찾습니다.`,
  Creative: (job) => `크리에이티브 분야에서 ${job}의 커버 레터 자체가 당신의 역량을 보여주는 샘플이 됩니다. 예술적 감각을 보여주면서 비즈니스 목표에 대한 이해와 납기 준수 능력도 어필하세요.`,
  Education: (job) => `교육 분야에서는 지식 전달에 대한 진정한 사명감을 보여주는 지원자가 높이 평가됩니다. ${job}의 자기소개서에서는 교육 철학, 다양한 학습자에 대한 대응력, 교육 성과에 대한 기여를 반영하세요.`,
  Administrative: (job) => `사무·행정직에서 ${job}의 커버 레터는 조직력, 기밀 유지 능력, 그리고 다재다능함을 보여줘야 합니다. 채용 담당자는 필요를 미리 파악하고 여러 우선순위를 동시에 관리할 수 있는 지원자를 찾습니다.`,
  Sales: (job) => `${job}의 커버 레터는 당신의 첫 번째 영업 프레젠테이션입니다. 채용 담당자는 설득력 있는 커뮤니케이션 능력, 고객 니즈 파악력, 그리고 명확한 가치 제안을 평가합니다.`,
  Marketing: (job) => `마케팅 분야에서 ${job}의 커버 레터는 커뮤니케이션 전략에 대한 이해와 측정 가능한 성과를 만들어내는 능력을 보여줘야 합니다. 전략적 사고와 실행력 양면을 구체적인 사례로 증명하세요.`,
  HR: (job) => `인사 직종에서 ${job}의 커버 레터는 조직 역학과 기업의 인적 측면에 대한 이해를 보여줘야 합니다. 직원의 이익과 조직의 이익 사이의 균형을 맞추는 능력을 어필하세요.`,
  'Customer Service': (job) => `고객 서비스직에서 ${job}의 커버 레터는 경청력, 인내심, 문제 해결력을 보여줘야 합니다. 채용 담당자는 어려운 상황을 고객에게 긍정적인 경험으로 전환하는 능력을 가진 지원자를 찾습니다.`,
  Logistics: (job) => `물류 분야에서는 정확성과 업무 효율이 중시됩니다. ${job}의 커버 레터는 복잡한 오퍼레이션 관리, 납기 준수, 프로세스 최적화 능력을 보여주세요.`,
  Government: (job) => `공무원 지원에서는 민간 기업과 다른 관례를 따릅니다. ${job}의 자기소개서는 공공 서비스에 대한 기여 의식, 규제 체계에 대한 이해, 확립된 절차 내에서 업무를 수행하는 능력을 보여주세요.`,
  Legal: (job) => `법률 분야에서 ${job}의 커버 레터는 내용과 형식 모두 완벽해야 합니다. 채용 담당자는 지적 엄밀함, 분석 능력, 법률 용어 숙련도를 평가합니다.`,
  Science: (job) => `과학 분야에서 ${job}의 커버 레터는 분석적 접근과 연구 기여를 보여줘야 합니다. 방법론적 엄밀성, 주요 논문이나 프로젝트, 복잡한 개념을 이해하기 쉽게 설명하는 능력을 증명하세요.`,
  Fitness: (job) => `피트니스·웰니스 분야에서 ${job}의 커버 레터는 지도에 대한 열정과 전문 지식을 전달해야 합니다. 채용 담당자는 고객의 건강과 성장에 진정으로 기여하는 자격을 갖춘 전문가를 찾습니다.`,
  Cleaning: (job) => `청소 분야에서 ${job}의 자기소개서는 신뢰성, 세부 사항에 대한 주의력, 전문적인 청소 기술 지식을 보여주세요. 채용 담당자는 시간을 엄수하고 독립적으로 높은 청결 기준을 유지할 수 있는 지원자를 중시합니다.`,
  'Entry-Level': (job) => `신입이나 경력 전환의 경우, ${job}의 자기소개서는 경험 부족을 열정, 동기, 학업이나 인턴에서 쌓은 전이 가능한 스킬로 보완해야 합니다. 채용 담당자는 빠른 학습 능력과 기여에 대한 진정한 의지를 가진 인재를 평가합니다.`,
  Business: (job) => `비즈니스 분야에서 ${job}의 커버 레터는 전략적 사고와 결과 지향성을 보여줘야 합니다. 채용 담당자는 기업 성장에 기여할 수 있고, 비즈니스 과제를 명확히 이해하며, 구체적인 솔루션을 제안할 수 있는 지원자를 찾습니다.`,
  default: (job) => `효과적인 ${job}의 커버 레터는 당신의 스킬과 기업의 구체적인 니즈 사이의 직접적인 연결고리를 보여줍니다. 포지션에 대한 이해, 가장 관련성 높은 실적, 그리고 이 기회에 대한 진정한 의욕을 전달하세요.`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  return [
    `${jobTitle} 커버 레터`,
    `${jobTitle} 자기소개서`,
    `${jobTitle} 커버 레터 예시`,
    `커버 레터 쓰는 법`,
    `자기소개서 작성법`,
    `커버 레터 템플릿`,
    `자소서 샘플 2026`,
    `취업 자기소개서`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  return [
    {
      question: `${jobTitle}의 커버 레터·자기소개서는 어떻게 작성하나요?`,
      answer: `기업명과 지원 포지션을 명시한 맞춤형 도입부로 시작하세요. 그다음 ${jobTitle} 포지션 요구사항과 관련된 2~3개의 구체적 실적을 수치와 측정 가능한 성과를 곁들여 전개합니다. 마지막으로 지원 동기를 표명하고 면접 기회를 요청하는 마무리로 마칩니다.`,
    },
    {
      question: `${jobTitle} 커버 레터의 이상적인 길이는 어느 정도인가요?`,
      answer: `${jobTitle}의 커버 레터는 A4 1페이지 이내, 약 400~600자가 적당합니다. 채용 담당자는 각 지원 서류에 많은 시간을 할애하지 못하므로, 간결함과 임팩트를 중시하세요. 각 문단이 지원 포지션과 관련된 새로운 정보를 제공하도록 합니다.`,
    },
    {
      question: `커버 레터에서 이력서 내용을 그대로 반복해도 되나요?`,
      answer: `아닙니다. 커버 레터는 이력서를 보완하는 것이지, 중복시키는 것이 아닙니다. 실적의 배경이나 맥락을 설명하고, 이직 동기를 전달하며, 가장 관련성 높은 성과를 깊이 파고드는 데 활용하세요. 숫자 뒤에 숨겨진 스토리를 전하고, 당신의 인간적 면모를 보여주는 공간으로 활용하세요.`,
    },
    {
      question: `${jobTitle} 지원 시 커버 레터는 반드시 필요한가요?`,
      answer: `채용 공고에 명시되어 있지 않더라도, 정성 들여 작성한 ${jobTitle}의 커버 레터는 동일한 스킬을 가진 지원자들 사이에서 차별화 요소가 됩니다. 당신의 진지함, 포지션에 대한 진정한 관심, 그리고 프로페셔널한 커뮤니케이션 능력을 보여줄 수 있습니다.`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, slug) {
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 4).join(', ') || '지원 포지션 관련 핵심 스킬';
  const skill1 = skills[0] || '프로젝트 관리';
  const skill2 = skills[1] || '팀워크';
  const skill3 = skills[2] || '커뮤니케이션';
  const skill4 = skills[3] || '문제 해결';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  return `
## ${jobTitle} 커버 레터·자기소개서로 차별화하는 핵심 포인트

${opener}

설득력 있는 ${jobTitle}의 커버 레터는 단순히 경력을 요약하는 것이 아닙니다. 포지션과 기업의 과제를 이해하고, 그에 대응하는 구체적인 스킬을 보유하고 있음을 보여주는 기회입니다. 프로페셔널한 면모를 전달하고 다른 지원자와의 차별화를 꾀하세요.

## ${jobTitle} 커버 레터·자기소개서 예문

> **제목: ${jobTitle} 포지션 지원 (공고번호: [참조번호])**
>
> 담당자님 귀하,
>
> [채용 매체명]에서 확인한 ${jobTitle} 공고에 큰 관심을 갖고 지원드립니다. ${skill1} 및 ${skill2} 분야의 경험을 바탕으로 귀사에 크게 기여할 수 있다고 확신합니다.
>
> [현 직장/전 직장]에서 ${topSkills} 분야의 탄탄한 전문성을 쌓았습니다. 특히 주목할 만한 성과로, ${skill1} 관련 [구체적 수치가 포함된 실적]을 달성하여 팀 성과를 크게 향상시킨 바 있습니다. 또한 ${skill3} 역량을 활용하여 [${skill3} 관련 기여의 구체적 사례]를 실현했습니다.
>
> 귀사의 이 포지션에 특별히 매력을 느끼는 이유는 [기업이나 포지션에 관한 구체적 이유]입니다. ${skill4} 역량과 업계 경험을 바탕으로 귀사의 목표 달성에 효과적으로 기여할 수 있다고 생각합니다.
>
> 면접 기회를 주시어 제 경력이 귀사의 기대에 어떻게 부응할 수 있는지 자세히 설명드릴 수 있으면 감사하겠습니다.
>
> 감사합니다.
>
> [성명]

*이 예문의 대괄호 안 정보를 본인 정보와 지원 기업 정보로 대체하여 사용하세요.*

## 효과적인 커버 레터의 핵심 요소

### 맞춤형 도입부

"귀사의 채용 공고에 지원합니다"와 같은 정형적 표현은 피하세요. 기업명, 포지션 참조번호, 그리고 지원의 구체적 이유를 명시합니다. 채용 담당자는 복사·붙여넣기한 범용 도입부를 바로 알아차립니다. 기업의 최근 프로젝트나 당신의 커리어와 공감하는 기업 가치관에 대해 언급하세요.

### 수치화된 실적

모든 주장은 구체적 숫자로 뒷받침해야 합니다. "프로세스를 개선했습니다" 대신 "${skill1}의 새로운 방법론을 도입하여 처리 시간을 30% 단축했습니다"라고 쓰세요. 측정 가능한 결과는 지원자의 신뢰성을 높이고, ${jobTitle}로서의 업무가 가져온 실제 임팩트를 채용 담당자가 평가하기 쉽게 만듭니다.

### 기업과의 연결고리

기업에 대해 충분한 리서치를 했음을 보여주세요. ${topSkills} 스킬로 기여할 수 있는 과제나 전략적 목표를 파악합니다. 이 부분은 당신의 지원이 깊이 고민한 것이지, 단순한 기회주의적 지원이 아님을 증명합니다.

### 가치 제안을 담은 마무리

마무리는 단순한 인사가 아닙니다. 당신만의 강점을 한 문장으로 요약하고, 구체적으로 면접을 제안하세요. ${jobTitle} 포지션에 대한 열의를 재확인하고, 일정 조율이 가능함을 전달하세요.

## 경력 레벨별 조언

### 신입·주니어

실무 경험이 적은 경우, 인턴십, 학술 프로젝트, 전이 가능한 스킬을 활용하세요. 학업이 어떻게 ${jobTitle} 포지션에 대비하게 해주었는지 설명합니다. 의욕, 빠른 학습 능력, 관련 활동 경험을 어필하세요.

### 중견 프로페셔널

수년간의 경험이 있다면, ${jobTitle} 지원 포지션과 가장 관련성 높은 2~3개의 실적을 엄선하세요. 모든 것을 다루려 하지 말고, 당신의 부가가치를 가장 효과적으로 보여주는 성과에 집중합니다.

### 시니어·관리직

이 레벨에서 ${jobTitle}의 커버 레터는 전략적 비전과 팀·대규모 프로젝트를 이끄는 능력을 반영해야 합니다. 기업 차원의 실적을 전면에 내세우세요: 성공적인 변혁, 실현한 비용 절감, 구축한 팀 등.

## 커버 레터에서 흔한 실수

- **범용적이고 맞춤화되지 않은 커버 레터 보내기** — 채용 담당자는 대량 발송된 정형 문구를 바로 알아차립니다. ${jobTitle} 각 지원에 대해 기업명, 포지션, 지원 이유를 명시한 맞춤형 커버 레터를 작성하세요.

- **이력서 내용을 그대로 반복하기** — 커버 레터는 이력서를 보완하는 것이지 중복시키는 것이 아닙니다. 실적의 배경을 설명하고, 커리어 전환점을 설명하며, 인간적 면모를 전달하는 데 활용하세요.

- **모든 문장을 "저는"으로 시작하기** — 본인 중심의 커버 레터는 시야가 좁다는 인상을 줍니다. 당신이 제공할 수 있는 것과 기업이 필요로 하는 것을 교대로 제시하세요.

- **오탈자나 양식 불일치 방치하기** — 오탈자가 있는 커버 레터는 프로페셔널리즘 부족을 보여주는 부정적 신호입니다. 제출 전 반드시 검토하고, 제3자에게도 확인을 부탁하세요.

- **구체적인 행동 제안 없이 마무리하기** — 면접이나 통화 제안 없이 끝내면, 채용 담당자에게 다음 단계의 지침을 주지 못합니다. 항상 명확한 제안과 가능한 일정을 전달하며 마무리하세요.

## 프로페셔널한 이력서로 커버 레터를 보완하세요

설득력 있는 커버 레터에는 그에 걸맞은 이력서가 필요합니다. ${jobTitle} 지원 서류 전체의 일관성을 확보하세요:

- [무료 이력서 작성 도구](/ko/builder)로 ATS 최적화된 프로페셔널 이력서 작성
- [${jobTitle} 이력서 샘플](/ko/resume-examples/${slug})을 참고하여 업계에 적합한 템플릿 확인
- [AI 커버 레터 작성 도구](/ko/tools/cover-letter)로 프로필에 맞춤화된 커버 레터 자동 생성

완성도 높은 지원 서류 세트 — 정돈된 이력서와 맞춤형 커버 레터 — 는 ${jobTitle} 포지션에서 면접을 받을 기회를 크게 높여줍니다.
`;
}
