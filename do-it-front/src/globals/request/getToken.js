const getToken = () => {
  let accessToken = null;

  const token = localStorage.getItem('doitToken');
  const tokenExp = localStorage.getItem('doitTokenExp');
  const dateNow = new Date().getTime();

  if (new Date(tokenExp).getTime() > dateNow) {
    accessToken = token;
    return accessToken;
  } else {
    localStorage.removeItem('doitToken');
    localStorage.removeItem('doitTokenExp');
    return false;
  }
};

export default getToken;
