import { selectContent } from './types';

export interface ChatGPTComparisonContent {
  meta: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
  };
  schemas: {
    breadcrumbName: string;
    articleHeadline: string;
    articleDescription: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  problem: {
    title: string;
    description: string;
    stats: { value: string; label: string }[];
  };
  comparison: {
    title: string;
    subtitle: string;
    colFeature: string;
    colChatgpt: string;
    colBestAi: string;
    rows: {
      feature: string;
      chatgpt: string;
      best: string;
      chatgptIcon: 'yes' | 'no' | 'partial';
      bestIcon: 'yes' | 'no' | 'partial';
    }[];
  };
  strengths: {
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  shortcomings: {
    title: string;
    items: { title: string; description: string }[];
  };
  bestApproach: {
    title: string;
    description: string;
    steps: { title: string; description: string }[];
  };
  whoShouldUse: {
    title: string;
    useChatGPT: { title: string; items: string[] };
    useBestAI: { title: string; items: string[] };
    bottomLine: string;
  };
  resumeExamples: {
    title: string;
    description: string;
    ctaBrowse: string;
    ctaTemplates: string;
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  crossLinks: {
    compareTitle: string;
    links: { title: string; subtitle: string }[];
    guidesTitle: string;
    guides: { label: string }[];
  };
  externalResources: {
    title: string;
    items: { href: string; label: string }[];
  };
  bottomCta: {
    title: string;
    description: string;
    ctaText: string;
    subtext: string;
  };
}

const en: ChatGPTComparisonContent = {
  meta: {
    title: "ChatGPT vs AI Resume Builder: Which Creates Better Resumes? (2026) | Best AI Resume",
    description: "Should you use ChatGPT or a dedicated AI resume builder to write your resume? Compare formatting, ATS compatibility, and output quality. See which tool gets more interviews.",
    keywords: "chatgpt resume, chatgpt resume builder, ai resume builder, chatgpt vs resume builder, write resume with chatgpt, ai resume writer",
    ogTitle: "ChatGPT vs AI Resume Builder: Which Creates Better Resumes? (2026)",
    ogDescription: "Compare using ChatGPT vs a dedicated AI resume builder. Feature-by-feature comparison with honest pros and cons.",
    twitterTitle: "ChatGPT vs AI Resume Builder: Which Creates Better Resumes?",
    twitterDescription: "Compare using ChatGPT vs a dedicated AI resume builder for creating job-winning resumes."
  },
  schemas: {
    breadcrumbName: "ChatGPT vs AI Resume Builder",
    articleHeadline: "ChatGPT vs AI Resume Builder: Which Makes Better Resumes in 2026?",
    articleDescription: "Compare using ChatGPT vs a dedicated AI resume builder for creating job-winning resumes. Feature-by-feature comparison with honest pros and cons."
  },
  hero: {
    badge: "Comparison",
    title: "ChatGPT vs AI Resume Builder:",
    titleHighlight: "Which Gets You Hired?",
    subtitle: "ChatGPT can write text. A resume builder creates <strong>interview-ready documents</strong>. Here's why that difference matters for your job search.",
    ctaPrimary: "Build My Resume Free",
    ctaSecondary: "See the Comparison"
  },
  problem: {
    title: "The Problem: ChatGPT Writes Text, Not Resumes",
    description: "ChatGPT is a general-purpose AI that generates text. It can write resume bullet points, summaries, and cover letters — but it <strong>cannot format a document, ensure ATS compatibility, or export a PDF</strong>. You get raw text that you still need to design, format, and optimize yourself.",
    stats: [
      { value: "0", label: "Templates included — ChatGPT outputs plain text only" },
      { value: "0%", label: "ATS awareness — no keyword scoring or format checking" },
      { value: "3+", label: "Extra tools needed — template, formatter, PDF converter" }
    ]
  },
  comparison: {
    title: "ChatGPT vs Best AI Resume Builder",
    subtitle: "An honest, feature-by-feature comparison for job seekers.",
    colFeature: "Feature",
    colChatgpt: "ChatGPT",
    colBestAi: "Best AI Resumes",
    rows: [
      {
        feature: "AI Content Writing",
        chatgpt: "Strong general text generation",
        best: "Resume-specific AI with industry keywords",
        chatgptIcon: "yes",
        bestIcon: "yes"
      },
      {
        feature: "Professional Templates",
        chatgpt: "No templates — text only",
        best: "20+ ATS-tested templates",
        chatgptIcon: "no",
        bestIcon: "yes"
      },
      {
        feature: "ATS Optimization",
        chatgpt: "No ATS awareness",
        best: "Real-time ATS score and keyword matching",
        chatgptIcon: "no",
        bestIcon: "yes"
      },
      {
        feature: "PDF Export",
        chatgpt: "No document export",
        best: "One-click clean PDF export",
        chatgptIcon: "no",
        bestIcon: "yes"
      },
      {
        feature: "Formatting and Design",
        chatgpt: "Plain text output only",
        best: "Professional formatting built-in",
        chatgptIcon: "no",
        bestIcon: "yes"
      },
      {
        feature: "Job Description Matching",
        chatgpt: "Manual — paste JD into prompt",
        best: "Automatic keyword extraction and matching",
        chatgptIcon: "partial",
        bestIcon: "yes"
      },
      {
        feature: "Section Structure",
        chatgpt: "You define the structure in prompts",
        best: "Guided section-by-section flow",
        chatgptIcon: "partial",
        bestIcon: "yes"
      },
      {
        feature: "Consistency",
        chatgpt: "Output varies by prompt quality",
        best: "Consistent, tested output every time",
        chatgptIcon: "partial",
        bestIcon: "yes"
      },
      {
        feature: "Content Personalization",
        chatgpt: "Requires detailed prompting",
        best: "Pulls from your entered experience",
        chatgptIcon: "partial",
        bestIcon: "yes"
      },
      {
        feature: "Price",
        chatgpt: "Free (GPT-3.5) or $20/mo (GPT-4)",
        best: "Free tier available",
        chatgptIcon: "yes",
        bestIcon: "yes"
      },
      {
        feature: "Learning Curve",
        chatgpt: "Prompt engineering required",
        best: "Fill-in-the-blank simplicity",
        chatgptIcon: "partial",
        bestIcon: "yes"
      },
      {
        feature: "Multiple Resumes",
        chatgpt: "Start from scratch each time",
        best: "Save and edit multiple versions",
        chatgptIcon: "partial",
        bestIcon: "yes"
      }
    ]
  },
  strengths: {
    title: "What ChatGPT Does Well for Resumes",
    subtitle: "To be fair, ChatGPT has real strengths. Here's where it genuinely helps with resume writing:",
    items: [
      {
        title: "Brainstorming Bullet Points",
        description: "ChatGPT excels at generating multiple versions of achievement-focused bullet points from a job description. Great for overcoming writer's block."
      },
      {
        title: "Rewriting Weak Content",
        description: "Paste a duty-based bullet point and ask ChatGPT to rewrite it as an achievement. It's good at transforming \"responsible for\" into action verbs with metrics."
      },
      {
        title: "Industry Keyword Research",
        description: "Ask ChatGPT to identify key skills and keywords for a specific role. It provides solid keyword lists that help with ATS matching."
      },
      {
        title: "Cover Letter Drafts",
        description: "ChatGPT writes reasonable first drafts of cover letters. You'll need to personalize them, but it's a solid starting point."
      }
    ]
  },
  shortcomings: {
    title: "Where ChatGPT Falls Short",
    items: [
      {
        title: "No Formatting or Templates",
        description: "ChatGPT outputs plain text. You need a separate tool (Google Docs, Word, Canva, or a resume builder) to format it into a professional document. This adds time and introduces formatting errors."
      },
      {
        title: "No ATS Awareness",
        description: "ChatGPT does not know which keywords an ATS is scanning for, what section headers it expects, or what format it can parse. It generates text without any awareness of automated screening systems."
      },
      {
        title: "Generic Output Without Your Data",
        description: "Unless you provide extremely detailed prompts with your specific metrics and achievements, ChatGPT generates generic content. \"Managed a team of professionals\" instead of \"Led a 12-person engineering team that shipped 3 products ahead of schedule.\""
      },
      {
        title: "Inconsistent Quality",
        description: "ChatGPT's output quality depends entirely on your prompt. Small changes in wording produce very different results. A dedicated resume builder produces consistent, tested output every time."
      },
      {
        title: "No PDF Export",
        description: "You cannot send a ChatGPT conversation to a recruiter. You need to copy the text, paste it into a template, adjust the formatting, and export as PDF — a process that takes 30+ minutes."
      }
    ]
  },
  bestApproach: {
    title: "The Best Approach: Use Both",
    description: "Here's the optimal workflow for using AI to create a resume in 2026:",
    steps: [
      {
        title: "Use ChatGPT for brainstorming",
        description: "Ask it to generate bullet point ideas, rewrite weak content, and identify industry keywords for your target role."
      },
      {
        title: "Build your resume in a dedicated builder",
        description: "Use Best AI Resume Builder to format your content into a professional, ATS-optimized template with proper structure and keyword matching."
      },
      {
        title: "Personalize with your real data",
        description: "Replace generic AI text with your actual metrics, achievements, and company names. No AI tool can know your specific accomplishments — you add that."
      },
      {
        title: "Export and apply",
        description: "Download your ATS-optimized PDF and apply directly. No copy-pasting, no formatting struggles, no extra tools needed."
      }
    ]
  },
  whoShouldUse: {
    title: "Honest Recommendation: Who Should Use What?",
    useChatGPT: {
      title: "Use ChatGPT if you...",
      items: [
        "Already have a well-formatted resume template",
        "Just need help brainstorming bullet point ideas",
        "Are comfortable with document formatting",
        "Want to research industry keywords and trends"
      ]
    },
    useBestAI: {
      title: "Use Best AI Resumes if you...",
      items: [
        "Want a complete, job-ready resume from one tool",
        "Need ATS-optimized formatting and keyword scoring",
        "Do not want to deal with templates and formatting",
        "Want to save and edit multiple resume versions",
        "Need one-click PDF export ready to send"
      ]
    },
    bottomLine: "The bottom line: ChatGPT is a great writing assistant, but it is not a resume builder. For a complete, ATS-ready resume, you need a purpose-built tool."
  },
  resumeExamples: {
    title: "See What AI-Built Resumes Look Like",
    description: "Browse 300+ real resume examples for every profession — all built with ATS-optimized AI that goes beyond what ChatGPT alone can produce.",
    ctaBrowse: "Browse Resume Examples",
    ctaTemplates: "View All Templates"
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Can ChatGPT write a good resume?",
        answer: "ChatGPT can generate resume text (bullet points, summaries, objectives), but it cannot format a resume, ensure ATS compatibility, or output a downloadable PDF. You still need a separate tool to format and design the document. A dedicated AI resume builder handles writing AND formatting in one step."
      },
      {
        question: "Is it okay to use AI to write a resume?",
        answer: "Yes. AI-assisted resume writing is widely accepted in 2026. Hiring managers care about the quality of your resume content, not how it was created. The key is to personalize AI-generated content with your real achievements, metrics, and experiences — never submit generic AI output without customization."
      },
      {
        question: "What are the disadvantages of using ChatGPT for resumes?",
        answer: "ChatGPT produces plain text without formatting, has no ATS awareness, cannot score your resume against job descriptions, produces generic content without your specific metrics, and requires you to manually copy-paste into a template. It also has no resume-specific training — it treats resume writing like any other text task."
      },
      {
        question: "Do ATS systems reject ChatGPT resumes?",
        answer: "ATS systems do not detect or care about AI-written content. However, if you paste ChatGPT text into a poorly formatted template (like a Canva graphic or Word table), the ATS may fail to parse it. A dedicated resume builder ensures both the content AND format are ATS-compatible."
      },
      {
        question: "Is Best AI Resume Builder better than ChatGPT for resumes?",
        answer: "For the specific task of creating a job-ready resume, yes. Best AI Resume Builder combines AI writing with professional formatting, ATS optimization, keyword matching, and PDF export in one tool. ChatGPT is a general-purpose AI — it can write text but cannot format, score, or export a resume."
      }
    ]
  },
  crossLinks: {
    compareTitle: "Compare Other Resume Builders",
    links: [
      { title: "Canva Alternative", subtitle: "Design tool vs resume builder" },
      { title: "Overleaf Alternative", subtitle: "LaTeX vs AI builder" },
      { title: "Resume.io Alternative", subtitle: "Pricing and features compared" },
      { title: "Rezi Alternative", subtitle: "AI tools compared" }
    ],
    guidesTitle: "Helpful Resume Guides",
    guides: [
      { label: "What Is an ATS? Complete Guide" },
      { label: "How to Write a Resume (Step-by-Step)" },
      { label: "ChatGPT vs Claude for Resumes" },
      { label: "How to Write a Professional Summary" }
    ]
  },
  externalResources: {
    title: "External Resources",
    items: [
      { href: "https://openai.com/chatgpt", label: "ChatGPT by OpenAI" },
      { href: "https://www.bls.gov/careeroutlook/2024/article/resume-tips.htm", label: "BLS Career Outlook: Resume Tips" }
    ]
  },
  bottomCta: {
    title: "Ready to Go Beyond ChatGPT?",
    description: "Create a complete, ATS-optimized resume with our AI resume builder — writing, formatting, and PDF export in one tool.",
    ctaText: "Build My Resume Free — No Sign Up",
    subtext: "Free forever. No credit card required."
  }
};

const es: ChatGPTComparisonContent = {
  meta: {
    title: "ChatGPT Curriculum Vitae vs IA: ¿Cuál crear mejor CV? (2026)",
    description: "¿Usar ChatGPT o un creador de CV con IA dedicado? Compara formato, compatibilidad ATS y calidad. Ve cuál herramienta consigue más entrevistas de trabajo.",
    keywords: "chatgpt curriculum vitae, crear cv con ia, chatgpt para hacer curriculum, ia para curriculum, mejor creador de curriculum con ia",
    ogTitle: "ChatGPT Curriculum Vitae vs Creador IA: ¿Cuál es mejor? (2026)",
    ogDescription: "Comparación entre usar ChatGPT vs un creador de CV con IA. Análisis completo con ventajas y desventajas reales.",
    twitterTitle: "ChatGPT vs Creador de CV con IA: ¿Cuál es mejor?",
    twitterDescription: "Compara ChatGPT vs creador de CV con IA para crear currículums que consigan entrevistas."
  },
  schemas: {
    breadcrumbName: "ChatGPT vs Creador de CV con IA",
    articleHeadline: "ChatGPT Curriculum Vitae vs Creador IA: ¿Cuál crea mejor CV en 2026?",
    articleDescription: "Comparación entre usar ChatGPT vs un creador de CV con IA dedicado. Análisis detallado con ventajas y desventajas reales para buscar empleo."
  },
  hero: {
    badge: "Comparación",
    title: "ChatGPT vs Creador de CV con IA:",
    titleHighlight: "¿Cuál te consigue trabajo?",
    subtitle: "ChatGPT escribe texto. Un creador de CV produce <strong>documentos listos para entrevistas</strong>. Esta diferencia es crucial para tu búsqueda de empleo.",
    ctaPrimary: "Crear Mi CV Gratis",
    ctaSecondary: "Ver la Comparación"
  },
  problem: {
    title: "El Problema: ChatGPT escribe texto, no currículums",
    description: "ChatGPT es una IA de propósito general que genera texto. Puede escribir viñetas, resúmenes y cartas de presentación, pero <strong>no formatea documentos, no garantiza compatibilidad ATS, ni exporta PDF</strong>. Obtienes texto sin formato que aún necesitas diseñar, maquetar y optimizar tú mismo.",
    stats: [
      { value: "0", label: "Plantillas incluidas — ChatGPT solo genera texto plano" },
      { value: "0%", label: "Conocimiento ATS — sin análisis de palabras clave ni formato" },
      { value: "3+", label: "Herramientas adicionales — plantilla, formateador, conversor PDF" }
    ]
  },
  comparison: {
    title: "ChatGPT vs Best AI Resume Builder",
    subtitle: "Comparación honesta, función por función, para quienes buscan empleo.",
    colFeature: "Característica",
    colChatgpt: "ChatGPT",
    colBestAi: "Best AI Resumes",
    rows: [
      {
        feature: "Redacción con IA",
        chatgpt: "Generación de texto general potente",
        best: "IA especializada en CV con palabras clave sectoriales",
        chatgptIcon: "yes",
        bestIcon: "yes"
      },
      {
        feature: "Plantillas Profesionales",
        chatgpt: "Sin plantillas — solo texto",
        best: "20+ plantillas probadas para ATS",
        chatgptIcon: "no",
        bestIcon: "yes"
      },
      {
        feature: "Optimización ATS",
        chatgpt: "Sin conocimiento de ATS",
        best: "Puntuación ATS en tiempo real y coincidencia de palabras clave",
        chatgptIcon: "no",
        bestIcon: "yes"
      },
      {
        feature: "Exportación PDF",
        chatgpt: "Sin exportación de documentos",
        best: "Exportación PDF limpia en un clic",
        chatgptIcon: "no",
        bestIcon: "yes"
      },
      {
        feature: "Formato y Diseño",
        chatgpt: "Solo salida de texto plano",
        best: "Formato profesional incorporado",
        chatgptIcon: "no",
        bestIcon: "yes"
      },
      {
        feature: "Adaptación a Oferta de Empleo",
        chatgpt: "Manual — pegar oferta en el prompt",
        best: "Extracción automática de palabras clave y coincidencia",
        chatgptIcon: "partial",
        bestIcon: "yes"
      },
      {
        feature: "Estructura de Secciones",
        chatgpt: "Defines la estructura en los prompts",
        best: "Flujo guiado sección por sección",
        chatgptIcon: "partial",
        bestIcon: "yes"
      },
      {
        feature: "Consistencia",
        chatgpt: "Resultados varían según calidad del prompt",
        best: "Resultados consistentes y probados siempre",
        chatgptIcon: "partial",
        bestIcon: "yes"
      },
      {
        feature: "Personalización de Contenido",
        chatgpt: "Requiere prompts detallados",
        best: "Extrae de tu experiencia ingresada",
        chatgptIcon: "partial",
        bestIcon: "yes"
      },
      {
        feature: "Precio",
        chatgpt: "Gratis (GPT-3.5) o $20/mes (GPT-4)",
        best: "Plan gratuito disponible",
        chatgptIcon: "yes",
        bestIcon: "yes"
      },
      {
        feature: "Curva de Aprendizaje",
        chatgpt: "Requiere ingeniería de prompts",
        best: "Simplicidad de rellenar formulario",
        chatgptIcon: "partial",
        bestIcon: "yes"
      },
      {
        feature: "Múltiples Currículums",
        chatgpt: "Empezar desde cero cada vez",
        best: "Guardar y editar múltiples versiones",
        chatgptIcon: "partial",
        bestIcon: "yes"
      }
    ]
  },
  strengths: {
    title: "En qué es bueno ChatGPT para currículums",
    subtitle: "Para ser justos, ChatGPT tiene fortalezas reales. Aquí donde ayuda genuinamente con la redacción de CV:",
    items: [
      {
        title: "Lluvia de ideas para viñetas",
        description: "ChatGPT destaca generando múltiples versiones de viñetas enfocadas en logros a partir de una descripción de puesto. Excelente para superar el bloqueo del escritor."
      },
      {
        title: "Reescribir contenido débil",
        description: "Pega una viñeta basada en tareas y pide a ChatGPT reescribirla como logro. Es bueno transformando \"responsable de\" en verbos de acción con métricas."
      },
      {
        title: "Investigación de palabras clave del sector",
        description: "Pide a ChatGPT identificar habilidades y palabras clave para un puesto específico. Proporciona listas sólidas que ayudan con la coincidencia ATS."
      },
      {
        title: "Borradores de cartas de presentación",
        description: "ChatGPT escribe primeros borradores razonables de cartas de presentación. Necesitarás personalizarlas, pero es un punto de partida sólido."
      }
    ]
  },
  shortcomings: {
    title: "Donde ChatGPT se queda corto",
    items: [
      {
        title: "Sin formato ni plantillas",
        description: "ChatGPT genera texto plano. Necesitas una herramienta aparte (Google Docs, Word, Canva o un creador de CV) para formatearlo en un documento profesional. Esto añade tiempo e introduce errores de formato."
      },
      {
        title: "Sin conocimiento de ATS",
        description: "ChatGPT no sabe qué palabras clave escanea un ATS, qué encabezados de sección espera, o qué formato puede analizar. Genera texto sin conocimiento de los sistemas de selección automatizados."
      },
      {
        title: "Salida genérica sin tus datos",
        description: "A menos que proporciones prompts extremadamente detallados con tus métricas y logros específicos, ChatGPT genera contenido genérico. \"Gestioné un equipo de profesionales\" en lugar de \"Lideré un equipo de ingeniería de 12 personas que lanzó 3 productos adelantados al cronograma.\""
      },
      {
        title: "Calidad inconsistente",
        description: "La calidad de salida de ChatGPT depende enteramente de tu prompt. Pequeños cambios en la redacción producen resultados muy diferentes. Un creador de CV dedicado produce salida consistente y probada cada vez."
      },
      {
        title: "Sin exportación PDF",
        description: "No puedes enviar una conversación de ChatGPT a un reclutador. Necesitas copiar el texto, pegarlo en una plantilla, ajustar el formato y exportar como PDF — un proceso que toma más de 30 minutos."
      }
    ]
  },
  bestApproach: {
    title: "El mejor enfoque: usar ambos",
    description: "Este es el flujo de trabajo óptimo para usar IA en crear un CV en 2026:",
    steps: [
      {
        title: "Usa ChatGPT para lluvia de ideas",
        description: "Pídele generar ideas de viñetas, reescribir contenido débil e identificar palabras clave del sector para tu puesto objetivo."
      },
      {
        title: "Construye tu CV en un creador dedicado",
        description: "Usa Best AI Resume Builder para formatear tu contenido en una plantilla profesional optimizada para ATS con estructura adecuada y coincidencia de palabras clave."
      },
      {
        title: "Personaliza con tus datos reales",
        description: "Reemplaza el texto genérico de IA con tus métricas reales, logros y nombres de empresas. Ninguna herramienta IA puede conocer tus logros específicos — tú añades eso."
      },
      {
        title: "Exporta y postula",
        description: "Descarga tu PDF optimizado para ATS y postula directamente. Sin copiar-pegar, sin luchas de formato, sin herramientas extra necesarias."
      }
    ]
  },
  whoShouldUse: {
    title: "Recomendación honesta: ¿Quién debería usar qué?",
    useChatGPT: {
      title: "Usa ChatGPT si...",
      items: [
        "Ya tienes una plantilla de CV bien formateada",
        "Solo necesitas ayuda con lluvia de ideas de viñetas",
        "Te sientes cómodo con formato de documentos",
        "Quieres investigar palabras clave y tendencias del sector"
      ]
    },
    useBestAI: {
      title: "Usa Best AI Resumes si...",
      items: [
        "Quieres un CV completo y listo para empleo desde una herramienta",
        "Necesitas formato optimizado para ATS y puntuación de palabras clave",
        "No quieres lidiar con plantillas y formato",
        "Quieres guardar y editar múltiples versiones de CV",
        "Necesitas exportación PDF lista para enviar en un clic"
      ]
    },
    bottomLine: "La conclusión: ChatGPT es un gran asistente de escritura, pero no es un creador de CV. Para un CV completo y listo para ATS, necesitas una herramienta diseñada específicamente."
  },
  resumeExamples: {
    title: "Ve cómo lucen los CV creados con IA",
    description: "Explora más de 300 ejemplos de CV reales para cada profesión — todos construidos con IA optimizada para ATS que va más allá de lo que ChatGPT solo puede producir.",
    ctaBrowse: "Explorar Ejemplos de CV",
    ctaTemplates: "Ver Todas las Plantillas"
  },
  faq: {
    title: "Preguntas Frecuentes",
    items: [
      {
        question: "¿Puede ChatGPT escribir un buen currículum?",
        answer: "ChatGPT puede generar texto de currículum (viñetas, resúmenes, objetivos), pero no puede formatear un currículum, garantizar compatibilidad ATS ni generar un PDF descargable. Aún necesitas una herramienta separada para formatear y diseñar el documento. Un creador de CV con IA dedicado maneja redacción Y formato en un solo paso."
      },
      {
        question: "¿Está bien usar IA para escribir un curriculum vitae?",
        answer: "Sí. La redacción de currículums asistida por IA es ampliamente aceptada en 2026. A los gerentes de contratación les importa la calidad del contenido de tu CV, no cómo se creó. La clave es personalizar el contenido generado por IA con tus logros reales, métricas y experiencias — nunca envíes salida genérica de IA sin personalización."
      },
      {
        question: "¿Cuáles son las desventajas de usar ChatGPT para hacer curriculum?",
        answer: "ChatGPT produce texto plano sin formato, no tiene conocimiento de ATS, no puede puntuar tu CV contra descripciones de empleo, produce contenido genérico sin tus métricas específicas, y requiere que copies-pegues manualmente en una plantilla. Tampoco tiene entrenamiento específico en CV — trata la redacción de currículums como cualquier otra tarea de texto."
      },
      {
        question: "¿Los sistemas ATS rechazan currículums de ChatGPT?",
        answer: "Los sistemas ATS no detectan ni les importa el contenido escrito por IA. Sin embargo, si pegas texto de ChatGPT en una plantilla mal formateada (como un gráfico de Canva o tabla de Word), el ATS puede fallar al analizarlo. Un creador de CV dedicado asegura que tanto el contenido COMO el formato sean compatibles con ATS."
      },
      {
        question: "¿Es Best AI Resume Builder mejor que ChatGPT para crear CV con IA?",
        answer: "Para la tarea específica de crear un CV listo para empleo, sí. Best AI Resume Builder combina redacción con IA con formato profesional, optimización ATS, coincidencia de palabras clave y exportación PDF en una herramienta. ChatGPT es una IA de propósito general — puede escribir texto pero no puede formatear, puntuar ni exportar un currículum."
      }
    ]
  },
  crossLinks: {
    compareTitle: "Compara Otros Creadores de CV",
    links: [
      { title: "Alternativa a Canva", subtitle: "Herramienta de diseño vs creador de CV" },
      { title: "Alternativa a Overleaf", subtitle: "LaTeX vs creador con IA" },
      { title: "Alternativa a Resume.io", subtitle: "Comparación de precios y características" },
      { title: "Alternativa a Rezi", subtitle: "Herramientas IA comparadas" }
    ],
    guidesTitle: "Guías Útiles de Currículum",
    guides: [
      { label: "¿Qué es un ATS? Guía Completa" },
      { label: "Cómo Escribir un Currículum (Paso a Paso)" },
      { label: "ChatGPT vs Claude para Currículums" },
      { label: "Cómo Escribir un Resumen Profesional" }
    ]
  },
  externalResources: {
    title: "Recursos Externos",
    items: [
      { href: "https://openai.com/chatgpt", label: "ChatGPT de OpenAI" },
      { href: "https://www.bls.gov/careeroutlook/2024/article/resume-tips.htm", label: "BLS Career Outlook: Consejos de CV" }
    ]
  },
  bottomCta: {
    title: "¿Listo para ir más allá de ChatGPT?",
    description: "Crea un currículum completo y optimizado para ATS con nuestro creador de CV con IA — redacción, formato y exportación PDF en una herramienta.",
    ctaText: "Crear Mi CV Gratis — Sin Registro",
    subtext: "Gratis para siempre. Sin tarjeta de crédito requerida."
  }
};

const content: Record<string, ChatGPTComparisonContent> = { en, es };

export const getContent = (locale: string): ChatGPTComparisonContent =>
  selectContent(content, locale);
