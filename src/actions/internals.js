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
import { START_TIMER, STOP_TIMER }    from 'redux-timer-middleware'
import { addTimeout, removeTimeout }  from 'redux-timeout'

const types = {
  tickAct2TimerName: tickActionType => {
    const rslt = tickActionType.match(/_BY_(?<timerName>.+)$/)
    return ((!rslt!==true && !rslt.groups!==true && !rslt.groups.timerName!==true) ? rslt.groups.timerName : false)
  },
  timerName2TickAct:    (tickActionBaseType,timerName) => `${tickActionBaseType}_BY_${timerName}`,
  MAIN_SYS_TICK:                   'TICK_ACTION_BY_MAIN_SYSTEM_TIMER'
}

const creators = {
  startMainTicks:     ()                    => ( {type:START_TIMER, payload:{actionName:types.MAIN_SYS_TICK, timerName:types.tickAct2TimerName(types.MAIN_SYS_TICK), actionPayload:types.tickAct2TimerName(types.MAIN_SYS_TICK), timerInterval:1000, timerPeriod:-1}} ), /* N.B.: set period to -1 to nake ticks payload available with infinitely running timers. */
  stopMainTicks:      ()                    => ( {type:STOP_TIMER,  payload:{timerName:types.tickAct2TimerName(types.MAIN_SYS_TICK)}                                                                                                                             } ),
  stopActionMonitor:  action                => dispatch => dispatch(removeTimeout(action)),
  startActionMonitor: (timeout, action, cB) => dispatch => dispatch(addTimeout(timeout, action, cB))
}
//creators['stopActionMonitor']  = action                => dispatch => dispatch(removeTimeout(action))
//creators['startActionMonitor'] = (timeout, action, cB) => dispatch => dispatch(addTimeout(timeout, action, cB))

const internals = { types, creators }

export { internals, internals as default }
