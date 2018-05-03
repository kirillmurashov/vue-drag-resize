export default {
    name: 'vue-drag-resize',
    props: {
        isActive: {
            type: Boolean, default: false
        },
        isDraggable: {
            type: Boolean, default: true
        },
        isResizable: {
            type: Boolean, default: true
        },
        aspectRatio: {
            type: Boolean, default: false
        },
        parentLimitation: {
            type: Boolean, default: true
        },
        w: {
            type: Number,
            default: 100,
            validator: function (val) {
                return val > 0
            }
        },
        h: {
            type: Number,
            default: 100,
            validator: function (val) {
                return val > 0
            }
        },
        minw: {
            type: Number,
            default: 50,
            validator: function (val) {
                return val > 0
            }
        },
        minh: {
            type: Number,
            default: 50,
            validator: function (val) {
                return val > 0
            }
        },
        x: {
            type: Number,
            default: 0,
            validator: function (val) {
                return typeof val === 'number'
            }
        },
        y: {
            type: Number,
            default: 0,
            validator: function (val) {
                return typeof val === 'number'
            }
        },
        z: {
            type: [String, Number],
            default: 'auto',
            validator: function (val) {
                let valid = (typeof val === 'string') ? val === 'auto' : val >= 0;
                return valid
            }
        },
        sticks: {
            type: Array,
            default: function () {
                return ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']
            }
        },
        axis: {
            type: String,
            default: 'both',
            validator: function (val) {
                return ['x', 'y', 'both', 'none'].indexOf(val) !== -1
            }
        }
    },

    data: function () {
        return {
            active: this.isActive,
            rawWidth: this.w,
            rawHeight: this.h,
            rawLeft: this.x,
            rawTop: this.y,
            rawRight: null,
            rawBottom: null,
            zIndex: this.z,
            aspectFactor: this.w / this.h,
            parentWidth: null,
            parentHeight: null,
            left: this.x,
            top: this.y,
            right: null,
            bottom: null,
            minWidth: this.minw,
            minHeight: this.minh
        }
    },

    created: function () {
        this.stickDrag = false;
        this.bodyDrag = false;
        this.stickAxis = null;
        this.stickStartPos = {mouseX: 0, mouseY: 0, x: 0, y: 0, w: 0, h: 0};
        this.limits = {
            minLeft: null,
            maxLeft: null,
            minRight: null,
            maxRight: null,
            minTop: null,
            maxTop: null,
            minBottom: null,
            maxBottom: null
        };

        this.currentStick = [];
    },

    mounted: function () {
        this.parentElement = this.$el.parentNode;

        this.parentWidth = this.parentElement.clientWidth;
        this.parentHeight = this.parentElement.clientHeight;
        this.rawRight = this.parentWidth - this.rawWidth - this.rawLeft;
        this.rawBottom = this.parentHeight - this.rawHeight - this.rawTop;

        document.documentElement.addEventListener('mousemove', this.move);
        document.documentElement.addEventListener('mouseup', this.up);
        document.documentElement.addEventListener('mouseleave', this.up);

        document.documentElement.addEventListener('mousedown', this.deselect);

        document.documentElement.addEventListener('touchmove', this.move, true);
        document.documentElement.addEventListener('touchend touchcancel', this.up, true);
        document.documentElement.addEventListener('touchstart', this.up, true);
    },

    beforeDestroy: function () {
        document.documentElement.removeEventListener('mousemove', this.move);
        document.documentElement.removeEventListener('mouseup', this.up);
        document.documentElement.removeEventListener('mouseleave', this.up);

        document.documentElement.removeEventListener('mousedown', this.deselect);

        document.documentElement.removeEventListener('touchmove', this.move, true);
        document.documentElement.removeEventListener('touchend touchcancel', this.up, true);
        document.documentElement.removeEventListener('touchstart', this.up, true);
    },

    methods: {
        deselect(ev) {
            this.active = false
        },

        move(ev) {
            if (!this.stickDrag && !this.bodyDrag) {
                return
            }

            if (this.stickDrag) {
                this.stickMove(ev);
            }
            if (this.bodyDrag) {
                this.bodyMove(ev)
            }
        },

        up(ev) {
            if (this.stickDrag) {
                this.stickUp(ev);
            }
            if (this.bodyDrag) {
                this.bodyUp(ev)
            }
        },

        bodyDown: function (ev) {
            this.active = true;

            if (!this.isDraggable || !this.active) {
                return
            }

            const parentWidth = this.parentWidth;
            const parentHeight = this.parentHeight;

            this.bodyDrag = true;

            this.stickStartPos.mouseX = ev.x;
            this.stickStartPos.mouseY = ev.y;

            this.stickStartPos.left = this.left;
            this.stickStartPos.right = this.right;
            this.stickStartPos.top = this.top;
            this.stickStartPos.bottom = this.bottom;

            if (this.parentLimitation) {
                this.limits = {
                    minLeft: 0,
                    maxLeft: parentWidth - this.width,
                    minRight: 0,
                    maxRight: parentWidth - this.width,
                    minTop: 0,
                    maxTop: parentHeight - this.height,
                    minBottom: 0,
                    maxBottom: parentHeight - this.height
                };
            }

        },

        bodyMove(ev) {
            const stickStartPos = this.stickStartPos;

            let delta = {
                x: this.axis !== 'y' && this.axis !== 'none' ? stickStartPos.mouseX - ev.x : 0,
                y: this.axis !== 'x' && this.axis !== 'none' ? stickStartPos.mouseY - ev.y : 0
            };

            this.rawTop = stickStartPos.top - delta.y;
            this.rawBottom = stickStartPos.bottom + delta.y;
            this.rawLeft = stickStartPos.left - delta.x;
            this.rawRight = stickStartPos.right + delta.x;
            this.$emit('dragging', this.rect);
        },

        bodyUp() {
            this.bodyDrag = false;
            this.$emit('dragging', this.rect);
            this.$emit('dragstop', this.rect);

            this.stickStartPos = {mouseX: 0, mouseY: 0, x: 0, y: 0, w: 0, h: 0};
            this.limits = {
                minLeft: null,
                maxLeft: null,
                minRight: null,
                maxRight: null,
                minTop: null,
                maxTop: null,
                minBottom: null,
                maxBottom: null
            };
        },

        stickDown: function (stick, ev) {
            if (!this.isResizable || !this.active) {
                return
            }
            this.stickDrag = true;
            this.stickStartPos.mouseX = ev.x;
            this.stickStartPos.mouseY = ev.y;
            this.stickStartPos.left = this.left;
            this.stickStartPos.right = this.right;
            this.stickStartPos.top = this.top;
            this.stickStartPos.bottom = this.bottom;
            this.currentStick = stick.split('');
            this.stickAxis = null;

            switch (this.currentStick[0]) {
                case 'b':
                    this.stickAxis = 'y';
                    break;
                case 't':
                    this.stickAxis = 'y';
                    break;
            }
            switch (this.currentStick[1]) {
                case 'r':
                    this.stickAxis = this.stickAxis === 'y' ? 'xy' : 'x';
                    break;
                case 'l':
                    this.stickAxis = this.stickAxis === 'y' ? 'xy' : 'x';
                    break;
            }


            if (this.parentLimitation) {
                let minw = this.minWidth;
                let minh = this.minHeight;
                const aspectFactor = this.aspectFactor;
                const width = this.width;
                const height = this.height;
                const bottom = this.bottom;
                const top = this.top;
                const left = this.left;
                const right = this.right;
                const stickAxis = this.stickAxis;

                if (this.aspectRatio) {
                    if (minw / minh > aspectFactor) {
                        minh = minw / aspectFactor;
                    } else {
                        minw = aspectFactor * minh;
                    }
                }

                let limits = {
                    minLeft: 0,
                    maxLeft: left + (width - minw),
                    minRight: 0,
                    maxRight: right + (width - minw),
                    minTop: 0,
                    maxTop: top + (height - minh),
                    minBottom: 0,
                    maxBottom: bottom + (height - minh)
                };

                if (this.aspectRatio) {
                    const aspectLimits = {
                        minLeft: left - (Math.min(top, bottom) * aspectFactor) * 2,
                        maxLeft: left + ((((height - minh) / 2) * aspectFactor) * 2),

                        minRight: right - (Math.min(top, bottom) * aspectFactor) * 2,
                        maxRight: right + ((((height - minh) / 2) * aspectFactor) * 2),

                        minTop: top - (Math.min(left, right) / aspectFactor) * 2,
                        maxTop: top + ((((width - minw) / 2) / aspectFactor) * 2),

                        minBottom: bottom - (Math.min(left, right) / aspectFactor) * 2,
                        maxBottom: bottom + ((((width - minw) / 2) / aspectFactor) * 2)
                    };

                    if (stickAxis === 'x') {
                        limits = {
                            minLeft: Math.max(limits.minLeft, aspectLimits.minLeft),
                            maxLeft: Math.min(limits.maxLeft, aspectLimits.maxLeft),
                            minRight: Math.max(limits.minRight, aspectLimits.minRight),
                            maxRight: Math.min(limits.maxRight, aspectLimits.maxRight)
                        }
                    } else if (stickAxis === 'y') {
                        limits = {
                            minTop: Math.max(limits.minTop, aspectLimits.minTop),
                            maxTop: Math.min(limits.maxTop, aspectLimits.maxTop),
                            minBottom: Math.max(limits.minBottom, aspectLimits.minBottom),
                            maxBottom: Math.min(limits.maxBottom, aspectLimits.maxBottom)
                        }
                    }
                }

                this.limits = limits;
            }

        },

        stickMove(ev) {
            const stickStartPos = this.stickStartPos;

            const delta = {
                x: stickStartPos.mouseX - ev.x,
                y: stickStartPos.mouseY - ev.y
            };

            switch (this.currentStick[0]) {
                case 'b':
                    this.rawBottom = stickStartPos.bottom + delta.y;
                    break;
                case 't':
                    this.rawTop = stickStartPos.top - delta.y;
                    break;
            }

            switch (this.currentStick[1]) {
                case 'r':
                    this.rawRight = stickStartPos.right + delta.x;
                    break;
                case 'l':
                    this.rawLeft = stickStartPos.left - delta.x;
                    break;
            }

            this.$emit('resizing', this.rect);
        },

        stickUp() {
            this.stickDrag = false;
            this.stickStartPos = {
                mouseX: 0,
                mouseY: 0,
                x: 0,
                y: 0,
                w: 0,
                h: 0
            };
            this.limits = {
                minLeft: null,
                maxLeft: null,
                minRight: null,
                maxRight: null,
                minTop: null,
                maxTop: null,
                minBottom: null,
                maxBottom: null
            };
            this.rawTop = this.top;
            this.rawBottom = this.bottom;
            this.rawLeft = this.left;
            this.rawRight = this.right;

            this.stickAxis = null;

            this.$emit('resizing', this.rect);
            this.$emit('resizestop', this.rect);
        },

        aspectRatioCorrection() {
            if (!this.aspectRatio) {
                return
            }

            const bottom = this.bottom;
            const top = this.top;
            const left = this.left;
            const right = this.right;
            const width = this.width;
            const height = this.height;
            const aspectFactor = this.aspectFactor;
            const currentStick = this.currentStick;

            if (width / height > aspectFactor) {
                let newWidth = aspectFactor * height;

                if (currentStick[1] === 'l') {
                    this.left = left + width - newWidth;
                } else {
                    this.right = right + width - newWidth;
                }
            } else {
                let newHeight = width / aspectFactor;

                if (currentStick[0] === 't') {
                    this.top = top + height - newHeight;
                } else {
                    this.bottom = bottom + height - newHeight;
                }
            }
        },
    },

    computed: {
        style() {
            return {
                top: this.top + 'px',
                left: this.left + 'px',
                width: this.width + 'px',
                height: this.height + 'px',
                zIndex: this.zIndex
            }
        },

        width() {
            return this.parentWidth - this.left - this.right;
        },

        height() {
            return this.parentHeight - this.top - this.bottom;
        },

        rect(){
            return {
                left: Math.round(this.left),
                top: Math.round(this.top),
                width: Math.round(this.width),
                height: Math.round(this.height)
            }
        }
    },

    watch: {
        rawLeft(newLeft) {
            const limits = this.limits;
            const stickAxis = this.stickAxis;
            const aspectFactor = this.aspectFactor;
            const aspectRatio = this.aspectRatio;
            const left = this.left;
            const bottom = this.bottom;
            const top = this.top;

            if (limits.minLeft !== null && newLeft < limits.minLeft) {
                newLeft = limits.minLeft;
            } else if (limits.maxLeft !== null && limits.maxLeft < newLeft) {
                newLeft = limits.maxLeft;
            }

            if (aspectRatio && stickAxis === 'x') {
                const delta = left - newLeft;
                this.rawTop = top - (delta / aspectFactor) / 2;
                this.rawBottom = bottom - (delta / aspectFactor) / 2;
            }

            this.left = newLeft;
        },

        rawRight(newRight) {
            const limits = this.limits;
            const stickAxis = this.stickAxis;
            const aspectFactor = this.aspectFactor;
            const aspectRatio = this.aspectRatio;
            const right = this.right;
            const bottom = this.bottom;
            const top = this.top;

            if (limits.minRight !== null && newRight < limits.minRight) {
                newRight = limits.minRight;
            } else if (limits.maxRight !== null && limits.maxRight < newRight) {
                newRight = limits.maxRight;
            }

            if (aspectRatio && stickAxis === 'x') {
                const delta = right - newRight;
                this.rawTop = top - (delta / aspectFactor) / 2;
                this.rawBottom = bottom - (delta / aspectFactor) / 2;
            }

            this.right = newRight;
        },

        rawTop(newTop) {
            const limits = this.limits;
            const stickAxis = this.stickAxis;
            const aspectFactor = this.aspectFactor;
            const aspectRatio = this.aspectRatio;
            const right = this.right;
            const left = this.left;
            const top = this.top;

            if (limits.minTop !== null && newTop < limits.minTop) {
                newTop = limits.minTop;
            } else if (limits.maxTop !== null && limits.maxTop < newTop) {
                newTop = limits.maxTop;
            }

            if (aspectRatio && stickAxis === 'y') {
                const delta = top - newTop;
                this.rawLeft = left - (delta * aspectFactor) / 2;
                this.rawRight = right - (delta * aspectFactor) / 2;
            }

            this.top = newTop;
        },

        rawBottom(newBottom) {
            const limits = this.limits;
            const stickAxis = this.stickAxis;
            const aspectFactor = this.aspectFactor;
            const aspectRatio = this.aspectRatio;
            const right = this.right;
            const left = this.left;
            const bottom = this.bottom;

            if (limits.minBottom !== null && newBottom < limits.minBottom) {
                newBottom = limits.minBottom;
            } else if (limits.maxBottom !== null && limits.maxBottom < newBottom) {
                newBottom = limits.maxBottom;
            }

            if (aspectRatio && stickAxis === 'y') {
                const delta = bottom - newBottom;
                this.rawLeft = left - (delta * aspectFactor) / 2;
                this.rawRight = right - (delta * aspectFactor) / 2;
            }

            this.bottom = newBottom;
        },

        width() {
            this.aspectRatioCorrection();
        },

        height() {
            this.aspectRatioCorrection();
        },

        active(isActive) {
            if (isActive) {
                this.$emit('activated');
            } else {
                this.$emit('deactivated');
            }
        },

        isActive(val) {
            this.active = val;
        },

        z(val) {
            if (val >= 0 || val === 'auto') {
                this.zIndex = val
            }
        },

        aspectRatio(val) {
            if (val) {
                this.aspectFactor = this.width / this.height;
            }
        },

        minw(val) {
            if (val > 0 && val <= this.width) {
                this.minWidth = val
            }
        },

        minh(val) {
            if (val > 0 && val <= this.height) {
                this.minHeight = val
            }
        }
    }
}