import React, { Component } from 'react'

export default (loadComponent, loadingComponent= '') => {
  class AsyncComponent extends Component{
    constructor () {
      super()
      this.state = {
        Child: null
      }
      this.unmount = false
    }

    async componentDidMount () {
      const { default: Child } = await loadComponent()
      if (this.unmount) return
      this.setState( {
        Child
      })
    }

    componentWillUnmount () {
      this.unmount = true
    }

    render () {
      const { Child } = this.state
      return <div>
        {Child ? <Child {...this.props}/> : loadingComponent}
      </div>
    }
  }

  return AsyncComponent
}