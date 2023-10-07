# Auto Job

boss直聘自动打招呼油猴脚本

支持以搜索框或推荐职位作为打招呼入口

#### 使用

1. 安装 [Tampermonkey](https://www.tampermonkey.net/)
2. 前往 [Greasy Fork](https://greasyfork.org/zh-CN) 下载 [插件](https://greasyfork.org/zh-CN/scripts/476171-boss%E7%9B%B4%E8%81%98%E8%87%AA%E5%8A%A8%E6%89%93%E6%8B%9B%E5%91%BC)
3. 先关闭脚本，打开 Boss直聘，登录 Boss直聘，然后配置好脚本参数（参数在源码中修改），运行脚本


#### 配置参数

```javascript
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
```

#### 注意

使用脚本前请先关闭Boss直聘中的自动打招呼语

![](https://greasyfork.s3.us-east-2.amazonaws.com/ttbfb6sarov72xkcgsty5pm4cs3e)
