import { observable, configure, action, runInAction } from 'mobx'
import { makeObservable} from "mobx" // mobx 6

configure({
    enforceActions: 'always'
})

// const store = observable({
class Store {
    // count: 0,
    @observable count = 0
    constructor(){  // mobx 6
        makeObservable(this) // mobx 6
    }  // mobx 6
    // add: function () {
    @action add() {
        // store.count++
        this.count++ // store => this
    } // ,
    // minus: function () {
    @action minus() {
        // store.count--
        this.count-- // store => this
    } // ,
    // addof: function () {
    @action addof() {
        // if (store.count % 2 !== 0) {
        if (this.count % 2 !== 0) { // store => this
            // store.count++
            this.count++ // store => this
        }
    } // ,
    // asyncAdd: action(function () {
    @action asyncAdd() {
        // setTimeout(() => runInAction(() => store.count++), 1000)
        setTimeout(() => runInAction(() => this.count++), 1000) // runInAction // this
    } // )
    // },
    /*
    {
        add: action,
        minus: action,
        addof: action,
    })
    */
}

const store = new Store() // Store => store
export default store