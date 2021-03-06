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

  // user updated correct
  'USER_EDIT': 'Información del usuario actualizada correctamente',

  // user update img
  'USER_IMG_UPDATE': 'Imagen actualizada correctamente',

  // Email must be unique
  'EMAIL_UNIQUE': 'El email ya esta en uso',

  // Username must be unique
  'USERNAME_UNIQUE': 'El nombre de usuario ya esta en uso',

  // Email bad format
  'EMAIL_BAD_FORMAT': 'El campo email no tiene el formato correcto',

  // Home edited
  'HOME_EDITED_OK': 'Alojamiento editado correctament',

  // Home removed
  'HOME_REMOVED_OK': 'Alojamiento borrado correctamente',

  // User already subscribe at home
  'USER_SUBSCIBE_EXIST': 'Ya está subscrito a este alojamiento',

  // User already is a roomer of a home
  'USER_IN_HOME': 'Al ya pertenecer a un piso, no puede enviar mas solicitudes, primero debe de dejar el piso en el que se encuentra',

  // User subscribe at home
  'USER_SUBSCIBE_OK': 'Se ha enviado su peticion al piso, correctamente',

  // User desubsribe home
  'USER_DESUBSCRIBE_OK': 'Se a eliminado su subscribción correctamente',

  // User is a roomer of a home
  'USER_IS_A_ROOMER': 'El usuario ya es inquilino de una vivienda',

  // User not have a roomer
  'USER_NOT_IS_ROOMER': 'El usuario no es inquilino de una vivienda',

  // User is asigned to a roomer
  'USER_ROOMER_SUCCESS': 'El usuario a pasado a ser inquilino de la vivienda correctamente',

  // roomer remove successfully
  'ROOMER_REMOVE_SUCEES': 'El inquilino ha sido eliminado del piso correctamente',

  // user subscription denied
  'USER_SUBSCIBE_DENIED': 'El usuario ha sido rechazado como posible inquilino',

  // Error user auth in home
  'USER_ERROR_AUTH': 'Lo sentimo pero no puede actuar sobre viviendas de las que no es propietario',

  // Message send successfully
  'MESSAGE_SEND_SUCCESS': 'El mensaje ha sido enviado correctamente',

  empty(value) {
    return 'El campo ' + value + ' no puede estar vacio';
  }
};


module.exports = MESSAGE;
