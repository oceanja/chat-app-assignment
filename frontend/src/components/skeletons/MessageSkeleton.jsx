const MessageSkeleton = () => {
    // Create an array of 6 items for skeleton messages
    const skeletonMessages = Array(6).fill(null);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {skeletonMessages.map((_, idx) => (
                <div key={idx} className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}>
                    <div className="flex flex-col gap-1 max-w-[70%] lg:max-w-[50%]">
                        <div
                            className={`skeleton h-16 w-[200px] ${idx % 2 === 0
                                    ? "bg-gray-200 rounded-xl rounded-tl-none"
                                    : "bg-teal-100/50 rounded-xl rounded-tr-none"
                                } animate-pulse`}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageSkeleton;
