<template>
    <div class="backBtn">
        <button class="backBtn" type="submit" v-on:click="back">Назад</button>
    </div>

    <div>
        <h1>Инструкция по применению</h1>

        <p>Аудитории задаются следующим образом. <br> 
            1-333. Где 1- это номер корпуса. 333 номер аудитории. <br>
        </p>
        <p class="primer1"><img src="../../data/primer1.png"></p>

        <p>Чтобы проложить место до важного места необходимо ввести номер <br> 
            начальной аудитории, после чего выбрать важное места из списка. <br>
        </p>
        <p class="primer1"><img src="../../data/primer2.png"></p>

        <p>Если вам необходима перемещение через лифт, <br> то надо активировать переключатель<br>
        </p>
        <p class="primer3"><img src="../../data/primer3.png"></p>
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

    .primer3 img {
        width: 10%;
    }

    p {
        text-align: center;
    }
</style>
