import Svg, {G, Path, Defs, ClipPath} from "react-native-svg";
const PostTabIcon = props => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={23}
        fill="none"
        {...props}>
        <G strokeWidth={1.9} clipPath="url(#a)">
            <Path
                fill={props?.isActive?"black":"#797979"}
                stroke={props?.isActive?"black":"#797979"}
                d="M17.942 1.406H6.508A4.124 4.124 0 0 0 2.384 5.53v11.434a4.124 4.124 0 0 0 4.124 4.124h11.434a4.124 4.124 0 0 0 4.124-4.124V5.53a4.124 4.124 0 0 0-4.124-4.124Z"
            />
            <Path
                stroke="#fff"
                d="M13.001.63v21.234M13.505 13.795l9.341.003M1.607 8.61h11.037"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M.975 0h22.05v22.05H.975z" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default PostTabIcon;
