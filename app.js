// ===============================
// STRIPE LINKS
// ===============================

const STRIPE_MONTHLY_LINK =
"https://buy.stripe.com/5kQ7sMa1r3Q70byawadwc02";


const STRIPE_LIFETIME_LINK =
"https://buy.stripe.com/14AbJ21uV72j8I45bQdwc03";



// ===============================
// TRADE PRESETS
// ===============================

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



const preset = presets[type];


if(!preset){

return;

}



document.getElementById("materials").value =
preset.materials;


document.getElementById("hours").value =
preset.hours;


document.getElementById("rate").value =
preset.rate;


document.getElementById("markup").value =
preset.markup;


}





// ===============================
// CALCULATOR
// ===============================

function calculateProfit(){


const materials =
Number(document.getElementById("materials").value) || 0;


const hours =
Number(document.getElementById("hours").value) || 0;


const rate =
Number(document.getElementById("rate").value) || 0;


const markup =
Number(document.getElementById("markup").value) || 0;



const labor =
hours * rate;



const totalCost =
materials + labor;



const customerPrice =
totalCost * (1 + markup / 100);



const profit =
customerPrice - totalCost;



const margin =
customerPrice > 0
?
(profit / customerPrice) * 100
:
0;




document.getElementById("totalCost").innerText =
totalCost.toFixed(2);



document.getElementById("revenue").innerText =
customerPrice.toFixed(2);



document.getElementById("profit").innerText =
profit.toFixed(2);



document.getElementById("margin").innerText =
margin.toFixed(1);



updateRisk(margin);


}







function updateRisk(margin){


const box =
document.getElementById("riskBox");


const message =
document.getElementById("message");



if(margin < 10){


box.className =
"risk bad";


box.innerText =
"Low Profit Margin";


message.innerText =
"This job may be risky.";


}


else if(margin < 20){


box.className =
"risk warning";


box.innerText =
"Tight Profit Margin";


message.innerText =
"Consider increasing price.";


}


else{


box.className =
"risk good";


box.innerText =
"Healthy Profit Margin";


message.innerText =
"This job has a safer margin.";


}


}
// ===============================
// STRIPE UPGRADES
// ===============================

function upgradeMonthly(){

window.location.href =
STRIPE_MONTHLY_LINK;

}



function upgradeLifetime(){

window.location.href =
STRIPE_LIFETIME_LINK;

}





// ===============================
// SIMPLE PAYWALL
// ===============================

function checkUsage(){


let used =
localStorage.getItem("dailyUse");


let today =
new Date().toDateString();



let saved =
JSON.parse(used);



if(!saved || saved.date !== today){


localStorage.setItem(

"dailyUse",

JSON.stringify({

date:today,

count:0

})

);


return true;


}



if(saved.count >= 1){


document
.getElementById("upgradeBox")
.classList
.remove("hidden");


document
.getElementById("upgradeBox")
.scrollIntoView({

behavior:"smooth"

});


return false;


}


return true;


}




function recordUse(){


let today =
new Date().toDateString();



let saved =
JSON.parse(
localStorage.getItem("dailyUse")
);



if(!saved || saved.date !== today){


saved = {

date:today,

count:0

};


}



saved.count++;



localStorage.setItem(

"dailyUse",

JSON.stringify(saved)

);


}





// ===============================
// SAVED ESTIMATES
// ===============================

function saveEstimate(){



const estimate = {


id:Date.now(),


name:
document.getElementById("jobName").value || "Unnamed Job",


cost:
document.getElementById("totalCost").innerText,


price:
document.getElementById("revenue").innerText,


profit:
document.getElementById("profit").innerText,


margin:
document.getElementById("margin").innerText


};




let estimates =
JSON.parse(

localStorage.getItem("estimates")

)
|| [];




estimates.push(estimate);



localStorage.setItem(

"estimates",

JSON.stringify(estimates)

);



displayEstimates();



}








function displayEstimates(){



const area =
document.getElementById("savedEstimates");



if(!area){

return;

}



let estimates =
JSON.parse(

localStorage.getItem("estimates")

)
|| [];




if(estimates.length === 0){


area.innerHTML =
"No saved estimates yet.";


return;


}




area.innerHTML = "";




estimates.forEach(function(item){



area.innerHTML += `

<div class="estimate-card">

<h3>${item.name}</h3>

<p>
Cost: $${item.cost}
</p>

<p>
Price: $${item.price}
</p>

<p>
Profit: $${item.profit}
</p>

<p>
Margin: ${item.margin}%
</p>


<button onclick="deleteEstimate(${item.id})">

Delete

</button>


</div>

`;



});


}







function deleteEstimate(id){


let estimates =
JSON.parse(

localStorage.getItem("estimates")

)
|| [];



estimates =
estimates.filter(function(item){


return item.id !== id;


});




localStorage.setItem(

"estimates",

JSON.stringify(estimates)

);



displayEstimates();


}





// ===============================
// STARTUP
// ===============================

window.onload = function(){


displayEstimates();


};
function upgradeMonthly(){

window.location.href = STRIPE_MONTHLY_LINK;

}



function upgradeLifetime(){

window.location.href = STRIPE_LIFETIME_LINK;

}