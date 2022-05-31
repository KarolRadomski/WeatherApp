const login = async (userData) => {
  let users = require('./usersData.json');
  let index = users.findIndex((user) => {
    return user.login === userData.name && user.password === userData.password;
  });
  if (index !== -1) {
    localStorage.setItem('user', JSON.stringify(users[index]));
    return users[index];
  } else throw new Error('Złe dane logowania');
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  login,
  logout,
};

export default authService;
