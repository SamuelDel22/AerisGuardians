/* AERIS V43 Core — single source of truth for app state and mission routing.
   Non-destructive: mirrors legacy storage so existing V20–V30 features keep working. */
(function(){
  'use strict';
  const LEGACY='aeris_guardian_v3', CORE='aeris_core_v4', NAME='aeris_guardian_name_v6';
  const defaults={version:4,name:'Guardian',best:0,score:0,energy:0,relics:0,badges:[],visited:[],missionStage:0,action:null,settings:{language:'en'}};
  const routes=[
    {id:'territory',target:'story',threshold:0,icon:'🌊'},
    {id:'mercury',target:'lab',threshold:0,icon:'🧪'},
    {id:'evidence',target:'evidence',threshold:0,icon:'🔎'},
    {id:'challenge',target:'game',threshold:0,icon:'⚡'},
    {id:'action',target:'moves',threshold:7,icon:'🌱'}
  ];
  let state=load();
  const listeners=new Set();
  function load(){
    let legacy={}; try{legacy=JSON.parse(localStorage.getItem(LEGACY)||'{}')||{}}catch(e){}
    let saved={}; try{saved=JSON.parse(localStorage.getItem(CORE)||'{}')||{}}catch(e){}
    const merged={...defaults,...legacy,...saved};
    const storedName=localStorage.getItem(NAME); if(storedName) merged.name=storedName;
    merged.badges=[...new Set(Array.isArray(merged.badges)?merged.badges:[])];
    merged.visited=[...new Set(Array.isArray(merged.visited)?merged.visited:[])];
    return merged;
  }
  function normalize(next){
    next.version=4;
    next.best=Math.max(0,Number(next.best)||0);
    next.score=Math.max(0,Number(next.score)||0,next.best);
    next.energy=Math.max(0,Number(next.energy)||0);
    next.relics=Math.min(5,Math.max(0,Number(next.relics)||Math.floor(next.energy/2)));
    next.badges=[...new Set(Array.isArray(next.badges)?next.badges:[])];
    next.visited=[...new Set(Array.isArray(next.visited)?next.visited:[])];
    next.missionStage=Math.max(0,Math.min(routes.length,Number(next.missionStage)||0));
    return next;
  }
  function persist(){
    state=normalize({...state});
    localStorage.setItem(CORE,JSON.stringify(state));
    /* Legacy mirror keeps the existing V30 code compatible. */
    localStorage.setItem(LEGACY,JSON.stringify({best:state.best,score:state.score,energy:state.energy,relics:state.relics,badges:state.badges,action:state.action,name:state.name}));
    if(state.name && state.name!=='Guardian') localStorage.setItem(NAME,state.name);
    listeners.forEach(fn=>{try{fn(state)}catch(e){}});
    window.dispatchEvent(new CustomEvent('aeris:state',{detail:{...state}}));
  }
  function xp(){return Math.min(100,Math.round(state.best*7+state.relics*8+state.badges.length*8));}
  function level(){return Math.max(1,Math.min(10,Math.floor(xp()/10)+1));}
  function levelXP(){const x=xp(); return {level:level(),current:x%10*10,next:100,overall:x};}
  function rank(){const x=xp();return x>=85?'RIVER LEGEND':x>=60?'WATERSHED DEFENDER':x>=35?'FIELD GUARDIAN':'RIVER ROOKIE';}
  function progress(){return Math.min(100,Math.round((state.best/10)*60+(state.relics/5)*25+(Math.min(4,state.badges.length)/4)*15));}
  function unlock(route){return !!route && state.best>=route.threshold;}
  function visit(id){if(!state.visited.includes(id)) state.visited.push(id); const idx=routes.findIndex(r=>r.id===id); if(idx>=0) state.missionStage=Math.max(state.missionStage,idx+1); persist();}
  function patch(obj){state={...state,...obj};persist();}
  function reset(){state={...defaults};persist();}
  function on(fn){listeners.add(fn);return()=>listeners.delete(fn)}
  window.AERIS={version:'43.0.0',storage:{core:CORE,legacy:LEGACY},routes,getState:()=>({...state,badges:[...state.badges],visited:[...state.visited]}),patch,visit,reset,on,xp,rank,progress,isUnlocked:id=>unlock(routes.find(r=>r.id===id)),level,levelXP};
  persist();
})();
