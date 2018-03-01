const User = require('../models').User;

module.exports = function () {

  return Object.freeze({
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail,
    changeStatusActice,
    authenticateUser,
    saveToken,
    getUserByToken,
    getUserByLogin
  });

  async function getUsers(){
    return await User.findAll();
  }

  async function getUserByLogin(Login){
    return await User.findOne({where:{Login}});
  }
  async function authenticateUser(password, user){
    return User.authenticate(password, user);
  }
  async function saveToken(id, Token){
    return await User.update({Token}, { where: { id: id}});
  }
  async function getUserByToken(Token){
    return await User.findOne({where:{Token}});
  }

  async function getUserById(id){
    return await User.findById(id);
  }

  async function getUserByEmail(email){
    return await User.findOne({ where: {email}});
  }

  async function createUser(user){    
    return await User.findOrCreate({
      where: {email: user.email},
      defaults: {
        first_name: user.first_name,
        last_name: user.last_name,
        Password: user.password,
        phone: user.phone,
        email: user.email
      }
    });    
  }

  async function updateUser(newUser){   
    if (newUser.Password){
      return await User.update(
        {
          FirstName: newUser.first_name,
          LastName: newUser.last_name,
          Role: newUser.Role, 
          Password: newUser.Password.toString(),
          PasswordChanged: newUser.PasswordChanged ? newUser.PasswordChanged : false,
          LastLogin: newUser.LastLogin,
          Active: newUser.Active,
          Phone: newUser.Phone,
          ImgUrl: newUser.ImgUrl,
          Login: newUser.Login
        },
        { where: { id:  newUser.id}},     
      );
    } 
    return await User.update(
      {
        FirstName: newUser.first_name,
        LastName: newUser.last_name,
        Role: newUser.Role,         
        PasswordChanged: newUser.PasswordChanged ? newUser.PasswordChanged : false,
        LastLogin: newUser.LastLogin,
        Active: newUser.Active,
        Phone: newUser.Phone,
        ImgUrl: newUser.ImgUrl,
        Login: newUser.Login
      },
      { where: { id:  newUser.id}},     
    );
        
  }

  async function deleteUser(id){
    return await User.destroy(      
      { where: { id:  id}}    
    );
  }
};

async function changeStatusActice(id, active){
  return await User.update(
    { Active: active },
    { where: {id: id }}
  );
}
