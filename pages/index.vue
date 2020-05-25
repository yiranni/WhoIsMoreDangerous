<template>
  <div class="container">
    <SummaryData />
    <Intro />
    <!-- <SharkAttack /> -->
    <AttackMap />
    <Hemisphere />
    <GenderAge />
  </div>
</template>

<script>
import SummaryData from '~/components/SummaryData.vue'
import Intro from '~/components/Intro.vue'
import SharkAttack from '~/components/SharkAttack.vue'
import AttackMap from '~/components/AttackMap.vue'
import Hemisphere from '~/components/Hemisphere.vue'
import GenderAge from '~/components/GenderAge.vue'

export default {
  components: {
    Intro,
    SharkAttack,
    SummaryData,
    AttackMap,
    Hemisphere,
    GenderAge
  }
}
</script>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap'); */
/* @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"); */
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
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

</style>
