<template>
  <v-container>
    <h1 class="my-6">
      <v-icon size="50" color="black" class="mr-4">mdi-check-all</v-icon>List Of Users
    </h1>
    <v-row>
      <v-col cols="12">
        <v-data-table
          disable-sort
          :headers="headers"
          :items="customer_list"
          :items-per-page="10"
          class="elevation-0"
        >
          <template v-slot:item.name="{ item }">
            {{ (item.name) }}
          </template>
          <template v-slot:item.join_date="{ item }">{{ get_date(item.join_date) }}</template>
          <template v-slot:item.type="{ item }">{{ item.type ? "Rides" : "Eats" }}</template>
          <template v-slot:item.verified="{ item }">{{item.verified ? 'Verified' : 'Not Verified'}}</template>
          <template v-slot:item.orders="{ item }">{{item.orders}}</template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
  </v-container>
</template>

<script>
import service from '@/service/service'

export default {
  data(){
    return{
      customer_list:[],
      headers: [
          { text: 'Name', value: 'name' },
          { text: 'Email', value: 'email' },
          { text: 'Joined On', value: 'join_date' },
          { text: 'Verified', value: 'verified' },
        ],
    }
  },
  methods: {
    get_date(my_date){
      var d = new Date(my_date)
      var year = d.getFullYear().toString()
      var month = (d.getMonth() + 1).toString()
      var date = d.getDate().toString()
    
      return(
          (date[1]?date:"0"+date[0]) + '/' + (month[1]?month:"0"+month[0])  + '/' + year 
          )
    }
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
