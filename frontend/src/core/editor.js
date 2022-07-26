class Editor {
  constructor(){
      this.editor = ace.edit("editor");
    }
    defaults() {
      this.setOptions({
        theme: "ace/theme/dracula",
        mode: "ace/mode/javascript",
        wrap: true,
        fontSize: "24pt",
        indentedSoftWrap: false,
        showPrintMargin: false,
        tabSize: 2,
      });

      //this.editor.setTheme("ace/theme/dracula")
      //this.editor.session.setMode("ace/mode/javascript")
      this.editor.setKeyboardHandler("ace/keyboard/vim");
      //this.editor.setOption("wrap", true)
      //this.editor.setOption("fontSize", "50pt")
      //this.editor.setOption("indentedSoftWrap", false)
    }
    setOption(key, value) {
      this.editor.setOption(key, value);
    }
    setOptions(opts) {
      this.editor.setOptions(opts);
    }
    fromJSON(data) {
      this.editor = ace.edit("editor");
      this.setOptions(data.options);
      this.editor.setValue(data.value);
      this.editor.setScrollTop(data.scrollTop);
      this.editor.setScrollLeft(data.scrollLeft);
    }
    close() {
      this.editor.destroy();
    }
    toJSON() {
      let session = this.editor.session;
      return {
        selection: this.editor.selection.toJSON(),
        value: this.editor.getValue(),
        //todo: remove this comment for enabling undo and redo stacks
        //history: {
        //  undo: session.$undoManager.$undoStack.map(filterHistory),
        //  redo: session.$undoManager.$redoStack.map(filterHistory),
        //},
        scrollTop: session.getScrollTop(),
        scrollLeft: session.getScrollLeft(),
        options: session.getOptions(),
      };
    }
    switchContent() {
      //console this is a hard pass
      this.wssSocket.emit("setfpath", fpath)
    }
    fromJSON(data) {
      let { selection, value, scrollTop, scrollLeft, options } = data;
      this.editor.setValue(value);
      this.editor.session.setOptions(options);
      this.editor.session.selection.fromJSON(selection);
      this.editor.session.setScrollTop(scrollTop);
      this.editor.session.setScrollLeft(scrollLeft);
    }
}

class Connection{
  constructor(){
    this.socket = io("ws://localhost:3000")
    this.socket.on("error", (err) => console.log(`err received ${err}`))
    this.socket.on("sucess", (err) => console.log(`success received ${err}`))
  }
  send(event, obj){
    this.socket.emit(event, obj)
  }
}

export { Editor, Connection };
