<template>
  <v-card
    flat
    class="mt-5"
  >

    <v-form>
     <v-card-title class="flex-nowrap">
          <v-icon class="text--primary me-3">
            {{ icons.mdiKeyOutline }}
          </v-icon>
          <span class="text-break">Change password</span>
        </v-card-title>
      <div class="px-3">

          <!-- alert -->
          <v-col cols="12">
            <v-alert
              color="warning"
              text
              class="mb-0"
               v-if="errors != null"
            >
              <div class="d-flex align-start">
                <v-icon color="warning">
                  {{ icons.mdiAlertOutline }}
                </v-icon>
                <div class="ms-3">
                  <p class="text-base font-weight-medium mb-1">
                   {{ errors }}
                  </p>
                  </a>
                </div>
              </div>
            </v-alert>
          </v-col>

        <v-card-text class="pt-5">

          <v-row>
            <v-col
              cols="12"
              sm="8"
              md="6"
            >
              <!-- current password -->
              <v-text-field
                v-model="user.old_password"
                :type="isCurrentPasswordVisible ? 'text' : 'password'"
                :append-icon="isCurrentPasswordVisible ? icons.mdiEyeOffOutline:icons.mdiEyeOutline"
                label="Current Password"
                outlined
                dense
                @click:append="isCurrentPasswordVisible = !isCurrentPasswordVisible"
              ></v-text-field>

              <!-- new password -->
              <v-text-field
                v-model="user.password"
                :type="isNewPasswordVisible ? 'text' : 'password'"
                :append-icon="isNewPasswordVisible ? icons.mdiEyeOffOutline:icons.mdiEyeOutline"
                label="New Password"
                outlined
                dense
                hint="Make sure it's at least 8 characters."
                persistent-hint
                @click:append="isNewPasswordVisible = !isNewPasswordVisible"
              ></v-text-field>

              <!-- confirm password -->
              <v-text-field
                v-model="user.password_confirmation"
                :type="isCPasswordVisible ? 'text' : 'password'"
                :append-icon="isCPasswordVisible ? icons.mdiEyeOffOutline:icons.mdiEyeOutline"
                label="Confirm New Password"
                outlined
                dense
                class="mt-3"
                @click:append="isCPasswordVisible = !isCPasswordVisible"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="4"
              md="6"
              class="d-none d-sm-flex justify-center position-relative"
            >
              <v-img
                contain
                max-width="170"
                src="@/assets/images/3d-characters/pose-m-1.png"
                class="security-character"
              ></v-img>
            </v-col>
          </v-row>
        </v-card-text>
      </div>

      <!-- divider -->
      <v-divider></v-divider>

      <div class="pa-3">


        <v-card-text class="two-factor-auth text-center mx-auto">
          <v-avatar
            color="primary"
            class="primary mb-4"
            rounded
          >
            <v-icon
              size="25"
              color="white"
            >
              {{ icons.mdiLockOpenOutline }}
            </v-icon>
          </v-avatar>
          <p class="text-base text--primary font-weight-semibold">
            Change password
          </p>
          <p class="text-sm text--primary">
            To change your current password, you must fill in the following fields correctly
          </p>
        </v-card-text>

        <!-- action buttons -->
        <v-card-text>
          <v-btn
            color="primary"
            class="me-3 mt-3"
            @click="EditProfil()"
          >
            Save changes
          </v-btn>
          <v-btn
            color="secondary"
            outlined
            class="mt-3"
          >
            Cancel
          </v-btn>
        </v-card-text>
      </div>
    </v-form>
  </v-card>
</template>



<script>
import { mdiKeyOutline, mdiLockOpenOutline, mdiEyeOffOutline, mdiEyeOutline, mdiAlertOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'

import { mapGetters, mapActions } from "vuex";

export default {

  data: () => ({
      isCurrentPasswordVisible: false,
      isNewPasswordVisible: false,
      isCPasswordVisible: false,
      errors: null,
      user: {
        password: null,
        old_password: null,
        password_confirmation: null,
      },
      defaultUser: {
        password: null,
        old_password: null,
        password_confirmation: null,
      },
      icons: {
        mdiKeyOutline,
        mdiLockOpenOutline,
        mdiEyeOffOutline,
        mdiEyeOutline,
        mdiAlertOutline
      },
  }),
  computed: {
    ...mapGetters([
    ]),
  },
  created() {

  },
  methods: {
    ...mapActions([
      "resetPassword"
    ]),
  EditProfil(){
      this.resetPassword(this.user).then((response) => {
              this.$toast.success("Password changed successfully !", {
                position: "top-right",
                timeout: 5000,
                draggable: true,
                draggablePercent: 0.6,
              });
              this.errors = null
             this.user = Object.assign({}, this.defaultUser)
        }).catch(error=> {
          this.errors = error;
        });

    },
  },
}
</script>


<style lang="scss" scoped>
.two-factor-auth {
  max-width: 25rem;
}
.security-character {
  position: absolute;
  bottom: -0.5rem;
}
</style>
