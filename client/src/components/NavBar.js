import { Layout, Menu } from "antd";
import { HomeOutlined, DatabaseOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
const { Sider } = Layout;

export default function NavBar() {
  return (
    <div>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
        style={{ height: "100%", paddingTop: 60, backgroundColor: "#F5E960"}}
      >
        <NavLink to={"/"}>
          <img
            src="https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-banner-pic/603b065ebe4fcf912e6e75aed28a0d48.png"
            style={{ height: "50px" }}
            alt="Inti Corpora Teknologi"
          />
        </NavLink>
        <Menu theme="light" style={{ backgroundColor: "#F5E960" }} mode="inline">
          <Menu.Item key={1}>
            <NavLink to={"/dashboard"}>
              <HomeOutlined style={{ padding: 4, color: "black" }} />
              <span style={{ color: "black" }}>Dashboard</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key={2}>
            <NavLink to={"/data"}>
              <DatabaseOutlined style={{ padding: 4, color: "black" }} />
              <span style={{ color: "black" }}>Data Table</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
}
