<template>
  <div>
   <nav class="navbar is-light" role="navigation" aria-label="main navigation" style="min-height: 40px;">
        
          <div class="navbar-brand">
            <a href="/">
              <img :src="image">
            </a>
              
            <div class="menu" style="margin-left:-30px;">
              <button style="height: -webkit-fill-available;" class="button is-clear" @click="$router.push('/')">PLANS</button>
              <button style="height: -webkit-fill-available;" class="button is-clear" @click="$router.push('/test')">TEST</button>
              <button style="height: -webkit-fill-available;" class="button is-clear" @click="$router.push('/graph')">GRAPH</button>
              <button style="height: -webkit-fill-available;" class="button is-clear" @click="$router.push('/calibrate')">CALIBRATE</button>
            </div>
              
          </div>
      </nav>

  </div>
</template>

<script>
import image from "../assets/logo.png"

export default {
  data: function () {
    return {
        image: image
    }
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu {
  position: absolute;
  font-family: fantasy;
  padding: 5px;
  font-size: 30px;
  top: 0px;
  left: 150px;
  height: 3.25rem;
  cursor: pointer;
}
.items {
  font-family: fantasy;
  padding: 5px;
  font-size: 30px;
  top: 0px;
  background-color: rgb(222, 236, 222);
  height: 3.25rem;
  cursor: pointer;
}
</style>
