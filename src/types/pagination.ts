export interface IPagination {
    offset: number;
    limit: number;
}

export interface IPaginationFormatted {
    limit: number;
    skip: number;
}