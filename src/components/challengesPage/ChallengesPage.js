import React, { useEffect, useState, useRef } from "react";
import { Form, Input, Button, Select, Row, Col, message } from "antd";
import { addToCollection, readCollection } from "../../utils/api";
import { isLogin } from "../../utils";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 20 },
};

const tagList = [
  "Front end",
  "Back end",
  "Elastic",
  "Nodejs",
  "React",
  "Angular",
];

function ChallengesPage(props) {
  const inputRef = useRef(null);
  // Challenge List data state
  const [challengeList, setChallengeList] = useState([]);
  // LogIn user details
  const [loginUserName, setLoginUserName] = useState("");
  // Antd form instance
  const [form] = Form.useForm();

  useEffect(() => {
    // Set Login user details
    if (isLogin()) {
      setLoginUserName(JSON.parse(localStorage.getItem("jwt")));
      inputRef.current.focus();
      if (challengeList && challengeList.length === 0) {
        readCollection("challenges")
          .then((data) => {
            setChallengeList(data);
          })
          .catch((error) => {
            message.error(
              "Something went wrong please try again. Error: " + error
            );
          });
      }
    }
  }, []);

  // Save challenge data
  const saveChallenge = ({ challengeData }) => {
    challengeData.createdDate = new Date().toJSON();
    challengeData.createdBy = loginUserName.user.name;
    challengeData.upVote = [];

    // Call addToCollection API
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
            onFinish={saveChallenge}
          >
            <Form.Item
              name={["challengeData", "title"]}
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Title is required",
                },
                {
                  validator: (_, value) => {
                    if (value) {
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
                    } else {
                      return Promise.reject(new Error(` `));
                    }
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
              label="Tag"
              rules={[{ required: true, message: "Tag is required" }]}
            >
              <Select placeholder="Select a tag" allowClear>
                {tagList.map((item) => (
                  <Option value={item} key={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name={["challengeData", "description"]}
              rules={[{ required: true, message: "Description is required" }]}
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
