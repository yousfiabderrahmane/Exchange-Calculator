const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

//Fetch Exchange Rate and update the DOM

fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
  .then((res) => res.json())
  .then((data) => {
    let currency_object = data.rates;
    let currency_array_keys = Object.keys(currency_object);
    console.log(currency_array_keys);
    currency_array_keys.map((e) => {
      currencyEl_one.innerHTML += `<option value="${e}" >${e}</option>`;
      currencyEl_two.innerHTML += `<option value="${e}" >${e}</option>`;
    });
  });

//calculate
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      if (amountEl_one.value >= 0) {
        amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
      } else {
        amountEl_two.value = `0.00`;
      }
    });
}

//event listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);
swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate;
});
calculate();
