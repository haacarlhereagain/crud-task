import { FastifyInstance } from 'fastify';
import mongoose from 'mongoose';
import { IItem } from '../types';

export const itemSchema = new mongoose.Schema<IItem>({
    name: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String
    },
    dateFrom: {
        required: true,
        type: Date,
    },
    dateTo: {
        required: true,
        type: Date,
    },
    count: {
        required: true,
        type: Number,
    },
}, {
    toJSON: {
        virtuals: true,
        transform(doc, ret) {
            delete ret._id;
        },
    },
    toObject: {
        virtuals: true,
        transform(doc, ret) {
            delete ret._id;
        },
    },
    id: true,
    versionKey: false,
})

export const ItemModel = (fastify: FastifyInstance) => mongoose.model('item', itemSchema, 'items');