import Cookie from "js-cookie";
import SSRCookie from "cookie";
import jwt_decode from "jwt-decode";

export function setAuthCredentials(token, permissions) {
  Cookie.set("AUTH_CRED", JSON.stringify({ token, permissions }));
}

export function getAuthCredentials(context) {
  let authCred;
  if (context) {
    authCred = parseSSRCookie(context)["AUTH_TOKEN"];
    // TODO: validate token and get new token
  } else {
    authCred = Cookie.get("AUTH_CRED");
  }
  if (authCred) {
    return { token: authCred, user: jwt_decode(authCred) };
  }
  return { token: null, user: null };
}

export function parseSSRCookie(context) {
  return SSRCookie.parse(context.req.headers.cookie ?? "");
}
