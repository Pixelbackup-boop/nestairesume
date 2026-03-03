/**
 * Portuguese (pt) locale data for cover letter example generation.
 * Imported by generate-locale-cover-letters.mjs via:
 *   await import('./locale-data/cover-letter-pt.mjs')
 *
 * Keyword-optimized: "carta de apresentação" + "carta de motivação"
 */

import { JOB_TITLES as RESUME_TITLES } from './resume-pt.mjs';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: 'Ana Oliveira',
  authorBio: 'Especialista em desenvolvimento de carreira e redação de cartas de apresentação com mais de 10 anos de experiência ajudando profissionais lusófonos.',
  titlePattern: (job) => `Carta de Apresentação de ${job}: Exemplo e Guia 2026`,
  descriptionPattern: (job) => `Exemplo de carta de apresentação para ${job.toLowerCase()} com modelos profissionais. Aprenda a valorizar suas competências e conquistar entrevistas em 2026.`,
};

// ─── JOB TITLES (English → Portuguese) ──────────────────────────────────────

export const JOB_TITLES = {
  ...RESUME_TITLES,
  'Bookkeeper': 'Escriturário',
  'Chief Information Officer': 'Diretor de Tecnologia da Informação',
  'CNA': 'Auxiliar de Enfermagem',
  'Corporate Trainer': 'Instrutor Corporativo',
  'EMT/Paramedic': 'Socorrista/Paramédico',
  'Golang Developer': 'Desenvolvedor Golang',
  'Human Resources Manager': 'Gerente de Recursos Humanos',
  'LPN': 'Técnico de Enfermagem',
  'Machinist': 'Maquinista Industrial',
  'Systems Administrator': 'Administrador de Sistemas',
  'Tax Accountant': 'Contador Tributarista',
};

// ─── CATEGORIES (English → Portuguese) ──────────────────────────────────────

export const CATEGORIES = {
  Technology: 'Tecnologia',
  Healthcare: 'Saúde',
  'Food Service': 'Alimentação',
  Hospitality: 'Hotelaria',
  Trades: 'Ofícios e Construção',
  Creative: 'Criativo',
  Education: 'Educação',
  Marketing: 'Marketing',
  Government: 'Governo',
  Business: 'Negócios',
  Sales: 'Vendas',
  Engineering: 'Engenharia',
  'Business & Finance': 'Negócios e Finanças',
  Legal: 'Jurídico',
  HR: 'Recursos Humanos',
  'Skilled Trades': 'Ofícios Especializados',
  'Real Estate': 'Imobiliário',
  'Customer Service': 'Atendimento ao Cliente',
  'Animal Care': 'Cuidados Animais',
  Administrative: 'Administrativo',
  Transportation: 'Transportes',
  Logistics: 'Logística',
  Fitness: 'Fitness',
  Cleaning: 'Limpeza',
  Retail: 'Varejo',
  Management: 'Gestão',
  'Social Services': 'Serviços Sociais',
  Manufacturing: 'Manufatura',
  Accounting: 'Contabilidade',
  Construction: 'Construção',
  Security: 'Segurança',
  Science: 'Ciência',
  'Health & Fitness': 'Saúde e Fitness',
  Research: 'Pesquisa',
  Finance: 'Finanças',
  'Writing & Content': 'Redação e Conteúdo',
  'Supply Chain': 'Cadeia de Suprimentos',
  Quality: 'Qualidade',
  Media: 'Mídia',
  Maritime: 'Marítimo',
  'Law Enforcement': 'Segurança Pública',
  Facilities: 'Gestão de Instalações',
  Executive: 'Executivo',
  Events: 'Eventos',
  'Entry-Level': 'Primeiro Emprego',
  Entrepreneurship: 'Empreendedorismo',
  Consulting: 'Consultoria',
  Childcare: 'Cuidados Infantis',
  'Banking & Finance': 'Banco e Finanças',
  Banking: 'Banco',
  Aviation: 'Aviação',
  Automotive: 'Automotivo',
  Architecture: 'Arquitetura',
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
  Technology: (job) => `No setor de tecnologia, uma carta de apresentação de ${job} deve ir além da simples enumeração de linguagens e ferramentas dominadas. Os responsáveis pelo recrutamento buscam candidatos capazes de demonstrar como suas competências técnicas resolveram problemas concretos e geraram valor para as empresas anteriores. Sua carta deve estabelecer uma conexão direta entre sua expertise e as necessidades específicas da vaga.`,
  Healthcare: (job) => `O setor de saúde atribui importância particular ao compromisso com o bem-estar dos pacientes. Uma carta de apresentação de ${job} deve refletir tanto suas competências clínicas quanto sua empatia profissional. Os recrutadores querem ver que você compreende os desafios éticos e humanos do cargo, além de suas qualificações técnicas.`,
  Finance: (job) => `Os recrutadores em finanças e contabilidade buscam candidatos cuja carta de apresentação demonstre rigor analítico e integridade profissional. Sua candidatura de ${job} deve ilustrar sua capacidade de gerenciar responsabilidades financeiras com precisão, respeitando as normas regulatórias do setor.`,
  'Food Service': (job) => `Na área de alimentação, uma carta de apresentação de ${job} deve transmitir sua paixão pela gastronomia e capacidade de performar em um ambiente dinâmico. Os responsáveis pelo recrutamento valorizam candidatos que demonstram espírito de equipe, conhecimento das normas de higiene e compromisso com a experiência do cliente.`,
  Hospitality: (job) => `O setor hoteleiro valoriza candidatos que representam a excelência no atendimento. Sua carta de apresentação de ${job} deve refletir seu senso de acolhimento, atenção aos detalhes e capacidade de criar experiências memoráveis para os hóspedes. Os recrutadores buscam profissionais que aliam competências operacionais e calor humano.`,
  Trades: (job) => `Para os ofícios manuais e técnicos, uma carta de apresentação de ${job} eficaz destaca sua experiência prática, certificações e compromisso com a segurança no trabalho. Os empregadores buscam profissionais confiáveis, autônomos e capazes de produzir um trabalho de qualidade dentro dos prazos.`,
  Engineering: (job) => `Os cargos de engenharia exigem uma carta de apresentação de ${job} que demonstre sua capacidade de resolver problemas complexos de forma metódica. Os recrutadores querem ver provas concretas de projetos conduzidos com sucesso, domínio de ferramentas técnicas e compreensão das restrições industriais.`,
  Creative: (job) => `Nas profissões criativas, sua carta de apresentação de ${job} é por si só uma amostra do seu talento. Ela deve demonstrar sua sensibilidade artística enquanto prova sua compreensão dos objetivos comerciais. Os diretores criativos buscam candidatos capazes de conciliar visão artística e exigências do cliente.`,
  Education: (job) => `O setor educacional valoriza candidatos que demonstram vocação autêntica para a transmissão do conhecimento. Sua carta de apresentação de ${job} deve refletir sua filosofia pedagógica, capacidade de adaptação aos diferentes perfis de alunos e compromisso com o sucesso educacional.`,
  Administrative: (job) => `Os cargos administrativos requerem uma carta de apresentação de ${job} que ilustre seu senso de organização, discrição e versatilidade. Os recrutadores buscam candidatos capazes de antecipar necessidades, gerenciar múltiplas prioridades simultaneamente e garantir o bom funcionamento das operações diárias.`,
  Sales: (job) => `Sua carta de apresentação de ${job} é sua primeira demonstração comercial: ela deve convencer. Os responsáveis pelo recrutamento avaliam sua capacidade de comunicar de forma persuasiva, identificar necessidades do cliente e apresentar uma proposta de valor clara. Cada parágrafo deve ilustrar seu potencial comercial.`,
  Marketing: (job) => `Em marketing, sua carta de apresentação de ${job} deve refletir sua compreensão das estratégias de comunicação e capacidade de gerar resultados mensuráveis. Os recrutadores querem ver que você domina tanto a reflexão estratégica quanto a execução operacional, com exemplos concretos de campanhas ou iniciativas bem-sucedidas.`,
  HR: (job) => `Os cargos em recursos humanos exigem uma carta de apresentação de ${job} que demonstre sua compreensão das dinâmicas organizacionais e sensibilidade aos desafios humanos da empresa. Sua candidatura deve ilustrar sua capacidade de equilibrar os interesses dos colaboradores e os da organização.`,
  'Customer Service': (job) => `Os cargos em atendimento ao cliente necessitam de uma carta de apresentação de ${job} que evidencie sua capacidade de escuta, paciência e talento para resolução de problemas. Os recrutadores buscam candidatos capazes de transformar situações difíceis em experiências positivas para o cliente.`,
  Logistics: (job) => `O setor logístico valoriza precisão e eficiência operacional. Sua carta de apresentação de ${job} deve demonstrar sua capacidade de gerenciar operações complexas, cumprir prazos e otimizar processos. Os empregadores buscam profissionais metódicos com sólida experiência em gestão de fluxos.`,
  Government: (job) => `As candidaturas no setor público seguem convenções específicas. Sua carta de apresentação de ${job} deve demonstrar seu compromisso com o serviço público, compreensão do quadro regulatório e capacidade de trabalhar respeitando os procedimentos administrativos estabelecidos.`,
  Legal: (job) => `O setor jurídico exige uma carta de apresentação de ${job} impecável tanto na forma quanto no conteúdo. Os recrutadores avaliam seu rigor intelectual, capacidade de análise e domínio do vocabulário jurídico. Cada frase deve refletir a precisão e atenção ao detalhe esperadas na profissão.`,
  Science: (job) => `Os cargos científicos necessitam de uma carta de apresentação de ${job} que destaque sua abordagem analítica e contribuições para a pesquisa. Os recrutadores querem ver provas do seu rigor metodológico, publicações ou projetos significativos e capacidade de simplificar conceitos complexos.`,
  Fitness: (job) => `No setor de esporte e bem-estar, sua carta de apresentação de ${job} deve transmitir paixão pelo acompanhamento e expertise técnica. Os empregadores buscam profissionais certificados que demonstrem compromisso genuíno com a saúde e progresso de seus clientes.`,
  Cleaning: (job) => `Para cargos de limpeza, uma carta de apresentação de ${job} eficaz valoriza sua confiabilidade, atenção aos detalhes e conhecimento de produtos e técnicas de limpeza profissional. Os empregadores priorizam candidatos pontuais, autônomos e comprometidos em manter altos padrões de limpeza.`,
  'Entry-Level': (job) => `Para um primeiro emprego, sua carta de apresentação de ${job} deve compensar a falta de experiência com entusiasmo, motivação e competências transferíveis adquiridas durante seus estudos ou estágios. Os recrutadores valorizam jovens que demonstram potencial de aprendizado rápido e vontade real de contribuir.`,
  Business: (job) => `O mundo dos negócios exige uma carta de apresentação de ${job} que demonstre senso estratégico e orientação para resultados. Os recrutadores buscam candidatos capazes de contribuir para o crescimento da empresa, com compreensão clara dos desafios comerciais e capacidade de propor soluções concretas.`,
  default: (job) => `Uma carta de apresentação de ${job} eficaz estabelece uma conexão direta entre suas competências e as necessidades específicas da empresa. Ela demonstra sua compreensão do cargo, valoriza suas realizações mais relevantes e transmite sua motivação autêntica para essa oportunidade profissional.`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `carta de apresentação ${lower}`,
    `exemplo carta de apresentação ${lower}`,
    `modelo carta de apresentação ${lower}`,
    `carta de motivação ${lower}`,
    `carta de apresentação profissional`,
    `candidatura ${lower}`,
    `carta de apresentação 2026`,
    `exemplo de candidatura`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  const lower = jobTitle.toLowerCase();
  return [
    {
      question: `Como redigir uma carta de apresentação para uma vaga de ${lower}?`,
      answer: `Comece com uma abertura personalizada que mencione a empresa e a vaga pretendida. Desenvolva duas ou três realizações concretas relacionadas às exigências do cargo de ${lower}, usando números e resultados mensuráveis. Finalize com uma conclusão que expresse sua motivação e proponha uma entrevista.`,
    },
    {
      question: `Qual o tamanho ideal de uma carta de apresentação de ${lower}?`,
      answer: `Uma carta de apresentação de ${lower} deve caber em uma única página, com aproximadamente 250 a 400 palavras. Os recrutadores dedicam pouco tempo a cada candidatura, então priorize concisão e impacto. Cada parágrafo deve trazer uma informação nova e relevante para a vaga.`,
    },
    {
      question: `Devo repetir o conteúdo do currículo na carta de apresentação de ${lower}?`,
      answer: `Não, a carta de apresentação não deve ser uma repetição do seu currículo. Ela deve complementá-lo trazendo contexto, explicando suas motivações e desenvolvendo as realizações mais relevantes para o cargo de ${lower}. Use-a para contar a história por trás dos números e demonstrar sua personalidade profissional.`,
    },
    {
      question: `É sempre necessário enviar uma carta de apresentação para uma vaga de ${lower}?`,
      answer: `Mesmo quando a oferta de emprego não exige explicitamente, uma carta de apresentação bem redigida para uma vaga de ${lower} pode fazer a diferença entre dois candidatos com competências iguais. Ela demonstra seriedade, interesse real pela vaga e capacidade de comunicar de forma profissional.`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, slug) {
  const lower = jobTitle.toLowerCase();
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 4).join(', ') || 'competências-chave do cargo';
  const skill1 = skills[0] || 'gestão de projetos';
  const skill2 = skills[1] || 'trabalho em equipe';
  const skill3 = skills[2] || 'comunicação';
  const skill4 = skills[3] || 'resolução de problemas';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  return `
## O Que Diferencia uma Carta de Apresentação de ${jobTitle}

${opener}

Uma carta de apresentação convincente para uma vaga de ${lower} — também chamada de carta de motivação ou carta de candidatura — não se limita a resumir seu percurso. Ela demonstra que você dedicou tempo para compreender os desafios do cargo e da empresa, e que possui as competências específicas para respondê-los. É sua oportunidade de mostrar sua personalidade profissional e se destacar dos demais candidatos.

## Exemplo de Carta de Apresentação de ${jobTitle}

> **Assunto: Candidatura à vaga de ${jobTitle} — Ref. [Referência da Vaga]**
>
> Prezado(a) Senhor(a),
>
> Sua oferta de ${lower} publicada em [Fonte da Vaga] chamou imediatamente minha atenção. Com minha experiência em ${skill1} e ${skill2}, estou convicto(a) de poder trazer uma contribuição significativa à [Nome da Empresa].
>
> Na [Empresa Atual/Anterior], tive a oportunidade de desenvolver uma expertise sólida em ${topSkills}. Entre minhas realizações mais marcantes, [exemplo de realização quantificada relacionada a ${skill1}], o que permitiu melhorar os resultados da equipe de forma mensurável. Meu domínio de ${skill3} também me permitiu [exemplo de contribuição relacionada a ${skill3}].
>
> O que me motiva particularmente nesta vaga na [Nome da Empresa] é [razão específica relacionada à empresa ou ao cargo]. Estou convicto(a) de que minhas competências em ${skill4} e minha experiência no setor me permitirão contribuir eficazmente para seus objetivos.
>
> Ficaria feliz em discutir minha candidatura durante uma entrevista e apresentar em mais detalhes como meu percurso pode atender às suas expectativas. Permaneço à disposição conforme sua conveniência.
>
> No aguardo de seu retorno, subscrevo-me com os melhores cumprimentos.
>
> [Seu Nome Completo]

*Adapte este exemplo substituindo os elementos entre colchetes por suas informações pessoais e da empresa almejada.*

## Elementos-Chave de uma Carta de Apresentação Eficaz

### Abertura Personalizada

Evite fórmulas genéricas como "Venho por meio desta apresentar minha candidatura". Mencione o nome da empresa, a referência da vaga e uma razão precisa que explique seu interesse. Os recrutadores perceberão imediatamente se sua introdução é um copiar e colar enviado a dezenas de empresas. Cite um projeto recente da empresa, uma notícia ou um valor que ressoe com seu percurso de ${lower}.

### Realizações Quantificadas

Cada afirmação deve ser sustentada por números concretos. Em vez de escrever "melhorei os processos", escreva "reduzi o tempo de processamento em 30% implementando um novo método de ${skill1}". Resultados mensuráveis dão credibilidade à sua candidatura e permitem ao recrutador avaliar o impacto real do seu trabalho como ${lower}.

### Conexão com a Empresa

Demonstre que fez pesquisas aprofundadas sobre a empresa. Identifique um desafio ou objetivo estratégico ao qual pode contribuir com suas competências em ${topSkills}. Esta seção prova que sua candidatura é direcionada e refletida, não simplesmente oportunista. Os recrutadores valorizam candidatos que compreendem seu contexto antes mesmo da primeira entrevista.

### Conclusão com Proposta de Valor

Sua conclusão não deve ser uma simples fórmula de cortesia. Resuma em uma frase o que você traz de único e proponha concretamente uma entrevista. Reafirme seu entusiasmo pela vaga de ${lower} e indique sua disponibilidade. Uma conclusão forte deixa uma impressão duradoura e incentiva o recrutador a contatá-lo.

## Dicas por Nível de Experiência

### Recém-Formados

Sem experiência profissional significativa, aposte em seus estágios, projetos acadêmicos e competências transferíveis. Explique como sua formação o preparou para o cargo de ${lower}. Destaque sua motivação, capacidade de aprendizado rápido e atividades extracurriculares relevantes. Os recrutadores entendem que você está começando — eles buscam potencial, não um percurso já consolidado.

### Profissionais Experientes

Com vários anos de experiência, selecione as duas ou três realizações mais relevantes para a vaga de ${lower} almejada. Não tente cobrir tudo: concentre-se nos resultados que melhor demonstram seu valor agregado. Mostre sua evolução profissional e capacidade de assumir responsabilidades crescentes. Números e exemplos concretos são seus melhores aliados.

### Executivos Seniores

Neste nível, sua carta de apresentação de ${lower} deve refletir visão estratégica e capacidade de liderar equipes e projetos de grande porte. Destaque realizações em escala empresarial: transformações bem-sucedidas, economias realizadas, equipes construídas. Adote um tom confiante mas acessível, e mostre que compreende os desafios tanto operacionais quanto estratégicos do cargo.

## Erros Comuns em Cartas de Apresentação

- **Enviar uma carta genérica não personalizada** — Os recrutadores detectam imediatamente uma carta padrão enviada em massa. Cada candidatura de ${lower} merece uma carta adaptada que mencione a empresa, o cargo e as razões específicas do seu interesse.

- **Repetir o currículo palavra por palavra** — Sua carta de apresentação deve complementar seu currículo, não duplicá-lo. Use-a para desenvolver o contexto de suas realizações, explicar transições de carreira e transmitir sua personalidade profissional.

- **Começar cada frase com "Eu"** — Uma carta centrada unicamente em você mesma carece de perspectiva. Alterne entre o que você oferece e o que a empresa busca. Mostre que compreende as necessidades do cargo de ${lower} e como você as atende.

- **Negligenciar a forma e a ortografia** — Uma carta de apresentação com erros ortográficos ou formatação desorganizada envia um sinal negativo sobre seu rigor profissional. Revise cuidadosamente e peça a alguém para verificar seu texto antes do envio.

- **Esquecer o chamado à ação final** — Terminar sem propor um próximo passo concreto (entrevista, ligação telefônica, disponibilidade) deixa o recrutador sem direção. Conclua sempre com uma proposta clara e uma expressão da sua disponibilidade.

## Complete sua Carta com um Currículo Profissional

Uma carta de apresentação impactante merece um currículo à altura. Garanta que sua candidatura de ${lower} seja coerente do início ao fim:

- [Crie seu currículo profissional](/pt/builder) com nossa ferramenta gratuita e intuitiva, otimizada para sistemas ATS
- [Consulte nosso exemplo de currículo de ${lower}](/pt/resume-examples/${slug}) para se inspirar em modelos adaptados ao seu setor
- [Gere sua carta de apresentação automaticamente](/pt/tools/cover-letter) com nosso assistente de IA que adapta o conteúdo ao seu perfil

Uma candidatura completa e coerente — currículo caprichado, carta de apresentação personalizada — multiplica significativamente suas chances de conseguir uma entrevista para a vaga de ${lower} almejada.
`;
}
