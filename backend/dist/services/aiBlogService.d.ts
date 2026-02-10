interface GeneratedPost {
    title: string;
    slug: string;
    description: string;
    content: string;
    category: string;
    tags: string[];
}
export declare const generatePostsFromContent: (sourceId: string, count?: number) => Promise<GeneratedPost[]>;
export declare const savePostsToQueue: (posts: GeneratedPost[], sourceId: string) => Promise<number>;
export declare const getScheduledPosts: (status?: string) => Promise<({
    source: {
        name: string;
    } | null;
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    title: string;
    description: string;
    slug: string;
    content: string;
    category: string;
    tags: string;
    scheduledFor: Date;
    sourceId: string | null;
    blogPostId: string | null;
})[]>;
export declare const getScheduledPostById: (id: string) => Promise<({
    source: {
        name: string;
    } | null;
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    title: string;
    description: string;
    slug: string;
    content: string;
    category: string;
    tags: string;
    scheduledFor: Date;
    sourceId: string | null;
    blogPostId: string | null;
}) | null>;
export declare const updateScheduledPost: (id: string, data: Partial<{
    title: string;
    slug: string;
    description: string;
    content: string;
    category: string;
    tags: string;
    scheduledFor: Date;
    status: string;
}>) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    title: string;
    description: string;
    slug: string;
    content: string;
    category: string;
    tags: string;
    scheduledFor: Date;
    sourceId: string | null;
    blogPostId: string | null;
}>;
export declare const approvePost: (id: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    title: string;
    description: string;
    slug: string;
    content: string;
    category: string;
    tags: string;
    scheduledFor: Date;
    sourceId: string | null;
    blogPostId: string | null;
}>;
export declare const deleteScheduledPost: (id: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    title: string;
    description: string;
    slug: string;
    content: string;
    category: string;
    tags: string;
    scheduledFor: Date;
    sourceId: string | null;
    blogPostId: string | null;
}>;
export declare const publishPost: (id: string, authorName: string) => Promise<{
    id: string;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    published: boolean;
    description: string;
    slug: string;
    content: string;
    imageAlt: string | null;
    category: string;
    tags: string;
    author: string;
    featured: boolean;
    publishedAt: Date | null;
}>;
export {};
//# sourceMappingURL=aiBlogService.d.ts.map