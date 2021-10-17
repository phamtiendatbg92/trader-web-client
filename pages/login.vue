<template>
  <v-form ref="form" @submit.prevent="submit" v-model="valid" lazy-validation>
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field v-model="email" label="Password" required></v-text-field>

    <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
      Register
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

    <v-btn color="warning" @click="login"> Login</v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    submit() {
      this.$axios
        .$post("/auth/register", {
          username: this.name,
          password: this.email,
        })
        .then(function () {})
        .catch(function (error) {});
    },
    async login() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: {
            username: this.name,
            password: this.email,
          },
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
</style>