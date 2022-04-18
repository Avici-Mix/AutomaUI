import { getToken } from "@/request/token";

const state = {
  id: "",
  account: "",
  name: "",
  avatar: "",
  token: getToken(),
  cash: {
    currentPage: 1,
    categoryId: 1
  },
  viewCountArr:[]
};

export default state;
