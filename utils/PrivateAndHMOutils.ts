export const getRandomHmoName = () => {
  const hmoNames = [
    "Babatope Arowolo",
    "J P",
    "Jay Bill",
    "Paul Ola",
    "Kelechi Nelson",
    "Babatope Arowolo",
    "Seyi Badmusi",
    "Beta",
    "Godwin Ade",
    "Jane Simeon W",
    "P JULS",
    "Oviemena Daniel A",
    "Lizzy Mane",
    "James P",
  ];

  const randomIndex = Math.floor(Math.random() * hmoNames.length);
  return hmoNames[randomIndex];
};

export const getRandomPrivateName = () => {
  const privateNames = [
    "Bayo Aladesu",
    "Adeshola Shopeju",
    "Gbadbo Adejoke",
    //"Teagan Gottlieb",
    "Godfrey Beatty",
    "Filomena Mraz",
    "T Patient",
    "James Bond",
    "Tayo Adedayo",
    // "adeola moses",
    "kolade akinyemi",
    "Handle",
    "GUMBORO LASOTA",
    //"Stone Roberson Whitley",
  ];

  const randomIndex = Math.floor(Math.random() * privateNames.length);
  return privateNames[randomIndex];
};