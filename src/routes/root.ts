import { FastifyPluginAsync } from 'fastify';
import { itemsRoutes } from './items';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(itemsRoutes, { prefix: '/api/items' });
}

export default root;
