import { useSnapshot } from "valtio";
import state from "../store";
import { getContrastingColor } from "../config/helpers";

const generateStyle = (type) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const Snap = useSnapshot(state);

  if (type === "filled") {
    return {
      backgroundColor: Snap.color,
      color: getContrastingColor(Snap.color),
    };
  } else if (type === "outline") {
    return {
      borderWidth: "1px",
      borderColor: Snap.color,
      color: Snap.color,
    };
  }
};

// eslint-disable-next-line react/prop-types
const CustomButton = ({ type, title, handleClick, customStyles }) => {
  return (
    <button
      className={`px-2 py-1.2 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
