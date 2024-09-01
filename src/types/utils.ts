import { ObjectSchema, Schema } from "fast-json-stringify";

export interface IObjectSchema<T extends string = string> extends ObjectSchema {
    type: 'object';
    properties: Record<T, Schema>;
    required: T[];
}