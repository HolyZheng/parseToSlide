## parseToSlider

一个插件用来轮播dom结构的插件，不依赖jquery等类库。
```HTML
<!-- your html -->
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
// js
import parseToSlider from 'parse-to-slider';
parseToSlider('carouselMap', 2, false, 'center');
```
```CSS
#carouselMap {
    width: 400px;
    height: 200px;
    position: absolute;
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
