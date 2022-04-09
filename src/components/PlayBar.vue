<template>
  <!-- Play Bar -->
  <div
    class="flex justify-between bg-gray-900 sm:w-82 h-16 rounded-2xl mt-2 mx-5 mb-6 px-5"
  >
    <!-- Play Button -->
    <button type="button">
      <font-awesome-icon icon="play" class="text-white text-xl sm:text-3xl" />
    </button>
    <!-- current position - number -->
    <div class="flex items-center pl-2 sm:pl-4 text-white text-xs sm:text-sm">
      00:00
    </div>
    <!-- current position / change - bar + song title & artist -->
    <div class="flex flex-col px- items-center w-full">
      <span class="pt-2 text-gray-400 text-sm pb-2">Song title by artist</span>
      <div class="w-3/4 bg-gray-200 rounded-xl">
        <div class="bg-blue-700 h-1 rounded-xl" style="width: 45%"></div>
      </div>
    </div>
    <!-- song length -->
    <div class="flex items-center text-white text-xs sm:text-sm sm:pl-4">
      3:21
    </div>
  </div>
</template>
