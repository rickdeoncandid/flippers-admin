<template>
  <v-container>
    <v-card elevation="0" class="pa-4">
      <div class="mb-2">
        <b>Name : </b>
        {{ user_data.first_name }} {{ user_data.last_name }}
      </div>
      <div class="mb-2">
        <b>Email : </b>
        {{ user_data.email }}
      </div>
      <div class="mb-2" v-if="user_data.social.facebook">
        <b>Facebook : </b>
        {{ user_data.social.facebook }}
      </div>
      <div class="mb-2" v-if="user_data.social.linkedin">
        <b>LinkedIn : </b>
        {{ user_data.social.linkedin }}
      </div>
      <div class="mb-2" v-if="user_data.social.skype">
        <b>Skype : </b>
        {{ user_data.social.skype }}
      </div>
      <hr class="my-6" />
      <b>Verified : </b> {{ user_data.verified ? 'Verified' : 'Not Verified' }}
      <br />
      <b>Manual Document Verified : </b>
      {{ user_data.isManuall ? 'Verified' : 'Not Verified' }}
      <hr class="my-6" />
      <div class="mb-2">
        <b>Address : </b>
        <br />
        <u>House</u> : {{ user_data.address.house }}
        <br />
        <u>Street</u> : {{ user_data.address.street }}
        <br />
        <u> State</u> : {{ user_data.address.state }}
        <br />
        <u>Pin Code</u> : {{ user_data.address.pin }}
        <br />
        <u>Country</u> : {{ user_data.address.country }}
        <br />
      </div>
    </v-card>
  </v-container>
</template>

<script>
import service from '@/service/service'

export default {
  data() {
    return {
      user_data: {
        social: {},
        address: {},
      },
    }
  },
  async created() {
    try {
      const data = await service.customer_details(
        this.$axios,
        this.$route.params.id
      )
      this.user_data = data
    } catch (err) {
      console.log(err)
    }
  },
}
</script>

<style></style>
