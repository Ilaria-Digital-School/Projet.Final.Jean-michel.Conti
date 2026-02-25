// Importation des décorateurs et exceptions NestJS
import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
// Importation du service Prisma pour l'accès à la base de données
import { PrismaService } from '../prisma/prisma.service';

// Décoration du service comme injectable dans le conteneur DI de NestJS
@Injectable()
export class CommentsService {
  // Injection du service Prisma via le constructeur
  constructor(private prisma: PrismaService) {}

  /**
   * Crée un nouveau commentaire dans la base de données
   * @param content - Contenu du commentaire
   * @param targetId - ID de l'œuvre ou de l'article concerné
   * @param type - Type de contenu ('artwork' ou 'article')
   * @param userId - ID optionnel de l'utilisateur
   * @param artistId - ID optionnel de l'artiste
   * @returns Le commentaire créé
   */
  async create(content: string, targetId: number, type: 'artwork' | 'article', userId?: number, artistId?: number, adminId?: number) {
    if (!content || content.trim().length === 0) {
      throw new BadRequestException('Le contenu du commentaire ne peut pas être vide');
    }

    if (content.length > 1000) {
      throw new BadRequestException('Le contenu du commentaire ne peut pas dépasser 1000 caractères');
    }

    const sanitizedContent = content.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    const data: any = {
      content: sanitizedContent,
      userId: userId || null,
      adminId: adminId || null,
      artistId: artistId || null,
    };

    if (type === 'artwork') {
      data.artworkId = targetId;
    } else {
      data.articleId = targetId;
    }

    return this.prisma.comment.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        admin: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }

  /**
   * Récupère tous les commentaires, filtrés par œuvre ou article
   * @param artworkId - Optionnel: ID de l'œuvre
   * @param articleId - Optionnel: ID de l'article
   * @returns Liste des commentaires
   */
  async findAll(artworkId?: number, articleId?: number) {
    const where: any = {};
    if (artworkId) where.artworkId = artworkId;
    if (articleId) where.articleId = articleId;
    
    return this.prisma.comment.findMany({
      where,
      include: {
        user: {
          select: { id: true, email: true },
        },
        admin: {
          select: { id: true, email: true },
        },
        artwork: {
          select: { titre: true }
        },
        article: {
          select: { title: true }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Récupère un commentaire spécifique par son ID
   * @param id - ID du commentaire à rechercher
   * @returns Le commentaire trouvé avec les infos de l'utilisateur
   * @throws NotFoundException si le commentaire n'existe pas
   */
  async findOne(id: number) {
    // Recherche du commentaire par ID
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        admin: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    // Si le commentaire n'existe pas, on lève une exception 404
    if (!comment) {
      throw new NotFoundException('Commentaire non trouvé');
    }

    return comment;
  }

  /**
   * Supprime un commentaire (uniquement pour les admins)
   * @param id - ID du commentaire à supprimer
   * @param userRole - Rôle de l'utilisateur qui fait la demande
   * @param userId - ID de l'utilisateur (non utilisé mais gardé pour cohérence)
   * @returns Message de confirmation
   * @throws NotFoundException si le commentaire n'existe pas
   * @throws ForbiddenException si l'utilisateur n'est pas admin
   */
  async delete(id: number, userRole: string, userId?: number) {
    // Vérification que le commentaire existe avant suppression
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Commentaire non trouvé');
    }

    // Vérification que seul un admin peut supprimer des commentaires
    if (userRole === 'admin') {
      // Suppression effective du commentaire
      await this.prisma.comment.delete({
        where: { id },
      });
      return { message: `Commentaire ${id} supprimé par l'admin` };
    }

    // Si l'utilisateur n'est pas admin, on refuse l'accès
    throw new ForbiddenException('Vous n\'êtes pas autorisé à supprimer ce commentaire');
  }
}