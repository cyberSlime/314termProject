<template>
    <div class="login-container">
      <h1>Login</h1>
  
      <form @submit.prevent="handleLogin">
        <div>
          <label>Email:</label>
          <input v-model="email" type="email" required />
        </div>
  
        <div>
          <label>Password:</label>
          <input v-model="password" type="password" required />
        </div>
  
        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account?
        <router-link to="/register">Register</router-link>
      </p>
  
      <p v-if="errorMessage" style="color: red;">
        {{ errorMessage }}
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue"
  import apiClient from "@/services/api"
  import { useRouter } from "vue-router"

  const router = useRouter()
 
  const email = ref("")
  const password = ref("")
  const errorMessage = ref("")
  
  async function handleLogin() {
    try {
      const response = await apiClient.post("/api/auth/login", {
        email: email.value,
        password: password.value
      })
  
      console.log("Login successful:", response.data)
      router.push("/chat")
  
    } catch (error) {
      console.error(error)
      errorMessage.value = "Login failed"
    }
  }
  </script>
  
  <style>
  .login-container {
    max-width: 400px;
    margin: 100px auto;
  }
  </style>