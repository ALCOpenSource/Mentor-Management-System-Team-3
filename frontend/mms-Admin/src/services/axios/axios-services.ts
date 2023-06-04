import axios from 'axios';
const baseURL = "https://alc-mms-team-3.herokuapp.com/api/v1/";

export const axiosWithoutBearer = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json"
  }
});

export const axiosWithBearer = (token: string) => axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`
  }
});

export const getApiData = (url:string, token: string) => {
  return axiosWithBearer(token)
  .get(url)
    .then((data) => {      
      return data;
    })
    .catch((err) => {
      throw err?.response?.data?.message ?? err;
    });
}

export const getGoogleLoggedInUser = (token: string): Promise<any>|undefined => {
  if (token) {
    return axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      })
      .then((res) => {
        return {fullName:res.data.name, picture:res.data.picture, email:res.data.email};
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
  return undefined;
}


// export const googleLogin = (email: string): Promise<any>|undefined => {
//   if (token) {
//     return axios
//       .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: 'application/json'
//         }
//       })
//       .then((res) => {
//         return res.data;
//       })
//       .catch((err) => {
//         console.log(err);
//         throw err;
//       });
//   }
//   return undefined;
// }


// var options = {
//   method: 'GET',
//   url: 'https://api.pexels.com/v1/curated',
//   params: {page: '2', per_page: '40'},
//   headers: {Authorization: '_authkey_'}
// };
export const withPageParams = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json"
  }
});

export default axiosWithBearer;
