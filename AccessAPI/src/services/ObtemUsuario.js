import {
  http
} from './config'

export default {

  obter: () => {

    return http.get("https://randomuser.me/api/").then(res => {
      return res;
    }).catch(ex => {
      console.log(ex);
      throw 'Ocorreu um erro ao obter usuário.';
    });

  }

}
