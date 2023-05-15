<template>

  <body>
      <div class="inputData">
        <input id="signin" v-model="radioValue" v-on:click="setData" name="action" type="radio" value="aud" checked>
        <label for="signin">Ввод аудиторий</label>

        <input id="signup" v-model="radioValue" v-on:click="signInData" name="action" type="radio" value="login" >
        <label for="signup">Войти</label>

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
            Войти
            <br>
            Проложить путь
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
  </body>
  
  <component :is="'script'" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></component>
  <component :is="'script'" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></component>

  <DataModal v-show="isModalVisible"  @close="closeModal"></DataModal>
  <LoginModal v-show="isModalVisibleLogin"  @close="closeLoginModal"></LoginModal>
</template>
    
<script>
  import axios from 'axios'
  import DataModal from '../modal/data-modal.vue'
  export default {
  components: {
    DataModal,
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
      checked: false
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

    footer {
    position: fixed;
    height: 100px;
    width: 100%;
    background: #3586ff;
    bottom: 0;
  }

    @media screen  and (max-width: 670px) {
      label[for="signin"] { margin-right: 20px; font-size: 12px; }
      label[for="signup"] { margin-right: 20px; font-size: 12px; }
      label[for="importantPlaces"] { margin-right: 20px; font-size: 12px; }
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
    top: -34%;
    left: 5%;
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
    top: -40%;
    left: -20%;
  }

  .inputData .icon-elevator {
    position: absolute;
    top: -39%;
    left: 12%;
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
    #importantPlaces:checked ~ #wrapper #arrow { left: 420px; }
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

</style>
