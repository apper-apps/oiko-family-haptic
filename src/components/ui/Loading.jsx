import { motion } from "framer-motion";

const Loading = ({ type = "calendar" }) => {
  if (type === "calendar") {
    return (
      <div className="p-6">
        <div className="glass-effect rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="loading-shimmer h-8 w-48 rounded-lg"></div>
            <div className="flex space-x-2">
              <div className="loading-shimmer h-10 w-20 rounded-lg"></div>
              <div className="loading-shimmer h-10 w-20 rounded-lg"></div>
              <div className="loading-shimmer h-10 w-20 rounded-lg"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="text-center py-3">
                <div className="loading-shimmer h-4 w-8 mx-auto rounded"></div>
              </div>
            ))}
          </div>
          
          <div className="calendar-grid">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="calendar-day">
                <div className="p-3">
                  <div className="loading-shimmer h-4 w-6 mb-3 rounded"></div>
                  <div className="space-y-2">
                    <div className="loading-shimmer h-3 w-full rounded"></div>
                    <div className="loading-shimmer h-3 w-3/4 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "event") {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="glass-card rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <div className="loading-shimmer h-4 w-4 rounded-full"></div>
              <div className="flex-1">
                <div className="loading-shimmer h-5 w-3/4 mb-2 rounded"></div>
                <div className="loading-shimmer h-4 w-1/2 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        className="glass-effect rounded-2xl p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-16 h-16 mx-auto mb-4 loading-shimmer rounded-full"></div>
        <div className="loading-shimmer h-4 w-32 mx-auto mb-2 rounded"></div>
        <div className="loading-shimmer h-3 w-24 mx-auto rounded"></div>
      </motion.div>
    </div>
  );
};

export default Loading;