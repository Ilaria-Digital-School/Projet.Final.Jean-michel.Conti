import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const artworks = await this.prisma.artwork.findMany({
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
    return artworks.map(art => ({
      ...art,
      title: art.titre,
      description: art.description,
      content: art.content
    }));
  }

  async findBySlug(slug: string) {
    const artwork = await this.prisma.artwork.findUnique({
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
    
    if (!artwork) return null;

    return {
      ...artwork,
      title: artwork.titre,
      description: artwork.description,
      content: artwork.content
    };
  }

  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .normalize('NFD') // Supprime les accents
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9 -]/g, '') // Supprime les caractères spéciaux
      .replace(/\s+/g, '-') // Remplace les espaces par des tirets
      .replace(/-+/g, '-'); // Évite les tirets doubles
  }

  async create(data: any) {
    const title = data.titre || data.title;
    const slug = data.slug || this.generateSlug(title);
    
    return this.prisma.artwork.create({
      data: {
        titre: title,
        slug: slug,
        annee: parseInt(data.annee),
        categorie: data.categorie,
        imageUrl: data.imageUrl || '',
        description: data.description || '',
        content: data.content || '',
        artistId: parseInt(data.artistId) || 1
      },
    });
  }
}
