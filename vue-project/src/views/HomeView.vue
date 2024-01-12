<script setup>

// import { json } from 'express/lib/response';
import router from '@/router';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';


let email = ref('')
let password = ref('')

function login() {

  //reactive = object
  //ref uses .value method
  const body = {
    "email": email.value,
    "password": password.value
  }

  fetch("http://localhost:3000/login", {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    method: "POST"
  })

    .then(response => {
      return response.json()
    })
    .then(json => {
      // console.log(json)
      document.cookie = json
      router.push("/posts")
    })
    .catch(error => {
      console.log(error)
    })
}




</script>

<!-- //v-model gets real time data and value using a binding -->

<template>
  <div class="container">
    <img id="logo" src="https://files.hiv.gov/s3fs-public/field/image/instagramlogoresized-1.jpg" alt="instagram">
    <h1>Instagram</h1>
    <!-- 
    //gets value form text field -->
    <input v-model="email" type="text" placeholder="email">
    <input v-model="password" type="text" placeholder="password">
    <button @click="login">Login</button>
    <!-- //router link to send to the page we want  -->
    <!-- // <button @click="register">Register</button> -->
    <RouterLink to="/register">Register</RouterLink>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 10px;
}

#logo {
  height: 6rem;
  widows: 6rem;
}
</style>








