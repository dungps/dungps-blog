import { IPost } from "../../../models/Post";
import localHttpClient from "../../helpers/LocalHttpClient";

interface IResponse<V> {
    success: boolean,
    data: V
}

export const getPosts = async (slug: string | null, callback: (err: Error | null, data: IPost[]) => void) => {
    const filter = {
        and: [
            {
                property: "Status",
                select: {
                    equals: "Draft"
                }
            }
        ]
    }

    try {
        const localClient = await localHttpClient.post<IResponse<IPost[] | string>>(
            "/api/notion/database",
            {
                filter,
                sorts: [
                    {
                        timestamp: "created_time",
                        direction: "ascending"
                    }
                ],
                page_size: 10
            }
        )

        callback(null, localClient.data.data as IPost[])
    } catch(err) {
        callback(err, [])
    }
}