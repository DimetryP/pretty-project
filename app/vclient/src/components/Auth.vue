<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Auth',
  data: {
    response: ''
  },
  props: {
    msg: String
  },
  methods: {
  async authorization() {
    const login = this.$inputLogin.value;
    const password = this.$inputPassword.value;

    await axios.post(`${process.env.HOST}/authorization`, login, password);
  }

  async registration() {
    const login = this.$inputLogin.value;
    const password = this.$inputPassword.value;

    await axios.post(`${process.env.HOST}/registration`, login, password);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
