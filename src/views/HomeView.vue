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
        <MusicPlayer
          v-for="song in songs"
          :key="song.docID"
          :song="song"
          @click.prevent="newSong(song)"
        />
      </div>
      <!-- Play Bar -->
      <PlayBar />
    </div>
  </div>
</template>

<script setup>
import PlayBar from '@/components/PlayBar.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';
import { onBeforeMount, reactive, ref } from 'vue';
import { songsCollection } from '@/firebase/config';
import { getDocs } from 'firebase/firestore';
import { Howl } from 'howler';

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

//
const currentSong = ref({});
const newSong = async (value) => {
  currentSong.value = value;
  const sound = new Howl({
    src: value.url,
    html5: true,
  });
  sound.play();
};
</script>
