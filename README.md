# Auto Job

boss直聘自动打招呼油猴脚本

#### 使用

1. 安装 [Tampermonkey](https://www.tampermonkey.net/)
2. 前往 [Greasy Fork](https://greasyfork.org/zh-CN) 下载 [插件](https://greasyfork.org/zh-CN/scripts/476171-boss%E7%9B%B4%E8%81%98%E8%87%AA%E5%8A%A8%E6%89%93%E6%8B%9B%E5%91%BC)
3. 先关闭脚本，打开 Boss直聘，登录 Boss直聘，然后配置好脚本参数（参数在源码中修改），运行脚本


#### 配置参数

```javascript
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
    excludes: ['德科'], // 要排除的公司名
    min: 3, // 每次访问的最小间隔，防止操作过快被系统判定为机器人
    max: 6, // 每次访问的最大间隔，防止操作过快被系统判定为机器人
    message: '您好，我正在找前端开发的工作，希望有机会与贵司进一步交流', // 打招呼语
}
```