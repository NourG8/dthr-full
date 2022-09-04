<template>
  <v-data-table :headers="headers" :items="getAllRoles" sort-by="id">
    <template v-slot:top>
      <v-toolbar flat class="theadToolbar">
        <v-toolbar-title>Roles list </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New role
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
                    <ValidationProvider name="Role" rules="required|min:3">
                      <v-text-field slot-scope="{errors, valid }" :error-messages="errors" name="role" :success="valid"
                        required v-model="editedItem.role" :prepend-inner-icon="icons.mdiAccountOutline" label="Role"
                        outlined dense placeholder="Role">
                      </v-text-field>
                    </ValidationProvider>

                    <v-textarea v-model="editedItem.description" :prepend-inner-icon="icons.mdiAccountOutline"
                      label="Description .." outlined dense placeholder="Description"></v-textarea>

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
            <v-card-title class="text-h5">Job related to role "{{ editedItem.role }}"</v-card-title>
            <v-card-text class="d-flex">
            </v-card-text>

            <v-card-text>
              <v-container style="max-width: 600px;" v-if="position_length != 0">
                <v-timeline dense clipped>
                  <v-timeline-item class="mb-4" small v-for="position in editedItem.positions" :key="position.id">
                    <v-row justify="space-between">
                      <v-col cols="7">
                        {{ position.jobName }}
                      </v-col>
                      <v-col class="text-right" cols="5">
                        <!-- {{ position.fiche }} -->
                        {{ new Date(position.created_at).toLocaleString() }}
                      </v-col>
                    </v-row>
                  </v-timeline-item>

                </v-timeline>
              </v-container>
              <v-alert border="left" colored-border type="warning" dense elevation="2" v-if="position_length == 0">
                No data available
              </v-alert>

            </v-card-text>
            <v-card-actions>
              <span></span>
              <v-spacer></v-spacer>
              <v-btn color="primary" outlined class="mt-4" type="reset" @click="closeDetails">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.description="{ item }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on" v-if="item.description != null">{{ item.description.substr(0, 20) }}..</span>
          <span v-on="on" v-if="item.description == null">--</span>
        </template>
        <span>{{ item.description }}</span>
      </v-tooltip>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" class="mr-2" color="#0277BD" @click="detailsItem(item)">
            {{ icons.mdiBriefcase }}
          </v-icon>
        </template>
        <span>Job related</span>
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

      <v-dialog transition="dialog-top-transition" max-width="600px">
        <template #activator="{ on: onDialog, attrs }">
          <v-tooltip bottom>
            <template #activator="{ on: onTooltip }">
              <v-icon v-bind="attrs" v-on="{ ...onDialog, ...onTooltip }" color="#00897B" class="mr-2"
                @click="PermissionItem(item)">
                {{ icons.mdiAccountKey }}
              </v-icon>
            </template>
            <span>Permission</span>
          </v-tooltip>
        </template>
        <template v-slot:default="dialogPermission">
          <v-card>
            <v-card-title>Assigned permissions </v-card-title>
            <v-card-text>
              <div class="text-h2 pa-12">
                <v-tabs vertical justify="space-between">
                  <v-tab v-for="(m, index) in table" :key="index" class="mr-8">
                    {{ m.name }}
                  </v-tab>
                  <v-tab-item v-for="(n, ind) in table" :key="ind">
                    <v-card flat>
                      <v-card-text>
                        <p v-for="(e, i) in n.permission" :key="i" class="ml-9">
                          <v-switch v-model="tableau" :value="e.value" inset :label="`${e.text}`"
                            :disabled="disabled == true">
                          </v-switch>
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialogPermission.value = false">Close</v-btn>
              <v-btn color="primary" @click="UpdatePermission()" v-if="disabled == true">Update</v-btn>
              <v-btn color="primary" @click="SavePermission()" v-if="disabled == false">Save</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
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
  mdiAccountSearch,
  mdiArchive,
  mdiAccountKey,
  mdiBriefcase
} from '@mdi/js'
import { isNull } from "url/util";

export default {
  props: ["listRoles", "listPermissions"],
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    admins: [
      ['Management', 'mdi-account-multiple-outline'],
      ['Settings', 'mdi-cog-outline'],
    ],
    cruds: [
      ['Create', 'mdi-plus-outline'],
      ['Read', 'mdi-file-outline'],
      ['Update', 'mdi-update'],
      ['Delete', 'mdi-delete'],
    ],
    icons: {
      mdiPencil,
      mdiDeleteForever,
      mdiDetails,
      mdiAccountSearch,
      mdiArchive,
      mdiAccountKey,
      mdiBriefcase
    },
    Role: null,
    table: [],
    permRole: [],
    disabled: true,
    dialog: false,
    dialogDelete: false,
    dialogDetails: false,
    length: 0,
    headers: [
      {
        text: '',
        align: 'start',
        sortable: false,
        value: '',
      },
      {
        text: 'Role',
        align: 'start',
        value: 'role',
      },
      {
        text: 'Description',
        align: 'start',
        value: 'description',
      },
      { text: 'Actions', align: 'center', value: 'actions', sortable: false },
    ],
    position_length: 0,
    editedIndex: -1,
    tableau: [],
    editedItem: {
      // id:'',
      role: '',
      description: '',
    },
    defaultItem: {
      //  id:'',
      role: '',
      description: '',
    },
    events: [],
    input: null,
    nonce: 0,
  }),
  computed: {
    timeline() {
      return this.events.slice().reverse()
    },
    formTitle() {
      return this.editedIndex === -1 ? 'New Role' : 'Edit Role'
    },
    ...mapGetters([
      "getAllRoles",
      "getAllPermissions"
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
    this.AllPermissions();
    // this.AffichagePermission();
  },
  methods: {
    ...mapActions([
      "AllRoles",
      "deleteRole",
      "detailsRole",
      "addRole",
      "updateRole",
      "archiveRole",
      "AllPermissions",
      "AffectPermissions",
      "AffectPermissionsRole",
      "deletePermissionRole"
    ]),
    AffichagePermission() {
      let tab = [];
      for (var i = 0; i < this.getAllPermissions.length; i++) {
        let obj = {
          "name": this.getAllPermissions[i].namePermission.split('.')[0],
          "permission": {
            text: this.getAllPermissions[i].namePermission.split('.')[1],
            value: this.getAllPermissions[i].id
          }
        }
        tab.push(obj);
      }
      let inter = [];
      inter.push(tab[0].name)
      let variable = tab[0].name;
      for (var l = 0; l < tab.length; l++) {
        if (inter.includes(tab[l].name)) {
          // console.log("..")
        } else {
          inter.push(tab[l].name)
        }
      }
      let obj = {
        "name": "",
        "permission": []
      }
      for (var l = 0; l < inter.length; l++) {
        for (var j = 0; j < tab.length; j++) {
          if (inter[l] == tab[j].name) {
            obj.name = tab[j].name;
            obj.permission.push(tab[j].permission)
          }
        }
        this.table.push(obj);
        obj = {
          "name": "",
          "permission": []
        }
      }
    },
    editItem(item) {
      // this.editedIndex = 0;
      this.editedIndex = this.getAllRoles.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.$nextTick(() => {
        this.validateForm()
      });
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
    },
    detailsItem(item) {
      this.editedIndex = this.getAllRoles.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDetails = true
      this.position_length = this.editedItem.positions.length;
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
    validateForm() {
      let self = this
      self.$refs['test-1'].validate() // returns undefined ???
    },
    archiveItem(item) {
      this.archiveRole(item)
    },
    PermissionItem(item) {
      this.Role = item;
      this.disabled = true;
      this.tableau = this.Role.permissions.map(el => el.permission_id)
    },
    SavePermission() {
      this.permRole = [];
      this.deletePermissionRole(this.Role);
      for (var k = 0; k < this.tableau.length; k++) {
        if (this.tableau[k] != undefined) {
          this.length += 1;
        }
      }
      for (var k = 0; k < this.tableau.length; k++) {
        if (this.tableau[k] != undefined) {
          this.permRole.push({
            permission_id: this.tableau[k],
            role_id: this.Role.id,
          })
        }
      }
      for (var i = 0; i < this.permRole.length; i++) {
        this.AffectPermissionsRole(this.permRole[i]);
      }
    },
    UpdatePermission() {
      this.disabled = false;
    }
  },
}
</script>

<style>
.text-size {
  font-size: 22px;
}
</style>
