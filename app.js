(function(){
'use strict';

/* ---------- dados base ---------- */
var STORE='navalha:v1';
var TAGS=['Corte','Barba','Sobrancelha','Pigmentação','Infantil','Platinado'];
var NETS=['Instagram','Facebook','YouTube','TikTok'];
var CRIT=[['atendimento','Atendimento'],['corte','Corte'],['ambiente','Ambiente'],['preco','Preço justo']];
var TYPES={elogio:'Elogio',sugestao:'Sugestão',reclamacao:'Reclamação'};
var PLANS={
  vitrine:{name:'Vitrine',price:49,per:'por semana',maxNet:0,items:['Selo Destaque nos cards','Topo da busca na sua cidade','Aparece antes das outras barbearias']},
  redes:{name:'Redes',price:149,per:'por mês',maxNet:1,items:['Tudo do Vitrine','4 posts por mês em 1 rede à sua escolha','Arte feita pela nossa equipe']},
  campanha:{name:'Campanha',price:349,per:'por mês',maxNet:4,items:['Tudo do Vitrine','12 posts e stories por mês','1 vídeo curto por mês (Reels, Shorts, TikTok)','Instagram, Facebook, YouTube e TikTok']}
};
var DIAS=['dom','seg','ter','qua','qui','sex','sáb'];
var NAV=[['home','Explorar'],['bookings','Agendamentos'],['review','Avaliar corte'],['complaints','Reclamações'],['register','Cadastrar barbearia'],['promote','Divulgar']];

var $=function(s,r){return (r||document).querySelector(s)};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
var money=function(n){return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(n)};
var uid=function(){return Math.random().toString(36).slice(2,9)};
var today=function(){return new Date().toLocaleDateString('pt-BR')};
var num1=function(n){return n.toFixed(1).replace('.',',')};

function seed(){
  return {
    shops:[
      {id:'s1',name:'Dom Bigode Barbearia',city:'São Paulo',neighborhood:'Pinheiros',address:'Rua dos Pinheiros, 812',phone:'(11) 99999-0101',instagram:'@dombigode',hours:'Ter a sáb, 9h às 20h',
       desc:'Ambiente clássico, toalha quente e navalha em todo acabamento. Cerveja gelada enquanto você espera.',tags:['Corte','Barba','Sobrancelha'],photos:[],
       barbers:[{id:'b1',name:'Rafa',spec:'Degradê e navalhado',photo:''},{id:'b2',name:'Tico',spec:'Barba e toalha quente',photo:''}],
       services:[{name:'Corte',price:60},{name:'Barba',price:45},{name:'Corte + barba',price:95}],
       promo:{plan:'campanha',nets:['Instagram','YouTube'],status:'ativa',start:'01/09/2026'}},
      {id:'s2',name:'Old School Cortes',city:'Campinas',neighborhood:'Cambuí',address:'Av. Júlio de Mesquita, 340',phone:'(19) 98888-0202',instagram:'@oldschoolcortes',hours:'Seg a sáb, 8h às 19h',
       desc:'Corte na tesoura e máquina, sem enrolação. Atendimento por ordem de chegada ou hora marcada.',tags:['Corte','Infantil'],photos:[],
       barbers:[{id:'b3',name:'Seu Jorge',spec:'Clássico e social',photo:''}],
       services:[{name:'Corte',price:40},{name:'Corte infantil',price:35},{name:'Barba',price:30}],promo:null},
      {id:'s3',name:'Fio & Navalha Studio',city:'Curitiba',neighborhood:'Batel',address:'Rua Bruno Filgueira, 95',phone:'(41) 97777-0303',instagram:'@fioenavalha',hours:'Ter a sáb, 10h às 21h',
       desc:'Especialistas em platinado, pigmentação e barba desenhada. Agende com antecedência aos sábados.',tags:['Platinado','Pigmentação','Barba'],photos:[],
       barbers:[{id:'b4',name:'Lu',spec:'Coloração',photo:''},{id:'b5',name:'Beto',spec:'Barba desenhada',photo:''}],
       services:[{name:'Corte',price:80},{name:'Platinado',price:220},{name:'Pigmentação de barba',price:70}],promo:null},
      {id:'s4',name:'Barbearia do Zé',city:'Belo Horizonte',neighborhood:'Savassi',address:'Rua Pernambuco, 1200',phone:'(31) 96666-0404',instagram:'@barbeariadoze',hours:'Seg a sex, 9h às 19h',
       desc:'Preço justo e corte caprichado. Pé-de-cabelo, degradê e sobrancelha.',tags:['Corte','Sobrancelha'],photos:[],
       barbers:[{id:'b6',name:'Zé',spec:'Degradê',photo:''},{id:'b7',name:'Dani',spec:'Sobrancelha e acabamento',photo:''}],
       services:[{name:'Corte',price:35},{name:'Sobrancelha',price:15}],promo:null}
    ],
    reviews:[
      {id:'r1',shopId:'s1',barberId:'b1',service:'Corte + barba',ratings:{atendimento:5,corte:5,ambiente:5,preco:4},overall:4.75,type:'elogio',text:'Melhor degradê que já fiz. O Rafa ouviu o que eu queria e não me empurrou nada.',author:'Marcos T.',date:'12/09/2026',reply:'',status:''},
      {id:'r2',shopId:'s1',barberId:'b2',service:'Barba',ratings:{atendimento:2,corte:3,ambiente:4,preco:3},overall:3,type:'reclamacao',text:'Esperei 40 minutos mesmo com hora marcada. O corte ficou bom, mas o atraso foi demais.',author:'Lucas P.',date:'18/09/2026',reply:'Lucas, você tem razão e pedimos desculpas. Ajustamos a agenda de sexta para não acumular horários. Passe aqui que a barba da próxima é por nossa conta.',status:'Resolvida'},
      {id:'r3',shopId:'s2',barberId:'b3',service:'Corte',ratings:{atendimento:5,corte:4,ambiente:4,preco:5},overall:4.5,type:'elogio',text:'Levei meu filho de 6 anos e ele saiu rindo. Paciência de sobra.',author:'Ana C.',date:'20/09/2026',reply:'',status:''},
      {id:'r4',shopId:'s3',barberId:'b4',service:'Platinado',ratings:{atendimento:4,corte:5,ambiente:5,preco:2},overall:4,type:'sugestao',text:'Resultado incrível, mas seria bom avisar o valor final antes de começar.',author:'Diego R.',date:'22/09/2026',reply:'Obrigado, Diego. A partir de agora passamos o orçamento antes de começar qualquer química.',status:'Respondida'},
      {id:'r5',shopId:'s4',barberId:'b6',service:'Corte',ratings:{atendimento:1,corte:2,ambiente:3,preco:3},overall:2.25,type:'reclamacao',text:'Pedi um degradê baixo e saiu alto demais. Pedi para acertar e o barbeiro se recusou.',author:'Felipe M.',date:'25/09/2026',reply:'',status:'Aguardando resposta'},
      {id:'r6',shopId:'s4',barberId:'b7',service:'Sobrancelha',ratings:{atendimento:5,corte:5,ambiente:4,preco:5},overall:4.75,type:'elogio',text:'A Dani é cirúrgica na sobrancelha. Voltarei sempre.',author:'Rui S.',date:'27/09/2026',reply:'',status:''}
    ],
    log:[]
  };
}
function load(){try{var r=localStorage.getItem(STORE);return r?JSON.parse(r):null}catch(e){return null}}
var db=load()||seed();
function save(){try{localStorage.setItem(STORE,JSON.stringify(db))}catch(e){toast('Sem espaço para guardar tudo neste navegador. Tente usar menos fotos.')}}

/* ---------- contas e login ---------- */
var SESS='navalha:session';
function sha256(ascii){
  function rr(v,a){return (v>>>a)|(v<<(32-a))}
  var maxWord=Math.pow(2,32),result='',words=[],asciiBitLength=ascii.length*8,i,j;
  var hash=[],k=[],primeCounter=0,isComposite={};
  for(var candidate=2;primeCounter<64;candidate++){
    if(!isComposite[candidate]){
      for(i=0;i<313;i+=candidate)isComposite[i]=candidate;
      hash[primeCounter]=(Math.pow(candidate,.5)*maxWord)|0;
      k[primeCounter++]=(Math.pow(candidate,1/3)*maxWord)|0;
    }
  }
  ascii+='\x80';
  while(ascii.length%64-56)ascii+='\x00';
  for(i=0;i<ascii.length;i++){j=ascii.charCodeAt(i);words[i>>2]|=j<<((3-i)%4)*8}
  words[words.length]=((asciiBitLength/maxWord)|0);
  words[words.length]=(asciiBitLength);
  for(j=0;j<words.length;){
    var w=words.slice(j,j+=16),oldHash=hash;
    hash=hash.slice(0,8);
    for(i=0;i<64;i++){
      var w15=w[i-15],w2=w[i-2],a=hash[0],e=hash[4];
      var t1=hash[7]+(rr(e,6)^rr(e,11)^rr(e,25))+((e&hash[5])^((~e)&hash[6]))+k[i]+(w[i]=(i<16)?w[i]:(w[i-16]+(rr(w15,7)^rr(w15,18)^(w15>>>3))+w[i-7]+(rr(w2,17)^rr(w2,19)^(w2>>>10))|0));
      var t2=(rr(a,2)^rr(a,13)^rr(a,22))+((a&hash[1])^(a&hash[2])^(hash[1]&hash[2]));
      hash=[(t1+t2)|0].concat(hash);
      hash[4]=(hash[4]+t1)|0;
    }
    for(i=0;i<8;i++)hash[i]=(hash[i]+oldHash[i])|0;
  }
  for(i=0;i<8;i++)for(j=3;j+1;j--){var b=(hash[i]>>(j*8))&255;result+=((b<16)?0:'')+b.toString(16)}
  return result;
}
function hashPw(salt,pw){return sha256(unescape(encodeURIComponent(salt+':'+pw)))}
function seedUsers(){
  return [
    {id:'u1',name:'Cliente Teste',email:'cliente@teste.com',role:'cliente',salt:'c1',hash:hashPw('c1','123456')},
    {id:'u2',name:'Dono Teste',email:'dono@teste.com',role:'dono',salt:'d1',hash:hashPw('d1','123456')}
  ];
}
if(!db.users){
  db.users=seedUsers();
  db.shops.forEach(function(s){if(s.id==='s1'||s.id==='s4')s.ownerId='u2'});
}
function readSess(){try{return localStorage.getItem(SESS)}catch(e){return null}}
function writeSess(id){try{if(id)localStorage.setItem(SESS,id);else localStorage.removeItem(SESS)}catch(e){}}
var me=(function(){var id=readSess();return db.users.filter(function(u){return u.id===id})[0]||null})();
var auth={mode:'entrar',next:null,msg:''};
/* ---------- agenda: dados e datas ---------- */
var SEEDSCHED={s1:{days:[2,3,4,5,6],open:'09:00',close:'20:00'},s2:{days:[1,2,3,4,5,6],open:'08:00',close:'19:00'},s3:{days:[2,3,4,5,6],open:'10:00',close:'21:00'},s4:{days:[1,2,3,4,5],open:'09:00',close:'19:00'}};
function defaultMin(n){n=String(n).toLowerCase();return n.indexOf('+')>=0?60:n.indexOf('platinado')>=0?90:30}
function pad(n){return (n<10?'0':'')+n}
function ymd(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}
function parseYmd(s){var p=s.split('-');return new Date(+p[0],+p[1]-1,+p[2])}
function hm2min(t){var p=String(t).split(':');return (+p[0])*60+(+p[1])}
function min2hm(m){return pad(Math.floor(m/60))+':'+pad(m%60)}
function fmtDate(s){var d=parseYmd(s);return DIAS[d.getDay()]+', '+pad(d.getDate())+'/'+pad(d.getMonth()+1)}
function durLabel(m){return m<60?m+' min':(m%60===0?(m/60)+' h':Math.floor(m/60)+'h'+pad(m%60))}
function seedBookings(){
  var out=[];
  [['s1','b1','Corte',60,30,'10:00'],['s4','b6','Corte',35,30,'15:00']].forEach(function(x,i){
    var s=shopById(x[0]);if(!s)return;
    for(var k=1;k<10;k++){
      var d=new Date();d.setDate(d.getDate()+k);
      if(s.schedule.days.indexOf(d.getDay())>=0){out.push({id:'k'+(i+1),userId:'u1',shopId:x[0],barberId:x[1],service:x[2],price:x[3],min:x[4],date:ymd(d),time:x[5],status:'confirmado',created:today()});break}
    }
  });
  return out;
}
db.shops.forEach(function(s){
  if(!s.schedule)s.schedule=SEEDSCHED[s.id]||{days:[2,3,4,5,6],open:'09:00',close:'19:00'};
  s.services.forEach(function(x){if(!x.min)x.min=defaultMin(x.name)});
});
if(!db.bookings){db.bookings=seedBookings()}
function userByEmail(e){return db.users.filter(function(u){return u.email===e})[0]}
function firstName(n){return String(n).split(/\s+/)[0]}
function isOwner(s){return !!(me&&s&&s.ownerId===me.id)}
function loginAs(u){
  me=u;writeSess(u.id);
  var nx=auth.next;auth.next=null;auth.msg='';
  toast('Olá, '+firstName(u.name)+'!');
  if(nx)go(nx.view,nx.id);else go('home');
}
function logout(){me=null;writeSess(null);toast('Você saiu da conta.');go('home')}

/* ---------- estado de tela ---------- */
var view='home', viewId=null;
var ui={q:'',tag:'',sort:'relevancia',revTab:'todas',compStatus:'todas',gal:0};
var draft=blankDraft(), draftBarberPhoto='';
var rv=blankReview('');
var pm={shopId:'',plan:'redes',nets:[]};
var bk=blankBook('');
function blankBook(shopId){return {shopId:shopId,svc:-1,barberId:'',date:'',time:''}}
function blankDraft(){return {name:'',city:'',neighborhood:'',address:'',phone:'',instagram:'',hours:'',desc:'',tags:[],photos:[],barbers:[],services:[],schedule:{days:[2,3,4,5,6],open:'09:00',close:'19:00'}}}
function blankReview(shopId){return {shopId:shopId,barberId:'',service:'',ratings:{atendimento:0,corte:0,ambiente:0,preco:0},type:'elogio',text:'',author:'',confirm:false}}

/* ---------- helpers de dados ---------- */
function shopById(id){return db.shops.filter(function(s){return s.id===id})[0]}
function revsOf(id){return db.reviews.filter(function(r){return r.shopId===id})}
function stats(id){
  var rs=revsOf(id), n=rs.length;
  var avg=n?rs.reduce(function(a,r){return a+r.overall},0)/n:0;
  var by={};
  CRIT.forEach(function(c){var v=rs.map(function(r){return r.ratings[c[0]]}).filter(Boolean);by[c[0]]=v.length?v.reduce(function(a,b){return a+b},0)/v.length:0});
  return {n:n,avg:avg,by:by,comp:rs.filter(function(r){return r.type==='reclamacao'}).length};
}
function minPrice(s){return s.services.length?Math.min.apply(null,s.services.map(function(x){return x.price})):0}
function sponsored(s){return !!(s.promo&&s.promo.status==='ativa')}
function hue(name){var h=0;for(var i=0;i<name.length;i++)h=(h*31+name.charCodeAt(i))%360;return h}
function initials(n){return n.split(/\s+/).filter(Boolean).slice(0,2).map(function(w){return w[0]}).join('').toUpperCase()}
function plural(n,a,b){return n+' '+(n===1?a:b)}

function stars(v){
  var r=Math.round(v),out='<span class="stars" aria-hidden="true">';
  for(var i=1;i<=5;i++)out+='<svg viewBox="0 0 20 20" class="'+(i<=r?'on':'')+'"><path d="M10 1.6l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.9l6-.8z"/></svg>';
  return out+'</span><span class="sr">'+num1(v)+' de 5</span>';
}
function starInput(key,val){
  var out='';
  for(var i=1;i<=5;i++)out+='<button type="button" class="'+(i<=val?'on':'')+'" data-act="rate" data-key="'+key+'" data-val="'+i+'" aria-label="'+i+(i===1?' estrela':' estrelas')+'" aria-pressed="'+(i===val)+'"><svg viewBox="0 0 20 20"><path d="M10 1.6l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.9l6-.8z"/></svg></button>';
  return out;
}
function cover(s,i){
  var p=s.photos&&s.photos[i||0];
  return p?'<img src="'+p+'" alt="Foto de '+esc(s.name)+'">':'<div class="ph" style="--h:'+hue(s.name)+'" role="img" aria-label="Sem foto">'+esc(initials(s.name))+'</div>';
}
function avatar(b){return b.photo?'<img class="avatar" src="'+b.photo+'" alt="'+esc(b.name)+'">':'<div class="avatar" aria-hidden="true">'+esc((b.name||'?')[0].toUpperCase())+'</div>'}

var toastT;
function toast(m){var t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(function(){t.classList.remove('show')},3800)}

/* ---------- navegação ---------- */
function go(v,id){
  if(v==='login'){auth.next=null;auth.msg='';auth.mode='entrar'}
  if(v==='login'&&me){v='home';id=null}
  if(!me&&(v==='review'||v==='register'||v==='promote'||v==='book'||v==='bookings')){
    var gm={review:'Entre na sua conta para avaliar o atendimento.',register:'Entre com uma conta de dono para cadastrar sua barbearia.',promote:'Entre com uma conta de dono para divulgar sua barbearia.',book:'Entre na sua conta para agendar um horário.',bookings:'Entre na sua conta para ver seus agendamentos.'};
    auth.next={view:v,id:id||null};auth.msg=gm[v];auth.mode='entrar';v='login';id=null;
  }
  view=v;viewId=id||null;
  if(v==='shop'){ui.gal=0;ui.revTab='todas'}
  if(v==='review'&&id!==undefined&&id!==null){rv=blankReview(id)}
  if(v==='review'&&(id===undefined||id===null)&&!rv.shopId){rv=blankReview('')}
  if(v==='review'&&me&&!rv.author)rv.author=me.name;
  if(v==='promote'&&id){pm.shopId=id}
  if(v==='book'&&id){bk=blankBook(id)}
  render();window.scrollTo(0,0);
}
function renderAcct(){
  $('#acct').innerHTML=me?'<span class="who"><b>'+esc(firstName(me.name))+'</b><span class="pill">'+(me.role==='dono'?'Dono':'Cliente')+'</span></span><button class="btn ghost sm" data-act="logout">Sair</button>':'<button class="btn sm" data-act="go" data-view="login">Entrar</button>';
}
function renderNav(){
  renderAcct();
  var cur=(view==='shop'||view==='book')?'home':view;
  $('#nav').innerHTML=NAV.map(function(n){return '<button data-act="go" data-view="'+n[0]+'"'+(n[0]===cur?' aria-current="page"':'')+'>'+n[1]+'</button>'}).join('');
}
function render(){
  renderNav();
  var app=$('#app');
  var v={home:viewHome,shop:viewShop,review:viewReview,complaints:viewComplaints,register:viewRegister,promote:viewPromote,login:viewLogin,book:viewBook,bookings:viewBookings}[view]||viewHome;
  app.innerHTML=v();
  if(view==='home')paintResults();
  if(view==='register')paintDraft();
}

/* ---------- Home ---------- */
function viewHome(){
  return '<section class="hero"><div>'+
    '<h1>Corte bom começa na escolha certa.</h1>'+
    '<p class="lead">Compare barbearias, conheça os barbeiros e leia o que os clientes contaram depois do corte.</p>'+
    '<div class="search" role="search"><label class="sr" for="q">Buscar barbearia, bairro ou cidade</label><input id="q" type="search" data-ui="q" placeholder="Busque por nome, bairro ou cidade" value="'+esc(ui.q)+'" autocomplete="off"></div>'+
    '</div><div class="pole" aria-hidden="true"><div class="cap t"></div><div class="glass"><div class="stripes"></div></div><div class="cap b"></div></div></section>'+
    '<div class="bar"><div class="chips" role="group" aria-label="Filtrar por serviço">'+
      '<button class="chip" data-act="tag" data-tag="" aria-pressed="'+(ui.tag==='')+'">Todas</button>'+
      TAGS.map(function(t){return '<button class="chip" data-act="tag" data-tag="'+t+'" aria-pressed="'+(ui.tag===t)+'">'+t+'</button>'}).join('')+
    '</div><label class="sr" for="sort">Ordenar</label><select id="sort" data-ui="sort"><option value="relevancia">Destaques primeiro</option><option value="nota">Melhor avaliadas</option><option value="preco">Menor preço</option></select></div>'+
    '<div id="results"></div>'+
    '<section class="section"><h2>Como funciona</h2><div class="steps">'+
      '<div class="step"><b>1</b><h3>Escolha</h3><p>Veja fotos, serviços, preços e o barbeiro que combina com o seu estilo.</p></div>'+
      '<div class="step"><b>2</b><h3>Corte</h3><p>Vá até a barbearia e curta o atendimento.</p></div>'+
      '<div class="step"><b>3</b><h3>Conte como foi</h3><p>Dê nota, escreva um elogio ou registre uma reclamação. A barbearia pode responder publicamente.</p></div>'+
    '</div></section>'+
    '<div class="cta"><div><h2>Tem uma barbearia?</h2><p>Cadastre com fotos e barbeiros, receba avaliações e, se quiser, pague para divulgarmos no Instagram, Facebook, YouTube e TikTok.</p></div><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn" data-act="go" data-view="register">Cadastrar barbearia</button><button class="btn ghost" style="color:#fff;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.4)" data-act="go" data-view="promote">Ver planos de divulgação</button></div></div>';
}
function filtered(){
  var q=ui.q.trim().toLowerCase();
  var l=db.shops.filter(function(s){
    if(ui.tag&&s.tags.indexOf(ui.tag)<0)return false;
    if(!q)return true;
    return (s.name+' '+s.city+' '+s.neighborhood+' '+s.tags.join(' ')).toLowerCase().indexOf(q)>=0;
  });
  l.sort(function(a,b){
    if(ui.sort==='nota')return stats(b.id).avg-stats(a.id).avg;
    if(ui.sort==='preco')return (minPrice(a)||1e9)-(minPrice(b)||1e9);
    var sa=sponsored(a)?1:0, sb=sponsored(b)?1:0;
    return sb-sa||stats(b.id).avg-stats(a.id).avg;
  });
  return l;
}
function card(s){
  var st=stats(s.id),min=minPrice(s);
  return '<article class="card"><button class="card-hit" data-act="open-shop" data-id="'+s.id+'" aria-label="Abrir '+esc(s.name)+'"></button>'+
    '<div class="card-img">'+cover(s)+(sponsored(s)?'<span class="badge">Destaque</span>':'')+'</div>'+
    '<div class="card-body"><h3>'+esc(s.name)+'</h3>'+
    '<div class="rate">'+(st.n?stars(st.avg)+'<b>'+num1(st.avg)+'</b><span class="muted">('+st.n+')</span>':'<span class="muted">Sem avaliações ainda</span>')+'</div>'+
    '<p class="muted">'+esc(s.neighborhood)+', '+esc(s.city)+'</p>'+
    '<div class="chips">'+s.tags.slice(0,3).map(function(t){return '<span class="chip sm">'+esc(t)+'</span>'}).join('')+'</div>'+
    '<div class="card-foot"><span>'+plural(s.barbers.length,'barbeiro','barbeiros')+'</span><span>'+(min?'a partir de <b>'+money(min)+'</b>':'')+'</span></div></div></article>';
}
function paintResults(){
  var box=$('#results');if(!box)return;
  var l=filtered();
  var sel=$('#sort');if(sel)sel.value=ui.sort;
  box.innerHTML=l.length?'<div class="grid">'+l.map(card).join('')+'</div>':
   '<div class="empty"><h3>Nenhuma barbearia encontrada</h3><p>Tire algum filtro ou busque por outro bairro. Se a sua não está aqui, cadastre.</p><button class="btn" data-act="go" data-view="register">Cadastrar barbearia</button></div>';
}

/* ---------- Barbearia ---------- */
function reviewCard(r,withShop){
  var s=shopById(r.shopId),b=s&&s.barbers.filter(function(x){return x.id===r.barberId})[0];
  var st=r.status,cls=st==='Resolvida'?'resolvida':st==='Respondida'?'respondida':'aguardando';
  var out='<article class="rev '+r.type+'"><div class="rev-head"><strong>'+esc(r.author||'Cliente anônimo')+'</strong>'+stars(r.overall)+'<span class="pill '+r.type+'">'+TYPES[r.type]+'</span>'+(r.type==='reclamacao'?'<span class="pill '+cls+'">'+esc(st||'Aguardando resposta')+'</span>':'')+'</div>'+
    '<div class="rev-meta"><span>'+esc(r.date)+'</span>'+(withShop&&s?'<span>Barbearia: <button class="link" data-act="open-shop" data-id="'+s.id+'">'+esc(s.name)+'</button></span>':'')+(b?'<span>Barbeiro: '+esc(b.name)+'</span>':'')+(r.service?'<span>Serviço: '+esc(r.service)+'</span>':'')+'</div>'+
    (r.text?'<p>'+esc(r.text)+'</p>':'');
  if(r.reply)out+='<div class="reply"><b>Resposta da barbearia</b>'+esc(r.reply)+'</div>';
  if(r.type==='reclamacao'){
    var owner=isOwner(s),mine=!!(me&&r.userId===me.id);
    var acts=(!r.reply&&owner?'<button class="link" data-act="reply-toggle" data-id="'+r.id+'">Responder como dono</button>':'')+(r.status!=='Resolvida'&&(owner||mine)?'<button class="link" data-act="resolve" data-id="'+r.id+'">Marcar como resolvido</button>':'');
    out+=(acts?'<div class="acts">'+acts+'</div>':'')+(owner&&!r.reply?'<div id="reply-'+r.id+'" hidden class="field"><label for="rt-'+r.id+'">Sua resposta pública</label><textarea id="rt-'+r.id+'" placeholder="Explique o que aconteceu e o que a barbearia vai fazer."></textarea><div><button class="btn sm" data-act="reply-send" data-id="'+r.id+'">Publicar resposta</button></div></div>':'');
  }
  return out+'</article>';
}
function viewShop(){
  var s=shopById(viewId);
  if(!s)return '<div class="empty" style="margin-top:40px"><h3>Barbearia não encontrada</h3><button class="btn" data-act="go" data-view="home">Voltar</button></div>';
  var st=stats(s.id),rs=revsOf(s.id).slice().reverse();
  if(ui.revTab!=='todas')rs=rs.filter(function(r){return r.type===ui.revTab});
  var gal='<div class="gal-main">'+cover(s,ui.gal)+'</div>';
  if(s.photos.length>1)gal+='<div class="gal-th">'+s.photos.map(function(p,i){return '<button data-act="gal" data-i="'+i+'" aria-current="'+(i===ui.gal)+'" aria-label="Foto '+(i+1)+'"><img src="'+p+'" alt=""></button>'}).join('')+'</div>';
  var tabs=[['todas','Todas'],['elogio','Elogios'],['sugestao','Sugestões'],['reclamacao','Reclamações']].map(function(t){return '<button class="chip" data-act="revtab" data-t="'+t[0]+'" aria-pressed="'+(ui.revTab===t[0])+'">'+t[1]+'</button>'}).join('');
  return '<button class="link back" data-act="go" data-view="home">Voltar para a lista</button>'+
  '<div class="shop-top"><div>'+gal+'</div><div class="info">'+
    (sponsored(s)?'<span class="badge" style="position:static;align-self:flex-start">Destaque</span>':'')+
    '<h1 style="font-size:clamp(2.2rem,5vw,3.4rem)">'+esc(s.name)+'</h1>'+
    '<div class="rate">'+(st.n?stars(st.avg)+'<b>'+num1(st.avg)+'</b><span class="muted">'+plural(st.n,'avaliação','avaliações')+'</span>':'<span class="muted">Sem avaliações ainda</span>')+'</div>'+
    '<p>'+esc(s.desc)+'</p>'+
    '<dl><dt>Endereço</dt><dd>'+esc(s.address)+', '+esc(s.neighborhood)+', '+esc(s.city)+'</dd>'+(s.hours?'<dt>Horário</dt><dd>'+esc(s.hours)+'</dd>':'')+(s.phone?'<dt>Telefone</dt><dd>'+esc(s.phone)+'</dd>':'')+(s.instagram?'<dt>Instagram</dt><dd>'+esc(s.instagram)+'</dd>':'')+'</dl>'+
    (sponsored(s)&&s.promo.nets.length?'<div class="promo-tag"><span>Divulgada em</span>'+s.promo.nets.map(function(n){return '<span class="chip sm">'+n+'</span>'}).join('')+'</div>':'')+
    '<div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn" data-act="go" data-view="book" data-id="'+s.id+'">Agendar horário</button><button class="btn ghost" data-act="go" data-view="review" data-id="'+s.id+'">Avaliar atendimento</button>'+(isOwner(s)?'<button class="btn ghost" data-act="go" data-view="promote" data-id="'+s.id+'">Divulgar esta barbearia</button>':'')+'</div>'+
  '</div></div>'+
  '<div class="section two"><div class="box"><h2>Serviços</h2><ul class="svc">'+s.services.map(function(x){return '<li><span>'+esc(x.name)+' <span class="muted">('+durLabel(x.min||30)+')</span></span><b>'+money(x.price)+'</b></li>'}).join('')+'</ul></div>'+
  '<div class="box"><h2>Barbeiros</h2><div class="barbers">'+s.barbers.map(function(b){return '<div class="barber">'+avatar(b)+'<b>'+esc(b.name)+'</b><p class="muted" style="font-size:.85rem">'+esc(b.spec)+'</p></div>'}).join('')+'</div></div></div>'+
  '<div class="section" style="padding-top:0"><div class="two"><div class="box"><h2>Nota geral</h2>'+(st.n?'<div style="display:flex;gap:16px;align-items:center;margin-top:10px"><span class="big">'+num1(st.avg)+'</span><div>'+stars(st.avg)+'<p class="muted">'+plural(st.n,'avaliação','avaliações')+(st.comp?', '+plural(st.comp,'reclamação','reclamações'):'')+'</p></div></div><div class="bars">'+CRIT.map(function(c){var v=st.by[c[0]];return '<div class="brow"><span>'+c[1]+'</span><div><i style="width:'+(v/5*100)+'%"></i></div><b>'+(v?num1(v):'-')+'</b></div>'}).join('')+'</div>':'<p class="muted" style="margin-top:10px">Ainda ninguém avaliou. Seja o primeiro depois do seu corte.</p>')+'</div></div></div>'+
  '<div class="section" style="padding-top:0"><h2>O que os clientes disseram</h2><div class="chips" style="margin:14px 0" role="group" aria-label="Filtrar avaliações">'+tabs+'</div>'+
  '<div class="list">'+(rs.length?rs.map(function(r){return reviewCard(r,false)}).join(''):'<div class="empty"><p>Nada por aqui ainda.</p></div>')+'</div></div>';
}

/* ---------- Avaliar ---------- */
function viewReview(){
  var s=rv.shopId?shopById(rv.shopId):null;
  var ph={elogio:'Conte o que você mais gostou. (opcional)',sugestao:'O que a barbearia poderia melhorar? (opcional)',reclamacao:'Conte o que aconteceu, com datas e detalhes, para a barbearia poder responder.'}[rv.type];
  return '<div class="page-head"><h1>Como foi o corte?</h1><p>Sua avaliação ajuda o próximo cliente a escolher bem e mostra para a barbearia onde melhorar.</p></div>'+
  '<form class="form" id="rvForm" novalidate>'+
  '<fieldset class="fs"><legend>Onde você foi atendido</legend>'+
    '<div class="field"><label for="rvShop">Barbearia</label><select id="rvShop" data-rv="shopId" style="width:100%"><option value="">Escolha uma barbearia</option>'+db.shops.map(function(x){return '<option value="'+x.id+'"'+(x.id===rv.shopId?' selected':'')+'>'+esc(x.name)+' ('+esc(x.city)+')</option>'}).join('')+'</select></div>'+
    (s?'<div class="cols"><div class="field"><label for="rvBarber">Barbeiro</label><select id="rvBarber" data-rv="barberId" style="width:100%"><option value="">Não lembro ou tanto faz</option>'+s.barbers.map(function(b){return '<option value="'+b.id+'"'+(b.id===rv.barberId?' selected':'')+'>'+esc(b.name)+'</option>'}).join('')+'</select></div>'+
    '<div class="field"><label for="rvSvc">Serviço</label><select id="rvSvc" data-rv="service" style="width:100%"><option value="">Escolha</option>'+s.services.map(function(x){return '<option'+(x.name===rv.service?' selected':'')+'>'+esc(x.name)+'</option>'}).join('')+'</select></div></div>':'')+
  '</fieldset>'+
  '<fieldset class="fs"><legend>Suas notas</legend>'+
    CRIT.map(function(c){return '<div class="rate-row"><span class="lab">'+c[1]+(c[0]==='atendimento'?' (obrigatório)':'')+'</span><div class="star-in" id="st-'+c[0]+'">'+starInput(c[0],rv.ratings[c[0]])+'</div></div>'}).join('')+
  '</fieldset>'+
  '<fieldset class="fs"><legend>Quer adicionar algo?</legend>'+
    '<div class="type-pick" role="radiogroup" aria-label="Tipo de mensagem">'+Object.keys(TYPES).map(function(k){return '<label><input type="radio" name="rvType" value="'+k+'" data-rv="type"'+(rv.type===k?' checked':'')+'><span>'+TYPES[k]+'</span></label>'}).join('')+'</div>'+
    '<div class="field"><label for="rvText">Comentário</label><textarea id="rvText" data-rv="text" maxlength="800" placeholder="'+esc(ph)+'">'+esc(rv.text)+'</textarea>'+(rv.type==='reclamacao'?'<small>Reclamações ficam públicas na aba Reclamações, e a barbearia pode responder.</small>':'')+'</div>'+
    '<div class="field"><label for="rvAuthor">Seu nome (opcional)</label><input id="rvAuthor" type="text" data-rv="author" maxlength="40" placeholder="Como quer aparecer" value="'+esc(rv.author)+'"></div>'+
    '<label class="check"><input type="checkbox" data-rv="confirm"'+(rv.confirm?' checked':'')+'><span>Fui atendido nesta barbearia e o que escrevi é verdadeiro.</span></label>'+
  '</fieldset>'+
  '<p class="err" id="rvErr" role="alert"></p>'+
  '<div><button class="btn" type="submit">Publicar avaliação</button></div></form>';
}
function submitReview(){
  var err=$('#rvErr'),s=shopById(rv.shopId);
  var fail=function(m){err.textContent=m};
  if(!me)return fail('Entre na sua conta para publicar a avaliação.');
  if(!s)return fail('Escolha a barbearia onde você foi atendido.');
  if(!rv.ratings.atendimento)return fail('Dê uma nota para o atendimento.');
  if(rv.type==='reclamacao'&&rv.text.trim().length<20)return fail('Para registrar uma reclamação, descreva o que aconteceu em pelo menos 20 caracteres.');
  if(!rv.confirm)return fail('Confirme que você foi atendido nesta barbearia.');
  var vals=CRIT.map(function(c){return rv.ratings[c[0]]}).filter(Boolean);
  var overall=vals.reduce(function(a,b){return a+b},0)/vals.length;
  db.reviews.push({id:uid(),userId:me.id,shopId:s.id,barberId:rv.barberId,service:rv.service,ratings:Object.assign({},rv.ratings),overall:overall,type:rv.type,text:rv.text.trim(),author:rv.author.trim()||me.name,date:today(),reply:'',status:rv.type==='reclamacao'?'Aguardando resposta':''});
  save();
  var id=s.id,t=rv.type;
  rv=blankReview('');
  toast(t==='reclamacao'?'Reclamação publicada. A barbearia foi avisada.':'Avaliação publicada. Obrigado!');
  go('shop',id);
}

/* ---------- Reclamações ---------- */
function viewComplaints(){
  var all=db.reviews.filter(function(r){return r.type==='reclamacao'});
  var st=function(s){return all.filter(function(r){return (r.status||'Aguardando resposta')===s}).length};
  var ans=all.filter(function(r){return r.reply}).length;
  var list=all.filter(function(r){
    var s=r.status||'Aguardando resposta';
    return ui.compStatus==='todas'||(ui.compStatus==='aguardando'&&s==='Aguardando resposta')||(ui.compStatus==='respondida'&&s==='Respondida')||(ui.compStatus==='resolvida'&&s==='Resolvida');
  }).slice().reverse();
  var rank=db.shops.map(function(s){var c=revsOf(s.id).filter(function(r){return r.type==='reclamacao'});return {s:s,n:c.length,a:c.filter(function(r){return r.reply}).length}}).filter(function(x){return x.n}).sort(function(a,b){return b.a/b.n-a.a/a.n});
  var tabs=[['todas','Todas'],['aguardando','Sem resposta'],['respondida','Respondidas'],['resolvida','Resolvidas']].map(function(t){return '<button class="chip" data-act="compstatus" data-s="'+t[0]+'" aria-pressed="'+(ui.compStatus===t[0])+'">'+t[1]+'</button>'}).join('');
  return '<div class="page-head"><h1>Reclamações</h1><p>Todo cliente pode registrar o que deu errado. Toda barbearia pode responder publicamente e resolver. O histórico fica aberto para quem vai escolher onde cortar.</p></div>'+
  '<div class="stats"><div class="stat"><b>'+all.length+'</b>reclamações</div><div class="stat"><b>'+(all.length?Math.round(ans/all.length*100):0)+'%</b>com resposta</div><div class="stat"><b>'+st('Resolvida')+'</b>resolvidas</div></div>'+
  '<div class="two" style="grid-template-columns:2fr 1fr;align-items:start"><div><div class="chips" style="margin-bottom:14px" role="group" aria-label="Filtrar por situação">'+tabs+'</div><div class="list">'+
  (list.length?list.map(function(r){return reviewCard(r,true)}).join(''):'<div class="empty"><h3>Nenhuma reclamação aqui</h3><p>Se algo deu errado no seu atendimento, registre para a barbearia responder.</p><button class="btn" data-act="go" data-view="review">Registrar reclamação</button></div>')+'</div></div>'+
  '<aside class="box"><h3>Quem mais responde</h3><ul class="rank">'+(rank.length?rank.map(function(x){return '<li><button class="link" data-act="open-shop" data-id="'+x.s.id+'">'+esc(x.s.name)+'</button><span>'+x.a+'/'+x.n+'</span></li>'}).join(''):'<li class="muted">Sem dados ainda.</li>')+'</ul></aside></div>';
}

/* ---------- Cadastrar ---------- */
function viewRegister(){
  if(!me||me.role!=='dono')return notOwnerGate('Esta área é para donos de barbearia','Sua conta é de cliente. Para cadastrar uma barbearia, crie uma conta de dono.');
  return '<div class="page-head"><h1>Cadastre sua barbearia</h1><p>Leva poucos minutos. Fotos, barbeiros e preços deixam o seu perfil muito mais convincente.</p></div>'+
  '<form class="form" id="regForm" novalidate>'+
  '<fieldset class="fs"><legend>Dados da barbearia</legend>'+
    '<div class="field"><label for="d-name">Nome</label><input id="d-name" type="text" data-draft="name" maxlength="60" value="'+esc(draft.name)+'"></div>'+
    '<div class="cols"><div class="field"><label for="d-city">Cidade</label><input id="d-city" type="text" data-draft="city" value="'+esc(draft.city)+'"></div><div class="field"><label for="d-nb">Bairro</label><input id="d-nb" type="text" data-draft="neighborhood" value="'+esc(draft.neighborhood)+'"></div></div>'+
    '<div class="field"><label for="d-addr">Endereço</label><input id="d-addr" type="text" data-draft="address" placeholder="Rua e número" value="'+esc(draft.address)+'"></div>'+
    '<div class="cols"><div class="field"><label for="d-ph">Telefone ou WhatsApp</label><input id="d-ph" type="tel" data-draft="phone" value="'+esc(draft.phone)+'"></div><div class="field"><label for="d-ig">Instagram</label><input id="d-ig" type="text" data-draft="instagram" placeholder="@suabarbearia" value="'+esc(draft.instagram)+'"></div></div>'+
    '<div class="field"><label for="d-hr">Horário de funcionamento</label><input id="d-hr" type="text" data-draft="hours" placeholder="Ex.: Seg a sáb, 9h às 19h" value="'+esc(draft.hours)+'"></div>'+
    '<div class="field"><span class="lab">Dias de atendimento (usados nos agendamentos)</span><div class="chips">'+DIAS.map(function(n,i){return '<button type="button" class="chip" data-act="dday" data-d="'+i+'" aria-pressed="'+(draft.schedule.days.indexOf(i)>=0)+'">'+n+'</button>'}).join('')+'</div></div>'+
    '<div class="cols"><div class="field"><label for="d-open">Abre às</label><input id="d-open" type="time" data-sched="open" value="'+esc(draft.schedule.open)+'"></div><div class="field"><label for="d-close">Fecha às</label><input id="d-close" type="time" data-sched="close" value="'+esc(draft.schedule.close)+'"></div></div>'+
    '<div class="field"><label for="d-desc">Sobre a barbearia</label><textarea id="d-desc" data-draft="desc" maxlength="400" placeholder="O que faz a sua barbearia diferente?">'+esc(draft.desc)+'</textarea></div>'+
    '<div class="field"><span class="lab">O que vocês fazem</span><div class="chips" id="tagPick">'+TAGS.map(function(t){return '<button type="button" class="chip" data-act="dtag" data-tag="'+t+'" aria-pressed="'+(draft.tags.indexOf(t)>=0)+'">'+t+'</button>'}).join('')+'</div></div>'+
  '</fieldset>'+
  '<fieldset class="fs"><legend>Fotos</legend><p class="muted">Até 6 fotos do espaço e dos cortes. A primeira vira a capa.</p><div class="photos" id="photoGrid"></div></fieldset>'+
  '<fieldset class="fs"><legend>Barbeiros</legend><div id="barberList" class="list" style="gap:10px"></div>'+
    '<div class="mini b"><div class="field"><span class="lab">Foto</span><label class="thumb add" style="width:64px;aspect-ratio:1" id="bPrev">+<input class="sr" type="file" accept="image/*" data-file="barber"></label></div><div class="field"><label for="bName">Nome</label><input id="bName" type="text" maxlength="30"></div><div class="field"><label for="bSpec">Especialidade</label><input id="bSpec" type="text" maxlength="50" placeholder="Ex.: degradê, barba"></div><button type="button" class="btn navy" data-act="add-barber">Adicionar</button></div>'+
  '</fieldset>'+
  '<fieldset class="fs"><legend>Serviços e preços</legend><div id="serviceList" class="list" style="gap:10px"></div>'+
    '<div class="mini s"><div class="field"><label for="sName">Serviço</label><input id="sName" type="text" maxlength="40" placeholder="Ex.: Corte"></div><div class="field"><label for="sPrice">Preço (R$)</label><input id="sPrice" type="number" min="0" step="0.01" inputmode="decimal"></div><div class="field"><label for="sMin">Duração</label><select id="sMin" style="width:100%"><option value="30">30 min</option><option value="45">45 min</option><option value="60">1 hora</option><option value="90">1h30</option><option value="120">2 horas</option></select></div><button type="button" class="btn navy" data-act="add-service">Adicionar</button></div>'+
  '</fieldset>'+
  '<p class="err" id="regErr" role="alert"></p>'+
  '<div><button class="btn" type="submit">Publicar barbearia</button></div></form>';
}
function paintDraft(){
  var pg=$('#photoGrid');
  if(pg)pg.innerHTML=draft.photos.map(function(p,i){return '<div class="thumb"><img src="'+p+'" alt="Foto '+(i+1)+'"><button type="button" class="x" data-act="rm-photo" data-i="'+i+'" aria-label="Remover foto '+(i+1)+'">×</button></div>'}).join('')+(draft.photos.length<6?'<label class="thumb add">+ Foto<input class="sr" type="file" accept="image/*" multiple data-file="shop"></label>':'');
  var bl=$('#barberList');
  if(bl)bl.innerHTML=draft.barbers.length?draft.barbers.map(function(b,i){return '<div class="row-item">'+avatar(b)+'<div class="grow"><b>'+esc(b.name)+'</b><div class="muted" style="font-size:.85rem">'+esc(b.spec)+'</div></div><button type="button" class="link" data-act="rm-barber" data-i="'+i+'">Remover</button></div>'}).join(''):'<p class="muted">Nenhum barbeiro adicionado ainda.</p>';
  var sl=$('#serviceList');
  if(sl)sl.innerHTML=draft.services.length?draft.services.map(function(x,i){return '<div class="row-item"><div class="grow"><b>'+esc(x.name)+'</b><div class="muted" style="font-size:.85rem">'+durLabel(x.min||30)+'</div></div><span>'+money(x.price)+'</span><button type="button" class="link" data-act="rm-service" data-i="'+i+'">Remover</button></div>'}).join(''):'<p class="muted">Nenhum serviço adicionado ainda.</p>';
  paintBarberPrev();
}
function paintBarberPrev(){
  var p=$('#bPrev');if(!p)return;
  p.innerHTML=(draftBarberPhoto?'<img src="'+draftBarberPhoto+'" alt="Foto do barbeiro" style="width:100%;height:100%;object-fit:cover">':'+')+'<input class="sr" type="file" accept="image/*" data-file="barber">';
}
function readImage(file,max){
  return new Promise(function(res,rej){
    var fr=new FileReader();
    fr.onerror=rej;
    fr.onload=function(){
      var img=new Image();
      img.onerror=rej;
      img.onload=function(){
        var k=Math.min(1,max/Math.max(img.width,img.height)),c=document.createElement('canvas');
        c.width=Math.round(img.width*k);c.height=Math.round(img.height*k);
        c.getContext('2d').drawImage(img,0,0,c.width,c.height);
        res(c.toDataURL('image/jpeg',.72));
      };
      img.src=fr.result;
    };
    fr.readAsDataURL(file);
  });
}
function submitRegister(){
  if(!me||me.role!=='dono')return;
  var err=$('#regErr'),fail=function(m){err.textContent=m};
  if(!draft.name.trim())return fail('Informe o nome da barbearia.');
  if(!draft.city.trim()||!draft.neighborhood.trim())return fail('Informe cidade e bairro.');
  if(!draft.address.trim())return fail('Informe o endereço.');
  if(!draft.barbers.length)return fail('Adicione pelo menos um barbeiro.');
  if(!draft.services.length)return fail('Adicione pelo menos um serviço com preço.');
  if(!draft.schedule.days.length)return fail('Escolha pelo menos um dia de atendimento.');
  if(!draft.schedule.open||!draft.schedule.close||hm2min(draft.schedule.close)<=hm2min(draft.schedule.open))return fail('Informe o horário de abertura e um fechamento depois dele.');
  var s=Object.assign({id:uid(),promo:null,ownerId:me.id},draft,{tags:draft.tags.length?draft.tags:['Corte']});
  s.name=s.name.trim();s.desc=s.desc.trim()||'Barbearia cadastrada no Barber Connect.';
  db.shops.push(s);save();
  draft=blankDraft();draftBarberPhoto='';
  toast('Barbearia publicada! Que tal divulgar nas redes?');
  go('shop',s.id);
}

/* ---------- Agendamento ---------- */
function busy(shop,barberId,date,start,dur){
  return db.bookings.some(function(b){
    if(b.status!=='confirmado'||b.shopId!==shop.id||b.barberId!==barberId||b.date!==date)return false;
    var bs=hm2min(b.time);
    return start<bs+b.min&&bs<start+dur;
  });
}
function freeBarbers(shop,date,start,dur,pref){
  var list=pref?shop.barbers.filter(function(b){return b.id===pref}):shop.barbers;
  return list.filter(function(b){return !busy(shop,b.id,date,start,dur)});
}
function userBusy(uid_,date,start,dur){
  return db.bookings.some(function(b){
    if(b.status!=='confirmado'||b.userId!==uid_||b.date!==date)return false;
    var bs=hm2min(b.time);
    return start<bs+b.min&&bs<start+dur;
  });
}
function slotsFor(shop,date,dur,pref){
  var d=parseYmd(date),sc=shop.schedule,out=[];
  if(sc.days.indexOf(d.getDay())<0)return out;
  var now=new Date(),isToday=ymd(now)===date,nm=now.getHours()*60+now.getMinutes();
  var o=hm2min(sc.open),c=hm2min(sc.close);
  for(var m=o;m+dur<=c;m+=30){
    out.push({t:min2hm(m),ok:!(isToday&&m<=nm)&&freeBarbers(shop,date,m,dur,pref).length>0});
  }
  return out;
}
function bookDays(shop){
  var out=[],now=new Date();
  for(var i=0;i<14;i++){
    var d=new Date(now.getFullYear(),now.getMonth(),now.getDate()+i);
    out.push({date:ymd(d),dow:i===0?'hoje':DIAS[d.getDay()],n:d.getDate(),open:shop.schedule.days.indexOf(d.getDay())>=0});
  }
  return out;
}
function fixTime(){
  if(!bk.time)return;
  var s=shopById(bk.shopId),svc=s&&s.services[bk.svc];
  if(!svc||!bk.date){bk.time='';return}
  var ok=slotsFor(s,bk.date,svc.min,bk.barberId).filter(function(x){return x.t===bk.time&&x.ok}).length;
  if(!ok)bk.time='';
}
function viewBook(){
  var s=shopById(bk.shopId);
  if(!s)return viewGate('Escolha uma barbearia','Abra a página de uma barbearia e toque em Agendar horário.','<button class="btn" data-act="go" data-view="home">Ver barbearias</button>');
  var svc=bk.svc>=0?s.services[bk.svc]:null;
  var barber=bk.barberId?s.barbers.filter(function(b){return b.id===bk.barberId})[0]:null;
  var h='<button class="link back" data-act="open-shop" data-id="'+s.id+'">Voltar para '+esc(s.name)+'</button>'+
   '<div class="page-head" style="padding-top:8px"><h1>Agendar horário</h1><p>'+esc(s.name)+', '+esc(s.neighborhood)+', '+esc(s.city)+'</p></div><div class="form" style="max-width:760px">';
  h+='<fieldset class="fs"><legend>Serviço</legend><div class="opts">'+s.services.map(function(x,i){return '<button type="button" class="opt" data-act="bk-svc" data-i="'+i+'" aria-pressed="'+(bk.svc===i)+'"><span><b>'+esc(x.name)+'</b><small>'+durLabel(x.min||30)+'</small></span><b>'+money(x.price)+'</b></button>'}).join('')+'</div></fieldset>';
  h+='<fieldset class="fs"><legend>Barbeiro</legend><div class="chips"><button type="button" class="chip" data-act="bk-barber" data-b="" aria-pressed="'+(bk.barberId==='')+'">Qualquer barbeiro</button>'+s.barbers.map(function(b){return '<button type="button" class="chip" data-act="bk-barber" data-b="'+b.id+'" aria-pressed="'+(bk.barberId===b.id)+'">'+esc(b.name)+'</button>'}).join('')+'</div></fieldset>';
  if(!svc){
    h+='<p class="muted">Escolha o serviço para ver os dias e horários livres.</p>';
  }else{
    h+='<fieldset class="fs"><legend>Dia</legend><div class="days">'+bookDays(s).map(function(d){return '<button type="button" class="day" data-act="bk-day" data-date="'+d.date+'" aria-pressed="'+(bk.date===d.date)+'"'+(d.open?'':' disabled aria-label="Fechado"')+'><b>'+d.n+'</b>'+d.dow+'</button>'}).join('')+'</div><small class="muted">Dias em cinza: a barbearia não atende.</small></fieldset>';
    if(bk.date){
      var sl=slotsFor(s,bk.date,svc.min,bk.barberId),any=sl.some(function(x){return x.ok});
      h+='<fieldset class="fs"><legend>Horário</legend>'+(any?'<div class="slots">'+sl.map(function(x){return '<button type="button" class="slot" data-act="bk-time" data-t="'+x.t+'" aria-pressed="'+(bk.time===x.t)+'"'+(x.ok?'':' disabled')+'>'+x.t+'</button>'}).join('')+'</div><small class="muted">Horários riscados já estão ocupados.</small>':'<p class="muted">Sem horários livres neste dia. Tente outro dia'+(bk.barberId?' ou outro barbeiro':'')+'.</p>')+'</fieldset>';
    }
  }
  var ready=svc&&bk.date&&bk.time;
  h+='<div class="box"><h3>Resumo</h3><dl class="sumdl"><dt>Serviço</dt><dd>'+(svc?esc(svc.name)+' ('+durLabel(svc.min||30)+')':'-')+'</dd><dt>Barbeiro</dt><dd>'+(barber?esc(barber.name):'Qualquer barbeiro livre')+'</dd><dt>Quando</dt><dd>'+(bk.date&&bk.time?fmtDate(bk.date)+' às '+bk.time:'-')+'</dd></dl>'+
   '<p class="err" id="bkErr" role="alert"></p><div class="sum"><div><span class="muted">Total</span><div class="total">'+(svc?money(svc.price):'-')+'</div></div><button class="btn" data-act="bk-confirm"'+(ready?'':' disabled')+'>Confirmar agendamento</button></div>'+
   '<p class="note" style="margin-top:14px">O pagamento é feito na barbearia. Você pode cancelar em Agendamentos.</p></div></div>';
  return h;
}
function userById(id){return db.users.filter(function(u){return u.id===id})[0]}
function bkSort(a,b){return (a.date+a.time)<(b.date+b.time)?-1:1}
function bkState(b){
  if(b.status==='cancelado')return 'cancelado';
  var d=parseYmd(b.date),m=hm2min(b.time)+b.min;
  d.setHours(Math.floor(m/60),m%60,0,0);
  return d<new Date()?'realizado':'confirmado';
}
function bookingCard(b,agenda){
  var s=shopById(b.shopId)||{name:'Barbearia',barbers:[]},br=s.barbers.filter(function(x){return x.id===b.barberId})[0],st=bkState(b),u=agenda?userById(b.userId):null;
  var labels={confirmado:'Confirmado',realizado:'Realizado',cancelado:'Cancelado'};
  var canCancel=st==='confirmado'&&(agenda||(me&&b.userId===me.id));
  var canReview=st==='realizado'&&!agenda;
  return '<article class="rev"><div class="rev-head"><strong>'+esc(s.name)+'</strong><span class="pill '+st+'">'+labels[st]+'</span></div>'+
   '<div class="rev-meta"><span>'+fmtDate(b.date)+' às '+b.time+'</span><span>Serviço: '+esc(b.service)+'</span>'+(br?'<span>Barbeiro: '+esc(br.name)+'</span>':'')+'<span>'+money(b.price)+'</span>'+(u?'<span>Cliente: '+esc(u.name)+'</span>':'')+'</div>'+
   ((canCancel||canReview)?'<div class="acts">'+(canCancel?'<button class="link" data-act="bk-cancel" data-id="'+b.id+'">Cancelar agendamento</button>':'')+(canReview?'<button class="link" data-act="go" data-view="review" data-id="'+b.shopId+'">Avaliar atendimento</button>':'')+'</div>':'')+'</article>';
}
function viewBookings(){
  var mine=db.bookings.filter(function(b){return b.userId===me.id}).sort(bkSort);
  var up=mine.filter(function(b){return bkState(b)==='confirmado'}),past=mine.filter(function(b){return bkState(b)!=='confirmado'}).reverse();
  var h='<div class="page-head"><h1>Agendamentos</h1><p>Seus horários marcados nas barbearias. Depois do corte, você pode avaliar o atendimento por aqui.</p></div>';
  if(me.role==='dono'){
    var ids=db.shops.filter(isOwner).map(function(s){return s.id});
    var ag=db.bookings.filter(function(b){return ids.indexOf(b.shopId)>=0&&bkState(b)==='confirmado'}).sort(bkSort);
    h+='<section class="section" style="padding-top:0"><h2>Agenda das minhas barbearias</h2><div class="list" style="margin-top:14px">'+(ag.length?ag.map(function(b){return bookingCard(b,true)}).join(''):'<div class="empty"><p>Nenhum horário marcado nas suas barbearias por enquanto.</p></div>')+'</div></section>';
  }
  h+='<section class="section" style="padding-top:0"><h2>Meus horários</h2><div class="list" style="margin-top:14px">'+(up.length?up.map(function(b){return bookingCard(b,false)}).join(''):'<div class="empty"><h3>Nenhum horário marcado</h3><p>Escolha uma barbearia e reserve o seu horário.</p><button class="btn" data-act="go" data-view="home">Ver barbearias</button></div>')+'</div></section>';
  if(past.length)h+='<section class="section" style="padding-top:0"><h2>Histórico</h2><div class="list" style="margin-top:14px">'+past.map(function(b){return bookingCard(b,false)}).join('')+'</div></section>';
  return h;
}

/* ---------- Login ---------- */
function viewGate(title,text,btns){
  return '<div class="empty" style="margin-top:40px"><h3>'+title+'</h3><p>'+text+'</p>'+btns+'</div>';
}
function notOwnerGate(title,text){
  return viewGate(title,text,'<button class="btn" data-act="logout-create">Criar conta de dono</button>');
}
function viewLogin(){
  var criar=auth.mode==='criar';
  return '<div class="page-head"><h1>'+(criar?'Criar conta':'Entrar')+'</h1><p>'+(auth.msg?esc(auth.msg):(criar?'Com uma conta você avalia atendimentos ou cadastra e divulga a sua barbearia.':'Entre para avaliar atendimentos ou cuidar da sua barbearia.'))+'</p></div>'+
  '<div class="chips" style="margin-bottom:16px" role="group" aria-label="Entrar ou criar conta"><button class="chip" data-act="authmode" data-m="entrar" aria-pressed="'+(!criar)+'">Já tenho conta</button><button class="chip" data-act="authmode" data-m="criar" aria-pressed="'+criar+'">Criar conta</button></div>'+
  '<form class="form" id="authForm" style="max-width:460px" novalidate><fieldset class="fs"><legend>'+(criar?'Seus dados':'Sua conta')+'</legend>'+
  (criar?'<div class="field"><label for="a-name">Nome</label><input id="a-name" type="text" maxlength="40" autocomplete="name"></div>':'')+
  '<div class="field"><label for="a-email">E-mail</label><input id="a-email" type="email" autocomplete="email" inputmode="email"></div>'+
  '<div class="field"><label for="a-pw">Senha</label><input id="a-pw" type="password" autocomplete="'+(criar?'new-password':'current-password')+'">'+(criar?'<small>Mínimo de 6 caracteres.</small>':'')+'</div>'+
  '<label class="check"><input type="checkbox" data-showpw="1"><span>Mostrar senha</span></label>'+
  (criar?'<div class="field"><span class="lab">Tipo de conta</span><div class="type-pick" style="grid-template-columns:repeat(2,1fr)" role="radiogroup" aria-label="Tipo de conta"><label><input type="radio" name="aRole" value="cliente" checked><span>Sou cliente</span></label><label><input type="radio" name="aRole" value="dono"><span>Sou dono de barbearia</span></label></div><small>Clientes avaliam atendimentos. Donos cadastram a barbearia, respondem reclamações e contratam divulgação.</small></div>':'')+
  '</fieldset><p class="err" id="authErr" role="alert"></p><div><button class="btn" type="submit">'+(criar?'Criar conta':'Entrar')+'</button></div></form>'+
  (criar?'':'<div class="note" style="max-width:460px;margin-top:20px">Contas de teste, senha 123456: <button class="link" data-act="fill" data-e="cliente@teste.com">cliente@teste.com</button> e <button class="link" data-act="fill" data-e="dono@teste.com">dono@teste.com</button> (dono da Dom Bigode e da Barbearia do Zé). As contas ficam só neste navegador. No app real, a senha é verificada no servidor.</div>');
}

/* ---------- Divulgar ---------- */
function viewPromote(){
  if(!me||me.role!=='dono')return notOwnerGate('Esta área é para donos de barbearia','Sua conta é de cliente. Para divulgar uma barbearia, crie uma conta de dono.');
  var own=db.shops.filter(function(s){return s.ownerId===me.id});
  if(!own.length)return viewGate('Você ainda não tem barbearia cadastrada','Cadastre sua barbearia primeiro. Depois é só escolher um plano de divulgação.','<button class="btn" data-act="go" data-view="register">Cadastrar barbearia</button>');
  if(!own.some(function(s){return s.id===pm.shopId}))pm.shopId=own.length===1?own[0].id:'';
  var plan=PLANS[pm.plan];
  if(pm.nets.length>plan.maxNet)pm.nets=pm.nets.slice(0,plan.maxNet);
  var active=own.filter(function(s){return s.promo});
  return '<div class="page-head"><h1>Divulgue sua barbearia</h1><p>Apareça primeiro na busca do Barber Connect e, se quiser, a nossa equipe publica sobre a sua barbearia no Instagram, Facebook, YouTube e TikTok.</p></div>'+
  '<form class="form" id="pmForm" style="max-width:none" novalidate>'+
  '<fieldset class="fs" style="max-width:760px"><legend>Qual barbearia</legend><div class="field"><label for="pmShop">Barbearia</label><select id="pmShop" data-pm="shopId" style="width:100%"><option value="">Escolha uma barbearia</option>'+own.map(function(s){return '<option value="'+s.id+'"'+(s.id===pm.shopId?' selected':'')+'>'+esc(s.name)+' ('+esc(s.city)+')</option>'}).join('')+'</select></div></fieldset>'+
  '<div class="plans" role="radiogroup" aria-label="Plano">'+Object.keys(PLANS).map(function(k){var p=PLANS[k];return '<label class="plan">'+(k==='redes'?'<span class="tag">Mais escolhido</span>':'')+'<input type="radio" name="plan" value="'+k+'" data-pm="plan"'+(pm.plan===k?' checked':'')+'><div class="in"><h3>'+p.name+'</h3><div><span class="price">'+money(p.price)+'</span> <span class="muted">'+p.per+'</span></div><ul>'+p.items.map(function(i){return '<li>'+i+'</li>'}).join('')+'</ul></div></label>'}).join('')+'</div>'+
  '<fieldset class="fs" style="max-width:760px"><legend>Redes sociais</legend>'+(plan.maxNet?'<p class="muted">Escolha '+(plan.maxNet===1?'1 rede':'até '+plan.maxNet+' redes')+' para a divulgação.</p><div class="chips">'+NETS.map(function(n){var on=pm.nets.indexOf(n)>=0;return '<button type="button" class="chip" data-act="net" data-n="'+n+'" aria-pressed="'+on+'">'+n+'</button>'}).join('')+'</div>':'<p class="muted">O plano Vitrine divulga só dentro do Barber Connect. Escolha Redes ou Campanha para publicar nas redes sociais.</p>')+'</fieldset>'+
  '<div class="box sum" style="max-width:760px"><div><span class="muted">Total</span><div class="total">'+money(plan.price)+' <span class="muted" style="font:400 1rem var(--body)">'+plan.per+'</span></div></div><button class="btn" type="submit">Solicitar divulgação</button></div>'+
  '<p class="err" id="pmErr" role="alert" style="max-width:760px"></p>'+
  '<p class="note" style="max-width:760px">Planos, preços e entregas são exemplos para o protótipo. O pagamento é simulado: ao solicitar, a barbearia já recebe o selo Destaque. Na versão real, liga-se o Pix ou cartão (Mercado Pago, Stripe, Asaas) antes de ativar.</p></form>'+
  (active.length?'<div class="section"><h2>Divulgações ativas</h2><div class="list" style="margin-top:14px;max-width:760px">'+active.map(function(s){return '<div class="row-item"><div class="grow"><button class="link" data-act="open-shop" data-id="'+s.id+'">'+esc(s.name)+'</button><div class="muted" style="font-size:.85rem">Plano '+PLANS[s.promo.plan].name+(s.promo.nets.length?' em '+esc(s.promo.nets.join(', ')):'')+', desde '+esc(s.promo.start)+'</div></div><button class="link" data-act="end-promo" data-id="'+s.id+'">Encerrar</button></div>'}).join('')+'</div></div>':'');
}

/* ---------- eventos ---------- */
document.addEventListener('click',function(e){
  var t=e.target.closest('[data-act]');if(!t)return;
  var a=t.dataset.act,d=t.dataset;
  if(a==='go'){go(d.view,d.id)}
  else if(a==='open-shop'){go('shop',d.id)}
  else if(a==='logout'){logout()}
  else if(a==='dday'){var di=+d.d,dx=draft.schedule.days.indexOf(di);if(dx>=0)draft.schedule.days.splice(dx,1);else draft.schedule.days.push(di);t.setAttribute('aria-pressed',dx<0)}
  else if(a==='bk-svc'){bk.svc=+d.i;fixTime();render()}
  else if(a==='bk-barber'){bk.barberId=d.b||'';fixTime();render()}
  else if(a==='bk-day'){bk.date=d.date;bk.time='';render()}
  else if(a==='bk-time'){bk.time=d.t;render()}
  else if(a==='bk-cancel'){
    var bb=db.bookings.filter(function(x){return x.id===d.id})[0];
    if(!bb||!me||!(bb.userId===me.id||isOwner(shopById(bb.shopId)))){toast('Você não pode cancelar este agendamento.');return}
    bb.status='cancelado';save();toast('Agendamento cancelado.');render();
  }
  else if(a==='bk-confirm'){
    var bs=shopById(bk.shopId),bsvc=bs&&bs.services[bk.svc],berr=$('#bkErr');
    if(!me||!bsvc||!bk.date||!bk.time){berr.textContent='Escolha serviço, dia e horário.';return}
    var bm=hm2min(bk.time),now=new Date();
    if(ymd(now)===bk.date&&bm<=now.getHours()*60+now.getMinutes()){bk.time='';toast('Esse horário já passou. Escolha outro.');render();return}
    var fb=freeBarbers(bs,bk.date,bm,bsvc.min,bk.barberId);
    if(!fb.length){bk.time='';toast('Esse horário acabou de ser ocupado. Escolha outro.');render();return}
    if(userBusy(me.id,bk.date,bm,bsvc.min)){berr.textContent='Você já tem um agendamento nesse horário.';return}
    db.bookings.push({id:uid(),userId:me.id,shopId:bs.id,barberId:fb[0].id,service:bsvc.name,price:bsvc.price,min:bsvc.min,date:bk.date,time:bk.time,status:'confirmado',created:today()});
    save();bk=blankBook('');toast('Horário agendado!');go('bookings');
  }
  else if(a==='logout-create'){me=null;writeSess(null);go('login');auth.mode='criar';auth.msg='Crie uma conta de dono para cadastrar e divulgar sua barbearia.';render()}
  else if(a==='authmode'){auth.mode=d.m;auth.msg='';render()}
  else if(a==='fill'){$('#a-email').value=d.e;$('#a-pw').value='123456'}
  else if(a==='tag'){ui.tag=d.tag;render()}
  else if(a==='gal'){ui.gal=+d.i;render()}
  else if(a==='revtab'){ui.revTab=d.t;render()}
  else if(a==='compstatus'){ui.compStatus=d.s;render()}
  else if(a==='rate'){rv.ratings[d.key]=+d.val;$('#st-'+d.key).innerHTML=starInput(d.key,+d.val)}
  else if(a==='reply-toggle'){var b=$('#reply-'+d.id);b.hidden=!b.hidden;if(!b.hidden)$('#rt-'+d.id).focus()}
  else if(a==='reply-send'){
    var txt=$('#rt-'+d.id).value.trim();
    if(txt.length<5){toast('Escreva uma resposta um pouco maior.');return}
    var r=db.reviews.filter(function(x){return x.id===d.id})[0];if(!isOwner(shopById(r.shopId))){toast('Só o dono da barbearia pode responder.');return}r.reply=txt;if(r.status!=='Resolvida')r.status='Respondida';
    save();toast('Resposta publicada.');render();
  }
  else if(a==='resolve'){
    var r2=db.reviews.filter(function(x){return x.id===d.id})[0];if(!(isOwner(shopById(r2.shopId))||(me&&r2.userId===me.id))){toast('Só quem fez a reclamação ou o dono pode marcar como resolvido.');return}r2.status='Resolvida';save();toast('Marcada como resolvida.');render();
  }
  else if(a==='dtag'){var i=draft.tags.indexOf(d.tag);if(i>=0)draft.tags.splice(i,1);else draft.tags.push(d.tag);t.setAttribute('aria-pressed',i<0)}
  else if(a==='rm-photo'){draft.photos.splice(+d.i,1);paintDraft()}
  else if(a==='rm-barber'){draft.barbers.splice(+d.i,1);paintDraft()}
  else if(a==='rm-service'){draft.services.splice(+d.i,1);paintDraft()}
  else if(a==='add-barber'){
    var n=$('#bName').value.trim();if(!n){toast('Informe o nome do barbeiro.');$('#bName').focus();return}
    draft.barbers.push({id:uid(),name:n,spec:$('#bSpec').value.trim()||'Barbeiro',photo:draftBarberPhoto});
    draftBarberPhoto='';paintDraft();$('#bName').value='';$('#bSpec').value='';$('#bName').focus();
  }
  else if(a==='add-service'){
    var sn=$('#sName').value.trim(),sp=parseFloat($('#sPrice').value);
    if(!sn||isNaN(sp)||sp<0){toast('Informe o nome do serviço e um preço válido.');return}
    draft.services.push({name:sn,price:sp,min:+$('#sMin').value||30});paintDraft();$('#sName').value='';$('#sPrice').value='';$('#sName').focus();
  }
  else if(a==='net'){
    var max=PLANS[pm.plan].maxNet,ix=pm.nets.indexOf(d.n);
    if(ix>=0)pm.nets.splice(ix,1);
    else if(pm.nets.length>=max){if(max===1)pm.nets=[d.n];else{toast('Este plano inclui até '+max+' redes.');return}}
    else pm.nets.push(d.n);
    render();
  }
  else if(a==='end-promo'){var s=shopById(d.id);if(!isOwner(s))return;s.promo=null;save();toast('Divulgação encerrada.');render()}
});

document.addEventListener('input',function(e){
  var t=e.target;
  if(t.dataset.ui==='q'){ui.q=t.value;paintResults()}
  else if(t.dataset.sched){draft.schedule[t.dataset.sched]=t.value}
  else if(t.dataset.draft){draft[t.dataset.draft]=t.value}
  else if(t.dataset.rv&&(t.type==='text'||t.tagName==='TEXTAREA')){rv[t.dataset.rv]=t.value}
});

document.addEventListener('change',function(e){
  var t=e.target;
  if(t.dataset.showpw){var pw=$('#a-pw');if(pw)pw.type=t.checked?'text':'password'}
  else if(t.dataset.ui==='sort'){ui.sort=t.value;paintResults()}
  else if(t.dataset.rv){
    var k=t.dataset.rv;
    if(t.type==='checkbox'){rv[k]=t.checked}
    else{rv[k]=t.value}
    if(k==='shopId'){rv.barberId='';rv.service=''}
    if(k==='shopId'||k==='type')render();
  }
  else if(t.dataset.pm){
    pm[t.dataset.pm]=t.value;
    if(t.dataset.pm==='plan')pm.nets=pm.nets.slice(0,PLANS[pm.plan].maxNet);
    render();
  }
  else if(t.dataset.file==='shop'){
    var files=Array.prototype.slice.call(t.files).slice(0,6-draft.photos.length);
    Promise.all(files.map(function(f){return readImage(f,900)})).then(function(imgs){draft.photos=draft.photos.concat(imgs);paintDraft()}).catch(function(){toast('Não foi possível ler essa imagem.')});
  }
  else if(t.dataset.file==='barber'&&t.files[0]){
    readImage(t.files[0],320).then(function(img){draftBarberPhoto=img;paintBarberPrev()}).catch(function(){toast('Não foi possível ler essa imagem.')});
  }
});

document.addEventListener('submit',function(e){
  e.preventDefault();
  var id=e.target.id;
  if(id==='rvForm')submitReview();
  else if(id==='regForm')submitRegister();
  else if(id==='authForm'){
    var aerr=$('#authErr'),email=$('#a-email').value.trim().toLowerCase(),pw=$('#a-pw').value,u;
    if(auth.mode==='criar'){
      var name=$('#a-name').value.trim(),chk=document.querySelector('input[name=aRole]:checked'),role=chk?chk.value:'cliente';
      if(name.length<2){aerr.textContent='Informe seu nome.';return}
      if(!/^\S+@\S+\.\S+$/.test(email)){aerr.textContent='Informe um e-mail válido.';return}
      if(pw.length<6){aerr.textContent='A senha precisa ter pelo menos 6 caracteres.';return}
      if(userByEmail(email)){aerr.textContent='Já existe uma conta com este e-mail. Use a aba "Já tenho conta".';return}
      var salt=uid();
      u={id:uid(),name:name,email:email,role:role,salt:salt,hash:hashPw(salt,pw)};
      db.users.push(u);save();loginAs(u);
    }else{
      u=userByEmail(email);
      if(!u||u.hash!==hashPw(u.salt,pw)){aerr.textContent='E-mail ou senha incorretos.';return}
      loginAs(u);
    }
  }
  else if(id==='pmForm'){
    var err=$('#pmErr'),plan=PLANS[pm.plan];
    if(!pm.shopId){err.textContent='Escolha a barbearia que será divulgada.';return}
    if(plan.maxNet&&!pm.nets.length){err.textContent='Escolha '+(plan.maxNet===1?'a rede social':'pelo menos uma rede social')+' para a divulgação.';return}
    var s=shopById(pm.shopId);
    s.promo={plan:pm.plan,nets:pm.nets.slice(),status:'ativa',start:today()};
    save();toast('Divulgação ativada para '+s.name+'.');
    var sid=s.id;pm={shopId:'',plan:'redes',nets:[]};go('shop',sid);
  }
});
document.addEventListener('keydown',function(e){
  if(e.key==='Enter'&&e.target.matches('input[type=text],input[type=tel],input[type=number]')&&e.target.closest('#regForm')&&!e.target.closest('.mini')){e.preventDefault()}
  else if(e.key==='Enter'&&e.target.closest('.mini')){
    e.preventDefault();var b=e.target.closest('.mini').querySelector('[data-act^="add-"]');if(b)b.click();
  }
});

render();
})();
