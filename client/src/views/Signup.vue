<template>
    <div class="form"> 
        <input type="text" v-model="surname" placeholder="Фамилия">
        <input type="text" v-model="name" placeholder="Имя">
        <div>
            <label for="male">Мужской</label>
            <input type="radio" v-model="gender" value="male" class="radio" name="gender">
            <label for="female">Женский</label>
            <input type="radio" v-model="gender" value="female" class="radio" name="gender">
        </div>
        <select v-model="country">
          <option disabled value="">Выберите страну</option>
          <option v-for="item in countries" :key="item.id">{{ item.name }}</option>
        </select>
        <select v-model="city">
          <option disabled value="">Выберите город</option>
          <option v-for="item in cities" :key="item.id">{{ item.name }}</option>
        </select>
        <input type="text" v-model="phone" placeholder="Телефон">
        <input type="text" v-model="email" placeholder="E-mail">
        <input type="password" v-model="pass" placeholder="Пароль" :class="{'input-error': !passValidate}" @input="validate">
        <p v-if="!passValidate">Количество символов должно быть не меньше 8</p>
        <input type="password" v-model="passConfirm" placeholder="Подтвердите пароль" 
          :class="{'input-error': !passValidateConfirm}" @input="validateConfirm">
        <p v-if="!passValidateConfirm">Пароли не совпадают</p>
        <button>Зарегистрироваться</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {  
  name: 'signup',
  data() {
    return {
      surname: '',
      name: '',
      gender: '',
      country: '',
      city: '',
      phone: '',
      email: '',
      pass: '',
      passConfirm: '',
      countries: [],
      cities: [],
      passValidate: true,
      passValidateConfirm: true
    }
  },
  methods: {
    validate: function() {
      if (this.pass.length >= 8)
        this.passValidate = true;
      else
        this.passValidate = false;
    },
    validateConfirm: function() {
      if (this.pass == this.passConfirm)
        this.passValidateConfirm = true;
      else
        this.passValidateConfirm = false;
    }
  },
  watch: {
    country: async function() {
      let country = {};

      this.countries.forEach(item => {
        if (item.name == this.country)
          country = item;
      })

      if (!country.hasOwnProperty('cities')) {
        let response = await axios.get('http://localhost:3000/cities', {
          params: {
            countryId: country.id
          }
        });
        if (response.data.result && response.data.rows.length > 0)
          country.cities = response.data.rows;
      }

      this.cities = country.cities;
    }
  },
  mounted: async function() {
    let response = await axios.get('http://localhost:3000/countries');
    if (response.data.result) 
      this.countries = response.data.rows;
  }
}
</script>