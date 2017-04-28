import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route } from 'react-router-dom'
import { initUserForm } from 'REDUCER/public/main'
import { initUserMenu } from 'REDUCER/public/menu'
import Loading from 'COMPONENT/Loading'
import Header from './Header'
import Welcome from '../Welcome'
import BranchManage from '../BranchManage/sync'
import UserManage from '../UserManage/sync'
import RoleManage from '../RoleManage/sync'
import PostManage from '../PostManage/sync'
import ReviewSettings from '../ReviewSettings/sync'
import StrategySettings from '../StrategySettings/sync'
import CheckList from '../CheckList/sync'
import CheckHistoryList from '../CheckHistoryList/sync'
import ApplyHistoryList from '../ApplyHistoryList/sync'

@connect(
  null,
  dispatch => bindActionCreators({ initUserForm, initUserMenu }, dispatch)
)

export default class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentWillMount () {
    this.props.initUserForm()
    this.props.initUserMenu(() => {
      this.setState({
        loaded: true
      })
    })
  }

  render () {
    const view = (
      <div className='app-main'>
        <Header />
        <div className='app-content'>
          <div className='app-page-wrapper'>
            <Switch>
              <Route path='/home/branchList.html' component={BranchManage} />
              <Route path='/home/User.html' component={UserManage} />
              <Route path='/home/Role.html' component={RoleManage} />
              <Route path='/home/postList.html' component={PostManage} />
              <Route path='/home/relationList.html' component={ReviewSettings} />
              <Route path='/home/relationSet.html' component={StrategySettings} />
              <Route path='/home/checkList.html' component={CheckList} />
              <Route path='/home/checkHistoryList.html' component={CheckHistoryList} />
              <Route path='/home/pendHistoryList.html' component={ApplyHistoryList} />
              <Route component={Welcome} />
            </Switch>
          </div>
        </div>
      </div>
    )

    return this.state.loaded ? view : <Loading />
  }
}
