<template>
  <div>
    <div class="form" v-if="!sended">
      <input
        type="text"
        v-model="surname"
        placeholder="Фамилия"
        :class="{'input-error': !surnameValidate}"
        @input="validateSurname"
      >
      <p v-if="!surnameValidate">Это поле не должно быть пустым</p>
      <input
        type="text"
        v-model="name"
        placeholder="Имя"
        :class="{'input-error': !nameValidate}"
        @input="validateName"
      >
      <p v-if="!nameValidate">Это поле не должно быть пустым</p>
      <div>
        <label for="male">Мужской</label>
        <input type="radio" v-model="gender" value="male" class="radio" name="gender">
        <label for="female">Женский</label>
        <input type="radio" v-model="gender" value="female" class="radio" name="gender">
      </div>
      <select v-model="country">
        <option value>Выберите страну</option>
        <option v-for="item in countries" :key="item.id">{{ item.name }}</option>
      </select>
      <select v-model="city">
        <option value>Выберите город</option>
        <option v-for="item in cities" :key="item.id">{{ item.name }}</option>
      </select>
      <input
        type="text"
        v-model="phone"
        placeholder="Телефон"
        :class="{'input-error': !phoneValidate}"
        @input="validatePhone"
      >
      <p v-if="!phoneValidate">Номер телефона должен состоять из 11 цифр</p>
      <input
        type="text"
        v-model="email"
        placeholder="E-mail"
        :class="{'input-error': !emailValidate}"
        @input="validateEmail"
      >
      <p v-if="!emailValidate">Неверный формат e-mail</p>
      <input
        type="password"
        v-model="pass"
        placeholder="Пароль"
        :class="{'input-error': !passValidate}"
        @input="validate"
      >
      <p v-if="!passValidate">Количество символов должно быть не меньше 8</p>
      <input
        type="password"
        v-model="passConfirm"
        placeholder="Подтвердите пароль"
        :class="{'input-error': !passValidateConfirm}"
        @input="validateConfirm"
      >
      <p v-if="!passValidateConfirm">Пароли не совпадают</p>
      <button @click="send">Зарегистрироваться</button>
    </div>
    <div class="form" v-if="sended">
      {{ mess }}
      <button v-if="!result" @click="back">Назад</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "signup",
  data() {
    return {
      surname: "",
      name: "",
      gender: "male",
      country: "",
      countryId: 0,
      city: "",
      cityId: 0,
      phone: "",
      email: "",
      pass: "",
      passConfirm: "",
      countries: [],
      cities: [],
      surnameValidate: true,
      nameValidate: true,
      passValidate: true,
      passValidateConfirm: true,
      phoneValidate: true,
      emailValidate: true,
      sended: false,
      result: false,
      mess: ""
    };
  },
  methods: {
    back: function() {
      this.sended = false;
    },
    validate: function() {
      if (this.pass.length >= 8) this.passValidate = true;
      else this.passValidate = false;
    },
    validateConfirm: function() {
      if (this.pass == this.passConfirm) this.passValidateConfirm = true;
      else this.passValidateConfirm = false;
    },
    validatePhone: function() {
      if (this.phone.match(/\D/) != null || this.phone.length != 11)
        this.phoneValidate = false;
      else this.phoneValidate = true;
    },
    validateEmail: function() {
      if (this.email.match(/\w{1,}@\w{1,}\.\w{1,3}/) == null)
        this.emailValidate = false;
      else this.emailValidate = true;
    },
    validateSurname: function() {
      if (this.surname.length > 0) this.surnameValidate = true;
      else this.surnameValidate = false;
    },
    validateName: function() {
      if (this.name.length > 0) this.nameValidate = true;
      else this.nameValidate = false;
    },
    send: async function() {
      if (this.surname.length == 0) this.surnameValidate = false;
      if (this.name.length == 0) this.nameValidate = false;
      if (this.email.length == 0) this.emailValidate = false;
      if (this.phone.length == 0) this.phoneValidate = false;
      if (this.pass.length == 0) this.passValidate = false;
      if (this.passConfirm.length == 0) this.passValidateConfirm = false;

      if (
        !this.surnameValidate ||
        !this.nameValidate ||
        !this.emailValidate ||
        !this.phoneValidate ||
        !this.passValidate ||
        !this.passValidateConfirm
      ) {
        alert("Заполните поля, помеченные красным");
        return;
      }

      await axios
        .post(
          "http://localhost:3000/signup",
          {
            surname: this.surname,
            name: this.name,
            gender: this.gender,
            countryId: this.countryId,
            cityId: this.cityId,
            phone: this.phone,
            email: this.email,
            pass: this.pass
          },
          {
            withCredentials: true
          }          
        )
        .then(
          response => {
            this.sended = true;
            if (response.data.result) {
              this.mess = "Вы успешно зарегистрировались!";
              this.result = true;
            } else {
              console.log(response.data);
              this.result = false;
              if (response.data.errMess.includes("unique_phone"))
                this.mess =
                  "Такой номер телефона уже зарегистрирован в системе";
              else if (response.data.errMess.includes("unique_email"))
                this.mess = "Такой email уже зарегистрирован в системе";
              else this.mess = "Ошибка связи с сервером";
            }
          },
          error => {
            this.sended = true;
            this.result = false;
            this.mess = "Ошибка связи с сервером";
          }
        );
    }
  },
  watch: {
    country: async function() {
      if (this.country == "") return;

      let country = {};

      this.countries.forEach(item => {
        if (item.name == this.country) {
          country = item;
          this.countryId = item.id;
        }
      });

      if (!country.hasOwnProperty("cities")) {
        let response = await axios.get("http://localhost:3000/cities", {
          params: {
            countryId: country.id
          }
        });
        if (response.data.result && response.data.rows.length > 0)
          country.cities = response.data.rows;
      }

      this.cities = country.cities;
    },
    city: function() {
      this.cities.forEach(item => {
        if (item.name == this.city) this.cityId = item.id;
      });
    }
  },
  mounted: async function() {
    let response = await axios.get('http://localhost:3000/countries');
    if (response.data.result) 
      this.countries = response.data.rows;
  }
};
</script>