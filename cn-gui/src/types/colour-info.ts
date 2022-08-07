export interface IColourInfo {
  hex: string;
  rgb: string;
  name: string;
}

export class ColourInfo implements IColourInfo {
  hex: string;
  rgb: string;
  name: string;

  constructor(hex: string, rgb: string, name: string) {
    this.hex = hex;
    this.rgb = rgb;
    this.name = name;
  }
}
