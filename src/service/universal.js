import axios from "axios";

export default class Universal {
  constructor(url) {
    this.url = url;
  }

  instance = axios.create({
    baseURL: "http://192.168.1.6:9090",
    crossdomain: true,
  });

  post(params) {
    this.instance
      .post(this.url, params)
      .then(function(response) {
        console.log(response);
        const { data } = response;
        return data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
