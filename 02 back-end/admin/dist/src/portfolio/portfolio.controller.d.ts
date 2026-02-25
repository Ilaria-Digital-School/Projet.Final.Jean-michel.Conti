import { PortfolioService } from "./portfolio.service";
export declare class PortfolioController {
    private readonly portfolioService;
    constructor(portfolioService: PortfolioService);
    getAll(res: any): Promise<any>;
    getOne(slug: string, res: any): Promise<any>;
    getApiOne(slug: string): Promise<{
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
    } | {
        error: string;
    }>;
    create(body: any, res: any): Promise<any>;
}
