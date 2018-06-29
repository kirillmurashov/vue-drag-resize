<p align="center"><img src="http://oduvanstudio.com/vdr.gif" alt="logo"></p>
<h1 align="center">Vue-drag-resize</h1>

[![Latest Version on NPM](https://img.shields.io/npm/v/vue-drag-resize.svg?style=flat-square)](https://npmjs.com/package/vue-drag-resize)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![npm](https://img.shields.io/npm/dt/vue-drag-resize.svg?style=flat-square)](https://www.npmjs.com/package/vue-drag-resize)

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

```html
<vue-drag-resize :isActive="true">
```

#### preventActiveBehavior
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

Disable behavior of the component by clicking on it and clicking outside the component's area (isActive: true / false).
If the prop is enabled, the component is oriented only to the specified.

```html
<vue-drag-resize :preventActiveBehavior="true">
```

#### parentW
Type: `Number`<br>
Required: `false`<br>
Default: `0`

Define the initial width of the parent element. If not specified it calculated automatically.
With this parameter, you can set the bounding area for the component, and also it is used when resizing in real time.

```html
<vue-drag-resize :parentW="2000">
```

#### parentH
Type: `Number`<br>
Required: `false`<br>
Default: `0`

Define the initial height of the parent element. If not specified it calculated automatically.
With this parameter, you can set the bounding area for the component, and also it is used when resizing in real time.

```html
<vue-drag-resize :parentH="2000">
```

#### parentScaleX
Type: `Number`<br>
Required: `false`<br>
Default: `1`

Define the initial horizontal scale or the parent element. Same value in parent's transform: scale() css definition.
The drag/resize and the sticks' sizes will computed with this value.

```html
<vue-drag-resize :parentScaleX="0.5">
```

#### parentScaleY
Type: `Number`<br>
Required: `false`<br>
Default: `1`

Define the initial vertical scale or the parent element. Same value in parent's transform: scale() css definition.
The drag/resize and the sticks' sizes will computed with this value.

```html
<vue-drag-resize :parentScaleY="0.5">
```

#### isDraggable
Type: `Boolean`<br>
Required: `false`<br>
Default: `true`

Determines whether the component should draggable.

```html
<vue-drag-resize :isDraggable="false">
```

#### isResizable
Type: `Boolean`<br>
Required: `false`<br>
Default: `true`

Determines whether the component should resize.

```html
<vue-drag-resize :isResizable="false">
```
#### parentLimitation
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

Limits the scope of the component's change to its parent size.

```html
<vue-drag-resize :parentLimitation="true">
```

#### aspectRatio
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

Determines whether the component should retain its proportions.

```html
<vue-drag-resize :aspectRatio="false">
```

#### w
Type: `Number`<br>
Required: `false`<br>
Default: `200`

Define the initial width of the component.

```html
<vue-drag-resize :w="200">
```

#### h
Type: `Number`<br>
Required: `false`<br>
Default: `200`

Define the initial height of the component.

```html
<vue-drag-resize :h="200">
```

#### minw
Type: `Number`<br>
Required: `false`<br>
Default: `50`

Define the minimal width of the component.

```html
<vue-drag-resize :minw="50">
```

#### minh
Type: `Number`<br>
Required: `false`<br>
Default: `50`

Define the minimal height of the component.

```html
<vue-drag-resize :minh="50">
```

#### x
Type: `Number`<br>
Required: `false`<br>
Default: `0`

Define the initial x position of the component.

```html
<vue-drag-resize :x="0">
```

#### y
Type: `Number`<br>
Required: `false`<br>
Default: `0`

Define the initial y position of the component.

```html
<vue-drag-resize :y="0">
```

#### z
Type: `Number|String`<br>
Required: `false`<br>
Default: `auto`

Define the zIndex of the component.

```html
<vue-drag-resize :z="999">
```

#### sticks
Type: `Array`<br>
Required: `false`<br>
Default: `['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']`

Define the array of handles to restrict the element resizing:
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

```html
<vue-drag-resize axis="x">
```

#### dragHandle
Type: `String`<br>
Required: `false`

Defines the selector that should be used to drag the component.

```html
<vue-drag-resize dragHandle=".drag">
```

#### dragCancel
Type: `String`<br>
Required: `false`

Defines a selector that should be used to prevent drag initialization.

```html
<vue-drag-resize dragCancel=".drag">
```





---

### Events

#### clicked

Required: `false`<br>
Parameters: `Original event handler`

Called whenever the component gets clicked.

```html
<vue-drag-resize @clicked="onActivated">
```

#### activated

Required: `false`<br>
Parameters: `-`

Called whenever the component gets clicked, in order to show handles.

```html
<vue-drag-resize @activated="onActivated">
```

#### deactivated

Required: `false`<br>
Parameters: `-`

Called whenever the user clicks anywhere outside the component, in order to deactivate it.

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
