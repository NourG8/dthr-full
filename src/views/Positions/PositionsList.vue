<template>
  <v-data-table :headers="headers" :items="getAllPositions" sort-by="id">

    <template v-slot:item.description="{ item }">
      <p v-if="item.description == null">----</p>
      <span v-if="item.description != null">{{ item.description.substr(0, 20) }} ..</span>

    </template>

    <template v-slot:top>
      <v-toolbar flat class="theadToolbar">
        <v-toolbar-title>Positions list </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Position
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

                    <ValidationProvider name="JobName" rules="required|min:3">
                      <v-text-field v-model="editedItem.jobName" :prepend-inner-icon="icons.mdiAccountOutline"
                        label="JobName" slot-scope="{errors, valid }" :error-messages="errors" :success="valid" required
                        outlined dense placeholder="Job Name"></v-text-field>
                    </ValidationProvider>

                    <v-textarea v-model="editedItem.description" :prepend-inner-icon="icons.mdiAccountOutline"
                      label="Description " outlined dense placeholder="Description"></v-textarea>


                    <ValidationProvider name="Fiche" rules="required|min:3">
                      <v-text-field slot-scope="{errors, valid }" :error-messages="errors" :success="valid" required
                        v-model="editedItem.fiche" :prepend-inner-icon="icons.mdiAccountOutline" label="Fiche " outlined
                        dense placeholder="Fiche"></v-text-field>
                    </ValidationProvider>

                       <ValidationProvider name="Department" rules="required">
                                  <v-overflow-btn slot-scope="{errors, valid }" :error-messages="errors"
                                    :success="valid" required v-model="editedItem.department_id" :items="itemsDep"
                                    :prepend-inner-icon="icons.mdiHospitalBuilding" label="Department" type="text"
                                    outlined dense placeholder="Department"></v-overflow-btn>
                     </ValidationProvider>

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
            <v-card-title class="text-h5">Details Position</v-card-title>
            <v-card-text class="d-flex">
            </v-card-text>

            <v-card-text>
              <v-card>
                <v-card-title>
                  <span>{{ editedItem.jobName }}</span>
                  <v-spacer></v-spacer>
                  <a style="font-size:15px!important">{{ editedItem.fiche }}</a>
                </v-card-title>

                <v-card-text>
                  <!-- <v-alert elevation="2">
                        Aliquam eu nunc. Fusce commodo aliquam arcu. In consectetuer turpis ut velit. Nulla facilisi..

                        Morbi mollis tellus ac sapien. Fusce vel dui. Praesent ut ligula non mi varius sagittis. Vivamus consectetuer hendrerit lacus. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
                      </v-alert> -->

                  <v-alert outlined color="primary">
                    <div class="text-h6">
                      Description
                    </div>
                    <div>{{ editedItem.description }}</div>
                  </v-alert>

                </v-card-text>
              </v-card>


              <v-card class="mt-5">
                <v-card-title v-if="position_role != null">
                  <span>{{ position_role.role }}</span>
                  <v-spacer></v-spacer>
                  <v-chip class="ma-2" :color="position_role.status == 'active' ? 'success' : 'error'" outlined>
                    {{ position_role.status }}
                  </v-chip>
                </v-card-title>

                <div>
                  <v-card class="mx-auto" >
                    <v-virtual-scroll :bench="benched" :items="getAllRolesPosition" height="190" item-height="64">
                      <template v-slot:default="{ item }">
                        <v-list-item>
                          <v-list-item-action>
                            <v-btn fab small depressed color="primary">
                              {{ item.permission_id }}
                            </v-btn>
                          </v-list-item-action>

                          <v-list-item-content>
                            <v-list-item-title>
                              <strong>{{ item.permission.namePermission }}</strong>

                            </v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-action>

                          </v-list-item-action>
                        </v-list-item>

                        <v-divider></v-divider>
                      </template>
                    </v-virtual-scroll>

                  </v-card>
                </div>

                <p class="text-center pt-3 pb-3">No data available</p>

              </v-card>
            </v-card-text>
            <v-card-actions>
              <span></span>
              <v-spacer></v-spacer>
              <v-btn color="primary" outlined class="mt-4" type="reset" @click="closeDetails()">
                Cancel
              </v-btn>
            </v-card-actions>
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
        <span>Details position</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" color="#00695C" class="mr-2" @click="editItem(item)">
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
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" class="mr-2" @click="archiveItem(item)">
            {{ icons.mdiArchive }}
          </v-icon>
        </template>

        <span>Archive</span>
      </v-tooltip>
    </template>

  </v-data-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  ValidationObserver,
  ValidationProvider,
  withValidation
} from "vee-validate";
import {
  mdiPencil,
  mdiDeleteForever,
  mdiDetails,
  mdiAccountSearch,
  mdiArchive
} from '@mdi/js'
export default {
  props: ["listPositions"],
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    icons: {
      mdiPencil,
      mdiDeleteForever,
      mdiDetails,
      mdiAccountSearch,
      mdiArchive
    },
    benched: 0,
    dialog: false,
    positions: [],
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
        text: 'Job Name',
        align: 'start',
        value: 'jobName',
      },
      {
        text: 'Description',
        align: 'center',
        value: 'description',
      },
      {
        text: 'Fiche',
        align: 'start',
        value: 'fiche',
      },

      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      // id:'',
      role: '',
      description: '',
      fiche: '',
      department_id: '',
    },
    defaultItem: {
      //  id:'',
      role: '',
      description: '',
      fiche: '',
      department_id: '',
    },
    itemsDep: [],
    position_role: null,
  }),
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
    this.AllPositions();
    this.getAllDepartments();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Position' : 'Edit Position'
    },
    ...mapGetters([
      "getAllRolesPosition",
      "getAllPositions"
    ]),
    items() {
      return Array.from({ length: this.length }, (k, v) => v + 1)
    },
    length() {
      return 7000
    },
  },
  methods: {
    ...mapActions([
      "AllPositions",
      "deletePosition",
      "detailsPosition",
      "addPosition",
      "updatePosition",
      "archivePosition",
      "AllRolesPositions",
      "AllDepartments",
    ]),
    editItem(item) {
      this.editedIndex = this.getAllPositions.indexOf(item)
      this.editedItem = Object.assign({}, item)
       //await this.$refs.test.validate();
      this.$nextTick(() => {
        this.validateForm()
      });
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.positions.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.deletePosition(this.editedItem.id);
      this.closeDelete();
    },
    detailsItem(item) {
      this.position_role = item.role;
      this.AllRolesPositions(item.id);
      this.editedIndex = this.positions.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDetails = true
    },
    archiveItem(item) {
      this.archivePosition(item);
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
     getAllDepartments() {
      this.AllDepartments().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          this.itemsDep.push({
            text: response.data[i].departmentName,
            value: response.data[i].id
          });
        }
      })
        .catch(error => {
        });
    },
    save() {
      if (this.editedIndex > -1) {
        //edit
        this.updatePosition(this.editedItem);
        Object.assign(this.getAllPositions[this.editedIndex], this.editedItem)
      } else {
        //create
        this.addPosition(this.editedItem);
      }
      this.close()
      // this.$toast("Role added successfully !", {
      //   position: "top-right",
      //   timeout: 5000,
      //   closeOnClick: true,
      //   pauseOnFocusLoss: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   draggablePercent: 0.6,
      //   showCloseButtonOnHover: false,
      //   hideProgressBar: true,
      //   closeButton: "button",
      //   icon: true,
      //   rtl: false
      // });
    },
  },
}
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(255, 219, 219);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
