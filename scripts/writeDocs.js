import fs from 'fs'
import path from 'path'
import { readFile } from './utils.js'

const template = createTemplate()

createDocs(
    replaceTemplate(template, readFile('./docs.md'))
)

function createTemplate() {
    return {
        config: readFile('./template/config.js'),
        time: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
    }
}

function replaceTemplate(template, text) {
    return text.replace(/\{\{(.*)\}\}/g, (_, match) => {
        return template[match.trim()]
    })
}

function createDocs(text) {
    fs.writeFileSync(
        path.resolve(process.cwd(), './README.md'),
        text
    )
}
