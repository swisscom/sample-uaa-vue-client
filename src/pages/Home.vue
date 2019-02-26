<template>
  <!--eslint-disable-->
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#/">Vue.js UAA Sample</a>
    </nav>
    <br><br><br><br>
    <div class="container">
      <div class="row">
        <div class="col-sm" align="center">
          <span class="medium">Welcome to the sample Vue.js UAA app</span>

          <br>
          <span class="small">Click</span>
          <a class="small" href="#/" v-on:click.stop="fetchApi">here</a>
          <span class="small">to fetch API resources</span>
        </div>
      </div>
      <div v-show="isCalling">
        <samp>Calling API endpoint...</samp>
        <pre v-show="result !== ''"><code>{{ result }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  import Api from '../services/ApiService'

  export default {
    name: 'Home',
    data () {
      return {
        api: new Api(),
        isCalling: false,
        result: ''
      }
    },

    methods: {

      async fetchApi() {
        this.isCalling = true;
        this.result = JSON.stringify(await this.api.getEnv(), null, 2);
      }

    }

  }
</script>

<style scoped>
  .small {
    font-size: 15px;
  }

  .medium {
    font-size: 30px;
  }
</style>
