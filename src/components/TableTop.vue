<template>
  <v-data-table
    :headers="headers"
    :items="state.listEmployes"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Lists Employes</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-card-title>Sum Salary: {{ state.sumSalary }}</v-card-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-card-title>Oldest Employee: {{ state.oldestEmployee }}</v-card-title>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="state.dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
            Add New Employee
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ state.formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="8"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="-Fullname Employee-"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="8"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.age"
                      label="-Age-"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="8"
                    sm="6"
                    md="4"
                  > 
                    <v-text-field
                      v-model="editedItem.salary"
                      label="-Salary-"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text> 

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>  
        <v-dialog v-model="state.dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Do you want delete employee ?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue} from 'vue-property-decorator'
import Vuetify from 'vuetify'
import { Observer } from 'mobx-vue'
import { Store } from "../store/Store"
import Item from "../store/Store"

@Observer
@Component({
  name: 'Table'
})

export default class Table extends Vue {
  state = Store

  headers = [
    {
      text: 'Full Name',
      align: 'start',
      sortable: false,
      value: 'name',
    },
    { text: 'Age', value: 'age' },
    { text: 'Salary', value: 'salary' },
    { text: 'Actions', value: 'actions', sortable: false },
  ]

  editedItem = {
    name: '',
    age: 0,
    salary: 0,
  }
  defaultItem = {
    name: '',
    age: 0,
    salary: 0,
  }

  editItem (item: { name: string; age: number; salary: number }): void {
    this.state.editedIndex = this.state.listEmployes.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.state.dialog = true
  }

  deleteItem (item: { name: string; age: number; salary: number }): void {
    this.state.editedIndex = this.state.listEmployes.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.state.dialogDelete = true
  }

  deleteItemConfirm(): void {
    this.state.listEmployes.splice(this.state.editedIndex, 1)
    this.closeDelete()
  }

  close (): void {
    this.state.dialog = false
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.state.editedIndex = -1
    })
  }

  closeDelete (): void {
    this.state.dialogDelete = false
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.state.editedIndex = -1
    })
  }

  save (): void {
    if (this.state.editedIndex > -1) {
      Object.assign(this.state.listEmployes[this.state.editedIndex], this.editedItem)
    } else {
      this.state.listEmployes.push(this.editedItem)
    }
    this.close()
  }

}
</script>


