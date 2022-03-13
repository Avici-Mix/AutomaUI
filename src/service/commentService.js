import universal from "./universal.js";

class Comment extends universal {
  url = "/comments";
  constructor(url) {
    super(url);
  }
}

export default new Comment();
