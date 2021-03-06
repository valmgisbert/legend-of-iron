import axios from "axios";
//req created as functions(axios req methods)
//here are all the reqs for authentication
//it's v useful in deployment, easier to change the baseURL

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    });
  }

  signup({ username, password, studentName, cohort }) {
    return this.auth
      .post("/auth/signup", { username, password, studentName, cohort })
      .then(({ data }) => data);
    // .then((response) => response.data);
  }

  login({ username, password }) {
    return this.auth
      .post("/auth/login", { username, password })
      .then(({ data }) => data);
    // .then((response) => response.data);
  }

  logout() {
    return this.auth.post("/auth/logout", {}).then(({ data }) => data);
    // return this.auth.post("/auth/logout", {}).then((response) => response.data);
  }

  me() {
    return this.auth.get("/auth/me").then(({ data }) => data);
    // return this.auth.get("/auth/me").then((response) => response.data);
  }

  profile() {
    return this.auth.get("/auth/profile").then(({ data }) => data);
    // return this.auth.get("/auth/profile").then((response) => response.data);
  }
}

const authService = new Auth();
// `authService` is the object with the above axios request methods

export default authService;
