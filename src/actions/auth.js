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
import { apiEndpoint, actionTriplet } from '../modules/usefulConstants'
//import { START_TIMER, STOP_TIMER }    from 'redux-timer-middleware'
//import { addTimeout, removeTimeout }  from 'redux-timeout'

const types = {
  SET_UID:                  'SET_AUTHENTICATED_USER_ID',
  SET_TKN:                  'SET_NEW_BEARER_TOKEN_VALUE',
  SET_TKN_ISS:              'SET_ISSUE_TIMESTAMP_FOR_THE_CURRENT_BEARER_TOKEN',
  SET_TKN_EXP:              'SET_EXPIRES_ON_TIMESTAMP_FOR_THE_CURRENT_BEARER_TOKEN',
  SET_UNAME:                'SET_USERNAME_VALUE',
  SET_UPWD:                 'SET_USER_PASSWORD_FORM_INPUT_VALUE',
  AUTH:                     actionTriplet('ATTEMPT_AUTHENTICATION_AND_NEW_TOKEN_ACQUISITION'),
  GET_USER:                 actionTriplet('LOAD_USER_DATA'),
  API_TOKEN:                actionTriplet('GET_API_AUTH_TOKEN'),
  API_LOGIN:                actionTriplet('API_LOGIN'),
  REFRESH:                  actionTriplet('REFRESH_EXISTING_TOKEN'),
  LOGOUT:                   'DESTROY_THE_TOKEN_I_E_LOG_YOURSELF_OUT',
  SET_ERR_SHWN:             'SET_AUTH_ERROR_SHOWN_VALUE',
  SET_LOGIN_MODAL_STATE:    'SET_OPEN_CLOSED_STATE_OF_API_LOGIN_MODAL_WINDOW',
  SET_AUTH_FLAG:            'SET__AUTHENTICATION_IN_PROGRESS__FLAG'
}

const creators = {
  setUID:               uid                 => ( {type:types.SET_UID,                  data:uid                  } ),
  setToken:             token               => ( {type:types.SET_TKN,                  data:token                } ),
  setTokenIssuedOn:     tstamp              => ( {type:types.SET_TKN_ISS,              data:tstamp               } ),
  setTokenExpiresOn:    tstamp              => ( {type:types.SET_TKN_EXP,              data:tstamp               } ),
  setUsername:          uname               => ( {type:types.SET_UNAME,                data:uname                } ),
  setUserPassword:      upwd                => ( {type:types.SET_UPWD,                 data:upwd                 } ),
  authFail:             (title,header,body) => ( {type:types.AUTH.FAIL,                data:{title, header, body}} ),
  authOk:               resultJSON          => ( {type:types.AUTH.OK,                  data:resultJSON           } ),
  getUserDataFail:      (title,header,body) => ( {type:types.GET_USER.FAIL,            data:{title, header, body}} ),
  getUserDataOk:        resultJSON          => ( {type:types.GET_USER.OK,              data:resultJSON           } ),
  getUserDataReq:       creds               => ( {type:types.GET_USER.REQ,             data:creds                } ),
  refreshFail:          (title,header,body) => ( {type:types.REFRESH.FAIL,             data:{title, header, body}} ),
  refreshOk:            resultJSON          => ( {type:types.REFRESH.OK,               data:resultJSON           } ),
  refreshReq:           creds               => ( {type:types.REFRESH.REQ,              data:creds                } ),
  logout:               ()                  => ( {type:types.LOGOUT                                              } ),
  setErrorShown:        isShown             => ( {type:types.SET_ERR_SHWN,             data:isShown              } ),
  setLoginModalState:   isOpen              => ( {type:types.SET_LOGIN_MODAL_STATE,    data:isOpen               } ),
  setAuthFlag:          (isItOn,parms={})   => ( {type:types.SET_AUTH_FLAG,            data:{isItOn, parms}      } ),
  apiTokenFail:         (title,header,body) => ( {type:types.API_TOKEN.FAIL,           data:{title, header, body}} ),
  apiTokenOk:           resultJSON          => ( {type:types.API_TOKEN.OK,             data:resultJSON           } ),
  apiLoginFail:         (title,header,body) => ( {type:types.API_LOGIN.FAIL,           data:{title, header, body}} ),
  apiLoginOk:           resultJSON          => ( {type:types.API_LOGIN.OK,             data:resultJSON           } )
}

/*        ╭──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮        */
/*        │ */    async function postData(url = '', data = {}, apiKey = false) {                                                                          /* │        */
/*        │ */      const response = await fetch(url, {                                                                                                   /* │        */
/*        │ */        method:'POST', mode:'cors', cache:'no-cache', credentials:'include',                                                                /* │        */
/*        │ */        headers: (                                                                                                                          /* │        */
/*        │ */          apiKey===false ?                                                                                                                  /* │        */
/*        │ */          {'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8', 'Accept':'application/json'} :                                 /* │        */
/*        │ */          {'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8', 'Accept':'application/json', 'Authorization':'Bearer '+apiKey} /* │        */
/*        │ */        ),                                                                                                                                  /* │        */
/*        │ */        redirect:'follow', referrerPolicy:'no-referrer', body:JSON.stringify(data)                                                          /* │        */
/*        │ */      })                                                                                                                                    /* │        */
/*        │ */      return await response.json()                                                                                                          /* │        */
/*        │ */    }                                                                                                                                       /* │        */
/*        ╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯        */

creators['apiTokenReq'] = () => async dispatch => {
  const request = new Request(
    apiEndpoint.emApiGenUrl(apiEndpoint.emAPIActions.getAuthToken), {method:'GET', mode:'cors', credentials:'include', cache:'no-cache', redirect:'follow',
    headers: {'Content-Type':'application/json; charset=utf-8', 'Accept':'application/json'}
  })
  dispatch( creators.setAuthFlag(true,{authenticatingAt:'Ecomarket', authenticatingStage:{result:'Requesting',message:`${request.method}, '${request.url}'`}, authenticatingStartedAt:Date.now(), authenticatingEndedAt:false}) )
  try {
    const [response, errFetch] = await fetch(request).then(data=>([data,undefined])).catch(err=>Promise.resolve([undefined,err]))
    if(errFetch) throw new Error(`Error in fetch API fetch('${request.url}',...) call! errFetch='${errFetch.toString()}'`)
    const resp = await response.json()
    dispatch( creators.setAuthFlag(false,{authenticatingAt:'Ecomarket', authenticatingStage:{...resp.status}, authenticatingEndedAt:Date.now()}) )
    dispatch( resp.status.result==='SUCCESS' ? creators.ecmApiTokenOk({status:{...resp.status},data:{...resp.data}}) : creators.ecmApiTokenFail('Error!',`Authentication (getAuthToken) failed.`,`Request for authentication was met with ECM_API_TOKEN.FAIL, API server reports: '${resp.status.result}: ${resp.status.message}'.`) )
  } catch(err) {
    dispatch( creators.setAuthFlag(false,{authenticatingAt:'Ecomarket', authenticatingStage:{result:'Failed',message:err.message}, authenticatingEndedAt:Date.now()}) )
    creators.ecmApiTokenFail('Error!', `Authentication (getAuthToken) failed.`, `An error has been thrown when processing the request for authentication.\nError supplied had the following payload:\n\t'${err.toString()}'.`)
  }
}


creators['apiLoginReq'] = (creds={}) => async dispatch => {
  if (Object.entries(creds).every( el => ['phone','password','token'].includes(el[0]) && typeof el[1]==='string' && el[1].length>6 )) {
    dispatch(creators.setAuthFlag(true, {authenticatingAt:'Ecomarket', authenticatingStage:{result:'Logging in', message:`POST, '${apiEndpoint.ecoApiGateway}'`}, authenticatingStartedAt:Date.now(), authenticatingEndedAt:false}))
    const resp = await postData(apiEndpoint.ecoApiGateway, {action:'doLogin', ...creds})
    console.log('[actions/auth.js:ecmApiLoginReq, doLogin response]: %o', resp)
    dispatch(creators.setAuthFlag(false, {authenticatingAt:'Ecomarket', authenticatingStage:{...resp.status}, authenticatingEndedAt:Date.now()}))
    if (resp.status.result==='SUCCESS') {
      dispatch(creators.ecmApiLoginOk({status:{...resp.status}, data:{...resp.data}}))
    } else {
      dispatch(creators.ecmApiLoginFail('Error!', `Ecomarket API login request (doLogin) failed.`, `Attempt to login to Ecomarket API gateway has been met with 'ECM_API_LOGIN.FAIL'. API server reports: '${resp.status.result}: ${resp.status.message}'.`))
    }
  } else {
    console.warn(`[actions/auth.js:ecmApiLoginReq, doLogin request]: Failed because of an invalid 'creds' object argument.\n\tcreds: %o`, creds)
    dispatch(creators.ecmApiLoginFail('Error!', `Ecomarket API login request (doLogin) failed.`, `Attempt to login to Ecomarket API gateway has been met with 'ECM_API_LOGIN.FAIL', because an invalid 'creds' object had been supplied to the requesting action.`))
  }
}


creators['authReq'] = creds => async dispatch => {
  let response, resp, errFetch/*, errJSON*/
  const {currToken, ...credsToSend} = creds
  const request = new Request(apiEndpoint.login+`?name=${credsToSend.name}&pword=${credsToSend.pword}&action=login`, {method:'GET', mode:'cors', credentials:'omit', cache:'no-cache', redirect:'follow', referrerPolicy:'no-referrer', headers:{'Content-Type':'application/json','Accept':'application/json','Authorization':(!currToken||currToken.length<5 ? '' : `Bearer ${currToken}`), 'Access-Control-Allow-Origin': '*'}})
  dispatch( creators.setAuthFlag(true) )
  try {
    [response, errFetch] = await fetch(request).then(data=>([data,undefined])).catch(err=>Promise.resolve([undefined,err]))
    if(errFetch) throw new Error(`Error in fetch API fetch('${apiEndpoint.login}',...) call!`)
    resp = await response.json()
    dispatch( resp.result.result===true ? creators.authOk({...resp.result}) : creators.authFail('Error!','Authentication failed.',`Request for authentication was met with AUTH.FAIL, API server reports: '${resp.result.resMsg}'.`) )
    dispatch( creators.setAuthFlag(false) )
  } catch(err) {
    dispatch( creators.setAuthFlag(false) )
  }
}

const auth = { types, creators }

export { auth, auth as default }
