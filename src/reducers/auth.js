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
import { aTyp }  from '../actions'

const auth = (state={}, action) => {
  const dat = action.data
  switch (action.type) {
    case aTyp.SET_UID:
     return {...state, authenticatedAsUID:dat}

    case aTyp.SET_TKN:
     return {...state, bearerToken:dat}

    case aTyp.SET_TKN_ISS:
     return {...state, tokenIssuedOn:dat}

    case aTyp.SET_TKN_EXP:
     return {...state, tokenExpiresOn:dat}

    case aTyp.SET_UNAME:
     return {...state, username:dat}

    case aTyp.SET_UPWD:
     return {...state, userpwd:dat}

    case aTyp.SET_ERR_SHWN:
     return {...state, errorShown:dat}

    case aTyp.SET_LOGIN_MODAL_STATE:
     return {...state, loginModalState:dat}

    case aTyp.SET_AUTH_FLAG:
     return Object.entries(dat.parms).length===0 ? {...state, authenticating:dat.isItOn} : {...state, authenticating:dat.isItOn, ...dat.parms}

    case aTyp.LOGOUT:
     return {...state, authenticatedAsUID:false, bearerToken:false, tokenIssuedOn:-1, tokenExpiresOn:-1, userType:false, rids:[], authenticating:false, refreshingToken:false, loggingOut:false, loadingUserData:false}

    case aTyp.API_TOKEN.OK:
     return {...state, apiNewToken:dat.data.token}
    case aTyp.API_TOKEN.FAIL:
     return {...state, errorMessage:{...dat}, errorShown:false}

    case aTyp.API_LOGIN.OK:
     return {...state, apiKey:dat.data.user.TOKEN, apiUserInfo:{...dat.data.user}}
    case aTyp.API_LOGIN.FAIL:
     return {...state, errorMessage:{...dat}, errorShown:false}

    case aTyp.AUTH.OK:
     return {...state, username:dat.name, bearerToken:dat.newToken, tokenExpiresOn:dat.expiresOn, tokenIssuedOn:dat.issuedAt, authenticating:false}
    case aTyp.AUTH.FAIL:
     return {...state, errorMessage:{...dat}, errorShown:false, bearerToken:false, tokenExpiresOn:-1, tokenIssuedOn:-1, username:false}

    case aTyp.GET_USER.OK:
     return {...state, authenticatedAsUID:dat.uid, loadingUserData:false}
    case aTyp.GET_USER.FAIL:
     return {...state, errorMessage:{...dat}, errorShown:false, loadingUserData:false}

    case aTyp.REFRESH.OK:
     return {...state, bearerToken:dat.newToken, tokenExpiresOn:dat.expiresOn, tokenIssuedOn:dat.issuedAt, refreshingToken:false}
    case aTyp.REFRESH.FAIL:
     return {...state, errorMessage:{...dat}, errorShown:false, refreshingToken:false}

    default:
     return state
  }
}

export { auth, auth as default }
