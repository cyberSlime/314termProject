import { io } from "socket.io-client"

const socket = io("https://pretorial-portliest-vertie.ngrok-free.dev", {
  withCredentials: true
})

export default socket