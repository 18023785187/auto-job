import { createRequire } from 'module'
import { readFile } from './utils.js'

const require = createRequire(import.meta.url)
const pkg = require('../package.json')

const banner = 
`// ==UserScript==
// @name         boss直聘自动打招呼
// @namespace    ${pkg.homepage}
// @version      ${pkg.version}
// @description  ${pkg.description}
// @author       ${pkg.author}
// @match        *://www.zhipin.com/*
// @icon         none
// @grant        none
// @license      ${pkg.license}
// ==/UserScript==

${readFile('./template/config.js')}
`

export default banner
