import { VercelRequest, VercelResponse } from "@vercel/node"

export default async (_req: VercelRequest, res: VercelResponse) => {
    res.json({
        success: true,
        data: []
    })
}