<script>
  let apps = [
                {
                  name: "scratch",
                  url: "/scratch"
                },
                {
                  name: "dman",
                  url: "/download"
                }]
</script>
<ul class="bg-gray-800">
  {#each apps as app}
    <li class="">
      <a class="" href={app.url}>{app.name}</a>
    </li>
  {/each}
</ul>
