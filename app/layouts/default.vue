<script setup lang="ts">
// Default layout with header and footer
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white">
    <AppHeader />
    <main id="main-content" class="flex-grow">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
