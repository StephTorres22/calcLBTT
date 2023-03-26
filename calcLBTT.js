/* Calculating LBTT in Scotland

upto £145,000 => 0%
£145,001 - £250,000 => 2%
£250,001 - £325,000 => 5%
£325,001 - £750,000 => 10%
£750,001+ => 12%

NEED TO BE ABLE TO SPLIT HOUESPRICE INTO EACH BAND TO CALCULATE RELEVANT TAX ON EACH PORTION THEN ADD TOGETHER

FUNCTION TAKES HOUSE PRICE IN, RETURNS AMOUNT OF TAX TO PAY

FIRST CASE HP < £145,001 => 0*/

/* NEEDS TO RETURN TO TWO DECIMAL PLACES, FLOAT */

/* BANDS */

function calculateLBTT(housePrice) {
  //
  const taxFreeAmount = 145000;

  const firstBandTopLimit = 250000;
  const secondBandTopLimit = 325000;
  const thirdBandTopLimit = 750000;

  const firstBandTotal = 250000 - 145000;
  const secondBandTotal = 325000 - 250000;
  const thirdBandTotal = 750000 - 325000;
  const fourthBandLimit = 750000;

  let remainingTaxablePortion;

  let taxPayable;

  if (housePrice <= taxFreeAmount) {
    return 0;
  }

  const taxablePortion = housePrice - taxFreeAmount;

 /* this is actually not a great way, should be doing conditions based on house price. as the bands are of varying sizes! 
  
  NEED TO ADD BAND TOTALS TOGETHER AND COMPARE TAXABLE AMOUNT AGAINST THAT!
  define variables for these...*/
  if (taxFreeAmount < housePrice && housePrice <= firstBandTopLimit) {
    taxPayable = calcTwoPerCent(taxablePortion);
  }

  if (firstBandTopLimit <= housePrice && housePrice <= secondBandTopLimit) {
    taxPayable =
      calcTwoPerCent(firstBandTotal) +
      calcFivePerCent(taxablePortion - firstBandTotal);
  }

  if (secondBandTopLimit < housePrice && housePrice <= thirdBandTopLimit) {
    remainingTaxablePortion =
      taxablePortion - (firstBandTotal + secondBandTotal);

    taxPayable =
      calcTwoPerCent(firstBandTotal) +
      calcFivePerCent(secondBandTotal) +
      calcTenPerCent(remainingTaxablePortion);
  }

  if (housePrice > fourthBandLimit) {
    remainingTaxablePortion =
      taxablePortion - (firstBandTotal + secondBandTotal + thirdBandTotal);

    taxPayable =
      calcTwoPerCent(firstBandTotal) +
      calcFivePerCent(secondBandTotal) +
      calcTenPerCent(thirdBandTotal) +
      calcTwelvePerCent(remainingTaxablePortion);
  }
  return parseInt(taxPayable.toFixed(0)); //to round to 2 D.P toFix returns a string, this is only returning an approximation
}

/* Seperate functions for finding percentage, reusable */
function calcTwoPerCent(number) {
  return (number / 100) * 2;
}

function calcFivePerCent(number) {
  return number / 20;
}

function calcTenPerCent(number) {
  return number / 10;
}

function calcTwelvePerCent(number) {
  return calcTenPerCent(number) + calcTwoPerCent(number);
}

module.exports = calculateLBTT;
