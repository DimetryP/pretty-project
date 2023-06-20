<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
    events: []
  },

  async created() {
    await axios(`${process.env.HOST}/events`).then(response => this.events.push(response));
  }

  searchEventsByCreateDate() {
    const createdDate = this.$createdDate;

    this.events.filter(event => event.createdate === createdDate);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
