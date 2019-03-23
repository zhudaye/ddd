import localforage from 'localforage'
const setStorage = (item, value) => {
  localforage.setItem(item, value).catch(function(err) {
    console.log(item + ':' + err)
  })
}
export default {
  state: {
    navList: [],
    activePath: undefined
  },
  reducers: {

    addNav (state, payload) {
      if (state.navList.find(ele => ele.path === payload.path)) {
        state = {
          navList: state.navList,
          activePath: payload.path
        }
      } else {
        state = {
          navList: [...state.navList, payload],
          activePath: payload.path
        }
      }

      setStorage('topNav', state)
      return state
    },

    removeNav (state, { payload, history }) {
      let index = state.navList.findIndex(ele => ele.path === payload.path)
      if (index === -1) {
        return state
      } else {
        let newNavList = [...state.navList]
        let removeNav = newNavList.splice(index, 1)
    
        if (removeNav[0].path === state.activePath) {
          if (newNavList[index]) {
            state = {
              navList: newNavList,
              activePath: newNavList[index].path
            }
          } else {
            state = {
              navList: newNavList,
              activePath: newNavList[index-1].path
            }
          }
          history.push(state.activePath)
        } else {
          state = {
            navList: newNavList,
            activePath: state.activePath
          }
        }

        setStorage('topNav', state)
        return state
      }
    },

    setActivePath (state, payload) {
      state = {
        navList: state.navList,
        activePath: payload
      }
      setStorage('topNav', state)
      return state
    },

    initState (state, { newState, payload }) {
      let navList = []
      let activePath = undefined

      if (newState) {
        navList = newState.navList
        activePath = newState.activePath
      } 

      if (!newState && payload) {
        navList = [payload]
        activePath = payload.path
      }

      if (newState && payload) {
        if (newState.navList && newState.navList.find(ele => ele.path === payload.path)) {
          navList = newState.navList
          activePath = payload.path
        } else {
          navList = newState.navList ? [...newState.navList, payload] : [payload]
          activePath = payload.path
        }
      }

      state = {
        navList,
        activePath
      }
      setStorage('topNav', state)
      return state
    }
  },

  effects: {
    async initStateAsync (payload, rootState)  {
      let newState = await localforage.getItem('topNav')
      this.initState({ newState, payload })
    }
  }
}