import { PrismaClient } from "@prisma/client";
declare const prisma: PrismaClient<{
    datasources: {
        db: {
            url: string;
        };
    };
    log: ("query" | "warn" | "error")[];
}, never, import("@prisma/client/runtime/library").DefaultArgs>;
export default prisma;
//# sourceMappingURL=database.d.ts.map