import {parseToDOM, isIE8, addEventListener, toArray} from './util';
import pubsub from './pubsub';

class slider {
	constructor(nodes) {
		this.container = parseToDOM(
		`<div style="
			height: 100%; 
			position: absolute; 
			transition: left 0.4s; 
			left: -100%"
		></div>`
		);
		this.nodes = nodes;
	}
	init() {
		const that = this;
		const num = that.nodes.length;
		const target = that.nodes[0].parentNode;
		// 获取轮播数量
		// 设置container宽度
		that.container.style.width = `${(num+2)*100}%`;
		addEventListener(that.container, 'mouseleave', function() {
			pubsub.publish('hover', false);
		})

		for(let i = 0; i < num; i++){
			that.nodes[i].style.display = 'inline-block';
			addEventListener(that.nodes[i], 'mouseover', function() {
				// 发布消息，用户鼠标悬浮
				pubsub.publish('hover', true);
			})
			that.container.appendChild(that.nodes[i]);
		}
		// 无缝轮播，首尾插入辅助dom
		let tempEndNode = that.nodes[num-1].cloneNode(true);
		let tempStartNode = that.nodes[0].cloneNode(true);
		that.container.insertBefore(tempEndNode, that.nodes[0]);
		that.container.appendChild(tempStartNode);

		return that.container;
	}
	// 设置图片的移动等操作。
	setContainerStyle(index) {
		const that = this;
		const num = that.nodes.length;
		if (!isIE8()) {
			if (index === num + 2) {
				that.container.style.transition = 'none';
				that.container.style.left = `-100%`;
				setTimeout(() => {
					that.container.style.transition = `left 0.4s`;
				},200)
			} else if (index === -1) {
				that.container.style.transition = 'none';
				that.container.style.left = `-${100*(num)}%`;
				setTimeout(() => {
					that.container.style.transition = `left 0.4s`;
				},200)
			} else {
				that.container.style.left = `-${100*(index)}%`;
			}
		} else {
			// ie8下，transition不支持，闪现图片
			that.container.style.transition = 'none';
			that.container.style.left = '0';
			let childs = toArray(that.container.childNodes);
			// html中的换行等操作会形成text类型的node，需要过滤掉
			for (let i = 0; i < childs.length; i++) {
				if (childs[i].nodeType !== 1) {
					childs.splice(i, 1);
				}
			}
			for(let i = 0; i < childs.length; i++) {
				childs[i].style.display = 'inline-block';
			}
			if (index === num + 2) {
				for(let i = 0; i < childs.length; i++) {
					if (i !== 1) {
						childs[i].style.display = 'none';
					}
				}
			} else if (index === -1) {
				for(let i = 0; i < childs.length; i++) {
					if (i !== 1) {
						childs[i].style.display = 'none';
					}
				}
			} else {
				for(let i = 0; i < childs.length; i++) {
					if (i !== index) {
						childs[i].style.display = 'none';
					}
				}
			}
		}
	}
}

export default slider;
