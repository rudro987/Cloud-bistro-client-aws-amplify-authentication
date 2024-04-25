const Loader = () => {
    return (
        <div className="min-h-[80vh] flex flex-col">
        <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin  border-amber-600" role="status" aria-label="loading">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Loader;