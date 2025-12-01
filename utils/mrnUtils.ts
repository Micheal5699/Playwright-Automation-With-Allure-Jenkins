export const getRandomMRN = () => {
const randomNumber = Math.floor(Math.random() * 6) + 1;
  console.log(randomNumber);
  return `LUTH00${randomNumber}`;
};
    