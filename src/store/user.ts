import { ActionContext } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";

interface State {
  loginUser: {
    username: string;
  };
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
    { commit, state }: ActionContext<State, any>,
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
  updateUser(state: any, user: any) {
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
