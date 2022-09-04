<template>
  <div class="auth-wrapper auth-v1">
   <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link
            to="/"
            class="d-flex align-center"
          >
            <v-img
              :src="require('@/assets/images/logos/logo.svg')"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              class="me-3 "
            ></v-img>

            <h2 class="text-2xl font-weight-semsibold">
              Digitrends
            </h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Reset Password 🔒
          </p>
          <p class="mb-2">
             Your new password must be different from previously used passwords
          </p>
        </v-card-text>
        
        <!-- login form -->
        <v-card-text>
          <v-form>
          <v-text-field
              v-model="resetPassword.old_password"
              outlined
              v-if="user !== null && user.pwd_reset_admin === 1"
              :type="isOldPasswordVisible ? 'text' : 'password'"
              label="Current password"
              :append-icon="isOldPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="isOldPasswordVisible = !isOldPasswordVisible"
              class="mb-3"
            ></v-text-field>
            <v-text-field
              v-model="resetPassword.password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="New password"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="resetPassword.password_confirmation"
              outlined
              :type="isConfPasswordVisible ? 'text' : 'password'"
              label="Confirm password"
              :append-icon="isConfPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="isConfPasswordVisible = !isConfPasswordVisible"
            ></v-text-field>

            <v-btn
              block
              color="primary"
              class="mt-6"
              @click="fireReset"
            > Set New password
            </v-btn>
          </v-form>
        </v-card-text>
        </v-card>
    </div>

  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline

import "@/store/index";
import {  mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { mapGetters, mapActions } from "vuex";

export default {
  data(){
    return{
        icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
      isPasswordVisible:false,
      isConfPasswordVisible: false,
      isOldPasswordVisible: false,
      resetPassword:{
          email:"",
          old_password:"",
          password:"",
          password_confirmation:"",
       },
       errors : null,
    }
  },
  mounted()
  {
    let {token,email}=this.$route.query
    this.resetPassword.email=email
    this.resetPassword.token=token
  },
 computed: {
    ...mapGetters([
      "user",
    ]),
  },
    methods: {
       async fireReset() {
          if(this.user !== null && this.user.pwd_reset_admin === 1){
             this.$store.dispatch("resetPassword", this.resetPassword).then((response) => {
                  this.$router.push("/dashboard");
                }).catch(error=> {
                  this.errors = error;
                  console.log(error)
                });
            }else{
              this.$store.dispatch("reset",this.resetPassword).then((response) => {
                this.$router.push("/login");
                }).catch(error=> {
                  console.log(error)
                });
            }
              this.$toast.success("your password changed successfully !", {
                position: "top-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
              });
       }
},
        }

</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
