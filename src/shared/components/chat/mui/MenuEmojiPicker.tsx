import { Menu, MenuItem } from "@material-ui/core";
import EmojiPicker, { IEmojiData } from "emoji-picker-react";

interface MenuEmojiPickerProps {
  anchorEl: HTMLElement;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  handleEmojiClick: (e, data: IEmojiData) => void;
}

export const MenuEmojiPicker = ({
  anchorEl,
  isMenuOpen,
  handleEmojiClick,
  handleMenuClose,
}: MenuEmojiPickerProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="account-menu"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </MenuItem>
    </Menu>
  );
};
