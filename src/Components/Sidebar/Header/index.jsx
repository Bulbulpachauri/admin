import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { FaRegBell, FaRegUser } from 'react-icons/fa';
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoMdLogOut } from 'react-icons/io';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from "@mui/material/Divider";
import { MyContext } from "../../../context/MyContext";


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Header = () => {
  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const openMyAcc = Boolean(anchorMyAcc);
  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };

  const context = useContext(MyContext);

  return (
    <header className={`w-full h-[auto] py-2 ${context.isSidebarOpen ? 'pl-64' : 'pl-5'} pr-7 bg-[#fff] border-b border-[rgba(0,0,0,0.1)] flex items-center justify-between transition-all shadow-md`}>
      <div className="part1">
        <Button className="!w-[35px] !h-[35px] !rounded-full !min-w-[35px] text-[rgba(0,0,0,0.8)]"
          onClick={() => context.setSidebarOpen(!context.isSidebarOpen)}>
          <AiOutlineMenuUnfold className="text-[18px] text-[rgba(0,0,0,0.8)]" />
        </Button>
      </div>

      <div className="part2 flex items-center justify-end gap-5">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={4} color="secondary">
            <FaRegBell />
          </StyledBadge>
        </IconButton>

        {context.isLogin ? (
          <div className="relative">
            <div className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer" onClick={handleClickMyAcc}>
              <img src="https://ecme-react.themenate.net/img/avatars/thumb-1.jpg" className="w-full h-full object-cover" alt="User Avatar" />
            </div>

            <Menu
              anchorEl={anchorMyAcc}
              id="account-menu"
              open={openMyAcc}
              onClose={handleCloseMyAcc}
              onClick={handleCloseMyAcc}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleCloseMyAcc} className="!bg-white">
                <div className="flex items-center gap-2">
                  <div className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer">
                    <img src="https://ecme-react.themenate.net/img/avatars/thumb-1.jpg" className="w-full h-full object-cover" alt="User Avatar" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold">Bulbul Pachauri</p>
                  <span>bulbulpachauri21@gmail.com</span>
                </div>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleCloseMyAcc} className="flex items-center gap-3">
                <FaRegUser className="text-[16px]" />
                <span className="text-[16px]">Profile</span>
              </MenuItem>
              <MenuItem onClick={handleCloseMyAcc} className="flex items-center gap-3">
                <IoMdLogOut className="text-[16px]" />
                <span className="text-[16px]">Sign Out</span>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Button className="btn-blue">Sing In</Button>
        )}
      </div>
    </header>
  );
};

export default Header;