<template>
  <the-header></the-header>
  <h1>hello {{ user.first_name }}</h1>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import axios from "axios";

export default {
  components: { TheHeader },
  data() {
    return {
      user: {},
    };
  },
  beforeMount() {
    if(document.cookie.split("=")[0]!='token'){
      this.$router.push("/login")
      return;
    }
    this.fetchUserDetails();
  },
  methods: {
    async fetchUserDetails() {
    console.log(document.cookie);
    
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      try {
        const userData = await axios.get(
          "http://localhost:5000/api/v1/user",
          config
        );
        this.user = userData.data;
        console.log(userData);
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
</style>
