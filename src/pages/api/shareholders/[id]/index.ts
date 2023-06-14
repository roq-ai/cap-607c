import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { shareholderValidationSchema } from 'validationSchema/shareholders';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.shareholder
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getShareholderById();
    case 'PUT':
      return updateShareholderById();
    case 'DELETE':
      return deleteShareholderById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getShareholderById() {
    const data = await prisma.shareholder.findFirst(convertQueryToPrismaUtil(req.query, 'shareholder'));
    return res.status(200).json(data);
  }

  async function updateShareholderById() {
    await shareholderValidationSchema.validate(req.body);
    const data = await prisma.shareholder.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteShareholderById() {
    const data = await prisma.shareholder.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
