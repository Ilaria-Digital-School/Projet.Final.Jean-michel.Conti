import { ArticlesService } from './articles.service';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    create(createArticleDto: {
        title: string;
        content: string;
        slug?: string;
    }, res: any): Promise<any>;
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
    update(id: number, updateArticleDto: {
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
