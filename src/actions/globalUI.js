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
//import { apiEndpoint, actionTriplet } from '../modules/usefulConstants'
//import { START_TIMER, STOP_TIMER }    from 'redux-timer-middleware'
//import { addTimeout, removeTimeout }  from 'redux-timeout'

const types = {
  SET_TAB_IDX: 'SET_INDEX_OF_CURRENTLY_ACTIVE_TAB'
}

const creators = {
  setTabIdx: newIdx => ( {type:types.SET_TAB_IDX, data:newIdx} )
}

const globalUI = { types, creators }

export { globalUI, globalUI as default }
