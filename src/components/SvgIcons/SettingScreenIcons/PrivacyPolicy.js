import * as React from "react";
import Svg, {Path} from "react-native-svg";
const PrivactPolicy = props => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={22}
        fill="none"
        {...props}>
        <Path
            stroke="#FF4D67"
            strokeLinecap="round"
            strokeWidth={1.5}
            d="M4.773 8.887v-3.17a4.227 4.227 0 1 1 8.454 0v3.17"
        />
        <Path
            stroke="#FF4D67"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M.857 8.888h16.286v9.51a2.02 2.02 0 0 1-.681 1.494 2.45 2.45 0 0 1-1.646.619H3.184a2.45 2.45 0 0 1-1.645-.619 2.02 2.02 0 0 1-.682-1.494v-9.51Z"
        />
        <Path
            stroke="#FF4D67"
            strokeLinejoin="round"
            strokeWidth={2.25}
            d="M8.99 14.688H9v.01h-.01v-.01Z"
        />
    </Svg>
);
export default PrivactPolicy;
