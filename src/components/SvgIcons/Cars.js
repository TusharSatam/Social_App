import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const Cars = ({isSelected}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={21} height={15} fill="none">
    <Path
      fill={isSelected ? 'white' : '#797979'}
      d="M20.644 6.463 18.66 4.62 16.9 1.1a1.68 1.68 0 0 0-1.44-.8H5.54a1.68 1.68 0 0 0-1.44.8L2.34 4.62.356 6.463A.8.8 0 0 0 .1 7.05v6.85a.8.8 0 0 0 .8.8h3.2c.32 0 .8-.32.8-.64v-.96h11.2v.8c0 .32.32.8.64.8h3.36a.8.8 0 0 0 .8-.8V7.05a.799.799 0 0 0-.256-.587ZM5.7 1.9h9.6l1.6 3.2H4.1l1.6-3.2Zm.8 7.36c0 .32-.48.64-.8.64H2.34c-.32 0-.64-.48-.64-.8V7.34c.16-.48.48-.8.96-.64l3.2.64c.32 0 .64.48.64.8v1.12Zm12.8-.16c0 .32-.32.8-.64.8H15.3c-.32 0-.8-.32-.8-.64V8.14c0-.32.32-.8.64-.8l3.2-.64c.48-.16.8.16.96.64V9.1Z"
    />
  </Svg>
);
export default Cars;
