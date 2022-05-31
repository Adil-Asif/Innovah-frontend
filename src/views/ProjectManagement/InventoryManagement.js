import { React, useState, useEffect } from "react";
import "./InventoryManagement.scss";
import { Layout } from "antd";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PageTitle from "../../components/PageTitle/PageTitle";
import AI_image from "./../../assests/Images/ProjectManagement/AI_project.jpg";
import inventory from "./../../assests/Images/Inventory.svg";
import { Modal, Button, Spin, Form, Input, Select } from "antd";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCheck } from "@fortawesome/free-solid-svg-icons";
const { Content } = Layout;
const { Option } = Select;

const InventoryManagement = () => {
  const [reloadneed, setReloadneed] = useState(false)
  const [inventoryID, setInventoryID] = useState("");
  const [isEdit, setISEdit] = useState(false);
  const [inventoryStatus, setInventoryStatus] = useState("");
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [groupbyItems, setGroupbyItems] = useState([])
  const [counts, setCounts] = useState({})
  let params = useParams();
  console.log(params.projectid);
  const [fetchInventoryITems, setFetchInventoryITems] = useState([]);
  const fetchInventory = async () => {
    let response = await fetch(
      `https://innovah.herokuapp.com/projectinventory/getinventory/${params.projectid}`
    );
    setFetchInventoryITems(await response.json());

    response = await fetch(
      `https://innovah.herokuapp.com/projectinventory/getinventory/${params.projectid}/filter`
    );
    setGroupbyItems(await response.json());





  };
  useEffect(() => {
    fetchInventory();
    console.log(groupbyItems)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setCounts(returnCount())
  }, [reloadneed]);

  const updateStatus = (values) => {
    // console.log(values, "hhh");
    setInventoryStatus(values.inventorystatus);

    console.log(values, "ab yeh kiya hai")
    console.log(inventoryStatus, inventoryID, values.inventorystatus, "what is happening");
    sendingChangetoDB(inventoryID, values.inventorystatus)
    setISEdit(false);
  };

  const sendingChangetoDB = async (inventoryid, updateStatus) => {
    let response = await fetch(
      `https://innovah.herokuapp.com/projectinventory/updateitem`,
      {
        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify(
          { inventoryid, updateStatus }

        ),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    response = await response.json()
    console.log(response)
    setReloadneed(!reloadneed)
  }




  useEffect(() => { console.log(inventoryStatus) }, [inventoryStatus]);

  console.log(groupbyItems);
  const showModal2 = () => {
    setIsModalVisible2(true);
  };

  const handleOk2 = () => {
    setIsModalVisible2(false);
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

  const onFinish = (values) => {
    values.quantity = parseInt(values.quantity);
    values.inventoryvalue = parseInt(values.inventoryvalue);
    if (
      typeof values.quantity == "number" &&
      typeof values.inventoryvalue == "number"
    ) {
      fetch(
        `https://innovah.herokuapp.com/projectinventory/${params.projectid}/addnewitem`,
        {
          // Adding method type
          method: "POST",

          // Adding body or contents to send
          body: JSON.stringify({
            ...values,
            projectid: params.projectid,
          }),

          // Adding headers to the request
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      setIsModalVisible2(false);
      setReloadneed(true)
      console.log("Success:", values);
    } else {
      onFinishFailed("Value of qunatity and value not in number");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const returnCount = () => {
    let object = {}
    groupbyItems.forEach((element) => {
      console.log(element)
      switch (element.itemstatus) {
        case "Added":
       object.Added=element.itemcount;
          break;
        case "Not In Use":
          object.notUsed=element.itemcount
          break;
        case "In Use":
          object.inUse=element.itemcount
          break;
        case "Utilised":
          object.utilised=element.itemcount 
          break;

        default:
          break;
      }
    })
   
    return (object);
  }

  return (
    <div className="inventoryManagementPage">
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar PageKey="9" />
        <Layout className="site-layout" data-theme="dark">
          <Header />
          <Content style={{ margin: "0 16px" }}>
            <div className="titleSection">
              <div>
                <div className="Project-heading">
                  <PageTitle title="Inventory Management" />
                </div>
                <div>
                  <Button
                    type="primary"
                    style={{ marginRight: "4%", borderRadius: "8px" }}
                    onClick={showModal2}
                    className="newinventorybtn"
                  >
                    + New Item
                  </Button>
                </div>
              </div>
              <img src={inventory} alt="Inventory" />
            </div>

            <Modal
              title="Add New Resource  "
              visible={isModalVisible2}
              onOk={handleOk2}
              onCancel={handleCancel2}
            >
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Item Name"
                  name="Item_Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your ITem Name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Qunatity Of Resource"
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Resource Quantity!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Value of Resource"
                  name="inventoryvalue"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Inventory assignee!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Added By"
                  name="addedby"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter the name of person who added it!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item name="itemdescription" required label="Description">
                  <Input.TextArea />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 10,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>

            <div className="total-work-items">
              <div className="work-items">
                {/* <img src={AI_image} alt="" /> */}
                <span className="work-high-level">{(counts.Added)!==undefined ? counts.Added : 0}   Items Added</span>
              </div>
              <div className="work-items">
                {/* <img src={AI_image} alt="" /> */}
                <span className="work-high-level">{(counts.notUsed)!==undefined ? counts.notUsed : 0}  Items Not Used</span>
              </div>
              <div className="work-items">
                {/* <img src={AI_image} alt="" /> */}
                <span className="work-high-level">{(counts.inUse)!==undefined ? counts.inUse : 0}  Items In Use</span>
              </div>
              <div className="work-items">
                {/* <img src={AI_image} alt="" /> */}
                <span className="work-high-level">{(counts.utilised)!==undefined ? counts.utilised : 0}  Items Utilised</span>
              </div>
            </div>
            <div className="specific-inventory-heading">
              <div className="ID-inventory"> ID</div>
              <div className="inventory-name"> Resource Name</div>
              <div className="type"> Quantity</div>
              <div className="assigned-to"> Value</div>
              <div className="added-by"> Added by</div>
              <div className="status"> Status</div>
              <div className="edit"> Edit</div>
            </div>
            {fetchInventoryITems ? (
              fetchInventoryITems.map((inventory) => (
                <div className="specific-inventory-description">
                  <div className="ID-inventory"> {inventory.inventoryid}</div>
                  <div className="inventory-name"> {inventory.inventoryname}</div>
                  <div className="type"> {inventory.quantity}</div>
                  <div className="assigned-to"> {inventory.inventoryvalue}</div>
                  <div className="added-by"> {inventory.addedby}</div>
                  {!isEdit ? (
                    <>
                      <div className="status">{inventory.itemstatus}</div>
                      <div className="editButton">
                        <Button
                          type="primary"
                          shape="round"
                          className="editbtn"
                          onClick={() => {
                            setISEdit(true);
                            setInventoryID(inventory.inventoryid);
                          }}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                      </div>
                    </>
                  ) : inventoryID === inventory.inventoryid ? (
                    <>
                      <Form
                        onFinish={updateStatus}
                        onFinishFailed={onFinishFailed}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginLeft: "50px",
                        }}
                      >
                        <div className="status">
                          <Form.Item
                            name="inventorystatus"
                            style={{ marginBottom: "0px" }}
                            className="update"
                          >
                            <Select
                              placeholder="Select inventory status"
                              defaultValue={inventory.itemstatus}
                            >
                              <Option value="Added">Added</Option>
                              <Option value="Not In Use">Not in use</Option>
                              <Option value="In Use">In Use</Option>
                              <Option value="Utilised">Utilised</Option>
                            </Select>
                          </Form.Item>
                        </div>
                        <div
                          className="editButton"
                          style={{ marginTop: "-1.5px" }}
                        >
                          <Form.Item style={{ marginBottom: "0px" }}>
                            <Button
                              type="primary"
                              shape="round"
                              className="editbtn"
                              htmlType="submit"
                              style={{
                                marginLeft: "-25px",
                              }}
                            >
                              {" "}
                              <FontAwesomeIcon icon={faCheck} />
                            </Button>
                          </Form.Item>
                        </div>
                      </Form>
                    </>
                  ) : (
                    <>
                      <div className="status">{inventory.itemstatus}</div>
                      <div className="editButton">
                        <Button
                          type="primary"
                          shape="round"
                          className="editbtn"
                          onClick={() => {
                            setISEdit(true);
                            setInventoryID(inventory.inventoryid);
                          }}
                          style={{ border: "none" }}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <Spin size="small" />
            )}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
};

export default InventoryManagement;
