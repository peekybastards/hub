<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { EditorValue, EditorTarget, EditorFType } from "../stores/scratch.js";
  import { Editor, Connection } from "../core/editor.js"

  let fpath = "/home/iamfiasco";
  let wss;

  function resync(){
    wss.send("set", { value: $EditorValue})
  }



  onMount(async () => {
    if (fpath === undefined) {
      fpath = "/home/iamfiasco/Downloads/scratch.md";
    }
    window.handle = new Editor();
    window.wssHandle = new Connection()

    wss = window.wssHandle

    window.handle.editor.commands.addCommand({
      name: "save",
      exec: function(){
        resync()
      }
    })
    window.handle.editor.getSession().on("change", () => {
      let contents = window.handle.editor.getValue()
      $EditorValue = contents
    })

    window.handle.defaults();
    ace.config.loadModule("ace/keyboard/vim", function(m) {

    var VimApi = require("ace/keyboard/vim").CodeMirror.Vim
      VimApi.defineEx("write", "w", function(cm, input) {
        cm.ace.execCommand("save")
        console.log("saving file")
    })
})

    EditorValue.subscribe((chg) => {
      if(chg === ""){
        console.log("changes empty")
        return
      }
      console.log("editor value changed")
      //window.wssHandle.send("set", { value: chg })
    })

    EditorTarget.subscribe((chg) => {
      console.log("editor target changed", chg, $EditorTarget)
      window.wssHandle.send("setfpath", { fpath: $EditorTarget })
      window.wssHandle.send("get", { fpath: $EditorTarget })
    })

    EditorFType.subscribe((lang) => {
      console.log("mode switched to", lang)
      window.handle.editor.session.setMode(`ace/mode/${lang}`)
    })

    window.wssHandle.socket.on("contents", (content) => {
      console.log("recieved content!", content)
      window.handle.editor.setValue(content)
    })


  });

  let filetypes = ["markdown", "python", "javascript", "clojure", "rust", "cpp"]
  let filetype = "markdown"

</script>

<div class="flex">
  <input
    class="w-full text-2xl bg-gray-800 text-white"
    type="text"
    bind:value={$EditorTarget}
  />
  <button class="w-24 text-2xl bg-gray-800 text-green-500" id="ncontext" on:click={() => resync()}> Save </button>
  <select class="text-2xl text-blue-500 bg-gray-800 capitalize" bind:value={$EditorFType}>
    {#each filetypes as filetype}
      <option value={filetype}>{filetype}</option>
    {/each}
  </select>

</div>
<div class="w-screen h-screen z-index-1" id="editor" />
