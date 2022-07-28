<script>
  let items = [{
    name: "naruto",
    fpath: "/home/iamfiasco/Downloads/something.mkv",
    progress: 37,
    speed: "2.5 MB/S",
    length: "3.2 GB"
  }, {
    name: "DBZ",
    fpath: "/home/iamfiasco/Downloads/dbz/s1/e1.mkv",
    progress: 92,
    speed: "7.3MB/S",
    length: "3.2GB"
  }, {
    name: "akehama",
    fpath: "/home/iamfiasco/Downloads/Music/audiophile/ASKING ALEXANDRIA - DISCOGRAPHY (2007-16) [CHANNEL NEO]/",
    progress: 12,
    speed: "2.1 MB/S",
    length: "23.1 GB"
  }]
</script>
<div class="h-full w-screen bg-gray-900 flex flex-col items-center gap-8 pt-16 pb-28">
  <!-- downlaod entries below-->
  <div class="w-full h-1/3 bg-gray-100">

  </div>
  {#each items as item}
    <div class="w-5/6 h-full border-2 p-2 border-white shadow-lg shadow-blue-400">

      <!--controllers-->
      <div class="p-2 flex justify-center gap-4">
        <button class="font-ozda text-xl text-white border-2 border-blue-900 p-2 shadow-lg shadow-blue-400">Resume</button>
        <button class="font-ozda text-xl text-white border-2 border-blue-900 p-2 shadow-lg shadow-blue-400">Stop</button>
        <button class="font-ozda text-xl text-white border-2 border-blue-900 p-2 shadow-lg shadow-blue-400">Delete</button>
      </div>
      <p class="p-2 text-4xl font-ozda text-white text-center">{item.name}</p>
      <div class="p-2 flex flex justify-between border-2">
        <p class="font-ozda text-xl text-white">fpath</p>
        <p class="font-ozda text-xl text-white text-center">{item.fpath}</p>
      </div>
      <div class="p-2 flex flex justify-between border-2">
        <p class="font-ozda text-xl text-white">speed:</p>
        <p class="font-ozda text-xl text-white text-center">{item.speed}</p>
      </div>
      <div class="p-2 flex flex justify-between border-2">
        <p class="font-ozda text-xl text-white">size:</p>
        <p class="font-ozda text-xl text-white text-center">{item.length}</p>
      </div>

      <div class="pt-8 w-full h-3.5 mb-4 dark:bg-gray-700 flex items-center">
        <!--progress bar -->
        <div class="bg-blue-300 h-2.5 dark:bg-blue-300" style="width: {item.progress}%"></div>
      </div>
      <div class="flex justify-center">
        <p class="text-4xl text-white font-ozda border-2 border-green-800 p-2 shadow-lg shadow-green-300">{item.progress}%</p>
      </div>


      

    </div>


  {/each}
</div>
