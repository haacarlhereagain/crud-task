import { FastifyPluginCallback } from "fastify";
import { itemsController } from "../controllers";
import { PAGINATION_QUERY_STRING_SCHEMA } from "../constants";
import { IItem, IObjectSchema } from "../types";

const editRequestsSchema: { body: IObjectSchema<keyof IItem> } = {
    body: {
        type: 'object',
        properties: {
            id: {
                type: 'string'
            },
            count: {
                type: 'integer',
            },
            name: {
                type: 'string',
            },
            description: {
                type: 'string',
            },
            dateFrom: {
                type: 'string',
            },
            dateTo: {
                type: 'string',
            },
        },
        required: ['count', 'dateFrom', 'dateTo', 'description', 'name'],
    }
}

const getRequestsSchema: { querystring: IObjectSchema<keyof typeof PAGINATION_QUERY_STRING_SCHEMA['properties'] | 'search'> } = {
    querystring: {
        type: 'object',
        properties: {
            ...PAGINATION_QUERY_STRING_SCHEMA.properties,
            search: {
                type: 'string',
            },
        },
        required: PAGINATION_QUERY_STRING_SCHEMA.required,
    }
}

export const itemsRoutes: FastifyPluginCallback = async (fastify) => {
    fastify.get('/', { schema: getRequestsSchema }, itemsController.getItems)
    fastify.post('/', { schema: editRequestsSchema }, itemsController.addItem);
    fastify.delete('/:id/', itemsController.deleteItem);
    fastify.put('/:id/', { schema: editRequestsSchema }, itemsController.updateItem);
}