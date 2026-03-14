<template>
    <div class="register-container">
      <h1>Register</h1>
  
      <form @submit.prevent="handleRegister">
        <div>
          <label>Email:</label>
          <input v-model="email" type="email" required />
        </div>
  
        <div>
          <label>Password:</label>
          <input v-model="password" type="password" required />
        </div>
  
        <button type="submit">Create Account</button>
      </form>
  
      <p v-if="errorMessage" style="color: red;">
        {{ errorMessage }}
      </p>
  
      <p>
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue"
  import { useRouter } from "vue-router"
  import apiClient from "@/services/api"
  
  const router = useRouter()
  
  const email = ref("")
  const password = ref("")
  const errorMessage = ref("")
  
  async function handleRegister() {
    try {
      const response = await apiClient.post("/api/auth/signup", {
        email: email.value,
        password: password.value
      })
  
      console.log("Signup successful:", response.data)
  
      // After successful signup → go to chat
      router.push("/chat")
  
    } catch (error) {
      console.error(error)
      errorMessage.value = "Registration failed"
    }
  }
  </script>
  
  <style>
  .register-container {
    max-width: 400px;
    margin: 100px auto;
  }
  </style>