import slider from './slider';
import navigationBar from './navigationBar';
import pubsub from './pubsub';
import timeInterval from './timeInterval';
import butRoute from './butRoute';
import {parseToDOM, toArray} from './util';

/**
 * 
 * @param {要转为轮播图的dom id} id 
 * @param {轮播时间间隔} interval 
 * @param {是否需要左右箭头导航} ifArrow 
 * @param {下方导航点的位置 left/center/right} position 
 */

const parseToSlider = (id, interval, ifArrow, position) => {
    let target = document.getElementById(id);
    let sliderDiv = parseToDOM('<div style="width: 100%; height: 100%; position: relative; overflow: hidden;"></div>');

    let nodes = toArray(target.childNodes);
    // html中的换行等操作会形成text类型的node，需要过滤掉
    // 为了不引入polyfill，使用这种遍历方式
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeType !== 1) {
            nodes.splice(i, 1);
        }
    }

    let sliderInst = new slider(nodes);
    let navigationBarInst = new navigationBar(nodes.length);
    let timeIntervalInst = new timeInterval(interval, nodes.length);

    pubsub.subscribe('index', sliderInst, 'setContainerStyle');
    pubsub.subscribe('index', navigationBarInst, 'setPointStyle');
    pubsub.subscribe('hover', timeIntervalInst, 'setPlay');
    pubsub.subscribe('updateIndex', timeIntervalInst, 'updateIndex');
    pubsub.subscribe('getIndex', timeIntervalInst, 'getIndex');

    // 设置导航点的位置。
    navigationBarInst.setPosition(position);
    let container = sliderInst.init();
    let barWrap = navigationBarInst.init();

    sliderDiv.appendChild(container);
    sliderDiv.appendChild(barWrap);

    if (ifArrow) {
        let butRouteInst = new butRoute(nodes.length);
        let butRouteInstObj = butRouteInst.init();
        sliderDiv.appendChild(butRouteInstObj.butRouteLast);
        sliderDiv.appendChild(butRouteInstObj.butRouteNext);
    }

    // 将构造好的轮播图插入到目标元素。
    target.innerHTML = '';
    target.appendChild(sliderDiv);
}

export default parseToSlider
