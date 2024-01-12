<script setup>

import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import router from '@/router';
import { ref } from 'vue';

let imageURL = ref('')
let caption = ref('')

function createPost() {
    const reqBody = {
        "image": imageURL.value,
        "caption": caption.value
    }

    fetch('http://localhost:3000/createpost', {
        headers: { "Content-Type": "application/json", "Authorization": document.cookie },
        body: JSON.stringify(reqBody),
        method: "POST"
    })
        .then(response => {
            if (response.status === 200) {
                alert("Post Successful!")
                router.push('/posts')
            } else {
                alert("Something went wrong, try again!")
            }
        })

        .catch(error => {
            console.log(error)
        })
}

</script>

<template>
    <Header></Header>
    <div id="container">


        <div>
            <img :src=imageURL>
        </div>
        <div>
            <input v-model="imageURL" type="text" placeholder="image url" id="image-input">
            <label for="image-input">Image</label>
        </div>

        <br>


        <div>
            <input v-model="caption" type="text" placeholder="caption" id="caption-input">
            <label for="caption-input">Caption</label>
        </div>

        <button @click="createPost">Post</button>

    </div>


    <Footer></Footer>
</template>

<style scoped>
#container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>