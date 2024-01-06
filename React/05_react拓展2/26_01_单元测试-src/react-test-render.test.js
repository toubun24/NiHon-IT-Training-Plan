// npm install react-test-renderer // erer

/*
PASS  src/react-test-render.test.js
  react-test-render
    √ NAME-TEST (37 ms)
    √ DELETE-TEST (35 ms)
    √ ADD-TEST (8 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.913 s
Ran all test suites.

Watch Usage: Press w to show more.
*/

import ShallowRender from 'react-test-renderer/shallow'
import ReactTestUtil from 'react-dom/test-utils'
import App from './App' // App

describe('react-test-render', function () {
    it('NAME-TEST', function () {
        const render = new ShallowRender() // 表示对App组件进行"浅渲染"
        render.render(<App />) // 获取 render 的结果
        console.log(render.getRenderOutput().props.children[0].props) // 每一个虚拟DOM对象都有props.children属性，它包含一个数组，里面是所有的子组件
        expect(render.getRenderOutput().props.children[0].type).toBe('h2') // props.children[0]就是第一个子组件
        expect(render.getRenderOutput().props.children[0].props.children).toBe('ToDoList')
    })
    it('DELETE-TEST', function () {
        const app = ReactTestUtil.renderIntoDocument(<App />) // 把一个 React 组件 render 到一个 detached(独立的) 的 DOM 中，该方法会返回被 render 的 React 组件的实例。
        const todoitems = ReactTestUtil.scryRenderedDOMComponentsWithTag(app, 'li') // scryRenderedDOMComponentsWithTag：找出所有匹配指定标签的节点
        const deletebutton = todoitems[0].querySelector('button')
        ReactTestUtil.Simulate.click(deletebutton) // 模拟在给定的 DOM 节点上触发特点事件。Simulate 可以触发所有 React 支持的事件类型
        const todoitemsAfterDelete = ReactTestUtil.scryRenderedDOMComponentsWithTag(app, 'li')
        expect(todoitems.length - 1).toBe(todoitemsAfterDelete.length)
    })
    it('ADD-TEST', function () {
        const app = ReactTestUtil.renderIntoDocument(<App />)
        const todoitems = ReactTestUtil.scryRenderedDOMComponentsWithTag(app, 'li')
        const addinput = ReactTestUtil.scryRenderedDOMComponentsWithTag(app, 'input')
        addinput.value = 'aaaa'
        const addbutton = ReactTestUtil.scryRenderedDOMComponentsWithTag(app, 'button')
        ReactTestUtil.Simulate.click(addbutton[0])
        const todoitemsAfterADD = ReactTestUtil.scryRenderedDOMComponentsWithTag(app, 'li')
        expect(todoitemsAfterADD.length).toBe(todoitems.length + 1)
    })
})