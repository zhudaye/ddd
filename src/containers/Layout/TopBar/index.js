import React, { Component } from 'react';
import styles from './index.less';
import { Icon } from 'antd'
import { connect } from 'react-redux';

@connect(({topBar}) => ({
  navList: topBar.navList,
  activePath: topBar.activePath
}),
({topBar}) => ({
  removeNav: payload => topBar.removeNav(payload),
  setActivePath: payload => topBar.setActivePath(payload)
}))
class TopBar extends Component {
  state = {
    activePath: '',
    navList: []
  }

  static getDerivedStateFromProps (props, state) { // 组件每次被rerender的时候，包括在组件构建之后(虚拟dom之后，实际dom挂载之前)，每次获取新的props或state之后；;每次接收新的props之后都会返回一个对象作为新的state，返回null则说明不需要更新state

    if (JSON.stringify(props.navList) !== JSON.stringify(state.navList)) {
      state.navList = props.navList
    }

    if (state.activePath !== props.activePath) {
      state.activePath = props.activePath
    }
    return state
  }
 
  setActivePath = path => () => {
    if (path !== this.state.activePath) {
      this.props.history.push(path)
    }
  }

  removeNav = item => e => {
    e.stopPropagation();
    this.props.removeNav({ payload: item, history: this.props.history })
  }

  outContainer = React.createRef()
  innerContainer = React.createRef()

  componentDidUpdate() {
    let activeNav = this.innerContainer.current.querySelector('.oneNav.active')
  }

  render() {
    const { 
      navList, 
      activePath, 
    } = this.state

    return (
      <div 
        className={`${styles.topBar} ${styles.outWidth}`}
        ref={this.outContainer}
      >
        <div className={styles.leftBut}><Icon type='left'/></div>
        <div className={styles.rightBut}><Icon type='right'/></div>
        <ul 
          className={styles.topBarUl}
          ref={this.innerContainer}
        >
          {
            navList.map(ele => <li 
              className={`oneNav ${styles.oneNav} ${activePath === ele.path ? `${styles.active} active` : ''}`} 
              key={ele.path}
              onClick={this.setActivePath(ele.path)}
            >
              { ele.iconType ? <Icon className={styles.navIcon} type={ele.iconType} /> : ''}
              <span>{ele.text}</span>
              { navList.length > 1 ? <Icon className={`${styles.navIconClose} ${activePath === ele.path ? styles.active : ''}`} onClick={this.removeNav(ele)} type='close-circle' /> : ''}
            </li>)
          }
        </ul>
      </div>
    )
  }
}

export default TopBar;