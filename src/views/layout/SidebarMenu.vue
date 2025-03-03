<script setup>
import { computed } from "vue";
import Menu from "primevue/menu";
import Badge from "primevue/badge";
import { RouterLink } from "vue-router";

const items = computed(() => {
  return [
    {
      separator: true,
    },
    {
      label: "Бронирования",
      icon: "pi pi-calendar-clock",
      route: "/bookings",
    },
    {
      label: "Уборка",
      icon: "pi pi-trash",
    },
    {
      label: "Апартаменты",
      route: "/apartments",
      icon: "pi pi-home",
    },
    {
      label: "Сотрудники",
      route: "/employees",
      icon: "pi pi-users",
    },
    {
      label: "Финансы",
      icon: "pi pi-wallet",
    },
  ];
});
</script>

<style scoped>
.app-home-menu {
  display: inline-flex;
  align-items: center;
  padding: 1.25rem;
  gap: 0.75rem;
}

.app-home-menu--title {
  font-weight: 600;
}
</style>

<template>
  <div class="sidebar-menu">
    <Menu :model="items" style="height: 100vh">
      <template #start>
        <span class="app-home-menu">
          <span class="app-home-menu--title">Bed&Rest</span>
        </span>
      </template>

      <template #item="{ item, props }">
        <RouterLink
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </RouterLink>
        <a v-else href="#" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <Badge value="Скоро" severity="secondary"></Badge>
        </a>
      </template>
    </Menu>
  </div>
</template>
