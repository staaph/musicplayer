<template>
  <div
    class="bg-gray-800 min-w-screen max-h-screen flex flex-col justify-center items-center"
  >
    <div
      class="flex flex-col bg-black lg:w-4/6 sm:w-5/6 w-full h-screen sm:my-12 sm:rounded-2xl"
    >
      <div
        class="bg-gray-900 flex flex-col sm:w-82 m-5 h-800 sm:h-440 rounded-xl overflow-y-auto"
      >
        <MusicPlayer v-for="song in songs" :key="song.docID" :song="song" />
      </div>
      <!-- Play Bar -->
      <div
        class="flex justify-between bg-gray-900 sm:w-82 h-16 rounded-2xl mt-2 mx-5 mb-6 px-5"
      >
        <!-- Play Button -->
        <button type="button" class="">
          <font-awesome-icon
            icon="play"
            class="text-white text-xl sm:text-3xl"
          />
        </button>
        <!-- current position - number -->
        <div
          class="flex items-center pl-2 sm:pl-4 text-white text-xs sm:text-sm"
        >
          00:00
        </div>
        <!-- current position / change - bar + song title & artist -->
        <div class="flex flex-col px- items-center w-full">
          <span class="pt-2 text-gray-400 text-sm pb-2"
            >Song title by artist</span
          >
          <div class="w-3/4 bg-gray-200 rounded-xl">
            <div class="bg-blue-700 h-1 rounded-xl" style="width: 45%"></div>
          </div>
        </div>
        <!-- song length -->
        <div class="flex items-center text-white text-xs sm:text-sm sm:pl-4">
          3:21
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MusicPlayer from '@/components/MusicPlayer.vue';
import { onBeforeMount, reactive } from 'vue';
import { songsCollection } from '@/firebase/config';
import { getDocs } from 'firebase/firestore';

const songs = reactive([]);

onBeforeMount(async () => {
  getSongs();
});

// get Docs from Firestore and push into array
const getSongs = async () => {
  const snapshot = await getDocs(songsCollection);

  snapshot.forEach((document) => {
    songs.push({
      docID: document.id,
      ...document.data(),
    });
  });
};
</script>
