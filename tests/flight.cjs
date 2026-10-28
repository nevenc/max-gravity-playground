const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');const elements={};function el(id){return elements[id]??={value:'1',checked:true,style:{},dataset:{},classList:{toggle(){},remove(){}},addEventListener(){},setAttribute(){},getBoundingClientRect(){return{width:900,height:760,left:0,top:0}},getContext(){return{setTransform(){}}}}}const savedData={};const s={localStorage:{getItem(key){return savedData[key]||null},setItem(key,value){savedData[key]=value}},document:{querySelector:el,querySelectorAll(){return[]},addEventListener(){}},window:{addEventListener(){}},ResizeObserver:class{observe(){}},devicePixelRatio:1,requestAnimationFrame(){},setTimeout(){},clearTimeout(){},Math,console,assert};vm.createContext(s);for(const file of ['app.js','flight.js','missions.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../src',file),'utf8'),s);vm.runInContext(`
startFlight();assert.equal(flightState,'rescue');assert.equal(speed,1);assert.equal(paused,false);
let oldAngle=ship.angle;keys.add('ArrowRight');stepFlight(.05);assert(ship.angle>oldAngle);keys.clear();
let previous={...ship};keys.add('ArrowUp');stepFlight(.05);assert(Math.hypot(ship.vx-previous.vx,ship.vy-previous.vy)>0);keys.clear();
ship.x=astronaut.x;ship.y=astronaut.y;ship.vx=astronaut.vx;ship.vy=astronaut.vy;stepFlight(.001);assert.equal(flightState,'return');
ship.x=station.x;ship.y=station.y;ship.vx=station.vx;ship.vy=station.vy;stepFlight(.001);assert.equal(flightState,'won');
startFlight();ship.x=0;ship.y=0;stepFlight(.001);assert.equal(flightState,'crashed');
startFlight();ship.x=10000;stepFlight(.001);assert.equal(flightState,'lost');
startFlight();reset();assert.equal(ship,null);assert.equal(flightState,'ready');
startFlight();for(let i=0;i<1000;i++)step(.008);assert(Number.isFinite(ship.x));assert(Number.isFinite(station.x));
console.log('PASS: launch, rotate, thrust, pickup, dock, collision, escape, reset, gravity stability');
`,s);

vm.runInContext(`
startMission('orbits');assert.equal(activeMission,'orbits');
for(let i=0;i<3;i++){orbit(130+i*45,1,'rock',i*2);progress()}
updateMission(10);assert.equal(missionElapsed,10);
bodies=bodies.filter(b=>!b.playerCreated||b===bodies.find(x=>x.playerCreated));updateMission(.1);assert.equal(missionElapsed,0);
for(let i=0;i<2;i++){orbit(150+i*50,1,'rock',i*2);progress()}
updateMission(30);assert.equal(missionPhase,'won');assert.equal(earnedStars.orbits,true);
startMission('rescue');flightState='return';updateMission(0);assert.equal(missionPhase,'active');
finishFlight('won','Home');updateMission(.01);assert.equal(earnedStars.rescue,true);
startMission('rescue');finishFlight('crashed','Crash');updateMission(.01);assert.equal(missionPhase,'failed');
startMission('blackhole');assert.equal(bodies[0].kind,'hole');updateMission(15);assert.equal(earnedStars.blackhole,true);
startMission('blackhole');bodies.splice(1,1);updateMission(.1);assert.equal(missionPhase,'failed');
startMission('orbits');reset();assert.equal(activeMission,null);assert.equal(earnedStars.orbits,true);
startMission('blackhole');for(let i=0;i<1900;i++){step(.008);updateMission(.008)}assert.equal(missionPhase,'won');assert.equal(JSON.parse(localStorage.getItem('max-space-missions-v1')).blackhole,true);
localStorage.setItem=()=>{throw Error('Storage blocked')};startMission('orbits');for(let i=0;i<3;i++){orbit(130+i*45,1,'rock',i*2);progress()}updateMission(30);assert.equal(missionPhase,'won');
console.log('PASS: mission progress, timer reset, three awards, rescue failure, planet loss, reset preserves stars, storage unavailable');
`,s);
