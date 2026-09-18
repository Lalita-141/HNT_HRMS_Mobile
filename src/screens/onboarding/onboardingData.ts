import { ImageSourcePropType } from 'react-native';

export interface OnboardingSlideItem {
    id: string;
    step: number;
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
    image: ImageSourcePropType;
    showLogo?: boolean;
    hasAccentLine?: boolean;
    buttonText: string;
}

export const ONBOARDING_DATA: OnboardingSlideItem[] = [
    {
        id: 'step-1',
        step: 1,
        titlePrefix: 'Welcome to\n',
        titleHighlight: 'Hare & Turtle',
        titleSuffix: ' HRMS',
        description: 'A better workplace together',
        image: require('../../assets/images/Onboarding1.png'),
        showLogo: true,
        hasAccentLine: false,
        buttonText: 'Next',
    },
    {
        id: 'step-2',
        step: 2,
        titlePrefix: 'Manage Your\n',
        titleHighlight: 'Work Life Easily',
        titleSuffix: '',
        description:
            'Apply for leaves, check your\nattendance, manage timesheets and\nmore - all in one place.',
        image: require('../../assets/images/Onboarding2.png'),
        showLogo: false,
        hasAccentLine: true,
        buttonText: 'Next',
    },
    {
        id: 'step-3',
        step: 3,
        titlePrefix: 'Stay Informed\n',
        titleHighlight: 'Always',
        titleSuffix: '',
        description:
            'Get important updates, team announcements, and upcoming events in real-time.',
        image: require('../../assets/images/Onboarding3.png'),
        showLogo: false,
        hasAccentLine: true,
        buttonText: 'Get Started',
    },
];
