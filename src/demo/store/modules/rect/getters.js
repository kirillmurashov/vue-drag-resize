export default {
    getActive: state => {
        for (let i = 0, l = state.rects.length; i < l; i++) {
            let rect = state.rects[i];

            if (rect.active) {
                return i;
            }
        }
        return null;
    }
}