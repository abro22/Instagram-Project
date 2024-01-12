<script setup>
import { ref } from 'vue';
import router from '@/router'

//Variables will be equal to what typed in corresponding input fields 
const email = ref('');
const username = ref('');
const password = ref('');

function register() {
    const reqBody = {
        "email": email.value,
        "password": password.value,
        "username": username.value
    }

    fetch("http://localhost:3000/users",
        {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reqBody),
            method: "POST"
        })

        .then(response => {
            if (response.status === 201) {
                alert("Account created! Login to continue")
                router.push("/")
            } else {
                alert('Something went wrong! Please try again.')
            }
            console.log(response)
        })
        .then(json => {
            console.log(json)
        })
        .catch(error => {
            console.log(error)
        })
}


</script>

<template>
    <div class="container">

        <img id="logo" src="https://files.hiv.gov/s3fs-public/field/image/instagramlogoresized-1.jpg" alt="instagram">

        <h1 style="color: red">Register</h1>

        <input v-model="email" type="text" placeholder="email">
        <input v-model="username" type="text" placeholder="username">
        <input v-model="password" type="text" placeholder="password">
        <button @click="register">Register</button>

        <RouterLink to="/">Cancel</RouterLink>

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