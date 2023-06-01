<template>
    <div v-if="show" class="modal-shadow" @click.self="close">
            <div class="importantPlaces">
                <div class="modal-close" @click="close">&#10006;<br><br></div>

                <input checked="" id="create" v-model="radioData" v-on:click="createData" name="action" type="radio" value="create">
                <label class="lab" for="create">Создать</label>

                <input id="update" v-model="radioData" v-on:click="updateData" name="action" type="radio" value="update">
                <label class="lab" for="update">Обновить</label>
        
                <input id="delete" v-model="radioData" v-on:click="deleteData" name="action" type="radio" value="delete" >
                <label class="lab" for="delete">Удалить</label>
        
                <div id="wrapper">
                    <div id="arrow"></div>
                    <input checked="" id="createInput"  v-model="oneData" :placeholder='this.one' type="text">
                    <input id="updateInput" v-model="twoData" :placeholder='this.two' type="text">
                    <input id="deleteInput" v-model="threeData" :placeholder='this.three' type="text">
                    </div>
                <button class="placesBtn" type="submit" v-on:click="distributor">
                <span>
                    <br>
                    Создать
                    <br>
                    Обновить
                    <br>
                    Удалить
                </span>
                </button>
            </div>

        <!-- <DataModal v-show="isModalVisible"  @close="closeModal"></DataModal>
        <LoginModal v-show="isModalVisibleLogin"  @close="closeLoginModal"></LoginModal> -->
    </div>
</template>

<script>
import axios from 'axios'
  export default {
      data() {
      return {
        auditory_id: '',
        description: '',
        jwtToken: '',
        radioData: 'create',
        one: 'Введите название места',
        two: 'Введите номер аудитории',
        three: 'Введите номер обновляемой аудитории',
        oneData: '',
        twoData: '',
        threeData: '',
        auditory_id: '',
        temp: '',
    };
  },

    name: "LoginModal",
        data: function () {
            return {
                show: true
            }
        },

    methods: {

        distributor() {
          if (this.radioData == "create") {
            this.read().then(() => {this.create()})

          } else if (this.radioData == "update") {
            this.read().then(() => { // а тут получаем новый id
              this.temp = this.auditory_id // тут новый id аудитории
              let tmp = this.twoData
              this.twoData = this.threeData // а тут данные для получения старого id
              this.threeData = tmp
              this.read().then(() => {this.update()}) // в read получаем старые данные
            })

          } else if (this.radioData == "delete") {
            this.twoData = this.oneData
            this.read().then(() => {
              this.delete()
            })

          } else {
            console.log("Error")
          }
        },

        async create() {
          this.jwtToken = this.$cookies.get("token");

          const json = JSON.stringify({ name: this.oneData, auditory_id: this.auditory_id, auditory_number: this.twoData});
          await axios({
            headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Authorization: "Bearer " + this.jwtToken,
            },
            method: 'post',
            url: 'http://92.63.99.78:8080/api/v1/places/create', 
            data: json 
        }).catch(
          err => {
            if (err.response.status == 500) {
              alert("Ошибка! Не удалось создать важное место")
            } else if (err.response.status == 409) {
              alert("Важное место уже существует")
            }
          }
        ).then(response => {if (response.status == 200 ) {alert("Важное место создано")}});
        },

        async read() {
          await axios 
              .get("http://92.63.99.78:8080/api/v1/auditory?number=" + this.twoData).
              catch(
                  err => {
                    if (err.response.status == 500) {
                      alert("Ошибка! Аудитории не существует!")
                    } else if (err.response.status == 400) {
                      alert("Ошибка! Введен неправильный формат данных")
                    }
                  }
              )
              .then(response => { this.auditory_id = response.data.id})
        },

        async update() {
          this.jwtToken = this.$cookies.get("token");

          const json = JSON.stringify({ name: this.oneData, auditory_id: this.temp, auditory_number: this.threeData});
          await axios({
            headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Authorization: "Bearer " + this.jwtToken,
            },
            method: 'put',
            url: 'http://92.63.99.78:8080/api/v1/places/update?id=' + this.auditory_id, 
            data: json 
          }).catch(
          err => {
            if (err.response.status == 500) {
              alert("Ошибка! Не удалось обновить важное место")
            } else if (err.response.status == 404) {
              alert("Важного места не существует")
            }
          }
        ).then(response => {if (response.status == 200 ) {alert("Важное место обновлено")}});
          },

        async delete() {
          this.jwtToken = this.$cookies.get("token");

          await axios({
            headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Authorization: "Bearer " + this.jwtToken,
            },
            method: 'delete',
            url: 'http://92.63.99.78:8080/api/v1/places/delete?id=' + this.auditory_id, 
          }).catch(
          err => {
            if (err.response.status == 500) {
              alert("Ошибка! Не удалось удалить важное место")
            } else if (err.response.status == 404) {
              alert("Важного места не существует")
            } else if (err.response.status == 400) {
              alert("Ошибка! Введен неправильный формат данных")
            }
          }
        ).then(response => {if (response.status == 200 ) {alert("Важное место удалено")}});;
        },

        close: function () {
            this.$emit('close');
        },

        createData() {
            this.radioData = "create"
            this.one = "Введите название места"
            this.two = "Введите номер аудитории"
            this.three = "Введите номер обновляемой аудитории"
            this.oneData = ""
            this.twoData = ""
            this.threeData = ""
        },

        updateData() {
            this.one = "Введите название места"
            this.oneData = ""
            this.twoData = ""
            this.threeData = ""
        },

        deleteData() {
            this.one = "Введите номер аудитории"
            this.oneData = ""
            this.twoData = ""
            this.threeData = ""
        },
    },

    mounted() {
        this.createData();
    }
}
</script>

<style scoped
lang="scss">

  @media screen  and (max-width: 1015px) {
      .importantPlaces .lab {
        margin-right: 15px;
        font-size: 15px;
      }
      /* label[for="create"] {font-size: 11px; }
      label[for="update"] { margin-right: 0px; font-size: 11px; }
      label[for="delete"] { margin-right: 0px; font-size: 11px; } */
        .modal-shadow .importantPlaces {
          background: #226fe2;
          border-radius: 10px;
          /* padding: 15px; */
          margin-left: -40%;
          min-width: 200px;
          max-width: 280px;
          position: absolute;
          top: 50%;
      }
      .importantPlaces #createInput {
        background: #fff;
        border: none;
        border-radius: 8px;
        font-size: 12px;
        font-family: 'Raleway', sans-serif;
        height: 72px;
        width: 94%;
        margin-bottom: 20px;
        opacity: 1;
        text-indent: 20px;
        transition: all .2s ease-in-out;
      }

      .importantPlaces #updateInput {
        background: #fff;
        border: none;
        border-radius: 8px;
        font-size: 12px;
        font-family: 'Raleway', sans-serif;
        height: 72px;
        width: 94%;
        margin-bottom: 20px;
        opacity: 1;
        text-indent: 20px;
        transition: all .2s ease-in-out;
      }

      .importantPlaces #deleteInput {
        background: #fff;
        border: none;
        border-radius: 8px;
        font-size: 12px;
        font-family: 'Raleway', sans-serif;
        height: 72px;
        width: 94%;
        margin-bottom: 20px;
        opacity: 1;
        text-indent: 20px;
        transition: all .2s ease-in-out;
      }
      #wrapper #arrow {
        display: none;
        /* overflow: hidden; */
      }
      .importantPlaces .placesBtn {
        background: #1f61c5;
        border: none;
        border-radius: 8px;
        color: #fff;
        cursor: pointer;
        font-family: 'Raleway', sans-serif;
        font-size: 27px;
        height: 71px;
        width: 96%;
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
  }

.modal-shadow {
        position: absolute;
        top: 0;
        left: 0;
        min-height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.39);
    }

    .importantPlaces {
        background: #226fe2;
        border-radius: 10px;
        padding: 15px;
        min-width: 470px;
        max-width: 480px;
        max-height: 425px;
        position: absolute;

        margin: -185px -225px;
        left: 50%;
        top: 50%;
    }

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

  #create:checked ~ #wrapper { height: 177px; }
  #create:checked ~ #wrapper #arrow { left: 40px; }
  #create:checked ~ button span { transform: translate3d(0,-72px,0); }

  #update:checked ~ #wrapper { height: 270px; }
  #update:checked ~ #wrapper #arrow { left: 210px; }
  #update:checked ~ button span { transform: translate3d(0,-144px,0); }
  #update:checked ~ .importantPlaces { height: 425px; }


  #delete:checked ~ #wrapper { height: 90px; }
  #delete:checked ~ #wrapper #arrow { left: 400px; }
  #delete:checked ~ button span { transform: translate3d(0,-216px,0); }

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
  label[for="create"] { margin-right: 60px; }
  label[for="update"] { margin-right: 60px; }
  label[for="reset"] { float: right; }
  input[type=radio]:checked + label { opacity: 1; }

  input[type=text],
  input[type=password] {
    background: #fff;
    border: none;
    border-radius: 8px;
    font-size: 22px;
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
    left: 10px;
  }


  #hint {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 20px;
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
