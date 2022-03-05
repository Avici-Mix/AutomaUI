import universal from "./universal.js";

class Article extends universal {
  url = "/article";
  constructor(url) {
    super(url);
  }
}

export default new Article();
