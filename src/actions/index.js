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
import auth      from '../actions/auth'
import globalUI  from '../actions/globalUI'
import internals from '../actions/internals'

const stateSectons = ['auth', 'globalUI', 'internals']

export const aTyp = auth.types
export const aCr  = auth.creators
export const gTyp = globalUI.types
export const gCr  = globalUI.creators
export const iTyp = internals.types
export const iCr  = internals.creators

export const types     = { aTyp, gTyp, iTyp }
export const creators  = { aCr,  gCr,  iCr }

const actions = Object.fromEntries(stateSectons.map(stSectNm=>[stSectNm, {types:types[`${stSectNm.slice(0,1)}Typ`],creators:creators[`${stSectNm.slice(0,1)}Cr`]}]))

export { actions, actions as default }
