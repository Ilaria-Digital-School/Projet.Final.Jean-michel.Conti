import { Controller, Post, Body, Res, Get, Render, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @Render('pages/Login')
  async getLogin() {
    return { title: 'Connexion', description: 'Page de connexion administrateur' };
  }

  @Get('register')
  @Render('pages/Register')
  async getRegister() {
    return { title: 'Inscription', description: 'Page d\'inscription utilisateur' };
  }

  @Post('login')
  async login(@Body() body, @Res() res: Response) {
    try {
      const user = await this.authService.validateUser(body.email, body.password);
      const { token } = await this.authService.login(user);
      
      // Stockage du token dans un cookie
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: false, // Passer à true en production avec HTTPS
        sameSite: 'lax',
        maxAge: 3600000 // 1 heure
      });

      // Redirection vers la page d'accueil pour tous les utilisateurs
      return res.redirect(303, '/src/pages/Home.html');
    } catch (error) {
      return res.render('pages/Login', { 
        title: 'Connexion', 
        description: 'Page de connexion administrateur',
        error: error.message 
      });
    }
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    return res.redirect('/auth/login');
  }

  @Post('register')
  async register(@Body() body, @Res() res: Response) {
    try {
      await this.authService.register(body.email, body.password);
      return res.redirect('/auth/login');
    } catch (error) {
      return res.render('pages/Register', { 
        title: 'Inscription', 
        description: 'Page d\'inscription utilisateur',
        error: error.message 
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req) {
    return {
      userId: req.user.userId,
      role: req.user.role,
    };
  }
}
