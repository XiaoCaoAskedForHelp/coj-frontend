import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";

// 定义State类型
export interface UserState {
  loginUser: any;
}

const state = () => ({
  loginUser: {
    userName: "未登录",
  },
});

// getters
const getters = {};

// actions
const actions = {
  // 从后端获取登录用户信息
  async getLoginUser(
    { commit, state }: { commit: any; state: UserState },
    payload: any
  ) {
    const res = await UserControllerService.getLoginUserUsingGet();
    if (res.code === 0) {
      commit("updateUser", res.data);
    } else {
      commit("updateUser", {
        ...state.loginUser,
        userRole: ACCESS_ENUM.NOT_LOGIN,
      });
      console.log({
        ...state.loginUser,
        userRole: ACCESS_ENUM.NOT_LOGIN,
      });
    }
  },
};
// mutations
const mutations = {
  updateUser(state: UserState, user: any) {
    state.loginUser = user;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
