<template>
  <BNavbar toggleable="lg" :class="styles.navbar" sticky="top">
    <BNavbarBrand href="/" :class="styles.navbar__brand">
      <NuxtImg src="/logo.svg" width="170px" height="32px" />
    </BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" is-nav>
      <BNavbarNav class="flex-grow-1 py-2 py-lg-0" :class="styles.navbar__items">
        <li style="margin-right: 30px;">
          <SearchInput />
        </li>
        <BNavItemDropdown text="Explore" class="me-4">
        </BNavItemDropdown>
        <BNavItemDropdown text="Tools" class="me-4">
        </BNavItemDropdown>
        <BNavItem href="#" class="me-4">All Features</BNavItem>
        <BNavItem href="#" class="me-4">Free Asset</BNavItem>
        <BNavItemDropdown text="Learn" class="me-4">
        </BNavItemDropdown>
      </BNavbarNav>
      <BNavbarNav class="ms-auto mb-2 mb-lg-0 d-flex" style="gap:12px;">
        <BNavItem href="#">
          <button class="button button--sm button--rounded button-white">
            Login
          </button>
        </BNavItem>
        <BNavItem href="#">
          <button class="button button--sm button--rounded">
            Sign Up
          </button>
        </BNavItem>
      </BNavbarNav>
    </BCollapse>
  </BNavbar>
</template>

<script setup>
import { SearchInput } from '#components';
import styles from './Navbar.module.scss';
</script>