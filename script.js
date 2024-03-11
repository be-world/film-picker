const FILM_DURATION_TYPES = {
  short: { label: "Corto", value: "short", minLength: 1 },
  medium: { label: "Mediano", value: "medium", minLength: 60 },
  long: { label: "Largo", value: "long", minLength: 120 },
};

const FILM_TYPES = {
  MOVIE: {
    label: "Película",
    value: "movie",
  },
  SERIES: {
    label: "Serie",
    value: "series",
  },
  OTHER: { label: "Otros", value: "other" },
};

const FILM_CATEGORIES = {
  romance: { label: "Romance", value: "romance" },
  comedy: { label: "Comedia", value: "comedy" },
  drama: { label: "Drama", value: "drama" },
  thriller: { label: "Thriller", value: "thriller" },
  action: { label: "Acción", value: "action" },
  adventure: { label: "Aventura", value: "adventure" },
  science_fiction: { label: "Ciencia Ficción", value: "science_fiction" },
  fantasy: { label: "Fantasía", value: "fantasy" },
  horror: { label: "Terror", value: "horror" },
  mystery: { label: "Misterio", value: "mystery" },
  documentary: { label: "Documental", value: "documentary" },
  animation: { label: "Animación", value: "animation" },
  family: { label: "Familia", value: "family" },
  musical: { label: "Musical", value: "musical" },
  western: { label: "Western", value: "western" },
  history: { label: "Historia", value: "history" },
  war: { label: "Guerra", value: "war" },
  crime: { label: "Crimen", value: "crime" },
  sport: { label: "Deporte", value: "sport" },
  biography: { label: "Biografía", value: "biography" },
  politics: { label: "Política", value: "politics" },
  reality_show: { label: "Reality Show", value: "reality_show" },
  cooking: { label: "Cocina", value: "cooking" },
  travel: { label: "Viaje", value: "travel" },
  talk_show: { label: "Talk Show", value: "talk_show" },
  educational: { label: "Educativo", value: "educational" },
};

const FILMS = {
  [FILM_TYPES.MOVIE.value]: [
    {
      name: "Cruella",
      categories: [FILM_CATEGORIES.comedy.value],
      duration: 134,
      episodes: 1,
      url: null,
      watched: false,
    },
    {
      name: "Los Aristogatos",
      categories: [
        FILM_CATEGORIES.animation.value,
        FILM_CATEGORIES.comedy.value,
      ],
      duration: 78,
      episodes: 1,
      url: null,
      watched: false,
    },
  ],
  [FILM_TYPES.SERIES.value]: [
    {
      name: "Modern Love",
      categories: [
        FILM_CATEGORIES.romance.value,
        FILM_CATEGORIES.comedy.value,
        FILM_CATEGORIES.drama.value,
      ],
      episodes: 16,
      duration: 35,
      url: null,
      watched: false,
    },
    {
      name: "Avatar",
      categories: [
        FILM_CATEGORIES.action.value,
        FILM_CATEGORIES.adventure.value,
        FILM_CATEGORIES.animation.value,
        FILM_CATEGORIES.fantasy.value,
      ],
      episodes: 61,
      duration: 25,
      url: null,
      watched: false,
    },
  ],
  [FILM_TYPES.OTHER.value]: [
    {
      name: "Taylor Swift The Eras Tour",
      categories: [
        FILM_CATEGORIES.musical.value,
        FILM_CATEGORIES.biography.value,
        FILM_CATEGORIES.documentary.value,
      ],
      duration: 160,
      episodes: 1,
      url: null,
      watched: false,
    },
    {
      name: "My Octopus Teacher",
      categories: [
        FILM_CATEGORIES.educational.value,
        FILM_CATEGORIES.documentary.value,
        FILM_CATEGORIES.travel.value,
      ],
      duration: 85,
      episodes: 1,
      url: null,
      watched: false,
    },
  ],
};

function populateSelect(elementId, options) {
  const select = document.getElementById(elementId);
  for (const [key, value] of Object.entries(options)) {
    const option = document.createElement("option");
    option.value = value.value;
    option.textContent = value.label;
    select.appendChild(option);
  }
}

function filterFilms(type, category, duration) {
  const filtered = [];
  for (const film of FILMS[type]) {
    if (
      film.categories.includes(category) &&
      film.duration >= FILM_DURATION_TYPES[duration].minLength
    ) {
      filtered.push(film);
    }
  }
  return filtered;
}

function spinRoulette() {
  const type = document.getElementById("filmType").value;
  const category = document.getElementById("filmCategory").value;
  const duration = document.getElementById("filmDuration").value;
  const filteredFilms = filterFilms(type, category, duration);
  if (filteredFilms.length > 0) {
    const selectedFilm =
      filteredFilms[Math.floor(Math.random() * filteredFilms.length)];
    document.getElementById(
      "rouletteResult"
    ).textContent = `Te recomendamos ver: ${selectedFilm.name}`;
  } else {
    document.getElementById("rouletteResult").textContent =
      "No se encontraron películas con estos criterios.";
  }
}

document.getElementById("spinButton").addEventListener("click", spinRoulette);

// Poblar los select al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  populateSelect("filmType", FILM_TYPES);
  populateSelect("filmCategory", FILM_CATEGORIES);
  populateSelect("filmDuration", FILM_DURATION_TYPES);
});
