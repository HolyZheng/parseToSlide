## parseToSlider
![version](https://img.shields.io/badge/parseToSlider-v1.0.4-blue)
![lis](https://img.shields.io/badge/parseToSlider-MIT-green)

![demo1](https://raw.githubusercontent.com/HolyZheng/parseToSlide/master/images/demo1.gif)

一个用来轮播dom结构的原生js插件，不依赖jquery等类库。

### Installation
```
npm install parse-to-slider
```

### Example
```HTML
<!-- html file -->
<body>
    <section id="carouselMap">
        <div class="one">
            <!-- Anything you want to display~! -->
        </div>
        <div class="two">
            <!-- Anything you want to display~! -->
        </div>
        ...
    </section>
</body>
```

```JS
// js file
import parseToSlider from 'parse-to-slider';
/**
 * @param {要转为轮播图的dom id} id 
 * @param {轮播时间间隔} interval 
 * @param {是否需要左右箭头导航} ifArrow 
 * @param {下方导航点的位置 left/center/right} position 
 */
parseToSlider('carouselMap', 3, false, 'center');
```
```CSS
/* css file */
#carouselMap {
    width: 400px;
    height: 200px;
    position: absolute; /* this is necessary */
}
.one, .two, .three, .four {
    width: 400px;
    height: 200px; 
}
.one {
    background-color: brown;
}
.two {
    background-color: bisque;
}
.three {
    background-color: coral;
}
.four {
    background-color: aquamarine;
}
```

### 注意
1. 需要给外层包裹元素绝对定位。
2. 轮播的内容由你定义，轮播的其实是包裹元素内的首层跨级元素

### 适用场景
简单的小页面，需要展示轮播结构的时候可以利用该插件快速开发。

### 兼容性
ie8及ie8以上。（ie8与ie9滑动效果失效）
