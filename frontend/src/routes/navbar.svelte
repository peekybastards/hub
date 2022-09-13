<script>
  let navItems = [
      {
        name: "home",
        url: "/"
      },
      {
        name: "reddit",
        url: "/reddit"
      },
      {
        name: "musu",
        url: "/musu"
      },
      {
        name: "ace",
        url: "/ace"
      },
      {
        name: "dmanager",
        url: "/dmanager"
      },
      {
        name: "settings",
        url: "/settings"
      },
      {
        name: "help",
        url: "/help"
      }
  ]
</script>

<p class="text-9xl font-markovaldo text-white">Hub</p>
<ul class="h-14 w-full flex items-center justify-around" id="navbar">
  {#each navItems as navitem}
    <li class="">
      <a class="text-white text-xl font-arvo hover:border-2 hover: p-2" href={navitem.url}>
        { navitem.name }
      </a>
    </li>
  {/each}
</ul>
