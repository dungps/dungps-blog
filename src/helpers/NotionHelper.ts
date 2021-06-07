import { pipeExtend } from "or-pipets"

const EOL_MD = "\n"

type ICallBack = (data: any) => any

const pick = (key: any) => (obj: any) => obj[key]

const ifTrue = (predicate: ICallBack, transformer: ICallBack, orElse: ICallBack) => (data: any): any => predicate(data) ? transformer(data) : orElse(data)

const id = (x: string) => x

const annotateEquation = ifTrue(
	pick("equation"),
	({ content }) => ({ content: `$${content}$` }),
	id,
)

const annotateBold = ifTrue(pick("bold"), ({ content }) => ({ content: `**${content}**` }), id)
const annotateItalic = ifTrue(pick("italic"), ({ content }) => ({ content: `_${content}_` }), id)
const annotateCode = ifTrue(pick("code"), ({ content }) => ({ content: `\`${content}\`` }), id)
const annotateStrikethrough = ifTrue(
	pick("strikethrough"),
	({ content }) => ({ content: `~~${content}~~` }),
	id,
)
const annotateUnderline = ifTrue(
	pick("underline"),
	({ content }) => ({ content: `<u>${content}</u>` }),
	id,
)
const annotateColor = ifTrue(
	({ color }) => color != "default",
	({ content, color }) => ({ content: `<span notion-color="${color}">${content}</span>` }),
	id,
)
const annotateLink = ifTrue(
	pick("link"),
	({ content, link }) => ({ content: `[${content}](${link.url ? link.url : link})` }),
	id,
)

const stylize: any = pipeExtend(annotateBold)
	.pipeExtend(annotateItalic)
	.pipeExtend(annotateCode)
	.pipeExtend(annotateStrikethrough)
	.pipeExtend(annotateUnderline)
	.pipeExtend(annotateColor)
	.pipeExtend(annotateLink)
	.pipeExtend(annotateEquation)

const blockToString = (textBlocks: any): string =>
	textBlocks.reduce((text: any, textBlock: any) => {
		const data: any = {
			...textBlock.text,
			...textBlock.annotations
		}

		if (textBlock.type === "equation") {
			data.content = textBlock.equation.expression
			data.equation = true
		}

		if (textBlock.mention && textBlock.mention.type === "date") {
			if (textBlock.mention.date.end) {
				data.content = `${textBlock.mention.date.start} → ${textBlock.mention.date.start}`
			} else {
				data.content = textBlock.mention.date.start
			}

			data.content = `<time datetime="${data.content}">${data.content}</time>`
		}

		if (textBlock.mention && textBlock.mention.type == "page") {
			data.content = textBlock.plain_text
		}

		return text.concat(stylize.process(data).content)
	}, "")

export const getNotionPageProperties = (page: any) =>
	Object.keys(page.properties).reduce((acc, key) => {
		if (page.properties[key].type == "title") {
			return acc
		}

		if (page.properties[key].type == "rich_text") {
			page.properties[key].rich_text = blockToString(page.properties[key].rich_text)
		}

		return {
			...acc,
			[key]: {
				id: page.properties[key].id,
				key,
				value: page.properties[key][page.properties[key].type],
				type: page.properties[key].type,
			},
		}
	}, {})

export const getNotionPageTitle = (page: any) => {
	const titleProperty: any = Object.keys(page.properties).find(
		(key) => page.properties[key].type == "title",
	)

	return blockToString(page.properties[titleProperty].title)
}

export const notionBlockToMarkdown = (block: any, lowerTitleLevel: any, depth = 0) => {
	console.log(block)
	return block.reduce((acc: any, childBlock: any) => {
		let childBlocksString = ""

		if (childBlock.has_children) {
			childBlocksString = " "
				.repeat(depth)
				.concat(childBlocksString)
				.concat(notionBlockToMarkdown(childBlocksString, lowerTitleLevel, depth))
				.concat(EOL_MD)
		}

		if (childBlock.type === "paragraph") {
			const p = blockToString(childBlock.paragraph.text)

			const isTableRow = p.startsWith("|") && p.endsWith("|")

			const isCodeSnippetLine =
				block.paragraph &&
				block.paragraph.text &&
				block.paragraph.text[0] &&
				block.paragraph.text[0].plain_text &&
				block.paragraph.text[0].plain_text.startsWith("```")

			return acc
				.concat(p)
				.concat(isTableRow || isCodeSnippetLine ? EOL_MD : EOL_MD.concat(EOL_MD))
				.concat(childBlocksString)
		}

		if (childBlock.type.startsWith("heading_")) {
			const headingLevel = Number(childBlock.type.split("_")[1])

			return acc
				.concat(EOL_MD)
				.concat(lowerTitleLevel ? "#" : "")
				.concat("#".repeat(headingLevel))
				.concat(" ")
				.concat(blockToString(childBlock[childBlock.type].text))
				.concat(EOL_MD)
				.concat(childBlocksString)
		}

		if (childBlock.type == "to_do") {
			return acc
				.concat(`- [${childBlock.to_do.checked ? "x" : " "}] `)
				.concat(blockToString(childBlock.to_do.text))
				.concat(EOL_MD)
				.concat(childBlocksString)
		}

		if (childBlock.type == "bulleted_list_item") {
			return acc
				.concat("* ")
				.concat(blockToString(childBlock.bulleted_list_item.text))
				.concat(EOL_MD)
				.concat(childBlocksString)
		}

		if (childBlock.type == "numbered_list_item") {
			return acc
				.concat("1. ")
				.concat(blockToString(childBlock.numbered_list_item.text))
				.concat(EOL_MD)
				.concat(childBlocksString)
		}

		if (childBlock.type == "toggle") {
			return acc
				.concat("<details><summary>")
				.concat(blockToString(childBlock.toggle.text))
				.concat("</summary>")
				.concat(childBlocksString)
				.concat("</details>")
		}

		if (childBlock.type == "unsupported") {
			return acc
				.concat(`<!-- This block is not supported by Notion API yet. -->`)
				.concat(EOL_MD)
				.concat(childBlocksString)
		}

		return acc
	}, "")
}