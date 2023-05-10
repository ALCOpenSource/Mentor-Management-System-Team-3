import axios from "axios";

export const axiosWithoutBearer =  axios.create({
  baseURL: "http://ec2-13-50-251-7.eu-north-1.compute.amazonaws.com:5000/api/v1/",
  headers: {
    "Content-type": "application/json"
  }
});

export const axiosWithBearer = (token:string) => axios.create({
  baseURL: "http://ec2-13-50-251-7.eu-north-1.compute.amazonaws.com:5000/api/v1/",
  headers: {
    "Content-type": "application/json",
     Authorization: `Bearer ${token}` 
  }
});

  var options = {
    method: 'GET',
    url: 'https://api.pexels.com/v1/curated',
    params: {page: '2', per_page: '40'},
    headers: {Authorization: '_authkey_'}
  };

  export const withPageParams =  axios.create({
    baseURL: "http://ec2-13-50-251-7.eu-north-1.compute.amazonaws.com:5000/api/v1/",
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