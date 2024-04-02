<template>
  <div>
    <div class="row">
      <!-- new -->
      <RouterNestedBanner />
    </div>
    <!-- <div class="row">
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header">
          <h2>Vue Router Demo</h2>
        </div>
      </div>
    </div> -->
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <router-link class="list-group-item" active-class="active" to="/about">About</router-link>
          <router-link class="list-group-item" active-class="active" to="/home">Home</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
            <router-view>
            </router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RouterNestedBanner from "@/components/RouterNestedBanner"; // banner
export default {
  name: "App",
  components: { RouterNestedBanner } // banner
}
</script>
<style lang="css" scoped></style>
