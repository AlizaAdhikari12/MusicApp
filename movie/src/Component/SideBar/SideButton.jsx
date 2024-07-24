import { Link } from "react-router-dom";
import "../Shared/SideButton.css";
import { useLocation } from "react-router-dom";
export const SideButton = (props) => {
  const location = useLocation();

  const isActive = location.pathname === props.to;

  const btnClass = isActive ? "sidebuttonActive" : "sidebutton-item";

  return (
    <>
      <Link to={props.to}>
        <div className={btnClass}>
          {props.icon}
          <p>{props.title}</p>
        </div>
      </Link>
    </>
  );
};
