import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Community Template | Best AI Resume',
    description: 'View and discuss this community-created resume template. Download it or share your feedback.',
};

export default function CommunityDetailLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
