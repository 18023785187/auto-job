# Auto Job

boss直聘自动打招呼油猴脚本

支持以 *搜索框* 或 *推荐职位* 作为打招呼入口

#### 原理

模拟用户点击行为，查找符合的职位自动打招呼，通过设置时间间隔来避免被系统判定为机器人，安全可靠

*截止至 {{ time }} 仍可正常使用*
*由于boss直聘网页已更新，页面布局有变更，目前只有mode为0时才能正常使用，后续有时间会修复mode为1或2时不可用的问题*

#### 使用

1. 安装 [Tampermonkey](https://www.tampermonkey.net/)
2. 前往 [Greasy Fork](https://greasyfork.org/zh-CN) 下载 [插件](https://greasyfork.org/zh-CN/scripts/476171-boss%E7%9B%B4%E8%81%98%E8%87%AA%E5%8A%A8%E6%89%93%E6%8B%9B%E5%91%BC)
3. 先关闭脚本，打开 Boss直聘，登录 Boss直聘，然后配置好脚本参数（参数在源码中修改），运行脚本


#### 配置参数

```javascript
{{ config }}
```

#### 注意

使用脚本前请先关闭Boss直聘中的自动打招呼语

![](https://greasyfork.s3.us-east-2.amazonaws.com/ttbfb6sarov72xkcgsty5pm4cs3e)

