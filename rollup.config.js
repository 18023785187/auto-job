
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

    搜索框和推荐不能同时执行，如果两个都配置那么只执行推荐职位
*/
const config = {
    // 推荐职位配置，如果值不是对象将关闭通过推荐职位打招
    recommendConfig: {
        city: '深圳', // 目标城市，在求职意向中设置，如果没有求职意向中没有目标城市将不会自动打招呼
        isNew: true, // true 为最新职位，false 为精选职位
    },
    // 搜索框配置，如果值不是对象将关闭通过搜索框搜索职位打招呼功能
    searchConfig: {
        city: '深圳', // 目标城市
        keyword: '前端', // 职位关键词
    },
    otherPlace: false, // 是否接受外地职位
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