import { monitorElementGeneration, monitorElementsGeneration, random } from './utils'
import { cityCodeMap } from './constants'

export default class AutoJob {
    constructor(config) {
        this.config = this._formatConfig(config)
    }

    _formatConfig(config) {
        const newConfig = {}

        if (![0, 1, 2].includes(config.mode)) {
            throw new TypeError('mode 的值必须是 0, 1, 2')
        }
        if (typeof config.city !== 'string') {
            throw new TypeError('city 类型必须是 string')
        }
        if (typeof config.keyword !== 'string') {
            throw new TypeError('keyword 类型必须是 string')
        }
        if (typeof config.message !== 'string') {
            throw new TypeError('message 类型必须是 string')
        }
        if (!config.message.length) {
            throw new TypeError('message 不能为空')
        }
        if (config.salary !== undefined) {
            if (typeof config.salary !== 'number' && !Array.isArray(config.salary)) {
                throw new TypeError('salary 类型必须是 number 或 array')
            }
            if (
                Array.isArray(config.salary) &&
                config.salary.length &&
                (typeof config.salary[0] !== 'number' || typeof config.salary[1] !== 'number')
            ) {
                throw new TypeError('salary 类型为数组时前两项必须是 number 类型')
            }
        }
        newConfig.mode = config.mode
        newConfig.city = config.city
        newConfig.keyword = config.keyword
        newConfig.otherPlace = !!config.otherPlace
        newConfig.excludeKeywords = Array.isArray(config.excludeKeywords) ? config.excludeKeywords : []
        newConfig.experience = Array.isArray(config.experience) ? config.experience : []
        newConfig.liveness = Array.isArray(config.liveness) ? config.liveness : []
        newConfig.excludes = Array.isArray(config.excludes) ? config.excludes : []
        newConfig.scale = Array.isArray(config.scale) ? config.scale : []
        newConfig.degree = Array.isArray(config.degree) ? config.degree : []
        newConfig.min = (typeof newConfig.min === 'number' ? newConfig.min : 3) * 1000
        newConfig.max = (typeof newConfig.max === 'number' ? newConfig.max : 6) * 1000
        newConfig.message = config.message
        newConfig.salary = config.salary ?? []

        return newConfig
    }

    start() {
        if (window.location.pathname === '/web/geek/job') { // 通过搜索框打开的 jobs
            this._traverseJob()
        } else if (window.location.pathname === '/web/geek/recommend') { // 推荐职位的 jobs
            this._traverseRecommend()
        }
        else if (window.location.pathname.indexOf('/job_detail') === 0) { // 详情页
            this._checkValidJob()
        } else if (window.location.pathname === '/web/geek/chat') { // 聊天页
            this._sayHello()
        }
        else {
            this._toJobs()
        }
    }

    /**
     * 首页操作
     * 1、打开推荐职位
     * 2、选择城市并所搜职位关键词
     */
    async _toJobs() {
        const { config } = this

        // 选择城市并所搜职位关键词
        if (config.mode === 0) {
            const nav = document.querySelector('.nav-city-box')
            const selected = nav.querySelector('.nav-city-selected')
            if (selected.innerText !== config.city) {
                nav.click()
                const section = await monitorElementGeneration('.city-group-section')
                const citys = section.querySelectorAll('a')
                const targetCity = Array.from(citys).find(city => city.innerText === config.city)
                if (window.location.pathname !== targetCity.pathname) {
                    targetCity.click()
                }
                return
            }
            // 填写职位关键词
            const form = document.querySelector('.search-form')
            const search = form.querySelector('.search-form-con > .ipt-wrap > input')
            search.value = config.keyword
            const button = form.querySelector('.btn-search')
            button.click()
        } else {
            // 打开推荐职位
            const recommend = await monitorElementGeneration('.merge-city-job-recommend')
            const moreBtn = recommend.querySelector('.common-tab-more > a')
            moreBtn.click()
        }
    }

    /**
     * 修正获取的 jobs 并逐个访问
     */
    async _traverseJob() {
        const { config } = this

        const url = new URL(window.location.href)
        const { searchParams } = url

        if (!searchParams.has('page')) {
            searchParams.append('page', 1)
        }
        const page = ~~searchParams.get('page')
        // 限制最多 10 页
        if (page > 10) return

        let isModify = false
        setSearchParams('city', cityCodeMap[config.city])
        setSearchParams('query', config.keyword)
        setSearchParams('experience', config.experience)
        setSearchParams('scale', config.scale)
        setSearchParams('degree', config.degree)
        if (Array.isArray(config.salary) && config.salary.length) {
            setSearchParams('salary', -40001)
            setSearchParams('lowSalary', config.salary[0])
            setSearchParams('highSalary', config.salary[1])
        } else {
            setSearchParams('salary', config.salary)
        }
        searchParams.set('page', page)
        if (isModify) {
            window.location.search = searchParams.toString()
            return
        }

        await this._traverse()

        searchParams.set('page', page + 1)
        window.location.search = searchParams.toString()

        function setSearchParams(key, value) {
            const oldValue = searchParams.get(key)
            if (oldValue == null || oldValue.toString() !== value.toString()) {
                searchParams.set(key, value)
                isModify = true
            }
        }
    }

    /**
     * 修正获取的 jobs 并逐个访问
     */
    async _traverseRecommend() {
        const { config } = this

        const url = new URL(window.location.href)
        const { searchParams } = url

        if (!searchParams.has('page')) {
            searchParams.append('page', 1)
        }
        const page = ~~searchParams.get('page')
        // 限制最多 30 页
        if (page > 30) return

        const cities = await monitorElementsGeneration('.system-search-condition .expect-list > .expect-item')
        const city = Array.from(cities).find(city => city.innerText.includes(config.city))
        if (!city) return

        city.click()

        const jobTabs = await monitorElementsGeneration('.user-jobs-area .job-tab > span')
        Array.from(jobTabs).find(tab => tab.innerText === (config.mode === 2 ? '最新职位' : '精选职位')).click()

        let isModify = false
        setSearchParams('scale', config.scale)
        setSearchParams('degree', config.degree)
        setSearchParams('experience', config.experience)
        const newUrl = new URL(window.location.href);
        const { searchParams: newSearchParams } = newUrl;
        searchParams.set('expectId', newSearchParams.get('expectId'));
        searchParams.set('sortType', newSearchParams.get('sortType'));
        if (Array.isArray(config.salary) && config.salary.length) {
            setSearchParams('salary', -40001)
            setSearchParams('lowSalary', config.salary[0])
            setSearchParams('highSalary', config.salary[1])
        } else {
            setSearchParams('salary', config.salary)
        }
        if (isModify) {
            window.location.search = searchParams.toString()
            return
        }

        await this._traverse()

        searchParams.set('page', page + 1)
        window.location.search = searchParams.toString()

        function setSearchParams(key, value) {
            const oldValue = searchParams.get(key)
            if (oldValue == null || oldValue.toString() !== value.toString()) {
                searchParams.set(key, value)
                isModify = true
            }
        }
    }

    /**
     * 遍历 jobs
     */
    async _traverse() {
        const { config } = this
        const box = await monitorElementGeneration('.job-list-box')
        const handlers = Array.from(box.querySelectorAll('.job-card-wrapper'))
            .filter(dom => {
                const isfriend = dom.querySelector('.job-card-left > .job-info > .start-chat-btn')
                const name = dom.querySelector('.job-card-right .company-name > a')
                const jobName = dom.querySelector('.job-card-left .job-name')
                // 过滤已沟通的职位
                return isfriend.innerText === '立即沟通' &&
                    // 排除的公司
                    !config.excludes.some(exclude => name.innerText.includes(exclude)) &&
                    // 是否接受外地职位
                    (config.otherPlace || !dom.querySelector('.job-card-left > .icon-other-place')) &&
                    // 职位名称匹配
                    jobName.innerText.includes(config.keyword) &&
                    // 职位名称排除关键词
                    !config.excludeKeywords.find(keyword => jobName.innerText.includes(keyword))
            })
            .map(dom => {
                return () => new Promise(resolve => {
                    setTimeout(() => {
                        dom.click()
                        resolve()
                    }, random(config.min, config.max))
                })
            })

        for (const handler of handlers) {
            await handler()
        }
    }

    /**
     * 检查 job 是否符合，符合则打招呼
     */
    async _checkValidJob() {
        const { config } = this
        const info = await monitorElementGeneration('.job-boss-info>.name')
        const liveness = info.querySelector('span')
        if (!liveness || (config.liveness.length && !config.liveness.includes(liveness.innerText))) {
            this._close()
            return
        }
        const commentBtn = await monitorElementGeneration('.job-banner .btn-container :nth-child(2)')
        if (commentBtn.dataset.isfriend === 'true') {
            this._close()
            return
        }
        commentBtn.click()
        const message = await monitorElementGeneration('.dialog-container>.dialog-con>.startchat-content .edit-area')
        const input = message.querySelector('.input-area')
        const send = message.querySelector('.send-message')
        const inputEv = new Event('input', { bubbles: true })
        inputEv.simulated = true
        input.value = config.message
        input.dispatchEvent(inputEv)

        setTimeout(() => {
            send.click()

            this._close()
        }, 1000)
    }

    /**
     * 点击立即沟通后有可能直接打开沟通页面，此时需要在当前页发招呼语
     */
    async _sayHello() {
        const content = await monitorElementGeneration('.chat-conversation>.message-content')
        const controls = await monitorElementGeneration('.chat-conversation>.message-controls')
        const mySelf = content.querySelectorAll('.chat-message .item-myself')
        // 如果有，说明该对话框发送过消息，视为已打过招呼，直接返回
        if (mySelf.length) {
            this._close()
            return
        }
        const input = controls.querySelector('.chat-editor #chat-input')
        const send = controls.querySelector('.chat-editor .btn-send')
        const inputEv = new Event('input', { bubbles: true })
        inputEv.simulated = true
        input.innerText = config.message
        input.dispatchEvent(inputEv)

        setTimeout(() => {
            send.click()

            this._close()
        }, 1000)
    }

    _close() {
        setTimeout(() => {
            window.close()
        }, 3000)
    }
}
