<template>
  <v-container class="mt-4">
    <v-row>
      <v-col cols="12" sm="4">
        <v-card elevation="0" outlined class="text-center py-4">
          <v-card-text>
            <v-avatar color="primary" size="48">
              <span class="white--text headline">{{ $auth.user.name[0] }}</span>
            </v-avatar>
          </v-card-text>

          <h2>{{ $auth.user.name }}</h2>
          {{ $auth.user.email }}
        </v-card>
      </v-col>
      <v-col cols="12" sm="8">
        <v-card elevation="0" outlined>
          <v-card-title>Edit Password</v-card-title>
          <v-form ref="form" lazy-validation>
            <v-card-text>
              <v-text-field
                type="password"
                label="Current Password"
                v-model="curr_pass"
                required
              ></v-text-field>
              <v-text-field
                type="password"
                label="New Password"
                v-model="new_pass"
                required
              ></v-text-field>
              <v-text-field
                type="password"
                label="Confirm New Password"
                v-model="new_confirm_pass"
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
                @click="update_pass"
                >Save</v-btn
              >
            </v-card-actions>
          </v-form>
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
      curr_pass: '',
      new_pass: '',
      new_confirm_pass: '',
    }
  },
  computed: {
    valid() {
      if (this.curr_pass && this.new_pass && this.new_confirm_pass) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    async update_pass() {
      if (this.new_pass == this.new_confirm_pass) {
        if (this.curr_pass) {
          const data = await service.update_password(this.$axios, {
            new_pass: this.new_pass,
            old_pass: this.curr_pass,
          })
          if (data.message == 'Password update') {
            alert('Password Updated Successfully')
            this.$router.push('/')
          } else {
            alert('Incorrect Password')
          }
        }
      } else {
        alert('Password not same')
      }
    },
  },
}
</script>

<style></style>
