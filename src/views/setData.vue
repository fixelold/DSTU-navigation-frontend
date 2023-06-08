<template>
    
    <input type="checkbox" id="nav-toggle" hidden>

    <nav class="nav">

        <label for="nav-toggle" class="nav-toggle" onclick></label>

        <h2 class="logo"> 
            <a>Навигатор ДГТУ</a> 
        </h2>
        <ul>
            <li v-on:click="signInModal"><a>Вход для администратора</a></li>
            <li><a href="#2">Инструкция</a></li>
            <li><a href="#3">Эвакуация</a></li>
        </ul>
    </nav>
 
  <body>
      <div class="inputData">
        <input id="signin" v-model="radioValue" v-on:click="setData" name="action" type="radio" value="aud" checked>
        <label for="signin">Ввод аудиторий</label>

        <!-- <input id="signup" v-model="radioValue" v-on:click="signInData" name="action" type="radio" value="login" >
        <label for="signup">Войти</label> -->

        <input id="importantPlaces" v-model="radioValue" v-on:click="importantPlacesData" name="action" type="radio" value="importantPlaces" >
        <label for="importantPlaces">Важные места</label>
  
  
        <div id="wrapper">
          <div id="arrow"></div>

          <input class="oneInput" id="email"  v-model="dataOne" :placeholder='one' type="text">

          <input class="oneInput" id="pass" v-model="dataTwo" :placeholder='two' type="text">

          <select id="selectedPlaces" v-model="dataTwo">
            <option v-for="importantPlace in importantPlacesName" v-bind:key="importantPlace.name">{{importantPlace.name}}</option>
          </select>

        </div>
        <button class="btn" type="submit" v-on:click="distributor">
          <span>
            <br>
            Проложить путь
            <br>
          </span>
        </button>

        <div class="toggle">
          <input type="checkbox" class="check" v-model="checked">
          <b class="b switch"></b>
          <b class="b track"></b>
        </div>

        <div class="icon-human">
          <img src="../../data/icons/pngwing.com.png">
        </div>

        <div class="icon-elevator">
          <img src="../../data/icons/icons8-доступ-для-инвалидов-48.png">
        </div>
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
      <p class="social-icon" style="font-size: 20px;font-family: 'Raleway', sans-serif;">Навигационная система ДГТУ</p>
    </footer>

    <!-- <button type="submit" class="admin" v-on:click="signInModal">Вход администратора</button> -->
    <!-- <button type="submit" class="evacuation" v-on:click="evacuation">Эвакуация</button> -->
  
  </body>
  
  <component :is="'script'" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></component>
  <component :is="'script'" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></component>

  <DataModal v-show="isModalVisible"  @close="closeModal"></DataModal>
  <LoginModal v-show="isModalVisibleLogin"  @close="closeLoginModal"></LoginModal>
  <SignInModal v-show="isSignInModal"  @close="closeSignInModal"></SignInModal>
</template>
    
<script>
  import axios from 'axios'
  import DataModal from '../modal/data-modal.vue'
  import SignInModal from '../modal/signin-modal.vue'
  export default {
  components: {
    DataModal,
    SignInModal,
  },

  data() {
    return {
      isModalVisible: false,
      isModalVisibleLogin: false,
      radioValue: 'aud',
      dataOne: '',
      dataTwo: '',
      one: 'Начальная аудитория',
      two: 'Конечная аудитория',
      jwtToken: '',
      responseStatus: '',
      importantPlacesName: [],
      importantPlaces: [],
      selectedImportantPlaces: '',
      tmp: '',
      checked: false, // нужен ли пользователю лифт
      isSignInModal: false
    };
  },

  methods: {
    signInModal() {
      this.isSignInModal = true;
    },

    closeSignInModal() {
      this.isSignInModal = false;
    },

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

        } else {
          this.signin().then(() => {
          })
        }
      }  else if (this.radioValue == "importantPlaces") {
          if (this.dataOne == ''&& this.dataTwo == '') {
            this.showModal();
          } else {
            for (let i = 0; i < this.importantPlacesName.length; i++) {
              if (this.importantPlacesName[i].name == this.dataTwo) {
                this.dataTwo = this.importantPlaces[i].auditory_number
                // this.$cookies.set("opa", this.dataTwo);
                break
              }
            }
            this.callMap()
          }
        } else {
        console.log("Error")
      }
    },

    async getImportantPlaces() {
      await axios 
              .get("http://92.63.99.78:8080/api/v1/places/list")
              .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                  this.importantPlacesName.push({name: response.data[i].name})
                  this.importantPlaces.push(response.data[i])
                }
              })
    },

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

    callMap() {
      this.$cookies.set("end", this.dataTwo);
      this.$cookies.set("start",this.dataOne);
      this.$cookies.set("checked",this.checked);
      window.location.href = "/map";
    },

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

    importantPlacesData() {
      this.one = "Начальная аудитория"
      this.dataOne = ""
      this.dataTwo = ""
    },

    showModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
    },

    showLoginModal() {
      this.isModalVisibleLogin = true;
    },

    closeLoginModal() {
      this.isModalVisibleLogin = false;
    }
  },

    mounted() {
      this.getImportantPlaces();
  }
}

</script>
    
<style>
    @import url(http://fonts.googleapis.com/css?family=Raleway:700,800);
  
    .inputData {
      width: 50%;
      height: 50%;
      /* margin: -1% -3%; */
      position: absolute;
      left: 25%;
      top: 20%;
      /* min-width: 48%; */

    }

    .admin {
      width: 150px;
      height: 50px;
      font-size: 15px;
      float: right;
    }

    footer {
    position: fixed;
    height: 100px;
    width: 100%;
    background: #3586ff;
    bottom: 0;
  }

  [id='nav-toggle']:checked ~ .nav {
    left: 0;
    box-shadow:4px 0px 20px 0px rgba(0,0,0, 0.5);
    -moz-box-shadow:4px 0px 20px 0px rgba(0,0,0, 0.5);
    -webkit-box-shadow:4px 0px 20px 0px rgba(0,0,0, 0.5);
    overflow-y: auto;
}

    @media screen  and (max-width: 1015px) {
      .admin {
        width: 150px;
        height: 50px;
        font-size: 15px;
        float: right;
        top: 100px;
    }
      [id='nav-toggle']:checked ~ .nav {
        background: #1f61c5;
        left: 0;
        box-shadow:4px 0px 20px 0px rgba(0,0,0, 0.5);
        -moz-box-shadow:4px 0px 20px 0px rgba(0,0,0, 0.5);
        -webkit-box-shadow:4px 0px 20px 0px rgba(0,0,0, 0.5);
        overflow-y: auto;
    }
      label[for="signin"] { margin-right: 20px; font-size: 11px; }
      label[for="signup"] { margin-right: 20px; font-size: 11px; }
      label[for="importantPlaces"] { margin-right: 20px; font-size: 11px; }
        .inputData {
        width: 80%;
        height: 50%;
        position: absolute;
        left: 15%;
        top: 20%;
      }
      #wrapper .oneInput {
        background: #fff;
        border: none;
        border-radius: 8px;
        font-size: 20px;
        font-family: 'Raleway', sans-serif;
        height: 72px;
        width: 90%;
        margin-bottom: 20px;
        opacity: 1;
        text-indent: 20px;
        transition: all .2s ease-in-out;
      }
      #wrapper #arrow {
        display: none;
        /* overflow: hidden; */
      }
      .btn {
        background: #1f61c5;
        border: none;
        border-radius: 8px;
        color: #fff;
        cursor: pointer;
        font-family: 'Raleway', sans-serif;
        font-size: 27px;
        height: 71px;
        width: 91%;
        margin-bottom: 10px;
        overflow: hidden;
        transition: all .3s cubic-bezier(.6,0,.4,1);
      }

      #wrapper #selectedPlaces {
        background: #fff;
        border: none;
        border-radius: 8px;
        font-size: 27px;
        font-family: 'Raleway', sans-serif;
        height: 40px;
        width: 91%;
        margin-bottom: 20px;
        opacity: 1;
        text-indent: 20px;
        transition: all .2s ease-in-out;
    }

  .inputData .toggle {
    position: absolute;
    top: -32%;
    left: 83%;
    width: 60px;
    height: 40px;
    border-radius: 100px;
    background-color: #ddd;
    margin: -20px -40px;
    overflow: hidden;
    box-shadow: inset 0 0 2px 1px rgba(0,0,0,.05);
  }

  .inputData .icon-human {
    position: absolute;
    top: -39%;
    left: 57%;
  }

  .inputData .icon-elevator {
    position: absolute;
    top: -39%;
    left: 90%;
  }

  .footer .social-icon,
  .menu {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    flex-wrap: wrap;
    padding: 0px;
  }

  }

  @media screen  and (min-width: 670px) {
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
  }

    #selectedPlaces {
      background: #fff;
      border: none;
      border-radius: 8px;
      font-size: 27px;
      font-family: 'Raleway', sans-serif;
      height: 40px;
      width: 99.5%;
      margin-bottom: 20px;
      opacity: 1;
      text-indent: 20px;
      transition: all .2s ease-in-out;
    }
  
    #signin:checked ~ #wrapper { height: 178px; }
    #signin:checked ~ #wrapper #arrow { left: 100px; }
    #signin:checked ~ button span { transform: translate3d(0,-72px,0); }
  
    #importantPlaces:checked ~ #wrapper { height: 178px; }
    #importantPlaces:checked ~ #wrapper #arrow { left: 320px; }
    #importantPlaces:checked ~ button span { transform: translate3d(0,-72px,0); }
    #importantPlaces:checked ~ #wrapper #pass  { display: none; }

    #signup:checked ~ #wrapper { height: 178px; }
    #signup:checked ~ #wrapper #arrow { left: 330px; }
    #signup:checked ~ button span { transform: translate3d(0,-144px,0); }
  

    label[for="signin"] { margin-right: 20px; }
    label[for="signup"] { margin-right: 20px; }
  
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

.check {
  position: absolute;
  display: block;
  cursor: pointer;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 6;
}

.check:checked ~ .track {
  box-shadow: inset 0 0 0 20px #1f61c5;
}

.check:checked ~ .switch {
  right: 2px;
  left: 22px;
  transition: .35s cubic-bezier(0.785, 0.135, 0.150, 0.860);
  transition-property: left, right;
  transition-delay: .05s, 0s;
}

.switch {
  position: absolute;
  left: 2px;
  top: 2px;
  bottom: 2px;
  right: 22px;
  background-color: #fff;
  border-radius: 36px;
  z-index: 1;
  transition: .35s cubic-bezier(0.785, 0.135, 0.150, 0.860);
  transition-property: left, right;
  transition-delay: 0s, .05s;
  box-shadow: 0 1px 2px rgba(0,0,0,.2);
}

.track {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  transition: .35s cubic-bezier(0.785, 0.135, 0.150, 0.860);
  box-shadow: inset 0 0 0 2px rgba(0,0,0,.05);
  border-radius: 40px;
}

.toggle {
  position: absolute;
  top: 5%;
  left: 87%;
  width: 60px;
  height: 40px;
  border-radius: 100px;
  background-color: #ddd;
  margin: -20px -40px;
  overflow: hidden;
  box-shadow: inset 0 0 2px 1px rgba(0,0,0,.05);
}

.icon-human {
  position: absolute;
  top: -2%;
  left: 75%;
}

.icon-elevator {
  position: absolute;
  top: -2%;
  left: 91%;
}

.evacuation {
  background: #1f61c5;
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-family: 'Raleway', sans-serif;
  font-size: 20px;
  height: 71px;
  width: 10%;
  /* top: -30%; */
  margin-bottom: 10px;
  overflow: hidden;
  transition: all .3s cubic-bezier(.6,0,.4,1);
}
 
 .nav {
  font-family: 'Raleway', sans-serif;
    /*  ширна произвольная, не стесняйтесь экспериментировать */
    width: 320px;
    min-width: 320px;
    /* фиксируем и выставляем высоту панели на максимум */
    height: 100%;
    position: fixed;
    top: -2%;
    bottom: 0;
    margin: 0;
    /* сдвигаем (прячем) панель относительно левого края страницы */
    left: -320px;
    /* внутренние отступы */
    padding: 15px 20px;
    /* плавный переход смещения панели */
    -webkit-transition: left 0.3s;
    -moz-transition: left 0.3s;
    transition: left 0.3s;
    /* определяем цвет фона панели */
    /* background: #1f61c5; */
    /* поверх других элементов */
    z-index: 2000;
}

.nav-toggle {
    /* абсолютно позиционируем */
    position: absolute;
    /* относительно левого края панели */
    left: 320px;
    /* отступ от верхнего края панели */
    top: 0em;
    /* внутренние отступы */
    padding: 0.5em;
    /* определяем цвет фона переключателя
     * чаще вчего в соответствии с цветом фона панели
    */
    background: inherit;
    /* цвет текста */
    color: #f7f5f5;
    /* вид курсора */
    cursor: pointer;
    /* размер шрифта */
    font-size: 2.2em;
    line-height: 1;
    /* всегда поверх других элементов страницы */
    z-index: 2001;
    /* анимируем цвет текста при наведении */
    -webkit-transition: color .25s ease-in-out;
    -moz-transition: color .25s ease-in-out;
    transition: color .25s ease-in-out;
}


.nav li {
  font-family: 'Raleway', sans-serif;
}
 
.nav-toggle:after {
    content: '\2630';
    text-decoration: none;
}

.nav-toggle:hover {
    color: #f4f4f4;
}
 
[id='nav-toggle'] {
    position: absolute;
    display: none;
}

[id='nav-toggle']:checked ~ .nav > .nav-toggle {
    left: auto;
    right: 2px;
    top: 1em;
}

[id='nav-toggle']:checked ~ main > article {
    -webkit-transform: translateX(320px);
    -moz-transform: translateX(320px);
    transform: translateX(320px);
}

[id='nav-toggle']:checked ~ .nav > .nav-toggle:after {
    content: '\2715';
}
 
body {
    -webkit-animation: bugfix infinite 1s;
}
 
@-webkit-keyframes bugfix {
    to {
      padding: 0;
    }
}
 
@media screen and (min-width: 320px) {
    html,
    body {
      margin: 0;
      overflow-x: hidden;
    }
}
 
@media screen and (max-width: 320px) {
    html,
    body {
      margin: 0;
      overflow-x: hidden;
    }
    .nav {
      width: 100%;
      box-shadow: none
    }
}
 
.nav h2 {
    font-family: 'Raleway', sans-serif;
    width: 90%;
    padding: 0;
    margin: 10px 0;
    text-align: center;
    text-shadow: rgba(250, 247, 247, 0.1) -1px -1px 1px, rgba(0, 0, 0, .5) 1px 1px 1px;
    font-size: 1.3em;
    line-height: 1.3em;
    opacity: 0;
    transform: scale(0.1, 0.1);
    -ms-transform: scale(0.1, 0.1);
    -moz-transform: scale(0.1, 0.1);
    -webkit-transform: scale(0.1, 0.1);
    transform-origin: 0% 0%;
    -ms-transform-origin: 0% 0%;
    -moz-transform-origin: 0% 0%;
    -webkit-transform-origin: 0% 0%;
    transition: opacity 0.8s, transform 0.8s;
    -ms-transition: opacity 0.8s, -ms-transform 0.8s;
    -moz-transition: opacity 0.8s, -moz-transform 0.8s;
    -webkit-transition: opacity 0.8s, -webkit-transform 0.8s;
}
 
.nav h2 a {
    font-family: 'Raleway', sans-serif;
    color: #fdfefe;
    text-decoration: none;
    text-transform: uppercase;
}

[id='nav-toggle']:checked ~ .nav h2 {
    opacity: 1;
    transform: scale(1, 1);
    -ms-transform: scale(1, 1);
    -moz-transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
}

.nav > ul {
    display: block;
    margin: 0;
    padding: 0;
    list-style: none;
}
 
.nav > ul > li {
    line-height: 2.5;
    opacity: 0;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    -webkit-transition: opacity .5s .1s, -webkit-transform .5s .1s;
    -moz-transition: opacity .5s .1s, -moz-transform .5s .1s;
    -ms-transition: opacity .5s .1s, -ms-transform .5s .1s;
    transition: opacity .5s .1s, transform .5s .1s;
}
 
[id='nav-toggle']:checked ~ .nav > ul > li {
    opacity: 1;
    -webkit-transform: translateX(0);
    -moz-transform: translateX(0);
    -ms-transform: translateX(0);
    transform: translateX(0);
}
 
/* определяем интервалы появления пунктов меню */
 
.nav > ul > li:nth-child(2) {
    -webkit-transition: opacity .5s .2s, -webkit-transform .5s .2s;
    transition: opacity .5s .2s, transform .5s .2s;
}
 
.nav > ul > li:nth-child(3) {
    -webkit-transition: opacity .5s .3s, -webkit-transform .5s .3s;
    transition: opacity .5s .3s, transform .5s .3s;
}
 
.nav > ul > li:nth-child(4) {
    -webkit-transition: opacity .5s .4s, -webkit-transform .5s .4s;
    transition: opacity .5s .4s, transform .5s .4s;
}
 
.nav > ul > li:nth-child(5) {
    -webkit-transition: opacity .5s .5s, -webkit-transform .5s .5s;
    transition: opacity .5s .5s, transform .5s .5s;
}
 
.nav > ul > li:nth-child(6) {
    -webkit-transition: opacity .5s .6s, -webkit-transform .5s .6s;
    transition: opacity .5s .6s, transform .5s .6s;
}
 
.nav > ul > li:nth-child(7) {
    -webkit-transition: opacity .5s .7s, -webkit-transform .5s .7s;
    transition: opacity .5s .7s, transform .5s .7s;
}
 
 
.nav > ul > li > a {
  display: inline-block;
  position: relative;
  padding: 0;
  font-family: 'Raleway', sans-serif;
  font-weight: 300;
  font-size: 1.2em;
  color: #fdfefe;
  width: 100%;
  text-decoration: none;
  /* плавный переход */
  -webkit-transition: color .5s ease, padding .5s ease;
  -moz-transition: color .5s ease, padding .5s ease;
  transition: color .5s ease, padding .5s ease;
}
 
.nav > ul > li > a:hover,

.nav > ul > li > a:focus {
    color: white;
    padding-left: 15px;
}

 
.nav > ul > li > a:before {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 1px;
    width: 100%;
    -webkit-transition: width 0s ease;
    transition: width 0s ease;
}
 
.nav > ul > li > a:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    width: 100%;
    background: #fdfefe;
    -webkit-transition: width .5s ease;
    transition: width .5s ease;
}
 
.nav > ul > li > a:hover:before {
    width: 0%;
    background: #fdfefe;
    -webkit-transition: width .5s ease;
    transition: width .5s ease;
}
 
.nav > ul > li > a:hover:after {
    width: 0%;
    background: transparent;
    -webkit-transition: width 0s ease;
    transition: width 0s ease;
}


</style>
