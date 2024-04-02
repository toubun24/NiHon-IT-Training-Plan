import { createStore } from 'vuex';
// import
import count from './count';
import person from './person';

export default createStore({
    // actions,
    // mutations,
    // state,
    // getters,
    modules: {
        count,
        person
    }
});






