<template>
  <v-data-table :headers="headers" :items="getAllUsers" sort-by="name">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Users list </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New User
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>


            <v-container>

              <v-form>
                <v-text-field v-model="editedItem.name" :prepend-inner-icon="icons.mdiAccountOutline" label="Nom"
                  outlined dense placeholder="Nom"></v-text-field>

                <v-text-field v-model="editedItem.prenom" :prepend-inner-icon="icons.mdiAccountOutline" label="Prenom"
                  outlined dense placeholder="Prenom"></v-text-field>

                <v-text-field v-model="editedItem.sexe" :prepend-inner-icon="icons.mdiAccountOutline" label="Sexe"
                  outlined dense placeholder="Sexe"></v-text-field>

                <v-text-field v-model="editedItem.email" :prepend-inner-icon="icons.mdiEmailOutline" label="Email"
                  type="email" outlined dense placeholder="Email"></v-text-field>

                <v-text-field v-model="editedItem.adresse" :prepend-inner-icon="icons.mdiEmailOutline" label="Adresse"
                  outlined dense placeholder="Adresse"></v-text-field>

                <v-text-field v-model="editedItem.dateNaissance" :prepend-inner-icon="icons.mdiEmailOutline"
                  label="Date de naissance" type="date" outlined dense placeholder="Date de naissance"></v-text-field>

                <v-text-field v-model="editedItem.nationalite" :prepend-inner-icon="icons.mdiEmailOutline"
                  label="Nationalité" outlined dense placeholder="Nationalité"></v-text-field>


                <v-text-field v-model="editedItem.tel" :prepend-inner-icon="icons.mdiEmailOutline"
                  label="Numéro de tétéphone" type="number" outlined dense placeholder="Numéro de tétéphone">
                </v-text-field>

                <v-overflow-btn class="my-2" :items="items" v-model="editedItem.situationFamiliale"
                  :prepend-inner-icon="icons.mdiEmailOutline" label="Situation Familiale" outlined dense>
                </v-overflow-btn>

                <!-- <v-text-field
      v-model="editedItem.situationFamiliale"
      :prepend-inner-icon="icons.mdiEmailOutline"
      label="situationFamiliale"
      outlined
      dense
      placeholder="situationFamiliale"
    ></v-text-field> -->

                <v-text-field v-model="editedItem.nbreEnfant" :prepend-inner-icon="icons.mdiEmailOutline"
                  label="Nombre d'enfants à charge" type="number" outlined dense
                  placeholder="Nombre d'enfants à charge"></v-text-field>

                <v-text-field v-model="editedItem.niveauEtude" :prepend-inner-icon="icons.mdiEmailOutline"
                  label="Niveau d'étude" outlined dense placeholder="Niveau d'étude"></v-text-field>
                <!--
      <v-overflow-btn
      class="my-2"
      :items="itemsSivp"
      v-model="editedItem.sivp"
      :prepend-inner-icon="icons.mdiEmailOutline"
      label="Sivp"
       outlined
      dense
    ></v-overflow-btn> -->


                <v-text-field v-model="editedItem.sivp" :prepend-inner-icon="icons.mdiEmailOutline" label="Sivp"
                  outlined dense placeholder="Sivp"></v-text-field>


                <v-text-field v-model="editedItem.dureeSivp" :prepend-inner-icon="icons.mdiEmailOutline"
                  label="Durée du Sivp" type="number" outlined dense placeholder="Durée du Sivp"></v-text-field>

                <v-text-field v-model="editedItem.cin" :prepend-inner-icon="icons.mdiEmailOutline" label="Cin"
                  type="number" outlined dense placeholder="Cin"></v-text-field>

                <v-text-field v-model="editedItem.dateDelivranceCin" :prepend-inner-icon="icons.mdiEmailOutline"
                  label="Date de délivrance (Cin)" type="date" outlined dense placeholder="Date de délivrance (Cin)">
                </v-text-field>

                <v-text-field v-model="editedItem.password" :prepend-inner-icon="icons.mdiLockOutline" label="Password"
                  outlined dense type="password" placeholder="Password"></v-text-field>

                <v-card-actions>
                  <v-btn color="primary" @click="save()">
                    Save
                  </v-btn>
                  <v-btn type="reset" outlined class="mx-2" @click="close()">
                    Reset
                  </v-btn>
                </v-card-actions>
              </v-form>


            </v-container>
          </v-card>
        </v-dialog>

        <!-- add multiple users -->

        <v-dialog v-model="dialogAdd" max-width="1400px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Add Multiple
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="text-h5">Add Multiple rows (Users)</span>
            </v-card-title>

                      <v-btn style="margin-left:1250px;margin-bottom:20px;" color="primary"  @click="addNewRow">
                      Add
                  </v-btn>

            <v-container>
              <form @submit.prevent="
              
                editMode ? updatePurchase() : createPurchase()
              
              ">

                <div class="modal-body">

                  <div class="form-horizontal">

                    <tr v-for="(user, k) in users" :key="k">

                      <td scope="row" class="trashIconContainer">

                        <!-- <i class="fa fa-trash" style="margin-right:20px;" @click="deleteRow(k, user)">delete</i> -->
                                 <v-btn style="margin-right:10px;" color="primary"   @click="deleteRow(k, user)"> -</v-btn>

                      </td>

                      <td>
                        <v-text-field  style="margin-right:10px;" v-model="editedItem.name"
                          :prepend-inner-icon="icons.mdiAccountOutline" label="Nom" outlined dense placeholder="Nom">
                        </v-text-field>
                      </td>

                      <td>
                        <v-text-field style="margin-right:10px;" v-model="editedItem.prenom"
                          :prepend-inner-icon="icons.mdiAccountOutline" label="Prenom" outlined dense
                          placeholder="Prenom"></v-text-field>
                      </td>

                      <td>
                        <v-text-field style="margin-right:10px;" v-model="editedItem.sexe"
                          :prepend-inner-icon="icons.mdiAccountOutline" label="Sexe" outlined dense placeholder="Sexe">
                        </v-text-field>
                      </td>

                      <td>
                        <v-text-field style="margin-right:10px;" v-model="editedItem.email"
                          :prepend-inner-icon="icons.mdiEmailOutline" label="Email" type="email" outlined dense
                          placeholder="Email"></v-text-field>
                      </td>

                      <td>
                        <v-text-field style="margin-right:10px;" v-model="editedItem.adresse"
                          :prepend-inner-icon="icons.mdiEmailOutline" label="Adresse" outlined dense
                          placeholder="Adresse"></v-text-field>
                      </td>

                      <td>
                        <v-text-field style="margin-right:10px;" v-model="editedItem.dateNaissance"
                          :prepend-inner-icon="icons.mdiEmailOutline" label="Date de naissance" type="date" outlined
                          dense placeholder="Date de naissance"></v-text-field>
                      </td>

                      <td></td>
                      <v-text-field style="margin-right:10px;" v-model="editedItem.nationalite"
                        :prepend-inner-icon="icons.mdiEmailOutline" label="Nationalité" outlined dense
                        placeholder="Nationalité"></v-text-field>
                      </td>

                      <td>
                        <v-text-field style="margin-right:10px;" v-model="editedItem.tel"
                          :prepend-inner-icon="icons.mdiEmailOutline" label="Numéro de tétéphone" type="number" outlined
                          dense placeholder="Numéro de tétéphone"></v-text-field>
                      </td>

                      <td>
                        <v-overflow-btn class="my-2" :items="items" v-model="editedItem.situationFamiliale"
                          :prepend-inner-icon="icons.mdiEmailOutline" label="Situation Familiale" outlined dense>
                        </v-overflow-btn>
                      </td>

                    </tr>

                  </div>

                </div>

                 <v-card-actions>
                  <v-btn color="primary" @click="save()">
                    Save
                  </v-btn>
                  <v-btn type="reset" outlined class="mx-2" @click="closeAdd()">
                    Reset
                  </v-btn>
                </v-card-actions>


              </form>
            </v-container>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDetails" max-width="800px">



          <v-card flat class="pa-3 mt-2">
            <v-card-title class="text-h5">Details User</v-card-title>
            <v-card-text class="d-flex">
            </v-card-text>

            <v-card-text>
              <v-form class="multi-col-validation mt-6">
                <v-row>
                  <v-col md="6" cols="12">
                    <v-text-field v-model="editedItem.name" label="Name" dense outlined></v-text-field>
                  </v-col>

                  <v-col md="6" cols="12">
                    <v-text-field v-model="editedItem.prenom" label="Prenom" dense outlined></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field v-model="editedItem.email" label="E-mail" dense outlined></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field v-model="editedItem.sexe" dense label="Sexe" outlined></v-text-field>
                  </v-col>


                  <v-col cols="12" md="6">
                    <v-text-field v-model="editedItem.dateNaissance" dense label="Date de naissance" outlined>
                    </v-text-field>

                    <v-text-field v-model="editedItem.nationalite" dense label="Nationalite" outlined></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field v-model="editedItem.tel" dense label="Telephone" outlined></v-text-field>

                    <v-text-field v-model="editedItem.situationFamiliale" dense label="Situation Familiale" outlined>
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field v-model="editedItem.nbreEnfant" dense label="Nombre d'enfants" outlined>
                    </v-text-field>

                    <v-text-field v-model="editedItem.sivp" dense label="Sivp" outlined></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field v-model="editedItem.dureeSivp" dense label="Durée du sivp" outlined></v-text-field>

                    <v-text-field v-model="editedItem.cin" dense label="Cin" outlined></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <!-- <v-text-field
              v-model="editedItem.dateDelivranceCin"
              dense
              label="Date de délivranceCin"
              outlined
            ></v-text-field> -->

                    <v-text-field v-model="editedItem.adresse" dense label="Adresse" outlined></v-text-field>

                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field v-model="editedItem.dateDelivranceCin" dense label="Date de délivranceCin" outlined>
                    </v-text-field>

                    <!-- <v-text-field
              v-model="editedItem.adresse"
              dense
            label="Adresse"
              outlined
            ></v-text-field> -->
                  </v-col>

                  <!-- <v-col
            cols="12"
            md="6"
          >
            <v-select
              v-model="editedItem.adresse"
              dense
              outlined
              label="adresse"
              :items="adresse"
            ></v-select>
          </v-col> -->

                  <!-- alert -->
                  <v-col cols="12">
                    <v-alert color="warning" text class="mb-0">
                      <div class="d-flex align-start">
                        <v-icon color="warning">
                          {{ icons.mdiAlertOutline }}
                        </v-icon>

                      </div>
                    </v-alert>
                  </v-col>

                  <v-col cols="12">
                    <!-- <v-btn
              color="primary"
              class="me-3 mt-4"
            >
              Save changes
            </v-btn> -->
                    <v-btn color="primary" outlined class="mt-4" type="reset" @click="closeDetails()">
                      Cancel
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>

        </v-dialog>


      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        {{ icons.mdiPencil }}
      </v-icon>

      <v-icon small @click="detailsItem(item)">
        {{ icons.mdiAccountSearch }}
      </v-icon>

      <v-icon small @click="deleteItem(item)">
        {{ icons.mdiDeleteEmpty }}
      </v-icon>

    </template>

  </v-data-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import {
  mdiPencil,
  mdiDeleteEmpty,
  mdiDetails,
  mdiAccountSearch
} from '@mdi/js'
export default {
  props: ["listUsers"],

  data: () => ({
    users: [

      {

        id: "",

        email: "",

        date: "",

        sexe: ""

      }

    ],
    items: ['Célibataire', 'Marié(e)', 'Divorcé(e)'],
    itemsSivp: ['Oui', 'Non'],
    icons: {
      mdiPencil,
      mdiDeleteEmpty,
      mdiDetails,
      mdiAccountSearch
    },
    dialog: false,
    dialogAdd: false,
    dialogDelete: false,
    dialogDetails: false,
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Prenom', value: 'prenom' },
      { text: 'Sexe', value: 'sexe' },
      { text: 'Email', value: 'email' },
      { text: 'Adresse', value: 'adresse' },
      { text: 'DateNaissance', value: 'dateNaissance' },
      // { text: 'Nationalite', value: 'nationalite' },
      { text: 'Tel', value: 'tel' },
      // { text: 'SituationFamiliale', value: 'situationFamiliale' },
      // { text: 'NbreEnfant', value: 'nbreEnfant' },
      // { text: 'NiveauEtude', value: 'niveauEtude' },
      // { text: 'Sivp', value: 'sivp' },
      // { text: 'DureeSivp', value: 'dureeSivp' },
      { text: 'Cin', value: 'cin' },
      { text: 'DateDelivranceCin', value: 'dateDelivranceCin' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
      prenom: '',
      sexe: '',
      email: '',
      password: '',
      adresse: '',
      dateNaissance: '',
      nationalite: '',
      tel: '',
      situationFamiliale: '',
      nbreEnfant: '',
      niveauEtude: '',
      sivp: '',
      dureeSivp: '',
      cin: '',
      dateDelivranceCin: '',
    },
    defaultItem: {
      name: '',
      email: '',
      password: '',
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New User' : 'Edit User'
    },
    ...mapGetters([
      "getAllUsers",
    ]),
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogAdd(val) {
      val || this.closeAdd()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    dialogDetails(val) {
      val || this.closeDetails()
    },

  },

  created() {
    this.AllUsers();
    console.log(this.AllUsers());
  },
  methods: {
    ...mapActions([
      "AllUsers",
      "deleteUser",
      "detailsUser",
      "addUser",
      "updateUser"
    ]),
    editItem(item) {
      this.editedIndex = this.getAllUsers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.getAllUsers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      // this.getAllUsers.splice(this.editedIndex, 1)
      this.deleteUser(this.editedItem.id);
      this.closeDelete();
      console.log(this.editedItem.id);
    },
    detailsItem(item) {
      this.editedIndex = this.getAllUsers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDetails = true
    },
    addItems(item) {
      this.editedIndex = this.getAllUsers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogAdd = true
    },


    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    
    closeAdd() {
      this.dialogAdd = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDetails() {
      this.dialogDetails = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    deleteRow(index, user) {

      var idx = this.users.indexOf(user);

      console.log(idx, index);

      if (idx > -1) {

        this.users.splice(idx, 1);

      }

      // this.calculateTotal();

    },

    addNewRow() {

      this.users.push({

        id1: "",

        email1: "",

        date1: "",

        sexe1: ""

      });

    },

    createPurchase() {



      axios

        .post("api/Purchase", {

          myArray: this.users

        })

        .then(() => {

          $("#addNew").modal("hide");

          toast.fire({

            icon: "success",

            html: "<h5> معلومات په بریالیتوب سره خوندي شول</h5>"

          });

          Fire.$emit("refreshPage");

          this.form.reset();

        })

        .catch(er => {

          console.log(er);

        });

    },

    save() {
      if (this.editedIndex > -1) {
        //edit
        this.updateUser(this.editedItem);
        Object.assign(this.getAllUsers[this.editedIndex], this.editedItem)
      } else {
        //create
        // this.getAllUsers.push(this.editedItem)
        this.addUser(this.editedItem);
      }
      this.close()
    },
  },
}
</script>
