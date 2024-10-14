<template>
  <div>
    <app-navbar />
    <v-card class="mx-auto mt-10 pa-5 base-card elevation-2" width="400">
      <header>
        <h1>Reset Password</h1>
      </header>
      <v-form @submit.prevent="handleSubmit" class="mt-5">
        <v-text-field
          type="password"
          v-model="password"
          label="Password"
          :rules="passwordRules"
        ></v-text-field>
        <v-btn class="mt-2" color="yellow-darken-4" type="submit" block
          >Reset Password</v-btn
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
      password: "",
      passwordRules: [
        (value) => !!value || "Password is required",
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          ) ||
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      ],
    };
  },
  methods: {
    async handleSubmit() {
      let url = `http://192.1.200.168:5000/api/v1/reset-password`;
      const token = this.$route.query.token;

      if (!token) {
        alert("unauthorized Request");
        return;
      }
      try {
        await axios.post(url, { token: token, newPassword: this.password });

        alert("Password Changed Succesfully");
        this.$router.push("/login");
      } catch (error) {
        console.log(error);

        alert(error.response.data.message);
      }
    },
  },
};
</script>
