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
              :src="require('@/assets/images/logos/digitrends.png')"
              max-height="50px"
              max-width="50px"
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
            Welcome! 👋🏻
          </p>
          <p class="mb-2">
            Please sign-in to your account and start the adventure
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="credentials.email"
              outlined
              label="Email"
              placeholder="john@example.com"
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="credentials.password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-checkbox
                label="Remember Me"
                hide-details
                class="me-3 mt-1"
              >
              </v-checkbox>

              <!-- forgot link -->
              <a
                href='/forgetPassword'
                class="mt-1"
              >
                Forgot Password?
              </a>
            </div>

            <v-btn
              block
              color="primary"
              class="mt-6"
              @click="fireLogin"
            >
              Login
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>

  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {  mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import "@/store/index";
export default {
  data(){
    return{

      credentials:{
        email:"",
        password:"",
      }
    };
  },
    methods: {
        fireLogin() {
          this.$store.dispatch("login", this.credentials).then((response) => {
                this.$router.push("/dashboard");
            }).catch((error) => {
               this.$toast.error("bad credentials",{
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
                rtl: false
                  });
        });

        },
    },

  setup() {
    const isPasswordVisible = ref(false)



    return {
      isPasswordVisible,
       icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
}

</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
