import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req, res ) {
  if (req.method === 'GET') {
    const programs = await prisma.program.findMany();
    return res.json( programs );
  }
  return { app_message: 'Error: method should be GET' }
}