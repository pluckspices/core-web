class AuthReducer {
  constructor() {
    this.isAuth = true;
  }

  setIsAuth(value) {
    console.log("setIsAuth called", value);
    this.isAuth = value;
  }

  getIsAuth() {
    return this.isAuth;
  }
}

const AuthStore = new AuthReducer();
export default AuthStore;
