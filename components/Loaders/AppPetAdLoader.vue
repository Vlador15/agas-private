<template>
  <ContentLoader
    :height="70"
    :speed="1"
    primaryColor="#d7d7d7"
    secondaryColor="#ecebeb"
  >
    <rect x="5" y="5" rx="5" ry="5" width="60" height="60" />
    <rect x="58%" y="5" rx="3" ry="3" width="40%" height="10" />
    <rect x="70" y="20" rx="3" ry="3" width="20%" height="5" />
    <rect x="35%" y="20" rx="3" ry="3" width="30%" height="5" />
    <rect x="70" y="30" rx="3" ry="3" width="55%" height="5" />
    <rect x="70" y="40" rx="3" ry="3" width="25%" height="5" />
    <rect x="40%" y="40" rx="3" ry="3" width="15%" height="5" />
    <rect x="70" y="55" rx="3" ry="3" width="40%" height="10" />
    <rect x="78%" y="55" rx="3" ry="3" width="20%" height="10" />
  </ContentLoader>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: {
    ContentLoader
  }
}
</script>
