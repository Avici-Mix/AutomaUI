import axios from "axios";

const instance = axios.create({
  baseURL:'http://192.168.1.6:9090',
  crossdomain: true,
})

class User {
  get(url) {}

  post() {
    instance
      .post("/user/register", {
        username: "test3",
        password: "1234343",
        email: "18881570@qq.com",
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

export default new User();
