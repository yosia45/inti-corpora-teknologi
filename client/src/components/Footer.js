import { Layout } from "antd";
const { Footer } = Layout;

export default function Foot() {
  return (
    <div>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor:"#F2F7A1",
          marginTop:"0px",

        }}
      >
        Made By Yosia Luther Marpaung using <span><i class="fa-brands fa-react"></i></span>
      </Footer>
    </div>
  );
}
