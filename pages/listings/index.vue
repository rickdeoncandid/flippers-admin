<template>
  <v-container>
    <h1 class="my-6">
      <v-icon size="50" color="black" class="mr-4"
        >mdi-package-variant-closed</v-icon
      >All Listings
    </h1>

    <v-btn color="primary" to="/listings/add-new">Add New</v-btn>
    <v-tabs class="mt-6">
      <v-tab>Published</v-tab>
      <v-tab-item>
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
                :src="'https://flippers.club/imgs' + listing.featured_img"
                class="elevation-4 featured_img"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <h2>{{ listing.name }}</h2>

              <p v-if="listing.industry">
                <v-icon color="black">mdi-calendar</v-icon>
                {{ listing.industry }}
              </p>
            </v-col>
            <v-col cols="12" sm="3">
              <v-btn
                class="mt-3"
                color="primary"
                outlined
                block
                :to="'listings/' + listing._id"
                >Edit Listing</v-btn
              >
              <v-btn
                class="mt-3"
                color="error"
                outlined
                block
                @click="delete_product(listing._id)"
                >Delete</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
      <v-tab>Draft</v-tab>
      <v-tab-item>
        <v-card
          v-for="listing of draft"
          :key="listing._id"
          class="mt-6 px-3 elevation-0"
          outlined
        >
          <v-row>
            <v-col cols="12" sm="3">
              <img
                v-if="listing.featured_img"
                :src="'https://flippers.club/' + listing.featured_img"
                class="elevation-4"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <h2>{{ listing.name }}</h2>

              <p v-if="listing.industry">
                <v-icon color="black">mdi-calendar</v-icon>
                {{ listing.industry }}
              </p>
            </v-col>
            <v-col cols="12" sm="3">
              <v-btn
                class="mt-3"
                color="primary"
                outlined
                block
                :to="'listings/' + listing._id"
                >Edit Listing</v-btn
              >
              <v-btn
                class="mt-3"
                color="error"
                outlined
                block
                @click="delete_product(listing._id)"
                >Delete</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import service from '@/service/service'

export default {
  data() {
    return {
      listings: [],
      draft: [],
    }
  },
  methods: {
    async delete_product(id) {
      let tosend = { id: id }
      const data = await service.delete_listing(this.$axios, tosend)
      if (data.msg == 1) {
        const data = await service.all_listing(this.$axios)
        this.listings = data.published
        this.draft = data.draft
      }
    },
  },
  async created() {
    try {
      const data = await service.all_listing(this.$axios)
      this.listings = data.published
      this.draft = data.draft
    } catch (err) {
      console.log(err)
    }
  },
}
</script>

<style lang="scss">
img {
  width: 100%;
}
.featured_img {
  width: 100%;
  object-fit: cover;
  height: 200px;
  border-radius: 10px;
}
.theme--light.v-tabs-items {
  background-color: transparent !important;
}
</style>
