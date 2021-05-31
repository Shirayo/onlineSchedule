<template>
  <Page >
    <StackLayout marginTop="100">
      <Image src="~/assets/images/logo.png" height="200" width="200" alignSelf="center"/>
      <Label text="online schedule" width="100%" textAlignment="center" fontSize="35"/>

      <StackLayout orientation="vertical" >
        <TextField
            fontSize="20"
            v-model="validateForm.email"
            class="input"
            keyboardType="email"
            hint="Email Address"
            autocorrect="false"
            autocapitalizationType="none"/>
        <TextField
            fontSize="20"
            v-model="validateForm.password"
            hint="Password"
            secure="true"
            autocorrect="false"
            autocapitalizationType="none"/>
        <Button text="Login" @tap="login"/>
      </StackLayout>

    </StackLayout>
  </Page>
</template>

<script>
import Home from "./Home"
const firebase = require("@nativescript/firebase/app");
import Vue from "nativescript-vue";
var dialogs = require("@nativescript/core/ui/dialogs");

firebase.initializeApp({
  persist: false
}).then((instanse) => {
  console.log("fireBase init")
})


export default {
name: "LoginScreen",
  data() {
    return {
      validateForm: {
        email: "1@2.com",
        password: "12345678",
      }
    }
  },

  methods: {
    login: function () {
      firebase.auth().signInWithEmailAndPassword(this.validateForm.email, this.validateForm.password)
          .then((res) => {
              console.log("User logged in")
              this.$navigateTo(Home, {
                clearHistory: true
              })
            })
          .catch((err) => {
            dialogs.alert('invalid email or password')
                .then(() => {
                  this.validateForm.password = ""
                });
            //console.log("Login error: " + JSON.stringify(err))
          })
    },
  }
}
</script>

<style scoped>

  TextField {
    font-size: 22pt;
    placeholder-color: lightgrey;
  }

  loginButton {
    background-color: #1167b1;
    margin-left: 100pt;
    margin-right: 100pt;
    border-radius: 20pt;
    font-size: 20pt;
    color: white;
    height: 40;
  }
</style>
