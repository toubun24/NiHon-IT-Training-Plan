<template>
  <div>
    <GithubSearch />
    <GithubList />
  </div>
</template>

<script>
import GithubSearch from "@/components/GithubSearch";
import GithubList from "@/components/GithubList";
export default {
  name: "App",
  components: {
    GithubSearch,
    GithubList,
  },
}
</script>