import dbdLogo from "../assets/images/dbd-logo.png";
import iriShardIcon from "../assets/images/iri-shard.png";
export default function Header() {
  return (
    <div className="text-2xl font-bold mb-4 flex flex-row items-center justify-between">
      <div>
        <img src={dbdLogo} width={150} />
      </div>
      <div className="flex flex-row">
        <div>
          <img src={iriShardIcon} width={35} />
        </div>
        <div>Calculator</div>
      </div>
    </div>
  );
}
