
const artGenres = [
    "Brazos",
    "Biceps",
    "Pecho",
    "Hombro",
    "Espalda",
    "Adomen",
    "piernas",
    "Gluteos",
    "Brazos y Pecho",
    "Espalda y hombros",
   
]

const genres = (array) => {
    return [...array].sort((a, b) => a < b ? -1 : 1);
};

export default genres(artGenres);