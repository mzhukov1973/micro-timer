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
import { iTyp }  from '../actions'

const internals = (state={}, action) => {
  switch (action.type) {
    case iTyp.MAIN_SYS_TICK:
//     return (state.mainReduxTimerOn===false?{...state, mainReduxTimerOn:iTyp.tickAct2TimerName(iTyp.MAIN_SYS_TICK), timerCurrentTimeStamp:Date.now()}:{...state, timerCurrentTimeStamp:Date.now()})
     return (state.mainReduxTimerOn===false?{...state, mainReduxTimerOn:iTyp.tickAct2TimerName(iTyp.MAIN_SYS_TICK)}:state)

    case iTyp.MAIN_SYS_TICK+'_END':
//     console.log(`iTyp.MAIN_SYS_TICK+'_END': received! Here it is: %o`, action)
     return ({...state, mainReduxTimerOn:false})

    case iTyp.SET_TSTART:
     return ({...state, timerStartTimeStamp:action.data})

    case iTyp.SET_TCURR:
     return ({...state, timerCurrentTimeStamp:action.data})

    case iTyp.SET_MAIN_TIMER_ON:
     return ({...state, mainTimerOn:action.data})

    default:
     return state
  }
}

export { internals, internals as default }
