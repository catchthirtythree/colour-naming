#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use cn_lib::{ColourNaming, COLOUR_PAIRS, HexColourPair};
use serde::Serialize;

#[derive(Serialize)]
struct ColourInfo {
    hex: String,
    rgb: String,
    name: String,
}

#[tauri::command]
fn convert_hex_string(hex: String) -> Option<ColourInfo> {
    if let Ok(hex_value) = ColourNaming::to_hex_value_from_hex_string(hex.as_str()) {
        let rgb_bytes = ColourNaming::to_rgb_bytes_from_hex_value(hex_value);

        return Some(ColourInfo {
            hex: ColourNaming::to_hex_string_from_rgb_bytes(rgb_bytes),
            rgb: ColourNaming::to_rgb_string_from_rgb_bytes(rgb_bytes),
            name: ColourNaming::to_name_from_rgb_bytes(rgb_bytes),
        });
    }

    None
}

#[tauri::command]
fn convert_name_string(name: String) -> Option<ColourInfo> {
    if let Ok(hex_value) = ColourNaming::to_hex_value_from_name(name.as_str()) {
        let rgb_bytes = ColourNaming::to_rgb_bytes_from_hex_value(hex_value);

        return Some(ColourInfo {
            hex: ColourNaming::to_hex_string_from_rgb_bytes(rgb_bytes),
            rgb: ColourNaming::to_rgb_string_from_rgb_bytes(rgb_bytes),
            name: ColourNaming::to_name_from_rgb_bytes(rgb_bytes),
        });
    }

    None
}

#[tauri::command]
fn convert_rgb_string(r: u32, g: u32, b: u32) -> Option<ColourInfo> {
    let rgb_bytes = [r as u8, g as u8, b as u8];

    Some(ColourInfo {
        hex: ColourNaming::to_hex_string_from_rgb_bytes(rgb_bytes),
        rgb: ColourNaming::to_rgb_string_from_rgb_bytes(rgb_bytes),
        name: ColourNaming::to_name_from_rgb_bytes(rgb_bytes),
    })
}

#[tauri::command]
fn get_colours() -> [HexColourPair; 1566] {
    COLOUR_PAIRS
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
