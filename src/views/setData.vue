<template>

  <body>
    <div class="setData">
        <input checked="" id="signin" v-model="radioValue" v-on:click="setData" name="action" type="radio" value="aud">
        <label for="signin">Ввод аудиторий</label>
  
        <input id="signup" v-model="radioValue" v-on:click="signInData" name="action" type="radio" value="login" >
        <label for="signup">Войти</label>
  
        <div id="wrapper">
          <div id="arrow"></div>
          <input id="email"  v-model="dataOne" :placeholder='one' type="text">
          <input id="pass" v-model="dataTwo" :placeholder='two' type="text">
        </div>
        <button type="submit" v-on:click="distributor">
          <span>
            <br>
            Проложить путь
            <br>
            Войти
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
    import DataModal from '../modal/data-modal.vue'
    export default {
    components: {
      DataModal,
    },

    data() {
      return {
        isModalVisible: false,
        radioValue: 'aud',
        dataOne: '',
        dataTwo: '',
        one: 'Начальная аудитория',
        two: 'Конечная аудитория'
      };
    },
  
    methods: {
      distributor() {
        if (this.radioValue == "aud") {
          if (this.dataOne == '' && this.dataTwo == '') {
            this.showModal();
          }else {
            this.callMap()
          }
        } else if (this.radioValue == "login") {
          if (this.dataOne == '' && this.dataTwo == '') {
            this.showModal();
          }else {
            this.signin()
          }
        } else {
          console.log("Error")
        }
      },

      signin() {

      },

      callMap() {
        this.$cookies.set("end",this.dataTwo,);
        this.$cookies.set("start",this.dataOne);
        window.location.href = "/map";
      },

      // setCookie() {
      //   this.$cookies.set("end",this.dataTwo,);
      //   this.$cookies.set("start",this.dataOne);
      // },
  
      signInData() {
        this.one = "Логин администратора"
        this.two = "Пароль администратора"
        this.dataOne = ""
        this.dataTwo = ""
      },
  
      setData() {
        this.one = "Начальная аудитория"
        this.two = "Конечная аудитория"
        this.dataOne = ""
        this.dataTwo = ""
      },

      showModal() {
        this.isModalVisible = true;
      },

      closeModal() {
        this.isModalVisible = false;
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
  
  
    footer {
    position: fixed;
    height: 100px;
    width: 100%;
    background: #3586ff;
    bottom: 0;
  }
  
  .social-icon,
  .menu {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    flex-wrap: wrap;
  }
  
  .social-icon__item,
  .menu__item {
    list-style: none;
  }
  
  .social-icon__link {
    font-size: 2rem;
    color: #fff;
    margin: 0 10px;
    display: inline-block;
    transition: 0.5s;
  }
  .social-icon__link:hover {
    transform: translateY(-10px);
  }
  
  .menu__link {
    font-size: 1.2rem;
    color: #fff;
    margin: 0 10px;
    display: inline-block;
    transition: 0.5s;
    text-decoration: none;
    opacity: 0.75;
    font-weight: 300;
  }
  
  .menu__link:hover {
    opacity: 1;
  }
  
  .footer p {
    color: #fff;
    margin: 15px 0 10px 0;
    font-size: 1rem;
    font-weight: 300;
  }
  
  .wave {
    position: absolute;
    top: -100px;
    left: 0;
    width: 100%;
    height: 100px;
    background: url("https://i.ibb.co/wQZVxxk/wave.png");
    background-size: 1000px 100px;
  }
  
  .wave#wave1 {
    z-index: 1000;
    opacity: 1;
    bottom: 0;
    animation: animateWaves 4s linear infinite;
  }
  
  .wave#wave2 {
    z-index: 999;
    opacity: 0.5;
    bottom: 10px;
    animation: animate 4s linear infinite !important;
  }
  
  .wave#wave3 {
    z-index: 1000;
    opacity: 0.2;
    bottom: 15px;
    animation: animateWaves 3s linear infinite;
  }
  
  .wave#wave4 {
    z-index: 999;
    opacity: 0.7;
    bottom: 20px;
    animation: animate 3s linear infinite;
  }
  
  @keyframes animateWaves {
    0% {
      background-position-x: 1000px;
    }
    100% {
      background-positon-x: 0px;
    }
  }
  
  @keyframes animate {
    0% {
      background-position-x: -1000px;
    }
    100% {
      background-positon-x: 0px;
    }
  }
  
  
  </style>
