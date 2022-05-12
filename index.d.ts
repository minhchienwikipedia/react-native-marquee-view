import { StyleProp, ViewStyle } from 'react-native'
export interface MarqueeViewProps extends AccessibilityProps, ViewProps {
    style?: StyleProp<ViewStyle>;
    speed?: Number;
    delay?: Number;
    autoPlay?: Boolean,
    playing?: Boolean,
    /**
     * Render children.
     */
    children?: React.ReactNode;
}

export default class MarqueeView extends React.Component<MarqueeViewProps> {};