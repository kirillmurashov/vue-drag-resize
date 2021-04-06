<template>
    <toolbar @changeGrid='changeGrid'></toolbar>
    <div class='rect-wrapper' ref='rectWrapper'>
        <VueDragResize v-for='(rect, index) in rects'
                       :key='index'
                       :w='rect.width'
                       :h='rect.height'
                       :x='rect.left'
                       :y='rect.top'
                       :parentW='wrapperSize.width'
                       :parentH='wrapperSize.height'
                       :axis='rect.axis'
                       :isActive='rect.active'
                       :minw='rect.minw'
                       :minh='rect.minh'
                       :isDraggable='rect.draggable'
                       :isResizable='rect.resizable'
                       :parentLimitation='rect.parentLim'
                       :snapToGrid='rect.snapToGrid'
                       :gridX='gridX'
                       :gridY='gridY'
                       :aspectRatio='rect.aspectRatio'
                       :z='rect.zIndex'
                       :contentClass='rect.class'
                       :stickSize='rect.stickSize'
                       v-on:activated='activateEv(index)'
                       v-on:deactivated='deactivateEv(index)'
                       v-on:dragging='changeDimensions($event, index)'
                       v-on:resizing='changeDimensions($event, index)'
        >
            <div class='filler' :style='{backgroundColor:rect.color}'></div>
        </VueDragResize>

        <div v-for='n in horizontalGridLinesCount' class='horizontal-line' :key='n'
             :style='"top:" + (gridY * n) + "px"'></div>
        <div v-for='n in verticalGridLinesCount' class='vertical-line' :key='n'
             :style='"left:" + (gridX * n) + "px"'></div>
    </div>
</template>

<style>
.horizontal-line {
    width: 100%;
    height: 2px;
    margin-top: -1px;
    background-color: #f1f1f1;
    position: absolute;
}

.vertical-line {
    height: 100%;
    width: 2px;
    margin-left: -1px;
    background-color: #f1f1f1;
    position: absolute;
}

.rect-wrapper {
    position: relative;
    background-color: #fff;
    border: 1px solid #EBEDF8;
}

.filler {
    width: 100%;
    height: 100%;
}
</style>

<script>
import VueDragResize from '../component/vue-drag-resize.vue';
import Toolbar from './components/toolbar/toolbar.vue';

import { useStore } from 'vuex';
import { ref, onMounted, computed, reactive, watch } from 'vue';

export default {
    name: 'App',
    components: {
        VueDragResize,
        Toolbar,
    },
    setup() {
        const store = useStore();
        const rectWrapper = ref(null);
        const gridVisibility = ref(false);

        const gridX = ref(50);
        const gridY = ref(50);

        const verticalGridLinesCount = ref(0);
        const horizontalGridLinesCount = ref(0);

        const rects = store.state.rect.rects;
        const wrapperSize = reactive({ width: 0, height: 0 });

        const changeDimensions = (newRect) => {
            store.dispatch('rect/setTop', newRect.top);
            store.dispatch('rect/setLeft', newRect.left);
            store.dispatch('rect/setWidth', newRect.width);
            store.dispatch('rect/setHeight', newRect.height);
        };

        const activateEv = (index) => {
            store.dispatch('rect/setActive', { id: index });
        };

        const deactivateEv = (index) => {
            store.dispatch('rect/unsetActive', { id: index });
        };

        const changeWrapperSize = () => {
            wrapperSize.width = rectWrapper.value.clientWidth;
            wrapperSize.height = rectWrapper.value.clientHeight;
        };

        const changeGrid = (visibility, gridSize) => {
            gridVisibility.value = visibility;

            gridX.value = gridSize.gridX;
            gridY.value = gridSize.gridY;

            if (!gridVisibility.value) {
                verticalGridLinesCount.value = 0;
                horizontalGridLinesCount.value = 0;
                return;
            }

            verticalGridLinesCount.value = Math.floor(wrapperSize.width / gridX.value);
            horizontalGridLinesCount.value = Math.floor(wrapperSize.height / gridY.value);
        };

        watch(wrapperSize, () => {
            changeGrid(gridVisibility.value, { gridX: gridX.value, gridY: gridY.value });
        });


        onMounted(changeWrapperSize);
        window.addEventListener('resize', changeWrapperSize);

        return {
            gridX,
            gridY,
            rects,
            changeGrid,
            rectWrapper,
            wrapperSize,
            activateEv,
            deactivateEv,
            changeDimensions,
            horizontalGridLinesCount,
            verticalGridLinesCount,
        };
    },
};
</script>