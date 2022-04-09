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
      <!-- Play Bar -->
      <div
        class="flex justify-between py-4 bg-gray-900 sm:w-82 h-16 rounded-2xl mt-2 mx-5 mb-6 px-5"
      >
        <!-- Play Button -->
        <button type="button" @click.prevent="toggleAudio">
          <font-awesome-icon
            icon="play"
            class="text-white text-xl sm:text-3xl"
            v-if="!songPlaying"
          />
          <font-awesome-icon
            icon="pause"
            class="text-white text-xl sm:text-3xl"
            v-if="songPlaying"
          />
        </button>
        <!-- current song position -->
        <div
          class="flex items-center pl-2 sm:pl-4 text-white text-xs sm:text-sm"
        >
          {{ seek }}
        </div>
        <!-- current position / change - bar + song title & artist -->
        <div class="flex flex-col px-2 justify-center items-center w-full">
          <span
            class="text-gray-400 text-sm pb-2 text-center"
            v-show="currentSong"
            >{{ currentSong.modified_name
            }}<span v-if="currentSong.artist">&nbsp;by&nbsp;</span
            >{{ currentSong.artist }}</span
          >
          <div class="w-3/4 bg-gray-200 rounded-xl">
            <div class="bg-blue-700 h-1 rounded-xl" style="width: 45%"></div>
          </div>
        </div>
        <!-- song duration -->
        <div class="flex items-center text-white text-xs sm:text-sm sm:pl-4">
          {{ duration }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MusicPlayer from '@/components/MusicPlayer.vue';
import { onBeforeMount, reactive, ref, watchEffect } from 'vue';
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

// PLAY MUSIC FUNCTION
// gets the current Song from the component
const currentSong = ref({});
// is song playing ? for play/pause button
const songPlaying = ref(false);
// gets the sound data including url for howler
const sound = ref();
// gets the duration of the song
const duration = ref('00:00');
// gets current position in song
const seek = ref('00:00');

// gets clicked song url and plays with howler
const newSong = async (value) => {
  currentSong.value = value;

  if (!songPlaying.value) {
    sound.value = new Howl({
      src: value.url,
      html5: true,
    });
    songPlaying.value = true;
    await sound.value.play();
  } else {
    sound.value.stop();
    sound.value = new Howl({
      src: value.url,
      html5: true,
    });
    await sound.value.play();
  }
};

watchEffect(() => {
  if (sound.value) {
    sound.value.on('play', () => {
      requestAnimationFrame(() => {
        seek.value = sound.value.seek();
        duration.value = sound.value.duration();
      });
    });
  }
});

// PlayBar play pause button & pause, play song
const toggleAudio = () => {
  if (!sound.value.playing) {
    return;
  }
  if (sound.value.playing()) {
    sound.value.pause();
    songPlaying.value = false;
  } else {
    sound.value.play();
    songPlaying.value = true;
  }
};
</script>
