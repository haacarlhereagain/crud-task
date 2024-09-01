import { FastifyRequestType } from "fastify/types/type-provider";
import { IPagination, IPaginationFormatted } from "../types";
import { buildError } from "./errors"
import { isObject } from "./object";

export const parsePaginationQueries = (queries: FastifyRequestType['query']): IPaginationFormatted => {
    if (!isObject<IPagination>(queries)) {
        throw Error(buildError(['queries are not an object']));
    }
    const errorList: string[] = [];
    queries.limit === undefined && errorList.push('Limit in not defined');
    typeof queries.limit !== 'number' && errorList.push('The type of limit is not a number');
    queries.offset === undefined && errorList.push('Offset in not defined');
    typeof queries.offset !== 'number' && errorList.push('The type of limit is not a number');
    if (errorList.length) {
        throw Error(errorList.join(', '));
    }
    return {
        limit: queries.limit,
        skip: queries.offset,
    }
}