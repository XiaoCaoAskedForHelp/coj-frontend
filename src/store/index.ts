import { createStore } from "vuex";
import user, { UserState } from "@/store/user";

// 根状态类型定义，如果有多个模块，也可以在这里添加
interface RootState {
  user: any;
}

export default createStore<RootState>({
  mutations: {},
  actions: {},
  modules: {
    user,
  },
});
