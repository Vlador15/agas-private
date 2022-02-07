<template>
  <v-container>
    <div v-if="isLoading">
      <v-data-table :headers="headers" :items="itemTable" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="80%">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  @click="addItem"
                >
                  {{ $t('moder.addField') }}
                </v-btn>
              </template>
              <!-- добавить или изменить поле -->
              <v-card height="700px">
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="editedItem.fullName"
                          :label="$t('moder.nameModer')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          v-model="editedItem.level"
                          :items="itemLevel"
                          :label="$t('moder.levelModer')"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="editedItem.userId"
                          label="userId"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    {{ $t('moder.cancel') }}
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    {{ $t('moder.save') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- подтверджение удаления -->
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">
                  {{ $t('moder.confirmDelete') }}</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">{{
                    $t('moder.cancel')
                  }}</v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="deleteItemConfirm"
                    >{{ $t('moder.delete') }}</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <!-- <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon> -->
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </div>
    <div v-else>
      <v-progress-circular
        style="margin-left: 45%; margin-top: 20%"
        :size="120"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Moders',
  components: {},
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: this.$t('moder.nameModer'),
          align: 'start',
          sortable: false,
          value: 'fullName'
        },
        { text: this.$t('moder.levelModer'), value: 'level' },
        { text: 'userId', value: 'userId' },
        { text: this.$t('moder.edit'), value: 'actions', sortable: false }
      ],
      itemTable: [],
      itemLevel: ['1', '2'],
      editedIndex: -1,
      editedItem: {
        fullName: '',
        level: 0,
        userId: ''
      },
      defaultItem: {
        fullName: '',
        level: 0,
        userId: ''
      },
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['getListModers']),
    formTitle() {
      return this.editedIndex === -1
        ? this.$t('moder.addField')
        : this.$t('moder.editField')
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    }
  },
  async mounted() {
    await this.getModersData()
    this.isLoading = true
  },
  methods: {
    async getModersData() {
      await this.$store.dispatch('GET_MODERS')
      console.log(this.getListModers)
      this.itemTable = [...this.getListModers]
    },
    addItem() {
      this.dialog = true
    },
    // editItem(item) {
    //   this.editedIndex = this.itemTable.indexOf(item)
    //   this.editedItem = Object.assign({}, item)
    //   this.dialog = true
    // },

    deleteItem(item) {
      this.editedIndex = this.itemTable.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      await this.$store.dispatch('DELETE_MODERS', this.editedItem.userId)
      this.itemTable = [...this.getListModers]
      this.itemTable.splice(this.editedIndex, 1)
      this.closeDelete()
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

    async save() {
      if (this.editedIndex > -1) {
        // редактирование
        // const data = {
        //   id: this.editedItem._id,
        //   list: this.mainSelect,
        //   language: this.langSelect,
        //   name: this.editedItem.name,
        //   description: this.editedItem.description,
        //   links: this.editedItem.links
        // }
        // await this.$store.dispatch('PUT_LIST', data)
        Object.assign(this.itemTable[this.editedIndex], this.editedItem)
      } else {
        // добавление
        const data = {
          fullName: this.editedItem.fullName,
          uid: this.editedItem.userId,
          level: this.editedItem.level
        }
        await this.$store.dispatch('GET_MODERS')
        await this.$store.dispatch('POST_MODERS', data)
        this.itemTable = [...this.getListModers]
      }
      this.close()
    }
  }
}
</script>
