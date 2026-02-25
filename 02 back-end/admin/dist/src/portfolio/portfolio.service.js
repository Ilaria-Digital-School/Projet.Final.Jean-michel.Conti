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
exports.PortfolioService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PortfolioService = class PortfolioService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const artworks = await this.prisma.artwork.findMany({
            include: {
                comments: {
                    include: {
                        user: {
                            select: { email: true }
                        }
                    },
                    orderBy: { createdAt: 'desc' }
                }
            }
        });
        return artworks.map(art => ({
            ...art,
            title: art.titre,
            description: art.description,
            content: art.content
        }));
    }
    async findBySlug(slug) {
        const artwork = await this.prisma.artwork.findUnique({
            where: { slug },
            include: {
                comments: {
                    include: {
                        user: {
                            select: { email: true }
                        }
                    },
                    orderBy: { createdAt: 'desc' }
                }
            }
        });
        if (!artwork)
            return null;
        return {
            ...artwork,
            title: artwork.titre,
            description: artwork.description,
            content: artwork.content
        };
    }
    generateSlug(title) {
        return title
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }
    async create(data) {
        const title = data.titre || data.title;
        const slug = data.slug || this.generateSlug(title);
        return this.prisma.artwork.create({
            data: {
                titre: title,
                slug: slug,
                annee: parseInt(data.annee),
                categorie: data.categorie,
                imageUrl: data.imageUrl || '',
                description: data.description || '',
                content: data.content || '',
                artistId: parseInt(data.artistId) || 1
            },
        });
    }
};
exports.PortfolioService = PortfolioService;
exports.PortfolioService = PortfolioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PortfolioService);
//# sourceMappingURL=portfolio.service.js.map