export default {
    computed: {
        activeRect() {
            return this.$store.getters['rect/getActive'];
        },

        width() {
            return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].width
        },

        height() {
            return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].height
        },

        top() {
            return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].top
        },

        left() {
            return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].left
        },

        minw() {
            return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].minw
        },

        minh() {
            return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].minh
        },

        aspectRatio() {
            return this.activeRect === null ? false : this.$store.state.rect.rects[this.activeRect].aspectRatio;
        },

        parentLim() {
            return this.activeRect === null ? false : this.$store.state.rect.rects[this.activeRect].parentLim;
        },

        draggable() {
            return this.activeRect === null ? false : this.$store.state.rect.rects[this.activeRect].draggable;
        },

        resizable() {
            return this.activeRect === null ? false : this.$store.state.rect.rects[this.activeRect].resizable;
        },

        topIsLocked() {
            if (this.activeRect === null) {
                return false;
            }
            return (this.$store.state.rect.rects[this.activeRect].axis === 'x' ||
                this.$store.state.rect.rects[this.activeRect].axis === 'none')
        },

        leftIsLocked() {
            if (this.activeRect === null) {
                return false;
            }
            return (this.$store.state.rect.rects[this.activeRect].axis === 'y' ||
                this.$store.state.rect.rects[this.activeRect].axis === 'none')
        },

        zIndex() {
            if (this.activeRect === null) {
                return null;
            }

            return this.$store.state.rect.rects[this.activeRect].zIndex === 1 ? 'isFirst' :
                this.$store.state.rect.rects[this.activeRect].zIndex === this.$store.state.rect.rects.length ? 'isLast' : 'normal'

        }
    },
    methods: {
        toggleYLock() {
            if (this.activeRect === null) {
                return
            }

            this.$store.dispatch('rect/changeYLock', {id: this.activeRect});
        },
        toggleXLock() {
            if (this.activeRect === null) {
                return
            }

            this.$store.dispatch('rect/changeXLock', {id: this.activeRect});
        },

        toggleAspect() {
            if (this.activeRect === null) {
                return
            }
            if (!this.$store.state.rect.rects[this.activeRect].aspectRatio) {
                this.$store.dispatch('rect/setAspect', {id: this.activeRect});
            } else {
                this.$store.dispatch('rect/unsetAspect', {id: this.activeRect});
            }
        },

        toggleParentLimitation() {
            this.$store.dispatch('rect/toggleParentLimitation', {id: this.activeRect});
        },

        toggleResizable() {
            this.$store.dispatch('rect/toggleResizable', {id: this.activeRect});
        },

        toggleDraggable() {
            this.$store.dispatch('rect/toggleDraggable', {id: this.activeRect});
        },

        toTop() {
            this.$store.dispatch('rect/changeZToTop', {id: this.activeRect});
        },

        toBottom() {
            this.$store.dispatch('rect/changeZToBottom', {id: this.activeRect});
        },

        changeMinWidth(ev) {
            let minw = parseInt(ev.target.value);
            if (typeof minw !== 'number' || isNaN(minw)) {
                minw = 1;
            }

            if (minw <= 0) {
                minw = 1;
            } else if (minw > this.$store.state.rect.rects[this.activeRect].width) {
                minw = this.$store.state.rect.rects[this.activeRect].width;
            }

            ev.target.value = minw;

            this.$store.dispatch('rect/setMinWidth', {id: this.activeRect, width: minw});
        },

        changeMinHeight(ev) {
            let minh = parseInt(ev.target.value);

            if (typeof minh !== 'number' || isNaN(minh)) {
                minh = 1;
            }

            if (minh <= 0) {
                minh = 1;
            } else if (minh > this.$store.state.rect.rects[this.activeRect].height) {
                minh = this.$store.state.rect.rects[this.activeRect].height;
            }

            ev.target.value = minh;

            this.$store.dispatch('rect/setMinHeight', {id: this.activeRect, height: minh});
        },

        changeTop(ev) {
            let top = parseInt(ev.target.value);

            if (typeof top !== 'number' || isNaN(top)) {
                top = this.$store.state.rect.rects[this.activeRect].top;
                ev.target.value = top;
                return
            }

            this.$store.dispatch('rect/setTop', {id: this.activeRect, top: top});
        },

        changeLeft(ev) {
            let left = parseInt(ev.target.value);

            if (typeof left !== 'number' || isNaN(left)) {
                left = this.$store.state.rect.rects[this.activeRect].left;
                ev.target.value = left;
            }

            this.$store.dispatch('rect/setLeft', {id: this.activeRect, left: left});
        },

        changeWidth(ev){
            let width = parseInt(ev.target.value);

            if (typeof width !== 'number' || isNaN(width)) {
                width = this.$store.state.rect.rects[this.activeRect].width;
                ev.target.value = width;
            }

            this.$store.dispatch('rect/setWidth', {id: this.activeRect, width: width});
        },

        changeHeight(ev){
            let height = parseInt(ev.target.value);

            if (typeof height !== 'number' || isNaN(height)) {
                height = this.$store.state.rect.rects[this.activeRect].height;
                ev.target.value = height;
            }

            this.$store.dispatch('rect/setHeight', {id: this.activeRect, height: height});
        }
    }
}