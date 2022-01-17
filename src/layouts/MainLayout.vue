<template>
  <q-layout view="lHh Lpr lFf">
    <q-header id="header" style="background: #102a43">
      <q-toolbar class="full-height container">
        <q-toolbar-title class="text-weight-bold"> Job Board </q-toolbar-title>
        <q-space />
        <q-btn color="primary" unelevated to="/jobs/create">Add Job</q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container class="q-layout-padding">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup></script>

<style lang="sass">
#header
  height: 100px
  // border-bottom-left-radius: 60%
</style>
