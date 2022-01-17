<template>
  <q-banner inline-actions class="text-white bg-red q-mb-md">
    {{ message }}
    <!-- <template v-slot:action>
      <q-btn flat color="white" label="Turn ON Wifi" />
    </template> -->
  </q-banner>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default:
        "Something went wrong or You have lost connection to the internet.",
    },
  },
};
</script>
