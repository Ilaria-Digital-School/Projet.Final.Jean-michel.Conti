"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Début du seed...');
    const artist = await prisma.artist.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Jean-Michel Conti',
            bio: 'Artiste et designer créatif spécialisé dans le branding, le marketing digital, la photographie et le développement web.',
        },
    });
    console.log('✅ Artiste créé:', artist.name);
    const projects = [
        {
            titre: 'Branding Design',
            slug: 'branding-design',
            description: 'This project consisted of creating a complete visual identity for a client seeking a modern, distinctive, and memorable brand image.',
            content: 'The work included defining the logo, selecting color palettes, establishing typography rules, and designing brand assets. The focus was on clarity, coherence, and emotional impact to ensure the brand communicates its values effectively across all platforms.',
            annee: 2024,
            categorie: 'Branding',
            imageUrl: '/src/assets/images/Branding-design.jpg',
            artistId: artist.id,
        },
        {
            titre: 'Digital Marketing',
            slug: 'digital-marketing',
            description: 'This project consisted of designing and developing a modern, interactive website for a digital agency.',
            content: 'The goal was to highlight the agency\'s services through a clean design, structured sections, and smooth visual transitions. Built with Bootstrap 5 and JavaScript, the site offers a fully responsive layout, dynamic components, and optimized navigation to deliver a professional and immersive user experience.',
            annee: 2024,
            categorie: 'Marketing',
            imageUrl: '/src/assets/images/laptop-on-desk-with-branding-presentation.jpg',
            artistId: artist.id,
        },
        {
            titre: 'Photo Edition',
            slug: 'photo-edition',
            description: 'This project focused on transforming raw photographs into polished, professional-quality visuals.',
            content: 'The work involved retouching, color grading, lighting enhancement, and visual harmonization. The objective was to improve each image while preserving its authenticity, resulting in a cohesive set of enhanced visuals suitable for marketing, portfolio presentation, and digital publication.',
            annee: 2024,
            categorie: 'Photography',
            imageUrl: '/src/assets/images/edition-photo.jpg',
            artistId: artist.id,
        },
        {
            titre: 'Website Development',
            slug: 'website-development',
            description: 'This project consists of creating a modern and interactive portfolio website for a creative digital agency.',
            content: 'The objective was to design a clean, professional, and visually immersive interface that highlights the agency\'s services, achievements, and philosophy. The design emphasizes simplicity, balance, and usability, combining responsive layouts, smooth transitions, and structured sections to provide an engaging browsing experience on all devices.',
            annee: 2023,
            categorie: 'Development',
            imageUrl: '/src/assets/images/laptop-development.jpeg',
            artistId: artist.id,
        },
    ];
    for (const project of projects) {
        const artwork = await prisma.artwork.upsert({
            where: { slug: project.slug },
            update: project,
            create: project,
        });
        console.log('✅ Projet créé:', artwork.titre);
    }
    console.log('🎉 Seed terminé avec succès !');
}
main()
    .catch((e) => {
    console.error('❌ Erreur pendant le seed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map