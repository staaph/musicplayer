<template>
  <div
    class="flex flex-col border border-gray-200 p-4 rounded-lg md:w-1/2 min-w-fit"
  >
    <!-- TITLE -->
    <h4 class="text-2xl flex justify-center font-bold text-white">Modify</h4>
    <!-- Edit Component for each song-->
    <div class="flex flex-row w-full gap-2 mt-2">
      <p class="text-lg text-gray-300">Song Name</p>

      <button class="text-sm text-end rounded px-2 py-1 text-white bg-blue-600">
        <font-awesome-icon icon="pencil" />
      </button>
      <button class="flex px-2.5 py-2 text-sm rounded text-white bg-red-600">
        <font-awesome-icon icon="times" />
      </button>
    </div>
    <div>
      <form>
        <div class="my-2">
          <label class="mb-2 text-white text-sm">Song Title</label>
          <input
            type="text"
            class="w-full py-1.5 px-3 bg-gray-200 text-gray-800 border border-gray-300 outline-none rounded-md"
            placeholder="Enter Song Title"
          />
        </div>
        <div class="">
          <label class="mb-2 text-white text-sm">Artist</label>
          <input
            type="text"
            class="w-full py-1.5 px-3 bg-gray-200 text-gray-800 border border-gray-300 outline-none rounded-md"
            placeholder="Enter Artist"
          />
        </div>
        <div class="flex gap-6 justify-center mt-5">
          <button
            type="button"
            class="py-1.5 px-3 rounded text-white bg-gray-600"
          >
            Go Back
          </button>
          <button
            class="py-1.5 px-3 rounded text-white bg-green-600"
            @click.prevent=""
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
