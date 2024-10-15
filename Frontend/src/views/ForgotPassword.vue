<template>
  <div>
    <app-navbar />
    <v-card class="mx-auto mt-10 pa-5 base-card elevation-2" width="400">
      <header>
        <h1>Forgot Password</h1>
      </header>
      <v-form @submit.prevent="handleSubmit" class="mt-5">
        <v-text-field
          v-model="FormData.email"
          label="Email"
          :rules="emailRules"
          prepend-inner-icon="mdi-email"
        ></v-text-field>
        <v-btn class="mt-2" type="submit" color="yellow-darken-4" block
          >Send Link</v-btn
        >
      </v-form>
    </v-card>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      FormData: {
        email: "",
      },
      emailRules: [
        (value) => !!value || "E-mail is required",
        (value) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          ) || "E-mail format is invalid",
      ],
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.FormData.email.trim()) {
        alert("pls enter email address");
        return;
      }

      let url = `${process.env.VUE_APP_SERVER_ADDRESS}/api/v1/forgot-password`;

      try {
        const response = await axios.post(url, this.FormData);

        if (response) {
          alert("Reset link send to email");
        }
        this.$router.push("/login");
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  },
};
</script>
