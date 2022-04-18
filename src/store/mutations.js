import * as types from "./mutation-types";
import state from "./state";

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
  [types.SET_CASH_CATEGORYID]:(state,categoryId)=>{
    state.cash.categoryId = categoryId;
  },
  [types.SET_CASH_CURRENTPAGE]:(state,currentPage)=>{
    state.cash.currentPage = currentPage;
  },
  [types.SET_VIEWCOUNTARR]:(state,arr)=>{
    state.viewCountArr = arr;
  },
};

export default mutations
