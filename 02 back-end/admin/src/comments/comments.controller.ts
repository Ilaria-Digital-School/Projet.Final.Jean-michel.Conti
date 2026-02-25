// Importation des décorateurs et éléments NestJS pour les contrôleurs
import { Controller, Delete, Param, UseGuards, Post, Get, Body, Request, Query, BadRequestException } from "@nestjs/common";
// Importation du guard pour vérifier les rôles utilisateur
import { RolesGuard } from "src/auth/guards/roles.guard";
// Importation du décorateur pour définir les rôles requis
import { Roles } from "src/auth/roles.decorator";
// Importation du guard pour l'authentification JWT
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
// Importation de l'énumération des rôles
import { Role } from "src/auth/roles.enum";
// Importation du service de commentaires
import { CommentsService } from "./comments.service";
// Importation du DTO pour la création de commentaires
import { CreateCommentDto } from "./dto/create-comment.dto";

// Décoration du contrôleur avec le préfixe de route '/comments'
import { PortfolioService } from "src/portfolio/portfolio.service";

@Controller('comments')
export class CommentsController {
    // Injection du service de commentaires via le constructeur
    constructor(
        private readonly commentsService: CommentsService,
        private readonly portfolioService: PortfolioService
    ) {}

    /**
     * Endpoint POST pour créer un nouveau commentaire
     */
    @UseGuards(JwtAuthGuard)
    @Post()
    async createComment(@Body() createCommentDto: CreateCommentDto, @Request() req) {
        let { content, artworkId, artworkSlug, articleId, artistId } = createCommentDto;
        
        // Résolution du slug si l'ID n'est pas fourni
        if (!artworkId && artworkSlug) {
            const artwork = await this.portfolioService.findBySlug(artworkSlug);
            if (artwork) {
                artworkId = artwork.id;
            } else {
                throw new BadRequestException('Projet introuvable pour ce slug');
            }
        }

        const targetId = artworkId || articleId;
        
        if (!targetId) {
            throw new BadRequestException('ID de cible (œuvre ou article) manquant');
        }

        const type = artworkId ? 'artwork' : 'article';
        
        // On passe soit userId soit adminId selon le rôle
        const userId = req.user.role === 'user' ? req.user.userId : null;
        const adminId = req.user.role === 'admin' ? req.user.userId : null;
        
        return this.commentsService.create(content, targetId, type as any, userId, artistId, adminId);
    }

    /**
     * Endpoint GET pour récupérer tous les commentaires
     * Accessible sans authentification (public)
     * Route: GET /comments?artworkId=X (optionnel pour filtrer par œuvre)
     */
    @Get()
    async getComments(@Query('artworkId') artworkId?: number, @Query('artworkSlug') artworkSlug?: string) {
        if (!artworkId && artworkSlug) {
            const artwork = await this.portfolioService.findBySlug(artworkSlug);
            if (artwork) artworkId = artwork.id;
        }
        return this.commentsService.findAll(artworkId);
    }

    /**
     * Endpoint GET pour récupérer un commentaire spécifique
     * Accessible sans authentification (public)
     * Route: GET /comments/:id
     */
    @Get(':id')
    getComment(@Param('id') id: number) {
        // Récupération d'un commentaire spécifique par son ID
        return this.commentsService.findOne(id);
    }

    /**
     * Endpoint DELETE pour supprimer un commentaire
     * Accessible uniquement aux administrateurs
     * Route: DELETE /comments/:id
     */
    @UseGuards(JwtAuthGuard, RolesGuard) // Vérifie l'authentification ET le rôle
    @Roles(Role.ADMIN) // Restreint l'accès aux admins uniquement
    @Delete(':id')
    deleteComment(@Param('id') id: number, @Request() req) {
        console.log('CommentsController: deleteComment called for id:', id, 'type:', typeof id);
        console.log('CommentsController: user role:', req.user.role);
        // Appel au service pour supprimer le commentaire avec le rôle de l'utilisateur
        return this.commentsService.delete(id, req.user.role, req.user.userId);
    }
}
