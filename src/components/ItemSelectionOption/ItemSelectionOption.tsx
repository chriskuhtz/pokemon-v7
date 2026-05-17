import { ItemType } from "../../interfaces/Item";
import { ListItem } from "../../uiComponents/ListItem/ListItem";
import { ItemInfoButton } from "../ItemInfoButton/ItemInfoButton";
import { ItemSprite } from "../ItemSprite/ItemSprite";

export const ItemSelectionOption = ({
  item,
  label,
  isSelected,
  onClick,
  additionalContent,
  additionalIcons,
  hint,
}: {
  item: ItemType;
  label?: string;
  isSelected: boolean;
  onClick: () => void;
  additionalContent?: React.JSX.Element;
  additionalIcons?: React.JSX.Element[];
  hint?: string;
}) => {
  return (
    <ListItem
      onClick={onClick}
      content={label ?? item}
      additionalContent={additionalContent}
      hint={hint}
      backgroundColor={
        isSelected ? "rgba(255,255,255,.8)" : "rgba(255,255,255,.4)"
      }
      additionalIcons={additionalIcons}
      primaryIcon={<ItemSprite item={item} />}
      infoButton={<ItemInfoButton itemName={item} />}
    />
  );
};
