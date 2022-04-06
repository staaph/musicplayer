<template>
  <div
    class="bg-gray-800 min-w-screen max-h-screen flex flex-col justify-center items-center"
  >
    <div
      class="flex flex-col bg-black lg:w-4/6 sm:w-5/6 w-full h-screen sm:my-12 sm:rounded-2xl"
    >
      <!-- Songs Viewer for song in songs-->
      <div
        class="bg-gray-900 flex flex-col sm:w-82 m-5 h-800 sm:h-440 rounded-xl"
      >
        <div
          class="flex flex-row bg-gray-700 m-5 p-2 rounded-lg active:scale-95 cursor-pointer"
        >
          <!-- Song Picture -->
          <div class="w-1/6">
            <div
              class="flex flex-row bg-white m-3 p-6 w-16 justify-center rounded-xl"
            >
              <font-awesome-icon icon="music" />
            </div>
          </div>
          <!-- Artist & Songname -->
          <div class="w-full flex flex-col items-center justify-center">
            <p
              class="text-gray-300 text-xs items-center justify-center flex flex-col w-full"
            >
              Bo Burnham
            </p>
            <p class="text-white">Song</p>
          </div>
          <div class="w-1/6"></div>
        </div>
      </div>
      <!-- Play Bar -->
      <div
        class="flex justify-between bg-gray-900 sm:w-82 h-16 rounded-xl mt-2 mx-5 mb-6 px-5"
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
        <div class="flex flex-col px-4 items-center w-full">
          <span class="pt-2 text-gray-400 text-sm pb-2"
            >Song title by artist</span
          >
          <div class="w-full sm:w-3/4 bg-gray-200 rounded-xl">
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

<script setup></script>

<style></style>
