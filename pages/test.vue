<template>
  <div>
    <p>test </p>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      loading: false,
    }
  },
  computed: {
    
  },
  async created () {
  },
  async mounted() {
    // const currentToken = await this.$fire.messaging.getToken()
    // const data = JSON.stringify({
    //   notification: {
    //     title: 'firebase',
    //     body: 'firebase is awesome',
    //     click_action: 'http://localhost:3000/',
    //     icon: 'http://localhost:3000/static/favicon.io'
    //   }, 
    //   to: currentToken
    // })
    // const config = {
    //   method: 'post',
    //   url: 'https://fcm.googleapis.com/fcm/send',
    //   headers: { 
    //     'Content-Type': 'application/json', 
    //     'Authorization': 'key=AAAAgJtTuLE:APA91bE0d_uoJ3wudFyM82SYXhF-RzrqyxxqcCXrKyhdQLSo20a9DSxREgUqrN2ffPDpruaMccB-DS3_PJRJPTw1q7aAO3cy7XxW8bz9kE5n0X3AwYoCzbBHsRXqwbeA2BpoWpXiyGBU'
    //   },
    //   data
    // };
    // const response = await this.$axios(config)
    // this.$fire.messaging.onMessage((payload) => {
    //   console.info('Message received: ', payload)
    // })
    // this.$fire.messaging.onTokenRefresh(async () => {
    //   const refreshToken = await this.$fire.messaging.getToken()
    //   console.log('Token Refreshed',refreshToken)
    // })
  },
  methods: {
    
  }
}
</script>

<style lang="scss">

</style>
