<template>
  <div class="form">
    <input type="text" v-model="login" placeholder="Phone or e-mail">
    <input type="password" v-model="pass" placeholder="Password">
    <button>Sign in</button>
    <a href="#">Forgot password?</a>
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