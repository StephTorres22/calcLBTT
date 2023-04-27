/* Calculating LBTT in Scotland

upto £145,000 => 0%
£145,001 - £250,000 => 2%
£250,001 - £325,000 => 5%
£325,001 - £750,000 => 10%
£750,001+ => 12%

NEED TO BE ABLE TO SPLIT HOUESPRICE INTO EACH BAND TO CALCULATE RELEVANT TAX ON EACH PORTION THEN ADD TOGETHER

FUNCTION TAKES HOUSE PRICE IN, RETURNS AMOUNT OF TAX TO PAY

FIRST CASE HP < £145,001 => 0*/

/* BANDS */

function calculateLBTT(housePrice) {
  //
  const taxFreeAmount = 145000;
  let remainingTaxablePortion;
  let taxPayable = 0;
  if (housePrice <= taxFreeAmount) {
    return 0;
  }

  const bandArrays = [
    [0, 145000, 0],
    [145001, 250000, 0.02],
    [250001, 325000, 0.05],
    [325001, 750000, 0.1],
  ];

  for (let i = 0; i < bandArrays.length; i++) {
    let band = bandArrays[i];

    if (band[0] < housePrice && housePrice <= band[1]) {
      remainingTaxablePortion = housePrice - band[0];
      taxPayable += remainingTaxablePortion * band[2];
      return Math.round(taxPayable);
    }

    let bandTaxablePortion = band[1] - band[0];
    taxPayable += bandTaxablePortion * band[2];

    if (housePrice > bandArrays[3][1] && i == 3) {
      //needs the second condition to make sure all the bands are hit.
      remainingTaxablePortion = housePrice - bandArrays[3][1];
      taxPayable += remainingTaxablePortion * 0.12;
      return Math.round(taxPayable);
    }
  }

  /*  */

  /*  if (taxFreeAmount < housePrice && housePrice <= firstBandTopLimit) {
    taxPayable = calcTwoPerCent(taxablePortion);
  }

  if (firstBandTopLimit <= housePrice && housePrice <= secondBandTopLimit) {
    taxPayable =
      calcTwoPerCent(firstBandTotal) +
      calcFivePerCent(taxablePortion - firstBandTotal);
  }

  if (secondBandTopLimit <= housePrice && housePrice <= thirdBandTopLimit) {
    remainingTaxablePortion =
      taxablePortion - (firstBandTotal + secondBandTotal);

    taxPayable =
      calcTwoPerCent(firstBandTotal) +
      calcFivePerCent(secondBandTotal) +
      calcTenPerCent(remainingTaxablePortion);
  }

  if (housePrice >= fourthBandLimit) {
    remainingTaxablePortion =
      taxablePortion - (firstBandTotal + secondBandTotal + thirdBandTotal);

    taxPayable =
      calcTwoPerCent(firstBandTotal) +
      calcFivePerCent(secondBandTotal) +
      calcTenPerCent(thirdBandTotal) +
      calcTwelvePerCent(remainingTaxablePortion);
  }
  return Math.round(taxPayable); */ //to round to 2 D.P toFix returns a string, this is only returning an approximation
  //could use Math.round(taxPayable), rounds up and down.
  //think gov website rounds down. .floor
  /* https://www.stampdutycalculator.org.uk/stamp-duty-scotland.htm?utm_content=cmp-true using this and/or this
  https://revenue.scot/calculate-tax/calculate-property-transactions#calculator for tests */
}

/* Seperate functions for finding percentage, reusable */
/* function calcTwoPerCent(number) {
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
} */


module.exports = calculateLBTT;
