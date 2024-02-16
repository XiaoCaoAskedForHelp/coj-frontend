import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  // console.log("登录用户信息:", store.state.user.loginUser);
  let loginUser = store.state.user.loginUser;
  // 如果之前未登录过，自动登录
  if (!loginUser || !loginUser.userRole) {
    await store.dispatch("user/getLoginUser");
  }
  // 更新登录用户信息
  loginUser = store.state.user.loginUser;
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  // 如果用户访问的页面不需要登录，不需要跳转到登录页
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    next();
  } else {
    // console.log("用户登录信息:", loginUser);
    // 如果用户访问的页面需要登录，但是当前用户未登录即（没有userRole），跳转到登录页
    if (loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
      // 不能单写path，不然不能带上redirect参数，下面两种写法都可以
      // next(`/user/login?redirect=${to.fullPath}`);
      next({ path: "/user/login", query: { redirect: to.fullPath } });
    } else {
      // 如果用户访问的页面需要登录，且当前用户已登录，但是没有权限，跳转到403页面
      if (!checkAccess(loginUser, needAccess)) {
        next({ path: "/noAuth" });
      } else {
        next();
      }
    }
  }
});
