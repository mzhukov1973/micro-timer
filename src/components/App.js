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
import   React, { Component, createRef }          from 'react'
import   PropTypes                                from 'prop-types'
import { connect }                                from 'react-redux'
import { bindActionCreators }                     from 'redux'
import   msgr                                     from 'msgr'
import   ReactNotification, { store }             from 'react-notifications-component'
import { Container, Button, Image, Feed, Sticky, Card, Segment, Header, Icon, Menu, Label, Sidebar } from 'semantic-ui-react'
import { faHome, faExclamationCircle, faClipboardList, faUtensils, faExclamationTriangle, faBolt, faCloud, faShieldAlt, faBars } from '@fortawesome/free-solid-svg-icons'
import { faBell } from "@fortawesome/free-regular-svg-icons"
import { library }                                from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon }                        from '@fortawesome/react-fontawesome'
import   actions                                  from '../actions'
import   LoginFormModal                         from '../components/LoginFormModal'

//import '@fortawesome/fontawesome-svg-core/styles.css'
import 'animate.css/animate.min.css'
import 'react-notifications-component/dist/theme.css'

library.add(
  faHome, faExclamationCircle, faClipboardList, faUtensils, faExclamationTriangle, faBolt, faCloud, faShieldAlt, faBars,
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

  handleTabMenuClick = (ev,data) => this.props.globalUICr.setTabIdx(data.index)

  updateOnlineStatus = () => {}

  componentWillUnmount = () => {
//    this.props.internalsCr.stopActionMonitor(actions.internals.types.MAIN_SYS_TICK)
//    this.props.internalsCr.stopMainTicks()
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.authState.errorShown!==this.props.authState.errorShown&&this.props.authState.errorShown===false) {
      this.showAuthErrorToast()
    }
  }

  componentDidMount = () => {
//    this.props.internalsCr.startMainTicks()
//    this.props.internalsCr.startActionMonitor(3000, actions.internals.types.MAIN_SYS_TICK, ()=>console.log(`[REDUX-TIMEOUT]: Action ${actions.internals.types.MAIN_SYS_TICK} has just timed out - it wasn't seen for more than 3 seconds. Alarm!!`))
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
//    const swChannel = msgr.client(navigator.serviceWorker.controller)
//    swChannel.ready(
//      this.setState({swChannel:swChannel}, ()=>{
////        this.state.swChannel.receive((data,respond)=>console.log('%c[Client]:%c Got some data from sw: %o','color:olive;font-weight:bold;','color:olive;font-weight:normal;',data))
////        this.state.swChannel.send({username:'Flanders', location:'Springfield'})
//      })
//    )
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
      onRemoval: (id, removedBy) => console.log(`Notification with id=${id} has just been removed (removedBy=%o)`, removedBy)
    })
  }

  render = () => {

    const tabIdx = this.props.globalUIState.tabActiveIndex

    return (
      <Container className='App' fluid>
       <ReactNotification/>

        <Menu fixed='top' style={{zIndex:10000}} size='mini' inverted>
         <Menu.Menu position='left'>
          <Menu.Item fitted> <FontAwesomeIcon icon={faBars} pulled='left' size='2x'/></Menu.Item>
         </Menu.Menu>
         <Menu.Item fitted='horizontally'>
          <FontAwesomeIcon icon={faBolt}      fixedWidth className={statusIconsClasses[this.state.online.toString()]}/>
          <FontAwesomeIcon icon={faCloud}     fixedWidth className={statusIconsClasses[this.state.srvOk.toString()]}/>
          <FontAwesomeIcon icon={faShieldAlt} fixedWidth className={statusIconsClasses[this.state.tokenOk.toString()]}/>
         </Menu.Item>
         <Menu.Menu position='right'>
          <Menu.Item fitted='vertically' onClick={()=>this.props.authCr.setErrorShown(false)}><FontAwesomeIcon icon={faExclamationCircle} color='red' fixedWidth style={{fontSize:'1.5em',lineHeight:'1em'}}/>Auth err</Menu.Item>
          <Menu.Item fitted><LoginFormModal {...this.props.authState} {...this.props.authCr}/></Menu.Item>
         </Menu.Menu>
        </Menu>

        <Segment className='tabPane' attached='bottom' basic fluid>
         <div>tabIdx: {tabIdx}</div>
        </Segment>
        <style jsx global>{`
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
            width: 100%;
            display: flex;
            /* padding: 0; */
            margin: 0;
            margin-left:0 !important;
            margin-right:0 !important;
            flex-flow:column nowrap;
            justify-content: flex-start;
            align-items: center;
            color: white;
          }
          .tabPane {
            font-size: 1rem;
            flex-grow: 1;
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
      </Container>

    )
  }
}

const mapStateToProps    = state               => Object.fromEntries(Object.keys(actions).map( stSectNm => [`${stSectNm}State`, Object.fromEntries(Object.keys(state[stSectNm]).map(stPropNm=>[stPropNm,state[stSectNm][stPropNm]]))] ))
const mapDispatchToProps = (dispatch,ownProps) => Object.fromEntries(Object.keys(actions).map( stSectNm => [`${stSectNm}Cr`,    bindActionCreators(actions[stSectNm].creators,dispatch)                                             ] ))

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export { connectedApp as App, connectedApp as default }
