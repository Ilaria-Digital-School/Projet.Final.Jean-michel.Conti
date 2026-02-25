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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_enum_1 = require("../auth/roles.enum");
const comments_service_1 = require("./comments.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const portfolio_service_1 = require("../portfolio/portfolio.service");
let CommentsController = class CommentsController {
    commentsService;
    portfolioService;
    constructor(commentsService, portfolioService) {
        this.commentsService = commentsService;
        this.portfolioService = portfolioService;
    }
    async createComment(createCommentDto, req) {
        let { content, artworkId, artworkSlug, articleId, artistId } = createCommentDto;
        if (!artworkId && artworkSlug) {
            const artwork = await this.portfolioService.findBySlug(artworkSlug);
            if (artwork) {
                artworkId = artwork.id;
            }
            else {
                throw new common_1.BadRequestException('Projet introuvable pour ce slug');
            }
        }
        const targetId = artworkId || articleId;
        if (!targetId) {
            throw new common_1.BadRequestException('ID de cible (œuvre ou article) manquant');
        }
        const type = artworkId ? 'artwork' : 'article';
        const userId = req.user.role === 'user' ? req.user.userId : null;
        const adminId = req.user.role === 'admin' ? req.user.userId : null;
        return this.commentsService.create(content, targetId, type, userId, artistId, adminId);
    }
    async getComments(artworkId, artworkSlug) {
        if (!artworkId && artworkSlug) {
            const artwork = await this.portfolioService.findBySlug(artworkSlug);
            if (artwork)
                artworkId = artwork.id;
        }
        return this.commentsService.findAll(artworkId);
    }
    getComment(id) {
        return this.commentsService.findOne(id);
    }
    deleteComment(id, req) {
        console.log('CommentsController: deleteComment called for id:', id, 'type:', typeof id);
        console.log('CommentsController: user role:', req.user.role);
        return this.commentsService.delete(id, req.user.role, req.user.userId);
    }
};
exports.CommentsController = CommentsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "createComment", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('artworkId')),
    __param(1, (0, common_1.Query)('artworkSlug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "getComments", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "getComment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "deleteComment", null);
exports.CommentsController = CommentsController = __decorate([
    (0, common_1.Controller)('comments'),
    __metadata("design:paramtypes", [comments_service_1.CommentsService,
        portfolio_service_1.PortfolioService])
], CommentsController);
//# sourceMappingURL=comments.controller.js.map