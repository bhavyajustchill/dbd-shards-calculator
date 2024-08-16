const xpPerLevel = [
  0, 720, 900, 1200, 1200, 1200, 2100, 2100, 2100, 2100, 2100, 2100, 2100, 2100, 2700, 2700, 2700,
  2700, 2700, 2700, 2700, 2700, 2700, 2700, 3300, 3300, 3300, 3300, 3300, 3300, 3300, 3300, 3300,
  3300, 3750, 3750, 3750, 3750, 3750, 3750, 3750, 3750, 3750, 3750, 3750, 3750, 3750, 3750, 4200,
  4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200,
  4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200,
  4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200, 4200,
  4200, 4200,
];

const shardsPerLevel = [
  0, 50, 65, 85, 85, 85, 150, 150, 150, 150, 150, 150, 150, 150, 195, 195, 195, 195, 195, 195, 195,
  195, 195, 195, 235, 235, 235, 235, 235, 235, 235, 235, 235, 235, 270, 270, 270, 270, 270, 270,
  270, 270, 270, 270, 270, 270, 270, 270, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300,
  300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300,
  300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300,
  300, 300,
];

export function calculateRequiredLevels(currentShards, currentLevel, targetShards) {
  let currentShardsAccumulated = currentShards;
  let levelsRequired = 0;
  let totalXPRequired = 0;
  const avgXPPerMatch = 600;
  let initialCurrentLevel = currentLevel;
  let newLevel = 0;

  while (currentShardsAccumulated <= targetShards) {
    let newShardsToBeAccumulated = 0;
    let newXPRequired = 0;

    if (initialCurrentLevel !== null && currentLevel + levelsRequired <= xpPerLevel.length) {
      if (currentLevel + levelsRequired === xpPerLevel.length) {
        initialCurrentLevel = null;
        continue;
      }
      newShardsToBeAccumulated = shardsPerLevel[currentLevel + levelsRequired];
      newXPRequired = xpPerLevel[currentLevel + levelsRequired];
    } else {
      if (newLevel !== 0 && newLevel === xpPerLevel.length) {
        newLevel = 0;
        continue;
      }
      newShardsToBeAccumulated = shardsPerLevel[newLevel];
      newXPRequired = xpPerLevel[newLevel];
      newLevel++;
    }

    currentShardsAccumulated += newShardsToBeAccumulated;
    totalXPRequired += newXPRequired;
    levelsRequired++;
  }

  const totalMatchesRequired = totalXPRequired / avgXPPerMatch;
  const totalTimeSeconds = totalMatchesRequired * (10 * 60);

  const hours = Math.floor(totalTimeSeconds / 3600);
  const minutes = Math.floor((totalTimeSeconds % 3600) / 60);
  const seconds = Math.floor(totalTimeSeconds % 60);

  return {
    levelsRequired,
    totalXPRequired,
    totalMatchesRequired: Math.ceil(totalMatchesRequired),
    time: `${hours}h ${minutes}m ${seconds > 0 ? `${seconds}s` : ""}`,
  };
}
