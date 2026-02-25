"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('--- ADMINS ---');
    const admins = await prisma.admin.findMany();
    admins.forEach(a => console.log(`Email: ${a.email}`));
    console.log('\n--- USERS ---');
    const users = await prisma.user.findMany();
    users.forEach(u => console.log(`Email: ${u.email}`));
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=list-users.js.map