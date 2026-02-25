import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res) {
    return res.redirect(303, '/src/pages/Home.html');
  }

  @Get('login')
  @Render('pages/Login')
  login() {
    return { 
      title: 'Login', 
      description: "Espace de connexion pour l'administration du portfolio artistique de Jean-Michel Conti." 
    };
  }
}
