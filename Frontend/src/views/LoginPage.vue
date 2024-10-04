<template>
  <div class="main">
    <div class="container">
      <div class="header">
        <h1>Login</h1>
      </div>
      <!-- <div class="toggle-container">
                <button class="toggle-button" id="customer">customer</button>
                <button class="toggle-button" id="restaurnt">Restaurant</button>
                <button class="toggle-button" id="delivery_partner">Delivery Partner</button>
            </div> -->
      <div class="form-container">
        <form @submit.prevent="handleSubmit">
          <table class="form-table">
            <tbody>
              <tr>
                <td class="label-cell">
                  <label for="email">Email</label>
                </td>
                <td class="input-cell">
                  <input type="email" id="email" v-model="FormData.email" />
                </td>
              </tr>
              <tr>
                <td class="label-cell">
                  <label for="password">Password</label>
                </td>
                <td class="input-cell">
                  <input
                    type="password"
                    id="password"
                    v-model="FormData.password"
                  />
                </td>
              </tr>
              <td class="label-cell">
                <label for="role"> login As </label>
              </td>
              <td class="input-cell">
                <select name="role" id="role" v-model="FormData.role">
                  <option value="customer" default>Customer</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="delivery_partner">DeliveryPartner</option>
                </select>
              </td>
              <tr>
                <td class="submit-cell" colspan="2">
                  <button type="submit" class="btn-animated">Login</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <div class="forgot-password">
        <a href="http://localhost:8080/signup"
          >Don't have an account? create account</a
        >
      </div>
      <div class="forgot-password">
        <a href="http://localhost:8080/forgot-password">Forgot password</a>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      FormData: {
        email: "",
        password: "",
        role: "cusotomer",
      },
    };
  },
  methods: {
    async handleSubmit() {
      let url = `http://localhost:5000/api/v1/login`;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      try {
        await axios.post(url, this.FormData, config);
        this.$router.push("/");
      } catch (error) {
        alert(error.response.data.message || "unable to fetch details");
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@100..1000&display=swap");



.main {
    background: linear-gradient(135deg, #F8B500, #FCEABB);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    padding: 20px;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.15);
    width: 100%;
    max-width: 450px;
  
}

.header {
    text-align: center;
    margin-bottom: 30px;
}

.header h1 {
    font-size: 2.5rem;
    color: #333;
    font-weight: 700;
}

.form-container {
    width: 100%;
    margin-left: 40px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-size: 1rem;
    color: #555;
    margin-right: 10px;
    text-align: left;
}
/* 
.label-cell{
  display: flex;
  align-items: center;
  height: 100%;
} */

input, select {
    width: 100%;
    padding: 12px 15px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    outline: none;
    transition: all 0.3s ease;
    font-size: 1rem;
    background-color: #FAFAFA;
}

input:focus, select:focus {
    border-color: #F8B500;
    box-shadow: 0 0 8px rgba(248, 181, 0, 0.3);
}

input::placeholder {
    color: #888;
}

input[type="date"] {
    color: #555;
}

span {
    color: red;
    font-size: 0.85rem;
    margin-top: -15px;
}

.submit-cell {
    /* display: flex;
    align-items: center;
    justify-content: center; */
    text-align: center;
    width: 100%;
}
.tbody{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.btn-animated {
    background: linear-gradient(to right, #FF9966, #FF5E62);
    color: white;
    padding: 12px 25px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.1rem;
    margin: auto;
}

.btn-animated:hover {
    background: linear-gradient(to right, #FF5E62, #FF9966);
    transform: scale(1.05);
}

.forgot-password {
    text-align: center;
    margin-top: 25px;
}

.forgot-password a {
    text-decoration: none;
    color: #FF5E62;
    font-weight: bold;
    transition: color 0.3s;
}

.forgot-password a:hover {
    color: #FF9966;
}


</style>
