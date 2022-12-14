use cn_lib::ColourNaming;
use clap::{Parser, Subcommand};

#[derive(Parser)]
struct Cli {
    #[clap(subcommand)]
    command: Command
}

#[derive(Subcommand)]
enum Command {
    Hex  { hex: String },
    Name { name: String },
    Rgb  { r: u8,  g: u8,  b: u8 },
    Hsl  { h: u32, s: u32, l: u32 },
}

fn main() {
    let cli = Cli::parse();

    match &cli.command {
        Command::Hex { hex } => {
            match ColourNaming::to_hex_value_from_hex_string(hex) {
                Ok(hex_value) => {
                    let rgb_bytes = ColourNaming::to_rgb_bytes_from_hex_value(hex_value);
                    let hsl_ratios = ColourNaming::to_hsl_ratios_from_rgb_bytes(rgb_bytes);
                    let hsl_values = ColourNaming::to_hsl_values_from_hsl_ratios(hsl_ratios);
                    println!("Hex:  {}", ColourNaming::to_hex_string_from_rgb_bytes(rgb_bytes));
                    println!("Name: {}", ColourNaming::to_name_from_rgb_bytes(rgb_bytes));
                    println!("RGB:  {}", ColourNaming::to_rgb_string_from_rgb_bytes(rgb_bytes));
                    println!("HSL:  {}", ColourNaming::to_hsl_string_from_hsl_values(hsl_values));
                },
                Err(err) => panic!("{:?}", err)
            }
        },

        Command::Name { name } => {
            match ColourNaming::to_hex_value_from_name(name) {
                Ok(hex_value) => {
                    let rgb_bytes = ColourNaming::to_rgb_bytes_from_hex_value(hex_value);
                    let hsl_ratios = ColourNaming::to_hsl_ratios_from_rgb_bytes(rgb_bytes);
                    let hsl_values = ColourNaming::to_hsl_values_from_hsl_ratios(hsl_ratios);
                    println!("Hex:  {}", ColourNaming::to_hex_string_from_rgb_bytes(rgb_bytes));
                    println!("Name: {}", ColourNaming::to_name_from_rgb_bytes(rgb_bytes));
                    println!("RGB:  {}", ColourNaming::to_rgb_string_from_rgb_bytes(rgb_bytes));
                    println!("HSL:  {}", ColourNaming::to_hsl_string_from_hsl_values(hsl_values));
                },
                Err(err) => panic!("{:?}", err)
            }
        }

        Command::Rgb { r, g, b } => {
            let rgb_bytes = [*r, *g, *b];
            let hsl_ratios = ColourNaming::to_hsl_ratios_from_rgb_bytes(rgb_bytes);
            let hsl_values = ColourNaming::to_hsl_values_from_hsl_ratios(hsl_ratios);
            println!("Hex:  {}", ColourNaming::to_hex_string_from_rgb_bytes(rgb_bytes));
            println!("Name: {}", ColourNaming::to_name_from_rgb_bytes(rgb_bytes));
            println!("RGB:  {}", ColourNaming::to_rgb_string_from_rgb_bytes(rgb_bytes));
            println!("HSL:  {}", ColourNaming::to_hsl_string_from_hsl_values(hsl_values));
        },

        Command::Hsl { h, s, l } => {
            // @TODO(michael): There's some loss when you go from hsl.
            // For example: Brilliant Rose, F653A6. The b is 2 units higher than if you
            // search for hex/name/rgb. I assume it's because of how we calculate the hue
            // down to its ratio.
            let hsl_values = [*h, *s, *l];
            let hsl_ratios = ColourNaming::to_hsl_ratios_from_hsl_values(hsl_values);
            let rgb_bytes = ColourNaming::to_rgb_bytes_from_hsl_ratios(hsl_ratios);
            println!("Hex:  {}", ColourNaming::to_hex_string_from_rgb_bytes(rgb_bytes));
            println!("Name: {}", ColourNaming::to_name_from_rgb_bytes(rgb_bytes));
            println!("RGB:  {}", ColourNaming::to_rgb_string_from_rgb_bytes(rgb_bytes));
            println!("HSL:  {}", ColourNaming::to_hsl_string_from_hsl_values(hsl_values));
        },
    }
}
