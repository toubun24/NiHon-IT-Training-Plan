<template>
  <div>
    <GithubResourceSearch />
    <GithubList />
  </div>
</template>

<script>
import GithubResourceSearch from "@/components/GithubResourceSearch";
import GithubList from "@/components/GithubList";
export default {
  name: "App",
  components: {
    GithubResourceSearch,
    GithubList,
  },
}
</script>