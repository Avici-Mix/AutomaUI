import * as types from "./mutation-types";
import { login, getUserInfo, logout, register } from "@/service/userService";

import { setToken, removeToken } from "@/request/token";

const actions = {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      login(user.account, user.password)
        .then((data) => {
          if (data.success) {
            commit("SET_TOKEN", data.data);
            setToken(data.data);
            resolve();
          } else {
            reject(data.msg);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 获取用户信息
  getUserInfo({ commit, state }) {
    let that = this;
    return new Promise((resolve, reject) => {
      getUserInfo(state.token)
        .then((data) => {
          if (data.success) {
            commit(types.SET_ACCOUNT, data.data.account);
            commit(types.SET_NAME, data.data.nickname);
            commit(types.SET_AVATAR, data.data.avatar);
            commit(types.SET_ID, data.data.id);
            resolve(data);
          } else {
            commit(types.SET_ACCOUNT, "");
            commit(types.SET_NAME, "");
            commit(types.SET_AVATAR, "");
            commit(types.SET_ID, "");
            removeToken();
            resolve(data);
          }
        })
        .catch((error) => {
          commit(types.SET_ACCOUNT, "");
          commit(types.SET_NAME, "");
          commit(types.SET_AVATAR, "");
          commit(types.SET_ID, "");
          removeToken();
          reject(error);
        });
    });
  },
  // 退出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then((data) => {
          if (data.success) {
            commit(types.SET_TOKEN, "");
            commit(types.SET_ACCOUNT, "");
            commit(types.SET_NAME, "");
            commit(types.SET_AVATAR, "");
            commit(types.SET_ID, "");
            removeToken();
            resolve();
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 前端 登出
  fedLogOut({ commit }) {
    return new Promise((resolve) => {
      commit(types.SET_TOKEN, "");
      commit(types.SET_ACCOUNT, "");
      commit(types.SET_NAME, "");
      commit(types.SET_AVATAR, "");
      commit(types.SET_ID, "");
      removeToken();
      resolve();
    }).catch((error) => {
      reject(error);
    });
  },

  register({ commit }, user) {
    return new Promise((resolve, reject) => {
      register(user.account, user.nickname, user.password)
        .then((data) => {
          if (data.success) {
            commit(types.SET_TOKEN, data.data);
            setToken(data.data);
            resolve();
          } else {
            reject(data.msg);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default actions;