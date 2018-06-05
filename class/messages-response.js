const MESSAGE = {

  // Text when all have a normal funcionality
  'OK': 'Ok',

  // There are some problem with the database
  'DDBB_ERROR': 'Error con la base de datos',

  // Some problem on the login
  'AUTH_FAIL': 'Error en la autenticación',

  // Auth token not valid
  'AUTH_TOKEN_FAIL': 'AuthToken no valido',

  // route not exist
  'ROUTE_NOT_EXIST': 'Lo sentimos pero dicha ruta no existe',

  // user register correct
  'USER_CREATED': 'Usuario creado correctamente',

  // ilegal age
  'USER_ILEGAL_AGE': 'Es necesario ser mayor de edad',

  // Email must be unique
  'EMAIL_UNIQUE': 'El email ya esta en uso',

  // Username must be unique
  'USERNAME_UNIQUE': 'El nombre de usuario ya esta en uso',

  'EMAIL_BAD_FORMAT': 'El campo email no tiene el formato correcto',

  empty(value) {
    return 'El campo ' + value + ' no puede estar vacio';
  }
};


module.exports = MESSAGE;
