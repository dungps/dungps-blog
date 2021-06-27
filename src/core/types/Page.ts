import { NextComponentType } from 'next/dist/next-server/lib/utils';
import { NextPageContext } from 'next';

export interface PageProps {
    slug: string
    component: NextComponentType<NextPageContext, any, any>
    category?: boolean
}