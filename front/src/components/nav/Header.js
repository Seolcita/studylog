import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";

//antd
import { Menu } from "antd";
import {
  SettingOutlined,
  UserOutlined,
  FormOutlined,
  LogoutOutlined,
  FolderAddOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));
  let history = useHistory();

  const handleClick = (e) => {
    console.log(e.key);
    console.log(user);
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/home");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<FormOutlined />}>
        <Link to="/">Seol's study logs</Link>
      </Item>

      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          icon={<SettingOutlined />}
          title="Seol"
          className="float-right"
        >
          <Item icon={<FolderAddOutlined />}>
            <Link to="/manage/subjects">Manage Subject</Link>
          </Item>
          <Item icon={<FileAddOutlined />}>
            <Link to="/create/note">Create Note</Link>
          </Item>
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
