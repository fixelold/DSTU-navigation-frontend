<template>
  <div class="map">
      <canvas id="c" width="500" height="1000" ref="canRef"></canvas>
  </div>

</template>

<script>

import axios from 'axios'
import { toRaw } from 'vue';

export default {
    data() {
    return {
      start: '',
      end: '',
      items: [ {id:1, src: require("../../data/map.jpg")} ],
      sectors: [],
      coordinates: []
  };
},

  methods: {
     controller() {
        this.start = this.$cookies.get("start");
        this.end = this.$cookies.get("end");
        this.drawImage()

        this.getSectors().then(() => {
            this.getCoordinates().then(() => {
                this.drawPath()
            })
        })
      },
      
      async getSectors() {

          await axios 
              .get("http://92.63.99.78:8080/api/v1/path-building?start=" + this.start + "&end=" + this.end)
              .then(response => {this.sectors = response.data['sectors']})

      },

      async getCoordinates() {
          
          const json = JSON.stringify({ start: this.start, end: this.end, sectors: toRaw(this.sectors)});
          console.log(json)
          await axios({
              method: 'post',
              url: 'http://92.63.99.78:8080/api/v1/draw-path/points', 
              data: json 
          }).then(response => {this.coordinates = response.data});
      },

      drawImage() {
          this.canvas = this.$refs.canRef;
          this.ctx = this.canvas.getContext('2d');
          this.img = new Image();
          this.img.src = this.items[0].src;

          this.img.onload = () => {
              console.log('this.ctx:', this.ctx);
              this.ctx.drawImage(this.img, 0, 0);
          }

      },

      drawPath() {
          for (let i = 0; i < this.coordinates.length; i++) {
              console.log("Work - ", i)
              var c = document.getElementById("c");
              var ctx = c.getContext("2d");   
              ctx.beginPath();
              ctx.rect(this.coordinates[i]['x'],this.coordinates[i]['y'],this.coordinates[i]['widht'],this.coordinates[i]['height']);
              ctx.fillStyle = "red";
              ctx.fill();
          }
      },
  },

  mounted() {
    this.controller();
  }
}
</script>

<style>
.demo {
font-family: sans-serif;
border: 1px solid #eee;
border-radius: 2px;
padding: 20px 30px;
margin-top: 1em;
margin-bottom: 40px;
user-select: none;
overflow-x: auto;
}
</style>