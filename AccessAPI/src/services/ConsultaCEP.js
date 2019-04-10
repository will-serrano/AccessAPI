import {
  http
} from './config'

export default {

  obterEncereco: (cep) => {

    return http.get("/" + cep.toString() + "/json ").then(res => {
      return res;
    }).catch(ex => {
      console.log(ex);
      throw 'Ocorreu um erro ao consultar o CEP informado.';
    });

  }

}
