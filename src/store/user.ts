import { ActionContext } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";

interface State {
  username: string;
}

const state = () => ({
  loginUser: {
    username: "未登录",
    userRole: ACCESS_ENUM.NOT_LOGIN,
  },
});

// getters
const getters = {};

// actions
const actions = {
  // 从后端获取登录用户信息
  getLoginUser({ commit, state }: ActionContext<State, State>, user: any) {
    commit("updateUser", user);
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
