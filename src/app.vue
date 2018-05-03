<template>
    <div id="app">
        <VueDragResize :isActive="true" :w="200" :h="200" :parentLimitation="false" v-on:resizing="resize" v-on:dragging="resize">
            <h3>Hello World!</h3>
            <p>{{ top }} х {{ left }} </p>
            <p>{{ width }} х {{ height }}</p>
        </VueDragResize>

    </div>
</template>

<style>
    #app {
        margin: 200px;
        border: 1px dotted #ddd;

        box-sizing: border-box;
        width: 600px;
        height: 800px;

        position: relative;
    }

    h3 {
        margin: 0;
    }
</style>

<script>
    import VueDragResize from './components/vue-drag-resize.vue';

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