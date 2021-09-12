import React, { useEffect, useState, useRef } from "react";

import { Form, Input, Button, Select, Row, Col, message } from "antd";
import { addToCollection, readCollection } from "../../utils/api";
import { isLogin } from "../../utils";

const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 20 },
};

const validateMessages = {
  required: "${label} is required!",
};

function ChallengesPage(props) {
  const inputRef = useRef(null);
  const [challengeList, setChallengeList] = useState([]);
  const [loginUserName, setLoginUserName] = useState("");
  const [form] = Form.useForm();
  const tagList = [
    "Front end",
    "Back end",
    "Elastic",
    "Nodejs",
    "React",
    "Angular",
  ];

  useEffect(() => {
    if (isLogin()) {
      setLoginUserName(JSON.parse(localStorage.getItem("jwt")));
      inputRef.current.focus();
    }
    readCollection("challenges")
      .then((data) => {
        setChallengeList(data);
      })
      .catch((error) => {});
  }, []);
  const onFinish = ({ challengeData }) => {
    challengeData.createdDate = new Date().toJSON();
    challengeData.createdBy = loginUserName.user.name;
    challengeData.upVote = [];
    debugger;
    addToCollection(challengeData, "challenges")
      .then((data) => {
        const copy = [...challengeList];
        copy.push(challengeData);
        setChallengeList(copy);
        message.success(
          "challenges added successfully" + " " + "ID: " + data.id
        );
        form.resetFields();
      })
      .catch((error) => {
        message.error(
          "Something went wrong please try again." + " " + "Error: " + error
        );
        form.resetFields();
      });
  };

  return (
    <div className="site-card-wrapper">
      <Row style={{ padding: "5%" }}>
        <Col offset={0} span={20}>
          <Form
            {...layout}
            form={form}
            name="challenge-from"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["challengeData", "title"]}
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                {
                  validator: (_, value) => {
                    const data = challengeList.filter((item) => {
                      if (item.title.toLowerCase() === value.toLowerCase()) {
                        return item;
                      }
                    });
                    if (data && data.length === 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "This title is already present please try another title."
                      )
                    );
                  },
                },
              ]}
            >
              <Input
                ref={inputRef}
                autoComplete="off"
                placeholder="Enter title"
              />
            </Form.Item>
            <Form.Item
              name={["challengeData", "tag"]}
              // name="gender"
              label="Tag"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select a tag"
                // onChange={onGenderChange}
                allowClear
              >
                {tagList.map((item) => (
                  <Option value={item} key={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name={["challengeData", "description"]}
              rules={[{ required: true }]}
              label="Description"
            >
              <Input.TextArea
                autoComplete="off"
                placeholder="Enter description"
              />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 22 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default ChallengesPage;
