import React from 'react';

import {View} from 'react-native';

import AuthRoutes from './auth.routes';

import AppRoutes from './AppRoutes';

function Routes() {
  const loading = false;
  const signed = false;

  return signed ? <View></View> : <AuthRoutes />;
}

export default Routes;

/*


PARA NAO ESQUECER, SE ESTA LOGADO CAI PRA VIEW, SE NAO PRO OUTRO, POREM TEM QUE VER FUNCIONALIDADE AGORA QUE MUDAMOS 

<Routes />


remover isso, direcionar direto para routes 


*/
