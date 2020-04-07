### 1.什么是vuex？
    vuex是一个专门为vue.js应用程序开发的状态管理插件.它采用集中式存储管理应用的所有组件的状态,而更改状态的唯一方法是提交mutation，例如this.$store.commit('SET_VIDEO_PAUSE', video_pause)，SET_VIDEO_PAUSE为mutations属性中定义的方法
### 2.Vuex解决了什么问题
- 多个组件依耐于同一状态时,对于多层嵌套的组件的传参将会非常繁琐,并且对于兄弟组件间的状态传递无能为力.
- 来自不同组件的行为需要变更同一状态.以往采用父子组件直接引用或者通过事件来变更和同步状态的多分拷贝。这些模式会非常脆弱，导致无法维护代码.
### 3.什么时候使用vuex？
- 多个组件依耐于同一状态时
- 来自不同组件的行为需要变更同一状态
### 4.vuex的5个核心属性是什么?
分别是state,getter,mutation,actions，modules
### 5.vuex中的状态存储在那里，怎么改变它?
存储在state中,改变vuex中的状态的唯一途径就是显示地提交mutation
### 6.vuex中状态是对象时,使用时要注意什么?
因为对象是引用类型的，复制后改变属性还是会影响原始数据,这样会改变state里面的状态,是不允许，所以先用深度克隆复制对象，再修改
### 7.怎么在组件中批量使用vuex的state状态？
使用mapState辅助函数,利用对象展开运算符将state混入computed对象中
````ecmascript 6
import { mapState } from 'vuex';
export default {
  coumputed: {
    ...mapState(['price','number'])
  }
}
````
###8.vuex中要从state派生一些状态出来,且多个组件使用它,该怎么做?
使用getter属性,相当于vue中的计算属性computed，只有原状态改变派生状态才会改变
getter接收两个参数,第一个是state，第二个是getters(可以用来访问其它getter)
```ecmascript 6
const store = new Vuex.Store({
  state: {
    price: 10,
    number: 10,
    discount: 0.7
  },
  getters: {
    total: state => {
      return state.price * state.number
    },
    discountTotal: (state, getters) => {
      return state.discount * getters.total
    }
  },
});
```

然后在组件中可以使用计算属性computed通过this.$route.getters.total这样来访问这些派生状态
````ecmascript 6
computed: {
  total() {
    return this.$store.getters.total;
  },
  discountTotal() {
    return this.$store.getters.discountTotal;
  }
}
````
### 怎么通过getter来实现在组件内可以通过特定条件来获取state的状态
通过让getter返回一个函数,来实现给getter传参.然后通过参数来进行判断从而获取state中满足要求的状态
```ecmascript 6
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  }
})
```
然后在组件中可以用计算属性computed通过this.$store.getters.getTodoById(2)这样来访问这些派生状态
```ecmascript 6
computed: {
    getTodoById() {
        return this.$store.getters.getTodoById
    },
}
mounted(){
    console.log(this.getTodoById(2).done)//false
}
```
### 怎么在组件中批量使用Vuex的getter属性
使用mapGetters辅助函数,利用对象展开元素符将getter混入computed对象中
```ecmascript 6
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      myTotal: 'total',
      myDiscountTotal: 'discountTotal'
    })
  }
}
```
### 在Vuex的state中有个状态number表示货物数量,在组件怎么改变它
首先要在mutations中注册一个mutation
```ecmascript 6
const store = new Vuex.Store({
  state: {
    number: 10,
  },
  mutations: {
    SET_NUMBER(state, data) {
      state.number = data;
    }
  }
});
```
在组件中使用this.$store.commit提交mutation，改变number
```ecmascript 6
this.$store.commit('SET_NUMBER', 10)
```
### 在Vuex中使用mutation要注意什么
mutation必须是同步函数
### 在组件中多次提交同一个action,怎么写使用更方便
使用mapActions辅助韩素,在组件中这么使用
```ecmascript 6
methods: {
  ...mapActions({
  setNumber: 'SET_NUMBER'  
})
}
```
然后调用this.setNumber(10)相当调用this.$store.dispatch('SET_NUMBER',10)

### vuex中action通常是异步的,那么如何知道action什么时候结束呢?
在action函数中返回Promise,然后在提交的时候用then处理
```ecmascript 6
actions: {
  SET_NUMER_A({commit}, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() =>{
        commit('SET_NUMBER_A',10)
      }, 2000)
    })
  }
}
this.$store.dispatch('SET_NUMBER_A').then(() => {});
```
### Vuex中有两个action，分别是actionA和actionB,其内都是异步操作,在actionB要提交actionA,需要actionA处理结束在再处理其它操作,怎么实现?
```ecmascript 6
actions: {
  async actionA({mommit}) {},
  async actionB({dispatch}) {
    await dispatch('actionA')
  }
}
```








































