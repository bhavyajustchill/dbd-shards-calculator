import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { calculateRequiredLevels } from "../utils/shardsUtils";

function ShardCalculator() {
  const [currentShards, setCurrentShards] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [targetShards, setTargetShards] = useState(2250);
  const [isCustom, setIsCustom] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculation = calculateRequiredLevels(currentShards, currentLevel, targetShards);
    setResult(calculation);
  };

  const handleReset = () => {
    setCurrentShards(0);
    setCurrentLevel(0);
    setTargetShards(2250);
    setIsCustom(false);
    setResult(null);
  };

  const handleShardOptionChange = (e) => {
    const value = Number(e.target.value);
    if (value === 0) {
      setIsCustom(true);
      setTargetShards(0);
    } else {
      setIsCustom(false);
      setTargetShards(value);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full p-6 rounded-3xl shadow-lg bg-white">
          <Header />
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Current Shards:</label>
              <input
                type="number"
                value={currentShards}
                onChange={(e) => setCurrentShards(Number(e.target.value))}
                className="w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1">Current Level:</label>
              <input
                type="number"
                value={currentLevel}
                onChange={(e) => setCurrentLevel(Number(e.target.value))}
                className="w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1">Target Shards:</label>
              <div className="space-x-2 flex flex-row">
                <div>
                  <input
                    type="radio"
                    id="2250"
                    name="shardOption"
                    value="2250"
                    checked={!isCustom && targetShards === 2250}
                    onChange={handleShardOptionChange}
                  />
                  <label htmlFor="2250" className="ml-2">
                    2250
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="4500"
                    name="shardOption"
                    value="4500"
                    checked={!isCustom && targetShards === 4500}
                    onChange={handleShardOptionChange}
                  />
                  <label htmlFor="4500" className="ml-2">
                    4500
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="9000"
                    name="shardOption"
                    value="9000"
                    checked={!isCustom && targetShards === 9000}
                    onChange={handleShardOptionChange}
                  />
                  <label htmlFor="9000" className="ml-2">
                    9000
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="custom"
                    name="shardOption"
                    value="0"
                    checked={isCustom}
                    onChange={handleShardOptionChange}
                  />
                  <label htmlFor="custom" className="ml-2">
                    Custom
                  </label>
                </div>
              </div>
              {isCustom && (
                <input
                  type="number"
                  value={targetShards}
                  onChange={(e) => setTargetShards(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full text-white py-2 bg-blue-600 hover:bg-blue-700 rounded-full font-bold">
                Calculate
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="w-full text-white py-2 bg-red-600 hover:bg-red-700 rounded-full font-bold">
                Reset
              </button>
            </div>
          </form>
          {result && typeof result === "object" && (
            <div className="mt-6">
              <h2 className="text-xl">
                Total Levels Required: <span className="font-bold">{result.levelsRequired}</span>
              </h2>
              <h2 className="text-xl">
                Total XP Required: <span className="font-bold">{result.totalXPRequired}</span>
              </h2>
              <h2 className="text-xl">
                Approx. Matches To Play:{" "}
                <span className="font-bold">{result.totalMatchesRequired}</span>
              </h2>
              <h2 className="text-xl">
                Approx. Time Required: <span className="font-bold">{result.time}</span>
              </h2>
            </div>
          )}
          {typeof result === "string" && (
            <div className="mt-6">
              <div>{result}</div>
            </div>
          )}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default ShardCalculator;
