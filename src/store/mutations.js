import * as types from "./mutation-types";

const mutations = {
  [types.SET_ACCOUNT]: (state, account) => {
    state.account = account;
  },
  [types.SET_AVATAR]: (state, avatar) => {
    state.avatar = avatar;
  },
  [types.SET_NAME]: (state, name) => {
    state.name = name;
  },
  [types.SET_TOKEN]: (state, token) => {
    state.token = token;
  },
  [types.SET_ID]: (state, id) => {
    state.id = id;
  },
};

export default mutations
