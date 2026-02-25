import { Users } from "lucide-react";

const SidebarSkeleton = () => {
    // Create 8 skeleton items
    const skeletonContacts = Array(8).fill(null);

    return (
        <aside className="h-full w-20 lg:w-96 border-r border-base-300 flex flex-col transition-all duration-200">
            {/* Header */}
            <div className="border-b border-base-300 w-full p-5 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    <span className="font-medium hidden lg:block">Chats</span>
                </div>
                {/* Search Bar Skeleton */}
                <div className="hidden lg:block w-full h-10 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Contacts Skeleton */}
            <div className="overflow-y-auto w-full py-3">
                {skeletonContacts.map((_, idx) => (
                    <div key={idx} className="w-full p-3 flex items-center gap-3">
                        {/* Avatar skeleton */}
                        <div className="relative mx-auto lg:mx-0">
                            <div className="skeleton size-10 lg:size-12 rounded-full bg-gray-200 animate-pulse" />
                        </div>

                        {/* User info skeleton - only visible on larger screens */}
                        <div className="hidden lg:block text-left min-w-0 flex-1">
                            <div className="skeleton h-4 w-32 mb-2 bg-gray-200 animate-pulse" />
                            <div className="skeleton h-3 w-16 bg-gray-200 animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default SidebarSkeleton;
