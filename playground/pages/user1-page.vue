<template>
    <div class="container mx-auto p-8">
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h1 class="text-3xl font-medium mb-4">User 1's Private Page</h1>
            <p class="text-gray-600 mb-4">
                This page is only accessible to User 1 with 'user1:permission'
            </p>
            <NuxtLink to="/" class="text-blue-500 hover:underline">
                Back to Home
            </NuxtLink>
        </div>
    </div>
</template> 