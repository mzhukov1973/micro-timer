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

const initialState = {
  auth: {
    username: false,
    userpwd: false,
    bearerToken: false,
    apiNewToken: '9f3a05e0b9af47ceee7f8bb99fe68b5a',
    tokenIssuedOn: -1,
    tokenExpiresOn: -1,
    authenticatedAsUID: false,
    authenticating: false,
    authenticatingAt: false,
    authenticatingStage: false,
    authenticatingStartedAt: false,
    authenticatingEndedAt: false,
    refreshingToken: false,
    loggingOut: false,
    loadingUserData: false,
    errorMessage: {title:'Error', header:'Auth error', body:'---'},
    errorShown: true,
    loginModalState: false
  },
  globalUI: {
    tabActiveIndex: 2,
    burgerMenuOpen: false,
    settingsOpen: false,
    systemFeedOpen: false, 
    extendedStatusOpen: false
  },
  internals: {
    mainReduxTimerOn: false
  }
}

export { initialState, initialState as default }
