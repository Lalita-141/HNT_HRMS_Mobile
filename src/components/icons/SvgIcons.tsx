import React from 'react';
import Svg, {
    Path,
    Circle,
    Rect,
    G,
    Line,
    Polyline,
} from 'react-native-svg';

interface IconProps {
    size?: number;
    color?: string;
}

export const MenuIcon: React.FC<IconProps> = ({ size = 24, color = '#0F172A' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M4 6H20M4 12H20M4 18H20"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const BellIcon: React.FC<IconProps> = ({ size = 24, color = '#0F172A' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M13.73 21a2 2 0 0 1-3.46 0"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const HomeIcon: React.FC<IconProps> = ({ size = 22, color = '#64748B' }) => (
    <Svg width={size} height={size} viewBox="40.5 19.5 24 24" fill="none">
        <Path
            d="M62.1138 26.9778L54.7809 21.2795C54.1374 20.7794 53.3453 20.5078 52.53 20.5078C51.7147 20.5078 50.9227 20.7794 50.2792 21.2795L42.9449 26.9778C42.5041 27.3202 42.1475 27.7588 41.9023 28.2599C41.6571 28.7611 41.5298 29.3116 41.53 29.8695V39.7603C41.53 40.489 41.8198 41.1879 42.3355 41.7031C42.8512 42.2184 43.5507 42.5078 44.28 42.5078H60.78C61.5094 42.5078 62.2088 42.2184 62.7246 41.7031C63.2403 41.1879 63.53 40.489 63.53 39.7603V29.8695C63.53 28.7389 63.0075 27.6715 62.1138 26.9778Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M58.53 35.5078C55.4913 36.8411 50.566 36.8411 47.53 35.5078"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const ClockIcon: React.FC<IconProps> = ({ size = 22, color = '#64748B' }) => (
    <Svg width={size} height={size} viewBox="112.5 30 24 24" fill="none">
        <Path
            d="M114.337 46.2095C113.785 44.8749 113.5 43.4445 113.5 42C113.5 40.5555 113.785 39.1251 114.337 37.7905C114.89 36.4559 115.7 35.2433 116.722 34.2218C117.743 33.2004 118.956 32.3901 120.29 31.8373C121.625 31.2845 123.055 31 124.5 31C125.945 31 127.375 31.2845 128.71 31.8373C130.044 32.3901 131.257 33.2004 132.278 34.2218C133.3 35.2433 134.11 36.4559 134.663 37.7905C135.215 39.1251 135.5 40.5555 135.5 42C135.5 43.4445 135.215 44.8749 134.663 46.2095C134.11 47.5441 133.3 48.7567 132.278 49.7782C131.257 50.7996 130.044 51.6099 128.71 52.1627C127.375 52.7155 125.945 53 124.5 53C123.055 53 121.625 52.7155 120.29 52.1627C118.956 51.6099 117.743 50.7996 116.722 49.7782C115.7 48.7567 114.89 47.5441 114.337 46.2095Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path d="M124.5 42L128.5 44" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M124.5 36V42" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const DocumentIcon: React.FC<IconProps> = ({ size = 22, color = '#64748B' }) => (
    <Svg width={size} height={size} viewBox="184 30 24 24" fill="none">
        <Path
            d="M199 31V35.8C199 36.1183 199.126 36.4235 199.351 36.6485C199.577 36.8736 199.882 37 200.2 37H205"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M202.571 53H190.429C189.784 53 189.167 52.7425 188.711 52.284C188.256 51.8256 188 51.2039 188 50.5556V33.4444C188 32.7961 188.256 32.1744 188.711 31.716C189.167 31.2575 189.784 31 190.429 31H198.929L205 37.1111V50.5556C205 51.2039 204.744 51.8256 204.289 52.284C203.833 52.7425 203.216 53 202.571 53Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M193 45.5L195.333 48L200 43"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ size = 22, color = '#64748B' }) => (
    <Svg width={size} height={size} viewBox="255 30 24 24" fill="none">
        <Path
            d="M258.472 35.8898C258.472 35.2414 258.73 34.6197 259.188 34.1613C259.647 33.7029 260.268 33.4453 260.917 33.4453H275.583C276.232 33.4453 276.853 33.7029 277.312 34.1613C277.77 34.6197 278.028 35.2414 278.028 35.8898V50.5564C278.028 51.2047 277.77 51.8265 277.312 52.2849C276.853 52.7433 276.232 53.0009 275.583 53.0009H260.917C260.268 53.0009 259.647 52.7433 259.188 52.2849C258.73 51.8265 258.472 51.2047 258.472 50.5564V35.8898Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path d="M273.139 31V35.8889" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M263.361 31V35.8889" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M258.472 40.7773H278.028" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M262.139 44.4453H262.155" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M265.818 44.4453H265.824" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M269.484 44.4453H269.49" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M273.157 44.4453H273.163" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M269.49 48.1113H269.497" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M262.151 48.1113H262.157" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M265.818 48.1113H265.824" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const UserIcon: React.FC<IconProps> = ({ size = 22, color = '#64748B' }) => (
    <Svg width={size} height={size} viewBox="328 30 24 24" fill="none">
        <Path
            d="M340.66 39.87C340.56 39.86 340.44 39.86 340.33 39.87C337.951 39.79 336.061 37.84 336.061 35.44C336.061 32.99 338.041 31 340.5 31C342.95 31 344.94 32.99 344.94 35.44C344.93 37.84 343.04 39.79 340.66 39.87Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M333.995 43.7509C330.801 45.8176 330.801 49.1856 333.995 51.2395C337.624 53.5868 343.576 53.5868 347.205 51.2395C350.398 49.1728 350.398 45.8049 347.205 43.7509C343.589 41.4164 337.637 41.4164 333.995 43.7509Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);


export const LocationPinIcon: React.FC<IconProps> = ({ size = 20, color = '#1D68ED' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2" />
    </Svg>
);

export const OfficeBuildingIcon: React.FC<IconProps> = ({ size = 18, color = '#16A34A' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M3 21H21M5 21V7L13 3V21M19 21V11L13 7M9 9V9.01M9 12V12.01M9 15V15.01M9 18V18.01"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const CoffeeIcon: React.FC<IconProps> = ({ size = 20, color = '#FE7717' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M18 8H19C20.1046 8 21 8.89543 21 10C21 11.1046 20.1046 12 19 12H18"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
        />
        <Path
            d="M2 8H18V14C18 16.2091 16.2091 18 14 18H6C3.79086 18 2 16.2091 2 14V8Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path d="M6 2V4M10 2V4M14 2V4M2 22H18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 18, color = '#94A3B8' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M9 18L15 12L9 6"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const TrendingUpIcon: React.FC<IconProps> = ({ size = 16, color = '#16A34A' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Polyline
            points="23 6 13.5 15.5 8.5 10.5 1 18"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Polyline
            points="17 6 23 6 23 12"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const EyeIcon: React.FC<IconProps> = ({ size = 22, color = '#64748B' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M2.5 13C4.5 7.5 8 4.5 12 4.5C16 4.5 19.5 7.5 21.5 13"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Circle
            cx="12"
            cy="14"
            r="4"
            stroke={color}
            strokeWidth="2"
        />
    </Svg>
);

export const EyeOffIcon: React.FC<IconProps> = ({ size = 22, color = '#64748B' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M2.5 13C4.5 7.5 8 4.5 12 4.5C16 4.5 19.5 7.5 21.5 13"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Circle
            cx="12"
            cy="14"
            r="4"
            stroke={color}
            strokeWidth="2"
        />
        <Line
            x1="3"
            y1="3"
            x2="21"
            y2="21"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
        />
    </Svg>
);

export const UsersGroupIcon: React.FC<IconProps> = ({ size = 20, color = '#16A34A' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2" />
        <Path
            d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const UserPlusIcon: React.FC<IconProps> = ({ size = 20, color = '#FE7717' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Circle cx="8.5" cy="7" r="4" stroke={color} strokeWidth="2" />
        <Line x1="20" y1="8" x2="20" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Line x1="23" y1="11" x2="17" y2="11" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
);

export const AirplaneIcon: React.FC<IconProps> = ({ size = 20, color = '#1D68ED' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"
            fill={color}
        />
    </Svg>
);

export const HomeBuildingIcon: React.FC<IconProps> = ({ size = 20, color = '#E11D48' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M3 9.5L12 2.5L21 9.5V20.5C21 21.0523 20.5523 21.5 20 21.5H4C3.44772 21.5 3 21.0523 3 20.5V9.5Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M9 21.5V12H15V21.5"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const LeafIcon: React.FC<IconProps> = ({ size = 18, color = '#16A34A' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path d="M2 21c0-3 1.85-5.36 5.08-6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
);

export const RefreshCcwIcon: React.FC<IconProps> = ({ size = 18, color = '#1D68ED' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Polyline points="1 4 1 10 7 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Polyline points="23 20 23 14 17 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path
            d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const PlusCircleIcon: React.FC<IconProps> = ({ size = 18, color = '#EC4899' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
        <Line x1="12" y1="8" x2="12" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Line x1="8" y1="12" x2="16" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
);

export const AwardIcon: React.FC<IconProps> = ({ size = 18, color = '#F59E0B' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="8" r="7" stroke={color} strokeWidth="2" />
        <Polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const FileTextIcon: React.FC<IconProps> = ({ size = 18, color = '#8B5CF6' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Polyline points="14 2 14 8 20 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Line x1="16" y1="13" x2="8" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Line x1="16" y1="17" x2="8" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Line x1="10" y1="9" x2="8" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
);

export const BarChartIcon: React.FC<IconProps> = ({ size = 18, color = '#E11D48' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Line x1="12" y1="20" x2="12" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Line x1="18" y1="20" x2="18" y2="4" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Line x1="6" y1="20" x2="6" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
);

export const TaskDocIcon: React.FC<IconProps> = ({ size = 16, color = '#8B5CF6' }) => (
    <Svg width={size} height={(size * 17) / 14} viewBox="0 0 14 17" fill="none">
        <Path
            d="M4.16659 8.33398H9.16658M4.16659 11.6673H9.16658M10.8333 15.834H2.49992C1.57944 15.834 0.833252 15.0878 0.833252 14.1673V2.50065C0.833252 1.58018 1.57944 0.833984 2.49992 0.833984H7.15492C7.37591 0.834032 7.58784 0.92186 7.74409 1.07815L12.2558 5.58982C12.412 5.74606 12.4999 5.95799 12.4999 6.17898V14.1673C12.4999 15.0878 11.7537 15.834 10.8333 15.834"
            stroke={color}
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ size = 14, color = '#2A9246' }) => (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <Path
            d="M3.33331 8H12.6666M12.6666 8L8.66665 4M12.6666 8L8.66665 12"
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const BirthdayCakeIcon: React.FC<IconProps> = ({ size = 28, color = '#E11D48' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {/* Candle Flame & Wick */}
        <Path
            d="M12 2C11.5 2.7 11.2 3.4 11.2 4.2C11.2 5 11.6 5.6 12 5.6C12.4 5.6 12.8 5 12.8 4.2C12.8 3.4 12.5 2.7 12 2Z"
            fill={color}
        />
        <Line x1="12" y1="5.6" x2="12" y2="7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />

        {/* Top Cake Tier with scalloped bottom */}
        <Path
            d="M7 9C7 8.17 7.67 7.5 8.5 7.5H15.5C16.33 7.5 17 8.17 17 9V11.5C17 11.5 16.2 12.5 15.2 11.8C14.2 11.1 13.4 12.5 12 12.5C10.6 12.5 9.8 11.1 8.8 11.8C7.8 12.5 7 11.5 7 11.5V9Z"
            fill={color}
        />

        {/* Bottom Cake Tier with decorative wave cutouts */}
        <Path
            d="M4 14C4 13.17 4.67 12.5 5.5 12.5H18.5C19.33 12.5 20 13.17 20 14V18.5C20 19.33 19.33 20 18.5 20H5.5C4.67 20 4 19.33 4 18.5V14Z"
            fill={color}
        />
        {/* Frosting wave on bottom tier */}
        <Path
            d="M4 15.2C5.6 16.8 7.2 14.8 9.2 16.2C11.2 17.6 12.8 15.2 14.8 16.2C16.8 17.2 18.4 15.2 20 15.2"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
        />

        {/* Base tray */}
        <Line x1="3" y1="21" x2="21" y2="21" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </Svg>
);

export const PartyPopperIcon: React.FC<{ size?: number }> = ({ size = 22 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {/* Popper Cone */}
        <Path
            d="M4.5 19.5L11 16L7.5 12.5L4.5 19.5Z"
            fill="#F43F5E"
            stroke="#E11D48"
            strokeWidth="1.2"
            strokeLinejoin="round"
        />
        {/* Colorful Confetti Streams & Sparks */}
        <Path d="M12 11.5L15 8" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" />
        <Path d="M11 6.5L13.5 3.5" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />
        <Path d="M15.5 14L18.5 12.5" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" />
        {/* Confetti Sparks */}
        <Circle cx="17.5" cy="5.5" r="1.5" fill="#F59E0B" />
        <Circle cx="19" cy="9.5" r="1.3" fill="#EC4899" />
        <Circle cx="10" cy="3" r="1.2" fill="#8B5CF6" />
    </Svg>
);

export const HeartFillIcon: React.FC<IconProps> = ({ size = 18, color = '#FF2D55' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
            fill={color}
        />
    </Svg>
);

export const SnapshotTeamMembersIcon: React.FC<IconProps> = ({ size = 18, color = '#228549' }) => (
    <Svg width={size} height={(size * 14) / 18} viewBox="0 0 18 14" fill="none">
        <Path
            d="M8 3C8 4.65575 6.65575 6 5 6C3.34425 6 2 4.65575 2 3C2 1.34425 3.34425 0 5 0C6.65575 0 8 1.34425 8 3ZM16 3C16 4.65575 14.6557 6 13 6C11.3443 6 10 4.65575 10 3C10 1.34425 11.3443 0 13 0C14.6557 0 16 1.34425 16 3ZM11.93 14C11.976 13.673 12 13.34 12 13C12.0023 11.4289 11.4737 9.90302 10.5 8.67C12.047 7.77685 13.9529 7.77684 15.4999 8.66997C17.0469 9.5631 18 11.2137 18 13V14H11.93ZM5 8C7.75957 8 10 10.2404 10 13V14H0V13C0 10.2404 2.24042 8 5 8Z"
            fill={color}
        />
    </Svg>
);

export const SnapshotPresentIcon: React.FC<IconProps> = ({ size = 14, color = '#209F58' }) => (
    <Svg width={size} height={(size * 15) / 14} viewBox="0 0 14 15" fill="none">
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 6C8.65574 6 10 4.65575 10 3C10 1.34425 8.65574 0 7 0C5.34425 0 4 1.34425 4 3C4 4.65575 5.34425 6 7 6ZM0 15C0 11.1366 3.13659 8 7 8C10.8634 8 14 11.1366 14 15H0Z"
            fill={color}
        />
    </Svg>
);

export const SnapshotLeaveIcon: React.FC<IconProps> = ({ size = 16, color = '#D97706' }) => (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <Path
            d="M13.9999 10.6673V9.33398L8.66659 6.00065V2.33398C8.66659 1.78065 8.21992 1.33398 7.66659 1.33398C7.11325 1.33398 6.66659 1.78065 6.66659 2.33398V6.00065L1.33325 9.33398V10.6673L6.66659 9.00065V12.6673L5.33325 13.6673V14.6673L7.66659 14.0007L9.99992 14.6673V13.6673L8.66659 12.6673V9.00065L13.9999 10.6673Z"
            fill={color}
        />
    </Svg>
);

export const SnapshotWfhIcon: React.FC<IconProps> = ({ size = 16, color = '#2563EB' }) => (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <Path
            d="M8.69471 0.292786C8.30421 -0.0975955 7.67121 -0.0975955 7.28071 0.292786L0.280712 7.29279C-0.0982602 7.68517 -0.0928404 8.30887 0.292893 8.6946C0.678627 9.08034 1.30233 9.08576 1.69471 8.70679L1.98771 8.41379V14.9998C1.98771 15.5517 2.4358 15.9998 2.98771 15.9998H4.98771C5.53963 15.9998 5.98771 15.5517 5.98771 14.9998V12.9998C5.98771 12.4479 6.4358 11.9998 6.98771 11.9998H8.98771C9.53963 11.9998 9.98771 12.4479 9.98771 12.9998V14.9998C9.98771 15.5517 10.4358 15.9998 10.9877 15.9998H12.9877C13.5396 15.9998 13.9877 15.5517 13.9877 14.9998V8.41379L14.2807 8.70679C14.6731 9.08576 15.2968 9.08034 15.6825 8.6946C16.0683 8.30887 16.0737 7.68517 15.6947 7.29279L8.69471 0.292786Z"
            fill={color}
        />
    </Svg>
);

export const SnapshotAbsentIcon: React.FC<IconProps> = ({ size = 14, color = '#F43F5E' }) => (
    <Svg width={size} height={(size * 15) / 14} viewBox="0 0 14 15" fill="none">
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 6C8.65574 6 10 4.65575 10 3C10 1.34425 8.65574 0 7 0C5.34425 0 4 1.34425 4 3C4 4.65575 5.34425 6 7 6ZM0 15C0 11.1366 3.13659 8 7 8C10.8634 8 14 11.1366 14 15H0Z"
            fill={color}
        />
    </Svg>
);

export const FlightApprovalIcon: React.FC<IconProps> = ({ size = 18, color = '#1E293B' }) => (
    <Svg width={size} height={size} viewBox="0 0 19 19" fill="none">
        <Path
            d="M14.7201 7.46883L17.542 4.81383L17.5541 4.80164C18.0816 4.27415 18.378 3.55872 18.378 2.81274C18.378 2.06675 18.0816 1.35132 17.5541 0.823832C17.0267 0.296341 16.3112 0 15.5652 0C14.8193 0 14.1038 0.296341 13.5763 0.823832L13.5641 0.83602L10.9091 3.65789L3.00602 0.784457C2.90551 0.747863 2.79665 0.740685 2.69221 0.763766C2.58776 0.786847 2.49206 0.839229 2.41633 0.91477L0.166333 3.16477C0.107035 3.2236 0.0615837 3.2949 0.0332791 3.37348C0.00497443 3.45207 -0.00547254 3.53598 0.00269672 3.6191C0.010866 3.70223 0.0374464 3.7825 0.0805078 3.85407C0.123569 3.92565 0.18203 3.98673 0.251646 4.03289L6.43165 8.15227L4.83133 9.75164H2.81383C2.6647 9.75178 2.52172 9.81112 2.41633 9.91664L0.166333 12.1666C0.100342 12.2324 0.0517016 12.3134 0.0247779 12.4026C-0.00214572 12.4918 -0.00650999 12.5862 0.0120768 12.6775C0.0306635 12.7687 0.0716196 12.8539 0.131269 12.9255C0.190919 12.997 0.267395 13.0526 0.353833 13.0873L3.88071 14.4935L5.28696 18.0148V18.026C5.34366 18.1636 5.45253 18.273 5.58976 18.3305C5.72698 18.3879 5.88137 18.3887 6.01915 18.3326C6.09249 18.3028 6.15865 18.2577 6.21321 18.2004L8.45477 15.9588C8.56202 15.8552 8.62373 15.7132 8.62633 15.5641V13.5466L10.2266 11.9463L14.3451 18.1263C14.3913 18.1955 14.4522 18.2535 14.5236 18.2963C14.5949 18.339 14.6748 18.3654 14.7576 18.3736C14.8403 18.3817 14.9239 18.3714 15.0022 18.3434C15.0805 18.3154 15.1516 18.2704 15.2104 18.2116L17.4604 15.9616C17.5359 15.8859 17.5883 15.7902 17.6114 15.6858C17.6345 15.5813 17.6273 15.4725 17.5907 15.372L14.7201 7.46883ZM14.902 16.931L10.7826 10.751C10.7364 10.6818 10.6755 10.6237 10.6041 10.5809C10.5328 10.5382 10.4529 10.5117 10.3701 10.5035H10.3148C10.1656 10.5037 10.0227 10.563 9.91727 10.6685L7.66727 12.9185C7.56187 13.0233 7.50221 13.1655 7.50133 13.3141V15.3316L6.02008 16.8129L4.83602 13.8551C4.80784 13.7842 4.76554 13.7199 4.71172 13.6659C4.65789 13.6119 4.59365 13.5694 4.5229 13.541L1.56508 12.3579L3.04727 10.8766H5.06383C5.13784 10.8767 5.21112 10.8622 5.27949 10.8338C5.34786 10.8055 5.40998 10.764 5.46227 10.7116L7.71227 8.46164C7.77101 8.40276 7.81596 8.33159 7.84388 8.25325C7.87181 8.17491 7.88201 8.09135 7.87376 8.00859C7.86552 7.92583 7.83902 7.84593 7.79618 7.77465C7.75334 7.70336 7.69523 7.64246 7.62602 7.59633L1.44696 3.47602L2.95821 1.96383L10.8763 4.84196C10.9797 4.8795 11.0918 4.88592 11.1988 4.86043C11.3057 4.83493 11.4029 4.77864 11.4782 4.69852L14.3845 1.61414C14.7062 1.32577 15.1263 1.17178 15.5582 1.18392C15.9901 1.19606 16.4009 1.3734 16.7059 1.67939C17.0109 1.98539 17.187 2.39673 17.1977 2.82865C17.2085 3.26058 17.0532 3.68019 16.7638 4.00102L13.6795 6.90727C13.5993 6.98259 13.543 7.07974 13.5176 7.18671C13.4921 7.29369 13.4985 7.40578 13.536 7.50914L16.4141 15.4226L14.902 16.931Z"
            fill={color}
        />
    </Svg>
);

export const MyWorkspaceToggleIcon: React.FC<IconProps> = ({ size = 18, color = '#FFFFFF' }) => (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <Path
            d="M7.64306 8.19036C7.01794 7.56524 6.66675 6.71739 6.66675 5.83333C6.66675 4.94928 7.01794 4.10143 7.64306 3.47631C8.26818 2.85119 9.11603 2.5 10.0001 2.5C10.8841 2.5 11.732 2.85119 12.3571 3.47631C12.9822 4.10143 13.3334 4.94928 13.3334 5.83333C13.3334 6.71739 12.9822 7.56524 12.3571 8.19036C11.732 8.81548 10.8841 9.16667 10.0001 9.16667C9.11603 9.16667 8.26818 8.81548 7.64306 8.19036Z"
            stroke={color}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M5 17.5V15.8333C5 14.9493 5.35119 14.1014 5.97631 13.4763C6.60143 12.8512 7.44928 12.5 8.33333 12.5H11.6667C12.5507 12.5 13.3986 12.8512 14.0237 13.4763C14.6488 14.1014 15 14.9493 15 15.8333V17.5"
            stroke={color}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const MyTeamToggleIcon: React.FC<IconProps> = ({ size = 18, color = '#FFFFFF' }) => (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <Path
            d="M12.2951 8.33333C13.1005 8.33333 13.7534 8.98625 13.7534 9.79167V13.7492C13.7534 15.8207 12.0741 17.5 10.0026 17.5C7.93102 17.5 6.25169 15.8207 6.25169 13.7492V9.79167C6.25169 8.98625 6.90461 8.33333 7.71002 8.33333H12.2951ZM12.2951 9.58333H7.71002C7.59496 9.58333 7.50169 9.67658 7.50169 9.79167V13.7492C7.50169 15.1303 8.62133 16.25 10.0026 16.25C11.3837 16.25 12.5034 15.1303 12.5034 13.7492V9.79167C12.5034 9.67658 12.4102 9.58333 12.2951 9.58333ZM3.12508 8.33333L5.94281 8.33255C5.65667 8.67875 5.47028 9.11042 5.42768 9.5835L3.12508 9.58333C3.01002 9.58333 2.91675 9.67658 2.91675 9.79167V12.499C2.91675 13.6502 3.84995 14.5833 5.00111 14.5833C5.16777 14.5833 5.32986 14.5637 5.48521 14.5268C5.55581 14.9467 5.68471 15.3472 5.86247 15.72C5.58822 15.7942 5.29924 15.8333 5.00111 15.8333C3.1596 15.8333 1.66675 14.3405 1.66675 12.499V9.79167C1.66675 8.98625 2.31966 8.33333 3.12508 8.33333ZM14.0623 8.33255L16.8751 8.33333C17.6805 8.33333 18.3334 8.98625 18.3334 9.79167V12.5C18.3334 14.3409 16.841 15.8333 15.0001 15.8333C14.7031 15.8333 14.4151 15.7945 14.141 15.7216C14.3201 15.3481 14.4491 14.9476 14.5209 14.5276C14.6744 14.5642 14.835 14.5833 15.0001 14.5833C16.1507 14.5833 17.0834 13.6506 17.0834 12.5V9.79167C17.0834 9.67658 16.9902 9.58333 16.8751 9.58333L14.5774 9.5835C14.5348 9.11042 14.3484 8.67875 14.0623 8.33255ZM10.0001 2.5C11.3808 2.5 12.5001 3.61929 12.5001 5C12.5001 6.38071 11.3808 7.5 10.0001 7.5C8.61933 7.5 7.50008 6.38071 7.50008 5C7.50008 3.61929 8.61933 2.5 10.0001 2.5ZM15.4167 3.33333C16.5673 3.33333 17.5001 4.26607 17.5001 5.41667C17.5001 6.56726 16.5673 7.5 15.4167 7.5C14.2662 7.5 13.3334 6.56726 13.3334 5.41667C13.3334 4.26607 14.2662 3.33333 15.4167 3.33333ZM4.58341 3.33333C5.73401 3.33333 6.66675 4.26607 6.66675 5.41667C6.66675 6.56726 5.73401 7.5 4.58341 7.5C3.43282 7.5 2.50008 6.56726 2.50008 5.41667C2.50008 4.26607 3.43282 3.33333 4.58341 3.33333ZM10.0001 3.75C9.30975 3.75 8.75008 4.30964 8.75008 5C8.75008 5.69036 9.30975 6.25 10.0001 6.25C10.6904 6.25 11.2501 5.69036 11.2501 5C11.2501 4.30964 10.6904 3.75 10.0001 3.75ZM15.4167 4.58333C14.9565 4.58333 14.5834 4.95643 14.5834 5.41667C14.5834 5.8769 14.9565 6.25 15.4167 6.25C15.877 6.25 16.2501 5.8769 16.2501 5.41667C16.2501 4.95643 15.877 4.58333 15.4167 4.58333ZM4.58341 4.58333C4.12318 4.58333 3.75008 4.95643 3.75008 5.41667C3.75008 5.8769 4.12318 6.25 4.58341 6.25C5.04365 6.25 5.41675 5.8769 5.41675 5.41667C5.41675 4.95643 5.04365 4.58333 4.58341 4.58333Z"
            fill={color}
        />
    </Svg>
);

export const FingerprintIcon: React.FC<IconProps> = ({ size = 20, color = '#2563EB' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 2C8.13 2 5 5.13 5 9C5 10.3 5.35 11.51 5.96 12.56L7.43 11.09C7.16 10.45 7 9.74 7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 9.74 16.84 10.45 16.57 11.09L18.04 12.56C18.65 11.51 19 10.3 19 9C19 5.13 15.87 2 12 2Z"
            fill={color}
        />
        <Path
            d="M12 6C10.34 6 9 7.34 9 9V14.5C9 15.33 9.67 16 10.5 16C11.33 16 12 15.33 12 14.5V9C12 9 12 8 12 8C12 8 12 9 12 9V14.5C12 16.99 9.99 19 7.5 19C7.03 19 6.57 18.93 6.14 18.79L4.65 20.28C5.52 20.74 6.48 21 7.5 21C11.09 21 14 18.09 14 14.5V9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9V14.5C10 14.78 10.22 15 10.5 15C10.78 15 11 14.78 11 14.5V9C11 8.45 11.45 8 12 8C12.55 8 13 8.45 13 9V14.5C13 15.88 11.88 17 10.5 17C9.12 17 8 15.88 8 14.5V9C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9V14.5C16 15.7 15.42 16.76 14.53 17.43L15.95 18.85C17.21 17.84 18 16.27 18 14.5V9C18 5.69 15.31 3 12 3C8.69 3 6 5.69 6 9C6 10.79 6.79 12.39 8.05 13.5L9.46 12.09C8.56 11.3 8 10.22 8 9C8 6.79 9.79 5 12 5Z"
            fill={color}
        />
    </Svg>
);

export const FaceIdIcon: React.FC<IconProps> = ({ size = 20, color = '#2563EB' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M3 7V5C3 3.89543 3.89543 3 5 3H7M17 3H19C20.1046 3 21 3.89543 21 5V7M21 17V19C21 20.1046 20.1046 21 19 21H17M7 21H5C3.89543 21 3 20.1046 3 19V17"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Circle cx="9" cy="9" r="1.2" fill={color} />
        <Circle cx="15" cy="9" r="1.2" fill={color} />
        <Path
            d="M12 11V13.5C12 14 11.5 14.5 11 14.5"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M8.5 17C9.5 18 10.5 18.5 12 18.5C13.5 18.5 14.5 18 15.5 17"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const ShieldSecurityIcon: React.FC<IconProps> = ({ size = 20, color = '#0284C7' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 22S4 18 4 12V5L12 2L20 5V12C20 18 12 22 12 22Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M9 12L11 14L15 10"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);







