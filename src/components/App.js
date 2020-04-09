/*React************************************************************************/
/*  Copyright 2020 Maxim Zhukov                                               */
/*                                                                            */
/*  Licensed under the Apache License, Version 2.0 (the "License");           */
/*  you may not use this file except in compliance with the License.          */
/*  You may obtain a copy of the License at                                   */
/*                                                                            */
/*      http://www.apache.org/licenses/LICENSE-2.0                            */
/*                                                                            */
/*  Unless required by applicable law or agreed to in writing, software       */
/*  distributed under the License is distributed on an "AS IS" BASIS,         */
/*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  */
/*  See the License for the specific language governing permissions and       */
/*  limitations under the License.                                            */
/******************************************************************************/
import   React, { Component }         from 'react'
import   PropTypes                    from 'prop-types'
import { connect }                    from 'react-redux'
import { bindActionCreators }         from 'redux'
import   msgr                         from 'msgr'
import   ReactNotification, { store } from 'react-notifications-component'
import { Container, Button, Image, Feed, Card, Segment, Header, Icon, Menu, Label, Sidebar, Divider                                    } from 'semantic-ui-react'
import { faHome, faExclamationCircle, faCogs, faClipboardList, faUtensils, faExclamationTriangle, faBolt, faCloud, faShieldAlt, faBars } from '@fortawesome/free-solid-svg-icons'
import { faBell                                                                                                                } from "@fortawesome/free-regular-svg-icons"
import { library }                    from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon }            from '@fortawesome/react-fontawesome'
import   actions                      from '../actions'
import   LoginFormModal               from '../components/LoginFormModal'

//import '@fortawesome/fontawesome-svg-core/styles.css'
import 'animate.css/animate.min.css'
import 'react-notifications-component/dist/theme.css'

library.add(
  faHome, faExclamationCircle, faClipboardList, faCogs, faUtensils, faExclamationTriangle, faBolt, faCloud, faShieldAlt, faBars,
  faBell
)

class App extends React.Component {
  static displayName  = 'App'
  state = {
    width:  0,
    height: 0,
    online:  true,
    srvOk:   'checking', 
    tokenOk: false,
    swChannel: null
  }

  updateWindowDimensions = () => this.setState({ width:window.innerWidth, height:window.innerHeight })

  updateOnlineStatus = () => {}

  handleMainTimerTick = data => this.props.internalsCr.setTCurr(Date.now())

  componentWillUnmount = () => {
//    this.props.internalsCr.stopActionMonitor(actions.internals.types.MAIN_SYS_TICK)
//    this.props.internalsCr.stopMainTicks()
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.authState.errorShown!==this.props.authState.errorShown && this.props.authState.errorShown===false) {
      this.showAuthErrorToast()
    }
    if (prevProps.internalsState.mainTimerOn!==this.props.internalsState.mainTimerOn && typeof this.state.swChannel.send==='function') {
      if (this.props.internalsState.mainTimerOn===true) {
        this.state.swChannel.send('START_MAIN_TIMER', 1000)
      } else {
        this.state.swChannel.send('CLEAR_MAIN_TIMER')
      }
    }
  }

  componentDidMount = () => {
//    this.props.internalsCr.startMainTicks()
//    this.props.internalsCr.startActionMonitor(3000, actions.internals.types.MAIN_SYS_TICK, ()=>console.log(`[REDUX-TIMEOUT]: Action ${actions.internals.types.MAIN_SYS_TICK} has just timed out - it wasn't seen for more than 3 seconds. Alarm!!`))

    this.updateWindowDimensions()

    window.addEventListener('resize', this.updateWindowDimensions)

    navigator.serviceWorker.ready.then(
      registration => this.setState(
        { swChannel:msgr.client(navigator.serviceWorker.controller,{MAIN_TIMER_TICK:this.handleMainTimerTick}) },
        () => this.state.swChannel.ready(
          () => {
            if (this.props.internalsState.mainTimerOn===true) {
              this.state.swChannel.send('START_MAIN_TIMER',1000)
            } else {
              this.state.swChannel.send('CLEAR_MAIN_TIMER')
            }
          }
        )
      )
    )
  }

  askNotificationPermission = () => {
    const checkNotificationPromise = () => {
      try {
        Notification.requestPermission().then()
      } catch(err) {
        return false
      }
      return true
    }

    const handlePermission = permission => {
      if(!('permission' in Notification)) {
        Notification.permission = permission
      }
    }

    if (!('Notification' in window)) {
      console.log('This browser does not support notifications.')
    } else {
      if(checkNotificationPromise()) {
        Notification.requestPermission().then( permission=>handlePermission(permission) )
      } else {
        Notification.requestPermission( permission=>handlePermission(permission) )
      }
    }
  }

  showAuthErrorToast = () => {
    this.props.authCr.setErrorShown(true)
    /* store.removeNotification(id) -- for all other ids */
    store.addNotification({ 
      content: (
        <Card centered fluid raised style={{backgroundColor:'#000000', fontSize:'1em', borderTopLeftRadius:'2em', borderTopRightRadius:'2em'}}>
         <Card.Content style={{fontSize:'1em'}}>
          <FontAwesomeIcon icon={faExclamationCircle} pull='right' color='red' fixedWidth size='2x'/>
          <Card.Header textAlign='left'   style={{color:'#ff2222', fontSize:'1.6em', fontWeight:700}}>{this.props.authState.errorMessage.title}</Card.Header>
          <Card.Meta   textAlign='center' style={{color:'#ffffff', fontSize:'1.0em', fontWeight:500}}>{this.props.authState.errorMessage.header}</Card.Meta>
          <Card.Description               style={{color:'#b0b0b0', fontSize:'0.8em', fontWeight:200}}>{this.props.authState.errorMessage.body}</Card.Description>
         </Card.Content>
         <Card.Content extra content=' ' style={{backgroundColor:'#000000', fontSize:'1em', lineHeight:'1.4em'}}/>
        </Card>
      ),
      insert: 'bottom',
      container: 'bottom-center',
      animationIn: ['animated', 'slideInUp'],
      animationOut: ['animated', 'slideOutDown'],
      dismiss: {
        duration: 5000,
        pauseOnHover: true
      },
      onRemoval: (id, removedBy) => {
        //console.log(`Notification with id=${id} has just been removed (removedBy=%o)`, removedBy)
      }
    })
  }

  openBMenu = () => {
    this.props.globalUICr.setBMenuOpen(true)
  }
  openSettings = () => {
    this.props.globalUICr.setSettingsOpen(true)
    this.props.globalUICr.setSysFeedOpen(false)
    this.props.globalUICr.setExtStatusOpen(false)
    this.props.globalUICr.setBMenuOpen(false)
  }
  openSysFeed = () => {
    this.props.globalUICr.setSysFeedOpen(true)
    this.props.globalUICr.setSettingsOpen(false)
    this.props.globalUICr.setExtStatusOpen(false)
    this.props.globalUICr.setBMenuOpen(false)
  }
  openExtStatus = () => {
    this.props.globalUICr.setExtStatusOpen(true)
    this.props.globalUICr.setSettingsOpen(false)
    this.props.globalUICr.setSysFeedOpen(false)
    this.props.globalUICr.setBMenuOpen(false)
  }
  handleSettingsHide  = () => this.props.globalUICr.setSettingsOpen(false)
  handleSysFeedHide   = () => this.props.globalUICr.setSysFeedOpen(false)
  handleBMenuHide     = () => this.props.globalUICr.setBMenuOpen(false)
  handleExtStatusHide = () => this.props.globalUICr.setExtStatusOpen(false)

  timerReset  = () => {
    if (this.props.internalsState.mainTimerOn===true) {
      this.props.internalsCr.setMainTimerOn(false)
      this.props.internalsCr.setTStart(false)
      this.props.internalsCr.setTCurr(false)
    }
  }
  timerStart  = () => {
    if (this.props.internalsState.mainTimerOn===false) {
      this.props.internalsCr.setTStart(Date.now())
      this.props.internalsCr.setTCurr(Date.now())
      this.props.internalsCr.setMainTimerOn(true)
    }
  }

  render = () => {
    const tabIdx   = this.props.globalUIState.tabActiveIndex
    const tStartTS = this.props.internalsState.timerStartTimeStamp
    const tCurrTS  = this.props.internalsState.timerCurrentTimeStamp

    return (
      <Sidebar.Pushable as={Container} className='App' fluid>
       <ReactNotification/>

       <Sidebar as={Menu} animation='overlay' direction='left' icon='labeled' onHide={this.handleBMenuHide} vertical visible={this.props.globalUIState.burgerMenuOpen} width='wide' style={{zIndex:10001,backgroundColor:'#808000'}}>
        <Divider/>
        <Menu.Header>System menu</Menu.Header>
        <Divider/>
        <Menu.Item onClick={this.openSettings}><FontAwesomeIcon icon={faCogs} fixedWidth/> Settings</Menu.Item>
        <Menu.Item onClick={this.openSysFeed}><FontAwesomeIcon icon={faClipboardList} fixedWidth/> System feed</Menu.Item>
        <Menu.Item onClick={this.openExtStatus}><FontAwesomeIcon icon={faClipboardList} fixedWidth/> Status (ext)</Menu.Item>
       </Sidebar>

       <Sidebar as={Container} animation='overlay' direction='right' onHide={this.handleSettingsHide} visible={this.props.globalUIState.settingsOpen} className='Settings' fluid>
        <Header>Settings</Header>
        <div style={{color:'red'}} onClick={this.handleSettingsHide}>tabIdx: {tabIdx+2}</div>
       </Sidebar>

       <Sidebar as={Container} animation='overlay' direction='right' onHide={this.handleSysFeedHide} visible={this.props.globalUIState.systemFeedOpen} className='App' fluid style={{zIndex:10002}}>
        <Header>System feed</Header>
        <div style={{color:'red'}} onClick={this.handleSysFeedHide}>tabIdx: {tabIdx+3}</div>
       </Sidebar>

       <Sidebar as={Container} animation='overlay' direction='right' onHide={this.handleExtStatusHide} visible={this.props.globalUIState.extendedStatusOpen} className='App' fluid style={{zIndex:10002}}>
        <Header>Extended status</Header>
        <div style={{color:'red'}} onClick={this.handleExtStatusHide}>tabIdx: {tabIdx+4}</div>
       </Sidebar>

       <Menu fixed='top' style={{zIndex:10000}} size='mini' inverted style={{backgroundColor:'#808000'}}>
        <Menu.Menu position='left'>
         <Menu.Item fitted onClick={this.openBMenu}><FontAwesomeIcon icon={faBars} pulled='left' size='2x'/></Menu.Item>
        </Menu.Menu>
        <Menu.Item fitted='horizontally'>
         <FontAwesomeIcon icon={faBolt}      fixedWidth className='statusIconOk'/>
         <FontAwesomeIcon icon={faShieldAlt} fixedWidth className='statusIconInactive'/>
        </Menu.Item>
        <Menu.Menu position='right'>
         <Menu.Item fitted='vertically' onClick={()=>this.props.authCr.setErrorShown(false)}><FontAwesomeIcon icon={faExclamationCircle} color='red' fixedWidth style={{fontSize:'1.5em',lineHeight:'1em'}}/>Auth err</Menu.Item>
          <Menu.Item fitted><LoginFormModal {...this.props.authState} {...this.props.authCr}/></Menu.Item>
        </Menu.Menu>
       </Menu>

       <Segment className='tabPane' raised>
        <div style={{textAlign:'center'}}>[ {tStartTS===false||tCurrTS===false ? '0 sec' : `${Math.round((tCurrTS-tStartTS)/1000)} sec`} ]</div>
        <Button.Group widths='3' size='mini' compact fluid>
         <Button content='Start'                                 onClick={this.timerStart}                disabled={tStartTS!==false}/>
         <Button content={`N.Req\n(${Notification.permission})`} onClick={this.askNotificationPermission} disabled={Notification.permission!=='denied' && Notification.permission!=='default'} style={{fontSize:'.75rem'}} basic/>
         <Button content='Reset'                                 onClick={this.timerReset}/>
        </Button.Group>
       </Segment>
       <style jsx={true} global={true}>{`
         @keyFrames statusIconCheckingAnim {
             0% { color:white; }
           100% { color:grey;  }
         }
         .statusIconChecking {
           animation: statusIconCheckingAnim 0.1s linear infinite alternate;
         }
         .statusIconOk {
           color:#00ff00;
         }
         .statusIconInactive {
           color:white;
         }
         .statusIconError {
           color:#ff0000;
         }
          @keyFrames contDoKF {
             0% { background-color:rgba(255,255,255,0.5) }
           100% { background-color:rgba(127,127,0,0.5)   }
         }
         .contDo {
           animation: contDoKF 1s ease-in-out infinite alternate;
         }
         .App.App.App.App.App {
           font-size: 1rem;
           width: 100% !important;
           height: 100%;
           display: flex;
           padding: 0;
           margin: 0;
           margin-left:0 !important;
           margin-right:0 !important;
           flex-flow:column nowrap;
           justify-content: center;
           align-items: center;
           color: white;
           padding-top: calc(2.85714286 * 0.78571429rem);
           background-color: #b0b000;
         }
         .tabPane.tabPane {
           font-size: 1rem;
           color: black;
         }
         .Settings.Settings.Settings.Settings.Settings {
           font-size: 1rem;
           width: 100% !important;
           height: 100%;
           display: flex;
           padding: 0;
           margin: 0;
           margin-left:0 !important;
           margin-right:0 !important;
           flex-flow:column nowrap;
           justify-content: flex-start;
           align-items: stretch;
           color: black;
           background-color: #808000;
           z-index: 10002;
         }
         .App.App.App.App.App .notification-container-mobile-bottom.notification-container-mobile-bottom.notification-container-mobile-bottom {
           bottom: 0px;
           margin-bottom: -15px;
         }
         .App.App.App.App.App .notification-container-bottom-center.notification-container-bottom-center.notification-container-bottom-center {
           bottom: -15px;
         }
       `}</style>
        <style jsx>{`
         .notification-message        {color:#00ff00;}
         .notification-custom-content {flex-basis:80%; padding:12px 12px 12px 8px; display:inline-block;}
         .notification-custom-icon    {flex-basis:20%; position:relative; padding:8px 8px 8px 12px; display:flex; align-items:center; justify-content:center;}
         .notification-custom-danger  {width:100%; display:flex; background-color:grey;}
       `}</style>
      </Sidebar.Pushable>
    )
  }
}

const mapStateToProps    = state               => Object.fromEntries(Object.keys(actions).map( stSectNm => [`${stSectNm}State`, Object.fromEntries(Object.keys(state[stSectNm]).map(stPropNm=>[stPropNm,state[stSectNm][stPropNm]]))] ))
const mapDispatchToProps = (dispatch,ownProps) => Object.fromEntries(Object.keys(actions).map( stSectNm => [`${stSectNm}Cr`,    bindActionCreators(actions[stSectNm].creators,dispatch)                                             ] ))

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export { connectedApp as App, connectedApp as default }
