<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const login = ref<string>();
const pass = ref<string>();

const signUp = async () => {
  try {
    await axios.post(`http://${document.location.hostname}:8080/auth/sign_up`, {
      'login': login.value,
      'pass': pass.value
    });
  } catch (err) {
    console.log(`There was a problem fetching data: ${err}`);
  }
};
const logIn = async () => {
  try {
    await axios.post(`http://${document.location.hostname}:8080/auth/log_in`, {
      'login': login.value,
      'pass': pass.value
    });
  } catch (err) {
    console.log(`There was a problem fetching data: ${err}`);
  }
};

</script>

<template>
  <div class="main">
    <h1>Authorization</h1>
    <div class="auth">
      <span class="login-header">Login</span>
      <input v-model="login" type="text" class="login-input">
      <span class="pass-header">Password</span>
      <input v-model="pass" type="text" class="pass-input">
      <button class="sign-in" @click="signUp">Sign in</button>
      <button class="log-in" @click="logIn">Log in</button>
    </div>
    <button>
      <router-link to="/todo">Todo List</router-link>
    </button>
  </div>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
.your-text {
  height: 2rem;
  font-size: 1.2rem;
}

.auth {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}

.login-header .pass-header {
  font-size: 5rem;
}
</style>
