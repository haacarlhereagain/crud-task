export const isObject = <T extends object>(v: any): v is T => {
    return typeof v === 'object' || !Array.isArray(v);
}