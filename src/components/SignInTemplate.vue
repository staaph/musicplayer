<template>
  <div
    class="min-h-screen bg-gray-900 flex flex-col justify-center text-center"
  >
    <div
      class="w-8/12 mx-auto py-8 px-8 rounded-2xl shadow-gray-900 bg-slate-400 shadow"
    >
      <h2 class="font-bold">Login</h2>
      <form class="mx-auto w-fit max-w-xs m mt-4" @submit.prevent="signUp">
        <input type="email" required placeholder="email" v-model="email" />
        <input
          type="password"
          required
          placeholder="password"
          v-model="password"
        />
        <button class="my-5 mx-auto">Log in</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuth from '../composables/useAuth.js';
const { login } = useAuth();

const email = ref('');
const password = ref('');

const router = useRouter();

const signUp = async () => {
  await login(email.value, password.value);
  console.log('success');
  router.push('/upload');
};
</script>

<style scoped>
input {
  @apply w-full p-2 pl-3 rounded-xl border-4 border-solid bg-gray-100 border-gray-100 my-3 outline-none;
}

button {
  @apply bg-slate-500
        rounded-3xl
        font-bold
        px-8
        py-3
        border-0
        active:scale-90;
}
.container {
  @apply flex
        flex-col
        justify-center
        w-11/12
        max-w-screen-lg
        my-12
        mx-auto
        py-4
        px-1
        sm:py-8
        sm:px-8
        rounded-2xl
        shadow-gray-900
        bg-slate-400
        shadow;
}
</style>
