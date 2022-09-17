<svelte:head>
  <link href="http://fonts.cdnfonts.com/css/bitline" rel="stylesheet">
  <link href="http://fonts.cdnfonts.com/css/marcovaldo-trial" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.2/socket.io.js" integrity="sha512-VJ6+sp2E5rFQk05caiXXzQd1wBABpjEj1r5kMiLmGAAgwPItw1YpqsCCBtq8Yr1x6C49/mTpRdXtq8O2RcZhlQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <link href="http://fonts.cdnfonts.com/css/cathedral" rel="stylesheet">
</svelte:head>

<script>
  import "../app.postcss";
  import { webSocket } from "./store"
  import { onMount } from "svelte";
  //let navItems = ["home", "musu", "ace", "dmanager", "settings", "help"]
  import Navbar from "./navbar.svelte";

  function emit(event, data){
      if($webSocket === {}) console.log("websocket connection is not ready yet")
      else $webSocket.emit(event, data)
  }


  onMount(() => {
      $webSocket = io("ws://localhost:3000")
      emit("clientMSG", "hello from client")
    })
</script>

<div class="h-screen w-full bg-black flex flex-col items-center gap-4">
  <Navbar />
  <slot />
</div>

