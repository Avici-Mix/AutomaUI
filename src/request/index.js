import store from "@/store";
import { getToken } from "./token";
import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:9091",
  crossdomain: true,
  timeout: 10000,
});

// axios request 拦截器
service.interceptors.request.use(
  (config) => {
    if (store.state.token) {
      config.headers["Oauth-Token"] = getToken();
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    // 超时的全局处理
    if (response.headers["session_time_out"] == "timeout") {
      store.dispatch("fedLogOut");
    }
    const res = response.data;

    // 0 为成功状态
    if (res.code !== 200) {
      // 90001 session超时
      if (res.code === 90001) {
        return Promise.reject("error");
      }

      // 90002  用户未登录
      if (res.code === 90002) {
        this.$message({
          type: "warning",
          showClose: true,
          message: "未登录或登录超时，请重新登录",
        });
        return Promise.reject("error");
      }

      //70001 权限认证错误
      if (res.code === 70001) {
        this.$message({
          type: "warning",
          showClose: true,
          message: "你没有权限访问哦",
        });
        return Promise.reject("error");
      }
      return Promise.reject(res.msg);
    } else {
      return response.data;
    }
  },
  (error) => {
    this.$message({
      type: "warning",
      showClose: true,
      message: "连接超时",
    });
    return Promise.reject("error");
  }
);


export default service