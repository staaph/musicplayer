<template>
  <div
    class="fixed bottom-0 left-0 bg-gray-700 p-5 pb-4 text-left align-top w-full h-16"
  >
    <div class="relative">
      <!-- Play/Pause Button -->
      <div class="float-left w-7 h-7 leading-3">
        <button type="button">
          <font-awesome-icon icon="play" class="text-white text-xl" />
        </button>
      </div>
      <!-- Current Position -->
      <div
        class="float-left h-7 leading-3 text-gray-400 text-lg w-16 ml-5 mt-1"
      >
        <span class="player-currenttime">00:00</span>
      </div>
      <!-- Scrub -->
      <div class="float-left w-7 h-7 leading-3 ml-7 mt-2 player-scrub">
        <div
          class="absolute left-0 right-0 text-lg text-center mx-auto player-song-info"
        >
          <span class="song-title">Song Title</span> by
          <span class="song-artist">Artist</span>
        </div>
        <span
          class="block w-full h-2 rounded m-1 mt-2 bg-gray-200 relative cursor-pointer"
        >
          <span
            class="absolute top-neg-8 text-gray-800 text-lg"
            style="left: 50%"
          >
            <font-awesome-icon icon="circle" />
          </span>
          <span
            class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
            style="width: 50%"
          ></span>
        </span>
      </div>
      <!-- Duration -->
      <div
        class="float-left h-7 leading-3 text-gray-400 text-lg w-14 ml-8 mt-1"
      >
        <span class="player-duration">03:06</span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style>
.player-scrub,
.player-song-info {
  width: calc(100% - 250px);
}

.top-neg-8 {
  top: -8px;
}

.player-song-info {
  margin-top: -24px;
}
</style>
