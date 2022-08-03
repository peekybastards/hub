<script>
  let apps = [
                {
                  name: "scratch",
                  url: "/scratch"
                },
                {
                  name: "dman",
                  url: "/downloader"
                }, 
                {
                  name: "redditor",
                  url: "/redditor"
                }]
</script>
<div class="h-screen w-full bg-gray-800 flex flex-col gap-32 items-center">
  <p class="font-ozda text-9xl text-white hover:text-blue-500"> The Hub </p>
  <ul class="flex flex-col items-center justify-around">
    {#each apps as app}
      <li class="">
        <a class="text-white font-ozda text-2xl hover:text-blue-500" href={app.url}>{app.name}</a>
      </li>
    {/each}
  </ul>
</div>
