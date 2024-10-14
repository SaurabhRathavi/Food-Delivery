<template>
  <div>
    <app-navbar />

    <v-card class="mx-auto mt-10 pa-5 base-card elevation-2" width="400">
      <header>
        <h1>Signup</h1>
      </header>
      <v-form @submit.prevent="handleSubmit" class="mt-5" v-model="isFormValid">
        <v-text-field
          v-model="FormData.first_name"
          label="First Name*"
          :rules="firstNameRules"
          prepend-inner-icon="mdi-account"
        ></v-text-field>
        <v-text-field
          v-model="FormData.last_name"
          label="Last Name"
          prepend-inner-icon="mdi-account"
        ></v-text-field>

        <v-text-field
          v-model="FormData.email"
          label="Email*"
          required
          :rules="emailRules"
          prepend-inner-icon="mdi-email"
        ></v-text-field>
        <v-text-field
          type="password"
          v-model="FormData.password"
          label="Password*"
          required
          :rules="passwordRules"
          prepend-inner-icon="mdi-lock"
        ></v-text-field>
        <v-text-field
          v-model="FormData.phone_number"
          label="Phone Number*"
          required
          :rules="phonNumberRules"
          prepend-inner-icon="mdi-phone"
        ></v-text-field>
        <v-select
          clearable
          v-model="FormData.role"
          label="Role"
          :items="['customer', 'restaurant', 'delivery_partner']"
          prepend-inner-icon="mdi-account-group"
        ></v-select>
        <v-btn class="mt-2" color="yellow-darken-4" type="submit" block :disabled='!isFormValid'
          >Signup</v-btn
        >
      </v-form>
      <p class="navigation">
        Already have an account ? <router-link to="/login">Login</router-link>
      </p>
    </v-card>
    <v-snackbar
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
      color="red"
      top
    >
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script>
const axios = require("axios");
const encryptPassword = require("../service/encryptPassword.js");

export default {
  data() {
    return {
      FormData: {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        dob: "",
        role: "customer",
      },
      isFormValid:false,
      firstNameRules: [
        (value) => {
          if (value?.length >= 1) return true;

          return "First name is a required field";
        },
      ],
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
      phonNumberRules: [
        (value) => !!value || "Phone number is required",
        (value) =>
          /^\d{10}$/.test(value) || "Mobile number must be exactly 10 digits.",
      ],
      snackbar: {
        show: false,
        message: "",
        timeout: 1000,
      },
    };
  },
  compute: {
    currentDate() {
      return Date.now();
    },
  },
  methods: {
    async handleSubmit() {
      try {


        const encryptedPassword = await encryptPassword(this.FormData.password);

        let url = `http://192.1.200.168:5000/api/v1/${this.FormData.role}/signup`;

        const response = await axios.post(url, {
          ...this.FormData,
          password: encryptedPassword,
        });

        if (response) {
          this.$router.push("/login");
        }
      } catch (error) {
        this.showError(error.response.data.message);
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
.navigation {
  margin-top: 15px;
  text-align: center;
}
</style>
