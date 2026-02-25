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
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ArticlesService = class ArticlesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.article.findMany({
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
    }
    async findBySlug(slug) {
        return this.prisma.article.findUnique({
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
    }
    findOne(id) {
        return this.prisma.article.findUnique({
            where: { id },
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
    create(data) {
        const slug = data.slug || this.generateSlug(data.title);
        return this.prisma.article.create({
            data: {
                ...data,
                slug,
            },
        });
    }
    update(id, data) {
        return this.prisma.article.update({
            where: { id },
            data,
        });
    }
    remove(id) {
        return this.prisma.article.delete({
            where: { id },
        });
    }
};
exports.ArticlesService = ArticlesService;
exports.ArticlesService = ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ArticlesService);
//# sourceMappingURL=articles.service.js.map