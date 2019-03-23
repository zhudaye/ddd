import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Error404 } from '@components'

const flatRouter = routerList => {
  let newRouterList = []
  routerList.forEach(ele => {
    if (!ele.sort) {
      newRouterList[newRouterList.length] = ele
    } else {
      newRouterList = [...newRouterList, ...flatRouter(ele.childRoutes)]
    }
  })
  
  return newRouterList
}

export default (routerList = [], parentPath = '', has404 = false) => {
  
  return <Switch>
    {
      flatRouter(routerList).map((ele, index) => {
        if ( ele.isDefault ) {
          return <Route path={parentPath || '/'} exact key={index} render={() => <Redirect to={parentPath + ele.defaultPath}/>} />
        } else {
          return <Route path={parentPath + ele.path} exact={!ele.noExact} key={index} render={props => <ele.component {...props} parentPath={parentPath + ele.path} childRoutes={ele.childRoutes || []}/>} />
        }
      })
    }
    {has404 ? <Route path='/404' exact component={Error404} /> : ''}
    <Route exact render={() => <Redirect to='/404' />} />
  </Switch>
}