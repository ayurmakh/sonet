<template>
  <div>
    <div class="form" v-if="!result">
      <p v-if="sended && !result">Неверные логин или пароль</p>
      <input type="text" v-model="login" placeholder="Телефон или e-mail" :class="{'input-error': !loginValidate}" @input="validateLogin">
      <p v-if="!loginValidate">Это поле не должно быть пустым</p>
      <input type="password" v-model="pass" placeholder="Пароль" :class="{'input-error': !passValidate}" @input="validatePass">
      <p v-if="!passValidate">Это поле не должно быть пустым</p>
      <button @click="send">Войти</button>
      <a href="#">Забыли пароль?</a>
    </div>
    <div class="form" v-if="result">
      {{ mess }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data() {
    return {
      login: "",
      pass: "",
      loginValidate: true,
      passValidate: true,
      sended: false,
      result: false
    }
  },
  methods: {
    validateLogin: function() {
      if (this.login.length > 0)
        this.loginValidate = true;
      else
        this.loginValidate = false;
    },
    validatePass: function() {
      if (this.pass.length > 0)
        this.passValidate = true;
      else
        this.passValidate = false;
    },
    send: async function() {
      if (this.login.length == 0)
        this.loginValidate = false;
      if (this.pass.length == 0)
        this.passValidate = false;

      if (!this.passValidate || !this.loginValidate) {
        alert('Заполните поля, помеченные красным');        
        return;
      }

      await axios.post('http://localhost:3000/signin', {  
        login: this.login,
        pass: this.pass
      },
      {
        "Content-Type": "application/x-www-form-urlencoded"
      })
      .then(response => {

          this.sended = true;
          if (response.data.result) {
            this.mess = 'Вы успешно вошли в систему!';
            this.result = true;
          } else {
            this.result = false;
          }
        });
    }
  }
}
</script>