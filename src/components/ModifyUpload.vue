<template>
  <!-- Edit Component for each song-->
  <div
    class="flex flex-row w-full border p-2 rounded-lg gap-2 mt-2"
    v-show="!showForm"
  >
    <p class="text-lg text-gray-300">{{ song.modified_name }}</p>

    <button
      class="text-sm text-end rounded px-2 py-1 text-white bg-blue-600"
      @click.prevent="showForm = !showForm"
    >
      <font-awesome-icon icon="pencil" />
    </button>
    <button class="flex px-2.5 py-2 text-sm rounded text-white bg-red-600">
      <font-awesome-icon icon="times" />
    </button>
  </div>
  <div v-show="showForm">
    <div
      class="text-white text-center font-bold p-4 mb-4"
      v-if="show_alert"
      :class="alert_variant"
    >
      {{ alert_message }}
    </div>

    <!-- Form -->
    <vee-form @submit="edit" :validation-schema="schema" :initial-values="song">
      <div class="my-2">
        <label class="mb-2 text-white text-sm">Song Title</label>
        <vee-field
          name="modified_name"
          type="text"
          class="w-full py-1.5 px-3 bg-gray-200 text-gray-800 border border-gray-300 outline-none rounded-md"
          placeholder="Enter Song Title"
        />
        <ErrorMessage class="text-red-600" name="modified_name" />
      </div>
      <div class="">
        <label class="mb-2 text-white">Artist</label>
        <vee-field
          name="artist"
          type="text"
          class="w-full py-1.5 px-3 bg-gray-200 text-gray-800 border border-gray-300 outline-none rounded-md"
          placeholder="Enter Artist"
          required
        />
        <ErrorMessage class="text-red-600" name="artist" />
      </div>
      <div class="flex gap-6 justify-center mt-5">
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          @click.prevent="showForm = false"
          :disabled="in_submission"
        >
          Go Back
        </button>
        <!-- Submit -->
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="in_submission"
        >
          Submit
        </button>
      </div>
    </vee-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { songsCollection, doc } from '@/firebase/config';
import { updateDoc } from 'firebase/firestore';

const schema = { modified_name: 'required', artist: 'required' };
const props = defineProps({ song: { type: Object, required: true } });

//definitions
const showForm = ref(false);
const in_submission = ref(false);
const show_alert = ref(false);
const alert_variant = ref('bg-blue-500');
const alert_message = ref('please wait. upadting song info...');

const docRef = doc(songsCollection, props.song.docID);

// submit modified song name & artist
const edit = async (values) => {
  in_submission.value = true;
  show_alert.value = true;
  alert_variant.value = 'bg-blue-500';
  alert_message.value = 'please wait. upadting song info...';

  try {
    await updateDoc(docRef, values);
  } catch (error) {
    in_submission.value = false;
    alert_variant.value = 'bg-red-500';
    alert_message.value = 'something went wrong';
    console.log(values);
    console.log(error);
    return;
  }
  in_submission.value = false;
  alert_variant.value = 'bg-green-500';
  alert_message.value = 'success';
};
</script>
