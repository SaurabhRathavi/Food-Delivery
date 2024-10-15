<template>
  <app-navbar />
  <h1>hello {{ user.first_name }}</h1>
</template>

<script>
import axios from "axios";
import AppNavbar from "../components/AppNavbar.vue";

export default {
  components: { AppNavbar },
  data() {
    return {
      user: {},
    };
  },
  beforeMount() {
    if (!this.$store.getters.getUser) {
      this.$router.push("/login");
      return;
    }
    this.user = this.$store.getters.getUser;
    // this.fetchUserDetails();
  },
  methods: {
    async fetchUserDetails() {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      try {
        const userData = await axios.get(
          `${process.env.VUE_APP_SERVER_ADDRESS}/api/v1/user`,
          config
        );
        this.user = userData.data;
      } catch (error) {
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
