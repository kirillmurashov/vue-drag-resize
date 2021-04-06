import types from './mutation-types';

export default {
    setActive({ commit, state }, { id }) {
        if(state.activeRectId !== null){
            commit(types.DISABLE_ACTIVE, state.activeRectId);
        }
        commit(types.ENABLE_ACTIVE, id);
    },
    unsetActive({ commit }, { id }) {
        commit(types.DISABLE_ACTIVE, id);
    },

    toggleDraggable({ commit, state }) {
        const id = state.activeRectId;
        if (id === null) {
            return;
        }

        if (!state.rects[id].draggable) {
            commit(types.ENABLE_DRAGGABLE, id);
        } else {
            commit(types.DISABLE_DRAGGABLE, id);
        }
    },

    toggleResizable({ commit, state }) {
        const id = state.activeRectId;
        if (id === null) {
            return;
        }
        if (!state.rects[id].resizable) {
            commit(types.ENABLE_RESIZABLE, id);
        } else {
            commit(types.DISABLE_RESIZABLE, id);
        }
    },

    toggleParentLimitation({ commit, state }) {
        const id = state.activeRectId;
        if (id === null) {
            return;
        }
        if (!state.rects[id].parentLim) {
            commit(types.ENABLE_PARENT_LIMITATION, id);
        } else {
            commit(types.DISABLE_PARENT_LIMITATION, id);
        }
    },

    toggleSnapToGrid({ commit, state }) {
        const id = state.activeRectId;
        if (id === null) {
            return;
        }
        if (!state.rects[id].snapToGrid) {
            commit(types.ENABLE_SNAP_TO_GRID, id);
        } else {
            commit(types.DISABLE_SNAP_TO_GRID, id);
        }
    },

    toggleAspectRatio({ commit, state }) {
        const id = state.activeRectId;
        if (id === null) {
            return;
        }
        if (!state.rects[id].aspectRatio) {
            commit(types.ENABLE_ASPECT, id);
        }else{
            commit(types.DISABLE_ASPECT, id);
        }
    },

    setWidth({ commit, state }, width) {
        const id = state.activeRectId;
        if (id === null) {
            return;
        }

        commit(types.CHANGE_WIDTH, { id, width });
    },

    setHeight({ commit, state }, height) {
        const id = state.activeRectId;
        if (id === null) {
            return;
        }
        commit(types.CHANGE_HEIGHT, { id, height });
    },

    setTop({ commit, state }, top) {
        const id = state.activeRectId;
        if (id === null) {
            return;
        }
        commit(types.CHANGE_TOP, { id, top });
    },

    setLeft({ commit, state }, left) {
        const id = state.activeRectId;
        if (id === null) {
            return;
        }
        commit(types.CHANGE_LEFT, { id, left });
    },

    changeXLock({ commit, state }) {
        const id = state.activeRectId;
        if (id === null) {
            return;
        }
        switch(state.rects[id].axis) {
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

    changeYLock({ commit, state }) {
        const id = state.activeRectId;
        if (id === null) {
            return;
        }

        switch(state.rects[id].axis) {
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

    changeZToBottom({ commit, state }) {
        const id = state.activeRectId;
        if (id === null) {
            return;
        }
        if (state.rects[id].zIndex === 1) {
            return;
        }

        commit(types.CHANGE_ZINDEX, { id, zIndex: 1 });

        for (let i = 0, l = state.rects.length; i < l; i++) {
            if (i !== id) {
                if (state.rects[i].zIndex === state.rects.length) {
                    continue;
                }
                commit(types.CHANGE_ZINDEX, { id: i, zIndex: state.rects[i].zIndex + 1 });
            }
        }
    },

    changeZToTop({ commit, state }) {
        const id = state.activeRectId;
        if (id === null) {
            return;
        }
        if (state.rects[id].zIndex === state.rects.length) {
            return;
        }

        commit(types.CHANGE_ZINDEX, { id, zIndex: state.rects.length });

        for (let i = 0, l = state.rects.length; i < l; i++) {
            if (i !== id) {
                if (state.rects[i].zIndex === 1) {
                    continue;
                }
                commit(types.CHANGE_ZINDEX, { id: i, zIndex: state.rects[i].zIndex - 1 });
            }
        }
    },

    setMinWidth({ commit, state }, width) {
        const id = state.activeRectId;
        if (id === null) {
            return;
        }
        commit(types.CHANGE_MINW, { id, minw: width });
    },

    setMinHeight({ commit, state }, height) {
        const id = state.activeRectId;
        if (id === null) {
            return;
        }
        commit(types.CHANGE_MINH, { id, minh: height });
    },

    setGridX({ commit, state }, gridX) {
        const id = state.activeRectId;
        if (id === null) {
            return;
        }
        commit(types.CHANGE_GRID_X, { id, gridX });
    },

    setGridY({ commit, state }, gridY) {
        const id = state.activeRectId;
        if (id === null) {
            return;
        }
        commit(types.CHANGE_GRID_Y, { id, gridY });
    },

    setStickSize({ commit, state }, stickSize) {
        const id = state.activeRectId;
        if (id === null) {
            return;
        }
        commit(types.CHANGE_STICK_SIZE, { id, stickSize });
    },
};
