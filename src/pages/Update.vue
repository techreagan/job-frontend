<template>
  <div class="container">
    <q-btn
      unelevated
      class="q-mt-lg"
      color="primary"
      round
      icon="chevron_left"
      @click="router.back(-1)"
    />
    <h1 class="text-h5 text-weight-bold" style="margin-bottom: 2rem">
      Update Job
    </h1>

    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-8">
        <q-card flat class="my-card block">
          <q-card-section>
            <Form
              @submit="onSubmit"
              :validation-schema="schema"
              :initial-values="job"
              class="q-gutter-md"
            >
              <ui-error v-if="error.isError" :message="error.message" />
              <q-custom-input name="title" label="Job Title" />

              <Field
                name="type"
                type="select"
                v-slot="{ errorMessage, value, field }"
              >
                <q-select
                  filled
                  :model-value="value"
                  v-bind="field"
                  :error-message="errorMessage"
                  :error="!!errorMessage"
                  :options="jobTypes"
                  label="Job Type"
                  class="col-md-2"
                />
              </Field>

              <Field
                name="country"
                type="select"
                v-slot="{ errorMessage, value, field }"
              >
                <q-select
                  filled
                  :model-value="value"
                  v-bind="field"
                  v-model="country"
                  :error-message="errorMessage"
                  :error="!!errorMessage"
                  :options="countries"
                  label="Country"
                  class="col-md-6"
                />
              </Field>

              <q-editor
                v-model="description"
                :dense="$q.screen.lt.md"
                :toolbar="toolbar"
                :fonts="fonts"
              />
              <!-- </div> -->

              <div>
                <q-btn
                  class="full-width"
                  label="Submit"
                  type="submit"
                  color="primary"
                  :loading="loading"
                />
              </div>
            </Form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useQuasar } from "quasar";

import useNotify from "src/hooks/notify";
import * as yup from "yup";
import { Form, Field } from "vee-validate";

import useDecode from "src/hooks/decode";

import QCustomInput from "components/ui/QCustomInput.vue";
import UiError from "components/ui/UiError.vue";

import countriesData from "src/_data/countries.json";

import JobService from "src/services/JobService";

const router = useRouter();
const route = useRoute();

const loading = ref(false);
const error = reactive({
  message: "",
  isError: false,
});
const errored = ref(false);

const $q = useQuasar();
const jobTypes = ref([
  "Full Time",
  "Part Time",
  "Contract",
  "Internship",
  "Contract",
]);
const country = ref("");
const countries = ref();

const description = ref("");
const toolbar = [
  [
    {
      label: $q.lang.editor.align,
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      list: "only-icons",
      options: ["left", "center", "right", "justify"],
    },
    {
      label: $q.lang.editor.align,
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      options: ["left", "center", "right", "justify"],
    },
  ],
  ["bold", "italic", "strike", "underline", "subscript", "superscript"],
  ["token", "hr", "link", "custom_btn"],
  ["print", "fullscreen"],
  [
    {
      label: $q.lang.editor.formatting,
      icon: $q.iconSet.editor.formatting,
      list: "no-icons",
      options: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "code"],
    },
    {
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: "no-icons",
      options: [
        "size-1",
        "size-2",
        "size-3",
        "size-4",
        "size-5",
        "size-6",
        "size-7",
      ],
    },
    {
      label: $q.lang.editor.defaultFont,
      icon: $q.iconSet.editor.font,
      fixedIcon: true,
      list: "no-icons",
      options: [
        "default_font",
        "arial",
        "arial_black",
        "comic_sans",
        "courier_new",
        "impact",
        "lucida_grande",
        "times_new_roman",
        "verdana",
      ],
    },
    "removeFormat",
  ],
  ["quote", "unordered", "ordered", "outdent", "indent"],

  ["undo", "redo"],
  ["viewsource"],
];

const fonts = {
  arial: "Arial",
  arial_black: "Arial Black",
  comic_sans: "Comic Sans MS",
  courier_new: "Courier New",
  impact: "Impact",
  lucida_grande: "Lucida Grande",
  times_new_roman: "Times New Roman",
  verdana: "Verdana",
};

countries.value = countriesData.map((data) => data.name);

const { triggerNotification } = useNotify();
const { htmlDecode } = useDecode();

const schema = yup.object({
  title: yup.string().min(3).required(),
  // description: yup.string().min(10).required(),
  type: yup.string().required(),
  country: yup.string().required(),
});

async function onSubmit(values, actions) {
  loading.value = true;
  error.isError = false;
  console.log(values);
  const data = await JobService.createJob({
    ...values,
    type: values.type.toLowerCase(),
    description: description.value,
  }).catch((err) => {
    loading.value = false;

    error.isError = true;

    const isDescError = err.response.data.error.find((error) => {
      return error.field === "description";
    });
    console.log(err.response.data.error);
    if (isDescError) {
      error.message = isDescError.message;
    } else {
      error.message = "Something went wrong";
    }
  });

  loading.value = false;

  if (!data) return;

  router.push("/");

  triggerNotification("Job updated successfully");
}

const job = ref();

async function getJob() {
  // btnLoading.value = true;
  $q.loading.show();
  errored.value = false;

  const data = await JobService.getJob(route.params.id).catch((err) => {
    errored.value = true;
    $q.loading.hide();
    console.log(err);
  });

  // btnLoading.value = false;
  $q.loading.hide();

  if (!data) return;

  job.value = data.data.data;
  console.log(job.value);

  country.value = job.value.country;

  description.value = htmlDecode(job.value.description);
}

getJob();
</script>
