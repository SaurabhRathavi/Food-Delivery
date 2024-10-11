<template>
  <v-toolbar density="compact">
  

    <v-toolbar-title>Food Delivery</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn v-if="isUserLogin" class="mr-10 red darken-3" @click="logoutUser"> Logout </v-btn>
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
        await axios.get("http://192.1.200.168:5000/api/v1/logout", config);
        this.$store.commit('removeUser')
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
        alert(error.respone.data.message);
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
