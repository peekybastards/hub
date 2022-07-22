<svelte:head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.8.1/ace.js" type="text/javascript" charset="utf-8"></script>
</svelte:head>

<script>
  import { onMount } from 'svelte';

  class Editor{
    constructor(){
      this.editor = ace.edit("editor")
      this.defaults()
    }
    defaults(){
      this.editor.setTheme("ace/theme/dracula")
      this.editor.setMode("ace/mode/javascript")
      this.editor.setOptions({
            showPrintMargin: false,
            fontSize: "16pt",
            wrapBehavioursEnabled: true
          })
    }
  }

  onMount(async () => {
    let handle = new Editor()
    handle.editor.setTheme("ace/theme/dracula")
    handle.editor.session.setMode("ace/mode/javascript")

    handle.editor.setKeyboardHandler('ace/keyboard/vim')

  })
</script>
<div class="w-full h-8"></div>
<div class="h-screen w-full" id="editor">
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
</div>

