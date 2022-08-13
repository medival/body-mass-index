const classifieBMI = function classifierBMI(bmi) {
  let label;

  if (bmi < 18.5) {
    label = "underweight";
  } else if (bmi > 25.0) {
    label = "overweight";
  } else {
    label = "normal";
  }

  return label;
};

module.exports = classifieBMI;
