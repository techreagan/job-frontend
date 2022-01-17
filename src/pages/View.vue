<template>
  <q-page class="container">
    <main class="container q-mt-xl">
      <div class="row q-col-gutter-md">
        <div v-if="errored">errored</div>

        <div v-else-if="loading" class="q-mt-md full-width">
          <q-skeleton type="text" width="100px" />
          <h1 class="text-h3">
            <q-skeleton type="text" />
          </h1>
          <q-skeleton type="text" width="100px" />

          <q-skeleton type="text" v-for="n in 3" :key="n" width="100px" />

          <h2 class="text-h5">
            <q-skeleton type="text" width="150px" />
          </h2>
          <q-skeleton type="text" v-for="n in 20" :key="n" />
        </div>

        <template v-else>
          <div class="q-mb-md">
            <q-btn color="primary" round icon="chevron_left" to="/" />
          </div>
          <q-card class="my-card full-width" flat>
            <q-card-section>
              <p class="text-caption text-grey q-mb-none text-capitalize">
                {{ job.type }}
              </p>
              <h1 class="text-h3 text-weight-bold q-mt-none">
                {{ job.title }}
              </h1>

              <p>{{ job.country }}</p>

              <p class="text-weight-bold q-pt-lg">Description</p>

              <p v-html="htmlDecode(job.description)"></p>
            </q-card-section>
            <q-card-actions>
              <q-btn flat color="primary" :to="`/jobs/${job.id}/update`"
                >Update Job</q-btn
              >
              <q-btn
                unelevated
                color="red"
                @click="deleteDialog = !deleteDialog"
                >Delete Job</q-btn
              >
            </q-card-actions>
          </q-card>
        </template>
      </div>
    </main>
    <q-dialog v-model="deleteDialog">
      <q-card style="max-width: 300px; width: 100%">
        <q-card-section>
          <div class="text-h6">Delete Job</div>
        </q-card-section>

        <q-card-section class="q-pt-none"> Are you sure? </q-card-section>

        <q-card-actions align="right">
          <q-btn
            unelevated=""
            label="Delete"
            color="red"
            @click="deleteJob"
            :loading="loadingBtn"
          />
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import JobService from "src/services/JobService";

import useNotify from "src/hooks/notify";
import useDecode from "src/hooks/decode";

const { triggerNotification } = useNotify();
const { htmlDecode } = useDecode();

const errored = ref(false);
const loading = ref(false);

const deleteDialog = ref(false);
const loadingBtn = ref(false);

const route = useRoute();
const router = useRouter();

const job = ref();

async function getJob() {
  loading.value = true;
  errored.value = false;

  const data = await JobService.getJob(route.params.id).catch((err) => {
    errored.value = true;
    loading.value = false;
    router.push("/");
    return;
  });

  loading.value = false;

  if (!data) return;

  job.value = data.data.data;
}

getJob();

async function deleteJob() {
  loadingBtn.value = true;
  errored.value = false;

  const data = await JobService.deleteJob(route.params.id).catch((err) => {
    errored.value = true;
    loading.value = false;
    triggerNotification(
      "Something went wrong, couldn't delete job",
      "Negative"
    );
  });

  if (!data) return;

  triggerNotification("Job deleted successfully");
  router.push("/");
  loadingBtn.value = false;
}
</script>
