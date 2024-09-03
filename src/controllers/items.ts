import { FastifyReply, FastifyRequest } from "fastify";
import { ItemModel } from "../models";
import { parsePaginationQueries } from "../utils";
import { IItem, IPagination } from "../types";

export const getItems = async (request: FastifyRequest<{ Querystring: IPagination & { search?: string } }>, reply: FastifyReply): Promise<void> => {
    const { skip, limit } = parsePaginationQueries(request.query);
    const items = await ItemModel.find({
        $or: [
            { name: { $regex: request.query?.search || '', $options: 'i' } },
            { description: { $regex: request.query?.search || '', $options: 'i' } },
        ]
    }).skip(skip).limit(limit);
    reply
        .header('Content-Type', 'application/json;charset=utf-8')
        .send(items)
}

export const addItem = async (request: FastifyRequest<{ Body: IItem }>, reply: FastifyReply): Promise<void> => {    
    await ItemModel.validate(request.body);
    const itemCreated = await ItemModel.create(request.body)
    reply
        .header('Content-Type', 'application/json;charset=utf-8')
        .send(itemCreated)
}

export const deleteItem = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> => {
    const id = request.params.id;
    const item = await ItemModel.findById(id);
    if (!item) {
        reply.status(404);
        return;
    }
    await ItemModel.findByIdAndDelete(id);
    reply
        .header('Content-Type', 'application/json;charset=utf-8')
        .send(id);
}

export const updateItem = async (request: FastifyRequest<{ Body: IItem, Params: { id: string } }>, reply: FastifyReply): Promise<void> => {
    await ItemModel.validate(request.body);
    const id = request.params.id;
    const item = await ItemModel.findById(id);
    if (!item) {
        reply.status(404);
        return;
    }
    const itemUpdated = await ItemModel.findByIdAndUpdate(id, item);
    reply
        .header('Content-Type', 'application/json;charset=utf-8')
        .send(itemUpdated);
}