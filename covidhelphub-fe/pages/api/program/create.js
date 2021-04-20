import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req, res) {
  if (req.method === 'POST') {
    const { body } = req;
    const program = await prisma.program.create({ data: JSON.parse(body) });
    return res.json(program);
  }
  return { app_message: 'Error: method should be POST' }
}