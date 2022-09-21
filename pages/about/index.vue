<template>
  <v-row class="about-wrapper">
    <v-col md="6" sm="12" cols="12" class="about-col">
      <h1 class="about-title">AGAS CLOUD</h1>
      <p class="about-description">
        {{ $t('about') }}
      </p>
    </v-col>
    <v-col md="6" sm="12" cols="12" class="center about-col">
      <v-img
        :src="require('~/assets/about-img.png')"
        class="d-flex align-end about-img"
        contain="true"
      >
      </v-img>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: 'auth',
  name: 'HelloWorld'
}
</script>

<style lang="scss" scoped>
.about-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.about-title {
  font-weight: 700;
  font-size: 54px;
  line-height: 77px;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: center;
  color: #2196f3;

  @media (max-width: 1200px) {
    font-size: 46px;
  }
  @media (max-width: 700px) {
    font-size: 36px;
    line-height: normal;
  }
}
.about-description {
  text-align: center;
  color: #414042;
  font-size: 20px;
  @media (max-width: 1200px) {
    font-size: 18px;
  }
  @media (max-width: 960px) {
    line-height: initial;
  }
  @media (max-width: 700px) {
    font-size: 16px;
  }
}
.about-img {
  width: 450px;
  height: 450px;
  max-width: 450px;
  max-height: 450px;
  object-fit: inherit;

  @media (max-width: 1200px) {
    width: 350px;
    height: 350px;
  }
  @media (max-width: 1080px) {
    width: 250px;
  }
}
.about-col {
  @media (max-width: 700px) {
    padding: 0;
  }
}
</style>
