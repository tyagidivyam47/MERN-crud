import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Modal } from "antd";

const EditModal = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(props.user);
  const [loading, setLoading] = useState(false);
  console.log("User is : ",user);

  const handleCancel = () => {
    props.onCancel();
  };

  const onChangeHandler = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleOk = async () => {
    setLoading(true);
        const data = await fetch(`http://localhost:8080/users/post/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(user)
        })
        setLoading(false)
        props.onOk(user, user._id);
        props.onCancel();
  };

  return (
    <Modal
      title="Basic Modal"
      open={props.isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            style={{ fontWeight: "350" }}
            defaultValue={user.name}
            name="name"
            onChange={(event) => onChangeHandler(event)}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            style={{ fontWeight: "350" }}
            defaultValue={user.email}
            name="email"
            onChange={(event) => onChangeHandler(event)}
          />
        </Form.Item>

        {/* Phone */}

        <Form.Item
          label="contact"
          name="contact"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            style={{ fontWeight: "350" }}
            defaultValue={user.contact}
            name="contact"
            onChange={(event) => onChangeHandler(event)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
