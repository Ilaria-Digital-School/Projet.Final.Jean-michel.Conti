import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Checking projects...');
  const slugs = ['branding-design', 'digital-marketing', 'photo-edition', 'website-development'];
  
  for (const slug of slugs) {
    const project = await prisma.artwork.findUnique({ where: { slug } });
    if (project) {
        console.log(`✅ Project found: ${slug} (ID: ${project.id})`);
    } else {
        console.error(`❌ Project NOT found: ${slug}`);
    }
  }

  console.log('\n💬 Testing comments...');
  const testSlug = 'branding-design';
  const project = await prisma.artwork.findUnique({ where: { slug: testSlug } });
  
  if (project) {
      // Create a test comment
      const comment = await prisma.comment.create({
          data: {
              content: 'Test comment from verification script',
              artworkId: project.id,
              // Assuming you have a user or admin to link, or allowing anonymous if schema permits nullable
              // Schema says userId, adminId, artistId are nullable.
          }
      });
      console.log(`✅ Comment created with ID: ${comment.id}`);

      // Fetch comments
      const comments = await prisma.comment.findMany({
          where: { artworkId: project.id },
          orderBy: { createdAt: 'desc' }
      });
      console.log(`✅ Fetched ${comments.length} comments for ${testSlug}`);
      console.log('Latest comment:', comments[0].content);
      
      // Cleanup
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
