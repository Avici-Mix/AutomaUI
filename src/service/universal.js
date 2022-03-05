import request from "@/request";

export default class Universal {
  constructor(url) {
    this.url = url;
  }

  async post(url, params) {
    if (!url) {
      url = this.url;
    }
    return request.post(url, params);
  }

  get(url, params) {
    if (!url) {
      url = this.url;
    }
    return request.get(url, params);
  }
}
