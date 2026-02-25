import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import {join} from 'path';
import helmet from 'helmet';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(helmet({
    contentSecurityPolicy: false, 
  }));
  app.use(compression());
  
  // Sesion
  app.use(session({
    secret: 'superSecretKey',
    resave: false,
    saveUninitialized: false
  }))

  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());

  // Dossier des views
  app.setBaseViewsDir(join(process.cwd(),'views'));
  app.setViewEngine('ejs');


  // Configuration EJS
  // app.set('view options', { delimiter: '$' });
  
  app.useStaticAssets(join(process.cwd(), '../../01 front-end'));
  await app.listen(process.env.PORT || 3900);
}
bootstrap();

