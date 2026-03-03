/**
 * Portuguese blog — Part 8: Guias Especificos, Busca de Emprego e Topicos Regionais
 * Topics: guia TI, guia enfermagem, guia IA/ML, LinkedIn otimizar,
 * estrategia busca emprego, dicas Indeed,
 * LOCALE-ONLY: curriculo Lattes, curriculo Europass europeu,
 * curriculo jovem aprendiz, curriculo primeiro emprego
 * Targeting: curriculo primeiro emprego (5K), curriculo jovem aprendiz (5K)
 */

export const TOPICS_PART8 = [
  // ── Topic 64: Guia de Curriculo para TI ──────────────────────────────────
  {
    slug: 'guia-curriculo-ti',
    title: 'Curriculo para TI: Guia Completo para Tecnologia 2026',
    description: 'Como fazer curriculo para area de TI e tecnologia. Guia com exemplos para desenvolvedores, analistas e profissionais de tecnologia.',
    category: 'Guias por Area',
    tags: ['curriculo TI', 'curriculo tecnologia', 'curriculo desenvolvedor', 'curriculo programador', 'curriculo area tech', 'modelo curriculo TI', 'curriculo engenheiro software', 'curriculo profissional TI'],
    image: '/blog/pt-placeholder.svg',
    imageAlt: 'Curriculo para TI e tecnologia guia completo desenvolvedores 2026',
    featured: false,
    faq: [
      { question: 'O que diferencia um curriculo de TI?', answer: 'Curriculos de TI destacam: stack tecnico (linguagens, frameworks, ferramentas), projetos com links (GitHub, portfolio), contribuicoes open source, certificacoes cloud/tech, e metricas tecnicas (uptime, performance, usuarios). A secao de habilidades tecnicas e mais extensa que em outras areas.' },
      { question: 'Devo incluir GitHub no curriculo?', answer: 'Sim, se seu perfil tem projetos relevantes e bem documentados. Um GitHub ativo com projetos de qualidade pode ser mais valioso que experiencia formal para vagas de desenvolvimento. Limpe seu perfil antes: remova repositorios irrelevantes e documente os importantes.' },
      { question: 'Curriculo de TI deve ser de 1 ou 2 paginas?', answer: 'Para juniores e plenos: 1 pagina. Para seniors e especialistas com stack extenso: 2 paginas e aceitavel. Se o conteudo e relevante e conciso, 2 paginas nao e problema em TI. O mercado tech e mais flexivel que areas tradicionais.' },
      { question: 'Como listar tecnologias sem parecer uma lista de compras?', answer: 'Agrupe por categoria: Frontend (React, TypeScript, Next.js), Backend (Node.js, Python, PostgreSQL), Cloud (AWS, Docker, Kubernetes), Ferramentas (Git, Jira, VS Code). Use nivel quando relevante: "React (avancado), Vue.js (intermediario)".' },
      { question: 'Certificacoes de TI importam no curriculo?', answer: 'Sim, especialmente: AWS Solutions Architect, Google Cloud, Azure, Kubernetes (CKA), Scrum Master. Para security: CompTIA, CISSP. Certificacoes validam conhecimento e sao filtros de ATS. Priorize as mais relevantes para a vaga.' }
    ],
    body: `## Curriculo para TI: O Guia Definitivo para Profissionais de Tecnologia

O mercado de tecnologia brasileiro continua aquecido em 2026, com demanda superando a oferta de profissionais qualificados. Mas mesmo com alta demanda, um curriculo mal estruturado pode custar oportunidades. Profissionais de TI precisam de curriculos que comuniquem tanto competencia tecnica quanto impacto em negocios.

### Estrutura do Curriculo de TI

1. **Dados pessoais + Links** — GitHub, LinkedIn, portfolio, blog tecnico
2. **Resumo profissional** — Stack principal, anos de experiencia, especialidade
3. **Habilidades tecnicas** — Organizadas por categoria
4. **Experiencia profissional** — Com metricas tecnicas e de negocio
5. **Projetos** — Open source, pessoais, freelance
6. **Formacao e certificacoes** — Graduacao + certificacoes tech

### Exemplo de Resumo para Dev Senior

> Engenheiro de Software Senior com 6 anos de experiencia em desenvolvimento full-stack (React, Node.js, TypeScript). Especialista em arquitetura de microsservicos e DevOps. Liderou equipe de 8 desenvolvedores na construcao de plataforma SaaS com 300K usuarios ativos e uptime de 99,95%. Certificacoes AWS Solutions Architect e Kubernetes CKA.

### Como Listar Stack Tecnico

**Frontend:** React, Next.js, TypeScript, Tailwind CSS, Storybook
**Backend:** Node.js, Python, Go, REST APIs, GraphQL
**Database:** PostgreSQL, MongoDB, Redis, Elasticsearch
**Cloud/DevOps:** AWS (EC2, Lambda, S3, RDS), Docker, Kubernetes, Terraform, GitHub Actions
**Ferramentas:** Git, Jira, Datadog, Sentry, Figma

### Bullet Points que Impressionam

> - Projetei e implementei API de pagamentos processando 50K transacoes/dia com latencia P99 de 200ms
> - Migrei monolito para microsservicos, reduzindo tempo de deploy de 4 horas para 12 minutos
> - Mentoreei 5 desenvolvedores juniores, 4 promovidos para pleno em 12 meses
> - Implementei pipeline CI/CD que reduziu bugs em producao em 60%

### Para Diferentes Niveis

**Junior:** Destaque formacao, projetos pessoais, GitHub ativo, cursos
**Pleno:** Equilibre projetos, experiencia e stack tecnico
**Senior:** Foque em lideranca tecnica, arquitetura e impacto em negocios
**Staff/Principal:** Destaque decisoes arquiteturais, mentoria e estrategia

Crie seu curriculo de TI com nosso [criador de curriculo](/pt/resume-builder) — templates otimizados para o mercado tech.
`
  },

  // ── Topic 65: Guia de Curriculo para Enfermagem ──────────────────────────
  {
    slug: 'guia-curriculo-enfermagem',
    title: 'Curriculo de Enfermagem: Guia Completo para Enfermeiros',
    description: 'Como fazer curriculo de enfermagem profissional. Guia com exemplos para enfermeiros, tecnicos e auxiliares de enfermagem em 2026.',
    category: 'Guias por Area',
    tags: ['curriculo enfermagem', 'curriculo enfermeiro', 'modelo curriculo enfermagem', 'curriculo tecnico enfermagem', 'curriculo saude', 'curriculo hospital', 'curriculo COREN', 'curriculo enfermeiro exemplo'],
    image: '/blog/pt-placeholder.svg',
    imageAlt: 'Curriculo de enfermagem guia completo para enfermeiros 2026',
    featured: false,
    faq: [
      { question: 'O que destacar no curriculo de enfermagem?', answer: 'Destaque: registro COREN ativo, especializacoes (UTI, CC, Pediatria), certificacoes (ACLS, BLS, PALS), setores de experiencia, metricas de qualidade (satisfacao do paciente, eventos adversos zero), e experiencia com protocolos especificos.' },
      { question: 'Como listar registro COREN no curriculo?', answer: 'Inclua logo apos os dados pessoais: "COREN-SP 123456 — Ativo". Ou crie secao "Registro Profissional" antes da experiencia. O COREN e pre-requisito para contratacao e deve ser facilmente visivel.' },
      { question: 'Experiencia em estagio de enfermagem conta?', answer: 'Sim, especialmente para recem-formados. Inclua com detalhes: hospital/clinica, setor, periodo, principais atividades e aprendizados. Diferencie estagio obrigatorio de extracurricular — ambos sao validos.' },
      { question: 'Curriculo de tecnico de enfermagem e diferente?', answer: 'A estrutura e similar, mas tecnicos destacam: registro COREN-TE, experiencia assistencial direta, procedimentos dominados (sondagem, curativos, medicacao), e turnos trabalhados. A formacao tecnica substitui a graduacao na secao de formacao.' },
      { question: 'Como mencionar plantoes e carga horaria?', answer: 'Mencione disponibilidade de horario e experiencia com plantoes: "Experiencia em regime de plantao 12x36 e 24h". Para vagas que exigem flexibilidade, isso e diferencial. Especifique se tem experiencia noturna, fim de semana, etc.' }
    ],
    body: `## Curriculo de Enfermagem: Guia para Profissionais da Saude

A enfermagem e uma das profissoes com maior demanda no Brasil em 2026. Com a expansao do sistema de saude e envelhecimento da populacao, enfermeiros qualificados sao disputados por hospitais, clinicas e servicos de saude domiciliar.

### Estrutura do Curriculo de Enfermagem

1. **Dados pessoais e contato**
2. **Registro profissional** — COREN com numero e estado
3. **Resumo profissional** — Especialidade, anos, setores
4. **Experiencia profissional** — Hospitais, setores, metricas
5. **Formacao academica** — Graduacao e pos-graduacao
6. **Certificacoes** — ACLS, BLS, PALS, especializacoes
7. **Habilidades tecnicas** — Procedimentos e protocolos

### Exemplo de Resumo

> Enfermeira com 7 anos de experiencia em UTI adulto e emergencia. Registro COREN-SP ativo. Pos-graduacao em Terapia Intensiva e certificacoes ACLS e PALS vigentes. Indice de satisfacao do paciente de 97% e historico de zero eventos adversos graves nos ultimos 2 anos. Experiencia em hospitais de grande porte com mais de 300 leitos.

### Metricas para Enfermagem

- Satisfacao do paciente (% NPS ou pesquisa interna)
- Eventos adversos (zero ou reducao %)
- Leitos/pacientes sob responsabilidade
- Procedimentos realizados (tipo e volume)
- Equipe coordenada (tamanho)
- Turnos e regime de trabalho

### Bullet Points por Especialidade

**UTI:**
> - Presto cuidados intensivos a media de 6 pacientes/turno em UTI de alta complexidade
> - Implantei checklist de seguranca que reduziu infeccoes de cateter em 40%

**Emergencia:**
> - Atendo media de 40 pacientes/plantao em pronto-socorro de hospital terciario
> - Classificacao de risco com tempo medio de triagem de 3 minutos

**Centro Cirurgico:**
> - Circulante em 15+ procedimentos cirurgicos/semana
> - Indice zero de contagem incorreta de materiais em 200+ cirurgias

### Certificacoes Valorizadas

- **ACLS** (Advanced Cardiovascular Life Support)
- **BLS** (Basic Life Support)
- **PALS** (Pediatric Advanced Life Support)
- **ATLS** (Advanced Trauma Life Support)
- **Especializacoes** reconhecidas pelo MEC

Crie seu curriculo de enfermagem com nosso [criador de curriculo](/pt/resume-builder) — templates profissionais para a area da saude.
`
  },

  // ── Topic 66: Guia de Curriculo IA/ML ────────────────────────────────────
  {
    slug: 'guia-curriculo-ia-machine-learning',
    title: 'Curriculo para IA e Machine Learning: Guia Especializado',
    description: 'Como fazer curriculo para vagas de inteligencia artificial e machine learning. Habilidades, projetos e certificacoes que recrutadores buscam.',
    category: 'Guias por Area',
    tags: ['curriculo IA', 'curriculo machine learning', 'curriculo inteligencia artificial', 'curriculo data science', 'curriculo ML engineer', 'curriculo AI', 'curriculo ciencia dados', 'curriculo deep learning'],
    image: '/blog/pt-placeholder.svg',
    imageAlt: 'Curriculo para IA inteligencia artificial e machine learning guia 2026',
    featured: false,
    faq: [
      { question: 'O que destacar no curriculo de IA/ML?', answer: 'Destaque: modelos implementados em producao, metricas de performance (acuracia, F1-score), frameworks (TensorFlow, PyTorch), projetos com impacto mensuravel, publicacoes academicas se houver, e experiencia com MLOps. Recrutadores buscam impacto pratico, nao apenas conhecimento teorico.' },
      { question: 'Preciso de mestrado/doutorado para IA?', answer: 'Para pesquisa: sim, mestrado/doutorado e frequentemente exigido. Para engenharia de ML e ciencia de dados aplicada: experiencia pratica e portfolio podem compensar falta de pos. Bootcamps e certificacoes sao aceitos por muitas empresas, especialmente startups.' },
      { question: 'Como demonstrar habilidades de ML no curriculo?', answer: 'Inclua projetos com: descricao do problema, abordagem, metricas de resultado, stack tecnico e link (GitHub, Kaggle). Exemplo: "Desenvolvi modelo de predicao de churn com XGBoost alcancando 92% de recall, reduzindo perda de clientes em 25%".' },
      { question: 'Kaggle e relevante no curriculo?', answer: 'Sim, especialmente para juniores. Rankings em competicoes, notebooks populares e datasets contribuidos demonstram habilidade pratica. Mencione posicao em competicoes relevantes e notebooks com muitos upvotes.' },
      { question: 'MLOps e importante no curriculo de ML?', answer: 'Cada vez mais. Empresas buscam profissionais que nao apenas criam modelos, mas que os colocam em producao. Experiencia com MLflow, Kubeflow, feature stores, monitoramento de modelos e CI/CD para ML sao diferenciais significativos.' }
    ],
    body: `## Curriculo para IA e Machine Learning: O Guia Especializado

Inteligencia artificial e machine learning sao as areas de maior crescimento no mercado de tecnologia brasileiro em 2026. Com salarios que podem ultrapassar R$ 40.000/mes para posicoes senior, a competicao por vagas e acirrada — e seu curriculo precisa demonstrar tanto competencia tecnica quanto impacto em negocios.

### Perfis de Carreira em IA/ML

**ML Engineer:** Foco em colocar modelos em producao, MLOps, infraestrutura
**Data Scientist:** Analise exploratoria, modelagem estatistica, insights de negocio
**AI Researcher:** Pesquisa de novos algoritmos, publicacoes, inovacao
**NLP Engineer:** Processamento de linguagem natural, LLMs, chatbots
**Computer Vision:** Visao computacional, reconhecimento de imagem/video

### Estrutura do Curriculo

1. **Dados + Links** — GitHub, Kaggle, Google Scholar, blog tecnico
2. **Resumo** — Especialidade de ML, anos, impacto principal
3. **Habilidades tecnicas** — Por categoria (ML, dados, infra)
4. **Experiencia** — Modelos em producao com metricas
5. **Projetos** — Pessoais e competicoes com resultados
6. **Publicacoes** — Se houver (conferencias, journals)
7. **Formacao e certificacoes** — Graduacao, pos, certs

### Stack Tecnico para IA/ML

**Linguagens:** Python, R, SQL, Scala
**ML Frameworks:** TensorFlow, PyTorch, scikit-learn, XGBoost, LightGBM
**Deep Learning:** Transformers, CNNs, RNNs, GANs, LLMs
**MLOps:** MLflow, Kubeflow, Airflow, DVC, Weights & Biases
**Cloud ML:** AWS SageMaker, Google Vertex AI, Azure ML
**Dados:** Pandas, Spark, Databricks, feature stores

### Exemplos de Bullet Points

> - Desenvolvi modelo de recomendacao com Transformers que aumentou conversao em 18% (A/B test, n=500K)
> - Implementei pipeline MLOps end-to-end com MLflow e Kubernetes reduzindo tempo de deploy de modelos de 2 semanas para 2 horas
> - Criei sistema NLP de classificacao de tickets com 94% de acuracia, eliminando 60% do trabalho manual de triagem
> - Publicei artigo no SBBD 2025 sobre deteccao de fraudes com graph neural networks

### Portfolio que Impressiona

Projetos que demonstram competencia real:
- Competicoes Kaggle com top 10%
- Modelos em producao com metricas de impacto
- Contribuicoes para bibliotecas open source de ML
- Blog tecnico com tutoriais e analises

Crie seu curriculo de IA/ML com nosso [criador de curriculo](/pt/resume-builder) — destaque seu stack tecnico e projetos de forma profissional.
`
  },

  // ── Topic 67: Otimizar Perfil LinkedIn ───────────────────────────────────
  {
    slug: 'otimizar-perfil-linkedin',
    title: 'Como Otimizar Perfil LinkedIn: Guia para Recrutadores 2026',
    description: 'Como otimizar seu perfil no LinkedIn para atrair recrutadores em 2026. Dicas de headline, sobre, experiencia e palavras-chave.',
    category: 'Carreira',
    tags: ['otimizar LinkedIn', 'perfil LinkedIn', 'LinkedIn recrutadores', 'LinkedIn dicas', 'como melhorar LinkedIn', 'LinkedIn perfil profissional', 'LinkedIn palavras-chave', 'LinkedIn headline'],
    image: '/blog/pt-placeholder.svg',
    imageAlt: 'Como otimizar perfil LinkedIn para atrair recrutadores 2026',
    featured: false,
    faq: [
      { question: 'O LinkedIn e importante para encontrar emprego no Brasil?', answer: 'Sim, o LinkedIn e a principal plataforma profissional no Brasil com 75+ milhoes de usuarios. 87% dos recrutadores brasileiros usam LinkedIn para buscar candidatos. Um perfil otimizado pode gerar convites para entrevistas sem que voce se candidate ativamente.' },
      { question: 'O que e mais importante no perfil LinkedIn?', answer: 'Os 3 elementos mais importantes sao: Headline (titulo sob o nome), secao Sobre (resumo) e Experiencia. A headline e o mais visivel em buscas e deve conter suas palavras-chave profissionais, nao apenas seu cargo atual.' },
      { question: 'Devo colocar "Open to Work" no LinkedIn?', answer: 'Depende da sua situacao. Se esta desempregado, ativar "Open to Work" (visivel apenas para recrutadores) aumenta visualizacoes em 40%. Se esta empregado buscando discretamente, ative apenas para recrutadores. O banner verde publico pode incomodar seu empregador atual.' },
      { question: 'Como escrever uma boa headline?', answer: 'Nao use apenas seu cargo atual. Inclua: especializacao + cargo + diferencial. Exemplo: "Marketing Digital | Growth Hacker | +200% Trafego Organico | Google Ads Certified". Use palavras-chave que recrutadores buscam, nao descricoes vagas.' },
      { question: 'Preciso postar conteudo no LinkedIn?', answer: 'Publicar regularmente aumenta sua visibilidade significativamente. Nao precisa ser diario — 2-3 posts por semana sobre sua area de atuacao ja fazem diferenca. Compartilhe aprendizados, opinioes sobre tendencias e conquistas profissionais.' }
    ],
    body: `## Como Otimizar Seu LinkedIn para Atrair Recrutadores em 2026

O LinkedIn se consolidou como a principal ferramenta de recrutamento no Brasil. Com mais de 75 milhoes de usuarios brasileiros, um perfil otimizado pode gerar oportunidades sem que voce precise se candidatar ativamente. Recrutadores buscam por palavras-chave — se seu perfil nao contem os termos certos, voce e invisivel.

### Os 5 Elementos Mais Importantes

**1. Foto Profissional**
Perfis com foto recebem 21x mais visualizacoes. Use foto recente, com boa iluminacao, fundo neutro e expressao acessivel. Nao use foto de festa, praia ou com outras pessoas.

**2. Headline (Titulo)**
O campo mais importante depois do nome. Aparece em buscas e ao lado de cada comentario seu.

Ruim: "Analista na Empresa XYZ"
Bom: "Analista de Dados | Python, SQL, Power BI | Transformando dados em decisoes estrategicas"

**3. Secao Sobre**
Seu pitch profissional em 2.600 caracteres. Inclua: quem voce e, o que faz, resultados que gera, e palavras-chave da sua area.

**4. Experiencia**
Nao copie o curriculo — adapte para o formato LinkedIn. Inclua metricas, projetos e conquistas. Use bullet points para facilitar leitura.

**5. Habilidades e Recomendacoes**
Liste 50 habilidades (o maximo). As 3 primeiras sao as mais visíveis. Peca endorsements de colegas e gestores.

### Palavras-Chave para LinkedIn

O LinkedIn funciona como um motor de busca. Recrutadores pesquisam termos como:
- Cargos: "Engenheiro de Software", "Analista de Marketing"
- Habilidades: "Python", "Google Ads", "Project Management"
- Certificacoes: "PMP", "AWS", "Scrum Master"
- Setores: "Fintech", "E-commerce", "SaaS"

Distribua essas palavras naturalmente pela headline, sobre, experiencia e habilidades.

### Estrategia de Conteudo

Publique regularmente para aumentar visibilidade:
- Compartilhe aprendizados profissionais
- Comente em posts de lideres da sua area
- Publique conquistas e marcos de carreira
- Compartilhe artigos relevantes com sua opiniao

### LinkedIn vs Curriculo

O LinkedIn complementa, nao substitui seu curriculo:
- LinkedIn: mais detalhado, interativo, com recomendacoes
- Curriculo: mais conciso, personalizado por vaga, formato ATS

Mantenha ambos atualizados e alinhados. Crie seu curriculo profissional com nosso [criador de curriculo](/pt/resume-builder).
`
  },

  // ── Topic 68: Estrategia de Busca de Emprego ─────────────────────────────
  {
    slug: 'estrategia-busca-emprego',
    title: 'Estrategia de Busca de Emprego: Plano Passo a Passo 2026',
    description: 'Estrategia completa de busca de emprego para 2026. Plano passo a passo com plataformas, networking e dicas para encontrar emprego rapido.',
    category: 'Carreira',
    tags: ['busca de emprego', 'como encontrar emprego', 'estrategia emprego', 'procurar emprego 2026', 'plano busca trabalho', 'como conseguir emprego', 'dicas encontrar vaga', 'emprego rapido'],
    image: '/blog/pt-placeholder.svg',
    imageAlt: 'Estrategia completa de busca de emprego plano passo a passo 2026',
    featured: false,
    faq: [
      { question: 'Quanto tempo leva para encontrar emprego no Brasil?', answer: 'A media e 3-6 meses para profissionais qualificados em 2026. Em areas de alta demanda (TI, saude), pode ser 1-3 meses. Em areas saturadas, pode ultrapassar 6 meses. Uma estrategia estruturada reduz significativamente esse tempo.' },
      { question: 'Quantas candidaturas enviar por dia?', answer: 'Qualidade supera quantidade. 3-5 candidaturas personalizadas por dia sao mais eficazes que 20 genericas. Cada candidatura deve ter curriculo adaptado, palavras-chave da vaga e, quando possível, contato direto com recrutador.' },
      { question: 'Quais as melhores plataformas de emprego no Brasil?', answer: 'Principais: LinkedIn (maior), Catho, InfoJobs, Vagas.com, Indeed. Para tech: GeekHunter, Programathor, Trampos.co. Para estagios: CIEE, NUBE, 99jobs. Para executivos: Robert Half, Michael Page, Hays.' },
      { question: 'Networking realmente funciona para encontrar emprego?', answer: 'Sim, estima-se que 60-70% das vagas sao preenchidas por indicacao ou networking. Manter contato com ex-colegas, participar de eventos do setor, ser ativo no LinkedIn e pedir indicacoes sao estrategias comprovadas.' },
      { question: 'Devo aceitar qualquer emprego enquanto busco o ideal?', answer: 'Depende da urgencia financeira. Um emprego temporario ou freelance pode cobrir despesas enquanto busca a vaga ideal. Porem, aceitar posicao muito abaixo do seu nivel pode dificultar negociacoes futuras. Considere trabalho temporario ou freelance como alternativa.' }
    ],
    body: `## Estrategia de Busca de Emprego: Seu Plano de Acao para 2026

Buscar emprego sem estrategia e como navegar sem mapa. Uma abordagem estruturada aumenta dramaticamente suas chances e reduz o tempo de busca. Este guia apresenta um plano passo a passo testado para o mercado brasileiro.

### Fase 1: Preparacao (Semana 1-2)

**Curriculo:**
- Atualize com conquistas recentes e palavras-chave
- Crie versoes para diferentes tipos de vaga
- Use nosso [criador de curriculo](/pt/resume-builder) para formato profissional

**LinkedIn:**
- Atualize headline e secao Sobre
- Ative "Open to Work" (para recrutadores)
- Conecte-se com 10 pessoas do setor por semana

**Pesquisa de mercado:**
- Identifique 10-15 empresas-alvo
- Pesquise faixas salariais da sua area
- Mapeie vagas disponiveis nas plataformas

### Fase 2: Candidaturas Ativas (Semana 3+)

**Rotina diaria:**
- 30 min: Busque novas vagas nas plataformas
- 30 min: Personalize curriculo e candidate-se (3-5 vagas)
- 30 min: Networking (LinkedIn, contatos, eventos)
- 30 min: Desenvolvimento (cursos, certificacoes)

### Fase 3: Networking Estrategico

- Participe de eventos do setor (meetups, conferencias)
- Seja ativo em comunidades online da sua area
- Peca indicacoes a ex-colegas e amigos
- Conecte-se com recrutadores das empresas-alvo
- Ofereça ajuda antes de pedir (mentalidade de networking)

### Plataformas por Perfil

**Generalistas:** LinkedIn, Catho, InfoJobs, Vagas.com, Indeed
**Tecnologia:** GeekHunter, Programathor, Trampos.co, GitHub Jobs
**Estagios:** CIEE, NUBE, 99jobs, Companhia de Estagios
**Executivos:** Robert Half, Michael Page, Hays, Spencer Stuart
**Freelance:** Upwork, Workana, 99Freelas, Fiverr

### Metricas para Acompanhar

- Candidaturas enviadas por semana
- Taxa de resposta (meta: 10-15%)
- Entrevistas agendadas por mes
- Networking: novos contatos por semana
- Tempo medio entre candidatura e resposta

### Mantenha-se Motivado

- Defina rotina fixa de busca
- Celebre pequenas conquistas
- Mantenha-se ativo (exercicio, hobbies)
- Aceite apoio de familia e amigos
- Lembre-se: encontrar emprego e um processo, nao um evento

Um curriculo profissional e a base da sua estrategia. Comece pelo nosso [criador de curriculo gratuito](/pt/resume-builder).
`
  },

  // ── Topic 69: Dicas para Curriculo no Indeed ─────────────────────────────
  {
    slug: 'dicas-curriculo-indeed',
    title: 'Curriculo no Indeed: Como Otimizar e Se Destacar 2026',
    description: 'Dicas para otimizar seu curriculo no Indeed. Como se destacar nas buscas, configurar alertas e aumentar visualizacoes do seu perfil.',
    category: 'Ferramentas',
    tags: ['curriculo Indeed', 'Indeed dicas', 'como usar Indeed', 'curriculo plataforma emprego', 'Indeed Brasil', 'otimizar Indeed', 'perfil Indeed', 'vagas Indeed'],
    image: '/blog/pt-placeholder.svg',
    imageAlt: 'Como otimizar curriculo no Indeed para se destacar 2026',
    featured: false,
    faq: [
      { question: 'O Indeed funciona bem no Brasil?', answer: 'Sim, o Indeed e uma das maiores plataformas de emprego no Brasil com milhoes de vagas agregadas de diversas fontes. Funciona como buscador de vagas, coletando anuncios de sites de empresas, portais de emprego e agencias de recrutamento.' },
      { question: 'Devo criar curriculo no Indeed ou fazer upload?', answer: 'Faca upload do seu PDF profissional E preencha o perfil do Indeed. O perfil preenchido aparece nas buscas de recrutadores. O PDF e enviado quando voce se candidata. Ter ambos maximiza sua visibilidade.' },
      { question: 'Como aparecer nas buscas de recrutadores no Indeed?', answer: 'Preencha seu perfil completamente, use palavras-chave da sua area no titulo e descricao, mantenha o curriculo publico, candidate-se regularmente (perfis ativos aparecem mais), e configure alertas para vagas relevantes.' },
      { question: 'O Indeed e pago?', answer: 'Para candidatos, o Indeed e totalmente gratuito. Voce pode buscar vagas, criar perfil, fazer upload de curriculo e se candidatar sem custos. Empresas pagam para promover vagas, mas isso nao afeta sua experiencia como candidato.' },
      { question: 'Indeed vs LinkedIn: qual e melhor?', answer: 'Ambos sao complementares. Indeed e melhor para busca ativa de vagas e candidatura direta. LinkedIn e melhor para networking, ser encontrado por recrutadores e construir presenca profissional. Use ambos na sua estrategia de busca.' }
    ],
    body: `## Curriculo no Indeed: Otimize e Seja Encontrado

O Indeed e uma das maiores plataformas de busca de emprego do Brasil, agregando vagas de centenas de fontes. Otimizar seu perfil e curriculo no Indeed pode aumentar significativamente sua visibilidade para recrutadores e suas chances de ser chamado para entrevistas.

### Como Funciona o Indeed

O Indeed funciona como um buscador de vagas:
- Agrega vagas de sites de empresas, portais e agencias
- Permite busca por cargo, palavra-chave e localizacao
- Recrutadores podem buscar curriculos de candidatos
- Candidatos podem se candidatar diretamente pela plataforma

### Otimizando Seu Perfil

**Titulo profissional:**
Use cargo + especialidade: "Analista de Marketing Digital | SEO e Google Ads"

**Resumo:**
Inclua palavras-chave da sua area nos primeiros 200 caracteres. Seja direto sobre experiencia e especializacoes.

**Experiencia:**
Preencha todas as experiencias com descricoes detalhadas. Use os mesmos bullet points do seu curriculo.

**Habilidades:**
Adicione todas as habilidades relevantes. O Indeed usa essas informacoes para matching com vagas.

### Dicas para Mais Visualizacoes

1. **Mantenha o perfil ativo** — Atualize semanalmente
2. **Candidate-se regularmente** — Perfis ativos aparecem mais
3. **Use palavras-chave** — No titulo, resumo e experiencia
4. **Faca upload de curriculo PDF** — Profissional e otimizado
5. **Configure alertas** — Receba vagas novas por email
6. **Mantenha contato atualizado** — Telefone e email corretos

### Indeed vs Outras Plataformas

| Plataforma | Foco | Melhor para |
|---|---|---|
| Indeed | Busca ampla de vagas | Candidatura ativa |
| LinkedIn | Networking + vagas | Ser encontrado |
| Catho | Vagas Brasil | Mercado nacional |
| Gupy | Candidatura ATS | Grandes empresas |

### Estrategia Combinada

Use o Indeed como parte de uma estrategia multi-plataforma:
- Indeed para busca ativa de vagas
- LinkedIn para networking e visibilidade
- Sites de empresas para candidatura direta
- Plataformas especializadas para sua area

Antes de fazer upload no Indeed, garanta que seu curriculo esteja profissional. Use nosso [criador de curriculo](/pt/resume-builder) para criar o documento perfeito.
`
  },

  // ── LOCALE-ONLY: Topic 70: Curriculo Lattes ──────────────────────────────
  {
    slug: 'curriculo-lattes-plataforma',
    title: 'Curriculo Lattes: Como Preencher e Atualizar | Guia CNPq',
    description: 'Guia completo do Curriculo Lattes do CNPq. Como preencher, atualizar e otimizar seu Lattes para bolsas, concursos e pos-graduacao.',
    category: 'Curriculo',
    tags: ['curriculo Lattes', 'Lattes CNPq', 'como preencher Lattes', 'plataforma Lattes', 'curriculo academico Lattes', 'Lattes atualizar', 'curriculo pesquisador', 'CNPq Lattes'],
    image: '/blog/pt-placeholder.svg',
    imageAlt: 'Curriculo Lattes CNPq como preencher e atualizar guia completo',
    featured: false,
    faq: [
      { question: 'O que e o Curriculo Lattes?', answer: 'O Curriculo Lattes e um sistema de curriculo online criado e mantido pelo CNPq (Conselho Nacional de Desenvolvimento Cientifico e Tecnologico). E o padrao para documentacao de atividades academicas e cientificas no Brasil, usado por pesquisadores, professores e estudantes de pos-graduacao.' },
      { question: 'Quem precisa ter Curriculo Lattes?', answer: 'Todo profissional ligado ao meio academico: pesquisadores, professores universitarios, estudantes de mestrado e doutorado, candidatos a bolsas de pesquisa (CAPES, CNPq, FAPESP), participantes de concursos em universidades, e profissionais que atuam em ciencia e tecnologia.' },
      { question: 'Como criar um Curriculo Lattes?', answer: 'Acesse lattes.cnpq.br, clique em "Cadastrar novo curriculo", preencha os dados pessoais e profissionais seguindo os formularios. O sistema e organizado em secoes: identificacao, formacao, atuacao profissional, producao bibliografica, projetos e orientacoes.' },
      { question: 'Com que frequencia devo atualizar o Lattes?', answer: 'Atualize sempre que houver novidade: nova publicacao, conclusao de curso, inicio/termino de projeto, nova orientacao, participacao em evento. O ideal e atualizar mensalmente. Lattes desatualizado prejudica candidaturas a bolsas e concursos.' },
      { question: 'O Lattes substitui o curriculo profissional?', answer: 'Nao. O Lattes e especifico para o meio academico. Para vagas no setor privado, use um curriculo profissional (1-2 paginas). Para vagas academicas, apresente ambos: Lattes completo + CV resumido profissional.' }
    ],
    body: `## Curriculo Lattes: O Guia Definitivo da Plataforma CNPq

O Curriculo Lattes e o documento mais importante para qualquer profissional do meio academico brasileiro. Criado pelo CNPq em 1999, a Plataforma Lattes reune informacoes academicas de mais de 7 milhoes de pesquisadores e e pre-requisito para bolsas, concursos e pos-graduacao no Brasil.

### O Que E a Plataforma Lattes

A Plataforma Lattes e um sistema integrado que:
- Armazena curriculos academicos padronizados
- E utilizado por CNPq, CAPES, FAPESP e todas as agencias de fomento
- Integra diretorio de grupos de pesquisa
- Conecta com bases de dados de publicacoes
- E referencia para avaliacao de programas de pos-graduacao

### Secoes do Curriculo Lattes

**Identificacao:**
Nome, CPF, data de nascimento, contato, link para ORCID.

**Formacao Academica:**
Graduacao, mestrado, doutorado, pos-doutorado. Inclua titulo do trabalho e orientador.

**Atuacao Profissional:**
Vinculos institucionais atuais e anteriores, cargos e atividades.

**Producao Bibliografica:**
Artigos em periodicos, livros, capitulos, trabalhos em eventos, resumos.

**Producao Tecnica:**
Software, patentes, relatorios tecnicos, producao artistica.

**Projetos de Pesquisa:**
Projetos atuais e concluidos, financiamento, equipe.

**Orientacoes:**
Doutorado, mestrado, IC, TCC — concluidas e em andamento.

**Premios e Titulos:**
Reconhecimentos academicos e profissionais.

### Dicas para Otimizar o Lattes

1. **Mantenha atualizado** — Atualize a cada nova producao ou atividade
2. **Seja completo** — Inclua todas as publicacoes, projetos e orientacoes
3. **Vincule ao ORCID** — Integra automaticamente publicacoes internacionais
4. **Use palavras-chave** — Nas descricoes de projetos e areas de atuacao
5. **Organize por relevancia** — Destaque producoes de maior impacto

### Lattes para Estudantes de Pos-Graduacao

Se voce esta iniciando a vida academica:
- Crie o Lattes no inicio do mestrado/doutorado
- Registre apresentacoes em eventos desde o primeiro
- Inclua iniciacao cientifica e monitorias
- Atualize a cada artigo submetido ou aceito
- Vincule ao grupo de pesquisa do orientador

### Lattes vs Curriculo Profissional

Para vagas fora da academia, voce precisa de um curriculo profissional separado. O Lattes e extenso e academico — empresas querem documentos concisos e focados em resultados de negocio.

Crie seu curriculo profissional com nosso [criador de curriculo](/pt/resume-builder) para complementar seu Lattes quando buscar oportunidades fora do meio academico.
`
  },

  // ── LOCALE-ONLY: Topic 71: Curriculo Jovem Aprendiz ─────────────────────
  {
    slug: 'curriculo-jovem-aprendiz',
    title: 'Curriculo para Jovem Aprendiz: Modelo e Dicas 2026',
    description: 'Como fazer curriculo para programa Jovem Aprendiz. Modelo pronto, dicas e o que colocar mesmo sem experiencia profissional.',
    category: 'Curriculo',
    tags: ['curriculo jovem aprendiz', 'jovem aprendiz curriculo', 'modelo curriculo jovem aprendiz', 'como fazer curriculo aprendiz', 'curriculo menor aprendiz', 'curriculo primeiro trabalho', 'programa jovem aprendiz', 'curriculo aprendiz modelo'],
    image: '/blog/pt-placeholder.svg',
    imageAlt: 'Curriculo para programa Jovem Aprendiz modelo e dicas 2026',
    featured: true,
    faq: [
      { question: 'O que e o programa Jovem Aprendiz?', answer: 'O Jovem Aprendiz e um programa do governo brasileiro (Lei 10.097/2000) que obriga empresas de medio e grande porte a contratar jovens de 14 a 24 anos para primeiro emprego com carteira assinada. Combina trabalho pratico com formacao teorica em instituicao parceira (SENAI, SENAC, CIEE).' },
      { question: 'Quais os requisitos para ser Jovem Aprendiz?', answer: 'Requisitos: idade entre 14 e 24 anos (sem limite para PcD), estar matriculado e frequentando escola (se nao concluiu ensino medio), e disponibilidade para carga horaria de 4-6 horas/dia. Nao e necessaria experiencia anterior.' },
      { question: 'Quanto ganha um Jovem Aprendiz em 2026?', answer: 'O salario minimo do Jovem Aprendiz e calculado com base no salario minimo hora, proporcional a carga horaria. Em 2026, o valor medio fica entre R$ 700 e R$ 1.200 para 4-6 horas diarias, dependendo da empresa. Grandes empresas geralmente pagam acima do piso.' },
      { question: 'O que colocar no curriculo de Jovem Aprendiz?', answer: 'Inclua: dados pessoais (com idade), escola e serie/ano, cursos extracurriculares, habilidades em informatica e idiomas, atividades escolares (representante, grêmio, feira de ciências), e trabalho voluntario. Destaque disponibilidade de horário.' },
      { question: 'Onde encontrar vagas de Jovem Aprendiz?', answer: 'Principais canais: CIEE (ciee.org.br), NUBE (nube.com.br), sites de grandes empresas (pagina Trabalhe Conosco), SENAC e SENAI locais, Catho (filtro Jovem Aprendiz), e Indeed. Muitas vagas tambem sao divulgadas em redes sociais.' }
    ],
    body: `## Curriculo para Jovem Aprendiz: Seu Primeiro Passo no Mercado de Trabalho

O programa Jovem Aprendiz e a principal porta de entrada para o mercado de trabalho brasileiro para jovens de 14 a 24 anos. Com carteira assinada, formacao profissional e experiencia pratica, e uma oportunidade que pode definir o rumo da sua carreira.

Criar um curriculo para Jovem Aprendiz tem desafios unicos: como se apresentar profissionalmente quando voce ainda nao tem experiencia?

### O Que as Empresas Buscam em Aprendizes

Empresas que contratam Jovem Aprendiz nao esperam experiencia. Elas buscam:
- **Vontade de aprender** e compromisso
- **Pontualidade e responsabilidade**
- **Habilidades basicas** de comunicacao e informatica
- **Disponibilidade de horario** compativel
- **Matricula escolar** ativa (se nao concluiu EM)

### Modelo de Curriculo para Jovem Aprendiz

**Dados Pessoais:**
> Pedro Henrique Santos Lima
> 16 anos | (11) 98765-4321 | pedro.lima@email.com
> Sao Paulo, SP — Zona Sul

**Objetivo:**
> Busco oportunidade como Jovem Aprendiz na area administrativa onde possa desenvolver habilidades profissionais e contribuir com a equipe. Disponivel para turno da tarde (13h-17h).

**Formacao:**
> 2o ano do Ensino Medio
> Escola Estadual Prof. Maria Santos, Sao Paulo | Previsao: Dez/2027

**Cursos:**
> - Informatica Basica — SENAC (80 horas) | 2025
> - Ingles Basico — Cultura Inglesa | Em andamento

**Habilidades:**
> - Pacote Office (Word, Excel, PowerPoint) — Intermediario
> - Digitacao rapida
> - Boa comunicacao oral e escrita
> - Trabalho em equipe

**Atividades:**
> - Representante de classe | 2025
> - Voluntario em campanha de arrecadacao escolar | 2024
> - Participacao na Feira de Profissoes | 2024

### Dicas Especificas para Jovem Aprendiz

1. **Mencione sua idade** — E requisito do programa
2. **Especifique disponibilidade** — Turno e carga horaria
3. **Destaque escola** — Serie/ano e previsao de conclusao
4. **Inclua cursos** — Mesmo curtos, demonstram iniciativa
5. **Mantenha em 1 pagina** — Simples e objetivo
6. **Use email profissional** — Nada de apelidos

### Etapas do Processo Seletivo

1. **Inscricao** — Pelo site da empresa ou plataforma (CIEE, NUBE)
2. **Triagem de curriculo** — Por isso seu curriculo importa
3. **Dinamica de grupo** — Atividades em equipe observadas
4. **Entrevista** — Geralmente simples e acolhedora
5. **Exame admissional** — Exame medico obrigatorio
6. **Contratacao** — Carteira assinada com todos os direitos

### Direitos do Jovem Aprendiz

- Carteira assinada (CTPS)
- Salario proporcional ao minimo/hora
- 13o salario e ferias
- FGTS (2% — aliquota reduzida)
- Vale-transporte
- Formacao teorica paga

Crie seu curriculo de Jovem Aprendiz com nosso [criador de curriculo gratuito](/pt/resume-builder) — modelos simples e profissionais perfeitos para seu primeiro emprego.
`
  },

  // ── LOCALE-ONLY: Topic 72: Curriculo Primeiro Emprego ────────────────────
  {
    slug: 'curriculo-primeiro-emprego-guia',
    title: 'Curriculo para Primeiro Emprego: Guia Definitivo 2026',
    description: 'Como fazer curriculo para primeiro emprego mesmo sem experiencia. Guia completo com modelos, exemplos e estrategias para conquistar sua primeira vaga.',
    category: 'Curriculo',
    tags: ['curriculo primeiro emprego', 'primeiro emprego curriculo', 'como fazer curriculo primeiro emprego', 'curriculo sem experiencia primeiro emprego', 'modelo curriculo primeiro emprego', 'curriculo iniciante', 'primeiro trabalho curriculo', 'como conseguir primeiro emprego'],
    image: '/blog/pt-placeholder.svg',
    imageAlt: 'Curriculo para primeiro emprego sem experiencia guia completo 2026',
    featured: true,
    faq: [
      { question: 'Como fazer curriculo para o primeiro emprego sem experiencia?', answer: 'Foque em: formacao academica detalhada, cursos extracurriculares, habilidades tecnicas (informatica, idiomas), atividades escolares e voluntarias, e objetivo profissional claro. Use formato funcional que destaque competencias em vez de historico de trabalho.' },
      { question: 'Qual a idade minima para trabalhar no Brasil?', answer: 'No Brasil: 14 anos como Jovem Aprendiz, 16 anos para trabalho regular com restricoes (nao pode ser noturno, perigoso ou insalubre), e 18 anos sem restricoes. Estagio pode comecar com 16 anos para ensino medio ou qualquer idade no superior.' },
      { question: 'Preciso de experiencia para conseguir primeiro emprego?', answer: 'Nao para vagas de entrada, estagio ou Jovem Aprendiz. Essas vagas sao especificamente para quem nao tem experiencia. Para vagas CLT regulares, busque posicoes de auxiliar, assistente ou atendente que geralmente aceitam iniciantes.' },
      { question: 'O que destacar quando nao tenho experiencia?', answer: 'Destaque: cursos realizados (SENAI, SENAC, online), projetos escolares, trabalho voluntario, competicoes e eventos, habilidades tecnicas, idiomas, e caracteristicas pessoais evidenciadas por atividades (lideranca em grupo escolar, organizacao de eventos).' },
      { question: 'Devo mentir sobre experiencia para conseguir o primeiro emprego?', answer: 'Jamais. Mentiras sao facilmente verificadas e resultam em eliminacao ou demissao. Empresas que contratam para primeiro emprego NAO esperam experiencia. Valorize o que voce TEM: formacao, cursos, habilidades e vontade de aprender.' }
    ],
    body: `## Curriculo para Primeiro Emprego: Da Escola ao Mercado de Trabalho

Conseguir o primeiro emprego e um marco na vida de qualquer pessoa. O maior desafio e criar um curriculo impactante quando voce nao tem experiencia profissional. A boa noticia: milhares de vagas no Brasil sao criadas especificamente para quem esta comecando.

### Tipos de Primeiro Emprego

**Jovem Aprendiz (14-24 anos):**
Carteira assinada + formacao. Carga horaria reduzida compativel com escola.

**Estagio (16+ anos):**
Bolsa-auxilio + aprendizado pratico. Vinculado a formacao academica.

**CLT Nivel Entrada:**
Auxiliar, assistente, atendente. Exigencia minima de experiencia.

**Freelance/Autonomo:**
Trabalhos independentes que geram experiencia para o curriculo.

### Estrutura Ideal

1. **Dados pessoais** — Nome, idade, telefone, email, cidade
2. **Objetivo** — Especifico: cargo + area + contribuicao
3. **Formacao** — Escola/universidade com detalhes relevantes
4. **Cursos** — Tudo que demonstre proatividade
5. **Habilidades** — Tecnicas e interpessoais
6. **Atividades** — Voluntariado, escola, projetos

### Exemplo Completo

**Dados:**
> Ana Clara Rodrigues
> 17 anos | (21) 99876-5432 | anaclara.rodrigues@email.com
> Rio de Janeiro, RJ — Barra da Tijuca

**Objetivo:**
> Jovem de 17 anos buscando primeira oportunidade profissional como Auxiliar Administrativo. Estudante dedicada com habilidades em informatica e comunicacao, disponivel para turno vespertino.

**Formacao:**
> 3o ano do Ensino Medio — Colegio Pedro II, Rio de Janeiro
> Previsao de conclusao: Dezembro/2026
> Destaque: Aluna destaque 2025, participacao na Olimpiada de Matematica

**Cursos:**
> - Auxiliar de Escritorio — SENAC (160 horas) | 2025
> - Excel Completo — Coursera (40 horas) | 2025
> - Ingles Intermediario — Wizard | Em andamento

**Habilidades:**
> Informatica: Word, Excel, PowerPoint (intermediario)
> Idiomas: Ingles intermediario
> Pessoal: Organizacao, pontualidade, comunicacao, trabalho em equipe

**Atividades:**
> - Representante de classe | 2025
> - Voluntaria no projeto Crianca Feliz — Instituto ABC | 2024
> - Organizadora da Feira Cultural da escola | 2024

### Estrategias para Compensar Falta de Experiencia

**Invista em cursos:**
- SENAI, SENAC e SEBRAE oferecem cursos gratuitos com certificado
- Fundacao Bradesco, Google, Coursera — cursos online reconhecidos
- Cada certificado fortalece seu curriculo

**Trabalho voluntario:**
- ONGs, igrejas, projetos sociais
- Inclua no curriculo com descricao de atividades
- Demonstra responsabilidade e empatia

**Projetos pessoais:**
- Blog, canal, loja virtual, app
- Demonstram iniciativa e criatividade
- Mesmo projetos pequenos sao validos

### Onde Buscar Primeiro Emprego

**Programas de aprendizagem:** CIEE, NUBE, SENAC, SENAI
**Plataformas digitais:** Indeed, Catho, InfoJobs, Vagas.com
**Redes sociais:** LinkedIn, grupos de Facebook locais
**Presencialmente:** Comercio local, feiras de emprego, SINE

### Erros Comuns no Primeiro Curriculo

- Curriculo com mais de 1 pagina
- Email informal (gatinha123@email.com)
- Mentir sobre habilidades ou experiencia
- Nao incluir telefone para contato
- Objetivo generico ("busco crescimento profissional")

Crie seu primeiro curriculo profissional com nosso [criador de curriculo gratuito](/pt/resume-builder) — simples, rapido e perfeito para quem esta comecando.
`
  },

  // ── LOCALE-ONLY: Topic 73: Curriculo Modelo Europeu ──────────────────────
  {
    slug: 'curriculo-modelo-europeu-portugal',
    title: 'Curriculo Modelo Europeu: Guia para Trabalhar na Europa',
    description: 'Como fazer curriculo no modelo europeu para trabalhar em Portugal e na Europa. Europass, formato europeu e dicas para brasileiros.',
    category: 'Curriculo',
    tags: ['curriculo modelo europeu', 'curriculo para Portugal', 'Europass Portugal', 'curriculo europeu', 'trabalhar Europa curriculo', 'CV europeu', 'modelo europeu curriculo', 'curriculo brasileiro Europa'],
    image: '/blog/pt-placeholder.svg',
    imageAlt: 'Curriculo modelo europeu para trabalhar em Portugal e Europa guia',
    featured: false,
    faq: [
      { question: 'Qual formato de curriculo usar para trabalhar em Portugal?', answer: 'Em Portugal, o formato Europass ainda e aceito, especialmente em concursos publicos e grandes empresas. Porem, curriculos personalizados com design moderno estao ganhando preferencia no setor privado. Ter ambas as versoes e a melhor estrategia.' },
      { question: 'O curriculo brasileiro serve para vagas na Europa?', answer: 'Precisa de adaptacoes: remova CPF e RG (dados brasileiros), adicione nacionalidade, adapte datas para formato europeu (dia/mes/ano), inclua nivel de idiomas no padrao CEFR (A1-C2), e considere adicionar foto (comum na Europa continental).' },
      { question: 'Preciso traduzir meu curriculo para portugues de Portugal?', answer: 'Para vagas em Portugal, o portugues brasileiro e aceito mas pequenas adaptacoes sao bem-vindas: "curriculo" → "CV" ou "curriculum vitae", "celular" → "telemovel", "estagio" → "estagio" (mesma grafia). Para outros paises europeus, traduza para ingles.' },
      { question: 'Foto no curriculo europeu e obrigatoria?', answer: 'Nao e obrigatoria em nenhum pais da UE, mas e comum na Alemanha, Franca, Espanha e Portugal. No Reino Unido e Irlanda, curriculos sem foto sao o padrao. Para Portugal, incluir foto profissional e recomendado.' },
      { question: 'O que e o padrao CEFR para idiomas?', answer: 'CEFR (Common European Framework of Reference) e o padrao europeu para nivel de idiomas: A1-A2 (basico), B1-B2 (intermediario), C1-C2 (avancado/fluente). Use no curriculo europeu em vez de "basico/intermediario/avancado". E universalmente reconhecido na Europa.' }
    ],
    body: `## Curriculo Modelo Europeu: Guia para Brasileiros na Europa

Trabalhar na Europa e o objetivo de milhares de brasileiros, e Portugal e a porta de entrada mais natural pela lingua em comum. Porem, o curriculo que funciona no Brasil precisa de adaptacoes para o mercado europeu.

### Diferencas entre Curriculo Brasileiro e Europeu

| Aspecto | Brasil | Europa |
|---|---|---|
| Termo | Curriculo | CV / Curriculum Vitae |
| Foto | Opcional | Comum (exceto UK) |
| Estado civil | Nao incluir | Opcional |
| Data nascimento | Nao incluir | Frequente |
| CPF/RG | Nunca | N/A |
| Idiomas | Basico/Avancado | CEFR (A1-C2) |
| Formato | Livre | Europass ou livre |

### Adaptando Seu Curriculo para Portugal

**Dados pessoais:**
- Adicione nacionalidade brasileira
- Use numero de telefone com codigo do pais (+55 ou +351 se em Portugal)
- Inclua NIF portugues se ja tiver
- Foto profissional (recomendada)

**Formacao:**
- Mencione equivalencia de diplomas se tiver
- Universidades brasileiras reconhecidas sao valorizadas (USP, Unicamp, FGV)
- Inclua nivel EQF se souber

**Idiomas (formato CEFR):**
- Portugues: C2 (nativo)
- Ingles: B2 (intermediario avancado) / C1 (avancado)
- Espanhol: B1 (intermediario)
- Use autoavaliacao nas 5 competencias: compreensao oral, leitura, interacao oral, producao oral, escrita

### O Formato Europass

Acesse europa.eu/europass para criar gratuitamente:
1. Crie conta
2. Preencha perfil
3. Selecione secoes
4. Gere PDF padronizado

**Quando usar Europass:**
- Concursos publicos em Portugal
- Vagas em organizacoes da UE
- Programas de mobilidade europeia
- Quando especificamente solicitado

**Quando usar formato livre:**
- Startups e empresas de tecnologia
- Setor privado em geral
- Quando quer se diferenciar visualmente

### Dicas para Brasileiros em Portugal

1. Adapte vocabulario sem forcar sotaque
2. Destaque experiencia internacional como diferencial
3. Mencione disponibilidade de visto/autorizacao de trabalho
4. Pesquise salarios portugueses (geralmente menores que brasileiros em TI)
5. LinkedIn Portugal e muito ativo — otimize seu perfil

### Documentacao Necessaria

Para trabalhar legalmente em Portugal:
- Visto de trabalho ou CPLP
- NIF (numero fiscal)
- NISS (seguranca social)
- Equivalencia de diploma (se necessario)

Crie seu curriculo no modelo europeu com nosso [criador de curriculo](/pt/resume-builder) — templates compativeis com padroes europeus e brasileiros.
`
  },
];
