import HttpClient from "../abstracts/HttpClient";

const { NOTION_API_TOKEN, NOTION_API_URL = "" } = process.env

class NotionHttpClient extends HttpClient {
    private static classInstance?: NotionHttpClient

    private constructor() {
        super(
            NOTION_API_URL,
            { Authorization: `Bearer ${NOTION_API_TOKEN}` },
            { responseType: "json" }
        )
    }

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new NotionHttpClient()
        }

        return this.classInstance
    }
}

const notionHttpClient = NotionHttpClient.getInstance()

export default notionHttpClient