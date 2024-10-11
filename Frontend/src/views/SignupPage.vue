<template>
  <div>
    <app-navbar />
   
    <v-card class="mx-auto mt-10 pa-5" width='400'>
      <header>
        <h1>Signup</h1>
      </header>
      <v-form @submit.prevent="handleSubmit" class="mt-5">
        <v-text-field
          v-model="FormData.first_name"
          label="First Name"
          :rules="firstNameRules"
        ></v-text-field>
        <v-text-field
          v-model="FormData.last_name"
          label="Last Name"
        ></v-text-field>

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
        <v-text-field
          v-model="FormData.phone_number"
          label="Phone Number"
          :rules=phonNumberRules
        ></v-text-field>
        <v-select
          clearable
          v-model="FormData.role"
          label="Role"
          :items="['customer', 'restaurant', 'delivery_Partner']"
        ></v-select>
        <v-btn class="mt-2" type="submit" block>Signup</v-btn>
      </v-form>
        <p class='navigation'>
          Already have an account ? <router-link to="/login">Login</router-link>
        </p>
    </v-card>
 
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
      errors: {},
      firstNameRules: [
        (value) => {
          if (value?.length >= 3) return true;

          return "First name must be at least 3 characters.";
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
        alert(error.response.data.message);
      }
    },
    checkPassword(e) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(e.target.value)) {
        this.errors.password =
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
      } else {
        this.errors.password = "";
      }
    },
    checkNumber(e) {
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(e.target.value)) {
        this.errors.phone_number = "Mobile number must be exactly 10 digits.";
      } else {
        this.errors.phone_number = "";
      }
    },
    checkFirstName(e) {
      if (!e.target.value.trim()) {
        this.errors.first_name = "First name required";
      } else {
        this.errors.first_name = "";
      }
    },
    checkEmail(e) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(e.target.value)) {
        this.errors.email = "Email format is invalid.";
      } else {
        this.errors.email = "";
      }
    },
  },
};
</script>

<style scoped>
.navigation{
  margin-top: 15px;
  text-align: center;
}
</style>