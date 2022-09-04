<template>
    <v-data-table :headers="headers" :items="getAllDepartments" sort-by="id">
        <template v-slot:top>
            <v-toolbar flat class="theadToolbar">
                <v-toolbar-title>Departments list </v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>

                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                            New departments
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
                                        <ValidationProvider name="Name Department" rules="required">
                                            <v-text-field slot-scope="{errors, valid }" :error-messages="errors"
                                                name="Name Department" :success="valid" required
                                                v-model="editedItem.departmentName"
                                                :prepend-inner-icon="icons.mdiAccountOutline" label="Name Department"
                                                outlined dense placeholder="Role">
                                            </v-text-field>
                                        </ValidationProvider>

                                        <v-textarea v-model="editedItem.description"
                                            :prepend-inner-icon="icons.mdiAccountOutline" label="Description .."
                                            outlined dense placeholder="Description"></v-textarea>
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
                        <v-card-title class="text-h5">Details department</v-card-title>
                        <v-card-text class="d-flex">
                        </v-card-text>

                        <v-card-text>
                            <div class="text-h6 mb-5">
                                Department name : {{ editedItem.departmentName }}
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
    mdiAccountKey
} from '@mdi/js'
import { isNull } from "url/util";

export default {
    props: ["listDeparts"],
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
            mdiAccountKey
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
                text: 'Department name',
                align: 'start',
                value: 'departmentName',
            },
            {
                text: 'Description',
                align: 'start',
                value: 'description',
            },
            { text: 'Actions', align: 'center', value: 'actions', sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            departmentName: '',
            description: '',
        },
        defaultItem: {
            departmentName: '',
            description: '',
        },
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New department' : 'Edit department'
        },
        ...mapGetters([
            "getAllDepartments"
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
        this.AllDeparts();
    },
    methods: {
        ...mapActions([
            "AllDeparts",
            "deleteDepartment",
            "addDepartment",
            "updateDepartment",
            "detailsDepartment",
            "archiveDepartment"

        ]),
        async editItem(item) {
            this.editedIndex = this.getAllDepartments.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
            this.$nextTick(() => {
                this.validateForm()
            });
        },
        deleteItem(item) {
            this.editedIndex = this.getAllDepartments.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },
        deleteItemConfirm() {
            this.deleteDepartment(this.editedItem.id);
            this.closeDelete();
        },
        detailsItem(item) {
            this.editedIndex = this.getAllDepartments.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDetails = true
        },
        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                let self = this
                // Shows the mapRef object reference
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
                this.updateDepartment(this.editedItem);
                Object.assign(this.getAllDepartments[this.editedIndex], this.editedItem)
            } else {
                //create
                this.addDepartment(this.editedItem);
            }
            this.close()
            this.$toast("Department added successfully !", {
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
        archiveItem(item) {
            this.archiveDepartment(item)
        },
        validateForm() {
            let self = this
            // Shows the mapRef object reference
            self.$refs['test-1'].validate() // returns undefined ???
        },
    },
}
</script>

<style>
.text-size {
    font-size: 22px;
}
</style>
