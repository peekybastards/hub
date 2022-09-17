<svelte:head>

   <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.10.1/ace.js" integrity="sha512-U/FB3cdRpCPIpdDLjvLQoqCiupCM95qGrIMZqb99+84XrRQp4EppJ0gfVZAL5kcI9owxxKxrMrrFDJP1RfKAXQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> 



</svelte:head>
<script>
  import { onMount } from "svelte";
  import { webSocket, Editor } from "../store"


  let modes = [
    {
        "name": "ABAP",
        "mode": "ace/mode/abap"
    },
    {
        "name": "ABC",
        "mode": "ace/mode/abc"
    },
    {
        "name": "ActionScript",
        "mode": "ace/mode/actionscript"
    },
    {
        "name": "ADA",
        "mode": "ace/mode/ada"
    },
    {
        "name": "Alda",
        "mode": "ace/mode/alda"
    },
    {
        "name": "Apache Conf",
        "mode": "ace/mode/apache_conf"
    },
    {
        "name": "Apex",
        "mode": "ace/mode/apex"
    },
    {
        "name": "AQL",
        "mode": "ace/mode/aql"
    },
    {
        "name": "AsciiDoc",
        "mode": "ace/mode/asciidoc"
    },
    {
        "name": "ASL",
        "mode": "ace/mode/asl"
    },
    {
        "name": "Assembly x86",
        "mode": "ace/mode/assembly_x86"
    },
    {
        "name": "AutoHotkey / AutoIt",
        "mode": "ace/mode/autohotkey"
    },
    {
        "name": "BatchFile",
        "mode": "ace/mode/batchfile"
    },
    {
        "name": "C and C++",
        "mode": "ace/mode/c_cpp"
    },
    {
        "name": "C9Search",
        "mode": "ace/mode/c9search"
    },
    {
        "name": "Cirru",
        "mode": "ace/mode/cirru"
    },
    {
        "name": "Clojure",
        "mode": "ace/mode/clojure"
    },
    {
        "name": "Cobol",
        "mode": "ace/mode/cobol"
    },
    {
        "name": "CoffeeScript",
        "mode": "ace/mode/coffee"
    },
    {
        "name": "ColdFusion",
        "mode": "ace/mode/coldfusion"
    },
    {
        "name": "Crystal",
        "mode": "ace/mode/crystal"
    },
    {
        "name": "C#",
        "mode": "ace/mode/csharp"
    },
    {
        "name": "Csound Document",
        "mode": "ace/mode/csound_document"
    },
    {
        "name": "Csound",
        "mode": "ace/mode/csound_orchestra"
    },
    {
        "name": "Csound Score",
        "mode": "ace/mode/csound_score"
    },
    {
        "name": "CSS",
        "mode": "ace/mode/css"
    },
    {
        "name": "Curly",
        "mode": "ace/mode/curly"
    },
    {
        "name": "D",
        "mode": "ace/mode/d"
    },
    {
        "name": "Dart",
        "mode": "ace/mode/dart"
    },
    {
        "name": "Diff",
        "mode": "ace/mode/diff"
    },
    {
        "name": "Dockerfile",
        "mode": "ace/mode/dockerfile"
    },
    {
        "name": "Dot",
        "mode": "ace/mode/dot"
    },
    {
        "name": "Drools",
        "mode": "ace/mode/drools"
    },
    {
        "name": "Edifact",
        "mode": "ace/mode/edifact"
    },
    {
        "name": "Eiffel",
        "mode": "ace/mode/eiffel"
    },
    {
        "name": "EJS",
        "mode": "ace/mode/ejs"
    },
    {
        "name": "Elixir",
        "mode": "ace/mode/elixir"
    },
    {
        "name": "Elm",
        "mode": "ace/mode/elm"
    },
    {
        "name": "Erlang",
        "mode": "ace/mode/erlang"
    },
    {
        "name": "Forth",
        "mode": "ace/mode/forth"
    },
    {
        "name": "Fortran",
        "mode": "ace/mode/fortran"
    },
    {
        "name": "FSharp",
        "mode": "ace/mode/fsharp"
    },
    {
        "name": "FSL",
        "mode": "ace/mode/fsl"
    },
    {
        "name": "FreeMarker",
        "mode": "ace/mode/ftl"
    },
    {
        "name": "Gcode",
        "mode": "ace/mode/gcode"
    },
    {
        "name": "Gherkin",
        "mode": "ace/mode/gherkin"
    },
    {
        "name": "Gitignore",
        "mode": "ace/mode/gitignore"
    },
    {
        "name": "Glsl",
        "mode": "ace/mode/glsl"
    },
    {
        "name": "Gobstones",
        "mode": "ace/mode/gobstones"
    },
    {
        "name": "Go",
        "mode": "ace/mode/golang"
    },
    {
        "name": "GraphQLSchema",
        "mode": "ace/mode/graphqlschema"
    },
    {
        "name": "Groovy",
        "mode": "ace/mode/groovy"
    },
    {
        "name": "HAML",
        "mode": "ace/mode/haml"
    },
    {
        "name": "Handlebars",
        "mode": "ace/mode/handlebars"
    },
    {
        "name": "Haskell",
        "mode": "ace/mode/haskell"
    },
    {
        "name": "Haskell Cabal",
        "mode": "ace/mode/haskell_cabal"
    },
    {
        "name": "haXe",
        "mode": "ace/mode/haxe"
    },
    {
        "name": "Hjson",
        "mode": "ace/mode/hjson"
    },
    {
        "name": "HTML",
        "mode": "ace/mode/html"
    },
    {
        "name": "HTML (Elixir)",
        "mode": "ace/mode/html_elixir"
    },
    {
        "name": "HTML (Ruby)",
        "mode": "ace/mode/html_ruby"
    },
    {
        "name": "INI",
        "mode": "ace/mode/ini"
    },
    {
        "name": "Io",
        "mode": "ace/mode/io"
    },
    {
        "name": "Ion",
        "mode": "ace/mode/ion"
    },
    {
        "name": "Jack",
        "mode": "ace/mode/jack"
    },
    {
        "name": "Jade",
        "mode": "ace/mode/jade"
    },
    {
        "name": "Java",
        "mode": "ace/mode/java"
    },
    {
        "name": "JavaScript",
        "mode": "ace/mode/javascript"
    },
    {
        "name": "JSON",
        "mode": "ace/mode/json"
    },
    {
        "name": "JSON5",
        "mode": "ace/mode/json5"
    },
    {
        "name": "JSONiq",
        "mode": "ace/mode/jsoniq"
    },
    {
        "name": "JSP",
        "mode": "ace/mode/jsp"
    },
    {
        "name": "JSSM",
        "mode": "ace/mode/jssm"
    },
    {
        "name": "JSX",
        "mode": "ace/mode/jsx"
    },
    {
        "name": "Julia",
        "mode": "ace/mode/julia"
    },
    {
        "name": "Kotlin",
        "mode": "ace/mode/kotlin"
    },
    {
        "name": "LaTeX",
        "mode": "ace/mode/latex"
    },
    {
        "name": "Latte",
        "mode": "ace/mode/latte"
    },
    {
        "name": "LESS",
        "mode": "ace/mode/less"
    },
    {
        "name": "Liquid",
        "mode": "ace/mode/liquid"
    },
    {
        "name": "Lisp",
        "mode": "ace/mode/lisp"
    },
    {
        "name": "LiveScript",
        "mode": "ace/mode/livescript"
    },
    {
        "name": "Log",
        "mode": "ace/mode/log"
    },
    {
        "name": "LogiQL",
        "mode": "ace/mode/logiql"
    },
    {
        "name": "LSL",
        "mode": "ace/mode/lsl"
    },
    {
        "name": "Lua",
        "mode": "ace/mode/lua"
    },
    {
        "name": "LuaPage",
        "mode": "ace/mode/luapage"
    },
    {
        "name": "Lucene",
        "mode": "ace/mode/lucene"
    },
    {
        "name": "Makefile",
        "mode": "ace/mode/makefile"
    },
    {
        "name": "Markdown",
        "mode": "ace/mode/markdown"
    },
    {
        "name": "Mask",
        "mode": "ace/mode/mask"
    },
    {
        "name": "MATLAB",
        "mode": "ace/mode/matlab"
    },
    {
        "name": "Maze",
        "mode": "ace/mode/maze"
    },
    {
        "name": "MediaWiki",
        "mode": "ace/mode/mediawiki"
    },
    {
        "name": "MEL",
        "mode": "ace/mode/mel"
    },
    {
        "name": "MIPS",
        "mode": "ace/mode/mips"
    },
    {
        "name": "MIXAL",
        "mode": "ace/mode/mixal"
    },
    {
        "name": "MUSHCode",
        "mode": "ace/mode/mushcode"
    },
    {
        "name": "MySQL",
        "mode": "ace/mode/mysql"
    },
    {
        "name": "Nginx",
        "mode": "ace/mode/nginx"
    },
    {
        "name": "Nim",
        "mode": "ace/mode/nim"
    },
    {
        "name": "Nix",
        "mode": "ace/mode/nix"
    },
    {
        "name": "NSIS",
        "mode": "ace/mode/nsis"
    },
    {
        "name": "Nunjucks",
        "mode": "ace/mode/nunjucks"
    },
    {
        "name": "Objective-C",
        "mode": "ace/mode/objectivec"
    },
    {
        "name": "OCaml",
        "mode": "ace/mode/ocaml"
    },
    {
        "name": "PartiQL",
        "mode": "ace/mode/partiql"
    },
    {
        "name": "Pascal",
        "mode": "ace/mode/pascal"
    },
    {
        "name": "Perl",
        "mode": "ace/mode/perl"
    },
    {
        "name": "pgSQL",
        "mode": "ace/mode/pgsql"
    },
    {
        "name": "PHP (Blade Template)",
        "mode": "ace/mode/php_laravel_blade"
    },
    {
        "name": "PHP",
        "mode": "ace/mode/php"
    },
    {
        "name": "Pig",
        "mode": "ace/mode/pig"
    },
    {
        "name": "Powershell",
        "mode": "ace/mode/powershell"
    },
    {
        "name": "Praat",
        "mode": "ace/mode/praat"
    },
    {
        "name": "Prisma",
        "mode": "ace/mode/prisma"
    },
    {
        "name": "Prolog",
        "mode": "ace/mode/prolog"
    },
    {
        "name": "Properties",
        "mode": "ace/mode/properties"
    },
    {
        "name": "Protobuf",
        "mode": "ace/mode/protobuf"
    },
    {
        "name": "Puppet",
        "mode": "ace/mode/puppet"
    },
    {
        "name": "Python",
        "mode": "ace/mode/python"
    },
    {
        "name": "QML",
        "mode": "ace/mode/qml"
    },
    {
        "name": "R",
        "mode": "ace/mode/r"
    },
    {
        "name": "Raku",
        "mode": "ace/mode/raku"
    },
    {
        "name": "Razor",
        "mode": "ace/mode/razor"
    },
    {
        "name": "RDoc",
        "mode": "ace/mode/rdoc"
    },
    {
        "name": "Red",
        "mode": "ace/mode/red"
    },
    {
        "name": "RHTML",
        "mode": "ace/mode/rhtml"
    },
    {
        "name": "Robot",
        "mode": "ace/mode/robot"
    },
    {
        "name": "RST",
        "mode": "ace/mode/rst"
    },
    {
        "name": "Ruby",
        "mode": "ace/mode/ruby"
    },
    {
        "name": "Rust",
        "mode": "ace/mode/rust"
    },
    {
        "name": "SaC",
        "mode": "ace/mode/sac"
    },
    {
        "name": "SASS",
        "mode": "ace/mode/sass"
    },
    {
        "name": "SCAD",
        "mode": "ace/mode/scad"
    },
    {
        "name": "Scala",
        "mode": "ace/mode/scala"
    },
    {
        "name": "Scheme",
        "mode": "ace/mode/scheme"
    },
    {
        "name": "Scrypt",
        "mode": "ace/mode/scrypt"
    },
    {
        "name": "SCSS",
        "mode": "ace/mode/scss"
    },
    {
        "name": "SH",
        "mode": "ace/mode/sh"
    },
    {
        "name": "SJS",
        "mode": "ace/mode/sjs"
    },
    {
        "name": "Slim",
        "mode": "ace/mode/slim"
    },
    {
        "name": "Smarty",
        "mode": "ace/mode/smarty"
    },
    {
        "name": "Smithy",
        "mode": "ace/mode/smithy"
    },
    {
        "name": "snippets",
        "mode": "ace/mode/snippets"
    },
    {
        "name": "Soy Template",
        "mode": "ace/mode/soy_template"
    },
    {
        "name": "Space",
        "mode": "ace/mode/space"
    },
    {
        "name": "SQL",
        "mode": "ace/mode/sql"
    },
    {
        "name": "SQLServer",
        "mode": "ace/mode/sqlserver"
    },
    {
        "name": "Stylus",
        "mode": "ace/mode/stylus"
    },
    {
        "name": "SVG",
        "mode": "ace/mode/svg"
    },
    {
        "name": "Swift",
        "mode": "ace/mode/swift"
    },
    {
        "name": "Tcl",
        "mode": "ace/mode/tcl"
    },
    {
        "name": "Terraform",
        "mode": "ace/mode/terraform"
    },
    {
        "name": "Tex",
        "mode": "ace/mode/tex"
    },
    {
        "name": "Text",
        "mode": "ace/mode/text"
    },
    {
        "name": "Textile",
        "mode": "ace/mode/textile"
    },
    {
        "name": "Toml",
        "mode": "ace/mode/toml"
    },
    {
        "name": "TSX",
        "mode": "ace/mode/tsx"
    },
    {
        "name": "Twig",
        "mode": "ace/mode/twig"
    },
    {
        "name": "Typescript",
        "mode": "ace/mode/typescript"
    },
    {
        "name": "Vala",
        "mode": "ace/mode/vala"
    },
    {
        "name": "VBScript",
        "mode": "ace/mode/vbscript"
    },
    {
        "name": "Velocity",
        "mode": "ace/mode/velocity"
    },
    {
        "name": "Verilog",
        "mode": "ace/mode/verilog"
    },
    {
        "name": "VHDL",
        "mode": "ace/mode/vhdl"
    },
    {
        "name": "Visualforce",
        "mode": "ace/mode/visualforce"
    },
    {
        "name": "Wollok",
        "mode": "ace/mode/wollok"
    },
    {
        "name": "XML",
        "mode": "ace/mode/xml"
    },
    {
        "name": "XQuery",
        "mode": "ace/mode/xquery"
    },
    {
        "name": "YAML",
        "mode": "ace/mode/yaml"
    },
    {
        "name": "Zeek",
        "mode": "ace/mode/zeek"
    },
    {
        "name": "Django",
        "mode": "ace/mode/django"
    }
  ]


  let themes = [
    {
        "name": "Chrome",
        "theme": "ace/theme/chrome"
    },
    {
        "name": "Clouds",
        "theme": "ace/theme/clouds"
    },
    {
        "name": "Crimson Editor",
        "theme": "ace/theme/crimson_editor"
    },
    {
        "name": "Dawn",
        "theme": "ace/theme/dawn"
    },
    {
        "name": "Dreamweaver",
        "theme": "ace/theme/dreamweaver"
    },
    {
        "name": "Eclipse",
        "theme": "ace/theme/eclipse"
    },
    {
        "name": "GitHub",
        "theme": "ace/theme/github"
    },
    {
        "name": "IPlastic",
        "theme": "ace/theme/iplastic"
    },
    {
        "name": "Solarized Light",
        "theme": "ace/theme/solarized_light"
    },
    {
        "name": "TextMate",
        "theme": "ace/theme/textmate"
    },
    {
        "name": "Tomorrow",
        "theme": "ace/theme/tomorrow"
    },
    {
        "name": "XCode",
        "theme": "ace/theme/xcode"
    },
    {
        "name": "Kuroir",
        "theme": "ace/theme/kuroir"
    },
    {
        "name": "KatzenMilch",
        "theme": "ace/theme/katzenmilch"
    },
    {
        "name": "SQL Server",
        "theme": "ace/theme/sqlserver"
    },
    {
        "name": "Ambiance",
        "theme": "ace/theme/ambiance"
    },
    {
        "name": "Chaos",
        "theme": "ace/theme/chaos"
    },
    {
        "name": "Clouds Midnight",
        "theme": "ace/theme/clouds_midnight"
    },
    {
        "name": "Dracula",
        "theme": "ace/theme/dracula"
    },
    {
        "name": "Cobalt",
        "theme": "ace/theme/cobalt"
    },
    {
        "name": "Gruvbox",
        "theme": "ace/theme/gruvbox"
    },
    {
        "name": "Green on Black",
        "theme": "ace/theme/gob"
    },
    {
        "name": "idle Fingers",
        "theme": "ace/theme/idle_fingers"
    },
    {
        "name": "krTheme",
        "theme": "ace/theme/kr_theme"
    },
    {
        "name": "Merbivore",
        "theme": "ace/theme/merbivore"
    },
    {
        "name": "Merbivore Soft",
        "theme": "ace/theme/merbivore_soft"
    },
    {
        "name": "Mono Industrial",
        "theme": "ace/theme/mono_industrial"
    },
    {
        "name": "Monokai",
        "theme": "ace/theme/monokai"
    },
    {
        "name": "Nord Dark",
        "theme": "ace/theme/nord_dark"
    },
    {
        "name": "One Dark",
        "theme": "ace/theme/one_dark"
    },
    {
        "name": "Pastel on dark",
        "theme": "ace/theme/pastel_on_dark"
    },
    {
        "name": "Solarized Dark",
        "theme": "ace/theme/solarized_dark"
    },
    {
        "name": "Terminal",
        "theme": "ace/theme/terminal"
    },
    {
        "name": "Tomorrow Night",
        "theme": "ace/theme/tomorrow_night"
    },
    {
        "name": "Tomorrow Night Blue",
        "theme": "ace/theme/tomorrow_night_blue"
    },
    {
        "name": "Tomorrow Night Bright",
        "theme": "ace/theme/tomorrow_night_bright"
    },
    {
        "name": "Tomorrow Night 80s",
        "theme": "ace/theme/tomorrow_night_eighties"
    },
    {
        "name": "Twilight",
        "theme": "ace/theme/twilight"
    },
    {
        "name": "Vibrant Ink",
        "theme": "ace/theme/vibrant_ink"
    }
  ]
  let fpath = "/home/iamfiasco/deardiary/today.md"
  let data = ""
  const engageSocket = () => {
    let socket = $webSocket
    socket
      .on("ace:contents", (data) => {
          if(data.success === true && data.error === false)
            editor.setValue(data.contents)
        })
      .on("ace:list", (data) => {
          if(data.success === true && data.error === false){
              //handle autosuggestions
            }
        })
      .on("ace:write", (data) => {
          if(data.success === true && data.error === false){
              //wrote contents to file
              console.log("wrote buffer to target")
            }
        })
  }
  
  const scrollToContent = () => {
      document.getElementById("editor").scrollIntoView()
    }

  onMount(() => {
    let editor = ace.edit("editor")
    $Editor = editor
    setTimeout(() => {
        engageSocket()
        loadDefaults()
        scrollToContent()
        setVim()
      }, 1000)
  })

  let themeValue = "ace/theme/dracula"
  let modeValue = "ace/mode/markdown"
  let fontSizeValue = "15pt"

  const setVim = () => {
    window.editor = $Editor
    $Editor.setKeyboardHandler("ace/keyboard/vim")
  }
  const loadDefaults = () => {
      $Editor.setOptions({
          showPrintMargin: false,
          theme: "ace/theme/dracula",
          fontSize: "15pt",
        })
      //todo: change to dynamic
      //$Editor.session.setMode("ace/mode/markdown")
  }
  const setMode = () => {
    $Editor.session.setMode(modeValue)
  }
  const changeFontSize = (inc) => {
    let currentVals = $Editor.getOptions()
    let fontSize = currentVals.fontSize.replaceAll("pt", "")
    fontSize = Number(fontSize)
    fontSizeValue = `${fontSize + inc}pt`
    $Editor.setOption("fontSize", fontSizeValue)
    //fontSize = Number(fontSize)
  }
  const setTheme = () => {
    $Editor.setOption("theme", themeValue)
  }

</script>

<div class="w-full h-screen flex flex-col bg-white">
  <div id="editor" class="w-full h-screen">
  </div>
  <div class="w-full flex justify-around bg-gray-800 gap-2 h-24 items-center">
    <div class="p-2 font-mono border-2 rounded text-white hover:border-blue-600">
      {fpath}
    </div>
    <div class="p-2 font-mono border-2 rounded hover:border-blue-600">
      <select class="bg-gray-800 text-white" id="theme" bind:value={themeValue} on:change={() => setTheme()}>
        {#each themes as theme }
          <option class="text-center" value={theme.theme}>{theme.name}</option>
        {/each}
      </select>


    </div>
    <div class="p-2 font-mono border-2 rounded hover:border-blue-600">
      <select class="bg-gray-800 text-white" id="mode" bind:value={modeValue} on:change={() => setMode()}>
        {#each modes as mode }
          <option class="text-center" value={mode.mode}>{mode.name}</option>
        {/each}
      </select>
    </div>
    <div class="flex gap-2 p-2 border-2 rounded hover:border-blue-600">
      <button class="p-2 font-mono font-bold text-white" on:click={() => changeFontSize(1)}> + </button>
      <div class="p-2 font-mono font-bold text-white"> {fontSizeValue} </div>
      <button class="p-2 font-mono font-bold text-white" on:click={() => changeFontSize(-1)}> - </button>
    </div>

  </div>
</div>



