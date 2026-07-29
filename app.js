const STRIPE_PAYMENT_LINK =
"https://buy.stripe.com/9B63cwehHaev2jG47Mdwc00";


const FREE_DAILY_LIMIT = 1;



function getUsage(){

let data = localStorage.getItem("marginMeterUsage");


if(!data){

return {
count:0,
date:new Date().toDateString()
};

}


return JSON.parse(data);

}




function saveUsage(data){

localStorage.setItem(
"marginMeterUsage",
JSON.stringify(data)
);

}





function canCalculate(){

let usage = getUsage();

let today = new Date().toDateString();


if(usage.date !== today){

usage = {
count:0,
date:today
};

saveUsage(usage);

}


return usage.count < FREE_DAILY_LIMIT;

}





function increaseUsage(){

let usage = getUsage();

usage.count++;

saveUsage(usage);

}





function loadPreset(type){


const presets = {


drywall:{
materials:1500,
hours:40,
rate:50,
markup:25
},


painting:{
materials:600,
hours:30,
rate:45,
markup:30
},


roofing:{
materials:3500,
hours:60,
rate:65,
markup:30
},


concrete:{
materials:2500,
hours:50,
rate:55,
markup:25
}


};



let preset = presets[type];


document.getElementById("materials").value =
preset.materials;


document.getElementById("hours").value =
preset.hours;


document.getElementById("rate").value =
preset.rate;


document.getElementById("markup").value =
preset.markup;


}








function calculateProfit(){


if(!canCalculate()){

showPaywall();

return;

}


increaseUsage();



let materials =
Number(document.getElementById("materials").value) || 0;


let hours =
Number(document.getElementById("hours").value) || 0;


let rate =
Number(document.getElementById("rate").value) || 0;


let markup =
Number(document.getElementById("markup").value) || 0;



let labor = hours * rate;


let cost = materials + labor;


let price = cost * (1 + markup / 100);


let profit = price - cost;


let margin =
price > 0
?
(profit / price) * 100
:
0;



document.getElementById("totalCost").innerText =
cost.toFixed(2);


document.getElementById("revenue").innerText =
price.toFixed(2);


document.getElementById("profit").innerText =
profit.toFixed(2);


document.getElementById("margin").innerText =
margin.toFixed(1);



updateMessage(margin);


}








function updateMessage(margin){


let box =
document.getElementById("riskBox");


let message =
document.getElementById("message");



if(margin < 10){

box.className="risk bad";

box.innerText="Danger: Low profit margin";

message.innerText="This job may not cover mistakes or unexpected costs.";

}

else if(margin < 20){

box.className="risk warning";

box.innerText="Warning: Tight margin";

message.innerText="Consider increasing your price.";

}

else{

box.className="risk good";

box.innerText="Healthy profit margin";

message.innerText="This job appears priced safely.";

}


}








function showPaywall(){


document
.getElementById("upgradeBox")
.classList
.remove("hidden");


document
.getElementById("upgradeBox")
.scrollIntoView({
behavior:"smooth"
});


}









function upgrade(){

window.location.href =
STRIPE_PAYMENT_LINK;

}









// ==========================
// SAVED ESTIMATES
// ==========================



function saveEstimate(){


let name =
document.getElementById("jobName").value;


if(!name){

name="Unnamed Job";

}



let estimate = {

id:Date.now(),

name:name,

cost:
document.getElementById("totalCost").innerText,

price:
document.getElementById("revenue").innerText,

profit:
document.getElementById("profit").innerText,

margin:
document.getElementById("margin").innerText

};



let saved =
JSON.parse(
localStorage.getItem("savedEstimates")
)
|| [];



saved.push(estimate);



localStorage.setItem(
"savedEstimates",
JSON.stringify(saved)
);



displayEstimates();


}





function displayEstimates(){


let box =
document.getElementById("savedEstimates");


if(!box){

return;

}



let saved =
JSON.parse(
localStorage.getItem("savedEstimates")
)
|| [];



if(saved.length === 0){

box.innerHTML =
"No saved estimates yet.";

return;

}



box.innerHTML="";



saved.forEach(item => {


box.innerHTML += `

<div class="estimate-card">

<h3>${item.name}</h3>

<p>Cost: $${item.cost}</p>

<p>Price: $${item.price}</p>

<p>Profit: $${item.profit}</p>

<p>Margin: ${item.margin}%</p>

<button onclick="deleteEstimate(${item.id})">
Delete
</button>

</div>

`;

});


}




function deleteEstimate(id){


let saved =
JSON.parse(
localStorage.getItem("savedEstimates")
)
|| [];



saved =
saved.filter(item => item.id !== id);



localStorage.setItem(
"savedEstimates",
JSON.stringify(saved)
);



displayEstimates();

}




window.onload=function(){

displayEstimates();

};