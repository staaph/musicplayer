<template>
  <div class="bg-gray-900 flex flex-col min-h-screen max-w-full">
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
      <!-- File upload Dropbox-->
      <FileUpload />
      <!-- Modify songs component -->
      <div
        class="flex flex-col border border-gray-200 p-4 rounded-lg md:w-1/2 min-w-fit"
      >
        <!-- TITLE -->
        <h4 class="text-2xl flex justify-center font-bold text-white">
          Modify
        </h4>
        <ModifyUpload
          v-for="(song, i) in songs"
          :key="song.docID"
          :song="song"
          :updateSong="updateSong"
          :index="i"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ModifyUpload from '@/components/ModifyUpload.vue';
import FileUpload from '@/components/FileUpload.vue';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { songsCollection } from '../firebase/config';
import { query, getDocs } from 'firebase/firestore';
import useAuth from '../composables/useAuth.js';

// array gets all songdata from database to display in template (passed as props from ModifyUpload.vue)
const songs = ref([]);

//query firestore database to get songs
const songsList = query(songsCollection);

// beforeMount get the songs and push into array
onBeforeMount(async () => {
  // gets all songs from firestore
  const snapshot = await getDocs(songsList);
  snapshot.forEach((document) => {
    // stores firebase data in variable and pushed into songs array
    const song = {
      ...document.data(),
      docID: document.id,
    };
    songs.value.push(song);
  });
});

// updates / displays modified song properties
const updateSong = (i, values) => {
  songs.value[i].modified_name = values.modified_name;
  songs.value[i].artist = values.artist;
};

//logout user and redirect to /
const { logout } = useAuth();
const router = useRouter();
const handleClick = async () => {
  await logout();
  router.push('/');
};
</script>
