<template>
    <div v-if="show" class="modal-shadow" @click.self="close">
      <div  class="setData" >
        <div class="modal-close" @click="close">&#10006;<br><br></div>
          <label for="signin">Введите данные для входа</label>
  
          <input id="email"  v-model="dataOne" placeholder="Логин" type="text">
          <input id="pass" v-model="dataTwo" placeholder="Пароль" type="password">
  
          <button class="signBtn" type="submit" v-on:click="signin">Войти</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
      data() {
      return {
        dataOne: '',
        dataTwo: '',
        jwtToken: '',
    };
  },
    name: "SignInModal",
        data: function () {
            return {
                show: true
            }
        },
    methods: {
        async signin() {
    const json = JSON.stringify({login: this.dataOne, password: this.dataTwo});
        await axios({
            method: 'post',
            url: 'http://92.63.99.78:8080/api/v1/user/signin', 
            data: json 
        }).then(response => {
          this.jwtToken = response.data['token'];
          this.$cookies.set("token", this.jwtToken)
          window.location.href = "/admin-panel";});
    },
    close: function () {
          this.$emit('close');
      }
    }
  }
  </script>
  
  <style scoped
  lang="scss">
  .modal-shadow {
        position: absolute;
        top: 0;
        left: 0;
        min-height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.39);
    }
    .setData {
        background: #226fe2;
        border-radius: 10px;
        padding: 15px;
        min-width: 470px;
        max-width: 480px;
        position: absolute;
    }

    @media screen  and (max-width: 1015px) {
        label[for="signin"] { margin-right: 20px; font-size: 11px; }
      label[for="signup"] { margin-right: 20px; font-size: 11px; }
      label[for="importantPlaces"] { margin-right: 20px; font-size: 11px; }
        .setData {
        background: #226fe2;
        border-radius: 10px;
        /* padding: 15px; */
        margin-left: -60%;
        min-width: 200px;
        max-width: 280px;
        position: absolute;
    }
      .setData #email, #pass {
        background: #fff;
        border: none;
        border-radius: 8px;
        font-size: 20px;
        font-family: 'Raleway', sans-serif;
        height: 72px;
        width: 100%;
        margin-bottom: 20px;
        opacity: 1;
        text-indent: 20px;
        transition: all .2s ease-in-out;
      }

      .setData .signBtn {
        background: #1f61c5;
        border: none;
        border-radius: 8px;
        color: #fff;
        cursor: pointer;
        font-family: 'Raleway', sans-serif;
        font-size: 27px;
        height: 71px;
        width: 102%;
        margin-bottom: 10px;
        overflow: hidden;
        transition: all .3s cubic-bezier(.6,0,.4,1);
      }
    }
  </style>