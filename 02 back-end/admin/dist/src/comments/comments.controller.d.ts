import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { PortfolioService } from "src/portfolio/portfolio.service";
export declare class CommentsController {
    private readonly commentsService;
    private readonly portfolioService;
    constructor(commentsService: CommentsService, portfolioService: PortfolioService);
    createComment(createCommentDto: CreateCommentDto, req: any): Promise<{
        user: {
            id: number;
            email: string;
        } | null;
        admin: {
            id: number;
            email: string;
        } | null;
    } & {
        content: string;
        artworkId: number | null;
        id: number;
        artistId: number | null;
        createdAt: Date;
        articleId: number | null;
        userId: number | null;
        adminId: number | null;
    }>;
    getComments(artworkId?: number, artworkSlug?: string): Promise<({
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
        content: string;
        artworkId: number | null;
        id: number;
        artistId: number | null;
        createdAt: Date;
        articleId: number | null;
        userId: number | null;
        adminId: number | null;
    })[]>;
    getComment(id: number): Promise<{
        user: {
            id: number;
            email: string;
        } | null;
        admin: {
            id: number;
            email: string;
        } | null;
    } & {
        content: string;
        artworkId: number | null;
        id: number;
        artistId: number | null;
        createdAt: Date;
        articleId: number | null;
        userId: number | null;
        adminId: number | null;
    }>;
    deleteComment(id: number, req: any): Promise<{
        message: string;
    }>;
}
