import {
  Layout,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  addData,
  deleteData,
  editData,
} from "../store/actions/dataAction";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Foot from "./Footer";
import Column from "antd/es/table/Column";
import Head from "./Header";

const { Content } = Layout;
const { TextArea } = Input;

export default function DataList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { results } = useSelector((state) => state.data);
  const [newData, setNewData] = useState({
    id: "",
    userId: "",
    title: "",
    body: "",
  });
  const [editedData, setEditedData] = useState({
    id: "",
    userId: "",
    title: "",
    body: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  let bodyToAdd = JSON.stringify({ ...newData });
  let bodyToEdit = JSON.stringify({ ...editedData });

  useEffect(() => {
    dispatch(fetchData())
      .catch((err) => {
        Swal.fire(`${err}`, "", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  //more detail modal
  const showModal = (record) => {
    setNewData(record);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //Edit Modal
  const showModalEdit = (record) => {
    setEditedData(record);
    setIsModalEditOpen(true);
  };
  const handleEditOk = () => {
    setIsModalEditOpen(false);
  };
  const handleEditCancel = () => {
    setIsModalEditOpen(false);
  };
  const editDataHandler = (values) => {
    console.log(values, "values dari EditDataHandler");
    console.log(bodyToEdit, "bodyToEdit dari editDataHandler")
    console.log(editedData, "editedData dari editDataHandler")
    handleEditOk();
    // console.log("masuk editdataHandler");
    dispatch(editData(bodyToEdit, values.id))
      .then((data) => {
        Swal.fire(`Success Edit Data`, "", "success");
        navigate("/data");
        return;
      })
      .catch((err) => {
        Swal.fire(`${err}`, "", "error");
      })
      .finally(() => {
        dispatch(fetchData());
      });
  };
  const dataOptions = () => {
    let output = [];
    for (let i = 1; i <= 10; i++) {
      output.push({ label: i, value: i });
    }
    return output;
  };

  const onChangeSelect = (values) => {
    setNewData({ ...newData, userId: values });
    setEditedData({ ...editedData, userId: values });
  };

  const onChangeId = (values) => {
    setEditedData({ ...editedData, id: values });
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setNewData({ ...newData, [name]: value });
  };

  const onChangeEdit = (e) => {
    const { value, name } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  //Add Data Handler
  const showModalAdd = () => {
    setIsModalAddOpen(true);
  };
  const handleAddOk = (e) => {
    setIsModalAddOpen(false);
  };
  const handleAddCancel = () => {
    setIsModalAddOpen(false);
  };
  const addDataHandler = () => {
    handleAddOk();
    // console.log(bodyToAdd);
    dispatch(addData(bodyToAdd))
      .then((data) => {
        Swal.fire(`Success Adding data`, "", "success");
        navigate("/data");
      })
      .catch((err) => {
        Swal.fire(`${err}`, "", "error");
      })
      .finally(() => {
        dispatch(fetchData());
      });
  };

  //Delete Data handler
  const deleteDataHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        dispatch(deleteData(id)).finally(() => {
          dispatch(fetchData());
        });
      }
    });
  };

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <NavBar />
        <Layout>
          <Head />
          {loading ? (
            <div style={{ height: "100%" }}>
              <p>Loading...</p>
            </div>
          ) : (
            <Content
              style={{
                marginTop: "0px",
                marginBottom: "0px",
                background: "#f2f5ff",
              }}
            >
              <div
                style={{
                  padding: 24,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={() => showModalAdd()}
                  style={{
                    alignSelf: "end",
                    marginBottom: "10px",
                    backgroundColor: "#F49097",
                    color: "white",
                  }}
                >
                  Add Data
                </Button>
                <Table
                  dataSource={results}
                  style={{ width: "100%" }}
                  pagination={{ position: ["bottomLeft"] }}
                >
                  <Column
                    title="No"
                    dataIndex="id"
                    key="id"
                    width="1%"
                    responsive={["sm"]}
                  />
                  <Column
                    title="Title"
                    dataIndex="title"
                    key="title"
                    width="55%"
                  />
                  <Column
                    title="Posted by"
                    dataIndex="userId"
                    key="userId"
                    width="7%"
                  />
                  <Column
                    title="Action"
                    render={(record) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "20%",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            type="primary"
                            onClick={() => showModal(record)}
                            style={{
                              marginRight: 30,
                              backgroundColor: "#F49097",
                            }}
                          >
                            More Detail
                          </Button>
                          <EditOutlined
                            onClick={() => showModalEdit(record)}
                            style={{ marginRight: 30 }}
                          >
                            Edit
                          </EditOutlined>
                          <DeleteOutlined
                            onClick={(e) => {
                              e.preventDefault();
                              deleteDataHandler(record.id);
                            }}
                          >
                            Delete
                          </DeleteOutlined>
                        </div>
                      );
                    }}
                  />
                </Table>
                <Modal
                  title="Detail"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <p>{newData?.body}</p>
                </Modal>
                <Modal
                  title="Edit Data"
                  open={isModalEditOpen}
                  onCancel={handleEditCancel}
                  okText="Edit"
                  onOk={() => {
                    form
                      .validateFields()
                      .then((values) => {
                        // console.log(values)
                        form.resetFields();
                        editDataHandler(values);
                      })
                      .catch((info) => {
                        console.log("error", info);
                      });
                  }}
                >
                  <Form
                    name="Edit Data"
                    form={form}
                    fields={[
                      {
                        name: "title",
                        value: editedData.title,
                      },
                      {
                        name: "body",
                        value: editedData.body,
                      },
                      {
                        name: "userId",
                        value: editedData.userId,
                      },
                      {
                        name: "id",
                        value: editedData.id,
                      },
                    ]}
                    layout="vertical"
                  >
                    <Form.Item
                      label="Id"
                      name="id"
                      rules={[{ required: true, message: "id is Required" }]}
                    >
                      <InputNumber disabled={true} />
                    </Form.Item>
                    <Form.Item
                      label="Title"
                      name="title"
                      rules={[{ required: true, message: "Title is Required" }]}
                    >
                      <Input onChange={onChangeEdit} name="title" />
                    </Form.Item>
                    <Form.Item
                      label="Body"
                      name="body"
                      rules={[{ required: true, message: "Body is Required" }]}
                    >
                      <TextArea rows={4} onChange={onChangeEdit} name="body" />
                    </Form.Item>
                    <Form.Item
                      label="User Id"
                      name="userId"
                      rules={[
                        { required: true, message: "User Id is Required" },
                      ]}
                    >
                      <Select
                        defaultValue={editedData.userId}
                        options={dataOptions()}
                        onChange={onChangeSelect}
                      />
                    </Form.Item>
                  </Form>
                </Modal>
                <Modal
                  title="Add Data"
                  open={isModalAddOpen}
                  onCancel={handleAddCancel}
                  okText="Add"
                  onOk={() => {
                    form
                      .validateFields()
                      .then((values) => {
                        form.resetFields();
                        addDataHandler(values);
                      })
                      .catch((info) => {
                        console.log(info);
                      });
                  }}
                >
                  <Form
                    name="Add Data"
                    form={form}
                    fields={[
                      {
                        name: "id",
                        value: results.length + 1,
                      },
                    ]}
                    layout="vertical"
                  >
                    <Form.Item
                      label="Title"
                      name="title"
                      rules={[{ required: true, message: "Title is Required" }]}
                    >
                      <Input onChange={onChange} name="title" />
                    </Form.Item>
                    <Form.Item
                      label="Body"
                      name="body"
                      rules={[{ required: true, message: "Body is Required" }]}
                    >
                      <TextArea rows={4} onChange={onChange} name="body" />
                    </Form.Item>
                    <Form.Item
                      label="User Id"
                      name="userId"
                      rules={[
                        { required: true, message: "User Id is Required" },
                      ]}
                    >
                      <InputNumber
                        onChange={onChangeSelect}
                        name="userId"
                        min={1}
                      />
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
            </Content>
          )}
          <Foot />
        </Layout>
      </Layout>
    </div>
  );
}
