import { IPost } from "../../models/Post";
import localHttpClient from "../../helpers/LocalHttpClient";
import { IDatabase } from "../../models/Database";

interface IResponse<V> {
    success: boolean,
    data: V
}

export const getPosts = async (nextCursor?: string | null): Promise<IDatabase | string> => {
    const body: any = {
        id: process.env.REACT_APP_NOTION_DATABASE_ID,
        filter: {
            and: [
                {
                    property: "Status",
                    select: {
                        equals: "Published"
                    }
                }
            ]
        },
        sorts: [
            {
                timestamp: "created_time",
                direction: "ascending"
            }
        ],
        page_size: 10,
    }

    if (nextCursor) {
        body.start_cursor = nextCursor
    }

    const response = await localHttpClient.post<IResponse<IDatabase | string>>(
        "/api/notion/database",
        body
    )

    return response.data.data
}