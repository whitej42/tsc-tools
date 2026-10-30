import { Helmet } from 'react-helmet-async';
import { FaExternalLinkAlt, FaMapSigns, FaBook, FaYoutube, FaSteam, FaTrain, FaSignal } from "react-icons/fa";

// Brand accents. Steam's navy is unreadable on the dark card surface,
// so each accent carries a dark-mode variant.
const STEAM = { light: '#1b2838', dark: '#66c0f4' };
const YOUTUBE = { light: '#FF0000', dark: '#FF3B3B' };

const accentVars = (accent) => ({
    '--accent': accent.light ?? accent,
    '--accent-dark': accent.dark ?? accent.light ?? accent,
});

const sections = [
    {
        id: 'tools',
        title: 'Useful Tools',
        blurb: 'Maps, diagrams and live data for getting your services and routes right.',
        accent: '#0A7DC2',
        links: [
            {
                title: 'Real Time Trains',
                source: 'realtimetrains.co.uk',
                desc: 'Live and historical UK timetables down to the passing time. The quickest way to make a scenario timetable believable.',
                href: 'https://www.realtimetrains.co.uk/',
                icon: FaTrain,
            },
            {
                title: 'Project Mapping',
                source: 'projectmapping.co.uk',
                desc: 'A huge index of UK rail maps and diagrams, grouped by operator and region. Southeastern, ScotRail, Merseyrail, Thameslink and plenty more.',
                href: 'https://www.projectmapping.co.uk/rail_maps_diagrams.html',
                icon: FaMapSigns,
            },
            {
                title: 'Signalbox Live Train Map',
                source: 'map.signalbox.io',
                desc: 'A live map of trains moving across the network. Handy for seeing what actually runs where, and when.',
                href: 'https://www.map.signalbox.io/',
                icon: FaSignal,
            },
        ],
    },
    {
        id: 'guides',
        title: 'Guides & Tutorials',
        blurb: 'Community writing on scenario building and route creation.',
        accent: STEAM,
        links: [
            {
                title: 'The Simple Guide to Scenario Creation',
                source: 'Steam - simonmd',
                desc: 'The one to start with. Walks through the scenario editor from the Build button onwards, written by someone who learnt it the hard way.',
                href: 'https://steamcommunity.com/sharedfiles/filedetails/?id=561594427',
                icon: FaSteam,
                featured: true,
            },
            {
                title: "The Route Builder's Reference Manual",
                source: 'Steam - Warwick Rail',
                desc: 'An illustrated end-to-end guide to building your own workshop route — world editor setup, terrain data, backups, publishing, plus the advanced tricks.',
                href: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2205267954',
                icon: FaSteam,
            },
            {
                title: "WarwickRail's Guides",
                source: 'Steam',
                desc: 'A whole collection of TSC guides from one author. Worth a browse if the basics are already covered.',
                href: 'https://steamcommunity.com/id/warwickrail/myworkshopfiles/?section=guides&appid=24010&p=1',
                icon: FaSteam,
            },
            {
                title: 'All Workshop Guides on Steam',
                source: 'Steam',
                desc: 'The full depot. Every TSC workshop guide, sorted by what people are reading now.',
                href: 'https://steamcommunity.com/app/24010/guides/?browsefilter=trend&requiredtags[]=workshop',
                icon: FaSteam,
            },
        ],
    },
    {
        id: 'videos',
        title: 'Videos',
        blurb: 'If you would rather watch someone do it than read about it.',
        accent: YOUTUBE,
        links: [
            {
                title: 'Total beginners guide to scenario creation',
                source: 'YouTube - RailSim Gamer',
                desc: 'Total beginners guide multi part series showing you how to create a scenario from scratch.',
                href: 'https://www.youtube.com/watch?v=SsFt5hSwnbE&t=1189s',
                icon: FaYoutube,
                featured: true,
            },
            {
                title: 'Simple Guide to Scenario Creation',
                source: 'YouTube playlist - Talon',
                desc: 'Step-by-step video guide to creating a simple scenario.',
                href: 'https://www.youtube.com/playlist?list=PL0HoG-HRjRUg21503Eek_4kN6K8TeZSwP',
                icon: FaYoutube,
            },
            {
                title: 'Train Simulator Route Learning Guides',
                source: 'YouTube playlist - PTGRail',
                desc: 'A playlist of route learning runs, handy for seeing how a line is actually signalled and driven.',
                href: 'https://www.youtube.com/playlist?list=PLjAJBQoMY9vXJUZ4kNOZPPKWO7LSgBXM0',
                icon: FaYoutube,
            },
            {
                title: 'Rolling Start Scenarios',
                source: 'YouTube - Bastreinfan',
                desc: 'Simple, quick and easy guide on how to implement rolling starts into your scenarios.',
                href: 'https://www.youtube.com/watch?v=dTndGwbsGT4',
                icon: FaYoutube,
            },
        ],
    },
];

function LinkCard({ link, accent }) {
    const Icon = link.icon;
    return (
        <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col w-full bg-white dark:bg-surface-dark-card rounded-card shadow-card hover:shadow-card-hover dark:shadow-dark-card dark:hover:shadow-dark-card-hover transition-all duration-200 hover:-translate-y-1 overflow-hidden border border-gray-200 dark:border-surface-dark-border border-l-4 border-l-[color:var(--accent)] dark:border-l-[color:var(--accent-dark)]"
            style={accentVars(accent)}
        >
            <div className="px-4 py-4 flex-1">
                <div className="flex items-start gap-3">
                    <Icon className="mt-1 shrink-0 text-lg text-[color:var(--accent)] dark:text-[color:var(--accent-dark)]" />
                    <div className="min-w-0">
                        <h3 className="font-rail font-bold tracking-rail uppercase text-sm text-rail-navy-900 dark:text-white flex items-start gap-1.5">
                            <span>{link.title}</span>
                            <FaExternalLinkAlt className="text-[10px] mt-1 shrink-0 text-gray-400 group-hover:text-rail-amber transition-colors" />
                        </h3>
                        <p className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-0.5 truncate">
                            {link.source}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-snug mt-2">
                            {link.desc}
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-auto h-1 w-0 group-hover:w-full transition-all duration-300 bg-[color:var(--accent)] dark:bg-[color:var(--accent-dark)]" />
        </a>
    );
}

function Guides() {
    return (
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">
            <Helmet>
                <title>Guides | TSCTools</title>
                <meta name="description" content="Hand-picked guides, tutorials and tools for Train Simulator Classic scenario builders — scenario creation, steam driving, rail maps and live timetables." />
                <link rel="canonical" href="https://tsctools.co.uk/guides" />
            </Helmet>

            {/* Page heading */}
            <div className="mb-10">
                <h1 className="font-rail font-bold text-3xl sm:text-4xl tracking-tight text-rail-navy dark:text-white border-b-4 border-rail-red pb-2 inline-block">
                    Guides
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-base mt-3 max-w-2xl">
                    A collection of the guides, tutorials and tools worth bookmarking if you build
                    Train Simulator Classic scenarios. All external links — credit to the people who wrote them.
                </p>
            </div>

            {sections.map(section => (
                <section key={section.id} className="mb-12">
                    <div className="mb-4">
                        <h2 className="font-rail font-bold text-2xl tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
                            <span
                                className="h-5 w-1 rounded-rail bg-[color:var(--accent)] dark:bg-[color:var(--accent-dark)]"
                                style={accentVars(section.accent)}
                            />
                            {section.title}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{section.blurb}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {section.links.map(link => (
                            <div key={link.href} className={`flex ${link.featured ? 'md:col-span-2' : ''}`}>
                                <LinkCard link={link} accent={section.accent} />
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            <p className="text-xs text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-surface-dark-border pt-4">
                Got a guide that belongs here? Links are in the footer. Send it over.
            </p>
        </div>
    );
}

export default Guides;
