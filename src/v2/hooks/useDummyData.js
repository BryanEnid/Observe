import React from 'react';
import { Request } from '../controllers/Request';

// Defaults
const randomPictureDefaults = { orientation: 'square', size: 'small', per_page: 5 };
const randomVideosDefaults = { orientation: 'portrait', size: 'medium', per_page: 80 };

// TODO: Use React Query for this
export const useDummyData = () => {
  const getRandomUsers = React.useCallback((amount, cached = true) => {
    Request.baseURL = 'https://randomuser.me';
    return Request.get(`/api/?results=${amount}`, { cache: cached ? 'force-cache' : 'default' });
  }, []);

  const getRandomPictures = React.useCallback(
    ({ orientation, size, per_page } = randomPictureDefaults, cached = true) => {
      Request.headers = {
        Authorization: '563492ad6f91700001000001fb15f65e0bc34e60843e76e311a7b127',
      };
      Request.baseURL = 'https://api.pexels.com';
      const queryOptions = ['videos', 'professional'];
      const randomQuery = Math.abs(Math.round(Math.random() * queryOptions.length - 1));
      return Request.get(
        `/v1/search?query=${queryOptions[randomQuery]}&orientation=${orientation}&size=${size}&per_page=${per_page}`,
        { cache: cached ? 'force-cache' : 'default' }
      );
    },
    []
  );

  const getRandomVideos = React.useCallback(
    ({ orientation, size, per_page } = randomVideosDefaults, cached = true) => {
      Request.headers = {
        Authorization: '563492ad6f91700001000001fb15f65e0bc34e60843e76e311a7b127',
      };
      Request.baseURL = 'https://api.pexels.com';
      const queryOptions = ['technology', 'professional'];
      let randomQuery = Math.abs(Math.round(Math.random() * queryOptions.length - 1));
      if (cached) randomQuery = 0;
      return Request.get(
        `/videos/search?query=${queryOptions[randomQuery]}&orientation=${orientation}&size=${size}&per_page=${per_page}`,
        { cache: cached ? 'force-cache' : 'default' }
      );
    },
    []
  );

  return { getRandomUsers, getRandomPictures, getRandomVideos };
};

// export default class DummyData {
//   static getRandomUsers(amount, cached = true) {
//     Request.baseURL = 'https://randomuser.me';
//     return Request.get(`/api/?results=${amount}`, { cache: cached ? 'force-cache' : 'default' });
//   }

//   static getRandomPictures({ orientation, size, per_page } = randomPictureDefaults, cached = true) {
//     Request.headers = {
//       Authorization: '563492ad6f91700001000001fb15f65e0bc34e60843e76e311a7b127',
//     };
//     Request.baseURL = 'https://api.pexels.com';
//     const queryOptions = ['videos', 'professional'];
//     const randomQuery = Math.abs(Math.round(Math.random() * queryOptions.length - 1));
//     return Request.get(
//       `/v1/search?query=${queryOptions[randomQuery]}&orientation=${orientation}&size=${size}&per_page=${per_page}`,
//       { cache: cached ? 'force-cache' : 'default' }
//     );
//   }

//   static getRandomVideos({ orientation, size, per_page } = randomVideosDefaults, cached = true) {
//     Request.headers = {
//       Authorization: '563492ad6f91700001000001fb15f65e0bc34e60843e76e311a7b127',
//     };
//     Request.baseURL = 'https://api.pexels.com';
//     const queryOptions = ['technology', 'professional'];
//     let randomQuery = Math.abs(Math.round(Math.random() * queryOptions.length - 1));
//     if (cached) randomQuery = 0;
//     return Request.get(
//       `/videos/search?query=${queryOptions[randomQuery]}&orientation=${orientation}&size=${size}&per_page=${per_page}`,
//       { cache: cached ? 'force-cache' : 'default' }
//     );
//   }

//   // static getRandomTexts() {
//   //   Request.headers = {
//   //     Authorization: '563492ad6f91700001000001fb15f65e0bc34e60843e76e311a7b127',
//   //   };
//   //   Request.baseURL = 'https://fakerapi.it/api/v1';
//   //   return Request.get('/texts?_quantity=1&_characters=500');
//   // }
// }
