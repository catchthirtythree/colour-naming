import React from "react";
import { ColourInfo, IColourInfo } from "../types/colour-info";

import "./App.css";
import { Hex } from "./Hex";
import { Info } from "./Info";
import { Name } from "./Name";
import { Rgb } from "./Rgb";

export class App extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);

    this.state = {
      colour: new ColourInfo(
        '#4C4F56',
        'rgb(76, 79, 86)',
        'Abbey',
      )
    };
  }

  // componentDidMount() {
  //   const random = Math.round(Math.random() * ALL_PAIRS.length);
  //   const randomColour = ALL_PAIRS[random];

  //   convertNameToColour(randomColour.name).then(colour => {
  //     if (colour) {
  //       this.setState({ colour })
  //     }
  //   })
  // }

  render() {
    return (
      <div id="App_container">
        <div id="header">
          Name that Colour
        </div>

        <div id="content">
          <div id="inputs">
            <Hex
              colour={this.state.colour}
              onSetColour={(colour: IColourInfo) => this.setState({ colour })}
            />
            <Rgb
              colour={this.state.colour}
              onSetColour={(colour: IColourInfo) => this.setState({ colour })}
            />
            <Name
              colour={this.state.colour}
              onSetColour={(colour: IColourInfo) => this.setState({ colour })}
            />
          </div>

          <div id="result">
            <span id="text">Result:</span>
            <Info colour={this.state.colour} />
          </div>
        </div>
      </div>
    );
  }
}

// export function App(): ReactElement<any, any> {
//   const [colourInfo, setColourInfo] = useState<IColourInfo>(new ColourInfo(
//     '#4C4F56',
//     'rgb(76, 79, 86)',
//     'Abbey',
//   ));

//   useEffect(() => {
//     const random = Math.round(Math.random() * ALL_PAIRS.length);
//     const randomColour = ALL_PAIRS[random];

//     convertNameToColour(randomColour.name).then(colour => {
//       if (colour) {
//         setColourInfo(colour);
//       }
//     })
//   }, []);

//   return (
//     <div id="App_container">
//       <div id="header">
//         Name that Colour
//       </div>

//       <div id="content">
//         <div id="inputs">
//           <Hex colour={colourInfo} colourCallback={setColourInfo} />
//           <Rgb colour={colourInfo} colourCallback={setColourInfo} />
//           <Name colour={colourInfo} colourCallback={setColourInfo} />
//         </div>

//         <div id="result">
//           <span id="text">Result:</span>
//           <Info colour={colourInfo} />
//         </div>
//       </div>
//     </div>
//   );
// }
