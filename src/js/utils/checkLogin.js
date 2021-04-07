export default function checkLogin() {
  if (localStorage.isLogin === 'true') {
    return true;
  }
  else if ((localStorage.isLogin === 'false') || !localStorage.isLogin) {
  return false;
  }
}