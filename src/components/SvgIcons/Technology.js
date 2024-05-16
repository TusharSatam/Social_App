import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
const Technology = ({isSelected}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none">
    <G clipPath="url(#a)">
      <Path
        fill={isSelected ? 'white' : '#797979'}
        d="M9.461.5v3.174h1.078V.5H9.461Zm-4.402.954-.883.618 1.82 2.6.883-.62-1.82-2.598Zm9.882 0-1.82 2.599.883.618 1.82-2.599-.883-.618ZM10 4.542c-2.637 0-4.775 1.601-4.775 3.577l2.713 8.216h4.124l2.713-8.216c0-1.976-2.138-3.577-4.775-3.577Zm-8.576.953-.368 1.013 2.98 1.085.37-1.013-2.982-1.085Zm17.151 0L15.593 6.58l.369 1.014 2.982-1.086-.369-1.013ZM4.263 10.128l-3.065.822.278 1.04 3.065-.82-.278-1.042Zm11.474 0-.278 1.042 3.065.82.278-1.04-3.065-.822Zm-7.86 6.806v1.428h4.245v-1.428H7.878Zm0 2.138V20.5h4.245v-1.428H7.878Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={isSelected ? 'white' : '#797979'} d="M0 .5h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Technology;
