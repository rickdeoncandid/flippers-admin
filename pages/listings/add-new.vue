<template>
  <v-container class="admin-list">
    <h1 class="my-6">
      <v-icon size="50" color="black" class="mr-4">mdi-plus</v-icon>New Listing
    </h1>
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
            <img :src="previewImage" class="uploading-image" />
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
          <a :href="'http://localhost:8000' + image" target="blank"
            ><img
              :src="'http://localhost:8000' + image"
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
      <v-text-field
        v-model="yt_link"
        label="Youtube video url"
        outlined
      ></v-text-field>
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
    <div class="text-center py-4 mb-10">
      <v-btn @click="draft" color="primary" class="mr-3" outlined large
        >Draft</v-btn
      >
      <v-btn @click="final" color="primary" large>Add Listing</v-btn>
    </div>
  </v-container>
</template>

<script>
import service from '@/service/service'

export default {
  data() {
    return {
      yt_link: '',
      image: '',
      name: '',
      url: '',
      content: '',
      note: '',
      industry: '',
      domain_authority: '',
      articles: '',
      previewImage: null,
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
      drafttimer: true,
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
    async draft() {
      let formData = new FormData()
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
      const data = await service.draft_listing(this.$axios, formData)
      this.drafttimer = false
      this.$router.push('/listings/' + data.id)
    },
    async final() {
      let formData = new FormData()
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
      // formData.append(
      //   'screenshots',
      //   this.screenshots.map((o) => o.image)
      // )

      Array.from(this.files).forEach((f) => {
        formData.append('image[]', f)
      })
      const data = await service.add_listing(this.$axios, formData)
    },
  },
  computed: {
    month_name() {
      let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      let current_month = new Date().getMonth()
      let last_year = months.splice(current_month)
      let this_year = months
      let previous_year = new Date().getFullYear() - 1
      let present_year = new Date().getFullYear()
      let final = []
      last_year.forEach((item) => {
        final.push(item + ' ' + previous_year)
      })
      this_year.forEach((item) => {
        final.push(item + ' ' + present_year)
      })

      const res = final.reduce(
        (a, b) => ((a[b] = { earnings: '', traffic: '' }), a),
        {}
      )

      this.stats = res
      final.reverse()
      return final
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
  created() {
    var myDraftTimer = setInterval(() => {
      if (
        this.name ||
        this.url ||
        this.content ||
        this.domain_authority ||
        this.image
      ) {
        if (this.drafttimer) {
          this.draft()
        }
      }
    }, 5000)
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
