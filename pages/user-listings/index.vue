<template>
  <v-container>
    <h1 class="my-6">
      <v-icon size="50" color="black" class="mr-4">mdi-package-variant</v-icon
      >User Listings
    </h1>

    <v-row>
      <v-col cols="12" sm="3">
        <v-select
          v-model="type"
          :items="items"
          item-text="name"
          item-value="value"
          label="Select Type"
          outlined
        >
        </v-select>
      </v-col>
    </v-row>

    <v-card
      v-for="listing of listings"
      :key="listing._id"
      class="mt-6 px-3 elevation-0"
      outlined
    >
      <v-row>
        <v-col cols="12" sm="3">
          <img
            v-if="listing.featured_img"
            :src="listing.featured_img.thumbnailUrl"
            class="elevation-4 featured_img"
          />
          <img
            v-else
            src="https://flippers.club/img/public/no-image.jpg"
            class="elevation-4 featured_img"
          />
        </v-col>

        <v-col cols="12" sm="6">
          <h2>{{ listing.name }}</h2>

          <p v-if="listing.industry">
            <v-icon color="black">mdi-calendar</v-icon>
            {{ listing.added_on.substring(0, 10) }}
          </p>
          <p v-if="listing.industry">
            <v-icon color="black">mdi-bookmark-multiple</v-icon>
            {{ listing.industry }}
          </p>
          <p>
            <v-icon color="black">mdi-email</v-icon>
            {{ listing.user.first_name + ' ' + listing.user.last_name }} (
            {{ listing.user.email }} )
          </p>
          <p>
            <v-icon color="black">mdi-cash-multiple</v-icon>
            $ {{ parseInt(listing.average.twelve_months.earnings) }}
          </p>
          <p>
            <v-icon color="black">mdi-calendar-range</v-icon>
            {{ listing.siteAge.year }}.{{ listing.siteAge.month }} year
          </p>
        </v-col>
        <v-col cols="12" sm="3">
          <v-btn
            class="mt-3"
            color="primary"
            outlined
            block
            :to="'user-listings/' + listing._id"
            >Edit Listing</v-btn
          >
          <v-btn
            class="mt-3"
            color="error"
            outlined
            block
            @click="delete_listing(listing._id)"
          >
            Delete Listing
          </v-btn>
          <v-btn
            color="warning"
            class="mt-3"
            outlined
            block
            large
            @click="update_status_user_listing(listing._id, 2)"
            ><v-icon>mdi-close</v-icon> Disapprove</v-btn
          >
          <v-btn
            color="success"
            class="mt-3"
            outlined
            block
            large
            @click="update_status_user_listing(listing._id, 1)"
            ><v-icon>mdi-check</v-icon>Approve</v-btn
          >
          <v-chip
            label
            class="mt-4"
            style="display: block; width: fit-content;"
            :color="
              listing.isApproved != 2
                ? listing.isApproved
                  ? 'success'
                  : 'warning'
                : 'error'
            "
          >
            {{
              listing.isApproved != 2
                ? listing.isApproved
                  ? 'Approved'
                  : 'Under Moderation'
                : 'Rejected'
            }}</v-chip
          >
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import service from '@/service/service'

export default {
  data() {
    return {
      all_listings: [],
      items: [
        { name: 'Under Moderation', value: 1 },
        { name: 'Approved', value: 2 },
        { name: 'Rejected', value: 3 },
      ],
      type: '',
    }
  },
  computed: {
    listings() {
      let listings = this.all_listings

      if (this.type) {
        listings = listings.filter((o) => {
          return o.isApproved === this.type - 1
        })
      }

      return listings
    },
  },
  async created() {
    try {
      const data = await service.users_listing(this.$axios)
      this.all_listings = data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async delete_listing(id) {
      const tosend = { id }
      const data = await service.delete_user_listing(this.$axios, tosend)
      if (data.msg === 1) {
        const data = await service.users_listing(this.$axios)
        this.all_listings = data
        this.$toast.success('Deleted')
      }
    },
    async update_status_user_listing(listing, type) {
      try {
        const tosend = { id: listing, status: type }
        await service.update_status_user_listing(this.$axios, tosend)
        const data = await service.users_listing(this.$axios)
        this.all_listings = data

        this.$toast.success('Status Updated')
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
.featured_img {
  width: 100%;
  object-fit: cover;
  height: 200px;
  border-radius: 10px;
}
</style>
