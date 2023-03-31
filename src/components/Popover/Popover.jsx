import { Popover } from "@nextui-org/react";
import { CiMenuKebab } from "react-icons/ci";

export default function Popup({
  onDeleteClick = () => {},
  onEditClick = () => {},
  onPopupClick = () => {},
  popupIcon,
}) {
  return (
    <Popover>
      <Popover.Trigger>
        <div onClick={onPopupClick}>{popupIcon}</div>
      </Popover.Trigger>
      <Popover.Content>
        <div className="flex flex-col gap-2">
          <div>
            <p
              onClick={onDeleteClick}
              className="cursor-pointer hover:bg-gray-100 px-4 py-2"
            >
              Delete
            </p>
          </div>
          <div>
            <p
              onClick={onEditClick}
              className="cursor-pointer hover:bg-gray-100 px-4 py-2"
            >
              Edit
            </p>
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );
}
