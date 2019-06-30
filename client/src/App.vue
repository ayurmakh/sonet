<template>
  <div id="app">
    <header>
      <a href="/"><h1>SO<span>NET</span></h1></a>
      <nav>
        <div v-if="!logged()">
          <router-link to="/signin">Вход</router-link>
          <router-link to="/signup">Регистрация</router-link>
        </div>
        <div v-else>
          <router-link to="/cart">Корзина</router-link>
          <span>Выход</span>
        </div>
      </nav>
    </header>
    <router-view/>
  </div>
</template>

<script>
const store = require('./store');

export default {
  methods: {
    logged: function() {
      return false
    },
    logout: function() {
      
    }
  }
}
</script>
