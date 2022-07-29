#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use cn_lib::ColourNaming;
use serde::Serialize;

#[derive(Serialize)]
struct ColourInfo {
    hex: String,
    rgb: String,
    hsl: String,
    name: String,
}

#[tauri::command]
fn convert_hex_string(hex: String) -> ColourInfo {
    match ColourNaming::to_hex_value_from_hex_string(hex.as_str()) {
        Ok(hex_value) => {
            let rgb_bytes = ColourNaming::to_rgb_bytes_from_hex_value(hex_value);
            let hsl_ratios = ColourNaming::to_hsl_ratios_from_rgb_bytes(rgb_bytes);
            let hsl_values = ColourNaming::to_hsl_values_from_hsl_ratios(hsl_ratios);

            ColourInfo {
                hex: ColourNaming::to_hex_string_from_rgb_bytes(rgb_bytes),
                rgb: ColourNaming::to_rgb_string_from_rgb_bytes(rgb_bytes),
                hsl: ColourNaming::to_hsl_string_from_hsl_values(hsl_values),
                name: ColourNaming::to_name_from_rgb_bytes(rgb_bytes),
            }
        },
        Err(err) => panic!("{:?}", err),
    }
}

#[tauri::command]
fn convert_name_string(name: String) -> ColourInfo {
    match ColourNaming::to_hex_value_from_name(name.as_str()) {
        Ok(hex_value) => {
            let rgb_bytes = ColourNaming::to_rgb_bytes_from_hex_value(hex_value);
            let hsl_ratios = ColourNaming::to_hsl_ratios_from_rgb_bytes(rgb_bytes);
            let hsl_values = ColourNaming::to_hsl_values_from_hsl_ratios(hsl_ratios);

            ColourInfo {
                hex: ColourNaming::to_hex_string_from_rgb_bytes(rgb_bytes),
                rgb: ColourNaming::to_rgb_string_from_rgb_bytes(rgb_bytes),
                hsl: ColourNaming::to_hsl_string_from_hsl_values(hsl_values),
                name: ColourNaming::to_name_from_rgb_bytes(rgb_bytes),
            }
        },
        Err(err) => panic!("{:?}", err)
    }
}

#[tauri::command]
fn convert_rgb_string(r: u32, g: u32, b: u32) -> ColourInfo {
    let rgb_bytes = [r as u8, g as u8, b as u8];
    let hsl_ratios = ColourNaming::to_hsl_ratios_from_rgb_bytes(rgb_bytes);
    let hsl_values = ColourNaming::to_hsl_values_from_hsl_ratios(hsl_ratios);

    ColourInfo {
        hex: ColourNaming::to_hex_string_from_rgb_bytes(rgb_bytes),
        rgb: ColourNaming::to_rgb_string_from_rgb_bytes(rgb_bytes),
        hsl: ColourNaming::to_hsl_string_from_hsl_values(hsl_values),
        name: ColourNaming::to_name_from_rgb_bytes(rgb_bytes),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            convert_hex_string,
            convert_name_string,
            convert_rgb_string,
        ])
        .run(tauri::generate_context!())
        .expect("Error while running tauri application.");
}
