import { VercelRequest, VercelResponse } from "@vercel/node"
import notionHttpClient from "../../src/helpers/NotionHttpClient"
import { getNotionPageProperties, getNotionPageTitle } from "../../src/helpers/NotionHelper"

interface NotionResponse {
    object: string,
    results: any[]
}

export default async (req: VercelRequest, res: VercelResponse) => {
    if (req.method.toLowerCase() !== "post") {
        return res.status(405)
    }

    const { id, ...body } = req.body

    if (!id) {
        return res.status(402).json({
            success: false,
            data: "Missing database id"
        })
    }

    try {
        const notionClient = await notionHttpClient.post<NotionResponse>(`/databases/${id}/query`, body)

        const parsedData: any = []
        for (const data of notionClient.data.results) {
            const newData: any = {
                ...data
            }

            newData.properties = getNotionPageProperties(data)
            newData.title = getNotionPageTitle(data)

            parsedData.push(newData)
        }

        return res.json({
            success: true,
            data: parsedData
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            data: err.message
        })
    }
}