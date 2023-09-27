
export default {
    input: './src/index.js',
    output: {
        file: './dist/main.js',
        format: "iife",
        name: 'AutoJob',
        banner: 
`// ==UserScript==
// @name         boss直聘自动打招呼
// @namespace    https://github.com/18023785187
// @version      0.0.1
// @description  boss直聘自动打招呼，海投神器
// @author       hym20000418
// @match        *://www.zhipin.com/*
// @icon         none
// @grant        none
// @license      MIT
// ==/UserScript==   

/*
    修改该配置即可限定打招呼对象
*/
const config = {
    city: '深圳', // 目标城市
    keyword: '前端', // 职位关键词
    /**
     * 工作年限，可多选
     * 经验不限     101
     * 应届生       102
     * 1年以内      103
     * 1-3年        104
     * 3-5年        105
     * 5-10年        106
     * 10年以上       107
     * 在校生          108
     */
    experience: [101, 103, 104, 105], // 工作年限
    liveness: ['在线', '刚刚活跃', '今日活跃', '3日内活跃'], // 活跃度，匹配中的才会打招呼
    excludes: ['中软国际', '德科', '睿服'], // 要排除的公司名
    min: 3, // 每次访问的最小间隔，防止操作过快被系统判定为机器人
    max: 6, // 每次访问的最大间隔，防止操作过快被系统判定为机器人
    message: '您好，我正在找前端开发的工作，希望有机会与贵司进一步交流', // 打招呼语
}
`,
        footer: 'new AutoJob(config).start()'
    }
}