import { LocaleBundle } from './types';

const fr: LocaleBundle = {
    localeData: {
        cities: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux'],
        country: 'France',
        nationality: 'French',
        companies: {
            tech: ['TechCorp Solutions', 'InnovaTech SARL', 'CloudWorks France', 'DataLabs Européen', 'AppForge Digital'],
            design: ['Agence DesignHub', 'Studio Créatif Pro', 'Design Pixel Perfect', 'Collectif UX', 'Arts Visuels SARL'],
            marketing: ['Agence GrowthMatrix', 'Brand Elevate SARL', 'Marketing Digital Reach', 'Engage Media France', 'Solutions Impact'],
            finance: ['Conseillers Capital SARL', 'Groupe Financier Sterling', 'Services Comptables Apex', 'Investissements Partners', 'Solutions Fiscales'],
            healthcare: ['Hôpital Général Metro', 'Centre de Santé Communautaire', 'Groupe Médical CarePlus', 'Clinique Bien-être', 'Centre Médical Régional'],
            education: ['Lycée Lincoln', 'Académie Riverside', 'Université d\'État', 'Centre de Formation Supérieure', 'Centre d\'Excellence Éducative'],
            sales: ['Enterprise Solutions SARL', 'Partenaires Commerciaux Globaux', 'TechSales Pro', 'Développement Commercial SARL', 'Groupe Premier Ventes'],
            hospitality: ['Restaurant Grand Hôtel', 'Bistro Élégance', 'Riverside Grill & Bar', 'Gastronomie Downtown', 'Cuisine Côtière'],
            general: ['Corporation Acme', 'Entreprises Globales', 'Solutions Premier SARL', 'Industries Innovantes', 'Partenaires d\'Excellence'],
        },
        degrees: {
            tech: { degree: 'Licence en Informatique', school: 'Université de Technologie' },
            design: { degree: 'Licence en Arts Graphiques', school: 'École de Design' },
            marketing: { degree: 'Licence en Administration des Affaires - Marketing', school: 'École de Commerce' },
            finance: { degree: 'Licence en Finance', school: 'Faculté d\'Économie' },
            healthcare: { degree: 'Licence en Sciences Infirmières', school: 'Faculté des Sciences de la Santé' },
            education: { degree: 'Licence en Éducation', school: 'Faculté d\'Éducation' },
            sales: { degree: 'Licence en Administration des Affaires', school: 'École de Commerce' },
            hospitality: { degree: 'Certificat en Gestion Hôtelière', school: 'Institut Culinaire' },
            general: { degree: 'Licence en Arts', school: 'Université d\'État' },
        },
        educationDescription: 'Diplômé avec mention. Membre actif d\'associations professionnelles.',
        yearsText: (years) => years === 1 ? '1 an' : `${years}+ ans`,
    },
    summaryTemplates: {
        tech: {
            entry: '{jobTitle} motivé(e) avec {years} d\'expérience pratique en développement logiciel. Passionné(e) par l\'écriture de code propre et efficace.',
            mid: '{jobTitle} axé(e) sur les résultats avec {years} d\'expérience dans la création d\'applications évolutives. Amélioration des performances système de 40%.',
            senior: '{jobTitle} expérimenté(e) avec {years} d\'expertise en architecture de solutions d\'entreprise. A dirigé des équipes de plus de 5 développeurs.',
            executive: 'Leader technologique stratégique avec {years} d\'expérience dans la transformation numérique. Gestion de budgets de plus de 2M$.',
        },
        design: {
            entry: '{jobTitle} créatif(ve) avec {years} d\'expérience en conception centrée utilisateur. Maîtrise des outils de design modernes.',
            mid: '{jobTitle} innovant(e) avec {years} d\'expérience en création d\'expériences digitales. Augmentation de l\'engagement utilisateur de 35%.',
            senior: '{jobTitle} senior avec {years} d\'expérience en direction d\'équipes de design. Systèmes de design adoptés sur plus de 10 produits.',
            executive: 'Directeur design avec {years} d\'expérience dans la construction d\'organisations de design. Économies de coûts de plus de 5M$.',
        },
        marketing: {
            entry: '{jobTitle} enthousiaste avec {years} d\'expérience en marketing digital. Compétences en création de contenu et gestion des réseaux sociaux.',
            mid: '{jobTitle} orienté(e) données avec {years} d\'expérience en exécution de campagnes. Augmentation du trafic organique de 150%.',
            senior: '{jobTitle} stratégique avec {years} d\'expérience en direction d\'équipes marketing. Gestion de budgets de plus de 1M$.',
            executive: 'Directeur marketing avec {years} d\'expérience en croissance des revenus. Gestion d\'équipes mondiales et budgets de plus de 10M$.',
        },
        finance: {
            entry: '{jobTitle} rigoureux(se) avec {years} d\'expérience en analyse financière. Solide base en principes comptables.',
            mid: '{jobTitle} analytique avec {years} d\'expérience en planification financière. Économies annuelles de plus de 500K$.',
            senior: '{jobTitle} senior avec {years} d\'expérience en direction des opérations financières. Gestion de portefeuilles de plus de 50M$.',
            executive: 'Directeur financier avec {years} d\'expérience en stratégie financière. Transactions M&A de plus de 100M$.',
        },
        healthcare: {
            entry: '{jobTitle} compatissant(e) avec {years} d\'expérience clinique en soins centrés sur le patient.',
            mid: '{jobTitle} dévoué(e) avec {years} d\'expérience en soins de haute qualité. Amélioration de la satisfaction patient de 30%.',
            senior: '{jobTitle} expérimenté(e) avec {years} d\'expertise clinique et leadership. Réduction des réadmissions de 20%.',
            executive: 'Directeur santé avec {years} d\'expérience en transformation des opérations cliniques. Direction de départements de plus de 50 personnes.',
        },
        education: {
            entry: '{jobTitle} passionné(e) avec {years} d\'expérience en enseignement. Engagement pour la réussite des étudiants.',
            mid: '{jobTitle} innovant(e) avec {years} d\'expérience en développement de programmes. Amélioration des résultats de 25%.',
            senior: '{jobTitle} expérimenté(e) avec {years} d\'expérience en formation éducative. Programmes primés adoptés dans tout le district.',
            executive: 'Leader éducatif avec {years} d\'expérience en excellence institutionnelle. Subventions de plus de 2M$.',
        },
        sales: {
            entry: '{jobTitle} motivé(e) avec {years} d\'expérience en développement commercial. Excellentes compétences en communication.',
            mid: '{jobTitle} orienté(e) résultats avec {years} d\'expérience dépassant les quotas. Plus de 2M$ de nouveaux revenus.',
            senior: '{jobTitle} performant(e) avec {years} d\'expérience en direction d\'équipes commerciales. Territoires générant plus de 10M$ annuellement.',
            executive: 'Directeur commercial avec {years} d\'expérience en développement d\'organisations de vente. Croissance de 5M$ à 50M$.',
        },
        hospitality: {
            entry: '{jobTitle} amical(e) et dynamique avec {years} d\'expérience en restauration. Engagement pour un service client exceptionnel.',
            mid: '{jobTitle} dévoué(e) avec {years} d\'expérience en service de haute qualité. Taux de satisfaction de 98%.',
            senior: '{jobTitle} expérimenté(e) avec {years} d\'expertise en gastronomie. Formation de plus de 15 membres du personnel.',
            executive: 'Professionnel de l\'hôtellerie avec {years} d\'expérience en gestion de restaurant. Augmentation des revenus de 40%.',
        },
        general: {
            entry: '{jobTitle} motivé(e) avec {years} d\'expérience professionnelle. Forte éthique de travail et excellentes compétences en communication.',
            mid: '{jobTitle} accompli(e) avec {years} d\'expérience en excellence opérationnelle. Amélioration de l\'efficacité de 30%.',
            senior: '{jobTitle} expérimenté(e) avec {years} d\'expérience en direction d\'équipes. Gestion de projets jusqu\'à 1M$.',
            executive: 'Leader exécutif avec {years} d\'expérience en transformation organisationnelle. Direction d\'équipes de plus de 50 personnes.',
        },
    },
    jobDescriptions: {
        tech: [
            [
                '• Direction du développement d\'architecture microservices, améliorant la scalabilité de 300%',
                '• Mise en place de pipelines CI/CD réduisant le temps de déploiement de 2h à 15 minutes',
                '• Mentorat d\'une équipe de 5 développeurs juniors, revues de code et formation technique',
                '• Collaboration avec les chefs de produit pour définir les exigences techniques',
                '• Réduction du temps de chargement de 40% par optimisation des performances',
            ],
            [
                '• Développement d\'APIs RESTful servant plus d\'1M de requêtes quotidiennes avec 99.9% de disponibilité',
                '• Construction d\'applications web responsives avec React et TypeScript',
                '• Intégration de services tiers et passerelles de paiement',
                '• Participation aux cérémonies agiles et planification de sprints',
            ],
            [
                '• Contribution à la maintenance du code et correction de bugs',
                '• Assistance aux développeurs seniors pour l\'implémentation de fonctionnalités',
                '• Écriture de tests unitaires améliorant la couverture de 25%',
            ],
        ],
        design: [
            [
                '• Direction d\'une équipe de 5 designers pour créer des produits centrés utilisateur',
                '• Établissement d\'un système de design utilisé sur plus de 10 projets',
                '• Augmentation de l\'engagement utilisateur de 40% par améliorations UX',
                '• Recherche utilisateur et tests d\'utilisabilité avec plus de 100 participants',
                '• Présentation de concepts design aux parties prenantes et intégration des retours',
            ],
            [
                '• Conception d\'applications mobiles et web pour iOS et Android',
                '• Création de wireframes, prototypes et maquettes haute fidélité',
                '• Collaboration avec les développeurs pour assurer la précision de l\'implémentation',
                '• Amélioration des taux de conversion de 35% par tests A/B',
            ],
            [
                '• Assistance à la création de designs visuels pour campagnes marketing',
                '• Maintien de la cohérence de marque sur tous les livrables',
                '• Support aux designers seniors pour la création d\'assets',
            ],
        ],
        marketing: [
            [
                '• Développement et exécution de stratégies marketing avec ROI de 200%',
                '• Gestion d\'un budget marketing annuel de plus de 500K$ sur les canaux digitaux',
                '• Direction d\'une équipe de 4 marketeurs en planification de campagnes',
                '• Augmentation du trafic organique de 150% par optimisation SEO',
                '• Construction de partenariats avec influenceurs touchant 2M+ d\'audience',
            ],
            [
                '• Création de stratégie de contenu générant plus de 100K visiteurs mensuels',
                '• Gestion des comptes réseaux sociaux avec croissance de 300% des abonnés',
                '• Exécution de campagnes email avec 35% de taux d\'ouverture et 15% CTR',
                '• Analyse des performances et optimisation basée sur les données',
            ],
            [
                '• Assistance à la création et programmation de contenu social',
                '• Support à l\'équipe pour recherche de marché et analyse concurrentielle',
                '• Aide à l\'organisation d\'événements marketing et webinaires',
            ],
        ],
        finance: [
            [
                '• Gestion de la planification financière pour une unité de plus de 50M$',
                '• Direction du processus budgétaire annuel et prévisions trimestrielles',
                '• Identification d\'opportunités d\'économies de plus d\'1M$',
                '• Présentation de rapports financiers à la direction exécutive',
                '• Supervision d\'une équipe de 3 analystes et coordination des audits',
            ],
            [
                '• Préparation des états financiers mensuels et analyse des écarts',
                '• Développement de modèles financiers pour la planification',
                '• Optimisation des processus de reporting réduisant le temps de clôture de 30%',
                '• Support due diligence et intégration M&A',
            ],
            [
                '• Assistance au traitement des comptes fournisseurs et clients',
                '• Rapprochement des relevés bancaires et comptes du grand livre',
                '• Support aux comptables seniors pour la clôture mensuelle',
            ],
        ],
        healthcare: [
            [
                '• Supervision du personnel infirmier de 15+ personnes pour les soins aux patients',
                '• Mise en œuvre d\'initiatives qualité réduisant les erreurs de 40%',
                '• Coordination des plans de soins avec l\'équipe interdisciplinaire',
                '• Maintien de la conformité HIPAA et exigences réglementaires',
                '• Formation du nouveau personnel aux protocoles et bonnes pratiques',
            ],
            [
                '• Soins directs aux patients pour plus de 10 patients quotidiens',
                '• Administration de médicaments et surveillance des conditions',
                '• Documentation précise des informations patients dans les systèmes EMR',
                '• Collaboration avec les médecins sur les plans de traitement',
            ],
            [
                '• Assistance à l\'admission des patients et surveillance des signes vitaux',
                '• Support au personnel infirmier pour les activités de soins quotidiens',
                '• Maintien d\'environnements patients propres et organisés',
            ],
        ],
        education: [
            [
                '• Développement d\'un programme adopté dans tout le district pour 5000+ élèves',
                '• Mentorat de 10+ enseignants pour l\'implémentation de nouvelles stratégies',
                '• Amélioration des résultats des élèves de 25% sur 3 ans',
                '• Animation d\'ateliers de développement professionnel et formations',
                '• Obtention de plus de 100K$ de subventions pour programmes éducatifs',
            ],
            [
                '• Enseignement à des classes de 25+ élèves de plusieurs niveaux',
                '• Création de plans de cours engageants alignés sur les standards',
                '• Mise en œuvre d\'instruction différenciée pour apprenants divers',
                '• Communication régulière avec les parents sur le progrès des élèves',
            ],
            [
                '• Assistance aux enseignants principaux pour l\'instruction en classe',
                '• Support aux élèves avec tutorat individuel et en petit groupe',
                '• Aide au maintien de l\'organisation de la classe et du matériel',
            ],
        ],
        sales: [
            [
                '• Dépassement du quota annuel de 150%, générant plus de 5M$ de revenus',
                '• Construction et gestion d\'une équipe de 8 commerciaux',
                '• Développement de plans de compte stratégiques pour clients entreprise',
                '• Négociation de contrats de plus de 500K$ avec dirigeants C-level',
                '• Implémentation de processus CRM améliorant la précision des prévisions de 40%',
            ],
            [
                '• Atteinte de 120% du quota pendant 8 trimestres consécutifs',
                '• Gestion d\'un pipeline de 50+ opportunités valant plus de 2M$',
                '• Réalisation de démonstrations produits et présentations',
                '• Maintien d\'un taux de rétention client de 95%',
            ],
            [
                '• Génération de leads par prospection et networking',
                '• Assistance aux commerciaux seniors pour les réunions clients',
                '• Maintien de registres précis dans le système CRM',
            ],
        ],
        hospitality: [
            [
                '• Supervision d\'une équipe de 10+ serveurs assurant une qualité de service constante',
                '• Formation du nouveau personnel sur le menu, systèmes POS et standards',
                '• Résolution professionnelle des plaintes, maintenant 95% de satisfaction',
                '• Coordination avec la cuisine pour une livraison rapide des plats',
                '• Gestion de section de 8+ tables aux heures de pointe, 100+ clients/jour',
            ],
            [
                '• Service de table excellent dans un restaurant de 200 places',
                '• Augmentation du ticket moyen de 20% par upselling efficace',
                '• Mémorisation du menu complet incluant spécialités et accords vins',
                '• Traitement précis des paiements, plus de 500$ de transactions/jour',
            ],
            [
                '• Accueil et placement des clients assurant une première impression positive',
                '• Prise de commandes précise via système POS',
                '• Maintien de la salle propre et organisée pendant le service',
            ],
        ],
        general: [
            [
                '• Direction d\'équipe transversale de 10+ membres sur initiatives stratégiques',
                '• Gestion de projets avec budgets jusqu\'à 500K$ livrés dans les délais',
                '• Amélioration de l\'efficacité opérationnelle de 30% par optimisation',
                '• Développement et mise en œuvre de politiques et procédures',
                '• Présentation de rapports trimestriels à la direction senior',
            ],
            [
                '• Coordination des opérations quotidiennes et gestion des flux',
                '• Collaboration avec les parties prenantes pour respecter les délais',
                '• Analyse de données pour identifier tendances et opportunités',
                '• Formation des nouveaux membres sur les processus et systèmes',
            ],
            [
                '• Support à l\'équipe pour tâches administratives et opérationnelles',
                '• Assistance à la saisie de données et préparation de rapports',
                '• Aide à l\'organisation des réunions d\'équipe et événements',
            ],
        ],
    },
    masterDegree: { tech: 'Master en Informatique', business: 'Master en Administration des Affaires', school: 'École de Commerce' },
    phoneFormat: '+33 6 00 00 00 00',
    titlePrefixes: { senior: 'Senior', lead: 'Responsable', director: 'Directeur' },
};

export default fr;
