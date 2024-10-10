<template>
  <div class="main">
    <div class="container">
      <div class="header">
        <h1>Signup</h1>
      </div>

      <div class="form-container">
        <form @submit.prevent="handleSubmit">
          <div class="full-name">
            <div class="form-group first-name">
              <label for="fname">First Name*</label>
              <input
                type="text"
                id="fname"
                v-model="FormData.first_name"
                required
                @blur="checkFirstName"
              />
              <span v-if="errors.first_name">{{ errors.first_name }}</span>
            </div>

            <div class="form-group last-name">
              <label for="lname">Last Name</label>
              <input type="text" id="lname" v-model="FormData.last_name" />
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="FormData.email"
              @blur="checkEmail"
            />
            <span class="tooltip" v-if="errors.email">{{ errors.email }}</span>
          </div>

          <div class="phone-dob">
            <div class="form-group phone-number">
              <label for="pnumber">Phone Number</label>
              <input
                type="text"
                id="pnumber"
                v-model="FormData.phone_number"
                @blur="checkNumber"
              />
              <span v-if="errors.phone_number">{{ errors.phone_number }}</span>
            </div>

            <div class="form-group birth-date">
              <label for="dob">Date Of Birth</label>
              <input
                type="date"
                id="dob"
                v-model="FormData.dob"
                :max="new Date().toISOString().slice(0, 10)"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="FormData.password"
              @blur="checkPassword"
            />
            <span v-if="errors.password">{{ errors.password }}</span>
          </div>

          <div class="form-group">
            <label for="role">Signup As</label>
            <select name="role" id="role" v-model="FormData.role">
              <option value="customer" default>Customer</option>
              <option value="restaurant">Restaurant</option>
              <option value="delivery_partner">Delivery Partner</option>
            </select>
          </div>

          <div class="form-group submit-cell">
            <button type="submit" class="btn-animated">Sign up</button>
          </div>
        </form>
      </div>

      <div class="forgot-password">
        <a href="http://192.1.200.168:8080/login">Already have an account </a>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
const encryptPassword=require("../service/encryptPassword.js")

export default {
  data() {
    return {
      FormData: {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        dob: "",
        role: "customer",
      },
      errors: {},
    };
  },
  compute: {
    currentDate() {
      return Date.now();
    },
  },
  methods: {
    async handleSubmit() {
      try {
        const encryptedPassword=await encryptPassword(this.FormData.password)
        console.log(encryptedPassword);
        
        let url = `http://192.1.200.168:5000/api/v1/${this.FormData.role}/signup`;

        const response = await axios.post(url, {...this.FormData,password:encryptedPassword});

        if (response) {
          this.$router.push("/login");
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    },
    checkPassword(e) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(e.target.value)) {
        this.errors.password =
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
      } else {
        this.errors.password = "";
      }
    },
    checkNumber(e) {
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(e.target.value)) {
        this.errors.phone_number = "Mobile number must be exactly 10 digits.";
      } else {
        this.errors.phone_number = "";
      }
    },
    checkFirstName(e) {
      if (!e.target.value.trim()) {
        this.errors.first_name = "First name required";
      } else {
        this.errors.first_name = "";
      }
    },
    checkEmail(e) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(e.target.value)) {
        this.errors.email = "Email format is invalid.";
      } else {
        this.errors.email = "";
      }
    },
  },
};
</script>

<style scoped>
.main {
  background: linear-gradient(135deg, #f8b500, #fceabb);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
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

.form-group {
  margin-bottom: 20px;
}

.full-name {
  display: flex;
  justify-content: space-between;
}

.phone-dob {
  display: flex;
  justify-content: space-between;
}

.first-name,
.phone-number {
  margin-right: 5px;
  width: 50%;
}

.last-name,
.birth-date {
  margin-left: 5px;
  width: 50%;
}
label {
  display: block;
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;
  text-align: left;
}

input,
select {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
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
  margin-top: -10px;
}

.submit-cell {
  text-align: center;
  width: 100%;
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
}

.btn-animated:hover {
  background: linear-gradient(to right, #ff5e62, #ff9966);
  transform: scale(1.05);
}

.forgot-password {
  text-align: center;
  /* margin-top: 5px; */
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
