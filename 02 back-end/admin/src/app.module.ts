import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AdminController } from './admin.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [AuthModule, CommentsModule, PortfolioModule, UsersModule, PrismaModule, ArticlesModule],
  controllers: [AppController, AdminController],
  providers: [AppService],
})
export class AppModule {}
