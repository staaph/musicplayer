<template>
  <div
    class="bg-gray-800 max-h-screen min-h-screen flex flex-col justify-center items-center"
  >
    <div
      class="flex flex-col bg-black lg:w-4/6 sm:w-5/6 w-full h-screen sm:max-h-[600px] my-12 sm:rounded-2xl"
    >
      <div
        class="bg-gray-900 flex flex-col sm:w-82 m-5 h-full rounded-xl overflow-y-auto"
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
        class="flex py-4 bg-gray-900 h-16 rounded-2xl mx-5 mb-6 px-4 items-center"
      >
        <!-- Play Button -->
        <div class="w-20 flex flex-row items-center">
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
          <div class="pl-2 sm:pl-4 text-white text-xs sm:text-sm">
            {{ seek }}
          </div>
        </div>

        <!-- current position / change - bar + song title & artist -->
        <div class="flex flex-col items-center justify-center w-full mx-3">
          <span v-if="!sound" class="text-white">- Select a song -</span>
          <span
            else
            class="text-gray-400 text-sm pb-2 text-center"
            v-show="currentSong"
            >{{ currentSong.modified_name
            }}<span v-if="currentSong.artist">&nbsp;by&nbsp;</span
            >{{ currentSong.artist }}</span
          >
          <div
            class="w-11/12 bg-gray-200 rounded-xl cursor-pointer"
            @click.prevent="updateSeek($event)"
          >
            <div
              class="bg-blue-700 h-1 rounded-xl transition duration-50"
              :style="{ width: playerProgress }"
            ></div>
          </div>
        </div>
        <!-- song duration -->
        <div
          class="flex items-center pl-2 sm:pl-4 text-white text-xs sm:text-sm"
        >
          {{ duration }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MusicPlayer from '@/components/MusicPlayer.vue';
import { onBeforeMount, reactive, ref } from 'vue';
import { songsCollection } from '@/firebase/config';
import { getDocs } from 'firebase/firestore';
import { Howl } from 'howler';
import { formatTime } from '../includes/formatTime';

const songs = reactive([]);

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

onBeforeMount(async () => {
  getSongs();
});

const currentSong = ref({});
const songPlaying = ref(false);
const sound = ref();
const duration = ref('0:00');
const seek = ref('0:00');
const playerProgress = ref('0%');

// gets clicked song url and plays with howler
const newSong = async (value) => {
  currentSong.value = value;

  if (!songPlaying.value) {
    sound.value = new Howl({
      src: value.url,
      html5: true,
      onplay: function () {
        requestAnimationFrame(stepFunction.bind(this));
      },
      onend: function () {
        songPlaying.value = false;
      },
    });
    songPlaying.value = true;
    await sound.value.play();
  } else {
    sound.value.stop();
    sound.value = new Howl({
      src: value.url,
      html5: true,
      onplay: function () {
        requestAnimationFrame(stepFunction.bind(this));
      },
      onend: function () {
        songPlaying.value = false;
      },
    });
    await sound.value.play();
  }
};

const stepFunction = () => {
  seek.value = formatTime(sound.value.seek());
  duration.value = formatTime(sound.value.duration());
  playerProgress.value = `${
    (sound.value.seek() / sound.value.duration()) * 100
  }%`;

  if (sound.value.playing()) {
    window.requestAnimationFrame(stepFunction.bind(this));
  }
};

const updateSeek = (event) => {
  const { width, x } = event.currentTarget.getBoundingClientRect();
  const clickX = event.clientX - x;
  const per = clickX / width;
  const seconds = sound.value.duration() * per;

  if (sound.value) {
    if (sound.value.playing()) {
      sound.value.pause();
      sound.value.seek(seconds);

      sound.value.play();
    } else {
      sound.value.seek(seconds);
    }
  }
};

// PlayBar play pause button & pause, play song
const toggleAudio = () => {
  if (sound.value) {
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
  }
};
</script>
