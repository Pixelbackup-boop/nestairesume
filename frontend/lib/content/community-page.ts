import { selectContent } from './types';

export interface CommunityContent {
  title: string;
  subtitle: string;
  categories: { value: string; label: string }[];
  browseTab: string;
  myTemplatesTab: string;
  templatesAvailable: string;
  templateAvailable: string;
  createYourOwn: string;
  errorMessage: string;
  tryAgain: string;
  noTemplatesTitle: string;
  noTemplatesSub: string;
  createTemplate: string;
  pageOf: string;
  templatesPosted: string;
  templatePosted: string;
  createNewTemplate: string;
  noPostedTitle: string;
  noPostedSub: string;
  publicLabel: string;
  privateLabel: string;
  noPreview: string;
  downloads: string;
  download: string;
  signInTitle: string;
  signInSub: string;
  signIn: string;
  deleteConfirm: string;
  deleteError: string;
  visibilityError: string;
  makePrivate: string;
  makePublic: string;
  edit: string;
  deleteBtn: string;
}

const en: CommunityContent = {
  title: 'Community Templates',
  subtitle: 'Browse and use templates shared by the community',
  categories: [
    { value: '', label: 'All' },
    { value: 'professional', label: 'Professional' },
    { value: 'creative', label: 'Creative' },
    { value: 'ats', label: 'ATS-Friendly' },
    { value: 'bold', label: 'Bold' },
  ],
  browseTab: 'Browse Templates',
  myTemplatesTab: 'My Templates',
  templatesAvailable: '{count} templates available',
  templateAvailable: '{count} template available',
  createYourOwn: 'Create your own \u2192',
  errorMessage: 'Failed to load templates. Please try again.',
  tryAgain: 'Try Again',
  noTemplatesTitle: 'No templates yet',
  noTemplatesSub: 'Be the first to share a template with the community!',
  createTemplate: 'Create Template',
  pageOf: 'Page {page} of {total}',
  templatesPosted: '{count} templates posted',
  templatePosted: '{count} template posted',
  createNewTemplate: 'Create new template \u2192',
  noPostedTitle: 'No templates posted yet',
  noPostedSub: 'Create a design in the canvas editor and share it with the community!',
  publicLabel: 'Public',
  privateLabel: 'Private',
  noPreview: 'No preview',
  downloads: 'downloads',
  download: 'download',
  signInTitle: 'Sign in to view your templates',
  signInSub: 'You need to be signed in to see and manage your posted templates.',
  signIn: 'Sign In',
  deleteConfirm: 'Are you sure you want to delete this template? This cannot be undone.',
  deleteError: 'Failed to delete template. Please try again.',
  visibilityError: 'Failed to update visibility. Please try again.',
  makePrivate: 'Make private',
  makePublic: 'Make public',
  edit: 'Edit',
  deleteBtn: 'Delete',
};

const es: CommunityContent = {
  title: 'Plantillas de la Comunidad',
  subtitle: 'Explora y usa plantillas compartidas por la comunidad',
  categories: [
    { value: '', label: 'Todas' },
    { value: 'professional', label: 'Profesional' },
    { value: 'creative', label: 'Creativa' },
    { value: 'ats', label: 'Compatible con ATS' },
    { value: 'bold', label: 'Audaz' },
  ],
  browseTab: 'Explorar Plantillas',
  myTemplatesTab: 'Mis Plantillas',
  templatesAvailable: '{count} plantillas disponibles',
  templateAvailable: '{count} plantilla disponible',
  createYourOwn: 'Crea la tuya \u2192',
  errorMessage: 'Error al cargar las plantillas. Int\u00e9ntalo de nuevo.',
  tryAgain: 'Intentar de Nuevo',
  noTemplatesTitle: 'A\u00fan no hay plantillas',
  noTemplatesSub: '\u00a1S\u00e9 el primero en compartir una plantilla con la comunidad!',
  createTemplate: 'Crear Plantilla',
  pageOf: 'P\u00e1gina {page} de {total}',
  templatesPosted: '{count} plantillas publicadas',
  templatePosted: '{count} plantilla publicada',
  createNewTemplate: 'Crear nueva plantilla \u2192',
  noPostedTitle: 'A\u00fan no has publicado plantillas',
  noPostedSub: '\u00a1Crea un dise\u00f1o en el editor de canvas y comp\u00e1rtelo con la comunidad!',
  publicLabel: 'P\u00fablica',
  privateLabel: 'Privada',
  noPreview: 'Sin vista previa',
  downloads: 'descargas',
  download: 'descarga',
  signInTitle: 'Inicia sesi\u00f3n para ver tus plantillas',
  signInSub: 'Debes iniciar sesi\u00f3n para ver y gestionar tus plantillas publicadas.',
  signIn: 'Iniciar Sesi\u00f3n',
  deleteConfirm: '\u00bfEst\u00e1s seguro de que quieres eliminar esta plantilla? Esta acci\u00f3n no se puede deshacer.',
  deleteError: 'Error al eliminar la plantilla. Int\u00e9ntalo de nuevo.',
  visibilityError: 'Error al actualizar la visibilidad. Int\u00e9ntalo de nuevo.',
  makePrivate: 'Hacer privada',
  makePublic: 'Hacer p\u00fablica',
  edit: 'Editar',
  deleteBtn: 'Eliminar',
};

const fr: CommunityContent = {
  title: 'Modèles de la Communauté',
  subtitle: 'Parcourez et utilisez les modèles partagés par la communauté',
  categories: [
    { value: '', label: 'Tous' },
    { value: 'professional', label: 'Professionnel' },
    { value: 'creative', label: 'Créatif' },
    { value: 'ats', label: 'Optimisé ATS' },
    { value: 'bold', label: 'Audacieux' },
  ],
  browseTab: 'Parcourir les modèles',
  myTemplatesTab: 'Mes modèles',
  templatesAvailable: '{count} modèles disponibles',
  templateAvailable: '{count} modèle disponible',
  createYourOwn: 'Créez le vôtre \u2192',
  errorMessage: 'Impossible de charger les modèles. Veuillez réessayer.',
  tryAgain: 'Réessayer',
  noTemplatesTitle: 'Aucun modèle pour le moment',
  noTemplatesSub: 'Soyez le premier à partager un modèle avec la communauté\u00a0!',
  createTemplate: 'Créer un modèle',
  pageOf: 'Page {page} sur {total}',
  templatesPosted: '{count} modèles publiés',
  templatePosted: '{count} modèle publié',
  createNewTemplate: 'Créer un nouveau modèle \u2192',
  noPostedTitle: 'Aucun modèle publié',
  noPostedSub: 'Créez un design dans l\u2019éditeur de canvas et partagez-le avec la communauté\u00a0!',
  publicLabel: 'Public',
  privateLabel: 'Privé',
  noPreview: 'Aucun aperçu',
  downloads: 'téléchargements',
  download: 'téléchargement',
  signInTitle: 'Connectez-vous pour voir vos modèles',
  signInSub: 'Vous devez être connecté pour consulter et gérer vos modèles publiés.',
  signIn: 'Se connecter',
  deleteConfirm: 'Êtes-vous sûr de vouloir supprimer ce modèle\u00a0? Cette action est irréversible.',
  deleteError: 'Impossible de supprimer le modèle. Veuillez réessayer.',
  visibilityError: 'Impossible de modifier la visibilité. Veuillez réessayer.',
  makePrivate: 'Rendre privé',
  makePublic: 'Rendre public',
  edit: 'Modifier',
  deleteBtn: 'Supprimer',
};

const de: CommunityContent = {
  title: 'Community-Vorlagen',
  subtitle: 'Entdecke und nutze Vorlagen, die von der Community geteilt wurden',
  categories: [
    { value: '', label: 'Alle' },
    { value: 'professional', label: 'Professionell' },
    { value: 'creative', label: 'Kreativ' },
    { value: 'ats', label: 'ATS-optimiert' },
    { value: 'bold', label: 'Ausdrucksstark' },
  ],
  browseTab: 'Vorlagen durchsuchen',
  myTemplatesTab: 'Meine Vorlagen',
  templatesAvailable: '{count} Vorlagen verfügbar',
  templateAvailable: '{count} Vorlage verfügbar',
  createYourOwn: 'Eigene erstellen \u2192',
  errorMessage: 'Vorlagen konnten nicht geladen werden. Bitte versuche es erneut.',
  tryAgain: 'Erneut versuchen',
  noTemplatesTitle: 'Noch keine Vorlagen',
  noTemplatesSub: 'Sei der Erste, der eine Vorlage mit der Community teilt!',
  createTemplate: 'Vorlage erstellen',
  pageOf: 'Seite {page} von {total}',
  templatesPosted: '{count} Vorlagen veröffentlicht',
  templatePosted: '{count} Vorlage veröffentlicht',
  createNewTemplate: 'Neue Vorlage erstellen \u2192',
  noPostedTitle: 'Noch keine Vorlagen veröffentlicht',
  noPostedSub: 'Erstelle ein Design im Canvas-Editor und teile es mit der Community!',
  publicLabel: 'Öffentlich',
  privateLabel: 'Privat',
  noPreview: 'Keine Vorschau',
  downloads: 'Downloads',
  download: 'Download',
  signInTitle: 'Melde dich an, um deine Vorlagen zu sehen',
  signInSub: 'Du musst angemeldet sein, um deine veröffentlichten Vorlagen anzuzeigen und zu verwalten.',
  signIn: 'Anmelden',
  deleteConfirm: 'Bist du sicher, dass du diese Vorlage löschen möchtest? Dies kann nicht rückgängig gemacht werden.',
  deleteError: 'Vorlage konnte nicht gelöscht werden. Bitte versuche es erneut.',
  visibilityError: 'Sichtbarkeit konnte nicht geändert werden. Bitte versuche es erneut.',
  makePrivate: 'Privat stellen',
  makePublic: 'Öffentlich stellen',
  edit: 'Bearbeiten',
  deleteBtn: 'Löschen',
};

const ar: CommunityContent = {
  title: 'قوالب المجتمع',
  subtitle: 'تصفّح واستخدم القوالب التي شاركها أعضاء المجتمع',
  categories: [
    { value: '', label: 'الكل' },
    { value: 'professional', label: 'احترافي' },
    { value: 'creative', label: 'إبداعي' },
    { value: 'ats', label: 'متوافق مع ATS' },
    { value: 'bold', label: 'جريء' },
  ],
  browseTab: 'تصفّح القوالب',
  myTemplatesTab: 'قوالبي',
  templatesAvailable: '{count} قوالب متاحة',
  templateAvailable: '{count} قالب متاح',
  createYourOwn: 'أنشئ قالبك الخاص \u2192',
  errorMessage: 'تعذّر تحميل القوالب. يرجى المحاولة مرة أخرى.',
  tryAgain: 'حاول مجدداً',
  noTemplatesTitle: 'لا توجد قوالب بعد',
  noTemplatesSub: 'كن أول من يشارك قالباً مع المجتمع!',
  createTemplate: 'إنشاء قالب',
  pageOf: 'صفحة {page} من {total}',
  templatesPosted: '{count} قوالب منشورة',
  templatePosted: '{count} قالب منشور',
  createNewTemplate: 'إنشاء قالب جديد \u2192',
  noPostedTitle: 'لم تنشر أي قوالب بعد',
  noPostedSub: 'صمّم قالباً في محرر التصميم وشاركه مع المجتمع!',
  publicLabel: 'عام',
  privateLabel: 'خاص',
  noPreview: 'لا توجد معاينة',
  downloads: 'تنزيلات',
  download: 'تنزيل',
  signInTitle: 'سجّل الدخول لعرض قوالبك',
  signInSub: 'يجب تسجيل الدخول لعرض وإدارة القوالب التي نشرتها.',
  signIn: 'تسجيل الدخول',
  deleteConfirm: 'هل أنت متأكد من حذف هذا القالب؟ لا يمكن التراجع عن هذا الإجراء.',
  deleteError: 'تعذّر حذف القالب. يرجى المحاولة مرة أخرى.',
  visibilityError: 'تعذّر تحديث مستوى الظهور. يرجى المحاولة مرة أخرى.',
  makePrivate: 'جعله خاصاً',
  makePublic: 'جعله عاماً',
  edit: 'تعديل',
  deleteBtn: 'حذف',
};

const ja: CommunityContent = {
  title: 'コミュニティテンプレート',
  subtitle: 'コミュニティで共有されたテンプレートを閲覧・利用できます',
  categories: [
    { value: '', label: 'すべて' },
    { value: 'professional', label: 'プロフェッショナル' },
    { value: 'creative', label: 'クリエイティブ' },
    { value: 'ats', label: 'ATS対応' },
    { value: 'bold', label: 'インパクト' },
  ],
  browseTab: 'テンプレートを探す',
  myTemplatesTab: 'マイテンプレート',
  templatesAvailable: '{count}件のテンプレートが利用可能',
  templateAvailable: '{count}件のテンプレートが利用可能',
  createYourOwn: '自分のテンプレートを作成 \u2192',
  errorMessage: 'テンプレートの読み込みに失敗しました。もう一度お試しください。',
  tryAgain: '再試行',
  noTemplatesTitle: 'まだテンプレートがありません',
  noTemplatesSub: 'コミュニティで最初のテンプレートを共有しましょう！',
  createTemplate: 'テンプレートを作成',
  pageOf: '{page} / {total}ページ',
  templatesPosted: '{count}件のテンプレートを公開中',
  templatePosted: '{count}件のテンプレートを公開中',
  createNewTemplate: '新しいテンプレートを作成 \u2192',
  noPostedTitle: 'まだテンプレートを公開していません',
  noPostedSub: 'キャンバスエディタでデザインを作成し、コミュニティと共有しましょう！',
  publicLabel: '公開',
  privateLabel: '非公開',
  noPreview: 'プレビューなし',
  downloads: 'ダウンロード',
  download: 'ダウンロード',
  signInTitle: 'テンプレートを表示するにはログインしてください',
  signInSub: '公開したテンプレートの表示・管理にはログインが必要です。',
  signIn: 'ログイン',
  deleteConfirm: 'このテンプレートを削除してもよろしいですか？この操作は取り消せません。',
  deleteError: 'テンプレートの削除に失敗しました。もう一度お試しください。',
  visibilityError: '公開設定の変更に失敗しました。もう一度お試しください。',
  makePrivate: '非公開にする',
  makePublic: '公開にする',
  edit: '編集',
  deleteBtn: '削除',
};

const contentMap: Record<string, CommunityContent> = { en, es, fr, de, ar, ja };

export function getContent(locale: string) { return selectContent(contentMap, locale); }
