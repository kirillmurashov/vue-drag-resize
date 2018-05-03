import types, {CHANGE_ZINDEX} from './mutation-types';

export default {
    setActive({commit, state}, {id}) {
        for (let i = 0, l = state.rects.length; i < l; i++) {
            if (i === id) {
                commit(types.ENABLE_ACTIVE, i);
                continue;
            }

            commit(types.DISABLE_ACTIVE, i);
        }
    },
    unsetActive({commit}, {id}) {
        commit(types.DISABLE_ACTIVE, id);
    },

    toggleDraggable({commit, state}, {id}) {
        if (!state.rects[id].draggable) {
            commit(types.ENABLE_DRAGGABLE, id);
        } else {
            commit(types.DISABLE_DRAGGABLE, id);
        }
    },

    toggleResizable({commit, state}, {id}) {
        if (!state.rects[id].resizable) {
            commit(types.ENABLE_RESIZABLE, id);
        } else {
            commit(types.DISABLE_RESIZABLE, id);
        }
    },

    toggleParentLimitation({commit, state}, {id}) {
        if (!state.rects[id].parentLim) {
            commit(types.ENABLE_PARENT_LIMITATION, id);
        } else {
            commit(types.DISABLE_PARENT_LIMITATION, id);
        }
    },

    setAspect({commit}, {id}) {
        commit(types.ENABLE_ASPECT, id);
    },
    unsetAspect({commit}, {id}) {
        commit(types.DISABLE_ASPECT, id);
    },

    setWidth({commit}, {id, width}) {
        commit(types.CHANGE_WIDTH, {id, width});
    },

    setHeight({commit}, {id, height}) {
        commit(types.CHANGE_HEIGHT, {id, height});
    },

    setTop({commit}, {id, top}) {
        commit(types.CHANGE_TOP, {id, top});
    },

    setLeft({commit}, {id, left}) {
        commit(types.CHANGE_LEFT, {id, left});
    },

    changeXLock({commit, state}, {id}) {
        switch (state.rects[id].axis) {
            case 'both':
                commit(types.ENABLE_Y_AXIS, id);
                break;
            case 'x':
                commit(types.ENABLE_NONE_AXIS, id);
                break;
            case 'y':
                commit(types.ENABLE_BOTH_AXIS, id);
                break;
            case 'none':
                commit(types.ENABLE_X_AXIS, id);
                break;
        }
    },

    changeYLock({commit, state}, {id}) {
        switch (state.rects[id].axis) {
            case 'both':
                commit(types.ENABLE_X_AXIS, id);
                break;
            case 'x':
                commit(types.ENABLE_BOTH_AXIS, id);
                break;
            case 'y':
                commit(types.ENABLE_NONE_AXIS, id);
                break;
            case 'none':
                commit(types.ENABLE_Y_AXIS, id);
                break;
        }
    },

    changeZToBottom({commit, state}, {id}) {
        if (state.rects[id].zIndex === 1) {
            return
        }

        commit(types.CHANGE_ZINDEX, {id, zIndex: 1});

        for (let i = 0, l = state.rects.length; i < l; i++) {
            if (i !== id) {
                if(state.rects[i].zIndex === state.rects.length){
                    continue
                }
                commit(types.CHANGE_ZINDEX, {id: i, zIndex: state.rects[i].zIndex + 1});
            }
        }
    },

    changeZToTop({commit, state}, {id}) {
        if (state.rects[id].zIndex === state.rects.length) {
            return
        }

        commit(types.CHANGE_ZINDEX, {id, zIndex: state.rects.length});

        for (let i = 0, l = state.rects.length; i < l; i++) {
            if (i !== id) {
                if(state.rects[i].zIndex === 1){
                    continue
                }
                commit(types.CHANGE_ZINDEX, {id: i, zIndex: state.rects[i].zIndex - 1});
            }
        }
    },

    setMinWidth({commit}, {id, width}) {
        commit(types.CHANGE_MINW, {id, minw:width});
    },

    setMinHeight({commit}, {id, height}) {
        commit(types.CHANGE_MINH, {id, minh:height});
    }
};
