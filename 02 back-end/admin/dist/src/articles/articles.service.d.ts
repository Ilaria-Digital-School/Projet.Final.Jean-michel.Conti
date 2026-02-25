import { PrismaService } from '../prisma/prisma.service';
export declare class ArticlesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        comments: ({
            user: {
                email: string;
            } | null;
        } & {
            id: number;
            content: string;
            artistId: number | null;
            createdAt: Date;
            artworkId: number | null;
            articleId: number | null;
            userId: number | null;
            adminId: number | null;
        })[];
    } & {
        id: number;
        slug: string;
        content: string;
        createdAt: Date;
        title: string;
        updatedAt: Date;
    })[]>;
    findBySlug(slug: string): Promise<({
        comments: ({
            user: {
                email: string;
            } | null;
        } & {
            id: number;
            content: string;
            artistId: number | null;
            createdAt: Date;
            artworkId: number | null;
            articleId: number | null;
            userId: number | null;
            adminId: number | null;
        })[];
    } & {
        id: number;
        slug: string;
        content: string;
        createdAt: Date;
        title: string;
        updatedAt: Date;
    }) | null>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__ArticleClient<({
        comments: ({
            user: {
                email: string;
            } | null;
        } & {
            id: number;
            content: string;
            artistId: number | null;
            createdAt: Date;
            artworkId: number | null;
            articleId: number | null;
            userId: number | null;
            adminId: number | null;
        })[];
    } & {
        id: number;
        slug: string;
        content: string;
        createdAt: Date;
        title: string;
        updatedAt: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    generateSlug(title: string): string;
    create(data: {
        title: string;
        content: string;
        slug?: string;
    }): import("@prisma/client").Prisma.Prisma__ArticleClient<{
        id: number;
        slug: string;
        content: string;
        createdAt: Date;
        title: string;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, data: {
        title?: string;
        content?: string;
    }): import("@prisma/client").Prisma.Prisma__ArticleClient<{
        id: number;
        slug: string;
        content: string;
        createdAt: Date;
        title: string;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__ArticleClient<{
        id: number;
        slug: string;
        content: string;
        createdAt: Date;
        title: string;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
