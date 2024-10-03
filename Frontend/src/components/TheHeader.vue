<template>
  <div class="header">
    <h2 class="heading">Food-Delivery</h2>
    <button @click="logoutUser" class="logout">Logout</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {};
  },
  methods: {
    async logoutUser() {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
    try{

      const response = await axios.get("http://localhost:5000/api/v1/logout", config);
      console.log(response);

      this.$router.push("/login");
      
    }
    catch(error){
        console.log(error);
        
    }

    },
  },
};
</script>

<style scoped>
.header {
  margin-bottom: 50px;
  padding: 10px;
  background-color: #eaf6f6;
  width: 100%;
  height: 10vh;
  display: flex;
  box-shadow: 5px 10px 18px #888888;
}
.heading {
    margin-left: 1vw;
    margin-top: 1vh;
    font-size: 30px;
}
.logout {
  border-radius: 10px;
  margin-top: 1vh;
  /* margin: 2vh 0vh; */
  height: 5vh;
  width: 5vw;
  background-color: #66bfbf;
  transition: 0.5s;
  margin-left: auto !important;
  margin-right: 2vw;
}
.logout:hover {
  background-color: rgb(55, 99, 100);
  color: white;
  cursor: pointer;
}
</style>
