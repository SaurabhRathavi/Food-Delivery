<template>
  <div class="main">
    <div class="container">
      <div class="header">
        <h1>Reset Password</h1>
      </div>
      <div class="form-container">
        <form @submit.prevent="handleSubmit">
          <table class="form-table">
            <tbody>
              <tr>
                <td class="label-cell">
                  <label for="password">Enter New Password</label>
                </td>
                <td class="input-cell">
                  <input type="password" id="password" v-model="password" />
                  <span v-if="passwordError">{{ passwordError }}</span>
                </td>
              </tr>
              <tr>
                <td class="submit-cell" colspan="2">
                  <button type="submit" class="btn-animated">
                    Reset Password
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      password: "",
      passwordError: "",
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.validateForm()) return;
      let url = `http://localhost:5000/api/v1/reset-password`;
      const token = this.$route.query.token;
      if (!token) {
        alert("unauthorized Request");
        return;
      }
      try {
        axios
          .post(url, { token: token, newPassword: this.password })
          .then(() => {
            alert("Password Changed Succesfully");
            this.$router.push("/login");
          });
      } catch (error) {
        alert(error.response.data.message);
      }
    },

    validateForm() {
      this.passwordError = "";

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(this.password)) {
        this.passwordError =
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
      }

      return !this.passwordError;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@100..1000&display=swap");

.main {
  background: linear-gradient(135deg, #f8b500, #fceabb);
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
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 1rem;
  color: #555;
  margin-right: 10px;
  text-align: left;
}

input,
select {
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  outline: none;
  transition: all 0.3s ease;
  font-size: 1rem;
  background-color: #fafafa;
}

input:focus,
select:focus {
  border-color: #f8b500;
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
.tbody {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.btn-animated {
  background: linear-gradient(to right, #ff9966, #ff5e62);
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
  background: linear-gradient(to right, #ff5e62, #ff9966);
  transform: scale(1.05);
}

.forgot-password {
  text-align: center;
  margin-top: 25px;
}

.forgot-password a {
  text-decoration: none;
  color: #ff5e62;
  font-weight: bold;
  transition: color 0.3s;
}

.forgot-password a:hover {
  color: #ff9966;
}
</style>
