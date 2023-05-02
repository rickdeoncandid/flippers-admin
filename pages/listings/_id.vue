<template>
  <v-container class="admin-list">
    <h1 class="my-6">
      <v-icon size="50" color="black" class="mr-4">mdi-plus</v-icon>Update
      Listing
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
            <img
              v-if="
                already_uploaded_featured_image &&
                update_featured_image === false
              "
              :src="already_uploaded_featured_image"
              class="uploading-image"
            />
            <img
              v-if="new_feature_image"
              :src="new_feature_image"
              class="uploading-image"
            />
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
      <v-text-field
        v-model="yt_link"
        label="Youtube video url"
        outlined
        @change="update_yt_link"
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
      <!-- <v-btn
        v-if="isPublished"
        @click="move_to_draft_listing"
        color="primary"
        class="mr-3"
        outlined
        large
        >Draft</v-btn
      > -->
      <v-btn
        v-if="!isLoading"
        @click="update_listing"
        color="primary"
        class="mr-3"
        large
        >Update</v-btn
      >
      <v-btn
        v-if="isLoading"
        disabled
        @click="update_listing"
        color="primary"
        class="mr-3"
        large
        >Saving</v-btn
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
      user: { social: {} },
      yt_link: '',
      isPublished: '',
      update_screenshots: true,
      screenshotsPayloadData: [],
      image: '',
      name: '',
      url: '',
      content: '',
      note: '',
      industry: '',
      domain_authority: '',
      articles: '',
      previewImage: null,
      isLoading: false,
      saved_screenshot: [],
      new_feature_image_name: '',
      new_feature_image: '',
      update_featured_image: false,
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
      const last_months = this.month_name.slice(0, months_duration)
      Object.keys(this.stats).forEach((item) => {
        last_months.forEach((month) => {
          if (item === month) {
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
    update_yt_link(e) {
      const urlRegex = /(https:\/\/www.youtube.com\/embed?[^ ]*)/
      const matches = e.match(urlRegex)

      if (matches) {
        this.yt_link = matches[1].slice(0, matches[1].length - 1)
      } else {
        this.yt_link = e
      }
    },
    uploadImage(e) {
      const image = e.target.files[0]
      if (image) {
        this.image = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = (e) => {
          this.new_feature_image = e.target.result
          this.new_feature_image_name = image.name
          this.update_featured_image = true
          // console.log(this.previewImage)
        }
      }
    },
    uploadSS(e, index) {
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
    onFilePicked() {
      this.files = this.currFiles
      this.prepareUploadSS(this.files)
    },

    prepareUploadSS(files) {
      const ssPayload = []
      this.update_screenshots = true
      for (const file of files) {
        if (file) {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (e) => {
            const img_size_in_mb = file.size / 1024 / 1024
            const filename = file.name
            if (img_size_in_mb > 3) {
              this.$toast.error(
                `File: ${filename}, size should not be greater than 3 MB`,
                {
                  position: 'top',
                }
              )
              this.files = []
              this.currFiles = []
              return
            } else if (img_size_in_mb < 0.05) {
              this.$toast.error(
                `File: ${filename}, size should not be less than 0.05 MB (50 KB)`,
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
    async move_to_draft_listing() {
      const tosend = { listing_id: this.$route.params.id }
      await service.move_to_draft_listing(this.$axios, tosend)
      this.$router.push('/listings')
    },

    async update_listing() {
      const payload = {
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
        screenshots: [],
        listing_id: this.$route.params.id,
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
          articles: Joi.number().min(0).max(10000).required().messages({
            'number.base': 'Articles is not a valid number',
            'number.min': 'Articles must be at least 0',
            'number.max': 'Articles must be at most 10000',
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
          industry: Joi.string().min(2).max(20).required().messages({
            'string.empty': 'Niche field is required',
            'string.min': 'Niche must be at least 2 characters',
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

        const validate = schema.validate(payload, {
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
      if (this.update_featured_image) {
        payload.featured_img = this.new_feature_image
        payload.featured_image_filename = this.new_feature_image_name
        payload.update_featured_image = true
      }

      if (this.update_screenshots) {
        payload.update_screenshots = true

        if (this.screenshotsPayloadData.length > 0) {
          payload.screenshots = this.screenshotsPayloadData
        } else {
          payload.screenshots = []
        }
      }
      this.isLoading = true
      await service.update_listing(this.$axios, payload)
      this.isLoading = false
      this.$toast.success('Listing Updated!', {
        // override the global option
        position: 'top',
      })

      this.$router.push('/listings')
    },
  },
  computed: {
    month_name() {
      const months = []
      Object.keys(this.stats).forEach((item) => {
        months.push(item)
      })

      return months.reverse()
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
      const data = await service.get_listing(this.$axios, this.$route.params.id)

      this.yt_link = data.yt_link
      this.image = data.featured_img
      this.isPublished = data.isPublished
      this.name = data.name
      this.url = data.url
      this.content = data.content
      this.note = data.note
      this.industry = data.industry
      this.listing_id = data._id
      this.articles = data.articles
      this.monetization = data.monetization
      this.user = data.user
      if (data.featured_img) {
        this.already_uploaded_featured_image = data.featured_img.thumbnailUrl
      }

      if (typeof data.domain_authority === 'number') {
        this.domain_authority = data.domain_authority
      }

      if (typeof data.articles === 'number') {
        this.articles = data.articles
      }

      this.saved_screenshot = data.screenshots
      this.stats = data.stats
      this.site_years = data.siteAge.year
      this.site_month = data.siteAge.month

      this.isLoading = false
    } catch (err) {
      console.log(err)
    }
  },
  beforeDestroy() {
    this.drafttimer = false
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
