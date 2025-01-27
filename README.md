# Nuxt Permission Check

[![npm version](https://badge.fury.io/js/nuxt-permission-check.svg)](https://badge.fury.io/js/nuxt-permission-check)

A powerful Nuxt module for implementing permission-based access control in your Nuxt 3 applications.

## Features

- 🛡️ &nbsp;Simple permission-based access control
- 🔒 &nbsp;Route protection with middleware
- ⚡️ &nbsp;Composable for checking permissions
- 🎯 &nbsp;TypeScript support
- 🔄 &nbsp;Dynamic permission updates
- 🎨 &nbsp;Easy integration with your authentication system
- 🔀 &nbsp;Support for AND/OR permission combinations

## Quick Setup

1. Install the module to your Nuxt application:

```bash
# Using npm
npm install nuxt-permission-check

# Using yarn
yarn add nuxt-permission-check

# Using pnpm
pnpm add nuxt-permission-check
```

2. Add the module to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-permission-check'],
  nuxtPermissionCheck: {
    global: true,     // Enable global route middleware
    redirect: '/',    // Redirect path for unauthorized access
    routePermissions: {} // Define route permissions globally
  }
})
```

## Usage

### Basic Setup

Create a plugin to define your route permissions (e.g., `plugins/permissions.ts`):

```ts
export default defineNuxtPlugin((nuxtApp) => {
  const routePermissions = {
    'user-page': ['user:permission'],                    // Single permission
    'admin-page': ['admin:permission'],                  // Single permission
    'reports': ['read:reports', 'export:reports'],       // Multiple AND permissions
    'settings': ['admin:access', '||user:settings']      // OR permission combination
  }

  // Set route permissions
  nuxtApp.$permissionCheck.setRoutePermissions(routePermissions)
  
  // Set initial user permissions
  nuxtApp.$permissionCheck.setPermissions(['user:permission'])
})
```

### Permission Types

The module supports different permission combinations:

- Single permission: `['permission']`
- Multiple AND permissions: `['permission1', 'permission2']` (requires all)
- OR permissions: `['permission1', '||permission2']` (requires any)

### Checking Permissions in Components

Use the provided composable in your components:

```vue
<script setup>
const app = useNuxtApp()
const { hasPermission } = app.$permissionCheck

// Check permissions
const canAccessAdmin = hasPermission(['admin:access'])
const canManageUsers = hasPermission(['read:users', 'write:users'])
const canAccessSettings = hasPermission(['admin:settings', '||user:settings'])
</script>

<template>
  <div>
    <button v-if="canAccessAdmin">
      Admin Panel
    </button>
    
    <div v-if="canManageUsers">
      User Management
    </div>

    <div v-if="canAccessSettings">
      Settings
    </div>
  </div>
</template>
```

### Handling Unauthorized Access

You can set up a callback to handle unauthorized access attempts:

```ts
app.$permissionCheck.setUnauthorizedCallback((route, requiredPermissions) => {
  console.log(`Access Denied: Missing permissions (${requiredPermissions}) for ${route}`)
  // Show notification, redirect, etc.
})
```

## Development

- Clone this repository
- Install dependencies using `pnpm install`
- Start development server using `pnpm dev`

## License

[MIT License](./LICENSE)

