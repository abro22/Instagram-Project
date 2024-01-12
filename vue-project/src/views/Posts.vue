<script setup>

import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { ref, reactive } from 'vue';

let posts = reactive([])


fetch("http://localhost:3000/posts",
    {
        headers: { 'Authorization': document.cookie }

    })

    .then(response => {
        return response.json()


    })
    .then(json => {
        posts.push(...json)
        // console.log(po)
    })
    .catch(error => {
        console.log(error)
    })



</script>



<template>
    <div id="page-container">
        <Header></Header>
        <div v-for="post in posts ">

            <div class="post-container">
                <div class="post">
                    <div class="card-header">
                        <p>{{ post.username }}</p>
                    </div>
                    <div class="card-image-container">
                        <img src="https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?cs=srgb&dl=pexels-jonas-kakaroto-736230.jpg&fm=jpg"
                            alt="">
                    </div>
                    <div class="card-footer">
                        <div class="likes-container">
                            <p>Likes: {{ post.likes.length }}</p>
                            <p>🩷</p>
                        </div>

                        <div class="caption-container">
                            <p> {{ post.caption }}</p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
        <Footer></Footer>

    </div>
</template>


<style scoped>
img {
    height: 12rem;
    width: 12rem;

}

#page-container {
    background-color: grey;
    margin: 0;
    height: 100%;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.post-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem;

    height: 20rem;
    width: 20rem;

}

.post {
    background-color: white;
    height: 20rem;
    width: 20rem;
    padding-bottom: 20px;
}

.card-header {
    padding-left: 1rem;
    font-size: 1rem;
}

.card-image-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 20px;

}

.card-footer {
    display: flex;
    flex-direction: column;
}

.likes-container {
    display: flex;
    justify-content: space-between;
    padding-left: 1rem;
    padding-right: 1rem;
}

.caption-container {
    padding-left: 1rem;
}
</style>