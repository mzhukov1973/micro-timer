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
import { combineReducers } from 'redux'
import { persistReducer }  from 'redux-persist'
import   autoMergeLevel2   from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import   storage           from 'redux-persist/lib/storage'
//import   storage           from 'localforage'
import   auth              from '../reducers/auth'
import   globalUI          from '../reducers/globalUI'
import   internals         from '../reducers/internals'



const writeFailHandler = error => console.log('[writeFailHandler]: Error! setitem() called on the storage engine when persisting the state has just failed! Storage/quota exhausted?')
const bCfg = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
  writeFailHandler: writeFailHandler
}
const reducers                         = { auth, globalUI, internals }
const genPersistConfigs                = () => Object.fromEntries(['root',...Object.keys(reducers)].map(reducerName=>[reducerName,{...bCfg,...{key:reducerName}}]))
const getPersistReducer                = key => persistReducer(persistConfigs[key], reducers[key])
const persistConfigs                   = genPersistConfigs()

persistConfigs.root['blacklist']       = ['auth']
persistConfigs.auth['blacklist']       = ['apiModalState', 'loginModalState', 'refreshingToken', 'loggingOut', 'loadingUserData', 'authenticating']
persistConfigs.root['blacklist']       = ['globalUI']
persistConfigs.globalUI['blacklist']   = ['burgerMenuOpen', 'settingsOpen', 'systemFeedOpen', 'extendedStatusOpen']
//persistConfigs.root['blacklist']       = ['internals']
//persistConfigs.internals['blacklist']  = []

const rootReducer = combineReducers( Object.fromEntries(Object.keys(reducers).map(reducerName=>[reducerName,getPersistReducer(reducerName)])) )

const mainReducer = persistReducer(persistConfigs.root, rootReducer)

export { mainReducer, mainReducer as default }
