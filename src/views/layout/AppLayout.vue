<script setup>
import '../../assets/style/global.css';

</script>

<template>
    <div class="layout-wrapper">
        <div class="layout-box">
            <div class="layout-sidebar">
                <slot name="sidebar" />
            </div>
            <div class="layout-container">
                <div class="layout-container-header">

                </div>
                <div class="layout-container-content">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
