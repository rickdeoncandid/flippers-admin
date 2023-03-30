<template>
  <v-container class="admin-list">
    <v-card class="pa-4" outlined>
      <h3>
        Submitted By: {{ user.first_name + ' ' + user.last_name }} (
        {{ user.email }} )
      </h3>
      <br />
      <p>
        Skype: {{ user.social.skype }}<br />
        Facebook: {{ user.social.facebook }}<br />
        LinkedIn: {{ user.social.linkedin }}
      </p>
    </v-card>

    <v-row>
      <v-col cols="8">
        <v-card class="elevation-0" outlined>
          <v-card-title>Title</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="name"
              label="Listing Name"
              placeholder="Example - Tech Blog Making 400$ per month"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              class="mt-4"
              v-model="url"
              label="Listing URL"
              placeholder="Example - Website.com"
              outlined
              dense
            ></v-text-field>
          </v-card-text>
        </v-card>
        <v-card class="elevation-0 mt-6" outlined>
          <v-card-title>Summary</v-card-title>
          <vue-editor v-model="content"></vue-editor>
        </v-card>
        <v-card class="elevation-0 mt-6" outlined>
          <v-card-title>Seller's Note</v-card-title>
          <vue-editor v-model="note"></vue-editor>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card class="elevation-0" outlined>
          <v-card-title>Featured Image</v-card-title>
          <v-card-text class="text-center">
            <img
              v-if="previewImage"
              :src="previewImage"
              class="uploading-image"
            />
            <img
              v-if="!previewImage"
              :src="'https://flippers.club/img' + image"
              class="uploading-image"
            />
            <v-btn
              v-if="!previewImage"
              @click="$refs.inputUpload.click()"
              color="secondary"
              fab
              dark
            >
              <v-icon>mdi-upload</v-icon>
            </v-btn>
            <input
              v-show="false"
              ref="inputUpload"
              type="file"
              accept="image/jpeg"
              @change="uploadImage"
            />
            <v-btn
              v-if="previewImage"
              color="error"
              fab
              dark
              @click="previewImage = null"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
        <v-card class="elevation-0 mt-6" outlined>
          <v-card-text>
            <v-text-field
              v-model="domain_authority"
              label="Domain Authority"
              outlined
            ></v-text-field>
          </v-card-text>
          <v-card-text>
            <v-text-field
              v-model="articles"
              label=" Articles Posted"
              outlined
            ></v-text-field>
          </v-card-text>
          <v-card-text>
            <v-text-field
              v-model="industry"
              label="Industry"
              outlined
            ></v-text-field>
          </v-card-text>

          <v-card-text>
            <h3 class="mb-3">Site Age</h3>
            <v-row>
              <v-col class="py-0">
                <v-select
                  v-model="site_years"
                  :items="years"
                  label="Year"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col class="py-0">
                <v-select
                  v-model="site_month"
                  :items="month_age"
                  label="Month"
                  outlined
                  dense
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-text-field
              v-model="yt_link"
              label="Youtube video url"
              outlined
            ></v-text-field>
          </v-card-text>
          <v-card-text>
            <h3 class="mb-3">Monetization</h3>
            <v-select
              outlined
              label="Monetization method"
              :items="monetizaion_methods"
              v-model="monetization"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-card outlined class="pa-3 mb-3">
      <v-card-title>Uploaded Screenshot</v-card-title>
      <v-row align="end">
        <v-col v-for="image in saved_screenshot" :key="image" cols="4" sm="2">
          <a :href="'https://flippers.club/img' + image" target="blank"
            ><img
              :src="'https://flippers.club/img' + image"
              class="uploading-image"
          /></a>
        </v-col>
      </v-row>
      <div class="subtitle">
        ** New screenshot uploads will replace old ones.
      </div>

      <v-file-input
        class="mt-3"
        v-model="currFiles"
        placeholder="Upload your screenshots"
        label="File input"
        multiple
        accept="image/*"
        outlined
        @change="onFilePicked"
        prepend-icon="mdi-paperclip"
      >
        <template v-slot:selection="{ text }">
          <v-chip small label color="primary">
            {{ text }}
          </v-chip>
        </template>
      </v-file-input>
    </v-card>

    <!-- <v-card outlined>
      <v-card-title>Upload Screenshot</v-card-title>
      <v-row align="end">
        <v-col
          cols="2"
          v-for="(screenshot, index) in screenshots"
          :key="index"
          class="text-center"
        >
          <img :src="screenshot.previewImage" class="uploading-image" />

          <v-btn
            v-if="!screenshot.previewImage"
            @click="$refs.imageUpload[index].click()"
            color="secondary"
            fab
            dark
          >
            <v-icon>mdi-upload</v-icon>
          </v-btn>
          <input
            v-show="false"
            ref="imageUpload"
            type="file"
            accept="image/jpeg"
            @change="uploadSS($event, index)"
          />
          <v-btn
            v-if="screenshot.previewImage"
            color="error"
            fab
            dark
            @click="screenshots.splice(index, 1)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card> -->

    <v-card outlined class="mt-3">
      <v-card-text>
        <v-text-field
          v-model="yt_link"
          label="Youtube video url"
          outlined
          :disabled="isPublished"
        ></v-text-field>
      </v-card-text>
    </v-card>

    <v-row>
      <v-col>
        <v-card outlined>
          <v-card-title>Last 12 Months Traffic</v-card-title>
          <v-card-text>
            <v-text-field
              v-for="month in month_name"
              :key="month"
              v-model="stats[month].traffic"
              :label="month"
              dense
              outlined
              type="number"
              class="mb-3"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card outlined>
          <v-card-title>Last 12 Months Earning</v-card-title>
          <v-card-text>
            <v-text-field
              v-for="month in month_name"
              :key="month"
              v-model="stats[month].earnings"
              :label="month"
              dense
              outlined
              type="number"
              class="mb-3"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card outlined>
          <v-card-title>Average Earnings</v-card-title>
          <v-card-text>
            <v-text-field
              label="Last 3 Months"
              outlined
              v-model="three_months.earnings"
              readonly
              dense
              class="mb-3"
            ></v-text-field>
            <v-text-field
              label="Last 6 Months"
              outlined
              v-model="six_months.earnings"
              readonly
              dense
              class="mb-3"
            ></v-text-field>
            <v-text-field
              label="Last 12 Months"
              outlined
              v-model="twelve_months.earnings"
              readonly
              dense
              class="mb-3"
            ></v-text-field>
          </v-card-text>
          <!-- traffic -->
          <v-card-title>Average Traffic</v-card-title>
          <v-card-text>
            <v-text-field
              label="Last 3 Months"
              outlined
              v-model="three_months.traffic"
              dense
              readonly
              class="mb-3"
            ></v-text-field>
            <v-text-field
              label="Last 6 Months"
              outlined
              v-model="six_months.traffic"
              readonly
              dense
              class="mb-3"
            ></v-text-field>
            <v-text-field
              label="Last 12 Months"
              outlined
              v-model="twelve_months.traffic"
              readonly
              dense
              class="mb-3"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center py-4 mb-3">
      <v-btn
        color="warning"
        class="mr-3"
        large
        @click="update_status_user_listing($route.params.id, 2)"
        ><v-icon>mdi-close</v-icon> Disapprove</v-btn
      >
      <v-btn
        color="success"
        large
        @click="update_status_user_listing($route.params.id, 1)"
        ><v-icon>mdi-check</v-icon>Approve</v-btn
      >
    </div>
    <div class="text-center mb-10">
      <v-btn @click="update_listing" color="primary" class="mr-3" large
        >Update Listing</v-btn
      >
      <v-btn v-if="!isPublished" @click="final" color="primary" large
        >Publish Listing</v-btn
      >
    </div>
  </v-container>
</template>

<script>
import service from '@/service/service'

export default {
  data() {
    return {
      user: { social: {} },
      yt_link: '',
      isPublished: '',
      image: '',
      name: '',
      url: '',
      content: '',
      note: '',
      industry: '',
      domain_authority: '',
      articles: '',
      previewImage: null,
      saved_screenshot: [],
      screenshots: [{ image: '', previewImage: null }],
      months: {},
      stats: [],
      years: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      month_age: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      site_years: '',
      site_month: '',
      monetizaion_methods: [
        'Adsense',
        'Amazon Affiliate',
        'Product Selling',
        'Other',
      ],
      monetization: '',
      currFiles: [],
      files: [],
    }
  },
  methods: {
    find_average(months_duration) {
      let average_earning = 0
      let average_traffic = 0
      let last_months = this.month_name.slice(0, months_duration)
      Object.keys(this.stats).forEach((item) => {
        last_months.forEach((month) => {
          if (item == month) {
            average_earning += parseInt(this.stats[item].earnings)
            average_traffic += parseInt(this.stats[item].traffic)
          }
        })
      })
      return {
        earnings: average_earning / months_duration,
        traffic: average_traffic / months_duration,
      }
    },
    async uploadImage(e) {
      const image = e.target.files[0]
      if (image) {
        this.image = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = (e) => {
          this.previewImage = e.target.result
          // console.log(this.previewImage)
        }
      }
    },
    async uploadSS(e, index) {
      const image = e.target.files[0]
      if (image) {
        this.screenshots[index].image = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = (e) => {
          this.screenshots[index].previewImage = e.target.result
          // console.log(this.previewImage)
          this.screenshots.push({ image: '', previewImage: null })
        }
      }
    },
    async onFilePicked() {
      this.files = this.currFiles
    },
    async final() {
      let formData = new FormData()
      formData.append('listing_id', this.$route.params.id)
      formData.append('featured_image', this.image)
      formData.append('name', this.name)
      formData.append('content', this.content)
      formData.append('domain_authority', this.domain_authority)
      formData.append('articles', this.articles)
      formData.append('stats', JSON.stringify(this.stats))
      formData.append('three_months', JSON.stringify(this.three_months))
      formData.append('six_months', JSON.stringify(this.six_months))
      formData.append('twelve_months', JSON.stringify(this.twelve_months))

      formData.append('url', this.url)
      formData.append('site_years', this.site_years)
      formData.append('site_month', this.site_month)
      formData.append('industry', this.industry)
      formData.append('note', this.note)
      formData.append('yt_link', this.yt_link)
      formData.append('monetization', this.monetization)

      Array.from(this.files).forEach((f) => {
        formData.append('image[]', f)
      })
      const data = await service.update_publish_listing(this.$axios, formData)
      this.$router.push('/listings')
    },
    async update_listing(id) {
      let formData = new FormData()
      formData.append('listing_id', this.$route.params.id)
      formData.append('featured_image', this.image)
      formData.append('name', this.name)
      formData.append('content', this.content)
      formData.append('domain_authority', this.domain_authority)
      formData.append('articles', this.articles)
      formData.append('stats', JSON.stringify(this.stats))
      formData.append('three_months', JSON.stringify(this.three_months))
      formData.append('six_months', JSON.stringify(this.six_months))
      formData.append('twelve_months', JSON.stringify(this.twelve_months))

      formData.append('url', this.url)
      formData.append('site_years', this.site_years)
      formData.append('site_month', this.site_month)
      formData.append('industry', this.industry)
      formData.append('note', this.note)
      formData.append('yt_link', this.yt_link)
      formData.append('monetization', this.monetization)

      Array.from(this.files).forEach((f) => {
        formData.append('image[]', f)
      })
      const data = await service.update_user_listing(this.$axios, formData)
    },
    async update_status_user_listing(listing, type) {
      try {
        console.log(listing)
        let tosend = { id: listing, status: type }
        const data = await service.update_status_user_listing(
          this.$axios,
          tosend
        )
        this.$router.push('/user-listings')
      } catch (err) {
        console.log(err)
      }
    },
  },
  computed: {
    month_name() {
      let months = []
      Object.keys(this.stats).forEach((item) => {
        months.push(item)
      })

      return months
    },
    three_months() {
      return this.find_average(3)
    },
    six_months() {
      return this.find_average(6)
    },
    twelve_months() {
      return this.find_average(12)
    },
  },
  async created() {
    try {
      const data = await service.edit_user_listing(
        this.$axios,
        this.$route.params.id
      )
      ;(this.user = data.user),
        (this.yt_link = data.yt_link),
        (this.image = data.featured_img),
        (this.isPublished = data.isPublished),
        (this.name = data.name),
        (this.url = data.url),
        (this.content = data.content),
        (this.note = data.note),
        (this.industry = data.industry),
        (this.domain_authority = data.domain_authority),
        (this.articles = data.articles),
        (this.saved_screenshot = data.screenshots),
        (this.stats = data.stats),
        (this.site_years = data.siteAge.year),
        (this.site_month = data.siteAge.month)
    } catch (err) {
      console.log(err)
    }
  },
}
</script>
<style>
.uploading-image {
  width: 100%;
}
.admin-list .v-text-field.v-text-field--enclosed .v-text-field__details {
  display: none;
}
</style>
