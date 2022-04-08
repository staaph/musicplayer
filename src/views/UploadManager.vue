<template>
  <div class="bg-gray-900 flex flex-col min-h-screen">
    <!-- Navbar -->
    <div
      class="px-6 pt-5 pb-3 font-bold flex flex-row justify-between items-center"
    >
      <span class="card-title text-white text-xl">Upload</span>
      <button
        class="transition ease-in-out delay-50 text-white text-sm rounded-3xl bg-gray-800 px-4 py-3"
        @click="handleClick"
      >
        Logout
      </button>
    </div>
    <hr class="my-3" />
    <div class="flex flex-col md:flex-row justify-center p-12 gap-20">
      <FileUpload />
      <ModifyUpload />
    </div>
  </div>
</template>

<script setup>
import ModifyUpload from '@/components/ModifyUpload.vue';
import FileUpload from '@/components/FileUpload.vue';
import { onBeforeMount, ref } from 'vue';
import { songsCollection } from '../firebase/config';
import { query, getDocs } from 'firebase/firestore';
import useAuth from '../composables/useAuth.js';
import { useRouter } from 'vue-router';

const songs = ref([]);

//query firestore database to get songs
const songsList = query(songsCollection);

onBeforeMount(async () => {
  const snapshot = await getDocs(songsList);
  snapshot.forEach((document) => {
    const song = {
      ...document.data(),
      docID: document.id,
    };
    songs.value.push(song);
  });
});

const { logout } = useAuth();
const router = useRouter();
//logout user and redirect to /
const handleClick = async () => {
  await logout();
  router.push('/');
};
</script>
