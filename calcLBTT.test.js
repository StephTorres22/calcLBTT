const calculateLBTT = require("./calcLBTT");

it("Tax Free", () => {
  expect(calculateLBTT(145000)).toBe(0);
});

it("Within First Tax Band", () => {
  expect(calculateLBTT(222000)).toBe(1540);
});

it("Within Second Tax Band", () => {
  expect(calculateLBTT(275000)).toBe(3350);
});

it("Within Third Tax Band", () => {
  expect(calculateLBTT(350000)).toBe(8350);
});

it("Within Fourth Tax Band", () => {
  expect(calculateLBTT(760000)).toBe(49550);
});
