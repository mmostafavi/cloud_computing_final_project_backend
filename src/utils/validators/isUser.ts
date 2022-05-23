export default function (isAuth: boolean, userData: any) {
  return isAuth && userData.userType === "user";
}
