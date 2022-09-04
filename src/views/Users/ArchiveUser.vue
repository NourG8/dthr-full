<template>
  <div>
    <v-data-table :headers="headers" :items="ArchiveUser" sort-by="lastName">
      <template v-slot:top>
        <v-toolbar flat class="theadToolbar">
          <v-toolbar-title> archived users</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2 mr-2" :to="{ name: 'users' }">
           <v-icon   class="mr-2">
          {{icons.mdiAccountGroup}}
          </v-icon>
            list of  Users
          </v-btn>

         <!-- Dialog details user -->
          <v-dialog v-model="dialogDetails" max-width="800px">
            <v-card flat class="pa-3 mt-2">
              <v-card-title class="text-h5">Details User</v-card-title>
              <v-card-text class="d-flex">
              </v-card-text>

              <v-card-text>
                <v-form class="multi-col-validation mt-6">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="editedItem.lastName" :prepend-inner-icon="icons.mdiAccountOutline"
                        label="Last name" outlined dense placeholder="Last name"></v-text-field>
                      <!-- disabled -->
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="editedItem.firstName" :prepend-inner-icon="icons.mdiAccountOutline"
                        label="First name" outlined dense placeholder="First name"></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field v-model="editedItem.email" :prepend-inner-icon="icons.mdiEmailOutline"
                        label="E-mail" type="email" outlined dense placeholder="E-mail"></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field v-model="editedItem.address" :prepend-inner-icon="icons.mdiEmailOutline"
                        label="Address" outlined dense placeholder="Address"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field v-model="editedItem.phone" :prepend-inner-icon="icons.mdiEmailOutline"
                        label="Phone number" type="number" outlined dense placeholder="Phone number">
                      </v-text-field>

                    </v-col>
                    <v-col cols="12" md="4">
                      <v-overflow-btn v-model="editedItem.sex" :prepend-inner-icon="icons.mdiAccountOutline" label="Sex"
                        :items="['Women', 'Man']" outlined dense placeholder="Sex"></v-overflow-btn>

                    </v-col>
                  </v-row>

                  <v-row>

                    <v-col cols="12" md="6">
                      <v-text-field v-model="editedItem.dateBirth" :prepend-inner-icon="icons.mdiEmailOutline"
                        label="Date of birth" type="date" outlined dense placeholder="Date of birth">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="editedItem.nationality" :prepend-inner-icon="icons.mdiEmailOutline"
                        label="Nationality" outlined dense placeholder="Nationality"></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="6">
                      <v-overflow-btn :items="items" v-model="editedItem.FamilySituation"
                        :prepend-inner-icon="icons.mdiEmailOutline" label="Family situation"
                        placeholder="Family situation" outlined dense>
                      </v-overflow-btn>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field v-model="editedItem.nbChildren" :prepend-inner-icon="icons.mdiEmailOutline"
                        label="Number of children" type="number" outlined dense placeholder="Number of children">
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="editedItem.cin" :prepend-inner-icon="icons.mdiEmailOutline" label="Cin"
                        type="number" outlined dense placeholder="Cin"></v-text-field>

                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field v-model="editedItem.deliveryDateCin" :prepend-inner-icon="icons.mdiEmailOutline"
                        label="Delivery date (Cin)" type="date" outlined dense placeholder="Delivery date (Cin)">
                      </v-text-field>

                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="editedItem.sivp" :prepend-inner-icon="icons.mdiEmailOutline" label="Sivp"
                        outlined dense placeholder="Sivp"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field v-model="editedItem.durationSivp" :prepend-inner-icon="icons.mdiEmailOutline"
                        label="Duration Sivp" type="number" outlined dense placeholder="Duration Sivp"></v-text-field>

                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field v-model="editedItem.levelStudies" :prepend-inner-icon="icons.mdiEmailOutline"
                        label="Level studies" outlined dense placeholder="Level studies"></v-text-field>
                    </v-col>

                    <v-col cols="12">
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
      <template v-slot:item.avatar="{ item }">
        <v-avatar size="38" class="mt-2 mb-2">
          <img
            src="data:image/png;base64,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"
            alt="John">
        </v-avatar>
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
            <v-icon v-on="on" color="#EF6C00" @click="resettingUser(item)">
              {{ icons.mdiAccountReactivate }}
            </v-icon>
          </template>
          <span>Reset user</span>
        </v-tooltip>
         <!-- Dialog restor user -->
          <v-dialog v-model="dialogRestor" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want reset this user ? </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogRestor=false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="RestorItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
     </template>
   </v-data-table>

  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import draggable from "vuedraggable";
import {
  ValidationObserver,
  ValidationProvider,
  withValidation
} from "vee-validate";
const message = [
  "the atmosphere",
  "professionalism",
  "the gratitude",
  "money",
  "the work environment",
];

import {
  mdiDeleteForever,
  mdiPencil,
  mdiDetails,
  mdiAccountSearch,
  mdiAccountOutline,
  mdiEmailOutline,
  mdiCellphone,
  mdiGenderMaleFemale,
  mdiAccountBoxOutline,
  mdiMapMarker,
  mdiCalendar,
  mdiCalendarClock,
  mdiCloseOutline,
  mdiSecurity,
  mdiHumanFemaleFemale,
  mdiMapMarkerRadius,
  mdiPassport,
  mdiCreditCard,
  mdiLibrary,
  mdiZodiacTaurus,
  mdiAccountBox,
  mdiFileDocument,
  mdiFormatListBulletedType,
  mdiHospitalBuilding,
  mdiBriefcaseCheck,
  mdiArchive,
  mdiAccountReactivate,
  mdiAccountGroup

} from '@mdi/js'
export default {
  props: ["archive"],
  components: {
    draggable,
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    list: message.map((name, index) => {
      return { name, order: index + 1, fixed: false };
    }),
    list2: [],
    dialogReset: false,
    ArchiveUser: [],
    editable: true,
    isDragging: false,
    delayedDragging: false,
    users: [],
    items: ['Single', 'Married', 'Divorce'],
    itemsSivp: ['Yes', 'No'],
    itemsDep: [],
    itemsContrat: ['SIVP', 'CDD', 'CDI'],
    itemsPost: [],
    e1: 1,
    icons: {
      mdiDeleteForever,
      mdiPencil,
      mdiDetails,
      mdiAccountSearch,
      mdiAccountOutline,
      mdiEmailOutline,
      mdiCellphone,
      mdiGenderMaleFemale,
      mdiAccountBoxOutline,
      mdiMapMarker,
      mdiCalendar,
      mdiCalendarClock,
      mdiCloseOutline,
      mdiSecurity,
      mdiHumanFemaleFemale,
      mdiMapMarkerRadius,
      mdiPassport,
      mdiCreditCard,
      mdiLibrary,
      mdiZodiacTaurus,
      mdiAccountBox,
      mdiFileDocument,
      mdiFormatListBulletedType,
      mdiHospitalBuilding,
      mdiBriefcaseCheck,
      mdiArchive,
      mdiAccountReactivate,
      mdiAccountGroup

    },
    dialog: false,
    dialogDelete: false,
    dialogDetails: false,
    headers: [
      {
        text: '',
        align: 'center',
        sortable: false,
        value: 'avatar',
      }, {
        text: 'Last name',
        align: 'start',
        sortable: false,
        value: 'lastName',
      },
      { text: 'First name', value: 'firstName' },
      { text: 'E-mail', value: 'email' },
      { text: 'Professional e-mail', value: 'emailProf' },
      { text: 'Address', value: 'address' },
      { text: 'Phone', value: 'phone' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    test: -1,
    editedIndex: -1,
    editedItem: {
      lastName: '',
      firstName: '',
      sex: '',
      email: '',
      emailProf: '',
      placeBirth: '',
      address: '',
      dateBirth: '',
      nationality: '',
      phone: '',
      phoneEmergency: '',
      FamilySituation: '',
      nbChildren: '',
      levelStudies: '',
      specialty: '',
      sivp: '',
      durationSivp: '',
      numPassport: '',
      cin: '',
      deliveryDateCin: '',
      deliveryPlaceCin: '',
      contractType: '',
      integrationDate: '',
      motivation: '',
      position_id: '',
      department_id: '',
    },
    archiveUsers:[],
    sex: ['Women', 'Man'],
    dialogRestor: false,
  }),
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
    listString() {
      return JSON.stringify(this.list, null, 2);
    },
    list2String() {
      return JSON.stringify(this.list2, null, 2);
    },
    formTitle() {
      return this.editedIndex === -1 ? 'New User' : 'Edit User'
    },
    // ...mapGetters([
    //   "getArchivedUser",
    // ]),
  },
  watch: {
      dialogDetails(val) {
      val || this.closeDetails()
    },
  },
  created() {
    this.AllUsersArchived();
  },
  methods: {
    ...mapActions([
      "AllArchivedUser",
      "AllDepartments",
      "detailsUser",
      "archiveUser",
      "resetUser"
    ]),
    orderList() {
      this.list = this.list.sort((one, two) => {
        return one.order - two.order;
      });
    },
    async clear() {
      this.editedItem.lastName =
        this.editedItem.firstName =
        this.editedItem.sex =
        this.editedItem.email =
        this.editedItem.emailProf =
        this.editedItem.placeBirth =
        this.editedItem.address =
        this.editedItem.dateBirth =
        this.editedItem.nationality =
        this.editedItem.phone =
        this.editedItem.phoneEmergency =
        this.editedItem.FamilySituation =
        this.editedItem.nbChildren =
        this.editedItem.levelStudies =
        this.editedItem.specialty =
        this.editedItem.sivp =
        this.editedItem.durationSivp =
        this.editedItem.numPassport =
        this.editedItem.cin =
        this.editedItem.deliveryDateCin =
        this.editedItem.deliveryPlaceCin =
        this.editedItem.contractType =
        this.editedItem.integrationDate =
        this.editedItem.motivation =
        this.editedItem.position_id =
        this.editedItem.department_id = "";
        this.$nextTick(() => {
          this.$refs.obs.reset();
        });
    },
    async submit() {
      const result = await this.$refs.obs.validate();
    },
   AllUsersArchived(){
        this.AllArchivedUser().then(response => {
                  //  this.getArchivedUser = response.data;
                  this.ArchiveUser = response.data
                })
                .catch(error => {
                    console.log(error)
                });
    },
    close() {
      this.dialog = false
      this.e1 = 1;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
   RestorItemConfirm() {
     this.dialogRestor = false;
      this.resetUser(this.editedItem);
      this.AllUsersArchived();
      this.$toast.success("user deleted succefully !", {

      });
   },
    detailsItem(item) {
      this.editedIndex = this.ArchiveUser.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDetails = true
    },


    closeDetails() {
      this.dialogDetails = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

     resettingUser(item){
      this.dialogRestor = true;
      this.editedItem = item;
    }



  },
}
</script>

<style >
.card {
  height: 250px !important;
}

.content {
  display: flex !important;
  justify-content: center !important;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
