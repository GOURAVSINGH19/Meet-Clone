import CallList from '@/components/CallLists';

const UpcomingPage = () => {
    return (
        <section className="flex size-full flex-col gap-10 text-white">
            <h1 className="text-xl font-bold">Upcoming Meeting</h1>
            <CallList type="upcoming" />
        </section>
    );
};

export default UpcomingPage;