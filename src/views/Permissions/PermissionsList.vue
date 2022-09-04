<template>
  <v-data-table :headers="headers" :items="getAllPermissions" sort-by="id">
    <template v-slot:top>
      <v-toolbar flat class="theadToolbar">
        <v-toolbar-title>Permissions list </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Permission
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-container>
              <v-form ref="'form'">
                <ValidationObserver ref="test-1">
                  <div slot-scope="{ invalid, validated }">
                    <ValidationProvider name="NamePermission" rules="required|min:3">
                      <v-text-field slot-scope="{errors, valid }" name="namePermission" :error-messages="errors"
                        :success="valid" required v-model="editedItem.namePermission"
                        :prepend-inner-icon="icons.mdiAccountOutline" label="Name Permission" outlined dense
                        placeholder="Name Permission"></v-text-field>
                    </ValidationProvider>

                    <ValidationProvider name="Code" rules="required|min:3" v-if="editedIndex == -1">
                      <v-text-field slot-scope="{errors, valid }" name="code" :error-messages="errors" :success="valid"
                        required v-model="editedItem.code" :prepend-inner-icon="icons.mdiAccountOutline" label="Code "
                        outlined dense placeholder="Code"></v-text-field>
                    </ValidationProvider>

                    <v-textarea v-model="editedItem.description" :prepend-inner-icon="icons.mdiAccountOutline"
                      label="Description ...." outlined dense placeholder="Description"></v-textarea>


                    <v-card-actions>
                      <v-btn color="primary" @click="save()" :disabled="invalid || !validated">
                        Save
                      </v-btn>
                      <v-btn type="reset" outlined class="mx-2" @click="close()">
                        Reset
                      </v-btn>
                    </v-card-actions>

                  </div>
                </ValidationObserver>
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
            <v-card-title class="text-h5">Details Permission</v-card-title>
            <v-card-text class="d-flex">
            </v-card-text>
            <v-card-text>
              <div class="text-h6 mb-5">
                Permission name : {{ editedItem.namePermission.split(".")[0] }}
                ({{ editedItem.namePermission.split(".")[1] }})
              </div>

              <v-alert outlined color="primary">
                <div class="text-h6">
                  Description :
                </div>
                <div>
                  {{ editedItem.description }}
                </div>
              </v-alert>
              <v-card-actions>
                <span></span>
                <v-spacer></v-spacer>
                <v-btn color="primary" outlined class="mt-4" type="reset" @click="closeDetails()">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-dialog>

      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" class="mr-2" color="#0277BD" @click="detailsItem(item)">
            {{ icons.mdiAccountSearch }}
          </v-icon>
        </template>
        <span>Details</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" class="mr-2" color="#00695C" @click="editItem(item)">
            {{ icons.mdiPencil }}
          </v-icon>
        </template>
        <span>Edit</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" class="mr-2" color="error" @click="deleteItem(item)">
            {{ icons.mdiDeleteForever }}
          </v-icon>
        </template>
        <span>Delete</span>
      </v-tooltip>
    </template>

  </v-data-table>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider,
  withValidation
} from "vee-validate";
import { mapGetters, mapActions } from "vuex";
import {
  mdiPencil,
  mdiDeleteForever,
  mdiDetails,
  mdiAccountSearch
} from '@mdi/js'
export default {
  props: ["listPermissions"],
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    icons: {
      mdiPencil,
      mdiDeleteForever,
      mdiDetails,
      mdiAccountSearch
    },
    dialog: false,
    dialogDelete: false,
    dialogDetails: false,
    headers: [
      {
        text: '',
        align: 'start',
        sortable: false,
        value: '',
      },
      {
        text: 'Name Permission',
        align: 'start',
        value: 'namePermission',
      },
      {
        text: 'Description',
        align: 'start',
        value: 'description',
      },
      {
        text: 'Code',
        align: 'start',
        value: 'code',
      },
      { text: 'Actions', align: 'center', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      namePermission: '',
      description: '',
      code: '',
    },
    defaultItem: {
      namePermission: '',
      description: '',
      code: '',
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Permission' : 'Edit Permission'
    },
    ...mapGetters([
      "getAllPermissions",
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
    this.AllPermissions();
  },
  methods: {
    ...mapActions([
      "AllPermissions",
      "deletePermission",
      "detailsPermission",
      "addPermission",
      "updatePermission"
    ]),
    editItem(item) {
      this.editedIndex = this.getAllPermissions.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.$nextTick(() => {
        this.validateForm()
      });
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.getAllPermissions.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.deletePermission(this.editedItem.id);
      this.closeDelete();
    },
    detailsItem(item) {
      this.editedIndex = this.getAllPermissions.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDetails = true
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        let self = this
        self.$refs['test-1'].reset() // returns undefined ???
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
    validateForm() {
      let self = this
      self.$refs['test-1'].validate() // returns undefined ???
    },
    save() {
      if (this.editedIndex > -1) {
        //edit
        this.updatePermission(this.editedItem);
        Object.assign(this.getAllPermissions[this.editedIndex], this.editedItem)
      } else {
        //create
        this.addPermission(this.editedItem);
      }
      this.close();
      this.$toast("Role added successfully !", {
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
    },
  },
}
</script>
