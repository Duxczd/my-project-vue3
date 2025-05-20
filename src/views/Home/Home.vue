<template>
  <div class="home">
    <h1 @click="handleClick">Home Page</h1>
  </div>
</template>

<script>
export default { name: 'Home' }
</script>
<script setup>
import api from '@/api'
const handleClick = () => {
  handleLogin()
}

const handleLogin = async () => {
  const res = await api.login.login({ username: 'admin', password: '123456' })
  var { data } = res
  console.log('🚀 ~ handleLogin ~ data:', data)
}
</script>
<style lang="scss">
.home {
  padding: 20px;
}
</style>