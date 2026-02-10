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

const contentMap: Record<string, CommunityContent> = { en, es };

export function getContent(locale: string) { return selectContent(contentMap, locale); }
