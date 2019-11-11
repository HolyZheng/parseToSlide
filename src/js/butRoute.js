import {parseToDOM, addEventListener} from './util';
import pubsub from './pubsub';

class butRoute {
    constructor(num) {
        // 高度与宽度相同，且宽度自适应。（padding的百分比是参照父元素的宽度）
        this.butRoute = parseToDOM(
            `<div style="
                position: absolute;
                width: 26px;
                height: 26px;
                opacity: 0.6;
                font-size: 20px;
                text-align: center;
                color: #6d6868;
                border-radius: 50%;
            "></div>`);
        this.num = num;
    }
    init() {
        const that = this;
        that.butRouteLast = that.butRoute.cloneNode(true);
        that.butRouteNext = that.butRoute.cloneNode(true);
        that.setColorEvent(that.butRouteLast);
        that.setColorEvent(that.butRouteNext);
        that.butRouteLast.style.top = '45%';
        that.butRouteLast.style.left = '16px';
        that.butRouteLast.innerHTML = '< ';
        that.butRouteNext.style.top = '45%';
        that.butRouteNext.style.right = '16px';
        that.butRouteNext.innerHTML = ' >';
        addEventListener(that.butRouteLast,'mouseover', function() {
            pubsub.publish('hover', true);
        })
        addEventListener(that.butRouteLast, 'click', function() {
            // 因为是从左往右滚动，所以index的值会是下一张图
            // 减1才是当前
            let index = pubsub.publish('getIndex') - 1;
            pubsub.publish('index', index - 1);
            // 所以当index是1时，说明已经展示到了第0张辅助图。
            if (index - 1 === 0) {
                pubsub.publish('updateIndex', 0);
            } else {
                pubsub.publish('updateIndex', index);
            }
           
        });
        addEventListener(that.butRouteNext, 'mouseover', function() {
            pubsub.publish('hover', true);
        })
        addEventListener(that.butRouteNext, 'click', function() {
            let index = pubsub.publish('getIndex');
            pubsub.publish('index', index);
            pubsub.publish('updateIndex', index + 1);
        })
        return {
            butRouteLast: that.butRouteLast,
            butRouteNext: that.butRouteNext
        }
    }
    setColorEvent(node) {
        addEventListener(node, 'mouseover', function(){
            node.style.backgroundColor = '#a1a0a0';
        })
        addEventListener(node, 'mouseleave', function() {
            node.style.backgroundColor = '';
        }) 
    }
}

export default butRoute;
