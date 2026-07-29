/* ==========================================
   MARGIN METER
   Zero-Cost MVP JavaScript
========================================== */


/*
PASTE YOUR STRIPE PAYMENT LINK HERE LATER

Example:
https://buy.stripe.com/xxxxx

Until then, the button will show a message.
*/const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/9B63cwehHaev2jG47Mdwc00";
function upgrade() {
  window.open(STRIPE_PAYMENT_LINK, "https://buy.stripe.com/9B63cwehHaev2jG47Mdwc00");
}

/* ==========================================
   FREE LIMIT SYSTEM
========================================== */


const FREE_DAILY_LIMIT = 1;



function getUsage(){


    const data =
    localStorage.getItem(
        "marginMeterUsage"
    );


    if(!data){

        return {

            count:0,

            date:
            new Date().toDateString()

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


    let usage =
    getUsage();



    const today =
    new Date().toDateString();




    if(
        usage.date !== today
    ){

        usage = {

            count:0,

            date:today

        };

    }




    if(
        usage.count >= FREE_DAILY_LIMIT
    ){

        return false;

    }



    return true;


}





function increaseUsage(){


    let usage =
    getUsage();



    const today =
    new Date().toDateString();



    if(
        usage.date !== today
    ){

        usage = {

            count:0,

            date:today

        };

    }



    usage.count++;



    saveUsage(usage);


}







/* ==========================================
   PRESETS
========================================== */



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





    const preset =
    presets[type];



    if(!preset){

        return;

    }



    document.getElementById(
        "materials"
    ).value =
    preset.materials;



    document.getElementById(
        "hours"
    ).value =
    preset.hours;



    document.getElementById(
        "rate"
    ).value =
    preset.rate;



    document.getElementById(
        "markup"
    ).value =
    preset.markup;



}







/* ==========================================
   CALCULATOR
========================================== */


function calculateProfit(){



    if(!canCalculate()){


        showPaywall();


        return;

    }





    increaseUsage();




    const materials =
    Number(
        document.getElementById(
            "materials"
        ).value
    ) || 0;



    const hours =
    Number(
        document.getElementById(
            "hours"
        ).value
    ) || 0;



    const rate =
    Number(
        document.getElementById(
            "rate"
        ).value
    ) || 0;



    const markup =
    Number(
        document.getElementById(
            "markup"
        ).value
    ) || 0;





    const labor =
    hours * rate;



    const cost =
    materials + labor;



    const price =
    cost *
    (1 + markup / 100);



    const profit =
    price - cost;



    const margin =
    price > 0
    ?
    (profit / price) * 100
    :
    0;





    document.getElementById(
        "totalCost"
    ).innerText =
    cost.toFixed(2);



    document.getElementById(
        "revenue"
    ).innerText =
    price.toFixed(2);



    document.getElementById(
        "profit"
    ).innerText =
    profit.toFixed(2);



    document.getElementById(
        "margin"
    ).innerText =
    margin.toFixed(1);





    updateMessage(
        margin
    );

}





/* ==========================================
   PROFIT FEEDBACK
========================================== */


function updateMessage(
margin
){



    const box =
    document.getElementById(
        "riskBox"
    );


    const message =
    document.getElementById(
        "message"
    );




    if(margin < 10){


        box.className =
        "risk bad";


        box.innerText =
        "Danger: Low profit margin";


        message.innerText =
        "This job may not cover mistakes, delays, or unexpected costs.";


    }



    else if(margin < 20){


        box.className =
        "risk warning";


        box.innerText =
        "Warning: Tight margin";


        message.innerText =
        "Consider increasing your price before accepting.";

    }



    else{


        box.className =
        "risk good";


        box.innerText =
        "Healthy profit margin";


        message.innerText =
        "This job appears priced safely.";

    }


}








/* ==========================================
   PAYWALL
========================================== */


function showPaywall(){


    document
    .getElementById(
        "upgradeBox"
    )
    .classList
    .remove(
        "hidden"
    );



    document
    .getElementById(
        "upgradeBox"
    )
    .scrollIntoView({

        behavior:"smooth"

    });



}








/* ==========================================
   STRIPE UPGRADE
========================================== */


function upgrade(){



    if(
        STRIPE_PAYMENT_LINK
    ){


        window.location.href =
        STRIPE_PAYMENT_LINK;


    }

    else{


        alert(

        "Stripe payment link will be connected here."

        );


    }


}