import type { Model, ModelStatic} from "sequelize-typescript";

export interface PaginationResult<T>{
    totalItems: number;
    data: T[];
    totalPages: number,
    currentPage: number;
}

 export const getPagingData = <T extends Model>(
    data: { count: number; rows: T[]},
    page: number,
    limit: number
 ) : PaginationResult<T> => {
    const { count: totalItems, rows: dataList} = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);

    return {
        totalItems,
        data: dataList,
        totalPages,
        currentPage
    }
 }

 export const getPaginationOptions = (page: number, size: number) => {
    const limit = size ? +size : 10;
    const offset = page ? (page - 1) * limit : 0;
    return { limit, offset }
 }