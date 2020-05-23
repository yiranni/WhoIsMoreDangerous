<template>
  <div class="hemisphere">
    <div class="title">
      <h3>Cases by hemisphere</h3>
    </div>
  </div>
</template>

<script>
export default {
    name: "Intro"
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap');
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
.hemisphere .title {
  text-align: center;
  margin-top: 1em;
}

.hemisphere .title h3 {
  font-size: 36px;
  font-family: "Merriweather", serif;
  color: black;
  font-weight: 900;
}
</style>
