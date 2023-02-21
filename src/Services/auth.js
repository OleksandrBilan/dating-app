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
    if (tokenNameIndex == -1) {
      return null;
    }

    let tokenStartIndex = tokenNameIndex + "token".length + 1;
    return decodedCookie.substring(tokenStartIndex);
  }

  static setAuthTokenToCookie(token, expiresAt) {
    let expireDate = new Date(expiresAt);
    document.cookie = `token=${token};expires=${expireDate.toUTCString()};path=/`;
  }
}
