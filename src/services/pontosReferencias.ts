/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
export const getPontosReferencias = (latitude: number, longitude: number) => {
  const apiKey = 'AIzaSyAlo0EjLzymr_1Jtwsk8Fr108wy7V2Jk5E';
  const url =
    `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${latitude}%2C-${longitude}}&query=mercados&radius=500&key=${apiKey}`;

  let result = null;
  fetch(url)
    .then(data => data.json())
    .then(data => result = data);

    return {result};
  };
