import { Layout, Col, Divider, Row, Spin } from "antd";
import Swal from "sweetalert2";
import { fetchData } from "../store/actions/dataAction";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Content } from "antd/es/layout/layout";
import Foot from "./Footer";
import NavBar from "./NavBar";
import BarChart from "./barChart";
import PieChart from "./pieChart";
import LineChart from "./lineChart";
import Head from "./Header";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.data);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchData())
      .catch((err) => {
        Swal.fire(`${err}`, "", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const dataToRender = (results) => {
    let dataHelper = [];
    let arr = results.map((el) => el.userId).sort((a, b) => a - b);
    for (let i = 1; i <= arr[arr.length - 1]; i++) {
      let filtered = arr.filter((el) => {
        if (el === i) {
          return el;
        }
      });
      dataHelper.push({ label: i, value: filtered.length });
    }
    return dataHelper;
  };

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <NavBar />
        <Layout>
          <Content>
            <Head />
            {loading ? (
              <Spin />
            ) : (
              <div>
                <Col xs={20} sm={21} md={22} lg={23} xl={24}>
                  <Row>
                    <Col span={12}>
                    <Divider orientation="center">Bar Chart of Total Post</Divider>
                    <BarChart data={dataToRender(results)} />
                    </Col>
                    <Col span={12}>
                    <Divider orientation="center">Pie Chart of Total Post</Divider>
                    <PieChart data={dataToRender(results)} />
                    </Col>
                  </Row>
                  <Divider orientation="center">Line Chart of Total Post</Divider>
                  <LineChart data={dataToRender(results)} />
                </Col>
              </div>
            )}
          </Content>
          <Foot />
        </Layout>
      </Layout>
    </div>
  );
}
