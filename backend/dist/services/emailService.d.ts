interface SendEmailOptions {
    to: string;
    toName?: string;
    subject: string;
    htmlContent: string;
    textContent?: string;
    replyTo?: string;
}
export declare const sendEmail: (options: SendEmailOptions) => Promise<boolean>;
export declare const generateVerificationCode: () => string;
export declare const sendVerificationEmail: (email: string, name: string, code: string) => Promise<boolean>;
export declare const sendPasswordResetEmail: (email: string, name: string, code: string) => Promise<boolean>;
export declare const sendEmailChangeVerification: (newEmail: string, name: string, code: string) => Promise<boolean>;
export {};
//# sourceMappingURL=emailService.d.ts.map