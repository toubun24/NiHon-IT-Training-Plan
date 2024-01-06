// import React, { Component } from 'react'
import { observable, configure, action, runInAction } from 'mobx' // mobx

configure({ // 严格模式， 必须写action
    enforceActions: 'always' // 如果是never，可以不写action
}) // 最好设置always, 防止任意地方修改值， 降低不确定性

const store = observable({ // const // store
    count: 0,
    add: function () {
        store.count++
    },
    minus: function () {
        store.count--
    },
    addof: function () {
        if (store.count % 2 !== 0) {
            store.count++
        }
    },
    asyncAdd: action(function () { // 严格模式下异步需action
        setTimeout(() => runInAction(() => store.count++), 1000) // 严格模式下异步需runInAction
    })
}, {
    add: action,
    minus: action,
    addof: action,
})

export default store // export