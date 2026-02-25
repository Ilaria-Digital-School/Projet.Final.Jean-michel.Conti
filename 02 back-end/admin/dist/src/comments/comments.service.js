"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CommentsService = class CommentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(content, targetId, type, userId, artistId, adminId) {
        if (!content || content.trim().length === 0) {
            throw new common_1.BadRequestException('Le contenu du commentaire ne peut pas être vide');
        }
        if (content.length > 1000) {
            throw new common_1.BadRequestException('Le contenu du commentaire ne peut pas dépasser 1000 caractères');
        }
        const sanitizedContent = content.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        const data = {
            content: sanitizedContent,
            userId: userId || null,
            adminId: adminId || null,
            artistId: artistId || null,
        };
        if (type === 'artwork') {
            data.artworkId = targetId;
        }
        else {
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
    async findAll(artworkId, articleId) {
        const where = {};
        if (artworkId)
            where.artworkId = artworkId;
        if (articleId)
            where.articleId = articleId;
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
    async findOne(id) {
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
        if (!comment) {
            throw new common_1.NotFoundException('Commentaire non trouvé');
        }
        return comment;
    }
    async delete(id, userRole, userId) {
        const comment = await this.prisma.comment.findUnique({
            where: { id },
        });
        if (!comment) {
            throw new common_1.NotFoundException('Commentaire non trouvé');
        }
        if (userRole === 'admin') {
            await this.prisma.comment.delete({
                where: { id },
            });
            return { message: `Commentaire ${id} supprimé par l'admin` };
        }
        throw new common_1.ForbiddenException('Vous n\'êtes pas autorisé à supprimer ce commentaire');
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentsService);
//# sourceMappingURL=comments.service.js.map