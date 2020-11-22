import React, { ReactElement, ReactNode } from 'react';
import Lottie from 'react-lottie';

import { makeStyles } from '@material-ui/core';

// Import all avaliable animation json files
import AError from './animations/error.json';
import ASuccess from './animations/success.json';
import AVerified from './animations/verified.json';
import AWarning from './animations/warning.json';
import AAirplane from './animations/airplane.json';
import APulse from './animations/pulse.json';
import ALoading from './animations/loading.json';

import { EventListener } from 'react-lottie';
import { sleep } from 'utils/functions';

export enum LottieAnimationType {
    Error = 'Error',
    Success = 'Success',
    Verified = 'Verified',
    Warning = 'Warning',
    Airplane = 'Airplane',
    Pulse = 'Pulse',
    Loading = 'Loading',
}

const getAnimation = (animation: LottieAnimationType): ReactNode => {
    switch (animation) {
        case LottieAnimationType.Error:
            return AError;
        case LottieAnimationType.Success:
            return ASuccess;
        case LottieAnimationType.Verified:
            return AVerified;
        case LottieAnimationType.Warning:
            return AWarning;
        case LottieAnimationType.Airplane:
            return AAirplane;
        case LottieAnimationType.Pulse:
            return APulse;
        case LottieAnimationType.Loading:
            return ALoading;
    }
};

const useStyles = makeStyles((theme) => ({
    root: {},
}));

interface IAnimationProps {
    animation: LottieAnimationType;

    // Lottie stuff
    height?: number;
    width?: number;
    loop?: boolean;
    autoplay?: boolean;
    onComplete?: () => void;
    delay?: number;
}

const LottieAnimation = (props: IAnimationProps): ReactElement => {
    const classes = useStyles();
    const {
        animation,
        height,
        width,
        loop,
        autoplay,
        onComplete,
        delay,
    } = props;

    if (loop == true && onComplete !== undefined) {
        throw new Error(
            'onComplete and loop should not be used together on LottieAnimation'
        );
    }

    if (delay && !onComplete) {
        throw new Error('Delay can only be used with onComplete');
    }

    const [waitForDelay, setWaitForDelay] = React.useState<boolean>(false);

    React.useEffect(() => {
        let keepWaiting = true;

        const delayComplete = async () => {
            await sleep(delay ? delay : 0);
            if (keepWaiting && onComplete) {
                onComplete();
            }
        };

        if (waitForDelay) delayComplete();

        return () => {
            keepWaiting = false;
        };
    }, [delay, waitForDelay, onComplete]);

    const getEventListeners = (): EventListener[] => {
        const listeners: EventListener[] = [];

        if (onComplete)
            listeners.push({
                eventName: 'complete',
                callback: () => setWaitForDelay(true),
            });

        return listeners;
    };

    return (
        <div className={classes.root}>
            <Lottie
                isStopped={false}
                options={{
                    loop: loop ? loop : false,
                    autoplay: autoplay ? autoplay : true,
                    animationData: getAnimation(animation),
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice',
                    },
                }}
                height={height ? height : 200}
                width={width ? width : 200}
                eventListeners={getEventListeners()}
            />
        </div>
    );
};

export default LottieAnimation;
