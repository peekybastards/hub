<script>
  import DownloadEntry from "../components/downloader/downloadEntry.svelte"
  let progress = 15
  let timer = setInterval(() => {
    if(progress === 100) clearInterval(timer)
    else progress++
  },1000)
</script>


<div class="w-fit h-fit bg-gray-900 flex flex-col">
  <div class="flex justify-center bg-gray-800 p-4">
    <div class="p-2 text-white font-ozda  text-blue-400 text-9xl border-b-4 border-blue-400">Dmanager</div>
  </div>
  <!--content here-->
  <!--p class="text-9xl text-center text-white font-ozda">Dmanager</p-->
  <!--div class="w-full h-96 border-2 border-white bg-gray-900">
    
</div-->
<div class="w-5/6 text-9xl text-white flex bg-gray-900 border-2 border-white items-center">
  asklhjdkljaskld
  askdjlkasjd
  aslkjdlaskdlkjasldkjalks
  askdjlaskjdlksj
  </div>
  <DownloadEntry />

</div>


