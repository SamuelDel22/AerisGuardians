/* AERIS RPG campaign v2 — multi-stage missions, durable progress, bilingual feedback */
(function(){
  'use strict';
  const root=document.getElementById('rpgGameShell');
  if(!root)return;
  const $=id=>document.getElementById(id);
  const STORE='aeris_rpg_campaign_v2';
  const OLD_STORE='aeris_rpg_campaign_v1';
  const missions=[
    {id:'river-pressure',name:'River Pressure',es:'Presión sobre el río',place:'Caucasia · Río Cauca',placeEs:'Caucasia · Río Cauca',boss:'The Polluter',bossEs:'El Contaminador',type:'RIVERBANK RESPONSE',typeEs:'RESPUESTA EN LA RIBERA',img:'assets/rpg/scenarios/mission-01-polluter.jpeg',bossImg:'assets/rpg/bosses/boss-polluter.png',relic:'Water Core',relicEs:'Núcleo de Agua',reward:100,story:'Waste and disturbed riverbanks are visible warning signs. Your task is to observe without putting yourself in danger, then support a responsible response.',storyEs:'Los residuos y las riberas alteradas son señales de alerta. Tu tarea es observar sin ponerte en peligro y apoyar una respuesta responsable.',intro:'A field report has arrived from Caucasia. Read the scene, move toward the signal and make decisions based on evidence.',introEs:'Llegó un reporte de campo desde Caucasia. Lee la escena, avanza hacia la señal y decide con base en evidencia.',rounds:[
      {q:'You see a pipe releasing dirty water toward the river. What should you do?',qEs:'Ves una tubería que descarga agua sucia hacia el río. ¿Qué debes hacer?',hint:'Do not touch the water or approach the pipe. Observe from a safe public place.',hintEs:'No toques el agua ni te acerques a la tubería. Observa desde un lugar público y seguro.',answers:[['Go closer and touch the water to check it.','Acercarte y tocar el agua para revisarla.',false,'Do not touch unknown water or approach a discharge point. Keep a safe distance.','No toques agua desconocida ni te acerques al punto de descarga. Mantén una distancia segura.'],['Record what you can see from a safe place and tell a trusted adult or the authorities.','Registrar lo que ves desde un lugar seguro y contárselo a un adulto de confianza o a las autoridades.',true,'Correct. Safe observation and reporting help the responsible authorities assess the discharge.','Correcto. La observación segura y el reporte ayudan a las autoridades competentes a evaluar la descarga.'],['Block the pipe by yourself.','Tapar la tubería por tu cuenta.',false,'Never try to block or repair a discharge point yourself. It may be dangerous.','Nunca intentes tapar o reparar por tu cuenta un punto de descarga. Puede ser peligroso.']]},
      {q:'Your family is sorting waste at home. Which plan helps keep waste out of the river?',qEs:'Tu familia está separando residuos en casa. ¿Qué plan ayuda a evitar que lleguen al río?',hint:'Use the three-colour system. Batteries and phones need a special collection point.',hintEs:'Usa el sistema de tres colores. Las pilas y los celulares necesitan un punto especial de recolección.',answers:[['Put clean, dry recyclables in white; organic waste in green; non-recyclable waste in black.','Poner los reciclables limpios y secos en blanco; los orgánicos en verde; y los no aprovechables en negro.',true,'Correct. Colombia’s three-colour system separates these waste groups. Batteries and phones go to special collection points.','Correcto. El código de tres colores en Colombia separa estos grupos. Las pilas y los celulares van a puntos especiales.'],['Put every kind of waste in the river so it can move away.','Poner todos los residuos en el río para que se los lleve la corriente.',false,'The current spreads waste. It does not make disposal safe.','La corriente dispersa los residuos. No hace que su disposición sea segura.'],['Mix all waste and burn it near the river.','Mezclar todos los residuos y quemarlos cerca del río.',false,'Burning mixed waste can create harmful smoke and adds another risk.','Quemar residuos mezclados puede producir humo dañino y crea otro riesgo.']]}
    ]},
    {id:'illegal-mining',name:'Illegal Mining',es:'Minería ilegal',place:'Zaragoza · Río Cauca',placeEs:'Zaragoza · Río Cauca',boss:'The Excavator',bossEs:'El Excavador',type:'LAND DISTURBANCE',typeEs:'ALTERACIÓN DEL TERRENO',img:'assets/rpg/scenarios/mission-02-excavator.jpeg',bossImg:'assets/rpg/bosses/boss-excavator.png',relic:'River Shield',relicEs:'Escudo del Río',reward:150,story:'Mining can remove vegetation, disturb soil and increase sediment entering waterways. Field observations must be made from a safe distance.',storyEs:'La minería puede retirar vegetación, alterar el suelo y aumentar los sedimentos que llegan a los cauces. Las observaciones deben hacerse desde una distancia segura.',intro:'The landscape has changed. Separate what you can observe from what still needs verification.',introEs:'El paisaje ha cambiado. Separa lo que puedes observar de aquello que aún necesita verificación.',rounds:[
      {q:'You see active machinery near a riverbank. What should a Guardian do?',qEs:'Ves maquinaria activa cerca de una ribera. ¿Qué debe hacer un Guardián?',hint:'The mission is to document responsibly, not to confront or investigate dangerous machinery.',hintEs:'La misión es documentar responsablemente, no confrontar ni investigar maquinaria peligrosa.',answers:[['Approach the machine to inspect it closely.','Acercarse a la máquina para inspeccionarla de cerca.',false,'Active machinery and unstable ground can cause serious injury. Keep your distance.','La maquinaria activa y el terreno inestable pueden causar lesiones graves. Mantén la distancia.'],['Record visible changes from a safe location and use official reporting channels.','Registrar los cambios visibles desde un lugar seguro y usar canales oficiales.',true,'Correct. Safe documentation and reliable reporting protect people and improve evidence quality.','Correcto. La documentación segura y el reporte confiable protegen a las personas y mejoran la evidencia.'],['Confront the people operating the equipment.','Confrontar a las personas que operan el equipo.',false,'Do not put yourself in danger. Leave enforcement to the competent authorities.','No te pongas en peligro. La intervención corresponde a las autoridades competentes.']]},
      {q:'Which environmental effect can follow vegetation removal and excavation?',qEs:'¿Qué efecto ambiental puede producir la remoción de vegetación y la excavación?',hint:'Think about soil stability and what rain can carry into the river.',hintEs:'Piensa en la estabilidad del suelo y en lo que la lluvia puede arrastrar al río.',answers:[['More exposed soil and sediment entering waterways.','Más suelo expuesto y sedimentos que llegan a los cauces.',true,'Correct. Disturbed soil can erode and increase sediment loads in connected waterways.','Correcto. El suelo alterado puede erosionarse y aumentar los sedimentos en los cauces conectados.'],['Automatic recovery of native forest.','Recuperación automática del bosque nativo.',false,'Removing vegetation does not restore habitat. Recovery requires time and active care.','Retirar vegetación no restaura el hábitat. La recuperación requiere tiempo y cuidado.'],['No possible change to the river system.','Ningún cambio posible en el sistema fluvial.',false,'Riverbanks, soils and habitats are connected. Disturbance can affect more than one site.','Las riberas, los suelos y los hábitats están conectados. La alteración puede afectar más de un lugar.']]}
    ]},
    {id:'mercury',name:'Mercury Contamination',es:'Contaminación por mercurio',place:'Nechí · Cuenca del Cauca',placeEs:'Nechí · Cuenca del Cauca',boss:'The Mercury Serpent',bossEs:'La Serpiente de Mercurio',type:'SCIENCE & EVIDENCE',typeEs:'CIENCIA Y EVIDENCIA',img:'assets/rpg/scenarios/mission-03-mercury.jpeg',bossImg:'assets/rpg/bosses/boss-mercury-serpent.png',relic:'Life Seed',relicEs:'Semilla de Vida',reward:200,story:'Mercury can be transformed into methylmercury in aquatic environments. It can accumulate in organisms and move through food webs. Appearance alone cannot reveal contamination.',storyEs:'En ambientes acuáticos, el mercurio puede transformarse en metilmercurio. Puede acumularse en organismos y circular por las redes alimentarias. La apariencia no permite detectar la contaminación.',intro:'A strange signal is coming from the water. Trust measurements and research, not rumors or appearance.',introEs:'Una señal extraña llega desde el agua. Confía en mediciones e investigaciones, no en rumores ni apariencias.',rounds:[
      {q:'Can you tell whether a fish contains methylmercury just by looking at it?',qEs:'¿Puedes saber si un pez contiene metilmercurio con solo mirarlo?',hint:'Some environmental hazards are invisible. Think about how scientists identify them.',hintEs:'Algunos riesgos ambientales son invisibles. Piensa cómo los identifican los científicos.',answers:[['Yes. Contaminated fish always look different.','Sí. Los peces contaminados siempre se ven diferentes.',false,'Contamination cannot be reliably identified by appearance. Testing is needed.','La contaminación no puede identificarse de forma confiable por su apariencia. Se necesitan análisis.'],['No. Reliable testing and scientific evidence are needed.','No. Se necesitan análisis confiables y evidencia científica.',true,'Correct. Laboratory measurements and well-designed studies are needed to assess contamination.','Correcto. Se necesitan mediciones de laboratorio e investigaciones bien diseñadas para evaluar la contaminación.'],['Only by checking the water colour.','Solo revisando el color del agua.',false,'Water colour is not a reliable test for mercury or methylmercury.','El color del agua no es una prueba confiable de mercurio o metilmercurio.']]},
      {q:'What is methylmercury known for in aquatic food webs?',qEs:'¿Por qué es importante el metilmercurio en las redes alimentarias acuáticas?',hint:'Think about how a substance can build up in organisms over time.',hintEs:'Piensa en cómo una sustancia puede acumularse en los organismos con el tiempo.',answers:[['It can accumulate in organisms and pass through the food web.','Puede acumularse en organismos y pasar por la red alimentaria.',true,'Correct. Methylmercury can bioaccumulate and biomagnify through aquatic food webs.','Correcto. El metilmercurio puede bioacumularse y biomagnificarse en las redes alimentarias acuáticas.'],['It disappears as soon as it enters water.','Desaparece apenas entra al agua.',false,'Mercury does not simply disappear. Its chemical forms and movement in ecosystems matter.','El mercurio no desaparece sin más. Sus formas químicas y su circulación en los ecosistemas importan.'],['It affects only rocks and never living things.','Afecta solo a las rocas y nunca a los seres vivos.',false,'Methylmercury can affect aquatic organisms and move through food webs.','El metilmercurio puede afectar organismos acuáticos y circular por las redes alimentarias.']]}
    ]},
    {id:'waste',name:'Waste & Pollution',es:'Residuos y contaminación',place:'Cáceres · Ribera del río',placeEs:'Cáceres · Ribera del río',boss:'The Waste Lord',bossEs:'El Señor de los Residuos',type:'COMMUNITY ACTION',typeEs:'ACCIÓN COMUNITARIA',img:'assets/rpg/scenarios/mission-04-waste-lord.jpeg',bossImg:'assets/rpg/bosses/boss-waste-lord.png',relic:'Immortality Rune',relicEs:'Runa de Inmortalidad',reward:250,story:'Poor waste management can affect riverbanks, wildlife and water quality. Lasting solutions combine prevention, collection and responsible disposal.',storyEs:'La gestión inadecuada de residuos puede afectar las riberas, la fauna y la calidad del agua. Las soluciones duraderas combinan prevención, recolección y disposición responsable.',intro:'The Waste Lord is feeding on careless habits. Build a plan that prevents pollution instead of moving it elsewhere.',introEs:'El Señor de los Residuos se alimenta de hábitos descuidados. Construye un plan que prevenga la contaminación en vez de trasladarla.',rounds:[
      {q:'What is the best response to mixed waste found along the riverbank?',qEs:'¿Cuál es la mejor respuesta ante residuos mezclados en la ribera?',hint:'Do not burn, dump or handle hazardous materials. Organize a safe response.',hintEs:'No quemes, arrojes ni manipules materiales peligrosos. Organiza una respuesta segura.',answers:[['Push it into the river so it is out of sight.','Empujarlos al río para que no se vean.',false,'Out of sight is not out of the ecosystem. This spreads the pollution.','Que no se vean no significa que salgan del ecosistema. Esto extiende la contaminación.'],['Separate what can be safely handled and coordinate proper collection.','Separar lo que pueda manipularse con seguridad y coordinar su recolección.',true,'Correct. Sorting, safe handling and a proper collection route reduce environmental risk.','Correcto. La clasificación, la manipulación segura y una ruta adecuada de recolección reducen el riesgo ambiental.'],['Burn all waste on the riverbank.','Quemar todos los residuos en la ribera.',false,'Open burning can release harmful smoke and leave residues in the environment.','La quema al aire libre puede liberar humo dañino y dejar residuos en el ambiente.']]},
      {q:'How can a community reduce waste reaching the river over time?',qEs:'¿Cómo puede una comunidad reducir con el tiempo los residuos que llegan al río?',hint:'The strongest solution starts before waste reaches the water.',hintEs:'La solución más sólida empieza antes de que los residuos lleguen al agua.',answers:[['Create prevention, sorting and regular collection habits.','Crear hábitos de prevención, separación y recolección periódica.',true,'Correct. Prevention and consistent collection address the source of the problem.','Correcto. La prevención y la recolección constante abordan el origen del problema.'],['Clean only once and ignore future dumping.','Limpiar una sola vez e ignorar nuevos vertimientos.',false,'One cleanup cannot solve a recurring source of pollution.','Una sola jornada no resuelve una fuente recurrente de contaminación.'],['Move waste to an empty lot nearby.','Trasladar los residuos a un lote cercano.',false,'Relocating waste without proper disposal simply transfers the risk.','Trasladar residuos sin disposición adecuada solo cambia el lugar del riesgo.']]}
    ]},
    {id:'habitat',name:'Habitat Recovery',es:'Recuperación del hábitat',place:'Tarazá · Bajo Cauca',placeEs:'Tarazá · Bajo Cauca',boss:'The Deforester',bossEs:'El Deforestador',type:'RESTORATION & CARE',typeEs:'RESTAURACIÓN Y CUIDADO',img:'assets/rpg/scenarios/mission-05-deforester.jpeg',bossImg:'assets/rpg/bosses/boss-deforester.png',relic:'Cauca Crown',relicEs:'Corona del Cauca',reward:300,story:'Healthy river systems depend on connected habitats. Restoration is not a one-day event: native vegetation needs protection, monitoring and time.',storyEs:'Los sistemas fluviales saludables dependen de hábitats conectados. La restauración no ocurre en un solo día: la vegetación nativa necesita protección, seguimiento y tiempo.',intro:'This is the final zone. Protect what remains, then plan recovery that can last beyond this mission.',introEs:'Esta es la zona final. Protege lo que permanece y planifica una recuperación que pueda durar más allá de esta misión.',rounds:[
      {q:'What should come first when habitat has been damaged?',qEs:'¿Qué debe hacerse primero cuando un hábitat ha sido dañado?',hint:'A restoration plan begins by protecting what is still functioning.',hintEs:'Un plan de restauración empieza por proteger lo que todavía funciona.',answers:[['Remove more vegetation to make the site easier to use.','Retirar más vegetación para facilitar el uso del lugar.',false,'Further clearing can deepen habitat loss and erosion.','Retirar más vegetación puede profundizar la pérdida de hábitat y la erosión.'],['Protect remaining habitat and assess local conditions.','Proteger el hábitat restante y evaluar las condiciones locales.',true,'Correct. Protecting remaining ecosystems and assessing the site guide effective restoration.','Correcto. Proteger los ecosistemas restantes y evaluar el lugar orienta una restauración efectiva.'],['Plant any fast-growing species without checking the ecosystem.','Plantar cualquier especie de rápido crecimiento sin revisar el ecosistema.',false,'Species selection must fit local conditions. Poor choices can create new ecological problems.','La selección de especies debe ajustarse a las condiciones locales. Una mala elección puede crear nuevos problemas ecológicos.']]},
      {q:'Which approach supports long-term riverbank recovery?',qEs:'¿Qué enfoque favorece la recuperación de la ribera a largo plazo?',hint:'Think beyond planting day: monitoring and maintenance matter.',hintEs:'Piensa más allá del día de siembra: el seguimiento y el mantenimiento importan.',answers:[['Use suitable native vegetation and monitor recovery over time.','Usar vegetación nativa adecuada y monitorear la recuperación.',true,'Correct. Local species, follow-up and community care support lasting recovery.','Correcto. Las especies locales, el seguimiento y el cuidado comunitario favorecen una recuperación duradera.'],['Plant once and leave the site without follow-up.','Sembrar una vez y abandonar el lugar sin seguimiento.',false,'Restoration needs monitoring and maintenance to understand whether it is working.','La restauración necesita seguimiento y mantenimiento para saber si está funcionando.'],['Replace the riverbank with a hard surface.','Reemplazar la ribera por una superficie rígida.',false,'A hard surface does not restore the ecological functions of a riverbank.','Una superficie rígida no recupera las funciones ecológicas de una ribera.']]}
    ]}
  ];
  const RIVER_LEARNING_ID='river-pressure';
  const riverEvidence={
    before:{id:'river-before-wastewater',phase:'BEFORE',title:'Wastewater needs treatment',titleEs:'Las aguas residuales necesitan tratamiento',claim:'Municipalities in Bajo Cauca requested wastewater treatment plants. Untreated wastewater is one of the problems communities need to address.',claimEs:'Municipios del Bajo Cauca solicitaron plantas de tratamiento de aguas residuales. Las aguas residuales sin tratar son uno de los problemas que las comunidades deben atender.',source:'DNP — Diálogos regionales vinculantes (Bajo Cauca)',answers:[{label:'Support safe reporting and ask adults about local wastewater solutions.',labelEs:'Apoyar los reportes seguros y preguntar a los adultos por soluciones locales para las aguas residuales.',correct:true},{label:'Assume dirty water becomes safe when it reaches the river.',labelEs:'Suponer que el agua sucia se vuelve segura al llegar al río.',correct:false,feedback:'Wastewater needs proper treatment; dilution is not treatment.',feedbackEs:'Las aguas residuales necesitan tratamiento adecuado; diluirlas no es tratarlas.'}],retryAnswers:[{label:'Wastewater should be treated before it enters waterways.',labelEs:'Las aguas residuales deben tratarse antes de llegar a los cauces.',correct:true},{label:'A river current replaces a treatment plant.',labelEs:'La corriente de un río reemplaza una planta de tratamiento.',correct:false}]},
    during:{id:'river-during-waste-sorting',phase:'DURING',title:'Keep household waste out of the river',titleEs:'Evita que los residuos del hogar lleguen al río',claim:'Since 2021, Colombia uses three colors: white for clean, dry recyclables; green for organic waste; and black for non-recyclable waste. Batteries and phones go to special collection points.',claimEs:'Desde 2021, Colombia usa tres colores: blanco para reciclables limpios y secos; verde para residuos orgánicos; y negro para residuos no aprovechables. Las pilas y los celulares van a puntos especiales de recolección.',source:'Ministerio de Ambiente — Resolución 2184 de 2019',answers:[{label:'Sort waste into the correct colour groups and take batteries or phones to a special collection point.',labelEs:'Separar los residuos por color y llevar pilas o celulares a un punto especial.',correct:true},{label:'Mix everything together or leave it beside the river.',labelEs:'Mezclar todo o dejarlo junto al río.',correct:false,feedback:'Sorting keeps recoverable materials separate and helps prevent waste from reaching waterways.',feedbackEs:'Separar los residuos mantiene aparte los materiales aprovechables y ayuda a evitar que lleguen a los cauces.'}],retryAnswers:[{label:'White: clean and dry recyclables. Green: organics. Black: non-recyclables.',labelEs:'Blanco: reciclables limpios y secos. Verde: orgánicos. Negro: no aprovechables.',correct:true},{label:'White, green and black all mean the same thing.',labelEs:'Blanco, verde y negro significan lo mismo.',correct:false}]},
    after:{id:'river-after-community-action',phase:'AFTER',title:'One safe action this week',titleEs:'Una acción segura para esta semana',claim:'This week, sort household waste using the three-colour system. If you notice a discharge or waste accumulation, observe only from a safe place and tell a trusted adult or local authorities. Never enter the river or handle unknown waste.',claimEs:'Esta semana, separa los residuos de tu hogar con el sistema de tres colores. Si observas una descarga o acumulación de residuos, mira solo desde un lugar seguro y avisa a un adulto de confianza o a las autoridades locales. Nunca entres al río ni manipules residuos desconocidos.',source:'Ministerio de Ambiente — Resolución 2184 de 2019; DNP — Diálogos regionales vinculantes (Bajo Cauca)',answers:[{label:'Sort waste at home and report hazards safely without approaching them.',labelEs:'Separar los residuos en casa y reportar los riesgos de forma segura, sin acercarse.',correct:true},{label:'Enter the river to collect unknown waste or confront people.',labelEs:'Entrar al río a recoger residuos desconocidos o confrontar personas.',correct:false,feedback:'Your safety comes first. Do not enter the river, handle unknown materials or confront anyone.',feedbackEs:'Tu seguridad es lo primero. No entres al río, no manipules materiales desconocidos ni confrontes a nadie.'}],retryAnswers:[{label:'Take one safe action at home and report hazards from a distance.',labelEs:'Realizar una acción segura en casa y reportar los riesgos desde lejos.',correct:true},{label:'Handle unknown waste to solve the problem alone.',labelEs:'Manipular residuos desconocidos para resolver el problema por tu cuenta.',correct:false}]}
  };
  function showRiverEvidence(key){
    if(state.selected!==0||!window.AERISLearning)return Promise.resolve(null);
    return window.AERISLearning.showCard(riverEvidence[key],{missionId:RIVER_LEARNING_ID});
  }
  const MAX_CAMPAIGN_XP=missions.reduce((sum,m)=>sum+m.reward,0)+(missions.length*40);
  const state={completed:[],xp:0,relics:[],mistakes:0,selected:0,round:0,answerIndex:null,playerX:7,encounter:false,finished:false,answerLocked:false};
  function readState(){
    try{
      const saved=JSON.parse(localStorage.getItem(STORE)||'null');
      if(saved&&typeof saved==='object'){
        const validIds=new Set(Array.isArray(saved.completed)?saved.completed.filter(id=>missions.some(m=>m.id===id)):[]);
        state.completed=[];
        for(const mission of missions){if(validIds.has(mission.id))state.completed.push(mission.id);else break;}
        const xp=Number(saved.xp);
        const earnedCeiling=state.completed.reduce((sum,id)=>sum+missions.find(m=>m.id===id).reward,0)+(state.completed.length*40);
        state.xp=Number.isFinite(xp)?Math.max(0,Math.min(MAX_CAMPAIGN_XP,earnedCeiling,Math.round(xp))):0;
        // Every completed mission earns its relic; repair incomplete or stale saves.
        state.relics=state.completed.slice();
        persist();
        return;
      }
    }catch(e){}
    try{
      const old=JSON.parse(localStorage.getItem(OLD_STORE)||'{}');
      const rawCount=Number(old.progress),count=Number.isFinite(rawCount)?Math.max(0,Math.min(missions.length,Math.floor(rawCount))):0;
      const rawXp=Number(old.xp);
      state.completed=missions.slice(0,count).map(m=>m.id);
      state.relics=state.completed.slice();
      const earnedCeiling=state.completed.reduce((sum,id)=>sum+missions.find(m=>m.id===id).reward,0)+(state.completed.length*40);
      state.xp=Number.isFinite(rawXp)?Math.max(0,Math.min(MAX_CAMPAIGN_XP,earnedCeiling,Math.round(rawXp))):0;
      persist();
    }catch(e){}
  }
  function persist(){try{localStorage.setItem(STORE,JSON.stringify({completed:state.completed,xp:state.xp,relics:state.relics,updatedAt:Date.now()}));}catch(e){notify(t('Progress could not be saved on this device.','No se pudo guardar el progreso en este dispositivo.'));}}
  function es(){return window.currentLang==='es';}
  function t(en,sp){return es()?sp:en;}
  function name(m){return es()?m.es:m.name;}
  function place(m){return es()?m.placeEs:m.place;}
  function boss(m){return es()?m.bossEs:m.boss;}
  function relic(m){return es()?m.relicEs:m.relic;}
  function unlockedCount(){return Math.min(missions.length,state.completed.length+1);}
  function isDone(m){return state.completed.includes(m.id);}
  function notify(msg){const toast=$('toast');if(toast){toast.textContent=msg;toast.classList.add('show');clearTimeout(window.__aerisOverhaulToast);window.__aerisOverhaulToast=setTimeout(()=>toast.classList.remove('show'),2600);}}
  function ensureHud(){
    if(!$('aerisCampaignHud')){
      const hud=document.createElement('div');hud.className='aerisCampaignHud';hud.id='aerisCampaignHud';hud.innerHTML='<div class="aerisHudCell"><span class="aerisHudLabel" data-hud="rank">GUARDIAN RANK</span><strong class="aerisHudValue" id="aerisRank">RIVER ROOKIE</strong><div class="aerisCampaignTrack"><i id="aerisCampaignFill"></i></div></div><div class="aerisHudCell"><span class="aerisHudLabel" data-hud="xp">EXPERIENCE</span><strong class="aerisHudValue"><span id="aerisCampaignXP">0</span> XP</strong></div><div class="aerisHudCell"><span class="aerisHudLabel" data-hud="relics">RELICS FOUND</span><strong class="aerisHudValue" id="aerisRelicCount">0 / 5</strong><div class="aerisRelicStrip" id="aerisRelicStrip"></div></div>';
      $('rpgMapScreen').prepend(hud);
    }
    if(!$('aerisMapHint')){const hint=document.createElement('div');hint.className='aerisMapHint';hint.id='aerisMapHint';hint.textContent=t('Choose the glowing waypoint. Complete both knowledge trials to claim its relic.','Elige el punto iluminado. Supera las dos pruebas de conocimiento para reclamar su reliquia.');$('rpgMapScreen').append(hint);}
    if(!$('aerisResetProgress')){const reset=document.createElement('button');reset.type='button';reset.className='aerisResetProgress';reset.id='aerisResetProgress';reset.textContent=t('RESET CAMPAIGN PROGRESS','REINICIAR PROGRESO');$('rpgMapScreen').append(reset);}
    if(!$('aerisMissionNotice')){const notice=document.createElement('div');notice.className='aerisMissionNotice';notice.id='aerisMissionNotice';notice.textContent=t('CONTROLS: drag the joystick left or right to reach the signal.','CONTROLES: mueve el joystick a izquierda o derecha para llegar a la señal.');$('rpgMissionPlay').append(notice);}
  }
  function renderHud(){
    const count=state.completed.length,percent=Math.round(count/missions.length*100),rank=state.xp>=850?'CAUCA LEGEND':state.xp>=500?'WATERSHED KEEPER':state.xp>=250?'RIVER SENTINEL':state.xp>=100?'FIELD SCOUT':'RIVER ROOKIE';
    if($('aerisRank'))$('aerisRank').textContent=t(rank,({ 'CAUCA LEGEND':'LEYENDA DEL CAUCA','WATERSHED KEEPER':'CUSTODIO DE LA CUENCA','RIVER SENTINEL':'CENTINELA DEL RÍO','FIELD SCOUT':'EXPLORADOR DE CAMPO','RIVER ROOKIE':'APRENDIZ DEL RÍO'})[rank]);
    if($('aerisCampaignXP'))$('aerisCampaignXP').textContent=state.xp;
    if($('aerisCampaignFill'))$('aerisCampaignFill').style.width=percent+'%';
    if($('aerisRelicCount'))$('aerisRelicCount').textContent=state.relics.length+' / 5';
    if($('aerisRelicStrip'))$('aerisRelicStrip').innerHTML=missions.map(m=>`<span class="aerisRelicChip ${state.relics.includes(m.id)?'':'locked'}" title="${relic(m)}">${state.relics.includes(m.id)?'◆':'◇'} ${relic(m)}</span>`).join('');
  }
  function renderMap(){
    $('rpgMapScreen').hidden=false;$('rpgDossier').hidden=true;$('rpgMissionPlay').hidden=true;$('rpgComplete').hidden=true;
    const positions=[[42,19],[65,34],[61,55],[31,65],[50,82]];
    $('rpgProgress').textContent=state.completed.length+' / 5';$('rpgXP').textContent=state.xp;
    $('rpgMapMarkers').innerHTML=missions.map((m,i)=>{const done=isDone(m),locked=i>=unlockedCount()&&!done;return `<button type="button" class="rpgMarker ${done?'completed':locked?'locked':'available'} ${i===state.completed.length?'current':''}" style="left:${positions[i][0]}%;top:${positions[i][1]}%" data-overhaul-mission="${i}" ${locked?'disabled':''} aria-label="${name(m)}${done?t(' completed',' completada'):locked?t(' locked',' bloqueada'):t(' available',' disponible')}">${done?'✓':locked?'×':i+1}<span class="rpgMarkerLabel">${String(i+1).padStart(2,'0')} · ${name(m)}</span></button>`}).join('');
    renderHud();
  }
  function showDossier(i){
    const m=missions[i];if(i>=unlockedCount()&&!isDone(m))return;
    state.selected=i;$('rpgMapScreen').hidden=true;$('rpgDossier').hidden=false;$('rpgMissionPlay').hidden=true;$('rpgComplete').hidden=true;
    $('rpgDossierImage').src=m.img;$('rpgDossierImage').alt=name(m)+' — '+place(m);$('rpgDossierBadge').textContent=t('MISSION ','MISIÓN ')+(i+1)+' / 5';$('rpgDossierLocation').textContent=place(m).toUpperCase();$('rpgDossierTitle').textContent=name(m);$('rpgDossierStory').textContent=es()?m.storyEs:m.story;$('rpgDossierBoss').src=m.bossImg;$('rpgDossierBoss').alt=boss(m);$('rpgDossierBossName').textContent=boss(m);$('rpgDossierBossType').textContent=es()?m.typeEs:m.type;$('rpgDossierReward').textContent=isDone(m)?t('REPLAY · +0 XP','REPETIR · +0 XP'):'+'+m.reward+' XP';$('rpgDossierRelic').textContent=relic(m);$('rpgStartMission').innerHTML=t('START MISSION <span>▶</span>','INICIAR MISIÓN <span>▶</span>');
    $('rpgBackMap').textContent=t('← BACK TO MAP','← VOLVER AL MAPA');
  }
  function resetPlayer(){
    clearTimeout(window.__aerisBossIntro);root.classList.remove('boss-cinematic');$('rpgEncounter').hidden=true;$('rpgEncounter').innerHTML='';$('rpgControls').hidden=false;if($('rpgWorldDialogue'))$('rpgWorldDialogue').hidden=false;
    state.playerX=7;state.encounter=false;state.finished=false;state.round=0;state.mistakes=0;state.answerLocked=false;state.answerIndex=null;
    $('rpgGuardianPlayer').style.left='7%';$('rpgGuardianPlayer').classList.remove('moving','atBoss','facingLeft');$('rpgDistanceFill').style.width='0%';$('rpgDistanceText').textContent='0%';$('rpgObjective').textContent=t('REACH THE SIGNAL','LLEGA A LA SEÑAL');
  }
  async function startMission(){
    if(state.selected===0&&window.AERISLearning){await showRiverEvidence('before');}
    const m=missions[state.selected];$('rpgDossier').hidden=true;$('rpgMapScreen').hidden=true;$('rpgMissionPlay').hidden=false;$('rpgComplete').hidden=true;resetPlayer();
    $('rpgPlayMissionLabel').textContent=t('MISSION ','MISIÓN ')+(state.selected+1)+' // '+name(m).toUpperCase();$('rpgPlayXP').textContent=state.xp;$('rpgSceneImage').src=m.img;$('rpgSceneImage').alt=name(m)+' — '+place(m);$('rpgSceneLocation').textContent=place(m);$('rpgSceneTitle').textContent=name(m);$('rpgBossName').textContent=boss(m);$('rpgBossLevel').textContent='LV. '+(10+state.selected*3);$('rpgBossImage').src=m.bossImg;$('rpgDialogueSpeaker').textContent=t('AERIS GUIDE','GUÍA AERIS');$('rpgDialogueText').textContent=es()?m.introEs:m.intro;
    $('aerisMissionNotice').textContent=t('CONTROLS: drag the joystick left or right to reach the signal.','CONTROLES: mueve el joystick a izquierda o derecha para llegar a la señal.');
    $('rpgGuardianPlayer').querySelector('img').src='assets/rpg/guardian/guardian-idle.png';$('rpgGuardianPlayer').querySelector('img').alt=t('AERIS Guardian','Guardián AERIS');
    $('rpgPlayXP').textContent=state.xp;requestAnimationFrame(()=>{$('rpgGuardianPlayer').focus({preventScroll:true})});
  }
  function move(dir){
    if($('rpgMissionPlay').hidden||state.encounter||state.finished)return;
    const old=state.playerX,step=3.4;state.playerX=Math.max(7,Math.min(77,state.playerX+(dir==='right'?step:-step)));
    $('rpgGuardianPlayer').style.left=state.playerX+'%';$('rpgGuardianPlayer').classList.add('moving');$('rpgGuardianPlayer').classList.toggle('facingLeft',dir==='left');const progress=Math.max(0,Math.min(100,Math.round((state.playerX-7)/70*100)));$('rpgDistanceFill').style.width=progress+'%';$('rpgDistanceText').textContent=progress+'%';
    if(state.playerX!==old&&typeof window.playFX==='function'){try{window.playFX('step')}catch(e){}}
    clearTimeout(window.__aerisOverhaulMove);window.__aerisOverhaulMove=setTimeout(()=>$('rpgGuardianPlayer').classList.remove('moving'),230);
    if(state.playerX>=75)beginEncounter();
  }
  async function beginEncounter(){
    if(state.encounter)return;state.encounter=true;
    if(state.selected===0&&window.AERISLearning){await showRiverEvidence('during');if(!window.AERISLearning.allVerified(RIVER_LEARNING_ID,[riverEvidence.before.id,riverEvidence.during.id])){state.encounter=false;return;}}state.playerX=77;$('rpgGuardianPlayer').style.left='77%';$('rpgDistanceFill').style.width='100%';$('rpgDistanceText').textContent='100%';$('rpgGuardianPlayer').classList.remove('moving');$('rpgGuardianPlayer').classList.add('atBoss');$('rpgGuardianPlayer').querySelector('img').src='assets/rpg/guardian/guardian-ready.png';$('rpgObjective').textContent=t('FIELD TRIAL','PRUEBA DE CAMPO');$('rpgControls').hidden=true;if($('rpgWorldDialogue'))$('rpgWorldDialogue').hidden=true;
    const enc=$('rpgEncounter');enc.hidden=false;enc.setAttribute('role','region');enc.setAttribute('aria-label',t('Mission knowledge trial','Prueba de conocimiento de la misión'));enc.tabIndex=-1;enc.innerHTML='<div class="aerisBattlePanel" id="aerisBattlePanel"><div class="aerisBattleTop"><span id="aerisBattleStage">FIELD TRIAL 1 / 2</span><span id="aerisBattleThreat">THREAT 100%</span></div><div class="aerisBattleMeter" role="progressbar" aria-label="'+t('Mission threat remaining','Amenaza restante de la misión')+'" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100"><i id="aerisBattleMeterFill" style="width:100%"></i></div><h4 class="aerisBattleQuestion" id="aerisBattleQuestion" tabindex="-1"></h4><p class="aerisBattleHint" id="aerisBattleHint"></p><div class="aerisBattleAnswers" id="aerisBattleAnswers"></div><div class="aerisBattleFeedback" id="aerisBattleFeedback" role="status" aria-live="polite" hidden></div><button type="button" class="aerisBattleNext" id="aerisBattleNext" hidden></button></div>';
    root.classList.remove('boss-cinematic');void root.offsetWidth;root.classList.add('boss-cinematic');const m=missions[state.selected];$('rpgDialogueText').textContent=t('The threat is in range. Two decisions stand between this river and a safer future.','La amenaza está a tu alcance. Dos decisiones separan a este río de un futuro más seguro.');renderRound();requestAnimationFrame(()=>{if(!enc.hidden)enc.scrollTop=0;});
  }
  function renderRound(preserveAnswer=false){
    const m=missions[state.selected],round=m.rounds[state.round],total=m.rounds.length,answered=state.round;
    state.answerLocked=false;
    if(!preserveAnswer)state.answerIndex=null;
    const remaining=Math.max(0,Math.round(100-(answered/Math.max(1,total))*100));
    $('aerisBattleStage').textContent=t('FIELD TRIAL ','PRUEBA DE CAMPO ')+(answered+1)+' / '+total;
    $('aerisBattleThreat').textContent=t('THREAT ','AMENAZA ')+remaining+'%';
    $('aerisBattleMeterFill').style.width=remaining+'%';
    const meter=$('aerisBattleMeterFill').parentElement;meter.setAttribute('aria-valuenow',String(remaining));
    $('aerisBattleQuestion').textContent=es()?round.qEs:round.q;
    $('aerisBattleHint').textContent=es()?round.hintEs:round.hint;
    $('aerisBattleFeedback').hidden=true;$('aerisBattleFeedback').className='aerisBattleFeedback';
    $('aerisBattleNext').hidden=true;
    $('aerisBattleAnswers').innerHTML=round.answers.map((a,i)=>`<button type="button" class="aerisBattleAnswer" data-answer="${i}"><span class="aerisAnswerKey">${String.fromCharCode(65+i)}</span><span>${es()?a[1]:a[0]}</span></button>`).join('');
    if(preserveAnswer&&state.answerIndex!==null)showAnswer(state.answerIndex,false);
  }
  function showAnswer(index,countMistake){
    const round=missions[state.selected].rounds[state.round],answer=round.answers[index];if(!answer)return;
    state.answerLocked=true;state.answerIndex=index;
    const buttons=[...$('aerisBattleAnswers').querySelectorAll('button')];
    buttons.forEach((button,i)=>{button.disabled=true;if(i===index)button.classList.add(answer[2]?'good':'bad');});
    const feedback=$('aerisBattleFeedback');feedback.hidden=false;
    feedback.className='aerisBattleFeedback '+(answer[2]?'is-right':'is-wrong');
    feedback.innerHTML='<strong>'+(answer[2]?t('FIELD NOTE CONFIRMED','REGISTRO CONFIRMADO'):t('NOT THE SAFEST MOVE','NO ES LA OPCIÓN MÁS SEGURA'))+'</strong><span>'+(es()?answer[4]:answer[3])+'</span>';
    const next=$('aerisBattleNext');next.hidden=false;
    next.textContent=answer[2]?(state.round===missions[state.selected].rounds.length-1?t('CLAIM RELIC','RECLAMAR RELIQUIA'):t('NEXT TRIAL →','SIGUIENTE PRUEBA →')):t('TRY AGAIN','INTENTAR DE NUEVO');
    if(countMistake&&!answer[2])state.mistakes++;
    if(countMistake&&typeof window.playFX==='function'){try{window.playFX(answer[2]?'correct':'wrong')}catch(e){}}
    requestAnimationFrame(()=>{if(!next.hidden){next.focus({preventScroll:true});next.scrollIntoView({behavior:window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});}});
  }
  function chooseAnswer(index){
    if(state.answerLocked)return;
    if(!Number.isInteger(index))return;
    showAnswer(index,true);
  }
  function nextBattleStep(){
    const feedback=$('aerisBattleFeedback'),right=feedback.classList.contains('is-right');
    if(!right){renderRound();$('rpgEncounter').scrollTop=0;const first=$('aerisBattleAnswers').querySelector('button');if(first)first.focus({preventScroll:true});return;}
    const total=missions[state.selected].rounds.length;
    if(state.round<total-1){state.round++;renderRound();$('aerisBattleQuestion').focus({preventScroll:true});$('rpgEncounter').scrollTop=0;return;}
    completeMission();
  }
  async function completeMission(){
    if(state.finished)return;
    if(state.selected===0&&window.AERISLearning){await showRiverEvidence('after');}
    state.finished=true;const m=missions[state.selected],firstClear=!isDone(m),earned=firstClear?m.reward+(state.mistakes===0?40:0):0;
    if(firstClear){state.completed.push(m.id);state.relics.push(m.id);state.xp+=earned;persist();}
    renderHud();$('rpgProgress').textContent=state.completed.length+' / 5';$('rpgXP').textContent=state.xp;$('rpgMissionPlay').hidden=true;$('rpgComplete').hidden=false;$('rpgComplete').classList.remove('aeris-victory');void $('rpgComplete').offsetWidth;$('rpgComplete').classList.add('aeris-victory');if(firstClear&&typeof window.playFX==='function'){try{window.playFX('relic');setTimeout(()=>window.playFX('win'),220)}catch(e){}}
    let particles=$('aerisVictoryParticles');if(!particles){particles=document.createElement('div');particles.id='aerisVictoryParticles';particles.className='aerisVictoryParticles';particles.setAttribute('aria-hidden','true');$('rpgComplete').appendChild(particles);}particles.innerHTML=Array.from({length:16},(_,i)=>`<i style="--dx:${Math.round(Math.cos(i*Math.PI/8)*120)}px;--dy:${Math.round(Math.sin(i*Math.PI/8)*90)}px;--delay:${(i%4)*35}ms"></i>`).join('');
    $('rpgCompleteTitle').textContent=state.completed.length===5?t('The Cauca has a new Guardian.','El Cauca tiene un nuevo Guardián.'):t('Relic recovered!','¡Reliquia recuperada!');
    $('rpgCompleteText').textContent=firstClear?(es()?'Completaste las dos pruebas con decisiones basadas en evidencia. Cada misión fortalece tu conocimiento sobre la cuenca.':'You completed both trials with evidence-based decisions. Every mission strengthens your understanding of the watershed.'):(es()?'Volviste a completar esta misión. Tu mejor progreso ya está guardado.':'You replayed this mission. Your best campaign progress is already saved.');
    if(state.selected===0&&window.AERISLearning){const learning=window.AERISLearning.stats(RIVER_LEARNING_ID,3);$('rpgCompleteText').textContent+=(es()?` Comprensión: ${learning.verified}/3 ideas verificadas; ${learning.firstTry} correctas al primer intento. Acción: separa los residuos de casa y reporta riesgos desde un lugar seguro.`:` Understanding: ${learning.verified}/3 ideas verified; ${learning.firstTry} correct on the first try. Action: sort household waste and report hazards from a safe place.`); }
    $('rpgCompleteXP').textContent=firstClear?'+'+earned:'+0';$('rpgCompleteRelic').textContent=relic(m);$('rpgCompleteNext').textContent=state.completed.length===5?t('CAMPAIGN COMPLETE','CAMPAÑA COMPLETA'):name(missions.find(x=>!isDone(x))||m);
    let reward=$('aerisBattleReward');if(!reward){reward=document.createElement('div');reward.id='aerisBattleReward';reward.className='aerisBattleReward';$('rpgComplete').append(reward);}reward.textContent=firstClear?t('BONUS: +40 XP for a clean run','BONO: +40 XP por una misión sin errores'):t('REPLAY COMPLETE · NO EXTRA XP','REPETICIÓN COMPLETA · SIN XP EXTRA');reward.hidden=!firstClear||state.mistakes>0;
    $('rpgContinueMap').textContent=t('RETURN TO MISSION MAP →','VOLVER AL MAPA DE MISIONES →');
  }
  function applyLanguage(){
    document.documentElement.lang=es()?'es':'en';
    ensureHud();renderHud();
    if(!$('rpgMapScreen').hidden)renderMap();
    if(!$('rpgDossier').hidden)showDossier(state.selected);
    if(!$('rpgMissionPlay').hidden){
      const m=missions[state.selected];
      $('rpgPlayMissionLabel').textContent=t('MISSION ','MISIÓN ')+(state.selected+1)+' // '+name(m).toUpperCase();
      $('rpgSceneLocation').textContent=place(m);$('rpgSceneTitle').textContent=name(m);$('rpgBossName').textContent=boss(m);
      $('rpgDialogueText').textContent=es()?m.introEs:m.intro;
      $('aerisMissionNotice').textContent=t('CONTROLS: drag the joystick left or right to reach the signal.','CONTROLES: mueve el joystick a izquierda o derecha para llegar a la señal.');
      if(state.encounter){
        const active=document.activeElement;
        const activeAnswer=active&&active.closest?active.closest('.aerisBattleAnswer'):null;
        const answerIndex=activeAnswer?Number(activeAnswer.dataset.answer):null;
        const focusQuestion=active&&active.id==='aerisBattleQuestion';
        const focusNext=active&&active.id==='aerisBattleNext';
        $('rpgEncounter').setAttribute('aria-label',t('Mission knowledge trial','Prueba de conocimiento de la misión'));
        renderRound(state.answerLocked);
        if(!state.answerLocked&&Number.isInteger(answerIndex)){const replacement=$('aerisBattleAnswers').querySelector('[data-answer="'+answerIndex+'"]');if(replacement)replacement.focus({preventScroll:true});}
        else if(!state.answerLocked&&focusQuestion)$('aerisBattleQuestion').focus({preventScroll:true});
        else if(!state.answerLocked&&focusNext)$('aerisBattleNext').focus({preventScroll:true});
      }
    }
    if($('aerisResetProgress'))$('aerisResetProgress').textContent=t('RESET CAMPAIGN PROGRESS','REINICIAR PROGRESO');
  }
  root.addEventListener('click',function(e){
    const marker=e.target.closest('[data-overhaul-mission]');if(marker){e.preventDefault();e.stopImmediatePropagation();showDossier(Number(marker.dataset.overhaulMission));return;}
    if(e.target.closest('#rpgStartMission')){e.preventDefault();e.stopImmediatePropagation();startMission();return;}
    if(e.target.closest('#rpgBackMap')||e.target.closest('#rpgQuitMission')||e.target.closest('#rpgContinueMap')){e.preventDefault();e.stopImmediatePropagation();renderMap();return;}
    const answer=e.target.closest('.aerisBattleAnswer');if(answer){e.preventDefault();e.stopImmediatePropagation();chooseAnswer(Number(answer.dataset.answer));return;}
    if(e.target.closest('#aerisBattleNext')){e.preventDefault();e.stopImmediatePropagation();nextBattleStep();return;}
    if(e.target.closest('#aerisResetProgress')){e.preventDefault();e.stopImmediatePropagation();if(window.confirm(t('Reset all AERIS campaign progress and relics on this device?','¿Reiniciar todo el progreso y las reliquias de AERIS en este dispositivo?'))){state.completed=[];state.relics=[];state.xp=0;persist();renderMap();notify(t('Campaign progress reset.','Progreso reiniciado.'));}return;}
  },true);
  window.aerisRpgMove=move;window.aerisMove=move;
  window.addEventListener('aeris:language',applyLanguage);
  const switcher=$('langSwitch');if(switcher)switcher.addEventListener('click',()=>setTimeout(applyLanguage,140));
  readState();ensureHud();renderMap();applyLanguage();
  document.body.classList.add('aeris-rpg-overhaul');
  document.documentElement.classList.add('aeris-rpg-overhaul');
  // Add accessible names and safe external-link behavior without changing original destinations.
  document.querySelectorAll('a[target="_blank"]').forEach(a=>{a.rel='noopener noreferrer';});
  // Keep the active navigation state in sync with the section currently on screen.
  if('IntersectionObserver' in window){const navLinks=[...document.querySelectorAll('.aerisTopLink')];const sections=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));}}),{rootMargin:'-35% 0px -55% 0px'});sections.forEach(section=>observer.observe(section));}
})();
