import { FastifyReply, FastifyRequest } from "fastify";
import { ItemModel } from "../models";
import { parsePaginationQueries } from "../utils";
import { IItem, IPagination } from "../types";

export const getItems = async (request: FastifyRequest<{ Querystring: IPagination & { search?: string } }>, reply: FastifyReply): Promise<void> => {
    const { skip, limit } = parsePaginationQueries(request.query);
    const items = await ItemModel(request.server).find({
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
    const item = ItemModel(request.server);
    await item.validate(request.body);
    const itemCreated = await item.create(request.body)
    reply
        .header('Content-Type', 'application/json;charset=utf-8')
        .send(itemCreated)
}

export const deleteItem = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> => {
    const item = ItemModel(request.server);
    const id = request.params.id;
    const item_ = await item.findById(id);
    if (!item_) {
        reply.status(404);
        return;
    }
    await item.findByIdAndDelete(id);
    reply
        .header('Content-Type', 'application/json;charset=utf-8')
        .send(id);
}

export const updateItem = async (request: FastifyRequest<{ Body: IItem, Params: { id: string } }>, reply: FastifyReply): Promise<void> => {
    const item = ItemModel(request.server);
    await item.validate(request.body);
    const id = request.params.id;
    const item_ = await item.findById(id);
    if (!item_) {
        reply.status(404);
        return;
    }
    const itemUpdated = await item.findByIdAndUpdate(id, item_);
    reply
        .header('Content-Type', 'application/json;charset=utf-8')
        .send(itemUpdated);
}