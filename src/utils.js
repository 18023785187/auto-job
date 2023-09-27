/**
 * 监听元素是否生成
 */
export async function monitorElementGeneration(selector) {
    return new Promise(resolve => {
        let el
        let timer = setInterval(() => {
            el = document.querySelector(selector)
            if(el) {
                resolve(el)
                clearInterval(timer)
            }
        }, 100)
    })
}

/**
 * 输入最大和最小正整数，在该范围内取随机数
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
export function random(min, max) {
    return (
        min + (Math.random() * (max - min))
    )
}