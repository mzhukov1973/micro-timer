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
import   React                                                     from 'react'
import   PropTypes                                                 from 'prop-types'
import { Icon, Button, Grid, Form, Header, Image, Segment, Modal } from 'semantic-ui-react'
import   logo                                                      from '../images/logo-256.png'



class LoginFormModal extends React.Component {
  static displayName  = 'LoginFormModal'
  static propTypes = {
    apiNewToken:             PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    username:                PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    userpwd:                 PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    authenticating:          PropTypes.bool.isRequired,
    authenticatingAt:        PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    authenticatingStage:     PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    authenticatingStartedAt: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    authenticatingEndedAt:   PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    loggingOut:              PropTypes.bool.isRequired,
    errorMessage:            PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    errorShown:              PropTypes.bool.isRequired,
    loginModalState:         PropTypes.bool.isRequired,
    setUsername:             PropTypes.func.isRequired,
    setUserPassword:         PropTypes.func.isRequired,
    apiLoginReq:             PropTypes.func.isRequired,
    apiTokenReq:             PropTypes.func.isRequired,
    logout:                  PropTypes.func.isRequired,
    setErrorShown:           PropTypes.func.isRequired,
    setLoginModalState:      PropTypes.func.isRequired,
    setAuthFlag:             PropTypes.func.isRequired
  }

  handleOpen              = () => this.props.setLoginModalState(true)

  handleClose             = () => this.props.setLoginModalState(false)

  handleLogin             = () => this.props.apiLoginReq({token:this.props.apiNewToken})

  handleFrmUsernameChange = ev => this.props.setUsername(ev.target.value)

  handleFrmPasswordChange = ev => this.props.setUserPassword(ev.target.value)

  render = () => {
    return (
      <>
       <Modal trigger={<Button onClick={this.handleOpen} size='mini' color='green' icon='sign-in'compact/>} open={this.props.loginModalState} onClose={this.handleClose} onOpen={this.handleOpen} size='small' dimmer='blurring' className='modal' basic>
        <Modal.Content className='modalCont' scrolling={false}>
         <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
           <Header as='h2' color='teal' textAlign='center'><Image src={logo}/>RestauAdm|ᵦ</Header>
           <Form size='large'>
            <Segment>
             <Form.Input fluid icon='phone' iconPosition='left' placeholder='Телефон' onChange={this.handleFrmPhoneChange}    value={this.props.username} autocomplete='username'/>
             <Form.Input fluid icon='lock'  iconPosition='left' placeholder='Пароль'  onChange={this.handleFrmPasswordChange} value={this.props.userpwd} autocomplete='current-password' type='password'/>
             <Button color='teal' fluid size='large' onClick={this.handleLogin}>Войти</Button>
            </Segment>
           </Form>
          </Grid.Column>
         </Grid>
        </Modal.Content>
       </Modal>
       <style jsx='true'>{`
         .modalCont {font-size:1rem;                              }
         .modal     {font-size:1rem; overflow:hidden; height:90%; max-width:100vw !important; min-width:90vw !important; width:90vw !important;}
       `}</style>
      </>
    )
  }
}

export { LoginFormModal, LoginFormModal as default }
