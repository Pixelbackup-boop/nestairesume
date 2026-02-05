export declare const hashPassword: (password: string) => Promise<string>;
export declare const verifyPassword: (password: string, hashedPassword: string) => Promise<boolean>;
export declare const createAccessToken: (userId: string, email: string, role: string) => string;
export declare const registerUser: (email: string, password: string, name: string) => Promise<{
    id: string;
    email: string;
    name: string;
}>;
export declare const loginUser: (email: string, password: string) => Promise<{
    access_token: string;
    token_type: string;
}>;
export declare const getUserById: (userId: string) => Promise<{
    name: string;
    email: string;
    role: string;
    id: string;
    subscriptionTier: string;
    creditsRemaining: number;
    subscriptionStatus: string | null;
    isSuspended: boolean;
    trialEndsAt: Date | null;
    createdAt: Date;
} | null>;
interface OAuthData {
    provider: string;
    providerAccountId: string;
    email: string;
    name: string;
    image?: string;
    accessToken?: string;
    refreshToken?: string;
}
export declare const handleOAuthSignIn: (data: OAuthData) => Promise<{
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
        image: string | null;
    };
    access_token: string;
    token_type: string;
}>;
export declare const registerUserWithVerification: (email: string, password: string, name: string) => Promise<{
    requiresVerification: boolean;
    email: string;
    message: string;
}>;
export declare const verifyEmailCode: (email: string, code: string) => Promise<{
    access_token: string;
    token_type: string;
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
    };
}>;
export declare const resendVerificationCode: (email: string) => Promise<{
    message: string;
}>;
export declare const requestPasswordReset: (email: string) => Promise<{
    message: string;
}>;
export declare const resetPassword: (email: string, code: string, newPassword: string) => Promise<{
    message: string;
}>;
export declare const changePassword: (userId: string, currentPassword: string, newPassword: string) => Promise<{
    message: string;
}>;
export declare const setPassword: (userId: string, newPassword: string) => Promise<{
    message: string;
}>;
export {};
//# sourceMappingURL=authService.d.ts.map