import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 检查用户是否有权限
 * @param loginUser 当前登录用户
 * @param needAccess 需要的权限
 */
const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  // 获取当前用户具有的权限，如果没有loginUser，则默认为未登录
  const loginUserAccess = loginUser
    ? loginUser?.userRole
    : ACCESS_ENUM.NOT_LOGIN;
  if (needAccess == ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  // 如果用户才能访问
  else if (needAccess === ACCESS_ENUM.USER) {
    return loginUserAccess !== ACCESS_ENUM.NOT_LOGIN;
  }
  // 如果是管理员才能访问
  else if (needAccess === ACCESS_ENUM.ADMIN) {
    return loginUserAccess === ACCESS_ENUM.ADMIN;
  }
  return true;
};

export default checkAccess;
