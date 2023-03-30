<template>
  <v-app dark>
    <v-navigation-drawer v-if="this.$auth.loggedIn" drawer app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Flippers.xyz</v-list-item-title>
          <v-list-item-subtitle>Admin panel</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list v-for="(item, i) in items" :key="i">
        <v-list-item :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-divider v-if="i % 2 == 1 && i < 7"></v-divider>
      </v-list>
      <v-list-item to="/profile" router exact>
        <v-list-item-action>
          <v-icon>mdi-account</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="$auth.logout()" router exact>
        <v-list-item-action>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-main>
      <nuxt />
    </v-main>
    <!-- bottom navi -->
    <v-bottom-navigation app grow color="black" class="d-md-none">
      <v-btn v-for="(item, i) in items" :key="i" :to="item.to" router exact>
        <span>{{ item.title }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-home',
          title: 'Dashboard',
          to: '/',
        },
        {
          icon: 'mdi-package-variant-closed',
          title: 'Web Listing',
          to: '/listings',
        },

        {
          icon: 'mdi-account-supervisor',
          title: 'All Users',
          to: '/users',
        },
        {
          icon: 'mdi-dropbox',
          title: 'User Listings',
          to: '/user-listings',
        },
        // {
        //   icon: 'mdi-account-tie',
        //   title: 'Employees',
        //   to: '/employees',
        // },
        // {
        //   icon: 'mdi-currency-inr',
        //   title: 'Employee Payments',
        //   to: '/employee-payment',
        // },
        // {
        //   icon: 'mdi-apps-box',
        //   title: 'Employee Orders',
        //   to: '/employee-orders',
        // },
        // {
        //   icon: 'mdi-account-arrow-right',
        //   title: 'Resellers ',
        //   to: '/resellers',
        // },
        // {
        //   icon: 'mdi-account-arrow-right',
        //   title: 'Resellers Product',
        //   to: '/resellers-product',
        // },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vue',
    }
  },
}
</script>

<style>
.v-main {
  background: #f4f6f9;
}
.container {
  max-width: 1200px;
}
</style>
