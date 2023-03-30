<template>
  <v-container>
    <h1 class="my-4">Dashboard</h1>
    <v-row>
      <v-col cols="12" sm="6">
        <v-row>
          <v-col cols="6" sm="6">
            <v-card class="elevation-0" outlined>
              <v-card-title>
                <h5 class="pa-0 ma-0">Total users</h5>
                <v-row align="center">
                  <v-col cols="4" class="py-0">
                    <v-icon color="warning" size="50"
                      >mdi-account-supervisor</v-icon
                    >
                  </v-col>
                  <v-col cols="8" class="text-right py-0">
                    <h1>{{ dashboard.total_users }}</h1>
                  </v-col>
                </v-row>
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="6" sm="6">
            <v-card class="elevation-0" outlined>
              <v-card-title>
                <h5 class="pa-0 ma-0">Total Lisitngs</h5>
                <v-row align="center">
                  <v-col cols="4" class="py-0">
                    <v-icon color="indigo" size="50">mdi-web</v-icon>
                  </v-col>
                  <v-col cols="8" class="text-right py-0">
                    <h1>{{ dashboard.total_listings }}</h1>
                  </v-col>
                </v-row>
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card class="elevation-0" outlined>
              <h4 class="ml-3 mt-3">Featured Lisitngs</h4>
              <v-row class="px-4">
                <v-col>
                  <v-select
                    :items="dashboard.all_listing"
                    item-text="url"
                    item-value="_id"
                    outlined
                    dense
                    v-model="feat_listing"
                    label="Select Listing"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-btn block color="success" @click="add_featured_listings"
                    >Add to Featured</v-btn
                  >
                </v-col>
              </v-row>

              <v-virtual-scroll
                :items="dashboard.featured_listing"
                height="200"
                item-height="64"
              >
                <template v-slot="{ item }">
                  <v-list-item :key="item._id">
                    <v-list-item-content>
                      <v-list-item-title>
                        <strong>{{ item.url }}</strong>
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-btn text @click="remove_featured_listings(item)">
                      <v-icon color="error">mdi-delete</v-icon>
                    </v-btn>
                    <v-list-item-action>
                      <v-btn
                        text
                        :href="`https://flippers.club/buy/${item._id}`"
                        ><v-icon> small mdi-open-in-new </v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>

                  <v-divider></v-divider>
                </template>
              </v-virtual-scroll>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card outlined class="pa-4">
          <h4>Monetization Methods</h4>
          <v-virtual-scroll
            bench="10"
            :items="dashboard.monetization"
            height="200"
            outlined
            item-height="64"
          >
            <template v-slot="{ item }">
              <v-list-item :key="item">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item }}
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn text @click="remove_methods(item)">
                    <v-icon color="error">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>
            </template>
          </v-virtual-scroll>
          <v-row>
            <v-col cols="9" sm="10">
              <v-text-field
                label="Add New Method"
                dense
                outlined
                v-model="new_method"
              ></v-text-field>
            </v-col>
            <v-col cols="3" sm="2">
              <v-btn color="success" @click="add_monetize_methods"
                ><v-icon>mdi-plus</v-icon></v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import service from '@/service/service'

export default {
  data() {
    return {
      dashboard: '',
      new_method: '',
      feat_listing: '',
    }
  },
  methods: {
    async add_monetize_methods() {
      try {
        const data = await service.add_monetize_methods(this.$axios, {
          method: this.new_method,
        })
        this.dashboard.monetization.push(this.new_method)
        this.new_method = ''
      } catch (err) {
        console.log(err)
      }
    },
    async remove_methods(method) {
      try {
        const data = await service.remove_monetize_methods(this.$axios, {
          method: method,
        })
        this.dashboard.monetization = this.dashboard.monetization.filter(
          (item) => item != method
        )
      } catch (err) {
        console.log(err)
      }
    },
    async add_featured_listings() {
      try {
        if (this.feat_listing) {
          let isAlready = false
          for (let j of this.dashboard.featured_listing) {
            if (this.feat_listing == j._id) {
              isAlready = true
            }
          }

          if (!isAlready) {
            const data = await service.add_featured_listings(this.$axios, {
              listing: this.feat_listing,
            })
            for (let i of this.dashboard.all_listing) {
              if (this.feat_listing == i._id) {
                this.dashboard.featured_listing.push(i)
              }
            }
            this.feat_listing = ''
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    async remove_featured_listings(flisting) {
      try {
        const data = await service.remove_featured_listings(this.$axios, {
          listing: flisting._id,
        })
        this.dashboard.featured_listing = this.dashboard.featured_listing.filter(
          (item) => item != flisting
        )
      } catch (err) {
        console.log(err)
      }
    },
  },
  async created() {
    try {
      const data = await service.dashboard(this.$axios)
      this.dashboard = data
    } catch (err) {
      console.log(err)
    }
  },
  beforeCreate() {
    if (!this.$auth.loggedIn) {
      this.$router.push('/login')
    }
  },
}
</script>
<style scoped>
.v-card__title {
  display: block;
}
</style>
