<template>
  <v-container>
    <v-row align="center" class="my-6">
      <v-col>
        <h1>
          <v-icon size="50" color="black" class="mr-4">mdi-check-all</v-icon
          >List Of Users
        </h1>
      </v-col>
      <v-col class="text-sm-right text-left">
        <v-btn color="secondary" @click="exportCSV">Export CSV</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <client-only>
          <v-data-table
            disable-sort
            :headers="headers"
            :items="customer_list"
            :items-per-page="10"
            class="elevation-0"
          >
            <template v-slot:item.name="{ item }">
              <nuxt-link :to="'/users/' + item._id">
                {{ item.first_name }} {{ item.last_name }}
              </nuxt-link>
            </template>
            <template v-slot:item.join_date="{ item }">{{
              get_date(item.join_date)
            }}</template>
            <template v-slot:item.type="{ item }">{{
              item.type ? 'Rides' : 'Eats'
            }}</template>
            <template v-slot:item.verified="{ item }">{{
              item.verified ? 'Verified' : 'Not Verified'
            }}</template>
            <template v-slot:item.orders="{ item }">{{ item.orders }}</template>
            <template v-slot:item.m_verified="{ item }">
              <span v-if="!item.isManuall">
                <v-btn color="success" @click="manuall_verify(item._id)"
                  ><v-icon>mdi-check</v-icon>Verify
                </v-btn>
              </span>
              <span v-else>
                Verified
              </span>
            </template>
          </v-data-table>
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import service from '@/service/service'
const FileDownload = require('js-file-download')

export default {
  data() {
    return {
      customer_list: [],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Joined On', value: 'join_date' },
        { text: 'Verified', value: 'verified' },
        { text: 'Manual Verification', value: 'm_verified' },
      ],
    }
  },
  methods: {
    get_date(my_date) {
      var d = new Date(my_date)
      var year = d.getFullYear().toString()
      var month = (d.getMonth() + 1).toString()
      var date = d.getDate().toString()

      return (
        (date[1] ? date : '0' + date[0]) +
        '/' +
        (month[1] ? month : '0' + month[0]) +
        '/' +
        year
      )
    },
    async manuall_verify(id) {
      let tosend = { user_id: id }
      const data = await service.manual_verify(this.$axios, tosend)
      if ((data.msg = 'verified')) {
        const n_data = await service.users(this.$axios)
        this.customer_list = n_data
      }
    },
    exportCSV() {
      this.$axios.$get('export-user').then((response) => {
        FileDownload(response, 'users.csv')
      })
    },
  },
  async created() {
    try {
      const data = await service.users(this.$axios)
      this.customer_list = data
    } catch (err) {
      console.log(err)
    }
  },
}
</script>

<style></style>

