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

      await axios.get("http://localhost:5000/api/v1/logout", config);
      this.$router.push("/login");
      
    }
    catch(error){
        console.log(error);
        alert(error.respone.data.message)
        
    }

    },
  },
};
</script>

<style scoped>
.header {
  margin-bottom: 50px;
  padding: 10px;
    background: linear-gradient(135deg, #F8B500, #FCEABB);
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
  background: linear-gradient(to right, #FF9966, #FF5E62);
  transition: 0.5s;
  margin-left: auto !important;
  margin-right: 2vw;
  border: none;
  font-weight: bold;
}
.logout:hover {
  background: linear-gradient(to right, #FF5E62, #FF9966);
  color: white;
  cursor: pointer;
}
</style>
