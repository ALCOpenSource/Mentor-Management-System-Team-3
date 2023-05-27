import axios from 'axios';

export const axiosWithoutBearer =  axios.create({
  baseURL: "https://alc-mms-team-3.herokuapp.com/api/v1/",
  headers: {
    "Content-type": "application/json"
  }
});

export const axiosWithBearer = (token:string) => axios.create({
  baseURL: "https://alc-mms-team-3.herokuapp.com/api/v1/",
  headers: {
    "Content-type": "application/json",
     Authorization: `Bearer ${token}` 
  }
});

  // var options = {
  //   method: 'GET',
  //   url: 'https://api.pexels.com/v1/curated',
  //   params: {page: '2', per_page: '40'},
  //   headers: {Authorization: '_authkey_'}
  // };

  export const withPageParams =  axios.create({
    baseURL: "https://alc-mms-team-3.herokuapp.com/api/v1/",
    headers: {
      "Content-type": "application/json"
    }
  });

  export default axiosWithBearer;
//   axios.request(options).then(function (response) {
//     console.log(response.data);
//   }).catch(function (error) {
//     console.error(error);
//   });