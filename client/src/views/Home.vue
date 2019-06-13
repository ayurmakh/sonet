<template>
  <div class="form">
    <input type="text" v-model="login" placeholder="Телефон или e-mail">
    <input type="password" v-model="pass" placeholder="Пароль">
    <button>Войти</button>
    <a href="#">Забыли пароль?</a>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      login: "",
      pass: ""
    }
  }
}
</script>