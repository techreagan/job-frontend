<template>
  <q-page class="container">
    <main class="q-mt-xl">
      <div class="row q-col-gutter-md">
        <div v-if="errored">errored</div>
        <template v-else-if="loading">
          <div v-for="n in 10" :key="n" class="col-xs-12 col-sm-6 col-md-4">
            <q-card flat>
              <q-card-section>
                <q-skeleton type="text" width="50px" />
                <q-skeleton type="text" />
                <q-skeleton type="text" height="50px" />
                <q-skeleton type="text" />
              </q-card-section>

              <q-card-actions class="q-gutter-md">
                <q-skeleton type="QBtn" />
              </q-card-actions>
            </q-card>
          </div>
        </template>
        <template v-else-if="!jobs.jobs">
          <p class="q-my-lg">No job posted yet</p>
        </template>
        <template v-else>
          <div
            v-for="job in jobs.jobs"
            :key="job._id"
            class="col-xs-12 col-sm-6 col-md-4"
          >
            <q-card class="my-card" flat>
              <q-card-section>
                <p class="text-caption text-grey q-mb-none">{{ job.type }}</p>
                <h2 class="text-h6 q-mt-none">{{ job.title }}</h2>

                <p>{{ job.country }}</p>
              </q-card-section>
              <q-card-actions>
                <q-btn flat color="primary" :to="`/jobs/${job.id}`"
                  >View Job</q-btn
                >
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-md-12 q-my-lg">
            <q-pagination
              v-model="currentPage"
              color="primary"
              :max="jobs.totalPage"
              :max-pages="6"
              unelevated
              boundary-numbers
            />
          </div>
        </template>
      </div>
    </main>
  </q-page>
</template>

<script setup>
import { ref, watch } from "vue";

import JobService from "src/services/JobService";

const errored = ref(false);
const loading = ref(false);

const currentPage = ref(1);
const jobs = ref();

watch(currentPage, (prevState, newState) => {
  getJobs();
});

async function getJobs() {
  loading.value = true;
  errored.value = false;

  const data = await JobService.getJobs(`page=${currentPage.value}`).catch(
    (err) => {
      errored.value = true;
      loading.value = false;
    }
  );

  console.log(data);

  loading.value = false;

  jobs.value = data.data.data;
  console.log(jobs.value);
}

getJobs();
</script>
