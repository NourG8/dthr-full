<template>
  <div>
    <v-data-table :headers="headers" :items="getAllUsers" sort-by="lastName">
      <template v-slot:top>
        <v-toolbar flat class="theadToolbar">
          <p>{{ $t('message') }}</p>
          <v-toolbar-title>Users list </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-btn color="primary" dark class="mb-2 mr-2" :to="{ name: 'ArchiveUser' }">
            <v-icon  class="mr-2">
              {{ icons.mdiAccountMultipleRemove}}
            </v-icon>
            Archived Users
          </v-btn>
          <v-btn color="primary" dark class="mb-2 mr-2" :to="{ name: 'multi-users' }">
           <v-icon  class="mr-2" >
              {{ icons.mdiAccountMultiplePlus }}
            </v-icon>
            Multiple User
          </v-btn>

          <!-- Dialog add/edit user -->
          <v-dialog v-model="dialog" max-width="1500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2"  v-on="on">
             <v-icon v-bind="attrs" class="mr-2">
              {{ icons.mdiAccountPlus  }}
            </v-icon>
             New User
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
                <v-spacer></v-spacer>
                <div class="my-2">
                  <v-btn fab @click="close()" x-small>
                    <v-icon dark>
                      {{ icons.mdiCloseOutline }}
                    </v-icon>
                  </v-btn>
                </div>
              </v-card-title>

              <v-stepper v-model="e1">
                <v-stepper-header>

                  <v-stepper-step :complete="e1 > 1" step="1" @click="editedIndex !== -1 ? e1 = 1 : test = 0">
                    General informations
                  </v-stepper-step>
                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 2" step="2" @click="editedIndex !== -1 ? e1 = 2 : test = 0">
                    Contact
                  </v-stepper-step>
                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 3" step="3" @click="editedIndex !== -1 ? e1 = 3 : test = 0">
                    Family situation
                  </v-stepper-step>
                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 4" step="4" @click="editedIndex !== -1 ? e1 = 4 : test = 0">
                    Identity documents
                  </v-stepper-step>
                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 5" step="5" @click="editedIndex !== -1 ? e1 = 5 : test = 0">
                    Professional experience
                  </v-stepper-step>
                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 6" step="6" @click="editedIndex !== -1 ? e1 = 6 : test = 0">
                    Motivation
                  </v-stepper-step>
                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 7" step="7" @click="editedIndex !== -1 ? e1 = 7 : test = 0">
                    Administrative informations
                  </v-stepper-step>

                </v-stepper-header>
                <v-form ref="'form'">
                  <v-stepper-items class="content">
                    <v-stepper-content step="1">
                      <ValidationObserver ref="test-1">
                        <div slot-scope="{ invalid, validated }">
                          <div class="card mt-1">
                            <v-row>
                              <v-col cols="12" md="6">
                                <ValidationProvider name="Last name" rules="required|max:15|min:2">
                                  <v-text-field slot-scope="{errors, valid }" :counter="15" :error-messages="errors"
                                    :success="valid" required v-model="editedItem.lastName"
                                    :prepend-inner-icon="icons.mdiAccountOutline" label="Last name" text-center outlined
                                    dense placeholder="Last name"></v-text-field>
                                </ValidationProvider>
                              </v-col>

                              <v-col cols="12" md="6">
                                <ValidationProvider name="First name" rules="required|max:15|min:2">
                                  <v-text-field slot-scope="{errors, valid }" :counter="15" :error-messages="errors"
                                    :success="valid" required v-model="editedItem.firstName"
                                    :prepend-inner-icon="icons.mdiAccountOutline" label="First name" outlined dense
                                    placeholder="First name"></v-text-field>
                                </ValidationProvider>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" md="4">
                                <ValidationProvider name="Date of birth" rules="required|date_format:yyyy-MM-dd|date_between:{result,result}">
                                  <v-text-field slot-scope="{errors, valid }" :error-messages="errors" :success="valid"
                                    required v-model="editedItem.dateBirth" :prepend-inner-icon="icons.mdiCalendar"
                                    label="Date of birth" type="date" outlined dense placeholder="Date of birth">
                                  </v-text-field>
                                </ValidationProvider> {{num}}
                              </v-col>

                              <v-col cols="12" md="4">
                                <ValidationProvider name="Place of birth" rules="required|max-value: + num">
                                  <v-text-field slot-scope="{errors, valid }" :counter="15" :error-messages="errors" 
                                    :success="valid" required v-model="editedItem.placeBirth"
                                    :prepend-inner-icon="icons.mdiCalendar" label="Place of birth" type="text" outlined
                                    dense placeholder="Place of birth">
                                  </v-text-field>
                                </ValidationProvider>
                              </v-col>

                              <v-col cols="12" md="4">
                                <ValidationProvider name="Sex" rules="required">
                                  <v-overflow-btn slot-scope="{errors, valid }" :error-messages="errors"
                                    :success="valid" required v-model="editedItem.sex"
                                    :prepend-inner-icon="icons.mdiGenderMaleFemale" label="Sex" :items="sex" outlined
                                    dense placeholder="Sex"></v-overflow-btn>
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
                        </div>
                      </ValidationObserver>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                      <ValidationObserver ref="test-2">
                        <div slot-scope="{ invalid, validated }">
                          <div class="card mt-1">
                            <v-row>
                              <v-col cols="12" md="12">
                                <ValidationProvider name="Address" rules="required|max:15|min:2">
                                  <v-text-field slot-scope="{errors, valid }" :counter="15" :error-messages="errors"
                                    :success="valid" required v-model="editedItem.address"
                                    :prepend-inner-icon="icons.mdiMapMarker" label="Address" outlined dense
                                    placeholder="Address"></v-text-field>
                                </ValidationProvider>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" md="6">
                                <ValidationProvider name="Personal e-mail" rules="required|email">
                                  <v-text-field slot-scope="{errors, valid }" :error-messages="errors" :success="valid"
                                    required v-model="editedItem.email" :prepend-inner-icon="icons.mdiEmailOutline"
                                    label="Personal e-mail" type="email" outlined dense
                                    placeholder="example@example.com"></v-text-field>
                                </ValidationProvider>
                              </v-col>
                              <v-col cols="12" md="6">
                                <ValidationProvider name="Professional e-mail" rules="required|email">
                                  <v-text-field slot-scope="{errors, valid }" :error-messages="errors" :success="valid"
                                    required v-model="editedItem.emailProf" :prepend-inner-icon="icons.mdiEmailOutline"
                                    label="Professional e-mail" type="email" outlined dense
                                    placeholder="example@example.com"></v-text-field>
                                </ValidationProvider>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" md="6">
                                <ValidationProvider name="Phone number 1" rules="required|max:8|min:8">
                                  <v-text-field slot-scope="{errors, valid }" :counter="8" :error-messages="errors"
                                    :success="valid" required v-model="editedItem.phone"
                                    :prepend-inner-icon="icons.mdiCellphone" label="Phone number 1" outlined dense
                                    placeholder="Phone number 1">
                                  </v-text-field>
                                </ValidationProvider>
                              </v-col>
                              <v-col cols="12" md="6">
                                <ValidationProvider name="Phone emergency" rules="required|max:8|min:8">
                                  <v-text-field slot-scope="{errors, valid }" :counter="8" :error-messages="errors"
                                    :success="valid" required v-model="editedItem.phoneEmergency"
                                    :prepend-inner-icon="icons.mdiCellphone" label="Phone emergency" outlined dense
                                    placeholder="Phone emergency">
                                  </v-text-field>
                                </ValidationProvider>
                              </v-col>
                            </v-row>
                          </div>
                          <v-card-actions>

                            <v-btn outlined text @click="e1 = 1">
                              Previous
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="e1 = 3" class="mr-2" :disabled="invalid || !validated">
                              Next
                            </v-btn>
                          </v-card-actions>

                        </div>
                      </ValidationObserver>
                    </v-stepper-content>


                    <v-stepper-content step="3">
                      <ValidationObserver ref="test-3">
                        <div slot-scope="{ invalid, validated }">
                          <div class="card mt-1">
                            <v-row>
                              <v-col cols="12" md="12">
                                <ValidationProvider name="Family situation" rules="required">
                                  <v-overflow-btn slot-scope="{errors, valid }" :error-messages="errors"
                                    :success="valid" required :items="items" v-model="editedItem.FamilySituation"
                                    :prepend-inner-icon="icons.mdiSecurity" label="Family situation" outlined dense>
                                  </v-overflow-btn>
                                </ValidationProvider>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" md="12">
                                <ValidationProvider name="Number of cildren" rules="required">
                                  <v-text-field slot-scope="{errors, valid }" :error-messages="errors" :success="valid"
                                    required v-model="editedItem.nbChildren"
                                    :prepend-inner-icon="icons.mdiHumanFemaleFemale" label="Number of cildren"
                                    type="number" outlined dense placeholder="Number of children">
                                  </v-text-field>
                                </ValidationProvider>
                              </v-col>
                            </v-row>
                          </div>
                          <v-card-actions>
                            <v-btn text outlined @click="e1 = 2">
                              Previous
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="e1 = 4" class="mr-2" :disabled="invalid || !validated">
                              Next
                            </v-btn>
                          </v-card-actions>
                        </div>
                      </ValidationObserver>
                    </v-stepper-content>

                    <v-stepper-content step="4">
                      <ValidationObserver ref="test-4">
                        <div slot-scope="{ invalid, validated }">
                          <div class="card mt-1">
                            <v-row>
                              <v-col cols="12" md="4">
                                <ValidationProvider name="Cin" rules="required|max:8|min:8">
                                  <v-text-field slot-scope="{errors, valid }" :counter="8" :error-messages="errors"
                                    :success="valid" required v-model="editedItem.cin"
                                    :prepend-inner-icon="icons.mdiAccountBoxOutline" label="Cin" type="number" outlined
                                    dense placeholder="Cin"></v-text-field>
                                </ValidationProvider>
                              </v-col>

                              <v-col cols="12" md="4">
                                <ValidationProvider name="Delivery date (Cin)" rules="required">
                                  <v-text-field slot-scope="{errors, valid }" :error-messages="errors" :success="valid"
                                    required v-model="editedItem.deliveryDateCin"
                                    :prepend-inner-icon="icons.mdiCalendar" label="Delivery date (Cin)" type="date"
                                    outlined dense placeholder="Delivery date (Cin)">
                                  </v-text-field>
                                </ValidationProvider>
                              </v-col>

                              <v-col cols="12" md="4">
                                <ValidationProvider name="Place of delivery (Cin)" rules="required|min:3">
                                  <v-text-field slot-scope="{errors, valid }" :error-messages="errors" :success="valid"
                                    required v-model="editedItem.deliveryPlaceCin"
                                    :prepend-inner-icon="icons.mdiMapMarkerRadius" label="Place of delivery (Cin)"
                                    outlined dense placeholder="Place of delivery (Cin)">
                                  </v-text-field>
                                </ValidationProvider>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" md="8">
                                <ValidationProvider name="Passport number" rules="required|max:8|min:8">
                                  <v-text-field slot-scope="{errors, valid }" :counter="8" :error-messages="errors"
                                    :success="valid" required v-model="editedItem.numPassport"
                                    :prepend-inner-icon="icons.mdiPassport" label="Passport number" outlined dense
                                    placeholder="Passport number"></v-text-field>
                                </ValidationProvider>
                              </v-col>
                              <v-col cols="12" md="4">
                                <ValidationProvider name="Nationality" rules="required|min:3">
                                  <v-text-field slot-scope="{errors, valid }" :error-messages="errors" :success="valid"
                                    required v-model="editedItem.nationality" :prepend-inner-icon="icons.mdiCreditCard"
                                    label="Nationality" outlined dense placeholder="Nationality"></v-text-field>
                                </ValidationProvider>
                              </v-col>
                            </v-row>
                          </div>
                          <v-card-actions>
                            <v-btn outlined text @click="e1 = 3">
                              Previous
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="e1 = 5" class="mr-2" :disabled="invalid || !validated">
                              Next
                            </v-btn>
                          </v-card-actions>

                        </div>
                      </ValidationObserver>
                    </v-stepper-content>


                    <v-stepper-content step="5">
                      <ValidationObserver ref="test-5">
                        <div slot-scope="{ invalid, validated }">
                          <div class="card mt-1">
                            <v-row>
                              <v-col cols="12" md="6">
                                <ValidationProvider name="Level of studies" rules="required|max:15|min:4">
                                  <v-text-field slot-scope="{errors, valid }" :counter="15" :error-messages="errors"
                                    :success="valid" required v-model="editedItem.levelStudies"
                                    :prepend-inner-icon="icons.mdiLibrary" label="Level of studies" outlined dense
                                    placeholder="Level of studies"></v-text-field>
                                </ValidationProvider>
                              </v-col>
                              <v-col cols="12" md="6">
                                <ValidationProvider name="Specialities" rules="required|max:15|min:4">
                                  <v-text-field slot-scope="{errors, valid }" :counter="15" :error-messages="errors"
                                    :success="valid" required v-model="editedItem.specialty"
                                    :prepend-inner-icon="icons.mdiZodiacTaurus" label="Specialities" outlined dense
                                    placeholder="Specialities"></v-text-field>
                                </ValidationProvider>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" md="6">
                                <ValidationProvider name="Sivp" rules="required">
                                  <v-overflow-btn slot-scope="{errors, valid }" :error-messages="errors"
                                    :success="valid" required :items="itemsSivp" v-model="editedItem.sivp"
                                    :prepend-inner-icon="icons.mdiFileDocument" label="Sivp" outlined dense
                                    placeholder="Sivp"></v-overflow-btn>
                                </ValidationProvider>
                              </v-col>

                              <v-col cols="12" md="6">
                                <ValidationProvider name="Duration of Sivp" rules="required">
                                  <v-text-field slot-scope="{errors, valid }" :error-messages="errors" :success="valid"
                                    required v-model="editedItem.durationSivp"
                                    :prepend-inner-icon="icons.mdiCalendarClock" label="Duration of Sivp" type="number"
                                    outlined dense placeholder="Duration of Sivp">
                                  </v-text-field>
                                </ValidationProvider>
                              </v-col>
                            </v-row>
                          </div>

                          <v-card-actions>
                            <v-btn outlined text @click="e1 = 4">
                              Previous
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="e1 = 6" class="mr-2" :disabled="invalid || !validated">
                              Next
                            </v-btn>
                          </v-card-actions>
                        </div>
                      </ValidationObserver>
                    </v-stepper-content>

                    <v-stepper-content step="6">
                      <ValidationObserver ref="test-6">
                        <div slot-scope="{ invalid, validated }">
                          <div class="card-scene">

                            <h5 class="my-1"> - Please classify your motivational posts in a job : </h5>

                            <v-row class="my-8" align="center" justify="space-around">
                              <draggable v-model="list" v-bind="dragOptions" :move="onMove" @start="isDragging = true"
                                @end="isDragging = false">
                                <v-btn color="secondary" class="my-2 mx-2 list-group-item"
                                  v-for="(element, index) in list" :key="element.order">
                                  {{ index + 1 }} - {{ element.name }}
                                  <i :class="element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
                                    @click="element.fixed = !element.fixed" aria-hidden="true"></i>
                                </v-btn>
                              </draggable>
                            </v-row>
                          </div>
                          <v-card-actions>
                            <v-btn text outlined @click="e1 = 5">
                              Previous
                            </v-btn>

                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="e1 = 7" class="mr-2">
                              Next
                            </v-btn>
                          </v-card-actions>
                        </div>
                      </ValidationObserver>
                    </v-stepper-content>

                    <v-stepper-content step="7">
                      <ValidationObserver ref="test-7">
                        <div slot-scope="{ invalid, validated }">
                          <div class="card mt-1">

                            <v-row>
                              <v-col cols="12" md="6">
                                <ValidationProvider name="Integration date" rules="required">
                                  <v-text-field slot-scope="{errors, valid }" :error-messages="errors" :success="valid"
                                    required v-model="editedItem.integrationDate"
                                    :prepend-inner-icon="icons.mdiCalendar" label="Integration date" type="date"
                                    outlined dense placeholder="Integration date">
                                  </v-text-field>
                                </ValidationProvider>
                              </v-col>
                              <v-col cols="12" md="6">
                                <ValidationProvider name="Type of contract" rules="required">
                                  <v-overflow-btn slot-scope="{errors, valid }" :error-messages="errors"
                                    :success="valid" required :items="itemsContrat" v-model="editedItem.contractType"
                                    :prepend-inner-icon="icons.mdiFormatListBulletedType" label="Type of contract"
                                    outlined dense placeholder="Type of contract"></v-overflow-btn>
                                </ValidationProvider>
                              </v-col>
                            </v-row>

                            <v-row>
                              <!-- <v-col cols="12" md="6">
                                <ValidationProvider name="Department" rules="required">
                                  <v-overflow-btn slot-scope="{errors, valid }" :error-messages="errors"
                                    :success="valid" required v-model="editedItem.department_id" :items="itemsDep"
                                    :prepend-inner-icon="icons.mdiHospitalBuilding" label="Department" type="text"
                                    outlined dense placeholder="Department"></v-overflow-btn>
                                </ValidationProvider>
                              </v-col> -->
                              <v-col cols="12" md="12">
                                <ValidationProvider name="Post occupied" rules="required">
                                  <v-overflow-btn slot-scope="{errors, valid }" :error-messages="errors"
                                    :success="valid" required v-model="editedItem.position_id" :items="itemsPost"
                                    :prepend-inner-icon="icons.mdiBriefcaseCheck" label="Post occupied" outlined dense
                                    placeholder="Post occupied"></v-overflow-btn>
                                </ValidationProvider>
                              </v-col>
                            </v-row>
                          </div>

                          <v-card-actions>
                            <v-btn outlined text @click="e1 = 6">
                              Previous
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="save()" :disabled="invalid || !validated" class="mr-2">
                              Save
                            </v-btn>
                          </v-card-actions>
                        </div>
                      </ValidationObserver>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-form>
              </v-stepper>

            </v-card>
          </v-dialog>

          <!-- Dialog delete user -->
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
            <v-icon v-on="on" class="mr-2" color="#00695C" @click="editItem(item)">
              <!-- {{ icons.mdiPencil }} -->
              {{icons.mdiAccountEdit}}
            </v-icon>
          </template>
          <span>Edit</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" class="mr-2" color="error" @click="deleteItem(item)">
              <!-- {{ icons.mdiDeleteForever }} -->
              {{ icons.mdiAccountRemove}}
            </v-icon>
          </template>
          <span>Delete</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" class="mr-2" @click="archiveItem(item)">
             {{ icons.mdiAccountCancel}}
            </v-icon>
          </template>
          <span>Archive</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" color="#EF6C00" @click="resettingPassword(item)">
              {{ icons.mdiLockReset }}
            </v-icon>
          </template>
          <span>Reset password</span>
        </v-tooltip>


      </template>

    </v-data-table>

  </div>
</template>

<script>
import {format} from 'date-fns';
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
  mdiLockReset,
  mdiAccountMultiplePlus,
  mdiAccountReactivate,
  mdiAccountPlus ,
  mdiAccountRemove,
  mdiAccountEdit,
  mdiAccountCancel,
  mdiAccountMultipleRemove

} from '@mdi/js'
export default {
  props: ["listUsers","listPositions"],
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
      mdiLockReset,
      mdiAccountMultiplePlus,
      mdiAccountReactivate,
      mdiAccountPlus ,
      mdiAccountRemove,
      mdiAccountEdit,
      mdiAccountCancel,
      mdiAccountMultipleRemove
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
      { text: 'Actions', value: 'actions', sortable: false,  align: 'center',},
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
      // department_id: '',
    },
    sex: ['Women', 'Man'],
    result : null,
    num:3,
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
      return this.editedIndex === -1 ? 'New user' : 'Edit user'
    },
    ...mapGetters([
      "getAllUsers",
      "getAllPositions"
    ]),
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    },
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    dialogDetails(val) {
      val || this.closeDetails()
    },
    dialogAdd(val) {
      val || this.closeAdd()
    },

  },
  created() {
    this.AllUsers();
    this.AllPositions();
    // this.getAllDepartments();
    this.getPositions();
    console.log(new Date())
     this.result = format(new Date(), 'dd-MM-yyyy');
console.log(this.result);
  },
  methods: {
    ...mapActions([
      "AllUsers",
      "AllPositions",
      "AllDepartments",
      "deleteUser",
      "detailsUser",
      "addUser",
      "updateUser",
      "archiveUser",
      "AdminResetPassword"
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
        // this.$refs.form.reset();
        let self = this
        // Shows the mapRef object reference
        for (let i = 1; i < 8; i++) {
          self.$refs['test-' + i].reset() // returns undefined ???

        }
      });
    },
    async submit() {
      // const result = await this.$refs.obs.validate();
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
    getPositions() {
        for (var i = 0; i < this.getAllPositions.length; i++) {
          this.itemsPost.push({
            text: this.getAllPositions[i].jobName,
            value: this.getAllPositions[i].id
          });
        }
    },
    validateForm() {
      let self = this
      // Shows the mapRef object reference
      for (let i = 1; i < 8; i++) {
        self.$refs['test-' + i].validate() // returns undefined ???
      }
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      const relatedElementOrder = relatedContext.element.order;
      const draggedElementOrder = draggedContext.element.ordre;
      // this.editedItem.motivation = this.list;
      return (
        (!relatedElement || !relatedElement.fixed || !relatedElementOrder || !relatedElementOrder.fixed) && !draggedElement.fixed
      );
    },
    async editItem(item) {
      this.editedIndex = this.getAllUsers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.motivation = this.list;
      //await this.$refs.test.validate();
      this.$nextTick(() => {
        this.validateForm()
      });
      this.dialog = true
      this.editedIndex = 0;
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
      this.e1 = 1;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        let self = this
        // Shows the mapRef object reference
        for (let i = 1; i < 8; i++) {
          self.$refs['test-' + i].reset() // returns undefined ???
        }
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
    closeAdd() {
      this.dialogAdd = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save() {
      this.editedItem.motivation = this.list;
      if (this.editedIndex > -1) {
        //edit
        this.updateUser(this.editedItem);
        Object.assign(this.getAllUsers[this.editedIndex], this.editedItem)

      } else {
        //create
        this.e1 = 1;
        // this.getAllUsers.push(this.editedItem);
        this.addUser(this.editedItem);
      }
      this.close()
      },
    archiveItem(item) {
      this.archiveUser(item);
    },
    resettingPassword(item) {
      this.AdminResetPassword(item);
        this.$toast.success("Password changed successfully !", {
          position: "top-right",
          timeout: 5000,
          draggable: true,
          draggablePercent: 0.6,
      });
    },
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
