const calculateBMI = function calculatorBMI(height, weight) {
  return (weight / ((height * height)/ 10000)).toFixed(2);
}

module.exports = calculateBMI;