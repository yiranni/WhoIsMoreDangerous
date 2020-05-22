<template>
  <div class="container">
    <SummaryData />
    <Intro />
    <SharkAttack />
  </div>
</template>

<script>
import SummaryData from '~/components/SummaryData.vue'
import Intro from '~/components/Intro.vue'
import SharkAttack from '~/components/SharkAttack.vue'

export default {
  components: {
    Intro,
    SharkAttack,
    SummaryData
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  justify-content: center;
  padding-top: 4em;
  padding-left: 10vw;
  padding-right: 10vw;
  /* align-items: center; */
  /* background-color: #fffcf9; */
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
