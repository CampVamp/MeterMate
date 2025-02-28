export const calculateBillFromUnitsConsumed = (units: number) => {
  let bill = 0;
  const tiers =
    units <= 500
      ? [
          { limit: 100, rate: 0 },
          { limit: 200, rate: 2.35 },
          { limit: 400, rate: 4.7 },
          { limit: 500, rate: 6.3 },
        ]
      : [
          { limit: 100, rate: 0 },
          { limit: 400, rate: 4.7 },
          { limit: 500, rate: 6.3 },
          { limit: 600, rate: 8.4 },
          { limit: 800, rate: 9.45 },
          { limit: 1000, rate: 10.5 },
          { limit: 9999999, rate: 11.55 },
        ];

  let previousLimit = 0;
  for (const tier of tiers) {
    if (units > previousLimit) {
      const applicableUnits = Math.min(units, tier.limit) - previousLimit;
      bill += applicableUnits * tier.rate;
      previousLimit = tier.limit;
    } else {
      break;
    }
  }

  return bill;
};
