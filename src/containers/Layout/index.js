import React, { Component } from 'react'
import styles from './index.less'
import { Menu, Icon, Layout } from 'antd'
import TopBar from './TopBar'
import createRoute from '@src/createRoute'
import { connect } from 'react-redux'

const { SubMenu, Item } = Menu
const { Sider } = Layout

const createNav = (childRoutes = [], rootRoute = '', subKey = []) => {
  return childRoutes.map(ele => {
    if(ele.isDefault || ele.noNav) {
      return ''
    }
    if (ele.sort) {
      return <SubMenu key={rootRoute + ele.sort} title={<span><Icon type={ele.iconType} /><span>{ele.text}</span></span>}>
        {createNav(ele.childRoutes, rootRoute, subKey && subKey.length > 0 ? [...subKey, rootRoute + ele.sort] : [rootRoute + ele.sort])}
      </SubMenu>
    } else {
      return <Item key={rootRoute + ele.path} subkey={subKey}>
        <Icon type={ele.iconType} />
        <span>{ele.text}</span>
      </Item>
    }
  })
}

let routerNavMap = null // 路由与左导航映射关系

// 生成导航路由映射分组
const createMap = (childRoutes = [], rootRoute = '', subKey = []) => {
  let mapObj = {}
  childRoutes.forEach( ele => {
    if (!ele.isDefault && !ele.noNav) {
      if (ele.sort) {
        let minMapObj = createMap(ele.childRoutes, rootRoute, subKey && subKey.length > 0 ? [...subKey, rootRoute + ele.sort] : [rootRoute + ele.sort])
        Object.assign(mapObj, minMapObj)
      } else {
        Object.assign(mapObj, {
          [rootRoute + ele.path]: {
            path: rootRoute + ele.path,
            text: ele.text,
            iconType: ele.Type,
            subKey
          }
        })
      }
    }
  })

  return mapObj
}

@connect(({topBar}) => ({
  activePath: topBar.activePath
}),
({topBar}) => ({
  addNav: payload => topBar.addNav(payload),
  initStateAsync: payload => topBar.initStateAsync(payload)
})
)
class MyLayout extends Component {
 
  state = {
    navOpen: true,
    minWidth: 80,
    maxWidth: 200,
    activePath: undefined,
    openKeys: [],
    saveopenKeys: [],
  }

  static getDerivedStateFromProps (props, state) { // 组件每次被rerender的时候，包括在组件构建之后(虚拟dom之后，实际dom挂载之前)，每次获取新的props或state之后；;每次接收新的props之后都会返回一个对象作为新的state，返回null则说明不需要更新state
    if (!routerNavMap) {
      routerNavMap = createMap(props.childRoutes, props.parentPath)
    }
    
    if (state.activePath !== props.location.pathname && props.location.pathname !== '/layout') {
      state.activePath = props.location.pathname

      if (routerNavMap[props.location.pathname]) {
        props.addNav(routerNavMap[props.location.pathname])
        state.activePath = props.location.pathname
        state.saveopenKeys = routerNavMap[props.location.pathname].subKey
        state.openKeys = state.navOpen ? routerNavMap[props.location.pathname].subKey : []
      }
    }
    return state
  }

  // 展开关闭左导航
  changeNav = () => {
    
    if (this.state.navOpen) {
      this.setState({
        navOpen: !this.state.navOpen,
        saveopenKeys: this.state.openKeys,
        openKeys: [],
      })
    } else {
      this.setState({
        navOpen: !this.state.navOpen,
        openKeys: this.state.saveopenKeys,
        saveopenKeys: [],
      })
    }
  }

  select = ({item, key}) => {
    // this.setState({
    //   activePath: key,
    //   openKeys: item.props.subkey
    // }, ()=> {
      this.props.history.push(key)
    // })
  }

  openChange = openKeys => {
    this.setState({
      openKeys: openKeys
    })
  }

  componentDidMount () {
    this.props.initStateAsync(routerNavMap[this.props.location.pathname])
    // const { childRoutes, parentPath }= this.props
    // this.setState({
    //   activePath: parentPath + childRoutes.find(ele => ele.isDefault).defaultPath
    // })
  }

  render () {
    const { childRoutes, parentPath }= this.props
    let open = this.state.navOpen
    let width = open ?  this.state.maxWidth : this.state.minWidth
    return <div className={styles.layout}>
      <div className={styles.leftLayout} style={{width}}>
        <div className={styles.logo}>
        </div>
        <div className={styles.menuContent}>
          <Sider
            trigger={null}
            collapsible
            collapsed={!open}
          >
            <Menu  
              theme="dark" 
              mode="inline" 
              selectedKeys={[this.state.activePath]}
              openKeys={this.state.openKeys}
              onOpenChange={this.openChange}
              onSelect={this.select}
            >
              {createNav(childRoutes, parentPath)}
            </Menu>
          </Sider>
        </div>
        <div className={styles.meunDot} onClick={this.changeNav}>
          <span className={styles.dotIcon} style={{transform: open ? 'rotateY(0deg)' : 'rotateY(180deg)'}}><Icon type="left" /></span>
        </div>
      </div>
      <div className={styles.header} style={{paddingLeft: width}}>
        <div className={styles.headerContent}>
        <div className={styles.navTop}>
          <TopBar 
            history={this.props.history}
          />
        </div>
        </div>
      </div>
      <div className={styles.content} style={{paddingLeft: width }}>
        <div className={styles.contentMain}>
        {createRoute(childRoutes, parentPath)}
        </div>
      </div>
    </div>  
  }
}

export default MyLayout