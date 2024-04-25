const PokeballLoading = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-24 h-24 relative animate-spin">
        <div className="w-full h-1/2 bg-red-500 rounded-t-full border-4 border-black"></div>
        <div className="w-full h-1/2 bg-white rounded-b-full border-4 border-black"></div>
        <div className="w-6 h-6 bg-white  border-4 border-black rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
};

export default PokeballLoading;
