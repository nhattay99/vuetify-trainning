<template>
  <v-app>
    <v-main>
      <TableTop/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import TableTop from './components/TableTop.vue'


export default Vue.extend({
  name: 'App',

  components: {
    TableTop,
  },

  data: () => ({
    //
  }),
});
</script>
