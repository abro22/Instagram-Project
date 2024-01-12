<script setup></script>

<template>
    <div id="Footer">

        <div class="home">
            <RouterLink to="/">🌸</RouterLink>
        </div>
        <div class="create-post">
            <RouterLink to="/createpost">+</RouterLink>
        </div>
        <div class="profile">
            <RouterLink to="/profile">👩🏽‍🦱</RouterLink>
        </div>
    </div>
</template>

<style scoped>
#Footer {
    background-color: lightpink;
    height: 3rem;
    width: 100vw;
    position: fixed;
    bottom: 0;
    margin: 0;


}

.home {
    padding-left: 20px;




}

.create-post {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.profile {
    display: flex;
    flex-direction: row;
    justify-content: left;

}
</style>