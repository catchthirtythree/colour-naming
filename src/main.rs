mod lib;

use clap::{Parser, Subcommand};
use colour_naming::Hsla;
use crate::lib::{Rgba};

#[derive(Parser)]
struct Cli {
    #[clap(subcommand)]
    command: Commands
}

#[derive(Subcommand)]
enum Commands {
    Hex  { hex: String },
    Rgb  { r: u8,  g: u8,  b: u8 },
    Rgba { r: u8,  g: u8,  b: u8,  a: u8 },
    Hsl  { h: u32, s: f32, l: f32 },
    Hsla { h: u32, s: f32, l: f32, a: u8 },
    Name { name: String },
}

fn main() {
    let cli = Cli::parse();

    match &cli.command {
        Commands::Hex { hex } => {
            match Rgba::from_hex_str(hex) {
                Ok(rgba) => {
                    let hsla = rgba.to_hsla();
                    println!("HSLA => hsla({}°, {}%, {}%, {})", hsla.h, hsla.s, hsla.l, hsla.a);
                    println!("RGBA => rgba({}, {}, {}, {})", rgba.r, rgba.g, rgba.b, rgba.a);
                    println!("Hex  => {}", rgba.to_hex_str());
                    println!("Name => {}", rgba.to_name());
                },

                Err(err) => panic!("{:?}", err)
            }
        }

        Commands::Hsl { h, s, l } => {
            let hsla = Hsla::from_hsl(*h, *s, *l);
            let rgba = hsla.to_rgba();
            println!("HSLA => hsla({}°, {}%, {}%)", hsla.h, hsla.s, hsla.l);
            println!("RGBA => rgb({}, {}, {}, {})", rgba.r, rgba.g, rgba.b, rgba.a);
            println!("Hex  => {}", rgba.to_hex_str());
            println!("Name => {}", hsla.to_name());
        },

        Commands::Hsla { h, s, l, a } => {
            let hsla = Hsla::from_hsla(*h, *s, *l, *a);
            let rgba = hsla.to_rgba();
            println!("HSLA => hsla({}°, {}%, {}%, {})", hsla.h, hsla.s, hsla.l, hsla.a);
            println!("RGBA => rgb({}, {}, {}, {})", rgba.r, rgba.g, rgba.b, rgba.a);
            println!("Hex  => {}", rgba.to_hex_str());
            println!("Name => {}", hsla.to_name());
        },

        Commands::Rgb { r, g, b } => {
            let rgba = Rgba::from_rgb(*r, *g, *b);
            let hsla = rgba.to_hsla();
            println!("HSLA => hsla({}°, {}%, {}%, {})", hsla.h, hsla.s, hsla.l, hsla.a);
            println!("RGB  => rgb({}, {}, {})", rgba.r, rgba.g, rgba.b);
            println!("Hex  => {}", rgba.to_hex_str());
            println!("Name => {}", rgba.to_name());
        },

        Commands::Rgba { r, g, b, a } => {
            let rgba = Rgba::from_rgba(*r, *g, *b, *a);
            let hsla = rgba.to_hsla();
            println!("HSLA => hsla({}°, {}%, {}%, {})", hsla.h, hsla.s, hsla.l, hsla.a);
            println!("RGBA => rgba({}, {}, {}, {})", rgba.r, rgba.g, rgba.b, rgba.a);
            println!("Hex  => {}", rgba.to_hex_str());
            println!("Name => {}", rgba.to_name());
        },

        Commands::Name { name } => {
            // @TODO(michael): Brilliant Rose, F653A6, does not work. You get Mountain Meadow...
            let rgba = Rgba::from_name(name.to_string()).unwrap();
            let hsla = rgba.to_hsla();
            println!("HSLA => hsla({}°, {}%, {}%, {})", hsla.h, hsla.s, hsla.l, hsla.a);
            println!("RGBA => rgba({}, {}, {}, {})", rgba.r, rgba.g, rgba.b, rgba.a);
            println!("Hex  => {}", rgba.to_hex_str());
            println!("Name => {}", rgba.to_name());
        }
    }
}
