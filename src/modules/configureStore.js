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
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools }          from 'redux-devtools-extension'
import { persistStore }                 from 'redux-persist'
import   thunk                          from 'redux-thunk'
import   timerMiddleware                from 'redux-timer-middleware'
import { reduxTimeout }                 from 'redux-timeout'
import { initialState }                 from '../modules/initialState'
import   mainReducer                    from '../reducers'



const persistedReducer = mainReducer

const initializeStore = (iniState=initialState) => createStore( persistedReducer, iniState, composeWithDevTools(applyMiddleware(thunk,timerMiddleware,reduxTimeout())) )
const __REDUX_STORE__ = '__REDUX_STORE__'

const getOrCreateStore = initialState => {
  if (!window[__REDUX_STORE__]) { window[__REDUX_STORE__]=initializeStore(initialState) }
  return window[__REDUX_STORE__]
}

const configStoreAndReducer = () => {
  let store     = getOrCreateStore()
  let persistor = persistStore(store)
  return { store, persistor }
}

export default configStoreAndReducer
