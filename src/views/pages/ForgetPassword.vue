<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link to="/" class="d-flex align-center">
            <v-img :src="require('@/assets/images/logos/logo.svg')" max-height="30px" max-width="30px" alt="logo"
              contain class="me-3 "></v-img>

            <h2 class="text-2xl font-weight-semsibold">
              Digitrends
            </h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Forgot Password? 🔒
          </p>
          <p class="mb-2">
            Enter your email and we'll send you instructions to reset your password
          </p>
        </v-card-text>

        <!-- login form -->

        <v-card-text>
          <v-form>
            <v-text-field v-model="email" outlined label="Email" placeholder="john@example.com" hide-details
              class="mb-3"></v-text-field>
          </v-form>
        </v-card-text>

        <v-btn block color="primary" class=" d-flex align-center justify-center" @click="onSubmit">
          reset Password
        </v-btn>
        <div class=" d-flex align-center justify-center"> <a href="/">back to login</a>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline

import "@/store/index";


export default {
  data() {
    return {
      email: "",

    };
  },
  mounted(){

  },
  methods: {
    // ...mapActions('auth', ['forget']),
    async onSubmit() {
      this.$store.dispatch("forget", {email:this.email}).then((response) => {
          console.log(response);
          localStorage.setItem("email", JSON.stringify(this.email));
         this.$toast("check your mail !", {
        position: "top-center",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
         
      });
      }).catch(error => {

        this.$toast.error(" verify your mail", {
        position: "top-center",
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
        rtl: false });
      });

    }
 },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
