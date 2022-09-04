<template>
  <div>
    <!-- add multiple users -->
    <v-stepper v-model="e1">
      <v-container>
        <v-row class="mt-5">
          <v-card-title class="text-h5">Add multipel users</v-card-title>
          <v-spacer></v-spacer>
          <div class="my-2 mr-5">

            <span class="mr-2">Delete ligne</span>
            <v-btn color="primary" fab x-small dark>
              <v-icon text-white @click="DeleteLigne()">
                {{ icons.mdiMinus }}
              </v-icon>
            </v-btn>
          </div>

          <div class="my-2">

            <span class="mr-2">Add ligne</span>
            <v-btn color="primary" fab x-small class="mr-2" dark>
              <v-icon @click="AddLigne()">
                {{ icons.mdiPlus }}
              </v-icon>
            </v-btn>
          </div>
        </v-row>
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            General informations
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">
            Contact
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 3" step="3">
            Family situation
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 4" step="4">
            Identity documents
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="5">
            Administrative informations
          </v-stepper-step>
        </v-stepper-header>



        <form>
          <div class="modal-body">
            <div class="form-horizontal">
              <v-stepper-items>
                <ValidationObserver ref="obs">
                  <div slot-scope="{ invalid, validated }">
                    <v-stepper-content step="1">
                      <div class="mt-1">
                        <v-row v-for="(user, k) in users" :key="k">
                          <v-col cols="12" md="1" class="mt-1">
                            <v-btn color="#D32F2F" outlined small @click="deleteRow(k, user)">
                              <v-icon color="#D32F2F">{{ icons.mdiDeleteForever }}</v-icon>
                            </v-btn>
                          </v-col>
                          <v-col cols="12" md="2">
                            <ValidationProvider name="Last name" rules="required|max:15|min:2">
                              <v-text-field slot-scope="{errors, valid }" :counter="15" :error-messages="errors"
                                :success="valid" required v-model="users[k].lastName"
                                :prepend-inner-icon="icons.mdiAccountOutline" label="Last name" text-center outlined
                                dense placeholder="Last name">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12" md="2">
                            <ValidationProvider name="First name" rules="required|max:15|min:2">
                              <v-text-field v-model="user.firstName" :prepend-inner-icon="icons.mdiAccountOutline"
                                slot-scope="{errors, valid }" :counter="15" :error-messages="errors" :success="valid"
                                required label="First name" outlined dense placeholder="First name"></v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12" md="2">
                            <ValidationProvider name="Date of birth" rules="required">
                              <v-text-field v-model="user.dateBirth" :prepend-inner-icon="icons.mdiCalendar"
                                slot-scope="{errors, valid }" :error-messages="errors" :success="valid" required
                                label="Date of birth" type="date" outlined dense placeholder="Date of birth">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12" md="3">
                            <ValidationProvider name="Place of birth" rules="required|max:15|min:2">
                              <v-text-field v-model="user.placeBirth" :prepend-inner-icon="icons.mdiCalendar"
                                slot-scope="{errors, valid }" :counter="15" :error-messages="errors" :success="valid"
                                required label="Place of birth" type="text" outlined dense placeholder="Place of birth">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12" md="2">
                            <ValidationProvider name="Sex" rules="required">
                              <v-overflow-btn v-model="user.sex" :prepend-inner-icon="icons.mdiGenderMaleFemale"
                                label="Sex" slot-scope="{errors, valid }" :error-messages="errors" :success="valid"
                                required :items="sex" outlined dense placeholder="Sex"></v-overflow-btn>
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                      </div>
                      <v-card-actions>

                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="e1 = 2" :disabled="invalid || !validated">
                          Next
                        </v-btn>
                      </v-card-actions>


                    </v-stepper-content>
                  </div>
                </ValidationObserver>

                <ValidationObserver ref="obs">
                  <div slot-scope="{ invalid, validated }">
                    <v-stepper-content step="2">

                      <v-row v-for="(user, k) in users" :key="k">
                        <v-col cols="12" md="1" class="mt-1">
                          <v-btn color="#D32F2F" outlined small @click="deleteRow(k, user)">
                            <v-icon color="#D32F2F">{{ icons.mdiDeleteForever }}</v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="1">
                          <h4>{{ user.lastName }} {{ user.firstName }}</h4>
                        </v-col>
                        <v-col cols="12" md="2">
                          <ValidationProvider name="Address" rules="required|max:15|min:2">
                            <v-text-field slot-scope="{errors, valid }" :counter="15" :error-messages="errors"
                              :success="valid" required v-model="user.address" :prepend-inner-icon="icons.mdiMapMarker"
                              label="Address" outlined dense placeholder="Address"></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" md="2">
                          <ValidationProvider name="Personal e-mail" rules="required|email">
                            <v-text-field slot-scope="{errors, valid }" :error-messages="errors" :success="valid"
                              required v-model="user.email" :prepend-inner-icon="icons.mdiEmailOutline"
                              label="Personal e-mail" type="email" outlined dense placeholder="example@example.com">
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" md="2">
                          <ValidationProvider name="Professional e-mail" rules="required|email">
                            <v-text-field slot-scope="{errors, valid }" :error-messages="errors" :success="valid"
                              required v-model="user.emailProf" :prepend-inner-icon="icons.mdiEmailOutline"
                              label="Professional e-mail" type="email" outlined dense placeholder="example@example.com">
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" md="2">
                          <ValidationProvider name="Phone number" rules="required|max:8|min:8">
                            <v-text-field slot-scope="{errors, valid }" :counter="8" :error-messages="errors"
                              :success="valid" required v-model="user.phone" :prepend-inner-icon="icons.mdiCellphone"
                              label="Phone number" outlined dense placeholder="Phone number">
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>

                        <v-col cols="12" md="2">
                          <ValidationProvider name="Phone emergency" rules="required|max:8|min:8">
                            <v-text-field slot-scope="{errors, valid }" :counter="8" :error-messages="errors"
                              :success="valid" required v-model="user.phoneEmergency"
                              :prepend-inner-icon="icons.mdiCellphone" label="Phone emergency" outlined dense
                              placeholder="Phone emergency">
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-card-actions>

                        <v-btn outlined text @click="e1 = 1">
                          Previous
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="e1 = 3" class="mr-2" :disabled="invalid || !validated">
                          Next
                        </v-btn>
                      </v-card-actions>

                    </v-stepper-content>
                  </div>
                </ValidationObserver>

                <ValidationObserver ref="obs">
                  <div slot-scope="{ invalid, validated }">
                    <v-stepper-content step="3">
                      <v-row v-for="(user, k) in users" :key="k">
                        <v-col cols="12" md="1" class="mt-1">
                          <v-btn color="#D32F2F" outlined small @click="deleteRow(k, user)">
                            <v-icon color="#D32F2F">{{ icons.mdiDeleteForever }}</v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="1">
                          <h4>{{ user.lastName }} {{ user.firstName }}</h4>
                        </v-col>
                        <v-col cols="12" md="5">
                          <ValidationProvider name="Family situation" rules="required">
                            <v-overflow-btn :items="items" v-model="user.FamilySituation" slot-scope="{errors, valid }"
                              :error-messages="errors" :success="valid" required
                              :prepend-inner-icon="icons.mdiEmailOutline" label="Family situation" outlined dense>
                            </v-overflow-btn>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" md="5">
                          <ValidationProvider name="Number of cildren" rules="required">
                            <v-text-field slot-scope="{errors, valid }" :error-messages="errors" :success="valid"
                              required v-model="user.nbChildren" :prepend-inner-icon="icons.mdiEmailOutline"
                              label="Number of cildren" type="number" outlined dense placeholder="Number of children">
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>
                      </v-row>

                      <v-card-actions>
                        <v-btn text outlined @click="e1 = 2">
                          Previous
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="e1 = 4" class="mr-2" :disabled="invalid || !validated">
                          Next
                        </v-btn>
                      </v-card-actions>

                    </v-stepper-content>
                  </div>
                </ValidationObserver>



                <ValidationObserver ref="obs">
                  <div slot-scope="{ invalid, validated }">
                    <v-stepper-content step="4">

                      <v-row v-for="(user, k) in users" :key="k">
                        <v-col cols="12" md="1" class="mt-1">
                          <v-btn color="#D32F2F" outlined small @click="deleteRow(k, user)">
                            <v-icon color="#D32F2F">{{ icons.mdiDeleteForever }}</v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="1">
                          <h4>{{ user.lastName }} {{ user.firstName }}</h4>
                        </v-col>
                        <v-col cols="12" md="2">
                          <ValidationProvider name="Cin" rules="required|max:8|min:8">
                            <v-text-field slot-scope="{errors, valid }" :counter="8" :error-messages="errors"
                              :success="valid" required v-model="user.cin"
                              :prepend-inner-icon="icons.mdiAccountCardDetails" label="Cin" type="number" outlined dense
                              placeholder="Cin"></v-text-field>
                          </ValidationProvider>
                        </v-col>

                        <v-col cols="12" md="2">
                          <ValidationProvider name="Delivery date (Cin)" rules="required">
                            <v-text-field slot-scope="{errors, valid }" :error-messages="errors" :success="valid"
                              required v-model="user.deliveryDateCin" :prepend-inner-icon="icons.mdiCalendar"
                              label="Delivery date (Cin)" type="date" outlined dense placeholder="Delivery date (Cin)">
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>

                        <v-col cols="12" md="2">
                          <ValidationProvider name="Place of delivery (Cin)" rules="required|max:15|min:2">
                            <v-text-field slot-scope="{errors, valid }" :counter="15" :error-messages="errors"
                              :success="valid" required v-model="user.deliveryPlaceCin"
                              :prepend-inner-icon="icons.mdiCalendar" label="Place of delivery (Cin)" outlined dense
                              placeholder="Place of delivery (Cin)">
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" md="2">
                          <ValidationProvider name="Passport number" rules="required|max:8|min:8">
                            <v-text-field slot-scope="{errors, valid }" :counter="8" :error-messages="errors"
                              :success="valid" required v-model="user.numPassport"
                              :prepend-inner-icon="icons.mdiCalendar" label="Passport number" outlined dense
                              placeholder="Passport number"></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" md="2">
                          <ValidationProvider name="Nationality" rules="required|max:15|min:2">
                            <v-text-field slot-scope="{errors, valid }" :counter="15" :error-messages="errors"
                              :success="valid" required v-model="user.nationality"
                              :prepend-inner-icon="icons.mdiEmailOutline" label="Nationality" outlined dense
                              placeholder="Nationality"></v-text-field>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-card-actions>
                        <v-btn outlined text @click="e1 = 3">
                          Previous
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="e1 = 5" class="mr-2" :disabled="invalid || !validated">
                          Next
                        </v-btn>
                      </v-card-actions>
                    </v-stepper-content>
                  </div>
                </ValidationObserver>

                <ValidationObserver ref="obs">
                  <div slot-scope="{ invalid, validated }">
                    <v-stepper-content step="5">
                      <v-row v-for="(user, k) in users" :key="k">
                        <v-col cols="12" md="1" class="mt-1">
                          <v-btn color="#D32F2F" outlined small @click="deleteRow(k, user)">
                            <v-icon color="#D32F2F">{{ icons.mdiDeleteForever }}</v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="1">
                          <h4>{{ user.lastName }} {{ user.firstName }}</h4>
                        </v-col>
                        <v-col cols="12" md="2">
                          <ValidationProvider name="Integration date" rules="required">
                            <v-text-field slot-scope="{errors, valid }" :error-messages="errors" :success="valid"
                              required v-model="user.integrationDate" :prepend-inner-icon="icons.mdiCalendar"
                              label="Integration date" type="date" outlined dense placeholder="Integration date">
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" md="3">
                          <ValidationProvider name="Type of contract" rules="required">
                            <v-overflow-btn slot-scope="{errors, valid }" :error-messages="errors" :success="valid"
                              required :items="itemsContrat" v-model="user.contractType"
                              :prepend-inner-icon="icons.mdiEmailOutline" label="Type of contract" outlined dense
                              placeholder="Type of contract"></v-overflow-btn>
                          </ValidationProvider>
                        </v-col>
                        <!-- <v-col cols="12" md="3">
                          <ValidationProvider name="Department" rules="required">
                            <v-overflow-btn slot-scope="{errors, valid }" :error-messages="errors" :success="valid"
                              required :items="itemsDep" v-model="user.department_id"
                              :prepend-inner-icon="icons.mdiCalendar" label="Department" outlined dense
                              placeholder="Department">
                            </v-overflow-btn>
                          </ValidationProvider>
                        </v-col> -->
                        <v-col cols="12" md="2">
                          <ValidationProvider name="Post occupied" rules="required">
                             <v-overflow-btn slot-scope="{errors, valid }" :counter="15" :error-messages="errors"
                              :success="valid" required v-model="user.position_id" :items="itemsPost"
                              :prepend-inner-icon="icons.mdiEmailOutline" label="Post occupied" outlined dense
                              placeholder="Post occupied">
                            </v-overflow-btn>
                          </ValidationProvider>
                        </v-col>
                      </v-row>

                      <v-card-actions>
                        <v-btn outlined text @click="e1 = 4">
                          Previous
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="save()" class="mr-2" :disabled="invalid || !validated">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-stepper-content>
                  </div>
                </ValidationObserver>

              </v-stepper-items>
            </div>
          </div>
        </form>

      </v-container>
    </v-stepper>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  mdiMinus,
  mdiPlus,
  mdiDeleteForever
} from '@mdi/js'
import "@/store/index";
import {
  ValidationObserver,
  ValidationProvider,
  withValidation
} from "vee-validate";

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    e1: 1,
    users: [],
    icons: {
      mdiMinus,
      mdiPlus,
      mdiDeleteForever
    },
    items: ['Single', 'Married', 'Divorce'],
    sex: ['Women', 'Man'],
    itemsContrat: ['SIVP', 'CDD', 'CDI'],
    itemsDep: [],
    itemsPost: [],
    user: {
      lastName: '',
      firstName: '',
      dateBirth: '',
      placeBirth: '',
      sex: '',
      email: '',
      emailProf: '',
      address: '',
      phone: '',
      phoneEmergency: '',
      FamilySituation: '',
      nbChildren: '',
      cin: '',
      deliveryDateCin: '',
      deliveryPlaceCin: '',
      nationality: '',
      numPassport: '',
      contractType: '',
      integrationDate: '',
      position_id: '',
      // department_id: '',
    },
  }),
    computed: {
    ...mapGetters([
      "getAllPositions"
    ]),
  },
  created() {
    this.AddDefaultLigne();
    this.AllPositions();
    // this.getAllDepartments();
    this.getAllPositionss();
  },
  methods: {
    ...mapActions([
      "addUser",
      "AllPositions",
      "AllDepartments",
    ]),
    // getAllDepartments(){
    //     this.AllDepartments().then(response => {
    //           for (var i = 0; i < response.data.length; i++) {
    //             this.itemsDep.push({
    //               text: response.data[i].departmentName,
    //               value: response.data[i].id
    //             });
    //           }
    //       })
    //       .catch(error => {
    //           console.log(error)
    //       });
    // },
     getAllPositionss(){
         for (var i = 0; i < this.getAllPositions.length; i++) {
          this.itemsPost.push({
            text: this.getAllPositions[i].jobName,
            value: this.getAllPositions[i].id
          });
        }
    },
    DeleteLigne() {
      this.users.splice(this.users.length - 1);
    },
    deleteRow(index, user) {
      var idx = this.users.indexOf(user);
      if (idx > -1) {
        this.users.splice(index, 1);
      }
    },
    AddLigne() {
      let user = JSON.parse(JSON.stringify(this.user))
      this.users.push(user);
    },
    save() {
      for (let i = 0; i < this.users.length; i++) {
        this.addUser(this.users[i]);
      }
      this.$router.push("/users");
      this.$toast.success("users created succefully !", {
      });
    },
    AddDefaultLigne() {
      for (let i = 0; i < 5; i++) {
        this.AddLigne();
      }

    },
    async clear() {
      this.name = this.email = this.select = this.checkbox = "";
      this.$nextTick(() => {
        this.$refs.obs.reset();
      });
    },
    async submit() {
      const result = await this.$refs.obs.validate();
    },
  }
}
</script>
<style >
.my-input.v-input .v-input__slot {
  border-radius: 100px;
}
</style>
