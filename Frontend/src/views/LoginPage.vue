<template>
  <div>
    <v-snackbar
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
      color="red"
      top
    >
      {{ snackbar.message }}
    </v-snackbar>
    <app-navbar />
    <v-card class="mx-auto mt-10 pa-5 base-card elevation-2" width="400">
      <header>
        <h1>Login</h1>
      </header>
      <v-form @submit.prevent="handleSubmit" class="mt-5">
        <v-text-field
          v-model="FormData.email"
          label="Email"
          :rules="emailRules"
          required
          prepend-inner-icon="mdi-email"
        ></v-text-field>
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          v-model="FormData.password"
          label="Password"
          required
          prepend-inner-icon="mdi-lock"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
        ></v-text-field>
        <v-select
          clearable
          v-model="FormData.role"
          label="Role"
          :items="['customer', 'restaurant', 'delivery_partner']"
          prepend-inner-icon="mdi-account-group"
        ></v-select>
        <v-btn class="mt-2" type="submit" color="yellow-darken-4" block
          >Login</v-btn
        >
      </v-form>
      <p class="navigation">
        Don't have an account ? <router-link to="/signup"> Signup</router-link>
      </p>
      <p class="navigation">
        <router-link to="/forgot-password">Forgot Passsword</router-link>
      </p>
    </v-card>
  </div>
</template>

<script>
const axios = require("axios");
const encryptPassword = require("../service/encryptPassword.js");

export default {
  data: () => ({
    FormData: {
      email: "",
      password: "",
      role: "customer",
    },
    emailRules: [
      (value) => !!value || "E-mail is required",
      (value) =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        ) || "E-mail format is invalid",
    ],
    snackbar: {
      show: false,
      message: "",
      timeout: 1000,
    },
    showPassword: false,
  }),
  beforeMount() {
    if (this.$store.getters.getUser) {
      this.$router.push("/");
      return;
      // document.cookie.split("=")[0] == "token"
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.FormData.email.trim() || !this.FormData.password.trim()) {
        this.showError("Pls fill all the fields");
        return;
      }
      const encryptedPassword = await encryptPassword(this.FormData.password);
      console.log(process.env);

      console.log(process.env.VUE_APP_SERVER_ADDRESS);

      let url = `${process.env.VUE_APP_SERVER_ADDRESS}/api/v1/login`;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      try {
        const response = await axios.post(
          url,
          { ...this.FormData, password: encryptedPassword },
          config
        );

        this.$store.dispatch("login", response.data.data);
        this.$router.push("/");
      } catch (error) {
        this.showError(
          error.response.data.message || "unable to fetch details"
        );
      }
    },
    showError(errorMessage) {
      this.snackbar.message = errorMessage;
      this.snackbar.show = true;
    },
  },
};
</script>

<style scoped>
body {
  background-image: url("https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-simple-food-delivery-meal-fashion-poster-background-yellow-back-image_158378.jpg");
}

.navigation {
  text-align: center;
  margin-top: 10px;
}
</style>
