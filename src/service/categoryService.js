import universal from "./universal.js";

class Category extends universal {
  url = "/category";
  constructor(url) {
    super(url);
  }
}

export default new Category();