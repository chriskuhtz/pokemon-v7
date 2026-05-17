export const threeDigitString = (input: number) => {
  if (input > 999) {
    throw new Error("This number is too long");
  }
  if (input >= 100) {
    return `${Math.floor(input)}`;
  }
  if (input >= 10) {
    return `0${Math.floor(input)}`;
  }

  return `00${Math.floor(input)}`;
};
