import universal from "./universal.js";

class User extends universal {
  url = '/user/register';
  constructor(url){
    super(url)
  }
}

export default new User();
