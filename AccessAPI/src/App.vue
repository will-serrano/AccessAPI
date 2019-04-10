<template>
  <div id="AppContainer">
    <h1>Access API</h1>
    <span class="linha-erro" v-show="mensagemErro!=null">{{ mensagemErro }}</span>
    <span class="linha-form">
      <label>Consulta de CEP</label>
      <input type="text" name="cep" id="txtCep" placeholder="Digite um CEP válido" v-model="cep">
      <button v-on:click="ObterEndereco">Consultar</button>
      <button v-on:click="Limpar">Limpar</button>
      <!-- <button v-on:click="ObterUsuario">Obter Usuário</button> -->
    </span>
    <span class="dados" v-show="retornoConsulta!=null">
      <label for="infoLogradouro">Logradouro: {{dadosEndereco.logradouro}}</label>

      <label for="infoComplemento">Complemento: {{dadosEndereco.complemento}}</label>

      <label for="infoBairro">Bairro: {{dadosEndereco.bairro}}</label>

      <label for="infoCidade">Cidade: {{dadosEndereco.localidade}}/{{dadosEndereco.uf}}</label>

      <label for="infoCep">CEP: {{dadosEndereco.cep}}</label>
    </span>
    <span>{{usuario}}</span>
  </div>
</template>

<script>
import CEP from "./services/ConsultaCEP.js";
import Usuario from "./services/ObtemUsuario.js";

export default {
  data() {
    return {
      cep: "",
      dadosEndereco: {
        logradouro: "",
        complemento: "",
        bairro: "",
        localidade: "",
        uf: "",
        cep: ""
      },
      retornoConsulta: null,
      mensagemErro: null,
      usuario: null
    };
  },
  methods: {
    ObterEndereco: function(event) {
      if (this.cep == "") {
        this.dadosEndereco = {
          logradouro: "",
          complemento: "",
          bairro: "",
          localidade: "",
          uf: "",
          cep: ""
        };
        this.retornoConsulta = null;
        this.mensagemErro = "Preencha o campo CEP";
        this.cep = "";
      } else {
        CEP.obterEncereco(this.cep)
          .then(res => {
            this.mensagemErro = null;
            this.dadosEndereco = {
              logradouro: res.data.logradouro,
              complemento: res.data.complemento,
              bairro: res.data.bairro,
              localidade: res.data.localidade,
              uf: res.data.uf,
              cep: res.data.cep
            };
            this.retornoConsulta = true;
          })
          .catch(ex => {
            this.dadosEndereco = {
              logradouro: "",
              complemento: "",
              bairro: "",
              localidade: "",
              uf: "",
              cep: ""
            };
            this.retornoConsulta = null;
            this.mensagemErro = ex;
            console.log("ERRO: " + ex);
          });
      }
    },
    Limpar: function(event) {
      this.dadosEndereco = {
        logradouro: "",
        complemento: "",
        bairro: "",
        localidade: "",
        uf: "",
        cep: ""
      };
      this.retornoConsulta = null;
      this.mensagemErro = null;
      this.cep = "";
    },
    ObterUsuario: function(event) {
      Usuario.obter().then(res => {
        this.usuario = res.data;
      });
    }
  }
};
</script>

<style>
h1,
span,
span button,
span input {
  padding: 5px;
  border-radius: 5px;
  margin: 5px;
  font-family: "Courier New", Courier, monospace;
}

span button {
  cursor: pointer;
}
.linha-erro {
  display: block;
  color: white;
  padding: 5px;
  border-radius: 5px;
  background-color: brown;
  padding-left: 20px;
}

.dados label {
  display: block;
}
</style>
