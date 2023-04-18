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
              color="secondary"
              fab
              dark
              @click="$refs.inputUpload.click()"
            >
              <v-icon>mdi-upload</v-icon>
            </v-btn>
            <input
              v-show="false"
              ref="inputUpload"
              type="file"
              accept="image/*"
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
              label="Niche"
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
            <h3 class="mb-3">Youtube Link</h3>
            <v-text-field
              v-model="yt_link"
              label="Enter Youtube Video Link"
              outlined
            ></v-text-field>
          </v-card-text>
          <v-card-text>
            <h3 class="mb-3">Monetization</h3>
            <v-select
              v-model="monetization"
              outlined
              label="Monetization method"
              :items="['Adsense', 'Amazon', 'Affiliate', 'Other']"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-card outlined>
      <v-card-title
        >Please Upload Your Revenue and Earnings Screenshots</v-card-title
      >
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
      <v-btn
        v-if="!isLoading"
        @click="draft"
        color="primary"
        class="mr-3"
        outlined
        large
        >Draft</v-btn
      >
      <v-btn
        v-if="isLoading"
        @click="draft"
        color="primary"
        class="mr-3"
        outlined
        large
        disabled
        >Saving...</v-btn
      >
    </div>
  </v-container>
</template>

<script>
import Joi from 'joi'
import service from '@/service/service'

export default {
  data() {
    return {
      yt_link: '',
      image: '',
      name: '',
      url: '',
      isLoading: false,
      content: '',
      note: '',
      industry: '',
      domain_authority: '',
      featured_img_base64: '',
      featured_img_filename: '',
      articles: '',
      previewImage: null,
      screenshots: [{ image: '', previewImage: null }],
      screenshotsPayloadData: [],
      months: {},
      stats: [],
      years: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      month_age: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      site_years: '',
      site_month: '',
      monetizaion_methods: [],
      monetization: '',
      currFiles: [],
      files: [],
    }
  },
  computed: {
    month_name() {
      const months = [
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
      const current_month = new Date().getMonth()
      const last_year = months.splice(current_month)
      const this_year = months
      const previous_year = new Date().getFullYear() - 1
      const present_year = new Date().getFullYear()
      const final = []
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
  methods: {
    find_average(months_duration) {
      let average_earning = 0
      let average_traffic = 0
      const last_months = this.month_name.slice(0, months_duration)

      Object.keys(this.stats).forEach((item) => {
        last_months.forEach((month) => {
          if (item === month) {
            average_earning += parseInt(this.stats[item].earnings)
            average_traffic += parseInt(this.stats[item].traffic)
          }
        })
      })

      let avg_earning = average_earning / months_duration

      if (typeof avg_earning === 'number' && !isNaN(avg_earning)) {
        avg_earning = avg_earning.toFixed(2)
      } else {
        avg_earning = 0
      }

      let avg_traffic = average_traffic / months_duration

      if (typeof avg_traffic === 'number' && !isNaN(avg_traffic)) {
        avg_traffic = avg_traffic.toFixed(2)
      } else {
        avg_traffic = 0
      }
      return {
        earnings: avg_earning,
        traffic: avg_traffic,
      }
    },
    onFilePicked() {
      this.files = this.currFiles

      if (this.files.length) {
        if (this.files.length > 5) {
          this.$toast.error('You can upload maximum 5 screenshots', {
            position: 'top',
          })
        } else {
          this.uploadSS(this.files)
        }
      } else {
        this.$toast.error('Please select at least one screenshot', {
          position: 'top',
        })
      }
    },
    uploadImage(e) {
      const image = e.target.files[0]
      if (image) {
        this.image = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = (e) => {
          const img_size_in_mb = image.size / 1024 / 1024

          if (img_size_in_mb > 2) {
            this.$toast.error('File size should not be greater than 2 MB', {
              position: 'top',
            })
            return
          } else if (img_size_in_mb < 0.1) {
            this.$toast.error(
              'File size should not be less than 0.1 MB (100 KB)',
              {
                position: 'top',
              }
            )
            return
          }
          this.previewImage = e.target.result
          this.featured_img_base64 = e.target.result
          this.featured_img_filename = image.name
          // console.log(this.previewImage)
        }
      }
    },
    uploadSS(files) {
      const ssPayload = []
      for (const file of files) {
        if (file) {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (e) => {
            const img_size_in_mb = file.size / 1024 / 1024
            const filename = file.name
            if (img_size_in_mb > 2) {
              this.$toast.error(
                `File: ${filename}, size should not be greater than 2 MB`,
                {
                  position: 'top',
                }
              )
              this.files = []
              this.currFiles = []
              return
            } else if (img_size_in_mb < 0.1) {
              this.$toast.error(
                `File: ${filename}, size should not be less than 0.1 MB (100 KB)`,
                {
                  position: 'top',
                }
              )
              this.files = []
              this.currFiles = []
              return
            }
            ssPayload.push({
              image_base64: e.target.result,
              filename: file.name,
            })
          }
        }
      }
      this.screenshotsPayloadData = ssPayload
    },

    async draft() {
      const payloadJSON = {
        name: this.name,
        content: this.content,
        domain_authority: this.domain_authority,
        articles: this.articles,
        stats: JSON.stringify(this.stats),
        three_months: JSON.stringify(this.three_months),
        six_months: JSON.stringify(this.six_months),
        twelve_months: JSON.stringify(this.twelve_months),
        url: this.url,
        site_years: this.site_years,
        site_month: this.site_month,
        industry: this.industry,
        note: this.note,
        yt_link: this.yt_link,
        monetization: this.monetization,
      }

      try {
        const schema = Joi.object({
          name: Joi.string().min(10).max(50).required().messages({
            'string.empty': 'Title field is required',
            'string.min': 'Title must be at least 10 characters',
            'string.max': 'Title must be at most 50 characters',
          }),
          content: Joi.string().min(100).max(5000).required().messages({
            'string.empty': 'Summary field is required',
            'string.min': 'Summary must be at least 100 characters',
            'string.max': 'Summary must be at most 5000 characters',
          }),
          domain_authority: Joi.number().min(0).max(100).required().messages({
            'number.base': 'Domain Authority is not a valid number',
            'number.min': 'Domain Authority must be at least 0',
            'number.max': 'Domain Authority must be at most 100',
          }),
          articles: Joi.number().min(0).max(100).required().messages({
            'number.base': 'Articles is not a valid number',
            'number.min': 'Articles must be at least 0',
            'number.max': 'Articles must be at most 100',
          }),
          url: Joi.string().uri().required().messages({
            'string.empty': 'Product URL field is required',
            'string.uri': 'Product URL is not a valid URL',
          }),
          site_years: Joi.number().min(0).max(100).required().messages({
            'number.base': 'Site Years is not a valid number',
            'number.min': 'Site Years must be at least 0',
            'number.max': 'Site Years must be at most 100',
          }),
          site_month: Joi.number().min(0).max(12).required().messages({
            'number.base': 'Site Months is not a valid number',
            'number.min': 'Site Months must be at least 0',
            'number.max': 'Site Months must be at most 12',
          }),
          industry: Joi.string().min(5).max(20).required().messages({
            'string.empty': 'Niche field is required',
            'string.min': 'Niche must be at least 5 characters',
            'string.max': 'Niche must be at most 20 characters',
          }),
          note: Joi.string().required().min(10).max(5000).messages({
            'string.empty': "Seller's Note field is required",
            'string.min': "Seller's Note must be at least 10 characters",
            'string.max': "Seller's Note must be at most 5000 characters",
          }),
          yt_link: Joi.string().uri().messages({
            'string.empty': 'YouTube Link field is required',
            'string.uri': 'YouTube Link is not a valid URL',
            'string.regex.base':
              'YouTube Link is not a valid YouTube Embed URL',
          }),
          monetization: Joi.string().min(3).required().messages({
            'string.empty': 'Monetization field is required',
            'string.min': 'Monetization field is required',
          }),
        })

        const validate = schema.validate(payloadJSON, {
          abortEarly: true,
          allowUnknown: true,
        })

        const { error } = validate

        if (error) {
          const errMessage = error.details[0].message
          if (errMessage) {
            this.$toast.error(errMessage, {
              position: 'top',
            })
          }
          return
        }

        // payloadSchema.validateSync(payloadJSON, { abortEarly: false })
      } catch (e) {
        console.log({ e })
        this.$toast.error('Validation failed contact admin', {
          position: 'top',
        })
        return
      }

      const statKeys = Object.keys(this.stats)

      for (const key of statKeys) {
        const val = this.stats[key]

        const { earnings, traffic } = val

        if (earnings === '' || traffic === '') {
          this.$toast.error(
            `Please fill all earning and traffic fields, Value for ${key} is missing`,
            {
              position: 'top',
            }
          )
          return
        }
      }

      if (this.featured_img_base64 && this.featured_img_filename) {
        payloadJSON.featured_image = this.featured_img_base64
        payloadJSON.featured_image_filename = this.featured_img_filename
      } else {
        this.$toast.error('Please upload featured image', {
          position: 'top',
        })
        return
      }

      if (this.screenshotsPayloadData.length > 0) {
        payloadJSON.screenshots = this.screenshotsPayloadData
      } else {
        this.$toast.error('Please upload screenshots', {
          position: 'top',
        })
        return
      }

      this.isLoading = true

      await service.draft_listing(this.$axios, payloadJSON)

      this.isLoading = false

      this.$toast.success('Listing Drafted', {
        position: 'top',
      })

      this.$router.push('/listings')
    },
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
