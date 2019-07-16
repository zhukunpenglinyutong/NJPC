let data = [
    {name: '朱昆鹏1', src: './src/img/1.png', des: '前端工程师1', sex: 'man'},
    {name: '朱昆鹏2', src: './src/img/1.png', des: '前端工程师2', sex: 'man'},
    {name: '朱昆鹏3', src: './src/img/1.png', des: '前端工程师3', sex: 'man'},
    {name: '朱昆鹏4', src: './src/img/1.png', des: '前端工程师4', sex: 'man'},
    {name: '林雨桐', src: './src/img/1.png', des: '前端工程师5', sex: 'woman'}
]

let filterStr = 'All'

/**
 * 根据数据生成 li标签
 * @param {Object} DOM对象（ul）
 * @param {Array} 数据数组
 */
function createliEles (dom, data) {

    // 生成 li 的 HTML结构
    let liStrs = ''
    data.forEach( item => {
        liStrs += `<li>
            <img src="${item.src}" alt="">
            <p class="name">${item.name}</p>
            <p class="des">${item.des}</p>
        </li>
        `
    })

    dom.innerHTML = liStrs
}


/**
 * 搜索筛选函数
 * 
 * @param {String} 搜索筛选传过来的字段
 * @returns {Array} 筛选之后的数组
 */

function searchFilter (inp) {
    return data.filter( item => {
        return new RegExp(`${inp}`, 'g').test(item.name) && (filterStr === 'All' || item.sex === filterStr)
    })
}


/**
 * 防抖函数（工具类）
 * 
 * @param {Function} 需要进行防抖处理的函数
 * @param {Number} 节流秒数
 */
function debounce(fn, num) {
    let timeout = null; // 创建一个标记用来存放定时器的返回值
    return function () {
      clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
      timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
        fn.apply(this, arguments);
      }, num);
    };
}


/**
 * 初始化函数
 */
function init () {
    window.input = document.querySelector('.sText')
    window.ulDom = document.querySelector('.flWrapper ul')
    createliEles(ulDom, data) // 加载DOM节点
}

init () // 启动


// ==============||| 事件处理 |||==============

/**
 * input 事件监听事件，自动筛选
 */
input.addEventListener('input', debounce( event => {
    let data = searchFilter(event.target.value)
    createliEles(ulDom, data)
}, 300))

/**
 * 鼠标点击切换事件（事件冒泡最好，现在是注册了三个事件）
 */
let btns = document.querySelectorAll('.btn')
btns.forEach( item => {

    item.addEventListener('click', event => {
        
        btns.forEach( item => item.className = 'btn') // 清空其他的，但是感觉这个做法不是最好

        event.target.className = 'btn active'
        filterStr = event.target.innerText

        let data = searchFilter(input.value)
        createliEles(ulDom, data)
    })
})


// 选择器：https://blog.csdn.net/major_zhang/article/details/78118823