const CORS={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Methods":"POST, OPTIONS"};
const j=(d,s=200)=>new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json; charset=utf-8",...CORS}});
export function onRequestOptions(){return new Response(null,{status:204,headers:CORS});}
export async function onRequestPost(context){
 try{
  const key=context.env.OPENAI_API_KEY; if(!key)return j({error:"OPENAI_API_KEY is not configured."},503);
  const b=await context.request.json().catch(()=>({})); const message=String(b.message||"").trim(); const lang=b.language==="es"?"es":"en"; const history=Array.isArray(b.history)?b.history.slice(-8):[];
  if(!message)return j({error:"Message is required."},400); if(message.length>4000)return j({error:"Message is too long."},413);
  const instructions=lang==="es"?"Eres Cauca Guardian AI, el asistente del proyecto escolar AERIS. Puedes responder preguntas generales de conocimiento, no solo sobre el Río Cauca. Responde en español. Para preguntas sobre el Río Cauca, Caucasia, Bajo Cauca, minería, mercurio, peces y ambiente, prioriza evidencia y explica de forma clara para estudiantes. No inventes datos y no des instrucciones peligrosas.":"You are Cauca Guardian AI for the AERIS school project. You can answer general knowledge questions, not only questions about the Cauca River. Respond in English. For questions about the Cauca River, Caucasia, Bajo Cauca, mining, mercury, fish, and the environment, prioritize evidence and explain clearly for students. Do not invent facts or provide dangerous instructions.";
  const input=[{role:"system",content:instructions},...history.filter(m=>m&&(m.role==="user"||m.role==="assistant")&&typeof m.content==="string"),{role:"user",content:message}];
  const r=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${key}`},body:JSON.stringify({model:"gpt-5.6-luna",input,max_output_tokens:700,store:false})});
  const d=await r.json().catch(()=>({})); if(!r.ok)return j({error:d?.error?.message||"AI request failed."},r.status);
  return j({answer:d.output_text||d.output?.flatMap(x=>x.content||[]).map(x=>x.text).filter(Boolean).join("\n")||""});
 }catch(e){return j({error:"AI service unavailable."},500);}
}
