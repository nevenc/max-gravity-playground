const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');const elements={};function el(id){return elements[id]??={value:'1',checked:true,style:{},dataset:{},classList:{toggle(){},remove(){}},addEventListener(){},setAttribute(){},getBoundingClientRect(){return{width:900,height:760,left:0,top:0}},getContext(){return{setTransform(){}}}}}const s={document:{querySelector:el,querySelectorAll(){return[]},addEventListener(){}},window:{addEventListener(){}},ResizeObserver:class{observe(){}},devicePixelRatio:1,requestAnimationFrame(){},setTimeout(){},clearTimeout(){},Math,console,assert};vm.createContext(s);for(const file of ['app.js','flight.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../src',file),'utf8'),s);vm.runInContext(`
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
