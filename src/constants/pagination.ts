import { IObjectSchema } from "../types";

export const PAGINATION_QUERY_STRING_SCHEMA = Object.freeze<IObjectSchema<'limit' | 'offset'>>({
    type: 'object',
    properties: {
        limit: { type: 'integer' },
        offset: { type: 'integer' },
    },
    required: ['limit', 'offset'],
})