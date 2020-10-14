export const cutElementFromArr = (
  elements: string[],
  value: string | number
) => {
  if (typeof value === "number") {
    const result = elements.slice(0, value).concat(elements.slice(value + 1));
    return result;
  } else {
    const index = elements.indexOf(value);
    const result = elements.slice(0, index).concat(elements.slice(index + 1));
    return result;
  }
};
