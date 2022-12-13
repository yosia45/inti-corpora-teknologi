import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="default"><NavLink to={"/"}>Back Home</NavLink></Button>}
      />
    </div>
  );
}
