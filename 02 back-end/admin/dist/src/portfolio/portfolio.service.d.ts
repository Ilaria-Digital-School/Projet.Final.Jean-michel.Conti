import { PrismaService } from '../prisma/prisma.service';
export declare class PortfolioService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        title: string;
        description: string | null;
        content: string | null;
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
        id: number;
        slug: string;
        titre: string;
        annee: number;
        categorie: string;
        imageUrl: string;
        artistId: number;
    }[]>;
    findBySlug(slug: string): Promise<{
        title: string;
        description: string | null;
        content: string | null;
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
        id: number;
        slug: string;
        titre: string;
        annee: number;
        categorie: string;
        imageUrl: string;
        artistId: number;
    } | null>;
    generateSlug(title: string): string;
    create(data: any): Promise<{
        id: number;
        slug: string;
        titre: string;
        content: string | null;
        description: string | null;
        annee: number;
        categorie: string;
        imageUrl: string;
        artistId: number;
    }>;
}
