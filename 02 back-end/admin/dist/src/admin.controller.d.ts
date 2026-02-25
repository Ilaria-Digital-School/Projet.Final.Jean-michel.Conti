import { PortfolioService } from './portfolio/portfolio.service';
import { ArticlesService } from './articles/articles.service';
import { CommentsService } from './comments/comments.service';
export declare class AdminController {
    private readonly portfolioService;
    private readonly articlesService;
    private readonly commentsService;
    constructor(portfolioService: PortfolioService, articlesService: ArticlesService, commentsService: CommentsService);
    getDashboard(): Promise<{
        title: string;
        description: string;
        stats: {
            projectsCount: number;
            articlesCount: number;
        };
    }>;
    getPortfolio(): Promise<{
        title: string;
        description: string;
        projects: {
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
            titre: string;
            slug: string;
            annee: number;
            categorie: string;
            imageUrl: string;
            artistId: number;
        }[];
    }>;
    getArticles(): Promise<{
        title: string;
        description: string;
        articles: ({
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
        })[];
    }>;
    getComments(): Promise<{
        title: string;
        comments: ({
            admin: {
                id: number;
                email: string;
            } | null;
            artwork: {
                titre: string;
            } | null;
            user: {
                id: number;
                email: string;
            } | null;
            article: {
                title: string;
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
    }>;
}
