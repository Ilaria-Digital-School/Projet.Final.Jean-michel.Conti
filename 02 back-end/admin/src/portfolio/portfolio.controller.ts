import { Controller, Get, Param, Res, Post, Body } from "@nestjs/common";
import { PortfolioService } from "./portfolio.service";

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  async getAll(@Res() res) {
    const projects = await this.portfolioService.findAll();
    return res.render('pages/Portfolio', { 
      title: 'Portfolio',
      projects, 
      currentProject: null,
      description: 
      "Explorez la galerie complète des projets de Jean-Michel Conti : branding, marketing, édition photo et création de sites web."
    });
  }

  @Get(':slug')
  async getOne(@Param('slug') slug: string, @Res() res) {
    const project = await this.portfolioService.findBySlug(slug);
    
    if (!project) {
      return res.status(404).render('pages/404', {
        title: 'Projet non trouvé',
        description: 'Le projet demandé n\'existe pas.'
      });
    }

    // Mapping slug vers template EJS
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
      artworkId: project.id,  // Pour les commentaires
      description: project.description
    });
  }

  @Get('api/:slug')
  async getApiOne(@Param('slug') slug: string) {
    const project = await this.portfolioService.findBySlug(slug);
    if (!project) return { error: 'Project not found' };
    return project;
  }

  @Post()
  async create(@Body() body: any, @Res() res) {
    await this.portfolioService.create(body);
    return res.redirect('/admin/portfolio');
  }
}
