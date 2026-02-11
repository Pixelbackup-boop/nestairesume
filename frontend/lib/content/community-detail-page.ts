import { selectContent } from './types';

export interface CommunityDetailContent {
  backToGallery: string;
  useTemplate: string;
  downloads: string;
  download: string;
  by: string;
  commentsTitle: string;
  commentPlaceholder: string;
  postComment: string;
  signInToComment: string;
  signIn: string;
  noComments: string;
  deleteComment: string;
  deleteConfirm: string;
  editComment: string;
  saveEdit: string;
  cancelEdit: string;
  loadMore: string;
  charLimit: string;
  edited: string;
}

const en: CommunityDetailContent = {
  backToGallery: '\u2190 Back to Gallery',
  useTemplate: 'Use Template',
  downloads: 'downloads',
  download: 'download',
  by: 'By',
  commentsTitle: 'Comments',
  commentPlaceholder: 'Share your thoughts on this template...',
  postComment: 'Post Comment',
  signInToComment: 'Sign in to leave a comment',
  signIn: 'Sign In',
  noComments: 'No comments yet. Be the first to share your thoughts!',
  deleteComment: 'Delete',
  deleteConfirm: 'Are you sure you want to delete this comment?',
  editComment: 'Edit',
  saveEdit: 'Save',
  cancelEdit: 'Cancel',
  loadMore: 'Load more comments',
  charLimit: '{count}/2000',
  edited: '(edited)',
};

const es: CommunityDetailContent = {
  backToGallery: '\u2190 Volver a la Galer\u00eda',
  useTemplate: 'Usar Plantilla',
  downloads: 'descargas',
  download: 'descarga',
  by: 'Por',
  commentsTitle: 'Comentarios',
  commentPlaceholder: 'Comparte tu opini\u00f3n sobre esta plantilla...',
  postComment: 'Publicar Comentario',
  signInToComment: 'Inicia sesi\u00f3n para dejar un comentario',
  signIn: 'Iniciar Sesi\u00f3n',
  noComments: '\u00a1A\u00fan no hay comentarios. S\u00e9 el primero en compartir tu opini\u00f3n!',
  deleteComment: 'Eliminar',
  deleteConfirm: '\u00bfEst\u00e1s seguro de que quieres eliminar este comentario?',
  editComment: 'Editar',
  saveEdit: 'Guardar',
  cancelEdit: 'Cancelar',
  loadMore: 'Cargar m\u00e1s comentarios',
  charLimit: '{count}/2000',
  edited: '(editado)',
};

const fr: CommunityDetailContent = {
  backToGallery: '\u2190 Retour \u00e0 la Galerie',
  useTemplate: 'Utiliser le Mod\u00e8le',
  downloads: 't\u00e9l\u00e9chargements',
  download: 't\u00e9l\u00e9chargement',
  by: 'Par',
  commentsTitle: 'Commentaires',
  commentPlaceholder: 'Partagez votre avis sur ce mod\u00e8le...',
  postComment: 'Publier un Commentaire',
  signInToComment: 'Connectez-vous pour laisser un commentaire',
  signIn: 'Se Connecter',
  noComments: 'Pas encore de commentaires. Soyez le premier \u00e0 partager votre avis\u00a0!',
  deleteComment: 'Supprimer',
  deleteConfirm: '\u00cates-vous s\u00fbr de vouloir supprimer ce commentaire\u00a0?',
  editComment: 'Modifier',
  saveEdit: 'Enregistrer',
  cancelEdit: 'Annuler',
  loadMore: 'Charger plus de commentaires',
  charLimit: '{count}/2000',
  edited: '(modifi\u00e9)',
};

const de: CommunityDetailContent = {
  backToGallery: '\u2190 Zur\u00fcck zur Galerie',
  useTemplate: 'Vorlage verwenden',
  downloads: 'Downloads',
  download: 'Download',
  by: 'Von',
  commentsTitle: 'Kommentare',
  commentPlaceholder: 'Teile deine Meinung zu dieser Vorlage...',
  postComment: 'Kommentar ver\u00f6ffentlichen',
  signInToComment: 'Melde dich an, um einen Kommentar zu hinterlassen',
  signIn: 'Anmelden',
  noComments: 'Noch keine Kommentare. Sei der Erste, der seine Meinung teilt!',
  deleteComment: 'L\u00f6schen',
  deleteConfirm: 'Bist du sicher, dass du diesen Kommentar l\u00f6schen m\u00f6chtest?',
  editComment: 'Bearbeiten',
  saveEdit: 'Speichern',
  cancelEdit: 'Abbrechen',
  loadMore: 'Mehr Kommentare laden',
  charLimit: '{count}/2000',
  edited: '(bearbeitet)',
};

const ar: CommunityDetailContent = {
  backToGallery: '\u2192 \u0627\u0644\u0639\u0648\u062f\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u0639\u0631\u0636',
  useTemplate: '\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u0642\u0627\u0644\u0628',
  downloads: '\u062a\u0646\u0632\u064a\u0644\u0627\u062a',
  download: '\u062a\u0646\u0632\u064a\u0644',
  by: '\u0628\u0648\u0627\u0633\u0637\u0629',
  commentsTitle: '\u0627\u0644\u062a\u0639\u0644\u064a\u0642\u0627\u062a',
  commentPlaceholder: '\u0634\u0627\u0631\u0643 \u0631\u0623\u064a\u0643 \u062d\u0648\u0644 \u0647\u0630\u0627 \u0627\u0644\u0642\u0627\u0644\u0628...',
  postComment: '\u0646\u0634\u0631 \u062a\u0639\u0644\u064a\u0642',
  signInToComment: '\u0633\u062c\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0644\u062a\u0631\u0643 \u062a\u0639\u0644\u064a\u0642',
  signIn: '\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644',
  noComments: '\u0644\u0627 \u062a\u0648\u062c\u062f \u062a\u0639\u0644\u064a\u0642\u0627\u062a \u0628\u0639\u062f. \u0643\u0646 \u0623\u0648\u0644 \u0645\u0646 \u064a\u0634\u0627\u0631\u0643 \u0631\u0623\u064a\u0647!',
  deleteComment: '\u062d\u0630\u0641',
  deleteConfirm: '\u0647\u0644 \u0623\u0646\u062a \u0645\u062a\u0623\u0643\u062f \u0623\u0646\u0643 \u062a\u0631\u064a\u062f \u062d\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062a\u0639\u0644\u064a\u0642\u061f',
  editComment: '\u062a\u0639\u062f\u064a\u0644',
  saveEdit: '\u062d\u0641\u0638',
  cancelEdit: '\u0625\u0644\u063a\u0627\u0621',
  loadMore: '\u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0645\u0632\u064a\u062f \u0645\u0646 \u0627\u0644\u062a\u0639\u0644\u064a\u0642\u0627\u062a',
  charLimit: '{count}/2000',
  edited: '(\u0645\u0639\u062f\u0644)',
};

const contentMap: Record<string, CommunityDetailContent> = { en, es, fr, de, ar };

export function getContent(locale: string): CommunityDetailContent {
  return selectContent(contentMap, locale);
}
