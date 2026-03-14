



<template>
  <div class="chat-container">

    <div class="sidebar">
      <h3>Contacts</h3>

      <div
        v-for="contact in contacts"
        :key="contact._id"
        class="contact"
        @click="selectContact(contact)"
      >
        {{ contact.firstName }} {{ contact.lastName }}
      </div>
    </div>

    <div class="chat-area">
      <h2 v-if="selectedContact">
        Chat with {{ selectedContact.firstName }}
      </h2>

      <div v-if="selectedContact" class="messages">

        <div v-for="msg in messages" :key="msg._id">
          {{ msg.content }}
        </div>

      </div>

      <div v-if="selectedContact">

        <input v-model="newMessage" placeholder="Type message..." />

        <button @click="sendMessage">Send</button>

      </div>

      <button @click="logout">Logout</button>
    </div>
 
  </div>
</template>

  <script setup>
  import { ref, onMounted } from "vue"
  import { useRouter } from "vue-router"
  import apiClient from "@/services/api"
  import socket from "@/services/socket"

  
  const router = useRouter()
  const user = ref(null)

  const selectedContact = ref(null)
  const messages = ref([])
  const newMessage = ref("")


  onMounted(async () => {
      try {
        const response = await apiClient.get("/api/auth/userinfo")

        user.value = response.data

        if (!user.value.profileSetup) {
          router.push("/profile")
          return 
        }

        await loadContacts()

      } catch (error) {
        router.push("/login")
      }

      socket.on("receiveMessage", (message) => {
        messages.value.push(message)
      })
   })
    
  
  async function logout() {
    try {
      await apiClient.post("/api/auth/logout")
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const contacts = ref([])

  async function loadContacts() {
    try {
      const response = await apiClient.get("/api/contacts/all-contacts")
      contacts.value = response.data.contacts
    } catch (error) {
      console.error("Failed to load contacts")
    }
  }

  async function selectContact(contact) {
    selectedContact.value = contact
    await loadMessages(contact._id)
  }

  async function loadMessages(contactId) {
    try {
      const response = await apiClient.post("/api/messages/get-messages", {
        id: contactId
      })

      messages.value = response.data.messages
    } catch (error) {
      console.error("Failed to load messages")
    }
  }

  async function sendMessage() {

    try {

      const messageData = {
      recipient: selectedContact.value._id,
      content: newMessage.value
    }

    await apiClient.post("/api/messages/send-message", messageData)

    socket.emit("sendMessage", messageData)

    newMessage.value = ""

    } catch (error) {
      console.error("Message send failed")
    }

  }


  </script>

  
<style>
.chat-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  border-right: 1px solid #ddd;
  padding: 10px;
}

.chat-area {
  flex: 1;
  padding: 20px;
}

.contact {
  padding: 8px;
  cursor: pointer;
}

.contact:hover {
  background: #eee;
}
</style>
 