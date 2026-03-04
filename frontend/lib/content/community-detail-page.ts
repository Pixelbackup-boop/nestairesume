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

const ja: CommunityDetailContent = {
  backToGallery: '\u2190 ギャラリーに戻る',
  useTemplate: 'テンプレートを使用',
  downloads: 'ダウンロード',
  download: 'ダウンロード',
  by: '作成者:',
  commentsTitle: 'コメント',
  commentPlaceholder: 'このテンプレートについてコメントを残す...',
  postComment: 'コメントを投稿',
  signInToComment: 'コメントするにはログインしてください',
  signIn: 'ログイン',
  noComments: 'まだコメントはありません。最初のコメントを投稿しましょう！',
  deleteComment: '削除',
  deleteConfirm: 'このコメントを削除してもよろしいですか？',
  editComment: '編集',
  saveEdit: '保存',
  cancelEdit: 'キャンセル',
  loadMore: 'さらにコメントを読み込む',
  charLimit: '{count}/2000',
  edited: '(編集済み)',
};

const it: CommunityDetailContent = {
  backToGallery: '\u2190 Torna alla Galleria',
  useTemplate: 'Usa Modello',
  downloads: 'download',
  download: 'download',
  by: 'Di',
  commentsTitle: 'Commenti',
  commentPlaceholder: 'Condividi la tua opinione su questo modello...',
  postComment: 'Pubblica Commento',
  signInToComment: 'Accedi per lasciare un commento',
  signIn: 'Accedi',
  noComments: 'Nessun commento ancora. Sii il primo a condividere la tua opinione!',
  deleteComment: 'Elimina',
  deleteConfirm: 'Sei sicuro di voler eliminare questo commento?',
  editComment: 'Modifica',
  saveEdit: 'Salva',
  cancelEdit: 'Annulla',
  loadMore: 'Carica altri commenti',
  charLimit: '{count}/2000',
  edited: '(modificato)',
};

const ko: CommunityDetailContent = {
  backToGallery: '\u2190 갤러리로 돌아가기',
  useTemplate: '이력서 템플릿 사용',
  downloads: '다운로드',
  download: '다운로드',
  by: '작성자:',
  commentsTitle: '댓글',
  commentPlaceholder: '이 이력서 템플릿에 대한 의견을 남겨주세요...',
  postComment: '댓글 작성',
  signInToComment: '댓글을 남기려면 로그인하세요',
  signIn: '로그인',
  noComments: '아직 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!',
  deleteComment: '삭제',
  deleteConfirm: '이 댓글을 정말 삭제하시겠습니까?',
  editComment: '수정',
  saveEdit: '저장',
  cancelEdit: '취소',
  loadMore: '댓글 더 보기',
  charLimit: '{count}/2000',
  edited: '(수정됨)',
};

const vi: CommunityDetailContent = {
  backToGallery: '\u2190 Quay Lại Thư Viện',
  useTemplate: 'Dùng Mẫu Này',
  downloads: 'lượt tải',
  download: 'lượt tải',
  by: 'Bởi',
  commentsTitle: 'Bình Luận',
  commentPlaceholder: 'Chia sẻ nhận xét của bạn về mẫu CV này...',
  postComment: 'Đăng Bình Luận',
  signInToComment: 'Đăng nhập để bình luận',
  signIn: 'Đăng Nhập',
  noComments: 'Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ nhận xét!',
  deleteComment: 'Xóa',
  deleteConfirm: 'Bạn có chắc chắn muốn xóa bình luận này?',
  editComment: 'Sửa',
  saveEdit: 'Lưu',
  cancelEdit: 'Hủy',
  loadMore: 'Tải thêm bình luận',
  charLimit: '{count}/2000',
  edited: '(đã sửa)',
};

const th: CommunityDetailContent = {
  backToGallery: '\u2190 กลับไปยังแกลเลอรี',
  useTemplate: 'ใช้เทมเพลตนี้',
  downloads: 'ดาวน์โหลด',
  download: 'ดาวน์โหลด',
  by: 'โดย',
  commentsTitle: 'ความคิดเห็น',
  commentPlaceholder: 'แบ่งปันความคิดเห็นของคุณเกี่ยวกับเทมเพลตนี้...',
  postComment: 'โพสต์ความคิดเห็น',
  signInToComment: 'เข้าสู่ระบบเพื่อแสดงความคิดเห็น',
  signIn: 'เข้าสู่ระบบ',
  noComments: 'ยังไม่มีความคิดเห็น เป็นคนแรกที่แสดงความคิดเห็น!',
  deleteComment: 'ลบ',
  deleteConfirm: 'คุณแน่ใจหรือไม่ว่าต้องการลบความคิดเห็นนี้?',
  editComment: 'แก้ไข',
  saveEdit: 'บันทึก',
  cancelEdit: 'ยกเลิก',
  loadMore: 'โหลดความคิดเห็นเพิ่มเติม',
  charLimit: '{count}/2000',
  edited: '(แก้ไขแล้ว)',
};

const pt: CommunityDetailContent = {
  backToGallery: '← Voltar para a Galeria',
  useTemplate: 'Usar Modelo',
  downloads: 'downloads',
  download: 'download',
  by: 'Por',
  commentsTitle: 'Comentarios',
  commentPlaceholder: 'Compartilhe sua opiniao sobre este modelo...',
  postComment: 'Publicar Comentario',
  signInToComment: 'Faca login para deixar um comentario',
  signIn: 'Entrar',
  noComments: 'Nenhum comentario ainda. Seja o primeiro a compartilhar sua opiniao!',
  deleteComment: 'Excluir',
  deleteConfirm: 'Tem certeza que deseja excluir este comentario?',
  editComment: 'Editar',
  saveEdit: 'Salvar',
  cancelEdit: 'Cancelar',
  loadMore: 'Carregar mais comentarios',
  charLimit: '{count}/2000',
  edited: '(editado)',
};

const tr: CommunityDetailContent = {
  backToGallery: '← Galeriye Dön',
  useTemplate: 'Bu Şablonu Kullan',
  downloads: 'indirme',
  download: 'indir',
  by: 'Tarafından',
  commentsTitle: 'Yorumlar',
  commentPlaceholder: 'Bu şablon hakkındaki düşüncelerinizi paylaşın...',
  postComment: 'Yorum Yap',
  signInToComment: 'Yorum yapmak için giriş yapın',
  signIn: 'Giriş Yap',
  noComments: 'Henüz yorum yok. İlk yorumu siz yapın!',
  deleteComment: 'Sil',
  deleteConfirm: 'Bu yorumu silmek istediğinizden emin misiniz?',
  editComment: 'Düzenle',
  saveEdit: 'Kaydet',
  cancelEdit: 'İptal',
  loadMore: 'Daha fazla yorum yükle',
  charLimit: '{count}/2000',
  edited: '(düzenlendi)',
};

const id: CommunityDetailContent = {
  backToGallery: '← Kembali ke Galeri',
  useTemplate: 'Gunakan Template Ini',
  downloads: 'unduhan',
  download: 'unduh',
  by: 'Oleh',
  commentsTitle: 'Komentar',
  commentPlaceholder: 'Bagikan pendapat Anda tentang template ini...',
  postComment: 'Posting Komentar',
  signInToComment: 'Masuk untuk berkomentar',
  signIn: 'Masuk',
  noComments: 'Belum ada komentar. Jadilah yang pertama!',
  deleteComment: 'Hapus',
  deleteConfirm: 'Apakah Anda yakin ingin menghapus komentar ini?',
  editComment: 'Edit',
  saveEdit: 'Simpan',
  cancelEdit: 'Batal',
  loadMore: 'Muat lebih banyak komentar',
  charLimit: '{count}/2000',
  edited: '(diedit)',
};

const pl: CommunityDetailContent = {
  backToGallery: '← Powrót do galerii',
  useTemplate: 'Użyj tego szablonu',
  downloads: 'pobrania',
  download: 'pobierz',
  by: 'Przez',
  commentsTitle: 'Komentarze',
  commentPlaceholder: 'Podziel się swoją opinią na temat tego szablonu...',
  postComment: 'Dodaj komentarz',
  signInToComment: 'Zaloguj się, aby skomentować',
  signIn: 'Zaloguj się',
  noComments: 'Brak komentarzy. Bądź pierwszy!',
  deleteComment: 'Usuń',
  deleteConfirm: 'Czy na pewno chcesz usunąć ten komentarz?',
  editComment: 'Edytuj',
  saveEdit: 'Zapisz',
  cancelEdit: 'Anuluj',
  loadMore: 'Załaduj więcej komentarzy',
  charLimit: '{count}/2000',
  edited: '(edytowano)',
};

const nl: CommunityDetailContent = {
  backToGallery: '\u2190 Terug naar Galerij',
  useTemplate: 'Sjabloon Gebruiken',
  downloads: 'downloads',
  download: 'download',
  by: 'Door',
  commentsTitle: 'Reacties',
  commentPlaceholder: 'Deel je mening over dit sjabloon...',
  postComment: 'Reactie Plaatsen',
  signInToComment: 'Log in om een reactie achter te laten',
  signIn: 'Inloggen',
  noComments: 'Nog geen reacties. Wees de eerste die zijn mening deelt!',
  deleteComment: 'Verwijderen',
  deleteConfirm: 'Weet je zeker dat je deze reactie wilt verwijderen?',
  editComment: 'Bewerken',
  saveEdit: 'Opslaan',
  cancelEdit: 'Annuleren',
  loadMore: 'Meer reacties laden',
  charLimit: '{count}/2000',
  edited: '(bewerkt)',
};

const contentMap: Record<string, CommunityDetailContent> = { en, es, fr, de, ar, ja, it, ko, vi, th, pt, tr, id, pl, nl };

export function getContent(locale: string): CommunityDetailContent {
  return selectContent(contentMap, locale);
}
