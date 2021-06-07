import { IPost } from "./Post";

export interface IDatabase {
    object: string,
    results: IPost[],
    next_cursor: string | null,
    has_more: boolean
}