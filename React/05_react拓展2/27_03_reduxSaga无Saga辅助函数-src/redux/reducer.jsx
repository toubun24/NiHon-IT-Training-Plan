const InitState = {
    list: [],
    list2: []
}
function Reducer(prevState = InitState, action = {}) {
    switch (action.type) {
        case 'change-list1':
            const newlist1 = { ...prevState }
            newlist1.list = action.data
            return newlist1
        case 'change-list2':
            const newlist2 = { ...prevState }
            newlist2.list2 = action.data
            return newlist2
        default:
            return prevState
    }
}
export default Reducer