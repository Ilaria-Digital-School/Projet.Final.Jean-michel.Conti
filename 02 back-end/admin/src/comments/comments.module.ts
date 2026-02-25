// Importation des modules NestJS nécessaires
import { Module } from "@nestjs/common";
// Importation du contrôleur de commentaires
import { CommentsController } from "./comments.controller";
// Importation du service de commentaires
import { CommentsService } from "./comments.service";
// Importation du module Prisma pour l'accès à la base de données
import { PrismaModule } from "../prisma/prisma.module";
import { PortfolioModule } from "src/portfolio/portfolio.module";

@Module({
    // Déclaration du contrôleur pour gérer les requêtes HTTP
    controllers: [CommentsController],
    // Déclaration du service pour la logique métier
    providers: [CommentsService],
    // Importation des modules nécessaires (Prisma pour la BDD)
    imports: [PrismaModule, PortfolioModule],
    exports: [CommentsService],
})
// Exportation du module pour être utilisé dans d'autres modules
export class CommentsModule {}