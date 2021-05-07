<p align="center"><img src="http://oduvanstudio.com/vdr.gif" alt="logo"></p>
<h1 align="center">Vue-drag-resize</h1>

<p align="center">

[![Latest Version on NPM](https://img.shields.io/npm/v/vue-drag-resize.svg?style=flat-square)](https://npmjs.com/package/vue-drag-resize)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![npm](https://img.shields.io/npm/dt/vue-drag-resize.svg?style=flat-square)](https://www.npmjs.com/package/vue-drag-resize)
</p>

<p align="center">
<a href="https://opencollective.com/vue-drag-resize/" target="_blank">
  <img src="https://opencollective.com/vue-drag-resize/donate/button@2x.png?color=blue" width=300 />
</a>
</p>

> Vue Component for draggable and resizable elements.

## Table of Contents

* [Features](#features)
* [Install and basic usage](#install-and-basic-usage)
  * [Props](#props)
  * [Events](#events)
* [Contributing](#contributing)
* [License](#license)

### Demo

[Demo](http://kirillmurashov.com/vue-drag-resize)

### Features

* A lightweight, no-dependency
* All props are reactive
* Support touch events
* Snap element to custom grid
* Use draggable, resizable or both
* Define sticks for resizing
* Save aspect ratio for resizable components
* Restrict size and movement to parent element
* Restrict drag to vertical or horizontal axis

## Install and basic usage

```bash
$ npm i -s vue-drag-resize
```


Register the component:

```js
import Vue from 'vue'
import VueDragResize from 'vue-drag-resize'

Vue.component('vue-drag-resize', VueDragResize)
```

Use the component:

```vue
<template>
    <div id="app">
        <VueDragResize :isActive="true" :w="200" :h="200" v-on:resizing="resize" v-on:dragging="resize">
            <h3>Hello World!</h3>
            <p>{{ top }} х {{ left }} </p>
            <p>{{ width }} х {{ height }}</p>
        </VueDragResize>
    </div>
</template>

<script>
    import VueDragResize from 'vue-drag-resize';

    export default {
        name: 'app',

        components: {
            VueDragResize
        },

        data() {
            return {
                width: 0,
                height: 0,
                top: 0,
                left: 0
            }
        },

        methods: {
            resize(newRect) {
                this.width = newRect.width;
                this.height = newRect.height;
                this.top = newRect.top;
                this.left = newRect.left;
            }
        }
    }
</script>
```

### Props

#### isActive
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

Determines whether the component should be active.

确定组件是否应处于活动状态。

```html
<vue-drag-resize :isActive="true">
```

#### preventActiveBehavior
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

Disable behavior of the component by clicking on it and clicking outside the component's area (isActive: true / false).<br>
If the prop is enabled, the component is oriented only to the specified.

通过单击组件并单击组件区域外部来禁用组件的行为（isActive：true / false）。<br>
如果启用了prop，则组件仅面向指定的。

```html
<vue-drag-resize :preventActiveBehavior="true">
```

#### parentW
Type: `Number`<br>
Required: `false`<br>
Default: `0`

Define the initial width of the parent element. If not specified it calculated automatically.<br>
With this parameter, you can set the bounding area for the component, and also it is used when resizing in real time.

定义父元素的初始宽度。 如果未指定，则自动计算。<br>
使用此参数，您可以设置组件的边界区域，并在实时调整大小时使用它。
```html
<vue-drag-resize :parentW="2000">
```

#### parentH
Type: `Number`<br>
Required: `false`<br>
Default: `0`

Define the initial height of the parent element. If not specified it calculated automatically.<br>
With this parameter, you can set the bounding area for the component, and also it is used when resizing in real time.

定义父元素的初始高度。 如果未指定，则自动计算。
使用此参数，您可以设置组件的边界区域，并在实时调整大小时使用它。

```html
<vue-drag-resize :parentH="2000">
```

#### parentScaleX
Type: `Number`<br>
Required: `false`<br>
Default: `1`

Define the initial horizontal scale or the parent element. Same value in parent's transform: scale() css definition.<br>
The drag/resize and the sticks' sizes will computed with this value.

定义初始水平比例或父元素。父级的transform:scale（）css定义中的值相同。<br>
拖动/调整大小和杆的大小将使用该值计算。
```html
<vue-drag-resize :parentScaleX="0.5">
```

#### parentScaleY
Type: `Number`<br>
Required: `false`<br>
Default: `1`

Define the initial vertical scale or the parent element. Same value in parent's transform: scale() css definition.<br>
The drag/resize and the sticks' sizes will computed with this value.

定义初始垂直比例或父元素。父级的transform:scale（）css定义中的值相同。<br>
拖动/调整大小和杆的大小将使用该值计算。

```html
<vue-drag-resize :parentScaleY="0.5">
```

#### isDraggable
Type: `Boolean`<br>
Required: `false`<br>
Default: `true`

Determines whether the component should draggable.

确定组件是否应可拖动。


```html
<vue-drag-resize :isDraggable="false">
```

#### isResizable
Type: `Boolean`<br>
Required: `false`<br>
Default: `true`

Determines whether the component should resize.

确定组件是否应调整大小。


```html
<vue-drag-resize :isResizable="false">
```
#### parentLimitation
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

Limits the scope of the component's change to its parent size.

将组件更改的范围限制为其父大小。


```html
<vue-drag-resize :parentLimitation="true">
```

#### snapToGrid
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

Determines whether the component should move and resize in predefined steps.

```html
<vue-drag-resize :snapToGrid="true">
```

#### gridX
Type: `Number`<br>
Required: `false`<br>
Default: `50`

Define the grid step size for the horizontal axis. Both sides of the component (left and right) will snap to this step.

```html
<vue-drag-resize :snapToGrid="true" :gridX="20">
```

#### gridY
Type: `Number`<br>
Required: `false`<br>
Default: `50`

Define the grid step size for the vertical axis. Both sides of the component (top and bottom) will snap to this step.

```html
<vue-drag-resize :snapToGrid="true" :gridY="20">
```

#### aspectRatio
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

Determines whether the component should retain its proportions.

确定组件是否应保持其比例。


```html
<vue-drag-resize :aspectRatio="false">
```

#### w
Type: `Number|String`<br>
Required: `false`<br>
Default: `200`

Define the initial width of the component.<br>
The value can either be a number >= 0 or the string 'auto'. <br>
If set to 'auto', the initial width value will be equal to the width of the content within the component.

定义组件的初始宽度。


```html
<vue-drag-resize :w="200">
```

#### h
Type: `Number|String`<br>
Required: `false`<br>
Default: `200`

Define the initial height of the component.<br>
The value can either be a number >= 0 or the string 'auto'. <br>
If set to 'auto', the initial height value will be equal to the height of the content within the component.

定义组件的初始高度。



```html
<vue-drag-resize :h="200">
```

#### minw
Type: `Number`<br>
Required: `false`<br>
Default: `50`

Define the minimal width of the component.

定义组件的初始宽度。



```html
<vue-drag-resize :minw="50">
```

#### minh
Type: `Number`<br>
Required: `false`<br>
Default: `50`

Define the minimal height of the component.

定义组件的最小高度。


```html
<vue-drag-resize :minh="50">
```

#### x
Type: `Number`<br>
Required: `false`<br>
Default: `0`

Define the initial x position of the component.

定义组件的初始X位置。


```html
<vue-drag-resize :x="0">
```

#### y
Type: `Number`<br>
Required: `false`<br>
Default: `0`

Define the initial y position of the component.

定义组件的初始Y位置。


```html
<vue-drag-resize :y="0">
```

#### z
Type: `Number|String`<br>
Required: `false`<br>
Default: `auto`

Define the zIndex of the component.

定义组件的zindex(层级)。

```html
<vue-drag-resize :z="999">
```

#### stickSize
Type: `Number`<br>
Required: `false`<br>
Default `8`

Define the sticks' size.

```html
<vue-drag-resize :stickSize="12">
```

#### sticks
Type: `Array`<br>
Required: `false`<br>
Default: `['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']`

Define the array of handles to restrict the element resizing:

定义句柄数组以限制元素大小调整：

* `tl` - Top left
* `tm` - Top middle
* `tr` - Top right
* `mr` - Middle right
* `br` - Bottom right
* `bm` - Bottom middle
* `bl` - Bottom left
* `ml` - Middle left

```html
<vue-drag-resize :sticks="['tm','bm','ml','mr']">
```

#### axis
Type: `String`<br>
Required: `false`<br>
Default: `both`

Define the axis on which the element is draggable. Available values are `x`, `y`, `both` or `none`.

定义元素可拖动的轴。 可用值为`x`，`y`，`both`或`none`。

```html
<vue-drag-resize axis="x">
```

#### dragHandle
Type: `String`<br>
Required: `false`

Defines the selector that should be used to drag the component.

定义应该用于拖动组件的选择器。

```html
<vue-drag-resize dragHandle=".drag">
```

#### dragCancel
Type: `String`<br>
Required: `false`

Defines a selector that should be used to prevent drag initialization.

定义应该用于防止拖动初始化的选择器。

```html
<vue-drag-resize dragCancel=".drag">
```

#### contentClass
Type: `String`<br>
Required: `false`

Defines a class that is applied on the div with the class vdr

```html
<vue-drag-resize contentClass="box-shaddow">
```




---

### Events

#### clicked

Required: `false`<br>
Parameters: `Original event handler`

Called whenever the component gets clicked.

单击组件时调用。

```html
<vue-drag-resize @clicked="onActivated">
```

#### activated

Required: `false`<br>
Parameters: `-`

Called whenever the component gets clicked, in order to show handles.

单击组件时调用，以显示句柄。

```html
<vue-drag-resize @activated="onActivated">
```

#### deactivated

Required: `false`<br>
Parameters: `-`

Called whenever the user clicks anywhere outside the component, in order to deactivate it.

每当用户单击组件外部的任何位置时调用，以便将其停用。


```html
<vue-drag-resize @deactivated="onDeactivated">
```

#### resizing

Required: `false`<br>
Parameters: `object`

```javascript
{
    left: Number, //the X position of the component
    top: Number, //the Y position of the component
    width: Number, //the width of the component
    height: Number //the height of the component
}
```

Called whenever the component gets resized.

每当组件调整大小时调用。


```html
<vue-drag-resize @resizing="onResizing">
```

#### resizestop

Required: `false`<br>
Parameters: `object`
```javascript
{
    left: Number, //the X position of the component
    top: Number, //the Y position of the component
    width: Number, //the width of the component
    height: Number //the height of the component
}
```

Called whenever the component stops getting resized.

每当组件停止调整大小时调用。


```html
<vue-drag-resize @resizestop="onResizstop">
```

#### dragging

Required: `false`<br>
Parameters: `object`
```javascript
{
    left: Number, //the X position of the component
    top: Number, //the Y position of the component
    width: Number, //the width of the component
    height: Number //the height of the component
}
```

Called whenever the component gets dragged.

每当拖动组件时调用。


```html
<vue-drag-resize @dragging="onDragging">
```

#### dragstop

Required: `false`<br>
Parameters: `object`
```javascript
{
    left: Number, //the X position of the component
    top: Number, //the Y position of the component
    width: Number, //the width of the component
    height: Number //the height of the component
}
```


Called whenever the component stops getting dragged.

每当组件停止拖动时调用。


```html
<vue-drag-resize @dragstop="onDragstop">
```

## Contributing

Any contribution to the code or any part of the documentation and any idea and/or suggestion are very welcome.

``` bash
# serve with hot reload at localhost:8081
npm run start

# distribution build
npm run build

```

## License

[MIT license](LICENSE)