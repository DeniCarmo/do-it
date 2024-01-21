import getToken from './getToken';

const logout = async () => {
  const accessToken = getToken();

  if (accessToken) {
    localStorage.removeItem('doitToken');
    localStorage.removeItem('doitTokenExp');
  }
};

export default logout;
