<template>
  <div>
    <app-navbar />
    <v-card class="mx-auto mt-10 pa-5" width="400">
      <header>
        <h1>Login</h1>
      </header>
      <v-form @submit.prevent="handleSubmit" class="mt-5">
        <v-text-field
          v-model="FormData.email"
          label="Email"
          :rules="emailRules"
        ></v-text-field>
        <v-text-field
          type="password"
          v-model="FormData.password"
          label="Password"
          :rules="passwordRules"
        ></v-text-field>
        <v-select
          clearable
          v-model="FormData.role"
          label="Role"
          :items="['customer', 'restaurant', 'delivery_Partner']"
        ></v-select>
        <v-btn class="mt-2" type="submit" block>Login</v-btn>
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
    passwordRules: [
      (value) => !!value || "Password is required",
      (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        ) ||
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    ],
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
      const encryptedPassword = await encryptPassword(this.FormData.password);

      if (!this.FormData.email.trim() || !this.FormData.password.trim()) {
        alert("pls fill all the fields");
        return;
      }

      let url = `http://192.1.200.168:5000/api/v1/login`;
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

        this.$store.commit("setUser", response.data.data);
        this.$router.push("/");
      } catch (error) {
        console.log(error);

        alert(error.response.data.message || "unable to fetch details");
      }
    },
  },
};
</script>

<style scoped>
.navigation {
  text-align: center;
  margin-top: 10px;
}
</style>
