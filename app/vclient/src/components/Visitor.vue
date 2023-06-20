<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    visitors: [],
    currentVisitor: {}
  },
  methods: {
    getCurrentVisitor() {
      await axios.get(`${process.env.HOST}/visitors/:${uuid}`).then(response => {
        this.currentVisitor = response;
      });
    }

    async getAllVisitors() {
      await axios.get(`${process.env.HOST}/visitors`).then(data => {
        this.visitors.push(data);
      });
    }

    searchByVisitors() {
      const inputData = this.$input.value.split(' ');
  
      this.visitors.filter(visitor => visitor.username === inputData[0] && visitor.surname === inputData[1] && visitor.patronymic === inputData[2]);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
