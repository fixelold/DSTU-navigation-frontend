<template>
    <div class="backBtn">
        <button class="backBtn" type="submit" v-on:click="back">Назад</button>
    </div>

    <div>
        <h1>Инструкция по применению</h1>

        <p>Аудитории задаются следующим образом. <br> 
            1-333. Где 1- это номер корпуса. 333 номер аудитории.
        </p>
        <p class="primer1"><img src="../../data/primer1.png"></p>
    </div>
</template>
    
<script>
export default {
    methods: {
        back() {
            window.location.href = "/"
        }
    }
}
</script>
    
<style>
    h1 {
        text-align: center;
    }

    .primer1 img {
        width: 30%;
        text-align: center;
    }

    p {
        text-align: center;
    }
</style>
