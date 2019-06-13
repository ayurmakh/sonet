<template>
    <div class="form"> 
        <input type="text" v-model="surname" placeholder="Surname">
        <input type="text" v-model="name" placeholder="Name">
        <div>
            <label for="male">Male</label>
            <input type="radio" v-model="gender" id="male" class="radio">
            <label for="female">Female</label>
            <input type="radio" v-model="gender" id="female" class="radio">
        </div>
        <input type="text" v-model="country" placeholder="Country">
        <input type="text" v-model="city" placeholder="City">
        <input type="text" v-model="phone" placeholder="Phone">
        <input type="text" v-model="email" placeholder="E-mail">
        <input type="password" v-model="pass" placeholder="Password">
        <button>Sign up</button>
    </div>
</template>

<script>

export default {
  name: 'signup',
  data() {
    return {
      login: "",
      pass: ""
    }
  }
}
</script>