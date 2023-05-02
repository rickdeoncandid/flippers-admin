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
                :src="listing.featured_img.thumbnailUrl"
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
                :to="'/listings/' + listing._id"
                >Edit Listing</v-btn
              >
              <v-btn
                class="mt-3"
                color="error"
                outlined
                block
                @click="delete_product(listing._id)"
              >
                Delete
              </v-btn>
              <v-btn
                v-if="listing.isPublished"
                color="warning"
                class="mt-3"
                outlined
                block
                large
                @click="toggle_admin_listing_publish_status(listing._id)"
                ><v-icon>mdi-close</v-icon>Unpublish</v-btn
              >
              <v-btn
                v-if="!listing.isPublished"
                color="success"
                class="mt-3"
                outlined
                block
                large
                @click="toggle_admin_listing_publish_status(listing._id)"
                ><v-icon>mdi-check</v-icon>Publish</v-btn
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
                :src="listing.featured_img.thumbnailUrl"
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
                :to="'/listings/' + listing._id"
                >Edit Listing</v-btn
              >
              <v-btn
                class="mt-3"
                color="error"
                outlined
                block
                @click="delete_product(listing._id)"
              >
                Delete
              </v-btn>
              <v-btn
                v-if="listing.isPublished"
                color="warning"
                class="mt-3"
                outlined
                block
                large
                @click="toggle_admin_listing_publish_status(listing._id)"
                ><v-icon>mdi-close</v-icon>Unpublish</v-btn
              >
              <v-btn
                v-if="!listing.isPublished"
                color="success"
                class="mt-3"
                outlined
                block
                large
                @click="toggle_admin_listing_publish_status(listing._id)"
                ><v-icon>mdi-check</v-icon>Publish</v-btn
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
      const tosend = { id }
      const data = await service.delete_listing(this.$axios, tosend)
      if (data.msg === 1) {
        this.$router.go()
      }
    },
    async toggle_admin_listing_publish_status(listing, type) {
      try {
        const tosend = { id: listing }
        await service.toggle_admin_listing_publish_status(this.$axios, tosend)

        // reload
        this.$router.go()

        this.$toast.success('Updated', {
          position: 'top-right',
          duration: 2000,
        })
      } catch (err) {
        console.log(err)
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
