import { invoke } from "@tauri-apps/api";
import { IColourInfo } from "../types/colour-info";

export async function convertHexToColour(hex: string): Promise<IColourInfo> {
  try {
    return await invoke<IColourInfo>('convert_hex_string', { hex });
  } catch (err) {
    throw new Error('Unhandled exception converting hex.');
  }
}

export async function convertNameToColour(name: string): Promise<IColourInfo> {
  try {
    return await invoke<IColourInfo>('convert_name_string', { name });
  } catch (err) {
    throw new Error('Unhandled exception converting name.');
  }
}

export async function convertRgbToColour(r: number, g: number, b: number): Promise<IColourInfo> {
  try {
    return await invoke<IColourInfo>('convert_rgb_string', {
      r, g, b
    });
  } catch (err) {
    throw new Error('Unhandled exception converting rgb.');
  }
}
