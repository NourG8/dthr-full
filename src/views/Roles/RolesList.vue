<template>
  <v-data-table :headers="headers" :items="getAllRoles" sort-by="id">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Roles list </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Role
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>


            <v-container>

              <v-form>
                <v-text-field v-model="editedItem.role" :prepend-inner-icon="icons.mdiAccountOutline" label="Role"
                  outlined dense placeholder="Role"></v-text-field>

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
            <v-card-title class="text-h5">Details Role</v-card-title>
            <v-card-text class="d-flex">
            </v-card-text>

            <v-card-text>
              <v-form class="multi-col-validation mt-6">
                <v-row>
                  <v-col md="6" cols="12">
                    <v-text-field v-model="editedItem.role" label="Role" dense outlined></v-text-field>

                    <v-text-field v-model="editedItem.id" label="Id" dense outlined></v-text-field>
                  </v-col>

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
  props: ["listRoles"],

  data: () => ({
    icons: {
      mdiPencil,
      mdiDeleteEmpty,
      mdiDetails,
      mdiAccountSearch
    },
    dialog: false,
    dialogDelete: false,
    dialogDetails: false,
    headers: [
      {
        text: 'Id',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      {
        text: 'Role',
        align: 'start',
        value: 'role',
      },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      role: '',
    },
    defaultItem: {
      role: '',
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Role' : 'Edit Role'
    },
    ...mapGetters([
      "getAllRoles",
    ]),
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    dialogDetails(val) {
      val || this.closeDetails()
    },

  },

  created() {
    this.AllRoles();
    console.log(this.AllRoles());
  },
  methods: {
    ...mapActions([
      "AllRoles",
      "deleteRole",
      "detailsRole",
      "addRole",
      "updateRole"
    ]),
    editItem(item) {
      this.editedIndex = this.getAllRoles.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.getAllRoles.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.deleteRole(this.editedItem.id);
      this.closeDelete();
      console.log(this.editedItem.id);
    },
    detailsItem(item) {
      this.editedIndex = this.getAllRoles.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDetails = true
    },

    close() {
      this.dialog = false
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

    save() {
      if (this.editedIndex > -1) {
        //edit
        this.updateRole(this.editedItem);
        Object.assign(this.getAllRoles[this.editedIndex], this.editedItem)
      } else {
        //create
        this.addRole(this.editedItem);
      }
      this.close()
    },
  },
}
</script>
