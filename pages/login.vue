<template>
  <v-container class="py-12">
    <v-card
      class="mx-auto px-4 py-4"
      width="600"
      elevation="4"
      :loading="isloader"
      :disabled="isloader"
    >
      <v-card-title class="mt-4">
        <h1>Login</h1>
      </v-card-title>
      <!-- If error occured -->
      <v-alert
        type="error"
        v-if="error_alert"
        border="left"
        close-text="Close Alert"
        color="error"
        dark
        dismissible
        >{{ error_alert }}</v-alert
      >

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-text>
          <v-text-field
            label="Email"
            :rules="emailRules"
            prepend-icon="mdi-account"
            v-model="logindata.email"
            required
          ></v-text-field>
          <v-text-field
            type="password"
            label="Password"
            :rules="passRules"
            prepend-icon="mdi-lock"
            append-icon="mdi-visibility-off"
            v-model="logindata.password"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="py-4">
          <v-btn
            :dark="valid"
            :disabled="!valid"
            class="px-6"
            color="primary"
            large
            @click="login"
            >Login
          </v-btn>
        </v-card-actions>
        <v-divider />
        <v-row>
          <v-col>
            <a href="/forgot">Forgot Password?</a>
          </v-col>
          <v-col class="text-right">
            <nuxt-link to="/register">Register New Account</nuxt-link>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  layout: 'logout',
  data() {
    return {
      valid: true,
      error_alert: false,
      isloader: false,
      logindata: { email: '', password: '' },
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passRules: [(v) => !!v || 'Password is required'],
    }
  },
  components: {},
  methods: {
    async login() {
      let validate = this.$refs.form.validate()
      if (validate) {
        this.error_alert = false
        this.isloader = true
        try {
          let response = await this.$auth.loginWith('local', {
            data: this.logindata,
          })
        } catch (err) {
          console.log(err.response)
          this.error_alert = err.response.data.msg
        }
        this.isloader = false
      }
    },
  },
  beforeCreate() {
    if (this.$auth.loggedIn) {
      this.$router.push('/')
    }
  },
}
</script>

<style></style>
