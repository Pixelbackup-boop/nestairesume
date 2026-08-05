declare module 'html-to-docx' {
  interface DocxMargins {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    header?: number;
    footer?: number;
    gutter?: number;
  }

  interface DocxOptions {
    table?: { row?: { cantSplit?: boolean } };
    footer?: boolean;
    pageNumber?: boolean;
    margins?: DocxMargins;
    orientation?: 'portrait' | 'landscape';
  }

  export default function HTMLtoDOCX(
    htmlString: string,
    headerHtmlString?: string | null,
    options?: DocxOptions,
    footerHtmlString?: string | null
  ): Promise<ArrayBuffer | Buffer>;
}
