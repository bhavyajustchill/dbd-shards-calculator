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

  const addDiscordBot = () => {
    window.open("https://discord.com/oauth2/authorize?client_id=1291287524936908873", "_blank");
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
            <div className="flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addDiscordBot();
                }}
                className="w-full flex items-center justify-center border border-gray-300 rounded-full shadow-md px-6 py-2 text-sm font-medium text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                style={{ "background-color": "#5865F2" }}>
                <svg
                  className="h-6 w-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="800px"
                  height="800px"
                  viewBox="0 -28.5 256 256"
                  version="1.1"
                  preserveAspectRatio="xMidYMid">
                  <g>
                    <path
                      d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                      fill="#FFFFFF"
                      fillRule="nonzero"></path>
                  </g>
                </svg>
                <span className="font-bold">Add Discord Bot</span>
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
