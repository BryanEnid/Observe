export const formatNumber = (input) => {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 3,
  }).format(input);
};
