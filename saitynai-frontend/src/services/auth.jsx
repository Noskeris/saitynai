import Cookies from 'js-cookie';
import axios from 'axios';

async function renewToken() {
  try {
    const result = await axios.post(
      //'https://nojus-saitynai-api.azurewebsites.net/api/auth/refresh',
      'https://localhost:7235/api/auth/refresh',
      {},
      { withCredentials: true }
    );

    const token = result.data.accessToken;
    setCookies(token);
    return getUserInfo();
  } catch (error) {
    removeCookies();
    window.location.href = '/login';
    return null;
  }
}

async function logout() {
  try {
    await axios.post(
      //'https://nojus-saitynai-api.azurewebsites.net/api/auth/logout',
      'https://localhost:7235/api/auth/logout',
      {},
      { withCredentials: true }
    );

    return true;
  } catch (error) {
    return false;
  }
}

function setCookies(cookie1) {
  Cookies.set('accessToken', cookie1);
}

function removeCookies() {
  Cookies.remove('accessToken');
  Cookies.remove('RefreshToken');
}

function getUserInfo() {
  const token = Cookies.get('accessToken');

  if (token) {
    let payloadBase64 = token.split('.')[1];
    let base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    const decodedJwt = JSON.parse(window.atob(base64));

    return { decodedJwt };
  }
  return null;
}

function getToken() {
  return Cookies.get('accessToken');
}

const authService = {
  renewToken,
  setCookies,
  removeCookies,
  getUserInfo,
  getToken,
  logout,
};

export default authService;