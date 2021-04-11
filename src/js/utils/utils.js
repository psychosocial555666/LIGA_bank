import { creditTypes, MAX_PERCENT } from "../const";

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const initiateParametres = (type) => {
  if (type === creditTypes.MORTGAGE) {
    return (
      {
        price: '2000000',
        priceStep: 100000,
        minPrice: '1200000',
        maxPrice: '25000000',
        initialPercent: 10,
        minInitialPercent: 10,
        time: 5,
        minTime: 5,
        maxTime: 30,
        creditPercent: 9.4,
        capital: false,
      }
    )
  }

  if (type === creditTypes.AUTO) {
    return (
      {
        price: '2000000',
        priceStep: 50000,
        minPrice: '500000',
        maxPrice: '5000000',
        initialPercent: 20,
        minInitialPercent: 20,
        time: 1,
        minTime: 1,
        maxTime: 5,
        creditPercent: 16,
        casco: false,
        insurance: false,
      }
    )
  }
  if (type === creditTypes.NONE) {
    return null;
  };
}

const percentToSum = (price, percent) => {
  return (Number(price) * Number(percent)) / MAX_PERCENT;
}

const sumToPercent = (price, initial) => {
  let result =(Number(initial) * MAX_PERCENT) / Number(price);
  return Math.round(result/5)*5;
}

const maskThisValue = (value, string) => {
  let valueArray = value.split("").reverse();
  let newValue = valueArray.map((item, i) => {
    if(i % 3 === 0) {
      return `${item} `;
    }
    return item;
  }).reverse().join("");

  return newValue + string;
};

const checkValueValidity = (value, minValue, maxValue) => {
  return Number(value) > Number(maxValue) || Number(value) < Number(minValue) ? true : false;
}

const returnCorrectValue = (value, minValue, maxValue) => {
  let result = Number(value);

  if (result > Number(maxValue)) {
    return result = maxValue;
  }

  if (!result || result < Number(minValue)) {
    return result = minValue;
  }

  return String(result);
}

const increasePrice = (value, step, maxValue) => {
  let result = Number(value) + step;

    if (result > Number(maxValue)) {
      return result = maxValue;
    }

    return String(result);
}

const reducePrice = (value, step, minValue) => {
  let result = Number(value) - step;

    if (result < Number(minValue)) {
      return result = minValue;
    }
  
    return String(result);
}

export { extend, 
  initiateParametres, 
  maskThisValue, 
  increasePrice, 
  reducePrice, 
  checkValueValidity, 
  returnCorrectValue,
  percentToSum,
  sumToPercent,
};