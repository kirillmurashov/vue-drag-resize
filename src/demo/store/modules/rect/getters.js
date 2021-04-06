export default {
    activeRect: (state) => {
        return state.rects[state.activeRectId] ?? null;
    }
};