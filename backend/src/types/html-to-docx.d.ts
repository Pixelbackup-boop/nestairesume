declare module 'html-to-docx' {
    interface DocxOptions {
        table?: { row?: { cantSplit?: boolean } };
        footer?: boolean;
        pageNumber?: boolean;
        margins?: {
            top?: number;
            bottom?: number;
            left?: number;
            right?: number;
            header?: number;
            footer?: number;
            gutter?: number;
        };
    }

    function HTMLtoDOCX(
        htmlString: string,
        headerHTMLString: string | null,
        options?: DocxOptions
    ): Promise<ArrayBuffer>;

    export default HTMLtoDOCX;
}
