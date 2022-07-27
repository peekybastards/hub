<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { EditorValue, EditorTarget, EditorFType, EditorModes } from "../stores/scratch.js";
  import { Editor, Connection } from "../core/editor.js"

  let fpath = "/home/iamfiasco";
  let wss;

  function open(){
    console.log("why did you come you asshole!")
    let newLoc = $EditorTarget
    window.wssHandle.send("setfpath", { fpath: $EditorTarget })
    window.wssHandle.send("get", {})
    window.wssHandle.socket.on("contents", (message) => {
      console.log("got content from backend")
      let contents = message.contents
      window.handle.editor.setValue(contents)
    })
  }

  function save(){
    wss.send("set", { value: $EditorValue})
  }

  function toggleNu(){
    window.handle.editor.renderer.setShowGutter(!showGutter)
    showGutter = !showGutter
  }
  
  function resizeFont(){
    let value = fontSize
    try{
      value = Number(value)
      console.log(value, "is the font size and please enjoy your meal")
      window.handle.editor.setOption("fontSize", `${value+1}pt`)
    }
    catch(e){
      window.handle.editor("fontSize", "18pt")
    }

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
        save()
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

  let filetype = "markdown"
  let showGutter = true
  let fontSize = 18

</script>

<div class="sticky top-0 flex space-around">
  <input
    class="w-2/3 text-2xl bg-gray-800 text-white"
    type="text"
    bind:value={$EditorTarget}
  />
  <select class="w-1/3 text-right text-2xl text-blue-500 bg-gray-800 capitalize" bind:value={$EditorFType}>
    {#each $EditorModes as filetype}
      <option value={filetype}>{filetype}</option>
    {/each}
  </select>
</div>

<div class="w-screen h-5/6 z-index-1" id="editor" />


<div class="flex justify-center items-center h-12 bg-gray-800 space-x-2">
  <div class="border-2 p-1 text-white" on:click={() => open()}>Ctrl+R</div>
  <div class="text-white border-2 p-1" on:click={() => toggleNu()}>:se nonu</div>
  <div class="text-white border-2 p-1" on:click={() => save()}>:w</div>
  <select class="w-32 text-white text-center border-2 p-1 bg-gray-800" bind:value={$EditorFType}>
    {#each $EditorModes as filetype}
      <option value={filetype}>{filetype}</option>
    {/each}
  </select>
  <input type="number" class="bg-gray-800 text-white border-2 p-1" bind:value={fontSize} on:change={() => resizeFont()} \>
</div>
