/**
 * 将字符串描述的html转为html，但是tr不适用。
 * @param {string} str 
 */
const parseToDOM = (str) => {
    var div = document.createElement("div");
    if(typeof str == "string")
        div.innerHTML = str;
    return div.childNodes[0];
}

export const isIE8 = () => {
    var b = document.createElement('b')
    b.innerHTML = '<!--[if IE 8]><i></i><![endif]-->'
    return b.getElementsByTagName('i').length === 1
}

const isObjEmpty = (obj) => {
    for (var i in obj) {
        return false
    }
    return true
}

const toArray = (nodes) => {
    let array = null;
    try{
        array = Array.prototype.slice.call(nodes,0);
    }catch(e){
        // ie8
        array = new Array();
        for(var i = 0,len = nodes.length;i < len;i++) {
            array.push(nodes[i]);
        }
    }

    return array;
}

const addEventListener = (ele, event, fn) => {
    if (ele.addEventListener) {
        ele.addEventListener(event, fn);
    } else {
        // ie8
        ele.attachEvent('on' + event, fn);
    }
}

export {
    parseToDOM,
    toArray,
    addEventListener
}
