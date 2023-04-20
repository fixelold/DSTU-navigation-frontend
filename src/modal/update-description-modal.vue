<template>
    <div v-if="show" class="modal-shadow" @click.self="close">
      <div  class="setData" >
        <div class="modal-close" @click="close">&#10006;<br><br></div>
          <input checked="" id="signin" v-model="radioValue" v-on:click="setData" name="action" type="radio" value="aud">
          <label for="signin">Введите данные для обновления</label>

          <div id="wrapper">
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
    };
  },

    name: "LoginModal",
        data: function () {
            return {
                show: true
            }
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
</style>
