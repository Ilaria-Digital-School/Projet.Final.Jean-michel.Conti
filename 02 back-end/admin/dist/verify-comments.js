"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🔍 Checking projects...');
    const slugs = ['branding-design', 'digital-marketing', 'photo-edition', 'website-development'];
    for (const slug of slugs) {
        const project = await prisma.artwork.findUnique({ where: { slug } });
        if (project) {
            console.log(`✅ Project found: ${slug} (ID: ${project.id})`);
        }
        else {
            console.error(`❌ Project NOT found: ${slug}`);
        }
    }
    console.log('\n💬 Testing comments...');
    const testSlug = 'branding-design';
    const project = await prisma.artwork.findUnique({ where: { slug: testSlug } });
    if (project) {
        const comment = await prisma.comment.create({
            data: {
                content: 'Test comment from verification script',
                artworkId: project.id,
            }
        });
        console.log(`✅ Comment created with ID: ${comment.id}`);
        const comments = await prisma.comment.findMany({
            where: { artworkId: project.id },
            orderBy: { createdAt: 'desc' }
        });
        console.log(`✅ Fetched ${comments.length} comments for ${testSlug}`);
        console.log('Latest comment:', comments[0].content);
        await prisma.comment.delete({ where: { id: comment.id } });
        console.log('✅ Test comment deleted');
    }
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=verify-comments.js.map