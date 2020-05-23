<template>
  <div>
    <div class="project-title">
      <h1 style="font-weight: 900;">Overview of shark attacks in the past 20 years</h1>
      <h3>Shark attacks reach to the peak as summer is approaching. This project visualizes how, where, and when shark attacks happened during 2000-2019.</h3>
      <p style="padding-top: 2em"><span style="font-weight: bold">BY YIRAN NI    |</span><span style="color: gray">   UPDATED MAY 21,2020</span></p>
    </div>
  </div>
</template>

<script>
export default {
    name: "Intro",
    head() {
      return {
        link: [
          {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap'}
        ]
      }
    }
};
</script>

<style scoped>

.project-title {
  text-align: center;
  font-family: 'Merriweather', serif;
  padding-top: 4em;

  
}
.project-title h3 {
  color: gray;
  padding-top: 2em;
  font-size: 1.5rem;
  line-height: 28px;
 
}

.project-title p {
  font-family: "Roboto", sans-serif;
}

@media only screen and (max-width: 812px) {
  .project-title h3 {
    padding-left: 10px;
    padding-right: 10px;
  }
  .project-title h1 {
    padding-left: 8px;
    padding-right: 8px;
    font-size: 2.5rem;
  }
}

@media only screen and (min-width: 813px) {
  .project-title h3 {
    padding-left: 300px;
    padding-right: 300px;
  }
  .project-title h1 {
    font-size: 3rem; 
    padding-left: 300px;
    padding-right: 300px;

  }
}

h2 {
  padding-top: 1em;
  font-size: 32px;
  padding-bottom: 2em;
}
</style>
