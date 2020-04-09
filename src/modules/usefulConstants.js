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
const baseZeit  = 'https://micro-timer.now.sh'
const baseLocal = 'https://localhost:3000'
const bEnd      = 'zeit'
const base      = bEnd === 'local' ? baseLocal : baseZeit
const emBaseAPI = 'https://ecomarket.ru/api.php'

export const apiEndpoint = {
  login:       `${base}/api/login`,
  users:       `${base}/api/users`,
  orders:      `${base}/api/data/orders`,
  restaurants: `${base}/api/data/restaurants`,
  emAPIActions: {
    getAuthByCookie: { action:'getAuthByCookie', params:[]                                       },
    getAuthToken:    { action:'getAuthToken',    params:[]                                       },
    doLogin:         { action:'doLogin',         params:[]                                       },
    getCatalog:      { action:'getCatalog',      params:[]                                       },
    getProductByUrl: { action:'getProductByUrl', params:[]                                       },
    getCatByUrl:     { action:'getCatByUrl',     params:[]                                       },
    appStartUp:      { action:'appStartUp',      params:[]                                       },
    appStartUp_v2:   { action:'appStartUp_v2',   params:[{name:'REGION',method:'GET',defVal:77}] }, // 77,78
    getPageData:     { action:'getPageData',     params:[]                                       },
    getOrders:       { action:'getOrders',       params:[]                                       },
    getLastOrder:    { action:'getLastOrder',    params:[]                                       }
  },
  emBaseAPI:     emBaseAPI,
  ecoApiGateway: emBaseAPI,
  emApiGenUrl:   (action,parms=[]) => `${emBaseAPI}?action=${action}${parms.length>0?parms.reduce((acc,el)=>acc+=`&${el.name}=${el.value}`):''}` /* E.g.: emApiGenUrl('appStartUp_v2',[{name:'REGION',value:77}]) or emApiGenUrl('getAuthToken',[]) or emApiGenUrl('getCatalog') */
}

export const actionTriplet = type => ({REQ:type+'_REQUEST', OK:type+'_SUCCESS', FAIL:type+'_FAILURE'})

/*========Colors:================*/
export const colours = {Wh:'color:#ffffff;', Rd:'color:#ff0000;', Gn:'color:#00ff00;', Bl:'color:#0000ff;', Cy:'color:#00ffff;', Mg:'color:#ff00ff;', Yl:'color:#ffff00;', Gr:'color:#a0a0a0;', Un:'color:unset;', Or:'color:orange;'}
export const cWh=colours.Wh, cRd=colours.Rd, cGn=colours.Gn, cBl=colours.Bl, cCy=colours.Cy, cMg=colours.Mg, cYl=colours.Yl, cGr=colours.Gr, cUn=colours.Un, cOr=colours.Or
export const fwB='font-weight:bold;', fwN='font-weight:normal;'
export const fsSz = ems => `font-size:${isNaN(parseFloat(ems))?'1':parseFloat(ems)}em;`
export const fs1=fsSz(1), fs12=fsSz(1.2), fs08=fsSz(0.8), fs14=fsSz(1.4), fs07=fsSz(0.7), fs05=fsSz(0.5), fs06=fsSz(0.6)
export const rdB=cRd+fwB+fs1, rdN=cRd+fwN+fs1,    gnB=cGn+fwB+fs1, gnN=cGn+fwN+fs1,    blB=cBl+fwB+fs1, blN=cBl+fwN+fs1
export const ylB=cYl+fwB+fs1, ylN=cYl+fwN+fs1,    cyB=cCy+fwB+fs1, cyN=cCy+fwN+fs1,    mgB=cMg+fwB+fs1, mgN=cMg+fwN+fs1
export const whB=cWh+fwB+fs1, whN=cWh+fwN+fs1,    orB=cOr+fwB+fs1, orN=cOr+fwN+fs1,    grB=cGr+fwB+fs1, grN=cGr+fwN+fs1
export const unB=cUn+fwN+fs1
export const c = fStr => {
  let numStr = '', numFloat=0
  const colour = `${colours[fStr.slice(0,2).split('').map((el,idx)=>idx===0?el.toUpperCase():el).join('')]}`
  const weight = `${fStr.slice(2,3).toUpperCase()==='B'?fwB:fwN}`
  const size   = `font-size:${(numFloat=parseFloat((isNaN(parseInt(numStr=[...fStr.match(/^[a-zA-Z]{3}([0-9]{0,4})/)][1]))===true?'1':numStr).split('').map((el,idx)=>idx===0?el+'.':el).join('')))===0?'1':numFloat.toString()}em;`
  return colour+weight+size
}
/*===============================*/

const usefulConstants = {
 actionTriplet,
 colours, cWh, cRd, cGn, cBl, cCy, cMg, cYl, cGr, cUn, cOr, fwB, fwN, fsSz, fs1, fs12, fs08, fs14, fs07, fs05, fs06, rdB, rdN, gnB, gnN, blB, blN, ylB, ylN, cyB, cyN, mgB, mgN, whB, whN, orB, orN, grB, grN, unB, c
}

export { usefulConstants, usefulConstants as default }
