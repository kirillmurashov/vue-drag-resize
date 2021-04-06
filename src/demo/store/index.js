import { createStore } from 'vuex';
import rect from './modules/rect';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
    /**
     * Assign the modules to the store
     */
    modules: { 'rect': rect },

    /**
     * If strict mode should be enabled
     */
    strict: debug,
});
