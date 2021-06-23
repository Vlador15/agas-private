<template>
  <div
    class="d-flex align-center"
    @click="
      $route.path !== '/'
        ? $router.push({ name: `index___${$i18n.locale}` })
        : ''
    "
  >
    <div class="mr2 logo">
      <svg
        id="logo"
        width="40"
        height="56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 80 80"
        class="mr-2"
      >
        <g>
          <polygon
            v-for="(item, i) in logoPoligons"
            :key="i"
            :class="`st${i}`"
            :points="item"
          />
        </g>
      </svg>
    </div>
    <div id="appbarlogotext" class="hover text-uppercase">
      <span class="d-block headline font-weight-black name">Agas</span>
      <div class="d-block text-caption slogan">
        <span style="color: #d06647">Innovation </span>
        <span style="color: #fde71c">environment</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logoPoligons: [
        '0,80 80,0 80,80',
        '10,86 70,26 70,86',
        '20,92 60,52 60,92'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 60px;
  height: 60px;
  border-radius: 30px;

  svg {
    transition: width 0.3s ease-out;
    .st0 {
      fill: #2196f3;
    }
    .st1 {
      fill: #d06647;
      transition: transform 0.3s ease-in-out;
    }
    .st2 {
      fill: #fde71c;
      transition: transform 0.3s ease-in-out;
    }
    :hover .st1 {
      transform: translate(-10px, -26px);
    }
    :hover .st2 {
      transform: translate(-20px, -52px);
    }
  }
}

#appbarlogotext {
  @media screen and (max-width: 767px) {
    display: none;
  }

  .name {
    font-size: 3.1rem !important;
    line-height: 2.4rem;
    color: #2196f3;
  }

  .slogan {
    font-size: 0.6rem !important;
    line-height: 0.6rem;
    font-weight: 600;
  }
}

.v-app-bar--is-scrolled {
  .logo svg {
    width: 30px;
  }

  #appbarlogotext {
    display: none;
  }
}
</style>
