/* eslint-disable */

import { Avatar, Card } from "antd";
import {
  DeleteFilled,
  EditOutlined,
  GlobalOutlined,
  HeartFilled,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./App.css";
import EditModal from "./EditModal";
import ReactPaginate from "react-paginate";

const Home = ({ uData }) => {
  const itemsPerPage = 3;


  const [itemOffset, setItemOffset] = useState(0);
  //   const[load, setLoad] = useState(true);
  const [data, setData] = useState(uData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProdIndex, setEditProdIndex] = useState();
  const [pageCount, setPageCount] = useState();
  console.log("uyffuy", data);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = data.slice(itemOffset, endOffset);
    setPageCount(data.length / itemsPerPage);
  }, [itemOffset, itemsPerPage, data])


  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const handleOk = (info, _id) => {
    console.log(info);
    let arr = [];
    const index = data.findIndex((d) => d._id === _id);

    for (let i = 0; i < data.length; i++) {
      if (i === index) {
        arr.push(info);
      } else {
        arr.push(data[i]);
      }
    }
    setData(arr);
    setIsModalOpen(false);
  };

  const deleteClickHandler = async (_id) => {
    const data2 = await fetch(`http://localhost:8080/users/user/${_id}`, {
      method: 'DELETE',
      // headers: {
      //     'Content-Type': "application/json"
      // },
      // body: JSON.stringify(user)
    })
    let arr = [];
    data.map((user) => {
      if (user._id !== _id) {
        arr.push(user);
      }
    });
    // console.log("uData: ", arr);
    setData(arr);
  };

  const modalHandler = (_id) => {
    // alert(index)
    if (_id) {
      const index = data.findIndex((d) => d._id === _id);
      setEditProdIndex(index);
    }
    setIsModalOpen(!isModalOpen);
    // console.log(data[editProdIndex]);
  };

  return (
    <div>

      <div className="homePage">
        {data &&
          data.map((user) => (
            <div className="card" _id={user._id}>
              <Card
                _id={user._id}
                cover={
                  <div
                    _id={user._id}
                    style={{
                      height: "180px",
                      w_idth: "99%",
                      backgroundColor: "#FAFAFA",
                      margin: "2px auto",
                    }}
                  >
                    <Avatar
                      src={`https://avatars.dicebear.com/v2/avataaars/${user.id + 1
                        }ass.svg?options[mood][]=happy`}
                      size={150}
                      style={{ height: "100%", borderRadius: "0" }}
                    />
                  </div>
                }
                actions={[
                  <EditOutlined
                    onClick={() => modalHandler(user._id)}
                    style={{ fontSize: "17px" }}
                  />,
                  <DeleteFilled
                    onClick={() => deleteClickHandler(user._id)}
                    style={{ fontSize: "17px" }}
                  />
                ]}
              >
                <div className="info" _id={user._id}>
                  <p style={{ fontWeight: "600" }}>{user.name}</p>
                  <div
                    _id={user._id}
                    style={{ fontSize: "13px", fontWeight: "350" }}
                  >
                    <p>
                      <MailOutlined />
                      <span style={{ paddingLeft: "9px" }}>{user.email}</span>
                    </p>
                    <p style={{ marginTop: "" }}>
                      <PhoneOutlined />
                      <span style={{ paddingLeft: "9px" }}>{user.contact}</span>
                    </p>
                  </div>
                </div>
                {isModalOpen && (
                  <EditModal
                    isOpen={isModalOpen}
                    user={data[editProdIndex]}
                    onCancel={modalHandler}
                    onOk={handleOk}
                  />
                )}
              </Card>
            </div>
          ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
      />
    </div>
  );
};

export default Home;
