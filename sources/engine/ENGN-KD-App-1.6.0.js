(function(){'use strict';
var APPV='1.6.0';
function $(s){return document.querySelector(s)}
function h(t,a,k){var e=document.createElement(t),x;if(a)for(x in a){if(x==='text')e.textContent=a[x];else e.setAttribute(x,a[x])}(k||[]).forEach(function(c){if(c!=null&&c!=='')e.append(c)});return e}
function arr(x){return Array.isArray(x)?x:[]}
function objs(x){return arr(x).filter(function(o){return o&&typeof o==='object'&&!Array.isArray(o)})}
function str(x){return typeof x==='string'?x:(typeof x==='number'||typeof x==='boolean'?String(x):'')}
function strs(x){return arr(x).map(str).filter(Boolean)}
function lst(x){return typeof x==='string'?[x]:x}
function ol(x){return objs(x&&typeof x==='object'&&!Array.isArray(x)?[x]:x)}
function dec(s){try{return decodeURIComponent(s)}catch(e){return s}}
var bad=0;
function readTpl(t){try{var o=JSON.parse(t.content.textContent);return o&&typeof o==='object'&&!Array.isArray(o)?o:null}catch(e){bad++;return null}}
function merge(d,m,n){n=n||0;if(n>12)return;Object.keys(m).forEach(function(k){if(k==='__proto__'||k==='constructor'||k==='prototype')return;var v=m[k];
var kd=function(x){return Array.isArray(x)?'a':(x==null?'u':(typeof x==='object'?'o':'p'))};if(kd(d[k])!=='u'&&kd(d[k])!==kd(v))return;
if(k==='levels'){if(!Array.isArray(v))return;objs(v).forEach(function(L){var t=objs(d.levels).filter(function(x){return String(x.id)===String(L.id)})[0];if(t)t.chapters=arr(t.chapters).concat(arr(L.chapters));else{d.levels=arr(d.levels);d.levels.push(L)}})}
else if(Array.isArray(v))d[k]=arr(d[k]).concat(v);
else if(v&&typeof v==='object'){if(!d[k]||typeof d[k]!=='object'||Array.isArray(d[k]))d[k]={};merge(d[k],v,n+1)}else if(v!=null&&typeof v!=='object'&&kd(d[k])==='u')d[k]=v})}
/* A family page holds several guides as packs: ?pack=<slug> opens one, no pack shows the shelf of all of them. */
var PKS=[].slice.call(document.querySelectorAll('template[data-kd=pack]')),SH=null,SHELF=false,PACK='',PT=null;
if(PKS.length){SH=readTpl($('template[data-kd=shelf]'))||{};var pq='';try{pq=new URLSearchParams(location.search).get('pack')||''}catch(e){}
PT=PKS.filter(function(t){return t.getAttribute('data-pack')===pq})[0]||null;if(PT){PACK=pq;document.documentElement.setAttribute('data-pack',pq)}else SHELF=true}
var D=SHELF?{meta:SH.meta&&typeof SH.meta==='object'?SH.meta:{}}:(readTpl(PT||$('template[data-kd=base]'))||{});
var mores=[];document.querySelectorAll('template[data-kd=more]').forEach(function(t){if(PKS.length&&t.getAttribute('data-pack')!==PACK)return;var m=readTpl(t);if(m)mores.push(m)});
var dupN=0,lastC=Object.create(null);mores.forEach(function(m){var n=Number(m.chunk)||0;if(n>0)lastC[n]=m});mores.sort(function(a,b){return(Number(a.chunk)||0)-(Number(b.chunk)||0)}).forEach(function(m){var n=Number(m.chunk)||0;if(n<1||lastC[n]!==m){dupN++;return}try{merge(D,m.more&&typeof m.more==='object'?m.more:m)}catch(e){dupN++}});
var M=D.meta&&typeof D.meta==='object'?D.meta:{};var LB=M.labels&&typeof M.labels==='object'?M.labels:{};function lb(k,d){if(/^(start|unsure|me|help|about)$/.test(k))return d;var v=Object.prototype.hasOwnProperty.call(LB,k)&&typeof LB[k]==='string'?LB[k].trim():'';return v&&v.length<=60?v:d}var missN=[],tot=Math.min((typeof M.chunks==='number'||typeof M.chunks==='string'?Number(M.chunks):0)||0,200);for(var q0=2;q0<=tot;q0++)if(!lastC[q0])missN.push(q0);
var ID=/^[\w-]{1,40}$/.test(str(M.id))?str(M.id):'g'+(function(t){var x=5381,i;for(i=0;i<t.length;i++)x=((x<<5)+x+t.charCodeAt(i))|0;return(x>>>0).toString(36)})(str(M.title));
var CH=[],QS=[],VALID=Object.create(null),used=Object.create(null);
objs(D.levels).forEach(function(lv){objs(lv.chapters).forEach(function(c){
var base=/^[\w-]{1,40}$/.test(str(c.id))&&str(c.id)!=='__proto__'?str(c.id):'x'+CH.length,id=base,n=2;while(used[id]){id=base.slice(0,40)+'-'+n;n++}used[id]=1;
c._id=id;c._lv=lv;VALID[id]=1;
c._q=objs(c.check).map(function(q,k){var o={id:id+':'+k,q:str(q.q),a:str(q.a),ref:str(q.ref)};VALID[o.id]=1;QS.push(o);return o});
CH.push(c)})});
var G=objs(D.glossary).filter(function(g){return str(g.term).trim()});
var PK=ID+'.progress',LK=ID+'.look';
function sget(k){try{return localStorage.getItem(k)}catch(e){return null}}
function sset(k,v){try{localStorage.setItem(k,v);return true}catch(e){return false}}
function sdel(k){try{localStorage.removeItem(k)}catch(e){}}
/* split-pack migration: copy an old pack's progress into each new pack it became, filtered to that pack's ids; never deletes */
(function(){var t=$('template[data-kd=migrate]'),M=t?readTpl(t):null;if(!M)return;Object.keys(M).forEach(function(o){var raw=sget(o+'.progress'),s=null;if(raw===null)return;try{s=JSON.parse(raw)}catch(e){}if(!s||typeof s!=='object')return;objs(M[o]).forEach(function(p){var k=str(p.id)+'.progress';if(!/^[\w-]{1,40}$/.test(str(p.id))||sget(k)!==null)return;var ids=Object.create(null);arr(p.ch).concat(arr(p.ac)).forEach(function(c){ids[str(c)]=1});function f(m,q){var r={};if(m&&typeof m==='object'&&!Array.isArray(m))Object.keys(m).forEach(function(i){if(ids[q?i.split(':')[0]:i])r[i]=m[i]});return r}sset(k,JSON.stringify({v:s.v,first:s.first,done:f(s.done),act:f(s.act),q:f(s.q,1),qd:f(s.qd,1),rev:Array.isArray(s.rev)?s.rev:[]}))})})})();
function p2(n){return(n<10?'0':'')+n}
function fmt(d){return d.getFullYear()+'-'+p2(d.getMonth()+1)+'-'+p2(d.getDate())}
function today(){return fmt(new Date())}
function addDays(s,n){var a=s.split('-');return fmt(new Date(+a[0],+a[1]-1,+a[2]+n))}
function validDate(s){var m=/^(\d{4})-(\d\d)-(\d\d)$/.exec(s);if(!m)return false;var y=+m[1],mo=+m[2],d=+m[3],t=new Date(y,mo-1,d);return y>=2000&&y<=2100&&t.getFullYear()===y&&t.getMonth()===mo-1&&t.getDate()===d}
function blank(){return{v:2,first:validDate(today())?today():'2000-01-01',done:Object.create(null),q:Object.create(null),qd:Object.create(null),rev:[],act:Object.create(null)}}
function safeKey(i){return /^[\w-]{1,60}(:\d{1,6})?$/.test(i)&&i!=='__proto__'}
function pick(src,dst,f){if(src&&typeof src==='object'&&!Array.isArray(src))Object.keys(src).forEach(function(i){if(safeKey(i)){var v=f(src[i]);if(v!==undefined)dst[i]=v}})}
function clean(o){if(!o||typeof o!=='object'||(o.v!==1&&o.v!==2)||typeof o.first!=='string'||!validDate(o.first))return null;var n=blank();n.first=o.first;
pick(o.done,n.done,function(v){return v===true?true:undefined});pick(o.act,n.act,function(v){return v===true?true:undefined});
pick(o.q,n.q,function(v){return v==='got'||v==='review'?v:undefined});
pick(o.qd,n.qd,function(v){return v&&typeof v==='object'&&Number.isInteger(v.b)&&v.b>=1&&v.b<=5&&typeof v.d==='string'&&validDate(v.d)?{b:v.b,d:v.d}:undefined});
Object.keys(n.q).forEach(function(k){if(n.q[k]==='got'&&!n.qd[k])n.qd[k]={b:2,d:addDays(n.first,3)}});
n.rev=arr(o.rev).filter(function(d,i,a){return(d===1||d===3||d===7||d===21)&&a.indexOf(d)===i});return n}
var S=null,loadNote='',damaged=sget(PK+'.damaged')!==null,volatile=false,noWrite=SHELF,persist='not asked yet';

(function(){var raw=sget(PK);if(raw!==null){var s=null;try{s=clean(JSON.parse(raw))}catch(e){}
if(s)S=s;else{var dk=sget(PK+'.damaged')===null?'.damaged':(sget(PK+'.damaged2')===null?'.damaged2':null),kept=dk?sset(PK+dk,raw):false;damaged=damaged||kept;var l=null;try{l=clean(JSON.parse(sget(PK+'.last')))}catch(e){}
if(l){S=l;loadNote='Your saved progress could not be read. A copy of it was kept. The last good copy was restored.'}else{S=blank();loadNote='Your saved progress could not be read. A copy of it was kept, and you start with empty progress.'}if(kept)sset(PK,JSON.stringify(S));else{noWrite=true;loadNote='Your saved progress could not be read, and this browser could not keep a copy of it. Nothing was erased. New progress will not be saved in this browser. Use Save progress file to keep a copy.'}}}
if(!S){S=blank();save(true)}})();
function save(init){if(noWrite){volatile=true;return false}var prev=sget(PK),ok=sset(PK,JSON.stringify(S));volatile=!ok;
if(ok){try{if(prev!==null&&clean(JSON.parse(prev)))sset(PK+'.last',prev)}catch(e){}
if(!init&&persist==='not asked yet'){persist='asked';if(navigator.storage&&navigator.storage.persist){navigator.storage.persist().then(function(g){persist=g?'granted':'denied'},function(){persist='denied'})}else persist='unsupported'}}
return ok}
var lookMem=null;
var HK='hub.prefs.v1';
function prefs(){try{var o=JSON.parse(sget(HK));return o&&typeof o==='object'&&!Array.isArray(o)&&Number.isInteger(o.schemaVersion)&&o.schemaVersion>=1?o:null}catch(e){return null}}
function look(){var p=prefs(),v=lookMem||(p&&typeof p.look==='string'?p.look:sget(LK));return v==='paper'||v==='charcoal'||v==='black'?v:'auto'}
function applyLook(){var v=look(),r=v;if(v==='auto')r=window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'charcoal':'paper';document.documentElement.setAttribute('data-look',r);$('#look').value=v}
var hue=(typeof M.hue==='number'||(typeof M.hue==='string'&&M.hue.trim()!==''))?Number(M.hue):NaN,R=document.documentElement;
if(isFinite(hue)&&hue>=0&&hue<360)R.style.setProperty('--h',String(Math.round(hue)));
if(M.type==='serif'||M.type==='humanist')R.setAttribute('data-type',M.type);if(M.radius==='sharp')R.setAttribute('data-radius','sharp');if(M.density==='compact')R.setAttribute('data-density','compact');
if(/^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/.test(str(M.lang)))$('#main').lang=M.lang;
function T(par,t){str(t).split(/\n{2,}/).forEach(function(s){s=s.trim();if(s)par.append(h('p',{text:s}))})}
function lead(l,t,cls){var d=h('div',cls?{'class':cls}:null),f=true;str(t).split(/\n{2,}/).map(function(s){return s.trim()}).filter(Boolean).forEach(function(s){var p=h('p');if(f){p.append(h('strong',{text:l+': '}));f=false}p.append(s);d.append(p)});if(f)d.append(h('p',null,[h('strong',{text:l+': '})]));return d}
function facts(rows){var dl=h('dl',{'class':'facts'});rows.forEach(function(r){var dd=h('dd');T(dd,r[1]);dl.append(h('dt',{text:r[0]}),dd)});return dl}
function ul(list){return h('ul',null,strs(list).map(function(x){return h('li',{text:x})}))}
function tbl(head,rows){return h('div',{'class':'scroll',role:'region',tabindex:'0','aria-label':'Table, scrolls sideways when wide'},[h('table',null,[h('thead',null,[h('tr',null,head.map(function(x){return h('th',{scope:'col',text:x})}))]),h('tbody',null,rows.map(function(r){return h('tr',null,r.map(function(c,i){return h('td',{'data-l':head[i],text:str(c)})}))}))])])}
function quiz(q){var qk='qt-'+q.id.replace(/[^\w-]/g,'_'),box=h('div',{'class':'q',role:'group','aria-labelledby':qk}),ans=h('div',{id:'a-'+q.id.replace(/[^\w-]/g,'_'),'class':'ans'}),mk=h('div',{'class':'row mkrow'}),st=h('p',{'class':'mu',role:'status'});
var conf='',cf=h('div',{'class':'row',role:'group','aria-label':'How sure are you before you look?'}),cm=h('p',{'class':'mu'});
function say(){var v=S.q[q.id];st.textContent=(v==='got'?'Your mark: got it.':(v==='review'?'Your mark: review again.':''))+(v&&conf==='sure'&&v==='review'?' You felt sure but missed it, so look again.':'')+(v&&conf==='guess'&&v==='got'?' You were unsure and got it: good.':'')}
var show=h('button',{type:'button','aria-expanded':'false','aria-controls':ans.id,text:'Show answer'}),got=h('button',{type:'button','data-q':q.id,'data-v':'got',text:'I got it','aria-pressed':String(S.q[q.id]==='got')}),rv=h('button',{type:'button','data-q':q.id,'data-v':'review',text:'Review again','aria-pressed':String(S.q[q.id]==='review')});
box.append(h('p',{id:qk},[h('strong',{text:'Question: '}),q.q]));cm.textContent='Before you look: say your answer in your own words, then pick how sure you are (optional).';[['guess','Guessing'],['think','Think so'],['sure','Sure']].forEach(function(x){var b=h('button',{type:'button','aria-pressed':'false',text:x[1]});b.addEventListener('click',function(){conf=conf===x[0]?'':x[0];Array.prototype.forEach.call(cf.children,function(k){k.setAttribute('aria-pressed','false')});if(conf)b.setAttribute('aria-pressed','true')});cf.append(b)});box.append(cm,cf);ans.hidden=true;
ans.append(h('p',null,[h('strong',{text:'Answer: '}),q.a]));
function mark(v){var pr=S.q[q.id];S.q[q.id]=v;var o=S.qd[q.id],tdy=today();if(v==='got'){if(pr==='review'){S.qd[q.id]={b:1,d:addDays(tdy,1)}}else if(!o||o.d<=tdy||far(o,tdy)){var b=Math.min(5,(o?o.b:0)+1);S.qd[q.id]={b:b,d:addDays(tdy,[1,3,7,21,60][b-1])}}}else S.qd[q.id]={b:1,d:tdy};var was=volatile;if(!save()&&!was){render(true);return}got.setAttribute('aria-pressed',String(v==='got'));rv.setAttribute('aria-pressed',String(v==='review'));say();document.querySelectorAll('.sofar').forEach(function(sf){sf.textContent=sofarT(counts(S))});document.querySelectorAll('.mast').forEach(function(e){if(e._f)e.textContent=e._f()})}
show.addEventListener('click',function(){ans.hidden=!ans.hidden;show.setAttribute('aria-expanded',String(!ans.hidden));show.textContent=ans.hidden?'Show answer':'Hide answer'});
got.addEventListener('click',function(){mark('got')});rv.addEventListener('click',function(){mark('review')});
mk.append(got,rv);ans.append(mk);if(q.ref){var rc=CH.filter(function(c){return str(c.title)===str(q.ref)})[0];ans.append(rc&&location.hash!=='#c-'+rc._id?h('p',{'class':'mu'},['To review, re-read: ',h('a',{href:'#c-'+rc._id,text:q.ref})]):h('p',{'class':'mu',text:'To review, re-read: '+q.ref}))}say();box.append(h('div',{'class':'row'},[show]),st,ans);return box}
function esc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}
var NOSP=/[\u0E00-\u0FFF\u1000-\u109F\u1780-\u17FF\u3040-\u30FF\u3100-\u312F\u3400-\u9FFF\uAC00-\uD7AF\uF900-\uFAFF\u{20000}-\u{2FA1F}]/u;
function termsFor(c){var t=flat(c).toLowerCase();return G.filter(function(g){var q=str(g.term).toLowerCase();if(NOSP.test(q))return t.indexOf(q)>-1;try{var L='[^\\p{L}\\p{N}]',B=NOSP.test(t)?'('+L+'|'+NOSP.source+')':L;return new RegExp('(^|'+B+')'+esc(q)+'($|'+B+')','u').test(t)}catch(e){return false}})}
function flat(o,d){d=d||0;if(d>6||o==null)return'';if(typeof o==='string')return o+' ';if(typeof o!=='object')return'';var s='';Object.keys(o).forEach(function(k){if(k.charAt(0)!=='_')s+=flat(o[k],d+1)});return s}
var NAV=[];
function build(){NAV=[['start',lb('start','Start Here'),null,'a']];
if(D.big)NAV.push(['big',lb('big','Big Picture'),null,'a']);if(G.length)NAV.push(['glossary',lb('glossary','Glossary'),null,'l']);
CH.forEach(function(c){NAV.push(['c-'+c._id,str(c.title)||c._id,c,'c'])});
if(objs(D.rules).length)NAV.push(['rules',lb('rules','Rules of Thumb'),null,'l']);if(objs(D.decide).length)NAV.push(['decide',lb('decide','Which One Do I Pick?'),null,'l']);
if(objs(D.ref).length)NAV.push(['ref',lb('ref','Quick Reference'),null,'l']);if(QS.length)NAV.push(['test',lb('test','Self-Test'),null,'p']);if(QS.length)NAV.push(['drill','Practice What You Missed',null,'p']);if(ACT.length||actBad)NAV.push(['play',lb('play','Practice and Play'),null,'p']);
if(D.next)NAV.push(['next',lb('next','What To Do Next'),null,'p']);NAV.push(['unsure',lb('unsure','What We Are Not Sure About'),null,'m'],['about',lb('about','How This Guide Works'),null,'m']);
if(D.ai)NAV.push(['ai',lb('ai','For AI Tools'),null,'m']);NAV.push(['me',lb('me','My Progress'),null,'z'],['help',lb('help','Help'),null,'z'],['licences',lb('licences','Licence and reuse'),null,'m'])}
function drawNav(cur){var n=$('#nav'),od=n.querySelector('details'),wasOpen=!!(od&&od.open);n.replaceChildren();
function link(x){var a=h('a',{href:'#'+x[0],text:x[1]});if(x[0]===cur)a.setAttribute('aria-current','page');if(x[2]&&S.done[x[2]._id])a.className='done';return a}
function grp(g,title){var xs=NAV.filter(function(x){return x[3]===g});if(!xs.length)return;if(title)n.append(h('h2',{text:title}));xs.forEach(function(x){n.append(link(x))})}
n.append(h('h2',{text:'Learn'}));grp('a','');var last=null;NAV.filter(function(x){return x[3]==='c'}).forEach(function(x){if(x[2]._lv!==last){last=x[2]._lv;n.append(h('h2',{text:'Level '+str(last.id)+': '+str(last.name)}))}n.append(link(x))});
grp('p','Practice');grp('z','Your progress and help');grp('l','Look up');
var mo=NAV.filter(function(x){return x[3]==='m'});if(mo.length){var d=h('details',null,[h('summary',{text:'More'})]);mo.forEach(function(x){d.append(link(x))});if(wasOpen||mo.some(function(x){return x[0]===cur}))d.open=true;n.append(d)}
var dn=CH.filter(function(c){return S.done[c._id]}).length;$('#bar').max=Math.max(CH.length,1);$('#bar').value=dn}
var drillSkip=null;
var SVN='http://www.w3.org/2000/svg',vid=0;
function sv(t,a,k){var e=document.createElementNS(SVN,t),x;if(a)for(x in a)e.setAttribute(x,String(a[x]));(k||[]).forEach(function(c){if(c)e.append(c)});return e}
function svt(x,y,cl,s,an,mx){var e=sv('text',{x:x,y:y,'class':cl});if(an)e.setAttribute('text-anchor',an);if(mx)e.setAttribute('data-mx',String(mx));e.textContent=s;return e}
function rot(x,y,cl,s,an,mx){var e=svt(0,0,cl,s,an,mx);e.setAttribute('transform','translate('+x+','+y+') rotate(-90)');return e}
function num(v){return typeof v==='number'?v:(typeof v==='string'&&v.trim()!==''?Number(v):NaN)}
function c01(n){return Math.max(0,Math.min(100,n))}
function nice(n){var a=Math.abs(n);return a>=1e15?n.toPrecision(3):(a>0&&a<0.01?n.toPrecision(2):String(Math.round(n*100)/100))}
function ax(x,d){return str(x)||d}
function far(o,t){return o.d>addDays(t,[1,3,7,21,60][o.b-1])}
function fitText(f){f.querySelectorAll('text[data-mx]').forEach(function(t){try{var w=t.getComputedTextLength(),mx=Number(t.getAttribute('data-mx'));if(w>mx){t.setAttribute('textLength',String(mx));t.setAttribute('lengthAdjust','spacingAndGlyphs')}}catch(e){}})}
function wrap(s,n,mx){var out=[],cur='',n2=NOSP.test(s)?Math.max(4,Math.floor(n/2)):n;str(s).trim().split(/\s+/).forEach(function(w){var cs=Array.from(w);while(cs.length>n2){if(cur){out.push(cur);cur=''}out.push(cs.slice(0,n2).join(''));cs=cs.slice(n2)}w=cs.join('');if(cur&&Array.from(cur+' '+w).length>n2){out.push(cur);cur=w}else cur=cur?cur+' '+w:w});if(cur)out.push(cur);if(out.length>mx){out=out.slice(0,mx);out[mx-1]=Array.from(out[mx-1]).slice(0,Math.max(0,n2-3)).join('')+'...'}return out.length?out:['']}
function arrowDown(g,x,y1,y2){g.append(sv('line',{x1:x,y1:y1,x2:x,y2:y2-6,'class':'va'}),sv('polygon',{points:x+','+y2+' '+(x-6)+','+(y2-9)+' '+(x+6)+','+(y2-9),'class':'vh'}))}
function drawFlow(it,loop){var g=sv('g'),y=14,tx=[],first=null,last=null,x0=loop?10:20,bw=loop?340:360,t0=x0+14,mw=bw-28;it.forEach(function(o,i){var ls=wrap((i+1)+'. '+o.label,27,3),nt=o.note?wrap(o.note,32,2):[],hh=20+ls.length*24+nt.length*21;if(i>0){arrowDown(g,x0+bw/2,y,y+26);y+=26}g.append(sv('rect',{x:x0,y:y,width:bw,height:hh,rx:8,'class':'vb'}));ls.forEach(function(l,k){g.append(svt(t0,y+26+24*k,'vt',l,null,mw))});nt.forEach(function(l,k){g.append(svt(t0,y+22+24*ls.length+21*k,'vm',l,null,mw))});if(i===0)first=y+hh/2;last=y+hh/2;y+=hh;tx.push((i+1)+'. '+str(o.label)+(o.note?' ('+str(o.note)+')':''))});
if(loop&&it.length>1){g.append(sv('polyline',{points:'350,'+last+' 384,'+last+' 384,'+first+' 358,'+first,'class':'va'}),sv('polygon',{points:'350,'+first+' 361,'+(first-6)+' 361,'+(first+6),'class':'vh'}));tx.push('Then it starts again at step 1.')}return{g:g,h:y+14,tx:tx}}
function drawTime(it){var g=sv('g'),y=14,tx=[];it.forEach(function(o){var a=wrap(o.when,10,3),b=wrap(o.label,22,4),n=Math.max(a.length,b.length),hh=n*24+14;g.append(sv('circle',{cx:112,cy:y+12,r:6,'class':'vp'}));a.forEach(function(l,k){g.append(svt(98,y+19+24*k,'vt',l,'end',92))});b.forEach(function(l,k){g.append(svt(128,y+19+24*k,'vt',l,null,268))});y+=hh;tx.push((o.when?str(o.when)+': ':'')+str(o.label))});g.prepend(sv('line',{x1:112,y1:20,x2:112,y2:Math.max(20,y-26),'class':'va'}));return{g:g,h:y+6,tx:tx}}
function drawBars(it,unit){var g=sv('g'),y=14,tx=[],mx=0;it.forEach(function(o){if(o.value>mx)mx=o.value});if(!(mx>0))mx=1;it.forEach(function(o){var w=Math.max(2,Math.round(o.value/mx*150)),v=nice(o.value)+(unit?' '+unit:'');g.append(svt(20,y+18,'vt',wrap(o.label,32,1)[0],null,360));g.append(sv('rect',{x:20,y:y+26,width:w,height:20,'class':'vd'}));g.append(svt(28+w,y+42,'vt',v,null,Math.max(60,372-w)));y+=60;tx.push(str(o.label)+': '+v)});return{g:g,h:y,tx:tx}}
function drawMap(it,v){var g=sv('g'),tx=[],L=46,T=16,PW=340,PH=300;g.append(sv('rect',{x:L,y:T,width:PW,height:PH,'class':'vb'}),sv('line',{x1:L+PW/2,y1:T,x2:L+PW/2,y2:T+PH,'class':'vg'}),sv('line',{x1:L,y1:T+PH/2,x2:L+PW,y2:T+PH/2,'class':'vg'}));
var xl=Array.from(ax(v.xlow,'low')).slice(0,14).join(''),xh=Array.from(ax(v.xhigh,'high')).slice(0,14).join(''),yl=Array.from(ax(v.ylow,'low')).slice(0,14).join(''),yh=Array.from(ax(v.yhigh,'high')).slice(0,14).join('');
g.append(svt(L,T+PH+22,'vm',xl,null,150),svt(L+PW,T+PH+22,'vm',xh,'end',150),svt(L+PW/2,T+PH+46,'vt',str(v.xlabel||'').slice(0,60),'middle',300),rot(20,T+PH/2,'vt',str(v.ylabel||'').slice(0,60),'middle',200),rot(38,T+PH,'vm',yl,null,120),rot(38,T,'vm',yh,'end',120));
var y=T+PH+74;it.forEach(function(o,i){var ox=c01(o.x),oy=c01(o.y),px=L+ox/100*PW,py=T+PH-oy/100*PH;g.append(sv('circle',{cx:px,cy:py,r:12,'class':'vp'}),svt(px,py+5,'vn',String(i+1),'middle'));var ls=wrap(o.label,31,2);ls.forEach(function(l,k){g.append(svt(20,y+24*k,'vt',(k?'':(i+1)+'. ')+l,null,360))});y+=24*ls.length+4;tx.push((i+1)+'. '+str(o.label)+' (across '+Math.round(ox)+' of 100, up '+Math.round(oy)+' of 100)')});
tx.unshift('Across: '+str(v.xlabel)+', from '+ax(v.xlow,'low')+' to '+ax(v.xhigh,'high')+'. Up: '+str(v.ylabel)+', from '+ax(v.ylow,'low')+' to '+ax(v.yhigh,'high')+'.');return{g:g,h:y,tx:tx}}
function visual(v){if(!v||typeof v!=='object'||Array.isArray(v))return null;var k=str(v.kind),it=objs(v.items).slice(0,12).map(function(o){return{label:str(o.label).slice(0,120),note:str(o.note).slice(0,120),when:str(o.when).slice(0,40),value:num(o.value),x:num(o.x),y:num(o.y)}}),r=null;
if(k==='bars')it=it.filter(function(o){return isFinite(o.value)&&o.value>=0});else if(k==='map')it=it.filter(function(o){return isFinite(o.x)&&isFinite(o.y)});else it=it.filter(function(o){return o.label});if(!it.length||!/^(flow|cycle|timeline|bars|map)$/.test(k))return null;
r=k==='flow'?drawFlow(it,false):k==='cycle'?drawFlow(it,true):k==='timeline'?drawTime(it):k==='bars'?drawBars(it,str(v.unit).slice(0,20)):drawMap(it,v);
var n=++vid,ti=str(v.title)||'Picture',al=(str(v.alt)||('A '+k+' picture: '+ti+'.'))+(k==='map'?' Positions show relative order only, not exact measurements.':''),s=sv('svg',{viewBox:'0 0 400 '+Math.round(r.h),role:'img','aria-labelledby':'vt'+n+' vd'+n,focusable:'false'},[sv('title',{id:'vt'+n}),sv('desc',{id:'vd'+n}),r.g]);s.firstChild.textContent=ti;s.childNodes[1].textContent=al;
var d=h('details',null,[h('summary',{text:'Read this picture as text'}),h('ul',null,r.tx.map(function(x){return h('li',{text:x})}))]);return h('figure',{'class':'fig'},[h('figcaption',{text:ti}),s,h('p',{'class':'mu',text:al}),d])}
function chapter(c){var m=$('#main');m.append(h('h1',{text:str(c.title)}),h('p',{'class':'mu',text:'Level '+str(c._lv.id)+': '+str(c._lv.name)+'. Chapter '+(CH.indexOf(c)+1)+' of '+CH.length+'.'}));
if(c._q.length&&c._q.every(function(q){return !S.q[q.id]})){var pt=h('button',{type:'button',text:'Try the questions first'}),cyid='cy-'+c._id.replace(/[^\w-]/g,'_');pt.addEventListener('click',function(){var t=document.getElementById(cyid);if(t){t.setAttribute('tabindex','-1');t.scrollIntoView();t.focus()}});m.append(h('p',{'class':'mu',text:'Optional pre-test: trying the questions before you read helps you remember the answers later, even when you guess wrong.'}),h('div',{'class':'row'},[pt]))}
if(c.goal)m.append(lead('Goal',c.goal,'goal'));
if(c.explain){m.append(h('h2',{text:'Explanation'}));T(m,c.explain)}
(Array.isArray(c.visual)?c.visual:(c.visual&&typeof c.visual==='object'?[c.visual]:[])).slice(0,3).forEach(function(v){var f=null;try{f=visual(v)}catch(x){}if(f){m.append(f);fitText(f)}});
var tm=termsFor(c);if(tm.length){m.append(h('h2',{text:'Terms used here'}));tm.forEach(function(g){var d=h('details',null,[h('summary',{text:str(g.term)})]);d.append(h('p',{text:str(g.def)}));if(g.example)d.append(h('p',{'class':'mu',text:'Example: '+str(g.example)}));m.append(d)})}
var st=objs(c.steps);if(st.length){m.append(h('h2',{text:'Steps'}));m.append(h('ol',null,st.map(function(s){var li=h('li');T(li,s.do);if(s.see)li.append(h('div',{'class':'mu'},[h('strong',{text:'You should see: '}),str(s.see)]));if(s.ifNot)li.append(h('div',{'class':'mu'},[h('strong',{text:'If not: '}),str(s.ifNot)]));return li})))}
strs(c.examples).forEach(function(x){m.append(lead('Worked example',x,'ex'))});
if(c.code){var pre=h('pre',{text:str(c.code)}),cb=h('button',{type:'button',text:'Copy code'});function pick(){try{var rg=document.createRange();rg.selectNodeContents(pre);var sl=getSelection();sl.removeAllRanges();sl.addRange(rg)}catch(e){}}cb.addEventListener('click',function(){var ok=function(){cb.textContent='Copied'},no=function(){pick();cb.textContent='Selected: press copy'};try{navigator.clipboard.writeText(str(c.code)).then(ok,no)}catch(e){no()}});m.append(pre,h('div',{'class':'row'},[cb]))}
if(c.rule&&c.rule.text){var r=lead('Rule of thumb',c.rule.text,'rule');if(c.rule.fails)r.append(h('p',{'class':'mu',text:'It fails when: '+str(c.rule.fails)}));m.append(r)}
var mk=objs(c.mistakes);if(mk.length)m.append(h('h2',{text:'Common mistakes'}),tbl(['Mistake','Why','Fix'],mk.map(function(x){return[x.m,x.why,x.fix]})));
var ac=ACT.filter(function(a){return a.claims.some(function(k){return k.split(':')[0]===c._id})});if(ac.length)m.append(h('h2',{text:'Try it'}),h('ul',null,ac.map(function(a){return h('li',null,[h('a',{href:'#a-'+a.id,text:a.title}),' ('+AT[a.type][0]+(S.act[a.id]?', done':'')+')'])})));
if(c._q.length){m.append(h('h2',{id:'cy-'+c._id.replace(/[^\w-]/g,'_'),text:'Check yourself'}));c._q.forEach(function(q){m.append(quiz(q))});var ms=h('p',{'class':'mu mast',role:'status'});ms._f=function(){var g=0,r=0,n=c._q.length;c._q.forEach(function(q){var v=S.q[q.id];if(v==='got')g++;else if(v==='review')r++});if(!g&&!r)return'';if(g+r<n)return g+' of '+n+' marked got it so far.';if(g===n)return'Mastered: all '+n+' marked got it. They come back on their review dates.';return g*5>=n*4?'Nearly there: '+g+' of '+n+' got it. Look again at the '+r+' you marked, then move on.':g+' of '+n+' got it. Reread the explanation and the common mistakes, then try the '+r+' again.'};ms.textContent=ms._f();m.append(ms)}
if(strs(c.src).length)m.append(h('p',{'class':'mu',text:'Sources: '+strs(c.src).map(function(id){var so=objs(D.sources).filter(function(x){return str(x.id)===id})[0];return so&&str(so.title)?id+' ('+str(so.title)+')':id}).join(', ')}));
var done=h('button',{type:'button','data-c':c._id,'aria-pressed':String(!!S.done[c._id]),text:S.done[c._id]?'Chapter done. Select to undo':'Mark done and stay here'}),dst=h('span',{'class':'mu',role:'status',text:S.done[c._id]?'Marked done.':''});
done.addEventListener('click',function(){if(done.getAttribute('aria-pressed')==='true')delete S.done[c._id];else S.done[c._id]=true;var was=volatile;if(!save()&&!was){render(true);return}done.setAttribute('aria-pressed',String(!!S.done[c._id]));done.textContent=S.done[c._id]?'Chapter done. Select to undo':'Mark done and stay here';dst.textContent=S.done[c._id]?'Marked done.':'Marked not done.';drawNav('c-'+c._id)});
var i=CH.indexOf(c),row=h('div',{'class':'row navrow'},[done,dst]);
if(i>0)row.prepend(h('a',{'class':'btn',href:'#c-'+CH[i-1]._id,text:'Previous chapter'}));var nl=null;if(i<CH.length-1)nl=h('a',{'class':'btn primary',href:'#c-'+CH[i+1]._id,text:'Next chapter'});else if(QS.length)nl=h('a',{'class':'btn primary',href:'#test',text:'Take the Self-Test'});else if(D.next)nl=h('a',{'class':'btn primary',href:'#next',text:'What To Do Next'});
if(nl){nl.addEventListener('click',function(){if(!S.done[c._id]){S.done[c._id]=true;save();loadNote='Chapter marked done: '+str(c.title)+'.'}});row.append(nl)}m.append(row);if(nl)m.append(h('p',{'class':'mu',text:'The next button also marks this chapter done.'}))}
function ib(n,t,a){a=a||{};a.type='button';return h('button',a,[t])}
var AT={sim:['Simulation','sliders-horizontal'],match:['Matching','arrows-left-right'],sort:['Sorting','squares-four'],order:['Put in order','list-numbers'],scenario:['Choose a path','git-fork'],estimate:['Estimate','ruler']};
var FN=Object.create(null);FN.min=[2,4,Math.min];FN.max=[2,4,Math.max];FN.abs=[1,1,Math.abs];FN.sqrt=[1,1,Math.sqrt];FN.ln=[1,1,Math.log];FN.exp=[1,1,Math.exp];FN.round=[1,2,function(x,d){var p=Math.pow(10,Math.max(0,Math.min(6,Math.floor(d||0))));return Math.round(x*p)/p}];
function ftok(s){var t=[],i=0,m,re=/\s*(?:(\d+(?:\.\d+)?)|([A-Za-z][A-Za-z0-9_]*)|(<=|>=|==|!=|[-+*\/^(),<>]))/y;s=s.replace(/\s+$/,'');
while(i<s.length){re.lastIndex=i;m=re.exec(s);if(!m)throw new Error('a character is not allowed');i=re.lastIndex;if(m[1]!==undefined)t.push(['n',Number(m[1])]);else if(m[2]!==undefined)t.push(['i',m[2]]);else t.push(['o',m[3]]);if(t.length>150)throw new Error('too long')}return t}
function fparse(src,names){src=str(src);if(!src||src.length>200)throw new Error('empty or too long');var t=ftok(src),p=0,dp=0;
function pk(){return t[p]}
function ok(v){var x=t[p];if(x&&x[0]==='o'&&x[1]===v){p++;return true}return false}
function need(v){if(!ok(v))throw new Error('expected '+v)}
function cmp(){var a=add(),x=pk();if(x&&x[0]==='o'&&/^(<=|>=|==|!=|<|>)$/.test(x[1])){p++;return['c',x[1],a,add()]}return a}
function add(){var a=mul(),x;while((x=pk())&&x[0]==='o'&&(x[1]==='+'||x[1]==='-')){p++;a=['b',x[1],a,mul()]}return a}
function mul(){var a=un(),x;while((x=pk())&&x[0]==='o'&&(x[1]==='*'||x[1]==='/')){p++;a=['b',x[1],a,un()]}return a}
function un(){if(++dp>30)throw new Error('too deeply nested');var r;if(ok('-'))r=['u',un()];else{var a=atom();r=ok('^')?['b','^',a,un()]:a}dp--;return r}
function atom(){var x=t[p++];if(!x)throw new Error('ends too soon');if(x[0]==='n')return['n',x[1]];if(x[0]==='o'&&x[1]==='('){var e=cmp();need(')');return e}
if(x[0]==='i'){if(ok('(')){var f=x[1],a=[],ar;if(f==='if')ar=[3,3];else if(f in FN)ar=FN[f];else throw new Error('function not allowed');if(!ok(')')){do a.push(cmp());while(ok(','));need(')')}if(a.length<ar[0]||a.length>ar[1])throw new Error('wrong argument count');return['f',f,a]}
if(!names[x[1]])throw new Error('unknown name');return['v',x[1]]}throw new Error('unexpected symbol')}
var r=cmp();if(p<t.length)throw new Error('unexpected symbol');return r}
function fev(n,E){var k=n[0],a,b,r;if(k==='n')return n[1];if(k==='v')return E[n[1]];if(k==='u')return-fev(n[1],E);
if(k==='b'){a=fev(n[2],E);b=fev(n[3],E);if(n[1]==='+')r=a+b;else if(n[1]==='-')r=a-b;else if(n[1]==='*')r=a*b;else if(n[1]==='/'){if(b===0)throw new Error('division by zero');r=a/b}else r=Math.pow(a,b);if(!isFinite(r))throw new Error('out of range');return r}
if(k==='c'){a=fev(n[2],E);b=fev(n[3],E);var o=n[1];return(o==='<'?a<b:o==='<='?a<=b:o==='>'?a>b:o==='>='?a>=b:o==='=='?a===b:a!==b)?1:0}
if(n[1]==='if')return fev(n[2][0],E)!==0?fev(n[2][1],E):fev(n[2][2],E);r=FN[n[1]][2].apply(null,n[2].map(function(x){return fev(x,E)}));if(!isFinite(r))throw new Error('out of range');return r}
function fcalc(ast,E){try{var v=fev(ast,E);return isFinite(v)?{ok:true,v:v}:{ok:false}}catch(e){return{ok:false}}}
function aS(x,n){x=str(x).trim();return x&&x.length<=n?x:''}
function aN(x){return typeof x==='number'&&isFinite(x)?x:NaN}
function ong(v,mn,sp){var q=(v-mn)/sp;return Math.abs(q-Math.round(q))<1e-6}
function fx(v,d){var s=v.toFixed(d);return/^-0(\.0+)?$/.test(s)?s.slice(1):s}
function dp2(s){var t=String(s),i=t.indexOf('.');return i<0?0:Math.min(4,t.length-i-1)}
function perm(n,sd){var a=[],i,x=0,j,t;for(i=0;i<sd.length;i++)x=(x*31+sd.charCodeAt(i))>>>0;for(i=0;i<n;i++)a.push(i);for(i=n-1;i>0;i--){x=(x*1664525+1013904223)>>>0;j=(x>>>8)%(i+1);t=a[i];a[i]=a[j];a[j]=t}if(n>1&&a.every(function(v,k){return v===k}))a.push(a.shift());return a}
function simRun(m,v){var E=Object.create(null),r=Object.create(null),i,c;E.pi=Math.PI;E.e=Math.E;m.ins.forEach(function(x){E[x.id]=v[x.id]});for(i=0;i<m.outs.length;i++){c=fcalc(m.outs[i].ast,E);if(!c.ok)return{ok:false};E[m.outs[i].id]=c.v;r[m.outs[i].id]=c.v}return{ok:true,out:r}}
function simNorm(o){var nm=Object.create(null),ins=[],outs=[],li=ol(o.inputs),lo=ol(o.outputs),ID2=/^[a-z][a-z0-9_]{0,19}$/,i,x,id;nm.pi=1;nm.e=1;if(li.length<1||li.length>4||lo.length<1||lo.length>4)return null;
for(i=0;i<li.length;i++){x=li[i];id=str(x.id);var mn=aN(x.min),mx=aN(x.max),sp=aN(x.step),df=aN(x.default),lab=aS(x.label,60);if(!ID2.test(id)||nm[id]||id==='if'||(id in FN)||!lab||!(mn<mx&&sp>0&&(mx-mn)/sp<=1000+1e-9&&df>=mn&&df<=mx&&ong(df,mn,sp)))return null;nm[id]=1;ins.push({id:id,label:lab,mn:mn,mx:mx,sp:sp,df:df,unit:aS(x.unit,20),ctl:x.control==='stepper'?'stepper':'slider'})}
for(i=0;i<lo.length;i++){x=lo[i];id=str(x.id);var ast=null,dg=x.digits===undefined?2:x.digits,lb2=aS(x.label,60);if(!ID2.test(id)||nm[id]||id==='if'||(id in FN)||!lb2||!Number.isInteger(dg)||dg<0||dg>4)return null;try{ast=fparse(x.formula,nm)}catch(e){return null}nm[id]=1;outs.push({id:id,label:lb2,unit:aS(x.unit,20),dg:dg,ast:ast})}
var ch=o.chart&&typeof o.chart==='object'&&!Array.isArray(o.chart)?o.chart:null,yy=ch?strs(lst(ch.y)):[];if(!ch||!/^(line|bar)$/.test(str(ch.kind))||!yy.length||yy.length>(ch.kind==='line'?3:4)||yy.some(function(y,k){return!outs.some(function(q){return q.id===y})||yy.indexOf(y)!==k}))return null;
var chart={kind:str(ch.kind),x:str(ch.x),y:yy,title:aS(ch.title,60)||'Chart'};if(chart.kind==='line'&&!ins.some(function(q){return q.id===chart.x}))return null;
var pd=null;if(o.predict!==undefined){var q=o.predict;if(!q||typeof q!=='object')return null;var pi=ins.filter(function(z){return z.id===str(q.input)})[0],to=aN(q.to);if(!pi||!aS(q.ask,300)||!(to>=pi.mn&&to<=pi.mx&&to!==pi.df&&ong(to,pi.mn,pi.sp))||!outs.some(function(z){return z.id===str(q.output)}))return null;pd={ask:aS(q.ask,300),input:pi.id,to:to,output:str(q.output)}}
var nt=strs(lst(o.notice));if(nt.length<1||nt.length>3||nt.some(function(s){return s.length>300}))return null;
var ck=ol(o.checks);if(ck.length<3||ck.length>12)return null;var m={ins:ins,outs:outs,chart:chart,predict:pd,notice:nt,ck:[],ckOK:true};
for(i=0;i<ck.length;i++){var ci=ck[i].in,co=ck[i].out,tl=ck[i].tol===undefined?0.01:aN(ck[i].tol),v={},ks;if(!ci||typeof ci!=='object'||!co||typeof co!=='object'||!(tl>=0))return null;ins.forEach(function(z){v[z.id]=z.df});ks=Object.keys(ci);if(ks.some(function(k){var z=ins.filter(function(w){return w.id===k})[0];return!z||!isFinite(aN(ci[k]))||ci[k]<z.mn||ci[k]>z.mx}))return null;ks.forEach(function(k){v[k]=ci[k]});
var ok2=Object.keys(co),r=simRun(m,v),good=r.ok&&ok2.length>0&&ok2.every(function(k){return outs.some(function(z){return z.id===k})&&isFinite(aN(co[k]))&&Math.abs(r.out[k]-co[k])<=tl});m.ck.push({v:ci,e:co,r:r.ok?r.out:null,ok:good});if(!good)m.ckOK=false}
return m}
function mkPlace(k,o){var it=[],tg=[],sol=[],i,x,L=Object.create(null),L2=Object.create(null);
if(k==='match'){var p=ol(o.pairs);if(p.length<3||p.length>6)return null;for(i=0;i<p.length;i++){x=p[i];var l=aS(x.left,120),r=aS(x.right,120),w=aS(x.why,300);if(!l||!r||!w||L[l]||L2[r])return null;L[l]=1;L2[r]=1;tg.push({t:l,cap:1});it.push({t:r,w:w});sol.push(i)}return{items:it,targets:tg,sol:sol,verb:'goes with',help:'Select an item. Then select Put here under the one it goes with.',ih:'Items to match',th:'Matches'}}
var b=ol(o.buckets),bi=Object.create(null),q=ol(o.items),cn=[];if(b.length<2||b.length>4||q.length<4||q.length>10)return null;
for(i=0;i<b.length;i++){var id=str(b[i].id),lb3=aS(b[i].label,80);if(!/^[\w-]{1,20}$/.test(id)||bi[id]!==undefined||!lb3)return null;bi[id]=i;cn.push(0);tg.push({t:lb3,cap:99})}
for(i=0;i<q.length;i++){var t=aS(q[i].label,120),w2=aS(q[i].why,300),bk=bi[str(q[i].bucket)];if(!t||!w2||bk===undefined||L[t])return null;L[t]=1;cn[bk]++;it.push({t:t,w:w2});sol.push(bk)}
if(cn.some(function(z){return z===0}))return null;
return{items:it,targets:tg,sol:sol,verb:'goes in',help:'Select an item. Then select Put here under the group it belongs in.',ih:'Items to sort',th:'Groups'}}
function mkOrder(o){var q=ol(o.items),it=[],i,L=Object.create(null);if(q.length<3||q.length>8)return null;for(i=0;i<q.length;i++){var t=aS(q[i].label,120),w=aS(q[i].why,300);if(!t||!w||L[t])return null;L[t]=1;it.push({t:t,w:w})}return{items:it}}
function mkScen(o){var nd=ol(o.nodes),M2=Object.create(null),i,j,ends=0;if(nd.length<3||nd.length>10)return null;
for(i=0;i<nd.length;i++){var id=str(nd[i].id),tx=aS(nd[i].text,500)||(ol(nd[i].choices).length===0&&aS(nd[i].lesson,300)?'This path ends here.':'');if(!/^[\w-]{1,20}$/.test(id)||M2[id]||!tx)return null;var cs=ol(nd[i].choices);M2[id]={id:id,t:tx,end:cs.length===0,les:aS(nd[i].lesson,300),ch:[],raw:cs}}
for(i=0;i<nd.length;i++){var n=M2[str(nd[i].id)];if(n.end){ends++;continue}if(n.raw.length<2||n.raw.length>4)return null;for(j=0;j<n.raw.length;j++){var c=n.raw[j],lb4=aS(c.label,200),sy=aS(c.say,400),nx=str(c.next);if(!lb4||!sy||!M2[nx])return null;n.ch.push({l:lb4,s:sy,n:nx})}}
var st=str(o.start);if(!M2[st]||!ends)return null;var seen=Object.create(null);function dfs(id,d){if(d>12||seen[id]===1)return false;if(seen[id]===2)return true;seen[id]=1;var ok=M2[id].ch.every(function(c){return dfs(c.n,d+1)});seen[id]=2;return ok}if(!dfs(st,0))return null;ends=Object.keys(seen).filter(function(k){return M2[k].end}).length;return{nodes:M2,start:st,ends:ends}}
function mkEst(o){var an=aN(o.answer),tl=aN(o.tol),m={ask:aS(o.ask,400),unit:aS(o.unit,30),ans:an,tol:tl,low:aS(o.low,400),high:aS(o.high,400),why:aS(o.reasoning,600)};return m.ask&&m.low&&m.high&&m.why&&isFinite(an)&&tl>=0?m:null}
var ACT=[],actBad=0,usedA=Object.create(null);
objs(D.activities).forEach(function(o){var id=str(o.id),ty=str(o.type),cl=strs(o.claims),a=null,m=null;
if(/^[\w-]{1,40}$/.test(id)&&id!=='__proto__'&&!usedA[id]&&Object.prototype.hasOwnProperty.call(AT,ty)&&cl.length>=1&&cl.length<=4&&cl.every(function(c){return VALID[c]})){
try{m=ty==='sim'?simNorm(o):(ty==='match'||ty==='sort')?mkPlace(ty,o):ty==='order'?mkOrder(o):ty==='scenario'?mkScen(o):mkEst(o)}catch(e){m=null}
a={id:id,type:ty,title:aS(o.title,80),goal:aS(o.goal,300),hint:aS(o.hint,300),dn:aS(o.done,300),claims:cl,m:m,raw:o};if(!m||!a.title||!a.goal||!a.hint)a=null}
if(a){usedA[id]=1;ACT.push(a)}else actBad++});
function simChart(m,vals,r){var c=m.chart,n,g,ti=c.title,al,tx=[],head,rows,fig;
if(c.kind==='bar'){if(!r.ok)return h('p',{text:'No chart: these inputs cannot be worked out.'});var it=c.y.map(function(id){var o=m.outs.filter(function(z){return z.id===id})[0];return{label:o.label+(o.unit?' ('+o.unit+')':''),value:r.out[id]}});if(it.some(function(z){return z.value<0}))return h('figure',{'class':'fig'},[h('figcaption',{text:ti}),h('p',{'class':'mu',text:'A bar chart cannot show a negative result, so only the table is shown.'}),tbl(['Result','Value'],it.map(function(z){return[z.label,nice(z.value)]}))]);var d=drawBars(it,'');
al='Bar chart of '+it.map(function(z){return z.label+' '+nice(z.value)}).join(', ')+'.';return h('figure',{'class':'fig'},[h('figcaption',{text:ti}),mkSvg(d,ti,al),h('details',null,[h('summary',{text:'Read this chart as a table'}),tbl(['Result','Value'],it.map(function(z){return[z.label,nice(z.value)]}))])])}
var xi=m.ins.filter(function(z){return z.id===c.x})[0],N=21,xs=[],k,ser=c.y.map(function(id){return{o:m.outs.filter(function(z){return z.id===id})[0],ys:[]}}),all=[];
for(k=0;k<N;k++){var x=xi.mn+(xi.mx-xi.mn)*k/(N-1),vv={},rr;Object.keys(vals).forEach(function(q){vv[q]=vals[q]});vv[xi.id]=x;xs.push(x);rr=simRun(m,vv);ser.forEach(function(s){var y=rr.ok?rr.out[s.o.id]:null;s.ys.push(y);if(y!==null)all.push(y)})}
if(!all.length)return h('p',{text:'No chart: the formula cannot be worked out for these inputs.'});
var lo=Math.min.apply(null,all),hi=Math.max.apply(null,all),L=58,T0=14,W=326,H=168;if(lo===hi){lo-=1;hi+=1}if(!(hi-lo>0)||!isFinite(hi-lo))return h('p',{text:'No chart: the results are too far apart to draw.'});
function px(v){return L+(v-xi.mn)/(xi.mx-xi.mn)*W}function py(v){return T0+H-(v-lo)/(hi-lo)*H}
g=sv('g');g.append(sv('line',{x1:L,y1:T0,x2:L,y2:T0+H,'class':'va'}),sv('line',{x1:L,y1:T0+H,x2:L+W,y2:T0+H,'class':'va'}));
var xu=xi.unit&&xi.label.toLowerCase().indexOf(xi.unit.toLowerCase())<0?' ('+xi.unit+')':'',yl=ser.length===1?ser[0].o.label+(ser[0].o.unit?' ('+ser[0].o.unit+')':''):'Results';
g.append(svt(L-6,T0+H+5,'vm',nice(lo),'end',52),svt(L-6,T0+12,'vm',nice(hi),'end',52),svt(L,T0+H+23,'vm',nice(xi.mn),null,70),svt(L+W,T0+H+23,'vm',nice(xi.mx),'end',70),svt(L+W/2,T0+H+46,'vt',xi.label+xu,'middle',320),rot(16,T0+H/2,'vt',yl,'middle',H));
var cx=px(vals[xi.id]);g.append(sv('line',{x1:cx,y1:T0,x2:cx,y2:T0+H,'class':'vg'}));
ser.forEach(function(s,si){var seg=[],segs=[];s.ys.forEach(function(y,i){if(y===null){if(seg.length)segs.push(seg);seg=[]}else seg.push(px(xs[i]).toFixed(1)+','+py(y).toFixed(1))});if(seg.length)segs.push(seg);segs.forEach(function(sg){if(sg.length>1)g.append(sv('polyline',{points:sg.join(' '),'class':'s'+si}));else{var pp=sg[0].split(',');g.append(sv('circle',{cx:pp[0],cy:pp[1],r:3,'class':'vd'}))}});if(r.ok)g.append(sv('circle',{cx:cx,cy:py(r.out[s.o.id]),r:6,'class':'vc'}))});
al='Line chart. Across: '+xi.label+' from '+nice(xi.mn)+' to '+nice(xi.mx)+(xi.unit?' '+xi.unit:'')+'. '+ser.map(function(s){var v=s.ys.filter(function(y){return y!==null});return s.o.label+' goes from '+nice(v[0])+' to '+nice(v[v.length-1])+', lowest '+nice(Math.min.apply(null,v))+', highest '+nice(Math.max.apply(null,v))+(s.o.unit?' '+s.o.unit:'')+'.'}).join(' ')+(r.ok?' The marked point is at the current input.':'');
var lg=h('ul',{'class':'lg'},ser.map(function(s,si){return h('li',null,[sv('svg',{viewBox:'0 0 40 10','class':'lgs','aria-hidden':'true',focusable:'false'},[sv('line',{x1:2,y1:5,x2:38,y2:5,'class':'s'+si})]),s.o.label+(s.o.unit?' ('+s.o.unit+')':'')])}));
head=[xi.label+xu].concat(ser.map(function(s){return s.o.label+(s.o.unit?' ('+s.o.unit+')':'')}));rows=xs.map(function(x,i){return[nice(x)].concat(ser.map(function(s){return s.ys[i]===null?'cannot be worked out':nice(s.ys[i])}))});
return h('figure',{'class':'fig'},[h('figcaption',{text:ti}),mkSvg({g:g,h:250},ti,al),lg,h('details',null,[h('summary',{text:'Read this chart as a table'}),tbl(head,rows)])])}
function mkSvg(r,ti,al){var n=++vid,s=sv('svg',{viewBox:'0 0 400 '+Math.round(r.h),role:'img','aria-labelledby':'vt'+n+' vd'+n,focusable:'false'},[sv('title',{id:'vt'+n}),sv('desc',{id:'vd'+n}),r.g]);s.childNodes[0].textContent=ti;s.childNodes[1].textContent=al;return s}
var PT={up:'it rose',down:'it fell',same:'it stayed about the same'};
function bSim(box,a,X){var m=a.m,vals={},pre=!m.predict,mv=false,els={},tm=null;function ann(){clearTimeout(tm);tm=setTimeout(function(){X.say(sum())},400)}
function base(){var o={};m.ins.forEach(function(i){o[i.id]=i.df});return o}
vals=base();
var res=h('dl',{'class':'facts'}),fig=h('div');
function fo(o,r){return o.label+' '+fx(r.out[o.id],o.dg)+(o.unit?' '+o.unit:'')}
function upd(){m.ins.forEach(function(i){var e=els[i.id];e.rd.textContent=fx(vals[i.id],dp2(i.sp))+(i.unit?' '+i.unit:'');if(e.el){e.el.value=String(vals[i.id]);e.el.setAttribute('aria-valuetext',e.rd.textContent)}});
var r=simRun(m,vals);res.replaceChildren();m.outs.forEach(function(o){res.append(h('dt',{text:o.label}),h('dd',{text:r.ok?fx(r.out[o.id],o.dg)+(o.unit?' '+o.unit:''):'Cannot be worked out for these inputs. Change an input.'}))});
fig.replaceChildren(simChart(m,vals,r));fitText(fig);if(pre&&mv)X.fin()}
function sum(){var r=simRun(m,vals);return(r.ok?m.outs.map(function(o){return fo(o,r)}).join('. ')+'.':'These inputs cannot be worked out. Change an input.')+(S.act[a.id]?' This activity is marked done.':'')}
var pd=m.predict;
if(pd){var pi=m.ins.filter(function(z){return z.id===pd.input})[0],po=m.outs.filter(function(z){return z.id===pd.output})[0],pr=h('div',{'class':'row'}),sk=h('button',{type:'button',text:'Skip the guess'});
var pf=h('fieldset',null,[h('legend',{text:'Predict first'}),h('p',{text:pd.ask}),h('p',{'class':'mu',text:'The test: set '+pi.label+' to '+pd.to+(pi.unit?' '+pi.unit:'')+', then watch '+po.label+'. Choose your guess before you see the result.'})]);
[['up','It rises'],['down','It falls'],['same','It stays about the same']].forEach(function(g){var b=h('button',{type:'button','aria-pressed':'false',text:g[1]});b.addEventListener('click',function(){guess(g[0],g[1].toLowerCase(),b)});pr.append(b)});
sk.addEventListener('click',function(){pre=true;clearTimeout(tm);X.say('Guess skipped. Use the inputs to explore.')});pr.append(sk);pf.append(pr);box.append(pf);
function guess(k,txt,b){clearTimeout(tm);var r0=simRun(m,base()),v1=base();v1[pd.input]=pd.to;var r1=simRun(m,v1);pre=true;if(!r0.ok||!r1.ok){X.say('This test cannot be worked out. Use the inputs to explore.');return}
var a0=r0.out[pd.output],a1=r1.out[pd.output],d=a1-a0,ac=Math.abs(d)<=Math.max(1e-9,Math.abs(a0)*0.005)?'same':(d>0?'up':'down');vals=v1;mv=true;
pr.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});upd();
X.say('You guessed: '+txt+'. '+pi.label+' went to '+pd.to+(pi.unit?' '+pi.unit:'')+'. '+po.label+' went from '+fx(a0,po.dg)+' to '+fx(a1,po.dg)+(po.unit?' '+po.unit:'')+', so '+PT[ac]+'. '+(k===ac?'Your guess matched.':'This time it did not match. Read What to notice below.')+(S.act[a.id]?' This activity is marked done.':''))}}
var cf=h('fieldset',null,[h('legend',{text:'Change the inputs'})]);
m.ins.forEach(function(i){var id='ci-'+i.id,rd=h('span',{'class':'rd','aria-hidden':'true'}),w=h('div',{'class':'ctl'}),e={rd:rd,el:null};els[i.id]=e;
function set(v){v=Math.min(i.mx,Math.max(i.mn,Math.round((v-i.mn)/i.sp)*i.sp+i.mn));vals[i.id]=parseFloat(v.toFixed(6))}
if(i.ctl==='stepper'){w.setAttribute('role','group');w.setAttribute('aria-labelledby',id);var dn=ib('minus','Decrease',{'aria-label':'Decrease '+i.label}),up=ib('plus','Increase',{'aria-label':'Increase '+i.label});
dn.addEventListener('click',function(){set(vals[i.id]-i.sp);mv=true;upd();ann()});up.addEventListener('click',function(){set(vals[i.id]+i.sp);mv=true;upd();ann()});w.append(h('span',{'class':'lab',id:id,text:i.label}),rd,h('div',{'class':'row'},[dn,up]))}
else{var el=h('input',{type:'range',id:id,min:i.mn,max:i.mx,step:i.sp,value:vals[i.id]});e.el=el;el.addEventListener('input',function(){vals[i.id]=Number(el.value);mv=true;upd()});el.addEventListener('change',ann);w.append(h('label',{'for':id,text:i.label}),el,rd)}
cf.append(w)});
box.append(cf,h('h2',{text:'Results'}),res,h('h2',{text:c0(m)}),fig,h('h2',{text:'What to notice'}),ul(m.notice));
var good=m.ck.filter(function(z){return z.ok}).length;
box.append(h('details',null,[h('summary',{text:'How this simulation was checked ('+good+' of '+m.ck.length+' match)'}),h('p',{'class':'mu',text:'Each row sets the inputs and compares the result with a value worked out separately.'}),tbl(['Inputs','Expected','Worked out','Result'],m.ck.map(function(z){var f=function(o){return Object.keys(o).map(function(k){return k+' = '+o[k]}).join(', ')};return[f(z.v)||'start values',f(z.e),z.r?f(Object.keys(z.e).reduce(function(q,k){q[k]=fx(z.r[k],4);return q},{})):'cannot be worked out',z.ok?'matches':'does not match']}))]));
if(!m.ckOK)box.prepend(h('div',{'class':'note'},[h('strong',{text:'Warning: '}),'A built-in check of this simulation did not match. Do not rely on its numbers.']));
upd()}
function c0(m){return m.chart.kind==='bar'?'Chart of results':'Chart'}
function bPlace(box,a,X){var m=a.m,n=m.items.length,pl=[],sel=-1,fb=null,fk='',ord=perm(n,a.id),i;for(i=0;i<n;i++)pl.push(-1);
box.onkeydown=function(e){if(e.key==='Escape'&&sel>=0){var j=sel;sel=-1;fb=null;fk='i'+j;X.say('Nothing selected.');draw()}};
function draw(){box.replaceChildren();var un=ord.filter(function(j){return pl[j]<0}),pool=h('div',{'class':'row'});
un.forEach(function(j){var b=h('button',{type:'button','data-k':'i'+j,'aria-pressed':String(sel===j),text:m.items[j].t});b.addEventListener('click',function(){sel=sel===j?-1:j;fb=null;fk='i'+j;X.say(sel<0?'Nothing selected.':'Selected: '+m.items[j].t+'. Now choose Put here under a place.');draw()});pool.append(b)});
if(!un.length)pool.append(h('p',{'class':'mu',text:'All items are placed.'}));
box.append(h('p',{'class':'mu',text:m.help}),h('h2',{text:m.ih}),pool,h('h2',{text:m.th}));
m.targets.forEach(function(t,ti){var inn=ord.filter(function(j){return pl[j]===ti}),cd=h('section',{'class':'card'},[h('h3',{text:t.t})]);
if(inn.length){var u=h('ul',{'class':'bl'});inn.forEach(function(j){var b=h('button',{type:'button','data-k':'i'+j,'aria-label':m.items[j].t+', placed here. Select to take it back.',text:m.items[j].t});b.addEventListener('click',function(){pl[j]=-1;sel=j;fb=null;fk='i'+j;X.say(m.items[j].t+' taken back and selected. Choose where it goes.');draw()});u.append(h('li',null,[b]))});cd.append(u)}
else cd.append(h('p',{'class':'mu',text:'Empty.'}));
var pb=ib('plus','Put here',{'data-k':'t'+ti,'aria-label':'Put here in '+t.t});if(sel<0||inn.length>=t.cap)pb.disabled=true;
pb.addEventListener('click',function(){var j=sel;pl[j]=ti;sel=-1;fb=null;var rest=ord.filter(function(z){return pl[z]<0});fk=rest.length?'i'+rest[0]:'chk';X.say(m.items[j].t+' put in '+t.t+'.');draw()});cd.append(pb);box.append(cd)});
var ck=ib('check-circle','Check',{'data-k':'chk'}),rs=ib('arrow-counter-clockwise','Clear all');ck.addEventListener('click',check);rs.addEventListener('click',function(){for(var z=0;z<n;z++)pl[z]=-1;sel=-1;fb=null;fk='i'+ord[0];X.say('All items cleared.');draw()});
box.append(h('div',{'class':'row'},[ck,rs]));
if(fb)box.append(h('h2',{text:'Feedback'}),h('ul',{'class':'fbl'},fb.map(function(f){return h('li',{text:f})})));
if(fk){var e=box.querySelector('[data-k="'+fk+'"]');if(e&&!e.disabled)e.focus();fk=''}}
function check(){var ok=0,L=[];ord.forEach(function(j){var it=m.items[j],t=m.targets[m.sol[j]];if(pl[j]<0)L.push('Not placed yet: '+it.t+'.');else if(pl[j]===m.sol[j]){ok++;L.push('Right: '+it.t+' '+m.verb+' '+t.t+'. '+it.w)}else L.push('Not yet: '+it.t+' does not go with '+m.targets[pl[j]].t+'. It '+m.verb+' '+t.t+'. '+it.w)});
fb=L;fk='chk';var nw=ok===n&&X.fin();X.say(ok+' of '+n+' are in the right place.'+(ok===n?' '+a.dn+(nw?' This activity is now marked done.':''):' Read the feedback, then move the ones that are not yet right.'));draw()}
draw()}
function bOrder(box,a,X){var m=a.m,n=m.items.length,cur=perm(n,a.id),fb=null,fk='';
function draw(){box.replaceChildren();box.append(h('p',{'class':'mu',text:'Use Move up and Move down to put the steps in order. Then select Check.'}));var ol=h('ol',{'class':'ord'});
cur.forEach(function(j,p){var up=ib('caret-up','Move up',{'data-k':'u'+j,'aria-label':'Move up: '+m.items[j].t}),dn=ib('caret-down','Move down',{'data-k':'d'+j,'aria-label':'Move down: '+m.items[j].t});if(p===0)up.disabled=true;if(p===n-1)dn.disabled=true;
function mvv(d){var t=cur[p];cur[p]=cur[p+d];cur[p+d]=t;fb=null;fk=(d<0?'u':'d')+j;X.say(m.items[j].t+' moved to place '+(p+d+1)+' of '+n+'.');draw()}
up.addEventListener('click',function(){mvv(-1)});dn.addEventListener('click',function(){mvv(1)});ol.append(h('li',null,[h('p',{text:m.items[j].t}),h('div',{'class':'row'},[up,dn])]))});
var ck=ib('check-circle','Check',{'data-k':'chk'});ck.addEventListener('click',check);box.append(ol,h('div',{'class':'row'},[ck]));
if(fb)box.append(h('h2',{text:'Feedback'}),h('ul',{'class':'fbl'},fb.map(function(f){return h('li',{text:f})})));
if(fk){var e=box.querySelector('[data-k="'+fk+'"]');if(!e||e.disabled)e=box.querySelector('[data-k="'+(fk.charAt(0)==='u'?'d':'u')+fk.slice(1)+'"]');if(e&&!e.disabled)e.focus();fk=''}}
function check(){var ok=0,L=[];cur.forEach(function(j,p){var it=m.items[j];if(j===p){ok++;L.push('Right: place '+(p+1)+' is '+it.t+'. '+it.w)}else L.push('Not yet: '+it.t+' is at place '+(p+1)+'. It comes at place '+(j+1)+'. '+it.w)});fb=L;fk='chk';var nw=ok===n&&X.fin();X.say(ok+' of '+n+' are in the right place.'+(ok===n?' '+a.dn+(nw?' This activity is now marked done.':''):' Read the feedback, then move the steps that are not yet right.'));draw()}
draw()}
function bScen(box,a,X){var m=a.m,cur=m.start,hist=[],seen=Object.create(null),fk='';
function draw(){box.replaceChildren();hist.forEach(function(s){box.append(h('div',{'class':'ex'},[h('p',{text:s.t}),h('p',null,[h('strong',{text:'You chose: '}),s.l]),h('p',{'class':'mu',text:s.s})]))});var nd=m.nodes[cur];
if(nd.end){seen[cur]=1;box.append(h('h2',{text:'Where this path ended'}),h('p',{text:nd.t}));if(nd.les)box.append(lead('Lesson',nd.les,'rule'));var nw=X.fin(),ag=ib('arrow-counter-clockwise','Try another path',{'data-k':'again'});ag.addEventListener('click',function(){cur=m.start;hist=[];fk='c0';X.say('Back at the start.');draw()});
box.append(h('p',{'class':'mu',text:'Endings seen in this visit: '+Object.keys(seen).length+' of '+m.ends+'.'}),h('div',{'class':'row'},[ag]));X.say('This path ended. '+a.dn+(nw?' This activity is now marked done.':''));fk='again'}
else{box.append(h('p',{text:nd.t}),h('h2',{text:'What do you do?'}));var rw=h('div',{'class':'row stack'});nd.ch.forEach(function(c,k){var b=h('button',{type:'button','data-k':'c'+k,text:c.l});b.addEventListener('click',function(){hist.push({t:nd.t,l:c.l,s:c.s});cur=c.n;fk='c0';X.say(c.s);draw()});rw.append(b)});box.append(rw)}
if(fk){var e=box.querySelector('[data-k="'+fk+'"]');if(e)e.focus();fk=''}}
draw()}
function bEst(box,a,X){var m=a.m,inp=h('input',{type:'number',step:'any',id:'est-in','aria-describedby':'est-u'}),out=h('div'),ck=ib('check-circle','Check my estimate'),dn=false;
function go2(){var v=inp.value.trim()===''?NaN:Number(inp.value);if(!isFinite(v)){X.say('Type a number first, for example 12.5.');return}
var cl=Math.abs(v-m.ans)<=m.tol+1e-9,u=m.unit?' '+m.unit:'';out.replaceChildren(h('p',null,[h('strong',{text:'Your estimate: '}),v+u]),h('p',null,[h('strong',{text:'Answer: '}),m.ans+u]),h('p',{text:cl?'Close enough: within '+m.tol+u+' of the answer.':(v<m.ans?m.low:m.high)}),lead('How to get there',m.why,'rule'));
var nw=cl?X.fin():false;X.say((cl?'Close enough. ':(v<m.ans?'Lower than the answer. ':'Higher than the answer. '))+a.dn+(nw?' This activity is now marked done.':''))}
ck.addEventListener('click',go2);inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();go2()}});
box.append(h('p',{text:m.ask}),h('div',{'class':'row'},[h('label',{'for':'est-in',text:'Your estimate'}),inp,h('span',{id:'est-u',text:m.unit})]),h('div',{'class':'row'},[ck]),out)}
var BUILD={sim:bSim,match:bPlace,sort:bPlace,order:bOrder,scenario:bScen,estimate:bEst};
function playPage(m){m.append(h('h1',{text:lb('play','Practice and Play')}),h('p',{text:'Try the ideas in small activities. Nothing is timed and nothing counts against you. Each activity links to the chapter that teaches it.'}));
if(ACT.length)m.append(h('p',{'class':'mu',text:'Activities done: '+counts(S).ad+' of '+ACT.length+'.'}));
if(actBad)m.append(h('div',{'class':'note',text:actBad+(actBad>1?' activities could not be shown. Ask the AI that made this file to fix them.':' activity could not be shown. Ask the AI that made this file to fix it.')}));
ACT.forEach(function(a){m.append(h('section',{'class':'card'},[h('h2',null,[h('a',{href:'#a-'+a.id,text:a.title})]),h('p',{'class':'mu',text:AT[a.type][0]+'. '+(S.act[a.id]?'Done.':'Not done yet.')}),h('p',{text:a.goal})]))})}
function actView(m,id){var a=ACT.filter(function(x){return'a-'+x.id===id})[0];if(!a){m.append(h('h1',{text:'Not found'}),h('p',null,[h('a',{href:'#play',text:'Go to '+lb('play','Practice and Play')})]));return}
var ds=h('p',{'class':'mu'}),k=ACT.indexOf(a),st=h('p',{role:'status','class':'mu sr2'});function dtx(){ds.textContent=AT[a.type][0]+'. '+(S.act[a.id]?'Done.':'Not done yet.')}dtx();
var X={say:function(t){st.textContent=t},fin:function(){if(S.act[a.id])return false;S.act[a.id]=true;var ok=save();dtx();if(!ok)ds.textContent+=' This browser would not save it. Use Save progress file.';return true}};
m.append(h('h1',{text:a.title}),ds,lead('Goal',a.goal,'goal'));
var tl=[];a.claims.forEach(function(c){var cid=c.split(':')[0],ch=CH.filter(function(z){return z._id===cid})[0];if(ch&&!tl.some(function(z){return z.id===cid}))tl.push({id:cid,t:str(ch.title)||cid})});
var tp=h('p',null,['Taught in: ']);tl.forEach(function(z,i){if(i)tp.append(', ');tp.append(h('a',{href:'#c-'+z.id,text:z.t}))});m.append(tp);
var box=h('div',{'class':'act'});m.append(st,box);BUILD[a.type](box,a,X);
var hn=h('details',null,[h('summary',{text:'Hint'}),h('p',{text:a.hint})]);m.append(hn);
var rs=ib('arrow-counter-clockwise','Start over'),row=h('div',{'class':'row navrow'},[rs,h('a',{'class':'btn',href:'#play',text:'All activities'})]);
rs.addEventListener('click',function(){box.replaceChildren();BUILD[a.type](box,a,X);X.say('Started over. Your done mark stays.');var f=box.querySelector('button,input');if(f)f.focus()});
if(k<ACT.length-1)row.append(h('a',{'class':'btn primary',href:'#a-'+ACT[k+1].id,text:'Next activity'}));m.append(row)}
function dl(name,text){var b=new Blob([text],{type:'application/json'}),u=URL.createObjectURL(b),a=h('a',{href:u,download:name});document.body.append(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},1000)}
function sofarT(c){return(c.g+c.r===QS.length?'Test finished. ':'So far: ')+c.g+' of '+QS.length+' marked got it.'+(c.g+c.r<QS.length?' '+(QS.length-c.g-c.r)+' not marked yet.':'')}
function counts(s){var dn=0,g=0,r=0,ad=0;ACT.forEach(function(a){if(s.act&&s.act[a.id]===true)ad++});Object.keys(s.done).forEach(function(k){if(VALID[k]&&k.indexOf(':')<0)dn++});Object.keys(s.q).forEach(function(k){if(VALID[k]&&k.indexOf(':')>0){if(s.q[k]==='got')g++;else r++}});return{dn:dn,g:g,r:r,ad:ad}}
function me(m){m.append(h('h1',{text:'My Progress'}));var c=counts(S);
m.append(h('p',{text:'Chapters done: '+c.dn+' of '+CH.length+'. Questions: '+c.g+' got it, '+c.r+' to review, '+(QS.length-c.g-c.r)+' not tried.'+(ACT.length?' Activities done: '+c.ad+' of '+ACT.length+'.':'')}));
m.append(h('h2',{text:'Review plan'}),h('p',{'class':'mu',text:'Review the Self-Test on these days after you first opened this guide ('+S.first+').'}));
var t=today(),nx=null;[1,3,7,21].forEach(function(n){var d=addDays(S.first,n),dn=S.rev.indexOf(n)>-1;if(!dn&&d<=t&&nx===null)nx=n;m.append(h('p',{'class':'plan',text:'Day '+n+', '+d+': '+(dn?'reviewed':(d<=t?'due now':'upcoming'))}))});
if(nx!==null){var rb=h('button',{type:'button',text:'Mark day '+nx+' reviewed'});rb.addEventListener('click',function(){S.rev.push(nx);save();loadNote='Day '+nx+' marked reviewed.';render(true)});m.append(h('div',{'class':'row'},[rb]))}
m.append(h('h2',{text:'Save or restore your progress'}),h('p',{text:'Progress stays in this browser only. A saved file is not encrypted and holds only your progress.'}),h('p',{'class':'mu',text:(persist==='granted'?'Your browser has promised to keep this progress.':'Your browser may delete this progress.')+' Use Save progress file now and then to keep a copy.'}));
var msg=h('div',{role:'status'}),sv=h('button',{type:'button',text:'Save progress file'}),fi=h('input',{type:'file',id:'rf','class':'sr',accept:'.json,application/json'}),fl=h('label',{'class':'btn',for:'rf',text:'Restore progress file'}),rs=h('button',{type:'button',text:'Reset all progress'}),box=h('div',{role:'status'});
sv.addEventListener('click',function(){dl('progress-'+ID+'.json',JSON.stringify({app:ID,appVersion:APPV,schemaVersion:2,exportedAt:new Date().toISOString(),data:S}));msg.textContent='Saved. Look for progress-'+ID+'.json in your Downloads folder.'});
fi.addEventListener('change',function(){var f=fi.files[0];msg.replaceChildren();if(!f)return;if(f.size>1000000){fi.value='';msg.textContent='That file is too big to be a progress file. Nothing was changed. Choose a file made by Save progress file.';return}
var rd=new FileReader();rd.onerror=function(){fi.value='';msg.textContent='That file could not be read. Nothing was changed.'};rd.onload=function(){fi.value='';var e=null,s=null;try{e=JSON.parse(rd.result)}catch(x){}
if(!e||typeof e!=='object'||typeof e.app!=='string'){msg.textContent='That file is not a progress file. Nothing was changed. Choose a file made by Save progress file.';return}
if(e.app!==ID){msg.textContent='This progress file was created by another guide. No data has been changed.';return}
if(e.schemaVersion!==1&&e.schemaVersion!==2){msg.textContent='That file is from a different version of this app. Nothing was changed. Choose a file made by Save progress file in this guide.';return}
s=clean(e.data);if(!s){msg.textContent='That progress file is damaged. Nothing was changed. Choose another file made by Save progress file.';return}
var k=counts(s),ap=h('button',{type:'button',text:'Replace my progress'}),ca=h('button',{type:'button',text:'Keep my progress'});
msg.replaceChildren(h('p',{text:'This file first opened the guide on '+s.first+'. Chapters done: '+k.dn+'. Marked questions: '+(k.g+k.r)+'.'+(ACT.length?' Activities done: '+k.ad+'.':'')+' Replacing erases the progress you have here now. To keep it, select Keep my progress, then Save progress file first.'}),h('div',{'class':'row'},[ap,ca]));
ap.addEventListener('click',function(){sset(PK+'.last',JSON.stringify(S));S=s;save();loadNote='Your progress was replaced by the saved file.';render(true)});ca.addEventListener('click',function(){msg.replaceChildren();fi.focus()})};rd.readAsText(f)});
rs.addEventListener('click',function(){var er=h('button',{type:'button',text:'Erase progress'}),ke=h('button',{type:'button',text:'Keep progress'});
box.replaceChildren(h('p',{text:'Erase all progress for this guide in this browser? Your Look choice and any saved files stay.'}),h('div',{'class':'row'},[er,ke]));er.focus();
er.addEventListener('click',function(){sdel(PK);sdel(PK+'.last');sdel(PK+'.damaged');sdel(PK+'.damaged2');damaged=false;noWrite=false;S=blank();save();loadNote='All progress for this guide was erased in this browser.';render(true)});ke.addEventListener('click',function(){box.replaceChildren();rs.focus()})});
m.append(h('div',{'class':'row stack'},[sv,fi,fl]),msg,h('div',{'class':'row sep'},[rs]),box);
if(damaged||noWrite){m.append(h('h2',{text:'Unreadable saved progress'}),h('p',{'class':'mu',text:'A copy of unreadable saved progress was kept. Reset all progress erases these copies too, so download them first.'}));
var ks=[PK+'.damaged',PK+'.damaged2'];if(noWrite)ks.push(PK);var nn=0;ks.forEach(function(k){var v=sget(k);if(v===null)return;nn++;var my=nn,b=h('button',{type:'button',text:'Download unreadable data '+my});b.addEventListener('click',function(){dl('unreadable-'+ID+'-'+my+'.json',v)});m.append(h('div',{'class':'row'},[b]))})}}
function fold(x){x=String(x).toLowerCase();try{return x.normalize('NFD').replace(/\p{M}/gu,'')}catch(e){return x}}
function search(m,id){var q=fold(dec(id.slice(2))).trim(),qt=q.split(/\s+/),hits=[];m.append(h('h1',{text:'Search results'}));
if(q){var add=function(href,label,o){var t=fold(flat(o));if(qt.every(function(w){return t.indexOf(w)>-1}))hits.push([href,label])};
add('#start','Start Here',D.start);add('#big','Big Picture',D.big);CH.forEach(function(c){add('#c-'+c._id,str(c.title),c)});
G.forEach(function(g){add('#glossary','Glossary: '+str(g.term),g)});objs(D.rules).forEach(function(r){add('#rules','Rule: '+str(r.rule),r)});objs(D.decide).forEach(function(r){add('#decide','Decision: '+str(r.if),r)});
objs(D.ref).forEach(function(r){add('#ref','Quick Reference: '+str(r.name),r)});add('#next','What To Do Next',D.next);add('#unsure',lb('unsure','What We Are Not Sure About'),D.uncertain);objs(D.sources).forEach(function(s){add('#sources','Source: '+str(s.id),s)});ACT.forEach(function(a){add('#a-'+a.id,'Activity: '+a.title,[a.raw,AT[a.type][0],a.type,'activity practice'])});if(ACT.length)add('#play',lb('play','Practice and Play'),'activity activities simulation practice play '+ACT.map(function(a){return AT[a.type][0]+' '+a.type}).join(' '));if(QS.length)add('#drill','Practice What You Missed','practice what you missed review questions')}
if(!hits.length){m.append(h('p',{text:'Nothing found. Try a shorter word.'}));return}
m.append(h('p',{'class':'mu',text:hits.length+' found'+(hits.length>40?'. Showing the first 40.':'.')}),h('ul',null,hits.slice(0,40).map(function(x){return h('li',null,[h('a',{href:x[0],text:x[1]})])})))}
function view(id){var m=$('#main'),st=D.start&&typeof D.start==='object'?D.start:{};
if(id==='start'){m.append(h('h1',{text:lb('start','Start Here')}));
if(st.what)m.append(h('p',{text:str(st.what)}));
var dn0=CH.filter(function(c){return S.done[c._id]}).length,tg=CH.filter(function(c){return!S.done[c._id]})[0];
if(CH[0])m.append(h('p',null,[h('a',{'class':'btn primary',href:tg?'#c-'+tg._id:(QS.length?'#test':'#start'),text:dn0===0?'Start Level 1':(tg?'Continue: '+str(tg.title):(QS.length?'All chapters done. Take the Self-Test':'All chapters done'))})]),h('p',{'class':'mu'},['Your progress: '+dn0+' of '+CH.length+' chapters done. ',h('a',{href:'#me',text:lb('me','My Progress')})]));else m.append(h('p',{text:'This guide has no chapters yet. Ask the AI that made this file to rebuild it.'}));
if(st.one)m.append(lead('If you only read one thing',st.one,'rule'));
if(M.notVerifiedFor)m.append(h('div',{'class':'note'},[h('strong',{text:'Not verified for: '}),str(M.notVerifiedFor)]));
var fx=[['Who it is for',st.who],['What you need first',st.need],['What you will be able to do',st.gain],['How long it takes',st.time],['How to use it',st.use]].filter(function(x){return x[1]});if(fx.length)m.append(facts(fx));
if(strs(st.rules).length)m.append(h('h2',{text:'The most important rules of thumb'}),ul(st.rules));
var meta=[['Topic',M.topic],['Reader',M.reader],['Facts checked as of',M.asOf],['Assumptions',strs(M.assumptions).join('\n\n')]].filter(function(x){return x[1]});if(meta.length)m.append(h('h2',{text:'About this guide'}),facts(meta))}
else if(id==='big'){var B=D.big&&typeof D.big==='object'?D.big:{};m.append(h('h1',{text:'Big Picture'}));T(m,B.text);if(strs(B.map).length)m.append(h('h2',{text:'Map of this guide'}),ul(B.map))}
else if(id==='glossary'){m.append(h('h1',{text:'Glossary'}));var f=h('input',{type:'search','aria-label':'Filter terms',placeholder:'Filter terms'}),box=h('div');
function draw(){var q=f.value.toLowerCase();box.replaceChildren();var rows=G.slice().sort(function(a,b){return str(a.term).localeCompare(str(b.term))}).filter(function(g){return(str(g.term)+' '+str(g.def)).toLowerCase().indexOf(q)>-1}).map(function(g){return[str(g.term),str(g.def)+(g.example?'\n\nExample: '+str(g.example):'')]});if(rows.length)box.append(facts(rows));if(!rows.length)box.append(h('p',{text:'No term matches. Clear the filter.'}))}
f.addEventListener('input',draw);m.append(f,box);draw()}
else if(id==='rules'){m.append(h('h1',{text:'Rules of Thumb'}),tbl(['Rule','Works when','Fails when'],objs(D.rules).map(function(r){return[r.rule,r.works,r.fails]})))}
else if(id==='decide'){m.append(h('h1',{text:'Which One Do I Pick?'}),tbl(['If','Then'],objs(D.decide).map(function(r){return[r.if,r.then]})));if(D.decideDefault)m.append(lead('If unsure',D.decideDefault,'rule'))}
else if(id==='ref'){m.append(h('h1',{text:'Quick Reference'}));objs(D.ref).forEach(function(s){m.append(h('h2',{text:str(s.name)}),ul(s.items))})}
else if(id==='drill'&&QS.length){var tdy=today(),sk=drillSkip||{},g=[[],[],[]],nxd=null;drillSkip=null;CH.forEach(function(c,ci){var k=[0,0,0];c._q.forEach(function(q){var v=S.q[q.id],o=S.qd[q.id],gi=-1,dd='';if(v==='review'){gi=0;dd=o?o.d:''}else if(v==='got'){var od=o?(far(o,tdy)?tdy:o.d):'';if(!o||od<=tdy){gi=1;dd=od}else if(nxd===null||od<nxd)nxd=od}else gi=2;if(gi>-1)g[gi].push({q:q,d:dd,k:k[gi]++,ci:ci})})});var pk=[];g.forEach(function(a){a.sort(function(x,y){return x.d<y.d?-1:(x.d>y.d?1:(x.k-y.k||x.ci-y.ci))});a.forEach(function(x){if(pk.length<6&&!sk[x.q.id])pk.push(x.q)})});if(pk.length<6)g.forEach(function(a){a.forEach(function(x){if(pk.length<6&&pk.indexOf(x.q)<0)pk.push(x.q)})});var cnt=g[0].length+g[1].length+g[2].length;m.append(h('h1',{text:'Practice What You Missed'}),h('p',{'class':'mu',text:'Questions you marked review again come first, then ones that are due again (1, 3, 7, 21 and 60 days after you got them right), then ones you have not tried. They are mixed across chapters on purpose: mixing and spacing help you remember for longer. Try to answer first, then mark each question so the list moves on.'}),h('p',{'class':'mu sofar',text:sofarT(counts(S))}));if(!pk.length){m.append(h('p',{text:'Nothing is due. '+(nxd?'The next question is due on '+nxd+'.':'Every question is marked got it.')+' Come back then.'}))}else{pk.forEach(function(q){m.append(quiz(q))});if(cnt>pk.length){var nb=h('button',{type:'button',text:'Show different questions'});nb.addEventListener('click',function(){drillSkip={};pk.forEach(function(q){drillSkip[q.id]=1});render(true)});m.append(h('div',{'class':'row'},[nb]))}else m.append(h('p',{'class':'mu',text:'These are all the questions to practise now.'}))}}
else if(id==='test'&&QS.length){m.append(h('h1',{text:'Self-Test'}),h('p',{'class':'mu',text:'Try to answer first. Then show the answer.'}),h('p',{'class':'mu sofar',text:sofarT(counts(S))}));CH.forEach(function(c){if(c._q.length){m.append(h('h2',{text:str(c.title)}));c._q.forEach(function(q){m.append(quiz(q))})}});m.append(h('p',{'class':'mu sofar',text:sofarT(counts(S))}),h('p',null,[h('a',{'class':'btn primary',href:D.next?'#next':'#start',text:D.next?lb('next','What To Do Next'):lb('start','Start Here')})]))}
else if(id==='next'){var nx=D.next&&typeof D.next==='object'?D.next:{};m.append(h('h1',{text:'What To Do Next'}));if(strs(nx.actions).length)m.append(h('h2',{text:'First actions'}),h('ol',null,strs(nx.actions).map(function(x){return h('li',{text:x})})));if(strs(nx.practice).length)m.append(h('h2',{text:'Practice'}),ul(nx.practice));if(strs(nx.deeper).length)m.append(h('h2',{text:'Go deeper'}),ul(nx.deeper))}
else if(id==='unsure'){var U=D.uncertain&&typeof D.uncertain==='object'?D.uncertain:{},any=false;m.append(h('h1',{text:'What We Are Not Sure About'}));
[['Gaps',U.gaps],['Added context',U.added],['Not verified',U.unverified],['Recheck later',U.recheck]].forEach(function(x){if(strs(x[1]).length){any=true;m.append(h('h2',{text:x[0]}),ul(x[1]))}});
if(objs(U.conflicts).length){any=true;m.append(h('h2',{text:'Contrary evidence'}),tbl(['Claim','Sides','Better supported','Why'],objs(U.conflicts).map(function(c){return[c.claim,Array.isArray(c.sides)?strs(c.sides).join('; '):c.sides,c.better,c.why]})))}
if(!any)m.append(h('p',{text:'Nothing is listed here.'}))}

else if(id==='ai'){m.append(h('h1',{text:'For AI Tools'}));T(m,D.ai);m.append(h('p',{text:'All knowledge in this guide is in the data blocks (template elements marked data-kd) inside this file.'}))}
else if(id==='me')me(m);
else if(id==='help'){m.append(h('h1',{text:'Help'}),h('ul',null,['Press the big button to start, then Next chapter at the end of each page.','Use Menu (or the list at the side) to jump anywhere.','Your progress may be saved in this browser. For a reliable backup, open My Progress and select Save progress file.'].concat(ACT.length?['Practice and Play has small simulations and activities. Nothing is timed. Use the keyboard or a tap: you never have to drag.']:[]).map(function(x){return h('li',{text:x})})),h('h2',{text:'Your data and settings'}));
m.append(facts([['Where your data lives','This guide sends no progress to a server. If your browser permits storage, it retains your progress locally, one earlier copy and up to two unreadable copies. For a file opened directly from a device, storage behaviour can vary between browsers or file locations. Storage may be blocked or cleared. Export a progress file regularly; it is your portable backup.'],['How to save a copy','Open My Progress and select Save progress file. The file is not encrypted. It holds only your progress and no secrets.'],['How to restore','Open My Progress and choose a progress file. You see what it holds first. Nothing changes until you select Replace my progress.'],['How to delete','Open My Progress and select Reset all progress. It erases the progress and every kept copy stored in this browser for this guide.'],['Changing the look','Use the Look menu at the top. Paper is light, Charcoal is dark, Black is darkest, and Auto follows your device. Other pages on the same site that use these looks follow your choice.'],['What survives Reset','Your Look choice and any progress files you saved. Clearing the browser site data for this file erases everything stored here.']]),h('p',null,[h('a',{href:'#about',text:'Changing or updating this guide'})]))}
else if(id==='about'){var dz=M.design&&typeof M.design==='object'?M.design:{};m.append(h('h1',{text:'How This Guide Works'}));
m.append(facts([['Versions','Content updated '+(str(M.updated)||str(M.asOf)||'date unknown')+'. App kd-app '+APPV+'.']]));
var lg=objs(D.log);if(lg.length)m.append(h('h2',{text:'What changed'}),tbl(['Date','Change'],lg.map(function(x){return[x.date,x.what]})));
var fr=objs(D.fresh);m.append(h('h2',{text:'Check before relying'}));if(fr.length)m.append(tbl(['What','As of','Check again when'],fr.map(function(x){return[x.what,x.asOf||'not checked',x.recheck||'none']})));else m.append(h('p',{text:'No fact in this guide is marked as likely to change.'}));
var ds=[['Concept',dz.concept],['Voice',dz.voice],['Colour',dz.hue],['Type',dz.type],['Corners',dz.radius],['Spacing',dz.density]].filter(function(x){return x[1]});if(ds.length)m.append(h('h2',{text:'How it looks and why'}),facts(ds));
var pr=objs(D.practice);if(pr.length)m.append(h('h2',{text:'How it was checked'}),tbl(['Area','Adopted','Rejected','Source','As of','Check again when'],pr.map(function(x){return[x.area,x.adopted,x.rejected||'none',x.source||'none',x.asOf,x.recheck]})));
m.append(h('h2',{text:'How to update this guide'}),h('h3',{text:'With an AI'}),h('ol',null,['Save your progress first: open My Progress, then select Save progress file.','Give an AI this file and the companion study-builder instructions, and type UPDATE. Say what changed: new notes, a date check, or a new look.','Open the new file and restore your progress: My Progress, then Restore progress file.','The AI reads the manifest inside this file (the template element marked data-kd=manifest) to know how.'].map(function(x){return h('li',{text:x})})),h('h3',{text:'By hand'}),h('ol',null,['To change a fact yourself: keep a copy of this file, open it in a plain-text editor, find the block that starts with <template data-kd="base"> (the first match is the right one), change the value you want (text sits inside quotes; hue is a number without quotes; never type a double quote, a backslash, a line break, a < or an & inside the text; use an apostrophe), also set asOf and updated in meta to today (written like 2026-10-31), save, and reload the page.','To change the look yourself: in that same block, find "meta" and change hue (a number from 0 to 359), type (sans, serif or humanist), radius (soft or sharp) or density (airy or compact), save, and reload. A wrong value is ignored and the default is used. Do not change anything outside that block: the app checks its own code and stops if it is altered.','To find a fact, search the file for a word from it. A fact can appear in more than one place, so search for the old value, the bare number too, and the Conflicts and Quick Reference entries, and change every place, then add a line to the log list in the same block, copying an existing one and putting a comma after the previous entry, for example {"date":"2026-10-31","what":"Changed a fact."}.'].map(function(x){return h('li',{text:x})})))}
else if(id==='licences'){
m.append(h('h1',{text:'Licence and reuse'}),h('h2',{text:'MIT License'}),h('p',{text:'Copyright (c) 2026 Contributors to this study app'}),h('p',{text:'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:'}),h('p',{text:'The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.'}),h('p',{text:'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.'}),h('h2',{text:'Scope and limits'}),h('p',{text:'This file uses text controls and generated graphics. It does not embed a third-party icon set, external fonts, images or remote scripts.'}),h('p',{text:'Only the rights held or validly licensed by a distributor can be granted under MIT. The notice does not establish rights to any inherited source expression or code. Confirm the rights chain before public release.'}));}

else if(id==='play'&&(ACT.length||actBad))playPage(m);
else if(id.indexOf('a-')===0)actView(m,id);
else if(id.indexOf('s:')===0)search(m,id);
else if(id.indexOf('c-')===0){var c=CH.filter(function(x){return'c-'+x._id===id})[0];if(c)chapter(c);else m.append(h('h1',{text:'Not found'}),h('p',null,[h('a',{href:'#start',text:'Go to Start Here'})]))}
else m.append(h('h1',{text:'Not found'}),h('p',null,[h('a',{href:'#start',text:'Go to Start Here'})]))}
function render(route){var raw=location.hash.slice(1),id=dec(raw)||'start';if(raw.indexOf('s:')===0)id='s:'+raw.slice(2);
var m=$('#main');m.replaceChildren();
if(SHELF){shelf(m);document.title=str(M.title)||'Guides';if(route){m.focus();window.scrollTo(0,0)}return}
if(bad)m.append(h('div',{'class':'note',text:'Part of this guide data could not be read ('+bad+' block'+(bad>1?'s':'')+'). Your saved progress is safe. Some content may be missing. If you just edited this file by hand, undo your last edit. Otherwise ask the AI that made this file to resend the missing chunk.'}));
if(missN.length)m.append(h('div',{'class':'note',text:(missN.length>1?'Chunks '+missN.slice(0,10).join(', ')+(missN.length>10?' and '+(missN.length-10)+' more':'')+' are missing':'Chunk '+missN[0]+' is missing')+', so some content is not here yet. Ask the AI that made this file to resend '+(missN.length>1?'them':'it')+'.'}));if(dupN)m.append(h('div',{'class':'note',text:'A chunk was pasted more than once, or had no number. Only the last copy of a repeated chunk was used.'}));
if(loadNote){m.append(h('div',{'class':'note',role:'status',text:loadNote}));loadNote=''}
if(volatile)m.append(h('div',{'class':'note',role:'status',text:'This browser would not save your progress. It is kept only until you close this page. Use Save progress file to keep a copy.'}));
try{view(id)}catch(e){m.append(h('div',{'class':'note',text:'This part of the guide could not be shown. Your progress is safe. Open another section, or ask the AI that made this file to rebuild it.'}))}
try{drawNav(id.indexOf('a-')===0?'play':id)}catch(e){}
if(route){$('#side').classList.remove('open');$('#menu').setAttribute('aria-expanded','false');$('#mt').textContent='Menu'}var nv=NAV.filter(function(x){return x[0]===id&&!x[2]})[0],h1=$('#main h1'),gt=str(M.title)||'Guide';if(nv&&h1)h1.textContent=nv[1];document.title=h1&&h1.textContent!==gt?h1.textContent+' - '+gt:gt;
if(route){m.focus();window.scrollTo(0,0)}}
build();var fu=$('#ftU'),fL=$('#ftL');if(fu)fu.textContent=lb('unsure','What We Are Not Sure About');if(fL)fL.textContent=lb('licences','Licence and reuse');document.querySelectorAll('a[href="#help"]').forEach(function(a){a.textContent=lb('help','Help')});$('#ttl').textContent=str(M.title)||'Guide';applyLook();
function setHH(){R.style.setProperty('--hh',$('header').offsetHeight+'px')}
setHH();window.addEventListener('resize',setHH);try{new ResizeObserver(setHH).observe($('header'))}catch(e){}
$('#look').addEventListener('change',function(){lookMem=$('#look').value;sset(LK,lookMem);var raw=sget(HK),p=null,okp=true;if(raw!==null){try{p=JSON.parse(raw)}catch(e){okp=false}if(okp&&!(p&&typeof p==='object'&&!Array.isArray(p)))okp=false}else p={schemaVersion:1};if(okp){p.look=lookMem;sset(HK,JSON.stringify(p))}applyLook()});window.addEventListener('storage',function(e){if(e.key===HK){lookMem=null;applyLook()}});
try{matchMedia('(prefers-color-scheme: dark)').addEventListener('change',function(){if(look()==='auto')applyLook()})}catch(e){}
$('#nav').addEventListener('click',function(e){var la=e.target.closest&&e.target.closest('a');if(la){if(la.getAttribute('href')==='#'+(dec(location.hash.slice(1))||'start'))$('#main').focus();$('#side').classList.remove('open');$('#menu').setAttribute('aria-expanded','false');$('#mt').textContent='Menu'}});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&$('#side').classList.contains('open')){$('#side').classList.remove('open');$('#menu').setAttribute('aria-expanded','false');$('#mt').textContent='Menu';$('#menu').focus()}});
$('#menu').addEventListener('click',function(){var o=$('#side').classList.toggle('open');$('#menu').setAttribute('aria-expanded',String(o));$('#mt').textContent=o?'Close menu':'Menu'});
$('.skip').addEventListener('click',function(e){e.preventDefault();$('#main').focus()});
function go(){var q=$('#q').value.trim();if(q){var nh='s:'+encodeURIComponent(q);if(location.hash.slice(1)===nh)render(true);else location.hash=nh}}
$('#go').addEventListener('click',go);$('#q').addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.isComposing&&e.keyCode!==229)go()});
window.addEventListener('hashchange',function(){render(true)});
window.addEventListener('storage',function(e){if(e.key!==PK||e.newValue===null)return;var s=null;try{s=clean(JSON.parse(e.newValue))}catch(x){}if(!s)return;S=s;var ae=document.activeElement,has=!!(ae&&ae!==document.body&&ae.closest&&ae.closest('main,#side,header'));
if(!has&&dec(location.hash.slice(1))==='me'&&document.querySelector('main [role=status] button')){try{drawNav('me')}catch(x){}return}
if(!has){loadNote='Your progress changed in another tab. This page now shows the newest progress.';render(false);return}
var rt=dec(location.hash.slice(1))||'start',d={tag:ae.tagName.toLowerCase(),id:ae.id,href:ae.getAttribute&&ae.getAttribute('href'),text:(ae.textContent||'').trim(),main:!!ae.closest('main'),side:!!ae.closest('#side'),sum:ae.tagName==='SUMMARY'};
if(rt==='me'&&document.querySelector('main [role=status] button')){try{drawNav(rt)}catch(x){}}else if(/^(start|me)$/.test(rt)){render(false)}else{try{var db=document.querySelector('main [data-c]');if(db){var on=!!S.done[db.getAttribute('data-c')];db.setAttribute('aria-pressed',String(on));db.textContent=on?'Chapter done. Select to undo':'Mark done and stay here';if(db.nextElementSibling)db.nextElementSibling.textContent=on?'Marked done.':''}document.querySelectorAll('main [data-q]').forEach(function(b){var qv=S.q[b.getAttribute('data-q')];b.setAttribute('aria-pressed',String(qv===b.getAttribute('data-v')));var bx=b.closest('.q'),sx=bx&&bx.querySelector('[role=status]');if(sx)sx.textContent=qv==='got'?'Your mark: got it.':(qv==='review'?'Your mark: review again.':'')});document.querySelectorAll('.sofar').forEach(function(sf){sf.textContent=sofarT(counts(S))})}catch(x){}try{drawNav(rt)}catch(x){}}
var cur=document.activeElement;if(cur&&cur!==document.body&&document.body.contains(cur))return;var nf=null;
if(d.id)nf=document.getElementById(d.id);else if(d.side)nf=d.href?document.querySelector('#nav a[href="'+d.href.replace(/["\\]/g,'')+'"]'):(d.sum?document.querySelector('#nav summary'):null);else if(d.main)nf=[].slice.call(document.querySelectorAll('main '+d.tag)).filter(function(x){return x.textContent.trim()===d.text})[0]||document.querySelector('main .btn.primary')||$('#main');
if(nf&&nf.focus)nf.focus()});
window.addEventListener('beforeprint',function(){document.querySelectorAll('details,.ans').forEach(function(x){if(x.tagName==='DETAILS'){x.dataset.was=String(x.open);x.open=true}else{x.dataset.was=String(x.hidden);x.hidden=false}})});
window.addEventListener('afterprint',function(){document.querySelectorAll('details,.ans').forEach(function(x){if(x.dataset.was===undefined)return;if(x.tagName==='DETAILS')x.open=x.dataset.was==='true';else x.hidden=x.dataset.was==='true';delete x.dataset.was})});
function shelf(m){m.append(h('h1',{text:str(M.title)||'Guides'}));if(SH.what)m.append(h('p',{text:str(SH.what)}));
var grp=null;PKS.forEach(function(t){var g=t.getAttribute('data-group')||'';if(g&&g!==grp){grp=g;m.append(h('h2',{text:g}))}
var p=t.getAttribute('data-pack'),pr=null;try{pr=JSON.parse(sget(t.getAttribute('data-id')+'.progress'))}catch(e){}
var dn=pr&&pr.done&&typeof pr.done==='object'?Object.keys(pr.done).filter(function(k){return pr.done[k]}).length:0;
m.append(h('div',{'class':'card'},[h('h3',null,[h('a',{href:'?pack='+encodeURIComponent(p),text:t.getAttribute('data-title')||p})]),h('p',{text:t.getAttribute('data-blurb')||''}),dn?h('p',{'class':'mu',text:dn+' chapter'+(dn>1?'s':'')+' done'}):null]))})}
if(SHELF){['#side','#menu','#bar','footer .links'].forEach(function(s){var e=$(s);if(e)e.style.display='none'});var fu=$('#ftU');if(fu&&fu.parentNode)fu.parentNode.textContent='Pick a guide. Your progress stays in this browser; nothing is sent anywhere.'}
if(PACK){var sl=h('a',{'class':'back',href:'./',text:str(SH.label)||'All guides'});var bh=$('#back-to-hub');if(bh)bh.before(sl)}
render(false);
})();