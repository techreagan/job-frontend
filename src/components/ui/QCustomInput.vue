<template>
  <q-input
    v-if="isPassword"
    filled
    v-model="value"
    :error-message="errorMessage"
    :error="!!errorMessage"
    :type="isPwd ? 'password' : 'text'"
  >
    <template v-slot:append>
      <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
      /> </template
  ></q-input>
  <q-input
    v-else
    filled
    v-model="value"
    :error-message="errorMessage"
    :error="!!errorMessage"
  />
</template>

<script>
import { ref } from "vue";
import { useField } from "vee-validate";

export default {
  name: "QInputWithValidation",
  props: {
    name: {
      type: String,
      required: true,
    },
    isPassword: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { errorMessage, value } = useField(props.name);
    const isPwd = ref(props.isPassword);

    return {
      errorMessage,
      value,
      isPwd,
    };
  },
};
</script>
