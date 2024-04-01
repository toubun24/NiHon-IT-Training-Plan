<template>
  <div>
    <div class="row">
      <RouterNestedBanner />
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <!-- <router-link class="list-group-item" active-class="active" to="/about">About</router-link> -->
          <router-link class="list-group-item" active-class="active" :to="{name: 'regard'}">About</router-link>
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
import RouterNestedBanner from "@/components/RouterNestedBanner";
export default {
  name: "App",
  components: { RouterNestedBanner }
}
</script>
<style lang="css" scoped></style>
