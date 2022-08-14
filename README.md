# Colour Naming

Based off of https://chir.ag/projects/name-that-color

## Directories

### cn-lib

Library for converting lists of bytes to other lists of bytes or strings and strings to lists of bytes.

### cn-cli

Command-line interface for interacting with `cn-lib`.

```
$ cargo run
cn-cli

USAGE:
    cn-cli.exe <SUBCOMMAND>

OPTIONS:
    -h, --help    Print help information

SUBCOMMANDS:
    help    Print this message or the help of the given subcommand(s)
    hex
    hsl
    name
    rgb
```

### cn-gui

GUI using tauri and React for converting hex, rgb and name among each other and getting colour info from pixels in an image.

![alt text](https://github.com/catchthirtythree/colour-naming/blob/master/res/cn-1.png)

![alt text](https://github.com/catchthirtythree/colour-naming/blob/master/res/cn-2.png)