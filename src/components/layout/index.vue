<template>
  <div class="login-container">
    <!-- header -->
    <Head />

    <div class="login-body">
      <router-view></router-view>
    </div>

    <!-- footer -->
    <Foot />
  </div>
</template>

<script>
import Head from './head/index.vue'
import Foot from './foot/index.vue'

export default {
  data() {
    return {

    }
  },
  components: {
    Head,
    Foot
  }
}
</script>

<style scoped>
.login-body {
  min-height: 700px;
}
</style>
