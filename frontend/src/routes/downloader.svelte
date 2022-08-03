<script>
  import DownloadEntry from "../components/downloader/downloadEntry.svelte"
  let isAdderOpen = false
</script>


<div class="w-fit h-fit bg-gray-900 flex flex-col">
  <div class="flex justify-center bg-gray-800 p-4">
    <div class="p-2 text-white font-ozda  text-blue-400 text-9xl border-b-4 border-blue-400">Dmanager</div>
  </div>
  <!--content here-->
  <!--p class="text-9xl text-center text-white font-ozda">Dmanager</p-->
  <!--div class="w-full h-96 border-2 border-white bg-gray-900">
  </div-->
  <div class="flex justify-center m-16">
    <div class="p-2 text-center text-white bg-gray-900 border-2 border-white text-4xl font-ozda shadow-lg shadow-blue-500" on:click={() => isAdderOpen = !isAdderOpen}>
      Add Download
    </div>

  </div>
  <div class="w-full flex flex-col items-center gap-2">
    {#if isAdderOpen}
      <div class="w-5/6 flex justify-between">
        <div class="font-ozda text-4xl text-white">Enter URL</div>
        <input class="w-4/5"/>
      </div>
      <div class="w-5/6 flex justify-between">
        <div class="font-ozda text-4xl text-white">Enter Fpath</div>
        <input class="w-4/5"/>
      </div>
    {/if}
  </div>
  <DownloadEntry />

</div>


