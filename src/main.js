'use strict';

const input1 = document.querySelector('#input-val1');
const input2 = document.querySelector('#input-val2');
const select1 = document.querySelector('#sel1');
const select2 = document.querySelector('#sel2');

/**
 * onChange on Input 1
 * Change Input Value 2
 */
input1.addEventListener(
    'change',
    (e) => {
        getTauxDeChange()
            .then((taux) => {
                console.log(`Taux de change entre ${select1.value} || ${select2.value} est de ${taux}`);
                input2.value = input1.value * taux;
            });

    },
);

/**
 * onChange on Select 1
 * change input value 2
 */
select1.addEventListener(
    'change', (e) => {
        getTauxDeChange()
            .then((taux) => {
                console.log(`Taux de change entre ${select1.value} || ${select2.value} est de ${taux}`);
                input2.value = input1.value * taux;
            })
    })

/**
 * onChange on Select 1
 * change input value 2
 */
select2.addEventListener(
    'change', (e) => {
        getInversedTauxDeChange()
            .then((taux) => {
                console.log(`Taux de change entre ${select2.value} || ${select1.value} est de ${taux}`);
                input1.value = input2.value * taux;
            })
    })

/**
 * onChange on Input 2
 * change Input value 1
 */
input2.addEventListener(
    'change',
    (e) => {
        getInversedTauxDeChange()
            .then((taux) => {
                console.log(`Taux de change entre ${select2.value} || ${select1.value} est de ${taux}`);
                input1.value = input2.value * taux;
            });
    },
);

/**
 * fetch data from exchange-rates
 * @returns data for exchange rate
 */
function getData() {
    return fetch(`https://exchange-rates.abstractapi.com/v1/live/?api_key=e6137edf8b88429aaa4d2123f9d06849&base=${select1.value}&target=${select2.value}`);
}

/**
 * fetch inversed data from exchange-rates
 * @returns inversed data for exchange rate
 */
function getInversedData() {
    return fetch(`https://exchange-rates.abstractapi.com/v1/live/?api_key=e6137edf8b88429aaa4d2123f9d06849&base=${select2.value}&target=${select1.value}`);
}

/**
 * Get exchange rates
 * @returns exchange rates
 */
async function getTauxDeChange() {
    const sel2 = select2.value;
    const response = await getData();
    if (!response.ok) {
        alert(`Pas de convertion possible entre ${select1.value} et ${select2.value}`);
        throw new Error(`HTTP error! status: ${response.status}`);

    }
    const data = await response.json();
    // console.log(data)
    return data.exchange_rates[sel2];
};

/**
 * Get inversed exchange rates
 * @returns inversed exchange rates
 */
async function getInversedTauxDeChange() {
    const sel1 = select1.value;
    const response = await getInversedData();
    if (!response.ok) {
        alert(`Pas de convertion possible entre ${select1.value} et ${select2.value}`);
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data)
    return data.exchange_rates[sel1];
};