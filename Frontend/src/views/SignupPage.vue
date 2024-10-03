<template>
    <div class="main">
        <div class="container">
            <div class="header">
                <h1>Signup</h1>
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
                        <label for="first-name">First Name</label>
                    </td>
                    <td class="input-cell">
                        <input type="text" id="first-name" v-model="FormData.first_name" />
                    </td>
                </tr>
                <tr>
                    <td class="label-cell">
                        <label for="last-name">Last Name</label>
                    </td>
                    <td class="input-cell">
                        <input type="text" id="last-name" v-model="FormData.last_name"/>
                    </td>
                </tr>
                <tr>
                    <td class="label-cell">
                        <label for="email">Email</label>
                    </td>
                    <td class="input-cell">
                        <input type="email" id="email" v-model="FormData.email"/>
                        <span v-if="errors.email">{{errors.email}}</span>

                    </td>
                </tr>
                <tr>
                    <td class="label-cell">
                        <label for="password">Password</label>
                    </td>
                    <td class="input-cell">
                        <input type="password" id="password" v-model="FormData.password"/>
                        <span v-if="errors.password">{{errors.password}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="label-cell">
                        <label for="phone-number">Phone Number</label>
                    </td>
                    <td class="input-cell">
                        <input type="text" id="phone-number" v-model="FormData.phone_number"/>
                        <span v-if="errors.phone_number">{{errors.phone_number}}</span>

                    </td>
                </tr>
                <tr>
                    <td class="label-cell">
                        <label for="dob">Date Of Birth</label>
                    </td>
                    <td class="input-cell">
                        <input type="date" id="dob" v-model="FormData.dob"/>
                    </td>
                </tr>
                 <tr>
                    <td class="label-cell">
                        <label for="role"> Signup As </label>
                    </td>
                    <td class="input-cell">
                        <select name="role" id="role" v-model="FormData.role">
                            <option default value="customer" >Customer</option>
                            <option value="restaurant">Restaurant</option>
                            <option value="delivery_partner">DeliveryPartner</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="submit-cell" colspan="2">
                        <button type="submit">Submit</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
</div>
<div class="forgot-password">
        <a href="http://localhost:8080/login">Already have an account </a>
    </div>
        </div>
    </div>
</template>

<script>
const axios=require('axios')

export default{
    data(){
        return{
            FormData:{
                first_name:"",
                last_name:"",
                email:"",
                phone_number:"",
                password:"",
                dob:"",
                role:"customer",

            },
            errors:{

            }
        }
    },
    methods:{
        async handleSubmit(){
            if(!this.validateForm(this.FormData)) return

           try{ 

          let url=`http://localhost:5000/api/v1/${this.FormData.role}/signup`
          
          const response=await axios.post(url,this.FormData)
 
          if(response){

          this.$router.push("/login")
          }
          }
          catch(error){
            console.log(error);
            
            alert(error.response.data.message)
          }
            
        },
        validateForm(data) {
   this.errors={}

   
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(data.password)) {
        this.errors.password = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(data.phone_number)) {
        this.errors.phone_number = "Mobile number must be exactly 10 digits.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        this.errors.email = "Email format is invalid.";
    }

    // for (const key in data) {
    //     if (data.hasOwnProperty(key) && key !== 'password' && key !== 'mobile' && key !== 'email') {
    //         if (!data[key].trim()) {
    //             errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty or whitespace only.`;
    //         }
    //     }
    // }

    return Object.keys(this.errors).length==0
  
    }
    }
}
 
</script>



<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@100..1000&display=swap');

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
     font-family: "Afacad Flux", sans-serif;
    font-weight: 400;
    
}
.main{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
}

span{
    color: red;
}

.header{
    margin: 10px;
    padding: 10px;
    font-size: 20px;
}

.container{
    margin-top: 10vh;
    width: 30vw;
    
    background-color:#e3e3e3;
    box-shadow:5px 5px 22px #888888 ;
    padding: 20px;
}

.form-container{
    padding: 10px;
    height: 80vh;
}

.form-div{
    box-sizing: border-box;
}

label{
    float: left;
    margin-left: 10px;
    font-size: 1.1rem;

}

input{
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
        border:none;
        padding: 10px;

    }

    .input-cell {
        border:none;
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
        width: 40%;
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .submit-cell button:hover {
        background-color: #0056b3;
    }


</style>

