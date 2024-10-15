<template>
  <v-toolbar class="h-200 elevation-4" density="compact">
    <v-toolbar-title>Food Delivery</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="isUserLogin" class="mr-10 red darken-3" @click="logoutUser">
      Logout
    </v-btn>
  </v-toolbar>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {
    async logoutUser() {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };
        await axios.get(`${process.env.APP_VUE_SERVER_ADDRESS}/api/v1/logout`, config);
        this.$store.dispatch("logout");
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    },
  },
  computed: {
    isUserLogin() {
      return this.$store.getters.getUser;
    },
  },
};
</script>
