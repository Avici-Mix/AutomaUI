import {getToken} from '@/request/token'

const state = {
  id: "",
  account: "",
  name: "",
  avatar: "",
  token: getToken(),
};

export default state;
