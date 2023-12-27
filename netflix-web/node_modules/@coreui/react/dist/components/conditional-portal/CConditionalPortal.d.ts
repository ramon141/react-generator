import { FC, ReactNode } from 'react';
export interface CConditionalPortalProps {
    /**
     * @ignore
     */
    children: ReactNode;
    /**
     * Render some children into a different part of the DOM
     */
    portal: boolean;
}
export declare const CConditionalPortal: FC<CConditionalPortalProps>;
