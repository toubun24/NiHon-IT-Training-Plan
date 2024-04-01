import { createStore } from 'vuex';

const actions = {
    incrementIfOdd(context, value) {
        if (context.state.sum % 2) {
            console.log('@')
            context.commit('INCREMENT', value);
        }
    },
    incrementWait(context, value) {
        setTimeout(() => {
            context.commit('INCREMENT', value);
        }, 500)
    },
}

const mutations = {
    INCREMENT(state, value) {
        state.sum += value;
    },
    DECREMENT(state, value) {
        state.sum -= value;
    },
    // Person
    ADD_PERSON(state, value){
        state.personList.unshift(value);
    }
}

const getters = {
    bigSum(state) {
        return state.sum * 10;
    }
}

const state = {
    sum: 0,
    school: 'Osaka',
    subject: 'Computer Science',
    // Person
    personList: [
        { id: '001', name: '张三'}
    ],
}

export default createStore({
    actions,
    mutations,
    state,
    getters,
});






