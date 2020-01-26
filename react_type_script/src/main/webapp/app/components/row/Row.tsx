/*
 * Copyright (c) 2020. Prototype
 */

import './style.scss';
import React, {ReactNode} from 'react';
import cn from 'classnames';

type Props = {
    id: string,
    className: string,
    disabled: boolean,
    passed: boolean,
    children?: ReactNode;
};

const Row = (props: Props) => {
    const {id, className, disabled, passed, children} = props;
    return (
        <div
            id={id}
            className={cn('step-row', className, {'step-row--disabled': disabled}, {'step-row--passed': passed})}
        >
            {children}
        </div>
    );
};

export default Row;
