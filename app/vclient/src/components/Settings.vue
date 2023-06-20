<template>
   <div>
      Settings Hello ;)
   </div>
</template>

<script>
export default {
  name: 'Settings',
  data() {},

  methods() {
    async changePassword() {
      const inputData = this.$passwordInput.value;

      const result = await axios.put(`${process.env.HOST}/update_password`, inputData);

      return result;
    }

    async changeLogin() {
      const inputData = this.$loginInput.value;

      const result = await axios.put(`${process.env.HOST}/update_login`, inputData);
    }

    async deleteAccount() {
      const adminPassword = this.$adminInput.value; 

      const result = await axios.delete(`${process.env.HOST}/delete_account`, adminPassword);

      return result;
    }
  }
}
</script>

<style scoped>

</style>
