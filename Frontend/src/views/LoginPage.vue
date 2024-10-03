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
                  <button type="submit">Login</button>
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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Afacad Flux", sans-serif;
  font-weight: 400;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

.header {
  margin: 10px;
  padding: 10px;
  font-size: 20px;
}

.container {
  width: 30vw;
  background-color: #e3e3e3;
  box-shadow: 5px 5px 22px #888888;
  padding: 20px;
}

.form-container {
  padding: 10px;
}

.form-div {
  box-sizing: border-box;
}

label {
  float: left;
  margin-left: 10px;
  font-size: 1.2rem;
  font-weight: 400;
}

input {
  width: 50%;
  margin: 10px;
  padding: 5px;
  box-sizing: border-box;
}

.form-table {
  width: 100%;
  border-collapse: collapse;
  border: none;
}

.label-cell {
  border: none;
  padding: 10px;
}

.input-cell {
  border: none;
  padding: 10px;
}

.input-cell input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.submit-cell {
  /* border: 1px solid #ccc; */
  padding: 10px;
  text-align: center;
  margin-top: 10px;
}

.submit-cell button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  width: 50%;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-cell button:hover {
  background-color: #0056b3;
}
</style>
