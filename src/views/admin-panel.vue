<template>
    <body>
        <div class="setData">
        <input checked="" id="signin" v-model="radioValue" v-on:click="setData" name="action" type="radio" value="aud">
        <label for="signin">Введите данные для обновления</label>

        <div id="wrapper">
          <div id="arrow"></div>
          <input id="email"  v-model="auditory_id" placeholder="Номер аудитории" type="text">
          <input id="pass" v-model="description" placeholder="Новое описания" type="text">
        </div>
        <button type="submit" v-on:click="update">
          <span>
            <br>
            Обновить описание
            <br>
          </span>
        </button>
    </div>
    
      <footer class="footer">
      <div class="waves">
        <div class="wave" id="wave1"></div>
        <div class="wave" id="wave2"></div>
        <div class="wave" id="wave3"></div>
        <div class="wave" id="wave4"></div>
      </div>
      <ul class="social-icon">
        <li class="social-icon__item"><a class="social-icon__link" href="https://vk.com/donstu">
            <ion-icon name="logo-vk"></ion-icon>
          </a></li>
        <li class="social-icon__item"><a class="social-icon__link" href="https://www.youtube.com/channel/UCKgxOvvp7Eh0D-z4lIdQFhA">
            <ion-icon name="logo-youtube"></ion-icon>
          </a></li>
        <li class="social-icon__item"><a class="social-icon__link" href="#">
            <ion-icon name="logo-instagram"></ion-icon>
          </a></li>
      </ul>
      <p class="social-icon" style="font-size: 20px;font-family: 'Raleway', sans-serif;">Навигационная система Донского Государственного Технического Университета</p>
    </footer>
  </body>
  
  <component :is="'script'" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></component>
  <component :is="'script'" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></component>

  <DataModal v-show="isModalVisible"  @close="closeModal"></DataModal>

    
</template>
      
<script>
import authHeader from '../auth-header';
import axios from 'axios'
  export default {
      data() {
      return {
        auditory_id: '',
        description: '',
        jwtToken: '',
    };
  },

methods: {
  async update() {
    this.jwtToken = this.$cookies.get("token");
    const json = JSON.stringify({ auditory_id: this.auditory_id, description: this.description, token: this.jwtToken});

      await axios({
        headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Authorization: "Bearer " + this.jwtToken,
        },
        method: 'post',
        url: 'http://92.63.99.78:8080/api/v1/auditory/update', 
        data: json 
    }).then(response => {this.coordinates = response.data});
    }
  }
}

</script>
      
<style>
    @import url(http://fonts.googleapis.com/css?family=Raleway:700,800);
  
  html, body { margin: 0; }

  :focus { outline: none; }
  ::-webkit-input-placeholder { color: #DEDFDF; }
  ::-moz-placeholder { color: #DEDFDF; }
  :-moz-placeholder { color: #DEDFDF; }
  ::-ms-input-placeholder { color: #DEDFDF; }

  body {
    background: #317ced;
    color: #fff;
    font-family: 'Raleway', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  #wrapper, label, #arrow, button span { transition: all .5s cubic-bezier(.6,0,.4,1); }

  #wrapper { overflow: hidden; }

  #signin:checked ~ #wrapper { height: 178px; }
  #signin:checked ~ #wrapper #arrow { left: 100px; }
  #signin:checked ~ button span { transform: translate3d(0,-72px,0); }

  #signup:checked ~ #wrapper { height: 178; }
  #signup:checked ~ #wrapper #arrow { left: 260px; }
  #signup:checked ~ button span { transform: translate3d(0,-144px,0); }

  .setData {
    width: 450px;
    height: 370px;
    margin: -185px -225px;
    position: absolute;
    left: 50%;
    top: 50%;
  }

  input[type=radio] { display: none; }

  label {
    cursor: pointer;
    display: inline-block;
    font-size: 22px;
    font-weight: 800;
    opacity: .5;
    margin-bottom: 30px;
    text-transform: uppercase;
  }
  label:hover {
    transition: all .3s cubic-bezier(.6,0,.4,1);
    opacity: 1;
  }
  label[for="signin"] { margin-right: 20px; }
  label[for="reset"] { float: right; }
  input[type=radio]:checked + label { opacity: 1; }

  input[type=text],
  input[type=password] {
    background: #fff;
    border: none;
    border-radius: 8px;
    font-size: 27px;
    font-family: 'Raleway', sans-serif;
    height: 72px;
    width: 99.5%;
    margin-bottom: 10px;
    opacity: 1;
    text-indent: 20px;
    transition: all .2s ease-in-out;
  }
  button {
    background: #1f61c5;
    border: none;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    font-family: 'Raleway', sans-serif;
    font-size: 27px;
    height: 72px;
    width: 100%;
    margin-bottom: 10px;
    overflow: hidden;
    transition: all .3s cubic-bezier(.6,0,.4,1);
  }
  button span {
    display: block;
    line-height: 72px;
    position: relative;
    top: -2px;
    transform: translate3d(0,0,0);
  }
  button:hover {
    background: #007BA5;
  }

  #arrow {
    height: 0;
    width: 0;
    border-bottom: 10px solid #fff;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    position: relative;
    left: 32px;
  }


  #hint {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 20px;
  }

</style>
  