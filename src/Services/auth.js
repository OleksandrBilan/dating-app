import axios from "axios";

export class AuthService {
  static setAuthTokenToAxios(token) {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }

  static getToken() {
    let decodedCookie = decodeURIComponent(document.cookie);
    let tokenNameIndex = decodedCookie.indexOf("token");
    if (tokenNameIndex === -1) {
      return null;
    }

    let tokenStartIndex = tokenNameIndex + "token".length + 1;
    return decodedCookie.substring(tokenStartIndex);
  }

  static setAuthTokenToCookie(token, expiresAt) {
    let expireDate = new Date(expiresAt);
    document.cookie = `token=${token};expires=${expireDate.toUTCString()};path=/`;
  }

  static deleteAuthTokenCookie() {
    document.cookie = "token=; Max-Age=-99999999;";
  }

  static removeAuthTokenFromAxios() {
    delete axios.defaults.headers.common["Authorization"];
  }

  static saveUserInfo(user) {
    try {
      const serializedInfo = JSON.stringify(user);
      localStorage.setItem("user", serializedInfo);
    } catch (e) {
      console.log(e);
    }
  }

  static getUserInfo() {
    try {
      const serializedInfo = localStorage.getItem("user");
      if (!serializedInfo) {
        return null;
      }
      return JSON.parse(serializedInfo);
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
