import pubsub from './pubsub';
import {parseToDOM, toArray, addEventListener} from './util'

class navitionBar {
    constructor(num) {
        // 路径数量
        this.num = num || 0;
        // 包裹层
        this.barWrap = parseToDOM(
        `<div style="
            position: absolute; 
            bottom: 6px;
        "></div>`
        )
        // 导航点
        this.point = parseToDOM(
        `<div style="
            width: 6px; 
            height: 6px; 
            margin-right: 7px; 
            border-radius: 50%;
            float: left; 
            background-color: #bebebe;
            cursor: pointer;
        "></div>`
        )
    }
    // 初始化该导航组件
    init() {
        const that = this;
        if (that.num) {
            for (let i = 0; i < that.num; i++) {
                let pointTemp = that.point.cloneNode(true);
                if (i === 0) {
                    pointTemp.style.backgroundColor = '#318DC5';
                }
                addEventListener(pointTemp, 'mouseover', function() {
                    // 发布消息，用户鼠标悬浮
                    pubsub.publish('hover', true);
                    // 发布消息，展示某个图
                    pubsub.publish('index', i + 1);
                    pubsub.publish('updateIndex', i+1);
                })
                that.barWrap.appendChild(pointTemp);
            }
        }
        return that.barWrap;
    }
    // 图片转换或用户选择时，转换导航点样式
    setPointStyle(index) {
        if (!index && index !== 0 || index < 0 || index > this.num + 1) return;
        if (index === this.num + 1) {
            // 遍历到末尾辅助dom时相当于第一个
            index = 1;
        }
        if (index === 0) {
            index = this.num
        }
        let nodes = toArray(this.barWrap.childNodes);
        nodes[index-1].style.backgroundColor = '#318DC5';
        for(let i = 0; i < this.num; i++) {
            if (i !== index-1) {
                nodes[i].style.backgroundColor = '#bebebe';
            }
        }
    }
    // 改变导航栏的位置：left，center，right
    setPosition(pos) {
        if (pos === 'left') {
            this.barWrap.style.left = '10px';
        } else if (pos === 'right') {
            this.barWrap.style.right = '10px';
        } else if (pos === 'center') {
            // TODO: 兼容ie8的居中，且考虑文档流的覆盖。
            this.barWrap.style.left = '50%';
            this.barWrap.style.transform = 'translateX(-50%)'
        } else {
            this.barWrap.style.right = '10px';
        }

    }
}

export default navitionBar;
