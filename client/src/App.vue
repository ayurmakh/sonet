<template>
  <div id="app">
    <header>
      <a href="/"><h1>SO<span>NET</span></h1></a>
      <nav>
        <router-link to="/">Sign in</router-link>
        <router-link to="/signup">Sign up</router-link>
      </nav>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeLink: 0
    }
  }
}
</script>
