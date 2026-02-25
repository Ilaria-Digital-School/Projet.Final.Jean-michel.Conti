import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.article.findMany({
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
  }

  async findBySlug(slug: string) {
    return this.prisma.article.findUnique({
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
  }

  findOne(id: number) {
    return this.prisma.article.findUnique({
      where: { id },
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
  }

  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  create(data: { title: string; content: string; slug?: string }) {
    const slug = data.slug || this.generateSlug(data.title);
    return this.prisma.article.create({
      data: {
        ...data,
        slug,
      },
    });
  }

  update(id: number, data: { title?: string; content?: string }) {
    return this.prisma.article.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.article.delete({
      where: { id },
    });
  }
}
