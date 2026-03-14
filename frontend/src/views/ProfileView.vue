<template>
    <div class="profile-container">
      <h1>Complete Your Profile</h1>
  
      <form @submit.prevent="updateProfile">
        <div>
          <label>First Name:</label>
          <input v-model="firstName" type="text" required />
        </div>
  
        <div>
          <label>Last Name:</label>
          <input v-model="lastName" type="text" required />
        </div>
  
        <button type="submit">Save Profile</button>
      </form>
  
      <p v-if="errorMessage" style="color:red">
        {{ errorMessage }}
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue"
  import { useRouter } from "vue-router"
  import apiClient from "@/services/api"
  
  const router = useRouter()
  
  const firstName = ref("")
  const lastName = ref("")
  const errorMessage = ref("")
  
  async function updateProfile() {
    try {
      const response = await apiClient.post("/api/auth/update-profile", {
        firstName: firstName.value,
        lastName: lastName.value,
        color: "#4f46e5",
        image: ""
      })

      console.log("Sending profile payload:", payload)
  
      console.log("Profile updated:", response.data)
  
      router.push("/chat")
  
    } catch (error) {
      console.error(error.response?.data)
      errorMessage.value = "Profile update failed"
    }
  }
  </script>
  
  <style>
  .profile-container {
    max-width: 400px;
    margin: 100px auto;
  }
  </style>