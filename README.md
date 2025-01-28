# Nuxt Permission Check

[![npm version](https://badge.fury.io/js/nuxt-permission-check.svg)](https://badge.fury.io/js/nuxt-permission-check)

A powerful Nuxt module for implementing permission-based access control in your Nuxt 3 applications.

## Features

- 🛡️ &nbsp;Simple permission-based access control
- 🔒 &nbsp;Route protection with middleware
- ⚡️ &nbsp;Composable for checking permissions
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
    disabledClass: '' // Custom class for disabled elements
  }
})
```

## Configuration Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `global` | `boolean` | `true` | Enable global route middleware for permission checks |
| `redirect` | `string` `boolean` | `false` | Path to redirect when access is unauthorized |
| `disabledClass` | `string` | `''` | CSS class applied to disabled elements with v-can directive |

## nuxtApp.$permissionCheck API

| Name | Type | Description |
| --- | --- | --- |
| `setPermissions` | `(permissions: string[]) => void` | Sets the current user's permissions |
| `setRoutePermissions` | `(permissions: Record<string, string[]>) => void` | Sets route-specific permission requirements |
| `hasPermission` | `(requiredPermissions: string[]) => boolean` | Checks if user has all required permissions (or any OR permissions) |
| `canAccessRoute` | `(routeName: string, customPermissions?: string[]) => boolean` | Checks if user can access a specific route |
| `getRequiredRoutePermissions` | `(routeName: string) => string[]` | Gets the required permissions for a route |
| `isRoot` | `ComputedRef<boolean>` | Whether the user has root access (no permissions set) |

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

- Root permission: `[]` (no permissions set)
- Single permission: `['permission']`
- Multiple AND permissions: `['permission1', 'permission2']` (requires all)
- OR permissions: `['permission1', '||permission2']` (requires any)
- AND/OR permission combinations: `['permission1', '||permission2', 'permission3']` (requires permission AND permission3 OR permission2)

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

### Using v-can Directive

The module provides a `v-can` directive for declarative permission checks, and you can use the `not` modifier to check if the user does not have the permission, also you can use the `disabled` modifier to disable the element if the user does not have the permission. Disabled elements will be added the `disabledClass` value of the module config if you set it:

```vue
<template>
  <!-- Single permission -->
  <button v-can="'admin:access'">
    Admin Panel
  </button>

  <!-- Multiple AND permissions -->
  <div v-can="['read:users', 'write:users']">
    User Management
  </div>

  <!-- OR permissions -->
  <div v-can="['admin:settings', '||user:settings']">
    Settings
  </div>

  <!-- With else condition -->
  <div v-can:not="'view:reports'">
    Reports Dashboard
    <template #else>
      Access Denied
    </template>
  </div>

  <!-- Using disabled modifier -->
  <button v-can.disabled="'edit:document'">
    Edit Document
  </button>

  <!-- Disabled modifier with multiple permissions -->
  <button v-can.disabled="['delete:user', 'admin:access']">
    Delete User
  </button>
</template>
```

The `v-can` directive provides a more elegant way to handle permission-based visibility. It supports:
- Single permission strings
- Arrays for multiple permissions (AND logic)
- OR combinations using the '||' prefix
- Optional else template for unauthorized states
- `.disabled` modifier to disable elements instead of hiding them

When using the `.disabled` modifier:
- The element will remain visible but will be disabled when permissions are not met
- Adds the configured disabled css class
- Works with any element and component (which has root element)

The `.disabled` modifier affects elements with the following default styles:
```css
/* Default styles applied to disabled elements */
{
  cursor: not-allowed;
  pointer-events: none;
}
```

You can customize the appearance of disabled elements by:

Setting a custom class name in the module config:
```ts
export default defineNuxtConfig({
  modules: ['nuxt-permission-check'],
  nuxtPermissionCheck: {
    disabledClass: 'my-custom-disabled-class'
  }
})
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
- Install dependencies 
- Start development server

## License

[MIT License](./LICENSE)

