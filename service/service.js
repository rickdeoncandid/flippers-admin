export default {
  users(axios) {
    return axios.$get(`users`)
  },
  customer_details(axios, id) {
    return axios.$get(`/customers/${id}`)
  },
  update_password(axios, data) {
    return axios.$post(`update-password`, data)
  },
  opt_for_newsletter(axios) {
    return axios.$put(`opt-for-newsletter`)
  },
  manual_verify(axios, data) {
    return axios.$post(`manuall-users`, data)
  },
  dashboard(axios) {
    return axios.$get(`dashboard`)
  },
  add_monetize_methods(axios, data) {
    return axios.$post('add-monetization', data)
  },
  remove_monetize_methods(axios, data) {
    return axios.$post('remove-monetization', data)
  },
  add_featured_listings(axios, data) {
    return axios.$post('add-featured-listing', data)
  },
  remove_featured_listings(axios, data) {
    return axios.$post('remove-featured-listing', data)
  },
  all_listing(axios) {
    return axios.$get(`listings`)
  },
  get_listing(axios, id) {
    return axios.$get(`listing/${id}`)
  },
  add_listing(axios, data) {
    return axios.$post(`new-listing`, data)
  },
  draft_listing(axios, data) {
    return axios.$post(`draft-listing`, data)
  },
  delete_listing(axios, data) {
    return axios.$post(`delete-listing`, data)
  },
  update_listing(axios, data) {
    return axios.$post(`update-listing`, data)
  },
  update_publish_listing(axios, data) {
    return axios.$post(`update-publish-listing`, data)
  },
  move_to_draft_listing(axios, data) {
    return axios.$post(`move-to-draft`, data)
  },
  referrals(axios) {
    return axios.$get('referrals')
  },

  // user listing
  users_listing(axios) {
    return axios.$get(`user-listings`)
  },
  edit_user_listing(axios, id) {
    return axios.$get(`user-listings/${id}`)
  },
  update_user_listing(axios, data) {
    return axios.$post(`update-user-listing`, data)
  },
  update_status_user_listing(axios, data) {
    return axios.$post(`status-update-user-listing`, data)
  },
  update_status_admin_listing(axios, data) {
    return axios.$post(`status-update-admin-listing`, data)
  },
  delete_user_listing(axios, data) {
    return axios.$post(`delete-user-listing`, data)
  },
}
