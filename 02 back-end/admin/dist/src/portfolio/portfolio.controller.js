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
exports.PortfolioController = void 0;
const common_1 = require("@nestjs/common");
const portfolio_service_1 = require("./portfolio.service");
let PortfolioController = class PortfolioController {
    portfolioService;
    constructor(portfolioService) {
        this.portfolioService = portfolioService;
    }
    async getAll(res) {
        const projects = await this.portfolioService.findAll();
        return res.render('pages/Portfolio', {
            title: 'Portfolio',
            projects,
            currentProject: null,
            description: "Explorez la galerie complète des projets de Jean-Michel Conti : branding, marketing, édition photo et création de sites web."
        });
    }
    async getOne(slug, res) {
        const project = await this.portfolioService.findBySlug(slug);
        if (!project) {
            return res.status(404).render('pages/404', {
                title: 'Projet non trouvé',
                description: 'Le projet demandé n\'existe pas.'
            });
        }
        const pageMapping = {
            'branding-design': 'pages/Project-Branding',
            'digital-marketing': 'pages/Project-Marketing',
            'photo-edition': 'pages/Project-Photo-Edition',
            'website-development': 'pages/Project-Website',
        };
        const templateName = pageMapping[slug] || 'pages/Portfolio';
        return res.render(templateName, {
            title: `Project: ${project.titre}`,
            project,
            artworkId: project.id,
            description: project.description
        });
    }
    async getApiOne(slug) {
        const project = await this.portfolioService.findBySlug(slug);
        if (!project)
            return { error: 'Project not found' };
        return project;
    }
    async create(body, res) {
        await this.portfolioService.create(body);
        return res.redirect('/admin/portfolio');
    }
};
exports.PortfolioController = PortfolioController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)('api/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getApiOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "create", null);
exports.PortfolioController = PortfolioController = __decorate([
    (0, common_1.Controller)('portfolio'),
    __metadata("design:paramtypes", [portfolio_service_1.PortfolioService])
], PortfolioController);
//# sourceMappingURL=portfolio.controller.js.map