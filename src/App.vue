<template>
  <!--eslint-disable-->
  <div v-if="signedIn">
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Mgr from './services/SecurityService'
import Conf from './services/ConfService'

export default {
  name: 'App',
  data () {
    return {
      conf: new Conf(),
      mgr: null,
      signedIn: false
    }
  },
  created () {
    this.conf.getConfig().then(config => {
      this.mgr = new Mgr(config);
      this.mgr.getSignedIn().then(
        signIn => {
          this.signedIn = signIn
        },
        err => {
          console.log(err)
        }
      );
    });
  }
}
</script>
