<template>
    <div>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/test">Test</router-link>
      </nav>
      <router-view />
    </div>
</template>

<script setup lang="ts"></script>

<style>
nav {
margin-bottom: 20px;
}
nav a {
margin-right: 10px;
}
</style>
