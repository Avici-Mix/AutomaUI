import universal from "./universal.js";

class Tag extends universal {
  url = "/tag";
  constructor(url) {
    super(url);
  }
}

export default new Tag();
