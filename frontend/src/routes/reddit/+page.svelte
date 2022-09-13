<script>
  export let data
  setTimeout(() => console.log(data.lines), 1000)
</script>
<div class="flex flex-col items-center bg-gray-700 p-4 gap-16">
  <p class="text-white text-6xl font-markovaldo">Recent Comments</p>
  <div class="flex flex-col items-center gap-2">
    {#each data.lines as line}
      <div class="flex justify-center items-center w-full gap-2">
        <p class="text-white w-1/5 h-10 text-center text-xl border-2 rounded-xl bg-black hover:bg-gray-800">{line.created_utc}</p>
        <p class="text-white text-center text-xl w-3/5 border-2 rounded-xl bg-black hover:bg-gray-800">{line.body}</p>
        <p class="text-white w-1/5 h-10 text-center text-xl border-2 rounded-xl bg-black hover:bg-gray-800">{line.score}</p>
      </div>
    {/each}
  </div>
</div>



