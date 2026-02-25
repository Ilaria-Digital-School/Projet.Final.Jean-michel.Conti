import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { PortfolioService } from './portfolio/portfolio.service';
import { ArticlesService } from './articles/articles.service';
import { CommentsService } from './comments/comments.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Roles } from './auth/roles.decorator';
import { Role } from './auth/roles.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly portfolioService: PortfolioService,
    private readonly articlesService: ArticlesService,
    private readonly commentsService: CommentsService,
  ) {}
  
  @Get('dashboard')
  @Render('admin/dashboard')
  async getDashboard() {
    const projects = await this.portfolioService.findAll();
    const articles = await this.articlesService.findAll();

    return { 
      title: 'Admin Dashboard',
      description: 'Gérez vos projets et articles depuis cet espace.',
      stats: {
        projectsCount: projects.length,
        articlesCount: articles.length
      }
    };
  }

  @Get('portfolio')
  @Render('admin/portfolio')
  async getPortfolio() {
    const projects = await this.portfolioService.findAll();
    return { 
      title: 'Gestion Portfolio',
      description: 'Ajoutez, modifiez ou supprimez des projets du portfolio.',
      projects
    };
  }

  @Get('articles')
  @Render('admin/articles')
  async getArticles() {
    const articles = await this.articlesService.findAll();
    return { 
      title: 'Gestion Articles',
      description: 'Gérez vos articles de blog et actualités.',
      articles
    };
  }

  @Get('comments')
  @Render('admin/comments')
  async getComments() {
    const comments = await this.commentsService.findAll();
    return { 
      title: 'Modération des Commentaires',
      comments
    };
  }
}
