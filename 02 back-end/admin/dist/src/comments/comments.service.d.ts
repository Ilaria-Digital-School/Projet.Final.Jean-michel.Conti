import { PrismaService } from '../prisma/prisma.service';
export declare class CommentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(content: string, targetId: number, type: 'artwork' | 'article', userId?: number, artistId?: number, adminId?: number): Promise<{
        user: {
            id: number;
            email: string;
        } | null;
        admin: {
            id: number;
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
    }>;
    findAll(artworkId?: number, articleId?: number): Promise<({
        artwork: {
            titre: string;
        } | null;
        article: {
            title: string;
        } | null;
        user: {
            id: number;
            email: string;
        } | null;
        admin: {
            id: number;
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
    })[]>;
    findOne(id: number): Promise<{
        user: {
            id: number;
            email: string;
        } | null;
        admin: {
            id: number;
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
    }>;
    delete(id: number, userRole: string, userId?: number): Promise<{
        message: string;
    }>;
}
